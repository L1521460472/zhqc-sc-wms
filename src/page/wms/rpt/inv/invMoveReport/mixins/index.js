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
          moveLotOrderNo: null,
          ownerName: null,
          skuCode: null,
          fmZoneCode: null,
          fmLotCode: null,
          toZoneCode: null,
          toLotCode: null,
          moveLotOrderStatus: null,
          moveUserNo: null,
          moveTime: null,

          ownerId: null,
          fmZoneId: null,
          toZoneId: null,
          moveTimeFrom: null,
          moveTimeTo: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        moveLotOrderStatusList: [],
        moveLotOrderDtStatusList: []
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
        { label: this.$t('invMoveReport.moveLotOrderNo'), value: 'moveLotOrderNo', type: 'input' },
        { label: this.$t('invMoveReport.moveLotOrderStatus'), value: 'moveLotOrderStatus', type: 'select', list: 'moveLotOrderStatusList' },
        { label: this.$t('invMoReport.ownerId'), value: 'ownerId', type: 'slot' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },

    collapsableFormMore() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('invMoveReport.moveLotOrderNo'), value: 'moveLotOrderNo', type: 'input' },
        { label: this.$t('invMoveReport.moveLotOrderStatus'), value: 'moveLotOrderStatus', type: 'select', list: 'moveLotOrderStatusList' },
        { label: this.$t('invMoReport.ownerId'), value: 'ownerId', type: 'slot' },
        // {label: this.$t('invMoveReport.ownerName'), value: "ownerName", type: "input"},
        { label: this.$t('invMoveReport.skuCode'), value: 'skuCode', type: 'slot' },
        { label: this.$t('invMoveReport.fmZoneCode'), value: 'fmZoneCode', type: 'slot' },
        { label: this.$t('invMoveReport.fmLotCode'), value: 'fmLotCode', type: 'slot' },
        { label: this.$t('invMoveReport.toZoneCode'), value: 'toZoneCode', type: 'slot' },
        { label: this.$t('invMoveReport.toLotCode'), value: 'toLotCode', type: 'slot' },
        { label: this.$t('invMoveReport.moveUserNo'), value: 'moveUserNo', type: 'input' },
        // {label: this.$t('invMoveReport.moveTime'), value: "moveTime", type: "input"},
        { label: this.$t('invMoveReport.moveTimeFrom'), value: 'moveTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('invMoveReport.moveTimeTo'), value: 'moveTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },

    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化top表单
      // this.topForm.fieldList = [
      //   {label: this.$t('invMoveReport.moveLotOrderNo'), value: "moveLotOrderNo", type: "input"},
      //   {label: this.$t('invMoveReport.moveLotOrderStatus'), value: "moveLotOrderStatus", type: "select",list: 'moveLotOrderStatusList'},
      //   {label: this.$t('invMoReport.ownerId'), value: "ownerId", type: "slot"},
      //   // {label: this.$t('invMoveReport.ownerName'), value: "ownerName", type: "input"},
      //   {label: this.$t('invMoveReport.skuCode'), value: "skuCode", type: "slot"},
      //   {label: this.$t('invMoveReport.fmZoneCode'), value: "fmZoneCode", type: "slot"},
      //   {label: this.$t('invMoveReport.fmLotCode'), value: "fmLotCode", type: "slot"},
      //   {label: this.$t('invMoveReport.toZoneCode'), value: "toZoneCode", type: "slot"},
      //   {label: this.$t('invMoveReport.toLotCode'), value: "toLotCode", type: "slot"},
      //   {label: this.$t('invMoveReport.moveUserNo'), value: "moveUserNo", type: "input"},
      //   // {label: this.$t('invMoveReport.moveTime'), value: "moveTime", type: "input"},
      //   {label: this.$t('invMoveReport.moveTimeFrom'), value: "moveTimeFrom", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {label: this.$t('invMoveReport.moveTimeTo'), value: "moveTimeTo", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
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
        { prop: 'moveLotOrderNo', label: this.$t('invMoveReport.moveLotOrderNo'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('invMoveReport.ownerName'), minWidth: 100 },
        { prop: 'breedNum', label: this.$t('invMoveReport.breedNum'), minWidth: 100 },
        { prop: 'planQty', label: this.$t('invMoveReport.planQty'), minWidth: 100 },
        { prop: 'remark', label: this.$t('invMoveReport.remark'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('invMoveReport.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('invMoveReport.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('invMoveReport.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('invMoveReport.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('invMoveReport.mainUnit'), minWidth: 100 },
        { prop: 'supplierName', label: this.$t('invMoveReport.supplierName'), minWidth: 100 },
        { prop: 'mfg', label: this.$t('invMoveReport.mfg'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('invMoveReport.originCountry'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('invMoveReport.drugForm'), minWidth: 100 },
        { prop: 'drugFormSpec', label: this.$t('invMoveReport.drugFormSpec'), minWidth: 100 },
        { prop: 'approvalNumber', label: this.$t('invMoveReport.approvalNumber'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('invMoveReport.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('invMoveReport.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('invMoveReport.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('invMoveReport.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('invMoveReport.invalidDate'), minWidth: 100 },
        { prop: 'planMovePkg', label: this.$t('invMoveReport.planMovePkg'), minWidth: 100 },
        { prop: 'planMoveQty', label: this.$t('invMoveReport.planMoveQty'), minWidth: 100 },
        { prop: 'fmZoneCode', label: this.$t('invMoveReport.fmZoneCode'), minWidth: 100 },
        { prop: 'fmLotCode', label: this.$t('invMoveReport.fmLotCode'), minWidth: 100 },
        { prop: 'toZoneCode', label: this.$t('invMoveReport.toZoneCode'), minWidth: 100 },
        { prop: 'toLotCode', label: this.$t('invMoveReport.toLotCode'), minWidth: 100 },
        { prop: 'movePkg', label: this.$t('invMoveReport.movePkg'), minWidth: 100 },
        { prop: 'moveQty', label: this.$t('invMoveReport.moveQty'), minWidth: 100 },
        { prop: 'moveLotOrderStatusName', label: this.$t('invMoveReport.moveLotOrderStatus'), minWidth: 100 },
        { prop: 'creator', label: this.$t('invMoveReport.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('invMoveReport.createTime'), minWidth: 100 },
        { prop: 'moveUserNo', label: this.$t('invMoveReport.moveUserNo'), minWidth: 100 },
        { prop: 'moveTime', label: this.$t('invMoveReport.moveTime'), minWidth: 100 }
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
