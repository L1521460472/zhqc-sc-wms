import { pageInfo, initPage, initUpdate, signData, initUpdateByNo } from './../api'

const transportationReceipt = {
  namespaced: true,
  state: {
    total: 0,
    pageResp: null,
    initPageObj: null,
    initUpdateObj: null,
    signResp: null,
    initUpdateByNoObj: null
  },
  mutations: {
    PAGE_INFO(state, data) {
      state.total = data.total
      state.pageResp = data.obj || []
    },
    INIT_PAGE(state, data) {
      state.initPageObj = data.obj || {}
    },
    INIT_UPDATE(state, data) {
      state.initUpdateObj = data.obj || {}
    },
    INIT_UPDATE_BY_NO(state, data) {
      state.initUpdateByNoObj = data.obj || {}
    },

    SIGN_DATA(state, data) {
      state.signResp = data
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
    async initUpdateByNo({ commit }, obj) {
      const resp = await initUpdateByNo(obj)
      commit('INIT_UPDATE_BY_NO', resp)
    },

    // 签收
    async signData({ commit }, obj) {
      const resp = await signData(obj)
      commit('SIGN_DATA', resp)
    }
  }
}

export default transportationReceipt
