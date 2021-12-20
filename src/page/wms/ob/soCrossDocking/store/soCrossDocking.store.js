import { pageInfo, initPage, initUpdate, createPickOrder } from './../api'
import { message } from '../../../../../utils/messageUtils'
const soCrossDocking = {
  namespaced: true,
  state: {
    total: 0,
    successCode: 200,
    pageResp: null,
    initPageObj: null,
    initUpdateObj: null,
    createPickOrderResp: null
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
    CREATE_PICK_ORDER(state, data) {
      state.createPickOrderResp = data
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
    // 一键拣货
    async createPickOrder({ commit }, obj) {
      const resp = await createPickOrder(obj)
      commit('CREATE_PICK_ORDER', resp)
    }
  }
}
export default soCrossDocking
