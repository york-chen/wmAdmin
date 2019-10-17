import Vue from 'vue'
import App from '@/app.vue'
import router from '@/routes'
import ElementUI from 'element-ui'
import store from './store'
import '@/app.scss'

Vue.use(ElementUI);
new Vue({
    router,
    store,
    el: '#app',
    components: {App},
    template: '<App/>'
});