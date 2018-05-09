import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import router from '@router/index'
// import appRouter from '@router/appRouter'
import store from './store'

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
        this.$store.commit('initCachePage')
        // создаем меню с уровнями доступа
        this.$store.commit('updateMenuList')
    }
}).$mount('#app')
