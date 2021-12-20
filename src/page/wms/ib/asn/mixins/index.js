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
          origNo: null,
          returnCourierNum: null,
          asnType: null,
          asnSource: null,
          asnStatus: null,
          ownerId: null,
          supplierId: null,
          shipper: null,
          consignee: null,
          creator: null,
          createTimeFrom: null,
          createTimeTo: null,
          contactName: null,
          instoreDateFrom: null,
          instoreDateTo: null,
          skuId: null,
          skuName: null,
          recOpetor: null,
          sourceCode: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '130px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        asnStatusList: [
        ],
        asnTypeList: [
        ],
        asnSourceList: [
        ],
        asnDtStatusList: [
        ],
        scAsnTypeList: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '210', // 默认操作按钮列宽度

          btList: [
            { label: this.$t('table.view'), type: 'primary', icon: '', event: 'openViewPage', show: true, disabled: this.$hasPerm('view') },
            // { label: '打印', type: 'primary', icon: '', event: 'print', show: true, disabled: this.$hasPerm('print') },
            { label: '快速收货', type: 'primary', icon: '', event: 'quickReceipt', show: true, disabled: this.$hasPerm('jumpquick') }
          ]
        }
      },
      // 弹窗表单
      diaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {
          asnStatus: null,
          ownerId: null,
          ownerName: null,
          supplierName: null,
          scAsnType: null,
          scBusinessType: null,
          remark: null,
          asnNo: null,
          origNo: null,
          asnSource: null
        }, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        dtTableInfo: {
          ref: null,
          data: [],
          fieldList: [],
          topBtn: {},
          handle: { // 表格自定义按钮
            // fixed: 'right',
            // label: this.$t('table.actions'), // 操作列名
            width: '0'// 默认操作按钮列宽度
          }
        }
      },
      // 明细表单
      diaFormInfoDt: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}// 配置的表单字段校验规则集合
      },
      // 明细表单1
      tableInfo1: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}// 配置的表单字段校验规则集合
      },
      // 明细表单2
      tableInfo2: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}// 配置的表单字段校验规则集合
      },
      tableSelectList: []
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
        { label: this.$t('asn.asnNo'), value: 'asnNo', type: 'input' },
        { label: this.$t('asn.origNo'), value: 'origNo', type: 'input' },
        { label: this.$t('asn.deliveryOrderNo'), value: 'returnCourierNum', type: 'input' },
        { label: this.$t('asn.asnType'), value: 'scAsnType', type: 'select', list: 'scAsnTypeList' }, // 业务类型
        { label: this.$t('asn.asnSource'), value: 'asnSource', type: 'select', list: 'asnSourceList' },
        // { label: this.$t('asn.scBusinessType'), value: 'scBusinessType', type: 'select', list: 'scBusinessTypeList' },
        { label: this.$t('asn.asnStatus'), value: 'asnStatus', type: 'select', list: 'asnStatusList' },
        { label: this.$t('asn.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('asn.supplierId'), value: 'supplierId', type: 'slot', readonly: true },
        { label: this.$t('asn.deliveryWH'), value: 'shipper', link: 'shipper', type: 'slot' },
        { label: this.$t('asn.ReceivingWH'), value: 'consignee', link: 'consignee', type: 'slot' },
        // { label: this.$t('asn.deliveryWH'), value: 'deliveryWH', type: 'input' },
        // { label: this.$t('asn.ReceivingWH'), value: 'ReceivingWH', type: 'input' },
        { label: this.$t('asn.creator'), value: 'creator', type: 'input' },
        { label: this.$t('asn.creatTimeStart'), value: 'createTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('asn.creatTimeEnd'), value: 'createTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('asn.contactName'), value: 'recOpetor', type: 'input' },
        { label: this.$t('asn.contactTimeStart'), value: 'instoreDateFrom', type: 'date' },
        { label: this.$t('asn.contactTimeEnd'), value: 'instoreDateTo', type: 'date' },
        { label: this.$t('asn.skuName'), value: 'skuName', type: 'input' },
        // { label: this.$t('asn.skuId'), value: 'skuId', type: 'slot' },
        // { label: this.$t('asn.origNo'), value: 'origNo', type: 'input' },
        // { label: this.$t('asn.sourceCode'), value: 'sourceCode', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('asn.asnNo'), value: 'asnNo', type: 'input' },
        { label: this.$t('asn.origNo'), value: 'origNo', type: 'input' },
        { label: this.$t('asn.deliveryOrderNo'), value: 'returnCourierNum', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
      this.topForm.data.ownerId = null
      this.topForm.data.skuId = null
    },
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: '', type: 'selection', width: 50, fixed: 'left' }, // 选项框
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'asnNo', label: this.$t('asn.asnNo'), minWidth: 120 },
        // { prop: 'ownerName', label: this.$t('asn.ownerName'), minWidth: 100 },
        { prop: 'origNo', label: this.$t('asn.origNo'), minWidth: 130 },
        { prop: 'cusOrderNo', label: this.$t('asn.cusOrderNo'), minWidth: 130 },
        { prop: 'returnCourierNum', label: this.$t('asn.deliveryOrderNo'), minWidth: 130 },
        // { prop: 'sourceCode', label: this.$t('asn.sourceCode'), minWidth: 130 },
        { prop: 'asnSourceName', label: this.$t('asn.asnSource'), minWidth: 100 },
        { prop: 'scAsnTypeName', label: this.$t('asn.scAsnType'), minWidth: 100 },
        // { prop: 'scBusinessTypeName', label: this.$t('asn.scBusinessType'), minWidth: 100 },
        { prop: 'asnStatusName', label: this.$t('asn.asnStatus'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('asn.ownerId'), minWidth: 100 },
        { prop: 'customerName', label: this.$t('asn.customer'), minWidth: 100 },
        { prop: 'supplierName', label: this.$t('asn.supplierName'), minWidth: 100 },
        { prop: 'shipper', label: this.$t('asn.deliveryWH'), minWidth: 100 },
        { prop: 'consignee', label: this.$t('asn.ReceivingWH'), minWidth: 100 },
        // { prop: 'orderPriceY', label: this.$t('asn.orderPrice'), minWidth: 100 },
        { prop: 'remark', label: this.$t('asn.orderRemark'), minWidth: 100 },
        { prop: 'isVirtureAllotStr', label: this.$t('asn.virtualAllocation'), minWidth: 100 },
        { prop: 'creator', label: this.$t('asn.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('asn.createTime'), minWidth: 100 },
        { prop: 'recOpetor', label: this.$t('asn.contactName'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('asn.contactTime'), minWidth: 100 },
        { label: '操作', value: 'status', width: 150, type: 'slot', fixed: 'right', align: 'left' }
      ]

      // 初始化新增明细表单
      this.diaFormInfoDt.fieldList = [
        { label: this.$t('asn.dt.skuCode'), value: 'skuCode', type: 'slot' },
        { label: this.$t('asn.dt.skuName'), value: 'skuName', type: 'input', disabled: true },
        { label: this.$t('asn.dt.spec'), value: 'spec', type: 'input', disabled: true },
        { label: this.$t('asn.dt.mainUnit'), value: 'mainUnit', type: 'input', disabled: true },
        { label: this.$t('asn.dt.commodityQty'), value: 'commodityQty', type: 'input' },
        { label: this.$t('asn.dt.recQty'), value: 'recQty', type: 'input' },
        { label: this.$t('asn.dt.vol'), value: 'volM', type: 'input' },
        { label: this.$t('asn.dt.grossWeight'), value: 'grossWeightKg', type: 'input' },
        { label: this.$t('asn.dt.netWeight'), value: 'netWeightKg', type: 'input' },
        { label: this.$t('asn.dt.amount'), value: 'amountY', type: 'input' }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('asn.operationDate'), value: 'updateTime', type: 'input', readonly: true },
        { label: this.$t('asn.ownerId'), value: 'ownerName', type: 'input', disabled: true },
        { label: this.$t('asn.asnType'), value: 'scAsnType', type: 'select', list: 'scAsnTypeList', disabled: true },
        { label: this.$t('asn.cusOrderNo'), value: 'origNo', type: 'input', disabled: true },
        { label: this.$t('asn.deliveryOrderNo'), value: 'returnCourierNum', type: 'input', disabled: true },
        { label: this.$t('asn.supplierId'), value: 'supplierName', type: 'input', disabled: true },
        { label: this.$t('asn.deliveryWH'), value: 'shipper', type: 'input', disabled: true },
        { label: this.$t('asn.customer'), value: 'buyer', type: 'input', disabled: true },
        { label: this.$t('asn.primaryCusOrderNo'), value: 'cusOrderNo', type: 'input', disabled: true },
        // { label: this.$t('asn.deliverType'), value: 'deliverType', type: 'input', disabled: true },
        { label: this.$t('asn.isSelf'), value: 'isSelfName', type: 'input', disabled: true },
        { label: this.$t('asn.ReceivingWH'), value: 'consignee', type: 'input', readonly: true },
        { label: this.$t('asn.PSDepartment'), value: 'buyDepartment', type: 'input', readonly: true },
        { label: this.$t('asn.asnSource'), value: 'asnSource', type: 'select', list: 'asnSourceList', disabled: true },
        { label: this.$t('asn.carrier'), value: 'carrierName', type: 'input', readonly: true },
        { label: this.$t('asn.plannedDeliveryDate'), value: 'shippingDate', type: 'input', readonly: true },
        { label: this.$t('asn.planDeliveryDate'), value: 'receivingDate', type: 'input', readonly: true },
        { label: this.$t('asn.remark'), value: 'remark', type: 'input', readonly: true }
      ]

      // 初始化明细表格
      this.tableInfo1.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'asnDtStatusName', label: this.$t('asn.dt.asnDtStatus'), minWidth: 100 },
        /* {prop:"sysSkuCode", label:this.$t('asn.dt.sysSkuCode'), minWidth:100},*/
        { prop: 'skuCode', label: this.$t('asn.dt.skuCode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('asn.dt.skuName'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('asn.dt.barcode'), minWidth: 100 },
        // { prop: 'tradeName', label: this.$t('asn.dt.tradeName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('asn.dt.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('asn.dt.mainUnit'), minWidth: 100 },
        { prop: 'commodityQty', label: this.$t('asn.dt.commodityQty'), minWidth: 100 },
        { prop: 'recQty', label: this.$t('asn.dt.recQty'), minWidth: 100 },
        { prop: 'rejectQty', label: this.$t('asn.dt.rejectQty'), minWidth: 100 },
        { prop: 'volM', label: this.$t('asn.dt.vol'), minWidth: 100 },
        { prop: 'WeightKg', label: this.$t('asn.dt.WeightKg'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('asn.dt.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('asn.dt.productionDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('asn.dt.invalidDate'), minWidth: 100 },
        { prop: 'remark', label: this.$t('asn.dt.remark'), minWidth: 100 }
        // { prop: 'originCountry', label: this.$t('asn.dt.originCountry'), minWidth: 100 },
        // { prop: 'brandName', label: this.$t('asn.dt.brandName'), minWidth: 100 },
        // { prop: 'approvalNumber', label: this.$t('asn.dt.approveNo'), minWidth: 100 },
        // { prop: 'drugForm', label: this.$t('asn.dt.drugForm'), minWidth: 100 },
        // { prop: 'drugFormSpec', label: this.$t('asn.dt.drugFormSpec'), minWidth: 100 },
        // { prop: 'grossWeightKg', label: this.$t('asn.dt.grossWeight'), minWidth: 100 },
        // { prop: 'netWeightKg', label: this.$t('asn.dt.netWeight'), minWidth: 100 },
        // { prop: 'amountY', label: this.$t('asn.dt.amount'), minWidth: 100 },
        // { prop: 'sumAmountY', label: this.$t('asn.dt.sumAmountY'), minWidth: 100 }
      ]

      this.tableInfo2.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'orderNo', label: this.$t('asn.operationOrderNo'), minWidth: 100 },
        { prop: 'recordTypeName', label: this.$t('asn.operationType'), minWidth: 100 },
        { prop: 'remark', label: this.$t('asn.operationDesc'), minWidth: 100 },
        { prop: 'updater', label: this.$t('asn.operator'), minWidth: 100 },
        { prop: 'updaterName', label: this.$t('asn.operatorName'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('asn.operationTime'), minWidth: 100 }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.diaFormInfo.data = {
        asnSource: this.listTypeInfo.asnSourceList.length == 0 ? null : this.listTypeInfo.asnSourceList[0].value,
        asnType: this.listTypeInfo.asnTypeList.length == 0 ? null : this.listTypeInfo.asnTypeList[0].value,
        asnStatus: this.listTypeInfo.asnStatusList.length == 0 ? null : this.listTypeInfo.asnStatusList[0].value,
        asnDtStatus: this.listTypeInfo.asnDtStatusList.length == 0 ? null : this.listTypeInfo.asnDtStatusList[0].value
      }
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('asn.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('asn.supplierId'), value: 'supplierId', type: 'slot' },
        { label: this.$t('asn.origNo'), value: 'origNo', type: 'input' },
        { label: this.$t('asn.asnSource'), value: 'asnSource', type: 'select', list: 'asnSourceList' },
        { label: this.$t('asn.asnType'), value: 'scAsnType', type: 'select', list: 'scAsnTypeList' },
        { label: this.$t('asn.scBusinessType'), value: 'scBusinessType', type: 'select', list: 'scBusinessTypeList' },
        { label: this.$t('asn.orderPrice'), value: 'orderPriceY', type: 'input' },
        { label: this.$t('asn.remark'), value: 'remark', type: 'input' }
      ]
    },

    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('asn.asnNo'), value: 'asnNo', type: 'input' },
        { label: this.$t('asn.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('asn.supplierId'), value: 'supplierId', type: 'slot' },
        { label: this.$t('asn.origNo'), value: 'origNo', type: 'input' },
        { label: this.$t('asn.asnSource'), value: 'asnSource', type: 'select', list: 'asnSourceList' },
        { label: this.$t('asn.asnType'), value: 'scAsnType', type: 'select', list: 'scAsnTypeList' },
        { label: this.$t('asn.scBusinessType'), value: 'scBusinessType', type: 'select', list: 'scBusinessTypeList' },
        { label: this.$t('asn.asnStatus'), value: 'asnStatus', type: 'select', list: 'asnStatusList' },
        { label: this.$t('asn.orderPrice'), value: 'orderPriceY', type: 'input' },
        { label: this.$t('asn.remark'), value: 'remark', type: 'input' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        ownerId: [{ required: true, message: this.$t('asn.msg.ownerId'), trigger: 'blur' }],
        scAsnType: [{ required: true, message: this.$t('asn.msg.asnType'), trigger: 'blur' }],
        scBusinessType: [{ required: true, message: this.$t('asn.msg.scBusinessType'), trigger: 'blur' }],
        asnSource: [{ required: true, message: this.$t('asn.msg.asnSource'), trigger: 'blur' }],
        orderPriceY: [{ required: false, validator: this.$valid.getTempValidatorAllowNull(), trigger: 'blur' }]
      }

      this.diaFormInfoDt.rules = {
        skuCode: [{ required: true, message: this.$t('asn.dt.msg.skuCode'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        asnStatus: null,
        ownerId: null,
        ownerName: null,
        supplierName: null,
        scAsnType: null,
        scBusinessType: null,
        remark: null,
        asnNo: null,
        origNo: null,
        asnSource: null
      }
      this.diaFormInfo.dtTableInfo.data = []
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
