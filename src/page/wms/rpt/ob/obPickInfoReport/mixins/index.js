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
          pickOrderNo: null,
          waveNo: null,
          pickType: null,
          pickWay: null,
          soNo: null,
          ownerName: null,
          customerName: null,
          partnerName: null,
          containerNo: null,
          lotCode: null,
          skuCode: null,
          pickUser: null,
          pickTime: null,

          ownerId: null,
          customerId: null,
          partnerId: null,
          pickTimeFrom: null,
          pickTimeTo: null

        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        pickWayList: [
        ],
        pickTypeList: [
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
        { label: this.$t('obPickInfoReport.pickOrderNo'), value: 'pickOrderNo', type: 'input' },
        { label: this.$t('obPickInfoReport.waveNo'), value: 'waveNo', type: 'input' },
        { label: this.$t('obPickInfoReport.soNo'), value: 'soNo', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
      this.topForm.data.ownerId = null
      this.topForm.data.customerId = null
      this.topForm.data.partnerId = null
      this.topForm.data.skuCode = null
    },

    collapsableFormMore() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('obPickInfoReport.pickOrderNo'), value: 'pickOrderNo', type: 'input' },
        { label: this.$t('obPickInfoReport.waveNo'), value: 'waveNo', type: 'input' },
        { label: this.$t('obPickInfoReport.soNo'), value: 'soNo', type: 'input' },
        { label: this.$t('obPickInfoReport.pickType'), value: 'pickType', type: 'select', list: 'pickTypeList' },
        { label: this.$t('obPickInfoReport.pickWay'), value: 'pickWay', type: 'select', list: 'pickWayList' },

        // {label: this.$t('obPickInfoReport.ownerName'), value: "ownerName", type: "input"},
        // {label: this.$t('obPickInfoReport.customerName'), value: "customerName", type: "input"},
        // {label: this.$t('obPickInfoReport.partnerName'), value: "partnerName", type: "input"},
        { label: this.$t('obPickInfoReport.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('obPickInfoReport.customerId'), value: 'customerId', type: 'slot' },
        { label: this.$t('obPickInfoReport.partnerId'), value: 'partnerId', type: 'slot' },

        { label: this.$t('obPickInfoReport.lotCode'), value: 'lotCode', type: 'input' },
        { label: this.$t('obPickInfoReport.containerNo'), value: 'containerNo', type: 'input' },

        { label: this.$t('obPickInfoReport.skuCode'), value: 'skuCode', type: 'slot' },
        { label: this.$t('obPickInfoReport.pickUser'), value: 'pickUser', type: 'input' },
        // {label: this.$t('obPickInfoReport.pickTime'), value: "pickTime", type: "input"},
        { label: this.$t('obPickInfoReport.pickTimeFrom'), value: 'pickTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('obPickInfoReport.pickTimeTo'), value: 'pickTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },

    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化top表单
      // this.topForm.fieldList = [
      //   {label: this.$t('obPickInfoReport.pickOrderNo'), value: "pickOrderNo", type: "input"},
      //   {label: this.$t('obPickInfoReport.waveNo'), value: "waveNo", type: "input"},
      //   {label: this.$t('obPickInfoReport.soNo'), value: "soNo", type: "input"},
      //   {label: this.$t('obPickInfoReport.pickType'), value: "pickType", type: "select",list: 'pickTypeList'},
      //   {label: this.$t('obPickInfoReport.pickWay'), value: "pickWay", type: "select",list: 'pickWayList'},

      //   // {label: this.$t('obPickInfoReport.ownerName'), value: "ownerName", type: "input"},
      //   // {label: this.$t('obPickInfoReport.customerName'), value: "customerName", type: "input"},
      //   // {label: this.$t('obPickInfoReport.partnerName'), value: "partnerName", type: "input"},
      //   {label: this.$t('obPickInfoReport.ownerId'), value: "ownerId", type: "slot"},
      //   {label: this.$t('obPickInfoReport.customerId'), value: "customerId", type: "slot"},
      //   {label: this.$t('obPickInfoReport.partnerId'), value: "partnerId", type: "slot"},

      //   {label: this.$t('obPickInfoReport.lotCode'), value: "lotCode", type: "input"},
      //   {label: this.$t('obPickInfoReport.containerNo'), value: "containerNo", type: "input"},

      //   {label: this.$t('obPickInfoReport.skuCode'), value: "skuCode", type: "slot"},
      //   {label: this.$t('obPickInfoReport.pickUser'), value: "pickUser", type: "input"},
      //   // {label: this.$t('obPickInfoReport.pickTime'), value: "pickTime", type: "input"},
      //   {label: this.$t('obPickInfoReport.pickTimeFrom'), value: "pickTimeFrom", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},
      //   {label: this.$t('obPickInfoReport.pickTimeTo'), value: "pickTimeTo", type: "date",dateType:'datetime',format:'yyyy-MM-dd HH:mm:ss',valueFormat:'yyyy-MM-dd HH:mm:ss'},

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
        { prop: 'pickOrderNo', label: this.$t('obPickInfoReport.pickOrderNo'), minWidth: 120 },
        { prop: 'waveNo', label: this.$t('obPickInfoReport.waveNo'), minWidth: 120 },
        { prop: 'pickTypeName', label: this.$t('obPickInfoReport.pickType'), minWidth: 100 },
        { prop: 'pickWayName', label: this.$t('obPickInfoReport.pickWay'), minWidth: 100 },
        { prop: 'pickOrderStatusName', label: this.$t('obPickInfoReport.pickOrderStatus'), minWidth: 100 },
        { prop: 'pickStartTime', label: this.$t('obPickInfoReport.pickStartTime'), minWidth: 100 },
        { prop: 'pickEndTime', label: this.$t('obPickInfoReport.pickEndTime'), minWidth: 100 },
        { prop: 'pickCreator', label: this.$t('obPickInfoReport.pickCreator'), minWidth: 100 },
        { prop: 'pickCreateTime', label: this.$t('obPickInfoReport.pickCreateTime'), minWidth: 100 },
        { prop: 'soNo', label: this.$t('obPickInfoReport.soNo'), minWidth: 100 },
        { prop: 'scSoTypeName', label: this.$t('obPickInfoReport.soType'), minWidth: 100 },
        { prop: 'soStatusName', label: this.$t('obPickInfoReport.soStatus'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('obPickInfoReport.ownerName'), minWidth: 100 },
        { prop: 'customerName', label: this.$t('obPickInfoReport.customerName'), minWidth: 100 },
        { prop: 'storeName', label: this.$t('obPickInfoReport.storeName'), minWidth: 100 },
        { prop: 'partnerName', label: this.$t('obPickInfoReport.partnerName'), minWidth: 100 },
        { prop: 'isCrossDocking', label: this.$t('obPickInfoReport.isCrossDocking'), minWidth: 100 },
        { prop: 'rowNo', label: this.$t('obPickInfoReport.rowNo'), minWidth: 100 },
        { prop: 'containerNo', label: this.$t('obPickInfoReport.containerNo'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('obPickInfoReport.lotCode'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('obPickInfoReport.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('obPickInfoReport.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('obPickInfoReport.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('obPickInfoReport.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('obPickInfoReport.mainUnit'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('obPickInfoReport.originCountry'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('obPickInfoReport.drugForm'), minWidth: 100 },
        { prop: 'drugFormSpec', label: this.$t('obPickInfoReport.drugFormSpec'), minWidth: 100 },
        { prop: 'approvalNumber', label: this.$t('obPickInfoReport.approvalNumber'), minWidth: 100 },
        { prop: 'soQty', label: this.$t('obPickInfoReport.soQty'), minWidth: 100 },
        { prop: 'pickNum', label: this.$t('obPickInfoReport.pickNum'), minWidth: 100 },
        { prop: 'allotQty', label: this.$t('obPickInfoReport.allotQty'), minWidth: 100 },
        { prop: 'pickQty', label: this.$t('obPickInfoReport.pickQty'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('obPickInfoReport.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('obPickInfoReport.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('obPickInfoReport.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('obPickInfoReport.invalidDate'), minWidth: 100 },
        { prop: 'pickUser', label: this.$t('obPickInfoReport.pickUser'), minWidth: 100 },
        { prop: 'pickTime', label: this.$t('obPickInfoReport.pickTime'), minWidth: 100 }
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
