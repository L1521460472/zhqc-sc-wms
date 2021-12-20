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
          origNo: null,
          returnCourierNum: null,
          orderType: null,
          orderOrig: null,
          orderStatus: null,
          ownerId: null,
          supplierId: null,
          shipperId: null,
          consigneeId: null,
          creator: null,
          createTimeFrom: null,
          createTimeTo: null,
          operationDateBegin: null,
          operationDateEnd: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        orderStatusList: [],
        orderOrigList: [],
        scOrderTypeList: [],
        addscOrderTypeList: [],
        isSelfList: [],
        scBusinessTypeList: [],
        orderDtUnitTypeList: []
      },
      // 主页面表格
      tableInfo: {
        ref: null,
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '240', // 默认操作按钮列宽度
          btList: [// 添加操作按钮
            { slot: true, icon: '', event: 'slotEvent' }
          ]
        }
      },
      // 弹窗表单
      diaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {
          operationDate: null,
          consigneeId: null
        }, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        dtTableInfoView: {
          fieldList: [],
          data: []
        },
        dtTableInfo: {
          ref: null,
          data: [],
          deleteIds: [],
          fieldList: [],
          topBtn: {},
          handle: { // 表格自定义按钮
            fixed: 'right',
            label: this.$t('table.actions'), // 操作列名
            width: '100', // 默认操作按钮列宽度
            btList: [// 添加操作按钮
              // 默认删除按钮
              { label: this.$t('table.delete'), type: 'danger', icon: '', event: 'deleteDt', show: true, disabled: false }// event值为notification.js中定义的方法名
            ]
          }
        }
      },
      // 明细表单
      diaFormInfoDt: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}// 配置的表单字段校验规则集合
      }
    }
  },

  mounted() {
    this.collapsableForm()// 初始化表单

    // this.collapsableFormMore()
    this.initTopFormColumns()// 初始化查询界面配置数据
    this.rulesInit()// 初始化diaFormInfo表单字段校验规则
    this.resetNewFormData()
  },
  methods: {
    // 展开收起表单
    collapsableFormMore() {
      this.topForm.fieldList = [
        { label: this.$t('inOrder.inOrderNo'), value: 'inOrderNo', type: 'input' },
        { label: this.$t('inOrder.origNo'), value: 'origNo', type: 'input' },
        { label: this.$t('inOrder.returnCourierNum'), value: 'returnCourierNum', type: 'input' },
        { label: this.$t('inOrder.scOrderType'), value: 'scOrderType', type: 'select', list: 'scOrderTypeList' },
        // { label: this.$t('inOrder.businessType'), value: 'scBusinessType', type: 'select', list: 'scBusinessTypeList', filterable: true }, // 业务类型
        { label: this.$t('inOrder.orderOrig'), value: 'orderOrig', type: 'select', list: 'orderOrigList' },
        { label: this.$t('inOrder.orderStatus'), value: 'orderStatus', type: 'select', list: 'orderStatusList' },
        { label: this.$t('inOrder.ownerName'), value: 'ownerId', type: 'slot' },
        { label: this.$t('inOrder.supplierId'), value: 'supplierId', type: 'slot' },
        { label: this.$t('inOrder.shipperId'), value: 'shipperId', type: 'slot' },
        { label: this.$t('inOrder.consigneeId'), value: 'consigneeId', type: 'slot' },
        // { label: this.$t('inOrder.theGoodsWarehouse'), value: 'consigneeId', type: 'slot' }, // 收货仓库
        { label: this.$t('inOrder.creator'), value: 'creator', type: 'input' },
        { label: this.$t('inOrder.createTimeFrom'), value: 'createTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('inOrder.createTimeTo'), value: 'createTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('inOrder.operationDateBegin'), value: 'operationDateBegin', type: 'date' },
        { label: this.$t('inOrder.operationDateEnd'), value: 'operationDateEnd', type: 'date' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    // 展开收起表单
    collapsableForm() {
      this.topForm.fieldList = [
        { label: this.$t('inOrder.inOrderNo'), value: 'inOrderNo', type: 'input' },
        { label: this.$t('inOrder.origNo'), value: 'origNo', type: 'input' },
        { label: this.$t('inOrder.returnCourierNum'), value: 'returnCourierNum', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
      this.topForm.data.ownerId = null
      this.topForm.data.consigneeId = null
    },
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化明细表格
      this.diaFormInfo.dtTableInfo.fieldList = [
        { label: this.$t('table.id'), type: '', widthindex: 50 }, // 序列
        { prop: 'rowNo', label: this.$t('inOrder.dt.rowNo'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('inOrder.dt.skuCode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('inOrder.dt.skuName'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('inOrder.dt.barcode'), minWidth: 100 },
        { prop: 'spec', label: this.$t('inOrder.dt.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('inOrder.dt.mainUnit'), minWidth: 100 },
        { prop: 'extOne', label: this.$t('inOrder.dt.extOne'), minWidth: 100 },
        { prop: 'inOrderQty', label: this.$t('inOrder.dt.inOrderQty'), minWidth: 100 },
        { prop: 'volDec', label: this.$t('inOrder.dt.vol'), minWidth: 100 },
        { prop: 'grossWeightKg', label: this.$t('inOrder.dt.grossWeight'), minWidth: 100 },
        { prop: 'amountDec', label: this.$t('inOrder.dt.sumAmount'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('inOrder.dt.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('inOrder.dt.productionDate'), minWidth: 120 },
        { prop: 'remark', label: this.$t('inOrder.dt.remark'), minWidth: 120 }
      ]
      this.diaFormInfo.dtTableInfoView.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'rowNo', label: this.$t('inOrder.dt.rowNo'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('inOrder.dt.skuCode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('inOrder.dt.skuName'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('inOrder.dt.barcode'), minWidth: 100 },
        { prop: 'spec', label: this.$t('inOrder.dt.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('inOrder.dt.mainUnit'), minWidth: 100 },
        { prop: 'extOne', label: this.$t('inOrder.dt.extOne'), minWidth: 100 },
        { prop: 'inOrderQty', label: this.$t('inOrder.dt.inOrderQty'), minWidth: 100 },
        { prop: 'recQty', label: '收货数量', minWidth: 100 },
        { prop: 'volDec', label: this.$t('inOrder.dt.vol'), minWidth: 100 },
        { prop: 'grossWeightKg', label: this.$t('inOrder.dt.grossWeight'), minWidth: 100 },
        { prop: 'amountDec', label: this.$t('inOrder.dt.sumAmount'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('inOrder.dt.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('inOrder.dt.productionDate'), minWidth: 120 },
        { prop: 'remark', label: this.$t('inOrder.dt.remark'), minWidth: 120 }
      ]
      // 初始化新增明细表单
      this.diaFormInfoDt.fieldList = [
        { label: this.$t('inOrder.dt.skuCode'), value: 'skuCode', type: 'slot' },
        { label: this.$t('inOrder.dt.skuName'), value: 'skuName', type: 'input', disabled: true },
        { label: this.$t('inOrder.dt.barcode'), value: 'barcode', type: 'input', disabled: true },
        { label: this.$t('inOrder.dt.spec'), value: 'spec', type: 'input', disabled: true },
        { label: this.$t('inOrder.dt.mainUnit'), value: 'mainUnitName', type: 'select', list: 'orderDtUnitTypeList' },
        { label: this.$t('inOrder.dt.extOne'), value: 'extOne', type: 'number', min: 1, precision: 0 },
        { label: this.$t('inOrder.dt.inOrderQty'), value: 'inOrderQty', type: 'input', disabled: true },
        { label: this.$t('inOrder.dt.vol'), value: 'volDec', type: 'input' },
        { label: this.$t('inOrder.dt.grossWeight'), value: 'grossWeightKg', type: 'input' },
        { label: this.$t('inOrder.dt.sumAmount'), value: 'amountDec', type: 'input' },
        { label: this.$t('inOrder.dt.productionBatch'), value: 'productionBatch', type: 'input' },
        { label: this.$t('inOrder.dt.productionDate'), value: 'productionDate', type: 'date', dateType: 'date' },
        { label: this.$t('inOrder.dt.remark'), value: 'remark', type: 'input' }
      ]
    },
    initTableInfo() {
      const list = [
        { label: this.$t('table.selection'), type: 'selection', prop: 'selection', width: 50, fixed: 'left' }, // 选项框
        { label: this.$t('table.id'), type: 'index', prop: 'id', width: 50 }, // 序列
        // { prop: 'operationDate', label: this.$t('inOrder.operationDate'), minWidth: 130 },
        { prop: 'inOrderNo', label: this.$t('inOrder.inOrderNo'), minWidth: 130 },
        { prop: 'origNo', label: this.$t('inOrder.origNo'), minWidth: 100 },
        { prop: 'returnCourierNum', label: this.$t('inOrder.returnCourierNum'), minWidth: 100 },
        { prop: 'scOrderTypeName', label: this.$t('inOrder.scOrderTypeName'), minWidth: 100 },
        // { prop: 'scBusinessTypeName', label: this.$t('inOrder.businessType'), minWidth: 100 },
        { prop: 'orderStatusName', label: this.$t('inOrder.orderStatusName'), minWidth: 100 },
        { prop: 'orderOrigName', label: this.$t('inOrder.orderOrigName'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('inOrder.ownerName'), minWidth: 100 },
        { prop: 'supplierName', label: this.$t('inOrder.supplierName'), minWidth: 100 },
        { prop: 'customerName', label: this.$t('inOrder.customerName'), minWidth: 100 },
        { prop: 'shipper', label: this.$t('inOrder.shipper'), minWidth: 100 },
        { prop: 'consignee', label: this.$t('inOrder.consignee'), minWidth: 100 },
        { prop: 'remark', label: this.$t('inOrder.remark'), minWidth: 100 },
        { prop: 'isVirtureAllotStr', label: this.$t('inOrder.isVirtureAllotStr'), minWidth: 100 },
        { prop: 'errorInfo', label: this.$t('inOrder.errorInfo'), minWidth: 100 },
        { prop: 'outStatusStr', label: this.$t('inOrder.outStatusStr'), minWidth: 100 },
        { prop: 'creator', label: this.$t('inOrder.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('inOrder.createTime'), minWidth: 140 },
        { prop: 'updater', label: this.$t('inOrder.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('inOrder.updateTime'), minWidth: 140 },
        { label: '操作', value: 'status', width: 200, type: 'slot', fixed: 'right', align: 'left' }
      ]
      return this.iniTableConfig(list)
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'

      this.diaFormInfo.fieldList = [
        { label: this.$t('inOrder.operationDate'), value: 'operationDate', type: 'date', dateType: 'date', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd', disabled: true },
        { label: this.$t('inOrder.ownerName'), value: 'ownerName', type: 'input', disabled: true },
        { label: this.$t('inOrder.scOrderTypeName'), value: 'scOrderTypeName', type: 'input', disabled: true },
        { label: this.$t('inOrder.origNo'), value: 'origNo', type: 'input', disabled: true },
        { label: this.$t('inOrder.returnCourierNum'), value: 'returnCourierNum', type: 'input', disabled: true },
        { label: this.$t('inOrder.supplierName'), value: 'supplierName', type: 'input', disabled: true },
        { label: this.$t('inOrder.shipper'), value: 'shipper', type: 'input', disabled: true },
        { label: this.$t('inOrder.customerName'), value: 'customerName', type: 'input', disabled: true },
        { label: this.$t('inOrder.origOrderCode'), value: 'origOrderCode', type: 'input', disabled: true },
        { label: this.$t('inOrder.isSelf'), value: 'isSelf', type: 'select', list: 'isSelfList', disabled: true }, // 交货方式
        { label: this.$t('inOrder.consignee'), value: 'consignee', type: 'input', disabled: true },
        { label: this.$t('inOrder.carrierName'), value: 'carrierName', type: 'input', disabled: true },
        { label: this.$t('inOrder.buyer'), value: 'buyer', type: 'input', disabled: true },
        { label: this.$t('inOrder.buyDepartment'), value: 'buyDepartment', type: 'input', disabled: true },
        { label: this.$t('inOrder.dt.plannedDeliveryDate'), value: 'shippingDate', type: 'date', disabled: true },
        { label: this.$t('inOrder.dt.planDeliveryDate'), value: 'receivingDate', type: 'date', disabled: true },
        { label: this.$t('inOrder.remark'), value: 'remark', type: 'input', disabled: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('inOrder.operationDate'), value: 'operationDate', type: 'date', dateType: 'date', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd' },
        { label: this.$t('inOrder.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('inOrder.scOrderType'), value: 'scOrderType', type: 'select', list: 'scOrderTypeList' },
        { label: this.$t('inOrder.origNo'), value: 'origNo', type: 'input' },
        { label: this.$t('inOrder.returnCourierNum'), value: 'returnCourierNum', type: 'input' },
        { label: this.$t('inOrder.supplierId'), value: 'supplierId', link: 'supplierName', type: 'slot' },
        { label: this.$t('inOrder.shipperId'), value: 'shipperId', link: 'shipper', type: 'slot' },
        { label: this.$t('inOrder.customerId'), value: 'customerId', type: 'slot' },
        { label: this.$t('inOrder.origOrderCode'), value: 'origOrderCode', type: 'input' },
        { label: this.$t('inOrder.isSelf'), value: 'isSelf', type: 'select', list: 'isSelfList' }, // 交货方式
        { label: this.$t('inOrder.consigneeId'), value: 'consigneeId', link: 'consignee', type: 'slot' },
        { label: this.$t('inOrder.carrierName'), value: 'carrierName', type: 'slot' },
        { label: this.$t('inOrder.buyer'), value: 'buyer', type: 'input' },
        { label: this.$t('inOrder.buyDepartment'), value: 'buyDepartment', type: 'input' },
        { label: this.$t('inOrder.dt.plannedDeliveryDate'), value: 'shippingDate', type: 'date' },
        { label: this.$t('inOrder.dt.planDeliveryDate'), value: 'receivingDate', type: 'date' },
        { label: this.$t('inOrder.remark'), value: 'remark', type: 'input' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''

      this.diaFormInfo.fieldList = [
        { label: this.$t('inOrder.operationDate'), value: 'operationDate', type: 'date', dateType: 'date', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd' },
        { label: this.$t('inOrder.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('inOrder.scOrderType'), value: 'scOrderType', type: 'select', list: 'scOrderTypeList' },
        { label: this.$t('inOrder.origNo'), value: 'origNo', type: 'input' },
        { label: this.$t('inOrder.returnCourierNum'), value: 'returnCourierNum', type: 'input' },
        { label: this.$t('inOrder.supplierId'), value: 'supplierId', type: 'slot' },
        { label: this.$t('inOrder.shipperId'), value: 'shipperId', link: 'shipper', type: 'slot' },
        { label: this.$t('inOrder.customerId'), value: 'customerId', type: 'slot' },
        { label: this.$t('inOrder.origOrderCode'), value: 'origOrderCode', type: 'input' },
        { label: this.$t('inOrder.isSelf'), value: 'isSelf', type: 'select', list: 'isSelfList' }, // 交货方式
        { label: this.$t('inOrder.consigneeId'), value: 'consigneeId', link: 'consignee', type: 'slot' },
        { label: this.$t('inOrder.carrierName'), value: 'carrierName', type: 'slot' },
        { label: this.$t('inOrder.buyer'), value: 'buyer', type: 'input' },
        { label: this.$t('inOrder.buyDepartment'), value: 'buyDepartment', type: 'input' },
        { label: this.$t('inOrder.dt.plannedDeliveryDate'), value: 'shippingDate', type: 'date' },
        { label: this.$t('inOrder.dt.planDeliveryDate'), value: 'receivingDate', type: 'date' },
        { label: this.$t('inOrder.remark'), value: 'remark', type: 'input' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        shipperAddr: [{ required: true, message: this.$t('inOrder.msg.shipAddress'), trigger: 'blur' }],
        shipperTel: [{ required: true, message: this.$t('inOrder.msg.deliveryContactInformation'), trigger: 'blur' }],
        shipperContact: [{ required: true, message: this.$t('inOrder.msg.shippingContact'), trigger: 'blur' }],
        shipperAreaId: [{ required: true, message: this.$t('inOrder.msg.deliveryArea'), trigger: 'blur' }],
        shipperCityId: [{ required: true, message: this.$t('inOrder.msg.deliveryCity'), trigger: 'blur' }],
        shipperProvId: [{ required: true, message: this.$t('inOrder.msg.deliveryProvinces'), trigger: 'blur' }],
        deliveryType: [{ required: false, message: this.$t('inOrder.msg.deliveryType'), trigger: 'blur' }],
        oldNum: [{ required: false, message: this.$t('inOrder.msg.returnCourier'), trigger: 'blur' }],
        // shipper: [{ required: false, message: this.$t('inOrder.msg.consigner'), trigger: 'blur' }],
        consigneeContact: [{ required: true, message: this.$t('inOrder.msg.receivingContact'), trigger: 'blur' }],
        consigneeId: [{ required: true, message: this.$t('inOrder.msg.consigneeId'), trigger: 'blur' }],
        returnCourierNum: [{ required: false, message: this.$t('inOrder.msg.returnExpressNumber'), trigger: 'blur' }],
        returnCourier: [{ required: false, message: this.$t('inOrder.msg.returnCourier'), trigger: 'blur' }],
        origOrderCode: [{ required: false, message: this.$t('inOrder.msg.originalCustomerOrderNumber'), trigger: 'blur' }],
        consigneeTel: [{ required: true, message: this.$t('inOrder.msg.contactOfReceivingGoods'), trigger: 'blur' }],
        isSelf: [{ required: true, message: this.$t('inOrder.msg.deliveryType'), trigger: 'blur' }],
        // scBusinessType: [{required: true, message: this.$t('inOrder.msg.businessType'), trigger: 'blur'}],
        operationDate: [{ required: true, message: this.$t('inOrder.msg.operationDate'), trigger: 'blur' }],
        orderOrig: [{ required: true, message: this.$t('inOrder.msg.orderOrig'), trigger: 'blur' }],
        // origNo: [{ required: true, message: this.$t('inOrder.msg.origNo'), trigger: 'blur' }],
        scOrderType: [{ required: true, message: this.$t('inOrder.msg.scOrderType'), trigger: 'blur' }],
        ownerId: [{ required: true, message: this.$t('inOrder.msg.ownerId'), trigger: 'blur' }],
        // supplierId: [{ required: true, message: this.$t('inOrder.msg.supplierId'), trigger: 'blur' }],
        customerId: [{ required: false, message: this.$t('inOrder.msg.customerId'), trigger: 'blur' }],
        storeId: [{ required: false, message: this.$t('inOrder.msg.storeId'), trigger: 'blur' }],
        provinceId: [{ required: false, message: this.$t('inOrder.msg.provinceId'), trigger: 'blur' }],
        cityId: [{ required: false, message: this.$t('inOrder.msg.cityId'), trigger: 'blur' }]
        // buyer: [{ required: true, message: this.$t('inOrder.msg.buyer'), trigger: 'blur' }]
      }
      this.diaFormInfoDt.rules = {
        skuCode: [{ required: true, message: this.$t('inOrder.msg.skuCode'), trigger: 'change' }],
        mainUnitName: [{ required: true, message: this.$t('inOrder.msg.mainUnit'), trigger: 'change' }],
        extOne: [{ required: true, message: this.$t('inOrder.msg.extOne'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetNewFormData() {
      this.diaFormInfo.data = {
        operationDate: null,
        ownerId: null,
        scOrderType: null,
        origNo: null,
        returnCourierNum: null,
        supplierId: null,
        supplierName: null,
        customerId: null,
        origOrderCode: null,
        isSelf: null,
        consigneeId: null,
        carrierName: null,
        consignee: null,
        isSelfList: null,
        buyer: null,
        buyDepartment: null,
        shippingDate: null,
        receivingDate: null,
        remark: null,
        isCrossDocking: 0
      }
      // for (const key in this.diaFormInfo.data) {
      //   this.diaFormInfo.data[key] = null
      // }
      // this.diaFormInfo.dtTableInfo.data = []
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
