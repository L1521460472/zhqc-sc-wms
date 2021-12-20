import { pageInfo, initPage, pageView } from '../api'
const exchangeRate = {
  namespaced: true,
  state: {
    successCode: 200,
    total: 0,
    pageResp: null,
    initPageObj: null,
    initViewResp: null
  },
  mutations: {
    PAGE_INFO(state, data) {
      state.total = data.total
      state.pageResp = data.obj || []
    },
    INIT_PAGE(state, data) {
      state.initPageObj = data
    },
    PAGE_VIEW(state, data) {
      state.initViewResp = data
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
    // 查询事件
    async pageView({ commit }, obj) {
      const resp = await pageView(obj)
      commit('PAGE_VIEW', resp)
    }
  }
}
export default exchangeRate
