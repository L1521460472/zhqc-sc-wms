import { pageInfo, initPage, initUpdate, saveData, editData, deleteData, queryInStockPro, auditAdj, unAuditAdj, batchAudit, batchDelete } from './../api'
import { message } from '../../../../../utils/messageUtils'
const inventoryFrozen = {
  namespaced: true,
  state: {
    total: 0,
    pageResp: null,
    InStockProTotal: 0,
    successCode: 200,
    InStockProPageResp: null,
    addResp: null,
    editResp: null,
    deleteResp: null,
    initPageObj: null,
    initUpdateObj: null,
    auditAdjResp: null,
    unAuditAdjResp: null,
    auditBatchResp: null,
    batchDeleteResp: null
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
    SAVE_DATA(state, data) {
      state.addResp = data
    },
    EDIT_DATA(state, data) {
      state.editResp = data
    },
    DELETE_DATA(state, data) {
      state.deleteResp = data
    },

    // 审核
    AUDIT_ADJ(state, data) {
      state.auditAdjResp = data
    },
    // 弃审
    UN_AUDIT_ADJ(state, data) {
      state.unAuditAdjResp = data
    },
    //
    BATCH_AUDIT(state, data) {
      state.auditBatchResp = data
    },
    BATCH_DELETE(state, data) {
      state.batchDeleteResp = data
    },

    // 查询在库产品列表
    QUERY_IN_STOCK_PRO(state, data) {
      if (data.code === state.successCode) {
        message.success(data.msg)
      }
      state.InStockProTotal = data.total
      state.InStockProPageResp = data.obj || []
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

    // 批量/审核
    async auditAdj({ commit }, obj) {
      const resp = await auditAdj(obj)
      commit('AUDIT_ADJ', resp)
    },
    // 批量/弃审
    async unAuditAdj({ commit }, obj) {
      const resp = await unAuditAdj(obj)
      commit('UN_AUDIT_ADJ', resp)
    },

    // 批量/审核
    async batchAudit({ commit }, obj) {
      const resp = await batchAudit(obj)
      commit('BATCH_AUDIT', resp)
    },
    async batchDelete({ commit }, obj) {
      const resp = await batchDelete(obj)
      commit('BATCH_DELETE', resp)
    },

    // 查询在库产品列表
    async queryInStockPro({ commit }, obj) {
      const resp = await queryInStockPro(obj)
      commit('QUERY_IN_STOCK_PRO', resp)
    }

  }
}
export default inventoryFrozen
