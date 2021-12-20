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
          partnerName: null,
          transOrderNo: null,
          skuCode: null,
          mfg: null,

          ownerId: null,
          customerId: null,
          partnerId: null,
          mfgId: null
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
        { label: this.$t('obReviewBoxReport.soNo'), value: 'soNo', type: 'input' },
        { label: this.$t('obReviewBoxReport.soType'), value: 'soType', type: 'select', list: 'soTypeList' },
        { label: this.$t('obReviewBoxReport.soStatus'), value: 'soStatus', type: 'select', list: 'soStatusList' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },

    collapsableFormMore() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('obReviewBoxReport.soNo'), value: 'soNo', type: 'input' },
        { label: this.$t('obReviewBoxReport.soType'), value: 'soType', type: 'select', list: 'soTypeList' },
        { label: this.$t('obReviewBoxReport.soStatus'), value: 'soStatus', type: 'select', list: 'soStatusList' },
        // {label: this.$t('obReviewBoxReport.ownerName'), value: "ownerName", type: "input"},
        // {label: this.$t('obReviewBoxReport.customerName'), value: "customerName", type: "input"},
        // {label: this.$t('obReviewBoxReport.partnerName'), value: "partnerName", type: "input"},
        { label: this.$t('obReviewBoxReport.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('obReviewBoxReport.customerId'), value: 'customerId', type: 'slot' },
        { label: this.$t('obReviewBoxReport.partnerId'), value: 'partnerId', type: 'slot' },
        { label: this.$t('obReviewBoxReport.mfg'), value: 'mfg', type: 'input' },

        { label: this.$t('obReviewBoxReport.transOrderNo'), value: 'transOrderNo', type: 'input' },
        { label: this.$t('obReviewBoxReport.skuCode'), value: 'skuCode', type: 'slot' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },

    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化top表单
      // this.topForm.fieldList = [
      //   {label: this.$t('obReviewBoxReport.soNo'), value: "soNo", type: "input"},
      //   {label: this.$t('obReviewBoxReport.soType'), value: "soType", type: "select",list: 'soTypeList'},
      //   {label: this.$t('obReviewBoxReport.soStatus'), value: "soStatus", type: "select",list: 'soStatusList'},
      //   // {label: this.$t('obReviewBoxReport.ownerName'), value: "ownerName", type: "input"},
      //   // {label: this.$t('obReviewBoxReport.customerName'), value: "customerName", type: "input"},
      //   // {label: this.$t('obReviewBoxReport.partnerName'), value: "partnerName", type: "input"},
      //   {label: this.$t('obReviewBoxReport.ownerId'), value: "ownerId", type: "slot"},
      //   {label: this.$t('obReviewBoxReport.customerId'), value: "customerId", type: "slot"},
      //   {label: this.$t('obReviewBoxReport.partnerId'), value: "partnerId", type: "slot"},
      //   {label: this.$t('obReviewBoxReport.mfg'), value: "mfg", type: "input"},

      //   {label: this.$t('obReviewBoxReport.transOrderNo'), value: "transOrderNo", type: "input"},
      //   {label: this.$t('obReviewBoxReport.skuCode'), value: "skuCode", type: "slot"},
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
        { prop: 'checkPlatformName', label: this.$t('obReviewBoxReport.checkPlatformName'), minWidth: 100 },
        { prop: 'reviewPersonOne', label: this.$t('obReviewBoxReport.reviewPersonOne'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('obReviewBoxReport.createTime'), minWidth: 100 },
        { prop: 'reviewPersonTwo', label: this.$t('obReviewBoxReport.reviewPersonTwo'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('obReviewBoxReport.updateTime'), minWidth: 100 },
        { prop: 'soNo', label: this.$t('obReviewBoxReport.soNo'), minWidth: 150 },
        { prop: 'soTypeName', label: this.$t('obReviewBoxReport.soType'), minWidth: 100 },
        { prop: 'soStatusName', label: this.$t('obReviewBoxReport.soStatus'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('obReviewBoxReport.ownerName'), minWidth: 100 },
        { prop: 'customerName', label: this.$t('obReviewBoxReport.customerName'), minWidth: 100 },
        { prop: 'storeName', label: this.$t('obReviewBoxReport.storeName'), minWidth: 100 },
        { prop: 'partnerName', label: this.$t('obReviewBoxReport.partnerName'), minWidth: 100 },
        { prop: 'isCrossDocking', label: this.$t('obReviewBoxReport.isCrossDocking'), minWidth: 100 },
        { prop: 'rowNo', label: this.$t('obReviewBoxReport.rowNo'), minWidth: 100 },
        { prop: 'transOrderNo', label: this.$t('obReviewBoxReport.transOrderNo'), minWidth: 100 },
        { prop: 'boxNo', label: this.$t('obReviewBoxReport.boxNo'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('obReviewBoxReport.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('obReviewBoxReport.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('obReviewBoxReport.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('obReviewBoxReport.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('obReviewBoxReport.mainUnit'), minWidth: 100 },
        { prop: 'supplierName', label: this.$t('obReviewBoxReport.supplierName'), minWidth: 100 },
        { prop: 'mfg', label: this.$t('obReviewBoxReport.mfg'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('obReviewBoxReport.originCountry'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('obReviewBoxReport.drugForm'), minWidth: 100 },
        { prop: 'drugFormSpec', label: this.$t('obReviewBoxReport.drugFormSpec'), minWidth: 100 },
        { prop: 'approvalNumber', label: this.$t('obReviewBoxReport.approvalNumber'), minWidth: 100 },
        { prop: 'soQty', label: this.$t('obReviewBoxReport.soQty'), minWidth: 100 },
        { prop: 'waitReviewQty', label: this.$t('obReviewBoxReport.waitReviewQty'), minWidth: 100 },
        { prop: 'reviewedQty', label: this.$t('obReviewBoxReport.reviewedQty'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('obReviewBoxReport.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('obReviewBoxReport.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('obReviewBoxReport.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('obReviewBoxReport.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('obReviewBoxReport.invalidDate'), minWidth: 100 }
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
