import risize from '@/layout/Home/mixin/RisizeTable'
import notification from './notification'

export default {
  mixins: [risize, notification],
  data() {
    return {
      doubleBatchArr: [],
      recommendedLocationList: [],
      asnNoForm: {},
      // 主页面的top表单
      topForm: {
        ref: null, // 对外提供的可操作表单的持有对象
        fieldList: null, // 配置的表单字段集合
        data: { // 表单绑定的数据Model
          orderNo: null,
          shopCode: null,
          owerId: null,
          orderType: null,
          cusOrderNo: null,
          returnCourierNum: null,
          supplierName: null,
          shipper: null,
          consignee: null,
          remark: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '96px'// 默认表单字段label宽度
      },
      rightForm: {
        qcDtReq: {
          qcId: '',
          qcQty: '',
          recQty: '',
          qcNo: '',
          goodQty: '',
          checkResult: '',
          badQty: '',
          badReason: ''
        },
        qualifiedRate: '',
        skuQuality: 'GOOD_PRODUCT',
        recPkgQty: '',
        scatteredQty: '',
        recQty: '',
        adverseCauses: '',
        badReason: '',
        rejectQty: '',
        rejectReason: '',
        productionBatch: '',
        productionDate: '',
        validUntil: '',
        paLotCode: '',
        recMode: 'PC_MODE'
      },
      // 下拉选项列表
      listTypeInfo: {
        deliveryMethodList: [],
        transportList: [],
        skuQualityList: []
      },
      // 主页面表格
      tableInfo1: {
        data: [],
        fieldList: null, // 表格列集合
        handle: null,
        height: 300,
        showSummary: true
      },
      tableInfo2: {
        data: [],
        fieldList: null, // 表格列集合
        height: 300,
        showSummary: true,
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '100', // 默认操作按钮列宽度
          btList: [// 添加操作按钮
            // 默认查看按钮
            { label: this.$t('table.delete'), type: 'danger', icon: '', show: true, event: 'deleteData' }
          ]
        }
      },
      // 弹窗表单
      dialogFormInfo: {
        labelWidth: '110px',
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}// 配置的表单字段校验规则集合
      },
      dialogInfo: {
        title: '',
        width: '400px',
        visible: false,
        type: '',
        btList: [
          { label: this.$t('table.confirm'), type: 'primary', icon: '', event: 'confirm', btLoading: false, show: true },
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true }
        ]
      },
      // 批次属性 动态字段
      diaFormInfoAttr: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        labelWidth: '120px'
      },
      upload: {
        uploadUrl: process.env.VUE_APP_BASE_URL + 'fileMgr/fileManager/upload2Path',
        disabled: false,
        accept: [{ type: 'img', limit: 6 }],
        pictureList: []
      }
    }
  },
  watch: {
    'dialogInfo.visible'(val) {
      if (!val) {
        this.dialogFormInfo.ref.clearValidate()
      }
    }
  },
  mounted() {
    this.initTopForm()// 初始化表单
    this.initPageData()// 初始化查询界面配置数据
  },
  methods: {
    initTopForm() {
      this.topForm.fieldList = [
        {
          label: this.$t('quickReceipt.asnNoAndAsnSource') + ':',
          value: 'orderNo',
          type: 'slot',
          event: 'asnNoAndAsnSource'
        },
        { label: this.$t('quickReceipt.skuCode') + ':', value: 'skuCode', type: 'slot', event: '' },
        { label: this.$t('quickReceipt.owner') + ':', value: 'owerName', type: 'input', disabled: true },
        { label: this.$t('quickReceipt.orderType') + ':', value: 'orderTypeName', type: 'input', disabled: true },
        { label: this.$t('quickReceipt.cusOrderNo') + ':', value: 'cusOrderNo', type: 'input', disabled: true },
        { label: this.$t('quickReceipt.deliveryNo') + ':', value: 'returnCourierNum', type: 'input', disabled: true },
        { label: this.$t('quickReceipt.supplierName') + ':', value: 'supplierName', type: 'input', disabled: true },
        { label: this.$t('quickReceipt.shipper') + ':', value: 'shipper', type: 'input', disabled: true },
        { label: this.$t('quickReceipt.salesStorehouse') + ':', value: 'consignee', type: 'input', disabled: true },
        { label: this.$t('quickReceipt.remark') + ':', value: 'remark', type: 'input', disabled: true }
      ]
    },
    // 主页面初始化数据
    initPageData() {
      // 初始化列表
      this.tableInfo1.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'orderDtStatusName', label: this.$t('quickReceipt.status'), minWidth: 100 },
        { prop: 'waitRecQty', label: this.$t('quickReceipt.notReceivingNumber'), minWidth: 100, isSumMark: true },
        { prop: 'recQty', label: this.$t('quickReceipt.ReceivingNumber'), minWidth: 100, isSumMark: true },
        { prop: 'skuCode', label: this.$t('quickReceipt.skuCode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('quickReceipt.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('quickReceipt.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('quickReceipt.mainUnit'), minWidth: 100 },
        // { prop: 'instoreDate', label: this.$t('quickReceipt.instoreDate'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('quickReceipt.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('quickReceipt.productionDate'), minWidth: 140 },
        { prop: 'validityDateEnd', label: this.$t('quickReceipt.validUntil'), minWidth: 140 },
        { prop: 'validityDateDay', label: this.$t('quickReceipt.effective'), minWidth: 100 }
      ]
      this.tableInfo2.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'asnId', label: this.$t('quickReceipt.location'), minWidth: 100 },
        { prop: 'recQty', label: this.$t('quickReceipt.recQty'), minWidth: 100, isSumMark: true },
        { prop: 'skuCode', label: this.$t('quickReceipt.skuCode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('quickReceipt.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('quickReceipt.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('quickReceipt.mainUnit'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('quickReceipt.instoreDate'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('quickReceipt.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('quickReceipt.productionDate'), minWidth: 140 },
        { prop: 'validityDateEnd', label: this.$t('quickReceipt.validUntil'), minWidth: 140 },
        { prop: 'validityDateDay', label: this.$t('quickReceipt.effective'), minWidth: 100 }
      ]
    },
    // 商品包装信息弹窗表单校验规则的初始化方法
    goodsPackageFormRules() {
      this.dialogFormInfo.rules = {
        perQty: [{ required: true, message: this.$t('returnRecAccept.msg.bigPackageNum'), trigger: 'blur' }]
      }
    },
    // 冷链信息弹窗表单校验规则的初始化方法
    coldChainFormRules() {
      this.dialogFormInfo.rules = {
        shipTime: [{ required: true, message: this.$t('returnRecAccept.msg.departureTime'), trigger: 'change' }],
        arrivalTime: [{ required: true, message: this.$t('returnRecAccept.msg.arrivalTime'), trigger: 'change' }],
        arriveType: [{ required: true, message: this.$t('returnRecAccept.msg.deliveryMethod'), trigger: 'change' }],
        shipTool: [{ required: true, message: this.$t('returnRecAccept.msg.transport'), trigger: 'change' }],
        shipTemp: [{ required: true, message: this.$t('returnRecAccept.msg.startingTemperature'), trigger: 'blur' }],
        arriveTemp: [{ required: true, message: this.$t('returnRecAccept.msg.reachingTemperature'), trigger: 'blur' }],
        carrierName: [{ required: false, message: this.$t('returnRecAccept.msg.carrier'), trigger: 'blur' }],
        shipAddr: [{ required: false, message: this.$t('returnRecAccept.msg.placeShipment'), trigger: 'blur' }],
        carMark: [{ required: false, message: this.$t('returnRecAccept.msg.plateNumber'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        dispatchPlanName: null
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
