import service from '@/utils/server'
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
const modName = VUE_APP_WMS_MODEL + '/sys/processRule/'

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

// 新增流程策略
export const add = data => {
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
// 根据订单类型查询
export const queryEnumList = data => {
  return service({
    url: modName + 'enumList?' + data,
    method: 'post'
  })
}

// 启用
export const enable = data => {
  return service({
    url: modName + 'enable/' + data.id,
    method: 'post'
  })
}
// 停用
export const deactivate = data => {
  return service({
    url: modName + 'deactivate/' + data.id,
    method: 'post'
  })
}

