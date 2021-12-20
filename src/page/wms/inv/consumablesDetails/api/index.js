/*
 * @Descripttion:
 * @version:
 * @Author: chentianyu
 * @Date: 2021-11-12 09:23:41
 * @LastEditors: chentianyu
 * @LastEditTime: 2021-11-12 13:49:42
 */
import service from '@/utils/server'
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
const modName = VUE_APP_WMS_MODEL + '/inv/inventoryConsumeLog/'

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
// 库存明细统计
export const footing = data => {
  return service({
    url: modName + 'footing',
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

// 删除方法
export const countInfo = data => {
  return service({
    url: modName + 'countInfo',
    method: 'post',
    data
  })
}

