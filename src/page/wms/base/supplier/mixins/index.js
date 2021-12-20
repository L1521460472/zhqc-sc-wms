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
          supplierCode: null,
          supplierName: null,
          origCode: null,
          shortName: null,
          origSys: null,
          mnemonicCode: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        origSysList: [
        ],
        paymentPeriodList: [
        ],
        paymentMethodList: [
        ],
        taxTypeList: [
        ],
        invoiceTypeList: [
        ],
        isEnableList: [
        ],
        countryList: [],
        provinceList: [],
        cityList: [],
        areaList: []
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
        rules: {}, // 配置的表单字段校验规则集合
        sealTable: {
          ref: null,
          data: [],
          deleteIds: [],
          fieldList: null,
          handle: { // 表格自定义按钮
            fixed: 'right',
            label: this.$t('table.actions'), // 操作列名
            width: '200', // 默认操作按钮列宽度
            btList: [// 添加操作按钮
            // 自定义按钮
              { slot: true, icon: '', event: 'slotEvent' }// event值为notification.js中定义的方法名
            ]
          }
        }
      },
      diaFormInfoSeal: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        imageUrl: null
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
        { label: this.$t('supplier.supplierCode'), value: 'supplierCode', type: 'input' },
        { label: this.$t('supplier.supplierName'), value: 'supplierName', type: 'input' },
        { label: this.$t('supplier.origCode'), value: 'origCode', type: 'input' },
        { label: this.$t('supplier.shortName'), value: 'shortName', type: 'input' },
        { label: this.$t('supplier.origSys'), value: 'origSys', type: 'select', list: 'origSysList' },
        { label: this.$t('supplier.mnemonicCode'), value: 'mnemonicCode', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }
      ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        /* {prop:"companyCode", label:this.$t('supplier.companyCode'), minWidth:100},*/
        { prop: 'supplierCode', label: this.$t('supplier.supplierCode'), minWidth: 100 },
        { prop: 'supplierName', label: this.$t('supplier.supplierName'), minWidth: 100 },
        { prop: 'origCode', label: this.$t('supplier.origCode'), minWidth: 100 },
        { prop: 'shortName', label: this.$t('supplier.shortName'), minWidth: 100 },
        { prop: 'origSysName', label: this.$t('supplier.origSys'), minWidth: 100 },
        { prop: 'mnemonicCode', label: this.$t('supplier.mnemonicCode'), minWidth: 100 },
        { prop: 'paymentPeriodName', label: this.$t('supplier.paymentPeriod'), minWidth: 100 },
        { prop: 'paymentMethodName', label: this.$t('supplier.paymentMethod'), minWidth: 100 },
        { prop: 'contactName', label: this.$t('supplier.contactName'), minWidth: 100 },
        { prop: 'contactTel', label: this.$t('supplier.contactTel'), minWidth: 100 },
        { prop: 'contactPhone', label: this.$t('supplier.contactPhone'), minWidth: 100 },
        { prop: 'contactFax', label: this.$t('supplier.contactFax'), minWidth: 100 },
        { prop: 'contactMailbox', label: this.$t('supplier.contactMailbox'), minWidth: 100 },
        { prop: 'contactAddr', label: this.$t('supplier.contactAddr'), minWidth: 100 },
        { prop: 'companyRegistTime', label: this.$t('supplier.companyRegistTime'), minWidth: 100 },
        { prop: 'bankName', label: this.$t('supplier.bankName'), minWidth: 100 },
        { prop: 'bankAccount', label: this.$t('supplier.bankAccount'), minWidth: 100 },
        { prop: 'creditLimit', label: this.$t('supplier.creditLimit'), minWidth: 100 },
        { prop: 'invoiceTypeName', label: this.$t('supplier.invoiceType'), minWidth: 100 },
        { prop: 'invoiceTitle', label: this.$t('supplier.invoiceTitle'), minWidth: 100 },
        { prop: 'taxIdNum', label: this.$t('supplier.taxIdNum'), minWidth: 100 },
        { prop: 'taxTypeName', label: this.$t('supplier.taxType'), minWidth: 100 },
        { prop: 'orderCycle', label: this.$t('supplier.orderCycle'), minWidth: 100 },
        { prop: 'countryName', label: this.$t('supplier.country'), minWidth: 100 },
        { prop: 'provinceName', label: this.$t('supplier.provinceId'), minWidth: 100 },
        { prop: 'cityName', label: this.$t('supplier.cityId'), minWidth: 100 },
        { prop: 'areaName', label: this.$t('supplier.areaId'), minWidth: 100 },
        { prop: 'creator', label: this.$t('supplier.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('supplier.createTime'), minWidth: 100 },
        { prop: 'updater', label: this.$t('supplier.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('supplier.updateTime'), minWidth: 100 },
        { prop: 'isEnableName', label: this.$t('supplier.isEnable'), minWidth: 100 },
        { prop: 'remark', label: this.$t('supplier.remark'), minWidth: 100 },
        { label: '操作', value: 'status', width: 220, type: 'slot', fixed: 'right' } // value: 'status' 对应页面上 自定义插槽的名字v-slot:col-status
      ]
      // 初始化印章列表
      this.diaFormInfo.sealTable.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'sealName', label: this.$t('supplier.supplierSeal.sealName'), minWidth: 100 },
        { prop: 'sealImpression', label: this.$t('supplier.supplierSeal.sealImpression'), minWidth: 100, type: 'slot', value: 'sealImpression' },
        { prop: 'remark', label: this.$t('supplier.supplierSeal.remark'), minWidth: 100 },
        { prop: 'creatorName', label: this.$t('supplier.supplierSeal.creatorName'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('supplier.supplierSeal.createTime'), minWidth: 100 },
        { prop: 'updaterName', label: this.$t('supplier.supplierSeal.updaterName'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('supplier.supplierSeal.updateTime'), minWidth: 100 }
      ]
      // 初始化印章印模弹窗表单
      this.diaFormInfoSeal.fieldList = [
        { label: this.$t('supplier.supplierSeal.sealName'), value: 'sealName', type: 'input' },
        { label: this.$t('supplier.supplierSeal.remark'), value: 'remark', type: 'input' }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('supplier.supplierCode'), value: 'supplierCode', type: 'input', readonly: true },
        { label: this.$t('supplier.supplierName'), value: 'supplierName', type: 'input', readonly: true },
        { label: this.$t('supplier.origCode'), value: 'origCode', type: 'input', readonly: true },
        { label: this.$t('supplier.shortName'), value: 'shortName', type: 'input', readonly: true },
        { label: this.$t('supplier.origSys'), value: 'origSys', type: 'select', list: 'origSysList', disabled: true },
        { label: this.$t('supplier.mnemonicCode'), value: 'mnemonicCode', type: 'input', readonly: true },
        { label: this.$t('supplier.paymentPeriod'), value: 'paymentPeriod', type: 'select', list: 'paymentPeriodList', disabled: true },
        { label: this.$t('supplier.paymentMethod'), value: 'paymentMethod', type: 'select', list: 'paymentMethodList', disabled: true },
        { label: this.$t('supplier.contactName'), value: 'contactName', type: 'input', readonly: true },
        { label: this.$t('supplier.contactTel'), value: 'contactTel', type: 'input', readonly: true },
        { label: this.$t('supplier.contactPhone'), value: 'contactPhone', type: 'input', readonly: true },
        { label: this.$t('supplier.contactFax'), value: 'contactFax', type: 'input', readonly: true },
        { label: this.$t('supplier.contactMailbox'), value: 'contactMailbox', type: 'input', readonly: true },
        { label: this.$t('supplier.contactAddr'), value: 'contactAddr', type: 'input', readonly: true },
        { label: this.$t('supplier.companyRegistTime'), value: 'companyRegistTime', type: 'input', readonly: true },
        { label: this.$t('supplier.bankName'), value: 'bankName', type: 'input', readonly: true },
        { label: this.$t('supplier.bankAccount'), value: 'bankAccount', type: 'input', readonly: true },
        { label: this.$t('supplier.creditLimit'), value: 'creditLimit', type: 'input', readonly: true },
        { label: this.$t('supplier.invoiceType'), value: 'invoiceType', type: 'select', list: 'invoiceTypeList', disabled: true },
        { label: this.$t('supplier.invoiceTitle'), value: 'invoiceTitle', type: 'input', readonly: true },
        { label: this.$t('supplier.taxIdNum'), value: 'taxIdNum', type: 'input', readonly: true },
        { label: this.$t('supplier.taxType'), value: 'taxType', type: 'select', list: 'taxTypeList', disabled: true },
        { label: this.$t('supplier.orderCycle'), value: 'orderCycle', type: 'input', disabled: true },
        { label: this.$t('supplier.country'), value: 'country', type: 'select', list: 'countryList', disabled: true },
        { label: this.$t('supplier.provinceId'), value: 'provinceId', type: 'slot', disabled: true },
        { label: this.$t('supplier.cityId'), value: 'cityId', type: 'slot', disabled: true },
        { label: this.$t('supplier.areaId'), value: 'areaId', type: 'slot', disabled: true },
        { label: this.$t('supplier.isEnable'), value: 'isEnable', type: 'select', list: 'isEnableList', disabled: true },
        { label: this.$t('supplier.remark'), value: 'remark', type: 'input', readonly: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.data = {
        country: this.listTypeInfo.countryList.length == 0 ? null : this.listTypeInfo.countryList[0].value,
        origSys: this.listTypeInfo.origSysList.length == 0 ? null : this.listTypeInfo.origSysList[0].value,
        paymentPeriod: this.listTypeInfo.paymentPeriodList.length == 0 ? null : this.listTypeInfo.paymentPeriodList[0].value,
        paymentMethod: this.listTypeInfo.paymentMethodList.length == 0 ? null : this.listTypeInfo.paymentMethodList[0].value,
        taxType: this.listTypeInfo.taxTypeList.length == 0 ? null : this.listTypeInfo.taxTypeList[0].value,
        invoiceType: this.listTypeInfo.invoiceTypeList.length == 0 ? null : this.listTypeInfo.invoiceTypeList[0].value,
        isEnable: this.listTypeInfo.isEnableList.length == 0 ? null : this.listTypeInfo.isEnableList[1].value
      }
      this.diaFormInfo.fieldList = [
        { label: this.$t('supplier.supplierCode'), value: 'supplierCode', type: 'input' },
        { label: this.$t('supplier.supplierName'), value: 'supplierName', type: 'input' },
        { label: this.$t('supplier.origCode'), value: 'origCode', type: 'input', readonly: true },
        { label: this.$t('supplier.shortName'), value: 'shortName', type: 'input' },
        { label: this.$t('supplier.origSys'), value: 'origSys', type: 'select', list: 'origSysList' },
        { label: this.$t('supplier.mnemonicCode'), value: 'mnemonicCode', type: 'input' },
        { label: this.$t('supplier.paymentPeriod'), value: 'paymentPeriod', type: 'select', list: 'paymentPeriodList' },
        { label: this.$t('supplier.paymentMethod'), value: 'paymentMethod', type: 'select', list: 'paymentMethodList' },
        { label: this.$t('supplier.contactName'), value: 'contactName', type: 'input' },
        { label: this.$t('supplier.contactTel'), value: 'contactTel', type: 'input' },
        { label: this.$t('supplier.contactPhone'), value: 'contactPhone', type: 'input' },
        { label: this.$t('supplier.contactFax'), value: 'contactFax', type: 'input' },
        { label: this.$t('supplier.contactMailbox'), value: 'contactMailbox', type: 'input' },
        { label: this.$t('supplier.contactAddr'), value: 'contactAddr', type: 'input' },
        { label: this.$t('supplier.companyRegistTime'), value: 'companyRegistTime', type: 'date' },
        { label: this.$t('supplier.bankName'), value: 'bankName', type: 'input' },
        { label: this.$t('supplier.bankAccount'), value: 'bankAccount', type: 'input' },
        { label: this.$t('supplier.creditLimit'), value: 'creditLimit', type: 'input' },
        { label: this.$t('supplier.invoiceType'), value: 'invoiceType', type: 'select', list: 'invoiceTypeList' },
        { label: this.$t('supplier.invoiceTitle'), value: 'invoiceTitle', type: 'input' },
        { label: this.$t('supplier.taxIdNum'), value: 'taxIdNum', type: 'input' },
        { label: this.$t('supplier.taxType'), value: 'taxType', type: 'select', list: 'taxTypeList' },
        { label: this.$t('supplier.orderCycle'), value: 'orderCycle', type: 'input' },
        { label: this.$t('supplier.country'), value: 'country', type: 'select', list: 'countryList' },
        { label: this.$t('supplier.provinceId'), value: 'provinceId', type: 'slot' },
        { label: this.$t('supplier.cityId'), value: 'cityId', type: 'slot' },
        { label: this.$t('supplier.areaId'), value: 'areaId', type: 'slot' },
        { label: this.$t('supplier.isEnable'), value: 'isEnable', type: 'select', list: 'isEnableList', clearable: false },
        { label: this.$t('supplier.remark'), value: 'remark', type: 'input' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('supplier.supplierCode'), value: 'supplierCode', type: 'input', readonly: true },
        { label: this.$t('supplier.supplierName'), value: 'supplierName', type: 'input' },
        { label: this.$t('supplier.origCode'), value: 'origCode', type: 'input', readonly: true },
        { label: this.$t('supplier.shortName'), value: 'shortName', type: 'input' },
        { label: this.$t('supplier.origSys'), value: 'origSys', type: 'select', list: 'origSysList' },
        { label: this.$t('supplier.mnemonicCode'), value: 'mnemonicCode', type: 'input' },
        { label: this.$t('supplier.paymentPeriod'), value: 'paymentPeriod', type: 'select', list: 'paymentPeriodList' },
        { label: this.$t('supplier.paymentMethod'), value: 'paymentMethod', type: 'select', list: 'paymentMethodList' },
        { label: this.$t('supplier.contactName'), value: 'contactName', type: 'input' },
        { label: this.$t('supplier.contactTel'), value: 'contactTel', type: 'input' },
        { label: this.$t('supplier.contactPhone'), value: 'contactPhone', type: 'input' },
        { label: this.$t('supplier.contactFax'), value: 'contactFax', type: 'input' },
        { label: this.$t('supplier.contactMailbox'), value: 'contactMailbox', type: 'input' },
        { label: this.$t('supplier.contactAddr'), value: 'contactAddr', type: 'input' },
        { label: this.$t('supplier.companyRegistTime'), value: 'companyRegistTime', type: 'input' },
        { label: this.$t('supplier.bankName'), value: 'bankName', type: 'input' },
        { label: this.$t('supplier.bankAccount'), value: 'bankAccount', type: 'input' },
        { label: this.$t('supplier.creditLimit'), value: 'creditLimit', type: 'input' },
        { label: this.$t('supplier.invoiceType'), value: 'invoiceType', type: 'select', list: 'invoiceTypeList' },
        { label: this.$t('supplier.invoiceTitle'), value: 'invoiceTitle', type: 'select', list: 'invoiceTitleList' },
        { label: this.$t('supplier.taxIdNum'), value: 'taxIdNum', type: 'input' },
        { label: this.$t('supplier.taxType'), value: 'taxType', type: 'select', list: 'taxTypeList' },
        { label: this.$t('supplier.orderCycle'), value: 'orderCycle', type: 'input' },
        { label: this.$t('supplier.country'), value: 'country', type: 'select', list: 'countryList' },
        { label: this.$t('supplier.provinceId'), value: 'provinceId', type: 'slot' },
        { label: this.$t('supplier.cityId'), value: 'cityId', type: 'slot' },
        { label: this.$t('supplier.areaId'), value: 'areaId', type: 'slot' },
        { label: this.$t('supplier.isEnable'), value: 'isEnable', type: 'select', list: 'isEnableList' },
        { label: this.$t('supplier.remark'), value: 'remark', type: 'input' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        country: [{ required: true, message: this.$t('supplier.msg.country'), trigger: 'blur' }],
        isEnable: [{ required: true, message: this.$t('supplier.msg.isEnable'), trigger: 'blur' }],
        contactTel: [{ required: true, message: this.$t('supplier.msg.contactTel'), trigger: 'blur' }],
        origSys: [{ required: true, message: this.$t('supplier.msg.origSys'), trigger: 'blur' }],
        contactAddr: [{ required: true, message: this.$t('supplier.msg.contactAddr'), trigger: 'blur' }],
        supplierName: [{ required: true, message: this.$t('supplier.msg.supplierName'), trigger: 'blur' }],
        contactName: [{ required: true, message: this.$t('supplier.msg.contactName'), trigger: 'blur' }],
        supplierCode: [{ required: true, message: this.$t('supplier.msg.supplierCode'), trigger: 'blur' }]
      }
      this.diaFormInfoSeal.rules = {
        sealName: [{ required: true, message: this.$t('supplier.msg.supplierSeal.sealName'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        country: null,
        contactPhone: null,
        isEnable: null,
        invoiceTitle: null,
        origCode: null,
        contactTel: null,
        contactFax: null,
        remark: null,
        orderCycle: null,
        areaId: null,
        origSys: null,
        contactAddr: null,
        paymentPeriod: null,
        bankName: null,
        creditLimit: null,
        mnemonicCode: null,
        invoiceType: null,
        supplierName: null,
        paymentMethod: null,
        bankAccount: null,
        contactName: null,
        companyRegistTime: null,
        contactMailbox: null,
        taxType: null,
        provinceId: null,
        shortName: null,
        taxIdNum: null,
        supplierCode: null,
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
