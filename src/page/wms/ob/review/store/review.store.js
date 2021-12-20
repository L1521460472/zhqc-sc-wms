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
    // 打印面单
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
    // 初始化页面事件
    async initPage({ commit }, obj) {
      const resp = await initPage(obj)
      commit('INIT_PAGE', resp)
    },
    // 初始化复核数据
    async initReviewData({ commit }, obj) {
      const resp = await initReviewData(obj)
      commit('INIT_REVIEW_DATA', resp)
    },
    // 扫描产品条码
    async scanSku({ commit }, obj) {
      const resp = await scanSku(obj)
      commit('SCAN_SKU', resp)
    },
    async saveReviewData({ commit }, obj) {
      const resp = await saveReviewData(obj)
      commit('SAVE_REVIEW_DATA', resp)
    },
    // 完成复核
    async reviewDone({ commit }, obj) {
      const resp = await reviewDone(obj)
      commit('REVIEW_DONE', resp)
    },
    // 删除复核数据
    async deleteData({ commit }, obj) {
      const resp = await deleteData(obj)
      commit('DELETE_DATA', resp)
    },
    // 初始化复核异常界面
    async initAbnormal({ commit }, obj) {
      const resp = await initAbnormal(obj)
      commit('INIT_ABNORMAL', resp)
    },
    // 保存复核异常数据
    async addAbnormal({ commit }, obj) {
      const resp = await addAbnormal(obj)
      commit('ADD_ABNORMAL', resp)
    },
    // 保存复核差异数据
    async saveReviewLess({ commit }, obj) {
      const resp = await saveReviewLess(obj)
      commit('SAVE_REVIEW_LESS', resp)
    },
    // 获取公钥
    async getPubicKey({ commit }, obj) {
      const resp = await getPubicKey(obj)
      commit('GET_PUBIC_KEY', resp)
    },
    // 校验用户
    async checkUser({ commit }, obj) {
      const resp = await checkUser(obj)
      commit('CHECK_USER', resp)
    },
    // 查询复核耗材列表
    async queryReviewConsumables({ commit }, obj) {
      const resp = await queryReviewConsumables(obj)
      commit('QUERY_REVIEW_CONSUMABLES', resp)
    },
    // 扫描耗材
    async scanSkuConsumables({ commit }, obj) {
      const resp = await scanSkuConsumables(obj)
      commit('SCAN_SKU_CONSUMABLES', resp)
    },
    // 删除耗材
    async deleteSkuConsumables({ commit }, obj) {
      const resp = await deleteSkuConsumables(obj)
      commit('DELETE_SKU_CONSUMABLES', resp)
    },
    // 打印面单
    async printFaceSheet({ commit }, obj) {
      const resp = await printFaceSheet(obj)
      commit('PRINT_FACESHEET', resp)
    },
    // 保存复核记录
    async reviewSku({ commit }, obj) {
      const resp = await reviewSku(obj)
      commit('REVIEW_SKU', resp)
    },
    // 快速复核
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
