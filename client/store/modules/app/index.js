// управление состояние окон
const mutations = require('./mutations')
const {otherRouter, appRouter} = require('../../../router/router')

const app = {
    state: {
        pageOpenedList: [{
            title: Vue.i18n.translate('main'),
            path: '',
            name: 'main'
        }], // открытые страницы, страница main открыта по умолчанию
        tagsList: [...otherRouter.children], // маршруты главной страницы
        currentPageName: '', // имя текущей страницы
        dontCache: [], // Определяем здесь имена страницы, которые не хотим кэшировать
        cachePage: [], // Кешированые страницы
    },
    mutations : mutations,
}

export default app
