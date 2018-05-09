import VuexI18n from 'vuex-i18n'
import Vue from 'vue'
import store from '../store'
import translationsEn from './translationsEn'
import translationsRu from './translationsRu'

Vue.use(VuexI18n.plugin, store, { identifiers: ['{{', '}}'] })

Vue.i18n.add('en', translationsEn)
Vue.i18n.add('ru', translationsRu)

const i18n = {
}

i18n.translate = (key) => {
    return Vue.i18n.translate(key)
}

export default i18n
