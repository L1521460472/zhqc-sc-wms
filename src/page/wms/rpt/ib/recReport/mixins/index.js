import notification from './notification'
export default {
  mixins: [notification],
  data() {
    return {
      // 主页面的top表单
      topForm: {
        ref: null, // 对外提供的可操作表单的持有对象
        fieldList: null, // 配置的表单字段集合
        data: { // 表单绑定的数据Model
          asnNo: null,
          asnType: null,
          scAsnType: null,
          scBusinessType: null,
          asnSource: null,
          asnStatus: null,
          ownerId: null,
          supplierId: null,
          origNo: null,
          cusOrderNo: null,
          createTimeFrom: null,
          createTimeTo: null,
          skuId: null,
          barcode: null,
          recLotCode: null,
          creator: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        asnStatusList: [
        ],
        scAsnTypeList: [
        ],
        scBusinessTypeList: [
        ],
        asnSourceList: [
        ]
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: null
      },
      // 弹窗表单
      diaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}// 配置的表单字段校验规则集合
      }
    }
  },
  mounted() {
    this.collapsableForm()// 初始化表单-----------------展开收起
    this.initTopFormColumns()// 初始化查询界面配置数据
    this.rulesInit()// 初始化diaFormInfo表单字段校验规则
  },
  methods: {
    collapsableFormMore() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('recReport.asnNo'), value: 'asnNo', type: 'input' },
        { label: this.$t('asnReport.scAsnType'), value: 'scAsnType', type: 'select', list: 'scAsnTypeList' },
        { label: this.$t('asnReport.scBusinessType'), value: 'scBusinessType', type: 'select', list: 'scBusinessTypeList' },
        { label: this.$t('recReport.asnSource'), value: 'asnSource', type: 'select', list: 'asnSourceList' },
        { label: this.$t('recReport.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('recReport.origNo'), value: 'origNo', type: 'input' },
        { label: this.$t('recReport.cusOrderNo'), value: 'cusOrderNo', type: 'input' },
        { label: this.$t('recReport.createTimeFrom'), value: 'createTimeFrom', type: 'date' },
        { label: this.$t('recReport.createTimeTo'), value: 'createTimeTo', type: 'date' },
        { label: this.$t('recReport.asnStatus'), value: 'asnStatus', type: 'select', list: 'asnStatusList' },
        { label: this.$t('recReport.skuId'), value: 'skuId', type: 'slot' },
        { label: this.$t('recReport.barcode'), value: 'barcode', type: 'input' },
        { label: this.$t('recReport.creator'), value: 'creator', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('recReport.asnNo'), value: 'asnNo', type: 'input' },
        { label: this.$t('asnReport.scAsnType'), value: 'scAsnType', type: 'select', list: 'scAsnTypeList' },
        { label: this.$t('recReport.asnSource'), value: 'asnSource', type: 'select', list: 'asnSourceList' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
      this.topForm.data.ownerId = null
      this.topForm.data.skuId = null
    },
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'asnNo', label: this.$t('recReport.asnNo'), minWidth: 100 },
        { prop: 'asnTypeName', label: this.$t('recReport.asnType'), minWidth: 100 },
        { prop: 'scBusinessTypeName', label: this.$t('recReport.scBusinessType'), minWidth: 100 },
        { prop: 'asnSourceName', label: this.$t('recReport.asnSource'), minWidth: 100 },
        { prop: 'asnStatusName', label: this.$t('recReport.asnStatus'), minWidth: 100 },
        { prop: 'recModeName', label: this.$t('recReport.recMode'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('recReport.ownerName'), minWidth: 100 },
        { prop: 'supplierName', label: this.$t('recReport.supplierName'), minWidth: 100 },
        { prop: 'origNo', label: this.$t('recReport.origNo'), minWidth: 150 },
        { prop: 'skuCostPriceY', label: this.$t('recReport.orderPrice'), minWidth: 100 },
        { prop: 'cusOrderNo', label: this.$t('recReport.cusOrderNo'), minWidth: 120 },
        { prop: 'remark', label: this.$t('recReport.remark'), minWidth: 100 },
        { prop: 'creator', label: this.$t('recReport.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('recReport.createTime'), minWidth: 100 },
        { prop: 'orderQty', label: this.$t('recReport.orderQty'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('recReport.skuCode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('recReport.skuName'), minWidth: 100 },
        { prop: 'tradeName', label: this.$t('asnReport.tradeName'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('recReport.barcode'), minWidth: 100 },
        { prop: 'spec', label: this.$t('recReport.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('recReport.mainUnit'), minWidth: 100 },
        { prop: 'mfg', label: this.$t('recReport.mfg'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('recReport.originCountry'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('recReport.drugForm'), minWidth: 100 },
        { prop: 'drugFormSpec', label: this.$t('recReport.drugFormSpec'), minWidth: 100 },
        { prop: 'asnQty', label: this.$t('recReport.asnQty'), minWidth: 100 },
        { prop: 'recPkgQty', label: this.$t('recReport.recPkgQty'), minWidth: 100 },
        { prop: 'scatteredQty', label: this.$t('recReport.scatteredQty'), minWidth: 100 },
        { prop: 'recQty', label: this.$t('recReport.recQty'), minWidth: 100 },
        { prop: 'skuQualityName', label: this.$t('recReport.skuQuality'), minWidth: 100 },
        { prop: 'rejectQty', label: this.$t('recReport.rejectQty'), minWidth: 100 },
        { prop: 'rejectReason', label: this.$t('recReport.rejectReason'), minWidth: 100 },
        { prop: 'recLotCode', label: this.$t('recReport.recLotCode'), minWidth: 100 },
        { prop: 'containerNo', label: this.$t('recReport.containerNo'), minWidth: 100 },
        { prop: 'skuVolM', label: this.$t('recReport.vol'), minWidth: 100 },
        { prop: 'skuGrossWeightKg', label: this.$t('recReport.grossWeight'), minWidth: 100 },
        { prop: 'skuNetWeightKg', label: this.$t('recReport.netWeight'), minWidth: 100 },
        { prop: 'approveNo', label: this.$t('recReport.approveNo'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('recReport.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('recReport.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('recReport.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('recReport.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('recReport.invalidDate'), minWidth: 100 }
      ]
    },

    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
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
