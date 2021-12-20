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
          ownerId: null,
          customerId: null,
          storeId: null,
          partnerId: null,
          receiver: null,
          receiverTel: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        soTypeList: [],
        soStatusList: []
      },
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
      },
      kaiPiaoList: []
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
        { label: this.$t('invoiceDrawer.soNo'), value: 'soNo', type: 'input' },
        { label: this.$t('invoiceDrawer.soType'), value: 'soType', type: 'select', list: 'soTypeList' },
        { label: this.$t('invoiceDrawer.soStatus'), value: 'soStatus', type: 'select', list: 'soStatusList' },
        { label: this.$t('invoiceDrawer.ownerName'), value: 'ownerId', type: 'slot' },
        { label: this.$t('invoiceDrawer.customerName'), value: 'customerId', type: 'slot' },
        { label: this.$t('invoiceDrawer.storeName'), value: 'storeId', type: 'slot' },
        { label: this.$t('invoiceDrawer.carrierName'), value: 'partnerId', type: 'slot' },
        { label: this.$t('invoiceDrawer.receiver'), value: 'receiver', type: 'input' },
        { label: this.$t('invoiceDrawer.receiverTel'), value: 'receiverTel', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('invoiceDrawer.soNo'), value: 'soNo', type: 'input' },
        { label: this.$t('invoiceDrawer.soType'), value: 'soType', type: 'select', list: 'soTypeList' },
        { label: this.$t('invoiceDrawer.soStatus'), value: 'soStatus', type: 'select', list: 'soStatusList' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
      this.topForm.data.ownerId = null
      this.topForm.data.customerId = null
      this.topForm.data.storeId = null
      this.topForm.data.partnerId = null
    },
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'selection', width: 50 }, // 序列
        { prop: 'soNo', label: this.$t('invoiceDrawer.soNo'), minWidth: 150 },
        { prop: 'soTypeName', label: this.$t('invoiceDrawer.soType'), minWidth: 100 },
        { prop: 'soStatusName', label: this.$t('invoiceDrawer.soStatus'), minWidth: 100 },
        { prop: 'customerName', label: this.$t('invoiceDrawer.customerName'), minWidth: 100 },
        { prop: 'storeName', label: this.$t('invoiceDrawer.storeName'), minWidth: 100 },
        { prop: 'carrierName', label: this.$t('invoiceDrawer.carrierName'), minWidth: 100 },
        { prop: 'invoiceTitle', label: this.$t('invoiceDrawer.invoiceTitle'), minWidth: 100 },
        { prop: 'receiver', label: this.$t('invoiceDrawer.receiver'), minWidth: 100 },
        { prop: 'receiverTel', label: this.$t('invoiceDrawer.receiverTel'), minWidth: 100 },
        { prop: 'addr', label: this.$t('invoiceDrawer.addr'), minWidth: 100 },
        { prop: 'kpStatus', label: this.$t('invoiceDrawer.kpStatus'), minWidth: 100 },
        { label: '操作', value: 'status', width: 130, type: 'slot', fixed: 'right' } // value: 'status' 对应页面上 自定义插槽的名字v-slot:col-status
      ]
    },

    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('invoiceDrawer.ownerId'), value: 'ownerId', type: 'slot', disabled: true },
        { label: this.$t('invoiceDrawer.storeId'), value: 'storeId', type: 'slot', disabled: true },
        { label: this.$t('invoiceDrawer.invoiceVersion'), value: 'invoiceVersion', type: 'select', list: 'invoiceVersionList', disabled: true },
        { label: this.$t('invoiceDrawer.openTicketQuota'), value: 'openTicketQuota', type: 'input', disabled: true },
        { label: this.$t('invoiceDrawer.payeeTaxationRegisterNo'), value: 'payeeTaxationRegisterNo', type: 'input', disabled: true },
        { label: this.$t('invoiceDrawer.drawerName'), value: 'drawerName', type: 'input', disabled: true },
        { label: this.$t('invoiceDrawer.drawerAddress'), value: 'drawerAddress', type: 'input', disabled: true },
        { label: this.$t('invoiceDrawer.drawerOpenAccountBank'), value: 'drawerOpenAccountBank', type: 'input', disabled: true },
        { label: this.$t('invoiceDrawer.drawerOpenAccountNo'), value: 'drawerOpenAccountNo', type: 'input', disabled: true },
        { label: this.$t('invoiceDrawer.drawerOpenAccountTel'), value: 'drawerOpenAccountTel', type: 'input', disabled: true },
        { label: this.$t('invoiceDrawer.drawerUserNo'), value: 'drawerUserNo', type: 'input', disabled: true },
        { label: this.$t('invoiceDrawer.reviewUserNo'), value: 'reviewUserNo', type: 'input', disabled: true },
        { label: this.$t('invoiceDrawer.defaultTaxItemCode'), value: 'defaultTaxItemCode', type: 'input', disabled: true },
        { label: this.$t('invoiceDrawer.defaultTaxItemName'), value: 'defaultTaxItemName', type: 'input', disabled: true },
        { label: this.$t('invoiceDrawer.taxRate'), value: 'taxRate', type: 'input', disabled: true },
        { label: this.$t('invoiceDrawer.invoiceServiceProvider'), value: 'invoiceServiceProvider', type: 'input', disabled: true },
        { label: this.$t('invoiceDrawer.authorizeEnterpriseCode'), value: 'authorizeEnterpriseCode', type: 'input', disabled: true },
        { label: this.$t('invoiceDrawer.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', disabled: true },
        { label: this.$t('invoiceDrawer.remark'), value: 'remark', type: 'textarea', disabled: true }
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
        { label: this.$t('invoiceDrawer.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('invoiceDrawer.storeId'), value: 'storeId', type: 'slot' },
        { label: this.$t('invoiceDrawer.invoiceVersion'), value: 'invoiceVersion', type: 'select', list: 'invoiceVersionList', event: 'invoiceVersionSelect', clearable: false },
        { label: this.$t('invoiceDrawer.openTicketQuota'), value: 'openTicketQuota', type: 'input', disabled: true },
        { label: this.$t('invoiceDrawer.payeeTaxationRegisterNo'), value: 'payeeTaxationRegisterNo', type: 'input' },
        { label: this.$t('invoiceDrawer.drawerName'), value: 'drawerName', type: 'input' },
        { label: this.$t('invoiceDrawer.drawerAddress'), value: 'drawerAddress', type: 'input' },
        { label: this.$t('invoiceDrawer.drawerOpenAccountBank'), value: 'drawerOpenAccountBank', type: 'input' },
        { label: this.$t('invoiceDrawer.drawerOpenAccountNo'), value: 'drawerOpenAccountNo', type: 'input' },
        { label: this.$t('invoiceDrawer.drawerOpenAccountTel'), value: 'drawerOpenAccountTel', type: 'input' },
        { label: this.$t('invoiceDrawer.drawerUserNo'), value: 'drawerUserNo', type: 'input' },
        { label: this.$t('invoiceDrawer.reviewUserNo'), value: 'reviewUserNo', type: 'input' },
        { label: this.$t('invoiceDrawer.defaultTaxItemCode'), value: 'defaultTaxItemCode', type: 'input' },
        { label: this.$t('invoiceDrawer.defaultTaxItemName'), value: 'defaultTaxItemName', type: 'input' },
        { label: this.$t('invoiceDrawer.taxRate'), value: 'taxRate', type: 'input' },
        { label: this.$t('invoiceDrawer.invoiceServiceProvider'), value: 'invoiceServiceProvider', type: 'input' },
        { label: this.$t('invoiceDrawer.authorizeEnterpriseCode'), value: 'authorizeEnterpriseCode', type: 'input' },
        { label: this.$t('invoiceDrawer.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', clearable: false },
        { label: this.$t('invoiceDrawer.remark'), value: 'remark', type: 'textarea' }
      ]
    },

    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('invoiceDrawer.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('invoiceDrawer.storeId'), value: 'storeId', type: 'slot' },
        { label: this.$t('invoiceDrawer.invoiceVersion'), value: 'invoiceVersion', type: 'select', list: 'invoiceVersionList', event: 'invoiceVersionSelect', clearable: false },
        { label: this.$t('invoiceDrawer.openTicketQuota'), value: 'openTicketQuota', type: 'input', disabled: true },
        { label: this.$t('invoiceDrawer.payeeTaxationRegisterNo'), value: 'payeeTaxationRegisterNo', type: 'input' },
        { label: this.$t('invoiceDrawer.drawerName'), value: 'drawerName', type: 'input' },
        { label: this.$t('invoiceDrawer.drawerAddress'), value: 'drawerAddress', type: 'input' },
        { label: this.$t('invoiceDrawer.drawerOpenAccountBank'), value: 'drawerOpenAccountBank', type: 'input' },
        { label: this.$t('invoiceDrawer.drawerOpenAccountNo'), value: 'drawerOpenAccountNo', type: 'input' },
        { label: this.$t('invoiceDrawer.drawerOpenAccountTel'), value: 'drawerOpenAccountTel', type: 'input' },
        { label: this.$t('invoiceDrawer.drawerUserNo'), value: 'drawerUserNo', type: 'input' },
        { label: this.$t('invoiceDrawer.reviewUserNo'), value: 'reviewUserNo', type: 'input' },
        { label: this.$t('invoiceDrawer.defaultTaxItemCode'), value: 'defaultTaxItemCode', type: 'input' },
        { label: this.$t('invoiceDrawer.defaultTaxItemName'), value: 'defaultTaxItemName', type: 'input' },
        { label: this.$t('invoiceDrawer.taxRate'), value: 'taxRate', type: 'input' },
        { label: this.$t('invoiceDrawer.invoiceServiceProvider'), value: 'invoiceServiceProvider', type: 'input' },
        { label: this.$t('invoiceDrawer.authorizeEnterpriseCode'), value: 'authorizeEnterpriseCode', type: 'input' },
        { label: this.$t('invoiceDrawer.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', clearable: false },
        { label: this.$t('invoiceDrawer.remark'), value: 'remark', type: 'textarea' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        isEnable: [{ required: true, message: this.$t('invoiceDrawer.msg.isEnable'), trigger: 'blur' }],
        ownerId: [{ required: true, message: this.$t('invoiceDrawer.msg.ownerId'), trigger: 'blur' }],
        storeId: [{ required: true, message: this.$t('invoiceDrawer.msg.storeId'), trigger: 'blur' }],
        invoiceVersion: [{ required: true, message: this.$t('invoiceDrawer.msg.invoiceVersion'), trigger: 'blur' }]
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

    // 列表复选框,选中事件
    handleSelectionChange(event, data) {
      this.kaiPiaoList = data
    },

    // 发票版本change事件
    invoiceVersionSelect(data) {
      this.$set(this.diaFormInfo.data, 'openTicketQuota', this.invoiceVersionMap.get(data))
    }
  }
}
