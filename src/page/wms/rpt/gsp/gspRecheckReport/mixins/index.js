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
          recheckNo: null,
          ownerName: null,
          recheckDate: null,
          frozenNo: null,
          recheckStatus: null,
          qcUserName: null,
          maintainUserName: null,
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
          recheckDateFrom: null,
          recheckDateTo: null,
          maintainUserNo: null,
          qcUserNo: null,
          zoneId: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        recheckStatusList: []
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
        { label: this.$t('gspRecheckReport.recheckNo'), value: 'recheckNo', type: 'input' },
        { label: this.$t('gspRecheckReport.frozenNo'), value: 'frozenNo', type: 'input' },
        { label: this.$t('gspRecheckReport.recheckStatus'), value: 'recheckStatus', type: 'select', list: 'recheckStatusList' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },

    collapsableFormMore() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('gspRecheckReport.recheckNo'), value: 'recheckNo', type: 'input' },
        { label: this.$t('gspRecheckReport.frozenNo'), value: 'frozenNo', type: 'input' },
        { label: this.$t('gspRecheckReport.recheckStatus'), value: 'recheckStatus', type: 'select', list: 'recheckStatusList' },
        // {label: this.$t('gspRecheckReport.ownerName'), value: "ownerName", type: "input"},
        { label: this.$t('gspRecheckReport.ownerId'), value: 'ownerId', type: 'slot' },

        { label: this.$t('gspRecheckReport.zoneCode'), value: 'zoneCode', type: 'slot' },
        { label: this.$t('gspRecheckReport.lotCode'), value: 'lotCode', type: 'slot' },
        { label: this.$t('gspRecheckReport.skuCode'), value: 'skuCode', type: 'slot' },
        { label: this.$t('gspRecheckReport.qcUserNo'), value: 'qcUserNo', type: 'input' },
        { label: this.$t('gspRecheckReport.maintainUserNo'), value: 'maintainUserNo', type: 'input' },

        // {label: this.$t('gspRecheckReport.recheckDate'), value: "recheckDate", type: "input"},
        { label: this.$t('gspRecheckReport.recheckDateFrom'), value: 'recheckDateFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('gspRecheckReport.recheckDateTo'), value: 'recheckDateTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },

        { label: this.$t('gspRecheckReport.creator'), value: 'creator', type: 'input' },
        { label: this.$t('gspRecheckReport.createTimeFrom'), value: 'createTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('gspRecheckReport.createTimeTo'), value: 'createTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        // {label: this.$t('gspRecheckReport.createTime'), value: "createTime", type: "input"},
        { label: this.$t('gspRecheckReport.auditor'), value: 'auditor', type: 'input' },
        { label: this.$t('gspRecheckReport.auditTimeFrom'), value: 'auditTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('gspRecheckReport.auditTimeTo'), value: 'auditTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },

    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化top表单
      // this.topForm.fieldList = [
      //   {label: this.$t('gspRecheckReport.recheckNo'), value: "recheckNo", type: "input"},
      //   {label: this.$t('gspRecheckReport.frozenNo'), value: "frozenNo", type: "input"},
      //   {label: this.$t('gspRecheckReport.recheckStatus'), value: "recheckStatus", type: "select",list: 'recheckStatusList'},
      //   // {label: this.$t('gspRecheckReport.ownerName'), value: "ownerName", type: "input"},
      //   {label: this.$t('gspRecheckReport.ownerId'), value: "ownerId", type: "slot"},

      //   {label: this.$t('gspRecheckReport.zoneCode'), value: "zoneCode", type: "slot"},
      //   {label: this.$t('gspRecheckReport.lotCode'), value: "lotCode", type: "slot"},
      //   {label: this.$t('gspRecheckReport.skuCode'), value: "skuCode", type: "slot"},
      //   {label: this.$t('gspRecheckReport.qcUserNo'), value: "qcUserNo", type: "input"},
      //   {label: this.$t('gspRecheckReport.maintainUserNo'), value: "maintainUserNo", type: "input"},

      //   // {label: this.$t('gspRecheckReport.recheckDate'), value: "recheckDate", type: "input"},
      //   {label: this.$t('gspRecheckReport.recheckDateFrom'), value: "recheckDateFrom", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {label: this.$t('gspRecheckReport.recheckDateTo'), value: "recheckDateTo", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},

      //   {label: this.$t('gspRecheckReport.creator'), value: "creator", type: "input"},
      //   {label: this.$t('gspRecheckReport.createTimeFrom'), value: "createTimeFrom", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {label: this.$t('gspRecheckReport.createTimeTo'), value: "createTimeTo", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   // {label: this.$t('gspRecheckReport.createTime'), value: "createTime", type: "input"},
      //   {label: this.$t('gspRecheckReport.auditor'), value: "auditor", type: "input"},
      //   {label: this.$t('gspRecheckReport.auditTimeFrom'), value: "auditTimeFrom", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {label: this.$t('gspRecheckReport.auditTimeTo'), value: "auditTimeTo", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   // {label: this.$t('gspRecheckReport.auditTime'), value: "auditTime", type: "input"},

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
        { prop: 'recheckNo', label: this.$t('gspRecheckReport.recheckNo'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('gspRecheckReport.ownerName'), minWidth: 100 },
        { prop: 'recheckDate', label: this.$t('gspRecheckReport.recheckDate'), minWidth: 100 },
        { prop: 'frozenTypeName', label: this.$t('gspRecheckReport.frozenType'), minWidth: 100 },
        { prop: 'frozenNo', label: this.$t('gspRecheckReport.frozenNo'), minWidth: 100 },
        { prop: 'recheckStatusName', label: this.$t('gspRecheckReport.recheckStatus'), minWidth: 100 },
        { prop: 'remark', label: this.$t('gspRecheckReport.remark'), minWidth: 100 },
        { prop: 'qcUserName', label: this.$t('gspRecheckReport.qcUserName'), minWidth: 100 },
        { prop: 'maintainUserName', label: this.$t('gspRecheckReport.maintainUserName'), minWidth: 100 },
        { prop: 'creator', label: this.$t('gspRecheckReport.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('gspRecheckReport.createTime'), minWidth: 100 },
        { prop: 'auditor', label: this.$t('gspRecheckReport.auditor'), minWidth: 100 },
        { prop: 'auditTime', label: this.$t('gspRecheckReport.auditTime'), minWidth: 100 },
        { prop: 'lineNum', label: this.$t('gspRecheckReport.lineNum'), minWidth: 100 },
        { prop: 'zoneCode', label: this.$t('gspRecheckReport.zoneCode'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('gspRecheckReport.lotCode'), minWidth: 100 },
        // {prop:"containerCode", label:this.$t('gspRecheckReport.containerCode'), minWidth:100},
        { prop: 'skuCode', label: this.$t('gspRecheckReport.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('gspRecheckReport.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('gspRecheckReport.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('gspRecheckReport.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('gspRecheckReport.mainUnit'), minWidth: 100 },
        { prop: 'supplierName', label: this.$t('gspRecheckReport.supplierName'), minWidth: 100 },
        { prop: 'mfg', label: this.$t('gspRecheckReport.mfg'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('gspRecheckReport.originCountry'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('gspRecheckReport.drugForm'), minWidth: 100 },
        { prop: 'drugFormSpec', label: this.$t('gspRecheckReport.drugFormSpec'), minWidth: 100 },
        { prop: 'approvalNumber', label: this.$t('gspRecheckReport.approvalNumber'), minWidth: 100 },
        { prop: 'frozenQty', label: this.$t('gspRecheckReport.frozenQty'), minWidth: 100 },
        { prop: 'recheckQty', label: this.$t('gspRecheckReport.recheckQty'), minWidth: 100 },
        { prop: 'recheckReason', label: this.$t('gspRecheckReport.recheckReason'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('gspRecheckReport.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('gspRecheckReport.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('gspRecheckReport.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('gspRecheckReport.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('gspRecheckReport.invalidDate'), minWidth: 100 }
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
