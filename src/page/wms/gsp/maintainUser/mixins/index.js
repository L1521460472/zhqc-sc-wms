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
          maintainUser: null,
          maintainType: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        maintainTypeList: [],
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
        { label: this.$t('maintainUser.userNo'), value: 'maintainUser', type: 'input' },
        { label: this.$t('maintainUser.maintainType'), value: 'maintainType', type: 'select', list: 'maintainTypeList' },
        { label: '', value: 'sys', type: 'slot' }
      ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'maintainUser', label: this.$t('maintainUser.maintainUser'), minWidth: 100 },
        { prop: 'maintainUserName', label: this.$t('maintainUser.maintainUserName'), minWidth: 100 },
        { prop: 'maintainTypeName', label: this.$t('maintainUser.maintainType'), minWidth: 100 },
        { prop: 'isEnableName', label: this.$t('maintainUser.isEnable'), minWidth: 100 },
        { prop: 'remark', label: this.$t('maintainUser.remark'), minWidth: 100 },
        { label: '操作', value: 'status', width: 280, type: 'slot', fixed: 'right' } // value: 'status' 对应页面上 自定义插槽的名字v-slot:col-status
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('maintainUser.maintainUser'), value: 'maintainUser', type: 'input', disabled: true },
        { label: this.$t('maintainUser.maintainUserName'), value: 'maintainUserName', type: 'input', disabled: true },
        { label: this.$t('maintainUser.maintainType'), value: 'maintainTypeName', type: 'input', disabled: true },
        { label: this.$t('maintainUser.isEnable'), value: 'isEnableName', type: 'input', disabled: true },
        { label: this.$t('maintainUser.createName'), value: 'createName', type: 'input', disabled: true },
        { label: this.$t('maintainUser.createTime'), value: 'createTime', type: 'input', disabled: true },
        { label: this.$t('maintainUser.updateName'), value: 'updateName', type: 'input', disabled: true },
        { label: this.$t('maintainUser.updateTime'), value: 'updateTime', type: 'input', disabled: true },
        { label: this.$t('maintainUser.remark'), value: 'remark', type: 'input', disabled: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      // 设置默认值
      this.$set(this.diaFormInfo.data, 'maintainType', 'PT')
      this.$set(this.diaFormInfo.data, 'isEnable', 1)

      this.diaFormInfo.fieldList = [
        { label: this.$t('maintainUser.userNo'), value: 'userNo', type: 'slot' },
        { label: this.$t('maintainUser.maintainType'), value: 'maintainType', type: 'select', list: 'maintainTypeList', clearable: false },
        { label: this.$t('maintainUser.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', clearable: false },
        { label: this.$t('maintainUser.remark'), value: 'remark', type: 'textarea' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('maintainUser.userNo'), value: 'userNo', type: 'slot' },
        { label: this.$t('maintainUser.maintainType'), value: 'maintainType', type: 'select', list: 'maintainTypeList', clearable: false },
        { label: this.$t('maintainUser.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', clearable: false },
        { label: this.$t('maintainUser.remark'), value: 'remark', type: 'textarea' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        isEnable: [{ required: true, message: this.$t('maintainUser.msg.isEnable'), trigger: 'blur' }],
        maintainType: [{ required: true, message: this.$t('maintainUser.msg.maintainType'), trigger: 'blur' }],
        userNo: [{ required: true, message: this.$t('maintainUser.msg.userNo'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        creator: null,
        createTime: null,
        isEnable: null,
        remark: null,
        updateName: null,
        updater: null,
        maintainType: null,
        updateTime: null,
        whId: null,
        companyCode: null,
        maintainUser: null,
        id: null,
        maintainUserName: null,
        createName: null
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
