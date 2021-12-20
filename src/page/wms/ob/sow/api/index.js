import service from '@/utils/server'
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
const modName = VUE_APP_WMS_MODEL + '/ob/sowInfo/'

// 播种墙
export const scanSowContainerCode = data => {
  return service({
    url: modName + 'scanSowContainerCode/' + data,
    method: 'post'
  })
}

// 拣货单
export const scanPickOrderNo = data => {
  return service({
    url: modName + 'scanPickOrderNo/' + data.pickOrderNo,
    method: 'post'
  })
}

// 产品编码
export const scanSkuCode = data => {
  return service({
    url: modName + 'scanSkuCode/' + data.sowContainerCode + '/' + data.pickOrderNo + '/' + data.skuCode,
    method: 'post'
  })
}

// 拣货单
export const saveSowScanRecord = data => {
  return service({
    url: modName + 'saveSowScanRecord/' + data.sowContainerCode + '/' + data.pickOrderNo + '/' + data.skuCode + '/' + data.sowCode + '/' + data.sowQty,
    method: 'post'
  })
}

// 打印送货单
export const printDeliveryNote = data => {
  return service({
    url: modName + 'printDeliveryNote/' + data,
    method: 'post'
  })
}

// 强制播种
export const forceSow = data => {
  return service({
    url: modName + 'forceSow/' + data,
    method: 'post'
  })
}

// 查看拣货容器
export const queryPickContainerInfo = data => {
  return service({
    url: modName + 'queryPickContainerInfo/' + data,
    method: 'post'
  })
}

// 查看分拣信息
export const querySowInfo = data => {
  return service({
    url: modName + 'querySowInfo/' + data,
    method: 'post'
  })
}

