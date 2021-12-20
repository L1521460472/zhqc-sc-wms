import { pageInfo, initPage, initUpdate, oneKeyOutWh, autoAssignZp, saveData, editData, deleteData, frozen, unfrozen,
  crossDocking, cancelCrossDocking, fastPick, sendMessageErp, print } from './../api'
import { message } from '../../../../../utils/messageUtils'
const so = {
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
    oneKeyOutResp: null,
    autoAssignResp: null,
    frozenResp: null,
    unfrozenResp: null,
    crossDockingResp: null,
    cancelCrossDockingResp: null,
    fastPickResp: null,
    sendMessageErpResp: null,
    printResp: null
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
    ONEKEY_OUT(state, data) {
      state.oneKeyOutResp = data
    },
    AUTO_ASSIGNZP(state, data) {
      state.autoAssignResp = data
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
    FROZEN(state, data) {
      state.frozenResp = data
    },
    UNFROZEN(state, data) {
      state.unfrozenResp = data
    },
    CROSS_DOCKING(state, data) {
      state.crossDockingResp = data
    },
    CANCEL_CROSS_DOCKING(state, data) {
      state.cancelCrossDockingResp = data
    },
    FAST_PICK(state, data) {
      state.fastPickResp = data
    },
    SEND_MESSAGE_ERP(state, data) {
      state.sendMessageErpResp = data
    },
    PRINT(state, data) {
      state.printResp = data
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
    async oneKeyOutWh({ commit }, obj) {
      const resp = await oneKeyOutWh(obj)
      commit('ONEKEY_OUT', resp)
    },
    async autoAssignZp({ commit }, obj) {
      const resp = await autoAssignZp(obj)
      commit('AUTO_ASSIGNZP', resp)
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
    // 冻结
    async frozen({ commit }, obj) {
      const resp = await frozen(obj)
      commit('FROZEN', resp)
    },
    // 解冻
    async unfrozen({ commit }, obj) {
      const resp = await unfrozen(obj)
      commit('UNFROZEN', resp)
    },
    // 越库标识
    async crossDocking({ commit }, obj) {
      const resp = await crossDocking(obj)
      commit('CROSS_DOCKING', resp)
    },
    // 取消越库
    async cancelCrossDocking({ commit }, obj) {
      const resp = await cancelCrossDocking(obj)
      commit('CANCEL_CROSS_DOCKING', resp)
    },
    // 快速拣货
    async fastPick({ commit }, obj) {
      const resp = await fastPick(obj)
      commit('FAST_PICK', resp)
    },
    // 快速拣货
    async sendMessageErp({ commit }, obj) {
      const resp = await sendMessageErp(obj)
      commit('SEND_MESSAGE_ERP', resp)
    },
    // 打印
    async print({ commit }, obj) {
      const resp = await print(obj)
      commit('PRINT', resp)
    }
  }
}
export default so
