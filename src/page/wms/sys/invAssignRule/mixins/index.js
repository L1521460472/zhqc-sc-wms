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
          ruleName: null,
          ruleCode: null,
          assignMethod: null,
          isEnable: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        whetherList: [],
        enableList: [],
        assignMethodList: [],
        assignRuleList: [],
        ruleList: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '280', // 默认操作按钮列宽度
          btList: [// 添加操作按钮
            // 默认查看按钮
            { label: this.$t('table.view'), type: 'primary', icon: '', event: 'openViewPage', show: true, disabled: this.$hasPerm('view') }, // event值为notification.js中定义的方法名
            // 默认修改按钮
            { label: this.$t('table.edit'), type: 'success', icon: '', event: 'openEditPage', show: true, disabled: this.$hasPerm('edit') }, // event值为notification.js中定义的方法名
            // 默认删除按钮
            { label: this.$t('table.delete'), type: 'danger', icon: '', event: 'deleteData', show: true, disabled: this.$hasPerm('delete') }, // event值为notification.js中定义的方法名
            // 自定义按钮
            { slot: true, icon: '', event: 'slotEvent' }// event值为notification.js中定义的方法名
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
    this.resetFormData()
  },
  methods: {
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化top表单
      this.topForm.fieldList = [
        { label: this.$t('invAssignRule.ruleName'), value: 'ruleName', type: 'input' },
        { label: this.$t('invAssignRule.ruleCode'), value: 'ruleCode', type: 'input' },
        { label: this.$t('invAssignRule.assignMethod'), value: 'assignMethod', type: 'select', list: 'assignMethodList' },
        { label: this.$t('invAssignRule.isEnable'), value: 'isEnable', type: 'select', list: 'enableList' },
        { label: '', value: 'sys', type: 'slot' }
      ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'ruleCode', label: this.$t('invAssignRule.ruleCode'), minWidth: 100 },
        { prop: 'ruleName', label: this.$t('invAssignRule.ruleName'), minWidth: 100 },
        { prop: 'assignMethodName', label: this.$t('invAssignRule.assignMethod'), minWidth: 100 },
        { prop: 'assignRuleName', label: this.$t('invAssignRule.assignRule'), minWidth: 100 },
        { prop: 'isDisassembleUpName', label: this.$t('invAssignRule.isDisassembleUp'), minWidth: 100 },
        { prop: 'isDisassembleDownName', label: this.$t('invAssignRule.isDisassembleDown'), minWidth: 100 },
        { prop: 'isClearLotName', label: this.$t('invAssignRule.isClearLot'), minWidth: 100 },
        { prop: 'isDynamicPickLotName', label: this.$t('invAssignRule.isDynamicPickLot'), minWidth: 120 },
        { prop: 'isEnableName', label: this.$t('invAssignRule.isEnable'), minWidth: 100 },
        { prop: 'isDefaultName', label: this.$t('invAssignRule.isDefault'), minWidth: 100 },
        { prop: 'remark', label: this.$t('invAssignRule.remark'), minWidth: 100 },
        { prop: 'creatorName', label: this.$t('invAssignRule.creatorName'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('invAssignRule.createTime'), minWidth: 140 },
        { prop: 'updaterName', label: this.$t('invAssignRule.updaterName'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('invAssignRule.updateTime'), minWidth: 140 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('invAssignRule.ruleCode'), value: 'ruleCode', type: 'input', readonly: true },
        { label: this.$t('invAssignRule.ruleName'), value: 'ruleName', type: 'input', readonly: true },
        { label: this.$t('invAssignRule.assignMethod'), value: 'assignMethod', type: 'select', list: 'assignMethodList', disabled: true },
        { label: this.$t('invAssignRule.assignRule'), value: 'assignRule', type: 'select', list: 'assignRuleList', disabled: true },
        { label: this.$t('invAssignRule.isDisassembleUp'), value: 'isDisassembleUp', type: 'select', list: 'whetherList', disabled: true },
        { label: this.$t('invAssignRule.isDisassembleDown'), value: 'isDisassembleDown', type: 'select', list: 'whetherList', disabled: true },
        { label: this.$t('invAssignRule.isClearLot'), value: 'isClearLot', type: 'select', list: 'whetherList', disabled: true },
        { label: this.$t('invAssignRule.isDynamicPickLot'), value: 'isDynamicPickLot', type: 'select', list: 'whetherList', disabled: true },
        { label: this.$t('invAssignRule.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', disabled: true },
        { label: this.$t('invAssignRule.isDefault'), value: 'isDefault', type: 'select', list: 'whetherList', disabled: true },
        { label: this.$t('invAssignRule.remark'), value: 'remark', type: 'input', readonly: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('invAssignRule.ruleCode'), value: 'ruleCode', type: 'input' },
        { label: this.$t('invAssignRule.ruleName'), value: 'ruleName', type: 'input' },
        { label: this.$t('invAssignRule.assignMethod'), value: 'assignMethod', type: 'select', list: 'assignMethodList', event: 'handleAssignMethod', disabled: false },
        { label: this.$t('invAssignRule.assignRule'), value: 'assignRule', type: 'select', list: 'ruleList', disabled: false },
        { label: this.$t('invAssignRule.isDisassembleUp'), value: 'isDisassembleUp', type: 'select', list: 'whetherList', disabled: false },
        { label: this.$t('invAssignRule.isDisassembleDown'), value: 'isDisassembleDown', type: 'select', list: 'whetherList', disabled: false },
        { label: this.$t('invAssignRule.isClearLot'), value: 'isClearLot', type: 'select', list: 'whetherList', disabled: false },
        { label: this.$t('invAssignRule.isDynamicPickLot'), value: 'isDynamicPickLot', type: 'select', list: 'whetherList', disabled: false },
        { label: this.$t('invAssignRule.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', disabled: false },
        { label: this.$t('invAssignRule.isDefault'), value: 'isDefault', type: 'select', list: 'whetherList', disabled: false },
        { label: this.$t('invAssignRule.remark'), value: 'remark', type: 'input' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('invAssignRule.ruleCode'), value: 'ruleCode', type: 'input' },
        { label: this.$t('invAssignRule.ruleName'), value: 'ruleName', type: 'input' },
        { label: this.$t('invAssignRule.assignMethod'), value: 'assignMethod', type: 'select', list: 'assignMethodList', event: 'handleAssignMethod', disabled: false },
        { label: this.$t('invAssignRule.assignRule'), value: 'assignRule', type: 'select', list: 'ruleList', disabled: false },
        { label: this.$t('invAssignRule.isDisassembleUp'), value: 'isDisassembleUp', type: 'select', list: 'whetherList', disabled: false },
        { label: this.$t('invAssignRule.isDisassembleDown'), value: 'isDisassembleDown', type: 'select', list: 'whetherList', disabled: false },
        { label: this.$t('invAssignRule.isClearLot'), value: 'isClearLot', type: 'select', list: 'whetherList', disabled: false },
        { label: this.$t('invAssignRule.isDynamicPickLot'), value: 'isDynamicPickLot', type: 'select', list: 'whetherList', disabled: false },
        { label: this.$t('invAssignRule.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', disabled: false },
        { label: this.$t('invAssignRule.isDefault'), value: 'isDefault', type: 'select', list: 'whetherList', disabled: false },
        { label: this.$t('invAssignRule.remark'), value: 'remark', type: 'input' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        isDisassembleDown: [{ required: true, message: this.$t('invAssignRule.msg.isDisassembleDown'), trigger: 'blur' }],
        isClearLot: [{ required: true, message: this.$t('invAssignRule.msg.isClearLot'), trigger: 'blur' }],
        ruleName: [{ required: true, message: this.$t('invAssignRule.msg.ruleName'), trigger: 'blur' }],
        isDisassembleUp: [{ required: true, message: this.$t('invAssignRule.msg.isDisassembleUp'), trigger: 'blur' }],
        isEnable: [{ required: true, message: this.$t('invAssignRule.msg.isEnable'), trigger: 'blur' }],
        ruleCode: [{ required: true, message: this.$t('invAssignRule.msg.ruleCode'), trigger: 'blur' }],
        assignRule: [{ required: true, message: this.$t('invAssignRule.msg.assignRule'), trigger: 'blur' }],
        isDefault: [{ required: true, message: this.$t('invAssignRule.msg.isDefault'), trigger: 'blur' }],
        isDynamicPickLot: [{ required: true, message: this.$t('invAssignRule.msg.isDynamicPickLot'), trigger: 'blur' }],
        assignMethod: [{ required: true, message: this.$t('invAssignRule.msg.assignMethod'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        isDisassembleDown: 0,
        isClearLot: 0,
        ruleName: null,
        isDisassembleUp: 0,
        isEnable: 1,
        ruleCode: null,
        assignRule: null,
        remark: null,
        isDefault: 0,
        isDynamicPickLot: 0,
        assignMethod: null
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
