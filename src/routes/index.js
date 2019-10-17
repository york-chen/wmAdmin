import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/pages/login';
import MainLayout from '@/layout/mainLayout'
import Announcement from '@/pages/messageCenter/announcement'
import VersionDescription from '@/pages/messageCenter/versionDescription'
import MaintenanceNotice from '@/pages/messageCenter/maintenanceNotice'
import StopServiceTips from '@/pages/messageCenter/stopServiceTips'
import RegularMail from '@/pages/mailCenter/regularMail'
import LimitedMallAdManage from '@/pages/shopCenter/limitedMallAdManage'

Vue.use(VueRouter);
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
            component:MainLayout,
            children:[
                {
                    path:'',
                    redirect:'announcement'
                },
                {
                    path:'announcement',
                    component:Announcement
                },
                {
                    path:'versionDescription',
                    component:VersionDescription
                },
                {
                    path:'maintenanceNotice',
                    component:MaintenanceNotice
                },
                {
                    path:'stopServiceTips',
                    component:StopServiceTips
                },
                {
                    path:'regularMail',
                    component:RegularMail
                },
                {
                    path:'limitedMallAdManage',
                    component:LimitedMallAdManage
                }
            ]
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '*',
            redirect:'/'
        }
    ]
});
const router = createRouter();
export default router