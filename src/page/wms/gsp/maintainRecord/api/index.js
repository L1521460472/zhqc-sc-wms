import service from '@/utils/server'
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
const modName = VUE_APP_WMS_MODEL + '/gsp/pro/maintainRecord/'

// 初始化页面对象
export const initPage = data => {
  return service({
    url: modName + 'initPage',
    method: 'post',
    data
  })
}

// 查询产品列表
export const querySkuInfo = data => {
  return service({
    url: modName + 'querySkuInfo',
    method: 'post',
    data
  })
}

// 查询产品养护记录列表
export const querySkuMaintainRecord = data => {
  return service({
    url: modName + 'querySkuMaintainRecord',
    method: 'post',
    data
  })
}
