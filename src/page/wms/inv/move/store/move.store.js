import { pageInfo, initPage, initUpdate, saveData, editData, deleteData, queryCanMoveStock, audit, cancelAudit, deleteDt } from './../api'
import { message } from '../../../../../utils/messageUtils'
const emphMaintain = {
  namespaced: true,
  state: {
    successCode: 200,
    total: 0,
    InStockProTotal: 0,
    InStockProPageResp: null,
    pageResp: null,
    addResp: null,
    editResp: null,
    deleteResp: null,
    initPageResp: null,
    initUpdateObj: null,
    auditResp: null,
    cancelAuditResp: null,
    deleteDtResp: null
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

    // 查询在库产品列表
    QUERY_CAN_MOVE_STOCK(state, data) {
      if (data.code === state.successCode) {
        message.success(data.msg)
      }
      state.InStockProTotal = data.total
      state.InStockProPageResp = data.obj || []
    },
    // 审核
    AUDIT(state, data) {
      state.auditResp = data
    },
    // 取消审核
    CANCEL_AUDIT(state, data) {
      state.cancelAuditResp = data
    },
    // 删除养护品种确定明细
    DELETE_DT(state, data) {
      state.deleteDtResp = data
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

    // 查询在库产品列表
    async queryCanMoveStock({ commit }, obj) {
      const resp = await queryCanMoveStock(obj)
      commit('QUERY_CAN_MOVE_STOCK', resp)
    },
    // 审核
    async audit({ commit }, obj) {
      const resp = await audit(obj)
      commit('AUDIT', resp)
    },
    // 取消审核
    async cancelAudit({ commit }, obj) {
      const resp = await cancelAudit(obj)
      commit('CANCEL_AUDIT', resp)
    },
    // 删除养护品种确定明细
    async deleteDt({ commit }, obj) {
      const resp = await deleteDt(obj)
      commit('DELETE_DT', resp)
    }
  }
}
export default emphMaintain
