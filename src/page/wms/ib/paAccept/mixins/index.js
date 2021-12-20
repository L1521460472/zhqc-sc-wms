import notification from './notification'

export default {
  mixins: [notification],
  data() {
    return {
      orderForm: {
        orderNo: null
      },

      productFrom: {
        barcode: null,
        paLotCode: null,
        paQty: null,
        containerNo: null,
        id: null
      },

      topForm: {
        waitPaQty: null,
        waitPaSkuNum: null,
        alreadyPaQty: null,
        alreadyPaSkuNum: null,
        totalQty: null,
        totalSkuNum: null
      },

      mainTable: {
        originNo: null,
        cusOrderNo: null,
        paType: null
      },

      skuDtInfo: {
        id: null,
        skuId: null,
        batchNo: null,
        waitPaQty: null,
        paQty: null,
        recommLot: null,
        containerNo: null,
        baseSku: {
          skuCode: null,
          barcode: null,
          skuName: null,
          tradeName: null,
          spec: null,
          mainUnit: null,
          perQty: null,
          drugForm: null,
          mfgName: null,
          originCountry: null,
          approvalNumber: null,
          brandName: null,
          tempControlName: null
        },
        baseInvBatch: {
          batchNo: null,
          productionBatch: null,
          productionDate: null,
          instoreDate: null,
          invalidDate: null
        }
      },

      // 主页面表格
      tableInfo1: {
        data: [],
        fieldList: null, // 表格列集合
        handle: null

      },
      tableInfo2: {
        data: [],
        fieldList: null, // 表格列集合
        handle: null
      },

      // 批次属性 动态字段
      diaFormInfoAttr: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        labelWidth: '120px'
      }

    }
  },

  methods: {
    // 主页面初始化数据
    initPageData() {
      // 初始化列表
      this.tableInfo1.fieldList = [
        { prop: 'paStatusName', label: this.$t('paAccept.paStatusName'), minWidth: 100 },
        { prop: 'waitPaQty', label: this.$t('paAccept.waitPaQty'), minWidth: 100 },
        { prop: 'paQty', label: this.$t('paAccept.paQty'), minWidth: 100 },
        { prop: 'baseInvBatch.productionBatch', label: this.$t('paAccept.productionBatch'), minWidth: 100 },
        { prop: 'baseSku.skuCode', label: this.$t('paAccept.skuCode'), minWidth: 100 },
        { prop: 'baseSku.skuName', label: this.$t('paAccept.skuName'), minWidth: 120 },
        { prop: 'baseSku.barcode', label: this.$t('paAccept.barcode'), minWidth: 120 },
        { prop: 'baseSku.tradeName', label: this.$t('paAccept.tradeName'), minWidth: 100 },
        { prop: 'baseSku.spec', label: this.$t('paAccept.spec'), minWidth: 100 },
        { prop: 'baseSku.mainUnit', label: this.$t('paAccept.mainUnit'), minWidth: 100 },
        { prop: 'baseSku.drugForm', label: this.$t('paAccept.drugForm'), minWidth: 100 },
        { prop: 'baseSku.mfgName', label: this.$t('paAccept.mfgName'), minWidth: 100 },
        { prop: 'baseSku.originCountry', label: this.$t('paAccept.originCountry'), minWidth: 100 },
        { prop: 'baseSku.approvalNumber', label: this.$t('paAccept.approvalNumber'), minWidth: 100 },
        { prop: 'baseSku.brandName', label: this.$t('paAccept.brandName'), minWidth: 100 },
        { prop: 'baseSku.tempControlName', label: this.$t('paAccept.tempControlName'), minWidth: 100 },
        { prop: 'baseSku.validityDay', label: this.$t('paAccept.validityDay'), minWidth: 100 },
        { prop: 'baseInvBatch.productionDate', label: this.$t('paAccept.productionDate'), minWidth: 100 },
        { prop: 'baseInvBatch.instoreDate', label: this.$t('paAccept.instoreDate'), minWidth: 100 },
        { prop: 'baseInvBatch.invalidDate', label: this.$t('paAccept.invalidDate'), minWidth: 100 },
        { prop: 'baseInvBatch.batchNo', label: this.$t('paAccept.batchNo'), minWidth: 100 }
      ]
      this.tableInfo2.fieldList = [
        { prop: 'paLot', label: this.$t('paAccept.paLot'), minWidth: 100 },
        { prop: 'paQty', label: this.$t('paAccept.paQty'), minWidth: 100 },
        { prop: 'baseInvBatch.productionBatch', label: this.$t('paAccept.productionBatch'), minWidth: 100 },
        { prop: 'baseSku.skuCode', label: this.$t('paAccept.skuCode'), minWidth: 100 },
        { prop: 'baseSku.skuName', label: this.$t('paAccept.skuName'), minWidth: 100 },
        { prop: 'baseSku.barcode', label: this.$t('paAccept.barcode'), minWidth: 100 },
        { prop: 'baseSku.tradeName', label: this.$t('paAccept.tradeName'), minWidth: 100 },
        { prop: 'baseSku.spec', label: this.$t('paAccept.spec'), minWidth: 100 },
        { prop: 'baseSku.mainUnit', label: this.$t('paAccept.mainUnit'), minWidth: 100 },
        { prop: 'baseSku.drugForm', label: this.$t('paAccept.drugForm'), minWidth: 100 },
        { prop: 'baseSku.mfgName', label: this.$t('paAccept.mfgName'), minWidth: 100 },
        { prop: 'baseSku.originCountry', label: this.$t('paAccept.originCountry'), minWidth: 100 },
        { prop: 'baseSku.approvalNumber', label: this.$t('paAccept.approvalNumber'), minWidth: 100 },
        { prop: 'baseSku.brandName', label: this.$t('paAccept.brandName'), minWidth: 100 },
        { prop: 'baseSku.tempControlName', label: this.$t('paAccept.tempControlName'), minWidth: 100 },
        { prop: 'baseSku.validityDay', label: this.$t('paAccept.validityDay'), minWidth: 100 },
        { prop: 'baseInvBatch.productionDate', label: this.$t('paAccept.productionDate'), minWidth: 100 },
        { prop: 'baseInvBatch.instoreDate', label: this.$t('paAccept.instoreDate'), minWidth: 100 },
        { prop: 'baseInvBatch.invalidDate', label: this.$t('paAccept.invalidDate'), minWidth: 100 },
        { prop: 'baseInvBatch.batchNo', label: this.$t('paAccept.batchNo'), minWidth: 100 }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.reqVo = {
        id: null,
        reviewPlatform: null,
        soNo: null,
        skuQty: null,
        totalQty: null,
        barcode: null,
        skuName: null,
        skuNum: null,
        reviewedQty: null,
        reviewingNum: null,
        reviewWtKg: null,
        boxNo: null,
        ticket: null,
        reviewPersonOne: null,
        reviewPersonTwo: null,
        partnerName: null,
        partnerStoreName: null
      }
    },

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
