/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-02 11:29:20
 */
import service from '@/utils/server'
import { VUE_APP_TMS_MODEL } from '@/api/api.config.js'
const modName = VUE_APP_TMS_MODEL + '/assignment/assignmentOrder/'
// 查询方法
export const pageInfo = data => {
  return service({
    url: modName + 'list',
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
    url: modName + 'view/' + data,
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
// 确认发运
export const affirmDepart = data => {
  return service({
    url: modName + 'affirm/depart/' + data,
    method: 'get'
  })
}
// 取消配载
export const cancel = data => {
  return service({
    url: modName + 'cancel',
    method: 'post',
    data
  })
}
// 一键装车
export const quickInCar = data => {
  return service({
    url: modName + 'quick/loading',
    method: 'post',
    data
  })
}
// 一键卸货
export const quickOutCar = data => {
  return service({
    url: modName + 'quick/unload',
    method: 'post',
    data
  })
}
