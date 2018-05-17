import Vue from 'vue'
import VuexI18n from '@modules/vuex-i18n'
import store from '@store'

import translationsEn from './translationsEn'
import translationsRu from './translationsRu'

Vue.use(VuexI18n)

const i18n = new VuexI18n.I18n(store)

i18n.add('en-EN', translationsEn)
i18n.add('ru-RU', translationsRu)
i18n.set('ru-RU')

export default i18n
