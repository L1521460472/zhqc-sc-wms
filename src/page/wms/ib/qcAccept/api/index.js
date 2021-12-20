import service from '@/utils/server'
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
const modName = VUE_APP_WMS_MODEL + '/ib/qc/'
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
// 删除验收记录
export const deleteDt = data => {
  return service({
    url: modName + 'dtCancelQc/' + data,
    method: 'post'
  })
}

// 一键验收
export const allAcceptance = data => {
  return service({
    url: modName + 'allAcceptance/' + data.id,
    method: 'post'
  })
}
// 审核
export const audit = data => {
  return service({
    url: modName + 'audit/' + data.id,
    method: 'post'
  })
}

// 取消
export const cancel = data => {
  return service({
    url: modName + 'cancel/' + data.id,
    method: 'post'
  })
}

// 明细取消验收
export const dtCancelQc = data => {
  return service({
    url: modName + 'dtCancelQc/' + data.qcDtId,
    method: 'post'
  })
}

// 扫描ASN单号/来源单号  scannAsnNo
export const scannOrderNo = data => {
  return service({
    url: modName + 'scannAsnNo/' + data,
    method: 'post'
  })
}

// 根据ASN与商品条码查询质检信息
export const scannSkuNo = data => {
  return service({
    url: modName + 'scannSkuNo',
    method: 'post',
    data
  })
}

// 保存质检记录
export const saveRecord = data => {
  return service({
    url: modName + 'saveQcRecord',
    method: 'post',
    data
  })
}

// 保存质检记录
export const nextQc = data => {
  return service({
    url: modName + 'nextQc/' + data,
    method: 'post',
    data
  })
}

// 打印
export const print = data => {
  return service({
    url: modName + 'print/' + data,
    method: 'post',
    data
  })
}

// 获取公钥
export const getPubicKey = data => {
  return service({
    url: '/oauth/publicKey/' + data.userNo,
    method: 'get'
  })
}
// 校验第二复核用户
export const checkUser = data => {
  return service({
    url: '/oauthToken/secondLogin',
    method: 'post',
    data
  })
}

