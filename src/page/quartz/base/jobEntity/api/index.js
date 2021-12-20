/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-02 10:11:42
 */
import service from '@/utils/server'
import { VUE_APP_QUARTZ_MODEL } from '@/api/api.config.js'
const modName = VUE_APP_QUARTZ_MODEL + '/base/jobEntity/'
const modParamName = VUE_APP_QUARTZ_MODEL + '/base/jobParam/'
const modLogName = VUE_APP_QUARTZ_MODEL + '/base/jobExecLog/'
// 查询方法
export const pageInfo = data => {
  return service({
    url: modName + 'pageInfo',
    method: 'post',
    data
  })
}
// 查询方法
export const pageInfoLog = data => {
  return service({
    url: modLogName + 'pageInfo',
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
// 根据分类查询参数
export const queryByCategory = data => {
  return service({
    url: modParamName + 'queryByCategory/' + data.jobCategory,
    method: 'post'
  })
}
