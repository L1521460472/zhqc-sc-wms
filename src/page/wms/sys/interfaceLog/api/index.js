import service from '@/utils/server'
import { VUE_APP_OMS_MODEL } from '@/api/api.config.js'
const modName = VUE_APP_OMS_MODEL + '/mq/mqLog/'
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
// 单条重推
export const rePush = data => {
  return service({
    url: modName + 'rePush/' + data,
    method: 'post',
    data
  })
}
// 多条重推
export const rePushs = data => {
  return service({
    url: modName + 'rePushs',
    method: 'post',
    data
  })
}
