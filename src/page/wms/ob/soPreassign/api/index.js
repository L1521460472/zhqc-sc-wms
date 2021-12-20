import service from '@/utils/server'
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
const modName = VUE_APP_WMS_MODEL + '/ob/soPreassign/'
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
// 初始化编辑页面对象
export const initUpdate = data => {
  return service({
    url: modName + 'initUpdate/' + data,
    method: 'post'
  })
}
// 预分配
export const doPreassign = data => {
  return service({
    url: modName + 'doPreassign',
    method: 'post',
    data
  })
}
// 取消预分配
export const cancelPreassign = data => {
  return service({
    url: modName + 'cancelPreassign',
    method: 'post',
    data
  })
}
