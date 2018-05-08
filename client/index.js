const Vue = require('vue')
const VueRouter = require('vue-router')
const App = require('./App')
const {router} = require('./router/index')
const {appRouter} = require('./router/router')
const store = require('./store')

Vue.use(VueRouter)



new Vue({
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: '' // имя текущей страницы
    },
    mounted () {
        this.currentPageName = this.$route.name
        // Отобразить список открытых страниц
        this.$store.commit('setOpenedList')
        this.$store.commit('initCachepage')
        // создаем меню с уровнями доступа
        this.$store.commit('updateMenulist')
    },
}).$mount('#app')
