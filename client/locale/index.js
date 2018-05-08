import Vue from 'vue'
import vuexI18n from 'vuex-i18n'
const store = require('../store')


Vue.use(vuexI18n.plugin, store)
