/*
 * @Descripttion:
 * @version:
 * @Author: chentianyu
 * @Date: 2021-11-12 09:23:41
 * @LastEditors: chentianyu
 * @LastEditTime: 2021-11-12 13:51:04
 */
import { pageInfo, countInfo, initPage } from '../api'
// import { message } from '../../../../../../utils/messageUtils'
const consumablesDetails = {
  namespaced: true,
  state: {
    total: 0,
    successCode: 200,
    pageResp: null,
    initPageObj: null,
    summaryResp: null,
    countInfoResp: null
  },
  mutations: {

    PAGE_INFO(state, data) {
      state.total = data.total
      state.pageResp = data.obj || []
    },
    INIT_PAGE(state, data) {
      state.initPageObj = data.obj || {}
    },
    SUMMARY_STOCK(state, data) {
      state.summaryResp = data
    },
    countInfo(state, data) {
      state.countInfoResp = data
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
    async countInfo({ commit }, obj) {
      const resp = await countInfo(obj)
      commit('countInfo', resp)
    }
  }
}
export default consumablesDetails
