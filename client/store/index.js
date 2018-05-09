import Vue from 'vue'
import Vuex from 'vuex'
// import mutations from './mutations'
// import actions from './actions'
// modules
import app from './modules/app/'

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        requestToken: '' // ключ запроса, отправляется севером при каждом ответе
    },
    mutations: {

    },
    actions: {

    },
    modules: {
        app
    }
})

export default store
