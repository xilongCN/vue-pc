import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import '@/utils/vue_directive.js'
import '@/common/css/index.scss'
import '@/config/element_ui.js'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
