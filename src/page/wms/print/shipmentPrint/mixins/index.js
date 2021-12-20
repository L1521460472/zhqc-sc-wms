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
          waveOrderNo: null,
          pickOrderNo: null,
          soNo: null,
          outOrderNo: null,
          shopOrderNo: null,
          ownerId: null,
          partnerStoreId: null,
          partnerId: null,
          skuCode: null,
          skuId: null,
          barcode: null,
          receiver: null,
          receiverTel: null,
          erpCreateTimeFrom: null,
          erpCreateTimeTo: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        printStatusList: [],
        pickTypeList: []
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
        rules: {}// 配置的表单字段校验规则集合
      },
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
        { label: this.$t('shipmentPrint.waveOrderNo'), value: 'waveOrderNo', type: 'input' },
        { label: this.$t('shipmentPrint.pickOrderNo'), value: 'pickOrderNo', type: 'input' },
        { label: this.$t('shipmentPrint.soNo'), value: 'soNo', type: 'input' },
        { label: this.$t('shipmentPrint.outOrderNo'), value: 'outOrderNo', type: 'input' },
        { label: this.$t('shipmentPrint.shopOrderNo'), value: 'shopOrderNo', type: 'input' },
        { label: this.$t('shipmentPrint.ownerName'), value: 'ownerId', type: 'slot' },
        { label: this.$t('shipmentPrint.storeName'), value: 'partnerStoreId', type: 'slot' },
        { label: this.$t('shipmentPrint.carrierName'), value: 'partnerId', type: 'slot' },
        { label: this.$t('shipmentPrint.skuCode'), value: 'skuCode', type: 'slot' },
        { label: this.$t('shipmentPrint.receiver'), value: 'receiver', type: 'input' },
        { label: this.$t('shipmentPrint.receiverTel'), value: 'receiverTel', type: 'input' },
        { label: this.$t('shipmentPrint.erpCreateTimeFrom'), value: 'erpCreateTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('shipmentPrint.erpCreateTimeTo'), value: 'erpCreateTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('shipmentPrint.waveOrderNo'), value: 'waveOrderNo', type: 'input' },
        { label: this.$t('shipmentPrint.pickOrderNo'), value: 'pickOrderNo', type: 'input' },
        { label: this.$t('shipmentPrint.soNo'), value: 'soNo', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
      this.topForm.data.ownerId = null
      this.topForm.data.skuCode = null
      this.topForm.data.partnerId = null
      this.topForm.data.partnerStoreId = null
    },

    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'selection', width: 50 }, // 序列
        { prop: 'soNo', label: this.$t('shipmentPrint.soNo'), minWidth: 140 },
        { prop: 'waveOrderNo', label: this.$t('shipmentPrint.waveOrderNo'), minWidth: 140 },
        { prop: 'pickOrderNo', label: this.$t('shipmentPrint.pickOrderNo'), minWidth: 140 },
        { prop: 'outOrderNo', label: this.$t('shipmentPrint.outOrderNo'), minWidth: 140 },
        { prop: 'storeName', label: this.$t('shipmentPrint.storeName'), minWidth: 100 },
        { prop: 'carrierName', label: this.$t('shipmentPrint.carrierName'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('shipmentPrint.ownerName'), minWidth: 100 },
        { prop: 'shopOrderNo', label: this.$t('shipmentPrint.shopOrderNo'), minWidth: 100 },
        { prop: 'cusOrderNo', label: this.$t('shipmentPrint.cusOrderNo'), minWidth: 100 },
        { prop: 'sowLotCode', label: this.$t('shipmentPrint.sowLotCode'), minWidth: 100 },
        { prop: 'receiver', label: this.$t('shipmentPrint.receiver'), minWidth: 100 },
        { prop: 'receiverTel', label: this.$t('shipmentPrint.receiverTel'), minWidth: 100 },
        { prop: 'erpCreateTime', label: this.$t('shipmentPrint.erpCreateTime'), minWidth: 120 },
        { prop: 'printStatus', label: this.$t('shipmentPrint.printStatus'), minWidth: 100 },
        { prop: 'printCount', label: this.$t('shipmentPrint.printCount'), minWidth: 100 },
        { prop: 'soStatusName', label: this.$t('shipmentPrint.soStatusName'), minWidth: 100 }
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
    },

    // 列表复选框,选中事件
    handleSelectionChange(event, data) {
      this.printList = data
    }

  }
}
