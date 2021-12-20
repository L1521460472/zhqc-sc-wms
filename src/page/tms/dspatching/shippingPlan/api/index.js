/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-02 10:46:33
 */
import service from '@/utils/server'
import { VUE_APP_TMS_MODEL } from '@/api/api.config.js'
const modName = VUE_APP_TMS_MODEL + '/plan/'

// 查询方法
export const pageInfo = data => {
  return service({
    url: modName + 'planOrder/pageInfo',
    method: 'post',
    data
  })
}

// 初始化页面对象
export const initPage = data => {
  return service({
    url: modName + 'planOrder/initPage',
    method: 'post',
    data
  })
}

// 查询行方法
export const pageView = data => {
  return service({
    url: modName + 'planOrder/view/' + data,
    method: 'get'
  })
}

// 预约登记
export const add = data => {
  return service({
    url: modName + 'planAppoint/add',
    method: 'post',
    data
  })
}

// 异常报备
export const report = data => {
  return service({
    url: modName + 'planOrder/error/report',
    method: 'post',
    data
  })
}

// 取消发运
export const cancel = data => {
  return service({
    url: modName + 'planOrder/cancel',
    method: 'post',
    data
  })
}
