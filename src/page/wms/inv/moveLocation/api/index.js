import service from '@/utils/server'
const modName = process.env.VUE_APP_WMS_MODEL + '/inv/directMove/'

// 扫描来源库位
export const scannFmLotCode = data => {
  return service({
    url: modName + 'scannFmLotCode/' + data.fmLotCode,
    method: 'post'
  })
}

// 扫描商品条码
export const scannProBarcode = data => {
  return service({
    url: modName + 'scannProBarcode/' + data.fmLotCode + '/' + data.barcode,
    method: 'post'
  })
}

// 扫描移动数量
export const scannMoveQty = data => {
  return service({
    url: modName + 'scannMoveQty',
    method: 'post',
    data
  })
}

// 扫描目标库位
export const scannToLotCode = data => {
  return service({
    url: modName + 'scannToLotCode',
    method: 'post',
    data
  })
}

// 保存
export const save = data => {
  return service({
    url: modName + 'save',
    method: 'post',
    data
  })
}

