import { initPage, initUpdate, pageInfo } from './../api'
import { message } from '../../../../../utils/messageUtils'

const invoiceDrawerSoRecord = {
  namespaced: true,
  state: {
    successCode: 200,
    total: 0,
    pageResp: null,
    initPageResp: null,
    initUpdateObj: null
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
      state.initPageResp = data
    },
    INIT_UPDATE(state, data) {
      state.initUpdateObj = data.obj || {}
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
    }
  }
}
export default invoiceDrawerSoRecord
