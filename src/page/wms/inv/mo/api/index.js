import service from '@/utils/server'
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
const modName = VUE_APP_WMS_MODEL + '/inv/mo/'

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
// 弃审
export const unAudit = data => {
  return service({
    url: modName + 'unAudit/' + data.id,
    method: 'post'
  })
}
// 分配
export const assign = data => {
  return service({
    url: modName + 'assign/' + data.id,
    method: 'post'
  })
}
// 取消分配
export const unAssign = data => {
  return service({
    url: modName + 'unAssign/' + data.id,
    method: 'post'
  })
}
// 领料下架
export const downShelf = data => {
  return service({
    url: modName + 'downShelf/' + data.id,
    method: 'post'
  })
}
// 更新加工库位
export const updateMoLot = data => {
  return service({
    url: modName + 'updateMoLot/' + data.id + '/' + data.moLotCode,
    method: 'post'
  })
}
// 初始化完工对象
export const initFinish = data => {
  return service({
    url: modName + 'initFinish/' + data.id,
    method: 'post'
  })
}
// 查询产品bom信息
export const queryBomBySkuId = data => {
  return service({
    url: modName + 'queryBomBySkuId/' + data.skuId,
    method: 'post'
  })
}

// 增加完工记录
export const addFinishRegister = data => {
  return service({
    url: modName + 'addFinishRegister',
    method: 'post',
    data
  })
}
// 关闭
export const close = data => {
  return service({
    url: modName + 'close/' + data,
    method: 'post'
  })
}
