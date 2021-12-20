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
          paType: null,
          paStatus: null,
          originNo: null,
          skuCode: null,
          recommZoneId: null,
          recommLotId: null,
          zoneId: null,
          lotId: null,
          operator: null,
          operatorTime: null,
          operatorTimeFrom: null,
          operatorTimeTo: null,

          recommZone: null,
          recommLot: null,
          zoneCode: null,
          lotCode: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        paStatusList: [
        ],
        paTypeList: [
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
            // {label:this.$t('table.view'), type: 'primary', icon: '', event: 'openViewPage', show: true,disabled:this.$hasPerm('view')},//event值为notification.js中定义的方法名
            //默认修改按钮
            // {label:this.$t('table.edit'), type: 'success', icon: '', event: 'openEditPage', show: true,disabled:this.$hasPerm('edit')},//event值为notification.js中定义的方法名
            //默认删除按钮
            // {label:this.$t('table.delete'), type: 'danger', icon: '', event: 'deleteData', show: true,disabled:this.$hasPerm('delete')},//event值为notification.js中定义的方法名
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
        { label: this.$t('invOnReport.paType'), value: 'paType', type: 'select', list: 'paTypeList' },
        { label: this.$t('invOnReport.paStatus'), value: 'paStatus', type: 'select', list: 'paStatusList' },
        { label: this.$t('invOnReport.originNo'), value: 'originNo', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
      this.topForm.data.skuCode = null
      this.topForm.data.recommZone = null
      this.topForm.data.recommLot = null
      this.topForm.data.zoneCode = null
      this.topForm.data.lotCode = null
    },

    collapsableFormMore() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('invOnReport.paType'), value: 'paType', type: 'select', list: 'paTypeList' },
        { label: this.$t('invOnReport.paStatus'), value: 'paStatus', type: 'select', list: 'paStatusList' },
        { label: this.$t('invOnReport.originNo'), value: 'originNo', type: 'input' },
        // {label: this.$t('invOnReport.skuCode'), value: "skuCode", type: "input"},
        { label: this.$t('invOnReport.skuCode'), value: 'skuCode', type: 'slot' },
        // {label: this.$t('invOnReport.skuId'), value: "skuId", type: "slot"},
        { label: this.$t('invOnReport.recommZone'), value: 'recommZone', type: 'slot' },
        { label: this.$t('invOnReport.recommLot'), value: 'recommLot', type: 'slot' },
        // {label: this.$t('invOnReport.zoneCode'), value: "zoneCode", type: "input"},
        // {label: this.$t('invOnReport.lotCode'), value: "lotCode", type: "input"},
        { label: this.$t('invOnReport.zoneCode'), value: 'zoneCode', type: 'slot' },
        { label: this.$t('invOnReport.lotCode'), value: 'lotCode', type: 'slot' },
        { label: this.$t('invOnReport.operator'), value: 'operator', type: 'input' },
        // {label: this.$t('invOnReport.operatorTime'), value: "operatorTime", type: "date"},
        { label: this.$t('invOnReport.operatorTimeFrom'), value: 'operatorTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('invOnReport.operatorTimeTo'), value: 'operatorTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },

    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化top表单
      // this.topForm.fieldList = [
      //   {label: this.$t('invOnReport.paType'), value: "paType", type: "select",list: 'paTypeList'},
      //   {label: this.$t('invOnReport.paStatus'), value: "paStatus", type: "select",list: 'paStatusList'},
      //   {label: this.$t('invOnReport.originNo'), value: "originNo", type: "input"},
      //   // {label: this.$t('invOnReport.skuCode'), value: "skuCode", type: "input"},
      //   {label: this.$t('invOnReport.skuCode'), value: "skuCode", type: "slot"},
      //    // {label: this.$t('invOnReport.skuId'), value: "skuId", type: "slot"},
      //   {label: this.$t('invOnReport.recommZone'), value: "recommZone", type: "slot"},
      //   {label: this.$t('invOnReport.recommLot'), value: "recommLot", type: "slot"},
      //   // {label: this.$t('invOnReport.zoneCode'), value: "zoneCode", type: "input"},
      //   // {label: this.$t('invOnReport.lotCode'), value: "lotCode", type: "input"},
      //   {label: this.$t('invOnReport.zoneCode'), value: "zoneCode", type: "slot"},
      //   {label: this.$t('invOnReport.lotCode'), value: "lotCode", type: "slot"},
      //   {label: this.$t('invOnReport.operator'), value: "operator", type: "input"},
      //   // {label: this.$t('invOnReport.operatorTime'), value: "operatorTime", type: "date"},
      //   {label: this.$t('invOnReport.operatorTimeFrom'), value: "operatorTimeFrom", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {label: this.$t('invOnReport.operatorTimeTo'), value: "operatorTimeTo", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
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
        { prop: 'paTypeName', label: this.$t('invOnReport.paType'), minWidth: 100 },
        { prop: 'paStatusName', label: this.$t('invOnReport.paStatus'), minWidth: 100 },
        { prop: 'originNo', label: this.$t('invOnReport.originNo'), minWidth: 140 },
        { prop: 'containerNo', label: this.$t('invOnReport.containerNo'), minWidth: 100 },

        { prop: 'baseSku.skuCode', label: this.$t('invOnReport.skuCode'), minWidth: 100 },
        { prop: 'baseSku.barcode', label: this.$t('invOnReport.barcode'), minWidth: 100 },
        { prop: 'baseSku.skuName', label: this.$t('invOnReport.skuName'), minWidth: 100 },
        { prop: 'baseSku.tradeName', label: this.$t('invOnReport.tradeName'), minWidth: 100 },
        { prop: 'baseSku.spec', label: this.$t('invOnReport.spec'), minWidth: 100 },
        { prop: 'baseSku.mainUnit', label: this.$t('invOnReport.mainUnit'), minWidth: 100 },
        { prop: 'baseSku.perQty', label: this.$t('invOnReport.perQty'), minWidth: 100 },
        { prop: 'baseSku.drugForm', label: this.$t('invOnReport.drugForm'), minWidth: 100 },
        { prop: 'baseSku.mfgName', label: this.$t('invOnReport.mfgName'), minWidth: 100 },
        { prop: 'baseSku.originCountry', label: this.$t('invOnReport.originCountry'), minWidth: 100 },
        { prop: 'baseSku.approvalNumber', label: this.$t('invOnReport.approvalNumber'), minWidth: 100 },
        { prop: 'baseSku.brandName', label: this.$t('invOnReport.brandName'), minWidth: 100 },
        { prop: 'baseSku.tempControlName', label: this.$t('invOnReport.tempControlName'), minWidth: 100 },
        { prop: 'baseSku.validityDay', label: this.$t('invOnReport.validityDay'), minWidth: 100 },

        { prop: 'waitPaPkg', label: this.$t('invOnReport.waitPaPkg'), minWidth: 100 },
        { prop: 'waitPaQty', label: this.$t('invOnReport.waitPaQty'), minWidth: 100 },
        { prop: 'recommZone', label: this.$t('invOnReport.recommZone'), minWidth: 100 },
        { prop: 'recommLot', label: this.$t('invOnReport.recommLot'), minWidth: 100 },
        { prop: 'paPkg', label: this.$t('invOnReport.paPkg'), minWidth: 100 },
        { prop: 'paQty', label: this.$t('invOnReport.paQty'), minWidth: 100 },
        { prop: 'zoneName', label: this.$t('invOnReport.zoneName'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('invOnReport.lotCode'), minWidth: 100 },
        { prop: 'creator', label: this.$t('invOnReport.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('invOnReport.createTime'), minWidth: 100 },
        { prop: 'operator', label: this.$t('invOnReport.operator'), minWidth: 100 },
        { prop: 'operatorTime', label: this.$t('invOnReport.operatorTime'), minWidth: 100 },

        { prop: 'baseInvBatch.batchNo', label: this.$t('invOnReport.batchNo'), minWidth: 100 },
        { prop: 'baseInvBatch.productionBatch', label: this.$t('invOnReport.productionBatch'), minWidth: 100 },
        { prop: 'baseInvBatch.productionDate', label: this.$t('invOnReport.productionDate'), minWidth: 100 },
        { prop: 'baseInvBatch.instoreDate', label: this.$t('invOnReport.instoreDate'), minWidth: 100 },
        { prop: 'baseInvBatch.invalidDate', label: this.$t('invOnReport.invalidDate'), minWidth: 100 },
        { prop: 'baseInvBatch.sterileNo', label: this.$t('invOnReport.sterileNo'), minWidth: 100 },
        { prop: 'baseInvBatch.sterileInvaliDate', label: this.$t('invOnReport.sterileInvaliDate'), minWidth: 100 }

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
