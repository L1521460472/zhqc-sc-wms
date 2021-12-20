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
        { label: this.$t('invMoFinishReport.moNo'), value: 'moNo', type: 'input' },
        { label: this.$t('invMoFinishReport.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('invMoFinishReport.moType'), value: 'moType', type: 'select', list: 'moTypeList' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
      this.topForm.data.zoneCode = null
      this.topForm.data.lotCode = null
      this.topForm.data.finishSkuCode = null
    },

    collapsableFormMore() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('invMoFinishReport.moNo'), value: 'moNo', type: 'input' },
        // {label: this.$t('invMoFinishReport.ownerName'), value: "ownerName", type: "input"},
        { label: this.$t('invMoFinishReport.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('invMoFinishReport.moType'), value: 'moType', type: 'select', list: 'moTypeList' },
        { label: this.$t('invMoFinishReport.sourceType'), value: 'sourceType', type: 'select', list: 'sourceTypeList' },
        { label: this.$t('invMoFinishReport.origNo'), value: 'origNo', type: 'input' },
        { label: this.$t('invMoFinishReport.moStatus'), value: 'moStatus', type: 'select', list: 'moStatusList' },
        { label: this.$t('invMoFinishReport.finishSkuCode'), value: 'finishSkuCode', type: 'slot' },
        // {label: this.$t('invMoFinishReport.planFinishTime'), value: "planFinishTime", type: "input"},
        // {label: this.$t('invMoFinishReport.actualFinishTime'), value: "actualFinishTime", type: "input"},
        { label: this.$t('invMoFinishReport.planFinishTimeFrom'), value: 'planFinishTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('invMoFinishReport.planFinishTimeTo'), value: 'planFinishTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('invMoFinishReport.actualFinishTimeFrom'), value: 'actualFinishTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('invMoFinishReport.actualFinishTimeTo'), value: 'actualFinishTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        // {label: this.$t('invMoFinishReport.zoneCode'), value: "zoneCode", type: "input"},
        // {label: this.$t('invMoFinishReport.lotCode'), value: "lotCode", type: "input"},
        { label: this.$t('invMoFinishReport.zoneCode'), value: 'zoneCode', type: 'slot' },
        { label: this.$t('invMoFinishReport.lotCode'), value: 'lotCode', type: 'slot' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },

    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化top表单
      // this.topForm.fieldList = [
      //   {label: this.$t('invMoFinishReport.moNo'), value: "moNo", type: "input"},
      //   // {label: this.$t('invMoFinishReport.ownerName'), value: "ownerName", type: "input"},
      //   {label: this.$t('invMoFinishReport.ownerId'), value: "ownerId", type: "slot"},
      //   {label: this.$t('invMoFinishReport.moType'), value: "moType", type: "select",list: 'moTypeList'},
      //   {label: this.$t('invMoFinishReport.sourceType'), value: "sourceType", type: "select",list: 'sourceTypeList'},
      //   {label: this.$t('invMoFinishReport.origNo'), value: "origNo", type: "input"},
      //   {label: this.$t('invMoFinishReport.moStatus'), value: "moStatus", type: "select",list: 'moStatusList'},
      //   {label: this.$t('invMoFinishReport.finishSkuCode'), value: "finishSkuCode", type: "slot"},
      //   // {label: this.$t('invMoFinishReport.planFinishTime'), value: "planFinishTime", type: "input"},
      //   // {label: this.$t('invMoFinishReport.actualFinishTime'), value: "actualFinishTime", type: "input"},
      //   {label: this.$t('invMoFinishReport.planFinishTimeFrom'), value: "planFinishTimeFrom", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {label: this.$t('invMoFinishReport.planFinishTimeTo'), value: "planFinishTimeTo", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {label: this.$t('invMoFinishReport.actualFinishTimeFrom'), value: "actualFinishTimeFrom", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {label: this.$t('invMoFinishReport.actualFinishTimeTo'), value: "actualFinishTimeTo", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   // {label: this.$t('invMoFinishReport.zoneCode'), value: "zoneCode", type: "input"},
      //   // {label: this.$t('invMoFinishReport.lotCode'), value: "lotCode", type: "input"},
      //   {label: this.$t('invMoFinishReport.zoneCode'), value: "zoneCode", type: "slot"},
      //   {label: this.$t('invMoFinishReport.lotCode'), value: "lotCode", type: "slot"},
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
        { prop: 'moNo', label: this.$t('invMoFinishReport.moNo'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('invMoFinishReport.ownerName'), minWidth: 100 },
        { prop: 'moTypeName', label: this.$t('invMoFinishReport.moType'), minWidth: 100 },
        { prop: 'sourceTypeName', label: this.$t('invMoFinishReport.sourceType'), minWidth: 100 },
        { prop: 'origNo', label: this.$t('invMoFinishReport.origNo'), minWidth: 100 },
        { prop: 'moStatusName', label: this.$t('invMoFinishReport.moStatus'), minWidth: 100 },
        { prop: 'processZone', label: this.$t('invMoFinishReport.processZone'), minWidth: 100 },
        { prop: 'processLot', label: this.$t('invMoFinishReport.processLot'), minWidth: 100 },
        { prop: 'finishSkuCode', label: this.$t('invMoFinishReport.finishSkuCode'), minWidth: 100 },
        { prop: 'finishBarcode', label: this.$t('invMoFinishReport.finishBarcode'), minWidth: 100 },
        { prop: 'finishSkuName', label: this.$t('invMoFinishReport.finishSkuName'), minWidth: 100 },
        { prop: 'finishSpec', label: this.$t('invMoFinishReport.finishSpec'), minWidth: 100 },
        { prop: 'finishMainUnit', label: this.$t('invMoFinishReport.finishMainUnit'), minWidth: 100 },
        { prop: 'moQty', label: this.$t('invMoFinishReport.moQty'), minWidth: 100 },
        { prop: 'planFinishTime', label: this.$t('invMoFinishReport.planFinishTime'), minWidth: 100 },
        { prop: 'actualFinishTime', label: this.$t('invMoFinishReport.actualFinishTime'), minWidth: 100 },
        { prop: 'zoneCode', label: this.$t('invMoFinishReport.zoneCode'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('invMoFinishReport.lotCode'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('invMoFinishReport.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('invMoFinishReport.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('invMoFinishReport.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('invMoFinishReport.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('invMoFinishReport.mainUnit'), minWidth: 100 },
        { prop: 'supplierName', label: this.$t('invMoFinishReport.supplierName'), minWidth: 100 },
        { prop: 'mfg', label: this.$t('invMoFinishReport.mfg'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('invMoFinishReport.originCountry'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('invMoFinishReport.drugForm'), minWidth: 100 },
        { prop: 'drugFormSpec', label: this.$t('invMoFinishReport.drugFormSpec'), minWidth: 100 },
        { prop: 'approveNo', label: this.$t('invMoFinishReport.approveNo'), minWidth: 100 },
        { prop: 'finishQty', label: this.$t('invMoFinishReport.finishQty'), minWidth: 100 },
        { prop: 'unFinishQty', label: this.$t('invMoFinishReport.unFinishQty'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('invMoFinishReport.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('invMoFinishReport.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('invMoFinishReport.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('invMoFinishReport.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('invMoFinishReport.invalidDate'), minWidth: 100 }
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
