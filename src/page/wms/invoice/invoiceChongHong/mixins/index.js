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
          asnNo: null,
          soNo: null,
          asnType: null,
          asnStatus: null,
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
        asnTypeList: [],
        asnStatusList: []
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
        { label: this.$t('invoiceChongHong.asnNo'), value: 'asnNo', type: 'input' },
        { label: this.$t('invoiceChongHong.soNo'), value: 'soNo', type: 'input' },
        { label: this.$t('invoiceChongHong.asnType'), value: 'asnType', type: 'select', list: 'asnTypeList' },
        { label: this.$t('invoiceChongHong.asnStatus'), value: 'asnStatus', type: 'select', list: 'asnStatusList' },
        { label: this.$t('invoiceChongHong.ownerName'), value: 'ownerId', type: 'slot' },
        { label: this.$t('invoiceChongHong.customerName'), value: 'customerId', type: 'slot' },
        { label: this.$t('invoiceChongHong.storeName'), value: 'storeId', type: 'slot' },
        { label: this.$t('invoiceChongHong.carrierName'), value: 'partnerId', type: 'slot' },
        { label: this.$t('invoiceChongHong.receiver'), value: 'receiver', type: 'input' },
        { label: this.$t('invoiceChongHong.receiverTel'), value: 'receiverTel', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('invoiceChongHong.asnNo'), value: 'asnNo', type: 'input' },
        { label: this.$t('invoiceChongHong.soNo'), value: 'soNo', type: 'input' },
        { label: this.$t('invoiceChongHong.asnType'), value: 'asnType', type: 'select', list: 'asnTypeList' },
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
        { prop: 'asnNo', label: this.$t('invoiceChongHong.asnNo'), minWidth: 130 },
        { prop: 'asnTypeName', label: this.$t('invoiceChongHong.asnType'), minWidth: 100 },
        { prop: 'asnStatusName', label: this.$t('invoiceChongHong.asnStatus'), minWidth: 100 },
        { prop: 'supplierName', label: this.$t('invoiceChongHong.supplierName'), minWidth: 100 },
        { prop: 'soNo', label: this.$t('invoiceChongHong.soNo'), minWidth: 150 },
        { prop: 'cusOrderNo', label: this.$t('invoiceChongHong.cusOrderNo'), minWidth: 150 },
        { prop: 'soTypeName', label: this.$t('invoiceChongHong.soType'), minWidth: 100 },
        { prop: 'soStatusName', label: this.$t('invoiceChongHong.soStatus'), minWidth: 100 },
        { prop: 'customerName', label: this.$t('invoiceChongHong.customerName'), minWidth: 100 },
        { prop: 'storeName', label: this.$t('invoiceChongHong.storeName'), minWidth: 100 },
        { prop: 'carrierName', label: this.$t('invoiceChongHong.carrierName'), minWidth: 100 },
        { prop: 'invoiceTitle', label: this.$t('invoiceChongHong.invoiceTitle'), minWidth: 100 },
        { prop: 'receiver', label: this.$t('invoiceChongHong.receiver'), minWidth: 100 },
        { prop: 'receiverTel', label: this.$t('invoiceChongHong.receiverTel'), minWidth: 100 },
        { prop: 'addr', label: this.$t('invoiceChongHong.addr'), minWidth: 100 },
        { prop: 'kpStatus', label: this.$t('invoiceChongHong.kpStatus'), minWidth: 100 },
        { label: '操作', value: 'status', width: 150, type: 'slot', fixed: 'right' } // value: 'status' 对应页面上 自定义插槽的名字v-slot:col-status
      ]
    },

    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
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
    }

  }
}
