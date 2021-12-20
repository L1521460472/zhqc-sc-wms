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
          inventoryNo: null,
          ownerName: null,
          ownerCode: null,
          ownerId: null,
          inventoryType: null,
          sourceType: null,
          origNo: null,
          inventoryStatus: null,
          skuCode: null,
          updater: null,
          updateTime: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        sourceTypeList: [
        ],
        inventoryTypeList: [
        ],
        inventoryStatusList: [
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
        { label: this.$t('inventoryReport.inventoryNo'), value: 'inventoryNo', type: 'input' },
        { label: this.$t('inventoryReport.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('inventoryReport.inventoryType'), value: 'inventoryType', type: 'select', list: 'inventoryTypeList' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
      this.topForm.data.skuCode = null
    },

    collapsableFormMore() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('inventoryReport.inventoryNo'), value: 'inventoryNo', type: 'input' },
        { label: this.$t('inventoryReport.ownerId'), value: 'ownerId', type: 'slot' },
        // {label: this.$t('inventoryReport.ownerName'), value: "ownerName", type: "slot"},
        { label: this.$t('inventoryReport.inventoryType'), value: 'inventoryType', type: 'select', list: 'inventoryTypeList' },
        { label: this.$t('inventoryReport.sourceType'), value: 'sourceType', type: 'select', list: 'sourceTypeList' },
        { label: this.$t('inventoryReport.origNo'), value: 'origNo', type: 'input' },
        { label: this.$t('inventoryReport.inventoryStatus'), value: 'inventoryStatus', type: 'select', list: 'inventoryStatusList' },
        // {label: this.$t('inventoryReport.skuCode'), value: "skuCode", type: "input"},
        { label: this.$t('inventoryReport.skuCode'), value: 'skuCode', type: 'slot' },
        { label: this.$t('inventoryReport.updater'), value: 'updater', type: 'input' },
        // {label: this.$t('inventoryReport.updateTime'), value: "updateTime", type: "input"},
        { label: this.$t('inventoryReport.updateTimeFrom'), value: 'updateTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('inventoryReport.updateTimeTo'), value: 'updateTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },

    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化top表单
      // this.topForm.fieldList = [
      //   {label: this.$t('inventoryReport.inventoryNo'), value: "inventoryNo", type: "input"},
      //   {label: this.$t('inventoryReport.ownerId'), value: "ownerId", type: "slot"},
      //   // {label: this.$t('inventoryReport.ownerName'), value: "ownerName", type: "slot"},
      //   {label: this.$t('inventoryReport.inventoryType'), value: "inventoryType", type: "select",list: 'inventoryTypeList'},
      //   {label: this.$t('inventoryReport.sourceType'), value: "sourceType", type: "select",list: 'sourceTypeList'},
      //   {label: this.$t('inventoryReport.origNo'), value: "origNo", type: "input"},
      //   {label: this.$t('inventoryReport.inventoryStatus'), value: "inventoryStatus", type: "select",list: 'inventoryStatusList'},
      //   // {label: this.$t('inventoryReport.skuCode'), value: "skuCode", type: "input"},
      //   {label: this.$t('inventoryReport.skuCode'), value: "skuCode", type: "slot"},
      //   {label: this.$t('inventoryReport.updater'), value: "updater", type: "input"},
      //   // {label: this.$t('inventoryReport.updateTime'), value: "updateTime", type: "input"},
      //   {label: this.$t('inventoryReport.updateTimeFrom'), value: "updateTimeFrom", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {label: this.$t('inventoryReport.updateTimeTo'), value: "updateTimeTo", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
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
        { prop: 'inventoryNo', label: this.$t('inventoryReport.inventoryNo'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('inventoryReport.ownerName'), minWidth: 100 },
        { prop: 'inventoryTypeName', label: this.$t('inventoryReport.inventoryType'), minWidth: 100 },
        { prop: 'inventoryMethodName', label: this.$t('inventoryReport.inventoryMethod'), minWidth: 100 },
        { prop: 'sourceTypeName', label: this.$t('inventoryReport.sourceType'), minWidth: 100 },
        { prop: 'origNo', label: this.$t('inventoryReport.origNo'), minWidth: 100 },
        { prop: 'inventoryStatusName', label: this.$t('inventoryReport.inventoryStatus'), minWidth: 100 },
        { prop: 'remark', label: this.$t('inventoryReport.remark'), minWidth: 100 },
        { prop: 'lineNum', label: this.$t('inventoryReport.lineNum'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('inventoryReport.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('inventoryReport.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('inventoryReport.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('inventoryReport.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('inventoryReport.mainUnit'), minWidth: 100 },
        { prop: 'supplierName', label: this.$t('inventoryReport.supplierName'), minWidth: 100 },
        { prop: 'mfg', label: this.$t('inventoryReport.mfg'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('inventoryReport.originCountry'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('inventoryReport.drugForm'), minWidth: 100 },
        { prop: 'drugFormSpec', label: this.$t('inventoryReport.drugFormSpec'), minWidth: 100 },
        { prop: 'approveNo', label: this.$t('inventoryReport.approveNo'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('inventoryReport.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('inventoryReport.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('inventoryReport.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('inventoryReport.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('inventoryReport.invalidDate'), minWidth: 100 },
        { prop: 'planPdPkg', label: this.$t('inventoryReport.planPdPkg'), minWidth: 100 },
        { prop: 'planPdQty', label: this.$t('inventoryReport.planPdQty'), minWidth: 100 },
        { prop: 'firstPdQty', label: this.$t('inventoryReport.firstPdQty'), minWidth: 100 },
        { prop: 'firstDiffQty', label: this.$t('inventoryReport.firstDiffQty'), minWidth: 100 },
        { prop: 'secPdQty', label: this.$t('inventoryReport.secPdQty'), minWidth: 100 },
        { prop: 'secDiffQty', label: this.$t('inventoryReport.secDiffQty'), minWidth: 100 },
        { prop: 'confirmQty', label: this.$t('inventoryReport.confirmQty'), minWidth: 100 },
        { prop: 'confirmDiffQty', label: this.$t('inventoryReport.confirmDiffQty'), minWidth: 100 },
        { prop: 'creator', label: this.$t('inventoryReport.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('inventoryReport.createTime'), minWidth: 100 },
        { prop: 'updater', label: this.$t('inventoryReport.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('inventoryReport.updateTime'), minWidth: 100 }
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
