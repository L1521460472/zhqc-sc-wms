import { scannFmLotCode, scannProBarcode, scannMoveQty, scannToLotCode, save } from './../api'

const moveLocation = {
  namespaced: true,
  state: {
    scannFmLotCodeResp: null,
    scannProBarcodeResp: null,
    scannMoveQtyResp: null,
    scannToLotCodeResp: null,
    saveResp: null

  },
  mutations: {
    // 扫描来源库位
    SCANN_FM_LOT_CODE(state, data) {
      state.scannFmLotCodeResp = data
    },
    // 扫描商品条码
    SCANN_PRO_BARCODE(state, data) {
      state.scannProBarcodeResp = data
    },
    // 扫描移动数量
    SCANN_MOVE_QTY(state, data) {
      state.scannMoveQtyResp = data
    },
    // 扫描目标库位
    SCANN_TO_LOT_CODE(state, data) {
      state.scannToLotCodeResp = data
    },
    // 保存
    SAVE(state, data) {
      state.saveResp = data
    }

  },
  actions: {
    // 扫描来源库位
    async scannFmLotCode({ commit }, obj) {
      const resp = await scannFmLotCode(obj)
      commit('SCANN_FM_LOT_CODE', resp)
    },
    // 扫描商品条码
    async scannProBarcode({ commit }, obj) {
      const resp = await scannProBarcode(obj)
      commit('SCANN_PRO_BARCODE', resp)
    },
    // 扫描移动数量
    async scannMoveQty({ commit }, obj) {
      const resp = await scannMoveQty(obj)
      commit('SCANN_MOVE_QTY', resp)
    },
    // 扫描目标库位
    async scannToLotCode({ commit }, obj) {
      const resp = await scannToLotCode(obj)
      commit('SCANN_TO_LOT_CODE', resp)
    },
    // 保存
    async save({ commit }, obj) {
      const resp = await save(obj)
      commit('SAVE', resp)
    }
  }
}
export default moveLocation
