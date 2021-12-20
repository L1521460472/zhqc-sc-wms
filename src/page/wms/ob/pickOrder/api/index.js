import service from '@/utils/server'
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
const modName = VUE_APP_WMS_MODEL + '/ob/pickOrder/'
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

// 查询拣货单明细
export const queryPickDt = data => {
  return service({
    url: modName + 'queryPickDt',
    method: 'post',
    data
  })
}

// 查询拣货SO分配明细
export const queryPickSoAssign = data => {
  return service({
    url: modName + 'queryPickSoAssign',
    method: 'post',
    data
  })
}

// 查询拣货记录
export const queryPickInfo = data => {
  return service({
    url: modName + 'queryPickInfo',
    method: 'post',
    data
  })
}

// 查询拣货播种
export const queryPickSow = data => {
  return service({
    url: modName + 'queryPickSow',
    method: 'post',
    data
  })
}

// 打印
export const print = data => {
  return service({
    url: modName + 'print',
    method: 'post',
    data
  })
}

// 打印快递面单
export const printTheExpressWaybill = data => {
  return service({
    url: VUE_APP_WMS_MODEL + '/ob/pickOrder/courierPrint/' + data,
    method: 'post',
    data
  })
}
