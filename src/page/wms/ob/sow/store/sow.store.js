import { scanSowContainerCode, scanPickOrderNo, scanSkuCode, saveSowScanRecord, printDeliveryNote, forceSow, querySowInfo, queryPickContainerInfo } from './../api'
import { message } from '../../../../../utils/messageUtils'
const sow = {
  namespaced: true,
  state: {
    successCode: 200,
    total: 0,
    scanSowContainerCodeResp: null,
    scanPickOrderNoResp: null,
    scanSkuCodeResp: null,
    saveSowScanRecordResp: null,
    printDeliveryNoteResp: null,
    forceSowResp: null,
    queryPickContainerInfoResp: null,
    querySowInfoResp: null
  },
  mutations: {
    // 扫描/输入播种墙
    SCAN_SOW_CONTAINER_CODE(state, data) {
      if (data.code === state.successCode) {
        message.success(data.msg)
      }
      state.scanSowContainerCodeResp = data
    },

    // 扫描/输入拣货单号
    SCAN_PICK_ORDER_NO(state, data) {
      if (data.code === state.successCode) {
        message.success(data.msg)
      }
      state.scanPickOrderNoResp = data
    },

    // 扫描/输入产品条码
    SCAN_SKU_CODE(state, data) {
      if (data.code === state.successCode) {
        message.success(data.msg)
      }
      state.scanSkuCodeResp = data
    },

    // 保存记录
    SAVE_SOW_SCAN_RECORD(state, data) {
      if (data.code === state.successCode) {
        message.success(data.msg)
      }
      state.saveSowScanRecordResp = data
    },

    // 打印送货单
    PRINT_DELIVERY_NOTE(state, data) {
      state.printDeliveryNoteResp = data
    },

    // 强制播种
    FORCE_SOW(state, data) {
      state.forceSowResp = data
    },

    // 查看拣货容器信息
    QUERY_PICK_CONTAINER_INFO(state, data) {
      if (data.code === state.successCode) {
        message.success(data.msg)
      }
      state.queryPickContainerInfoResp = data
    },

    // 查看分拣信息
    QUERY_SOW_INFO(state, data) {
      if (data.code === state.successCode) {
        message.success(data.msg)
      }
      state.querySowInfoResp = data
    }
  },

  actions: {
    // 扫描/输入播种墙
    async scanSowContainerCode({ commit }, obj) {
      const resp = await scanSowContainerCode(obj)
      commit('SCAN_SOW_CONTAINER_CODE', resp)
    },

    // 扫描/输入拣货单号
    async scanPickOrderNo({ commit }, obj) {
      const resp = await scanPickOrderNo(obj)
      commit('SCAN_PICK_ORDER_NO', resp)
    },

    // 扫描/输入产品条码
    async scanSkuCode({ commit }, obj) {
      const resp = await scanSkuCode(obj)
      commit('SCAN_SKU_CODE', resp)
    },

    // 待分拣数量
    async saveSowScanRecord({ commit }, obj) {
      const resp = await saveSowScanRecord(obj)
      commit('SAVE_SOW_SCAN_RECORD', resp)
    },

    // 打印送货单
    async printDeliveryNote({ commit }, obj) {
      const resp = await printDeliveryNote(obj)
      commit('PRINT_DELIVERY_NOTE', resp)
    },

    // 强制播种
    async forceSow({ commit }, obj) {
      const resp = await forceSow(obj)
      commit('FORCE_SOW', resp)
    },

    // 查看拣货容器信息
    async queryPickContainerInfo({ commit }, obj) {
      const resp = await queryPickContainerInfo(obj)
      commit('QUERY_PICK_CONTAINER_INFO', resp)
    },

    // 查看分拣信息
    async querySowInfo({ commit }, obj) {
      const resp = await querySowInfo(obj)
      commit('QUERY_SOW_INFO', resp)
    }

  }
}
export default sow
