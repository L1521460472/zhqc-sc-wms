import { pageInfo, initPage, initUpdate, saveData, editData, deleteData,
  queryTransportTripList, queryTransportItemList, queryTransportRouteList,
  queryTransportLogList, queryPlanList, getTransportTripInfo, updateTransportTripInfo,
  updateTransportRoute, errReportTransportOrder, cancelTransportOrder, delTransportRouteInfo,
  queryTransportStatusByRoute, initUpdateByNo
} from './../api'
// import { Message } from 'element-ui'
const waybill = {
  namespaced: true,
  state: {
    total: 0,
    pageResp: null,
    addResp: null,
    editResp: null,
    deleteResp: null,
    initPageObj: null,
    initUpdateObj: null,
    transportTripResp: null,
    transportItemResp: null,
    transportRouteResp: null,
    transportLogResp: null,
    transportPlanResp: null,
    transportTripInfoResp: null,
    updataTransportRouteResp: null,
    updateTripInfoResp: null,
    errorTripInfoResp: null,
    cancelTripInfoResp: null,
    delTransportRouteInfoResp: null,
    transportStatusByRouteResp: null,
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
    SAVE_DATA(state, data) {
      state.addResp = data
    },
    EDIT_DATA(state, data) {
      state.editResp = data
    },
    DELETE_DATA(state, data) {
      state.deleteResp = data
    },
    QUERY_TRANSPORT_TRIP(state, data) {
      state.transportTripResp = data
    },
    QUERY_TRANSPORT_ITEM(state, data) {
      state.transportItemResp = data
    },
    QUERY_TRANSPORT_ROUTE(state, data) {
      state.transportRouteResp = data
    },
    QUERY_TRANSPORT_LOG(state, data) {
      state.transportLogResp = data
    },
    QUERY_TRANSPORT_PLAN(state, data) {
      state.transportPlanResp = data
    },
    QUERY_TRANSPORT_TRIPINFO(state, data) {
      state.transportTripInfoResp = data
    },
    UPDATA_TRANSPORT_ROUTE(state, data) {
      state.updataTransportRouteResp = data
    },
    UPDATE_TRANSPORT_TRIPINFO(state, data) {
      state.updateTripInfoResp = data
    },
    ERROR_TRANSPORT_INFO(state, data) {
      state.errorTripInfoResp = data
    },
    CANCEL_TRANSPORT_INFO(state, data) {
      state.cancelTripInfoResp = data
    },
    DEL_TRANSPORT_ROUTE_INFO(state, data) {
      state.delTransportRouteInfoResp = data
    },
    TRANSPORT_STATUS_BY_ROUTE(state, data) {
      state.transportStatusByRouteResp = data
    },
    INIT_UPDATE_BY_NO(state, data) {
      state.initUpdateByNoObj = data.obj || {}
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
    // 删除数据事件
    async deleteData({ commit }, obj) {
      const resp = await deleteData(obj)
      commit('DELETE_DATA', resp)
    },
    async queryTransportTripList({ commit }, obj) {
      const resp = await queryTransportTripList(obj)
      commit('QUERY_TRANSPORT_TRIP', resp)
    },
    async queryTransportItemList({ commit }, obj) {
      const resp = await queryTransportItemList(obj)
      commit('QUERY_TRANSPORT_ITEM', resp)
    },
    async queryTransportRouteList({ commit }, obj) {
      const resp = await queryTransportRouteList(obj)
      commit('QUERY_TRANSPORT_ROUTE', resp)
    },
    async queryTransportLogList({ commit }, obj) {
      const resp = await queryTransportLogList(obj)
      commit('QUERY_TRANSPORT_LOG', resp)
    },
    async queryPlanList({ commit }, obj) {
      const resp = await queryPlanList(obj)
      commit('QUERY_TRANSPORT_PLAN', resp)
    },
    async getTransportTripInfo({ commit }, obj) {
      const resp = await getTransportTripInfo(obj)
      commit('QUERY_TRANSPORT_TRIPINFO', resp)
    },
    // 保存路由维护
    async updateTransportRoute({ commit }, obj) {
      const resp = await updateTransportRoute(obj)
      commit('UPDATA_TRANSPORT_ROUTE', resp)
    },
    async updateTransportTripInfo({ commit }, obj) {
      const resp = await updateTransportTripInfo(obj)
      commit('UPDATE_TRANSPORT_TRIPINFO', resp)
    },
    async errReportTransportOrder({ commit }, obj) {
      const resp = await errReportTransportOrder(obj)
      commit('ERROR_TRANSPORT_INFO', resp)
    },
    async cancelTransportOrder({ commit }, obj) {
      const resp = await cancelTransportOrder(obj)
      commit('CANCEL_TRANSPORT_INFO', resp)
    },
    async delTransportRouteInfo({ commit }, obj) {
      const resp = await delTransportRouteInfo(obj)
      commit('DEL_TRANSPORT_ROUTE_INFO', resp)
    },
    async queryTransportStatusByRoute({ commit }, obj) {
      const resp = await queryTransportStatusByRoute(obj)
      commit('TRANSPORT_STATUS_BY_ROUTE', resp)
    },
    async initUpdateByNo({ commit }, obj) {
      const resp = await initUpdateByNo(obj)
      commit('INIT_UPDATE_BY_NO', resp)
    }

  }
}
export default waybill
