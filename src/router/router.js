import Vue from 'vue'
import Router from 'vue-router'
import indexChildren from './router-index-children'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('@/views/home.vue'),
            children:indexChildren,
        },
    ]
})
