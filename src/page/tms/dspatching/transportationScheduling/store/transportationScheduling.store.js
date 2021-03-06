import { pageInfo, initPage, findDispatch, addDispatch, cancelDispatch, removeDispatch, addAssignment, saveAssignment, updateDispatch, getTransportTool, getSkuInfo } from '../api'
import { provinceList, cityList, areaList } from '@/api/ajax.js'
import { message } from '../../../../../utils/messageUtils'

const inOrder = {
  namespaced: true,
  state: {
    successCode: 200,
    total: 0,
    total2: 0,
    resp: [],
    resp2: [],
    respInfo: {},
    respInfo2: {},
    initPageObj: null,
    assignmentResp: null,
    saveAssignmentResp: null,
    tempAssignmentNo: null,
    updateDispatchResp: null,
    addDispatchResp: null,
    transportTool: null,
    provinceList: [],
    cityList: [],
    areaList: [],
    skuInfo: {}
  },
  mutations: {
    PAGE_INFO(state, data) {
      if (data.code === state.successCode) {
        message.success(data.msg)
      }
      state.total = data.obj && data.obj.planOrderPage && data.obj.planOrderPage.total || 0
      state.resp = data.obj && data.obj.planOrderPage && data.obj.planOrderPage.obj || []
      state.respInfo = data.obj || {}
    },
    INIT_PAGE(state, data) {
      state.initPageObj = data
    },
    FIND_DISPATCH(state, data) {
      if (data.code === 200) {
        state.total2 = data.obj.orderItemPage && data.obj.orderItemPage.obj.length || 0
        state.resp2 = data.obj.orderItemPage && data.obj.orderItemPage.obj || []
        state.tempAssignmentNo = data.obj.tempAssignmentNo
        state.respInfo2 = data.obj
      }
    },
    ADD_DISPATCH(state, data) {
      state.addDispatchResp = data
    },
    CANCEL_DISPATCH(state, data) {
      if (data.code === 200) {
        // state.resp2 = []
      }
    },
    REMOVE_DISPATCH(state, data) {
      if (data.code === 200) {
        // state.resp2 = []
      }
    },
    ADD_ASSIGNMENT(state, data) {
      state.assignmentResp = data
    },
    SAVE_ASSIGNMENT(state, data) {
      state.saveAssignmentResp = data
    },
    UPDATE_DISPATCH(state, data) {
      state.updateDispatchResp = data
    },
    TRANSPORT_TOOL(state, data) {
      if (data.code === 200) {
        state.transportTool = data.obj
      }
    },
    GET_PROVINCE_LIST(state, data) {
      if (data.code === 200) {
        state.provinceList = data.obj
      }
    },
    GET_CITY_LIST(state, data) {
      if (data.code === 200) {
        state.cityList = data.obj
      }
    },
    GET_AREA_LIST(state, data) {
      if (data.code === 200) {
        state.areaList = data.obj
      }
    },
    GET_SKU_INFO(state, data) {
      if (data.code === 200) {
        state.skuInfo = data.obj
      }
    }
  },
  actions: {
    // ????????????
    async pageInfo({ commit }, obj) {
      const resp = await pageInfo(obj)
      commit('PAGE_INFO', resp)
    },
    // ?????????????????????
    async initPage({ commit }, obj) {
      const resp = await initPage(obj)
      commit('INIT_PAGE', resp)
    },
    // ??????
    async findDispatch({ commit }, obj) {
      const resp = await findDispatch(obj)
      commit('FIND_DISPATCH', resp)
    },
    // ????????????
    async addDispatch({ commit }, obj) {
      const resp = await addDispatch(obj)
      commit('ADD_DISPATCH', resp)
    },
    // ????????????
    async cancelDispatch({ commit }, obj) {
      const resp = await cancelDispatch(obj)
      commit('CANCEL_DISPATCH', resp)
    },
    // ??????
    async removeDispatch({ commit }, obj) {
      const resp = await removeDispatch(obj)
      commit('REMOVE_DISPATCH', resp)
    },
    // ????????????
    async addAssignment({ commit }, obj) {
      const resp = await addAssignment(obj)
      commit('ADD_ASSIGNMENT', resp)
    },
    // ????????????
    async saveAssignment({ commit }, obj) {
      const resp = await saveAssignment(obj)
      commit('SAVE_ASSIGNMENT', resp)
    },
    // ??????????????????
    async updateDispatch({ commit }, obj) {
      const resp = await updateDispatch(obj)
      commit('UPDATE_DISPATCH', resp)
    },
    // ??????????????????
    async getTransportTool({ commit }, obj) {
      const resp = await getTransportTool(obj)
      commit('TRANSPORT_TOOL', resp)
    },
    // ????????????
    async getProvinceList({ commit }, obj) {
      const resp = await provinceList(obj)
      commit('GET_PROVINCE_LIST', resp)
    },
    // ????????????
    async getCityList({ commit }, obj) {
      const resp = await cityList(obj)
      commit('GET_CITY_LIST', resp)
    },
    // ????????????
    async getAreaList({ commit }, obj) {
      const resp = await areaList(obj)
      commit('GET_AREA_LIST', resp)
    },
    // ??????????????????
    async getSkuInfo({ commit }, obj) {
      const resp = await getSkuInfo(obj)
      commit('GET_SKU_INFO', resp)
    }
  }
}
export default inOrder
