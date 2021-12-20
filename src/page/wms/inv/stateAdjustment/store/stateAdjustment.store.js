import { pageInfo, initPage, initUpdate, saveData, editData, deleteData, confirmInventory, cancelConfirmInventory, queryInStockPro, auditData, getRecommLot, querySkuCbList, queryOwnerCbList } from '../api'
import { message } from '../../../../../utils/messageUtils'
const stateAdjustment = {
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
    confirmResp: null,
    cancelConfirmResp: null,
    lotCodeResp: null,
    queryOwnerCbListResp: null,
    querySkuCbListResp: null,
    auditResp: null
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

    // 盘点确认
    CONFIRM_INVENTORY(state, data) {
      state.confirmResp = data
    },
    // 取消盘点
    CANCEL_CONFIRM_INVENTORY(state, data) {
      state.cancelConfirmResp = data
    },
    // 库位
    GET_RECOMM_LOT(state, data) {
      state.lotCodeResp = data
    },
    // 耗材货主
    QUERY_OWNER_CB_LIST(state, data) {
      state.queryOwnerCbListResp = data
    },
    // 耗材商品
    QUERY_SKU_CB_LIST(state, data) {
      state.querySkuCbListResp = data
    },

    // 查询在库产品列表
    QUERY_IN_STOCK_PRO(state, data) {
      if (data.code === state.successCode) {
        message.success(data.msg)
      }
      state.InStockProTotal = data.total
      state.InStockProPageResp = data.obj || []
    },
    AUDITDATA(state, data) {
      state.auditResp = data
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

    // 盘点确认
    async confirmInventory({ commit }, obj) {
      const resp = await confirmInventory(obj)
      commit('CONFIRM_INVENTORY', resp)
    },
    // 取消盘点确认
    async cancelConfirmInventory({ commit }, obj) {
      const resp = await cancelConfirmInventory(obj)
      commit('CANCEL_CONFIRM_INVENTORY', resp)
    },
    // 库位
    async getRecommLot({ commit }, obj) {
      const resp = await getRecommLot(obj)
      commit('GET_RECOMM_LOT', resp)
    },
    // 耗材货主
    async queryOwnerCbList({ commit }, obj) {
      const resp = await queryOwnerCbList(obj)
      commit('QUERY_OWNER_CB_LIST', resp)
    },
    // 耗材商品
    async querySkuCbList({ commit }, obj) {
      const resp = await querySkuCbList(obj)
      commit('QUERY_SKU_CB_LIST', resp)
    },

    // 查询在库产品列表
    async queryInStockPro({ commit }, obj) {
      const resp = await queryInStockPro(obj)
      commit('QUERY_IN_STOCK_PRO', resp)
    },
    async audit({ commit }, obj) {
      const resp = await auditData(obj)
      commit('AUDITDATA', resp)
    }

  }
}
export default stateAdjustment
