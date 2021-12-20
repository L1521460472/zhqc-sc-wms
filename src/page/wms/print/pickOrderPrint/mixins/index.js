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
          pickOrderNo: null,
          pickType: null,
          printStatus: null,
          ownerId: null,
          partnerStoreId: null,
          partnerId: null,
          skuId: null,
          pickStartTimeFrom: null,
          pickStartTimeTo: null,
          pickEndTimeFrom: null,
          pickEndTimeTo: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '150px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        printStatusList: [],
        pickTypeList: []
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
      },
      printList: []
    }
  },
  mounted() {
    this.collapsableForm()// 初始化表单--展开收起
    this.initTopFormColumns()// 初始化查询界面配置数据
    this.rulesInit()// 初始化diaFormInfo表单字段校验规则
  },
  methods: {
    // 主页面初始化数据
    collapsableFormMore() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('pickOrderPrint.pickOrderNo'), value: 'pickOrderNo', type: 'input' },
        { label: this.$t('pickOrderPrint.pickType'), value: 'pickType', type: 'select', list: 'pickTypeList' },
        { label: this.$t('pickOrderPrint.printStatus'), value: 'printStatus', type: 'select', list: 'printStatusList' },
        { label: this.$t('pickOrderPrint.ownerName'), value: 'ownerId', type: 'slot' },
        { label: this.$t('pickOrderPrint.storeName'), value: 'partnerStoreId', type: 'slot' },
        { label: this.$t('pickOrderPrint.carrierName'), value: 'partnerId', type: 'slot' },
        { label: this.$t('pickOrderPrint.skuId'), value: 'skuId', type: 'slot' },
        { label: this.$t('pickOrderPrint.pickStartTimeFrom'), value: 'pickStartTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('pickOrderPrint.pickStartTimeTo'), value: 'pickStartTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('pickOrderPrint.pickEndTimeFrom'), value: 'pickEndTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('pickOrderPrint.pickEndTimeTo'), value: 'pickEndTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('pickOrderPrint.pickOrderNo'), value: 'pickOrderNo', type: 'input' },
        { label: this.$t('pickOrderPrint.pickType'), value: 'pickType', type: 'select', list: 'pickTypeList' },
        { label: this.$t('pickOrderPrint.printStatus'), value: 'printStatus', type: 'select', list: 'printStatusList' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
      this.topForm.data.ownerId = null
      this.topForm.data.skuId = null
      this.topForm.data.partnerId = null
      this.topForm.data.partnerStoreId = null
    },

    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'selection', width: 50 }, // 序列
        { prop: 'pickOrderNo', label: this.$t('pickOrderPrint.pickOrderNo'), minWidth: 100 },
        { prop: 'pickTypeName', label: this.$t('pickOrderPrint.pickType'), minWidth: 100 },
        { prop: 'pickOrderStatusName', label: this.$t('pickOrderPrint.pickOrderStatus'), minWidth: 100 },
        { prop: 'skuNum', label: this.$t('pickOrderPrint.skuNum'), minWidth: 100 },
        { prop: 'totalShouldPickQty', label: this.$t('pickOrderPrint.totalShouldPickQty'), minWidth: 100 },
        { prop: 'totalAlreadyPickQty', label: this.$t('pickOrderPrint.totalAlreadyPickQty'), minWidth: 100 },
        { prop: 'printStatus', label: this.$t('pickOrderPrint.printStatus'), minWidth: 100 },
        { prop: 'pickStartTime', label: this.$t('pickOrderPrint.pickStartTime'), minWidth: 100 },
        { prop: 'pickEndTime', label: this.$t('pickOrderPrint.pickEndTime'), minWidth: 100 }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
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
    },

    // 列表复选框,选中事件
    handleSelectionChange(event, data) {
      this.printList = data
    }

  }
}
