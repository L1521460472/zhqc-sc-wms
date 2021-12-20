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
          recheckInfoNo: null,
          ownerName: null,
          recheckInfoDate: null,
          recheckNo: null,
          recheckInfoStatus: null,
          recheckUserName: null,
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
          recheckInfoDateFrom: null,
          recheckInfoDateTo: null,
          recheckUserNo: null,
          qcUserNo: null,
          zoneId: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        recheckInfoStatusList: [
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
        { label: this.$t('gspRecheckInfoReport.recheckInfoNo'), value: 'recheckInfoNo', type: 'input' },
        { label: this.$t('gspRecheckInfoReport.recheckNo'), value: 'recheckNo', type: 'input' },
        { label: this.$t('gspRecheckInfoReport.recheckInfoStatus'), value: 'recheckInfoStatus', type: 'select', list: 'recheckInfoStatusList' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },

    collapsableFormMore() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('gspRecheckInfoReport.recheckInfoNo'), value: 'recheckInfoNo', type: 'input' },
        { label: this.$t('gspRecheckInfoReport.recheckNo'), value: 'recheckNo', type: 'input' },
        { label: this.$t('gspRecheckInfoReport.recheckInfoStatus'), value: 'recheckInfoStatus', type: 'select', list: 'recheckInfoStatusList' },

        // {label: this.$t('gspRecheckInfoReport.ownerName'), value: "ownerName", type: "input"},
        { label: this.$t('gspRecheckReport.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('gspRecheckInfoReport.zoneCode'), value: 'zoneCode', type: 'slot' },
        { label: this.$t('gspRecheckInfoReport.lotCode'), value: 'lotCode', type: 'slot' },
        { label: this.$t('gspRecheckInfoReport.skuCode'), value: 'skuCode', type: 'slot' },
        { label: this.$t('gspRecheckInfoReport.recheckUserNo'), value: 'recheckUserNo', type: 'input' },
        { label: this.$t('gspRecheckInfoReport.qcUserNo'), value: 'qcUserNo', type: 'input' },

        // {label: this.$t('gspRecheckInfoReport.recheckInfoDate'), value: "recheckInfoDate", type: "input"},
        { label: this.$t('gspRecheckInfoReport.recheckInfoDateFrom'), value: 'recheckInfoDateFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('gspRecheckInfoReport.recheckInfoDateTo'), value: 'recheckInfoDateTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },

        { label: this.$t('gspRecheckInfoReport.creator'), value: 'creator', type: 'input' },
        // {label: this.$t('gspRecheckInfoReport.createTime'), value: "createTime", type: "input"},
        { label: this.$t('gspRecheckInfoReport.createTimeFrom'), value: 'createTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('gspRecheckInfoReport.createTimeTo'), value: 'createTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('gspRecheckInfoReport.auditor'), value: 'auditor', type: 'input' },
        // {label: this.$t('gspRecheckInfoReport.auditTime'), value: "auditTime", type: "input"},
        { label: this.$t('gspRecheckInfoReport.auditTimeFrom'), value: 'auditTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('gspRecheckInfoReport.auditTimeTo'), value: 'auditTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },

    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化top表单
      // this.topForm.fieldList = [
      //   {label: this.$t('gspRecheckInfoReport.recheckInfoNo'), value: "recheckInfoNo", type: "input"},
      //   {label: this.$t('gspRecheckInfoReport.recheckNo'), value: "recheckNo", type: "input"},
      //   {label: this.$t('gspRecheckInfoReport.recheckInfoStatus'), value: "recheckInfoStatus", type: "select",list: 'recheckInfoStatusList'},

      //   // {label: this.$t('gspRecheckInfoReport.ownerName'), value: "ownerName", type: "input"},
      //   {label: this.$t('gspRecheckReport.ownerId'), value: "ownerId", type: "slot"},
      //   {label: this.$t('gspRecheckInfoReport.zoneCode'), value: "zoneCode", type: "slot"},
      //   {label: this.$t('gspRecheckInfoReport.lotCode'), value: "lotCode", type: "slot"},
      //   {label: this.$t('gspRecheckInfoReport.skuCode'), value: "skuCode", type: "slot"},
      //   {label: this.$t('gspRecheckInfoReport.recheckUserNo'), value: "recheckUserNo", type: "input"},
      //   {label: this.$t('gspRecheckInfoReport.qcUserNo'), value: "qcUserNo", type: "input"},

      //   // {label: this.$t('gspRecheckInfoReport.recheckInfoDate'), value: "recheckInfoDate", type: "input"},
      //   {label: this.$t('gspRecheckInfoReport.recheckInfoDateFrom'), value: "recheckInfoDateFrom", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {label: this.$t('gspRecheckInfoReport.recheckInfoDateTo'), value: "recheckInfoDateTo", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},

      //   {label: this.$t('gspRecheckInfoReport.creator'), value: "creator", type: "input"},
      //   // {label: this.$t('gspRecheckInfoReport.createTime'), value: "createTime", type: "input"},
      //   {label: this.$t('gspRecheckInfoReport.createTimeFrom'), value: "createTimeFrom", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {label: this.$t('gspRecheckInfoReport.createTimeTo'), value: "createTimeTo", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {label: this.$t('gspRecheckInfoReport.auditor'), value: "auditor", type: "input"},
      //   // {label: this.$t('gspRecheckInfoReport.auditTime'), value: "auditTime", type: "input"},
      //   {label: this.$t('gspRecheckInfoReport.auditTimeFrom'), value: "auditTimeFrom", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {label: this.$t('gspRecheckInfoReport.auditTimeTo'), value: "auditTimeTo", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},

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
        { prop: 'recheckInfoNo', label: this.$t('gspRecheckInfoReport.recheckInfoNo'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('gspRecheckInfoReport.ownerName'), minWidth: 100 },
        { prop: 'recheckInfoDate', label: this.$t('gspRecheckInfoReport.recheckInfoDate'), minWidth: 100 },
        { prop: 'recheckNo', label: this.$t('gspRecheckInfoReport.recheckNo'), minWidth: 100 },
        { prop: 'recheckInfoStatusName', label: this.$t('gspRecheckInfoReport.recheckInfoStatus'), minWidth: 100 },
        { prop: 'remark', label: this.$t('gspRecheckInfoReport.remark'), minWidth: 100 },
        { prop: 'recheckUserName', label: this.$t('gspRecheckInfoReport.recheckUserName'), minWidth: 100 },
        { prop: 'qcUserName', label: this.$t('gspRecheckInfoReport.qcUserName'), minWidth: 100 },
        { prop: 'creator', label: this.$t('gspRecheckInfoReport.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('gspRecheckInfoReport.createTime'), minWidth: 100 },
        { prop: 'auditor', label: this.$t('gspRecheckInfoReport.auditor'), minWidth: 100 },
        { prop: 'auditTime', label: this.$t('gspRecheckInfoReport.auditTime'), minWidth: 100 },
        { prop: 'lineNum', label: this.$t('gspRecheckInfoReport.lineNum'), minWidth: 100 },
        { prop: 'zoneCode', label: this.$t('gspRecheckInfoReport.zoneCode'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('gspRecheckInfoReport.lotCode'), minWidth: 100 },
        // {prop:"containerName", label:this.$t('gspRecheckInfoReport.containerName'), minWidth:100},
        { prop: 'skuCode', label: this.$t('gspRecheckInfoReport.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('gspRecheckInfoReport.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('gspRecheckInfoReport.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('gspRecheckInfoReport.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('gspRecheckInfoReport.mainUnit'), minWidth: 100 },
        { prop: 'supplierName', label: this.$t('gspRecheckInfoReport.supplierName'), minWidth: 100 },
        { prop: 'mfg', label: this.$t('gspRecheckInfoReport.mfg'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('gspRecheckInfoReport.originCountry'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('gspRecheckInfoReport.drugForm'), minWidth: 100 },
        { prop: 'drugFormSpec', label: this.$t('gspRecheckInfoReport.drugFormSpec'), minWidth: 100 },
        { prop: 'approvalNumber', label: this.$t('gspRecheckInfoReport.approvalNumber'), minWidth: 100 },
        { prop: 'recheckQty', label: this.$t('gspRecheckInfoReport.recheckQty'), minWidth: 100 },
        { prop: 'recheckMode', label: this.$t('gspRecheckInfoReport.recheckMode'), minWidth: 100 },
        { prop: 'actualRecheckQty', label: this.$t('gspRecheckInfoReport.actualRecheckQty'), minWidth: 100 },
        { prop: 'goodQty', label: this.$t('gspRecheckInfoReport.goodQty'), minWidth: 100 },
        { prop: 'badQty', label: this.$t('gspRecheckInfoReport.badQty'), minWidth: 100 },
        { prop: 'checkResult', label: this.$t('gspRecheckInfoReport.checkResult'), minWidth: 100 },
        { prop: 'badReason', label: this.$t('gspRecheckInfoReport.badReason'), minWidth: 100 },
        { prop: 'dealMsg', label: this.$t('gspRecheckInfoReport.dealMsg'), minWidth: 100 },
        { prop: 'dtRemark', label: this.$t('gspRecheckInfoReport.dtRemark'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('gspRecheckInfoReport.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('gspRecheckInfoReport.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('gspRecheckInfoReport.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('gspRecheckInfoReport.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('gspRecheckInfoReport.invalidDate'), minWidth: 100 }
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
