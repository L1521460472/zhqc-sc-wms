import service from '@/utils/server'
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
const modName = VUE_APP_WMS_MODEL + '/ob/so/'
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
// 确认出库
export const oneKeyOutWh = data => {
  return service({
    url: modName + 'oneKeyOutWh',
    method: 'post',
    data
  })
}
// 直配重分配
export const autoAssignZp = data => {
  return service({
    url: modName + 'autoAssignZp',
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
// 冻结
export const frozen = data => {
  return service({
    url: modName + 'frozen',
    method: 'post',
    data
  })
}
// 释放
export const unfrozen = data => {
  return service({
    url: modName + 'unfrozen',
    method: 'post',
    data
  })
}// 越库
export const crossDocking = data => {
  return service({
    url: modName + 'crossDocking',
    method: 'post',
    data
  })
}
// 取消越库
export const cancelCrossDocking = data => {
  return service({
    url: modName + 'cancelCrossDocking',
    method: 'post',
    data
  })
}
// 快速出库
export const fastPick = data => {
  return service({
    url: modName + 'fastPick/' + data,
    method: 'post'
  })
}
// 发运回传
export const sendMessageErp = data => {
  return service({
    url: modName + 'sendMessageErp/' + data,
    method: 'post'
  })
}
// 打印
export const print = data => {
  return service({
    url: modName + 'print',
    method: 'post',
    data
  })
}
