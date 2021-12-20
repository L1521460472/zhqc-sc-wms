import { pageInfo, initPage, queryEnumList, add, editData, enable, initUpdate,
  deactivate } from '../api'
import { message } from '@/utils/messageUtils'
const exchangeRate = {
  namespaced: true,
  state: {
    successCode: 200,
    total: 0,
    pageResp: null,
    initPageObj: null,
    addResp: null,
    enumListResp: null,
    editResp: null,
    cancelResp: null
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
      state.initPageObj = data
    },
    INIT_UPDATE(state, data) {
      state.initUpdateObj = data
    },
    PAGE_ADD(state, data) {
      state.addResp = data
    },
    EDIT_DATA(state, data) {
      state.editResp = data
    },
    QUERY_ENUM_LIST(state, data) {
      state.enumListResp = data
    },
    PAGE_REPORT(state, data) {
      state.reportResp = data
    },
    ENABLE(state, data) {
      state.enableResp = data
    },
    DEACTIVATE(state, data) {
      state.deactivateResp = data
    }
  },
  actions: {
    // 查询事件
    async pageInfo({ commit }, obj) {
      const resp = await pageInfo(obj)
      if (resp.code === this.state.successCode) {
        this.message(resp.msg)
      }
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
    // 新增流程策略
    async add({ commit }, obj) {
      const resp = await add(obj)
      commit('PAGE_ADD', resp)
    },
    // 修改保存事件
    async editData({ commit }, obj) {
      const resp = await editData(obj)
      commit('EDIT_DATA', resp)
    },
    // 根据订单类型查询
    async queryEnumList({ commit }, obj) {
      const resp = await queryEnumList(obj)
      commit('QUERY_ENUM_LIST', resp)
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
    }
  }
}
export default exchangeRate
