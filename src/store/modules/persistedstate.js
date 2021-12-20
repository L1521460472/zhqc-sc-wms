import { findDyTableDtListDtByUnionKey, saveOrUpdate } from '@/view/api/ajax'
const persistedstate = {
  namespaced: true,
  state: {
    tableConfigGroup: {},
    formConfigGroup: {},
    findDyTableResp: null,
    saveOrUpdateResp: null
  },
  mutations: {
    setList(state, data) {
      state.tableConfigGroup[data.id] = data.list
    },
    SET_LIST(state, data) {
      state.tableConfigGroup[data.id] = data.list
    },
    SET_FORM_LIST(state, data) {
      state.formConfigGroup[data.id] = data.list
    },
    FIND_DY_TABLE_DTLIST_DT_BY_UNION_KEY(state, data) {
      state.findDyTableResp = data
    },
    SAVE_OR_UPDATE(state, data) {
      state.saveOrUpdateResp = data
    }
  },
  actions: {
    setList({ commit }, params) {
      commit('SET_LIST', params)
    },
    setFormList({ commit }, params) {
      commit('SET_FORM_LIST', params)
    },
    async findDyTableDtListDtByUnionKey({ commit }, obj) {
      const resp = await findDyTableDtListDtByUnionKey(obj)
      commit('FIND_DY_TABLE_DTLIST_DT_BY_UNION_KEY', resp)
    },
    async saveOrUpdate({ commit }, obj) {
      const resp = await saveOrUpdate(obj)
      commit('SAVE_OR_UPDATE', resp)
    }
  }
}

export default persistedstate
