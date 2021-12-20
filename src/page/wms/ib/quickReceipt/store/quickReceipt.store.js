import { } from '../api'
// import { message } from '../../../../../utils/messageUtils'
const qc = {
  namespaced: true,
  state: {
    successCode: 200,
    total: 0,
    totalSkuRecord: 0,
    pageResp: null,
    addResp: null,
    editResp: null,
    deleteResp: null,
    initPageResp: null,
    initUpdateObj: null,
    allAcceptanceResp: null,
    auditResp: null,
    scannOrderNoResp: null,
    saveRecordResp: null,
    nextQcResp: null,
    dtCancelQcResp: null,
    cancelResp: null,
    printResp: null,
    getPubicKeyResp: null,
    checkUserResp: null,
    acceptanceResp: { visible: false }

  },
  mutations: {

    // PAGE_INFO(state, data) {
    //   if (data.code === state.successCode) {
    //     message.success(data.msg)
    //   }
    //   state.total = data.total
    //   state.pageResp = data.obj || []
    // },
    // INIT_PAGE(state, data) {
    //   state.initPageResp = data
    // },
    // INIT_UPDATE(state, data) {
    //   state.initUpdateObj = data.obj || {}
    // },
    // SAVE_DATA(state, data) {
    //   state.addResp = data
    // },
    // EDIT_DATA(state, data) {
    //   state.editResp = data
    // },
    // DELETE_DATA(state, data) {
    //   state.deleteResp = data
    // },
    // // 一键验收
    // ALL_ACCEPTANCE(state, data) {
    //   state.allAcceptanceResp = data
    // },
    // // 审核
    // AUDIT(state, data) {
    //   state.auditResp = data
    // },
    // // 取消
    // CANCEL(state, data) {
    //   state.cancelResp = data
    // },
    // // 明细取消验收
    // DT_CANCEL_QC(state, data) {
    //   if (data.code === state.successCode) {
    //     message.success(data.msg)
    //   }
    //   state.dtCancelQcResp = data
    // },
    // // 扫描ASN单号/来源单号
    // SCANN_ORDER_NO(state, data) {
    //   if (data.code === state.successCode) {
    //     message.success(data.msg)
    //   }
    //   state.scannOrderNoResp = data
    // },
    // // 保存质检记录
    // SAVE_RECORD(state, data) {
    //   if (data.code === state.successCode) {
    //     message.success(data.msg)
    //   }
    //   state.saveRecordResp = data
    // },
    // // 下一验收单
    // NEXT_QC(state, data) {
    //   if (data.code === state.successCode) {
    //     message.success(data.msg)
    //   }
    //   state.nextQcResp = data
    // },
    // // 打印
    // PRINT(state, data) {
    //   state.printResp = data
    // },

    // GET_PUBIC_KEY(state, data) {
    //   state.getPubicKeyResp = data
    // },
    // CHECK_USER(state, data) {
    //   state.checkUserResp = data
    // },

    // setData(state, data) {
    //   state[data.page] = data
    // }
  },
  actions: {
    // // 查询事件
    // async pageInfo({ commit }, obj) {
    //   const resp = await pageInfo(obj)
    //   commit('PAGE_INFO', resp)
    // },
    // // 初始化页面事件
    // async initPage({ commit }, obj) {
    //   const resp = await initPage(obj)
    //   commit('INIT_PAGE', resp)
    // },
    // // 初始化更新对象事件
    // async initUpdate({ commit }, obj) {
    //   const resp = await initUpdate(obj)
    //   commit('INIT_UPDATE', resp)
    // },
    // // 新增保存事件
    // async saveData({ commit }, obj) {
    //   const resp = await saveData(obj)
    //   commit('SAVE_DATA', resp)
    // },
    // // 修改保存事件
    // async editData({ commit }, obj) {
    //   const resp = await editData(obj)
    //   commit('EDIT_DATA', resp)
    // },
    // // 删除数据事件
    // async deleteData({ commit }, obj) {
    //   const resp = await deleteData(obj)
    //   commit('DELETE_DATA', resp)
    // },

    // // 一键验收
    // async allAcceptance({ commit }, obj) {
    //   const resp = await allAcceptance(obj)
    //   commit('ALL_ACCEPTANCE', resp)
    // },

    // // 审核
    // async audit({ commit }, obj) {
    //   const resp = await audit(obj)
    //   commit('AUDIT', resp)
    // },

    // // 取消
    // async cancel({ commit }, obj) {
    //   const resp = await cancel(obj)
    //   commit('CANCEL', resp)
    // },

    // // 明细取消验收
    // async dtCancelQc({ commit }, obj) {
    //   const resp = await dtCancelQc(obj)
    //   commit('DT_CANCEL_QC', resp)
    // },

    // // 扫描ASN单号/来源单号
    // async scannOrderNo({ commit }, obj) {
    //   const resp = await scannOrderNo(obj)
    //   commit('SCANN_ORDER_NO', resp)
    // },

    // // PC验收页面,初始化数据
    // async acceptanceInitPage({ commit }, obj) {
    //   const resp = await initPage(obj)
    //   commit('INIT_PAGE', resp)
    // },

    // // 保存质检记录
    // async saveRecord({ commit }, obj) {
    //   const resp = await saveRecord(obj)
    //   commit('SAVE_RECORD', resp)
    // },

    // // 下一验收单
    // async nextQc({ commit }, obj) {
    //   const resp = await nextQc(obj)
    //   commit('NEXT_QC', resp)
    // },

    // // 打印
    // async print({ commit }, obj) {
    //   const resp = await print(obj)
    //   commit('PRINT', resp)
    // },

    // // 获取公钥
    // async getPubicKey({ commit }, obj) {
    //   const resp = await getPubicKey(obj)
    //   commit('GET_PUBIC_KEY', resp)
    // },
    // // 校验用户
    // async checkUser({ commit }, obj) {
    //   const resp = await checkUser(obj)
    //   commit('CHECK_USER', resp)
    // },

    // setData({ commit }, data) {
    //   commit('setData', data)
    // }
  }
}
export default qc
