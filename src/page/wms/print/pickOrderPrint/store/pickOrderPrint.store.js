import { initPage, pageInfo, print } from './../api'
import { message } from '../../../../../utils/messageUtils'
const pickOrderPrint = {
  namespaced: true,
  state: {
    successCode: 200,
    total: 0,
    pageResp: null,
    initPageResp: null,
    printResp: null
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
    // 打印
    PRINT(state, data) {
      state.printResp = data
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
    // 打印
    async print({ commit }, obj) {
      const resp = await print(obj)
      commit('PRINT', resp)
    }
  }
}
export default pickOrderPrint
