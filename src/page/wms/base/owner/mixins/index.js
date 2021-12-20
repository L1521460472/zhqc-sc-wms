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
          ownerCode: null,
          ownerShortName: null,
          ownerType: null,
          contactName: null,
          contactPhone: null,
          isEnable: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        enableList: [],
        ownerTypeList: [],
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
        provinceEx: null,
        cityEx: null,
        areaEx: null
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
        { label: this.$t('owner.ownerCode'), value: 'ownerCode', type: 'input' },
        { label: this.$t('owner.ownerShortName'), value: 'ownerShortName', type: 'input' },
        { label: this.$t('owner.ownerType'), value: 'ownerType', type: 'select', list: 'ownerTypeList' },
        { label: this.$t('owner.contactName'), value: 'contactName', type: 'input' },
        { label: this.$t('owner.contactPhone'), value: 'contactPhone', type: 'input' },
        { label: this.$t('owner.isEnable'), value: 'isEnable', type: 'select', list: 'enableList' },
        { label: '', value: 'sys', type: 'slot' }
      ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'ownerCode', label: this.$t('owner.ownerCode'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('owner.ownerName'), minWidth: 100 },
        { prop: 'ownerShortName', label: this.$t('owner.ownerShortName'), minWidth: 100 },
        { prop: 'ownerTypeName', label: this.$t('owner.ownerType'), minWidth: 100 },
        { prop: 'isEnableName', label: this.$t('owner.isEnable'), minWidth: 100 },
        { prop: 'countryName', label: this.$t('owner.country'), minWidth: 100 },
        { prop: 'provinceName', label: this.$t('owner.provinceId'), minWidth: 100 },
        { prop: 'cityName', label: this.$t('owner.cityId'), minWidth: 100 },
        { prop: 'areaName', label: this.$t('owner.areaId'), minWidth: 100 },
        { prop: 'contactAddr', label: this.$t('owner.contactAddr'), minWidth: 100 },
        { prop: 'contactName', label: this.$t('owner.contactName'), minWidth: 100 },
        { prop: 'contactTel', label: this.$t('owner.contactTel'), minWidth: 100 },
        { prop: 'contactPhone', label: this.$t('owner.contactPhone'), minWidth: 100 },
        { prop: 'contactFax', label: this.$t('owner.contactFax'), minWidth: 100 },
        { prop: 'contactMailbox', label: this.$t('owner.contactMailbox'), minWidth: 100 },
        { prop: 'postcode', label: this.$t('owner.postcode'), minWidth: 100 },
        { prop: 'taxpayerNum', label: this.$t('owner.taxpayerNum'), minWidth: 100 },
        { prop: 'openAccountBank', label: this.$t('owner.openAccountBank'), minWidth: 100 },
        { prop: 'bankAccount', label: this.$t('owner.bankAccount'), minWidth: 100 },
        { prop: 'remark', label: this.$t('owner.remark'), minWidth: 100 },
        { label: '操作', value: 'status', width: 220, type: 'slot', fixed: 'right' } // value: 'status' 对应页面上 自定义插槽的名字v-slot:col-status
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('owner.ownerCode'), value: 'ownerCode', type: 'input', readonly: true },
        { label: this.$t('owner.ownerName'), value: 'ownerName', type: 'input', readonly: true },
        { label: this.$t('owner.ownerShortName'), value: 'ownerShortName', type: 'input', readonly: true },
        { label: this.$t('owner.ownerType'), value: 'ownerType', type: 'select', list: 'ownerTypeList', disabled: true },
        { label: this.$t('owner.country'), value: 'country', type: 'select', list: 'countryList', disabled: true },
        { label: this.$t('owner.provinceId'), value: 'provinceId', type: 'slot', disabled: true },
        { label: this.$t('owner.cityId'), value: 'cityId', type: 'slot', disabled: true },
        { label: this.$t('owner.areaId'), value: 'areaId', type: 'slot', disabled: true },
        { label: this.$t('owner.contactAddr'), value: 'contactAddr', type: 'input', readonly: true },
        { label: this.$t('owner.contactName'), value: 'contactName', type: 'input', readonly: true },
        { label: this.$t('owner.contactTel'), value: 'contactTel', type: 'input', readonly: true },
        { label: this.$t('owner.contactPhone'), value: 'contactPhone', type: 'input', readonly: true },
        { label: this.$t('owner.contactFax'), value: 'contactFax', type: 'input', readonly: true },
        { label: this.$t('owner.contactMailbox'), value: 'contactMailbox', type: 'input', readonly: true },
        { label: this.$t('owner.postcode'), value: 'postcode', type: 'input', readonly: true },
        { label: this.$t('owner.taxpayerNum'), value: 'taxpayerNum', type: 'input', readonly: true },
        { label: this.$t('owner.openAccountBank'), value: 'openAccountBank', type: 'input', readonly: true },
        { label: this.$t('owner.bankAccount'), value: 'bankAccount', type: 'input', readonly: true },
        { label: this.$t('owner.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', disabled: true },
        { label: this.$t('owner.remark'), value: 'remark', type: 'textarea', disabled: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.data = {
        ownerType: this.listTypeInfo.ownerTypeList.length == 0 ? null : this.listTypeInfo.ownerTypeList[0].value,
        isEnable: this.listTypeInfo.enableList.length == 0 ? null : this.listTypeInfo.enableList[1].value,
        country: this.listTypeInfo.countryList.length == 0 ? null : this.listTypeInfo.countryList[0].value
      }

      this.diaFormInfo.fieldList = [
        { label: this.$t('owner.ownerCode'), value: 'ownerCode', type: 'input' },
        { label: this.$t('owner.ownerName'), value: 'ownerName', type: 'input' },
        { label: this.$t('owner.ownerShortName'), value: 'ownerShortName', type: 'input' },
        { label: this.$t('owner.ownerType'), value: 'ownerType', type: 'select', list: 'ownerTypeList', clearable: false },
        { label: this.$t('owner.country'), value: 'country', type: 'select', list: 'countryList', clearable: false },
        { label: this.$t('owner.provinceId'), value: 'provinceId', type: 'slot', clearable: false },
        { label: this.$t('owner.cityId'), value: 'cityId', type: 'slot', clearable: false },
        { label: this.$t('owner.areaId'), value: 'areaId', type: 'slot', clearable: false },
        { label: this.$t('owner.contactAddr'), value: 'contactAddr', type: 'input' },
        { label: this.$t('owner.contactName'), value: 'contactName', type: 'input' },
        { label: this.$t('owner.contactTel'), value: 'contactTel', type: 'input' },
        { label: this.$t('owner.contactPhone'), value: 'contactPhone', type: 'input' },
        { label: this.$t('owner.contactFax'), value: 'contactFax', type: 'input' },
        { label: this.$t('owner.contactMailbox'), value: 'contactMailbox', type: 'input' },
        { label: this.$t('owner.postcode'), value: 'postcode', type: 'input' },
        { label: this.$t('owner.taxpayerNum'), value: 'taxpayerNum', type: 'input' },
        { label: this.$t('owner.openAccountBank'), value: 'openAccountBank', type: 'input' },
        { label: this.$t('owner.bankAccount'), value: 'bankAccount', type: 'input' },
        { label: this.$t('owner.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', clearable: false },
        { label: this.$t('owner.remark'), value: 'remark', type: 'textarea' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('owner.ownerCode'), value: 'ownerCode', type: 'input', readonly: true },
        { label: this.$t('owner.ownerName'), value: 'ownerName', type: 'input' },
        { label: this.$t('owner.ownerShortName'), value: 'ownerShortName', type: 'input' },
        { label: this.$t('owner.ownerType'), value: 'ownerType', type: 'select', list: 'ownerTypeList', clearable: false },
        { label: this.$t('owner.country'), value: 'country', type: 'select', list: 'countryList', clearable: false },
        { label: this.$t('owner.provinceId'), value: 'provinceId', type: 'slot', clearable: false },
        { label: this.$t('owner.cityId'), value: 'cityId', type: 'slot', clearable: false },
        { label: this.$t('owner.areaId'), value: 'areaId', type: 'slot', clearable: false },
        { label: this.$t('owner.contactAddr'), value: 'contactAddr', type: 'input' },
        { label: this.$t('owner.contactName'), value: 'contactName', type: 'input' },
        { label: this.$t('owner.contactTel'), value: 'contactTel', type: 'input' },
        { label: this.$t('owner.contactPhone'), value: 'contactPhone', type: 'input' },
        { label: this.$t('owner.contactFax'), value: 'contactFax', type: 'input' },
        { label: this.$t('owner.contactMailbox'), value: 'contactMailbox', type: 'input' },
        { label: this.$t('owner.postcode'), value: 'postcode', type: 'input' },
        { label: this.$t('owner.taxpayerNum'), value: 'taxpayerNum', type: 'input' },
        { label: this.$t('owner.openAccountBank'), value: 'openAccountBank', type: 'input' },
        { label: this.$t('owner.bankAccount'), value: 'bankAccount', type: 'input' },
        { label: this.$t('owner.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', clearable: false },
        { label: this.$t('owner.remark'), value: 'remark', type: 'textarea' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        country: [{ required: true, message: this.$t('owner.msg.country'), trigger: 'blur' }],
        ownerName: [{ required: true, message: this.$t('owner.msg.ownerName'), trigger: 'blur' }],
        isEnable: [{ required: true, message: this.$t('owner.msg.isEnable'), trigger: 'blur' }],
        ownerCode: [{ required: true, message: this.$t('owner.msg.ownerCode'), trigger: 'blur' }],
        areaId: [{ required: true, message: this.$t('owner.msg.areaId'), trigger: 'blur' }],
        ownerShortName: [{ required: true, message: this.$t('owner.msg.ownerShortName'), trigger: 'blur' }],
        provinceId: [{ required: true, message: this.$t('owner.msg.provinceId'), trigger: 'blur' }],
        ownerType: [{ required: true, message: this.$t('owner.msg.ownerType'), trigger: 'blur' }],
        cityId: [{ required: true, message: this.$t('owner.msg.cityId'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        country: null,
        contactName: null,
        ownerName: null,
        contactPhone: null,
        taxpayerNum: null,
        isEnable: null,
        postcode: null,
        ownerCode: null,
        contactTel: null,
        contactFax: null,
        remark: null,
        areaId: null,
        contactMailbox: null,
        contactAddr: null,
        ownerShortName: null,
        provinceId: null,
        openAccountBank: null,
        id: null,
        ownerType: null,
        cityId: null,
        bankAccount: null
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
