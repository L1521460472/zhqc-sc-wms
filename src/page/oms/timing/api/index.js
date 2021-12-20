/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-01 13:59:51
 */
import service from '@/utils/server'
import { VUE_APP_PROXY_MODEL } from '@/api/api.config.js'
import { VUE_APP_OMS_MODEL } from '@/api/api.config.js'
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
const modName = VUE_APP_PROXY_MODEL + '/test/timing/'
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

export const resetUnusualStop = data => {
  return service({
    url: modName + 'resetUnusualStop/' + data,
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
// 生成SO
export const createSo = data => {
  return service({
    url: VUE_APP_OMS_MODEL + '/order/outOrder/outOrder/' + data.id,
    method: 'post'
  })
}

// 查看界面 店铺名称  id转为value
export const viewStoreName = data => {
  return service({
    url: VUE_APP_WMS_MODEL + '/base/partner/store/initUpdate/' + data,
    method: 'post'
  })
}
