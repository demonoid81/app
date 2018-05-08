const mm = require('micromatch')
const {otherRouter, appRouter} = require('../../../router/router')

const mutations = {
    // срохраняем список открытых страниц
    pageOpenedList (state, get) {
        let openedPage = state.pageOpenedList[get.index]
        if (get.argu) {
            openedPage.argu = get.argu
        }
        if (get.query) {
            openedPage.query = get.query
        }
        state.pageOpenedList.splice(get.index, 1, openedPage)
        localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList)
    },
    // сохранияем имя текущей страницы
    setCurrentPageName (state, name) {
        state.currentPageName = name
    },
    // увеличиваем чмсло открытым страниц
    increateTag (state, tagObj) {
        // если страницы нет списке не кэшируемых
        if (!mm.some(state.dontCache, tagObj.name, { nocase: true })) {
            // закешируем ее
            state.cachePage.push(tagObj.name)
            localStorage.cachePage = JSON.stringify(state.cachePage)
        }
        // добавим страницу в список открытых
        state.pageOpenedList.push(tagObj)
        localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList)
    },
    setOpenedList (state) {
        // если есть список открытых страниц в локальном кэше, то грузим с него, иначе загружаем только главную страницу
        state.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [otherRouter.children[0]]
    },
    initCachepage (state) {
        // если в локальном кэше есть есть список кэшированых страниц, загружаем их
        if (localStorage.cachePage) {
            state.cachePage = JSON.parse(localStorage.cachePage)
        }
    },
    // формируем меню на основании листа маршрутов
    updateMenulist (state) {
        let accessCode = parseInt(sessionStorage.getItem('access'))
        let menuList = []

        // appRouter.forEach((item, index) => {
        //     if (item.access !== undefined) {
        //         if (Util.showThisRoute(item.access, accessCode)) {
        //             if (item.children.length === 1) {
        //                 menuList.push(item)
        //             } else {
        //                 let len = menuList.push(item)
        //                 let childrenArr = []
        //                 childrenArr = item.children.filter(child => {
        //                     if (child.access !== undefined) {
        //                         if (child.access === accessCode) {
        //                             return child
        //                         }
        //                     } else {
        //                         return child
        //                     }
        //                 })
        //                 menuList[len - 1].children = childrenArr
        //             }
        //         }
        //     } else {
        //         if (item.children.length === 1) {
        //             menuList.push(item)
        //         } else {
        //             let len = menuList.push(item)
        //             let childrenArr = []
        //             childrenArr = item.children.filter(child => {
        //                 if (child.access !== undefined) {
        //                     if (Util.showThisRoute(child.access, accessCode)) {
        //                         return child
        //                     }
        //                 } else {
        //                     return child
        //                 }
        //             })
        //             if (childrenArr === undefined || childrenArr.length === 0) {
        //                 menuList.splice(len - 1, 1)
        //             } else {
        //                 let handledItem = JSON.parse(JSON.stringify(menuList[len - 1]))
        //                 handledItem.children = childrenArr
        //                 menuList.splice(len - 1, 1, handledItem)
        //             }
        //         }
        //     }
        // })
        state.menuList = menuList
    },
}

export default mutations
