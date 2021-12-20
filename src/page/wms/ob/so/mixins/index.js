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
          cusOrderNo: null,
          cardNo: null,
          scSoType: null,
          scSoSource: null,
          soStatusList: [],
          ownerId: null,
          whAreaId: null,
          consignee: null,
          customerId: null,
          orderCreateTimeFrom: null,
          orderCreateTimeTo: null,
          realOutTimeBegin: null,
          realOutTimeEnd: null,
          isFrozen: null,
          receiver: null

        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        scSoType: [],
        scBusinessType: [],
        soStatusList: [],
        whetherList: [],
        countryList: [],
        takeDeliveryMethodList: [],
        orderOrigList: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          align: 'center',
          label: this.$t('table.actions'), // 操作列名
          width: '160', // 默认操作按钮列宽度
          btList: [// 添加操作按钮
            // 默认查看按钮
            { label: this.$t('table.view'), type: 'primary', icon: '', event: 'openViewPage', show: true, disabled: this.$hasPerm('view') }, // event值为notification.js中定义的方法名
            // 自定义按钮
            { slot: true, icon: '', event: 'slotEvent' }// event值为notification.js中定义的方法名
          ]
        }
      },
      // 弹窗表单
      diaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        dtTableInfo: {
          addDtBtnShow: false, // 是否显示按钮
          ref: null,
          data: [],
          fieldList: [],
          topBtn: {},
          handle: { // 表格自定义按钮
            fixed: 'right',
            label: this.$t('table.actions'), // 操作列名
            width: '210', // 默认操作按钮列宽度
            btList: [// 添加操作按钮
              // 默认删除按钮
              { label: this.$t('table.delete'), type: 'danger', icon: '', event: 'deleteDt', show: true, disabled: false }// event值为notification.js中定义的方法名
            ]
          }
        }
      },
      diaFormInfoFrozen: {
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
        { label: this.$t('so.soNo'), value: 'soNo', type: 'input' },
        { label: this.$t('so.cusOrderNo'), value: 'cusOrderNo', type: 'input' },
        { label: this.$t('so.cardNo'), value: 'cardNo', type: 'input' },
        { label: this.$t('so.scSoType'), value: 'scSoType', type: 'select', list: 'scSoTypeList' },
        { label: this.$t('so.scSoSource'), value: 'orderOrig', type: 'select', list: 'orderOrigList' },
        { label: this.$t('so.soStatus'), value: 'soStatusList', type: 'select', list: 'soStatusList', multiple: true, className: 'customizeSelect' },
        { label: this.$t('so.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('so.deliveryWH'), value: 'whAreaId', type: 'slot' },
        { label: this.$t('so.consignee'), value: 'consignee', type: 'slot' },
        { label: this.$t('so.customerId'), value: 'customerId', type: 'slot' },
        { label: this.$t('so.orderCreateTimeFrom'), value: 'orderCreateTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('so.orderCreateTimeTo'), value: 'orderCreateTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('so.deliveryDateFrom'), value: 'realOutTimeBegin', type: 'date', dateType: 'date' },
        { label: this.$t('so.deliveryDateTo'), value: 'realOutTimeEnd', type: 'date', dateType: 'date' },
        { label: this.$t('so.isFrozen'), value: 'isFrozen', type: 'select', list: 'whetherList' },
        { label: this.$t('so.receiver'), value: 'receiver', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单

      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('so.soNo'), value: 'soNo', type: 'input' },
        { label: this.$t('so.cusOrderNo'), value: 'cusOrderNo', type: 'input' },
        { label: this.$t('so.cardNo'), value: 'cardNo', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
      this.topForm.data.ownerId = null
      this.topForm.data.customerId = null
      this.topForm.data.partnerId = null
      this.topForm.data.partnerStoreId = null
    },
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: '', type: 'selection', width: 50, fixed: 'left' }, // 选项框
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'soNo', label: this.$t('so.soNo'), minWidth: 150 },
        { prop: 'scSoTypeName', label: this.$t('so.scSoType'), minWidth: 100 },
        { prop: 'soStatusName', label: this.$t('so.soStatus'), minWidth: 100 },
        { prop: 'orderOrigName', label: this.$t('so.scSoSource'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('so.ownerId'), minWidth: 100 },
        { prop: 'whAreaName', label: this.$t('so.deliveryWH'), minWidth: 100 }, //
        { prop: 'consigneeName', label: this.$t('so.ReceivingWH'), minWidth: 100 }, //
        { prop: 'customerName', label: this.$t('so.customerId'), minWidth: 100 },
        { prop: 'receiver', label: this.$t('so.receiver'), minWidth: 100 },
        { prop: 'receiverTel', label: this.$t('so.receiverTel'), minWidth: 100 },
        { prop: 'outOrderNo', label: this.$t('so.outOrderNo'), minWidth: 150 },
        { prop: 'cusOrderNo', label: this.$t('so.cusOrderNo'), minWidth: 120 },
        { prop: 'cardNo', label: this.$t('so.deliveryOrderNo'), minWidth: 120 },
        { prop: 'waveOrderNo', label: this.$t('so.waveOrderNo'), minWidth: 120 },
        { prop: 'pickOrderNo', label: this.$t('so.pickOrderNo'), minWidth: 120 },
        { prop: 'isFrozenName', label: this.$t('so.isFrozen'), minWidth: 100 },
        { prop: 'frozenRemark', label: this.$t('so.frozenRemark'), minWidth: 100 },
        { prop: 'unfrozenRemark', label: this.$t('so.unfrozenRemark'), minWidth: 100 },
        { prop: 'remark', label: this.$t('so.remark'), minWidth: 100 },
        { prop: 'isVirtureAllotStr', label: this.$t('so.virtualAllocation'), minWidth: 100 },
        { prop: 'creator', label: this.$t('so.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('so.createTime'), minWidth: 100 },
        { prop: 'updater', label: this.$t('so.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('so.updateTime'), minWidth: 100 }
      ]
    },
    // 初始化冻结表单
    diaFormInfoFrozenFieldList() {
      this.diaFormInfoFrozen.fieldList = [
        { label: this.$t('so.frozenRemark'), value: 'frozenRemark', type: 'textarea' }
      ]
    },
    // 初始化释放表单
    diaFormInfoUnfrozenFieldList() {
      this.diaFormInfoFrozen.fieldList = [
        { label: this.$t('so.unfrozenRemark'), value: 'unfrozenRemark', type: 'textarea' }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('so.soNo'), value: 'soNo', type: 'input', disabled: true },
        { label: this.$t('so.ownerId'), value: 'ownerId', type: 'slot', disabled: true },
        { label: this.$t('so.scSoType'), value: 'soTypeName', type: 'input', disabled: true },
        { label: this.$t('so.cusOrderNo'), value: 'cusOrderNo', type: 'input', disabled: true },
        { label: this.$t('so.deliveryOrderNo'), value: 'cardNo', type: 'input', disabled: true },
        { label: this.$t('so.primaryCusOrderNo'), value: 'sourceOrderNo', type: 'input', disabled: true }, //
        { label: this.$t('so.deliveryType'), value: 'takeDeliveryMethodName', type: 'input', disabled: true }, //
        { label: this.$t('so.deliveryWH'), value: 'whAreaName', type: 'input', disabled: true }, //
        { label: this.$t('so.ReceivingWH'), value: 'consigneeName', type: 'input', disabled: true }, //
        { label: this.$t('so.customerId'), value: 'customerName', type: 'input', disabled: true }, //
        { label: this.$t('so.receiver'), value: 'receiver', type: 'input', disabled: true },
        { label: this.$t('so.receiverTel'), value: 'receiverTel', type: 'input', disabled: true },
        { label: this.$t('so.provinceId'), value: 'provinceId', type: 'slot', disabled: true },
        { label: this.$t('so.cityId'), value: 'cityId', type: 'slot', disabled: true },
        { label: this.$t('so.areaId'), value: 'areaId', type: 'slot', disabled: true },
        { label: this.$t('so.addr'), value: 'addr', type: 'input', disabled: true },
        { label: this.$t('so.carrier'), value: 'partnerName', type: 'input', disabled: true },
        { label: this.$t('so.plannedDeliveryDate'), value: 'plannedDeliveryDate', type: 'input', disabled: true },
        { label: this.$t('so.planDeliveryDate'), value: 'planDeliveryDate', type: 'input', disabled: true },
        { label: this.$t('so.unloadType'), value: 'dischargeTypeName', type: 'input', disabled: true },
        { label: this.$t('so.Preparer'), value: 'preparer', type: 'input', disabled: true },
        { label: this.$t('so.salesDepartment'), value: 'salesDepartment', type: 'input', disabled: true },
        { label: this.$t('so.orderRemark'), value: 'orderRemark', type: 'input', disabled: true },
        { label: this.$t('so.soStatus'), value: 'soStatus', type: 'select', list: 'soStatusList', disabled: true }
      ]
      this.tableInfo1.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'rowNo', label: this.$t('so.dt.rowNo'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('so.dt.skuCode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('so.dt.skuName'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('so.dt.barcode'), minWidth: 100 },
        // { prop: 'tradeName', label: this.$t('sku.tradeName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('so.dt.spec'), minWidth: 100 },
        // { prop: 'mainUnit', label: this.$t('sku.mainUnit'), minWidth: 100 },
        { prop: 'unit', label: this.$t('so.unit'), minWidth: 100 },
        { prop: 'mainUnitNum', label: this.$t('so.mainUnitNum'), minWidth: 100 },
        { prop: 'soQty', label: this.$t('so.dt.soQty'), minWidth: 100 },
        { prop: 'perAllotQty', label: this.$t('so.dt.perAllotQty'), minWidth: 100 },
        { prop: 'allotQty', label: this.$t('so.dt.allotQty'), minWidth: 100 },
        { prop: 'pickQty', label: this.$t('so.dt.pickQty'), minWidth: 100 },
        { prop: 'sowQty', label: this.$t('so.dt.sowQty'), minWidth: 100 },
        { prop: 'reviewQty', label: this.$t('so.dt.reviewQty'), minWidth: 100 },
        { prop: 'sendQty', label: this.$t('so.dt.sendQty'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('so.dt.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('so.dt.productionDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('so.dt.invalidDate'), minWidth: 100 },
        { prop: 'remark', label: this.$t('so.remark'), minWidth: 100 }

        // { prop: 'drugForm', label: this.$t('sku.drugForm'), minWidth: 100 },
        // { prop: 'mfgName', label: this.$t('sku.mfgName'), minWidth: 100 },
        // { prop: 'originCountry', label: this.$t('sku.originCountry'), minWidth: 100 },
        // { prop: 'approvalNumber', label: this.$t('sku.approvalNumber'), minWidth: 100 },
        // { prop: 'brandName', label: this.$t('sku.brandName'), minWidth: 100 },
        // { prop: 'tempControlName', label: this.$t('sku.tempControlName'), minWidth: 100 },
        // { prop: 'validityDay', label: this.$t('sku.validityDay'), minWidth: 100 },
        // { prop: 'batchNo', label: this.$t('so.dt.batchNo'), minWidth: 100 },
        // { prop: 'supplierName', label: this.$t('so.dt.supplierName'), minWidth: 100 }
      ]
      this.tableInfo2.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'recordTypeName', label: this.$t('so.operationType'), minWidth: 100 },
        { prop: 'remark', label: this.$t('so.remark'), minWidth: 100 },
        { prop: 'creatorName', label: this.$t('so.operator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('so.operationTime'), minWidth: 100 }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        ownerId: [{ required: true, message: this.$t('so.msg.ownerId'), trigger: 'blur' }],
        partnerStoreId: [{ required: true, message: this.$t('so.msg.partnerStoreId'), trigger: 'blur' }],
        soNo: [{ required: true, message: this.$t('so.msg.soNo'), trigger: 'blur' }],
        areaId: [{ required: true, message: this.$t('so.msg.areaId'), trigger: 'blur' }],
        receiverTel: [{ required: true, message: this.$t('so.msg.receiverTel'), trigger: 'blur' }],
        partnerId: [{ required: true, message: this.$t('so.msg.partnerId'), trigger: 'blur' }],
        isHasInvoice: [{ required: true, message: this.$t('so.msg.isHasInvoice'), trigger: 'blur' }],
        assignStatus: [{ required: true, message: this.$t('so.msg.assignStatus'), trigger: 'blur' }],
        companyCode: [{ required: true, message: this.$t('so.msg.companyCode'), trigger: 'blur' }],
        id: [{ required: true, message: this.$t('so.msg.id'), trigger: 'blur' }],
        addr: [{ required: true, message: this.$t('so.msg.addr'), trigger: 'blur' }],
        isCanInWave: [{ required: true, message: this.$t('so.msg.isCanInWave'), trigger: 'blur' }],
        isSelf: [{ required: true, message: this.$t('so.msg.isSelf'), trigger: 'blur' }],
        urgentLevel: [{ required: true, message: this.$t('so.msg.urgentLevel'), trigger: 'blur' }],
        isPrescription: [{ required: true, message: this.$t('so.msg.isPrescription'), trigger: 'blur' }],
        isFrozen: [{ required: true, message: this.$t('so.msg.isFrozen'), trigger: 'blur' }],
        receiver: [{ required: true, message: this.$t('so.msg.receiver'), trigger: 'blur' }],
        outOrderNo: [{ required: true, message: this.$t('so.msg.outOrderNo'), trigger: 'blur' }],
        soStatus: [{ required: true, message: this.$t('so.msg.soStatus'), trigger: 'blur' }],
        updaterName: [{ required: true, message: this.$t('so.msg.updaterName'), trigger: 'blur' }],
        whId: [{ required: true, message: this.$t('so.msg.whId'), trigger: 'blur' }],
        provinceId: [{ required: true, message: this.$t('so.msg.provinceId'), trigger: 'blur' }],
        sowGroup: [{ required: true, message: this.$t('so.msg.sowGroup'), trigger: 'blur' }],
        scSoType: [{ required: true, message: this.$t('so.msg.scSoType'), trigger: 'blur' }],
        scBusinessType: [{ required: true, message: this.$t('so.msg.scBusinessType'), trigger: 'blur' }],
        creatorName: [{ required: true, message: this.$t('so.msg.creatorName'), trigger: 'blur' }],
        customerId: [{ required: true, message: this.$t('so.msg.customerId'), trigger: 'blur' }],
        cityId: [{ required: true, message: this.$t('so.msg.cityId'), trigger: 'blur' }]
      }
      this.diaFormInfoFrozen.rules = {
        frozenRemark: [{ required: true, message: this.$t('so.msg.frozenRemark'), trigger: 'blur' }],
        unfrozenRemark: [{ required: true, message: this.$t('so.msg.unfrozenRemark'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        ownerId: null,
        partnerStoreId: null,
        remark: null,
        soNo: null,
        areaId: null,
        expOutTime: null,
        receiverTel: null,
        partnerId: null,
        isHasInvoice: null,
        assignStatus: null,
        companyCode: null,
        id: null,
        addr: null,
        isCanInWave: null,
        isSelf: null,
        urgentLevel: null,
        isPrescription: null,
        isFrozen: null,
        receiver: null,
        outOrderNo: null,
        soStatus: null,
        updaterName: null,
        whId: null,
        provinceId: null,
        sowGroup: null,
        scSoType: null,
        scBusinessType: null,
        creatorName: null,
        customerId: null,
        cusOrderNo: null,
        cityId: null
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
