import { pageInfo, initPage, initUpdate, viewStoreName, saveData, viewConsignee, viewPartnerName, viewCourierName, editData, deleteData, createSo, cancel, batchSend, queryCountInfo } from './../api'
import { message } from '../../../../../utils/messageUtils'
const outOrder = {
  namespaced: true,
  state: {
    successCode: 200,
    total: 0,
    pageResp: null,
    addResp: null,
    editResp: null,
    deleteResp: null,
    initPageObj: null,
    initUpdateObj: null,
    viewStoreNameResp: null,
    createSoResp: null,
    cancelResp: null,
    vieConsigneeResp: null,
    viewPartnerNameResp: null,
    viewCourierNameResp: null,
    batchSendResp: null
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
    VIEW_STORENAME(state, data) {
      state.viewStoreNameResp = data.obj || {}
    },
    VIEW_CARRIERNAME(state, data) {
      state.viewPartnerNameResp = data.obj || {}
    },
    VIEW_COURIERNAME(state, data) {
      state.viewCourierNameResp = data.obj || {}
    },
    VIEW_CONSIGNEE(state, data) {
      state.vieConsigneeResp = data.obj || {}
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
    CREATE_SO(state, data) {
      state.createSoResp = data
    },
    CANCEL(state, data) {
      state.cancelResp = data
    },
    BATCHSEND(state, data) {
      state.batchSendResp = data
    },
    CountInfo(state, data) {
      state.countInfoResp = data
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
    //  查看界面的 店铺名称 id转化为value
    async viewStoreName({ commit }, obj) {
      const resp = await viewStoreName(obj)
      commit('VIEW_STORENAME', resp)
    },
    //  查看界面的 收货方 id转化为value 显示
    async viewConsignee({ commit }, obj) {
      const resp = await viewConsignee(obj)
      commit('VIEW_CONSIGNEE', resp)
    },
    //  查看界面的 承运商名称 id转化为value 显示
    async viewPartnerName({ commit }, obj) {
      const resp = await viewPartnerName(obj)
      commit('VIEW_CARRIERNAME', resp)
    },
    //  查看界面的 快递商名称 id转化为value 显示
    async viewCourierName({ commit }, obj) {
      const resp = await viewCourierName(obj)
      commit('VIEW_COURIERNAME', resp)
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
    // 创建SO事件
    async createSo({ commit }, obj) {
      const resp = await createSo(obj)
      commit('CREATE_SO', resp)
    },
    // 取消订单
    async cancel({ commit }, obj) {
      const resp = await cancel(obj)
      commit('CANCEL', resp)
    },
    // 批量下发
    async batchSend({ commit }, obj) {
      const resp = await batchSend(obj)
      commit('BATCHSEND', resp)
    },
    async queryCountInfo({ commit }, obj) {
      const resp = await queryCountInfo(obj)
      commit('CountInfo', resp)
    }
  }
}
export default outOrder
