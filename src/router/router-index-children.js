export default [
    {
        path: '/',
        name: 'index-home',
        redirect:'/theme',
    },
    {
        path: '/theme',
        name: 'theme',
        component: () => import('@/views/index/theme.vue'),
        meta:{
            index:0
        }
    },
    {
        path: '/animation',
        name: 'animation',
        component: () => import('@/views/index/animation.vue'),
        meta:{
            index:1
        }
    },
    {
        path: '/test2',
        name: 'test2',
        component: () => import('@/views/index/test2.vue'),
        meta:{
            index:2
        }
    }
]