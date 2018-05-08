const Vue = require('vue')
const Vuex = require('vuex')
const mutations = require('./mutations')
const actions = require('./actions')
// modules
const app = require('./modules/app/')

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        requestToken : '' // ключ запроса, отправляется севером при каждом ответе
    },
    mutations: {
        mutations
    },
    actions: {
        actions
    },
    modules: {
        app
    }
})

export default store
