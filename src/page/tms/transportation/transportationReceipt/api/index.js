/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-02 11:31:25
 */
import service from '@/utils/server'
import { VUE_APP_TMS_MODEL } from '@/api/api.config.js'
const modName = VUE_APP_TMS_MODEL + '/transport/receiptOrder/'

// 查询方法
export const pageInfo = data => {
  return service({
    url: modName + 'pageInfo',
    method: 'post',
    data
  })
}

// 初始化页面对象
export const initPage = data => {
  return service({
    url: modName + 'initPage',
    method: 'post',
    data
  })
}

// 根据运输回单号-查看运输回单详情
export const initUpdateByNo = data => {
  return service({
    url: modName + 'initUpdateByNo/' + data,
    method: 'get',
    data
  })
}

// 初始化更新对象
export const initUpdate = data => {
  return service({
    url: modName + 'initUpdate/' + data,
    method: 'post',
    data
  })
}

// 签收
export const signData = data => {
  return service({
    url: modName + 'sign',
    method: 'post',
    data
  })
}
