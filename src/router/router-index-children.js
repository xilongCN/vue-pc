export default [
    {
        path: '/',
        name: 'index-home',
        redirect:'/theme',
    },
    {
        path: '/theme',
        name: 'theme',
        component: () => import('@/views/index/theme.vue')
    },
    {
        path: '/test1',
        name: 'test1',
        component: () => import('@/views/index/test1.vue')
    },
    {
        path: '/test2',
        name: 'test2',
        component: () => import('@/views/index/test2.vue')
    }
]