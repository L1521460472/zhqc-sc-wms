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
          waveOrderNo: null,
          waveOrderType: null,
          waveOrderStatus: null,
          waveCreator: null,
          waveCreateTime: null,
          soNo: null,
          scSoType: null,
          ownerName: null,
          customerName: null,
          soStatus: null,
          partnerName: null,
          skuCode: null,

          ownerId: null,
          customerId: null,
          partnerId: null,
          waveCreateTimeFrom: null,
          waveCreateTimeTo: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '130px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        waveOrderTypeList: [
        ],
        waveOrderStatusList: [
        ],
        scSoTypeList: [
        ],
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
        { label: this.$t('obWaveReport.waveOrderNo'), value: 'waveOrderNo', type: 'input' },
        { label: this.$t('obWaveReport.soNo'), value: 'soNo', type: 'input' },

        { label: this.$t('obWaveReport.waveOrderType'), value: 'waveOrderType', type: 'select', list: 'waveOrderTypeList' },
        { label: this.$t('obWaveReport.waveOrderStatus'), value: 'waveOrderStatus', type: 'select', list: 'waveOrderStatusList' },
        // {label: this.$t('obWaveReport.ownerName'), value: "ownerName", type: "input"},
        // {label: this.$t('obWaveReport.customerName'), value: "customerName", type: "input"},
        // {label: this.$t('obWaveReport.partnerName'), value: "partnerName", type: "input"},
        { label: this.$t('obWaveReport.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('obWaveReport.customerId'), value: 'customerId', type: 'slot' },
        { label: this.$t('obWaveReport.partnerId'), value: 'partnerId', type: 'slot' },
        { label: this.$t('obWaveReport.soType'), value: 'scSoType', type: 'select', list: 'scSoTypeList' },
        { label: this.$t('obWaveReport.soStatus'), value: 'soStatus', type: 'select', list: 'soStatusList' },

        // {label: this.$t('obWaveReport.skuCode'), value: "skuCode", type: "input"},
        { label: this.$t('obWaveReport.skuCode'), value: 'skuCode', type: 'slot' },

        { label: this.$t('obWaveReport.waveCreator'), value: 'waveCreator', type: 'input' },
        // {label: this.$t('obWaveReport.waveCreateTime'), value: "waveCreateTime", type: "input"},
        { label: this.$t('obWaveReport.waveCreateTimeFrom'), value: 'waveCreateTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('obWaveReport.waveCreateTimeTo'), value: 'waveCreateTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },

    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('obWaveReport.waveOrderNo'), value: 'waveOrderNo', type: 'input' },
        { label: this.$t('obWaveReport.soNo'), value: 'soNo', type: 'input' },
        { label: this.$t('obWaveReport.waveOrderType'), value: 'waveOrderType', type: 'select', list: 'waveOrderTypeList' },
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
      //   {label: this.$t('obWaveReport.waveOrderNo'), value: "waveOrderNo", type: "input"},
      //   {label: this.$t('obWaveReport.soNo'), value: "soNo", type: "input"},

      //   {label: this.$t('obWaveReport.waveOrderType'), value: "waveOrderType", type: "select",list: 'waveOrderTypeList'},
      //   {label: this.$t('obWaveReport.waveOrderStatus'), value: "waveOrderStatus", type: "select",list: 'waveOrderStatusList'},
      //   // {label: this.$t('obWaveReport.ownerName'), value: "ownerName", type: "input"},
      //   // {label: this.$t('obWaveReport.customerName'), value: "customerName", type: "input"},
      //   // {label: this.$t('obWaveReport.partnerName'), value: "partnerName", type: "input"},
      //   {label: this.$t('obWaveReport.ownerId'), value: "ownerId", type: "slot"},
      //   {label: this.$t('obWaveReport.customerId'), value: "customerId", type: "slot"},
      //   {label: this.$t('obWaveReport.partnerId'), value: "partnerId", type: "slot"},

      //   {label: this.$t('obWaveReport.soType'), value: "soType", type: "select",list: 'soTypeList'},

      //   {label: this.$t('obWaveReport.soStatus'), value: "soStatus", type: "select",list: 'soStatusList'},

      //   // {label: this.$t('obWaveReport.skuCode'), value: "skuCode", type: "input"},
      //   {label: this.$t('obWaveReport.skuCode'), value: "skuCode", type: "slot"},

      //   {label: this.$t('obWaveReport.waveCreator'), value: "waveCreator", type: "input"},
      //   // {label: this.$t('obWaveReport.waveCreateTime'), value: "waveCreateTime", type: "input"},
      //   {label: this.$t('obWaveReport.waveCreateTimeFrom'), value: "waveCreateTimeFrom", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {label: this.$t('obWaveReport.waveCreateTimeTo'), value: "waveCreateTimeTo", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},

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
        { prop: 'waveOrderNo', label: this.$t('obWaveReport.waveOrderNo'), minWidth: 120 },
        { prop: 'waveOrderTypeName', label: this.$t('obWaveReport.waveOrderType'), minWidth: 100 },
        { prop: 'waveOrderStatusName', label: this.$t('obWaveReport.waveOrderStatus'), minWidth: 100 },
        { prop: 'skuNum', label: this.$t('obWaveReport.skuNum'), minWidth: 100 },
        { prop: 'soNum', label: this.$t('obWaveReport.soNum'), minWidth: 100 },
        { prop: 'pickNum', label: this.$t('obWaveReport.pickNum'), minWidth: 100 },
        { prop: 'isPrint', label: this.$t('obWaveReport.isPrint'), minWidth: 100 },
        { prop: 'waveCreator', label: this.$t('obWaveReport.waveCreator'), minWidth: 100 },
        { prop: 'waveCreateTime', label: this.$t('obWaveReport.waveCreateTime'), minWidth: 100 },
        { prop: 'sowLotCode', label: this.$t('obWaveReport.sowLotCode'), minWidth: 100 },
        { prop: 'soNo', label: this.$t('obWaveReport.soNo'), minWidth: 100 },
        { prop: 'scSoTypeName', label: this.$t('obWaveReport.soType'), minWidth: 100 },
        { prop: 'outOrderNo', label: this.$t('obWaveReport.outOrderNo'), minWidth: 100 },
        { prop: 'cusOrderNo', label: this.$t('obWaveReport.cusOrderNo'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('obWaveReport.ownerName'), minWidth: 100 },
        { prop: 'customerName', label: this.$t('obWaveReport.customerName'), minWidth: 100 },
        { prop: 'soStatusName', label: this.$t('obWaveReport.soStatus'), minWidth: 100 },
        { prop: 'orderPayFee', label: this.$t('obWaveReport.orderPayFee'), minWidth: 100 },
        { prop: 'orderDiscountFee', label: this.$t('obWaveReport.orderDiscountFee'), minWidth: 100 },
        { prop: 'storeName', label: this.$t('obWaveReport.storeName'), minWidth: 100 },
        { prop: 'addr', label: this.$t('obWaveReport.addr'), minWidth: 100 },
        { prop: 'receiver', label: this.$t('obWaveReport.receiver'), minWidth: 100 },
        { prop: 'receiverTel', label: this.$t('obWaveReport.receiverTel'), minWidth: 100 },
        { prop: 'endCustomer', label: this.$t('obWaveReport.endCustomer'), minWidth: 100 },
        { prop: 'contactPhone', label: this.$t('obWaveReport.contactPhone'), minWidth: 100 },
        { prop: 'purchName', label: this.$t('obWaveReport.purchName'), minWidth: 100 },
        { prop: 'shopOrderNo', label: this.$t('obWaveReport.shopOrderNo'), minWidth: 100 },
        { prop: 'emailAddr', label: this.$t('obWaveReport.emailAddr'), minWidth: 100 },
        { prop: 'payMethod', label: this.$t('obWaveReport.payMethod'), minWidth: 100 },
        { prop: 'buyerRemark', label: this.$t('obWaveReport.buyerRemark'), minWidth: 100 },
        { prop: 'buyerMsg', label: this.$t('obWaveReport.buyerMsg'), minWidth: 100 },
        { prop: 'sellerRemark', label: this.$t('obWaveReport.sellerRemark'), minWidth: 100 },
        { prop: 'provinceName', label: this.$t('obWaveReport.provinceName'), minWidth: 100 },
        { prop: 'cityName', label: this.$t('obWaveReport.cityName'), minWidth: 100 },
        { prop: 'areaName', label: this.$t('obWaveReport.areaName'), minWidth: 100 },
        { prop: 'partnerName', label: this.$t('obWaveReport.partnerName'), minWidth: 100 },
        { prop: 'takeDeliveryMethod', label: this.$t('obWaveReport.takeDeliveryMethod'), minWidth: 100 },
        { prop: 'isPrintInvoice', label: this.$t('obWaveReport.isPrintInvoice'), minWidth: 100 },
        { prop: 'taxType', label: this.$t('obWaveReport.taxType'), minWidth: 100 },
        { prop: 'taxIdNum', label: this.$t('obWaveReport.taxIdNum'), minWidth: 100 },
        { prop: 'invoiceTitle', label: this.$t('obWaveReport.invoiceTitle'), minWidth: 100 },
        { prop: 'invoiceType', label: this.$t('obWaveReport.invoiceType'), minWidth: 100 },
        { prop: 'sourceOrderNo', label: this.$t('obWaveReport.sourceOrderNo'), minWidth: 100 },
        { prop: 'isCrossDocking', label: this.$t('obWaveReport.isCrossDocking'), minWidth: 100 },
        { prop: 'isFrozen', label: this.$t('obWaveReport.isFrozen'), minWidth: 100 },
        { prop: 'frozenRemark', label: this.$t('obWaveReport.frozenRemark'), minWidth: 100 },
        { prop: 'unfrozenRemark', label: this.$t('obWaveReport.unfrozenRemark'), minWidth: 100 },
        { prop: 'soCreator', label: this.$t('obWaveReport.soCreator'), minWidth: 100 },
        { prop: 'soCreateTime', label: this.$t('obWaveReport.soCreateTime'), minWidth: 100 },
        { prop: 'rowNo', label: this.$t('obWaveReport.rowNo'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('obWaveReport.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('obWaveReport.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('obWaveReport.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('obWaveReport.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('obWaveReport.mainUnit'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('obWaveReport.originCountry'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('obWaveReport.drugForm'), minWidth: 100 },
        { prop: 'drugFormSpec', label: this.$t('obWaveReport.drugFormSpec'), minWidth: 100 },
        { prop: 'approvalNumber', label: this.$t('obWaveReport.approvalNumber'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('obWaveReport.batchNo'), minWidth: 100 },
        { prop: 'soQty', label: this.$t('obWaveReport.soQty'), minWidth: 100 },
        { prop: 'amountPay', label: this.$t('obWaveReport.amountPay'), minWidth: 100 },
        { prop: 'amountDiscount', label: this.$t('obWaveReport.amountDiscount'), minWidth: 100 },
        { prop: 'totalAmountPay', label: this.$t('obWaveReport.totalAmountPay'), minWidth: 100 },
        { prop: 'totalAmountDiscount', label: this.$t('obWaveReport.totalAmountDiscount'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('obWaveReport.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('obWaveReport.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('obWaveReport.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('obWaveReport.invalidDate'), minWidth: 100 },
        { prop: 'allotQty', label: this.$t('obWaveReport.allotQty'), minWidth: 100 },
        { prop: 'pickQty', label: this.$t('obWaveReport.pickQty'), minWidth: 100 },
        { prop: 'reviewQty', label: this.$t('obWaveReport.reviewQty'), minWidth: 100 },
        { prop: 'sendQty', label: this.$t('obWaveReport.sendQty'), minWidth: 100 }
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
