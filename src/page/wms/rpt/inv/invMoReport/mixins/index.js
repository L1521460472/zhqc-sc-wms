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
          zoneCode: null,
          moLotCode: null,
          skuCode: null,
          planFinishTime: null,
          actualFinishTime: null,
          creator: null,
          createTime: null,

          zoneId: null,
          lotId: null,
          ownerId: null,
          ownerCode: null,
          createTimeFrom: null,
          createTimeTo: null,
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
        { label: this.$t('invMoReport.moNo'), value: 'moNo', type: 'input' },
        { label: this.$t('invMoReport.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('invMoReport.moType'), value: 'moType', type: 'select', list: 'moTypeList' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
      this.topForm.data.zoneCode = null
      this.topForm.data.moLotCode = null
      this.topForm.data.skuCode = null
    },

    collapsableFormMore() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('invMoReport.moNo'), value: 'moNo', type: 'input' },
        // {label: this.$t('invMoReport.ownerName'), value: "ownerName", type: "input"},
        { label: this.$t('invMoReport.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('invMoReport.moType'), value: 'moType', type: 'select', list: 'moTypeList' },
        { label: this.$t('invMoReport.sourceType'), value: 'sourceType', type: 'select', list: 'sourceTypeList' },
        { label: this.$t('invMoReport.origNo'), value: 'origNo', type: 'input' },
        { label: this.$t('invMoReport.moStatus'), value: 'moStatus', type: 'select', list: 'moStatusList' },
        // {label: this.$t('invMoReport.zoneCode'), value: "zoneCode", type: "input"},
        // {label: this.$t('invMoReport.moLotCode'), value: "moLotCode", type: "input"},
        { label: this.$t('invMoReport.zoneCode'), value: 'zoneCode', type: 'slot' },
        { label: this.$t('invMoReport.moLotCode'), value: 'moLotCode', type: 'slot' },
        { label: this.$t('invMoReport.skuCode'), value: 'skuCode', type: 'slot' },
        // {label: this.$t('invMoReport.planFinishTime'), value: "planFinishTime", type: "input"},
        // {label: this.$t('invMoReport.actualFinishTime'), value: "actualFinishTime", type: "input"},
        { label: this.$t('invMoReport.planFinishTimeFrom'), value: 'planFinishTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('invMoReport.planFinishTimeTo'), value: 'planFinishTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('invMoReport.actualFinishTimeFrom'), value: 'actualFinishTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('invMoReport.actualFinishTimeTo'), value: 'actualFinishTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        // {label: this.$t('invMoReport.createTime'), value: "createTime", type: "input"},
        { label: this.$t('invMoReport.creator'), value: 'creator', type: 'input' },
        { label: this.$t('invMoReport.createTimeFrom'), value: 'createTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('invMoReport.createTimeTo'), value: 'createTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },

    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化top表单
      // this.topForm.fieldList = [
      //   {label: this.$t('invMoReport.moNo'), value: "moNo", type: "input"},
      //   // {label: this.$t('invMoReport.ownerName'), value: "ownerName", type: "input"},
      //   {label: this.$t('invMoReport.ownerId'), value: "ownerId", type: "slot"},
      //   {label: this.$t('invMoReport.moType'), value: "moType", type: "select",list: 'moTypeList'},
      //   {label: this.$t('invMoReport.sourceType'), value: "sourceType", type: "select",list: 'sourceTypeList'},
      //   {label: this.$t('invMoReport.origNo'), value: "origNo", type: "input"},
      //   {label: this.$t('invMoReport.moStatus'), value: "moStatus", type: "select",list: 'moStatusList'},
      //   // {label: this.$t('invMoReport.zoneCode'), value: "zoneCode", type: "input"},
      //   // {label: this.$t('invMoReport.moLotCode'), value: "moLotCode", type: "input"},
      //   {label: this.$t('invMoReport.zoneCode'), value: "zoneCode", type: "slot"},
      //   {label: this.$t('invMoReport.moLotCode'), value: "moLotCode", type: "slot"},
      //   {label: this.$t('invMoReport.skuCode'), value: "skuCode", type: "slot"},
      //   // {label: this.$t('invMoReport.planFinishTime'), value: "planFinishTime", type: "input"},
      //   // {label: this.$t('invMoReport.actualFinishTime'), value: "actualFinishTime", type: "input"},
      //   {label: this.$t('invMoReport.planFinishTimeFrom'), value: "planFinishTimeFrom", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {label: this.$t('invMoReport.planFinishTimeTo'), value: "planFinishTimeTo", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {label: this.$t('invMoReport.actualFinishTimeFrom'), value: "actualFinishTimeFrom", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {label: this.$t('invMoReport.actualFinishTimeTo'), value: "actualFinishTimeTo", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   // {label: this.$t('invMoReport.createTime'), value: "createTime", type: "input"},
      //   {label: this.$t('invMoReport.creator'), value: "creator", type: "input"},
      //   {label: this.$t('invMoReport.createTimeFrom'), value: "createTimeFrom", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {label: this.$t('invMoReport.createTimeTo'), value: "createTimeTo", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
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
        { prop: 'moNo', label: this.$t('invMoReport.moNo'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('invMoReport.ownerName'), minWidth: 100 },
        { prop: 'moTypeName', label: this.$t('invMoReport.moType'), minWidth: 100 },
        { prop: 'sourceTypeName', label: this.$t('invMoReport.sourceType'), minWidth: 100 },
        { prop: 'origNo', label: this.$t('invMoReport.origNo'), minWidth: 100 },
        { prop: 'moStatusName', label: this.$t('invMoReport.moStatus'), minWidth: 100 },
        { prop: 'zoneCode', label: this.$t('invMoReport.zoneCode'), minWidth: 100 },
        { prop: 'moLotCode', label: this.$t('invMoReport.moLotCode'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('invMoReport.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('invMoReport.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('invMoReport.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('invMoReport.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('invMoReport.mainUnit'), minWidth: 100 },
        { prop: 'moQty', label: this.$t('invMoReport.moQty'), minWidth: 100 },
        { prop: 'planStartTime', label: this.$t('invMoReport.planStartTime'), minWidth: 100 },
        { prop: 'planFinishTime', label: this.$t('invMoReport.planFinishTime'), minWidth: 100 },
        { prop: 'totalFinishQty', label: this.$t('invMoReport.totalFinishQty'), minWidth: 100 },
        { prop: 'actualStartTime', label: this.$t('invMoReport.actualStartTime'), minWidth: 100 },
        { prop: 'actualFinishTime', label: this.$t('invMoReport.actualFinishTime'), minWidth: 100 },
        { prop: 'remark', label: this.$t('invMoReport.remark'), minWidth: 100 },
        { prop: 'creator', label: this.$t('invMoReport.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('invMoReport.createTime'), minWidth: 100 }
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
