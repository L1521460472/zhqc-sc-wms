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
          qcRuleCode: null,
          qcRuleName: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        isEnableList: [
        ],
        isDefaultList: [
        ],
        qcModeList: [
        ]
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
        { label: this.$t('qcRule.qcRuleCode'), value: 'qcRuleCode', type: 'input' },
        { label: this.$t('qcRule.qcRuleName'), value: 'qcRuleName', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }
      ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'qcRuleCode', label: this.$t('qcRule.qcRuleCode'), minWidth: 100 },
        { prop: 'qcRuleName', label: this.$t('qcRule.qcRuleName'), minWidth: 100 },
        { prop: 'qcModeName', label: this.$t('qcRule.qcMode'), minWidth: 100 },
        { prop: 'checkRatio', label: this.$t('qcRule.checkRatio'), minWidth: 100 },
        { prop: 'isDefaultName', label: this.$t('qcRule.isDefault'), minWidth: 100 },
        { prop: 'isEnableName', label: this.$t('qcRule.isEnable'), minWidth: 100 },
        { prop: 'remark', label: this.$t('qcRule.remark'), minWidth: 100 },
        { prop: 'creator', label: this.$t('qcRule.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('qcRule.createTime'), minWidth: 100 },
        { prop: 'updater', label: this.$t('qcRule.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('qcRule.updateTime'), minWidth: 100 },
        { label: '操作', value: 'status', width: 230, type: 'slot', fixed: 'right' } // value: 'status' 对应页面上 自定义插槽的名字v-slot:col-status
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('qcRule.qcRuleCode'), value: 'qcRuleCode', type: 'input', readonly: true },
        { label: this.$t('qcRule.qcRuleName'), value: 'qcRuleName', type: 'input', readonly: true },
        { label: this.$t('qcRule.qcMode'), value: 'qcMode', type: 'select', list: 'qcModeList', disabled: true },
        { label: this.$t('qcRule.checkRatio'), value: 'checkRatio', type: 'input', readonly: true },
        { label: this.$t('qcRule.isDefault'), value: 'isDefault', type: 'select', list: 'isDefaultList', disabled: true },
        { label: this.$t('qcRule.isEnable'), value: 'isEnable', type: 'select', list: 'isEnableList', disabled: true },
        { label: this.$t('qcRule.remark'), value: 'remark', type: 'input', readonly: true },
        { label: this.$t('qcRule.creator'), value: 'creator', type: 'input', readonly: true },
        { label: this.$t('qcRule.createTime'), value: 'createTime', type: 'input', readonly: true },
        { label: this.$t('qcRule.updater'), value: 'updater', type: 'input', readonly: true },
        { label: this.$t('qcRule.updateTime'), value: 'updateTime', type: 'input', readonly: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.data = {
        isProductionBatch: this.listTypeInfo.qcModeList.length == 0 ? null : this.listTypeInfo.qcModeList[2].value,
        isEnable: this.listTypeInfo.isEnableList.length == 0 ? null : this.listTypeInfo.isEnableList[1].value,
        isDefault: this.listTypeInfo.isDefaultList.length == 0 ? null : this.listTypeInfo.isDefaultList[0].value
      }
      this.diaFormInfo.fieldList = [
        { label: this.$t('qcRule.qcRuleCode'), value: 'qcRuleCode', type: 'input' },
        { label: this.$t('qcRule.qcRuleName'), value: 'qcRuleName', type: 'input' },
        { label: this.$t('qcRule.qcMode'), value: 'qcMode', type: 'select', list: 'qcModeList', event: 'handleQcModel' },
        { label: this.$t('qcRule.checkRatio'), value: 'checkRatio', type: 'input', disabled: true },
        { label: this.$t('qcRule.isDefault'), value: 'isDefault', type: 'select', list: 'isDefaultList' },
        { label: this.$t('qcRule.isEnable'), value: 'isEnable', type: 'select', list: 'isEnableList' },
        { label: this.$t('qcRule.remark'), value: 'remark', type: 'input' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('qcRule.qcRuleCode'), value: 'qcRuleCode', type: 'input' },
        { label: this.$t('qcRule.qcRuleName'), value: 'qcRuleName', type: 'input' },
        { label: this.$t('qcRule.qcMode'), value: 'qcMode', type: 'select', list: 'qcModeList', event: 'handleQcModel' },
        { label: this.$t('qcRule.checkRatio'), value: 'checkRatio', type: 'input', disabled: true },
        { label: this.$t('qcRule.isDefault'), value: 'isDefault', type: 'select', list: 'isDefaultList' },
        { label: this.$t('qcRule.isEnable'), value: 'isEnable', type: 'select', list: 'isEnableList' },
        { label: this.$t('qcRule.remark'), value: 'remark', type: 'input' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        qcRuleCode: [{ required: true, message: this.$t('qcRule.msg.qcRuleCode'), trigger: 'blur' }],
        isEnable: [{ required: true, message: this.$t('qcRule.msg.isEnable'), trigger: 'blur' }],
        qcRuleName: [{ required: true, message: this.$t('qcRule.msg.qcRuleName'), trigger: 'blur' }],
        qcMode: [{ required: true, message: this.$t('qcRule.msg.qcMode'), trigger: 'blur' }],
        checkRatio: [{ required: true, validator: this.$valid.getIntegerValidator(), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        qcRuleCode: null,
        isEnable: null,
        qcRuleName: null,
        remark: null,
        isDefault: null,
        qcMode: null,
        checkRatio: null
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
