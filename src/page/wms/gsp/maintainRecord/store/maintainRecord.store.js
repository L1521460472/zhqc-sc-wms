import { initPage, querySkuInfo, querySkuMaintainRecord } from './../api'
import { message } from '../../../../../utils/messageUtils'
const maintainRecord = {
  namespaced: true,
  state: {
    successCode: 200,
    total: 0,
    pageResp: null,
    totalSkuRecord: 0,
    pageSkuRecordResp: null,
    addResp: null,
    editResp: null,
    deleteResp: null,
    initPageResp: null,
    initUpdateObj: null,
    enableResp: null,
    deactivateResp: null
  },
  mutations: {
    INIT_PAGE(state, data) {
      state.initPageResp = data
    },
    // 查询产品列表
    QUERY_SKU_INFO(state, data) {
      if (data.code === state.successCode) {
        message.success(data.msg)
      }
      state.total = data.total
      state.pageResp = data.obj || []
    },
    // 查询产品养护记录列表
    QUERY_SKU_MAINTAIN_RECORD(state, data) {
      if (data.code === state.successCode) {
        message.success(data.msg)
      }
      state.totalSkuRecord = data.total
      state.pageSkuRecordResp = data.obj || []
    }

  },
  actions: {
    // 初始化页面事件
    async initPage({ commit }, obj) {
      const resp = await initPage(obj)
      commit('INIT_PAGE', resp)
    },

    // 查询产品列表
    async querySkuInfo({ commit }, obj) {
      const resp = await querySkuInfo(obj)
      commit('QUERY_SKU_INFO', resp)
    },

    // 查询产品养护记录列表
    async querySkuMaintainRecord({ commit }, obj) {
      const resp = await querySkuMaintainRecord(obj)
      commit('QUERY_SKU_MAINTAIN_RECORD', resp)
    }

  }
}
export default maintainRecord
