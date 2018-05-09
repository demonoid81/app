import main from '@/components/main/main.vue'

const appRouter = [
    {
        path: '/access',
        icon: 'key',
        name: 'access',
        title: '权限管理',
        component: main,
        children: [
            { path: 'index', title: '权限管理', name: 'access_index', component: () => import(__base + '@components/login/login.vue') }
        ]
    },
    {
        path: '/component',
        icon: 'social-buffer',
        name: 'component',
        title: '组件',
        component: main,
        children: [
            {
                path: 'text-editor',
                icon: 'compose',
                name: 'text-editor',
                title: '富文本编辑器',
                component: main,
                children: [
                    {
                        path: 'md-editor',
                        icon: 'pound',
                        name: 'md-editor',
                        title: 'Markdown编辑器',
                        component: () => import('@components/login/login.vue')
                    },
                    {
                        path: 'image-editor',
                        icon: 'crop',
                        name: 'image-editor',
                        title: '图片预览编辑',
                        component: () => import('@components/login/login.vue')
                    },
                    {
                        path: 'draggable-list',
                        icon: 'arrow-move',
                        name: 'draggable-list',
                        title: '可拖拽列表',
                        component: () => import('@components/login/login.vue')
                    }]
            },
            {
                path: 'area-linkage',
                icon: 'ios-more',
                name: 'area-linkage',
                title: '城市级联',
                component: () => import('@components/login/login.vue')
            },
            {
                path: 'file-upload',
                icon: 'android-upload',
                name: 'file-upload',
                title: '文件上传',
                component: () => import('@components/login/login.vue')
            },
            {
                path: 'scroll-bar',
                icon: 'android-upload',
                name: 'scroll-bar',
                title: '滚动条',
                component: () => import('@components/login/login.vue')
            },
            {
                path: 'count-to',
                icon: 'arrow-graph-up-right',
                name: 'count-to',
                title: '数字渐变',
                // component: () => import('@/views/my-components/count-to/count-to.vue')
                component: () => import('@components/login/login.vue')
            },
            {
                path: 'split-pane-page',
                icon: 'ios-pause',
                name: 'split-pane-page',
                title: 'split-pane',
                component: () => import('@components/login/login.vue')
            }
        ]
    },
    {
        path: '/form',
        icon: 'android-checkbox',
        name: 'form',
        title: '表单编辑',
        component: main,
        children: [
            { path: 'artical-publish', title: '文章发布', name: 'artical-publish', icon: 'compose', component: () => import('@components/login/login.vue') },
            { path: 'workflow', title: '工作流', name: 'workflow', icon: 'arrow-swap', component: () => import('@components/login/login.vue') }

        ]
    }
]

export default appRouter
