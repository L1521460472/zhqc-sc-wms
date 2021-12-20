import service from '@/utils/server'
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
const modName = VUE_APP_WMS_MODEL + '/ob/review/'
const modNameConsumables = VUE_APP_WMS_MODEL + '/ob/reviewConsumables/'

// 初始化页面对象
export const initPage = data => {
  return service({
    url: modName + 'initPage',
    method: 'post',
    data
  })
}
// 初始化复核信息
export const initReviewData = data => {
  return service({
    url: modName + 'initReviewDataAssign',
    method: 'post',
    data
  })
}
// 初始化复核信息
export const scanSku = data => {
  return service({
    url: modName + 'scanSkuAssign',
    method: 'post',
    data
  })
}
// 保存复核记录
export const saveReviewData = data => {
  return service({
    url: modName + 'saveReviewData',
    method: 'post',
    data
  })
}
// 快速复核
export const fastReview = data => {
  return service({
    url: modName + 'fastReview/' + data.id,
    method: 'post'
  })
}

// 完成复核
export const reviewDone = data => {
  return service({
    url: modName + 'reviewDone',
    method: 'post',
    data
  })
}
// 清空复核记录
export const deleteData = data => {
  return service({
    url: modName + 'delete/' + data.id,
    method: 'post'
  })
}
// 初始化复核异常页面
export const initAbnormal = data => {
  return service({
    url: modName + 'initAbnormal',
    method: 'post',
    data
  })
}
// 保存复核异常数据
export const addAbnormal = data => {
  return service({
    url: modName + 'addAbnormal',
    method: 'post',
    data
  })
}
// 保存复核差异数据
export const saveReviewLess = data => {
  return service({
    url: modName + 'saveReviewLess/' + data,
    method: 'post'
  })
}
// 查询复核耗材列表
export const queryReviewConsumables = data => {
  return service({
    url: modNameConsumables + 'queryList/' + data,
    method: 'post'
  })
}
// 扫描耗材
export const scanSkuConsumables = data => {
  return service({
    url: modNameConsumables + 'scanSkuConsumables',
    method: 'post',
    data
  })
}
// 删除耗材
export const deleteSkuConsumables = data => {
  return service({
    url: modNameConsumables + 'delete/' + data,
    method: 'post'
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

// 打印面单
export const printFaceSheet = data => {
  return service({
    url: modName + 'printFaceSheet/' + data,
    method: 'post',
    data
  })
}

// 删除复核明细
export const deleteReviewDtBox = data => {
  return service({
    url: modName + 'deleteReviewDtBox/' + data,
    method: 'post'
  })
}

