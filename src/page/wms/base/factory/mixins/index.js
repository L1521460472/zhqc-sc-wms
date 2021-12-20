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
          companyCode: null,
          factoryCode: null,
          shortName: null,
          factoryName: null,
          origCode: null,
          factoryNature: null,
          factoryType: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        countryList: [],
        factoryTypeList: [],
        factoryNatureList: [],
        isEnableList: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '210', // 默认操作按钮列宽度
          btList: [// 添加操作按钮
            // 默认查看按钮
            { label: this.$t('table.view'), type: 'primary', icon: '', event: 'openViewPage', show: true, disabled: this.$hasPerm('view') }, // event值为notification.js中定义的方法名
            // 默认修改按钮
            { label: this.$t('table.edit'), type: 'success', icon: '', event: 'openEditPage', show: true, disabled: this.$hasPerm('edit') }, // event值为notification.js中定义的方法名
            // 默认删除按钮
            // {label:this.$t('table.delete'), type: 'danger', icon: '', event: 'deleteData', show: true,disabled:this.$hasPerm('delete')},//event值为notification.js中定义的方法名
            // 自定义按钮
            { slot: true, icon: '', event: 'slotEvent' }
          ]
        }
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
        // {label: this.$t('factory.companyCode'), value: "companyCode", type: "input"},
        { label: this.$t('factory.factoryCode'), value: 'factoryCode', type: 'input' },
        { label: this.$t('factory.shortName'), value: 'shortName', type: 'input' },
        { label: this.$t('factory.origCode'), value: 'origCode', type: 'input' },
        { label: this.$t('factory.isEnable'), value: 'isEnable', type: 'select', list: 'isEnableList' },
        { label: '', value: 'sys', type: 'slot' }
      ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'factoryCode', label: this.$t('factory.factoryCode'), minWidth: 100 },
        { prop: 'factoryName', label: this.$t('factory.factoryName'), minWidth: 100 },
        { prop: 'shortName', label: this.$t('factory.shortName'), minWidth: 100 },
        { prop: 'origCode', label: this.$t('factory.origCode'), minWidth: 100 },
        { prop: 'factoryNatureName', label: this.$t('factory.factoryNature'), minWidth: 100 },
        { prop: 'factoryTypeName', label: this.$t('factory.factoryType'), minWidth: 100 },
        // {prop:"countryName", label:this.$t('factory.country'), minWidth:100},
        { prop: 'provinceName', label: this.$t('factory.provinceId'), minWidth: 100 },
        { prop: 'cityName', label: this.$t('factory.cityId'), minWidth: 100 },
        { prop: 'areaName', label: this.$t('factory.areaId'), minWidth: 100 },
        { prop: 'contactAddr', label: this.$t('factory.contactAddr'), minWidth: 100 },
        { prop: 'contactName', label: this.$t('factory.contactName'), minWidth: 100 },
        { prop: 'contactTel', label: this.$t('factory.contactTel'), minWidth: 100 },
        // {prop:"creator", label:this.$t('factory.creator'), minWidth:100},
        // {prop:"createTime", label:this.$t('factory.createTime'), minWidth:100},
        // {prop:"updater", label:this.$t('factory.updater'), minWidth:100},
        // {prop:"updateTime", label:this.$t('factory.updateTime'), minWidth:100},
        { prop: 'remark', label: this.$t('factory.remark'), minWidth: 100 },
        { prop: 'isEnableName', label: this.$t('factory.isEnable'), minWidth: 80 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('factory.factoryCode'), value: 'factoryCode', type: 'input', disabled: true },
        { label: this.$t('factory.factoryName'), value: 'factoryName', type: 'input', disabled: true },
        { label: this.$t('factory.shortName'), value: 'shortName', type: 'input', disabled: true },
        { label: this.$t('factory.origCode'), value: 'origCode', type: 'input', disabled: true },
        { label: this.$t('factory.factoryNature'), value: 'factoryNature', type: 'select', list: 'factoryNatureList', disabled: true },
        { label: this.$t('factory.factoryType'), value: 'factoryType', type: 'select', list: 'factoryTypeList', disabled: true },
        // {label: this.$t('factory.country'), value: "country", type: "select",list: 'countryList',disabled:true},
        { label: this.$t('factory.provinceId'), value: 'provinceId', type: 'slot', disabled: true },
        { label: this.$t('factory.cityId'), value: 'cityId', type: 'slot', disabled: true },
        { label: this.$t('factory.areaId'), value: 'areaId', type: 'slot', disabled: true },
        { label: this.$t('factory.contactAddr'), value: 'contactAddr', type: 'input', disabled: true },
        { label: this.$t('factory.contactName'), value: 'contactName', type: 'input', disabled: true },
        { label: this.$t('factory.contactTel'), value: 'contactTel', type: 'input', disabled: true },
        { label: this.$t('factory.remark'), value: 'remark', type: 'input', disabled: true },
        { label: this.$t('factory.isEnable'), value: 'isEnable', type: 'select', list: 'isEnableList', disabled: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      // this.diaFormInfo.data = {
      //   country: this.listTypeInfo.countryList.length == 0 ? null:this.listTypeInfo.countryList[0].value,
      //   isEnable: this.listTypeInfo.isEnableList.length == 0 ? null:this.listTypeInfo.isEnableList[1].value,
      // };
      this.diaFormInfo.fieldList = [
        // {label: this.$t('factory.companyCode'), value: "companyCode", type: "input"},
        { label: this.$t('factory.factoryCode'), value: 'factoryCode', type: 'input' },
        { label: this.$t('factory.factoryName'), value: 'factoryName', type: 'input' },
        { label: this.$t('factory.shortName'), value: 'shortName', type: 'input' },
        { label: this.$t('factory.origCode'), value: 'origCode', type: 'input' },
        { label: this.$t('factory.factoryNature'), value: 'factoryNature', type: 'select', list: 'factoryNatureList' },
        { label: this.$t('factory.factoryType'), value: 'factoryType', type: 'select', list: 'factoryTypeList' },
        // {label: this.$t('factory.country'), value: "country", type: "select",list: 'countryList'},
        { label: this.$t('factory.provinceId'), value: 'provinceId', type: 'slot' },
        { label: this.$t('factory.cityId'), value: 'cityId', type: 'slot' },
        { label: this.$t('factory.areaId'), value: 'areaId', type: 'slot' },
        { label: this.$t('factory.contactAddr'), value: 'contactAddr', type: 'input' },
        { label: this.$t('factory.contactName'), value: 'contactName', type: 'input' },
        { label: this.$t('factory.contactTel'), value: 'contactTel', type: 'input' },
        { label: this.$t('factory.remark'), value: 'remark', type: 'input' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('factory.factoryCode'), value: 'factoryCode', type: 'input', disabled: true },
        { label: this.$t('factory.factoryName'), value: 'factoryName', type: 'input' },
        { label: this.$t('factory.shortName'), value: 'shortName', type: 'input' },
        { label: this.$t('factory.origCode'), value: 'origCode', type: 'input' },
        { label: this.$t('factory.factoryNature'), value: 'factoryNature', type: 'select', list: 'factoryNatureList' },
        { label: this.$t('factory.factoryType'), value: 'factoryType', type: 'select', list: 'factoryTypeList' },
        // {label: this.$t('factory.country'), value: "country", type: "select",list: 'countryList'},
        { label: this.$t('factory.provinceId'), value: 'provinceId', type: 'slot' },
        { label: this.$t('factory.cityId'), value: 'cityId', type: 'slot' },
        { label: this.$t('factory.areaId'), value: 'areaId', type: 'slot' },
        { label: this.$t('factory.contactAddr'), value: 'contactAddr', type: 'input' },
        { label: this.$t('factory.contactName'), value: 'contactName', type: 'input' },
        { label: this.$t('factory.contactTel'), value: 'contactTel', type: 'input' },
        { label: this.$t('factory.remark'), value: 'remark', type: 'input' },
        { label: this.$t('factory.isEnable'), value: 'isEnable', type: 'select', list: 'isEnableList' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        factoryCode: [{ required: true, message: this.$t('factory.msg.factoryCode'), trigger: 'blur' }],
        factoryName: [{ required: true, message: this.$t('factory.msg.factoryName'), trigger: 'blur' }],
        shortName: [{ required: true, message: this.$t('factory.msg.shortName'), trigger: 'blur' }],
        factoryType: [{ required: true, message: this.$t('factory.msg.factoryType'), trigger: 'blur' }],
        factoryNature: [{ required: true, message: this.$t('factory.msg.factoryNature'), trigger: 'blur' }],
        provinceId: [{ required: true, message: this.$t('factory.msg.provinceId'), trigger: 'blur' }],
        cityId: [{ required: true, message: this.$t('factory.msg.cityId'), trigger: 'blur' }],
        areaId: [{ required: true, message: this.$t('factory.msg.areaId'), trigger: 'blur' }],
        contactAddr: [{ required: true, message: this.$t('factory.msg.contactAddr'), trigger: 'blur' }],
        contactName: [{ required: true, message: this.$t('factory.msg.contactName'), trigger: 'blur' }],
        contactTel: [{ required: true, message: this.$t('factory.msg.contactTel'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        country: null,
        factoryType: null,
        contactName: null,
        factoryCode: null,
        contactTel: null,
        factoryName: null,
        areaId: null,
        origCode: null,
        contactAddr: null,
        factoryNature: null,
        provinceId: null,
        companyCode: null,
        shortName: null,
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
