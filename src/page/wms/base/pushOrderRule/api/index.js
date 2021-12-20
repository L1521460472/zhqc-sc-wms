import service from '@/utils/server'
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
const modName = VUE_APP_WMS_MODEL + '/sys/'

// 查询方法
export const pageInfo = data => {
  return service({
    url: modName + 'pushRule/pageInfo',
    method: 'post',
    data
  })
}

// 初始化页面对象
export const initPage = data => {
  return service({
    url: modName + 'pushRule/initPage',
    method: 'post',
    data
  })
}

// 详情查询
export const pageView = data => {
  return service({
    url: modName + 'pushRule/initUpdate/' + data,
    method: 'post'
  })
}

