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
          waybillNo: null,
          ownerId: null,
          partnerStoreId: null,
          partnerId: null,
          skuCode: null,
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
        printStatus: [],
        reviewPlatformList: []
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
      printList: [], // 打印参数
      printIdList: [], // 打印参数id
      printNumber: 0, // 打印位置
      printLength: 0, // 打印总长度
      printStep: 30// 打印步长
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
        { label: this.$t('expressPrint.waveOrderNo'), value: 'waveOrderNo', type: 'input' },
        { label: this.$t('expressPrint.pickOrderNo'), value: 'pickOrderNo', type: 'input' },
        { label: this.$t('expressPrint.soNo'), value: 'soNo', type: 'input' },
        { label: this.$t('expressPrint.waybillNo'), value: 'waybillNo', type: 'input' },
        { label: this.$t('expressPrint.cusOrderNo'), value: 'cusOrderNo', type: 'slot' },
        { label: this.$t('expressPrint.checkPlatformId'), value: 'checkPlatformId', type: 'select', list: 'reviewPlatformList' },
        { label: this.$t('expressPrint.ownerName'), value: 'ownerId', type: 'slot' },
        { label: this.$t('expressPrint.storeName'), value: 'partnerStoreId', type: 'slot' },
        { label: this.$t('expressPrint.carrierName'), value: 'partnerId', type: 'slot' },
        { label: this.$t('expressPrint.skuCode'), value: 'skuCode', type: 'slot' },
        { label: this.$t('expressPrint.receiver'), value: 'receiver', type: 'input' },
        { label: this.$t('expressPrint.receiverTel'), value: 'receiverTel', type: 'input' },
        { label: this.$t('expressPrint.erpCreateTimeFrom'), value: 'erpCreateTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('expressPrint.erpCreateTimeTo'), value: 'erpCreateTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('expressPrint.waveOrderNo'), value: 'waveOrderNo', type: 'input' },
        { label: this.$t('expressPrint.pickOrderNo'), value: 'pickOrderNo', type: 'input' },
        { label: this.$t('expressPrint.soNo'), value: 'soNo', type: 'input' },
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
        { prop: 'soNo', label: this.$t('expressPrint.soNo'), minWidth: 140 },
        { prop: 'waveOrderNo', label: this.$t('expressPrint.waveOrderNo'), minWidth: 110 },
        { prop: 'pickOrderNo', label: this.$t('expressPrint.pickOrderNo'), minWidth: 110 },
        { prop: 'waybillNo', label: this.$t('expressPrint.waybillNo'), minWidth: 130 },
        { prop: 'carrierName', label: this.$t('expressPrint.carrierName'), minWidth: 70 },
        { prop: 'receiver', label: this.$t('expressPrint.receiver'), minWidth: 70 },
        { prop: 'receiverTel', label: this.$t('expressPrint.receiverTel'), minWidth: 100 },
        { prop: 'receiveProvince', label: this.$t('expressPrint.receiveProvince'), minWidth: 90 },
        { prop: 'receiveCity', label: this.$t('expressPrint.receiveCity'), minWidth: 90 },
        { prop: 'receiveCounty', label: this.$t('expressPrint.receiveCounty'), minWidth: 90 },
        { prop: 'addr', label: this.$t('expressPrint.addr'), minWidth: 200 },
        { prop: 'outOrderNo', label: this.$t('expressPrint.outOrderNo'), minWidth: 140 },
        { prop: 'cusOrderNo', label: this.$t('expressPrint.cusOrderNo'), minWidth: 100 },
        { prop: 'shopOrderNo', label: this.$t('expressPrint.shopOrderNo'), minWidth: 100 },
        { prop: 'storeName', label: this.$t('expressPrint.storeName'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('expressPrint.ownerName'), minWidth: 100 },
        { prop: 'logisticsOrderNo', label: this.$t('expressPrint.logisticsOrderNo'), minWidth: 100 },
        { prop: 'platformTypeName', label: this.$t('expressPrint.platformTypeName'), minWidth: 100 },
        { prop: 'erpCreateTime', label: this.$t('expressPrint.erpCreateTime'), minWidth: 100 },
        { prop: 'printStatus', label: this.$t('expressPrint.printStatus'), minWidth: 100 },
        { prop: 'printCount', label: this.$t('expressPrint.printCount'), minWidth: 100 },
        { prop: 'createName', label: this.$t('expressPrint.createName'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('expressPrint.createTime'), minWidth: 140 },
        { prop: 'updateName', label: this.$t('expressPrint.updateName'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('expressPrint.updateTime'), minWidth: 140 },
        { prop: 'orderCancelName', label: this.$t('expressPrint.orderCancelName'), minWidth: 100 }
      ]
    },
    initPrintDialogField() {
      this.diaFormInfo.data.num = 1
      this.diaFormInfo.fieldList = [
        { label: '面单数', value: 'num', type: 'number', disabled: false, require }
      ]
    },

    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        num: [{ required: true, message: '请填写面单数量', trigger: 'blur' }]
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
