import service from '@/utils/server'
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
const modName = VUE_APP_WMS_MODEL + '/inv/moveLotOrder/'
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

// 查询可移库存列表
export const queryCanMoveStock = data => {
  return service({
    url: modName + 'queryCanMoveStock',
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

// 删除移位单明细
export const deleteDt = data => {
  return service({
    url: modName + 'deleteDt/' + data,
    method: 'post'
  })
}
