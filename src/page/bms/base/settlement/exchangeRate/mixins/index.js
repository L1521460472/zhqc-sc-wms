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
          exchangeRateCode: null,
          exchangeRateName: null,
          isDefault: null,
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
          width: '250', // 默认操作按钮列宽度
          btList: [
            { label: this.$t('table.view'), type: 'primary', icon: '', event: 'view', show: true, disabled: this.$hasPerm('view') },
            { slot: true, icon: '', event: 'slotEvent' }
          ]
        }
      },
      // 弹框配置
      fullDialogInfo: {
        title: '',
        visible: false,
        type: '',
        varSup: false,
        varCus: false,
        varStore: false,
        varProvince: true,
        varCity: true,
        varArea: true,
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', show: true }
        ],
        topForm: {
          ref: null, // 对外提供的可操作表单的持有对象
          fieldList: null, // 配置的表单字段集合
          data: {}, // 表单绑定的数据Model
          rules: {}, // 配置表单字段的校验规则集合
          labelWidth: '110px' // 默认表单字段label宽度
        },
        tableInfo: {
          fieldList: null, // 表格列集合
          topBtn: {},
          data: [],
          handle: { // 表格自定义按钮
            fixed: 'right',
            label: this.$t('table.actions'), // 操作列名
            width: '250', // 默认操作按钮列宽度
            btList: [
              { label: this.$t('table.delete'), type: 'danger', icon: '', event: 'deleteRow', show: true }
            ]
          }
        }
      }
    }
  },
  mounted() {
    this.initTopForm()
    this.initTableInfo()
    this.rulesInit()
  },
  methods: {
    // 初始化查询表单
    initTopForm() {
      this.topForm.fieldList = [
        { label: this.$t('exchangeRate.exchangeRateCode'), value: 'exchangeRateCode', type: 'input' },
        { label: this.$t('exchangeRate.exchangeRateName'), value: 'exchangeRateName', type: 'input' },
        { label: this.$t('exchangeRate.isDefault'), value: 'isDefault', type: 'select', list: 'standardCurrencyList' },
        { label: this.$t('exchangeRate.status'), value: 'status', type: 'select', list: 'statusList' },
        { label: '', value: 'sys', type: 'slot' }
      ]
    },
    // 初始化列表
    initTableInfo() {
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'exchangeRateCode', label: this.$t('exchangeRate.exchangeRateCode'), minWidth: 120 },
        { prop: 'exchangeRateName', label: this.$t('exchangeRate.exchangeRateName'), minWidth: 100 },
        { prop: 'isDefault', label: this.$t('exchangeRate.isDefault'), minWidth: 100 },
        { prop: 'remark', label: this.$t('exchangeRate.remark'), minWidth: 100 },
        { prop: 'status', label: this.$t('exchangeRate.status'), minWidth: 100 },
        { prop: 'creator', label: this.$t('exchangeRate.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('exchangeRate.createTime'), minWidth: 100 },
        { prop: 'updater', label: this.$t('exchangeRate.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('exchangeRate.updateTime'), minWidth: 100 }
      ]
    },
    // 初始化列表
    initDiaForm() {
      this.dialogInfo.fieldList = [
        { label: this.$t('exchangeRate.exchangeRateCode'), value: 'exchangeRateCode', type: 'input' },
        { label: this.$t('exchangeRate.exchangeRateName'), value: 'exchangeRateName', type: 'input' },
        { label: this.$t('exchangeRate.isDefault'), value: 'isDefault', type: 'select', list: 'standardCurrencyList' },
        { label: this.$t('exchangeRate.remark'), value: 'remark', type: 'input' }
      ]
    },
    // 初始化查看、新增、编辑弹框
    initFullDiaInfo() {
      this.fullDialogInfo.topForm.fieldList = [
        { label: this.$t('exchangeRate.exchangeRateCode'), value: 'exchangeRateCode', type: 'input', disabled: this.fullDialogInfo.type === 'view' || this.fullDialogInfo.type === 'edit' },
        { label: this.$t('exchangeRate.exchangeRateName'), value: 'exchangeRateName', type: 'input', disabled: this.fullDialogInfo.type === 'view' },
        { label: this.$t('exchangeRate.isDefault'), value: 'isDefault', type: 'select', list: 'standardCurrencyList', disabled: this.fullDialogInfo.type === 'view' },
        { label: this.$t('exchangeRate.remark'), value: 'remark', type: 'input', disabled: this.fullDialogInfo.type === 'view' }
      ]
      if (this.fullDialogInfo.type === 'view') {
        this.fullDialogInfo.tableInfo.fieldList = [
          { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
          { prop: 'currency', label: this.$t('exchangeRate.currency'), minWidth: 120 },
          { prop: 'standardCurrency', label: this.$t('exchangeRate.standardCurrency'), minWidth: 100 },
          { prop: 'exchangeRate', label: this.$t('exchangeRate.exchangeRate'), minWidth: 100 },
          { prop: 'exchangeRateChangeTime', label: this.$t('exchangeRate.exchangeRateChangeTime'), minWidth: 100 },
          { prop: 'remark', label: this.$t('exchangeRate.remark'), minWidth: 100 }
        ]
      } else {
        this.fullDialogInfo.tableInfo.fieldList = [
          { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
          { prop: 'currency', label: this.$t('exchangeRate.currency'), minWidth: 120, edit: { name: 'input' }},
          { prop: 'standardCurrency', label: this.$t('exchangeRate.standardCurrency'), minWidth: 100, edit: { name: 'input' }},
          { prop: 'exchangeRate', label: this.$t('exchangeRate.exchangeRate'), minWidth: 100, edit: { name: 'input' }},
          { prop: 'exchangeRateChangeTime', label: this.$t('exchangeRate.exchangeRateChangeTime'), minWidth: 100, edit: { name: '$input', props: { type: 'date', placeholder: '请选择日期' }}},
          { prop: 'remark', label: this.$t('exchangeRate.remark'), minWidth: 100, edit: { name: 'input' }}
        ]
      }
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.fullDialogInfo.topForm.rules = {
        exchangeRateCode: [{ required: true, message: this.$t('exchangeRate.msg.exchangeRateCode'), trigger: 'blur' }],
        exchangeRateName: [{ required: true, message: this.$t('exchangeRate.msg.exchangeRateName'), trigger: 'blur' }],
        isDefault: [{ required: true, message: this.$t('exchangeRate.msg.isDefault'), trigger: 'blur' }]
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
