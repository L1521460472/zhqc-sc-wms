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
          shopId: null,
          carrierId: null,
          deliveryTimeBegin: null,
          deliveryTimeEnd: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {},
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
          label: this.$t('deliveryStatisticsRpt.deliveryTimeBegin'),
          value: 'deliveryTimeBegin',
          type: 'date',
          dateType: 'datetime',
          format: 'yyyy-MM-dd',
          valueFormat: 'yyyy-MM-dd'
        },
        {
          label: this.$t('deliveryStatisticsRpt.deliveryTimeEnd'),
          value: 'deliveryTimeEnd',
          type: 'date',
          dateType: 'datetime',
          format: 'yyyy-MM-dd',
          valueFormat: 'yyyy-MM-dd'
        },
        { label: this.$t('deliveryStatisticsRpt.shop'), value: 'shopId', type: 'slot' },
        { label: this.$t('deliveryStatisticsRpt.carrier'), value: 'carrierId', type: 'slot' },
        { label: '', value: 'sys', type: 'slot' }
      ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'ownerName', label: this.$t('deliveryStatisticsRpt.ownerName'), minWidth: 100 },
        { prop: 'deliveryTime', label: this.$t('deliveryStatisticsRpt.deliveryTime'), minWidth: 100 },
        { prop: 'shippingOrderQty', label: this.$t('deliveryStatisticsRpt.shippingOrderQty'), minWidth: 100 },
        { prop: 'totalBoxQty', label: this.$t('deliveryStatisticsRpt.totalBoxQty'), minWidth: 100 },
        { prop: 'totalAmount', label: this.$t('deliveryStatisticsRpt.totalAmount'), minWidth: 100 },
        { prop: 'totalShipment', label: this.$t('deliveryStatisticsRpt.totalShipment'), minWidth: 100 },
        { prop: 'totalSkuNum', label: this.$t('deliveryStatisticsRpt.totalSkuNum'), minWidth: 100 },
        {
          prop: 'totalSkuCategoryNum',
          label: this.$t('deliveryStatisticsRpt.totalSkuCategoryNum'),
          minWidth: 100
        }
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
