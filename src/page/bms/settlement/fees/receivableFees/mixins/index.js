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
        { label: this.$t('receivableFees.feesTime'), value: 'feesTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('receivableFees.feesTimeTo'), value: 'feesTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('receivableFees.status'), value: 'status', type: 'select', list: 'standardCurrencyList' },
        { label: '', value: 'sys', type: 'slot' }
      ]
    },

    // 展开收起表单
    collapsableFormMore() {
      this.topForm.fieldList = [
        { label: this.$t('receivableFees.feesTime'), value: 'feesTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('receivableFees.feesTimeTo'), value: 'feesTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('receivableFees.status'), value: 'status', type: 'select', list: 'standardCurrencyList' },
        { label: this.$t('receivableFees.attributionDept'), value: 'attributionDept', type: 'select', list: 'statusList' },
        { label: this.$t('receivableFees.settlementUnit'), value: 'settlementUnit', type: 'input' },
        { label: this.$t('receivableFees.billSuject'), value: 'billSuject', type: 'select', list: 'statusList' },
        { label: this.$t('receivableFees.owner'), value: 'owner', type: 'input' },
        { label: this.$t('receivableFees.carrier'), value: 'carrier', type: 'input' },
        { label: this.$t('receivableFees.storehouse'), value: 'storehouse', type: 'input' },
        { label: this.$t('receivableFees.salesWarehouse'), value: 'salesWarehouse', type: 'input' },
        { label: this.$t('receivableFees.supplier'), value: 'supplier', type: 'input' },
        { label: this.$t('receivableFees.customer'), value: 'customer', type: 'input' },
        { label: this.$t('receivableFees.detailNo'), value: 'detailNo', type: 'input' },
        { label: this.$t('receivableFees.sysBusinessNo'), value: 'sysBusinessNo', type: 'input' },
        { label: this.$t('receivableFees.customerNo1'), value: 'customerNo1', type: 'input' },
        { label: this.$t('receivableFees.customerNo2'), value: 'customerNo2', type: 'input' },
        { label: this.$t('receivableFees.relatedBill'), value: 'relatedBill', type: 'input' },
        { label: this.$t('receivableFees.associatedOrderNo'), value: 'associatedOrderNo', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }
      ]
    },

    // 初始化列表
    initTableInfo() {
      const fieldList = [
        { label: '', type: 'selection', width: 50, fixed: 'left' }, // 选项框
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'detailNo', label: this.$t('receivableFees.detailNo'), minWidth: 120 },
        { prop: 'invoiceStatus', label: this.$t('receivableFees.invoiceStatus'), minWidth: 100 },
        { prop: 'calculateStatus', label: this.$t('receivableFees.calculateStatus'), minWidth: 100 },
        { prop: 'reason', label: this.$t('receivableFees.reason'), minWidth: 100 },
        { prop: 'dataSource', label: this.$t('receivableFees.dataSource'), minWidth: 100 },
        { prop: 'billingDataSource', label: this.$t('receivableFees.billingDataSource'), minWidth: 100 },
        { prop: 'businessNo', label: this.$t('receivableFees.businessNo'), minWidth: 100 },
        { prop: 'feesTime', label: this.$t('receivableFees.feesTime'), minWidth: 100 },
        { prop: 'owner', label: this.$t('receivableFees.owner'), minWidth: 100 },
        { prop: 'storehouse', label: this.$t('receivableFees.storehouse'), minWidth: 100 },
        { prop: 'salesWarehouse', label: this.$t('receivableFees.salesWarehouse'), minWidth: 100 },
        { prop: 'carrier', label: this.$t('receivableFees.carrier'), minWidth: 100 },
        { prop: 'businessDesc', label: this.$t('receivableFees.businessDesc'), minWidth: 100 },
        { prop: 'associatedContract', label: this.$t('receivableFees.associatedContract'), minWidth: 100 },
        { prop: 'attributionDept', label: this.$t('receivableFees.attributionDept'), minWidth: 100 },
        { prop: 'settlementUnit', label: this.$t('receivableFees.settlementUnit'), minWidth: 100 },
        { prop: 'billSuject', label: this.$t('receivableFees.billSuject'), minWidth: 100 },
        { prop: 'billParams', label: this.$t('receivableFees.billParams'), minWidth: 100 },
        { prop: 'billUnit', label: this.$t('receivableFees.billUnit'), minWidth: 100 },
        { prop: 'contractPrice', label: this.$t('receivableFees.contractPrice'), minWidth: 100 },
        { prop: 'contractPriceUnit', label: this.$t('receivableFees.contractPriceUnit'), minWidth: 100 },
        { prop: 'fees', label: this.$t('receivableFees.fees'), minWidth: 100 },
        { prop: 'additionalFees', label: this.$t('receivableFees.additionalFees'), minWidth: 110 },
        { prop: 'deductionFees', label: this.$t('receivableFees.deductionFees'), minWidth: 110 },
        { prop: 'totalFees', label: this.$t('receivableFees.totalFees'), minWidth: 110 },
        { prop: 'associatedStatement', label: this.$t('receivableFees.associatedStatement'), minWidth: 100 },
        { prop: 'billingCycle', label: this.$t('receivableFees.billingCycle'), minWidth: 100 },
        { prop: 'creator', label: this.$t('receivableFees.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('receivableFees.createTime'), minWidth: 100 },
        { prop: 'reviewer', label: this.$t('receivableFees.reviewer'), minWidth: 100 },
        { prop: 'reviewTime', label: this.$t('receivableFees.reviewTime'), minWidth: 100 },
        { prop: 'biller', label: this.$t('receivableFees.biller'), minWidth: 100 },
        { prop: 'billTime', label: this.$t('receivableFees.billTime'), minWidth: 100 }
      ]
      this.tableInfo1.fieldList = this.tableInfo2.fieldList = this.tableInfo3.fieldList = this.tableInfo4.fieldList = this.tableInfo5.fieldList = fieldList
    },

    // 初始化费用调整
    initAdjustmentFees() {
      this.dialogInfo.title = this.$t('receivableFees.adjustmentFees')
      this.dialogInfo.fieldList = [
        { label: this.$t('receivableFees.adjustmentType'), value: 'adjustmentType', type: 'select', list: 'statusList', require },
        { label: this.$t('receivableFees.adjustmentAmount'), value: 'adjustmentAmount', type: 'input', require },
        { label: this.$t('receivableFees.adjustmentRemark'), value: 'adjustmentRemark', type: 'input' },
        { label: this.$t('receivableFees.certificate'), value: 'certificate', type: 'slot', className: 'long-row' }
      ]
      this.dialogInfo.rules = {
        adjustmentType: [{ required: true, message: this.$t('receivableFees.msg.adjustmentType'), trigger: 'blur' }],
        adjustmentAmount: [{ required: true, message: this.$t('receivableFees.msg.adjustmentAmount'), trigger: 'blur' }]
      }
      this.$nextTick(() => {
        this.dialogInfo.ref.resetFields()
      })
    },

    // 初始化批量计算、批量出账
    initBatch() {
      this.dialogInfo.title = this.$t('receivableFees.batchCalculate')
      this.dialogInfo.fieldList = [
        { label: this.$t('receivableFees.feesTime'), value: 'feesTime', type: 'date', dateType: 'datetime', span: 12, format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss', require },
        { label: this.$t('receivableFees.feesTimeTo'), value: 'feesTimeTo', type: 'date', dateType: 'datetime', span: 12, format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss', require },
        { label: this.$t('receivableFees.owner'), value: 'owner', type: 'input' },
        { label: this.$t('receivableFees.carrier'), value: 'carrier', type: 'input' },
        { label: this.$t('receivableFees.storehouse'), value: 'storehouse', type: 'input' },
        { label: this.$t('receivableFees.billSuject'), value: 'billSuject', type: 'select', list: 'statusList' }
      ]
      this.dialogInfo.rules = {
        feesTime: [{ required: true, message: this.$t('receivableFees.msg.feesTime'), trigger: 'blur' }],
        feesTimeTo: [{ required: true, message: this.$t('receivableFees.msg.feesTimeTo'), trigger: 'blur' }]
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
