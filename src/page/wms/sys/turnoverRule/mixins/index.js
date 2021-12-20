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
          turnoverRuleCode: null,
          turnoverRuleName: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        isEnableList: [
        ],
        isDefaultList: [
        ]
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
            { label: this.$t('table.delete'), type: 'danger', icon: '', event: 'deleteData', show: true, disabled: this.$hasPerm('delete') }// event值为notification.js中定义的方法名
          ]
        }
      },
      // 弹窗表单
      diaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        subTableInfo: {
          title: '列表详情',
          ref: null,
          type: null,
          fieldList: [],
          rules: {},
          labelWidth: '120px',
          // handle:null,
          handle: null,
          saveList: [
            { label: '关闭', type: '', icon: '', event: 'close', show: true },
            { label: '保存', type: 'primary', icon: '', event: 'save', saveLoading: false, show: true }
          ],
          topBtn: { label: '添加明细', type: '', icon: 'el-ali-icon-quanxuan', event: 'addSub', show: true }
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
        { label: this.$t('turnoverRule.turnoverRuleCode'), value: 'turnoverRuleCode', type: 'input' },
        { label: this.$t('turnoverRule.turnoverRuleName'), value: 'turnoverRuleName', type: 'input' },
        {
          type: 'button',
          label: '',
          btnlabel: this.$t('table.search'), // 查询按钮
          btType: 'primary',
          icon: 'el-icon-search',
          event: 'search', // event值为notification.js中定义的方法名
          show: true,
          disabled: this.$hasPerm('search')
        },
        {
          type: 'button',
          label: '',
          btnlabel: this.$t('table.reboot'), // 重置按钮
          btType: 'warning',
          icon: 'el-icon-refresh-left',
          event: 'reboot', // event值为notification.js中定义的方法名
          show: true,
          disabled: this.$hasPerm('search')
        }
      ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'companyCode', label: this.$t('turnoverRule.companyCode'), minWidth: 100 },
        { prop: 'whId', label: this.$t('turnoverRule.whId'), minWidth: 100 },
        { prop: 'turnoverRuleCode', label: this.$t('turnoverRule.turnoverRuleCode'), minWidth: 100 },
        { prop: 'turnoverRuleName', label: this.$t('turnoverRule.turnoverRuleName'), minWidth: 100 },
        { prop: 'isDefault', label: this.$t('turnoverRule.isDefault'), minWidth: 100 },
        { prop: 'isEnable', label: this.$t('turnoverRule.isEnable'), minWidth: 100 },
        { prop: 'remark', label: this.$t('turnoverRule.remark'), minWidth: 100 },
        { prop: 'creator', label: this.$t('turnoverRule.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('turnoverRule.createTime'), minWidth: 100 },
        { prop: 'updater', label: this.$t('turnoverRule.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('turnoverRule.updateTime'), minWidth: 100 },
        { prop: 'optimistic', label: this.$t('turnoverRule.optimistic'), minWidth: 100 }
      ]
      //
      this.$set(this.diaFormInfo.data, 'turnoverRuleDtPOList', [])
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('turnoverRule.turnoverRuleCode'), value: 'turnoverRuleCode', type: 'input', readonly: true },
        { label: this.$t('turnoverRule.turnoverRuleName'), value: 'turnoverRuleName', type: 'input', readonly: true },
        { label: this.$t('turnoverRule.isDefault'), value: 'isDefault', type: 'select', list: 'isDefaultList', disabled: true },
        { label: this.$t('turnoverRule.isEnable'), value: 'isEnable', type: 'select', list: 'isEnableList', disabled: true },
        { label: this.$t('turnoverRule.remark'), value: 'remark', type: 'input', readonly: true }
      ]
      this.diaFormInfo.subTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'turnoverRuleId', label: this.$t('turnoverRule.dt.turnoverRuleId'), minWidth: 100 },
        { prop: 'companyCode', label: this.$t('turnoverRule.dt.companyCode'), minWidth: 100 },
        { prop: 'whId', label: this.$t('turnoverRule.dt.whId'), minWidth: 100 },
        { prop: 'batchAttr', label: this.$t('turnoverRule.dt.batchAttr'), minWidth: 100 },
        { prop: 'priorityLevel', label: this.$t('turnoverRule.dt.priorityLevel'), minWidth: 100 },
        { prop: 'isDesc', label: this.$t('turnoverRule.dt.isDesc'), minWidth: 100 },
        { prop: 'remark', label: this.$t('turnoverRule.dt.remark'), minWidth: 100 }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('turnoverRule.turnoverRuleCode'), value: 'turnoverRuleCode', type: 'input' },
        { label: this.$t('turnoverRule.turnoverRuleName'), value: 'turnoverRuleName', type: 'input' },
        { label: this.$t('turnoverRule.isDefault'), value: 'isDefault', type: 'select', list: 'isDefaultList' },
        { label: this.$t('turnoverRule.isEnable'), value: 'isEnable', type: 'select', list: 'isEnableList' },
        { label: this.$t('turnoverRule.remark'), value: 'remark', type: 'input' }
      ]
      this.diaFormInfo.subTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'turnoverRuleId', label: this.$t('turnoverRule.dt.turnoverRuleId'), minWidth: 100 },
        { prop: 'companyCode', label: this.$t('turnoverRule.dt.companyCode'), minWidth: 100 },
        { prop: 'whId', label: this.$t('turnoverRule.dt.whId'), minWidth: 100 },
        { prop: 'batchAttr', label: this.$t('turnoverRule.dt.batchAttr'), minWidth: 100 },
        { prop: 'priorityLevel', label: this.$t('turnoverRule.dt.priorityLevel'), minWidth: 100 },
        { prop: 'isDesc', label: this.$t('turnoverRule.dt.isDesc'), minWidth: 100 },
        { prop: 'remark', label: this.$t('turnoverRule.dt.remark'), minWidth: 100 }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('turnoverRule.turnoverRuleCode'), value: 'turnoverRuleCode', type: 'input' },
        { label: this.$t('turnoverRule.turnoverRuleName'), value: 'turnoverRuleName', type: 'input' },
        { label: this.$t('turnoverRule.isDefault'), value: 'isDefault', type: 'select', list: 'isDefaultList' },
        { label: this.$t('turnoverRule.isEnable'), value: 'isEnable', type: 'select', list: 'isEnableList' },
        { label: this.$t('turnoverRule.remark'), value: 'remark', type: 'input' }
      ]
      this.diaFormInfo.subTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'turnoverRuleId', label: this.$t('turnoverRule.dt.turnoverRuleId'), minWidth: 100 },
        { prop: 'companyCode', label: this.$t('turnoverRule.dt.companyCode'), minWidth: 100 },
        { prop: 'whId', label: this.$t('turnoverRule.dt.whId'), minWidth: 100 },
        { prop: 'batchAttr', label: this.$t('turnoverRule.dt.batchAttr'), minWidth: 100 },
        { prop: 'priorityLevel', label: this.$t('turnoverRule.dt.priorityLevel'), minWidth: 100 },
        { prop: 'isDesc', label: this.$t('turnoverRule.dt.isDesc'), minWidth: 100 },
        { prop: 'remark', label: this.$t('turnoverRule.dt.remark'), minWidth: 100 }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        turnoverRuleName: [{ required: true, message: this.$t('turnoverRule.msg.turnoverRuleName'), trigger: 'blur' }],
        remark: [{ required: true, message: this.$t('turnoverRule.msg.remark'), trigger: 'blur' }],
        turnoverRuleCode: [{ required: true, message: this.$t('turnoverRule.msg.turnoverRuleCode'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        turnoverRuleName: null,
        isEnable: null,
        remark: null,
        turnoverRuleCode: null,
        isDefault: null,
        turnoverRuleDtPOList: []
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
