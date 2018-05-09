import main from '@/components/main/main.vue'

export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: main,
    children: [
        { path: 'home', title: 'home', name: 'home_index', component: () => import('@components/login/login.vue') },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: () => import('@components/login/login.vue') },
        { path: 'order/:order_id', title: '订单详情', name: 'order-info', component: () => import('@components/login/login.vue') },
        { path: 'shopping', title: '购物详情', name: 'shopping', component: () => import('@components/login/login.vue') },
        { path: 'message', title: '消息中心', name: 'message_index', component: () => import('@components/login/login.vue') }
    ]
}

