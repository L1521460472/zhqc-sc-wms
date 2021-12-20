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
          contractNo: null,
          contractName: null,
          contractType: null,
          attributionDept: null,
          partyA: null,
          effectiveTime: null,
          effectiveTo: null,
          status: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        standardCurrencyList: [
          { key: '是', value: 0 },
          { key: '否', value: 1 }
        ],
        statusList: [
          { key: '启用', value: 0 },
          { key: '停用', value: 1 }
        ]
      },
      // 主页面表格
      tableInfo1: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '160', // 默认操作按钮列宽度
          btList: [
            { label: this.$t('table.view'), type: 'primary', icon: '', event: 'view', show: true, disabled: this.$hasPerm('view') },
            { slot: true, icon: '', event: 'slotEvent' }
          ]
        }
      },
      // 主页面表格
      tableInfo2: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '160', // 默认操作按钮列宽度
          btList: [
            { label: this.$t('table.view'), type: 'primary', icon: '', event: 'view', show: true, disabled: this.$hasPerm('view') },
            { slot: true, icon: '', event: 'slotEvent' }
          ]
        }
      },
      // 主页面表格
      tableInfo3: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '160', // 默认操作按钮列宽度
          btList: [
            { label: this.$t('table.view'), type: 'primary', icon: '', event: 'view', show: true, disabled: this.$hasPerm('view') },
            { slot: true, icon: '', event: 'slotEvent' }
          ]
        }
      },
      // 主页面表格
      tableInfo4: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '160', // 默认操作按钮列宽度
          btList: [
            { label: this.$t('table.view'), type: 'primary', icon: '', event: 'view', show: true, disabled: this.$hasPerm('view') },
            { slot: true, icon: '', event: 'slotEvent' }
          ]
        }
      },
      // 主页面表格
      tableInfo5: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '160', // 默认操作按钮列宽度
          btList: [
            { label: this.$t('table.view'), type: 'primary', icon: '', event: 'view', show: true, disabled: this.$hasPerm('view') },
            { slot: true, icon: '', event: 'slotEvent' }
          ]
        }
      },
      // 弹框配置
      dialogInfo: {
        ref: null,
        visible: false,
        flag: '',
        title: '',
        type: '',
        width: '720px',
        data: {},
        rules: {},
        fieldList: [],
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', btLoading: false, show: true }
        ]
      }
    }
  },
  mounted() {
    this.initTableInfo()
  },
  methods: {
    // 展开收起表单
    collapsableForm() {
      this.topForm.fieldList = [
        { label: this.$t('payableFees.feesTime'), value: 'feesTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('payableFees.feesTimeTo'), value: 'feesTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('payableFees.status'), value: 'status', type: 'select', list: 'standardCurrencyList' },
        { label: '', value: 'sys', type: 'slot' }
      ]
    },

    // 展开收起表单
    collapsableFormMore() {
      this.topForm.fieldList = [
        { label: this.$t('payableFees.feesTime'), value: 'feesTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('payableFees.feesTimeTo'), value: 'feesTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('payableFees.status'), value: 'status', type: 'select', list: 'standardCurrencyList' },
        { label: this.$t('payableFees.attributionDept'), value: 'attributionDept', type: 'select', list: 'statusList' },
        { label: this.$t('payableFees.settlementUnit'), value: 'settlementUnit', type: 'input' },
        { label: this.$t('payableFees.billSuject'), value: 'billSuject', type: 'select', list: 'statusList' },
        { label: this.$t('payableFees.owner'), value: 'owner', type: 'input' },
        { label: this.$t('payableFees.carrier'), value: 'carrier', type: 'input' },
        { label: this.$t('payableFees.storehouse'), value: 'storehouse', type: 'input' },
        { label: this.$t('payableFees.salesWarehouse'), value: 'salesWarehouse', type: 'input' },
        { label: this.$t('payableFees.supplier'), value: 'supplier', type: 'input' },
        { label: this.$t('payableFees.customer'), value: 'customer', type: 'input' },
        { label: this.$t('payableFees.detailNo'), value: 'detailNo', type: 'input' },
        { label: this.$t('payableFees.sysBusinessNo'), value: 'sysBusinessNo', type: 'input' },
        { label: this.$t('payableFees.customerNo1'), value: 'customerNo1', type: 'input' },
        { label: this.$t('payableFees.customerNo2'), value: 'customerNo2', type: 'input' },
        { label: this.$t('payableFees.relatedBill'), value: 'relatedBill', type: 'input' },
        { label: this.$t('payableFees.associatedOrderNo'), value: 'associatedOrderNo', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }
      ]
    },

    // 初始化列表
    initTableInfo() {
      const fieldList = [
        { label: '', type: 'selection', width: 50, fixed: 'left' }, // 选项框
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'detailNo', label: this.$t('payableFees.detailNo'), minWidth: 120 },
        { prop: 'invoiceStatus', label: this.$t('payableFees.invoiceStatus'), minWidth: 100 },
        { prop: 'calculateStatus', label: this.$t('payableFees.calculateStatus'), minWidth: 100 },
        { prop: 'reason', label: this.$t('payableFees.reason'), minWidth: 100 },
        { prop: 'dataSource', label: this.$t('payableFees.dataSource'), minWidth: 100 },
        { prop: 'billingDataSource', label: this.$t('payableFees.billingDataSource'), minWidth: 100 },
        { prop: 'businessNo', label: this.$t('payableFees.businessNo'), minWidth: 100 },
        { prop: 'feesTime', label: this.$t('payableFees.feesTime'), minWidth: 100 },
        { prop: 'owner', label: this.$t('payableFees.owner'), minWidth: 100 },
        { prop: 'storehouse', label: this.$t('payableFees.storehouse'), minWidth: 100 },
        { prop: 'salesWarehouse', label: this.$t('payableFees.salesWarehouse'), minWidth: 100 },
        { prop: 'carrier', label: this.$t('payableFees.carrier'), minWidth: 100 },
        { prop: 'businessDesc', label: this.$t('payableFees.businessDesc'), minWidth: 100 },
        { prop: 'associatedContract', label: this.$t('payableFees.associatedContract'), minWidth: 100 },
        { prop: 'attributionDept', label: this.$t('payableFees.attributionDept'), minWidth: 100 },
        { prop: 'settlementUnit', label: this.$t('payableFees.settlementUnit'), minWidth: 100 },
        { prop: 'billSuject', label: this.$t('payableFees.billSuject'), minWidth: 100 },
        { prop: 'billParams', label: this.$t('payableFees.billParams'), minWidth: 100 },
        { prop: 'billUnit', label: this.$t('payableFees.billUnit'), minWidth: 100 },
        { prop: 'contractPrice', label: this.$t('payableFees.contractPrice'), minWidth: 100 },
        { prop: 'contractPriceUnit', label: this.$t('payableFees.contractPriceUnit'), minWidth: 100 },
        { prop: 'fees', label: this.$t('payableFees.fees'), minWidth: 100 },
        { prop: 'additionalFees', label: this.$t('payableFees.additionalFees'), minWidth: 110 },
        { prop: 'deductionFees', label: this.$t('payableFees.deductionFees'), minWidth: 110 },
        { prop: 'totalFees', label: this.$t('payableFees.totalFees'), minWidth: 110 },
        { prop: 'associatedStatement', label: this.$t('payableFees.associatedStatement'), minWidth: 100 },
        { prop: 'billingCycle', label: this.$t('payableFees.billingCycle'), minWidth: 100 },
        { prop: 'creator', label: this.$t('payableFees.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('payableFees.createTime'), minWidth: 100 },
        { prop: 'reviewer', label: this.$t('payableFees.reviewer'), minWidth: 100 },
        { prop: 'reviewTime', label: this.$t('payableFees.reviewTime'), minWidth: 100 },
        { prop: 'biller', label: this.$t('payableFees.biller'), minWidth: 100 },
        { prop: 'billTime', label: this.$t('payableFees.billTime'), minWidth: 100 }
      ]
      this.tableInfo1.fieldList = this.tableInfo2.fieldList = this.tableInfo3.fieldList = this.tableInfo4.fieldList = this.tableInfo5.fieldList = fieldList
    },

    // 初始化费用调整
    initAdjustmentFees() {
      this.dialogInfo.title = this.$t('payableFees.adjustmentFees')
      this.dialogInfo.fieldList = [
        { label: this.$t('payableFees.adjustmentType'), value: 'adjustmentType', type: 'select', list: 'statusList', require },
        { label: this.$t('payableFees.adjustmentAmount'), value: 'adjustmentAmount', type: 'input', require },
        { label: this.$t('payableFees.adjustmentRemark'), value: 'adjustmentRemark', type: 'input' },
        { label: this.$t('payableFees.certificate'), value: 'certificate', type: 'slot', className: 'long-row' }
      ]
      this.dialogInfo.rules = {
        adjustmentType: [{ required: true, message: this.$t('payableFees.msg.adjustmentType'), trigger: 'blur' }],
        adjustmentAmount: [{ required: true, message: this.$t('payableFees.msg.adjustmentAmount'), trigger: 'blur' }]
      }
      this.$nextTick(() => {
        this.dialogInfo.ref.resetFields()
      })
    },

    // 初始化批量计算、批量出账
    initBatch() {
      this.dialogInfo.title = this.$t('payableFees.batchCalculate')
      this.dialogInfo.fieldList = [
        { label: this.$t('payableFees.feesTime'), value: 'feesTime', type: 'date', dateType: 'datetime', span: 12, format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss', require },
        { label: this.$t('payableFees.feesTimeTo'), value: 'feesTimeTo', type: 'date', dateType: 'datetime', span: 12, format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss', require },
        { label: this.$t('payableFees.owner'), value: 'owner', type: 'input' },
        { label: this.$t('payableFees.carrier'), value: 'carrier', type: 'input' },
        { label: this.$t('payableFees.storehouse'), value: 'storehouse', type: 'input' },
        { label: this.$t('payableFees.billSuject'), value: 'billSuject', type: 'select', list: 'statusList' }
      ]
      this.dialogInfo.rules = {
        feesTime: [{ required: true, message: this.$t('payableFees.msg.feesTime'), trigger: 'blur' }],
        feesTimeTo: [{ required: true, message: this.$t('payableFees.msg.feesTimeTo'), trigger: 'blur' }]
      }
      this.$nextTick(() => {
        this.dialogInfo.ref.resetFields()
      })
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
