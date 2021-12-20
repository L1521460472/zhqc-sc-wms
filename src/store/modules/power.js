import { queryPowerByMenuId } from './../../view/api/ajax'
import { Message } from 'element-ui'
const power = {
  namespaced: true,
  state: {
    respCode: null,
    respObj: null,
    resp: null,
    pageOpList: null,
    mybtns: null
  },
  mutations: {
    QUERY_POWER_BY_MENU_ID(state, res) {
      const { obj, pageOpList } = res
      state.respCode = res.code
      state.pageOpList = pageOpList
      state.resp = res
      state.respObj = obj
    },
    GET_MENU_ID(state, arr) {
      // alert('按钮权限')
      state.mybtns = arr
    }
  },
  actions: {
    // 按钮权限
    async queryPowerByMenuId({ commit }, obj) {
      const res = await queryPowerByMenuId(obj)
      if (res.code === 200) {
        commit('QUERY_POWER_BY_MENU_ID', res)
      } else {
        Message({
          showClose: true,
          message: res.msg,
          type: 'error'
        })
      }
    },
    getMenuID({ commit }, objArr) {
      commit('GET_MENU_ID', objArr)
    }
  }
}

export default power
