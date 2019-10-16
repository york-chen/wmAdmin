// ---------------------------------------------------
// #filter过滤器
// #tools.js同步实现filter
// ---------------------------------------------------
import dayjs from 'dayjs'

export default Vue => {
  Vue.filter('formatDate', (val, type) => {
    switch (type) {
      case '/':
        return dayjs(val).format('YYYY/M/D HH:mm:ss')
      case '.':
        return dayjs(val).format('YYYY.MM.DD HH:mm:ss')
      case 'zh':
        return dayjs(val).format('YYYY年MM月DD日')
      case 'YMD':
        return dayjs(val).format('YYYY-MM-DD')
      case 'MD':
        return dayjs(val).format('MM-DD')
      case 'Y/M/D':
        return dayjs(val).format('YYYY/MM/DD')
      default:
        return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
    }
  })

  Vue.filter('formatPattern', (str, type) => {
    if (type === 'id') {
      const reg1 = new RegExp(/(.{6}).+(.{4})/g)
      return str.replace(reg1, '$1********$2')
    } else if (type === 'tel') {
      const reg2 = new RegExp(/(.{3}).+(.{4})/g)
      return str.replace(reg2, '$1****$2')
    } else if (type === 'email') {
      const reg4 = new RegExp(/(.{2}).+(.{2}@.+)/g)
      return str.replace(reg4, '$1****$2')
    } else {
      const regAll = new RegExp(/(.{3}).+(.{3})/g)
      return str.replace(regAll, '$1****$2')
    }
  })

  Vue.filter('formatLoginType', type => {
    switch (type) {
      case 'bank':
        return '金融机构'
      case 'sip':
        return '园区管理'
      case 'ent':
        return '企业'
    }
  })

  Vue.filter('formatCreditScore', num => {
    let score = Number(num)

    if (score < 640) {
      return 'R3'
    } else if (score < 700) {
      return 'R2'
    } else {
      return 'R1'
    }
  })

  Vue.filter('formatApplyStatus', type => {
    switch (type) {
      case 'pending':
        return '等待初审'
      case 'passed':
        return '审核通过'
      case 'reject':
        return '审核拒绝'
      case 'finished':
        return '已完成'
      case 'supplement':
        return '补充材料'
      case 'review':
        return '等待复审'
      default:
        return '提交申请'
    }
  })

  Vue.filter('formatProductStatus', val => {
    switch (val) {
      case 'draft':
        return '草稿'
      case 'online':
        return '上架'
      case 'offline':
        return '下架'
      default:
        return '-'
    }
  })

  Vue.filter('formatPrice', val => {
    return ((val * 100) / 10000).toFixed(2)
  })

  /**
   * 将小写转为大写
   */
  Vue.filter('lowercaseToUppercase', val => {
    return val.toUpperCase()
  })

  /**
   * 目标类型
   */
  Vue.filter('targetType', val => {
    switch (val) {
      case 'personal':
        return '个人用户'
      case 'finance':
        return '金融机构用户'
      case 'enterprise':
        return '企业用户'
      case 'park':
        return '园区用户'
    }
  })

  /**
   * 消息类型
   */
  Vue.filter('messageType', val => {
    switch (val) {
      case 'notify':
        return '重要通知'
      case 'system':
        return '系统消息'
      case 'marketing':
        return '推荐信息'
    }
  })

  /**
   * 根据金额大小转变单位
   */
  Vue.filter('priceToBillionValue', val => {
    if (Number(val) > 9999) {
      return (val / 10000).toFixed(1)
    } else {
      return val
    }
  })

  Vue.filter('priceToRatio', (amount, capital) => {
    amount = amount || 0
    amount = parseInt(amount)
    amount = amount > 9999 ? amount : amount * 10000
    capital = parseInt(capital) * 1000
    const rate = (amount / capital) * 100 + '%'
    return rate
  })
}
