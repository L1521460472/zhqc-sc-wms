import { pageInfo, initPage, initUpdate, doAssign, cancelAssign } from './../api'
import { message } from '../../../../../utils/messageUtils'
const soAssignment = {
  namespaced: true,
  state: {
    total: 0,
    successCode: 200,
    pageResp: null,
    initPageObj: null,
    initUpdateObj: null,
    doAssignResp: null,
    cancelAssignResp: null
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
    INIT_UPDATE(state, data) {
      state.initUpdateObj = data.obj || {}
    },
    DO_ASSIGN(state, data) {
      state.doAssignResp = data
    },
    CANCEL_ASSIGN(state, data) {
      state.cancelAssignResp = data
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
    // 预分配
    async doAssign({ commit }, obj) {
      const resp = await doAssign(obj)
      commit('DO_ASSIGN', resp)
    },
    // 取消预分配
    async cancelAssign({ commit }, obj) {
      const resp = await cancelAssign(obj)
      commit('CANCEL_ASSIGN', resp)
    }
  }
}
export default soAssignment
