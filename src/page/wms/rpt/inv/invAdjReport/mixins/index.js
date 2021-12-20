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
          adjNo: null,
          ownerName: null,
          sourceType: null,
          adjStatus: null,
          zoneCode: null,
          lotCode: null,
          skuCode: null,
          origNo: null,
          creator: null,
          createTime: null,
          auditor: null,
          auditTime: null,

          zoneId: null,
          lotId: null,
          ownerId: null,
          ownerCode: null,
          createTimeFrom: null,
          createTimeTo: null,
          auditTimeFrom: null,
          auditTimeTo: null

        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        adjStatusList: [
        ],
        sourceTypeList: [
        ]
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: null // 取消操作列
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

    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('invAdjReport.adjNo'), value: 'adjNo', type: 'input' },
        { label: this.$t('invAdjReport.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('invAdjReport.sourceType'), value: 'sourceType', type: 'select', list: 'sourceTypeList' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
      this.topForm.data.zoneCode = null
      this.topForm.data.lotCode = null
      this.topForm.data.skuCode = null
    },

    collapsableFormMore() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('invAdjReport.adjNo'), value: 'adjNo', type: 'input' },
        // {label: this.$t('invAdjReport.ownerName'), value: "ownerName", type: "input"},
        { label: this.$t('invAdjReport.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('invAdjReport.sourceType'), value: 'sourceType', type: 'select', list: 'sourceTypeList' },
        { label: this.$t('invAdjReport.adjStatus'), value: 'adjStatus', type: 'select', list: 'adjStatusList' },
        // {label: this.$t('invAdjReport.zoneCode'), value: "zoneCode", type: "input"},
        // {label: this.$t('invAdjReport.lotCode'), value: "lotCode", type: "input"},
        { label: this.$t('invAdjReport.zoneCode'), value: 'zoneCode', type: 'slot' },
        { label: this.$t('invAdjReport.lotCode'), value: 'lotCode', type: 'slot' },
        { label: this.$t('invAdjReport.skuCode'), value: 'skuCode', type: 'slot' },
        { label: this.$t('invAdjReport.origNo'), value: 'origNo', type: 'input' },
        { label: this.$t('invAdjReport.creator'), value: 'creator', type: 'input' },
        // {label: this.$t('invAdjReport.createTime'), value: "createTime", type: "input"},
        { label: this.$t('invAdjReport.createTimeFrom'), value: 'createTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('invAdjReport.createTimeTo'), value: 'createTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('invAdjReport.auditor'), value: 'auditor', type: 'input' },
        // {label: this.$t('invAdjReport.auditTime'), value: "auditTime", type: "input"},
        { label: this.$t('invAdjReport.auditTimeFrom'), value: 'auditTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('invAdjReport.auditTimeTo'), value: 'auditTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },

    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化top表单
      // this.topForm.fieldList = [
      //   {label: this.$t('invAdjReport.adjNo'), value: "adjNo", type: "input"},
      //   // {label: this.$t('invAdjReport.ownerName'), value: "ownerName", type: "input"},
      //   {label: this.$t('invAdjReport.ownerId'), value: "ownerId", type: "slot"},
      //   {label: this.$t('invAdjReport.sourceType'), value: "sourceType", type: "select",list: 'sourceTypeList'},
      //   {label: this.$t('invAdjReport.adjStatus'), value: "adjStatus", type: "select",list: 'adjStatusList'},
      //   // {label: this.$t('invAdjReport.zoneCode'), value: "zoneCode", type: "input"},
      //   // {label: this.$t('invAdjReport.lotCode'), value: "lotCode", type: "input"},
      //   {label: this.$t('invAdjReport.zoneCode'), value: "zoneCode", type: "slot"},
      //   {label: this.$t('invAdjReport.lotCode'), value: "lotCode", type: "slot"},
      //   {label: this.$t('invAdjReport.skuCode'), value: "skuCode", type: "slot"},
      //   {label: this.$t('invAdjReport.origNo'), value: "origNo", type: "input"},
      //   {label: this.$t('invAdjReport.creator'), value: "creator", type: "input"},
      //   // {label: this.$t('invAdjReport.createTime'), value: "createTime", type: "input"},
      //   {label: this.$t('invAdjReport.createTimeFrom'), value: "createTimeFrom", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {label: this.$t('invAdjReport.createTimeTo'), value: "createTimeTo", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {label: this.$t('invAdjReport.auditor'), value: "auditor", type: "input"},
      //   // {label: this.$t('invAdjReport.auditTime'), value: "auditTime", type: "input"},
      //   {label: this.$t('invAdjReport.auditTimeFrom'), value: "auditTimeFrom", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {label: this.$t('invAdjReport.auditTimeTo'), value: "auditTimeTo", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {
      //     type: "button",
      //     label: "",
      //     btnlabel: this.$t('table.search'),//查询按钮
      //     btType: "primary",
      //     icon: "el-icon-search",
      //     event: "search",//event值为notification.js中定义的方法名
      //     show: true,
      //     disabled:this.$hasPerm('search')
      //   },
      //   {
      //     type: "button",
      //     label: "",
      //     btnlabel: this.$t('table.reboot'),//重置按钮
      //     btType: "warning",
      //     icon: "el-icon-refresh-left",
      //     event: "reboot",//event值为notification.js中定义的方法名
      //     show: true,
      //     disabled:this.$hasPerm('search')
      //   }
      // ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'adjNo', label: this.$t('invAdjReport.adjNo'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('invAdjReport.ownerName'), minWidth: 100 },
        { prop: 'sourceTypeName', label: this.$t('invAdjReport.sourceType'), minWidth: 100 },
        { prop: 'adjReason', label: this.$t('invAdjReport.adjReason'), minWidth: 100 },
        { prop: 'adjStatusName', label: this.$t('invAdjReport.adjStatus'), minWidth: 100 },
        { prop: 'lineNum', label: this.$t('invAdjReport.lineNum'), minWidth: 100 },
        { prop: 'zoneCode', label: this.$t('invAdjReport.zoneCode'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('invAdjReport.lotCode'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('invAdjReport.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('invAdjReport.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('invAdjReport.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('invAdjReport.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('invAdjReport.mainUnit'), minWidth: 100 },
        { prop: 'supplierName', label: this.$t('invAdjReport.supplierName'), minWidth: 100 },
        { prop: 'mfg', label: this.$t('invAdjReport.mfg'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('invAdjReport.originCountry'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('invAdjReport.drugForm'), minWidth: 100 },
        { prop: 'drugFormSpec', label: this.$t('invAdjReport.drugFormSpec'), minWidth: 100 },
        { prop: 'approveNo', label: this.$t('invAdjReport.approveNo'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('invAdjReport.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('invAdjReport.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('invAdjReport.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('invAdjReport.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('invAdjReport.invalidDate'), minWidth: 100 },
        { prop: 'adjPkg', label: this.$t('invAdjReport.adjPkg'), minWidth: 100 },
        { prop: 'adjQty', label: this.$t('invAdjReport.adjQty'), minWidth: 100 },
        { prop: 'origNo', label: this.$t('invAdjReport.origNo'), minWidth: 100 },
        { prop: 'creator', label: this.$t('invAdjReport.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('invAdjReport.createTime'), minWidth: 100 },
        { prop: 'auditor', label: this.$t('invAdjReport.auditor'), minWidth: 100 },
        { prop: 'auditTime', label: this.$t('invAdjReport.auditTime'), minWidth: 100 }
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
