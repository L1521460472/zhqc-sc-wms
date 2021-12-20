import service from '@/utils/server'
import { VUE_APP_OMS_MODEL } from '@/api/api.config.js'
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
const modName = VUE_APP_OMS_MODEL + '/transport/transportOrder/'
// const modNameTms = process.env.VUE_APP_TMS_MODEL
const modNameWms = VUE_APP_WMS_MODEL

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
// 初始化更新对象
export const initUpdate = data => {
  return service({
    url: modName + 'initUpdate/' + data,
    method: 'post',
    data
  })
}

// 运输订单详情
export const initView = data => {
  return service({
    url: modName + 'view/' + data,
    method: 'get',
    data
  })
}
// 新增方法
export const saveData = data => {
  return service({
    url: modName + 'add',
    method: 'post',
    data
  })
}
// 修改方法
export const editData = data => {
  return service({
    url: modName + 'update',
    method: 'post',
    data
  })
}
// 删除方法
export const deleteData = data => {
  return service({
    url: modName + 'delete/' + data.id,
    method: 'post'
  })
}

// 批量下发
export const batchSend = data => {
  return service({
    url: modName + 'batchSend',
    method: 'post',
    data
  })
}

//  批量取消
export const batchCancel = data => {
  return service({
    url: modName + 'batchCancel',
    method: 'post',
    data
  })
}

//  批量审核
export const batchConfirm = data => {
  return service({
    url: modName + 'batchConfirm',
    method: 'post',
    data
  })
}

//  批量反审
export const batchUnConfirm = data => {
  return service({
    url: modName + 'batchUnConfirm',
    method: 'post',
    data
  })
}

//  线路匹配列表
export const lineMatchList = data => {
  return service({
    url: modName + 'lineMatchList',
    method: 'post',
    data
  })
}

//  运输订单线路匹配
export const lineMatch = data => {
  return service({
    url: modName + 'lineMatch/' + data.id,
    method: 'post',
    data
  })
}

//  线路匹配保存
export const lineMatchUpdate = data => {
  return service({
    url: modName + 'lineMatchUpdate/' + data.id,
    method: 'post',
    data
  })
}

//  线路重新匹配
export const reLineMatch = data => {
  return service({
    url: modName + 'reLineMatch',
    method: 'post',
    data
  })
}

//  运输订单列表预调度按钮
export const preDispatchAll = data => {
  return service({
    url: modName + 'preDispatchAll',
    method: 'post',
    data
  })
}

//  预调度列表
export const preDispatchList = data => {
  return service({
    url: modName + 'preDispatchList',
    method: 'post',
    data
  })
}

//  预调度匹配
export const preDispatch = data => {
  return service({
    url: modName + 'preDispatch/' + data.id,
    method: 'post',
    data
  })
}

//  预调度线路匹配保存
export const preDispatchUpdate = data => {
  return service({
    url: modName + 'preDispatchUpdate/' + data.id,
    method: 'post',
    data
  })
}

//  线路重新预调度
export const rePreDispatch = data => {
  return service({
    url: modName + 'rePreDispatch',
    method: 'post',
    data
  })
}
// 模糊查询商品资料
export const queryForTms = data => {
  return service({
    url: modNameWms + 'base/sku/sku/queryForTms',
    method: 'post',
    data
  })
}

