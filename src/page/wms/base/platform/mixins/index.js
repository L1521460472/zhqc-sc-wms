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
          platformCode: null,
          platformName: null,
          platformType: null,
          isEnable: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        platformTypeList: [],
        enableList: []
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
        { label: this.$t('platform.platformCode'), value: 'platformCode', type: 'input' },
        { label: this.$t('platform.platformName'), value: 'platformName', type: 'input' },
        { label: this.$t('platform.platformType'), value: 'platformType', type: 'select', list: 'platformTypeList' },
        { label: this.$t('platform.isEnable'), value: 'isEnable', type: 'select', list: 'enableList' },
        { label: '', value: 'sys', type: 'slot' }
      ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'platformCode', label: this.$t('platform.platformCode'), minWidth: 100 },
        { prop: 'platformName', label: this.$t('platform.platformName'), minWidth: 100 },
        { prop: 'platformTypeName', label: this.$t('platform.platformType'), minWidth: 100 },
        { prop: 'isEnableName', label: this.$t('platform.isEnable'), minWidth: 100 },
        { prop: 'remark', label: this.$t('platform.remark'), minWidth: 100 },
        { label: '操作', value: 'status', width: 280, type: 'slot', fixed: 'right' } // value: 'status' 对应页面上 自定义插槽的名字v-slot:col-status
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('platform.platformCode'), value: 'platformCode', type: 'input', disabled: true },
        { label: this.$t('platform.platformName'), value: 'platformName', type: 'input', disabled: true },
        { label: this.$t('platform.platformType'), value: 'platformType', type: 'select', list: 'platformTypeList', disabled: true },
        { label: this.$t('platform.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', disabled: true },
        { label: this.$t('platform.remark'), value: 'remark', type: 'textarea', disabled: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.data = {
        platformType: this.listTypeInfo.platformTypeList.length == 0 ? null : this.listTypeInfo.platformTypeList[0].value,
        isEnable: this.listTypeInfo.enableList.length == 0 ? null : this.listTypeInfo.enableList[1].value
      }

      this.diaFormInfo.fieldList = [
        { label: this.$t('platform.platformCode'), value: 'platformCode', type: 'input' },
        { label: this.$t('platform.platformName'), value: 'platformName', type: 'input' },
        { label: this.$t('platform.platformType'), value: 'platformType', type: 'select', list: 'platformTypeList', clearable: false },
        { label: this.$t('platform.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', clearable: false },
        { label: this.$t('platform.remark'), value: 'remark', type: 'textarea' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('platform.platformCode'), value: 'platformCode', type: 'input', disabled: true },
        { label: this.$t('platform.platformName'), value: 'platformName', type: 'input' },
        { label: this.$t('platform.platformType'), value: 'platformType', type: 'select', list: 'platformTypeList', clearable: false },
        { label: this.$t('platform.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', clearable: false },
        { label: this.$t('platform.remark'), value: 'remark', type: 'textarea' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        platformCode: [{ required: true, message: this.$t('platform.msg.platformCode'), trigger: 'blur' }],
        isEnable: [{ required: true, message: this.$t('platform.msg.isEnable'), trigger: 'blur' }],
        platformType: [{ required: true, message: this.$t('platform.msg.platformType'), trigger: 'blur' }],
        platformName: [{ required: true, message: this.$t('platform.msg.platformName'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        platformCode: null,
        isEnable: null,
        platformType: null,
        platformName: null,
        remark: null,
        id: null
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
