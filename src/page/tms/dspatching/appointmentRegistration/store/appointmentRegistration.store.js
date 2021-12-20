import { pageInfo, initPage, pageView, saveData, editData, getOrderInfo } from './../api'
const appointmentRegistration = {
  namespaced: true,
  state: {
    total: 0,
    pageResp: null,
    initPageObj: null,
    rowResp: null,
    addResp: null,
    editResp: null,
    orderInfo: null
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
      state.rowResp = data.obj || {}
    },
    SAVE_DATA(state, data) {
      state.addResp = data
    },
    EDIT_DATA(state, data) {
      state.editResp = data
    },
    GET_ORDER_INFO(state, data) {
      state.orderInfo = data.obj || {}
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
    // 查看
    async pageView({ commit }, obj) {
      const resp = await pageView(obj)
      commit('PAGE_VIEW', resp)
    },
    // 新增保存事件
    async saveData({ commit }, obj) {
      const resp = await saveData(obj)
      commit('SAVE_DATA', resp)
    },
    // 修改保存事件
    async editData({ commit }, obj) {
      const resp = await editData(obj)
      commit('EDIT_DATA', resp)
    },
    // 修改保存事件
    async getOrderInfo({ commit }, obj) {
      const resp = await getOrderInfo(obj)
      commit('GET_ORDER_INFO', resp)
    }
  }
}
export default appointmentRegistration
