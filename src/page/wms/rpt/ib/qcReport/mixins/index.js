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
          qcNo: null,
          qcMode: null,
          checkUser: null,
          checkUserName: null,
          checkTime: null,
          asnNo: null,
          asnType: null,
          origNo: null,
          cusOrderNo: null,
          ownerId: null,
          supplierId: null,
          skuId: null,
          checkResult: null,
          checkTimeFrom: null,
          checkTimeTo: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        qcDtResultList: [],
        qcModeList: [],
        asnTypeList: []
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
        { label: this.$t('qcReport.qcNo'), value: 'qcNo', type: 'input' },
        { label: this.$t('qcReport.asnNo'), value: 'asnNo', type: 'input' },
        { label: this.$t('qcReport.origNo'), value: 'origNo', type: 'input' },
        { label: this.$t('qcReport.cusOrderNo'), value: 'cusOrderNo', type: 'input' },
        { label: this.$t('qcReport.ownerName'), value: 'ownerId', type: 'slot' },
        { label: this.$t('qcReport.skuCode'), value: 'skuId', type: 'slot' },
        { label: this.$t('qcReport.qcMode'), value: 'qcMode', type: 'select', list: 'qcModeList' },
        { label: this.$t('qcReport.checkResult'), value: 'checkResult', type: 'select', list: 'qcDtResultList' },
        { label: this.$t('qcReport.checkUserName'), value: 'checkUserName', type: 'input' },
        { label: this.$t('qcReport.checkTimeFrom'), value: 'checkTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('qcReport.checkTimeTo'), value: 'checkTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('qcReport.qcNo'), value: 'qcNo', type: 'input' },
        { label: this.$t('qcReport.asnNo'), value: 'asnNo', type: 'input' },
        { label: this.$t('qcReport.origNo'), value: 'origNo', type: 'input' },
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
        { prop: 'qcNo', label: this.$t('qcReport.qcNo'), minWidth: 120 },
        { prop: 'asnNo', label: this.$t('qcReport.asnNo'), minWidth: 120 },
        { prop: 'origNo', label: this.$t('qcReport.origNo'), minWidth: 130 },
        { prop: 'cusOrderNo', label: this.$t('qcReport.cusOrderNo'), minWidth: 130 },
        { prop: 'ownerName', label: this.$t('qcReport.ownerName'), minWidth: 100 },
        { prop: 'supplierName', label: this.$t('qcReport.supplierName'), minWidth: 100 },
        { prop: 'qcStatusName', label: this.$t('qcReport.qcStatus'), minWidth: 100 },
        { prop: 'qcModeName', label: this.$t('qcReport.qcMode'), minWidth: 100 },
        { prop: 'checkUserName', label: this.$t('qcReport.checkUserName'), minWidth: 100 },
        { prop: 'checkTime', label: this.$t('qcReport.checkTime'), minWidth: 100 },
        { prop: 'checkUserTwoName', label: this.$t('qcReport.checkUserTwoName'), minWidth: 100 },
        { prop: 'checkTimeTwo', label: this.$t('qcReport.checkTimeTwo'), minWidth: 100 },
        { prop: 'orderCommodityQty', label: this.$t('qcReport.orderCommodityQty'), minWidth: 100 },
        { prop: 'asnCommodityQty', label: this.$t('qcReport.asnCommodityQty'), minWidth: 100 },
        { prop: 'recQty', label: this.$t('qcReport.recQty'), minWidth: 100 },
        { prop: 'shouldQcQty', label: this.$t('qcReport.shouldQcQty'), minWidth: 100 },
        { prop: 'qcQty', label: this.$t('qcReport.qcQty'), minWidth: 100 },
        { prop: 'goodQty', label: this.$t('qcReport.goodQty'), minWidth: 100 },
        { prop: 'badQty', label: this.$t('qcReport.badQty'), minWidth: 100 },
        { prop: 'badReason', label: this.$t('qcReport.badReason'), minWidth: 100 },
        { prop: 'checkResultName', label: this.$t('qcReport.checkResult'), minWidth: 100 },
        { prop: 'qcRemark', label: this.$t('qcReport.qcRemark'), minWidth: 100 },
        { prop: 'asnTypeName', label: this.$t('qcReport.asnType'), minWidth: 100 },
        { prop: 'asnSourceName', label: this.$t('qcReport.asnSource'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('qcReport.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('qcReport.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('qcReport.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('qcReport.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('qcReport.mainUnit'), minWidth: 100 },
        { prop: 'mfgName', label: this.$t('qcReport.mfgName'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('qcReport.originCountry'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('qcReport.drugForm'), minWidth: 100 },
        { prop: 'drugFormSpec', label: this.$t('qcReport.drugFormSpec'), minWidth: 100 },
        { prop: 'pprovalNumber', label: this.$t('qcReport.pprovalNumber'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('qcReport.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('qcReport.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('qcReport.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('qcReport.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('qcReport.invalidDate'), minWidth: 100 },
        { prop: 'skuVolM', label: this.$t('qcReport.volDec'), minWidth: 100 },
        { prop: 'skuGrossWeightKg', label: this.$t('qcReport.grossWeightDec'), minWidth: 100 },
        { prop: 'skuNetWeightKg', label: this.$t('qcReport.netWeightDec'), minWidth: 100 },
        { prop: 'skuCostPriceY', label: this.$t('qcReport.moneyDec'), minWidth: 100 }
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
