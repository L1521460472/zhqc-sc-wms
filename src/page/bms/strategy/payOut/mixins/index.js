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
          payOutName: null,
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
          data: [],
          topBtn: {
            type: 'primary',
            show: false,
            icon: '',
            disabled: false,
            loading: false,
            event: 'addDimension',
            label: this.$t('payOut.addDimension')
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
        { label: this.$t('payOut.payOutName'), value: 'payOutName', type: 'input' },
        { label: this.$t('payOut.status'), value: 'status', type: 'select', list: 'statusList' },
        { label: '', value: 'sys', type: 'slot' }
      ]
    },
    // 初始化列表
    initTableInfo() {
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'payOutCode', label: this.$t('payOut.payOutCode'), minWidth: 100 },
        { prop: 'payOutName', label: this.$t('payOut.payOutName'), minWidth: 100 },
        { prop: 'payOutType', label: this.$t('payOut.payOutType'), minWidth: 100 },
        { prop: 'payOutPeriod', label: this.$t('payOut.payOutPeriod'), minWidth: 100 },
        { prop: 'payOutTime', label: this.$t('payOut.payOutTime'), minWidth: 100 },
        { prop: 'valueRules', label: this.$t('payOut.valueRules'), minWidth: 100 },
        { prop: 'status', label: this.$t('payOut.status'), minWidth: 100 },
        { prop: 'remark', label: this.$t('payOut.remark'), minWidth: 100 }
      ]
    },
    // 初始化查看、新增、编辑弹框
    initFullDiaInfo() {
      const disabled = this.fullDialogInfo.type === 'view'
      this.fullDialogInfo.topForm.fieldList = [
        { label: this.$t('payOut.payOutCode'), value: 'payOutCode', type: 'input', disabled: disabled || this.fullDialogInfo.type === 'edit' },
        { label: this.$t('payOut.payOutName'), value: 'payOutName', type: 'input', disabled },
        { label: this.$t('payOut.payOutType'), value: 'payOutType', type: 'select', list: 'standardCurrencyList', disabled },
        { label: this.$t('payOut.payOutPeriod'), value: 'payOutPeriod', type: 'select', list: 'standardCurrencyList', disabled },
        { label: this.$t('payOut.payOutTime'), value: 'payOutTime', type: 'select', list: 'standardCurrencyList', disabled },
        { label: this.$t('payOut.valueRules'), value: 'valueRules', type: 'select', list: 'standardCurrencyList', disabled },
        { label: this.$t('payOut.remark'), value: 'remark', type: 'input', disabled }
      ]
      this.fullDialogInfo.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'settlementUnit', label: this.$t('payOut.settlementUnit'), minWidth: 100 },
        { prop: 'sujectType', label: this.$t('payOut.sujectType'), minWidth: 100 },
        { prop: 'billSuject', label: this.$t('payOut.billSuject'), minWidth: 100 },
        { prop: 'owner', label: this.$t('payOut.owner'), minWidth: 120 },
        { prop: 'supplier', label: this.$t('payOut.supplier'), minWidth: 100 },
        { prop: 'storehouse', label: this.$t('payOut.storehouse'), minWidth: 100 },
        { prop: 'carrier', label: this.$t('payOut.carrier'), minWidth: 100 },
        { prop: 'customer', label: this.$t('payOut.customer'), minWidth: 100 },
        { prop: 'remark', label: this.$t('payOut.remark'), minWidth: 100 }
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
      this.fullDialogInfo.topForm.rules = {
        payOutCode: [{ required: true, message: this.$t('payOut.msg.payOutCode'), trigger: 'blur' }],
        payOutName: [{ required: true, message: this.$t('payOut.msg.payOutName'), trigger: 'blur' }],
        payOutPeriod: [{ required: true, message: this.$t('payOut.msg.payOutPeriod'), trigger: 'blur' }],
        payOutType: [{ required: true, message: this.$t('payOut.msg.payOutType'), trigger: 'blur' }],
        payOutTime: [{ required: true, message: this.$t('payOut.msg.payOutTime'), trigger: 'blur' }],
        valueRules: [{ required: true, message: this.$t('payOut.msg.valueRules'), trigger: 'blur' }]
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
