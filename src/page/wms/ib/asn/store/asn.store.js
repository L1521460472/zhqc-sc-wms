import { pageInfo, initPage, initUpdate, saveData, editData, deleteDt, deleteData, print, queryCountInfo } from './../api'
import { message } from '../../../../../utils/messageUtils'
const asn = {
  namespaced: true,
  state: {
    successCode: 200,
    total: 0,
    asnNo: null,
    pageResp: null,
    addResp: null,
    editResp: null,
    deleteResp: null,
    deleteDtResp: null,
    initPageObj: null,
    initUpdateObj: null,
    countInfoResp: null,
    printResp: null

  },
  mutations: {
    setAsnNo(state, data) {
      state.asnNo = data
    },
    PAGE_INFO(state, data) {
      if (data.code === state.successCode) {
        message.success(data.msg)
      }
      state.total = data.total
      state.pageResp = data.obj || []
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
    DELETE_DATA(state, data) {
      state.deleteResp = data
    },
    DELETE_DT(state, data) {
      state.deleteDtResp = data
    },
    PRINT(state, data) {
      state.printResp = data
    },
    CountInfo(state, data) {
      state.countInfoResp = data
    }

  },
  actions: {
    async setAsnNo({ commit }, data) {
      commit('setAsnNo', data)
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
    // 删除数据事件
    async deleteDt({ commit }, obj) {
      const resp = await deleteDt(obj)
      commit('DELETE_DT', resp)
    },
    // 打印
    async print({ commit }, obj) {
      const resp = await print(obj)
      commit('PRINT', resp)
    },
    async queryCountInfo({ commit }, obj) {
      const resp = await queryCountInfo(obj)
      commit('CountInfo', resp)
    }
  }
}
export default asn
