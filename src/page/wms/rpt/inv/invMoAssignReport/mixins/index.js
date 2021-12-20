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
          moNo: null,
          ownerName: null,
          moType: null,
          sourceType: null,
          origNo: null,
          moStatus: null,
          finishSkuCode: null,
          planFinishTime: null,
          actualFinishTime: null,
          zoneCode: null,
          lotCode: null,

          zoneId: null,
          lotId: null,
          ownerId: null,
          ownerCode: null,
          planFinishTimeFrom: null,
          planFinishTimeTo: null,
          actualFinishTimeFrom: null,
          actualFinishTimeTo: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '130px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        moTypeList: [
        ],
        sourceTypeList: [
        ],
        moStatusList: [
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
        { label: this.$t('invMoAssignReport.moNo'), value: 'moNo', type: 'input' },
        { label: this.$t('invMoAssignReport.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('invMoAssignReport.moType'), value: 'moType', type: 'select', list: 'moTypeList' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
      this.topForm.data.lotCode = null
      this.topForm.data.zoneCode = null
      this.topForm.data.finishSkuCode = null
    },

    collapsableFormMore() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('invMoAssignReport.moNo'), value: 'moNo', type: 'input' },
        // {label: this.$t('invMoAssignReport.ownerName'), value: "ownerName", type: "input"},
        { label: this.$t('invMoAssignReport.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('invMoAssignReport.moType'), value: 'moType', type: 'select', list: 'moTypeList' },
        { label: this.$t('invMoAssignReport.sourceType'), value: 'sourceType', type: 'select', list: 'sourceTypeList' },
        { label: this.$t('invMoAssignReport.origNo'), value: 'origNo', type: 'input' },
        { label: this.$t('invMoAssignReport.moStatus'), value: 'moStatus', type: 'select', list: 'moStatusList' },
        { label: this.$t('invMoAssignReport.finishSkuCode'), value: 'finishSkuCode', type: 'slot' },
        // {label: this.$t('invMoAssignReport.skuCode'), value: "skuCode", type: "input"},
        // {label: this.$t('invMoAssignReport.planFinishTime'), value: "planFinishTime", type: "input"},
        // {label: this.$t('invMoAssignReport.actualFinishTime'), value: "actualFinishTime", type: "input"},
        { label: this.$t('invMoAssignReport.planFinishTimeFrom'), value: 'planFinishTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('invMoAssignReport.planFinishTimeTo'), value: 'planFinishTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('invMoAssignReport.actualFinishTimeFrom'), value: 'actualFinishTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('invMoAssignReport.actualFinishTimeTo'), value: 'actualFinishTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        // {label: this.$t('invMoAssignReport.zoneCode'), value: "zoneCode", type: "input"},
        // {label: this.$t('invMoAssignReport.lotCode'), value: "lotCode", type: "input"},
        { label: this.$t('invMoAssignReport.zoneCode'), value: 'zoneCode', type: 'slot' },
        { label: this.$t('invMoAssignReport.lotCode'), value: 'lotCode', type: 'slot' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },

    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化top表单
      // this.topForm.fieldList = [
      //   {label: this.$t('invMoAssignReport.moNo'), value: "moNo", type: "input"},
      //   // {label: this.$t('invMoAssignReport.ownerName'), value: "ownerName", type: "input"},
      //   {label: this.$t('invMoAssignReport.ownerId'), value: "ownerId", type: "slot"},
      //   {label: this.$t('invMoAssignReport.moType'), value: "moType", type: "select",list: 'moTypeList'},
      //   {label: this.$t('invMoAssignReport.sourceType'), value: "sourceType", type: "select",list: 'sourceTypeList'},
      //   {label: this.$t('invMoAssignReport.origNo'), value: "origNo", type: "input"},
      //   {label: this.$t('invMoAssignReport.moStatus'), value: "moStatus", type: "select",list: 'moStatusList'},
      //   {label: this.$t('invMoAssignReport.finishSkuCode'), value: "finishSkuCode", type: "slot"},
      //   // {label: this.$t('invMoAssignReport.skuCode'), value: "skuCode", type: "input"},
      //   // {label: this.$t('invMoAssignReport.planFinishTime'), value: "planFinishTime", type: "input"},
      //   // {label: this.$t('invMoAssignReport.actualFinishTime'), value: "actualFinishTime", type: "input"},
      //   {label: this.$t('invMoAssignReport.planFinishTimeFrom'), value: "planFinishTimeFrom", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {label: this.$t('invMoAssignReport.planFinishTimeTo'), value: "planFinishTimeTo", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {label: this.$t('invMoAssignReport.actualFinishTimeFrom'), value: "actualFinishTimeFrom", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {label: this.$t('invMoAssignReport.actualFinishTimeTo'), value: "actualFinishTimeTo", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   // {label: this.$t('invMoAssignReport.zoneCode'), value: "zoneCode", type: "input"},
      //   // {label: this.$t('invMoAssignReport.lotCode'), value: "lotCode", type: "input"},
      //   {label: this.$t('invMoAssignReport.zoneCode'), value: "zoneCode", type: "slot"},
      //   {label: this.$t('invMoAssignReport.lotCode'), value: "lotCode", type: "slot"},
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
        { prop: 'moNo', label: this.$t('invMoAssignReport.moNo'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('invMoAssignReport.ownerName'), minWidth: 100 },
        { prop: 'moTypeName', label: this.$t('invMoAssignReport.moType'), minWidth: 100 },
        { prop: 'sourceTypeName', label: this.$t('invMoAssignReport.sourceType'), minWidth: 100 },
        { prop: 'origNo', label: this.$t('invMoAssignReport.origNo'), minWidth: 100 },
        { prop: 'moStatusName', label: this.$t('invMoAssignReport.moStatus'), minWidth: 100 },
        { prop: 'processZone', label: this.$t('invMoAssignReport.processZone'), minWidth: 100 },
        { prop: 'processLot', label: this.$t('invMoAssignReport.processLot'), minWidth: 100 },
        { prop: 'finishSkuCode', label: this.$t('invMoAssignReport.finishSkuCode'), minWidth: 100 },
        { prop: 'finishBarcode', label: this.$t('invMoAssignReport.finishBarcode'), minWidth: 100 },
        { prop: 'finishSkuName', label: this.$t('invMoAssignReport.finishSkuName'), minWidth: 100 },
        { prop: 'finishSpec', label: this.$t('invMoAssignReport.finishSpec'), minWidth: 100 },
        { prop: 'finishMainUnit', label: this.$t('invMoAssignReport.finishMainUnit'), minWidth: 100 },
        { prop: 'moQty', label: this.$t('invMoAssignReport.moQty'), minWidth: 100 },
        { prop: 'totalFinishQty', label: this.$t('invMoAssignReport.totalFinishQty'), minWidth: 100 },
        { prop: 'planFinishTime', label: this.$t('invMoAssignReport.planFinishTime'), minWidth: 100 },
        { prop: 'actualFinishTime', label: this.$t('invMoAssignReport.actualFinishTime'), minWidth: 100 },
        { prop: 'zoneCode', label: this.$t('invMoAssignReport.zoneCode'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('invMoAssignReport.lotCode'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('invMoAssignReport.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('invMoAssignReport.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('invMoAssignReport.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('invMoAssignReport.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('invMoAssignReport.mainUnit'), minWidth: 100 },
        { prop: 'supplierName', label: this.$t('invMoAssignReport.supplierName'), minWidth: 100 },
        { prop: 'mfg', label: this.$t('invMoAssignReport.mfg'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('invMoAssignReport.originCountry'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('invMoAssignReport.drugForm'), minWidth: 100 },
        { prop: 'drugFormSpec', label: this.$t('invMoAssignReport.drugFormSpec'), minWidth: 100 },
        { prop: 'approveNo', label: this.$t('invMoAssignReport.approveNo'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('invMoAssignReport.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('invMoAssignReport.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('invMoAssignReport.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('invMoAssignReport.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('invMoAssignReport.invalidDate'), minWidth: 100 },
        { prop: 'planPickQty', label: this.$t('invMoAssignReport.planPickQty'), minWidth: 100 },
        { prop: 'allotQty', label: this.$t('invMoAssignReport.allotQty'), minWidth: 100 },
        { prop: 'movedQty', label: this.$t('invMoAssignReport.movedQty'), minWidth: 100 },
        { prop: 'moUsedQty', label: this.$t('invMoAssignReport.moUsedQty'), minWidth: 100 },
        { prop: 'finishedQty', label: this.$t('invMoAssignReport.finishedQty'), minWidth: 100 }
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
