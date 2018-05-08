import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'

Vue.use(VueRouter)



new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app')
