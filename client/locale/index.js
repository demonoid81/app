const Vue = require('vue')
const vuexI18n = require('vuex-i18n')
const store = require('../store')
const translationsEn = require('./translationsEn')
const translationsRu = require('./translationsRu')

Vue.use(vuexI18n.plugin, store, { identifiers: ['{{','}}'] })

Vue.i18n.add('en', translationsEn)
Vue.i18n.add('ru', translationsRu)
