import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/pages/home'
import Login from '@/pages/login'
import permissionRoutes from './permissionRoutes'
import store from '@/store'

Vue.use(VueRouter);
// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
import _import from '@/routes/_import';
const createRouter = () => new VueRouter({
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            if (!to.meta.savePos) {
                return {x: 0, y: 0}
            }
        }
    },
    routes: [
        {
            path: '/',
            component:Home
        },
        {
            path: '/login',
            component: Login
        }
    ]
});
const router = createRouter();
function resetRouter() {
    console.log('reset')
    const newRouter = createRouter();
    router.matcher = newRouter.matcher // the relevant part
}
//登出操作
export function logout() {
    window.localStorage.token = '';
    store.state.login.token = '';
    store.state.login.userInfo = {};
    resetRouter();
    router.push('/');
}
export function addDynamicRoutes(){
    let {token,userInfo} = store.state.login,realRoutes = [];
    if(token){
        if(userInfo.role){
            let keys = permissionRoutes.dynamicRoutes.keys();
            [...keys].forEach(key=>{
                if(key & userInfo.role){
                    realRoutes.push(permissionRoutes.dynamicRoutes.get(key));
                }
            });
            if(userInfo.isAdmin){
                realRoutes.push(permissionRoutes.adminRoutes);
            }
        }
    }
    realRoutes.push(permissionRoutes.notFoundRoutes);
    resetRouter();
    router.addRoutes(realRoutes);
}

router.onReady(()=>{
        //登录了需要查看是否有用户的信息
        store.dispatch('login/sendGetCurUser').then(()=>{
            addDynamicRoutes();
        }).catch(()=>{
            //token失效
            logout();
        })

});
export default router