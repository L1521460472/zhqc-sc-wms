import risize from '@/layout/Home/mixin/risizeTwoTable'
import notification from './notification'
export default {
  mixins: [risize, notification],
  data() {
    return {
      doubleBatchArr: [],
      asnNoForm: {},
      doubleCheckList: [], // 存放需要二次验收的集合
      openshouDoublepage: false, // 是否已经打开过二次验收页面
      showDoubleCheck: false, // 是否需要打开二次验收页面
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
        checkResult: 'PASS',
        qcQty: '',
        goodQty: '',
        badQty: '',
        badReason: ''
      },
      // 下拉选项列表
      listTypeInfo: {
      },
      // 主页面表格
      tableInfo1: {
        data: [],
        fieldList: null, // 表格列集合
        handle: null
      },
      tableInfo2: {
        data: [],
        fieldList: null, // 表格列集合
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
      // 二次验收弹窗
      dialogInfo: {
        title: '',
        width: '1250px',
        visible: false,
        type: '',
        closeBtn: { label: '', type: '', icon: '', event: 'closeTwo', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'closeTwo', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'saveQcPersonTwo', btLoading: false, show: false }]
      },
      // 二次验收弹窗表单
      diaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        isShowForm: false,
        labelWidth: '200px',
        dtTableInfo: {
          ref: null,
          data: [],
          fieldList: [],
          handle: null
        }
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
        this.diaFormInfo.ref.clearValidate()
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
        { label: this.$t('qcAccept.asnNoAndAsnSource'), value: 'asnNo', type: 'kinput', event: 'asnNoAndAsnSource' },
        { label: this.$t('qcAccept.skuNo'), value: 'skuCode', type: 'slot', event: '' },
        { label: this.$t('qcAccept.skuName'), value: 'skuName', type: 'input', disabled: true },
        { label: this.$t('qcAccept.tradeName'), value: 'tradeName', type: 'input', disabled: true },
        { label: this.$t('qcAccept.spec'), value: 'spec', type: 'input', disabled: true },
        { label: this.$t('qcAccept.mainUnit'), value: 'mainUnit', type: 'input', disabled: true },
        { label: this.$t('qcAccept.perQty'), value: 'perQty', type: 'input', disabled: true },
        { label: this.$t('qcAccept.drugForm'), value: 'drugForm', type: 'input', disabled: true },
        { label: this.$t('qcAccept.mfg'), value: 'mfg', type: 'input', disabled: true },
        { label: this.$t('qcAccept.originCountry'), value: 'originCountry', type: 'input', disabled: true },
        { label: this.$t('qcAccept.approvalNumber'), value: 'approvalNumber', type: 'input', disabled: true },
        { label: this.$t('qcAccept.brandName'), value: 'brandName', type: 'input', disabled: true },
        { label: this.$t('qcAccept.recPkgQty'), value: 'recPkgQty', type: 'input', disabled: true },
        { label: this.$t('qcAccept.scatteredNumber'), value: 'scatteredQty', type: 'input', disabled: true },
        { label: this.$t('qcAccept.recQty'), value: 'recQty', type: 'input', disabled: true },
        { label: this.$t('qcAccept.instoreOrderNo'), value: 'origNo', type: 'input', disabled: true },
        { label: this.$t('qcAccept.customerOrderNo'), value: 'cusOrderNo', type: 'input', disabled: true },
        { label: this.$t('qcAccept.supplierName'), value: 'supplierName', type: 'input', disabled: true },
        { label: this.$t('qcAccept.buyer'), value: 'buyer', type: 'input', disabled: true },
        { label: this.$t('qcAccept.asnTypeName'), value: 'asnTypeName', type: 'input', disabled: true },
        { label: this.$t('qcAccept.remark'), value: 'remark', type: 'input', disabled: true },
        { label: this.$t('qcAccept.batchNo'), value: 'batchNo', type: 'input', disabled: true }
      ]
    },
    // 主页面初始化数据
    initPageData() {
      // 初始化列表
      this.tableInfo1.fieldList = [
        { prop: 'asnNo', label: this.$t('qcAccept.asnNo'), minWidth: 120 },
        { prop: 'containerNo', label: this.$t('qcAccept.containerNo'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('qcAccept.skuCode'), minWidth: 120 },
        { prop: 'barcode', label: this.$t('qcAccept.barcode'), minWidth: 120 },
        { prop: 'skuName', label: this.$t('qcAccept.skuName'), minWidth: 100 },
        { prop: 'tradeName', label: this.$t('qcAccept.tradeName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('qcAccept.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('qcAccept.mainUnit'), minWidth: 100 },
        { prop: 'perQty', label: this.$t('qcAccept.perQty'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('qcAccept.drugForm'), minWidth: 100 },
        { prop: 'mfg', label: this.$t('qcAccept.mfg'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('qcAccept.originCountry'), minWidth: 100 },
        { prop: 'approvalNumber', label: this.$t('qcAccept.approvalNumber'), minWidth: 100 },
        { prop: 'commodityQty', label: this.$t('qcAccept.commodityQty'), minWidth: 100 },
        { prop: 'skuQualityName', label: this.$t('returnRecAccept.productStatus'), minWidth: 100 },
        { prop: 'recPkgQty', label: this.$t('returnRecAccept.recPkgQty'), minWidth: 100, isSumMark: true },
        { prop: 'scatteredQty', label: this.$t('returnRecAccept.scatteredNumber'), minWidth: 100, isSumMark: true },
        { prop: 'recQty', label: this.$t('returnRecAccept.recQty'), minWidth: 100, isSumMark: true },
        { prop: 'rejectQty', label: this.$t('returnRecAccept.rejectQty'), minWidth: 100 },
        { prop: 'rejectReason', label: this.$t('returnRecAccept.rejectReason'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('qcAccept.dt.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('returnRecAccept.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('returnRecAccept.productionDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('returnRecAccept.validUntil'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('returnRecAccept.instoreDate'), minWidth: 100 },
        { prop: 'sterileNo', label: this.$t('returnRecAccept.sterilizationBatch'), minWidth: 100 },
        { prop: 'sterilizationDate', label: this.$t('returnRecAccept.sterilizationDate'), minWidth: 100 }
      ]
      this.tableInfo2.fieldList = [
        { prop: 'skuCode', label: this.$t('qcAccept.skuCode'), minWidth: 120 },
        { prop: 'barcode', label: this.$t('qcAccept.barcode'), minWidth: 120 },
        { prop: 'skuName', label: this.$t('qcAccept.skuName'), minWidth: 100 },
        { prop: 'tradeName', label: this.$t('qcAccept.tradeName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('qcAccept.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('qcAccept.mainUnit'), minWidth: 100 },
        { prop: 'perQty', label: this.$t('qcAccept.perQty'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('qcAccept.drugForm'), minWidth: 100 },
        { prop: 'mfg', label: this.$t('qcAccept.mfg'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('qcAccept.originCountry'), minWidth: 100 },
        { prop: 'approvalNumber', label: this.$t('qcAccept.approvalNumber'), minWidth: 100 },
        { prop: 'shouldQcQty', label: this.$t('qcAccept.dt.shouldQcQty'), minWidth: 100, isSumMark: true },
        { prop: 'qcQty', label: this.$t('qcAccept.dt.qcQty'), minWidth: 100, isSumMark: true },
        { prop: 'badQty', label: this.$t('qcAccept.dt.badQty'), minWidth: 100, isSumMark: true },
        { prop: 'goodQty', label: this.$t('qcAccept.dt.goodQty'), minWidth: 100, isSumMark: true },
        { prop: 'checkResultName', label: this.$t('qcAccept.dt.checkResult'), minWidth: 100 },
        { prop: 'badReason', label: this.$t('qcAccept.dt.badReason'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('qcAccept.dt.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('returnRecAccept.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('returnRecAccept.productionDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('returnRecAccept.validUntil'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('returnRecAccept.instoreDate'), minWidth: 100 },
        { prop: 'sterileNo', label: this.$t('returnRecAccept.sterilizationBatch'), minWidth: 100 },
        { prop: 'sterilizationDate', label: this.$t('returnRecAccept.sterilizationDate'), minWidth: 100 },
        { prop: 'checkUserName', label: this.$t('qcAccept.dt.checkUserName'), minWidth: 100 },
        { prop: 'checkUserTwoName', label: this.$t('qcAccept.dt.secondCheckUserName'), minWidth: 100 },
        { label: '操作', value: 'status', width: 100, type: 'slot', fixed: 'right', align: 'left' }
      ]
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
