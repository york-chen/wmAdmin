// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
import _import from '@/routes/_import';
import CreditScore from '@/pages/creditScore'
import CreditReport from '@/pages/creditReport'
import PersonalScore from '@/pages/personalScore'
import BusinessLayout from '@/layout/businessLayout'
import BusinessMatter from '@/pages/businessMatter'
import WaterIntake from '@/pages/businessMatter/waterIntake'
import SignBoard from '@/pages/businessMatter/signBoard'
import AdminLayout from '@/layout/adminLayout'
import AdminUserAccount from '@/pages/admin/accountManage'
import AdminRecordList from '@/pages/admin/recordList'

let dynamicRoutes = new Map();
dynamicRoutes.set(1,{
    path: '/creditScore/:name',
    component: CreditScore
});
dynamicRoutes.set(2,{
    path: '/creditReport/:name',
    component: CreditReport
});
dynamicRoutes.set(8, {
    path: '/personalScore/:name',
    component: PersonalScore
})
dynamicRoutes.set(16, {
    path: '/business',
    component: BusinessLayout,
    children:[
        {
            path: '',
            component:BusinessMatter
        },
        {
            path: 'waterIntake',
            component:WaterIntake
        },
        {
            path: 'signBoard',
            component:SignBoard
        },
    ]
});

let adminRoutes = {
    path: '/admin',
    component: AdminLayout,
    children:[
        {
            path: '',
            redirect:'account'
        },
        {
            path: 'account',
            component: AdminUserAccount
        },
        {
            path: 'record',
            component: AdminRecordList
        }
    ]
};
let notFoundRoutes = {
    path: '*',
    redirect:'/'
};
export default {
    dynamicRoutes,
    adminRoutes,
    notFoundRoutes
}
