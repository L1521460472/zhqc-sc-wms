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
          globalCode: null,
          globalName: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        valueList: [],
        mqStatus: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '100', // 默认操作按钮列宽度
          btList: [// 添加操作按钮
            // 默认修改按钮
            { slot: true, icon: '', event: 'slotEvent' }
            // { label: this.$t('推送'), type: 'success', icon: '', event: 'pushFn', show: true },//event值为notification.js中定义的方法名
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
        { label: this.$t('interfaceLog.orderCode'), value: 'orderCode', type: 'input' },
        { label: this.$t('interfaceLog.fmSystem'), value: 'fmSystem', type: 'input' },
        { label: this.$t('interfaceLog.recSystem'), value: 'recSystem', type: 'input' },
        { label: this.$t('interfaceLog.orderType'), value: 'orderType', type: 'input' },
        { label: this.$t('interfaceLog.interfaceType'), value: 'interfaceType', type: 'input' },
        { label: this.$t('interfaceLog.mqStatus'), value: 'mqStatus', type: 'select', list: 'mqStatus' },
        { label: '', value: 'sys', type: 'slot' }
      ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'orderCode', label: this.$t('interfaceLog.orderCode'), minWidth: 100 },
        { prop: 'fmSystem', label: this.$t('interfaceLog.fmSystem'), minWidth: 100 },
        { prop: 'recSystem', label: this.$t('interfaceLog.recSystem'), minWidth: 100 },
        { prop: 'orderType', label: this.$t('interfaceLog.orderType'), minWidth: 100 },
        { prop: 'interfaceType', label: this.$t('interfaceLog.interfaceType'), minWidth: 100 },
        { prop: 'mqStatusName', label: this.$t('interfaceLog.mqStatus'), minWidth: 100 },
        { prop: 'failReason', label: this.$t('interfaceLog.failReason'), minWidth: 100 },
        { prop: 'mqData', label: this.$t('interfaceLog.interfaceInfo'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('interfaceLog.createTime'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('interfaceLog.updateTime'), minWidth: 100 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('interfaceLog.globalCode'), value: 'globalCode', type: 'input', readonly: true },
        { label: this.$t('interfaceLog.globalName'), value: 'globalName', type: 'input', readonly: true },
        { label: this.$t('interfaceLog.globalValueCode'), value: 'globalValueCode', type: 'input', readonly: true },
        { label: this.$t('interfaceLog.globalValueName'), value: 'globalValueName', type: 'input', readonly: true },
        { label: this.$t('interfaceLog.remark'), value: 'remark', type: 'input', readonly: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('interfaceLog.globalCode'), value: 'globalCode', type: 'input' },
        { label: this.$t('interfaceLog.globalName'), value: 'globalName', type: 'input' },
        { label: this.$t('interfaceLog.globalValueCode'), value: 'globalValueCode', type: 'input' },
        { label: this.$t('interfaceLog.globalValueName'), value: 'globalValueName', type: 'input' },
        { label: this.$t('interfaceLog.remark'), value: 'remark', type: 'input' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('interfaceLog.globalCode'), value: 'globalCode', type: 'input', readonly: true },
        { label: this.$t('interfaceLog.globalName'), value: 'globalName', type: 'input', readonly: true },
        { label: this.$t('interfaceLog.globalValueCode'), value: 'globalValueCode', type: 'select', list: 'valueList', event: 'handleChangeValue' },
        { label: this.$t('interfaceLog.remark'), value: 'remark', type: 'input' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        globalName: [{ required: true, message: this.$t('interfaceLog.msg.globalName'), trigger: 'blur' }],
        globalValueCode: [{ required: true, message: this.$t('interfaceLog.msg.globalValueCode'), trigger: 'blur' }],
        globalCode: [{ required: true, message: this.$t('interfaceLog.msg.globalCode'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        globalName: null,
        globalValueCode: null,
        globalCode: null,
        remark: null,
        globalValueName: null
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
