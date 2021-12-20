/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 11:19:48
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-11 15:47:11
 */
import service from '@/utils/server'
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
const modName = VUE_APP_WMS_MODEL + '/ib/fastrec/rec/'
const modName1 = VUE_APP_WMS_MODEL + '/ib/pa/'
const modName2 = VUE_APP_WMS_MODEL + '/ib/asn/'

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
    url: modName + 'scannOrderNo/' + data,
    method: 'post'
  })
}

// 删除收货记录
// export const deleteReturnRec = data => {
//   return service({
//     url: modName + 'deleteReturnRec/' + data.orderNo + '/' + data.recInfoId,
//     method: 'post',
//     data
//   })
// }

// 扫描SKU
export const scannReturnSku = data => {
  return service({
    url: modName + 'scannSku',
    method: 'post',
    data
  })
}

// 保存记录(退货收货)
export const saveReturnRecInfo = data => {
  return service({
    url: modName + 'saveRecInfo',
    method: 'post',
    data
  })
}

// 商品包装信息维护
// export const saveReturnSkuPackageInfo = data => {
//   return service({
//     url: modName + 'saveReturnSkuPackageInfo',
//     method: 'post',
//     data
//   })
// }

// 推荐库位
export const getRecommLot = data => {
  return service({
    url: modName1 + 'getRecommLot',
    method: 'post',
    data
  })
}

// 上传凭证
export const updateEvidence = data => {
  return service({
    url: modName2 + 'updateEvidence',
    method: 'post',
    data
  })
}
