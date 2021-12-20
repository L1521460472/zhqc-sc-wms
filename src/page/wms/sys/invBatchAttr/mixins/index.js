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
          batchAttrName: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        invBatchAttrList: [],
        invBatchAttrFormatList: [],
        invBatchAttrShowFormatList: [],
        isEnableList: [],
        whetherList: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '110', // 默认操作按钮列宽度
          btList: [// 添加操作按钮
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
  },
  methods: {
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化top表单
      this.topForm.fieldList = [
        { label: this.$t('invBatchAttr.batchAttrName'), value: 'batchAttrName', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }
      ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'batchAttrName', label: this.$t('invBatchAttr.batchAttrName'), minWidth: 100 },
        { prop: 'batchAttrKey', label: this.$t('invBatchAttr.batchAttrKey'), minWidth: 100 },
        { prop: 'isRequiredName', label: this.$t('invBatchAttr.isRequired'), minWidth: 100 },
        { prop: 'batchAttrFormatName', label: this.$t('invBatchAttr.batchAttrFormat'), minWidth: 100 },
        { prop: 'showFormatName', label: this.$t('invBatchAttr.showFormat'), minWidth: 100 },
        { prop: 'isSystemName', label: this.$t('invBatchAttr.isSystem'), minWidth: 100 },
        { prop: 'remark', label: this.$t('invBatchAttr.remark'), minWidth: 100 },
        { prop: 'creator', label: this.$t('invBatchAttr.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('invBatchAttr.createTime'), minWidth: 100 },
        { prop: 'updater', label: this.$t('invBatchAttr.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('invBatchAttr.updateTime'), minWidth: 100 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('invBatchAttr.batchAttrName'), value: 'batchAttrName', type: 'input', disabled: true },
        { label: this.$t('invBatchAttr.batchAttr'), value: 'batchAttr', type: 'select', list: 'invBatchAttrList', event: 'handleChangeBatchAttr' },
        { label: this.$t('invBatchAttr.isRequired'), value: 'isRequired', type: 'select', list: 'whetherList', disabled: true },
        { label: this.$t('invBatchAttr.batchAttrFormat'), value: 'batchAttrFormat', type: 'select', list: 'invBatchAttrFormatList', event: 'handleChangeBatchAttrFormat', disabled: true },
        { label: this.$t('invBatchAttr.showFormat'), value: 'showFormat', type: 'select', list: 'invBatchAttrShowFormatList', disabled: true },
        { label: this.$t('invBatchAttr.isSystem'), value: 'isSystem', type: 'select', list: 'whetherList', disabled: true },
        { label: this.$t('invBatchAttr.remark'), value: 'remark', type: 'input' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('invBatchAttr.batchAttrName'), value: 'batchAttrName', type: 'input', disabled: true },
        { label: this.$t('invBatchAttr.batchAttr'), value: 'batchAttrKey', type: 'input', disabled: true },
        { label: this.$t('invBatchAttr.isRequired'), value: 'isRequired', type: 'select', list: 'whetherList', disabled: false },
        { label: this.$t('invBatchAttr.batchAttrFormat'), value: 'batchAttrFormat', type: 'select', list: 'invBatchAttrFormatList', event: 'handleChangeBatchAttrFormat', disabled: false },
        { label: this.$t('invBatchAttr.showFormat'), value: 'showFormat', type: 'select', list: 'invBatchAttrShowFormatList', disabled: true },
        { label: this.$t('invBatchAttr.isSystem'), value: 'isSystem', type: 'select', list: 'whetherList', disabled: true },
        { label: this.$t('invBatchAttr.remark'), value: 'remark', type: 'input' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        isSystem: [{ required: true, message: this.$t('invBatchAttr.msg.isSystem'), trigger: 'blur' }],
        batchAttrKey: [{ required: true, message: this.$t('invBatchAttr.msg.batchAttrKey'), trigger: 'blur' }],
        isRequired: [{ required: true, message: this.$t('invBatchAttr.msg.isRequired'), trigger: 'blur' }],
        batchAttrName: [{ required: true, message: this.$t('invBatchAttr.msg.batchAttrName'), trigger: 'blur' }],
        batchAttr: [{ required: true, message: this.$t('invBatchAttr.msg.batchAttr'), trigger: 'blur' }],
        batchAttrFormat: [{ required: true, message: this.$t('invBatchAttr.msg.batchAttrFormat'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        isSystem: null,
        showFormat: null,
        batchAttrKey: null,
        isRequired: null,
        batchAttrName: null,
        remark: null,
        id: null,
        batchAttr: null,
        batchAttrFormat: null
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
