/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-02 15:41:07
 */
import service from '@/utils/server'
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
const modName = VUE_APP_WMS_MODEL + '/ib/rec/rec/'

// 初始化页面对象
export const initRecPage = data => {
  return service({
    url: modName + 'initRecPage',
    method: 'post',
    data
  })
}

// 扫描ASN单号/来源单号
export const scannOrderNo = data => {
  return service({
    url: modName + 'scannOrderNo/' + data,
    method: 'post'
  })
}

// 扫描SKU
export const scannSku = data => {
  return service({
    url: modName + 'scannSku',
    method: 'post',
    data
  })
}

// 输入生产批号
export const scannProductionBatch = data => {
  return service({
    url: modName + 'scannProductionBatch/' + data.skuId + '/' + data.productionBatch,
    method: 'post',
    data
  })
}

// 删除收货记录
export const deleteRec = data => {
  return service({
    url: modName + 'deleteRec/' + data.orderNo + '/' + data.recInfoId,
    method: 'post',
    data
  })
}

// 保存记录
export const saveRecInfo = data => {
  return service({
    url: modName + 'saveRecInfo',
    method: 'post',
    data
  })
}

// 商品包装信息维护
export const saveSkuPackageInfo = data => {
  return service({
    url: modName + 'saveSkuPackageInfo',
    method: 'post',
    data
  })
}

// 保存药品电子监管码
export const saveDrugElectrSupervise = data => {
  return service({
    url: modName + 'saveDrugElectrSupervise',
    method: 'post',
    data
  })
}

// 查询药品电子监管码
export const querySkuElectrSuperviseCode = data => {
  return service({
    url: modName + 'querySkuElectrSuperviseCode',
    method: 'post',
    data
  })
}

// 删除药监码
export const deleteDrugElectrSupervise = data => {
  return service({
    url: modName + 'deleteDrugElectrSupervise/' + data,
    method: 'post'
  })
}
