/**
 * 公告 状态类型枚举
 * @type {Map<any, any>}
 */
export const announcementStatus = new Map();
announcementStatus.set('all',[
    {value:'',text:'全部'},
    {value:'1',text:'待审核'},
    {value:'2',text:'已通过'},
    {value:'3',text:'已拒绝'}
]);
announcementStatus.set('1','待审核');
announcementStatus.set('2','已通过');
announcementStatus.set('3','已拒绝');

/**
 * 版本 状态类型枚举
 * @type {Map<any, any>}
 */
export const versionDescStatus = new Map();
versionDescStatus.set('all',[
    {value:'',text:'全部'},
    {value:'1',text:'待审核'},
    {value:'2',text:'已通过'},
    {value:'3',text:'已拒绝'}
]);
versionDescStatus.set('1','待审核');
versionDescStatus.set('2','已通过');
versionDescStatus.set('3','已拒绝');


/**
 * 常规邮件 状态类型枚举
 * @type {Map<any, any>}
 */
export const regularMailStatus = new Map();
regularMailStatus.set('all',[
    {value:'',text:'全部'},
    {value:'1',text:'待审核'},
    {value:'2',text:'已通过'},
    {value:'3',text:'已拒绝'}
]);
regularMailStatus.set('1','待审核');
regularMailStatus.set('2','已通过');
regularMailStatus.set('3','已拒绝');

/**
 * 维护预告
 * @type {Map<any, any>}
 */
export const safeguardStatus = new Map();
safeguardStatus.set('all',[
    {value:'',text:'全部'},
    {value:'1',text:'待审核'},
    {value:'2',text:'已通过'},
    {value:'3',text:'已拒绝'}
]);
safeguardStatus.set('1','待审核');
safeguardStatus.set('2','已通过');
safeguardStatus.set('3','已拒绝');

/**
 * 维护预告
 * @type {Map<any, any>}
 */
export const stopServiceStatus = new Map();
stopServiceStatus.set('all',[
    {value:'',text:'全部'},
    {value:'1',text:'待审核'},
    {value:'2',text:'已通过'},
    {value:'3',text:'已拒绝'}
]);
stopServiceStatus.set('1','待审核');
stopServiceStatus.set('2','已通过');
stopServiceStatus.set('3','已拒绝');

