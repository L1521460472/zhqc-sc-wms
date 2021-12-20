import { pageInfo, initPage, initUpdate, saveData, editData, deleteData, queryPickDt, queryPickSoAssign, queryPickInfo, queryPickSow, print, printTheExpressWaybill } from './../api'
import { message } from '../../../../../utils/messageUtils'
const pickOrder = {
  namespaced: true,
  state: {
    total: 0,
    successCode: 200,
    pickDtTotal: 0,
    pickSoAssignTotal: 0,
    pickInfoTotal: 0,
    pickSowTotal: 0,
    pageResp: null,
    pagePickDtResp: null,
    pagePickSoAssignResp: null,
    pagePickInfoResp: null,
    pagePickSowResp: null,
    addResp: null,
    editResp: null,
    deleteResp: null,
    initPageResp: null,
    initUpdateObj: null,
    printResp: null,
    printTheExpressWaybillResp: null
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
    // 查询拣货单明细
    QUERY_PICK_DT(state, data) {
      state.pickDtTotal = data.total
      state.pagePickDtResp = data.obj || []
    },
    // 查询拣货SO分配明细
    PICK_SO_ASSIGN(state, data) {
      state.pickSoAssignTotal = data.total
      state.pagePickSoAssignResp = data.obj || []
    },
    // 查询拣货记录
    QUERY_PICK_INFO(state, data) {
      state.pickInfoTotal = data.total
      state.pagePickInfoResp = data.obj || []
    },
    // 查询拣货播种
    QUERY_PICK_SOW(state, data) {
      state.pickSowTotal = data.total
      state.pagePickSowResp = data.obj || []
    },
    // 打印
    PRINT(state, data) {
      state.printResp = data
    },
    // 打印快递面单
    PRINT_THE_EXPRESS_WAYBILL(state, data) {
      state.printTheExpressWaybillResp = data
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
    // 查询拣货单明细
    async queryPickDt({ commit }, obj) {
      const resp = await queryPickDt(obj)
      commit('QUERY_PICK_DT', resp)
    },
    // 查询拣货SO分配明细
    async queryPickSoAssign({ commit }, obj) {
      const resp = await queryPickSoAssign(obj)
      commit('PICK_SO_ASSIGN', resp)
    },
    // 查询拣货记录
    async queryPickInfo({ commit }, obj) {
      const resp = await queryPickInfo(obj)
      commit('QUERY_PICK_INFO', resp)
    },
    // 查询拣货播种
    async queryPickSow({ commit }, obj) {
      const resp = await queryPickSow(obj)
      commit('QUERY_PICK_SOW', resp)
    },
    // 打印
    async print({ commit }, obj) {
      const resp = await print(obj)
      commit('PRINT', resp)
    },
    // 打印快递面单
    async printTheExpressWaybill({ commit }, obj) {
      const resp = await printTheExpressWaybill(obj)
      commit('PRINT_THE_EXPRESS_WAYBILL', resp)
    }
  }
}
export default pickOrder
