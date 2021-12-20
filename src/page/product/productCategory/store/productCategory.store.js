import { pageInfo, saveData, editData, deleteData } from '../api/index'
import { Message } from 'element-ui'

const productCategory = {
  namespaced: true,
  state: {
    successCode: 200,
    total: 0,
    pageResp: null,
    addResp: null,
    editResp: null,
    deleteResp: null
  },
  mutations: {
    PAGE_INFO(state, data) {
      if (data.code === state.successCode) {
        Message({ showClose: true, message: data.msg, type: 'success' })
      }
      state.total = data.total
      state.pageResp = data.obj || []
    },
    SAVE_DATA(state, data) {
      state.addResp = data
    },
    EDIT_DATA(state, data) {
      state.editResp = data
    },
    DELETE_DATA(state, data) {
      state.deleteResp = data
    }
  },
  actions: {
    // 查询事件
    async pageInfo({ commit }, obj) {
      const resp = await pageInfo(obj)
      commit('PAGE_INFO', resp)
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
      const resp = await deleteData(obj.id)
      commit('DELETE_DATA', resp)
    }
  }
}

export default productCategory

