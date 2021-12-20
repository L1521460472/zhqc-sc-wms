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
          soNo: null,
          carrierId: null,
          cusOrderNo: null,
          shopOrderNo: null,
          carrierName: null,
          waybillNo: null,
          packingCheckerPerson: null,
          weighingPerson: null,
          deliveryTimeBegin: null,
          deliveryTimeEnd: null,
          provinceId: null
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
        { label: this.$t('logisticsReconciliationRpt.soNo'), value: 'soNo', type: 'input' },
        { label: this.$t('logisticsReconciliationRpt.carrier'), value: 'carrierId', type: 'slot' },
        { label: this.$t('logisticsReconciliationRpt.waybillNo'), value: 'waybillNo', type: 'input' },
        {
          label: this.$t('logisticsReconciliationRpt.packingCheckerPerson'),
          value: 'packingCheckerPerson',
          type: 'input'
        },
        { label: this.$t('logisticsReconciliationRpt.receiveProvince'), value: 'province', type: 'input' },
        { label: this.$t('logisticsReconciliationRpt.weighingPerson'), value: 'weighingPerson', type: 'input' },
        {
          label: this.$t('logisticsReconciliationRpt.deliveryTimeBegin'),
          value: 'deliveryTimeBegin',
          type: 'date',
          dateType: 'datetime',
          format: 'yyyy-MM-dd HH:mm:ss',
          valueFormat: 'yyyy-MM-dd HH:mm:ss'
        },
        {
          label: this.$t('logisticsReconciliationRpt.deliveryTimeEnd'),
          value: 'deliveryTimeEnd',
          type: 'date',
          dateType: 'datetime',
          format: 'yyyy-MM-dd HH:mm:ss',
          valueFormat: 'yyyy-MM-dd HH:mm:ss'
        },
        { label: this.$t('logisticsReconciliationRpt.shopOrderNo'), value: 'shopOrderNo', type: 'input' },
        { label: this.$t('logisticsReconciliationRpt.cusOrderNo'), value: 'cusOrderNo', type: 'input' },
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
        { prop: 'ownerName', label: this.$t('logisticsReconciliationRpt.ownerName'), minWidth: 100 },
        { prop: 'soNo', label: this.$t('logisticsReconciliationRpt.soNo'), minWidth: 140 },
        { prop: 'cusOrderNo', label: this.$t('logisticsReconciliationRpt.cusOrderNo'), minWidth: 110 },
        { prop: 'shopOrderNo', label: this.$t('logisticsReconciliationRpt.shopOrderNo'), minWidth: 150 },
        { prop: 'waybillNo', label: this.$t('logisticsReconciliationRpt.waybillNo'), minWidth: 140 },
        { prop: 'carrierName', label: this.$t('logisticsReconciliationRpt.carrierName'), minWidth: 100 },
        { prop: 'deliveryTime', label: this.$t('logisticsReconciliationRpt.deliveryTime'), minWidth: 100 },
        { prop: 'receiveProvince', label: this.$t('logisticsReconciliationRpt.receiveProvince'), minWidth: 100 },
        { prop: 'receiveCity', label: this.$t('logisticsReconciliationRpt.receiveCity'), minWidth: 100 },
        { prop: 'receiveCounty', label: this.$t('logisticsReconciliationRpt.receiveCounty'), minWidth: 100 },
        { prop: 'receiveAddress', label: this.$t('logisticsReconciliationRpt.receiveAddress'), minWidth: 100 },
        { prop: 'receiver', label: this.$t('logisticsReconciliationRpt.receiver'), minWidth: 100 },
        { prop: 'bigDecimalWeight', label: this.$t('logisticsReconciliationRpt.weight'), minWidth: 100 },
        { prop: 'bigDecimalFreight', label: this.$t('logisticsReconciliationRpt.freight'), minWidth: 100 },
        { prop: 'productTotal', label: this.$t('logisticsReconciliationRpt.productTotal'), minWidth: 100 },
        { prop: 'buyerRemark', label: this.$t('logisticsReconciliationRpt.buyerRemark'), minWidth: 100 },
        { prop: 'sellerRemark', label: this.$t('logisticsReconciliationRpt.sellerRemark'), minWidth: 100 },
        {
          prop: 'packingCheckerPerson',
          label: this.$t('logisticsReconciliationRpt.packingCheckerPerson'),
          minWidth: 100
        },
        { prop: 'weighingPerson', label: this.$t('logisticsReconciliationRpt.weighingPerson'), minWidth: 100 }
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
