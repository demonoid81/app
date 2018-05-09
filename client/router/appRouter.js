import main from '@/components/main/main.vue'

export const appRouter = [
    {
        path: '/access',
        icon: 'key',
        name: 'access',
        title: '1',
        component: main,
        children: [
            { path: 'index', title: '1', name: 'access_index', component: () => import(__base + '@components/login/login.vue') }
        ]
    },
    {
        path: '/component',
        icon: 'social-buffer',
        name: 'component',
        title: '2',
        component: main,
        children: [
            {
                path: 'text-editor',
                icon: 'compose',
                name: 'text-editor',
                title: '2.1',
                component: main,
                children: [
                    {
                        path: 'md-editor',
                        icon: 'pound',
                        name: 'md-editor',
                        title: '2.1.1',
                        component: () => import('@components/login/login.vue')
                    },
                    {
                        path: 'image-editor',
                        icon: 'crop',
                        name: 'image-editor',
                        title: '2.1.2',
                        component: () => import('@components/login/login.vue')
                    },
                    {
                        path: 'draggable-list',
                        icon: 'arrow-move',
                        name: 'draggable-list',
                        title: '2.1.3',
                        component: () => import('@components/login/login.vue')
                    }]
            },
            {
                path: 'area-linkage',
                icon: 'ios-more',
                name: 'area-linkage',
                title: '2.2',
                component: () => import('@components/login/login.vue')
            }
        ]
    },
    {
        path: '/form',
        icon: 'android-checkbox',
        name: 'form',
        title: '3',
        component: main,
        children: [
            { path: 'artical-publish', title: '3.1', name: 'artical-publish', icon: 'compose', component: () => import('@components/login/login.vue') },
            { path: 'workflow', title: '3.2', name: 'workflow', icon: 'arrow-swap', component: () => import('@components/login/login.vue') }

        ]
    }
]
