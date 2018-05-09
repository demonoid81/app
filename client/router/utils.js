const routerUtils = {

}

// строка окна в баузере
routerUtils.title = (title) => {
    title = title || 'Workflow'
    window.document.title = title
}

routerUtils.oneOf = (ele, targetArr) => {
    return (targetArr.indexOf(ele) >= 0)
}

// получить маршрут по имени
routerUtils.getRouterObjByName = (routers, name) => {
    if (!name || !routers || !routers.length) {
        return null
    }
    for (const item of routers) {
        // Идем по первому уровню
        if (item.name === name) {
            return item
        }
        // переходим на следющий уровень
        const routerObj = routerUtils.getRouterObjByName(item.children, name) // рекурсия
        if (routerObj) {
            return routerObj
        }
    }
    return null
}
// открытие новой страницы
routerUtils.openNewPage = (vm, name, argu, query) => {
    const pageOpenedList = vm.$store.state.app.pageOpenedList
    const openedPageLen = pageOpenedList.length
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

routerUtils.toDefaultPage = (routers, name, route, next) => {
    const len = routers.length
    let i = 0
    let notHandle = true
    while (i < len) {
        if (routers[i].name === name && routers[i].children && routers[i].redirect === undefined) {
            route.replace({
                name: routers[i].children[0].name
            })
            notHandle = false
            next()
            break
        }
        i++
    }
    if (notHandle) {
        next()
    }
}

routerUtils.showThisRoute = function (itAccess, currentAccess) {
    if (typeof itAccess === 'object' && Array.isArray(itAccess)) {
        return routerUtils.oneOf(currentAccess, itAccess)
    } else {
        return itAccess === currentAccess
    }
}

// Проверка уровней доступа к разделам меню
routerUtils.checkAccessMenu = (routers, accessCode) => {
    const menuList = []
    // todo проработать уровни доступа
    for (const item of routers) {
        // Если уровни доступа не указаны
        if (item.access !== undefined) {
            // и доступ открыт
            if (routerUtils.showThisRoute(item.access, accessCode)) {
                // если только один потомок или потомком нет
                if (item.children.length === 1 || item.children === undefined) {
                    // добавляем его
                    menuList.push(item)
                } else {
                    // добавляем полность все потомков
                    const len = menuList.push(item)
                    // перебираем всех потомком на доступ
                    const childrenArr = routerUtils.checkAccessMenu(item.children, accessCode)
                    // если проверку не прошли удаляем ветку
                    if (childrenArr === undefined || childrenArr.length === 0) {
                        menuList.splice(len - 1, 1)
                    }
                    //  иначе изменяем добавленый пунк меню
                    menuList[len - 1].children = childrenArr
                }
            }
        } else {
            // если только один потомок или потомком нет
            if (item.children.length === 1 || item.children === undefined) {
                menuList.push(item)
            } else {
                // добавляем полность все потомков
                const len = menuList.push(item)
                // перебираем всех потомком на доступ
                const childrenArr = routerUtils.checkAccessMenu(item.children, accessCode)
                // если проверку не прошли удаляем ветку
                if (childrenArr === undefined || childrenArr.length === 0) {
                    menuList.splice(len - 1, 1)
                }
                //             } else {
                //                 let handledItem = JSON.parse(JSON.stringify(menuList[len - 1]))
                //                 handledItem.children = childrenArr
                //                 menuList.splice(len - 1, 1, handledItem)
                //             }
                //  иначе изменяем добавленый пунк меню
                menuList[len - 1].children = childrenArr
            }
        }
    }
    return menuList
}

export default routerUtils
