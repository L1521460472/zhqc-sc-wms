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
          customerCode: null,
          customerName: null,
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
        rules: {}, // 配置的表单字段校验规则集合

        // 控制信息
        diaFormInfoControl: {
          ref: null, // 对外提供的可操作配置表单的持有对象
          data: {}, // 绑定的数据Model对象
          fieldList: [], // 配置的表单字段集合
          rules: {}// 配置的表单字段校验规则集合
        }
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
        { label: this.$t('customer.customerCode'), value: 'customerCode', type: 'input' },
        { label: this.$t('customer.customerName'), value: 'customerName', type: 'input' },
        { label: this.$t('customer.ownerName'), value: 'ownerName', type: 'slot' },
        { label: this.$t('customer.origCode'), value: 'origCode', type: 'input' },
        { label: this.$t('customer.shortName'), value: 'shortName', type: 'input' },
        { label: this.$t('customer.origSys'), value: 'origSys', type: 'select', list: 'origSysList' },
        { label: this.$t('customer.mnemonicCode'), value: 'mnemonicCode', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }
      ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        /* {prop:"companyCode", label:this.$t('customer.companyCode'), minWidth:100},*/
        { prop: 'customerCode', label: this.$t('customer.customerCode'), minWidth: 100 },
        { prop: 'customerName', label: this.$t('customer.customerName'), minWidth: 100 },
        { prop: 'origCode', label: this.$t('customer.origCode'), minWidth: 100 },
        { prop: 'shortName', label: this.$t('customer.shortName'), minWidth: 100 },
        { prop: 'origSysName', label: this.$t('customer.origSys'), minWidth: 100 },
        { prop: 'mnemonicCode', label: this.$t('customer.mnemonicCode'), minWidth: 100 },
        { prop: 'paymentPeriodName', label: this.$t('customer.paymentPeriod'), minWidth: 100 },
        { prop: 'paymentMethodName', label: this.$t('customer.paymentMethod'), minWidth: 100 },
        { prop: 'contactName', label: this.$t('customer.contactName'), minWidth: 100 },
        { prop: 'contactTel', label: this.$t('customer.contactTel'), minWidth: 100 },
        { prop: 'contactPhone', label: this.$t('customer.contactPhone'), minWidth: 100 },
        { prop: 'contactFax', label: this.$t('customer.contactFax'), minWidth: 100 },
        { prop: 'contactMailbox', label: this.$t('customer.contactMailbox'), minWidth: 100 },
        { prop: 'contactAddr', label: this.$t('customer.contactAddr'), minWidth: 100 },
        { prop: 'companyRegistTime', label: this.$t('customer.companyRegistTime'), minWidth: 100 },
        { prop: 'bankName', label: this.$t('customer.bankName'), minWidth: 100 },
        { prop: 'bankAccount', label: this.$t('customer.bankAccount'), minWidth: 100 },
        { prop: 'creditLimit', label: this.$t('customer.creditLimit'), minWidth: 100 },
        { prop: 'invoiceTypeName', label: this.$t('customer.invoiceType'), minWidth: 100 },
        { prop: 'invoiceTitle', label: this.$t('customer.invoiceTitle'), minWidth: 100 },
        { prop: 'taxIdNum', label: this.$t('customer.taxIdNum'), minWidth: 100 },
        { prop: 'taxTypeName', label: this.$t('customer.taxType'), minWidth: 100 },
        { prop: 'orderCycle', label: this.$t('customer.orderCycle'), minWidth: 100 },
        { prop: 'countryName', label: this.$t('customer.country'), minWidth: 100 },
        { prop: 'provinceName', label: this.$t('customer.provinceId'), minWidth: 100 },
        { prop: 'cityName', label: this.$t('customer.cityId'), minWidth: 100 },
        { prop: 'areaName', label: this.$t('customer.areaId'), minWidth: 100 },
        { prop: 'creator', label: this.$t('customer.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('customer.createTime'), minWidth: 100 },
        { prop: 'updater', label: this.$t('customer.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('customer.updateTime'), minWidth: 100 },
        { prop: 'isEnableName', label: this.$t('customer.isEnable'), minWidth: 100 },
        { prop: 'remark', label: this.$t('customer.remark'), minWidth: 100 },
        { label: '操作', value: 'status', width: 220, type: 'slot', fixed: 'right' } // value: 'status' 对应页面上 自定义插槽的名字v-slot:col-status
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('customer.customerCode'), value: 'customerCode', type: 'input', readonly: true },
        { label: this.$t('customer.customerName'), value: 'customerName', type: 'input', readonly: true },
        { label: this.$t('customer.ownerName'), value: 'ownerName', type: 'input', readonly: true },
        { label: this.$t('customer.origCode'), value: 'origCode', type: 'input', readonly: true },
        { label: this.$t('customer.shortName'), value: 'shortName', type: 'input', readonly: true },
        { label: this.$t('customer.origSys'), value: 'origSys', type: 'select', list: 'origSysList', disabled: true },
        { label: this.$t('customer.mnemonicCode'), value: 'mnemonicCode', type: 'input', readonly: true },
        { label: this.$t('customer.paymentPeriod'), value: 'paymentPeriod', type: 'select', list: 'paymentPeriodList', disabled: true },
        { label: this.$t('customer.paymentMethod'), value: 'paymentMethod', type: 'select', list: 'paymentMethodList', disabled: true },
        { label: this.$t('customer.contactName'), value: 'contactName', type: 'input', readonly: true },
        { label: this.$t('customer.contactTel'), value: 'contactTel', type: 'input', readonly: true },
        { label: this.$t('customer.contactPhone'), value: 'contactPhone', type: 'input', readonly: true },
        { label: this.$t('customer.contactFax'), value: 'contactFax', type: 'input', readonly: true },
        { label: this.$t('customer.contactMailbox'), value: 'contactMailbox', type: 'input', readonly: true },
        { label: this.$t('customer.contactAddr'), value: 'contactAddr', type: 'input', readonly: true },
        { label: this.$t('customer.companyRegistTime'), value: 'companyRegistTime', type: 'input', readonly: true },
        { label: this.$t('customer.bankName'), value: 'bankName', type: 'input', readonly: true },
        { label: this.$t('customer.bankAccount'), value: 'bankAccount', type: 'input', readonly: true },
        { label: this.$t('customer.creditLimit'), value: 'creditLimit', type: 'input', readonly: true },
        { label: this.$t('customer.invoiceType'), value: 'invoiceType', type: 'select', list: 'invoiceTypeList', disabled: true },
        { label: this.$t('customer.invoiceTitle'), value: 'invoiceTitle', type: 'input', readonly: true },
        { label: this.$t('customer.taxIdNum'), value: 'taxIdNum', type: 'input', readonly: true },
        { label: this.$t('customer.taxType'), value: 'taxType', type: 'select', list: 'taxTypeList', disabled: true },
        { label: this.$t('customer.orderCycle'), value: 'orderCycle', type: 'input', readonly: true },
        { label: this.$t('customer.country'), value: 'country', type: 'select', list: 'countryList', disabled: true },
        { label: this.$t('customer.provinceId'), value: 'provinceId', type: 'slot', disabled: true },
        { label: this.$t('customer.cityId'), value: 'cityId', type: 'slot', disabled: true },
        { label: this.$t('customer.areaId'), value: 'areaId', type: 'slot', disabled: true },
        { label: this.$t('customer.isEnable'), value: 'isEnable', type: 'select', list: 'isEnableList', disabled: true },
        { label: this.$t('customer.remark'), value: 'remark', type: 'input', readonly: true }
      ]

      this.diaFormInfo.diaFormInfoControl.fieldList = [
        { label: '', value: 'checkBoxGroup1', type: 'slot' }
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
        { label: this.$t('customer.customerCode'), value: 'customerCode', type: 'input' },
        { label: this.$t('customer.customerName'), value: 'customerName', type: 'input' },
        { label: this.$t('customer.ownerName'), value: 'ownerName', type: 'slot' },
        { label: this.$t('customer.origCode'), value: 'origCode', type: 'input' },
        { label: this.$t('customer.shortName'), value: 'shortName', type: 'input' },
        { label: this.$t('customer.origSys'), value: 'origSys', type: 'select', list: 'origSysList' },
        { label: this.$t('customer.mnemonicCode'), value: 'mnemonicCode', type: 'input' },
        { label: this.$t('customer.paymentPeriod'), value: 'paymentPeriod', type: 'select', list: 'paymentPeriodList' },
        { label: this.$t('customer.paymentMethod'), value: 'paymentMethod', type: 'select', list: 'paymentMethodList' },
        { label: this.$t('customer.contactName'), value: 'contactName', type: 'input' },
        { label: this.$t('customer.contactTel'), value: 'contactTel', type: 'input' },
        { label: this.$t('customer.contactPhone'), value: 'contactPhone', type: 'input' },
        { label: this.$t('customer.contactFax'), value: 'contactFax', type: 'input' },
        { label: this.$t('customer.contactMailbox'), value: 'contactMailbox', type: 'input' },
        { label: this.$t('customer.contactAddr'), value: 'contactAddr', type: 'input' },
        { label: this.$t('customer.companyRegistTime'), value: 'companyRegistTime', type: 'date' },
        { label: this.$t('customer.bankName'), value: 'bankName', type: 'input' },
        { label: this.$t('customer.bankAccount'), value: 'bankAccount', type: 'input' },
        { label: this.$t('customer.creditLimit'), value: 'creditLimit', type: 'input' },
        { label: this.$t('customer.invoiceType'), value: 'invoiceType', type: 'select', list: 'invoiceTypeList' },
        { label: this.$t('customer.invoiceTitle'), value: 'invoiceTitle', type: 'input' },
        { label: this.$t('customer.taxIdNum'), value: 'taxIdNum', type: 'input' },
        { label: this.$t('customer.taxType'), value: 'taxType', type: 'select', list: 'taxTypeList' },
        { label: this.$t('customer.orderCycle'), value: 'orderCycle', type: 'input' },
        { label: this.$t('customer.country'), value: 'country', type: 'select', list: 'countryList' },
        { label: this.$t('customer.provinceId'), value: 'provinceId', type: 'slot' },
        { label: this.$t('customer.cityId'), value: 'cityId', type: 'slot' },
        { label: this.$t('customer.areaId'), value: 'areaId', type: 'slot' },
        { label: this.$t('customer.isEnable'), value: 'isEnable', type: 'select', list: 'isEnableList', clearable: false },
        { label: this.$t('customer.remark'), value: 'remark', type: 'input' }
      ]

      this.diaFormInfo.diaFormInfoControl.fieldList = [
        { label: '', value: 'checkBoxGroup1', type: 'slot' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('customer.customerCode'), value: 'customerCode', type: 'input', readonly: true },
        { label: this.$t('customer.customerName'), value: 'customerName', type: 'input' },
        { label: this.$t('customer.ownerName'), value: 'ownerName', type: 'slot' },
        { label: this.$t('customer.origCode'), value: 'origCode', type: 'input', readonly: true },
        { label: this.$t('customer.shortName'), value: 'shortName', type: 'input' },
        { label: this.$t('customer.origSys'), value: 'origSys', type: 'select', list: 'origSysList' },
        { label: this.$t('customer.mnemonicCode'), value: 'mnemonicCode', type: 'input' },
        { label: this.$t('customer.paymentPeriod'), value: 'paymentPeriod', type: 'select', list: 'paymentPeriodList' },
        { label: this.$t('customer.paymentMethod'), value: 'paymentMethod', type: 'select', list: 'paymentMethodList' },
        { label: this.$t('customer.contactName'), value: 'contactName', type: 'input' },
        { label: this.$t('customer.contactTel'), value: 'contactTel', type: 'input' },
        { label: this.$t('customer.contactPhone'), value: 'contactPhone', type: 'input' },
        { label: this.$t('customer.contactFax'), value: 'contactFax', type: 'input' },
        { label: this.$t('customer.contactMailbox'), value: 'contactMailbox', type: 'input' },
        { label: this.$t('customer.contactAddr'), value: 'contactAddr', type: 'input' },
        { label: this.$t('customer.companyRegistTime'), value: 'companyRegistTime', type: 'date' },
        { label: this.$t('customer.bankName'), value: 'bankName', type: 'input' },
        { label: this.$t('customer.bankAccount'), value: 'bankAccount', type: 'input' },
        { label: this.$t('customer.creditLimit'), value: 'creditLimit', type: 'input' },
        { label: this.$t('customer.invoiceType'), value: 'invoiceType', type: 'select', list: 'invoiceTypeList' },
        { label: this.$t('customer.invoiceTitle'), value: 'invoiceTitle', type: 'input' },
        { label: this.$t('customer.taxIdNum'), value: 'taxIdNum', type: 'input' },
        { label: this.$t('customer.taxType'), value: 'taxType', type: 'select', list: 'taxTypeList' },
        { label: this.$t('customer.orderCycle'), value: 'orderCycle', type: 'input' },
        { label: this.$t('customer.country'), value: 'country', type: 'select', list: 'countryList' },
        { label: this.$t('customer.provinceId'), value: 'provinceId', type: 'slot' },
        { label: this.$t('customer.cityId'), value: 'cityId', type: 'slot' },
        { label: this.$t('customer.areaId'), value: 'areaId', type: 'slot' },
        { label: this.$t('customer.isEnable'), value: 'isEnable', type: 'select', list: 'isEnableList', clearable: false },
        { label: this.$t('customer.remark'), value: 'remark', type: 'input' }
      ]

      this.diaFormInfo.diaFormInfoControl.fieldList = [
        { label: '', value: 'checkBoxGroup1', type: 'slot' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        country: [{ required: true, message: this.$t('customer.msg.country'), trigger: 'blur' }],
        isEnable: [{ required: true, message: this.$t('customer.msg.isEnable'), trigger: 'blur' }],
        contactName: [{ required: true, message: this.$t('customer.msg.contactName'), trigger: 'blur' }],
        contactTel: [{ required: true, message: this.$t('customer.msg.contactTel'), trigger: 'blur' }],
        origSys: [{ required: true, message: this.$t('customer.msg.origSys'), trigger: 'blur' }],
        contactAddr: [{ required: true, message: this.$t('customer.msg.contactAddr'), trigger: 'blur' }],
        customerCode: [{ required: true, message: this.$t('customer.msg.customerCode'), trigger: 'blur' }],
        customerName: [{ required: true, message: this.$t('customer.msg.customerName'), trigger: 'blur' }],
        ownerName: [{ required: true, message: this.$t('customer.msg.ownerName'), trigger: 'blur' }]
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
        customerCode: null,
        paymentMethod: null,
        bankAccount: null,
        contactName: null,
        companyRegistTime: null,
        contactMailbox: null,
        taxType: null,
        provinceId: null,
        shortName: null,
        customerName: null,
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
