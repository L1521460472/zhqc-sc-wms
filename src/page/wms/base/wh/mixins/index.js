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
          whCode: null,
          whName: null,
          isEnable: null,
          whBusinessType: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        enableList: [],
        whTypeList: [],
        countryList: [],
        provinceList: [],
        cityList: [],
        areaList: [],
        whBusinessTypeList: []
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
        { label: this.$t('wh.whCode'), value: 'whCode', type: 'input' },
        { label: this.$t('wh.whName'), value: 'whName', type: 'input' },
        { label: this.$t('wh.whBusinessType'), value: 'whBusinessType', type: 'select', list: 'whBusinessTypeList' },
        { label: this.$t('wh.isEnable'), value: 'isEnable', type: 'select', list: 'enableList' },
        { label: '', value: 'sys', type: 'slot' }
      ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'whCode', label: this.$t('wh.whCode'), minWidth: 140 },
        { prop: 'whName', label: this.$t('wh.whName'), minWidth: 140 },
        { prop: 'whTypeName', label: this.$t('wh.whType'), minWidth: 100 },
        { prop: 'whBusinessTypeName', label: this.$t('wh.whBusinessType'), minWidth: 100 },
        { prop: 'carrierName', label: this.$t('wh.carrierName'), minWidth: 100 },
        { prop: 'provinceName', label: this.$t('wh.provinceId'), minWidth: 100 },
        { prop: 'cityName', label: this.$t('wh.cityId'), minWidth: 100 },
        { prop: 'areaName', label: this.$t('wh.areaId'), minWidth: 100 },
        { prop: 'contactAddr', label: this.$t('wh.contactAddr'), minWidth: 150 },
        { prop: 'contactName', label: this.$t('wh.contactName'), minWidth: 100 },
        { prop: 'contactPhone', label: this.$t('wh.contactPhone'), minWidth: 100 },
        { prop: 'remark', label: this.$t('wh.remark'), minWidth: 100 },
        { prop: 'isEnableName', label: this.$t('wh.isEnable'), minWidth: 100 },
        { label: '操作', value: 'status', width: 200, type: 'slot', fixed: 'right' } // value: 'status' 对应页面上 自定义插槽的名字v-slot:col-status
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('wh.whCode'), value: 'whCode', type: 'input', disabled: true },
        { label: this.$t('wh.whName'), value: 'whName', type: 'input', disabled: true },
        { label: this.$t('wh.whType'), value: 'whType', type: 'select', list: 'whTypeList', disabled: true },
        { label: this.$t('wh.whBusinessType'), value: 'whBusinessType', type: 'select', list: 'whBusinessTypeList', disabled: true },
        { label: this.$t('wh.carrierName'), value: 'carrierName', type: 'input', disabled: true },
        { label: this.$t('wh.provinceId'), value: 'provinceId', type: 'select', list: 'provinceList', disabled: true },
        { label: this.$t('wh.cityId'), value: 'cityId', type: 'select', list: 'cityList', disabled: true },
        { label: this.$t('wh.areaId'), value: 'areaId', type: 'select', list: 'areaList', disabled: true },
        { label: this.$t('wh.contactAddr'), value: 'contactAddr', type: 'input', disabled: true },
        { label: this.$t('wh.contactName'), value: 'contactName', type: 'input', disabled: true },
        { label: this.$t('wh.contactPhone'), value: 'contactPhone', type: 'input', disabled: true },
        { label: this.$t('wh.remark'), value: 'remark', type: 'textarea', disabled: true },
        { label: this.$t('wh.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', disabled: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.data = {
        whType: this.listTypeInfo.whTypeList.length == 0 ? null : this.listTypeInfo.whTypeList[0].value,
        isEnable: this.listTypeInfo.enableList.length == 0 ? null : this.listTypeInfo.enableList[1].value,
        country: this.listTypeInfo.countryList.length == 0 ? null : this.listTypeInfo.countryList[0].value
      }

      this.diaFormInfo.fieldList = [
        { label: this.$t('wh.whCode'), value: 'whCode', type: 'input' },
        { label: this.$t('wh.whName'), value: 'whName', type: 'input' },
        { label: this.$t('wh.whType'), value: 'whType', type: 'select', list: 'whTypeList', clearable: false },
        { label: this.$t('wh.whBusinessType'), value: 'whBusinessType', type: 'select', list: 'whBusinessTypeList', clearable: false },
        { label: this.$t('wh.carrierName'), value: 'carrierName', type: 'slot' },
        { label: this.$t('wh.provinceId'), value: 'provinceId', type: 'select', list: 'provinceList', clearable: false },
        { label: this.$t('wh.cityId'), value: 'cityId', type: 'select', list: 'cityList', clearable: false },
        { label: this.$t('wh.areaId'), value: 'areaId', type: 'select', list: 'areaList', clearable: false },
        { label: this.$t('wh.contactAddr'), value: 'contactAddr', type: 'input' },
        { label: this.$t('wh.contactName'), value: 'contactName', type: 'input' },
        { label: this.$t('wh.contactPhone'), value: 'contactPhone', type: 'input' },
        { label: this.$t('wh.remark'), value: 'remark', type: 'textarea' },
        { label: this.$t('wh.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', clearable: false }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('wh.whCode'), value: 'whCode', type: 'input', disabled: true },
        { label: this.$t('wh.whName'), value: 'whName', type: 'input' },
        { label: this.$t('wh.whType'), value: 'whType', type: 'select', list: 'whTypeList', clearable: false },
        { label: this.$t('wh.whBusinessType'), value: 'whBusinessType', type: 'select', list: 'whBusinessTypeList', clearable: false },
        { label: this.$t('wh.carrierName'), value: 'carrierName', type: 'slot' },
        { label: this.$t('wh.provinceId'), value: 'provinceId', type: 'select', list: 'provinceList', clearable: false },
        { label: this.$t('wh.cityId'), value: 'cityId', type: 'select', list: 'cityList', clearable: false },
        { label: this.$t('wh.areaId'), value: 'areaId', type: 'select', list: 'areaList', clearable: false },
        { label: this.$t('wh.contactAddr'), value: 'contactAddr', type: 'input' },
        { label: this.$t('wh.contactName'), value: 'contactName', type: 'input' },
        { label: this.$t('wh.contactPhone'), value: 'contactPhone', type: 'input' },
        { label: this.$t('wh.remark'), value: 'remark', type: 'textarea' },
        { label: this.$t('wh.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', clearable: false }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        whBusinessType: [{ required: true, message: this.$t('wh.msg.whBusinessType'), trigger: 'blur' }],
        whName: [{ required: true, message: this.$t('wh.msg.whName'), trigger: 'blur' }],
        whCode: [{ required: true, message: this.$t('wh.msg.whCode'), trigger: 'blur' }],
        whType: [{ required: true, message: this.$t('wh.msg.whType'), trigger: 'blur' }],
        isEnable: [{ required: true, message: this.$t('wh.msg.isEnable'), trigger: 'blur' }],
        provinceId: [{ required: true, message: this.$t('wh.msg.provinceId'), trigger: 'blur' }],
        cityId: [{ required: true, message: this.$t('wh.msg.cityId'), trigger: 'blur' }],
        areaId: [{ required: true, message: this.$t('wh.msg.areaId'), trigger: 'blur' }],
        carrierName: [{ required: true, message: this.$t('wh.msg.carrierName'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        contactName: null,
        contactPhone: null,
        isEnable: null,
        whType: null,
        acreage: null,
        contactTel: null,
        contactFax: null,
        remark: null,
        areaId: null,
        contactMailbox: null,
        whName: null,
        contactAddr: null,
        provinceId: null,
        companyCode: null,
        id: null,
        whCode: null,
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
