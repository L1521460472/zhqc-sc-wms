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
          barcode: null
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
        { label: this.$t('asnReport.asnNo'), value: 'asnNo', type: 'input' },
        { label: this.$t('asnReport.scAsnType'), value: 'scAsnType', type: 'select', list: 'scAsnTypeList' },
        { label: this.$t('asnReport.scBusinessType'), value: 'scBusinessType', type: 'select', list: 'scBusinessTypeList' },
        { label: this.$t('asnReport.asnSource'), value: 'asnSource', type: 'select', list: 'asnSourceList' },
        { label: this.$t('asnReport.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('asnReport.origNo'), value: 'origNo', type: 'input' },
        { label: this.$t('asnReport.cusOrderNo'), value: 'cusOrderNo', type: 'input' },
        { label: this.$t('asnReport.createTimeFrom'), value: 'createTimeFrom', type: 'date' },
        { label: this.$t('asnReport.createTimeTo'), value: 'createTimeTo', type: 'date' },
        { label: this.$t('asnReport.asnStatus'), value: 'asnStatus', type: 'select', list: 'asnStatusList' },
        { label: this.$t('asnReport.skuId'), value: 'skuId', type: 'slot' },
        { label: this.$t('asnReport.barcode'), value: 'barcode', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('asnReport.asnNo'), value: 'asnNo', type: 'input' },
        { label: this.$t('asnReport.scAsnType'), value: 'scAsnType', type: 'select', list: 'scAsnTypeList' },
        { label: this.$t('asnReport.asnSource'), value: 'asnSource', type: 'select', list: 'asnSourceList' },
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
        { prop: 'asnNo', label: this.$t('asnReport.asnNo'), minWidth: 120 },
        { prop: 'asnTypeName', label: this.$t('recReport.asnType'), minWidth: 100 },
        { prop: 'scBusinessTypeName', label: this.$t('recReport.scBusinessType'), minWidth: 100 },
        { prop: 'asnSourceName', label: this.$t('asnReport.asnSource'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('asnReport.ownerName'), minWidth: 100 },
        { prop: 'supplierName', label: this.$t('asnReport.supplierName'), minWidth: 100 },
        { prop: 'origNo', label: this.$t('asnReport.origNo'), minWidth: 120 },
        { prop: 'skuCostPriceY', label: this.$t('asnReport.orderPrice'), minWidth: 100 },
        { prop: 'cusOrderNo', label: this.$t('asnReport.cusOrderNo'), minWidth: 130 },
        { prop: 'updateTime', label: this.$t('asnReport.updateTime'), minWidth: 100 },
        { prop: 'updater', label: this.$t('asnReport.updater'), minWidth: 100 },
        { prop: 'remark', label: this.$t('asnReport.remark'), minWidth: 100 },
        { prop: 'refundType', label: this.$t('asnReport.refundType'), minWidth: 100 },
        { prop: 'refundReason', label: this.$t('asnReport.refundReason'), minWidth: 100 },
        { prop: 'sourceCode', label: this.$t('asnReport.sourceCode'), minWidth: 100 },
        { prop: 'creator', label: this.$t('asnReport.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('asnReport.createTime'), minWidth: 100 },
        { prop: 'rowNo', label: this.$t('asnReport.rowNo'), minWidth: 100 },
        { prop: 'sourceBatchNo', label: this.$t('asnReport.sourceBatchNo'), minWidth: 100 },
        { prop: 'orderQty', label: this.$t('asnReport.orderQty'), minWidth: 100 },
        { prop: 'asnDtStatusName', label: this.$t('asnReport.asnDtStatus'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('asnReport.skuCode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('asnReport.skuName'), minWidth: 100 },
        { prop: 'tradeName', label: this.$t('asnReport.tradeName'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('asnReport.barcode'), minWidth: 100 },
        { prop: 'spec', label: this.$t('asnReport.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('asnReport.mainUnit'), minWidth: 100 },
        { prop: 'mfg', label: this.$t('asnReport.mfg'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('asnReport.originCountry'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('asnReport.drugForm'), minWidth: 100 },
        { prop: 'drugFormSpec', label: this.$t('asnReport.drugFormSpec'), minWidth: 100 },
        { prop: 'itemQty', label: this.$t('asnReport.itemQty'), minWidth: 100 },
        { prop: 'skuQty', label: this.$t('asnReport.skuQty'), minWidth: 100 },
        { prop: 'costPrice', label: this.$t('asnReport.amount'), minWidth: 100 },
        { prop: 'costPrice', label: this.$t('asnReport.aPrice'), minWidth: 100 },
        { prop: 'skuVolM', label: this.$t('asnReport.vol'), minWidth: 100 },
        { prop: 'skuGrossWeightKg', label: this.$t('asnReport.grossWeight'), minWidth: 100 },
        { prop: 'netWeight', label: this.$t('asnReport.netWeight'), minWidth: 100 },
        { prop: 'recPkgQty', label: this.$t('asnReport.recPkgQty'), minWidth: 100 },
        { prop: 'recQty', label: this.$t('asnReport.recQty'), minWidth: 100 },
        { prop: 'rejectQty', label: this.$t('asnReport.rejectQty'), minWidth: 100 },
        { prop: 'approveNo', label: this.$t('asnReport.approveNo'), minWidth: 100 },
        { prop: 'qcQty', label: this.$t('asnReport.qcQty'), minWidth: 100 },
        { prop: 'badQty', label: this.$t('asnReport.badQty'), minWidth: 100 },
        { prop: 'goodQty', label: this.$t('asnReport.goodQty'), minWidth: 100 },
        { prop: 'paQty', label: this.$t('asnReport.paQty'), minWidth: 100 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
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
