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
          soNo: null,
          scSoType: null,
          scBusinessType: null,
          outOrderNo: null,
          cusOrderNo: null,
          ownerName: null,
          customerName: null,
          soStatus: null,
          shopOrderNo: null,
          partnerName: null,
          isPrintInvoice: null,
          createTime: null,
          skuCode: null,
          mfg: null,

          ownerId: null,
          customerId: null,
          partnerId: null,
          mfgId: null,
          createTimeFrom: null,
          createTimeTo: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '130px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        isPrintInvoiceList: [
        ],
        scSoTypeList: [],
        scBusinessTypeList: [],
        soStatusList: [
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
    collapsableFormMore() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('obSoReport.soNo'), value: 'soNo', type: 'input' },
        { label: this.$t('obSoReport.outOrderNo'), value: 'outOrderNo', type: 'input' },
        { label: this.$t('obSoReport.cusOrderNo'), value: 'cusOrderNo', type: 'input' },
        { label: this.$t('so.scSoType'), value: 'scSoType', type: 'select', list: 'scSoTypeList' },
        { label: this.$t('so.scBusinessType'), value: 'scBusinessType', type: 'select', list: 'scBusinessTypeList' },
        { label: this.$t('obSoReport.soStatus'), value: 'soStatus', type: 'select', list: 'soStatusList' },
        { label: this.$t('obSoReport.shopOrderNo'), value: 'shopOrderNo', type: 'input' },
        // {label: this.$t('obSoReport.ownerName'), value: "ownerName", type: "input"},
        // {label: this.$t('obSoReport.customerName'), value: "customerName", type: "input"},
        // {label: this.$t('obSoReport.partnerName'), value: "partnerName", type: "input"},
        { label: this.$t('obSoReport.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('obSoReport.customerId'), value: 'customerId', type: 'slot' },
        { label: this.$t('obSoReport.partnerId'), value: 'partnerId', type: 'slot' },
        { label: this.$t('obSoReport.skuCode'), value: 'skuCode', type: 'slot' },
        { label: this.$t('obSoReport.isPrintInvoice'), value: 'isPrintInvoice', type: 'select', list: 'isPrintInvoiceList' },
        // {label: this.$t('obSoReport.createTime'), value: "createTime", type: "input"},
        { label: this.$t('obSoReport.createTimeFrom'), value: 'createTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('obSoReport.createTimeTo'), value: 'createTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },

    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('obSoReport.soNo'), value: 'soNo', type: 'input' },
        { label: this.$t('obSoReport.outOrderNo'), value: 'outOrderNo', type: 'input' },
        { label: this.$t('obSoReport.cusOrderNo'), value: 'cusOrderNo', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
      this.topForm.data.ownerId = null
      this.topForm.data.customerId = null
      this.topForm.data.partnerId = null
      this.topForm.data.skuCode = null
    },
    // 主页面初始化数据
    initTopFormColumns() {
      // //初始化top表单
      // this.topForm.fieldList = [
      //   {label: this.$t('obSoReport.soNo'), value: "soNo", type: "input"},
      //   {label: this.$t('obSoReport.outOrderNo'), value: "outOrderNo", type: "input"},
      //   {label: this.$t('obSoReport.cusOrderNo'), value: "cusOrderNo", type: "input"},
      //   {label: this.$t('obSoReport.soType'), value: "soType", type: "select",list: 'soTypeList'},
      //   {label: this.$t('obSoReport.soStatus'), value: "soStatus", type: "select",list: 'soStatusList'},
      //   {label: this.$t('obSoReport.shopOrderNo'), value: "shopOrderNo", type: "input"},

      //   // {label: this.$t('obSoReport.ownerName'), value: "ownerName", type: "input"},
      //   // {label: this.$t('obSoReport.customerName'), value: "customerName", type: "input"},
      //   // {label: this.$t('obSoReport.partnerName'), value: "partnerName", type: "input"},
      //   {label: this.$t('obSoReport.ownerId'), value: "ownerId", type: "slot"},
      //   {label: this.$t('obSoReport.customerId'), value: "customerId", type: "slot"},
      //   {label: this.$t('obSoReport.partnerId'), value: "partnerId", type: "slot"},
      //   {label: this.$t('obSoReport.mfg'), value: "mfg", type: "input"},

      //   {label: this.$t('obSoReport.skuCode'), value: "skuCode", type: "slot"},

      //   {label: this.$t('obSoReport.isPrintInvoice'), value: "isPrintInvoice", type: "select",list: 'isPrintInvoiceList'},
      //   // {label: this.$t('obSoReport.createTime'), value: "createTime", type: "input"},
      //   {label: this.$t('obSoReport.createTimeFrom'), value: "createTimeFrom", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {label: this.$t('obSoReport.createTimeTo'), value: "createTimeTo", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},

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
        { prop: 'soNo', label: this.$t('obSoReport.soNo'), minWidth: 150 },
        { prop: 'scSoTypeName', label: this.$t('obSoReport.scSoType'), minWidth: 100 },
        { prop: 'scBusinessTypeName', label: this.$t('obSoReport.scBusinessType'), minWidth: 100 },
        { prop: 'outOrderNo', label: this.$t('obSoReport.outOrderNo'), minWidth: 140 },
        { prop: 'cusOrderNo', label: this.$t('obSoReport.cusOrderNo'), minWidth: 130 },
        { prop: 'ownerName', label: this.$t('obSoReport.ownerName'), minWidth: 100 },
        { prop: 'customerName', label: this.$t('obSoReport.customerName'), minWidth: 100 },
        { prop: 'soStatusName', label: this.$t('obSoReport.soStatus'), minWidth: 100 },
        { prop: 'orderPayFee', label: this.$t('obSoReport.orderPayFee'), minWidth: 100 },
        { prop: 'orderDiscountFee', label: this.$t('obSoReport.orderDiscountFee'), minWidth: 100 },
        { prop: 'storeName', label: this.$t('obSoReport.storeName'), minWidth: 100 },
        { prop: 'addr', label: this.$t('obSoReport.addr'), minWidth: 100 },
        { prop: 'receiver', label: this.$t('obSoReport.receiver'), minWidth: 100 },
        { prop: 'receiverTel', label: this.$t('obSoReport.receiverTel'), minWidth: 100 },
        { prop: 'endCustomer', label: this.$t('obSoReport.endCustomer'), minWidth: 100 },
        { prop: 'contactPhone', label: this.$t('obSoReport.contactPhone'), minWidth: 100 },
        { prop: 'purchName', label: this.$t('obSoReport.purchName'), minWidth: 100 },
        { prop: 'shopOrderNo', label: this.$t('obSoReport.shopOrderNo'), minWidth: 100 },
        { prop: 'emailAddr', label: this.$t('obSoReport.emailAddr'), minWidth: 100 },
        { prop: 'buyerRemark', label: this.$t('obSoReport.buyerRemark'), minWidth: 100 },
        { prop: 'buyerMsg', label: this.$t('obSoReport.buyerMsg'), minWidth: 100 },
        { prop: 'sellerRemark', label: this.$t('obSoReport.sellerRemark'), minWidth: 100 },
        { prop: 'provinceName', label: this.$t('obSoReport.provinceName'), minWidth: 100 },
        { prop: 'cityName', label: this.$t('obSoReport.cityName'), minWidth: 100 },
        { prop: 'areaName', label: this.$t('obSoReport.areaName'), minWidth: 100 },
        { prop: 'partnerName', label: this.$t('obSoReport.partnerName'), minWidth: 100 },
        { prop: 'takeDeliveryMethod', label: this.$t('obSoReport.takeDeliveryMethod'), minWidth: 100 },
        { prop: 'isPrintInvoice', label: this.$t('obSoReport.isPrintInvoice'), minWidth: 100 },
        { prop: 'taxType', label: this.$t('obSoReport.taxType'), minWidth: 100 },
        { prop: 'taxIdNum', label: this.$t('obSoReport.taxIdNum'), minWidth: 100 },
        { prop: 'invoiceTitle', label: this.$t('obSoReport.invoiceTitle'), minWidth: 100 },
        { prop: 'invoiceType', label: this.$t('obSoReport.invoiceType'), minWidth: 100 },
        { prop: 'sourceOrderNo', label: this.$t('obSoReport.sourceOrderNo'), minWidth: 100 },
        { prop: 'isCrossDocking', label: this.$t('obSoReport.isCrossDocking'), minWidth: 100 },
        { prop: 'isFrozen', label: this.$t('obSoReport.isFrozen'), minWidth: 100 },
        { prop: 'frozenRemark', label: this.$t('obSoReport.frozenRemark'), minWidth: 100 },
        { prop: 'unfrozenRemark', label: this.$t('obSoReport.unfrozenRemark'), minWidth: 100 },
        { prop: 'creator', label: this.$t('obSoReport.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('obSoReport.createTime'), minWidth: 100 },
        { prop: 'rowNo', label: this.$t('obSoReport.rowNo'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('obSoReport.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('obSoReport.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('obSoReport.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('obSoReport.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('obSoReport.mainUnit'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('obSoReport.originCountry'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('obSoReport.drugForm'), minWidth: 100 },
        { prop: 'drugFormSpec', label: this.$t('obSoReport.drugFormSpec'), minWidth: 100 },
        { prop: 'approvalNumber', label: this.$t('obSoReport.approvalNumber'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('obSoReport.batchNo'), minWidth: 100 },
        { prop: 'soQty', label: this.$t('obSoReport.soQty'), minWidth: 100 },
        { prop: 'amountPay', label: this.$t('obSoReport.amountPay'), minWidth: 100 },
        { prop: 'amountDiscount', label: this.$t('obSoReport.amountDiscount'), minWidth: 100 },
        { prop: 'totalAmountPay', label: this.$t('obSoReport.totalAmountPay'), minWidth: 100 },
        { prop: 'totalAmountDiscount', label: this.$t('obSoReport.totalAmountDiscount'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('obSoReport.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('obSoReport.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('obSoReport.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('obSoReport.invalidDate'), minWidth: 100 },
        { prop: 'allotQty', label: this.$t('obSoReport.allotQty'), minWidth: 100 },
        { prop: 'pickQty', label: this.$t('obSoReport.pickQty'), minWidth: 100 },
        { prop: 'reviewQty', label: this.$t('obSoReport.reviewQty'), minWidth: 100 },
        { prop: 'sendQty', label: this.$t('obSoReport.sendQty'), minWidth: 100 }
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
