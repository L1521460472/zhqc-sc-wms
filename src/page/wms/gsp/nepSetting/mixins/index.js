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
          skuCode: null,
          shopId: null,
          startTimeFrom: null,
          startTimeTo: null,
          endTimeFrom: null,
          endTimeTo: null,
          creator: null,
          createTimeFrom: null,
          createTimeTo: null,
          origSystem: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        origSystemList: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '100', // 默认操作按钮列宽度
          btList: [// 添加操作按钮
            // 默认查看按钮
            { label: this.$t('table.view'), type: 'primary', icon: '', event: 'openViewPage', show: true, disabled: this.$hasPerm('view') }// event值为notification.js中定义的方法名
          ]
        }
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
    this.collapsableForm()// 初始化表单-----------------展开收起
    this.initTopFormColumns()// 初始化查询界面配置数据
    this.rulesInit()// 初始化diaFormInfo表单字段校验规则
  },
  methods: {
    collapsableFormMore() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('nepSetting.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('nepSetting.skuCode'), value: 'skuCode', type: 'slot' },
        { label: this.$t('nepSetting.shopId'), value: 'storeId', type: 'slot' },
        { label: this.$t('nepSetting.startTimeFrom'), value: 'startTimeFrom', type: 'date' },
        { label: this.$t('nepSetting.startTimeTo'), value: 'startTimeTo', type: 'date' },
        { label: this.$t('nepSetting.endTimeFrom'), value: 'endTimeFrom', type: 'date' },
        { label: this.$t('nepSetting.endTimeTo'), value: 'endTimeTo', type: 'date' },
        { label: this.$t('nepSetting.creator'), value: 'creator', type: 'input' },
        { label: this.$t('nepSetting.createTimeFrom'), value: 'createTimeFrom', type: 'date' },
        { label: this.$t('nepSetting.createTimeTo'), value: 'createTimeTo', type: 'date' },
        { label: this.$t('nepSetting.origSystem'), value: 'origSystem', type: 'select', list: 'origSystemList' },
        { label: '', value: 'sys', type: 'slot' }
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('nepSetting.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('nepSetting.skuCode'), value: 'skuCode', type: 'slot' },
        { label: this.$t('nepSetting.shopId'), value: 'storeId', type: 'slot' },
        { label: '', value: 'sys', type: 'slot' }
      ]
    },
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'ownerName', label: this.$t('nepSetting.ownerName'), minWidth: 100 },
        { prop: 'shopName', label: this.$t('nepSetting.shopName'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('nepSetting.skuCode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('nepSetting.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('nepSetting.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('nepSetting.mainUnit'), minWidth: 100 },
        { prop: 'mfg', label: this.$t('nepSetting.mfg'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('nepSetting.drugForm'), minWidth: 100 },
        { prop: 'drugFormSpec', label: this.$t('nepSetting.drugFormSpec'), minWidth: 100 },
        { prop: 'approvalNumber', label: this.$t('nepSetting.approvalNumber'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('nepSetting.barcode'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('nepSetting.originCountry'), minWidth: 100 },
        { prop: 'invaliDate', label: this.$t('nepSetting.invaliDate'), minWidth: 100 },
        { prop: 'startTime', label: this.$t('nepSetting.startTime'), minWidth: 100 },
        { prop: 'endTime', label: this.$t('nepSetting.endTime'), minWidth: 100 },
        { prop: 'creator', label: this.$t('nepSetting.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('nepSetting.createTime'), minWidth: 100 },
        { prop: 'updater', label: this.$t('nepSetting.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('nepSetting.updateTime'), minWidth: 100 },
        { prop: 'origSystemName', label: this.$t('nepSetting.origSystem'), minWidth: 100 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('nepSetting.ownerName'), value: 'ownerName', type: 'input', readonly: true },
        { label: this.$t('nepSetting.shopName'), value: 'shopName', type: 'input', readonly: true },
        { label: this.$t('nepSetting.skuCode'), value: 'skuCode', type: 'input', readonly: true },
        { label: this.$t('nepSetting.skuName'), value: 'skuName', type: 'input', readonly: true },
        { label: this.$t('nepSetting.spec'), value: 'spec', type: 'input', readonly: true },
        { label: this.$t('nepSetting.mainUnit'), value: 'mainUnit', type: 'input', readonly: true },
        { label: this.$t('nepSetting.mfg'), value: 'mfg', type: 'input', readonly: true },
        { label: this.$t('nepSetting.drugForm'), value: 'drugForm', type: 'input', readonly: true },
        { label: this.$t('nepSetting.drugFormSpec'), value: 'drugFormSpec', type: 'input', readonly: true },
        { label: this.$t('nepSetting.approvalNumber'), value: 'approvalNumber', type: 'input', readonly: true },
        { label: this.$t('nepSetting.barcode'), value: 'barcode', type: 'input', readonly: true },
        { label: this.$t('nepSetting.originCountry'), value: 'originCountry', type: 'input', readonly: true },
        { label: this.$t('nepSetting.invaliDate'), value: 'invaliDate', type: 'input', readonly: true },
        { label: this.$t('nepSetting.startTime'), value: 'startTime', type: 'input', readonly: true },
        { label: this.$t('nepSetting.endTime'), value: 'endTime', type: 'input', readonly: true },
        { label: this.$t('nepSetting.creator'), value: 'creator', type: 'input', readonly: true },
        { label: this.$t('nepSetting.createTime'), value: 'createTime', type: 'input', readonly: true },
        { label: this.$t('nepSetting.updater'), value: 'updater', type: 'input', readonly: true },
        { label: this.$t('nepSetting.updateTime'), value: 'updateTime', type: 'input', readonly: true },
        { label: this.$t('nepSetting.origSystem'), value: 'origSystemName', type: 'input', readonly: true }
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
        creator: null,
        createTime: null,
        shopCode: null,
        endTime: null,
        ownerCode: null,
        updater: null,
        invaliDate: null,
        startTime: null,
        updateTime: null,
        origSystem: null,
        companyCode: null,
        id: null,
        skuCode: null
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
