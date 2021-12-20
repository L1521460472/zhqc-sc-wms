import service from '@/utils/server'
import { VUE_APP_TMS_MODEL } from '@/api/api.config.js'
const modName = VUE_APP_TMS_MODEL + '/plan/planAppoint/'

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

// 查看
export const pageView = data => {
  return service({
    url: modName + 'view/' + data,
    method: 'get'
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

// 查订单
export const getOrderInfo = data => {
  return service({
    url: modName + 'order/info/' + data,
    method: 'get'
  })
}
