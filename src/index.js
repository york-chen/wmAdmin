import Vue from 'vue'
import App from '@/app.vue'
import router from '@/routes'
import ElementUI from 'element-ui'
import store from './store'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import '@/app.scss'

dayjs.locale('zh-cn');
Vue.use(ElementUI,{size:'small'});
Vue.prototype.$dayjs = dayjs;
new Vue({
    router,
    store,
    el: '#app',
    components: {App},
    template: '<App/>'
});