import { pageInfo, initPage, footing } from './../api'
import { message } from '../../../../../../utils/messageUtils'
const invSummaryRpt = {
  namespaced: true,
  state: {
    total: 0,
    successCode: 200,
    pageResp: null,
    initPageObj: null,
    summaryResp: null
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
    SUMMARY(state, data) {
      state.summaryResp = data
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
    async summary({ commit }, obj) {
      const resp = await footing(obj)
      commit('SUMMARY', resp)
    }
  }
}
export default invSummaryRpt
