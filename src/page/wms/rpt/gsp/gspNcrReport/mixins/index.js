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
          ncrNo: null,
          ownerName: null,
          ncrDate: null,
          recheckInfoNo: null,
          ncrStatus: null,
          qcUserName: null,
          creator: null,
          createTime: null,
          auditor: null,
          auditTime: null,
          zoneCode: null,
          lotCode: null,
          skuCode: null,

          ownerId: null,
          createTimeFrom: null,
          createTimeTo: null,
          auditTimeFrom: null,
          auditTimeTo: null,
          ncrDateFrom: null,
          ncrDateTo: null,
          qcUserNo: null,
          zoneId: null

        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '150px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        ncrStatusList: [
        ]
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '210', // 默认操作按钮列宽度
          btList: [// 添加操作按钮
            // 默认查看按钮
            { label: this.$t('table.view'), type: 'primary', icon: '', event: 'openViewPage', show: true, disabled: this.$hasPerm('view') }, // event值为notification.js中定义的方法名
            // 默认修改按钮
            { label: this.$t('table.edit'), type: 'success', icon: '', event: 'openEditPage', show: true, disabled: this.$hasPerm('edit') }, // event值为notification.js中定义的方法名
            // 默认删除按钮
            { label: this.$t('table.delete'), type: 'danger', icon: '', event: 'deleteData', show: true, disabled: this.$hasPerm('delete') }// event值为notification.js中定义的方法名
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

    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('gspNcrReport.ncrNo'), value: 'ncrNo', type: 'input' },
        { label: this.$t('gspNcrReport.recheckInfoNo'), value: 'recheckInfoNo', type: 'input' },
        { label: this.$t('gspNcrReport.ncrStatus'), value: 'ncrStatus', type: 'select', list: 'ncrStatusList' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },

    collapsableFormMore() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('gspNcrReport.ncrNo'), value: 'ncrNo', type: 'input' },
        { label: this.$t('gspNcrReport.recheckInfoNo'), value: 'recheckInfoNo', type: 'input' },
        { label: this.$t('gspNcrReport.ncrStatus'), value: 'ncrStatus', type: 'select', list: 'ncrStatusList' },
        // {label: this.$t('gspNcrReport.ownerName'), value: "ownerName", type: "input"},
        { label: this.$t('gspNcrReport.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('gspRecheckInfoReport.zoneCode'), value: 'zoneCode', type: 'slot' },
        { label: this.$t('gspRecheckInfoReport.lotCode'), value: 'lotCode', type: 'slot' },
        { label: this.$t('gspRecheckInfoReport.skuCode'), value: 'skuCode', type: 'slot' },
        { label: this.$t('gspRecheckInfoReport.qcUserNo'), value: 'qcUserNo', type: 'input' },

        // {label: this.$t('gspNcrReport.ncrDate'), value: "ncrDate", type: "input"},
        { label: this.$t('gspNcrReport.ncrDateFrom'), value: 'ncrDateFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('gspNcrReport.ncrDateTo'), value: 'ncrDateTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },

        { label: this.$t('gspNcrReport.creator'), value: 'creator', type: 'input' },
        // {label: this.$t('gspNcrReport.createTime'), value: "createTime", type: "input"},
        { label: this.$t('gspNcrReport.createTimeFrom'), value: 'createTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('gspNcrReport.createTimeTo'), value: 'createTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },

        { label: this.$t('gspNcrReport.auditor'), value: 'auditor', type: 'input' },
        // {label: this.$t('gspNcrReport.auditTime'), value: "auditTime", type: "input"},
        { label: this.$t('gspNcrReport.auditTimeFrom'), value: 'auditTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('gspNcrReport.auditTimeTo'), value: 'auditTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },

    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化top表单
      // this.topForm.fieldList = [
      //   {label: this.$t('gspNcrReport.ncrNo'), value: "ncrNo", type: "input"},
      //   {label: this.$t('gspNcrReport.recheckInfoNo'), value: "recheckInfoNo", type: "input"},
      //   {label: this.$t('gspNcrReport.ncrStatus'), value: "ncrStatus", type: "select",list: 'ncrStatusList'},
      //   // {label: this.$t('gspNcrReport.ownerName'), value: "ownerName", type: "input"},
      //   {label: this.$t('gspNcrReport.ownerId'), value: "ownerId", type: "slot"},
      //   {label: this.$t('gspRecheckInfoReport.zoneCode'), value: "zoneCode", type: "slot"},
      //   {label: this.$t('gspRecheckInfoReport.lotCode'), value: "lotCode", type: "slot"},
      //   {label: this.$t('gspRecheckInfoReport.skuCode'), value: "skuCode", type: "slot"},
      //   {label: this.$t('gspRecheckInfoReport.qcUserNo'), value: "qcUserNo", type: "input"},

      //   // {label: this.$t('gspNcrReport.ncrDate'), value: "ncrDate", type: "input"},
      //   {label: this.$t('gspNcrReport.ncrDateFrom'), value: "ncrDateFrom", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {label: this.$t('gspNcrReport.ncrDateTo'), value: "ncrDateTo", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},

      //   {label: this.$t('gspNcrReport.creator'), value: "creator", type: "input"},
      //   // {label: this.$t('gspNcrReport.createTime'), value: "createTime", type: "input"},
      //   {label: this.$t('gspNcrReport.createTimeFrom'), value: "createTimeFrom", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {label: this.$t('gspNcrReport.createTimeTo'), value: "createTimeTo", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},

      //   {label: this.$t('gspNcrReport.auditor'), value: "auditor", type: "input"},
      //   // {label: this.$t('gspNcrReport.auditTime'), value: "auditTime", type: "input"},
      //   {label: this.$t('gspNcrReport.auditTimeFrom'), value: "auditTimeFrom", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {label: this.$t('gspNcrReport.auditTimeTo'), value: "auditTimeTo", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
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
        { prop: 'ncrNo', label: this.$t('gspNcrReport.ncrNo'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('gspNcrReport.ownerName'), minWidth: 100 },
        { prop: 'ncrDate', label: this.$t('gspNcrReport.ncrDate'), minWidth: 100 },
        { prop: 'recheckInfoNo', label: this.$t('gspNcrReport.recheckInfoNo'), minWidth: 100 },
        { prop: 'ncrStatusName', label: this.$t('gspNcrReport.ncrStatus'), minWidth: 100 },
        { prop: 'remark', label: this.$t('gspNcrReport.remark'), minWidth: 100 },
        { prop: 'recheckUserName', label: this.$t('gspNcrReport.recheckUserName'), minWidth: 100 },
        { prop: 'qcUserName', label: this.$t('gspNcrReport.qcUserName'), minWidth: 100 },
        { prop: 'creator', label: this.$t('gspNcrReport.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('gspNcrReport.createTime'), minWidth: 100 },
        { prop: 'auditor', label: this.$t('gspNcrReport.auditor'), minWidth: 100 },
        { prop: 'auditTime', label: this.$t('gspNcrReport.auditTime'), minWidth: 100 },
        { prop: 'lineNum', label: this.$t('gspNcrReport.lineNum'), minWidth: 100 },
        { prop: 'zoneCode', label: this.$t('gspNcrReport.zoneCode'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('gspNcrReport.lotCode'), minWidth: 100 },
        // {prop:"containerName", label:this.$t('gspNcrReport.containerName'), minWidth:100},
        { prop: 'skuCode', label: this.$t('gspNcrReport.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('gspNcrReport.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('gspNcrReport.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('gspNcrReport.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('gspNcrReport.mainUnit'), minWidth: 100 },
        { prop: 'supplierName', label: this.$t('gspNcrReport.supplierName'), minWidth: 100 },
        { prop: 'mfg', label: this.$t('gspNcrReport.mfg'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('gspNcrReport.originCountry'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('gspNcrReport.drugForm'), minWidth: 100 },
        { prop: 'drugFormSpec', label: this.$t('gspNcrReport.drugFormSpec'), minWidth: 100 },
        { prop: 'approvalNumber', label: this.$t('gspNcrReport.approvalNumber'), minWidth: 100 },
        { prop: 'badQty', label: this.$t('gspNcrReport.badQty'), minWidth: 100 },
        { prop: 'badReason', label: this.$t('gspNcrReport.badReason'), minWidth: 100 },
        { prop: 'dealMsg', label: this.$t('gspNcrReport.dealMsg'), minWidth: 100 },
        { prop: 'dealUserName', label: this.$t('gspNcrReport.dealUserName'), minWidth: 100 },
        { prop: 'dealReslut', label: this.$t('gspNcrReport.dealReslut'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('gspNcrReport.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('gspNcrReport.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('gspNcrReport.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('gspNcrReport.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('gspNcrReport.invalidDate'), minWidth: 100 }
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
