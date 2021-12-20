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
          soType: null,
          shopId: null,
          carrierId: null,
          soCreateTimeBegin: null,
          soCreateTimeEnd: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '130px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        soTypeList: []
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
        {
          label: this.$t('deliveryMonitoringRpt.soCreateTimeBegin'),
          value: 'soCreateTimeBegin',
          type: 'date',
          dateType: 'datetime',
          format: 'yyyy-MM-dd HH:mm:ss',
          valueFormat: 'yyyy-MM-dd HH:mm:ss'
        },
        {
          label: this.$t('deliveryMonitoringRpt.soCreateTimeEnd'),
          value: 'soCreateTimeEnd',
          type: 'date',
          dateType: 'datetime',
          format: 'yyyy-MM-dd HH:mm:ss',
          valueFormat: 'yyyy-MM-dd HH:mm:ss'
        },
        { label: this.$t('deliveryMonitoringRpt.soType'), value: 'soType', type: 'select', list: 'soTypeList' },
        { label: this.$t('deliveryMonitoringRpt.shop'), value: 'shopId', type: 'slot' },
        { label: this.$t('deliveryMonitoringRpt.carrier'), value: 'carrierId', type: 'slot' },
        { label: '', value: 'sys', type: 'slot' }
      ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'soType', label: this.$t('deliveryMonitoringRpt.soType'), minWidth: 100 },
        { prop: 'newCreateQty', label: this.$t('deliveryMonitoringRpt.newCreateQty'), minWidth: 100 },
        { prop: 'preassignPartQty', label: this.$t('deliveryMonitoringRpt.preassignPartQty'), minWidth: 100 },
        { prop: 'preassignAllQty', label: this.$t('deliveryMonitoringRpt.preassignAllQty'), minWidth: 100 },
        { prop: 'assignPartQty', label: this.$t('deliveryMonitoringRpt.assignPartQty'), minWidth: 100 },
        { prop: 'assignAllQty', label: this.$t('deliveryMonitoringRpt.assignAllQty'), minWidth: 100 },
        { prop: 'jhzQty', label: this.$t('deliveryMonitoringRpt.jhzQty'), minWidth: 100 },
        { prop: 'jhwcQty', label: this.$t('deliveryMonitoringRpt.jhwcQty'), minWidth: 100 },
        { prop: 'sortingQty', label: this.$t('deliveryMonitoringRpt.sortingQty'), minWidth: 100 },
        { prop: 'sortingCompleteQty', label: this.$t('deliveryMonitoringRpt.sortingCompleteQty'), minWidth: 100 },
        { prop: 'underReviewQty', label: this.$t('deliveryMonitoringRpt.underReviewQty'), minWidth: 100 },
        { prop: 'reviewCompletedQty', label: this.$t('deliveryMonitoringRpt.reviewCompletedQty'), minWidth: 100 },
        { prop: 'jjzQty', label: this.$t('deliveryMonitoringRpt.jjzQty'), minWidth: 100 },
        { prop: 'jjwcQty', label: this.$t('deliveryMonitoringRpt.jjwcQty'), minWidth: 100 },
        { prop: 'outOfStockQty', label: this.$t('deliveryMonitoringRpt.outOfStockQty'), minWidth: 100 },
        { prop: 'cancelledQty', label: this.$t('deliveryMonitoringRpt.cancelledQty'), minWidth: 100 },
        { prop: 'totalQty', label: this.$t('deliveryMonitoringRpt.totalQty'), minWidth: 100 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.diaFormInfo.fieldList = []
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.diaFormInfo.fieldList = []
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.diaFormInfo.fieldList = []
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {}
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {}
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
