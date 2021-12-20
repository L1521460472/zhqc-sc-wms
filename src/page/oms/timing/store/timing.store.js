import { pageInfo, initPage, initUpdate, resetUnusualStop } from '../api'
import { message } from '../../../../utils/messageUtils'
const timing = {
  namespaced: true,
  state: {
    successCode: 200,
    total: 0,
    pageResp: null,
    addResp: null,
    editResp: null,
    deleteResp: null,
    initPageObj: null,
    resetUnusualStop: null,
    initUpdateObj: null
    // viewStoreNameResp: null,
    // createSoResp: null,
    // cancelResp: null,
    // vieConsigneeResp: null,
    // viewPartnerNameResp: null,
    // viewCourierNameResp: null,
    // batchSendResp: null,
  },
  mutations: {

    PAGE_INFO(state, data) {
      if (data.code === state.successCode) {
        message.success(data.msg)
      }
      state.total = data.total
      state.pageResp = data.obj || []
    },
    INIT_PAGE(state, data) {
      state.initPageObj = data.obj || {}
    },

    RESET_UNUSUAL_STOP(state, data) {
      state.resetUnusualStop = data || {}
    }
  },
  actions: {
    // 查询事件
    async pageInfo({ commit }, obj) {
      const resp = await pageInfo(obj)
      commit('PAGE_INFO', resp)
    },
    // 初始化页面事件
    async initPage({ commit }, obj) {
      const resp = await initPage(obj)
      commit('INIT_PAGE', resp)
    },
    // 初始化更新对象事件
    async initUpdate({ commit }, obj) {
      const resp = await initUpdate(obj)
      commit('INIT_UPDATE', resp)
    },
    async resetUnusualStop({ commit }, obj) {
      const resp = await resetUnusualStop(obj)
      commit('RESET_UNUSUAL_STOP', resp)
    }
  }
}
export default timing
