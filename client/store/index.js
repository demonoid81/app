const Vue = require('vue')
const Vuex = require('vuex')
const mutations = require('./mutations')
const actions = require('./actions')

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        token : '', // ключ сеанса
        requestToken : '' // ключ запроса, отправляется севером при каждом ответе
    },
    mutations: {
        mutations
    },
    actions: {
        actions
    },
    modules: {

    }
})

export default store
