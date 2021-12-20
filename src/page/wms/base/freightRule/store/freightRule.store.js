import { cityLinkage, deleteData, editData, initPage, initUpdate, pageInfo, provinceLinkage, saveData } from './../api'
import { message } from '../../../../../utils/messageUtils'

const freightRule = {
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
    provinceLinkageResp: null,
    cityLinkageResp: null
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
      state.initPageObj = data || {}
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
    PROVINCE_LINKAGE_RESP(state, data) {
      state.provinceLinkageResp = data
    },
    CITY_LINKAGE_RESP(state, data) {
      state.cityLinkageResp = data
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
    // 删除数据事件
    async provinceLinkage({ commit }, obj) {
      const resp = await provinceLinkage(obj)
      commit('PROVINCE_LINKAGE_RESP', resp)
    },
    // 删除数据事件
    async cityLinkage({ commit }, obj) {
      const resp = await cityLinkage(obj)
      commit('CITY_LINKAGE_RESP', resp)
    }
  }
}
export default freightRule
