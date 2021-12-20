import service from '@/utils/server'
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
const modName = VUE_APP_WMS_MODEL + '/ob/soAssignment/'
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
// 分配
export const doAssign = data => {
  return service({
    url: modName + 'doAssign',
    method: 'post',
    data
  })
}
// 取消分配
export const cancelAssign = data => {
  return service({
    url: modName + 'cancelAssign',
    method: 'post',
    data
  })
}

