/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-02 15:52:47
 */
import service from '@/utils/server'
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
const modName = VUE_APP_WMS_MODEL + '/inv/inventoryUnfrozen/'
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

// 查询在库产品列表
export const queryInStockPro = data => {
  return service({
    url: modName + 'queryInStockProListFroFrozen',
    method: 'post',
    data
  })
}

// 审核
export const auditAdj = data => {
  return service({
    url: modName + 'audit/' + data,
    method: 'post'
  })
}
// 批量/
export const batchAudit = data => {
  return service({
    url: modName + 'batchAudit/' + data,
    method: 'post'
  })
}
export const batchDelete = data => {
  return service({
    url: modName + 'batchDelete/' + data,
    method: 'post'
  })
}

// 批量/弃审
export const unAuditAdj = data => {
  return service({
    url: modName + 'unAuditAdj/' + data,
    method: 'post'
  })
}

