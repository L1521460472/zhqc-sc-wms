import service from '@/utils/server'
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
const modName = VUE_APP_WMS_MODEL + '/gsp/pro/emphMaintain/'
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

// 查询在库重点品养护列表
export const queryInStockPro = data => {
  return service({
    url: modName + 'queryInStockPro',
    method: 'post',
    data
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
    url: modName + 'cancelAudit/' + data.id,
    method: 'post'
  })
}

// 删除养护品种确定明细
export const deleteDt = data => {
  return service({
    url: modName + 'deleteDt/' + data,
    method: 'post'
  })
}
