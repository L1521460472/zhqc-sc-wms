import { initPage, initReviewData, scanSku, deleteData, reviewDone, initAbnormal, addAbnormal,
  saveReviewLess, getPubicKey, checkUser, queryReviewConsumables, scanSkuConsumables, deleteSkuConsumables,
  printFaceSheet, saveReviewData, fastReview, deleteReviewDtBox, reviewSku } from './../api'
import { message } from '../../../../../utils/messageUtils'
const review = {
  namespaced: true,
  state: {
    total: 0,
    successCode: 200,
    initPageObj: null,
    initReviewDataResp: null,
    scanSkuResp: null,
    saveReviewLogResp: null,
    clearReviewLogResp: null,
    deleteResp: null,
    batchReviewSkuResp: null,
    reviewDoneResp: null,
    getPubicKeyResp: null,
    checkUserResp: null,
    initAbnormalObj: null,
    addAbnormalResp: null,
    saveReviewLessResp: null,
    queryReviewConsumablesObj: null,
    scanSkuConsumablesResp: null,
    deleteSkuConsumablesResp: null,
    printFaceSheetResp: null,
    reviewSkuResp: null,
    saveReviewDataResp: null,
    fastReviewResp: null,
    deleteReviewDtBoxResp: null
  },
  mutations: {

    INIT_PAGE(state, data) {
      if (data.code === state.successCode) {
        message.success(data.msg)
      }
      state.initPageObj = data.obj || {}
    },
    INIT_REVIEW_DATA(state, data) {
      state.initReviewDataResp = data
    },
    SCAN_SKU(state, data) {
      state.scanSkuResp = data
    },
    SAVE_REVIEW_DATA(state, data) {
      state.saveReviewDataResp = data
    },
    SAVE_REVIEW_LOG(state, data) {
      state.saveReviewLogResp = data
    },
    CLEAR_REVIEW_LOG(state, data) {
      state.clearReviewLogResp = data
    },
    DELETE_DATA(state, data) {
      state.deleteResp = data
    },
    REVIEW_DONE(state, data) {
      state.reviewDoneResp = data
    },
    GET_PUBIC_KEY(state, data) {
      state.getPubicKeyResp = data
    },
    CHECK_USER(state, data) {
      state.checkUserResp = data
    },
    INIT_ABNORMAL(state, data) {
      state.initAbnormalObj = data.obj
    },
    ADD_ABNORMAL(state, data) {
      state.addAbnormalResp = data
    },
    SAVE_REVIEW_LESS(state, data) {
      state.saveReviewLessResp = data
    },
    QUERY_REVIEW_CONSUMABLES(state, data) {
      state.queryReviewConsumablesObj = data.obj || []
    },
    SCAN_SKU_CONSUMABLES(state, data) {
      state.scanSkuConsumablesResp = data
    },
    DELETE_SKU_CONSUMABLES(state, data) {
      state.deleteSkuConsumablesResp = data
    },
    // ????????????
    PRINT_FACESHEET(state, data) {
      state.printFaceSheetResp = data
    },
    REVIEW_SKU(state, data) {
      state.reviewSkuResp = data
    },
    FAST_REVIEW(state, data) {
      state.fastReviewResp = data
    },
    DELETE_REVIEW_DT_BOX(state, data) {
      state.deleteReviewDtBoxResp = data
    }
  },
  actions: {
    // ?????????????????????
    async initPage({ commit }, obj) {
      const resp = await initPage(obj)
      commit('INIT_PAGE', resp)
    },
    // ?????????????????????
    async initReviewData({ commit }, obj) {
      const resp = await initReviewData(obj)
      commit('INIT_REVIEW_DATA', resp)
    },
    // ??????????????????
    async scanSku({ commit }, obj) {
      const resp = await scanSku(obj)
      commit('SCAN_SKU', resp)
    },
    async saveReviewData({ commit }, obj) {
      const resp = await saveReviewData(obj)
      commit('SAVE_REVIEW_DATA', resp)
    },
    // ????????????
    async reviewDone({ commit }, obj) {
      const resp = await reviewDone(obj)
      commit('REVIEW_DONE', resp)
    },
    // ??????????????????
    async deleteData({ commit }, obj) {
      const resp = await deleteData(obj)
      commit('DELETE_DATA', resp)
    },
    // ???????????????????????????
    async initAbnormal({ commit }, obj) {
      const resp = await initAbnormal(obj)
      commit('INIT_ABNORMAL', resp)
    },
    // ????????????????????????
    async addAbnormal({ commit }, obj) {
      const resp = await addAbnormal(obj)
      commit('ADD_ABNORMAL', resp)
    },
    // ????????????????????????
    async saveReviewLess({ commit }, obj) {
      const resp = await saveReviewLess(obj)
      commit('SAVE_REVIEW_LESS', resp)
    },
    // ????????????
    async getPubicKey({ commit }, obj) {
      const resp = await getPubicKey(obj)
      commit('GET_PUBIC_KEY', resp)
    },
    // ????????????
    async checkUser({ commit }, obj) {
      const resp = await checkUser(obj)
      commit('CHECK_USER', resp)
    },
    // ????????????????????????
    async queryReviewConsumables({ commit }, obj) {
      const resp = await queryReviewConsumables(obj)
      commit('QUERY_REVIEW_CONSUMABLES', resp)
    },
    // ????????????
    async scanSkuConsumables({ commit }, obj) {
      const resp = await scanSkuConsumables(obj)
      commit('SCAN_SKU_CONSUMABLES', resp)
    },
    // ????????????
    async deleteSkuConsumables({ commit }, obj) {
      const resp = await deleteSkuConsumables(obj)
      commit('DELETE_SKU_CONSUMABLES', resp)
    },
    // ????????????
    async printFaceSheet({ commit }, obj) {
      const resp = await printFaceSheet(obj)
      commit('PRINT_FACESHEET', resp)
    },
    // ??????????????????
    async reviewSku({ commit }, obj) {
      const resp = await reviewSku(obj)
      commit('REVIEW_SKU', resp)
    },
    // ????????????
    async fastReview({ commit }, obj) {
      const resp = await fastReview(obj)
      commit('FAST_REVIEW', resp)
    },
    async deleteReviewDtBox({ commit }, obj) {
      const resp = await deleteReviewDtBox(obj)
      commit('DELETE_REVIEW_DT_BOX', resp)
    }
  }
}
export default review
