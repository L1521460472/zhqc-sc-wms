import {
  completeAsn,
  cancel,
  deleteData,
  deleteDt,
  editData,
  initPage,
  initUpdate,
  pageInfo,
  queryReturnSkuInvalidDate,
  querySkuInvalidDate,
  saveData,
  saveRecInfo,
  saveReturnRecInfo,
  scannAreaNo,
  scannContainerNo,
  scannOrderNo,
  scannReturnAreaNo,
  scannReturnContainerNo,
  scannReturnOrderNo,
  scannReturnSkuNo,
  scannSkuNo
} from './../api'
import { message } from '../../../../../utils/messageUtils'

const rec = {
  namespaced: true,
  state: {
    successCode: 200,
    total: 0,
    pageResp: null,
    addResp: null,
    editResp: null,
    deleteResp: null,
    initPageObj: null,
    initUpdateObj: null,
    deleteDtResp: null,
    scannOrderNoResp: null,
    scannReturnOrderNoResp: null,
    scannContainerNoResp: null,
    scannReturnContainerNoResp: null,
    querySkuInvalidDateResp: null,
    queryReturnSkuInvalidDateResp: null,
    nextAsnResp: null,
    saveRecordResp: null,
    saveReturnRecordResp: null,
    scannSkuNoResp: null,
    scannReturnSkuNoResp: null,
    completeAsnResp: null,
    cancelResp: null,
    scannAreaNoResp: null,
    scannReturnAreaNoResp: null,
    recAcceptanceResp: { visible: false },
    returnRecAcceptanceResp: { visible: false }
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
    DELETE_DT(state, data) {
      state.deleteDtResp = data
    },
    // 扫描ASN单号/来源单号
    SCANN_ORDER_NO(state, data) {
      if (data.code === state.successCode) {
        message.success(data.msg)
      }
      state.scannOrderNoResp = data
    },
    // 扫描ASN单号/来源单号(退货收货)
    SCANN_RETURNORDER_NO(state, data) {
      if (data.code === state.successCode) {
        message.success(data.msg)
      }
      state.scannReturnOrderNoResp = data
    },
    // 完成收货
    COMPLETE_ASN(state, data) {
      if (data.code === state.successCode) {
        message.success(data.msg)
      }
      state.completeAsnResp = data
    },
    // 取消
    CANCEL(state, data) {
      if (data.code === state.successCode) {
        message.success(data.msg)
      }
      state.completeAsnResp = data
    },
    // 扫描库区/库位
    SCANN_AREA_NO(state, data) {
      if (data.code === state.successCode) {
        message.success(data.msg)
      }
      state.scannAreaNoResp = data
    },
    // 扫描库区/库位(退货收货)
    SCANN_RETURN_AREA_NO(state, data) {
      if (data.code === state.successCode) {
        message.success(data.msg)
      }
      state.scannReturnAreaNoResp = data
    },
    // 扫描容器
    SCANN_CONTAINER_NO(state, data) {
      if (data.code === state.successCode) {
        message.success(data.msg)
      }
      state.scannContainerNoResp = data
    },
    // 扫描容器(退货收货)
    SCANN_RETURN_CONTAINER_NO(state, data) {
      if (data.code === state.successCode) {
        message.success(data.msg)
      }
      state.scannReturnContainerNoResp = data
    },
    // 扫描SKU编码
    SCANN_SKU_NO(state, data) {
      if (data.code === state.successCode) {
        message.success(data.msg)
      }
      state.scannSkuNoResp = data
    },
    // 扫描SKU编码(退货收货)
    SCANN_RETURN_SKU_NO(state, data) {
      if (data.code === state.successCode) {
        message.success(data.msg)
      }
      state.scannReturnSkuNoResp = data
    },
    // 查询有效期至
    QUERY_SKU_INVALID_DATE(state, data) {
      if (data.code === state.successCode) {
        message.success(data.msg)
      }
      state.querySkuInvalidDateResp = data
    },
    // 查询有效期至(退货收货)
    QUERY_RETURN_SKU_INVALID_DATE(state, data) {
      if (data.code === state.successCode) {
        message.success(data.msg)
      }
      state.queryReturnSkuInvalidDateResp = data
    },
    // 保存收货记录
    SAVE_REC_INFO(state, data) {
      if (data.code === state.successCode) {
        message.success(data.msg)
      }
      state.saveRecordResp = data
    },
    // 保存收货记录(退货收货)
    SAVE_RETURN_REC_INFO(state, data) {
      if (data.code === state.successCode) {
        message.success(data.msg)
      }
      state.saveReturnRecordResp = data
    },
    setData(state, data) {
      state[data.page] = data
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
    async deleteDt({ commit }, obj) {
      const resp = await deleteDt(obj)
      commit('DELETE_DT', resp)
    },
    // 扫描ASN单号/来源单号
    async scannOrderNo({ commit }, obj) {
      const resp = await scannOrderNo(obj)
      commit('SCANN_ORDER_NO', resp)
    },
    // 扫描ASN单号/来源单号(退货收货)
    async scannReturnOrderNo({ commit }, obj) {
      const resp = await scannReturnOrderNo(obj)
      commit('SCANN_RETURNORDER_NO', resp)
    },
    // 扫描库区/库位
    async scannAreaNo({ commit }, obj) {
      const resp = await scannAreaNo(obj)
      commit('SCANN_AREA_NO', resp)
    },
    // 扫描库区/库位(退货收货)
    async scannReturnAreaNo({ commit }, obj) {
      const resp = await scannReturnAreaNo(obj)
      commit('SCANN_RETURN_AREA_NO', resp)
    },
    // 扫描容器
    async scannContainerNo({ commit }, obj) {
      const resp = await scannContainerNo(obj)
      commit('SCANN_CONTAINER_NO', resp)
    },
    // 扫描容器(退货收货)
    async scannReturnContainerNo({ commit }, obj) {
      const resp = await scannReturnContainerNo(obj)
      commit('SCANN_RETURN_CONTAINER_NO', resp)
    },
    // 扫描SKU
    async scannSkuNo({ commit }, obj) {
      const resp = await scannSkuNo(obj)
      commit('SCANN_SKU_NO', resp)
    },
    // 扫描SKU(退货收货)
    async scannReturnSkuNo({ commit }, obj) {
      const resp = await scannReturnSkuNo(obj)
      commit('SCANN_RETURN_SKU_NO', resp)
    },
    // 查询产品有效期至
    async querySkuInvalidDate({ commit }, obj) {
      const resp = await querySkuInvalidDate(obj)
      commit('QUERY_SKU_INVALID_DATE', resp)
    },
    // 查询产品有效期至(退货收货)
    async queryReturnSkuInvalidDate({ commit }, obj) {
      const resp = await queryReturnSkuInvalidDate(obj)
      commit('QUERY_RETURN_SKU_INVALID_DATE', resp)
    },
    // 完成收货
    async completeAsn({ commit }, obj) {
      const resp = await completeAsn(obj)
      commit('COMPLETE_ASN', resp)
    },
    // 取消
    async cancel({ commit }, obj) {
      const resp = await cancel(obj)
      commit('CANCEL', resp)
    },
    // 保存收货记录
    async saveRecInfo({ commit }, obj) {
      const resp = await saveRecInfo(obj)
      commit('SAVE_REC_INFO', resp)
    },
    // 保存收货记录(退货收货)
    async saveReturnRecInfo({ commit }, obj) {
      const resp = await saveReturnRecInfo(obj)
      commit('SAVE_RETURN_REC_INFO', resp)
    },
    setData({ commit }, data) {
      commit('setData', data)
    }
  }
}
export default rec
