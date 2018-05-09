import Vue from 'vue'
import VuexI18n from 'vuex-i18n'

import store from '@store'

import translationsEn from './translationsEn'
import translationsRu from './translationsRu'

Vue.use(VuexI18n.plugin, store, {
    identifiers: ['{{', '}}'],
    moduleName: 'i18n',
    onTranslationNotFound (locale, key) {
        console.warn(`i18n :: Key '${key}' not found for locale '${locale}'`)
    }
})

Vue.i18n.add('en', translationsEn)
Vue.i18n.add('ru', translationsRu)
