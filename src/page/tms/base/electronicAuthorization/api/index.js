/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-02 10:17:14
 */
import service from '@/utils/server'
import { VUE_APP_OMS_MODEL } from '@/api/api.config.js'
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
const modName = VUE_APP_OMS_MODEL + '/transport/customerAuth/'
const modName2 = VUE_APP_WMS_MODEL + '/base/partner'
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

// 停用方法
export const deactivate = data => {
  return service({
    url: modName + 'deactivate/' + data.id,
    method: 'get'
  })
}

// 启用方法
export const enable = data => {
  return service({
    url: modName + 'enable/' + data.id,
    method: 'get'
  })
}

// 查询货主的列表
export const queryOwnerList = () => {
  return service({
    url: modName2 + '/owner/queryOwnerList',
    method: 'post'
  })
}

// 查询收货方的列表
export const queryCustomWh = () => {
  return service({
    url: modName2 + '/customer/queryCustomWh',
    method: 'post'
  })
}

