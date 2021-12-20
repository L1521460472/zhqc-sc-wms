import service from '@/utils/server'
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
const modName = VUE_APP_WMS_MODEL + '/print/express/'

// 初始化页面对象
export const initPage = data => {
  return service({
    url: modName + 'initPage',
    method: 'post',
    data
  })
}

// 查询方法
export const pageInfo = data => {
  return service({
    url: modName + 'pageInfo',
    method: 'post',
    data
  })
}

// 打印
export const print = data => {
  return service({
    url: modName + 'print',
    method: 'post',
    data
  })
}

// 下单打印
export const expressOrder = data => {
  return service({
    url: modName + 'expressOrder',
    method: 'post',
    data
  })
}

// 快递运输单取消
export const cancel = data => {
  return service({
    url: modName + 'cancel',
    method: 'post',
    data
  })
}

