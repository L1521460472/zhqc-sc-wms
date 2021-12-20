import { pageInfo, initPage, initUpdate, saveData, editData, deleteData,
  queryBomBySkuId, initFinish, audit, unAudit, assign, unAssign, downShelf,
  updateMoLot, addFinishRegister, close } from './../api'
import { message } from '../../../../../utils/messageUtils'

const mo = {
  namespaced: true,
  state: {
    total: 0,
    successCode: 200,
    pageResp: null,
    addResp: null,
    editResp: null,
    deleteResp: null,
    initPageObj: null,
    initUpdateObj: null,
    skuBomObj: null,
    initFinishResp: null,
    auditResp: null,
    unAuditResp: null,
    assignResp: null,
    unAssignResp: null,
    downShelfResp: null,
    updateMoLotResp: null,
    addFinishRegisterResp: null,
    closeResp: null,
    moFinishCombPage: { visible: false },
    moFinishSplitPage: { visible: false },
    moDetailPage: { visible: false }
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
    QUERY_BOM_BY_SKU_ID(state, data) {
      state.skuBomObj = data.obj || []
    },
    INIT_FINISH(state, data) {
      state.initFinishResp = data
    },
    AUDIT(state, data) {
      state.auditResp = data
    },
    UN_AUDIT(state, data) {
      state.unAuditResp = data
    },
    ASSIGN(state, data) {
      state.assignResp = data
    },
    UN_ASSIGN(state, data) {
      state.unAssignResp = data
    },
    DOWN_SHELF(state, data) {
      state.downShelfResp = data
    },
    UPDATE_MO_LOT(state, data) {
      state.updateMoLotResp = data
    },
    ADD_FINISH_REGISTER(state, data) {
      state.addFinishRegisterResp = data
    },
    CLOSE(state, data) {
      state.closeResp = data
    },
    setData(state, data) {
      state[data.page] = data
    }
  },
  actions: {
    setData({ commit }, data) {
      commit('setData', data)
    },
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
    // 查询BOM信息
    async queryBomBySkuId({ commit }, obj) {
      const resp = await queryBomBySkuId(obj)
      commit('QUERY_BOM_BY_SKU_ID', resp)
    },
    // 审核
    async audit({ commit }, obj) {
      const resp = await audit(obj)
      commit('AUDIT', resp)
    },
    // 弃审
    async unAudit({ commit }, obj) {
      const resp = await unAudit(obj)
      commit('UN_AUDIT', resp)
    },
    // 审核
    async assign({ commit }, obj) {
      const resp = await assign(obj)
      commit('ASSIGN', resp)
    },
    // 弃审
    async unAssign({ commit }, obj) {
      const resp = await unAssign(obj)
      commit('UN_ASSIGN', resp)
    },
    // 领料下架
    async downShelf({ commit }, obj) {
      const resp = await downShelf(obj)
      commit('DOWN_SHELF', resp)
    },
    // 更新加工库位
    async updateMoLot({ commit }, obj) {
      const resp = await updateMoLot(obj)
      commit('UPDATE_MO_LOT', resp)
    },
    // 初始化完工对象
    async initFinish({ commit }, obj) {
      const resp = await initFinish(obj)
      commit('INIT_FINISH', resp)
    },
    // 初始化完工对象
    async addFinishRegister({ commit }, obj) {
      const resp = await addFinishRegister(obj)
      commit('ADD_FINISH_REGISTER', resp)
    },
    // 关闭
    async close({ commit }, obj) {
      const resp = await close(obj)
      commit('CLOSE', resp)
    }
  }
}
export default mo
