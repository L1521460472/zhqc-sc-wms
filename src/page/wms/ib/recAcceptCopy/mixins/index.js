import risize from '@/layout/Home/mixin/RisizeTable'
import notification from './notification'

export default {
  mixins: [risize, notification],
  data() {
    return {
      doubleBatchArr: [],
      asnNoForm: {},
      // 主页面的top表单
      topForm: {
        ref: null, // 对外提供的可操作表单的持有对象
        fieldList: null, // 配置的表单字段集合
        data: { // 表单绑定的数据Model
          dispatchOrder: null,
          status: null,
          wasteProductionId: null,
          transportationId: null,
          dispositionId: null,
          solidWasteId: null,
          outPlanOrder: null,
          dispatchCarOrder: null,
          deliverTimeBegin: null,
          deliverTimeEnd: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '96px'// 默认表单字段label宽度
      },
      rightForm: {
        skuQuality: 'GOOD_PRODUCT',
        recPkgQty: '',
        scatteredQty: '',
        recQty: '',
        rejectQty: '',
        rejectReason: '',
        recMode: 'PC_MODE',
        purchasePrice: '',
        sumAmountPurchasePriceY: ''
      },
      // 下拉选项列表
      listTypeInfo: {
        deliveryMethodList: [],
        transportList: [],
        arriveTypeList: [],
        skuQualityList: []
      },
      // 主页面表格
      tableInfo1: {
        ref: null,
        data: [],
        fieldList: null, // 表格列集合
        handle: null,
        height: 300,
        showSummary: true
      },
      tableInfo2: {
        ref: null,
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
          {
            label: this.$t('table.confirm'),
            type: 'primary',
            icon: '',
            event: 'confirm',
            btLoading: false,
            show: true
          },
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true }
        ]
      },
      dialogInfoDrugSupervisionCode: {
        title: '',
        width: '400px',
        visible: false,
        type: '',
        btList: [],
        closeBtn: { label: '', type: '', icon: '', event: 'closeGatherDrugSupervisionCode', show: true }
      },

      // 批次属性 动态字段
      diaFormInfoAttr: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        labelWidth: '120px'
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
    initTopForm() { // 展开收起表单
      this.topForm.fieldList = [
        {
          label: this.$t('recAcceptCopy.asnNoAndAsnSource') + ':',
          value: 'orderNo',
          type: 'slot',
          event: 'asnNoAndAsnSource'
        },
        { label: this.$t('recAcceptCopy.containerNo') + ':', value: 'containerNo', type: 'slot', event: '' },
        { label: this.$t('recAcceptCopy.skuCode') + ':', value: 'skuCode', type: 'slot', event: '' },
        { label: this.$t('recAcceptCopy.skuName') + ':', value: 'skuNameItem', type: 'slot', event: '' },
        { label: this.$t('recAcceptCopy.asnNo') + ':', value: 'asnNo', type: 'input', disabled: true },
        { label: this.$t('recAcceptCopy.barcode') + ':', value: 'barcode', type: 'input', disabled: true },
        { label: this.$t('recAcceptCopy.skuName') + ':', value: 'skuName', type: 'input', disabled: true },
        { label: this.$t('recAcceptCopy.tradeName') + ':', value: 'tradeName', type: 'input', disabled: true },
        {
          label: this.$t('recAcceptCopy.supplierName') + ':',
          value: 'supplierName',
          type: 'input',
          disabled: true
        },
        { label: this.$t('recAcceptCopy.spec') + ':', value: 'spec', type: 'input', disabled: true },
        { label: this.$t('recAcceptCopy.mainUnit') + ':', value: 'mainUnit', type: 'input', disabled: true },
        { label: this.$t('recAcceptCopy.perQty') + ':', value: 'perQty', type: 'input', disabled: true },
        { label: this.$t('recAcceptCopy.drugForm') + ':', value: 'drugForm', type: 'input', disabled: true },
        { label: this.$t('recAcceptCopy.mfg') + ':', value: 'mfgName', type: 'input', disabled: true },
        {
          label: this.$t('recAcceptCopy.originCountry') + ':',
          value: 'originCountry',
          type: 'input',
          disabled: true
        },
        {
          label: this.$t('recAcceptCopy.approveNo') + ':',
          value: 'approveNo',
          type: 'input',
          disabled: true
        },
        { label: this.$t('recAcceptCopy.brandName') + ':', value: 'brandName', type: 'input', disabled: true },
        {
          label: this.$t('recAcceptCopy.tempControlName') + ':',
          value: 'tempControlName',
          type: 'input',
          disabled: true
        },
        {
          label: this.$t('recAcceptCopy.commodityQty') + ':',
          value: 'commodityQty',
          type: 'input',
          disabled: true
        },
        { label: this.$t('recAcceptCopy.amount') + ':', value: 'amountY', type: 'input', disabled: true },
        /*
                        {label: this.$t('recAcceptCopy.amountY') + ':', value: "sumAmountY", type: "input", disabled: true},
        */
        {
          label: this.$t('recAcceptCopy.orderType') + ':',
          value: 'orderTypeName',
          type: 'input',
          disabled: true
        },
        { label: this.$t('recAcceptCopy.origSys') + ':', value: 'asnSourceName', type: 'input', disabled: true },
        { label: this.$t('recAcceptCopy.inOrderNo') + ':', value: 'inOrderNo', type: 'input', disabled: true },
        { label: this.$t('recAcceptCopy.cusOrderNo') + ':', value: 'cusOrderNo', type: 'input', disabled: true },
        // {
        //     label: this.$t('recAcceptCopy.orderType') + ':',
        //     value: "orderTypeName",
        //     type: "input",
        //     disabled: true
        // },
        { label: this.$t('recAcceptCopy.buyer') + ':', value: 'buyer', type: 'input', disabled: true },
        { label: this.$t('recAcceptCopy.remark') + ':', value: 'remark', type: 'input', disabled: true }
      ]
    },
    // 主页面初始化数据
    initPageData() {
      // 初始化列表
      this.tableInfo1.fieldList = [
        { prop: 'asnNo', label: this.$t('recAcceptCopy.asnNo'), minWidth: 120 },
        { prop: 'skuCode', label: this.$t('recAcceptCopy.skuCode'), minWidth: 120 },
        { prop: 'barcode', label: this.$t('recAcceptCopy.barcode'), minWidth: 120 },
        { prop: 'skuName', label: this.$t('recAcceptCopy.skuName'), minWidth: 200 },
        { prop: 'spec', label: this.$t('recAcceptCopy.spec'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('recAcceptCopy.drugForm'), minWidth: 100 },
        { prop: 'commodityQty', label: this.$t('recAcceptCopy.commodityQty'), minWidth: 100, isSumMark: true },
        { prop: 'recQty', label: this.$t('recAcceptCopy.recQty'), minWidth: 100, isSumMark: true },
        { prop: 'cusOrderNo', label: this.$t('recAcceptCopy.cusOrderNo'), minWidth: 120 },
        { prop: 'inOrderNo', label: this.$t('recAcceptCopy.inOrderNo'), minWidth: 140 },
        { prop: 'orderDtStatusName', label: this.$t('recAcceptCopy.orderDtStatus'), minWidth: 100 },
        { prop: 'supplierName', label: this.$t('recAcceptCopy.supplierName'), minWidth: 100 },
        /* {prop: "buyer", label: this.$t('recAcceptCopy.buyer'), minWidth: 100},
      {prop: "orderTypeName", label: this.$t('recAcceptCopy.orderType'), minWidth: 100},
       {prop: "asnSourceName", label: this.$t('recAcceptCopy.origSys'), minWidth: 100},
       {prop: "remark", label: this.$t('recAcceptCopy.remark'), minWidth: 100},*/
        { prop: 'tradeName', label: this.$t('recAcceptCopy.tradeName'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('recAcceptCopy.mainUnit'), minWidth: 100 },
        { prop: 'perQty', label: this.$t('recAcceptCopy.perQty'), minWidth: 100 },
        { prop: 'mfgName', label: this.$t('recAcceptCopy.mfg'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('recAcceptCopy.originCountry'), minWidth: 100 },
        { prop: 'approveNo', label: this.$t('recAcceptCopy.approveNo'), minWidth: 100 },
        { prop: 'brandName', label: this.$t('recAcceptCopy.brandName'), minWidth: 100 },
        { prop: 'tempControlName', label: this.$t('recAcceptCopy.tempControlName'), minWidth: 100 },
        { prop: 'amountY', label: this.$t('recAcceptCopy.amount'), minWidth: 100 },
        { prop: 'sumAmountY', label: this.$t('recAcceptCopy.amountY'), minWidth: 100 }
      ]
      this.tableInfo2.fieldList = [
        { prop: 'containerNo', label: this.$t('recAcceptCopy.containerNo'), minWidth: 100 },
        { prop: 'recLotCode', label: this.$t('recAcceptCopy.location'), minWidth: 100 },
        { prop: 'commodityQty', label: this.$t('recAcceptCopy.commodityQty'), minWidth: 100 },
        { prop: 'recPkgQty', label: this.$t('recAcceptCopy.recPkgQty'), minWidth: 100, isSumMark: true },
        {
          prop: 'scatteredQty',
          label: this.$t('recAcceptCopy.scatteredNumber'),
          minWidth: 100,
          isSumMark: true
        },
        { prop: 'recQty', label: this.$t('recAcceptCopy.recQty'), minWidth: 100, isSumMark: true },
        { prop: 'rejectQty', label: this.$t('recAcceptCopy.rejectQty'), minWidth: 100 },
        { prop: 'rejectReason', label: this.$t('recAcceptCopy.rejectReason'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('recAcceptCopy.skuCode'), minWidth: 120 },
        { prop: 'barcode', label: this.$t('recAcceptCopy.barcode'), minWidth: 120 },
        { prop: 'skuName', label: this.$t('recAcceptCopy.skuName'), minWidth: 200 },
        { prop: 'tradeName', label: this.$t('recAcceptCopy.tradeName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('recAcceptCopy.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('recAcceptCopy.mainUnit'), minWidth: 100 },
        { prop: 'perQty', label: this.$t('recAcceptCopy.perQty'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('recAcceptCopy.drugForm'), minWidth: 100 },
        { prop: 'mfgName', label: this.$t('recAcceptCopy.mfg'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('recAcceptCopy.originCountry'), minWidth: 100 },
        { prop: 'approveNo', label: this.$t('recAcceptCopy.approveNo'), minWidth: 100 },
        { prop: 'skuQualityName', label: this.$t('recAcceptCopy.productStatus'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('recAcceptCopy.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('recAcceptCopy.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('recAcceptCopy.productionDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('recAcceptCopy.validUntil'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('recAcceptCopy.instoreDate'), minWidth: 100 },
        { prop: 'sterileNo', label: this.$t('recAcceptCopy.sterilizationBatch'), minWidth: 100 },
        { prop: 'sterilizationDate', label: this.$t('recAcceptCopy.sterilizationDate'), minWidth: 100 },
        { label: '操作', value: 'status', width: 100, type: 'slot', fixed: 'right', align: 'left' }
      ]
    },
    // 商品包装信息弹窗表单字段
    goodsPackageFormInfo() {
      // 初始化新增明细表单
      this.dialogFormInfo.fieldList = [
        { label: this.$t('returnRecAccept.bigPackageNum'), value: 'perQty', type: 'input' },
        { label: this.$t('returnRecAccept.middlePackageNum'), value: 'midPackQty', type: 'input' },
        { label: this.$t('returnRecAccept.length'), value: 'lengthCM', type: 'input' },
        { label: this.$t('returnRecAccept.width'), value: 'widthCM', type: 'input' },
        { label: this.$t('returnRecAccept.height'), value: 'heightCM', type: 'input' },
        { label: this.$t('returnRecAccept.volM'), value: 'volM', type: 'input' },
        { label: this.$t('returnRecAccept.grossWeightKg'), value: 'grossWeightKg', type: 'input' },
        { label: this.$t('returnRecAccept.tareWeightKg'), value: 'tareWeightKg', type: 'input' },
        { label: this.$t('returnRecAccept.netWeightKg'), value: 'netWeightKg', type: 'input' }
      ]
    },
    // 冷链信息弹窗表单字段
    coldChainFormInfo() {
      // 初始化新增明细表单
      this.dialogFormInfo.fieldList = [
        {
          label: this.$t('returnRecAccept.departureTime'),
          value: 'shipTime',
          type: 'date',
          dateType: 'datetime',
          format: 'yyyy-MM-dd HH:mm:ss',
          valueFormat: 'yyyy-MM-dd HH:mm:ss'
        },
        {
          label: this.$t('returnRecAccept.arrivalTime'),
          value: 'arriveTime',
          type: 'date',
          dateType: 'datetime',
          format: 'yyyy-MM-dd HH:mm:ss',
          valueFormat: 'yyyy-MM-dd HH:mm:ss'
        },
        {
          label: this.$t('returnRecAccept.deliveryMethod'),
          value: 'arriveType',
          type: 'select',
          list: 'deliveryMethodList'
        },
        { label: this.$t('returnRecAccept.transport'), value: 'shipTool', type: 'select', list: 'transportList' },
        { label: this.$t('returnRecAccept.startingTemperature'), value: 'shipTemp', type: 'input' },
        { label: this.$t('returnRecAccept.reachingTemperature'), value: 'arriveTemp', type: 'input' },
        { label: this.$t('returnRecAccept.carrier'), value: 'carrierName', type: 'input' },
        { label: this.$t('returnRecAccept.placeShipment'), value: 'shipAddr', type: 'input' },
        { label: this.$t('returnRecAccept.plateNumber'), value: 'carMark', type: 'input' }
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
        arriveType: [{
          required: true,
          message: this.$t('returnRecAccept.msg.deliveryMethod'),
          trigger: 'change'
        }],
        shipTool: [{ required: true, message: this.$t('returnRecAccept.msg.transport'), trigger: 'change' }],
        shipTemp: [{
          required: true,
          message: this.$t('returnRecAccept.msg.startingTemperature'),
          trigger: 'blur'
        }],
        arriveTemp: [{
          required: true,
          message: this.$t('returnRecAccept.msg.reachingTemperature'),
          trigger: 'blur'
        }],
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
