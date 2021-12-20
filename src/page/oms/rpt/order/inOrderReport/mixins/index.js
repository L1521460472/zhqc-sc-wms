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
          inOrderNo: null,
          scOorderType: null,
          scBusinessType: null,
          orderOrig: null,
          origNo: null,
          ownerId: null,
          orderStatus: null,
          sourceCode: null,
          storeId: null,
          origPlatform: null,
          skuId: null,
          barcode: null,
          erpCreateTimeFrom: null,
          erpCreateTimeTo: null,
          createTimeFrom: null,
          createTimeTo: null,
          mfgId: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        orderStatusList: [
        ],
        orderOrigList: [
        ],
        scOorderTypeList: [
        ],
        scBusinessTypeList: [
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
        { label: this.$t('inOrderReport.inOrderNo'), value: 'inOrderNo', type: 'input' },
        { label: this.$t('inOrderReport.scOrderType'), value: 'scOrderType', type: 'select', list: 'scOrderTypeList' },
        { label: this.$t('inOrderReport.scBusinessType'), value: 'scBusinessType', type: 'select', list: 'scBusinessTypeList' },
        { label: this.$t('inOrderReport.orderOrig'), value: 'orderOrig', type: 'select', list: 'orderOrigList' },
        { label: this.$t('inOrderReport.origNo'), value: 'origNo', type: 'input' },
        { label: this.$t('inOrderReport.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('inOrderReport.orderStatus'), value: 'orderStatus', type: 'select', list: 'orderStatusList' },
        { label: this.$t('inOrderReport.sourceCode'), value: 'sourceCode', type: 'input' },
        { label: this.$t('inOrderReport.skuId'), value: 'skuId', type: 'slot' },
        { label: this.$t('inOrderReport.barcode'), value: 'barcode', type: 'input' },
        { label: this.$t('inOrderReport.createTimeFrom'), value: 'createTimeFrom', type: 'date' },
        { label: this.$t('inOrderReport.createTimeTo'), value: 'createTimeTo', type: 'date' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('inOrderReport.inOrderNo'), value: 'inOrderNo', type: 'input' },
        { label: this.$t('inOrderReport.scOrderType'), value: 'scOrderType', type: 'select', list: 'scOrderTypeList' },
        { label: this.$t('inOrderReport.scBusinessType'), value: 'scBusinessType', type: 'select', list: 'scBusinessTypeList' },
        { label: this.$t('inOrderReport.orderOrig'), value: 'orderOrig', type: 'select', list: 'orderOrigList' },
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
        { prop: 'inOrderNo', label: this.$t('inOrderReport.inOrderNo'), minWidth: 100 },
        { prop: 'scOrderTypeName', label: this.$t('inOrderReport.scOrderType'), minWidth: 100 },
        { prop: 'scBusinessTypeName', label: this.$t('inOrderReport.scBusinessType'), minWidth: 100 },
        { prop: 'orderOrigName', label: this.$t('inOrderReport.orderOrig'), minWidth: 100 },
        { prop: 'origNo', label: this.$t('inOrderReport.origNo'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('inOrderReport.ownerName'), minWidth: 100 },
        { prop: 'orderPriceY', label: this.$t('inOrderReport.orderPrice'), minWidth: 100 },
        { prop: 'orderStatusName', label: this.$t('inOrderReport.orderStatus'), minWidth: 100 },
        { prop: 'refundType', label: this.$t('inOrderReport.refundType'), minWidth: 100 },
        { prop: 'refundReason', label: this.$t('inOrderReport.refundReason'), minWidth: 100 },
        { prop: 'sourceCode', label: this.$t('inOrderReport.sourceCode'), minWidth: 100 },
        { prop: 'purchName', label: this.$t('inOrderReport.purchName'), minWidth: 100 },
        { prop: 'contactName', label: this.$t('inOrderReport.contactName'), minWidth: 100 },
        { prop: 'contactAddr', label: this.$t('inOrderReport.contactAddr'), minWidth: 100 },
        { prop: 'contactTel', label: this.$t('inOrderReport.contactTel'), minWidth: 100 },
        { prop: 'contactPhone', label: this.$t('inOrderReport.contactPhone'), minWidth: 100 },
        { prop: 'customerName', label: this.$t('inOrderReport.customerName'), minWidth: 100 },
        { prop: 'provinceName', label: this.$t('inOrderReport.provinceName'), minWidth: 100 },
        { prop: 'cityName', label: this.$t('inOrderReport.cityName'), minWidth: 100 },
        { prop: 'areaName', label: this.$t('inOrderReport.areaName'), minWidth: 100 },
        { prop: 'rowNo', label: this.$t('inOrderReport.rowNo'), minWidth: 100 },
        { prop: 'statusName', label: this.$t('inOrderReport.status'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('inOrderReport.skuCode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('inOrderReport.skuName'), minWidth: 100 },
        { prop: 'tradeName', label: this.$t('inOrderReport.tradeName'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('inOrderReport.barcode'), minWidth: 100 },
        { prop: 'spec', label: this.$t('inOrderReport.spec'), minWidth: 100 },
        { prop: 'mfg', label: this.$t('inOrderReport.mfg'), minWidth: 100 },
        { prop: 'brandName', label: this.$t('inOrderReport.brandName'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('inOrderReport.originCountry'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('inOrderReport.drugForm'), minWidth: 100 },
        { prop: 'drugFormSpec', label: this.$t('inOrderReport.drugFormSpec'), minWidth: 100 },
        { prop: 'tempControlName', label: this.$t('inOrderReport.tempControlName'), minWidth: 100 },
        { prop: 'inOrderQty', label: this.$t('inOrderReport.inOrderQty'), minWidth: 100 },
        { prop: 'recQty', label: this.$t('inOrderReport.recQty'), minWidth: 100 },
        { prop: 'rejectQty', label: this.$t('inOrderReport.rejectQty'), minWidth: 100 },
        { prop: 'amountY', label: this.$t('inOrderReport.amount'), minWidth: 100 },
        { prop: 'sumPriceY', label: this.$t('inOrderReport.aPrice'), minWidth: 100 },
        { prop: 'volM', label: this.$t('inOrderReport.vol'), minWidth: 100 },
        { prop: 'netWeightKg', label: this.$t('inOrderReport.netWeight'), minWidth: 100 },
        { prop: 'grossWeightKg', label: this.$t('inOrderReport.grossWeight'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('inOrderReport.batchNo'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('inOrderReport.createTime'), minWidth: 100 },
        { prop: 'creator', label: this.$t('inOrderReport.creator'), minWidth: 100 }
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
