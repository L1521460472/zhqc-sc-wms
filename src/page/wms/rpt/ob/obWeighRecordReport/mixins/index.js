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
          soNo: null,
          soType: null,
          soStatus: null,
          ownerName: null,
          customerName: null,
          fullName: null,
          checkPlatformName: null,
          transOrderNo: null,
          boxNo: null,
          creator: null,
          createTime: null,

          ownerId: null,
          customerId: null,
          partnerId: null,
          checkPlatformId: null,
          checkPlatformCode: null,
          createTimeFrom: null,
          createTimeTo: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        soTypeList: [
        ],
        soStatusList: [
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
        { label: this.$t('obWeighRecordReport.soNo'), value: 'soNo', type: 'input' },
        { label: this.$t('obWeighRecordReport.soType'), value: 'soType', type: 'select', list: 'soTypeList' },
        { label: this.$t('obWeighRecordReport.soStatus'), value: 'soStatus', type: 'select', list: 'soStatusList' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },

    collapsableFormMore() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('obWeighRecordReport.soNo'), value: 'soNo', type: 'input' },
        { label: this.$t('obWeighRecordReport.soType'), value: 'soType', type: 'select', list: 'soTypeList' },
        { label: this.$t('obWeighRecordReport.soStatus'), value: 'soStatus', type: 'select', list: 'soStatusList' },
        { label: this.$t('obWeighRecordReport.waybillNo'), value: 'transOrderNo', type: 'input' },
        { label: this.$t('obWeighRecordReport.boxNo'), value: 'boxNo', type: 'input' },
        // {label: this.$t('obWeighRecordReport.ownerName'), value: "ownerName", type: "input"},
        { label: this.$t('obWeighRecordReport.ownerId'), value: 'ownerId', type: 'slot' },
        // {label: this.$t('obWeighRecordReport.customerName'), value: "customerName", type: "input"},
        { label: this.$t('obWeighRecordReport.customerId'), value: 'customerId', type: 'slot' },
        // {label: this.$t('obWeighRecordReport.fullName'), value: "fullName", type: "input"},
        { label: this.$t('obWeighRecordReport.partnerId'), value: 'partnerId', type: 'slot' },
        // {label: this.$t('obWeighRecordReport.checkPlatformName'), value: "checkPlatformName", type: "input"},
        { label: this.$t('obWeighRecordReport.checkPlatformId'), value: 'checkPlatformId', type: 'slot' },
        { label: this.$t('obWeighRecordReport.createName'), value: 'creator', type: 'input' },
        // {label: this.$t('obWeighRecordReport.createTime'), value: "createTime", type: "input"},
        { label: this.$t('obWeighRecordReport.createTimeFrom'), value: 'createTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('obWeighRecordReport.createTimeTo'), value: 'createTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },

    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化top表单
      // this.topForm.fieldList = [
      //   {label: this.$t('obWeighRecordReport.soNo'), value: "soNo", type: "input"},
      //   {label: this.$t('obWeighRecordReport.soType'), value: "soType", type: "select",list: 'soTypeList'},
      //   {label: this.$t('obWeighRecordReport.soStatus'), value: "soStatus", type: "select",list: 'soStatusList'},
      //   {label: this.$t('obWeighRecordReport.transOrderNo'), value: "transOrderNo", type: "input"},
      //   {label: this.$t('obWeighRecordReport.boxNo'), value: "boxNo", type: "input"},
      //   // {label: this.$t('obWeighRecordReport.ownerName'), value: "ownerName", type: "input"},
      //   {label: this.$t('obWeighRecordReport.ownerId'), value: "ownerId", type: "slot"},
      //   // {label: this.$t('obWeighRecordReport.customerName'), value: "customerName", type: "input"},
      //   {label: this.$t('obWeighRecordReport.customerId'), value: "customerId", type: "slot"},
      //   // {label: this.$t('obWeighRecordReport.fullName'), value: "fullName", type: "input"},
      //   {label: this.$t('obWeighRecordReport.partnerId'), value: "partnerId", type: "slot"},
      //   // {label: this.$t('obWeighRecordReport.checkPlatformName'), value: "checkPlatformName", type: "input"},
      //   {label: this.$t('obWeighRecordReport.checkPlatformId'), value: "checkPlatformId", type: "slot"},
      //   {label: this.$t('obWeighRecordReport.creator'), value: "creator", type: "input"},
      //   // {label: this.$t('obWeighRecordReport.createTime'), value: "createTime", type: "input"},
      //   {label: this.$t('obWeighRecordReport.createTimeFrom'), value: "createTimeFrom", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {label: this.$t('obWeighRecordReport.createTimeTo'), value: "createTimeTo", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
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
        { prop: 'soNo', label: this.$t('obWeighRecordReport.soNo'), minWidth: 140 },
        { prop: 'soTypeName', label: this.$t('obWeighRecordReport.soType'), minWidth: 100 },
        { prop: 'soStatusName', label: this.$t('obWeighRecordReport.soStatus'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('obWeighRecordReport.ownerName'), minWidth: 100 },
        { prop: 'customerName', label: this.$t('obWeighRecordReport.customerName'), minWidth: 100 },
        { prop: 'carrierName', label: this.$t('obWeighRecordReport.carrierName'), minWidth: 100 },
        { prop: 'waybillNo', label: this.$t('obWeighRecordReport.waybillNo'), minWidth: 140 },
        { prop: 'boxNo', label: this.$t('obWeighRecordReport.boxNo'), minWidth: 140 },
        { prop: 'checkPlatformName', label: this.$t('obWeighRecordReport.checkPlatformName'), minWidth: 100 },
        { prop: 'weight', label: this.$t('obWeighRecordReport.weight'), minWidth: 100 },
        { prop: 'createName', label: this.$t('obWeighRecordReport.createName'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('obWeighRecordReport.createTime'), minWidth: 150 }
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
