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
          skuCategoryId: null,
          skuId: null,
          whAreaId: null
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
        { label: this.$t('invSummaryRpt.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('invSummaryRpt.skuCategoryId'), value: 'skuCategoryId', type: 'slot' },
        { label: this.$t('invSummaryRpt.skuCode'), value: 'skuId', type: 'slot' },
        { label: this.$t('invSummaryRpt.salesWH'), value: 'whAreaId', type: 'slot' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('invSummaryRpt.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('invSummaryRpt.skuCategoryId'), value: 'skuCategoryId', type: 'slot' },
        { label: this.$t('invSummaryRpt.skuCode'), value: 'skuId', type: 'slot' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        // {prop:"ownerId", label:this.$t('invSummaryRpt.ownerId'), minWidth:100},
        { prop: 'ownerName', label: this.$t('invSummaryRpt.ownerName'), minWidth: 100 },
        { prop: 'whAreaName', label: this.$t('invSummaryRpt.salesWH'), minWidth: 100 },
        // {prop:"skuCategoryId", label:this.$t('invSummaryRpt.skuCategoryId'), minWidth:100},
        { prop: 'categoryName', label: this.$t('invSummaryRpt.categoryName'), minWidth: 100 },
        // {prop:"skuId", label:this.$t('invSummaryRpt.skuId'), minWidth:100},
        { prop: 'skuCode', label: this.$t('invSummaryRpt.skuCode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('invSummaryRpt.skuName'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('invSummaryRpt.barcode'), minWidth: 100 },
        { prop: 'spec', label: this.$t('invSummaryRpt.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('invSummaryRpt.mainUnit'), minWidth: 100 },
        { prop: 'grossWeightTon', label: this.$t('invSummaryRpt.weight'), minWidth: 100 },
        { prop: 'usableQty', label: this.$t('invSummaryRpt.usableQty'), minWidth: 100 },
        { prop: 'allotQty', label: this.$t('invSummaryRpt.allotQty'), minWidth: 100 },
        { prop: 'frozenQty', label: this.$t('invSummaryRpt.frozenQty'), minWidth: 100 },
        { prop: 'badQty', label: this.$t('invSummaryRpt.badQty'), minWidth: 100 },
        { prop: 'stockQty', label: this.$t('invSummaryRpt.stockQty'), minWidth: 100 },
        { prop: 'stockPerQty', label: this.$t('invSummaryRpt.packagingUnitQty'), minWidth: 100 }
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
