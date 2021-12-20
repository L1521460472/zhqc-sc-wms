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
          ownerName: null,
          ownerId: null,
          replenishOrigin: null,
          skuCode: null,
          recommZone: null,
          fmLotCode: null,
          zoneCode: null,
          toLotCode: null,
          replenishDtStatus: null,
          upShelfUser: null,
          upShelfTime: null,

          recommZoneId: null,
          fmLotId: null,
          zoneId: null,
          toLotId: null,
          upShelfTimeFrom: null,
          upShelfTimeTo: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        replenishDtStatusList: [
        ],
        replenishOriginList: [
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
        { label: this.$t('invReplenishReport.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('invReplenishReport.replenishOrigin'), value: 'replenishOrigin', type: 'select', list: 'replenishOriginList' },
        { label: this.$t('invReplenishReport.skuCode'), value: 'skuCode', type: 'slot' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
      this.topForm.data.recommZone = null
      this.topForm.data.fmLotCode = null
      this.topForm.data.zoneCode = null
      this.topForm.data.toLotCode = null
    },

    collapsableFormMore() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('invReplenishReport.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('invReplenishReport.replenishOrigin'), value: 'replenishOrigin', type: 'select', list: 'replenishOriginList' },
        // {label: this.$t('invReplenishReport.skuCode'), value: "skuCode", type: "input"},
        { label: this.$t('invReplenishReport.skuCode'), value: 'skuCode', type: 'slot' },
        { label: this.$t('invReplenishReport.recommZone'), value: 'recommZone', type: 'slot' },
        { label: this.$t('invReplenishReport.fmLotCode'), value: 'fmLotCode', type: 'slot' },
        { label: this.$t('invReplenishReport.zoneCode'), value: 'zoneCode', type: 'slot' },
        { label: this.$t('invReplenishReport.toLotCode'), value: 'toLotCode', type: 'slot' },
        // {label: this.$t('invReplenishReport.recommZone'), value: "recommZone", type: "input"},
        // {label: this.$t('invReplenishReport.fmLotCode'), value: "fmLotCode", type: "input"},
        // {label: this.$t('invReplenishReport.zoneCode'), value: "zoneCode", type: "input"},
        // {label: this.$t('invReplenishReport.toLotCode'), value: "toLotCode", type: "input"},
        { label: this.$t('invReplenishReport.replenishDtStatus'), value: 'replenishDtStatus', type: 'select', list: 'replenishDtStatusList' },
        { label: this.$t('invReplenishReport.upShelfUser'), value: 'upShelfUser', type: 'input' },
        // {label: this.$t('invReplenishReport.upShelfTime'), value: "upShelfTime", type: "input"},
        { label: this.$t('invReplenishReport.upShelfTimeFrom'), value: 'upShelfTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('invReplenishReport.upShelfTimeTo'), value: 'upShelfTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },

    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化top表单
      // this.topForm.fieldList = [
      //   // {label: this.$t('invReplenishReport.ownerName'), value: "ownerName", type: "input"},
      //   {label: this.$t('invReplenishReport.ownerId'), value: "ownerId", type: "slot"},
      //   {label: this.$t('invReplenishReport.replenishOrigin'), value: "replenishOrigin", type: "select",list: 'replenishOriginList'},
      //   // {label: this.$t('invReplenishReport.skuCode'), value: "skuCode", type: "input"},
      //   {label: this.$t('invReplenishReport.skuCode'), value: "skuCode", type: "slot"},
      //   {label: this.$t('invReplenishReport.recommZone'), value: "recommZone", type: "slot"},
      //   {label: this.$t('invReplenishReport.fmLotCode'), value: "fmLotCode", type: "slot"},
      //   {label: this.$t('invReplenishReport.zoneCode'), value: "zoneCode", type: "slot"},
      //   {label: this.$t('invReplenishReport.toLotCode'), value: "toLotCode", type: "slot"},
      //   // {label: this.$t('invReplenishReport.recommZone'), value: "recommZone", type: "input"},
      //   // {label: this.$t('invReplenishReport.fmLotCode'), value: "fmLotCode", type: "input"},
      //   // {label: this.$t('invReplenishReport.zoneCode'), value: "zoneCode", type: "input"},
      //   // {label: this.$t('invReplenishReport.toLotCode'), value: "toLotCode", type: "input"},
      //   {label: this.$t('invReplenishReport.replenishDtStatus'), value: "replenishDtStatus", type: "select",list: 'replenishDtStatusList'},
      //   {label: this.$t('invReplenishReport.upShelfUser'), value: "upShelfUser", type: "input"},
      //   // {label: this.$t('invReplenishReport.upShelfTime'), value: "upShelfTime", type: "input"},
      //   {label: this.$t('invReplenishReport.upShelfTimeFrom'), value: "upShelfTimeFrom", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {label: this.$t('invReplenishReport.upShelfTimeTo'), value: "upShelfTimeTo", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},

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
        { prop: 'replenishNo', label: this.$t('invReplenishReport.replenishNo'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('invReplenishReport.ownerName'), minWidth: 100 },
        { prop: 'replenishOriginName', label: this.$t('invReplenishReport.replenishOrigin'), minWidth: 100 },
        { prop: 'planTotal', label: this.$t('invReplenishReport.planTotal'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('invReplenishReport.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('invReplenishReport.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('invReplenishReport.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('invReplenishReport.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('invReplenishReport.mainUnit'), minWidth: 100 },
        { prop: 'supplierName', label: this.$t('invReplenishReport.supplierName'), minWidth: 100 },
        { prop: 'mfg', label: this.$t('invReplenishReport.mfg'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('invReplenishReport.originCountry'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('invReplenishReport.drugForm'), minWidth: 100 },
        { prop: 'drugFormSpec', label: this.$t('invReplenishReport.drugFormSpec'), minWidth: 100 },
        { prop: 'approveNo', label: this.$t('invReplenishReport.approveNo'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('invReplenishReport.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('invReplenishReport.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('invReplenishReport.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('invReplenishReport.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('invReplenishReport.invalidDate'), minWidth: 100 },
        { prop: 'planPkg', label: this.$t('invReplenishReport.planPkg'), minWidth: 100 },
        { prop: 'planQty', label: this.$t('invReplenishReport.planQty'), minWidth: 100 },
        { prop: 'recommZone', label: this.$t('invReplenishReport.recommZone'), minWidth: 100 },
        { prop: 'fmLotCode', label: this.$t('invReplenishReport.fmLotCode'), minWidth: 100 },
        { prop: 'zoneCode', label: this.$t('invReplenishReport.zoneCode'), minWidth: 100 },
        { prop: 'toLotCode', label: this.$t('invReplenishReport.toLotCode'), minWidth: 100 },
        { prop: 'upPkg', label: this.$t('invReplenishReport.upPkg'), minWidth: 100 },
        { prop: 'upShelfQty', label: this.$t('invReplenishReport.upShelfQty'), minWidth: 100 },
        { prop: 'replenishDtStatusName', label: this.$t('invReplenishReport.replenishDtStatus'), minWidth: 100 },
        { prop: 'creator', label: this.$t('invReplenishReport.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('invReplenishReport.createTime'), minWidth: 100 },
        { prop: 'upShelfUser', label: this.$t('invReplenishReport.upShelfUser'), minWidth: 100 },
        { prop: 'upShelfTime', label: this.$t('invReplenishReport.upShelfTime'), minWidth: 100 }
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
