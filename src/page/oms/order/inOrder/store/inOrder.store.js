import { pageInfo, initPage, initUpdate,
  saveData, editData, deleteDt, viewConsignee,
  viewPartnerName, createAsn, deleteData,
  cancel, batchSend, queryCountInfo } from './../api'
import { message } from '../../../../../utils/messageUtils'
const inOrder = {
  namespaced: true,
  state: {
    successCode: 200,
    total: 0,
    pageResp: null,
    addResp: null,
    editResp: null,
    deleteResp: null,
    deleteDtResp: null,
    createAsnResp: null,
    initPageObj: null,
    initUpdateObj: null,
    vieConsigneeResp: null,
    viewPartnerNameResp: null,
    cancelResp: null,
    batchSendResp: null,
    countInfoResp: null
  },
  mutations: {
    PAGE_INFO(state, data) {
      if (data.code === state.successCode) {
        message.success(data.msg)
      }
      state.total = data.total
      state.pageResp = data.obj || []
    },
    VIEW_CONSIGNEE(state, data) {
      state.vieConsigneeResp = data.obj || {}
    },
    INIT_PAGE(state, data) {
      state.initPageObj = data
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
    VIEW_CARRIERNAME(state, data) {
      state.viewPartnerNameResp = data.obj || {}
    },
    DELETE_DATA(state, data) {
      state.deleteResp = data
    },
    DELETE_DT(state, data) {
      state.deleteDtResp = data
    },
    CREATE_ASN(state, data) {
      state.createAsnResp = data
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
    //  查看界面的 承运商名称 id转化为value 显示
    async viewPartnerName({ commit }, obj) {
      const resp = await viewPartnerName(obj)
      commit('VIEW_CARRIERNAME', resp)
    },
    // 新增保存事件
    async saveData({ commit }, obj) {
      const resp = await saveData(obj)
      commit('SAVE_DATA', resp)
    },
    //  查看界面的 收货方 id转化为value 显示
    async viewConsignee({ commit }, obj) {
      const resp = await viewConsignee(obj)
      commit('VIEW_CONSIGNEE', resp)
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
    // 创建ASN事件
    async createAsn({ commit }, obj) {
      const resp = await createAsn(obj)
      commit('CREATE_ASN', resp)
    },
    // 删除数据事件
    async deleteDt({ commit }, obj) {
      const resp = await deleteDt(obj)
      commit('DELETE_DT', resp)
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
export default inOrder
