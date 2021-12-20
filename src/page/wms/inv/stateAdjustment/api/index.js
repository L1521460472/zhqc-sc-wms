/*
 * @Descripttion:
 * @version:
 * @Author: chentianyu
 * @Date: 2021-11-08 20:32:32
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-16 09:25:29
 */
import service from '@/utils/server'
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
const modName = VUE_APP_WMS_MODEL + '/inv/inventoryConditionAdj/'
const modName1 = VUE_APP_WMS_MODEL + '/ib/pa/'
const modName2 = VUE_APP_WMS_MODEL + '/base/sku/sku/'
const modName3 = VUE_APP_WMS_MODEL + '/base/partner/owner/'

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

// 审批
export const auditData = data => {
  return service({
    url: modName + 'audit',
    method: 'post',
    data
  })
}

// 批量/盘点确认
// export const confirmInventory = data => {
//   return service({
//     url: modName + 'confirmInventory/' + data,
//     method: 'post'
//   })
// }

// 批量/取消盘点确认
// export const cancelConfirmInventory = data => {
//   return service({
//     url: modName + 'cancelConfirmInventory/' + data,
//     method: 'post'
//   })
// }

// 查询在库待盘点产品列表
export const queryInStockPro = data => {
  return service({
    url: modName + 'queryInStockList',
    method: 'post',
    data
  })
}

// 推荐库位
export const getRecommLot = data => {
  return service({
    url: modName1 + 'getRecommLot',
    method: 'post',
    data
  })
}

// 耗材货主
export const queryOwnerCbList = data => {
  return service({
    url: modName3 + 'queryOwnerCbList',
    method: 'post',
    data
  })
}
// 耗材商品
export const querySkuCbList = data => {
  return service({
    url: modName2 + 'querySkuCbList',
    method: 'post',
    data
  })
}
