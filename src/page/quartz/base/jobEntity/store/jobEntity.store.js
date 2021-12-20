import { pageInfo, initPage, initUpdate, saveData, editData, deleteData, queryByCategory,
  enable, deactivate, pageInfoLog } from './../api'
import { message } from '../../../../../utils/messageUtils'
const jobEntity = {
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
    paramObj: null,
    enableResp: null,
    deactivateResp: null,
    jobExecLogPage: { visible: false },
    totalLog: 0,
    pageRespLog: null
  },
  mutations: {

    PAGE_INFO(state, data) {
      if (data.code === state.successCode) {
        message.success(data.msg)
      }
      state.total = data.total
      state.pageResp = data.obj || []
    },
    PAGE_INFO_LOG(state, data) {
      state.totalLog = data.total
      state.pageRespLog = data.obj || []
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
    QUERY_BY_CATEGORY(state, data) {
      state.paramObj = data.obj || []
    },
    ENABLE(state, data) {
      state.enableResp = data
    },
    DEACTIVATE(state, data) {
      state.deactivateResp = data
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
    // 查询任务参数
    async queryByCategory({ commit }, obj) {
      const resp = await queryByCategory(obj)
      commit('QUERY_BY_CATEGORY', resp)
    },
    // 启用
    async enable({ commit }, obj) {
      const resp = await enable(obj)
      commit('ENABLE', resp)
    },
    // 停用
    async deactivate({ commit }, obj) {
      const resp = await deactivate(obj)
      commit('DEACTIVATE', resp)
    },
    // 查询事件
    async pageInfoLog({ commit }, obj) {
      const resp = await pageInfoLog(obj)
      commit('PAGE_INFO_LOG', resp)
    }
  }
}
export default jobEntity
