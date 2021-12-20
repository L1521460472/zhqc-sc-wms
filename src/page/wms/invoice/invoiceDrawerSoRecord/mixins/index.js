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
          originNo: null,
          soType: null,
          soStatus: null,
          ownerId: null,
          customerId: null,
          storeId: null,
          partnerId: null,
          receiver: null,
          receiverTel: null,
          invoiceStatus: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        soTypeList: [],
        soStatusList: [],
        invoiceStatusList: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '100', // 默认操作按钮列宽度
          btList: [// 添加操作按钮
            // 默认查看按钮
            { label: this.$t('table.view'), type: 'primary', icon: '', event: 'openViewPage', show: true, disabled: this.$hasPerm('view') }// event值为notification.js中定义的方法名
          ]
        }
      },
      // 弹窗表单
      diaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {
          dtList: []
        }, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        labelWidth: '150px',
        diaTableDt: {
          topBtn: {},
          ref: null,
          data: [],
          fieldList: [],
          handle: null
        }
      }
    }
  },
  mounted() {
    this.collapsableForm()// 初始化表单--展开收起
    this.initTopFormColumns()// 初始化查询界面配置数据
    this.rulesInit()// 初始化diaFormInfo表单字段校验规则
  },
  methods: {
    collapsableFormMore() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('invoiceDrawerSoRecord.originNo'), value: 'originNo', type: 'input' },
        { label: this.$t('invoiceDrawerSoRecord.soType'), value: 'soType', type: 'select', list: 'soTypeList' },
        { label: this.$t('invoiceDrawerSoRecord.soStatus'), value: 'soStatus', type: 'select', list: 'soStatusList' },
        { label: this.$t('invoiceDrawerSoRecord.ownerName'), value: 'ownerId', type: 'slot' },
        { label: this.$t('invoiceDrawerSoRecord.customersName'), value: 'customerId', type: 'slot' },
        { label: this.$t('invoiceDrawerSoRecord.storeName'), value: 'storeId', type: 'slot' },
        { label: this.$t('invoiceDrawerSoRecord.carrierName'), value: 'partnerId', type: 'slot' },
        { label: this.$t('invoiceDrawerSoRecord.receiver'), value: 'receiver', type: 'input' },
        { label: this.$t('invoiceDrawerSoRecord.receiverTel'), value: 'receiverTel', type: 'input' },
        { label: this.$t('invoiceDrawerSoRecord.invoiceStatus'), value: 'invoiceStatus', type: 'select', list: 'invoiceStatusList' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('invoiceDrawerSoRecord.originNo'), value: 'originNo', type: 'input' },
        { label: this.$t('invoiceDrawerSoRecord.soType'), value: 'soType', type: 'select', list: 'soTypeList' },
        { label: this.$t('invoiceDrawerSoRecord.soStatus'), value: 'soStatus', type: 'select', list: 'soStatusList' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
      this.topForm.data.ownerId = null
      this.topForm.data.customerId = null
      this.topForm.data.storeId = null
      this.topForm.data.partnerId = null
    },
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'originNo', label: this.$t('invoiceDrawerSoRecord.originNo'), minWidth: 120 },
        { prop: 'kpTypeName', label: this.$t('invoiceDrawerSoRecord.kpTypeName'), minWidth: 100 },
        { prop: 'invoiceStatusName', label: this.$t('invoiceDrawerSoRecord.invoiceStatus'), minWidth: 100 },
        { prop: 'soTypeName', label: this.$t('invoiceDrawerSoRecord.soType'), minWidth: 100 },
        { prop: 'soStatusName', label: this.$t('invoiceDrawerSoRecord.soStatus'), minWidth: 100 },
        { prop: 'customersName', label: this.$t('invoiceDrawerSoRecord.customersName'), minWidth: 100 },
        { prop: 'storeName', label: this.$t('invoiceDrawerSoRecord.storeName'), minWidth: 100 },
        { prop: 'carrierName', label: this.$t('invoiceDrawerSoRecord.carrierName'), minWidth: 100 },
        { prop: 'invoiceTitle', label: this.$t('invoiceDrawerSoRecord.invoiceTitle'), minWidth: 100 },
        { prop: 'receiver', label: this.$t('invoiceDrawerSoRecord.receiver'), minWidth: 100 },
        { prop: 'receiverTel', label: this.$t('invoiceDrawerSoRecord.receiverTel'), minWidth: 100 },
        { prop: 'addr', label: this.$t('invoiceDrawerSoRecord.addr'), minWidth: 100 },
        { prop: 'invoiceStatusName', label: this.$t('invoiceDrawerSoRecord.invoiceStatus'), minWidth: 100 },
        { prop: 'invoiceCode', label: this.$t('invoiceDrawerSoRecord.invoiceCode'), minWidth: 150 },
        { prop: 'invoiceNumber', label: this.$t('invoiceDrawerSoRecord.invoiceNumber'), minWidth: 150 },
        { prop: 'generateTime', label: this.$t('invoiceDrawerSoRecord.generateTime'), minWidth: 100 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('invoiceDrawerSoRecord.originNo'), value: 'originNo', type: 'input', readonly: true },
        { label: this.$t('invoiceDrawerSoRecord.serialNo'), value: 'serialNo', type: 'input', readonly: true },
        { label: this.$t('invoiceDrawerSoRecord.invoiceStatus'), value: 'invoiceStatusName', type: 'input', readonly: true },
        { label: this.$t('invoiceDrawerSoRecord.taxpayerName'), value: 'taxpayerName', type: 'input', readonly: true },
        { label: this.$t('invoiceDrawerSoRecord.taxpayerCode'), value: 'taxpayerCode', type: 'input', readonly: true },
        { label: this.$t('invoiceDrawerSoRecord.taxpayerAddress'), value: 'taxpayerAddress', type: 'input', readonly: true },
        { label: this.$t('invoiceDrawerSoRecord.taxpayerTel'), value: 'taxpayerTel', type: 'input', readonly: true },
        { label: this.$t('invoiceDrawerSoRecord.taxpayerBankName'), value: 'taxpayerBankName', type: 'input', readonly: true },
        { label: this.$t('invoiceDrawerSoRecord.taxpayerBankAccount'), value: 'taxpayerBankAccount', type: 'input', readonly: true },
        { label: this.$t('invoiceDrawerSoRecord.customerName'), value: 'customerName', type: 'input', readonly: true },
        { label: this.$t('invoiceDrawerSoRecord.customerCode'), value: 'customerCode', type: 'input', readonly: true },
        { label: this.$t('invoiceDrawerSoRecord.customerAddress'), value: 'customerAddress', type: 'input', readonly: true },
        { label: this.$t('invoiceDrawerSoRecord.customerTel'), value: 'customerTel', type: 'input', readonly: true },
        { label: this.$t('invoiceDrawerSoRecord.customerBankName'), value: 'customerBankName', type: 'input', readonly: true },
        { label: this.$t('invoiceDrawerSoRecord.invoiceCode'), value: 'invoiceCode', type: 'input', readonly: true },
        { label: this.$t('invoiceDrawerSoRecord.invoiceNumber'), value: 'invoiceNumber', type: 'input', readonly: true },
        { label: this.$t('invoiceDrawerSoRecord.checkCode'), value: 'checkCode', type: 'input', readonly: true },
        { label: this.$t('invoiceDrawerSoRecord.fiscalCode'), value: 'fiscalCode', type: 'input', readonly: true },
        { label: this.$t('invoiceDrawerSoRecord.totalAmountDec'), value: 'totalAmountDec', type: 'input', readonly: true },
        { label: this.$t('invoiceDrawerSoRecord.noTaxAmountDec'), value: 'noTaxAmountDec', type: 'input', readonly: true },
        { label: this.$t('invoiceDrawerSoRecord.taxAmountDec'), value: 'taxAmountDec', type: 'input', readonly: true },
        { label: this.$t('invoiceDrawerSoRecord.drawer'), value: 'drawer', type: 'input', readonly: true },
        { label: this.$t('invoiceDrawerSoRecord.generateTime'), value: 'generateTime', type: 'input', readonly: true },
        { label: this.$t('invoiceDrawerSoRecord.payee'), value: 'payee', type: 'input', readonly: true },
        { label: this.$t('invoiceDrawerSoRecord.reviewer'), value: 'reviewer', type: 'input', readonly: true },
        { label: this.$t('invoiceDrawerSoRecord.invoiceRemark'), value: 'invoiceRemark', type: 'input', readonly: true },
        { label: this.$t('invoiceDrawerSoRecord.relationInvoiceCode'), value: 'relationInvoiceCode', type: 'input', readonly: true },
        { label: this.$t('invoiceDrawerSoRecord.invoiceRedReason'), value: 'invoiceRedReason', type: 'input', readonly: true },
        { label: this.$t('invoiceDrawerSoRecord.invoiceRedDate'), value: 'invoiceRedDate', type: 'input', readonly: true },
        { label: this.$t('invoiceDrawerSoRecord.viewUrl'), value: 'viewUrl', type: 'input', readonly: true },
        { label: this.$t('invoiceDrawerSoRecord.pdfUnsignedUrl'), value: 'pdfUnsignedUrl', type: 'input', readonly: true },
        { label: this.$t('invoiceDrawerSoRecord.remark'), value: 'remark', type: 'input', readonly: true }
      ]

      // 明细数据
      this.diaFormInfo.diaTableDt.fieldList = [
        { label: this.$t('table.id'), type: 'seq', width: 50 }, // 序列
        { prop: 'invoiceLineNatureName', label: this.$t('invoiceDrawerSoRecord.dt.invoiceLineNatureName'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('invoiceDrawerSoRecord.dt.skuCode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('invoiceDrawerSoRecord.dt.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('invoiceDrawerSoRecord.dt.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('invoiceDrawerSoRecord.dt.mainUnit'), minWidth: 100 },
        { prop: 'unitPriceDec', label: this.$t('invoiceDrawerSoRecord.dt.unitPriceDec'), minWidth: 100 },
        { prop: 'proQty', label: this.$t('invoiceDrawerSoRecord.dt.proQty'), minWidth: 100 },
        { prop: 'taxRateDec', label: this.$t('invoiceDrawerSoRecord.dt.taxRateDec'), minWidth: 100 },
        { prop: 'noTaxAmountDec', label: this.$t('invoiceDrawerSoRecord.dt.noTaxAmountDec'), minWidth: 100 },
        { prop: 'taxAmountDec', label: this.$t('invoiceDrawerSoRecord.dt.taxAmountDec'), minWidth: 100 },
        { prop: 'totalAmountDec', label: this.$t('invoiceDrawerSoRecord.dt.totalAmountDec'), minWidth: 100 }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        taxAmount: null,
        pdfUnsignedUrl: null,
        taxpayerBankName: null,
        remark: null,
        soNo: null,
        taxpayerName: null,
        payee: null,
        invoiceRedDate: null,
        taxpayerTel: null,
        customerBankName: null,
        customerTel: null,
        soId: null,
        drawerDate: null,
        viewUrl: null,
        companyCode: null,
        id: null,
        customerCode: null,
        taxTotalAmount: null,
        excludingTaxAmount: null,
        customerAddress: null,
        taxpayerCode: null,
        antiForgeryCode: null,
        drawer: null,
        invoiceRemark: null,
        reviewer: null,
        relationInvoiceCode: null,
        invoiceRedReason: null,
        downLoadUrl: null,
        checkCode: null,
        invoiceCode: null,
        whId: null,
        taxpayerBankAccount: null,
        taxpayerAddress: null,
        creatorName: null,
        customerName: null,
        serialNo: null,
        invoiceStatus: null
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
