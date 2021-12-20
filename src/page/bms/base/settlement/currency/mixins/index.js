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
          currencyCode: null,
          currencyName: null,
          standardCurrency: null,
          status: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        standardCurrencyList: [
          { key: '是', value: 0 },
          { key: '否', value: 1 }
        ],
        statusList: [
          { key: '启用', value: 0 },
          { key: '停用', value: 1 }
        ]
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        topBtn: {},
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '200', // 默认操作按钮列宽度
          btList: [
            { slot: true, icon: '', event: 'slotEvent' }
          ]
        }
      },
      // 弹框配置
      dialogInfo: {
        ref: null,
        visible: false,
        flag: '',
        title: '',
        type: '',
        width: '',
        data: {},
        rules: {},
        fieldList: [],
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
        btList: [
          { label: this.$t('table.cancel'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.confirm'), type: 'primary', icon: '', event: 'save', btLoading: false, show: true }
        ]
      }
    }
  },
  mounted() {
    this.initTopForm()
    this.initTableInfo()
    this.rulesInit()
  },
  methods: {
    initTopForm() {
      this.topForm.fieldList = [
        { label: this.$t('currency.currencyCode'), value: 'currencyCode', type: 'input' },
        { label: this.$t('currency.currencyName'), value: 'currencyName', type: 'input' },
        { label: this.$t('currency.standardCurrency'), value: 'standardCurrency', type: 'select', list: 'standardCurrencyList' },
        { label: this.$t('currency.status'), value: 'status', type: 'select', list: 'statusList' },
        { label: '', value: 'sys', type: 'slot' }
      ]
    },
    // 初始化列表
    initTableInfo() {
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'currencyCode', label: this.$t('currency.currencyCode'), minWidth: 120 },
        { prop: 'currencyName', label: this.$t('currency.currencyName'), minWidth: 100 },
        { prop: 'standardCurrency', label: this.$t('currency.standardCurrency'), minWidth: 100 },
        { prop: 'remark', label: this.$t('currency.remark'), minWidth: 100 },
        { prop: 'status', label: this.$t('currency.status'), minWidth: 100 },
        { prop: 'creator', label: this.$t('currency.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('currency.createTime'), minWidth: 100 },
        { prop: 'updater', label: this.$t('currency.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('currency.updateTime'), minWidth: 100 }
      ]
    },
    // 初始化列表
    initDiaForm() {
      this.dialogInfo.fieldList = [
        { label: this.$t('currency.currencyCode'), value: 'currencyCode', type: 'input', disabled: this.dialogInfo.flag === 'edit' },
        { label: this.$t('currency.currencyName'), value: 'currencyName', type: 'input' },
        { label: this.$t('currency.standardCurrency'), value: 'standardCurrency', type: 'select', list: 'standardCurrencyList' },
        { label: this.$t('currency.remark'), value: 'remark', type: 'input' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.dialogInfo.rules = {
        currencyCode: [{ required: true, message: this.$t('currency.msg.currencyCode'), trigger: 'blur' }],
        currencyName: [{ required: true, message: this.$t('currency.msg.currencyName'), trigger: 'blur' }],
        standardCurrency: [{ required: true, message: this.$t('currency.msg.standardCurrency'), trigger: 'blur' }]
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
