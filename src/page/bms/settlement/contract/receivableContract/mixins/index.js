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
          contractNo: null,
          contractName: null,
          contractType: null,
          attributionDept: null,
          partyA: null,
          effectiveTime: null,
          effectiveTo: null,
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
          width: '160', // 默认操作按钮列宽度
          btList: [
            { label: this.$t('table.view'), type: 'primary', icon: '', event: 'view', show: true, disabled: this.$hasPerm('view') },
            { slot: true, icon: '', event: 'slotEvent' }
          ]
        }
      }
    }
  },
  mounted() {
    this.initTopForm()
    this.initTableInfo()
  },
  methods: {
    // 初始化查询表单
    initTopForm() {
      this.topForm.fieldList = [
        { label: this.$t('receivableContract.contractNo'), value: 'contractNo', type: 'input' },
        { label: this.$t('receivableContract.contractName'), value: 'contractName', type: 'input' },
        { label: this.$t('receivableContract.contractType'), value: 'contractType', type: 'select', list: 'standardCurrencyList' },
        { label: this.$t('receivableContract.status'), value: 'status', type: 'select', list: 'standardCurrencyList' },
        { label: this.$t('receivableContract.attributionDept'), value: 'attributionDept', type: 'select', list: 'statusList' },
        { label: this.$t('receivableContract.partyA'), value: 'partyA', type: 'input' },
        { label: this.$t('receivableContract.effectiveTime'), value: 'effectiveTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('receivableContract.effectiveTo'), value: 'effectiveTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('receivableContract.expirationTime'), value: 'expirationTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('receivableContract.expirationTo'), value: 'expirationTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }
      ]
    },
    // 初始化列表
    initTableInfo() {
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'contractNo', label: this.$t('receivableContract.contractNo'), minWidth: 120 },
        { prop: 'contractName', label: this.$t('receivableContract.contractName'), minWidth: 100 },
        { prop: 'contractType', label: this.$t('receivableContract.contractType'), minWidth: 100 },
        { prop: 'fundsType', label: this.$t('receivableContract.fundsType'), minWidth: 100 },
        { prop: 'attributionDept', label: this.$t('receivableContract.attributionDept'), minWidth: 100 },
        { prop: 'partyA', label: this.$t('receivableContract.partyA'), minWidth: 100 },
        { prop: 'partyB', label: this.$t('receivableContract.partyB'), minWidth: 100 },
        { prop: 'effectiveTime', label: this.$t('receivableContract.effectiveTime'), minWidth: 100 },
        { prop: 'expirationTime', label: this.$t('receivableContract.expirationTime'), minWidth: 100 },
        { prop: 'status', label: this.$t('receivableContract.status'), minWidth: 100 },
        { prop: 'validPeriod', label: this.$t('receivableContract.validPeriod'), minWidth: 100 },
        { prop: 'remark', label: this.$t('receivableContract.remark'), minWidth: 100 },
        { prop: 'creator', label: this.$t('receivableContract.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('receivableContract.createTime'), minWidth: 100 },
        { prop: 'updater', label: this.$t('receivableContract.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('receivableContract.updateTime'), minWidth: 100 }
      ]
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
