/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-02 11:08:28
 */
import service from '@/utils/server'
import { VUE_APP_TMS_MODEL } from '@/api/api.config.js'
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
const modName = VUE_APP_TMS_MODEL + '/plan/planOrder/'
const skuName = VUE_APP_WMS_MODEL + '/base/sku/'

// 查询方法
export const pageInfo = data => {
  return service({
    url: modName + 'await/dispatch',
    method: 'post',
    data
  })
}

// 初始化页面对象
export const initPage = () => {
  return service({
    url: modName + 'init/dispatch',
    method: 'get'
  })
}

// 查询
export const findDispatch = data => {
  return service({
    url: modName + 'dispatch/find',
    method: 'post',
    data
  })
}

// 加入调度
export const addDispatch = data => {
  return service({
    url: modName + 'add/dispatch',
    method: 'post',
    data
  })
}

// 取消调度
export const cancelDispatch = data => {
  return service({
    url: modName + 'cancel/dispatch/' + data,
    method: 'get'
  })
}

// 移除
export const removeDispatch = data => {
  return service({
    url: modName + 'remove/dispatch/' + data,
    method: 'get'
  })
}

// 追加配置
export const addAssignment = data => {
  return service({
    url: modName + 'add/assignment',
    method: 'post',
    data
  })
}

// 保存配置
export const saveAssignment = data => {
  return service({
    url: modName + 'save/assignment',
    method: 'post',
    data
  })
}

// 修改调度明细
export const updateDispatch = data => {
  return service({
    url: modName + 'dispatch/update',
    method: 'post',
    data
  })
}

// 查询运输工具
export const getTransportTool = data => {
  return service({
    url: modName + 'transport/tool/' + data,
    method: 'get'
  })
}

// 查询商品信息
export const getSkuInfo = data => {
  return service({
    url: skuName + 'sku/queryForTms?skuInfo=' + data,
    method: 'post'
  })
}
