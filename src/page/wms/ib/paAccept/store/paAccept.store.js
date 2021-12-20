import { pcScannOrderNo, pcScannProductBarcode, pcScannPalot, pcScannPaQty } from './../api'
import { message } from '../../../../../utils/messageUtils'
const review = {
  namespaced: true,
  state: {
    total: 0,
    successCode: 200,
    pcScannOrderNoResp: null,
    pcScannProductBarcodeResp: null,
    pcScannPalotResp: null,
    pcScannPaQtyResp: null
  },
  mutations: {
    // 扫描ASN单号/客户订单号
    PC_SCANN_ORDER_NO(state, data) {
      if (data.code === state.successCode) {
        message.success(data.msg)
      }
      state.pcScannOrderNoResp = data
    },
    // 扫描商品条码
    PC_SCANN_PRODUCT_BARCODE(state, data) {
      if (data.code === state.successCode) {
        message.success(data.msg)
      }
      state.pcScannProductBarcodeResp = data
    },
    // 扫描上架库位
    PC_SCANN_PA_LOT(state, data) {
      if (data.code === state.successCode) {
        message.success(data.msg)
      }
      state.pcScannPalotResp = data
    },
    // 扫描上架数量
    PC_SCANN_PA_QTY(state, data) {
      if (data.code === state.successCode) {
        message.success(data.msg)
      }
      state.pcScannPaQtyResp = data
    }
  },
  actions: {
    // 扫描ASN单号/客户订单号
    async pcScannOrderNo({ commit }, obj) {
      const resp = await pcScannOrderNo(obj)
      commit('PC_SCANN_ORDER_NO', resp)
    },
    // 扫描商品条码
    async pcScannProductBarcode({ commit }, obj) {
      const resp = await pcScannProductBarcode(obj)
      commit('PC_SCANN_PRODUCT_BARCODE', resp)
    },
    // 扫描上架库位
    async pcScannPalot({ commit }, obj) {
      const resp = await pcScannPalot(obj)
      commit('PC_SCANN_PA_LOT', resp)
    },
    // 扫描上架数量
    async pcScannPaQty({ commit }, obj) {
      const resp = await pcScannPaQty(obj)
      commit('PC_SCANN_PA_QTY', resp)
    }
  }
}
export default review
