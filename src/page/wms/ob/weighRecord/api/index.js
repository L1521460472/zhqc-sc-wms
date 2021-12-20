import service from '@/utils/server'
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
const modName = VUE_APP_WMS_MODEL + '/ob/weighRecord/'

// 初始化页面对象
export const initPage = data => {
  return service({
    url: modName + 'initPage',
    method: 'post',
    data
  })
}

// 扫描箱号/运单号
export const scanTransOrderNo = data => {
  return service({
    url: modName + 'scanTransOrderNo',
    method: 'post',
    data
  })
}

// 检查重量是否回写
export const checkWeight = data => {
  return service({
    url: modName + 'checkWeight/' + data,
    method: 'post'
  })
}
// 更新重量
export const updateWeight = data => {
  return service({
    url: modName + 'updateWeight',
    method: 'post',
    data
  })
}
export const reWeight = data => {
  return service({
    url: modName + 'reWeight/' + data,
    method: 'post'
  })
}
