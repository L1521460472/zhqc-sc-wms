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
          ownerId: null,
          zoneId: null,
          lotId: null,
          skuCategoryId: null,
          skuId: null,
          supplierId: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        salesList: []
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
    this.collapsableForm()// 初始化表单--展开收起
    this.initTopFormColumns()// 初始化查询界面配置数据
    this.rulesInit()// 初始化diaFormInfo表单字段校验规则
  },
  methods: {

    collapsableFormMore() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('stockInfoRpt.salesWH'), value: 'whAreaId', type: 'slot' },
        { label: this.$t('stockInfoRpt.zoneId'), value: 'zoneId', type: 'slot' },
        { label: this.$t('stockInfoRpt.lotId'), value: 'lotId', type: 'slot' },
        { label: this.$t('stockInfoRpt.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('stockInfoRpt.skuCategoryId'), value: 'skuCategoryId', type: 'slot' },
        { label: this.$t('stockInfoRpt.skuCode'), value: 'skuId', type: 'slot' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('stockInfoRpt.salesWH'), value: 'whAreaId', type: 'slot' },
        { label: this.$t('stockInfoRpt.zoneId'), value: 'zoneId', type: 'slot' },
        { label: this.$t('stockInfoRpt.lotId'), value: 'lotId', type: 'slot' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
      this.topForm.data.ownerId = null
      this.topForm.data.skuCategoryId = null
      this.topForm.data.skuId = null
    },
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'whAreaName', label: this.$t('stockInfoRpt.salesWH'), minWidth: 100 },
        { prop: 'zoneName', label: this.$t('stockInfoRpt.zoneName'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('stockInfoRpt.lotCode'), minWidth: 100 },
        { prop: 'lotTypeStr', label: this.$t('stockInfoRpt.lotTypeStr'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('stockInfoRpt.ownerName'), minWidth: 120 },
        { prop: 'categoryName', label: this.$t('stockInfoRpt.categoryName'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('stockInfoRpt.skuCode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('stockInfoRpt.skuName'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('stockInfoRpt.barcode'), minWidth: 120 },
        { prop: 'spec', label: this.$t('stockInfoRpt.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('stockInfoRpt.mainUnit'), minWidth: 100 },
        // {prop:"supplierId", label:this.$t('stockInfoRpt.supplierId'), minWidth:100},
        { prop: 'supplierName', label: this.$t('stockInfoRpt.supplierName'), minWidth: 100 },
        { prop: 'mfgName', label: this.$t('stockInfoRpt.mfgName'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('stockInfoRpt.originCountry'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('stockInfoRpt.drugForm'), minWidth: 100 },
        { prop: 'drugFormSpec', label: this.$t('stockInfoRpt.drugFormSpec'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('stockInfoRpt.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('stockInfoRpt.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('stockInfoRpt.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('stockInfoRpt.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('stockInfoRpt.invalidDate'), minWidth: 100 },
        { value: 'deliveryNode', label: this.$t('stockInfoRpt.deliveryOrderNo'), type: 'slot', minWidth: 100 },
        { prop: 'grossWeightTon', label: this.$t('stockInfoRpt.weight'), minWidth: 100 },
        { prop: 'usableQty', label: this.$t('stockInfoRpt.usableQty'), minWidth: 100 },
        { prop: 'allotQty', label: this.$t('stockInfoRpt.allotQty'), minWidth: 100 },
        { prop: 'frozenQty', label: this.$t('stockInfoRpt.frozenQty'), minWidth: 100 },
        { prop: 'badQty', label: this.$t('stockInfoRpt.badQty'), minWidth: 100 },
        { prop: 'badReason', label: this.$t('stockInfoRpt.badReason'), minWidth: 100 },
        { prop: 'stockQty', label: this.$t('stockInfoRpt.stockQty'), minWidth: 100 },
        { prop: 'stockPerQty', label: this.$t('stockInfoRpt.packagingUnitQty'), minWidth: 100 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.diaFormInfo.fieldList = [
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.diaFormInfo.fieldList = [
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.diaFormInfo.fieldList = [
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
    }
  }
}
