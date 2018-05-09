const { appRouter } = require('./appRouter')
const { otherRouter } = require('./otherRouter')
const i18n = require('@locale')

export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: i18n.translate('login')
    },
    component: () => import('@components/login/login.vue')
}

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404 Not found'
    },
    component: () => import('@components/error-page/404.vue')
}

export const page403 = {
    path: '/403',
    meta: {
        title: '403 Forbidden error'
    },
    name: 'error-403',
    component: () => import('@components/error-page/403.vue')
}

export const page500 = {
    path: '/500',
    meta: {
        title: '500 Internal server error'
    },
    name: 'error-500',
    component: () => import('@components/error-page/500.vue')
}

export const routers = [
    loginRouter,
    otherRouter,
    // preview,
    // locking,
    ...appRouter,
    page500,
    page403,
    page404
]
