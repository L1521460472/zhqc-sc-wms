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
          isEnable: null,
          ownerId: null,
          storeId: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        enableList: [],
        invoiceVersionList: []
      },
      invoiceVersionMap: null,
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: null
      },
      // 弹窗表单
      diaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        labelWidth: '150px'
      }
    }
  },
  mounted() {
    this.initTopFormColumns()// 初始化查询界面配置数据
    this.rulesInit()// 初始化diaFormInfo表单字段校验规则
  },
  methods: {
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化top表单
      this.topForm.fieldList = [
        { label: this.$t('invoiceDrawerSet.isEnable'), value: 'isEnable', type: 'select', list: 'enableList' },
        { label: this.$t('invoiceDrawerSet.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('invoiceDrawerSet.storeId'), value: 'storeId', type: 'slot' },
        { label: '', value: 'sys', type: 'slot' }
      ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'ownerName', label: this.$t('invoiceDrawerSet.ownerId'), minWidth: 100 },
        { prop: 'storeName', label: this.$t('invoiceDrawerSet.storeId'), minWidth: 100 },
        { prop: 'invoiceVersionName', label: this.$t('invoiceDrawerSet.invoiceVersion'), minWidth: 100 },
        { prop: 'isEnableName', label: this.$t('invoiceDrawerSet.isEnable'), minWidth: 100 },
        { prop: 'creatorName', label: this.$t('invoiceDrawerSet.creatorName'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('invoiceDrawerSet.createTime'), minWidth: 100 },
        { prop: 'updaterName', label: this.$t('invoiceDrawerSet.updaterName'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('invoiceDrawerSet.updateTime'), minWidth: 100 },
        { prop: 'remark', label: this.$t('invoiceDrawerSet.remark'), minWidth: 100 },
        { label: '操作', value: 'status', width: 280, type: 'slot', fixed: 'right' } // value: 'status' 对应页面上 自定义插槽的名字v-slot:col-status
      ]
    },

    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('invoiceDrawerSet.ownerId'), value: 'ownerId', type: 'slot', disabled: true },
        { label: this.$t('invoiceDrawerSet.storeId'), value: 'storeId', type: 'slot', disabled: true },
        { label: this.$t('invoiceDrawerSet.invoiceVersion'), value: 'invoiceVersion', type: 'select', list: 'invoiceVersionList', disabled: true },
        { label: this.$t('invoiceDrawerSet.openTicketQuota'), value: 'openTicketQuota', type: 'input', disabled: true },
        { label: this.$t('invoiceDrawerSet.payeeTaxationRegisterNo'), value: 'payeeTaxationRegisterNo', type: 'input', disabled: true },
        { label: this.$t('invoiceDrawerSet.drawerName'), value: 'drawerName', type: 'input', disabled: true },
        { label: this.$t('invoiceDrawerSet.drawerAddress'), value: 'drawerAddress', type: 'input', disabled: true },
        { label: this.$t('invoiceDrawerSet.drawerOpenAccountBank'), value: 'drawerOpenAccountBank', type: 'input', disabled: true },
        { label: this.$t('invoiceDrawerSet.drawerOpenAccountNo'), value: 'drawerOpenAccountNo', type: 'input', disabled: true },
        { label: this.$t('invoiceDrawerSet.drawerOpenAccountTel'), value: 'drawerOpenAccountTel', type: 'input', disabled: true },
        { label: this.$t('invoiceDrawerSet.drawerUserNo'), value: 'drawerUserNo', type: 'input', disabled: true },
        { label: this.$t('invoiceDrawerSet.reviewUserNo'), value: 'reviewUserNo', type: 'input', disabled: true },
        { label: this.$t('invoiceDrawerSet.defaultTaxItemCode'), value: 'defaultTaxItemCode', type: 'input', disabled: true },
        { label: this.$t('invoiceDrawerSet.defaultTaxItemName'), value: 'defaultTaxItemName', type: 'input', disabled: true },
        { label: this.$t('invoiceDrawerSet.taxRate'), value: 'taxRate', type: 'input', disabled: true },
        { label: this.$t('invoiceDrawerSet.invoiceServiceProvider'), value: 'invoiceServiceProvider', type: 'input', disabled: true },
        { label: this.$t('invoiceDrawerSet.authorizeEnterpriseCode'), value: 'authorizeEnterpriseCode', type: 'input', disabled: true },
        { label: this.$t('invoiceDrawerSet.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', disabled: true },
        { label: this.$t('invoiceDrawerSet.chReason'), value: 'chReason', type: 'textarea', disabled: true },
        { label: this.$t('invoiceDrawerSet.remark'), value: 'remark', type: 'textarea', disabled: true }
      ]
    },

    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.$set(this.diaFormInfo.data, 'invoiceVersion', 'QYB')
      this.$set(this.diaFormInfo.data, 'isEnable', 1)
      this.$set(this.diaFormInfo.data, 'openTicketQuota', this.invoiceVersionMap.get('QYB'))
      this.diaFormInfo.fieldList = [
        { label: this.$t('invoiceDrawerSet.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('invoiceDrawerSet.storeId'), value: 'storeId', type: 'slot' },
        { label: this.$t('invoiceDrawerSet.invoiceVersion'), value: 'invoiceVersion', type: 'select', list: 'invoiceVersionList', event: 'invoiceVersionSelect', clearable: false },
        { label: this.$t('invoiceDrawerSet.openTicketQuota'), value: 'openTicketQuota', type: 'input', disabled: true },
        { label: this.$t('invoiceDrawerSet.payeeTaxationRegisterNo'), value: 'payeeTaxationRegisterNo', type: 'input' },
        { label: this.$t('invoiceDrawerSet.drawerName'), value: 'drawerName', type: 'input' },
        { label: this.$t('invoiceDrawerSet.drawerAddress'), value: 'drawerAddress', type: 'input' },
        { label: this.$t('invoiceDrawerSet.drawerOpenAccountBank'), value: 'drawerOpenAccountBank', type: 'input' },
        { label: this.$t('invoiceDrawerSet.drawerOpenAccountNo'), value: 'drawerOpenAccountNo', type: 'input' },
        { label: this.$t('invoiceDrawerSet.drawerOpenAccountTel'), value: 'drawerOpenAccountTel', type: 'input' },
        { label: this.$t('invoiceDrawerSet.drawerUserNo'), value: 'drawerUserNo', type: 'input' },
        { label: this.$t('invoiceDrawerSet.reviewUserNo'), value: 'reviewUserNo', type: 'input' },
        { label: this.$t('invoiceDrawerSet.defaultTaxItemCode'), value: 'defaultTaxItemCode', type: 'input' },
        { label: this.$t('invoiceDrawerSet.defaultTaxItemName'), value: 'defaultTaxItemName', type: 'input' },
        { label: this.$t('invoiceDrawerSet.taxRate'), value: 'taxRate', type: 'input' },
        { label: this.$t('invoiceDrawerSet.invoiceServiceProvider'), value: 'invoiceServiceProvider', type: 'input' },
        { label: this.$t('invoiceDrawerSet.authorizeEnterpriseCode'), value: 'authorizeEnterpriseCode', type: 'input' },
        { label: this.$t('invoiceDrawerSet.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', clearable: false },
        { label: this.$t('invoiceDrawerSet.chReason'), value: 'chReason', type: 'textarea' },
        { label: this.$t('invoiceDrawerSet.remark'), value: 'remark', type: 'textarea' }
      ]
    },

    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('invoiceDrawerSet.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('invoiceDrawerSet.storeId'), value: 'storeId', type: 'slot' },
        { label: this.$t('invoiceDrawerSet.invoiceVersion'), value: 'invoiceVersion', type: 'select', list: 'invoiceVersionList', event: 'invoiceVersionSelect', clearable: false },
        { label: this.$t('invoiceDrawerSet.openTicketQuota'), value: 'openTicketQuota', type: 'input', disabled: true },
        { label: this.$t('invoiceDrawerSet.payeeTaxationRegisterNo'), value: 'payeeTaxationRegisterNo', type: 'input' },
        { label: this.$t('invoiceDrawerSet.drawerName'), value: 'drawerName', type: 'input' },
        { label: this.$t('invoiceDrawerSet.drawerAddress'), value: 'drawerAddress', type: 'input' },
        { label: this.$t('invoiceDrawerSet.drawerOpenAccountBank'), value: 'drawerOpenAccountBank', type: 'input' },
        { label: this.$t('invoiceDrawerSet.drawerOpenAccountNo'), value: 'drawerOpenAccountNo', type: 'input' },
        { label: this.$t('invoiceDrawerSet.drawerOpenAccountTel'), value: 'drawerOpenAccountTel', type: 'input' },
        { label: this.$t('invoiceDrawerSet.drawerUserNo'), value: 'drawerUserNo', type: 'input' },
        { label: this.$t('invoiceDrawerSet.reviewUserNo'), value: 'reviewUserNo', type: 'input' },
        { label: this.$t('invoiceDrawerSet.defaultTaxItemCode'), value: 'defaultTaxItemCode', type: 'input' },
        { label: this.$t('invoiceDrawerSet.defaultTaxItemName'), value: 'defaultTaxItemName', type: 'input' },
        { label: this.$t('invoiceDrawerSet.taxRate'), value: 'taxRate', type: 'input' },
        { label: this.$t('invoiceDrawerSet.invoiceServiceProvider'), value: 'invoiceServiceProvider', type: 'input' },
        { label: this.$t('invoiceDrawerSet.authorizeEnterpriseCode'), value: 'authorizeEnterpriseCode', type: 'input' },
        { label: this.$t('invoiceDrawerSet.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', clearable: false },
        { label: this.$t('invoiceDrawerSet.chReason'), value: 'chReason', type: 'textarea' },
        { label: this.$t('invoiceDrawerSet.remark'), value: 'remark', type: 'textarea' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        isEnable: [{ required: true, message: this.$t('invoiceDrawerSet.msg.isEnable'), trigger: 'blur' }],
        ownerId: [{ required: true, message: this.$t('invoiceDrawerSet.msg.ownerId'), trigger: 'blur' }],
        storeId: [{ required: true, message: this.$t('invoiceDrawerSet.msg.storeId'), trigger: 'blur' }],
        invoiceVersion: [{ required: true, message: this.$t('invoiceDrawerSet.msg.invoiceVersion'), trigger: 'blur' }],
        drawerUserNo: [{ required: true, message: this.$t('invoiceDrawerSet.msg.drawerUserNo'), trigger: 'blur' }],
        payeeTaxationRegisterNo: [{ required: true, message: this.$t('invoiceDrawerSet.msg.payeeTaxationRegisterNo'), trigger: 'blur' }],
        chReason: [{ required: true, message: this.$t('invoiceDrawerSet.msg.chReason'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        isEnable: null,
        ownerId: null,
        drawerOpenAccountTel: null,
        drawerUserNo: null,
        remark: null,
        drawerOpenAccountNo: null,
        taxRate: null,
        defaultTaxItemName: null,
        updater: null,
        updateTime: null,
        companyCode: null,
        invoiceServiceProvider: null,
        id: null,
        storeId: null,
        defaultTaxItemCode: null,
        creator: null,
        createTime: null,
        authorizeEnterpriseCode: null,
        invoiceVersion: null,
        updaterName: null,
        payeeTaxationRegisterNo: null,
        drawerAddress: null,
        reviewUserNo: null,
        drawerOpenAccountBank: null,
        creatorName: null,
        drawerName: null
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

    // 发票版本change事件
    invoiceVersionSelect(data) {
      this.$set(this.diaFormInfo.data, 'openTicketQuota', this.invoiceVersionMap.get(data))
    }
  }
}
