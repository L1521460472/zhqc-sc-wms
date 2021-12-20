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
          partnerCode: null,
          origCode: null,
          shortName: null,
          fullName: null,
          partnerType: null,
          origSys: null,
          mnemonicCode: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        partnerTypeList: [
        ],
        ownerSystemList: [
        ],
        paymentPeriodList: [
        ],
        paymentMethodList: [
        ],
        taxTypeList: [
        ],
        invoiceTypeList: [
        ],
        ownerPlatformList: [
        ],
        shipTypeList: [
        ],
        isEnableList: [
        ],
        countryList: []
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
    this.initTopFormColumns()// 初始化查询界面配置数据
    this.rulesInit()// 初始化diaFormInfo表单字段校验规则
  },
  methods: {
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化top表单
      this.topForm.fieldList = [
        { label: this.$t('partner.partnerCode'), value: 'partnerCode', type: 'input' },
        { label: this.$t('partner.origCode'), value: 'origCode', type: 'input' },
        { label: this.$t('partner.shortName'), value: 'shortName', type: 'input' },
        { label: this.$t('partner.fullName'), value: 'fullName', type: 'input' },
        // {label: this.$t('partner.partnerType'), value: "partnerType", type: "select",list: 'partnerTypeList'},
        { label: this.$t('partner.origSys'), value: 'origSys', type: 'select', list: 'ownerSystemList' },
        { label: this.$t('partner.mnemonicCode'), value: 'mnemonicCode', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }
      ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        /* {prop:"companyCode", label:this.$t('partner.companyCode'), minWidth:100},*/
        { prop: 'partnerCode', label: this.$t('partner.partnerCode'), minWidth: 100 },
        { prop: 'origCode', label: this.$t('partner.origCode'), minWidth: 100 },
        { prop: 'shortName', label: this.$t('partner.shortName'), minWidth: 100 },
        { prop: 'fullName', label: this.$t('partner.fullName'), minWidth: 100 },
        // {prop:"partnerTypeName", label:this.$t('partner.partnerType'), minWidth:100},
        { prop: 'origSysName', label: this.$t('partner.origSys'), minWidth: 100 },
        { prop: 'mnemonicCode', label: this.$t('partner.mnemonicCode'), minWidth: 100 },
        { prop: 'wmsLpCode', label: this.$t('partner.wmsLpCode'), minWidth: 120 },
        { prop: 'paymentPeriodName', label: this.$t('partner.paymentPeriod'), minWidth: 100 },
        { prop: 'paymentMethodName', label: this.$t('partner.paymentMethod'), minWidth: 100 },
        { prop: 'contactName', label: this.$t('partner.contactName'), minWidth: 100 },
        { prop: 'contactTel', label: this.$t('partner.contactTel'), minWidth: 100 },
        { prop: 'contactPhone', label: this.$t('partner.contactPhone'), minWidth: 100 },
        { prop: 'contactFax', label: this.$t('partner.contactFax'), minWidth: 100 },
        { prop: 'contactMailbox', label: this.$t('partner.contactMailbox'), minWidth: 100 },
        { prop: 'registeredAddr', label: this.$t('partner.registeredAddr'), minWidth: 100 },
        { prop: 'bankAccount', label: this.$t('partner.bankAccount'), minWidth: 100 },
        { prop: 'bankName', label: this.$t('partner.bankName'), minWidth: 100 },
        { prop: 'taxTypeName', label: this.$t('partner.taxType'), minWidth: 100 },
        { prop: 'taxIdNum', label: this.$t('partner.taxIdNum'), minWidth: 100 },
        { prop: 'invoiceTitle', label: this.$t('partner.invoiceTitle'), minWidth: 100 },
        { prop: 'invoiceTypeName', label: this.$t('partner.invoiceType'), minWidth: 100 },
        { prop: 'creditLimit', label: this.$t('partner.creditLimit'), minWidth: 100 },
        { prop: 'origWebsite', label: this.$t('partner.origWebsite'), minWidth: 100 },
        { prop: 'companyRegistTime', label: this.$t('partner.companyRegistTime'), minWidth: 100 },
        { prop: 'shipTypeName', label: this.$t('partner.shipType'), minWidth: 100 },
        { prop: 'contactAddr', label: this.$t('partner.contactAddr'), minWidth: 100 },
        { prop: 'countryName', label: this.$t('partner.country'), minWidth: 100 },
        { prop: 'provinceName', label: this.$t('partner.provinceId'), minWidth: 100 },
        { prop: 'cityName', label: this.$t('partner.cityId'), minWidth: 100 },
        { prop: 'areaName', label: this.$t('partner.areaId'), minWidth: 100 },
        { prop: 'creator', label: this.$t('partner.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('partner.createTime'), minWidth: 100 },
        { prop: 'updater', label: this.$t('partner.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('partner.updateTime'), minWidth: 100 },
        { prop: 'isEnableName', label: this.$t('partner.isEnable'), minWidth: 100 },
        { prop: 'remark', label: this.$t('partner.remark'), minWidth: 100 },
        { label: '操作', value: 'status', width: 220, type: 'slot', fixed: 'right' } // value: 'status' 对应页面上 自定义插槽的名字v-slot:col-status
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('partner.partnerCode'), value: 'partnerCode', type: 'input', readonly: true },
        { label: this.$t('partner.origCode'), value: 'origCode', type: 'input', readonly: true },
        { label: this.$t('partner.shortName'), value: 'shortName', type: 'input', readonly: true },
        { label: this.$t('partner.fullName'), value: 'fullName', type: 'input', readonly: true },
        { label: this.$t('partner.partnerType'), value: 'partnerType', type: 'select', list: 'partnerTypeList', disabled: true },
        { label: this.$t('partner.origSys'), value: 'origSys', type: 'select', list: 'ownerSystemList', disabled: true },
        { label: this.$t('partner.mnemonicCode'), value: 'mnemonicCode', type: 'input', readonly: true },
        { label: this.$t('partner.wmsLpCode'), value: 'wmsLpCode', type: 'input', readonly: true },
        { label: this.$t('partner.paymentPeriod'), value: 'paymentPeriod', type: 'select', list: 'paymentPeriodList', disabled: true },
        { label: this.$t('partner.paymentMethod'), value: 'paymentMethod', type: 'select', list: 'paymentMethodList', disabled: true },
        { label: this.$t('partner.contactName'), value: 'contactName', type: 'input', readonly: true },
        { label: this.$t('partner.contactTel'), value: 'contactTel', type: 'input', readonly: true },
        { label: this.$t('partner.contactPhone'), value: 'contactPhone', type: 'input', readonly: true },
        { label: this.$t('partner.contactFax'), value: 'contactFax', type: 'input', readonly: true },
        { label: this.$t('partner.contactMailbox'), value: 'contactMailbox', type: 'input', readonly: true },
        { label: this.$t('partner.registeredAddr'), value: 'registeredAddr', type: 'input', readonly: true },
        { label: this.$t('partner.bankAccount'), value: 'bankAccount', type: 'input', readonly: true },
        { label: this.$t('partner.bankName'), value: 'bankName', type: 'input', readonly: true },
        { label: this.$t('partner.taxType'), value: 'taxType', type: 'select', list: 'taxTypeList', disabled: true },
        { label: this.$t('partner.taxIdNum'), value: 'taxIdNum', type: 'input', readonly: true },
        { label: this.$t('partner.invoiceTitle'), value: 'invoiceTitle', type: 'input', readonly: true },
        { label: this.$t('partner.invoiceType'), value: 'invoiceType', type: 'select', list: 'invoiceTypeList', disabled: true },
        { label: this.$t('partner.creditLimit'), value: 'creditLimit', type: 'input', readonly: true },
        { label: this.$t('partner.origWebsite'), value: 'origWebsite', type: 'input', readonly: true },
        { label: this.$t('partner.companyRegistTime'), value: 'companyRegistTime', type: 'input', readonly: true },
        { label: this.$t('partner.shipType'), value: 'shipType', type: 'select', list: 'shipTypeList', disabled: true },
        { label: this.$t('partner.contactAddr'), value: 'contactAddr', type: 'input', readonly: true },
        { label: this.$t('partner.provinceId'), value: 'provinceId', type: 'slot', readonly: true },
        { label: this.$t('partner.cityId'), value: 'cityId', type: 'slot', readonly: true },
        { label: this.$t('partner.areaId'), value: 'areaId', type: 'slot', readonly: true },
        { label: this.$t('partner.isEnable'), value: 'isEnable', type: 'select', list: 'isEnableList', disabled: true },
        { label: this.$t('partner.remark'), value: 'remark', type: 'input', readonly: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.data = {
        country: this.listTypeInfo.countryList.length == 0 ? null : this.listTypeInfo.countryList[0].value,
        partnerType: this.listTypeInfo.partnerTypeList.length == 0 ? null : this.listTypeInfo.partnerTypeList[0].value,
        origSys: this.listTypeInfo.ownerSystemList.length == 0 ? null : this.listTypeInfo.ownerSystemList[0].value,
        paymentPeriod: this.listTypeInfo.paymentPeriodList.length == 0 ? null : this.listTypeInfo.paymentPeriodList[0].value,
        paymentMethod: this.listTypeInfo.paymentMethodList.length == 0 ? null : this.listTypeInfo.paymentMethodList[0].value,
        taxType: this.listTypeInfo.taxTypeList.length == 0 ? null : this.listTypeInfo.taxTypeList[0].value,
        invoiceType: this.listTypeInfo.invoiceTypeList.length == 0 ? null : this.listTypeInfo.invoiceTypeList[0].value,
        origPlatform: this.listTypeInfo.ownerPlatformList.length == 0 ? null : this.listTypeInfo.ownerPlatformList[0].value,
        shipType: this.listTypeInfo.shipTypeList.length == 0 ? null : this.listTypeInfo.shipTypeList[0].value,
        isEnable: this.listTypeInfo.isEnableList.length == 0 ? null : this.listTypeInfo.isEnableList[1].value
      }
      this.diaFormInfo.fieldList = [
        { label: this.$t('partner.partnerCode'), value: 'partnerCode', type: 'input' },
        { label: this.$t('partner.shortName'), value: 'shortName', type: 'input' },
        { label: this.$t('partner.fullName'), value: 'fullName', type: 'input' },
        { label: this.$t('partner.partnerType'), value: 'partnerType', type: 'select', list: 'partnerTypeList' },
        { label: this.$t('partner.origSys'), value: 'origSys', type: 'select', list: 'ownerSystemList' },
        { label: this.$t('partner.mnemonicCode'), value: 'mnemonicCode', type: 'input' },
        { label: this.$t('partner.paymentPeriod'), value: 'paymentPeriod', type: 'select', list: 'paymentPeriodList' },
        { label: this.$t('partner.paymentMethod'), value: 'paymentMethod', type: 'select', list: 'paymentMethodList' },
        { label: this.$t('partner.contactName'), value: 'contactName', type: 'input' },
        { label: this.$t('partner.contactTel'), value: 'contactTel', type: 'input' },
        { label: this.$t('partner.contactPhone'), value: 'contactPhone', type: 'input' },
        { label: this.$t('partner.contactFax'), value: 'contactFax', type: 'input' },
        { label: this.$t('partner.contactMailbox'), value: 'contactMailbox', type: 'input' },
        { label: this.$t('partner.registeredAddr'), value: 'registeredAddr', type: 'input' },
        { label: this.$t('partner.bankAccount'), value: 'bankAccount', type: 'input' },
        { label: this.$t('partner.bankName'), value: 'bankName', type: 'input' },
        { label: this.$t('partner.taxType'), value: 'taxType', type: 'select', list: 'taxTypeList' },
        { label: this.$t('partner.taxIdNum'), value: 'taxIdNum', type: 'input' },
        { label: this.$t('partner.invoiceTitle'), value: 'invoiceTitle', type: 'input' },
        { label: this.$t('partner.invoiceType'), value: 'invoiceType', type: 'select', list: 'invoiceTypeList' },
        { label: this.$t('partner.creditLimit'), value: 'creditLimit', type: 'input' },
        { label: this.$t('partner.origWebsite'), value: 'origWebsite', type: 'input' },
        { label: this.$t('partner.companyRegistTime'), value: 'companyRegistTime', type: 'date' },
        { label: this.$t('partner.shipType'), value: 'shipType', type: 'select', list: 'shipTypeList' },
        { label: this.$t('partner.contactAddr'), value: 'contactAddr', type: 'input' },
        { label: this.$t('partner.country'), value: 'country', type: 'select', list: 'countryList' },
        { label: this.$t('partner.provinceId'), value: 'provinceId', type: 'slot' },
        { label: this.$t('partner.cityId'), value: 'cityId', type: 'slot' },
        { label: this.$t('partner.areaId'), value: 'areaId', type: 'slot' },
        { label: this.$t('partner.isEnable'), value: 'isEnable', type: 'select', list: 'isEnableList', clearable: false },
        { label: this.$t('partner.remark'), value: 'remark', type: 'input' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('partner.partnerCode'), value: 'partnerCode', type: 'input', readonly: true },
        { label: this.$t('partner.origCode'), value: 'origCode', type: 'input', readonly: true },
        { label: this.$t('partner.shortName'), value: 'shortName', type: 'input' },
        { label: this.$t('partner.fullName'), value: 'fullName', type: 'input' },
        { label: this.$t('partner.partnerType'), value: 'partnerType', type: 'select', list: 'partnerTypeList' },
        { label: this.$t('partner.origSys'), value: 'origSys', type: 'select', list: 'ownerSystemList' },
        { label: this.$t('partner.mnemonicCode'), value: 'mnemonicCode', type: 'input' },
        { label: this.$t('partner.wmsLpCode'), value: 'wmsLpCode', type: 'input' },
        { label: this.$t('partner.paymentPeriod'), value: 'paymentPeriod', type: 'select', list: 'paymentPeriodList' },
        { label: this.$t('partner.paymentMethod'), value: 'paymentMethod', type: 'select', list: 'paymentMethodList' },
        { label: this.$t('partner.contactName'), value: 'contactName', type: 'input' },
        { label: this.$t('partner.contactTel'), value: 'contactTel', type: 'input' },
        { label: this.$t('partner.contactPhone'), value: 'contactPhone', type: 'input' },
        { label: this.$t('partner.contactFax'), value: 'contactFax', type: 'input' },
        { label: this.$t('partner.contactMailbox'), value: 'contactMailbox', type: 'input' },
        { label: this.$t('partner.registeredAddr'), value: 'registeredAddr', type: 'input' },
        { label: this.$t('partner.bankAccount'), value: 'bankAccount', type: 'input' },
        { label: this.$t('partner.bankName'), value: 'bankName', type: 'input' },
        { label: this.$t('partner.taxType'), value: 'taxType', type: 'select', list: 'taxTypeList' },
        { label: this.$t('partner.taxIdNum'), value: 'taxIdNum', type: 'input' },
        { label: this.$t('partner.invoiceTitle'), value: 'invoiceTitle', type: 'input' },
        { label: this.$t('partner.invoiceType'), value: 'invoiceType', type: 'select', list: 'invoiceTypeList' },
        { label: this.$t('partner.creditLimit'), value: 'creditLimit', type: 'input' },
        { label: this.$t('partner.origWebsite'), value: 'origWebsite', type: 'input' },
        { label: this.$t('partner.companyRegistTime'), value: 'companyRegistTime', type: 'date' },
        { label: this.$t('partner.shipType'), value: 'shipType', type: 'select', list: 'shipTypeList' },
        { label: this.$t('partner.contactAddr'), value: 'contactAddr', type: 'input' },
        { label: this.$t('partner.country'), value: 'country', type: 'select', list: 'countryList' },
        { label: this.$t('partner.provinceId'), value: 'provinceId', type: 'slot' },
        { label: this.$t('partner.cityId'), value: 'cityId', type: 'slot' },
        { label: this.$t('partner.areaId'), value: 'areaId', type: 'slot' },
        { label: this.$t('partner.isEnable'), value: 'isEnable', type: 'select', list: 'isEnableList', clearable: false },
        { label: this.$t('partner.remark'), value: 'remark', type: 'input' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        partnerCode: [{ required: true, message: this.$t('partner.msg.partnerCode'), trigger: 'blur' }],
        isEnable: [{ required: true, message: this.$t('partner.msg.isEnable'), trigger: 'blur' }],
        contactTel: [{ required: true, message: this.$t('partner.msg.contactTel'), trigger: 'blur' }],
        origSys: [{ required: true, message: this.$t('partner.msg.origSys'), trigger: 'blur' }],
        contactAddr: [{ required: true, message: this.$t('partner.msg.contactAddr'), trigger: 'blur' }],
        contactName: [{ required: true, message: this.$t('partner.msg.contactName'), trigger: 'blur' }],
        fullName: [{ required: true, message: this.$t('partner.msg.fullName'), trigger: 'blur' }],
        partnerType: [{ required: true, message: this.$t('partner.msg.partnerType'), trigger: 'blur' }],
        shortName: [{ required: true, message: this.$t('partner.msg.shortName'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        contactPhone: null,
        isEnable: null,
        invoiceTitle: null,
        origPlatform: null,
        contactTel: null,
        contactFax: null,
        remark: null,
        areaId: null,
        origSys: null,
        contactAddr: null,
        updateTime: null,
        paymentPeriod: null,
        bankName: null,
        creditLimit: null,
        mnemonicCode: null,
        invoiceType: null,
        origWebsite: null,
        partnerCode: null,
        paymentMethod: null,
        bankAccount: null,
        contactName: null,
        origCode: null,
        shipType: null,
        companyRegistTime: null,
        contactMailbox: null,
        fullName: null,
        taxType: null,
        provinceId: null,
        partnerType: null,
        shortName: null,
        registeredAddr: null,
        taxIdNum: null,
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
