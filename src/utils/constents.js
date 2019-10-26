/** ======================= 公告发布start======================== **/
/**
 * 公告 状态类型枚举
 * @type {Map<string, string>}
 */
export const announcementStatus = new Map();
announcementStatus.set('all',[
    {value:'',text:'全部'},
    {value:'DRAFT',text:'可编辑'},
    {value:'WAIT_AUDIT',text:'待审核'},
    {value:'WAIT_PUSH',text:'待发布'},
    {value:'REJECT',text:'已拒绝'},
    {value:'PUSHING',text:'发布中'},
    {value:'PUSH_FAIL',text:'发布失败'},
    {value:'PUSH_SUCC',text:'发布成功'},
]);
announcementStatus.set('DRAFT','可编辑');
announcementStatus.set('WAIT_AUDIT','待审核');
announcementStatus.set('WAIT_PUSH','待发布');
announcementStatus.set('REJECT','已拒绝');
announcementStatus.set('PUSHING','发布中');
announcementStatus.set('PUSH_FAIL','发布失败');
announcementStatus.set('PUSH_SUCC','发布成功');
/**
 * 模板类型
 **/
export const templateTypeMap = new Map();
templateTypeMap.set('all',[
    {value:'NOTICE_WORD',text:'文字模板'},
    {value:'NOTICE_IMG',text:'图片模板'}
]);
templateTypeMap.set('NOTICE_WORD','文字模板');
templateTypeMap.set('NOTICE_IMG','图片模板');
/**
 * 模板
 **/
export const templateMap = new Map();
templateMap.set('all',[
    {value:'1',text:'图片模板一'},
    {value:'2',text:'图片模板二'},
    {value:'3',text:'图片模板三'}
]);
templateMap.set('1','图片模板一');
templateMap.set('2','图片模板二');
templateMap.set('3','图片模板三');
/**
 * 显示按钮
 **/
export const btnMap = new Map();
btnMap.set('all',[
    {value:'1',text:'传奇商城'},
    {value:'2',text:'版本描述'},
    {value:'3',text:'battle pass'},
    {value:'4',text:'邮箱'},
    {value:'5',text:'限时商城'}
]);
btnMap.set('1','限时商城');
btnMap.set('2','传奇商城');
btnMap.set('3','battle pass');
btnMap.set('4','邮箱');
btnMap.set('5','版本描述');
/** ======================= 公告发布end ========================= **/
/**
 * 版本 状态类型枚举
 * @type {Map<string, string>}
 */
export const versionDescStatus = new Map();
versionDescStatus.set('all',[
    {value:'',text:'全部'},
    {value:'DRAFT',text:'可编辑'},
    {value:'WAIT_AUDIT',text:'待审核'},
    {value:'WAIT_PUSH',text:'待发布'},
    {value:'REJECT',text:'已拒绝'},
    {value:'PUSHING',text:'发布中'},
    {value:'PUSH_FAIL',text:'发布失败'},
    {value:'PUSH_SUCC',text:'发布成功'},
]);
versionDescStatus.set('DRAFT','可编辑');
versionDescStatus.set('WAIT_AUDIT','待审核');
versionDescStatus.set('WAIT_PUSH','待发布');
versionDescStatus.set('REJECT','已拒绝');
versionDescStatus.set('PUSHING','发布中');
versionDescStatus.set('PUSH_FAIL','发布失败');
versionDescStatus.set('PUSH_SUCC','发布成功');


/**
 * 常规邮件 状态类型枚举
 * @type {Map<string, string>}
 */
export const regularMailStatus = new Map();
regularMailStatus.set('all',[
    {value:'',text:'全部'},
    {value:'DRAFT',text:'可编辑'},
    {value:'WAIT_AUDIT',text:'待审核'},
    {value:'WAIT_PUSH',text:'待发布'},
    {value:'REJECT',text:'已拒绝'},
    {value:'PUSHING',text:'发布中'},
    {value:'PUSH_FAIL',text:'发布失败'},
    {value:'PUSH_SUCC',text:'发布成功'},
]);
regularMailStatus.set('DRAFT','可编辑');
regularMailStatus.set('WAIT_AUDIT','待审核');
regularMailStatus.set('WAIT_PUSH','待发布');
regularMailStatus.set('REJECT','已拒绝');
regularMailStatus.set('PUSHING','发布中');
regularMailStatus.set('PUSH_FAIL','发布失败');
regularMailStatus.set('PUSH_SUCC','发布成功');

