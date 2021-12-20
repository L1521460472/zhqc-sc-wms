import { pageInfo, initPage, initUpdate, saveData, editData, deleteData, FactoryListData, areaList, cityList, provinceList, queryOwnerList, deactivate, enable } from './../api'
// import { Message } from 'element-ui'
const lineFile = {
  namespaced: true,
  state: {
    total: 0,
    pageResp: null,
    addResp: null,
    editResp: null,
    deleteResp: null,
    initPageObj: null,
    initUpdateObj: null,
    factoryObj: null,
    provinceListResp: null,
    cityListResp: null,
    areaListResp: null,
    ownerListResp: null,
    initAddResp: null,
    deactivateResp: null,
    enableResp: null
  },
  mutations: {

    PAGE_INFO(state, data) {
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
    FACTORY_LIST_DATA(state, data) {
      state.factoryObj = data
    },
    PROVINCE_LIST(state, data) {
      state.provinceListResp = data
    },
    CITY_LIST(state, data) {
      state.cityListResp = data
    },
    AREA_LIST(state, data) {
      state.areaListResp = data
    },
    OWNER_LIST(state, data) {
      state.ownerListResp = data
    },
    INIT_ADD(state, data) {
      state.initAddResp = data
    },
    DEACTIVATE(state, data) {
      state.deactivateResp = data
    },
    ENABLE(state, data) {
      state.enableResp = data
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
    // 获取下拉列表 起始地 目的地
    async factorylistData({ commit }) {
      const resp = await FactoryListData()
      commit('FACTORY_LIST_DATA', resp)
    },
    // 查询 省份下拉列表
    async provinceList({ commit }, obj) {
      const resp = await provinceList(obj)
      commit('PROVINCE_LIST', resp)
    },
    // 查询 城市下拉列表
    async cityList({ commit }, obj) {
      const resp = await cityList(obj)
      commit('CITY_LIST', resp)
    },
    // 查询 区县下拉列表
    async areaList({ commit }, obj) {
      const resp = await areaList(obj)
      commit('AREA_LIST', resp)
    },
    // 查询 货主下拉列表
    async queryOwnerList({ commit }) {
      const resp = await queryOwnerList()
      commit('OWNER_LIST', resp)
    },
    //
    async dispathDeactivate({ commit }, obj) {
      const resp = await deactivate(obj)
      commit('DEACTIVATE', resp)
    },
    //
    async dispathEnable({ commit }, obj) {
      const resp = await enable(obj)
      commit('ENABLE', resp)
    }

  }
}
export default lineFile
