import utils from '../libs/utils'

let routeUtils = {

}

// строка окна в баузере
routeUtils.title = util.title = (title) => {
    title = title || 'Workflow'
    window.document.title = title
}

// получить маршрут по имени
routeUtils.getRouterObjByName = (routers, name) => {
    if (!name || !routers || !routers.length) {
        return null
    }
    let routerObj = null
    for (let item of routers) {
        // Идем по первому уровню
        if (item.name === name) {
            return item
        }
        // переходим на следющий уровень
        routerObj = routeUtils.getRouterObjByName(item.children, name) // рекурсия
        if (routerObj) {
            return routerObj
        }
    }
    return null
}
// открытие новой страницы
routeUtils.openNewPage = (vm, name, argu, query) =>  {
    let pageOpenedList = vm.$store.state.app.pageOpenedList
    let openedPageLen = pageOpenedList.length
    let i = 0
    let tagHasOpened = false
    // перебираем все открытые страницы
    while (i < openedPageLen) {
        if (name === pageOpenedList[i].name) { // Страница уже открыта
            vm.$store.commit('pageOpenedList', {
                index: i,
                argu: argu,
                query: query
            })
            tagHasOpened = true
            break
        }
        i++
    }
    if (!tagHasOpened) {
        let tag = vm.$store.state.app.tagsList.filter((item) => {
            if (item.children) {
                return name === item.children[0].name
            } else {
                return name === item.name
            }
        })
        tag = tag[0]
        if (tag) {
            tag = tag.children ? tag.children[0] : tag
            if (argu) {
                tag.argu = argu
            }
            if (query) {
                tag.query = query
            }
            vm.$store.commit('increateTag', tag)
        }
    }
    vm.$store.commit('setCurrentPageName', name)
}
routeUtils.generateMenu = (routers, accessCode, menuList) => {
    for (let item of routers) {
        // Идем по первому уровню
        if (item.access !== undefined){

        }
        else {
            // если вложеность одна, то добавляем ее
            if (item.children.length === 1) {
                menuList.push(item)
            } else {
                let len = menuList.push(item) // индекс пункта меню


                if (childrenArr === undefined || childrenArr.length === 0) {
                    menuList.splice(len - 1, 1)
                }

            }
        }

        // переходим на следющий уровень
        routeUtils.generateMenu(item.children, name) // рекурсия

    }

}


export default routeUtils
