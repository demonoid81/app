import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app'
import router from '@router/index'
import store from '@store'
import i18n from '@locale'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import VueApollo from 'vue-apollo'
import Vuetify from 'vuetify'

// import('../node_modules/vuetify/dist/vuetify.min.css')
import './app.styl'

const httpLink = new HttpLink({
    // You should use an absolute URL here
    uri: 'http://localhost:8989/graphql'
})

// Create the subscription websocket link
const wsLink = new WebSocketLink({
    uri: 'ws://localhost:8989/subscriptions',
    options: {
        reconnect: true
    }
})

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
    // split based on operation type
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query)
        return kind === 'OperationDefinition' &&
            operation === 'subscription'
    },
    wsLink,
    httpLink
)

// Create the apollo client
const apolloClient = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    connectToDevTools: true
})

const apolloProvider = new VueApollo({
    defaultClient: apolloClient
})

Vue.use(VueRouter)
Vue.use(VueApollo)
Vue.use(Vuetify)

new Vue({
    el: '#app',
    router: router,
    store: store,
    i18n: i18n,
    provide: apolloProvider.provide(),
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
})
