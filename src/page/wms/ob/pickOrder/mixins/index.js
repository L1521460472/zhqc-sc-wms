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
          pickOrderStatus: null,
          pickType: null,
          pickWay: null,
          createTimeBegin: null,
          createTimeEnd: null,
          pickStartTime: null,
          pickEndTime: null,
          ownerId: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        pickOrderStatusList: [],
        pickTypeList: [],
        pickWayList: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '100', // 默认操作按钮列宽度
          btList: [// 添加操作按钮
            // 默认查看按钮
            { label: this.$t('table.view'), type: 'primary', icon: '', event: 'openViewPage', show: true, disabled: this.$hasPerm('view') }// event值为notification.js中定义的方法名
          ]
        }
      },
      // 弹窗表单
      diaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合

        diaTablePickOrderDt: {
          topBtn: {},
          ref: null,
          data: [],
          fieldList: [],
          handle: null
        },

        diaTablePickSoAssign: {
          topBtn: {},
          ref: null,
          data: [],
          fieldList: [],
          handle: null
        },

        diaTablePickInfo: {
          topBtn: {},
          ref: null,
          data: [],
          fieldList: [],
          handle: null
        },

        diaTableSow: {
          topBtn: {},
          ref: null,
          data: [],
          fieldList: [],
          handle: null
        },

        diaTableBox: {
          topBtn: {},
          ref: null,
          data: [],
          fieldList: [],
          handle: null
        }
      },
      pickDtQuery: { pickOrderId: null },
      pickSoAssignQuery: { pickOrderId: null },
      pickInfoQuery: { pickOrderId: null },
      pickSowQuery: { pickOrderId: null },
      pickBoxQuery: { pickOrderId: null },
      printList: []
    }
  },
  mounted() {
    this.collapsableForm()// 初始化表单--展开收起
    this.initTopFormColumns()// 初始化查询界面配置数据
    this.rulesInit()// 初始化diaFormInfo表单字段校验规则
  },
  methods: {
    collapsableFormMore() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('pickOrder.pickOrderNo'), value: 'pickOrderNo', type: 'input' },
        { label: this.$t('pickOrder.pickOrderStatus'), value: 'pickOrderStatus', type: 'select', list: 'pickOrderStatusList' },
        { label: this.$t('pickOrder.pickType'), value: 'pickType', type: 'select', list: 'pickTypeList' },
        { label: this.$t('pickOrder.pickWay'), value: 'pickWay', type: 'select', list: 'pickWayList' },
        { label: this.$t('pickOrder.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('pickOrder.waveNo'), value: 'waveNo', type: 'input' },
        { label: this.$t('pickOrder.createTimeBegin'), value: 'createTimeBegin', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('pickOrder.createTimeEnd'), value: 'createTimeEnd', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('pickOrder.pickStartTime'), value: 'pickStartTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('pickOrder.pickEndTime'), value: 'pickEndTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('pickOrder.pickOrderNo'), value: 'pickOrderNo', type: 'input' },
        { label: this.$t('pickOrder.pickOrderStatus'), value: 'pickOrderStatus', type: 'select', list: 'pickOrderStatusList' },
        { label: this.$t('pickOrder.pickType'), value: 'pickType', type: 'select', list: 'pickTypeList' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
      this.topForm.data.ownerId = null
    },
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'selection', width: 50 }, // 序列
        { prop: 'pickOrderNo', label: this.$t('pickOrder.pickOrderNo'), minWidth: 120 },
        { prop: 'waveNo', label: this.$t('pickOrder.waveNo'), minWidth: 120 },
        { prop: 'pickOrderStatusName', label: this.$t('pickOrder.pickOrderStatus'), minWidth: 100 },
        { prop: 'pickTypeName', label: this.$t('pickOrder.pickType'), minWidth: 100 },
        { prop: 'pickWayName', label: this.$t('pickOrder.pickWay'), minWidth: 100 },
        { prop: 'pickModeName', label: this.$t('pickOrder.pickMode'), minWidth: 100 },
        { prop: 'pickStartTime', label: this.$t('pickOrder.pickStartTime'), minWidth: 100 },
        { prop: 'pickEndTime', label: this.$t('pickOrder.pickEndTime'), minWidth: 100 },
        { prop: 'createName', label: this.$t('pickOrder.createName'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('pickOrder.createTime'), minWidth: 100 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('pickOrder.pickOrderNo'), value: 'pickOrderNo', type: 'input', readonly: true },
        { label: this.$t('pickOrder.pickOrderStatus'), value: 'pickOrderStatusName', type: 'input', readonly: true },
        { label: this.$t('pickOrder.pickType'), value: 'pickTypeName', type: 'input', readonly: true },
        { label: this.$t('pickOrder.pickWay'), value: 'pickWayName', type: 'input', readonly: true },
        { label: this.$t('pickOrder.pickStartTime'), value: 'pickStartTime', type: 'input', readonly: true },
        { label: this.$t('pickOrder.pickEndTime'), value: 'pickEndTime', type: 'input', readonly: true }
        // {label: this.$t('pickOrder.remark'), value: "remark", type: "textarea",disabled:true},
      ]

      // 拣货单明细
      this.diaFormInfo.diaTablePickOrderDt.fieldList = [
        { label: this.$t('table.id'), type: 'seq', width: 50 }, // 序列
        { prop: 'barcode', label: this.$t('pickOrder.pickDt.barcode'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('pickOrder.pickDt.skuCode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('pickOrder.pickDt.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('pickOrder.pickDt.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('pickOrder.pickDt.mainUnit'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('pickOrder.pickDt.lotCode'), minWidth: 100 },
        { prop: 'commodityQty', label: this.$t('pickOrder.pickDt.commodityQty'), minWidth: 100 },
        { prop: 'allotQty', label: this.$t('pickOrder.pickDt.allotQty'), minWidth: 100 },
        { prop: 'waitPickQty', label: this.$t('pickOrder.pickDt.waitPickQty'), minWidth: 100 }
      ]
      // 拣货单SO分配明细
      this.diaFormInfo.diaTablePickSoAssign.fieldList = [
        { label: this.$t('table.id'), type: 'seq', width: 50 }, // 序列
        { prop: 'soNo', label: this.$t('pickOrder.pickSoAssign.soNo'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('pickOrder.pickSoAssign.barcode'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('pickOrder.pickSoAssign.skuCode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('pickOrder.pickSoAssign.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('pickOrder.pickSoAssign.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('pickOrder.pickSoAssign.mainUnit'), minWidth: 100 },
        { prop: 'soAssignStatusName', label: this.$t('pickOrder.pickSoAssign.soAssignStatusName'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('pickOrder.pickSoAssign.lotCode'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('pickOrder.pickSoAssign.batchNo'), minWidth: 100 },
        { prop: 'allotQty', label: this.$t('pickOrder.pickSoAssign.allotQty'), minWidth: 100 },
        { prop: 'pickQty', label: this.$t('pickOrder.pickSoAssign.pickQty'), minWidth: 100 },
        { prop: 'sowQty', label: this.$t('pickOrder.pickSoAssign.sowQty'), minWidth: 100 },
        { prop: 'reviewQty', label: this.$t('pickOrder.pickSoAssign.reviewQty'), minWidth: 100 }
      ]
      // 拣货记录
      this.diaFormInfo.diaTablePickInfo.fieldList = [
        { label: this.$t('table.id'), type: 'seq', width: 50 }, // 序列
        { prop: 'containerNo', label: this.$t('pickOrder.pickInfo.containerNo'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('pickOrder.pickInfo.barcode'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('pickOrder.pickInfo.skuCode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('pickOrder.pickInfo.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('pickOrder.pickInfo.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('pickOrder.pickInfo.mainUnit'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('pickOrder.pickInfo.batchNo'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('pickOrder.pickInfo.lotCode'), minWidth: 100 },
        { prop: 'actualPickQty', label: this.$t('pickOrder.pickInfo.actualPickQty'), minWidth: 100 },
        { prop: 'pickUserName', label: this.$t('pickOrder.pickInfo.pickUserName'), minWidth: 100 },
        { prop: 'pickTime', label: this.$t('pickOrder.pickInfo.pickTime'), minWidth: 100 }
      ]
      // 播种信息
      this.diaFormInfo.diaTableSow.fieldList = [
        { label: this.$t('table.id'), type: 'seq', width: 50 }, // 序列
        { prop: 'waveOrderNo', label: this.$t('pickOrder.sowInfo.waveOrderNo'), minWidth: 100 },
        { prop: 'soNo', label: this.$t('pickOrder.sowInfo.soNo'), minWidth: 100 },
        { prop: 'containerCode', label: this.$t('pickOrder.sowInfo.containerCode'), minWidth: 100 },
        { prop: 'sowCode', label: this.$t('pickOrder.sowInfo.sowCode'), minWidth: 100 },
        { prop: 'sowStatus', label: this.$t('pickOrder.sowInfo.sowStatus'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('pickOrder.sowInfo.barcode'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('pickOrder.sowInfo.skuCode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('pickOrder.sowInfo.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('pickOrder.sowInfo.spec'), minWidth: 100 },
        { prop: 'pickQty', label: this.$t('pickOrder.sowInfo.pickQty'), minWidth: 100 },
        { prop: 'sowQty', label: this.$t('pickOrder.sowInfo.sowQty'), minWidth: 100 },
        { prop: 'opUser', label: this.$t('pickOrder.sowInfo.opUser'), minWidth: 100 },
        { prop: 'opTime', label: this.$t('pickOrder.sowInfo.opTime'), minWidth: 100 }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('pickOrder.id'), value: 'id', type: 'input' },
        { label: this.$t('pickOrder.companyCode'), value: 'companyCode', type: 'input' },
        { label: this.$t('pickOrder.whId'), value: 'whId', type: 'input' },
        { label: this.$t('pickOrder.pickOrderNo'), value: 'pickOrderNo', type: 'input' },
        { label: this.$t('pickOrder.pickOrderStatus'), value: 'pickOrderStatus', type: 'input' },
        { label: this.$t('pickOrder.pickMode'), value: 'pickMode', type: 'input' },
        { label: this.$t('pickOrder.pickStartTime'), value: 'pickStartTime', type: 'input' },
        { label: this.$t('pickOrder.pickEndTime'), value: 'pickEndTime', type: 'input' },
        { label: this.$t('pickOrder.creator'), value: 'creator', type: 'input' },
        { label: this.$t('pickOrder.createName'), value: 'createName', type: 'input' },
        { label: this.$t('pickOrder.createTime'), value: 'createTime', type: 'input' },
        { label: this.$t('pickOrder.updater'), value: 'updater', type: 'input' },
        { label: this.$t('pickOrder.updateName'), value: 'updateName', type: 'input' },
        { label: this.$t('pickOrder.updateTime'), value: 'updateTime', type: 'input' },
        { label: this.$t('pickOrder.remark'), value: 'remark', type: 'input' },
        { label: this.$t('pickOrder.optimistic'), value: 'optimistic', type: 'input' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('pickOrder.companyCode'), value: 'companyCode', type: 'input' },
        { label: this.$t('pickOrder.whId'), value: 'whId', type: 'input' },
        { label: this.$t('pickOrder.pickOrderNo'), value: 'pickOrderNo', type: 'input' },
        { label: this.$t('pickOrder.pickOrderStatus'), value: 'pickOrderStatus', type: 'input' },
        { label: this.$t('pickOrder.pickMode'), value: 'pickMode', type: 'input' },
        { label: this.$t('pickOrder.pickStartTime'), value: 'pickStartTime', type: 'input' },
        { label: this.$t('pickOrder.pickEndTime'), value: 'pickEndTime', type: 'input' },
        { label: this.$t('pickOrder.creator'), value: 'creator', type: 'input' },
        { label: this.$t('pickOrder.createName'), value: 'createName', type: 'input' },
        { label: this.$t('pickOrder.createTime'), value: 'createTime', type: 'input' },
        { label: this.$t('pickOrder.updater'), value: 'updater', type: 'input' },
        { label: this.$t('pickOrder.updateName'), value: 'updateName', type: 'input' },
        { label: this.$t('pickOrder.updateTime'), value: 'updateTime', type: 'input' },
        { label: this.$t('pickOrder.remark'), value: 'remark', type: 'input' },
        { label: this.$t('pickOrder.optimistic'), value: 'optimistic', type: 'input' }
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
        pickOrderStatus: null,
        creator: null,
        createTime: null,
        remark: null,
        updateName: null,
        updater: null,
        optimistic: null,
        updateTime: null,
        pickStartTime: null,
        whId: null,
        pickMode: null,
        companyCode: null,
        pickOrderNo: null,
        id: null,
        pickEndTime: null,
        createName: null
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
    },

    // 列表复选框,选中事件
    handleSelectionChange(event, data) {
      this.printList = data
    }

  }
}
