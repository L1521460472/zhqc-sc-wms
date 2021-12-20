import service from '@/utils/server'
import { VUE_APP_TMS_MODEL } from '@/api/api.config.js'
const modName = VUE_APP_TMS_MODEL + '/transport/transportOrder/'
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

// 根据运输单号-查看运输单详情
export const initUpdateByNo = data => {
  return service({
    url: modName + 'initUpdateByNo/' + data,
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
// 行程信息
export const queryTransportTripList = data => {
  return service({
    url: modName + 'queryTransportTripList/' + data,
    method: 'get',
    data
  })
}
// 商品信息
export const queryTransportItemList = data => {
  return service({
    url: modName + 'queryTransportItemList/' + data,
    method: 'get',
    data
  })
}
// 路由信息
export const queryTransportRouteList = data => {
  return service({
    url: modName + 'queryTransportRouteList/' + data,
    method: 'get',
    data
  })
}

// 删除路由信息
export const delTransportRouteInfo = data => {
  return service({
    url: modName + 'delTransportRouteInfo/' + data.id,
    method: 'get'
  })
}
// 操作信息
export const queryTransportLogList = data => {
  return service({
    url: modName + 'queryTransportLogList/' + data,
    method: 'get',
    data
  })
}
// 计划信息
export const queryPlanList = data => {
  return service({
    url: modName + 'queryPlanList/' + data,
    method: 'get',
    data
  })
}
// 改派信息
export const getTransportTripInfo = data => {
  return service({
    url: modName + 'getTransportTripInfo/' + data,
    method: 'get',
    data
  })
}

// 保存路由维护
export const updateTransportRoute = data => {
  return service({
    url: modName + 'updateTransportRoute',
    method: 'post',
    data

  })
}
// 改派信息保存
export const updateTransportTripInfo = data => {
  return service({
    url: modName + 'updateTransportTripInfo',
    method: 'post',
    data
  })
}
// 异常报备
export const errReportTransportOrder = data => {
  return service({
    url: modName + 'errReportTransportOrder',
    method: 'post',
    data
  })
}
// 取消
export const cancelTransportOrder = data => {
  return service({
    url: modName + 'cancelTransportOrder',
    method: 'post',
    data
  })
}

// 路由维护获取运输状态
export const queryTransportStatusByRoute = () => {
  return service({
    url: modName + 'queryTransportStatusByRoute',
    method: 'get'

  })
}
