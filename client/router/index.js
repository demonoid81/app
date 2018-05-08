const Vue = require('vue')
const VueRouter = require('vue-router')
const {routers, otherRouter, appRouter} = require('./router')
const {title , getRouterObjByName, toDefaultPage, openNewPage} = require('./utils')

Vue.use(VueRouter)

const RouterConfig = {
    routes: routers
}

export const router = new VueRouter(RouterConfig)

router.beforeEach((to, from, next) => {
    // todo прогресс бар загрузки
    // отобразим заголовок в баузере
    title(to.meta.title)
    // Если стоит блокировка, но оттображаема страница не шаблон блокировки
    if (sessionStorage.getItem('locking') === '1' && to.name !== 'locking') {
        // отрабатываем маршрут блокироваик экрана
        next({
            replace: true,
            name: 'locking'
        })
        // Если стоит блокировка и отображается страница "заблокиронно"
    } else if (sessionStorage.getItem('locking') === '0' && to.name === 'locking') {
        // игнорируем
        next(false)
    } else {
        // если нет токена сеанся и текущая страница не для входа систему
        if (this.$store.state.user.token === '' && to.name !== 'login') {
            // оттображаем страницу входа в сиситему
            next({
                name: 'login'
            })
            // если есть токен сессии и отображаемая страница для входа в истему
        } else if (this.$store.state.user.token !== '' && to.name === 'login') {
            // страсываем заголовок на стандартный
            title()
            // переходим на главную страницу
            next({
                name: 'main'
            })
        } else {
            // получаем маршрут по имени
            const curRouterObj = getRouterObjByName([otherRouter, ...appRouter], to.name)
            // необходимо определить разрешение на доступ к маршруту
            // todo Доработать права доступа к маршрутам
            if (curRouterObj && curRouterObj.access !== undefined) {
                // если разрешение есть, то отбабатываем маршрут
                if (curRouterObj.access === parseInt(sessionStorage.getItem('access'))) {
                    // Если в адресной строке введено меню первого уровня, страница первого вторичного меню открывается по умолчанию
                    toDefaultPage([otherRouter, ...appRouter], to.name, router, next)
                } else {
                    // иначе выбрасываем 403 ошибку
                    next({
                        replace: true,
                        name: 'error-403'
                    })
                }
            } else { // Маршрут без разрешения конфигурации проходит напрямую
                toDefaultPage([...routers], to.name, router, next)
            }
        }
    }

})

router.afterEach((to) => {
    openNewPage(router.app, to.name, to.params, to.query);
    // todo идикатор загрузки
    window.scrollTo(0, 0);
})
