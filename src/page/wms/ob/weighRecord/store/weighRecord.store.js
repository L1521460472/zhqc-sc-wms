import { initPage, scanTransOrderNo, checkWeight, updateWeight, reWeight } from './../api'

const weighRecordStore = {
  namespaced: true,
  state: {
    initPageObj: null,
    scanTransOrderNoResp: null,
    checkWeightResp: null,
    updateWeightResp: null,
    reWeightResp: null

  },
  mutations: {

    INIT_PAGE(state, data) {
      state.initPageObj = data.obj || {}
    },
    SCAN_TRANS_ORDER_NO(state, data) {
      state.scanTransOrderNoResp = data
    },
    CHECK_WEIGHT(state, data) {
      state.checkWeightResp = data
    },
    UPDATE_WEIGHT(state, data) {
      state.updateWeightResp = data
    },
    RE_WEIGHT(state, data) {
      state.reWeightResp = data
    }

  },
  actions: {
    // 初始化页面事件
    async initPage({ commit }, obj) {
      const resp = await initPage(obj)
      commit('INIT_PAGE', resp)
    },
    // 扫描箱号/运单号
    async scanTransOrderNo({ commit }, obj) {
      const resp = await scanTransOrderNo(obj)
      commit('SCAN_TRANS_ORDER_NO', resp)
    },
    // 检查重量是否回写
    async checkWeight({ commit }, obj) {
      const resp = await checkWeight(obj)
      commit('CHECK_WEIGHT', resp)
    },
    // 更新重量
    async updateWeight({ commit }, obj) {
      const resp = await updateWeight(obj)
      commit('UPDATE_WEIGHT', resp)
    },
    // 重新称重
    async reWeight({ commit }, obj) {
      const resp = await reWeight(obj)
      commit('RE_WEIGHT', resp)
    }
  }
}
export default weighRecordStore
