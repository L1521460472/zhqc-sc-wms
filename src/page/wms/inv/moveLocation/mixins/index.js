import risize from '@/layout/Home/mixin/RisizeTable'
import notification from './notification'
export default {
  mixins: [risize, notification],
  data() {
    return {
      form: {
        fmLotCode: null,
        barcode: null,
        toLotCode: null,
        skuId: null,
        batchNo: null,
        moveQty: null,
        asnNo: null
      },
      batchNoList: [],

      skuInfo: {
        recommLot: null,
        skuName: null,
        spec: null,
        barcode: null,
        skuCode: null,
        productionBatch: null,
        productionDate: null,
        instoreDate: null,
        invalidDate: null,
        qty: null,
        batchInfoList: []
      }
    }
  },

  methods: {
    // 统一按钮点击事件方法入口，event:自定义方法名称（notification.js中定义的方法名），data:方法参数
    handleClick(event, data) {
      if (event) {
        this[event](data)
      }
    },
    // 统一处理下拉列表change事件入口，event:自定义方法名称（notification.js中定义的方法名）
    handleEvent(event, data) {
      if (event) {
        this[event](data)
      }
    }
  }
}
