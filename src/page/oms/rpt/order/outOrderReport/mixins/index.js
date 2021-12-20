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
          outOrderNo: null,
          ownerId: null,
          scOorderType: null,
          scBusinessType: null,
          orderOrig: null,
          orderStatus: null,
          cusOrderNo: null,
          customerId: null,
          confirmTimeFrom: null,
          confirmTimeTo: null,
          shopOrderNo: null,
          isHasInvoice: null,
          sourceCode: null,
          createTimeFrom: null,
          createTimeTo: null,
          mfgId: null,
          skuCode: null,
          partnerId: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '130px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        scOrderTypeList: [
        ],
        scBusinessTypeList: [
        ],
        orderStatusList: [
        ],
        orderOrigList: [
        ],
        isHasInvoiceList: [
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
        { label: this.$t('outOrderReport.outOrderNo'), value: 'outOrderNo', type: 'input' },
        { label: this.$t('outOrderReport.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('outOrderReport.scOrderType'), value: 'scOrderType', type: 'select', list: 'scOrderTypeList' },
        { label: this.$t('outOrderReport.scBusinessType'), value: 'scBusinessType', type: 'select', list: 'scBusinessTypeList' },
        { label: this.$t('outOrderReport.orderOrig'), value: 'orderOrig', type: 'select', list: 'orderOrigList' },
        { label: this.$t('outOrderReport.orderStatus'), value: 'orderStatus', type: 'select', list: 'orderStatusList' },
        { label: this.$t('outOrderReport.cusOrderNo'), value: 'cusOrderNo', type: 'input' },
        { label: this.$t('outOrderReport.customerId'), value: 'customerId', type: 'slot' },
        { label: this.$t('outOrderReport.shopOrderNo'), value: 'shopOrderNo', type: 'input' },
        { label: this.$t('outOrderReport.isHasInvoice'), value: 'isHasInvoice', type: 'select', list: 'isHasInvoiceList' },
        { label: this.$t('outOrderReport.sourceCode'), value: 'sourceCode', type: 'input' },
        { label: this.$t('outOrderReport.confirmTimeFrom'), value: 'confirmTimeFrom', type: 'date' },
        { label: this.$t('outOrderReport.confirmTimeTo'), value: 'confirmTimeTo', type: 'date' },
        { label: this.$t('outOrderReport.createTimeFrom'), value: 'createTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('outOrderReport.createTimeTo'), value: 'createTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('outOrderReport.skuCode'), value: 'skuCode', type: 'slot' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('outOrderReport.outOrderNo'), value: 'outOrderNo', type: 'input' },
        { label: this.$t('outOrderReport.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('outOrderReport.scOrderType'), value: 'scOrderType', type: 'select', list: 'scOrderTypeList' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
      this.topForm.data.customerId = null
      this.topForm.data.skuCode = null
    },
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'outOrderNo', label: this.$t('outOrderReport.outOrderNo'), minWidth: 100 },
        { prop: 'scOrderTypeName', label: this.$t('inOrderReport.scOrderType'), minWidth: 100 },
        { prop: 'scBusinessTypeName', label: this.$t('inOrderReport.scBusinessType'), minWidth: 100 },
        { prop: 'orderOrigName', label: this.$t('outOrderReport.orderOrig'), minWidth: 100 },
        { prop: 'orderStatusName', label: this.$t('outOrderReport.orderStatus'), minWidth: 100 },
        { prop: 'cusOrderNo', label: this.$t('outOrderReport.cusOrderNo'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('outOrderReport.ownerName'), minWidth: 100 },
        { prop: 'customerName', label: this.$t('outOrderReport.customerName'), minWidth: 100 },
        { prop: 'confirmTime', label: this.$t('outOrderReport.confirmTime'), minWidth: 100 },
        { prop: 'orderPriceY', label: this.$t('outOrderReport.orderPrice'), minWidth: 100 },
        { prop: 'discountPriceY', label: this.$t('outOrderReport.discountPrice'), minWidth: 100 },
        { prop: 'customerTypeName', label: this.$t('outOrderReport.customerType'), minWidth: 100 },
        { prop: 'addr', label: this.$t('outOrderReport.addr'), minWidth: 100 },
        { prop: 'receiver', label: this.$t('outOrderReport.receiver'), minWidth: 100 },
        { prop: 'receiverTel', label: this.$t('outOrderReport.receiverTel'), minWidth: 100 },
        { prop: 'endCustomer', label: this.$t('outOrderReport.endCustomer'), minWidth: 100 },
        { prop: 'contactPhone', label: this.$t('outOrderReport.contactPhone'), minWidth: 100 },
        { prop: 'purchName', label: this.$t('outOrderReport.purchName'), minWidth: 100 },
        { prop: 'shopOrderNo', label: this.$t('outOrderReport.shopOrderNo'), minWidth: 100 },
        { prop: 'emailAddr', label: this.$t('outOrderReport.emailAddr'), minWidth: 100 },
        { prop: 'payMethod', label: this.$t('outOrderReport.payMethod'), minWidth: 100 },
        { prop: 'buyerRemark', label: this.$t('outOrderReport.buyerRemark'), minWidth: 100 },
        { prop: 'buyerMsg', label: this.$t('outOrderReport.buyerMsg'), minWidth: 100 },
        { prop: 'sellerRemark', label: this.$t('outOrderReport.sellerRemark'), minWidth: 100 },
        { prop: 'provinceName', label: this.$t('outOrderReport.provinceName'), minWidth: 100 },
        { prop: 'cityName', label: this.$t('outOrderReport.cityName'), minWidth: 100 },
        { prop: 'areaName', label: this.$t('outOrderReport.areaName'), minWidth: 100 },
        { prop: 'takeDeliveryMethod', label: this.$t('outOrderReport.takeDeliveryMethod'), minWidth: 100 },
        { prop: 'partnerName', label: this.$t('outOrderReport.partnerName'), minWidth: 100 },
        { prop: 'isHasInvoiceName', label: this.$t('outOrderReport.isHasInvoice'), minWidth: 100 },
        { prop: 'taxIdNum', label: this.$t('outOrderReport.taxIdNum'), minWidth: 100 },
        { prop: 'invoiceTitle', label: this.$t('outOrderReport.invoiceTitle'), minWidth: 100 },
        { prop: 'invoiceTypeName', label: this.$t('outOrderReport.invoiceType'), minWidth: 100 },
        { prop: 'sourceCode', label: this.$t('outOrderReport.sourceCode'), minWidth: 100 },
        { prop: 'creator', label: this.$t('outOrderReport.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('outOrderReport.createTime'), minWidth: 100 },
        { prop: 'updater', label: this.$t('outOrderReport.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('outOrderReport.updateTime'), minWidth: 100 },
        { prop: 'rowNo', label: this.$t('outOrderReport.rowNo'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('outOrderReport.skuCode'), minWidth: 100 },
        { prop: 'tradeName', label: this.$t('outOrderReport.tradeName'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('outOrderReport.skuName'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('outOrderReport.originCountry'), minWidth: 100 },
        { prop: 'mfg', label: this.$t('outOrderReport.mfg'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('outOrderReport.mainUnit'), minWidth: 100 },
        { prop: 'spec', label: this.$t('outOrderReport.spec'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('outOrderReport.drugForm'), minWidth: 100 },
        { prop: 'drugFormSpec', label: this.$t('outOrderReport.drugFormSpec'), minWidth: 100 },
        { prop: 'tempControlName', label: this.$t('outOrderReport.tempControlName'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('outOrderReport.batchNo'), minWidth: 100 },
        { prop: 'amountY', label: this.$t('outOrderReport.amount'), minWidth: 100 },
        { prop: 'discountAmountY', label: this.$t('outOrderReport.discountAmount'), minWidth: 100 },
        { prop: 'outOrderQty', label: this.$t('outOrderReport.outOrderQty'), minWidth: 100 },
        { prop: 'skuPriceY', label: this.$t('outOrderReport.skuPrice'), minWidth: 100 },
        { prop: 'discountSkuPriceY', label: this.$t('outOrderReport.discountSkuPrice'), minWidth: 100 }
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
