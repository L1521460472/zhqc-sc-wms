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
          sujectType: null,
          billSuject: null,
          billingName: null,
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
        topForm1: {
          ref: null, // 对外提供的可操作表单的持有对象
          fieldList: null, // 配置的表单字段集合
          data: {}, // 表单绑定的数据Model
          rules: {}, // 配置表单字段的校验规则集合
          labelWidth: '110px' // 默认表单字段label宽度
        },
        topForm2: {
          ref: null, // 对外提供的可操作表单的持有对象
          fieldList: null, // 配置的表单字段集合
          data: {}, // 表单绑定的数据Model
          rules: {}, // 配置表单字段的校验规则集合
          labelWidth: '110px' // 默认表单字段label宽度
        },
        tableInfo: {
          fieldList: null, // 表格列集合
          data: [],
          topBtn: {
            type: 'primary',
            show: false,
            icon: '',
            disabled: false,
            loading: false,
            event: 'addDataRource',
            label: this.$t('billing.addDataRource')
          },
          handle: { // 表格自定义按钮
            fixed: 'right',
            label: this.$t('table.actions'), // 操作列名
            width: '100', // 默认操作按钮列宽度
            btList: [
              { label: this.$t('table.delete'), type: 'danger', icon: '', event: 'deleteDt', show: true, disabled: false }
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
        { label: this.$t('billing.billingName'), value: 'billingName', type: 'input' },
        { label: this.$t('billing.billSuject'), value: 'billSuject', type: 'select', list: 'standardCurrencyList' },
        { label: this.$t('billing.status'), value: 'status', type: 'select', list: 'statusList' },
        { label: '', value: 'sys', type: 'slot' }
      ]
    },
    // 初始化列表
    initTableInfo() {
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'billingCode', label: this.$t('billing.billingCode'), minWidth: 100 },
        { prop: 'billingName', label: this.$t('billing.billingName'), minWidth: 100 },
        { prop: 'sujectType', label: this.$t('billing.sujectType'), minWidth: 120 },
        { prop: 'billSuject', label: this.$t('billing.billSuject'), minWidth: 100 },
        { prop: 'billingDataRource', label: this.$t('billing.billingDataRource'), minWidth: 100 },
        { prop: 'invoiceType', label: this.$t('billing.invoiceType'), minWidth: 100 },
        { prop: 'billingParams', label: this.$t('billing.billingParams'), minWidth: 100 },
        { prop: 'billingUnit', label: this.$t('billing.billingUnit'), minWidth: 100 },
        { prop: 'valueRules', label: this.$t('billing.valueRules'), minWidth: 100 },
        { prop: 'billingType', label: this.$t('billing.billingType'), minWidth: 100 },
        { prop: 'billingPeriod', label: this.$t('billing.billingPeriod'), minWidth: 100 },
        { prop: 'billingTime', label: this.$t('billing.billingTime'), minWidth: 100 },
        { prop: 'status', label: this.$t('billing.status'), minWidth: 100 },
        { prop: 'remark', label: this.$t('billing.remark'), minWidth: 100 }
      ]
    },
    // 初始化列表
    initDiaForm() {
      const disabled = this.fullDialogInfo.type === 'view'
      this.fullDialogInfo.topForm1.fieldList = [
        { label: this.$t('billing.billingCode'), value: 'billingCode', type: 'input', disabled: disabled || this.fullDialogInfo.type === 'edit' },
        { label: this.$t('billing.billingName'), value: 'billingName', type: 'input', disabled: disabled || this.fullDialogInfo.type === 'edit' },
        { label: this.$t('billing.billSuject'), value: 'billSuject', type: 'select', list: 'statusList', disabled: disabled || this.fullDialogInfo.type === 'edit' },
        { label: this.$t('billing.billingDataRource'), value: 'billingDataRource', type: 'select', list: 'statusList', disabled },
        { label: this.$t('billing.invoiceType'), value: 'invoiceType', type: 'select', list: 'statusList', disabled },
        { label: this.$t('billing.billingParams'), value: 'billingParams', type: 'select', list: 'statusList', disabled },
        { label: this.$t('billing.billingUnit'), value: 'billingUnit', type: 'select', list: 'statusList', disabled },
        { label: this.$t('billing.valueRules'), value: 'valueRules', type: 'select', list: 'statusList', disabled },
        { label: this.$t('billing.billingType'), value: 'billingType', type: 'select', list: 'statusList', disabled },
        { label: this.$t('billing.billingPeriod'), value: 'billingPeriod', type: 'select', list: 'statusList', disabled },
        { label: this.$t('billing.billingTime'), value: 'billingTime', type: 'select', list: 'statusList', disabled },
        { label: this.$t('billing.remark'), value: 'remark', type: 'input', disabled }
      ]
      this.fullDialogInfo.topForm2.fieldList = [
        { label: this.$t('billing.billingTplId'), value: 'billingTplId', type: 'input', disabled }
      ]
      this.fullDialogInfo.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'billingDataRource', label: this.$t('billing.billingDataRource'), minWidth: 100 },
        { prop: 'invoiceType', label: this.$t('billing.invoiceType'), minWidth: 100 },
        { prop: 'owner', label: this.$t('billing.owner'), minWidth: 120 },
        { prop: 'supplier', label: this.$t('billing.supplier'), minWidth: 100 },
        { prop: 'storehouse', label: this.$t('billing.storehouse'), minWidth: 100 },
        { prop: 'carrier', label: this.$t('billing.carrier'), minWidth: 100 },
        { prop: 'customer', label: this.$t('billing.customer'), minWidth: 100 },
        { prop: 'billingParams', label: this.$t('billing.billingParams'), minWidth: 100 },
        { prop: 'billingUnit', label: this.$t('billing.billingUnit'), minWidth: 100 },
        { prop: 'billingValueRules', label: this.$t('billing.billingValueRules'), minWidth: 100 },
        { prop: 'remark', label: this.$t('billing.remark'), minWidth: 100 }
      ]
      this.fullDialogInfo.tableInfo.data = []
      if (disabled) {
        this.fullDialogInfo.tableInfo.topBtn.show = false
        this.fullDialogInfo.tableInfo.handle.btList[0].show = false
        this.fullDialogInfo.tableInfo.fieldList.forEach(item => {
          item.edit = null
        })
      } else {
        this.fullDialogInfo.tableInfo.topBtn.show = true
        this.fullDialogInfo.tableInfo.handle.btList[0].show = true
        this.fullDialogInfo.tableInfo.fieldList.forEach(item => {
          item.edit = { name: 'input' }
        })
      }
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.fullDialogInfo.topForm1.rules = {
        billSuject: [{ required: true, message: this.$t('billing.msg.billSuject'), trigger: 'blur' }],
        billingCode: [{ required: true, message: this.$t('billing.msg.billingCode'), trigger: 'blur' }],
        billingName: [{ required: true, message: this.$t('billing.msg.billingName'), trigger: 'blur' }],
        billingDataRource: [{ required: true, message: this.$t('billing.msg.billingDataRource'), trigger: 'blur' }],
        invoiceType: [{ required: true, message: this.$t('billing.msg.invoiceType'), trigger: 'blur' }],
        billingParams: [{ required: true, message: this.$t('billing.msg.billingParams'), trigger: 'blur' }],
        billingUnit: [{ required: true, message: this.$t('billing.msg.billingUnit'), trigger: 'blur' }],
        valueRules: [{ required: true, message: this.$t('billing.msg.valueRules'), trigger: 'blur' }],
        billingType: [{ required: true, message: this.$t('billing.msg.billingType'), trigger: 'blur' }],
        billingPeriod: [{ required: true, message: this.$t('billing.msg.billingPeriod'), trigger: 'blur' }],
        billingTime: [{ required: true, message: this.$t('billing.msg.billingTime'), trigger: 'blur' }]
      }
      this.fullDialogInfo.topForm2.rules = {
        billingTplId: [{ required: true, message: this.$t('billing.msg.billingTplId'), trigger: 'blur' }]
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
