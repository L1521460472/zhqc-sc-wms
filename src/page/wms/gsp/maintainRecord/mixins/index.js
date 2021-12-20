import RisizeTable from './RisizeTable'
import notification from './notification'
export default {
  mixins: [RisizeTable, notification],
  data() {
    return {
      // 主页面的top表单
      topForm: {
        ref: null, // 对外提供的可操作表单的持有对象
        fieldList: null, // 配置的表单字段集合
        data: { // 表单绑定的数据Model
          skuCode: null,
          barcode: null,
          skuName: null,
          spec: null,
          maintenanceType: null,
          skuCategoryId: null,
          maintainDateFrom: null,
          maintainDateTo: null,
          skuCategory: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      maintain: {},
      // 下拉选项列表
      listTypeInfo: {
        maintenanceTypeList: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: null
      },
      tableInfoOther: {
        fieldList: null, // 表格列集合
        handle: null
      }
    }
  },
  mounted() {
    this.collapsableForm()// 初始化表单--展开收起
    this.initTopFormColumns()// 初始化查询界面配置数据
  },
  methods: {
    collapsableFormMore() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('maintainRecord.skuCode'), value: 'skuCode', type: 'input' },
        { label: this.$t('maintainRecord.barcode'), value: 'barcode', type: 'input' },
        { label: this.$t('maintainRecord.skuName'), value: 'skuName', type: 'input' },
        { label: this.$t('maintainRecord.spec'), value: 'spec', type: 'input' },
        { label: this.$t('maintainRecord.skuCategoryId'), value: 'skuCategoryId', type: 'slot' },
        { label: this.$t('maintainRecord.maintenanceType'), value: 'maintenanceType', type: 'select', list: 'maintenanceTypeList' },
        { label: this.$t('maintainRecord.maintainDateFrom'), value: 'maintainDateFrom', type: 'date', dateType: 'date', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd' },
        { label: this.$t('maintainRecord.maintainDateTo'), value: 'maintainDateTo', type: 'date', dateType: 'date', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('maintainRecord.skuCode'), value: 'skuCode', type: 'input' },
        { label: this.$t('maintainRecord.barcode'), value: 'barcode', type: 'input' },
        { label: this.$t('maintainRecord.skuName'), value: 'skuName', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
      this.topForm.data.skuCategoryId = null
    },

    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'baseSku.skuCode', label: this.$t('maintainRecord.skuCode'), minWidth: 100 },
        { prop: 'baseSku.barcode', label: this.$t('maintainRecord.barcode'), minWidth: 100 },
        { prop: 'baseSku.skuName', label: this.$t('maintainRecord.skuName'), minWidth: 100 },
        { prop: 'baseSku.tradeName', label: this.$t('maintainRecord.tradeName'), minWidth: 100 },
        { prop: 'baseSku.spec', label: this.$t('maintainRecord.spec'), minWidth: 100 },
        { prop: 'baseSku.mainUnit', label: this.$t('maintainRecord.mainUnit'), minWidth: 100 },
        { prop: 'baseSku.perQty', label: this.$t('maintainRecord.perQty'), minWidth: 100 },
        { prop: 'baseSku.drugForm', label: this.$t('maintainRecord.drugForm'), minWidth: 100 },
        { prop: 'baseSku.mfgName', label: this.$t('maintainRecord.mfgName'), minWidth: 100 },
        { prop: 'baseSku.originCountry', label: this.$t('maintainRecord.originCountry'), minWidth: 100 },
        { prop: 'baseSku.approvalNumber', label: this.$t('maintainRecord.approvalNumber'), minWidth: 100 },
        { prop: 'baseSku.brandName', label: this.$t('maintainRecord.brandName'), minWidth: 100 },
        { prop: 'baseSku.tempControlName', label: this.$t('maintainRecord.tempControlName'), minWidth: 100 },
        { prop: 'baseSku.validityDay', label: this.$t('maintainRecord.validityDay'), minWidth: 100 },
        { prop: 'maintenanceTypeName', label: this.$t('maintainRecord.maintenanceTypeName'), minWidth: 100 }
      ]
      //
      this.tableInfoOther.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'proMaintainNo', label: this.$t('maintainRecord.proMaintainNo'), minWidth: 120 },
        { prop: 'maintainDate', label: this.$t('maintainRecord.maintainDate'), minWidth: 120 },
        { prop: 'maintainUserName', label: this.$t('maintainRecord.maintainUserName'), minWidth: 100 },
        { prop: 'qualityStatusName', label: this.$t('maintainRecord.qualityStatusName'), minWidth: 100 },
        { prop: 'maintainMeasureName', label: this.$t('maintainRecord.maintainMeasureName'), minWidth: 100 },
        { prop: 'maintainConclusionName', label: this.$t('maintainRecord.maintainConclusionName'), minWidth: 100 },
        { prop: 'baseInvBatch.batchNo', label: this.$t('maintainRecord.batchNo'), minWidth: 100 },
        { prop: 'baseInvBatch.productionBatch', label: this.$t('maintainRecord.productionBatch'), minWidth: 100 },
        { prop: 'baseInvBatch.productionDate', label: this.$t('maintainRecord.productionDate'), minWidth: 100 },
        { prop: 'baseInvBatch.instoreDate', label: this.$t('maintainRecord.instoreDate'), minWidth: 100 },
        { prop: 'baseInvBatch.invalidDate', label: this.$t('maintainRecord.invalidDate'), minWidth: 100 },
        { prop: 'baseInvBatch.sterileNo', label: this.$t('maintainRecord.sterileNo'), minWidth: 100 },
        { prop: 'baseInvBatch.sterileInvaliDate', label: this.$t('maintainRecord.sterileInvaliDate'), minWidth: 100 }
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
