import service from '@/utils/server'
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
const modName = VUE_APP_WMS_MODEL + '/ib/rec/'
const modName2 = VUE_APP_WMS_MODEL + '/ib/asn/'
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
// 删除方法
export const deleteDt = data => {
  return service({
    url: modName + 'deleteDt/' + data.id,
    method: 'post'
  })
}
// 扫描ASN单号/来源单号
export const scannOrderNo = data => {
  return service({
    url: modName + 'scannOrderNo/' + data,
    method: 'post'
  })
}

// 扫描ASN单号/来源单号(退货收货)
export const scannReturnOrderNo = data => {
  return service({
    url: modName + 'scannReturnOrderNo/' + data,
    method: 'post'
  })
}

// 扫描库区/库位
export const scannAreaNo = data => {
  return service({
    url: modName + 'scannAreaNo/' + data,
    method: 'post'
  })
}

// 扫描库区/库位
export const scannReturnAreaNo = data => {
  return service({
    url: modName + 'scannReturnAreaNo/' + data,
    method: 'post'
  })
}

// 扫描容器
export const scannContainerNo = data => {
  return service({
    url: modName + 'scannContainerNo/' + data,
    method: 'post'
  })
}

// 扫描容器
export const scannReturnContainerNo = data => {
  return service({
    url: modName + 'scannReturnContainerNo/' + data,
    method: 'post'
  })
}

// 扫描SKU
export const scannSkuNo = data => {
  return service({
    url: modName + 'scannSkuNo',
    method: 'post',
    data
  })
}

// 扫描SKU
export const scannReturnSkuNo = data => {
  return service({
    url: modName + 'scannReturnSkuNo',
    method: 'post',
    data
  })
}

// 查询产品有效期至
export const querySkuInvalidDate = data => {
  return service({
    url: modName + 'querySkuInvalidDate',
    method: 'post',
    data
  })
}

// 查询产品有效期至
export const queryReturnSkuInvalidDate = data => {
  return service({
    url: modName + 'queryReturnSkuInvalidDate',
    method: 'post',
    data
  })
}

// 查询产品有效期至
export const saveRecInfo = data => {
  return service({
    url: modName + 'saveRecInfo',
    method: 'post',
    data
  })
}

// 保存记录(退货收货)
export const saveReturnRecInfo = data => {
  return service({
    url: modName + 'saveReturnRecInfo',
    method: 'post',
    data
  })
}

// 完成收货
export const completeAsn = data => {
  return service({
    url: modName + 'completeAsn/' + data,
    method: 'post'
  })
}

// 取消
export const cancel = data => {
  return service({
    url: modName + 'cancel/' + data,
    method: 'post'
  })
}

// 上传凭证
export const updateEvidence = data => {
  return service({
    url: modName2 + 'updateEvidence',
    method: 'post',
    data
  })
}
