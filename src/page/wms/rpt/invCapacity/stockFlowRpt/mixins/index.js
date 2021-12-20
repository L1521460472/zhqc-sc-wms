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
          businessNo: null,
          businessType: null,
          ownerId: null,
          zoneId: null,
          lotId: null,
          skuId: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        businessTypeList: [],
        stockChangeTypeList: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: null
        /* handle: {//表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'),//操作列名
          width: '210',//默认操作按钮列宽度
          btList: [//添加操作按钮
            //默认查看按钮
            {label:this.$t('table.view'), type: 'primary', icon: '', event: 'openViewPage', show: true,disabled:this.$hasPerm('view')},//event值为notification.js中定义的方法名
            //默认修改按钮
            {label:this.$t('table.edit'), type: 'success', icon: '', event: 'openEditPage', show: true,disabled:this.$hasPerm('edit')},//event值为notification.js中定义的方法名
            //默认删除按钮
            {label:this.$t('table.delete'), type: 'danger', icon: '', event: 'deleteData', show: true,disabled:this.$hasPerm('delete')},//event值为notification.js中定义的方法名
          ]
        }*/
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
        { label: this.$t('stockFlowRpt.businessNo'), value: 'businessNo', type: 'input' },
        { label: this.$t('stockFlowRpt.businessType'), value: 'businessType', type: 'select', list: 'businessTypeList' },
        { label: this.$t('stockInfoRpt.zoneId'), value: 'zoneId', type: 'slot' },
        { label: this.$t('stockInfoRpt.lotId'), value: 'lotId', type: 'slot' },
        { label: this.$t('invSummaryRpt.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('invSummaryRpt.skuCode'), value: 'skuId', type: 'slot' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('stockFlowRpt.businessNo'), value: 'businessNo', type: 'input' },
        { label: this.$t('stockFlowRpt.businessType'), value: 'businessType', type: 'select', list: 'businessTypeList' },
        { label: this.$t('stockInfoRpt.zoneId'), value: 'zoneId', type: 'slot' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
      this.topForm.data.ownerId = null
      this.topForm.data.lotId = null
      this.topForm.data.skuId = null
    },

    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'businessNo', label: this.$t('stockFlowRpt.businessNo'), minWidth: 120 },
        { prop: 'businessTypeName', label: this.$t('stockFlowRpt.businessTypeName'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('stockFlowRpt.ownerName'), minWidth: 100 },
        { prop: 'zoneName', label: this.$t('stockFlowRpt.zoneName'), minWidth: 100 },
        { prop: 'lotName', label: this.$t('stockFlowRpt.lotName'), minWidth: 100 },
        { prop: 'categoryName', label: this.$t('stockFlowRpt.categoryName'), minWidth: 100 },
        // {prop:"supplierName", label:this.$t('stockFlowRpt.supplierName'), minWidth:100},
        { prop: 'toQty', label: this.$t('stockFlowRpt.toQty'), minWidth: 100 },
        { prop: 'toBadQty', label: this.$t('stockFlowRpt.toBadQty'), minWidth: 100 },

        { prop: 'skuCode', label: this.$t('stockFlowRpt.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('stockFlowRpt.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('stockFlowRpt.skuName'), minWidth: 100 },
        { prop: 'tradeName', label: this.$t('stockFlowRpt.tradeName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('stockFlowRpt.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('stockFlowRpt.mainUnit'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('stockFlowRpt.drugForm'), minWidth: 100 },
        { prop: 'mfgName', label: this.$t('stockFlowRpt.mfgName'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('stockFlowRpt.originCountry'), minWidth: 100 },
        { prop: 'approvalNumber', label: this.$t('stockFlowRpt.approvalNumber'), minWidth: 100 },
        { prop: 'brandName', label: this.$t('stockFlowRpt.brandName'), minWidth: 100 },
        { prop: 'tempControlName', label: this.$t('stockFlowRpt.tempControlName'), minWidth: 100 },
        { prop: 'validityDay', label: this.$t('stockFlowRpt.validityDay'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('stockFlowRpt.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('stockFlowRpt.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('stockFlowRpt.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('stockFlowRpt.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('stockFlowRpt.invalidDate'), minWidth: 100 },
        { prop: 'sterileNo', label: this.$t('stockFlowRpt.sterileNo'), minWidth: 100 },
        { prop: 'sterileInvaliDate', label: this.$t('stockFlowRpt.sterileInvaliDate'), minWidth: 100 },

        { prop: 'operator', label: this.$t('stockFlowRpt.operator'), minWidth: 100 },
        { prop: 'operatTime', label: this.$t('stockFlowRpt.operatTime'), minWidth: 150 }
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
