// ---------------------------------------------------
// #使用函数实现Vue.filter过滤器
// #可直接调用
// #import { formatLoginType } from '@/libs/tools'
// ---------------------------------------------------
import dayjs from 'dayjs'

/**
 * [formatDate 格式化时间]
 */
export const formatDate = (val, type) => {
  switch (type) {
    case '/':
      return dayjs(val).format('YYYY/M/D HH:mm:ss')
    case '.':
      return dayjs(val).format('YYYY.MM.DD HH:mm:ss')
    case 'zh':
      return dayjs(val).format('YYYY年MM月DD日 HH:mm:ss')
    case 'YMD':
      return dayjs(val).format('YYYY-MM-DD')
    case 'MD':
      return dayjs(val).format('MM-DD')
    default:
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
  }
}

/**
 * [formatChangeChart 对比字符串变更前后]
 * @param {String} type     获取的类型 type: source 对比前的，type: target 对比后的，
 */
export const formatChangeChart = (source, target, type) => {
  let src = '',
    trg = ''

  // 变更前的数据 src
  for (let i = 0; i < source.length; i++) {
    let flag = true
    for (let j = 0; j < target.length; j++) {
      if (source[i] == target[j]) {
        flag = false
        break
      }
    }
    if (flag) {
      src += `<span style="text-decoration: line-through; color: #aaa; text-decoration-color: #ff3b30">${
        source[i]
      }</span>`
    } else {
      src += source[i]
    }
  }

  // 变更后的数据 trg
  for (let i = 0; i < target.length; i++) {
    let flag = true
    for (let j = 0; j < source.length; j++) {
      if (target[i] == source[j]) {
        flag = false
        break
      }
    }
    if (flag) {
      trg += `<span style="color: #ff3b30">${target[i]}</span>`
    } else {
      trg += target[i]
    }
  }
  return type === 'source' ? src : trg
}
