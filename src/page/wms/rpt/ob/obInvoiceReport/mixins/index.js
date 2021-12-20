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
          generateTime: null,
          taxpayerName: null,
          customerName: null,
          invoiceStatus: null,
          drawer: null,
          payee: null,
          reviewer: null,
          skuCode: null,

          generateTimeFrom: null,
          generateTimeTo: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        invoiceStatusList: [
        ]
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: null/* {//表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'),//操作列名
          width: '210',//默认操作按钮列宽度
          btList: [//添加操作按钮
            //默认查看按钮
            {label:this.$t('table.view'), type: 'primary', icon: '', event: 'openViewPage', show: true,disabled:this.$hasPerm('view')},//event值为notification.js中定义的方法名
            //默认修改按钮
            {label:this.$t('table.edit'), type: 'success', icon: '', event: 'openEditPage', show: true,disabled:this.$hasPerm('edit')},//event值为notification.js中定义的方法名
            //默认删除按钮
            {label:this.$t('table.delete'), type: 'danger', icon: '', event: 'deleteData', show: true,disabled:this.$hasPerm('delete')},//event值为notification.js中定义的方法名
          ]
        } */
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

    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('obInvoiceReport.outOrderNo'), value: 'outOrderNo', type: 'input' },
        { label: this.$t('obInvoiceReport.invoiceStatus'), value: 'invoiceStatus', type: 'select', list: 'invoiceStatusList' },
        { label: this.$t('obInvoiceReport.taxpayerName'), value: 'taxpayerName', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },

    collapsableFormMore() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('obInvoiceReport.outOrderNo'), value: 'outOrderNo', type: 'input' },
        { label: this.$t('obInvoiceReport.invoiceStatus'), value: 'invoiceStatus', type: 'select', list: 'invoiceStatusList' },

        { label: this.$t('obInvoiceReport.taxpayerName'), value: 'taxpayerName', type: 'input' },
        { label: this.$t('obInvoiceReport.customerName'), value: 'customerName', type: 'input' },

        { label: this.$t('obInvoiceReport.drawer'), value: 'drawer', type: 'input' },
        { label: this.$t('obInvoiceReport.reviewer'), value: 'reviewer', type: 'input' },
        { label: this.$t('obInvoiceReport.payee'), value: 'payee', type: 'input' },

        { label: this.$t('obInvoiceReport.skuCode'), value: 'skuCode', type: 'slot' },

        { label: this.$t('obInvoiceReport.generateTimeFrom'), value: 'generateTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('obInvoiceReport.generateTimeTo'), value: 'generateTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },

    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化top表单
      // this.topForm.fieldList = [
      //   {label: this.$t('obInvoiceReport.outOrderNo'), value: "outOrderNo", type: "input"},
      //   {label: this.$t('obInvoiceReport.invoiceStatus'), value: "invoiceStatus", type: "select",list: 'invoiceStatusList'},

      //   {label: this.$t('obInvoiceReport.taxpayerName'), value: "taxpayerName", type: "input"},
      //   {label: this.$t('obInvoiceReport.customerName'), value: "customerName", type: "input"},

      //   {label: this.$t('obInvoiceReport.drawer'), value: "drawer", type: "input"},
      //   {label: this.$t('obInvoiceReport.reviewer'), value: "reviewer", type: "input"},
      //   {label: this.$t('obInvoiceReport.payee'), value: "payee", type: "input"},

      //   {label: this.$t('obInvoiceReport.skuCode'), value: "skuCode", type: "slot"},

      //   {label: this.$t('obInvoiceReport.generateTimeFrom'), value: "generateTimeFrom", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {label: this.$t('obInvoiceReport.generateTimeTo'), value: "generateTimeTo", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {
      //     type: "button",
      //     label: "",
      //     btnlabel: this.$t('table.search'),//查询按钮
      //     btType: "primary",
      //     icon: "el-icon-search",
      //     event: "search",//event值为notification.js中定义的方法名
      //     show: true,
      //     disabled:this.$hasPerm('search')
      //   },
      //   {
      //     type: "button",
      //     label: "",
      //     btnlabel: this.$t('table.reboot'),//重置按钮
      //     btType: "warning",
      //     icon: "el-icon-refresh-left",
      //     event: "reboot",//event值为notification.js中定义的方法名
      //     show: true,
      //     disabled:this.$hasPerm('search')
      //   }
      // ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'outOrderNo', label: this.$t('obInvoiceReport.outOrderNo'), minWidth: 120 },
        { prop: 'generateTime', label: this.$t('obInvoiceReport.generateTime'), minWidth: 100 },
        { prop: 'taxpayerName', label: this.$t('obInvoiceReport.taxpayerName'), minWidth: 100 },
        { prop: 'taxpayerCode', label: this.$t('obInvoiceReport.taxpayerCode'), minWidth: 100 },
        { prop: 'taxpayerAddress', label: this.$t('obInvoiceReport.taxpayerAddress'), minWidth: 100 },
        { prop: 'taxpayerTel', label: this.$t('obInvoiceReport.taxpayerTel'), minWidth: 100 },
        { prop: 'taxpayerBankName', label: this.$t('obInvoiceReport.taxpayerBankName'), minWidth: 100 },
        { prop: 'taxpayerBankAccount', label: this.$t('obInvoiceReport.taxpayerBankAccount'), minWidth: 100 },
        { prop: 'customerName', label: this.$t('obInvoiceReport.customerName'), minWidth: 100 },
        { prop: 'customerCode', label: this.$t('obInvoiceReport.customerCode'), minWidth: 100 },
        { prop: 'customerAddress', label: this.$t('obInvoiceReport.customerAddress'), minWidth: 100 },
        { prop: 'customerTel', label: this.$t('obInvoiceReport.customerTel'), minWidth: 100 },
        { prop: 'customerBankName', label: this.$t('obInvoiceReport.customerBankName'), minWidth: 100 },
        { prop: 'invoiceCode', label: this.$t('obInvoiceReport.invoiceCode'), minWidth: 100 },
        { prop: 'invoiceNumber', label: this.$t('obInvoiceReport.invoiceNumber'), minWidth: 100 },
        { prop: 'checkCode', label: this.$t('obInvoiceReport.checkCode'), minWidth: 100 },
        { prop: 'fiscalCode', label: this.$t('obInvoiceReport.fiscalCode'), minWidth: 100 },
        { prop: 'invoiceStatusName', label: this.$t('obInvoiceReport.invoiceStatus'), minWidth: 100 },
        { prop: 'totalAmount', label: this.$t('obInvoiceReport.totalAmount'), minWidth: 100 },
        { prop: 'noTaxTotalAmount', label: this.$t('obInvoiceReport.noTaxTotalAmount'), minWidth: 100 },
        { prop: 'taxTotalAmount', label: this.$t('obInvoiceReport.taxTotalAmount'), minWidth: 100 },
        { prop: 'drawer', label: this.$t('obInvoiceReport.drawer'), minWidth: 100 },
        { prop: 'payee', label: this.$t('obInvoiceReport.payee'), minWidth: 100 },
        { prop: 'reviewer', label: this.$t('obInvoiceReport.reviewer'), minWidth: 100 },
        { prop: 'invoiceRemark', label: this.$t('obInvoiceReport.invoiceRemark'), minWidth: 100 },
        { prop: 'pdfUnsignedUrl', label: this.$t('obInvoiceReport.pdfUnsignedUrl'), minWidth: 100 },
        { prop: 'relationInvoiceCode', label: this.$t('obInvoiceReport.relationInvoiceCode'), minWidth: 100 },
        { prop: 'invoiceRedReason', label: this.$t('obInvoiceReport.invoiceRedReason'), minWidth: 100 },
        { prop: 'invoiceRedDate', label: this.$t('obInvoiceReport.invoiceRedDate'), minWidth: 100 },
        { prop: 'invoiceLineNature', label: this.$t('obInvoiceReport.invoiceLineNature'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('obInvoiceReport.skuCode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('obInvoiceReport.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('obInvoiceReport.spec'), minWidth: 100 },
        { prop: 'unitPrice', label: this.$t('obInvoiceReport.unitPrice'), minWidth: 100 },
        { prop: 'proQty', label: this.$t('obInvoiceReport.proQty'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('obInvoiceReport.mainUnit'), minWidth: 100 },
        { prop: 'taxRate', label: this.$t('obInvoiceReport.taxRate'), minWidth: 100 },
        { prop: 'noTaxAmount', label: this.$t('obInvoiceReport.noTaxAmount'), minWidth: 100 },
        { prop: 'taxAmount', label: this.$t('obInvoiceReport.taxAmount'), minWidth: 100 },
        { prop: 'detailTotalAmount', label: this.$t('obInvoiceReport.detailTotalAmount'), minWidth: 100 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.diaFormInfo.fieldList = [
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.diaFormInfo.fieldList = [
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
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
