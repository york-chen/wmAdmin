import Cookies from 'js-cookie'
import router from '@/routes'
import config from '@/config'

/**
 * [记住账户和密码]
 * @return
 */
export const rememberUserInfo = data => {
  if (data.checked) {
    Cookies.set(
      'jnbUserInfo',
      JSON.stringify({
        mobile: data.mobile,
        password: data.password
      }),
      { expires: config.cookieExpires }
    )
  } else {
    Cookies.remove('jnbUserInfo')
  }
}

/**
 * [获取账户和密码]
 * @return
 */
export const getUserInfo = () => {
  let userInfo = Cookies.get('jnbUserInfo') || '{}'

  return JSON.parse(userInfo)
}

/**
 * 根据用户输入的Email跳转到相应的邮箱登录页面
 * @param {String} email 传入邮箱
 * @returns {Boolean}
 */
export const toEmailHash = email => {
  const mails = email.split('@')[1]
  const hash = {
    'qq.com': 'https://mail.qq.com',
    'gmail.com': 'https://mail.google.com',
    'sina.cn': 'https://mail.sina.com.cn',
    'sina.com': 'https://mail.sina.com.cn',
    '163.com': 'https://mail.163.com',
    '126.com': 'https://mail.126.com',
    'yeah.net': 'https://www.yeah.net/',
    'sohu.com': 'https://mail.sohu.com/',
    'tom.com': 'https://mail.tom.com/',
    'sogou.com': 'https://mail.sogou.com/',
    '139.com': 'https://mail.10086.cn/',
    'hotmail.com': 'https://www.hotmail.com',
    'live.com': 'https://login.live.com/',
    'live.cn': 'https://login.live.cn/',
    'live.com.cn': 'https://login.live.com.cn',
    '189.com': 'https://webmail16.189.cn/webmail/',
    'yahoo.com.cn': 'https://mail.cn.yahoo.com/',
    'yahoo.cn': 'https://mail.cn.yahoo.com/',
    'eyou.com': 'https://www.eyou.com/',
    '21cn.com': 'https://mail.21cn.com/',
    '188.com': 'https://www.188.com/',
    'foxmail.coom': 'https://www.foxmail.com'
  }
  return hash[mails]
}

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = url => {
  const keyValueArr = url.split('?')[1].split('&')
  let paramObj = {}
  keyValueArr.forEach(item => {
    const keyValue = item.split('=')
    paramObj[keyValue[0]] = keyValue[1]
  })
  return paramObj
}

/**
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */
export const doCustomTimes = (times, callback) => {
  let i = -1
  while (++i < times) {
    callback(i)
  }
}

/**
 * 替换url路由参数
 * 没有则添加，有则替换
 * @param {String} key 添加参数的key
 * @param {String} value 添加参数的val
 */
export const replaceUrlParam = (key, value = '') => {
  const query = Object.assign({}, router.history.current.query)
  const isHave = Object.keys(query).findIndex(item => item === key)

  if (isHave > -1) {
    for (let k in query) {
      k === key && (query[k] = value)
    }
  } else {
    query[key] = value
  }
  return query
}

/**
 * 数组对象去重
 * @param {Array} json 数组
 * @param {String} key 对象的key标识，通过标识去重
 * @returns {Array}
 */
export const reduceArray = (json, key = 'id') => {
  let hash = {}

  const newArr = json.reduceRight((item, next) => {
    hash[next[key]] ? '' : (hash[next[key]] = true && item.push(next))
    return item
  }, [])
  return newArr
}

/**
 * 合并数组对象中相同的key值
 * @param {Array} arr  源数组对象
 * @param {String} refer 用于合并参考相同的key
 * @param {String} key 需要执行合并的key
 * @returns {Array}
 */
export const mergeArray = (arr, refer, key) => {
  let hash = {},
    i = 0,
    res = []

  arr.forEach(item => {
    var name = item[refer]
    hash[name]
      ? res[hash[name] - 1][key].push(item[key])
      : (hash[name] =
          ++i &&
          res.push({
            ...item,
            [key]: [item[key]],
            [refer]: name
          }))
  })
  return res
}

/**
 * 移除数组中的指定项
 * @param {Array} arr 数组
 * @param {Item} item 要移除的项
 * @returns {Array}
 */
export const removeArray = (arr, item) => {
  const index = arr.indexOf(item)

  if (index > -1) {
    arr.splice(index, 1)
  }
  return arr
}

/**
 * 查找当前值在数组内的下标
 * @param {Array} arr 数组
 * @param {Item} item 要查找的选项
 * @param {String} item.key 选项的对象key
 * @returns {Number} 下标
 */
export const findArrayIndex = (arr, item, key) => {
  return arr.findIndex(val => {
    if (typeof key === 'string') {
      return val[key] === item
    } else {
      return val === item
    }
  })
}

/**
 * @param {Number} timeStamp 判断时间戳格式是否是毫秒
 * @returns {Boolean}
 */
export const isMillisecond = timeStamp => {
  const timeStr = String(timeStamp)
  return timeStr.length > 10
}

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} currentTime 当前时间时间戳
 * @returns {Boolean} 传入的时间戳是否早于当前时间戳
 */
export const isEarly = (timeStamp, currentTime) => {
  return timeStamp < currentTime
}

/**
 * @param {Number} num 数值
 * @returns {String} 处理后的字符串
 * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
 */
export const getHandledValue = num => {
  return num < 10 ? '0' + num : num
}

/**
 * @returns {String} 当前浏览器名称
 */
export const getExplorer = () => {
  const ua = window.navigator.userAgent
  const isExplorer = exp => {
    return ua.indexOf(exp) > -1
  }
  if (isExplorer('MSIE')) return 'IE'
  else if (isExplorer('Firefox')) return 'Firefox'
  else if (isExplorer('Chrome')) return 'Chrome'
  else if (isExplorer('Opera')) return 'Opera'
  else if (isExplorer('Safari')) return 'Safari'
}

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function() {
  if (document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function() {
  if (document.removeEventListener) {
    return function(element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function(element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()
