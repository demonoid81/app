// управление состояние окон
const mutations = require('./mutations')
const { otherRouter } = require('@router/otherRouter')
const appRouter = require('@router/appRouter')
const i18n = require('@locale')

const app = {
    state: {
        pageOpenedList: [{
            title: 'main',
            path: '',
            name: 'main'
        }], // открытые страницы, страница main открыта по умолчанию
        tagsList: [...otherRouter.children], // маршруты главной страницы
        currentPageName: '', // имя текущей страницы
        dontCache: [], // Определяем здесь имена страницы, которые не хотим кэшировать
        cachePage: [] // Кешированые страницы
    },
    mutations: mutations
}

export default app
