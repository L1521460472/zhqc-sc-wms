import { pageInfo, initPage, rePush, rePushs } from './../api'
import { message } from '@/utils/messageUtils'
const globalRule = {
  namespaced: true,
  state: {
    total: 0,
    successCode: 200,
    pageResp: null,
    rePushsObj: null,
    editResp: null,
    deleteResp: null,
    initPageObj: null,
    rePushObj: null
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
    REPUSH(state, data) {
      state.rePushObj = data
    },
    REPUSHS(state, data) {
      state.rePushsObj = data
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
    // 单条重推
    async rePush({ commit }, obj) {
      const resp = await rePush(obj)
      commit('REPUSH', resp)
    },
    // 多条重推
    async rePushs({ commit }, obj) {
      const resp = await rePushs(obj)
      commit('REPUSHS', resp)
    }
  }
}
export default globalRule
