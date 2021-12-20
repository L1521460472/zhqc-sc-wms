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
          proMaintainNo: null,
          ownerName: null,
          maintainType: null,
          maintainDate: null,
          creator: null,
          createTime: null,
          auditUser: null,
          auditTime: null,
          zoneCode: null,
          lotCode: null,
          skuCode: null,

          ownerId: null,
          zoneId: null,
          maintainDateFrom: null,
          maintainDateTo: null,
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
        maintainTypeList: [
        ],
        proMaintainStatusList: [
        ]
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: null/* {//表格自定义按钮
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
        } */
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
        { label: this.$t('maintainProReport.proMaintainNo'), value: 'proMaintainNo', type: 'input' },
        { label: this.$t('maintainProReport.maintainType'), value: 'maintainType', type: 'select', list: 'maintainTypeList' },
        { label: this.$t('maintainProReport.maintainDateFrom'), value: 'maintainDateFrom', type: 'date' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },

    collapsableFormMore() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('maintainProReport.proMaintainNo'), value: 'proMaintainNo', type: 'input' },
        // {label: this.$t('maintainProReport.ownerName'), value: "ownerName", type: "input"},
        { label: this.$t('maintainProReport.maintainType'), value: 'maintainType', type: 'select', list: 'maintainTypeList' },
        // {label: this.$t('maintainProReport.maintainDate'), value: "maintainDate", type: "input"},
        { label: this.$t('maintainProReport.maintainDateFrom'), value: 'maintainDateFrom', type: 'date' },
        { label: this.$t('maintainProReport.maintainDateTo'), value: 'maintainDateTo', type: 'date' },
        { label: this.$t('maintainProReport.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('maintainProReport.skuCode'), value: 'skuCode', type: 'slot' },
        { label: this.$t('maintainProReport.zoneCode'), value: 'zoneCode', type: 'slot' },
        { label: this.$t('maintainProReport.lotCode'), value: 'lotCode', type: 'slot' },
        { label: this.$t('maintainProReport.creator'), value: 'creator', type: 'input' },
        // {label: this.$t('maintainProReport.createTime'), value: "createTime", type: "input"},
        { label: this.$t('maintainProReport.createTimeFrom'), value: 'createTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('maintainProReport.createTimeTo'), value: 'createTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('maintainProReport.auditUser'), value: 'auditUser', type: 'input' },
        // {label: this.$t('maintainProReport.auditTime'), value: "auditTime", type: "input"},
        { label: this.$t('maintainProReport.auditTimeFrom'), value: 'auditTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('maintainProReport.auditTimeTo'), value: 'auditTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },

    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化top表单
      // this.topForm.fieldList = [
      //   {label: this.$t('maintainProReport.proMaintainNo'), value: "proMaintainNo", type: "input"},
      //   // {label: this.$t('maintainProReport.ownerName'), value: "ownerName", type: "input"},
      //   {label: this.$t('maintainProReport.maintainType'), value: "maintainType", type: "select",list: 'maintainTypeList'},
      //   // {label: this.$t('maintainProReport.maintainDate'), value: "maintainDate", type: "input"},
      //   {label: this.$t('maintainProReport.maintainDateFrom'), value: "maintainDateFrom", type: "date"},
      //   {label: this.$t('maintainProReport.maintainDateTo'), value: "maintainDateTo", type: "date"},
      //   {label: this.$t('maintainProReport.ownerId'), value: "ownerId", type: "slot"},
      //   {label: this.$t('maintainProReport.skuCode'), value: "skuCode", type: "slot"},
      //   {label: this.$t('maintainProReport.zoneCode'), value: "zoneCode", type: "slot"},
      //   {label: this.$t('maintainProReport.lotCode'), value: "lotCode", type: "slot"},
      //   {label: this.$t('maintainProReport.creator'), value: "creator", type: "input"},
      //   // {label: this.$t('maintainProReport.createTime'), value: "createTime", type: "input"},
      //   {label: this.$t('maintainProReport.createTimeFrom'), value: "createTimeFrom", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {label: this.$t('maintainProReport.createTimeTo'), value: "createTimeTo", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {label: this.$t('maintainProReport.auditUser'), value: "auditUser", type: "input"},
      //   // {label: this.$t('maintainProReport.auditTime'), value: "auditTime", type: "input"},
      //   {label: this.$t('maintainProReport.auditTimeFrom'), value: "auditTimeFrom", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {label: this.$t('maintainProReport.auditTimeTo'), value: "auditTimeTo", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},

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
        { prop: 'proMaintainNo', label: this.$t('maintainProReport.proMaintainNo'), minWidth: 130 },
        { prop: 'ownerName', label: this.$t('maintainProReport.ownerName'), minWidth: 100 },
        { prop: 'maintainTypeName', label: this.$t('maintainProReport.maintainType'), minWidth: 100 },
        { prop: 'maintainDate', label: this.$t('maintainProReport.maintainDate'), minWidth: 100 },
        { prop: 'breedNum', label: this.$t('maintainProReport.breedNum'), minWidth: 100 },
        { prop: 'qty', label: this.$t('maintainProReport.qty'), minWidth: 100 },
        { prop: 'remark', label: this.$t('maintainProReport.remark'), minWidth: 100 },
        { prop: 'creator', label: this.$t('maintainProReport.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('maintainProReport.createTime'), minWidth: 100 },
        { prop: 'auditUser', label: this.$t('maintainProReport.auditUser'), minWidth: 100 },
        { prop: 'auditTime', label: this.$t('maintainProReport.auditTime'), minWidth: 100 },
        { prop: 'zoneCode', label: this.$t('maintainProReport.zoneCode'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('maintainProReport.lotCode'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('maintainProReport.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('maintainProReport.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('maintainProReport.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('maintainProReport.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('maintainProReport.mainUnit'), minWidth: 100 },
        { prop: 'supplierName', label: this.$t('maintainProReport.supplierName'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('maintainProReport.originCountry'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('maintainProReport.drugForm'), minWidth: 100 },
        { prop: 'drugFormSpec', label: this.$t('maintainProReport.drugFormSpec'), minWidth: 100 },
        { prop: 'approvalNumber', label: this.$t('maintainProReport.approvalNumber'), minWidth: 100 },
        { prop: 'qualityStatus', label: this.$t('maintainProReport.qualityStatus'), minWidth: 100 },
        { prop: 'maintainMeasure', label: this.$t('maintainProReport.maintainMeasure'), minWidth: 100 },
        { prop: 'maintainConclusion', label: this.$t('maintainProReport.maintainConclusion'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('maintainProReport.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('maintainProReport.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('maintainProReport.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('maintainProReport.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('maintainProReport.invalidDate'), minWidth: 100 }
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
