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
          recRuleCode: null,
          recRuleName: null,
          isEnable: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        asnTypeList: [],
        matchModeList: [],
        saveQcOrderList: [],
        enableList: [],
        defaultList: [],
        isQuickReceiptList: [
          { key: '否', value: 0 },
          { key: '是', value: 1 }
        ]
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
        dtTableInfo: {
          ref: null,
          data: [],
          deleteIds: [],
          fieldList: [],
          handle: { // 表格自定义按钮
            fixed: 'right',
            label: this.$t('table.actions'), // 操作列名
            width: '160', // 默认操作按钮列宽度
            btList: [// 添加操作按钮
              {
                label: this.$t('table.edit'),
                type: 'success',
                icon: '',
                event: 'openDiaLogDtEdit',
                show: true,
                disabled: false
              },
              // 默认删除按钮
              {
                label: this.$t('table.delete'),
                type: 'danger',
                icon: '',
                event: 'deleteDtData',
                show: true,
                disabled: false
              }

            ]
          },
          topBtn: { label: '添加策略明细', show: true, type: 'primary', disabled: false, loading: false, event: 'openDiaLogDtAdd' }
        }
      },
      diaFormInfoDt: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        rowIndex: null,
        type: ''
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
        { label: this.$t('recRule.recRuleCode'), value: 'recRuleCode', type: 'input' },
        { label: this.$t('recRule.recRuleName'), value: 'recRuleName', type: 'input' },
        { label: this.$t('recRule.isEnable'), value: 'isEnable', type: 'select', list: 'enableList' },
        { label: '', value: 'sys', type: 'slot' }
      ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'recRuleCode', label: this.$t('recRule.recRuleCode'), minWidth: 100 },
        { prop: 'recRuleName', label: this.$t('recRule.recRuleName'), minWidth: 100 },
        { prop: 'isEnableName', label: this.$t('recRule.isEnable'), minWidth: 100 },
        { prop: 'isDefaultName', label: this.$t('recRule.isDefault'), minWidth: 100 },
        { prop: 'remark', label: this.$t('recRule.remark'), minWidth: 100 },
        { prop: 'creator', label: this.$t('recRule.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('recRule.createTime'), minWidth: 100 },
        { prop: 'updater', label: this.$t('recRule.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('recRule.updateTime'), minWidth: 100 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('recRule.recRuleCode'), value: 'recRuleCode', type: 'input', readonly: true },
        { label: this.$t('recRule.recRuleName'), value: 'recRuleName', type: 'input', readonly: true },
        { label: this.$t('recRule.isEnable'), value: 'isEnableName', type: 'select', list: 'enableList', disabled: true },
        { label: this.$t('recRule.isDefault'), value: 'isDefaultName', type: 'select', list: 'defaultList', disabled: true }
      ]

      // todo
      this.diaFormInfo.dtTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'asnTypeName', label: this.$t('recRule.dt.asnType'), minWidth: 100 },
        { prop: 'matchModeName', label: this.$t('recRule.dt.matchMode'), minWidth: 100 },
        { prop: 'fastRecName', label: this.$t('recRule.isQuickReceipt'), minWidth: 100 },
        { prop: 'isSaveQcOrderName', label: this.$t('recRule.dt.isSaveQcOrder'), minWidth: 100 },

        { prop: 'overRatio', label: this.$t('recRule.dt.overRatio'), minWidth: 100 },
        { prop: 'overQty', label: this.$t('recRule.dt.overQty'), minWidth: 100 }
      ]
      this.diaFormInfoDt.fieldList = [
        { label: this.$t('recRule.dt.asnType'), value: 'asnType', type: 'input', readonly: true },
        { label: this.$t('recRule.dt.matchMode'), value: 'matchMode', type: 'input', readonly: true },
        { label: this.$t('recRule.dt.isSaveQcOrder'), value: 'isSaveQcOrder', type: 'input', readonly: true },
        { label: this.$t('recRule.dt.overRatio'), value: 'overRatio', type: 'input', readonly: true },
        { label: this.$t('recRule.dt.overQty'), value: 'overQty', type: 'input', readonly: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('recRule.recRuleCode'), value: 'recRuleCode', type: 'input' },
        { label: this.$t('recRule.recRuleName'), value: 'recRuleName', type: 'input' },
        { label: this.$t('recRule.isEnable'), value: 'isEnable', type: 'select', list: 'enableList' },
        { label: this.$t('recRule.isDefault'), value: 'isDefault', type: 'select', list: 'defaultList' }
      ]
      this.diaFormInfo.dtTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'asnTypeName', label: this.$t('recRule.dt.asnType'), minWidth: 100 },
        { prop: 'matchModeName', label: this.$t('recRule.dt.matchMode'), minWidth: 100 },
        { prop: 'fastRecName', label: this.$t('recRule.fastRecName'), minWidth: 100 },
        { prop: 'isSaveQcOrderName', label: this.$t('recRule.dt.isSaveQcOrder'), minWidth: 100 },
        { prop: 'overRatio', label: this.$t('recRule.dt.overRatio'), minWidth: 100 },
        { prop: 'overQty', label: this.$t('recRule.dt.overQty'), minWidth: 100 }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('recRule.recRuleCode'), value: 'recRuleCode', type: 'input' },
        { label: this.$t('recRule.recRuleName'), value: 'recRuleName', type: 'input' },
        { label: this.$t('recRule.isEnable'), value: 'isEnable', type: 'select', list: 'enableList' },
        { label: this.$t('recRule.isDefault'), value: 'isDefault', type: 'select', list: 'defaultList' }
      ]
      this.diaFormInfo.dtTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'asnTypeName', label: this.$t('recRule.dt.asnType'), minWidth: 100 },
        { prop: 'matchModeName', label: this.$t('recRule.dt.matchMode'), minWidth: 100 },
        { prop: 'fastRecName', label: this.$t('recRule.fastRecName'), minWidth: 100 },
        { prop: 'isSaveQcOrderName', label: this.$t('recRule.dt.isSaveQcOrder'), minWidth: 100 },
        { prop: 'overRatio', label: this.$t('recRule.dt.overRatio'), minWidth: 100 },
        { prop: 'overQty', label: this.$t('recRule.dt.overQty'), minWidth: 100 }
      ]
    },
    diaFormInfoDtAddFieldList() {
      this.diaFormInfoDt.fieldList = [
        { label: this.$t('recRule.dt.asnType'), value: 'asnType', type: 'selectLink', link: 'asnTypeName', list: 'asnTypeList' },
        { label: this.$t('recRule.dt.matchMode'), value: 'matchMode', type: 'selectLink', link: 'matchModeName', list: 'matchModeList', event: 'handleMatchMode' },
        { label: this.$t('recRule.fastRec'), value: 'fastRec', type: 'selectLink', link: 'fastRecName', list: 'isQuickReceiptList', event: 'handleQuickReceipt' },
        { label: this.$t('recRule.dt.isSaveQcOrder'), value: 'isSaveQcOrder', type: 'selectLink', link: 'isSaveQcOrderName', list: 'saveQcOrderList' },
        { label: this.$t('recRule.dt.overRatio'), value: 'overRatio', type: 'number', min: 0, precision: 2, disabled: true },
        { label: this.$t('recRule.dt.overQty'), value: 'overQty', type: 'number', min: 0, precision: 0, disabled: true }
      ]
    },
    diaFormInfoDtEditFieldList() {
      this.diaFormInfoDt.fieldList = [
        { label: this.$t('recRule.dt.asnType'), value: 'asnType', type: 'selectLink', link: 'asnTypeName', list: 'asnTypeList' },
        { label: this.$t('recRule.dt.matchMode'), value: 'matchMode', type: 'selectLink', link: 'matchModeName', list: 'matchModeList', event: 'handleMatchMode' },
        { label: this.$t('recRule.fastRec'), value: 'fastRec', type: 'selectLink', link: 'fastRecName', list: 'isQuickReceiptList', event: 'handleQuickReceipt' },
        { label: this.$t('recRule.dt.isSaveQcOrder'), value: 'isSaveQcOrder', type: 'selectLink', link: 'isSaveQcOrderName', list: 'saveQcOrderList' },
        { label: this.$t('recRule.dt.overRatio'), value: 'overRatio', type: 'number', min: 0, precision: 2, disabled: true },
        { label: this.$t('recRule.dt.overQty'), value: 'overQty', type: 'number', min: 0, precision: 0, disabled: true }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        recRuleName: [{ required: true, message: this.$t('recRule.msg.recRuleName'), trigger: 'blur' }],
        recRuleCode: [{ required: true, message: this.$t('recRule.msg.recRuleCode'), trigger: 'blur' }],
        isDefault: [{ required: true, message: this.$t('recRule.msg.isDefault'), trigger: 'blur' }]
      }
      this.diaFormInfoDt.rules = {
        asnType: [{ required: true, message: this.$t('recRule.dt.msg.asnType'), trigger: 'change' }],
        matchMode: [{ required: true, message: this.$t('recRule.dt.msg.matchMode'), trigger: 'change' }],
        isSaveQcOrder: [{ required: true, message: this.$t('recRule.dt.msg.isSaveQcOrder'), trigger: 'change' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        recRuleName: null,
        whId: null,
        isEnable: 1,
        recRuleCode: null,
        remark: null,
        isDefault: 0
      }
      this.diaFormInfo.dtTableInfo.data = []
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
