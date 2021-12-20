/**
 * Created by jiachenpan on 16/11/18.
 */

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}
/**
 * 获取当前日期、几天前(-)或几天后(+)
 * */
export function getDateString(index) {
  const newDate = new Date()
  const minutes = newDate.getTime() + 1000 * 60 * 60 * 24 * parseInt(index)
  newDate.setTime(minutes)// 新日期
  const year = newDate.getFullYear()// 年（2018）
  const month = (newDate.getMonth() + 1) >= 10 ? newDate.getMonth() + 1 : '0' + (newDate.getMonth() + 1)// 月
  const day = newDate.getDate() >= 10 ? newDate.getDate() : '0' + newDate.getDate()// 日
  return year + '-' + month + '-' + day// 返回yyyy-MM-dd格式的日期，例：2018-04-20
}
// 格式化时间
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 *get getByteLen
 * @param {Sting} val input value
 * @returns {number} output value
 */
export function getByteLen(val) {
  let len = 0
  for (let i = 0; i < val.length; i++) {
    if (val[i].match(/[^\x00-\xff]/gi) != null) {
      len += 1
    } else {
      len += 0.5
    }
  }
  return Math.floor(len)
}

export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  )
}

export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function objectMerge(target, source) {
  /* Merges two  objects,
     giving the last one precedence */

  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

export const pickerOptions = [
  {
    text: '今天',
    onClick(picker) {
      const end = new Date()
      const start = new Date(new Date().toDateString())
      end.setTime(start.getTime())
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近一周',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }
]

export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

export function calcStatusFilter(value) {
  if (value.calcStatus === 1) {
    return '计算失败'
  } else if (value.calcStatus === 2) {
    return '计算成功  '
  }
  return '未计算'
}

// 审核状态
export function docStatusFilter(value) {
  switch (value.docStatus) {
    case 1 : return '已审核'
    case 2 : return '已生成账单'
  }
  return '未审核'
}
// 自定义fixed函数
function numToFixed(value, length) {
  var carry = 0 // 存放进位标志
  var num, multiple // num为原浮点数放大multiple倍后的数，multiple为10的length次方
  var str = value + '' // 将调用该方法的数字转为字符串

  var dot = str.indexOf('.') // 找到小数点的位置
  if (dot !== -1) {
    if (str.slice(dot + length + 1, dot + length + 2) >= 5) carry = 1 /* 找到要进行舍入的数的位置，手动判断是否大于等于5，满足条件进位标志置为1,这里原作者用的是str.substr(dot + length + 1, 1)*/
  }
  multiple = Math.pow(10, length) // 设置浮点数要扩大的倍数
  num = Math.round((parseFloat(value) * multiple)) + carry // 去掉舍入位后的所有数，然后加上我们的手动进位数
  var result = num / multiple + '' // 将进位后的整数再缩小为原浮点数
  /*
  * 处理进位后无小数
  */
  dot = result.indexOf('.')
  if (dot === -1) {
    result += '.'
    dot = result.indexOf('.')
  }
  /*
  * 处理多次进位
  */
  var len = result.length - (dot + 1)
  if (len < length) {
    for (var i = 0; i < length - len; i++) {
      result += 0
    }
  }
  return result
}
// 金额保留位数，四舍五入
const moneyLength = 2
// 费用保留位数
const feeLength = 4
export function recLoadPriceFilter(value) {
  if (value.recLoadPrice != null) {
    const realVal = numToFixed(value.recLoadPrice, moneyLength)
    return realVal
  }
  return ''
}

export function payLoadPriceFilter(value) {
  if (value.payLoadPrice != null) {
    const realVal = numToFixed(value.payLoadPrice, moneyLength)
    return realVal
  }
  return ''
}
export function recUnloadPriceFilter(value) {
  if (value.recUnloadPrice != null) {
    const realVal = numToFixed(value.recUnloadPrice, moneyLength)
    return realVal
  }
  return ''
}
export function payUnloadPriceFilter(value) {
  if (value.payUnloadPrice != null) {
    const realVal = numToFixed(value.payUnloadPrice, moneyLength)
    return realVal
  }
  return ''
}

export function payPriceFilter(value) {
  if (value.payPrice != null) {
    const realVal = numToFixed(value.payPrice, feeLength)
    return realVal
  }
  return ''
}

export function recPriceFilter(value) {
  if (value.recPrice != null) {
    const realVal = numToFixed(value.recPrice, feeLength)
    return realVal
  }
  return ''
}

export function uniUnloadPriceFilter(value) {
  if (value.uniUnloadPrice != null) {
    const realVal = numToFixed(value.uniUnloadPrice, feeLength)
    return realVal
  }
  return ''
}
export function appUnloadPriceFilter(value) {
  if (value.appUnloadPrice != null) {
    const realVal = numToFixed(value.appUnloadPrice, feeLength)
    return realVal
  }
  return ''
}

export function pickUpPriceFilter(value) {
  if (value.pickUpPrice != null) {
    const realVal = numToFixed(value.pickUpPrice, feeLength)
    return realVal
  }
  return ''
}

export function deliveryPriceFilter(value) {
  if (value.deliveryPrice != null) {
    const realVal = numToFixed(value.deliveryPrice, feeLength)
    return realVal
  }
  return ''
}

export function loadPriceFilter(value) {
  if (value.loadPrice != null) {
    const realVal = numToFixed(value.loadPrice, feeLength)
    return realVal
  }
  return ''
}

export function payTransPriceFilter(value) {
  if (value.payTransPrice != null) {
    const realVal = numToFixed(value.payTransPrice, feeLength)
    return realVal
  }
  return ''
}

export function payTransFeeFilter(value) {
  if (value.payTransFee != null) {
    const realVal = numToFixed(value.payTransFee, feeLength)
    return realVal
  }
  return ''
}

export function diffFeeFilter(value) {
  if (value.diffFee != null) {
    const realVal = numToFixed(value.diffFee, feeLength)
    return realVal
  }
  return ''
}

export function payUniUnloadPriceFilter(value) {
  if (value.payUniUnloadPrice != null) {
    const realVal = numToFixed(value.payUniUnloadPrice, feeLength)
    return realVal
  }
  return ''
}

export function payAppUnloadPriceFilter(value) {
  if (value.payAppUnloadPrice != null) {
    const realVal = numToFixed(value.payAppUnloadPrice, feeLength)
    return realVal
  }
  return ''
}

export function payAdditionFeeFilter(value) {
  if (value.payAdditionFee != null) {
    const realVal = numToFixed(value.payAdditionFee, 2)
    return realVal
  }
  return ''
} export function payDeductionFeeFilter(value) {
  if (value.payDeductionFee != null) {
    const realVal = numToFixed(value.payDeductionFee, 2)
    return realVal
  }
  return ''
}
export function payTotalFilter(value) {
  if (value.payTotal != null) {
    const realVal = numToFixed(value.payTotal, 2)
    return realVal
  }
  return ''
}
export function recTotalFilter(value) {
  if (value.recTotal != null) {
    const realVal = numToFixed(value.recTotal, 2)
    return realVal
  }
  return ''
}
export function profitFilter(value) {
  if (value.profit != null) {
    const realVal = numToFixed(value.profit, 2)
    return realVal
  }
  return ''
}
const wtLength = 4
// 订单重量保留4位小数
export function orderWtFilter(value) {
  if (value.orderWt != null) {
    const realVal = numToFixed(value.orderWt, wtLength)
    return realVal
  }
  return ''
}
// 实发重量保留4位小数
export function actWtFilter(value) {
  if (value.actWt != null) {
    const realVal = numToFixed(value.actWt, wtLength)
    return realVal
  }
  return ''
}
// 实收重量保留4位小数
export function arrWtFilter(value) {
  if (value.arrWt != null) {
    const realVal = numToFixed(value.arrWt, wtLength)
    return realVal
  }
  return ''
}

export function setBillFormatRecTotal(value) {
  if (value.recTotal != null) {
    const tempVal = parseFloat(value.recTotal).toFixed(2)
    return tempVal
  } else {
    return null
  }
}

export function setBillFormatPayTotal(value) {
  if (value.payTotal != null) {
    const tempVal = parseFloat(value.payTotal).toFixed(2)
    return tempVal
  } else {
    return null
  }
}

export function setWhFeeFormatRecTotal(value) {
  if (value.recTotal != null) {
    const tempVal = parseFloat(value.recTotal).toFixed(2)
    return tempVal
  } else {
    return null
  }
}

export function setWhFeeFormatPayTotal(value) {
  if (value.payTotal != null) {
    const tempVal = parseFloat(value.payTotal).toFixed(2)
    return tempVal
  } else {
    return null
  }
}
// /////////////////////////////

export function setWhFeeFormatRecTotalRent(value) {
  if (value.recTotalRent != null) {
    const tempVal = parseFloat(value.recTotalRent).toFixed(2)
    return tempVal
  } else {
    return null
  }
}
export function setWhFeeFormatRecTotalWt(value) {
  if (value.recTotalWt != null) {
    const tempVal = parseFloat(value.recTotalWt).toFixed(2)
    return tempVal
  } else {
    return null
  }
}
export function setWhFeeFormatPayTotalRent(value) {
  if (value.payTotalRent != null) {
    const tempVal = parseFloat(value.payTotalRent).toFixed(2)
    return tempVal
  } else {
    return null
  }
}
export function setWhFeeFormatPayTotalWt(value) {
  if (value.payTotalWt != null) {
    const tempVal = parseFloat(value.payTotalWt).toFixed(2)
    return tempVal
  } else {
    return null
  }
}

export function setWhFeeFormatAdjPayTotalRent(value) {
  if (value.adjPayTotal != null) {
    const tempVal = parseFloat(value.adjPayTotal).toFixed(2)
    return tempVal
  } else {
    return null
  }
}

export function setWhFeeFormatAdjRecTotalRent(value) {
  if (value.adjRecTotal != null) {
    const tempVal = parseFloat(value.adjRecTotal).toFixed(2)
    return tempVal
  } else {
    return null
  }
}
// /////////////////////////////////////////////
/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}
export function formatDocStatus(value) {
  switch (value.docStatus) {
    case 0:
      return '未审核'
    case 1:
      return '已审核'
    case 2:
      return '已生成账单'
  }
}

//
/**
 * 设置查询条件的页码和记录数
 * @param pageRequest 分页对象
 * @param queryVo     查询对象
 */
export const setPageLimit = (pageRequest, queryVo) => {
  const firstPage = 1
  pageRequest.page = firstPage
  queryVo.page = firstPage
  queryVo.limit = pageRequest.limit
}
//
export const setPageChange = (val, pageRequest, queryVo) => {
  pageRequest.page = val.page
  pageRequest.limit = val.limit
  queryVo.page = val.page
  queryVo.limit = val.limit
}
/**
 * 设置明细查询条件的页码和记录数
 * @param pageRequest 分页对象
 * @param queryVo     查询对象
 */
export const setPageLimitDt = (pageRequest, queryVo) => {
  const firstPage = 1
  pageRequest.page = firstPage
  queryVo.page = firstPage
  queryVo.limit = pageRequest.limit
}
//
export const setPageChangeDt = (val, pageRequest, queryVo) => {
  pageRequest.page = val.page
  pageRequest.limit = val.limit
  queryVo.page = val.page
  queryVo.limit = val.limit
}

export const setEditPageChange = (val, pageRequest, queryVo) => {
  pageRequest.page = val.currentPage
  pageRequest.limit = val.pageSize
  queryVo.page = val.currentPage
  queryVo.limit = val.pageSize
}

//
export const unique = (arr) => {
  if (!Array.isArray(arr)) {
    console.log('type error!')
    return
  }
  var array = []
  for (var i = 0; i < arr.length; i++) {
    if (array.indexOf(arr[i]) === -1) {
      array.push(arr[i])
    }
  }
  return array
}
