import { pageInfo, initPage, initUpdate, saveData,
  editData, deleteData, batchSend, batchCancel, batchConfirm,
  batchUnConfirm, lineMatch, lineMatchList, preDispatch, preDispatchList,
  lineMatchUpdate, reLineMatch, preDispatchUpdate, rePreDispatch, queryForTms,
  preDispatchAll, initView
} from './../api'
// import { provinceList, cityList, areaList } from '@/api/ajax.js'
// import { Message } from 'element-ui'
const shippingOrder = {
  namespaced: true,
  state: {
    total: 0,
    pageResp: null,
    addResp: null,
    editResp: null,
    deleteResp: null,
    initPageObj: null,
    initUpdateObj: null,
    batchSendResp: null,
    batchCancelResp: null,
    batchConfirmResp: null,
    batchUnConfirmResp: null,
    lineMatchResp: null,
    lineMatchListResp: null,
    lineMatchUpdataResp: null,
    reLineMatchListResp: null,
    preDispatchResp: null,
    preDispatchListResp: null,
    preDispatchUpdataResp: null,
    rePreDispatchResp: null,
    queryForTmsResp: null,
    preDispatchAllResp: null,
    initViewResp: null
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
    BATCH_SEND(state, data) {
      state.batchSendResp = data
    },
    BATCH_CANCEL(state, data) {
      state.batchCancelResp = data
    },
    BATCH_CONFIRM(state, data) {
      state.batchConfirmResp = data
    },
    BATCH_UN_CONFIRM(state, data) {
      state.batchUnConfirmResp = data
    },
    LINE_MATCH(state, data) {
      state.lineMatchResp = data
    },
    LINE_MATCH_LIST(state, data) {
      state.lineMatchListResp = data
    },
    LINE_MATCH_UPDATE(state, data) {
      state.lineMatchUpdataResp = data
    },
    RE_LINE_MATCH(state, data) {
      state.reLineMatchListResp = data
    },
    PRE_DISPATCH(state, data) {
      state.preDispatchResp = data
    },
    PRE_DISPATCH_LIST(state, data) {
      state.preDispatchListResp = data
    },
    PRE_DISPATCH_UPDATE(state, data) {
      state.preDispatchUpdataResp = data
    },
    RE_PRE_DISPATCH(state, data) {
      state.rePreDispatchResp = data
    },
    QUERY_FOR_TMS(state, data) {
      state.queryForTmsResp = data
    },
    PRE_DISPATCH_ALL(state, data) {
      state.preDispatchAllResp = data
    },
    INIT_VIEW(state, data) {
      state.initViewResp = data
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
    // 批量下发
    async batchSend({ commit }, obj) {
      const resp = await batchSend(obj)
      commit('BATCH_SEND', resp)
    },
    // 批量取消
    async batchCancel({ commit }, obj) {
      const resp = await batchCancel(obj)
      commit('BATCH_CANCEL', resp)
    },
    // 批量审核
    async batchConfirm({ commit }, obj) {
      const resp = await batchConfirm(obj)
      commit('BATCH_CONFIRM', resp)
    },
    //  批量反审
    async batchUnConfirm({ commit }, obj) {
      const resp = await batchUnConfirm(obj)
      commit('BATCH_UN_CONFIRM', resp)
    },
    async lineMatch({ commit }, obj) {
      const resp = await lineMatch(obj)
      commit('LINE_MATCH', resp)
    },
    async lineMatchList({ commit }, obj) {
      const resp = await lineMatchList(obj)
      commit('LINE_MATCH_LIST', resp)
    },
    async lineMatchUpdate({ commit }, obj) {
      const resp = await lineMatchUpdate(obj)
      commit('LINE_MATCH_UPDATE', resp)
    },
    async reLineMatch({ commit }, obj) {
      const resp = await reLineMatch(obj)
      commit('RE_LINE_MATCH', resp)
    },
    async preDispatch({ commit }, obj) {
      const resp = await preDispatch(obj)
      commit('PRE_DISPATCH', resp)
    },
    async preDispatchList({ commit }, obj) {
      const resp = await preDispatchList(obj)
      commit('PRE_DISPATCH_LIST', resp)
    },
    async preDispatchUpdate({ commit }, obj) {
      const resp = await preDispatchUpdate(obj)
      commit('PRE_DISPATCH_UPDATE', resp)
    },
    async rePreDispatch({ commit }, obj) {
      const resp = await rePreDispatch(obj)
      commit('RE_PRE_DISPATCH', resp)
    },
    // 模糊查询商品资料
    async queryForTms({ commit }, obj) {
      const resp = await queryForTms(obj)
      commit('QUERY_FOR_TMS', resp)
    },
    // 运输订单列表预调度按钮
    async preDispatchAll({ commit }, obj) {
      const resp = await preDispatchAll(obj)
      commit('PRE_DISPATCH_ALL', resp)
    },

    async initView({ commit }, obj) {
      const resp = await initView(obj)
      commit('INIT_VIEW', resp)
    }

  }
}
export default shippingOrder
