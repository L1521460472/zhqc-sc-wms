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
          batchRuleName: null,
          isEnable: null,
          isDefault: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        isProductionBatchList: [
        ],
        isEnableList: [
        ],
        isProductionDateList: [
        ],
        isPoList: [
        ],
        isInstoreDateList: [
        ],
        isDefaultList: [
        ],
        isInvalidDateList: [
        ],
        isAsnNoList: [
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
        { label: this.$t('batchRule.batchRuleCode'), value: 'batchRuleCode', type: 'input' },
        { label: this.$t('batchRule.batchRuleName'), value: 'batchRuleName', type: 'input' },
        { label: this.$t('batchRule.isEnable'), value: 'isEnable', type: 'select', list: 'isEnableList' },
        { label: this.$t('batchRule.isDefault'), value: 'isDefault', type: 'select', list: 'isDefaultList' },
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
        { prop: 'companyCode', label: this.$t('batchRule.companyCode'), minWidth: 100 },
        { prop: 'whId', label: this.$t('batchRule.whId'), minWidth: 100 },
        { prop: 'batchRuleCode', label: this.$t('batchRule.batchRuleCode'), minWidth: 100 },
        { prop: 'batchRuleName', label: this.$t('batchRule.batchRuleName'), minWidth: 100 },
        { prop: 'isProductionBatchName', label: this.$t('batchRule.isProductionBatch'), minWidth: 100 },
        { prop: 'isProductionDateName', label: this.$t('batchRule.isProductionDate'), minWidth: 100 },
        { prop: 'isInstoreDateName', label: this.$t('batchRule.isInstoreDate'), minWidth: 100 },
        { prop: 'isInvalidDateName', label: this.$t('batchRule.isInvalidDate'), minWidth: 100 },
        { prop: 'isPoName', label: this.$t('batchRule.isPo'), minWidth: 100 },
        { prop: 'isAsnNoName', label: this.$t('batchRule.isAsnNo'), minWidth: 100 },
        { prop: 'isEnableName', label: this.$t('batchRule.isEnable'), minWidth: 100 },
        { prop: 'isDefaultName', label: this.$t('batchRule.isDefault'), minWidth: 100 },
        { prop: 'remark', label: this.$t('batchRule.remark'), minWidth: 100 },
        { prop: 'creator', label: this.$t('batchRule.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('batchRule.createTime'), minWidth: 100 },
        { prop: 'updater', label: this.$t('batchRule.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('batchRule.updateTime'), minWidth: 100 },
        { label: '操作', value: 'status', width: 280, type: 'slot', fixed: 'right' } // value: 'status' 对应页面上 自定义插槽的名字v-slot:col-status
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('batchRule.id'), value: 'id', type: 'input', readonly: true },
        { label: this.$t('batchRule.companyCode'), value: 'companyCode', type: 'input', readonly: true },
        { label: this.$t('batchRule.whId'), value: 'whId', type: 'input', readonly: true },
        { label: this.$t('batchRule.batchRuleCode'), value: 'batchRuleCode', type: 'input', readonly: true },
        { label: this.$t('batchRule.batchRuleName'), value: 'batchRuleName', type: 'input', readonly: true },
        { label: this.$t('batchRule.isProductionBatch'), value: 'isProductionBatch', type: 'select', list: 'isProductionBatchList', disabled: true },
        { label: this.$t('batchRule.isProductionDate'), value: 'isProductionDate', type: 'select', list: 'isProductionDateList', disabled: true },
        { label: this.$t('batchRule.isInstoreDate'), value: 'isInstoreDate', type: 'select', list: 'isInstoreDateList', disabled: true },
        { label: this.$t('batchRule.isInvalidDate'), value: 'isInvalidDate', type: 'select', list: 'isInvalidDateList', disabled: true },
        { label: this.$t('batchRule.isPo'), value: 'isPo', type: 'select', list: 'isPoList', disabled: true },
        { label: this.$t('batchRule.isAsnNo'), value: 'isAsnNo', type: 'select', list: 'isAsnNoList', disabled: true },
        { label: this.$t('batchRule.isEnable'), value: 'isEnable', type: 'select', list: 'isEnableList', disabled: true },
        { label: this.$t('batchRule.isDefault'), value: 'isDefault', type: 'select', list: 'isDefaultList', disabled: true },
        { label: this.$t('batchRule.remark'), value: 'remark', type: 'input', readonly: true },
        { label: this.$t('batchRule.creator'), value: 'creator', type: 'input', readonly: true },
        { label: this.$t('batchRule.createTime'), value: 'createTime', type: 'input', readonly: true },
        { label: this.$t('batchRule.updater'), value: 'updater', type: 'input', readonly: true },
        { label: this.$t('batchRule.updateTime'), value: 'updateTime', type: 'input', readonly: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.diaFormInfo.data = {
        isProductionBatch: this.listTypeInfo.isProductionBatchList.length == 0 ? null : this.listTypeInfo.isProductionBatchList[1].value,
        isProductionDate: this.listTypeInfo.isProductionDateList.length == 0 ? null : this.listTypeInfo.isProductionDateList[1].value,
        isInstoreDate: this.listTypeInfo.isInstoreDateList.length == 0 ? null : this.listTypeInfo.isInstoreDateList[1].value,
        isInvalidDate: this.listTypeInfo.isInvalidDateList.length == 0 ? null : this.listTypeInfo.isInvalidDateList[1].value,
        isPo: this.listTypeInfo.isPoList.length == 0 ? null : this.listTypeInfo.isPoList[1].value,
        isAsnNo: this.listTypeInfo.isAsnNoList.length == 0 ? null : this.listTypeInfo.isAsnNoList[1].value,
        isEnable: this.listTypeInfo.isEnableList.length == 0 ? null : this.listTypeInfo.isEnableList[1].value,
        isDefault: this.listTypeInfo.isDefaultList.length == 0 ? null : this.listTypeInfo.isDefaultList[0].value
      }
      this.diaFormInfo.fieldList = [
        { label: this.$t('batchRule.batchRuleCode'), value: 'batchRuleCode', type: 'input' },
        { label: this.$t('batchRule.batchRuleName'), value: 'batchRuleName', type: 'input' },
        { label: this.$t('batchRule.isProductionBatch'), value: 'isProductionBatch', type: 'select', list: 'isProductionBatchList' },
        { label: this.$t('batchRule.isProductionDate'), value: 'isProductionDate', type: 'select', list: 'isProductionDateList' },
        { label: this.$t('batchRule.isInstoreDate'), value: 'isInstoreDate', type: 'select', list: 'isInstoreDateList' },
        { label: this.$t('batchRule.isInvalidDate'), value: 'isInvalidDate', type: 'select', list: 'isInvalidDateList' },
        { label: this.$t('batchRule.isPo'), value: 'isPo', type: 'select', list: 'isPoList' },
        { label: this.$t('batchRule.isAsnNo'), value: 'isAsnNo', type: 'select', list: 'isAsnNoList' },
        { label: this.$t('batchRule.isEnable'), value: 'isEnable', type: 'select', list: 'isEnableList' },
        { label: this.$t('batchRule.isDefault'), value: 'isDefault', type: 'select', list: 'isDefaultList' },
        { label: this.$t('batchRule.remark'), value: 'remark', type: 'input' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('batchRule.batchRuleCode'), value: 'batchRuleCode', type: 'input' },
        { label: this.$t('batchRule.batchRuleName'), value: 'batchRuleName', type: 'input' },
        { label: this.$t('batchRule.isProductionBatch'), value: 'isProductionBatch', type: 'select', list: 'isProductionBatchList' },
        { label: this.$t('batchRule.isProductionDate'), value: 'isProductionDate', type: 'select', list: 'isProductionDateList' },
        { label: this.$t('batchRule.isInstoreDate'), value: 'isInstoreDate', type: 'select', list: 'isInstoreDateList' },
        { label: this.$t('batchRule.isInvalidDate'), value: 'isInvalidDate', type: 'select', list: 'isInvalidDateList' },
        { label: this.$t('batchRule.isPo'), value: 'isPo', type: 'select', list: 'isPoList' },
        { label: this.$t('batchRule.isAsnNo'), value: 'isAsnNo', type: 'select', list: 'isAsnNoList' },
        { label: this.$t('batchRule.isEnable'), value: 'isEnable', type: 'select', list: 'isEnableList' },
        { label: this.$t('batchRule.isDefault'), value: 'isDefault', type: 'select', list: 'isDefaultList' },
        { label: this.$t('batchRule.remark'), value: 'remark', type: 'input' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        isProductionBatch: [{ required: true, message: this.$t('batchRule.msg.isProductionBatch'), trigger: 'blur' }],
        isEnable: [{ required: true, message: this.$t('batchRule.msg.isEnable'), trigger: 'blur' }],
        batchRuleCode: [{ required: true, message: this.$t('batchRule.msg.batchRuleCode'), trigger: 'blur' }],
        batchRuleName: [{ required: true, message: this.$t('batchRule.msg.batchRuleName'), trigger: 'blur' }],
        isProductionDate: [{ required: true, message: this.$t('batchRule.msg.isProductionDate'), trigger: 'blur' }],
        isPo: [{ required: true, message: this.$t('batchRule.msg.isPo'), trigger: 'blur' }],
        isInstoreDate: [{ required: true, message: this.$t('batchRule.msg.isInstoreDate'), trigger: 'blur' }],
        isInvalidDate: [{ required: true, message: this.$t('batchRule.msg.isInvalidDate'), trigger: 'blur' }],
        isAsnNo: [{ required: true, message: this.$t('batchRule.msg.isAsnNo'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        isProductionBatch: null,
        isEnable: null,
        batchRuleCode: null,
        batchRuleName: null,
        isProductionDate: null,
        isPo: null,
        remark: null,
        isInstoreDate: null,
        isDefault: null,
        isInvalidDate: null,
        isAsnNo: null
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
