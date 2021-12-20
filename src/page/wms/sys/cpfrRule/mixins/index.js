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
          cpfrRuleCode: null,
          cpfrRuleName: null,
          isEnable: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        whetherList: [],
        enableList: [],
        paRuleList: []
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
        rules: {}, // 配置的表单字段校验规则集合
        labelWidth: '140px'// 默认表单字段label宽度
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
        { label: this.$t('cpfrRule.cpfrRuleCode'), value: 'cpfrRuleCode', type: 'input' },
        { label: this.$t('cpfrRule.cpfrRuleName'), value: 'cpfrRuleName', type: 'input' },
        { label: this.$t('cpfrRule.isEnable'), value: 'isEnable', type: 'select', list: 'enableList' },
        { label: '', value: 'sys', type: 'slot' }
      ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'cpfrRuleCode', label: this.$t('cpfrRule.cpfrRuleCode'), minWidth: 100 },
        { prop: 'cpfrRuleName', label: this.$t('cpfrRule.cpfrRuleName'), minWidth: 100 },
        { prop: 'isAssignName', label: this.$t('cpfrRule.isAssign'), minWidth: 100 },
        { prop: 'isInvWarnName', label: this.$t('cpfrRule.isInvWarn'), minWidth: 100 },
        { prop: 'isValidityWarnName', label: this.$t('cpfrRule.isValidityWarn'), minWidth: 120 },
        { prop: 'isEnableName', label: this.$t('cpfrRule.isEnable'), minWidth: 100 },
        { prop: 'isDefaultName', label: this.$t('cpfrRule.isDefault'), minWidth: 100 },
        { prop: 'remark', label: this.$t('cpfrRule.remark'), minWidth: 100 },
        { prop: 'creator', label: this.$t('cpfrRule.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('cpfrRule.createTime'), minWidth: 100 },
        { prop: 'updater', label: this.$t('cpfrRule.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('cpfrRule.updateTime'), minWidth: 100 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('cpfrRule.cpfrRuleCode'), value: 'cpfrRuleCode', type: 'input', disabled: true },
        { label: this.$t('cpfrRule.cpfrRuleName'), value: 'cpfrRuleName', type: 'input', disabled: true },
        { label: this.$t('cpfrRule.isAssign'), value: 'isAssign', type: 'select', list: 'whetherList', disabled: true },
        { label: this.$t('cpfrRule.isInvWarn'), value: 'isInvWarn', type: 'select', list: 'whetherList', disabled: true },
        { label: this.$t('cpfrRule.isValidityWarn'), value: 'isValidityWarn', type: 'select', list: 'whetherList', disabled: true },

        { label: this.$t('cpfrRule.paRuleId'), value: 'paRuleId', type: 'select', list: 'paRuleList', disabled: true },
        { label: this.$t('cpfrRule.maxDtQty'), value: 'maxDtQty', type: 'input', disabled: true },
        { label: this.$t('cpfrRule.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', disabled: true },
        { label: this.$t('cpfrRule.remark'), value: 'remark', type: 'input', disabled: true },
        { label: this.$t('cpfrRule.isDefault'), value: 'isDefault', type: 'select', list: 'whetherList', disabled: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('cpfrRule.cpfrRuleCode'), value: 'cpfrRuleCode', type: 'input' },
        { label: this.$t('cpfrRule.cpfrRuleName'), value: 'cpfrRuleName', type: 'input' },
        { label: this.$t('cpfrRule.isAssign'), value: 'isAssign', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('cpfrRule.isInvWarn'), value: 'isInvWarn', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('cpfrRule.isValidityWarn'), value: 'isValidityWarn', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('cpfrRule.paRuleId'), value: 'paRuleId', type: 'select', list: 'paRuleList' },
        { label: this.$t('cpfrRule.maxDtQty'), value: 'maxDtQty', type: 'input' },
        { label: this.$t('cpfrRule.isEnable'), value: 'isEnable', type: 'select', list: 'enableList' },
        { label: this.$t('cpfrRule.remark'), value: 'remark', type: 'input' },
        { label: this.$t('cpfrRule.isDefault'), value: 'isDefault', type: 'select', list: 'whetherList', clearable: false }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('cpfrRule.cpfrRuleCode'), value: 'cpfrRuleCode', type: 'input', disabled: true },
        { label: this.$t('cpfrRule.cpfrRuleName'), value: 'cpfrRuleName', type: 'input' },
        { label: this.$t('cpfrRule.isAssign'), value: 'isAssign', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('cpfrRule.isInvWarn'), value: 'isInvWarn', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('cpfrRule.isValidityWarn'), value: 'isValidityWarn', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('cpfrRule.paRuleId'), value: 'paRuleId', type: 'select', list: 'paRuleList' },
        { label: this.$t('cpfrRule.maxDtQty'), value: 'maxDtQty', type: 'input' },
        { label: this.$t('cpfrRule.isEnable'), value: 'isEnable', type: 'select', list: 'enableList' },
        { label: this.$t('cpfrRule.remark'), value: 'remark', type: 'input' },
        { label: this.$t('cpfrRule.isDefault'), value: 'isDefault', type: 'select', list: 'whetherList', clearable: false }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        cpfrRuleCode: [{ required: true, message: this.$t('cpfrRule.msg.cpfrRuleCode'), trigger: 'blur' }],
        cpfrRuleName: [{ required: true, message: this.$t('cpfrRule.msg.cpfrRuleName'), trigger: 'blur' }],
        isAssign: [{ required: true, message: this.$t('cpfrRule.msg.isAssign'), trigger: 'blur' }],
        isInvWarn: [{ required: true, message: this.$t('cpfrRule.msg.isInvWarn'), trigger: 'blur' }],
        isValidityWarn: [{ required: true, message: this.$t('cpfrRule.msg.isValidityWarn'), trigger: 'blur' }],
        isDefault: [{ required: true, message: this.$t('cpfrRule.msg.isDefault'), trigger: 'blur' }],
        isEnable: [{ required: true, message: this.$t('cpfrRule.msg.isEnable'), trigger: 'blur' }],
        maxDtQty: [{ required: false, validator: this.$valid.getIntegerValidatorAllowNull(), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        cpfrRuleCode: null,
        isEnable: 1,
        isValidityWarn: 0,
        maxDtQty: null,
        remark: null,
        cpfrRuleName: null,
        isDefault: 0,
        isAssign: 0,
        paRuleId: null,
        isInvWarn: 0
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
