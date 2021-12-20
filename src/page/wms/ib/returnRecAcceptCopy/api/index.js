/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-02 15:42:34
 */
import service from '@/utils/server'
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
const modName = VUE_APP_WMS_MODEL + '/ib/rec/returnRec/'

// 初始化页面对象
export const initRecPage = data => {
  return service({
    url: modName + 'initRecPage',
    method: 'post',
    data
  })
}

// 扫描ASN单号/来源单号(退货收货)
export const scannReturnOrderNo = data => {
  return service({
    url: modName + 'scannReturnOrderNo/' + data,
    method: 'post'
  })
}

// 删除收货记录
export const deleteReturnRec = data => {
  return service({
    url: modName + 'deleteReturnRec/' + data.orderNo + '/' + data.recInfoId,
    method: 'post',
    data
  })
}

// 扫描SKU
export const scannReturnSku = data => {
  return service({
    url: modName + 'scannReturnSku',
    method: 'post',
    data
  })
}

// 保存记录(退货收货)
export const saveReturnRecInfo = data => {
  return service({
    url: modName + 'saveReturnRecInfo',
    method: 'post',
    data
  })
}

// 商品包装信息维护
export const saveReturnSkuPackageInfo = data => {
  return service({
    url: modName + 'saveReturnSkuPackageInfo',
    method: 'post',
    data
  })
}