/**
 * 常规邮件 发布群体
 * @type {Map<string, string>}
 */
export const publishGroupMap = new Map();
publishGroupMap.set('all',[
    {value:'ALL',text:'全服'},
    {value:'PART',text:'指定用户'},
]);
publishGroupMap.set('ALL','全服');
publishGroupMap.set('PART','指定用户');

/**
 * 维护预告
 * @type {Map<string, string>}
 */
export const maintenanceNoticeStatus = new Map();
maintenanceNoticeStatus.set('all',[
    {value:'',text:'全部'},
    {value:'DRAFT',text:'可编辑'},
    {value:'WAIT_AUDIT',text:'待审核'},
    {value:'WAIT_PUSH',text:'待发布'},
    {value:'REJECT',text:'已拒绝'},
    {value:'PUSHING',text:'发布中'},
    {value:'PUSH_FAIL',text:'发布失败'},
    {value:'PUSH_SUCC',text:'发布成功'},
]);
maintenanceNoticeStatus.set('DRAFT','可编辑');
maintenanceNoticeStatus.set('WAIT_AUDIT','待审核');
maintenanceNoticeStatus.set('WAIT_PUSH','待发布');
maintenanceNoticeStatus.set('REJECT','已拒绝');
maintenanceNoticeStatus.set('PUSHING','发布中');
maintenanceNoticeStatus.set('PUSH_FAIL','发布失败');
maintenanceNoticeStatus.set('PUSH_SUCC','发布成功');

/**
* 限时商城广告 状态类型枚举
* @type {Map<string, string>}
*/
export const limitedMallAdStatus = new Map();
limitedMallAdStatus.set('all',[
    {value:'',text:'全部'},
    {value:'DRAFT',text:'可编辑'},
    {value:'WAIT_AUDIT',text:'待审核'},
    {value:'WAIT_PUSH',text:'待发布'},
    {value:'REJECT',text:'已拒绝'},
    {value:'PUSHING',text:'发布中'},
    {value:'PUSH_FAIL',text:'发布失败'},
    {value:'PUSH_SUCC',text:'发布成功'},
]);
limitedMallAdStatus.set('DRAFT','可编辑');
limitedMallAdStatus.set('WAIT_AUDIT','待审核');
limitedMallAdStatus.set('WAIT_PUSH','待发布');
limitedMallAdStatus.set('REJECT','已拒绝');
limitedMallAdStatus.set('PUSHING','发布中');
limitedMallAdStatus.set('PUSH_FAIL','发布失败');
limitedMallAdStatus.set('PUSH_SUCC','发布成功');

/**
* 限时商城广告 广告类型枚举
* @type {Map<string, string>}
*/
export const limitedMallAdTypeMap = new Map();
limitedMallAdTypeMap.set('all',[
    {value:'1',text:'广告样式一'},
    {value:'2',text:'广告样式二'},
    {value:'3',text:'广告样式三'}
]);
limitedMallAdTypeMap.set('1','广告样式一');
limitedMallAdTypeMap.set('2','广告样式二');
limitedMallAdTypeMap.set('3','广告样式三');


/**
 * 传奇商城广告 状态类型枚举
 * @type {Map<string, string>}
 */
export const legendMallAdStatus = new Map();
legendMallAdStatus.set('all',[
    {value:'',text:'全部'},
    {value:'DRAFT',text:'可编辑'},
    {value:'WAIT_AUDIT',text:'待审核'},
    {value:'WAIT_PUSH',text:'待发布'},
    {value:'REJECT',text:'已拒绝'},
    {value:'PUSHING',text:'发布中'},
    {value:'PUSH_FAIL',text:'发布失败'},
    {value:'PUSH_SUCC',text:'发布成功'},
]);
legendMallAdStatus.set('DRAFT','可编辑');
legendMallAdStatus.set('WAIT_AUDIT','待审核');
legendMallAdStatus.set('WAIT_PUSH','待发布');
legendMallAdStatus.set('REJECT','已拒绝');
legendMallAdStatus.set('PUSHING','发布中');
legendMallAdStatus.set('PUSH_FAIL','发布失败');
legendMallAdStatus.set('PUSH_SUCC','发布成功');

