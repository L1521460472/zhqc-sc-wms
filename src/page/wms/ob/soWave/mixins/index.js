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
          outOrderNo: null,
          soType: null,
          soStatus: null,
          ownerId: null,
          customerId: null,
          partnerId: null,
          partnerStoreId: null,
          isFrozen: null,
          expOutTimeBegin: null,
          expOutTimeEnd: null,
          isHasInvoice: null,
          skuCode: null,
          createTimeBegin: null,
          createTimeEnd: null,
          country: null,
          provinceId: null,
          cityId: null,
          areaId: null,
          cusOrderNo: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        soTypeList: [],
        soStatusList: [],
        whetherList: [],
        countryList: [],
        pickModeList: []
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
            // 自定义按钮
            // {slot: true, icon: '', event: 'slotEvent',},//event值为notification.js中定义的方法名
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
          handle: { // 表格自定义按钮
            fixed: 'right',
            label: this.$t('table.actions'), // 操作列名
            width: '210', // 默认操作按钮列宽度
            btList: [// 添加操作按钮
              // 默认删除按钮
              // {label:this.$t('table.delete'), type: 'danger', icon: '', event: 'deleteDt', show: true,disabled:false},//event值为notification.js中定义的方法名
            ]
          }
        }
      },
      diaFormInfoDt: {
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
        { label: this.$t('soWave.soNo'), value: 'soNo', type: 'input' },
        { label: this.$t('soWave.soType'), value: 'soType', type: 'select', list: 'soTypeList' },
        { label: this.$t('soWave.soStatus'), value: 'soStatus', type: 'select', list: 'soStatusList' },
        { label: this.$t('soWave.cusOrderNo'), value: 'cusOrderNo', type: 'input' },
        { label: this.$t('soWave.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('soWave.customerId'), value: 'customerId', type: 'slot' },
        { label: this.$t('soWave.partnerId'), value: 'partnerId', type: 'slot' },
        { label: this.$t('soWave.partnerStoreId'), value: 'partnerStoreId', type: 'slot' },
        { label: this.$t('soWave.zoneId'), value: 'zoneId', type: 'slot' },
        { label: this.$t('soWave.expOutTimeBegin'), value: 'expOutTimeBegin', type: 'date', dateType: 'date' },
        { label: this.$t('soWave.expOutTimeEnd'), value: 'expOutTimeEnd', type: 'date', dateType: 'date' },
        { label: this.$t('soWave.createTimeBegin'), value: 'createTimeBegin', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('soWave.createTimeEnd'), value: 'createTimeEnd', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        // {label: this.$t('soWave.country'), value: "country", type: "select",list:'countryList'},
        { label: this.$t('soWave.provinceId'), value: 'provinceId', type: 'slot' },
        { label: this.$t('soWave.cityId'), value: 'cityId', type: 'slot' },
        // {label: this.$t('soWave.areaId'), value: "areaId", type: "slot"},
        // {label: this.$t('soWave.receiver'), value: "receiver", type: "input"},
        { label: this.$t('soWave.isFrozen'), value: 'isFrozen', type: 'select', list: 'whetherList' },
        { label: this.$t('soWave.isHasInvoice'), value: 'isHasInvoice', type: 'select', list: 'whetherList' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('soWave.soNo'), value: 'soNo', type: 'input' },
        { label: this.$t('soWave.soType'), value: 'soType', type: 'select', list: 'soTypeList' },
        { label: this.$t('soWave.soStatus'), value: 'soStatus', type: 'select', list: 'soStatusList' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
      this.topForm.data.ownerId = null
      this.topForm.data.customerId = null
      this.topForm.data.partnerId = null
      this.topForm.data.partnerStoreId = null
      this.topForm.data.zoneId = null
    },
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'selection', width: 50, fixed: 'left' }, // 选项框
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'soNo', label: this.$t('soWave.soNo'), minWidth: 150 },
        { prop: 'soTypeName', label: this.$t('soWave.soType'), minWidth: 100 },
        { prop: 'soStatusName', label: this.$t('soWave.soStatus'), minWidth: 100 },
        { prop: 'outOrderNo', label: this.$t('soWave.outOrderNo'), minWidth: 140 },
        { prop: 'customerName', label: this.$t('soWave.customerId'), minWidth: 100 },
        // {prop:"whName", label:this.$t('soWave.whId'), minWidth:100},
        { prop: 'partnerName', label: this.$t('soWave.partnerId'), minWidth: 100 },
        // {prop:"ownerName", label:this.$t('soWave.ownerId'), minWidth:100},
        { prop: 'receiver', label: this.$t('soWave.receiver'), minWidth: 100 },
        // {prop:"receiverTel", label:this.$t('soWave.receiverTel'), minWidth:100},
        { prop: 'expOutTime', label: this.$t('soWave.expOutTime'), minWidth: 100 },
        // {prop:"cusOrderNo", label:this.$t('soWave.cusOrderNo'), minWidth:100},
        { prop: 'isFrozenName', label: this.$t('soWave.isFrozen'), minWidth: 100 },
        // {prop:"urgentLevel", label:this.$t('soWave.urgentLevel'), minWidth:100},
        { prop: 'remark', label: this.$t('soWave.remark'), minWidth: 100 },
        { prop: 'creator', label: this.$t('soWave.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('soWave.createTime'), minWidth: 100 },
        { prop: 'updater', label: this.$t('soWave.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('soWave.updateTime'), minWidth: 100 }

      ]
    },
    diaFormInfoDtFieldList() {
      this.diaFormInfoDt.fieldList = [
        { label: this.$t('soWave.pickMode'), value: 'pickMode', type: 'select', list: 'pickModeList' },
        { label: this.$t('soWave.waveOrderLevel'), value: 'waveOrderLevel', type: 'number', min: 1, precision: 0 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('soWave.soNo'), value: 'soNo', type: 'input', disabled: true },
        { label: this.$t('soWave.ownerId'), value: 'ownerId', type: 'slot', disabled: true },
        { label: this.$t('soWave.customerId'), value: 'customerId', type: 'slot', disabled: true },
        { label: this.$t('soWave.expOutTime'), value: 'expOutTime', type: 'date', dateType: 'date', disabled: true },
        { label: this.$t('soWave.partnerId'), value: 'partnerId', type: 'slot', disabled: true },
        { label: this.$t('soWave.partnerStoreId'), value: 'partnerStoreId', type: 'slot', disabled: true },
        { label: this.$t('soWave.cusOrderNo'), value: 'cusOrderNo', type: 'input', disabled: true },
        { label: this.$t('soWave.isSelf'), value: 'isSelf', type: 'select', list: 'whetherList', disabled: true },
        { label: this.$t('soWave.receiver'), value: 'receiver', type: 'input', disabled: true },
        { label: this.$t('soWave.receiverTel'), value: 'receiverTel', type: 'input', disabled: true },
        { label: this.$t('soWave.country'), value: 'country', type: 'select', list: 'countryList', disabled: true },
        { label: this.$t('soWave.provinceId'), value: 'provinceId', type: 'slot', disabled: true },
        { label: this.$t('soWave.cityId'), value: 'cityId', type: 'slot', disabled: true },
        { label: this.$t('soWave.areaId'), value: 'areaId', type: 'slot', disabled: true },
        { label: this.$t('soWave.addr'), value: 'addr', type: 'input', disabled: true },
        { label: this.$t('soWave.isHasInvoice'), value: 'isHasInvoice', type: 'select', list: 'whetherList', disabled: true },
        { label: this.$t('soWave.remark'), value: 'remark', type: 'input', disabled: true },
        { label: this.$t('soWave.outOrderNo'), value: 'outOrderNo', type: 'input', disabled: true },
        { label: this.$t('soWave.soType'), value: 'soType', type: 'select', list: 'soTypeList', disabled: true },
        { label: this.$t('soWave.soStatus'), value: 'soStatus', type: 'select', list: 'soStatusList', disabled: true },
        { label: this.$t('soWave.creator'), value: 'creator', type: 'input', disabled: true },
        { label: this.$t('soWave.createTime'), value: 'createTime', type: 'input', disabled: true }
      ]
      this.diaFormInfo.dtTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'rowNo', label: this.$t('soWave.dt.rowNo'), minWidth: 100 },

        { prop: 'skuCode', label: this.$t('sku.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('sku.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('sku.skuName'), minWidth: 100 },
        { prop: 'tradeName', label: this.$t('sku.tradeName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('sku.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('sku.mainUnit'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('sku.drugForm'), minWidth: 100 },
        { prop: 'mfg', label: this.$t('sku.mfgName'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('sku.originCountry'), minWidth: 100 },
        { prop: 'approveNo', label: this.$t('sku.approvalNumber'), minWidth: 100 },
        { prop: 'brandName', label: this.$t('sku.brandName'), minWidth: 100 },
        { prop: 'tempControlName', label: this.$t('sku.tempControlName'), minWidth: 100 },
        { prop: 'validityDay', label: this.$t('sku.validityDay'), minWidth: 100 },

        { prop: 'soQty', label: this.$t('soWave.dt.soQty'), minWidth: 100 },
        { prop: 'perAllotQty', label: this.$t('soWave.dt.perAllotQty'), minWidth: 100 },
        { prop: 'allotQty', label: this.$t('soWave.dt.allotQty'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('soWave.dt.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('soWave.dt.productionDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('soWave.dt.invalidDate'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('soWave.dt.batchNo'), minWidth: 100 },
        { prop: 'supplierName', label: this.$t('soWave.dt.supplierName'), minWidth: 100 }

      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = []
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = []
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        ownerId: [{ required: true, message: this.$t('soWave.msg.ownerId'), trigger: 'blur' }],
        partnerStoreId: [{ required: true, message: this.$t('soWave.msg.partnerStoreId'), trigger: 'blur' }],
        soNo: [{ required: true, message: this.$t('soWave.msg.soNo'), trigger: 'blur' }],
        areaId: [{ required: true, message: this.$t('soWave.msg.areaId'), trigger: 'blur' }],
        receiverTel: [{ required: true, message: this.$t('soWave.msg.receiverTel'), trigger: 'blur' }],
        partnerId: [{ required: true, message: this.$t('soWave.msg.partnerId'), trigger: 'blur' }],
        isHasInvoice: [{ required: true, message: this.$t('soWave.msg.isHasInvoice'), trigger: 'blur' }],
        assignStatus: [{ required: true, message: this.$t('soWave.msg.assignStatus'), trigger: 'blur' }],
        companyCode: [{ required: true, message: this.$t('soWave.msg.companyCode'), trigger: 'blur' }],
        id: [{ required: true, message: this.$t('soWave.msg.id'), trigger: 'blur' }],
        addr: [{ required: true, message: this.$t('soWave.msg.addr'), trigger: 'blur' }],
        isCanInWave: [{ required: true, message: this.$t('soWave.msg.isCanInWave'), trigger: 'blur' }],
        isSelf: [{ required: true, message: this.$t('soWave.msg.isSelf'), trigger: 'blur' }],
        urgentLevel: [{ required: true, message: this.$t('soWave.msg.urgentLevel'), trigger: 'blur' }],
        isPrescription: [{ required: true, message: this.$t('soWave.msg.isPrescription'), trigger: 'blur' }],
        isFrozen: [{ required: true, message: this.$t('soWave.msg.isFrozen'), trigger: 'blur' }],
        receiver: [{ required: true, message: this.$t('soWave.msg.receiver'), trigger: 'blur' }],
        outOrderNo: [{ required: true, message: this.$t('soWave.msg.outOrderNo'), trigger: 'blur' }],
        soStatus: [{ required: true, message: this.$t('soWave.msg.soStatus'), trigger: 'blur' }],
        updaterName: [{ required: true, message: this.$t('soWave.msg.updaterName'), trigger: 'blur' }],
        whId: [{ required: true, message: this.$t('soWave.msg.whId'), trigger: 'blur' }],
        provinceId: [{ required: true, message: this.$t('soWave.msg.provinceId'), trigger: 'blur' }],
        sowGroup: [{ required: true, message: this.$t('soWave.msg.sowGroup'), trigger: 'blur' }],
        soType: [{ required: true, message: this.$t('soWave.msg.soType'), trigger: 'blur' }],
        creatorName: [{ required: true, message: this.$t('soWave.msg.creatorName'), trigger: 'blur' }],
        customerId: [{ required: true, message: this.$t('soWave.msg.customerId'), trigger: 'blur' }],
        cityId: [{ required: true, message: this.$t('soWave.msg.cityId'), trigger: 'blur' }]
      }
      this.diaFormInfoDt.rules = {
        pickMode: [{ required: true, message: this.$t('soWave.msg.pickMode'), trigger: 'blur' }]
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
        soType: null,
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
