const Vue = require('vue')
const VueRouter = require('vue-router')
const {routers, otherRouter, appRouter} = require('./router')

Vue.use(VueRouter)

const RouterConfig = {
    routes: routers
}

export const router = new VueRouter(RouterConfig)

router.beforeEach((to, from, next) => {
    // todo прогресс бар загрузки


})

router.afterEach((to) => {

})
