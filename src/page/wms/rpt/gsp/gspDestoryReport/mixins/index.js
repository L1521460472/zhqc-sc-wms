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
          badDestroyNo: null,
          ownerName: null,
          destroyTime: null,
          status: null,
          supervisorNo: null,
          creator: null,
          createTime: null,
          reportNo: null,
          skuCode: null,

          ownerId: null,
          createTimeFrom: null,
          createTimeTo: null,
          auditTimeFrom: null,
          auditTimeTo: null,
          destroyTimeFrom: null,
          destroyTimeTo: null,
          zoneId: null

        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        statusList: [
        ]
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: null /* {//表格自定义按钮
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
        { label: this.$t('gspDestoryReport.badDestroyNo'), value: 'badDestroyNo', type: 'input' },
        { label: this.$t('gspDestoryReport.reportNo'), value: 'reportNo', type: 'input' },
        { label: this.$t('gspDestoryReport.ownerId'), value: 'ownerId', type: 'slot' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },

    collapsableFormMore() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('gspDestoryReport.badDestroyNo'), value: 'badDestroyNo', type: 'input' },
        { label: this.$t('gspDestoryReport.reportNo'), value: 'reportNo', type: 'input' },
        // {label: this.$t('gspDestoryReport.status'), value: "status", type: "input"},
        { label: this.$t('gspDestoryReport.ownerId'), value: 'ownerId', type: 'slot' },
        // {label: this.$t('gspDestoryReport.ownerName'), value: "ownerName", type: "input"},
        { label: this.$t('gspDestoryReport.skuCode'), value: 'skuCode', type: 'slot' },
        { label: this.$t('gspDestoryReport.supervisorNo'), value: 'supervisorNo', type: 'input' },
        // {label: this.$t('gspDestoryReport.destroyTime'), value: "destroyTime", type: "input"},
        { label: this.$t('gspDestoryReport.destroyTimeFrom'), value: 'destroyTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('gspDestoryReport.destroyTimeTo'), value: 'destroyTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('gspDestoryReport.creator'), value: 'creator', type: 'input' },
        // {label: this.$t('gspDestoryReport.createTime'), value: "createTime", type: "input"},
        { label: this.$t('gspDestoryReport.createTimeFrom'), value: 'createTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('gspDestoryReport.createTimeTo'), value: 'createTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },

    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化top表单
      // this.topForm.fieldList = [
      //   {label: this.$t('gspDestoryReport.badDestroyNo'), value: "badDestroyNo", type: "input"},
      //   {label: this.$t('gspDestoryReport.reportNo'), value: "reportNo", type: "input"},
      //   // {label: this.$t('gspDestoryReport.status'), value: "status", type: "input"},
      //   {label: this.$t('gspDestoryReport.ownerId'), value: "ownerId", type: "slot"},
      //   // {label: this.$t('gspDestoryReport.ownerName'), value: "ownerName", type: "input"},
      //   {label: this.$t('gspDestoryReport.skuCode'), value: "skuCode", type: "slot"},
      //   {label: this.$t('gspDestoryReport.supervisorNo'), value: "supervisorNo", type: "input"},
      //   // {label: this.$t('gspDestoryReport.destroyTime'), value: "destroyTime", type: "input"},
      //   {label: this.$t('gspDestoryReport.destroyTimeFrom'), value: "destroyTimeFrom", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {label: this.$t('gspDestoryReport.destroyTimeTo'), value: "destroyTimeTo", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {label: this.$t('gspDestoryReport.creator'), value: "creator", type: "input"},
      //   // {label: this.$t('gspDestoryReport.createTime'), value: "createTime", type: "input"},
      //   {label: this.$t('gspDestoryReport.createTimeFrom'), value: "createTimeFrom",  type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {label: this.$t('gspDestoryReport.createTimeTo'), value: "createTimeTo", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss' },
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
        { prop: 'badDestroyNo', label: this.$t('gspDestoryReport.badDestroyNo'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('gspDestoryReport.ownerName'), minWidth: 100 },
        { prop: 'destroyTime', label: this.$t('gspDestoryReport.destroyTime'), minWidth: 100 },
        { prop: 'origSys', label: this.$t('gspDestoryReport.origSys'), minWidth: 100 },
        { prop: 'status', label: this.$t('gspDestoryReport.status'), minWidth: 100 },
        { prop: 'remark', label: this.$t('gspDestoryReport.remark'), minWidth: 100 },
        { prop: 'supervisorNo', label: this.$t('gspDestoryReport.supervisorNo'), minWidth: 100 },
        { prop: 'destroyMethod', label: this.$t('gspDestoryReport.destroyMethod'), minWidth: 100 },
        { prop: 'destroyAddr', label: this.$t('gspDestoryReport.destroyAddr'), minWidth: 100 },
        { prop: 'creator', label: this.$t('gspDestoryReport.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('gspDestoryReport.createTime'), minWidth: 100 },
        { prop: 'rowNo', label: this.$t('gspDestoryReport.rowNo'), minWidth: 100 },
        { prop: 'reportNo', label: this.$t('gspDestoryReport.reportNo'), minWidth: 100 },
        { prop: 'reportRowNo', label: this.$t('gspDestoryReport.reportRowNo'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('gspDestoryReport.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('gspDestoryReport.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('gspDestoryReport.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('gspDestoryReport.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('gspDestoryReport.mainUnit'), minWidth: 100 },
        { prop: 'supplierName', label: this.$t('gspDestoryReport.supplierName'), minWidth: 100 },
        { prop: 'mfg', label: this.$t('gspDestoryReport.mfg'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('gspDestoryReport.originCountry'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('gspDestoryReport.drugForm'), minWidth: 100 },
        { prop: 'drugFormSpec', label: this.$t('gspDestoryReport.drugFormSpec'), minWidth: 100 },
        { prop: 'approvalNumber', label: this.$t('gspDestoryReport.approvalNumber'), minWidth: 100 },
        { prop: 'destroyQty', label: this.$t('gspDestoryReport.destroyQty'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('gspDestoryReport.batchNo'), minWidth: 100 },
        { prop: 'productBatch', label: this.$t('gspDestoryReport.productBatch'), minWidth: 100 },
        { prop: 'productDate', label: this.$t('gspDestoryReport.productDate'), minWidth: 100 },
        { prop: 'invdate', label: this.$t('gspDestoryReport.invdate'), minWidth: 100 },
        { prop: 'invaliDate', label: this.$t('gspDestoryReport.invaliDate'), minWidth: 100 }
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
