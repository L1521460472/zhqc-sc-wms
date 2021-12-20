/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-02 15:19:28
 */
import service from '@/utils/server'
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
const modName = VUE_APP_WMS_MODEL + '/gsp/recheck/'
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
// 审核
export const audit = data => {
  return service({
    url: modName + 'audit/' + data.id,
    method: 'post'
  })
}

// 取消审核
export const cancelAudit = data => {
  return service({
    url: modName + 'unAudit/' + data.id,
    method: 'post'
  })
}
