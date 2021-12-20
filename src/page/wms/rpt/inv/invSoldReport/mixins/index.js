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
          downShelfType: null,
          downShelfStatus: null,
          origNo: null,
          skuCode: null,
          recommZone: null,
          recommZoneId: null,
          recommLotCode: null,
          recommLotId: null,
          zoneCode: null,
          zoneId: null,
          downLotCode: null,
          downLotId: null,
          operator: null,
          operatorTime: null,
          operatorTimeFrom: null,
          operatorTimeTo: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        downShelfTypeList: [
        ],
        downShelfStatusList: [
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
        { label: this.$t('invSoldReport.downShelfType'), value: 'downShelfType', type: 'select', list: 'downShelfTypeList' },
        { label: this.$t('invSoldReport.downShelfStatus'), value: 'downShelfStatus', type: 'select', list: 'downShelfStatusList' },
        { label: this.$t('invSoldReport.origNo'), value: 'origNo', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
      this.topForm.data.skuCode = null
      this.topForm.data.recommZone = null
      this.topForm.data.recommLotCode = null
      this.topForm.data.zoneCode = null
      this.topForm.data.downLotCode = null
    },

    collapsableFormMore() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('invSoldReport.downShelfType'), value: 'downShelfType', type: 'select', list: 'downShelfTypeList' },
        { label: this.$t('invSoldReport.downShelfStatus'), value: 'downShelfStatus', type: 'select', list: 'downShelfStatusList' },
        { label: this.$t('invSoldReport.origNo'), value: 'origNo', type: 'input' },
        // {label: this.$t('invSoldReport.skuCode'), value: "skuCode", type: "input"},
        { label: this.$t('invSoldReport.skuCode'), value: 'skuCode', type: 'slot' },
        // {label: this.$t('invSoldReport.recommZone'), value: "recommZone", type: "input"},
        // {label: this.$t('invSoldReport.recommLotCode'), value: "recommLotCode", type: "input"},
        // {label: this.$t('invSoldReport.zoneCode'), value: "zoneCode", type: "input"},
        // {label: this.$t('invSoldReport.downLotCode'), value: "downLotCode", type: "input"},
        { label: this.$t('invSoldReport.recommZone'), value: 'recommZone', type: 'slot' },
        { label: this.$t('invSoldReport.recommLotCode'), value: 'recommLotCode', type: 'slot' },
        { label: this.$t('invSoldReport.zoneCode'), value: 'zoneCode', type: 'slot' },
        { label: this.$t('invSoldReport.downLotCode'), value: 'downLotCode', type: 'slot' },
        { label: this.$t('invSoldReport.operator'), value: 'operator', type: 'input' },
        // {label: this.$t('invSoldReport.operatorTime'), value: "operatorTime", type: "input"},
        { label: this.$t('invSoldReport.operatorTimeFrom'), value: 'operatorTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('invSoldReport.operatorTimeTo'), value: 'operatorTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },

    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化top表单
      // this.topForm.fieldList = [
      //   {label: this.$t('invSoldReport.downShelfType'), value: "downShelfType", type: "select",list: 'downShelfTypeList'},
      //   {label: this.$t('invSoldReport.downShelfStatus'), value: "downShelfStatus", type: "select",list: 'downShelfStatusList'},
      //   {label: this.$t('invSoldReport.origNo'), value: "origNo", type: "input"},
      //   // {label: this.$t('invSoldReport.skuCode'), value: "skuCode", type: "input"},
      //    {label: this.$t('invSoldReport.skuCode'), value: "skuCode", type: "slot"},
      //   // {label: this.$t('invSoldReport.recommZone'), value: "recommZone", type: "input"},
      //   // {label: this.$t('invSoldReport.recommLotCode'), value: "recommLotCode", type: "input"},
      //   // {label: this.$t('invSoldReport.zoneCode'), value: "zoneCode", type: "input"},
      //   // {label: this.$t('invSoldReport.downLotCode'), value: "downLotCode", type: "input"},
      //   {label: this.$t('invSoldReport.recommZone'), value: "recommZone", type: "slot"},
      //   {label: this.$t('invSoldReport.recommLotCode'), value: "recommLotCode", type: "slot"},
      //   {label: this.$t('invSoldReport.zoneCode'), value: "zoneCode", type: "slot"},
      //   {label: this.$t('invSoldReport.downLotCode'), value: "downLotCode", type: "slot"},
      //   {label: this.$t('invSoldReport.operator'), value: "operator", type: "input"},
      //   // {label: this.$t('invSoldReport.operatorTime'), value: "operatorTime", type: "input"},
      //   {label: this.$t('invSoldReport.operatorTimeFrom'), value: "operatorTimeFrom", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {label: this.$t('invSoldReport.operatorTimeTo'), value: "operatorTimeTo", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},

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
        { prop: 'downShelfTypeName', label: this.$t('invSoldReport.downShelfType'), minWidth: 100 },
        { prop: 'downShelfStatusName', label: this.$t('invSoldReport.downShelfStatus'), minWidth: 100 },
        { prop: 'origNo', label: this.$t('invSoldReport.origNo'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('invSoldReport.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('invSoldReport.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('invSoldReport.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('invSoldReport.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('invSoldReport.mainUnit'), minWidth: 100 },
        { prop: 'supplierName', label: this.$t('invSoldReport.supplierName'), minWidth: 100 },
        { prop: 'mfg', label: this.$t('invSoldReport.mfg'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('invSoldReport.originCountry'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('invSoldReport.drugForm'), minWidth: 100 },
        { prop: 'drugFormSpec', label: this.$t('invSoldReport.drugFormSpec'), minWidth: 100 },
        { prop: 'approveNo', label: this.$t('invSoldReport.approveNo'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('invSoldReport.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('invSoldReport.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('invSoldReport.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('invSoldReport.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('invSoldReport.invalidDate'), minWidth: 100 },
        { prop: 'planDownPkg', label: this.$t('invSoldReport.planDownPkg'), minWidth: 100 },
        { prop: 'planDownQty', label: this.$t('invSoldReport.planDownQty'), minWidth: 100 },
        { prop: 'recommZone', label: this.$t('invSoldReport.recommZone'), minWidth: 100 },
        { prop: 'recommLotCode', label: this.$t('invSoldReport.recommLotCode'), minWidth: 100 },
        { prop: 'downPkg', label: this.$t('invSoldReport.downPkg'), minWidth: 100 },
        { prop: 'downShelfQty', label: this.$t('invSoldReport.downShelfQty'), minWidth: 100 },
        { prop: 'zoneCode', label: this.$t('invSoldReport.zoneCode'), minWidth: 100 },
        { prop: 'downLotCode', label: this.$t('invSoldReport.downLotCode'), minWidth: 100 },
        { prop: 'creator', label: this.$t('invSoldReport.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('invSoldReport.createTime'), minWidth: 100 },
        { prop: 'operator', label: this.$t('invSoldReport.operator'), minWidth: 100 },
        { prop: 'operatorTime', label: this.$t('invSoldReport.operatorTime'), minWidth: 100 }
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
