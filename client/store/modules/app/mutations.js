import routerUtils from '@router/utils'
const { otherRouter } = require('@router/otherRouter')
const { appRouter } = require('@router/appRouter')

const mutations = {

    // срохраняем список открытых страниц
    pageOpenedList (state, get) {
        const openedPage = state.pageOpenedList[get.index]
        if (get.argu) {
            openedPage.argu = get.argu
        }
        if (get.query) {
            openedPage.query = get.query
        }
        state.pageOpenedList.splice(get.index, 1, openedPage)
        localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList)
    },

    // сохранияем имя текущей страницы
    setCurrentPageName (state, name) {
        state.currentPageName = name
    },

    // увеличиваем число открытым страниц
    increateTag (state, tagObj) {
        // если страницы нет списке не кэшируемых
        if (!routerUtils.oneOf(tagObj.name, state.dontCache)) {
            // закешируем ее
            state.cachePage.push(tagObj.name)
            localStorage.cachePage = JSON.stringify(state.cachePage)
        }
        // добавим страницу в список открытых
        state.pageOpenedList.push(tagObj)
        localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList)
    },

    setOpenedList (state) {
        // если есть список открытых страниц в локальном кэше, то грузим с него, иначе загружаем только главную страницу
        state.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [otherRouter.children[0]]
    },

    initCachePage (state) {
        // если в локальном кэше есть есть список кэшированых страниц, загружаем их
        if (localStorage.cachePage) {
            state.cachePage = JSON.parse(localStorage.cachePage)
        }
    },

    // формируем меню на основании листа маршрутов
    updateMenuList (state) {
        const accessCode = parseInt(sessionStorage.getItem('access'))
        state.menuList = routerUtils.checkAccessMenu(appRouter, accessCode)
    }
}

export default mutations
