/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-02 15:34:46
 */
import service from '@/utils/server'
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
const modName = VUE_APP_WMS_MODEL + '/ib/pa/'

// 扫描ASN单号/客户订单号
export const pcScannOrderNo = data => {
  return service({
    url: modName + 'pcScannOrderNo/' + data,
    method: 'post'
  })
}

// 扫描商品条码
export const pcScannProductBarcode = data => {
  return service({
    url: modName + 'pcScannProductBarcode',
    method: 'post',
    data
  })
}

// 扫描上架库位
export const pcScannPalot = data => {
  return service({
    url: modName + 'pcScannPalot',
    method: 'post',
    data
  })
}

// 扫描上架数量
export const pcScannPaQty = data => {
  return service({
    url: modName + 'pcScannPaQty',
    method: 'post',
    data
  })
}

