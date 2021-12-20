import { pageInfo, initPage, chongHong } from './../api'
import { message } from '../../../../../utils/messageUtils'

const invoiceDrawer = {
  namespaced: true,
  state: {
    successCode: 200,
    total: 0,
    pageResp: null,
    initPageResp: null,
    chongHongResp: null
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
    // 冲红
    CHONG_HONG(state, data) {
      state.chongHongResp = data
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
    // 冲红
    async chongHong({ commit }, obj) {
      const resp = await chongHong(obj)
      commit('CHONG_HONG', resp)
    }
  }
}
export default invoiceDrawer
