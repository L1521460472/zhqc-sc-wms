import { pageInfo, initPage, pageView, add, report, cancel } from '../api'
// import { message } from '../../../../../utils/messageUtils'
const receivableContract = {
  namespaced: true,
  state: {
    successCode: 200,
    total: 0,
    pageResp: null,
    initPageObj: null,
    rowData: null,
    addResp: null,
    reportResp: null,
    cancelResp: null
  },
  mutations: {
    PAGE_INFO(state, data) {
      if (data.code === state.successCode) {
        // message.success(data.msg)
      }
      state.total = data.total
      state.pageResp = data.obj || []
    },
    INIT_PAGE(state, data) {
      state.initPageObj = data
    },
    PAGE_VIEW(state, data) {
      state.rowData = data.obj
    },
    PAGE_ADD(state, data) {
      state.addResp = data
    },
    PAGE_REPORT(state, data) {
      state.reportResp = data
    },
    PAGE_CANCEL(state, data) {
      state.cancelResp = data
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
    },
    // 预约登记事件
    async add({ commit }, obj) {
      const resp = await add(obj)
      commit('PAGE_ADD', resp)
    },
    // 异常报备事件
    async report({ commit }, obj) {
      const resp = await report(obj)
      commit('PAGE_REPORT', resp)
    },
    // 取消发运
    async cancel({ commit }, obj) {
      const resp = await cancel(obj)
      commit('PAGE_CANCEL', resp)
    }
  }
}
export default receivableContract
