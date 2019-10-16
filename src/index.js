import Vue from 'vue'
import App from '@/app.vue'
import router from '@/routes'
import ElementUI from 'element-ui'
import store from './store'
import '@/app.scss'
// filters 过滤器
import filters from '@/libs/filters'
// directive 自定义指令
import directive from '@/libs/directives'
// 引入全局配置文件
import config from '@/config'
directive(Vue);
filters(Vue);
Vue.use(ElementUI);
Vue.prototype.$config = config;
new Vue({
    router,
    store,
    el: '#app',
    components: {App},
    template: '<App/>'
});