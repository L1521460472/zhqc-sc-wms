import service from '@/utils/server'
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
const modName = VUE_APP_WMS_MODEL + '/base/wh/wh/'
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

// 查询省份
export const provinceList = data => {
  return service({
    url: modName + 'provinceList',
    method: 'post',
    data
  })
}
// 查询城市
export const cityList = data => {
  return service({
    url: modName + 'cityList/' + data,
    method: 'post',
    data
  })
}
// 查询区县
export const areaList = data => {
  return service({
    url: modName + 'areaList/' + data,
    method: 'post',
    data
  })
}

// 启用方法
export const enable = data => {
  return service({
    url: modName + 'enable/' + data.id,
    method: 'post'
  })
}
// 停用方法
export const deactivate = data => {
  return service({
    url: modName + 'deactivate/' + data.id,
    method: 'post'
  })
}