/**
* 传奇商城广告 广告类型枚举
* @type {Map<string, string>}
*/
export const legendMallAdTypeMap = new Map();
legendMallAdTypeMap.set('all',[
    {value:'1',text:'广告样式一'}
]);
legendMallAdTypeMap.set('1','广告样式一');


/**
* battlepass商城广告 广告类型枚举
* @type {Map<string, string>}
*/
export const battlepassAdTypeMap = new Map();
battlepassAdTypeMap.set('all',[
    {value:'1',text:'广告样式一'}
]);
battlepassAdTypeMap.set('1','广告样式一');

/**
 * battlepass商城广告 状态类型枚举
 * @type {Map<string, string>}
 */
export const battlepassMallAdStatus = new Map();
battlepassMallAdStatus.set('all',[
    {value:'',text:'全部'},
    {value:'DRAFT',text:'可编辑'},
    {value:'WAIT_AUDIT',text:'待审核'},
    {value:'WAIT_PUSH',text:'待发布'},
    {value:'REJECT',text:'已拒绝'},
    {value:'PUSHING',text:'发布中'},
    {value:'PUSH_FAIL',text:'发布失败'},
    {value:'PUSH_SUCC',text:'发布成功'},
]);
battlepassMallAdStatus.set('DRAFT','可编辑');
battlepassMallAdStatus.set('WAIT_AUDIT','待审核');
battlepassMallAdStatus.set('WAIT_PUSH','待发布');
battlepassMallAdStatus.set('REJECT','已拒绝');
battlepassMallAdStatus.set('PUSHING','发布中');
battlepassMallAdStatus.set('PUSH_FAIL','发布失败');
battlepassMallAdStatus.set('PUSH_SUCC','发布成功');

/**
 * 停服提示
 * @type {Map<string, string>}
 */
export const stopServiceStatus = new Map();
stopServiceStatus.set('all',[
    {value:'',text:'全部'},
    {value:'DRAFT',text:'可编辑'},
    {value:'WAIT_AUDIT',text:'待审核'},
    {value:'WAIT_PUSH',text:'待发布'},
    {value:'REJECT',text:'已拒绝'},
    {value:'PUSHING',text:'发布中'},
    {value:'PUSH_FAIL',text:'发布失败'},
    {value:'PUSH_SUCC',text:'发布成功'},
]);
stopServiceStatus.set('DRAFT','可编辑');
stopServiceStatus.set('WAIT_AUDIT','待审核');
stopServiceStatus.set('WAIT_PUSH','待发布');
stopServiceStatus.set('REJECT','已拒绝');
stopServiceStatus.set('PUSHING','发布中');
stopServiceStatus.set('PUSH_FAIL','发布失败');
stopServiceStatus.set('PUSH_SUCC','发布成功');

/**
 * 事件类型
 * @type {Map<string, string>}
 */
export const eventTypeMap = new Map();
eventTypeMap.set('all',[
    {value:'',text:'全部'},
    {value:'NOTICE_WORD',text:'公告发布-文字'},
    {value:'NOTICE_IMG',text:'公告发布-图片'},
    {value:'VER_DESC',text:'版本描述'},
    {value:'MAINT_NOTICE',text:'维护预告'},
    {value:'STOP_NOTICE',text:'停服提示'},
    {value:'MAIL_PLAN',text:'常规邮件/补偿'},
    {value:'BATTLE_AD',text:'battlepass商城广告'},
    {value:'LEGEND_AD',text:'传奇商城广告'},
    {value:'FIX_TIME_AD',text:'限时商城广告'},
]);
eventTypeMap.set('NOTICE_WORD','公告发布-文字');
eventTypeMap.set('NOTICE_IMG','公告发布-图片');
eventTypeMap.set('VER_DESC','版本描述');
eventTypeMap.set('MAINT_NOTICE','维护预告');
eventTypeMap.set('STOP_NOTICE','停服提示');
eventTypeMap.set('MAIL_PLAN','常规邮件/补偿');
eventTypeMap.set('BATTLE_AD','battlepass商城广告');
eventTypeMap.set('LEGEND_AD','传奇商城广告');
eventTypeMap.set('FIX_TIME_AD','限时商城广告');

