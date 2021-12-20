import service from '@/utils/server'
import { VUE_APP_OMS_MODEL } from '@/api/api.config.js'
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
const modName = VUE_APP_OMS_MODEL + '/order/outOrder/'
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
// 生成SO
export const createSo = data => {
  return service({
    url: VUE_APP_OMS_MODEL + '/order/outOrder/outOrder/' + data.id,
    method: 'post'
  })
}

// 查看界面 店铺名称  id转为value
export const viewStoreName = data => {
  return service({
    url: VUE_APP_WMS_MODEL + '/base/partner/store/initUpdate/' + data,
    method: 'post'
  })
}

// 查看界面 收货方  id转为value
export const viewConsignee = data => {
  return service({
    url: VUE_APP_WMS_MODEL + '/base/wh/wh/queryByKey/' + data,
    method: 'post'
  })
}

// 查看界面 承运商名称  id转为value
export const viewPartnerName = data => {
  return service({
    url: VUE_APP_WMS_MODEL + '/carrier/carrier/selectCarrierInfo',
    method: 'post',
    data
  })
}

// 查看界面 快递商名称  id转为value
export const viewCourierName = data => {
  return service({
    url: VUE_APP_WMS_MODEL + '/base/partner/partner/queryPartnerCbList',
    method: 'post',
    data
  })
}

// 取消订单
export const cancel = data => {
  return service({
    url: modName + 'cancel',
    method: 'post',
    data
  })
}

// 批量下发
export const batchSend = data => {
  return service({
    url: modName + 'batchCreateSo',
    method: 'post',
    data
  })
}

// 面单异常信息统计
export const queryCountInfo = data => {
  return service({
    url: modName + 'countInfo',
    method: 'post',
    data
  })
}
