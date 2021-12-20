import risizeTwoTable from './risizeTwoTable'
import notification from './notification'
export default {
  mixins: [risizeTwoTable, notification],
  data() {
    return {
      // 主页面的top表单
      topForm: {
        ref: null, // 对外提供的可操作表单的持有对象
        fieldList: null, // 配置的表单字段集合
        data: { // 表单绑定的数据Model
          id: null,
          reviewPlatform: null,
          soNo: null,
          boxNo: null,
          barcode: null,
          batchNo: null,
          reviewingNum: null,
          reviewPersonOne: null,
          reviewPersonTwo: null,
          skuKind: null,
          skuTotal: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '96px'// 默认表单字段label宽度
      },
      leftSoForm: {
        ref: null, // 对外提供的可操作表单的持有对象
        fieldList: null, // 配置的表单字段集合
        data: { // 表单绑定的数据Model
          ownerName: null,
          cusOrderNo: null,
          partnerStoreName: null,
          provinceName: null,
          cityName: null,
          areaName: null,
          addr: null,
          receiver: null,
          receiverTel: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '96px'// 默认表单字段label宽度
      },
      leftForm: {
        ref: null, // 对外提供的可操作表单的持有对象
        fieldList: null, // 配置的表单字段集合
        data: { // 表单绑定的数据Model
          ownerName: null,
          cusOrderNo: null,
          partnerStoreName: null,
          skuCode: null,
          skuName: null,
          tradeName: null,
          spec: null,
          mainUnit: null,
          perQty: null,
          mfgName: null,
          originCountry: null,
          approvalNumber: null,
          brandName: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '96px'// 默认表单字段label宽度
      },
      rightForm: {
        qty: '',
        isHasInvoiceName: '',
        boxNo: '',
        partnerStoreName: '',
        partnerName: '',
        reviewPersonOne: '',
        reviewPersonTwo: '',
        breedNum: '',
        totelGoodsNum: '',
        recMode: 'PC_MODE'
      },
      // 下拉选项列表
      listTypeInfo: {
        reviewPlatformList: [],
        reviewAbnormalReasonList: [],
        skuList: []
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
            // 删除按钮
            { label: this.$t('table.delete'), type: 'danger', icon: '', show: true, event: 'deleteReviewDtBox' }
          ]
        }
      },
      // 弹窗表单
      diaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        isShowForm: false,
        dtTableInfo: {
          ref: null,
          data: [],
          fieldList: [],
          handle: null
        }
      },
      // 复核异常表单
      diaFormInfoAbnormal: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}// 配置的表单字段校验规则集合
      },

      diaFormInfoCons: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        tableInfo: {
          ref: null,
          data: [],
          fieldList: [],
          handle: { // 表格自定义按钮
            fixed: 'right',
            label: this.$t('table.actions'), // 操作列名
            width: '100', // 默认操作按钮列宽度
            btList: [// 添加操作按钮
              // 默认删除按钮
              { label: this.$t('table.delete'), type: 'danger', icon: '', event: 'handleDeleteConsumable', show: true, disabled: false }// event值为notification.js中定义的方法名
            ]
          }
        }
      }
    }
  },

  methods: {
    // 主页面初始化数据
    initTopFormColumns() {
      this.leftSoForm.fieldList = [
        { label: this.$t('review.ownerName'), value: 'ownerName', type: 'input', disabled: true },
        { label: this.$t('review.cusOrderNo'), value: 'cusOrderNo', type: 'input', disabled: true },
        { label: this.$t('review.partnerStoreName'), value: 'partnerStoreName', type: 'input', disabled: true },
        { label: this.$t('review.provinceName'), value: 'provinceName', type: 'input', disabled: true },
        { label: this.$t('review.cityName'), value: 'cityName', type: 'input', disabled: true },
        { label: this.$t('review.areaName'), value: 'areaName', type: 'input', disabled: true },
        { label: this.$t('review.addr'), value: 'addr', type: 'input', disabled: true },
        { label: this.$t('review.receiver'), value: 'receiver', type: 'input', disabled: true },
        { label: this.$t('review.receiverTel'), value: 'receiverTel', type: 'input', disabled: true }
      ]
      this.leftForm.fieldList = [
        // { label: this.$t('review.ownerName'), value: "ownerName", type: "input", disabled: true },
        // { label: this.$t('review.cusOrderNo'), value: "cusOrderNo", type: "input", disabled: true },
        // { label: this.$t('review.partnerStoreName'), value: "partnerStoreName", type: "input", disabled: true },
        { label: this.$t('review.skuCode'), value: 'skuCode', type: 'input', disabled: true },
        { label: this.$t('review.skuName'), value: 'skuName', type: 'input', disabled: true },
        { label: this.$t('review.tradeName'), value: 'tradeName', type: 'input', disabled: true },
        { label: this.$t('review.spec'), value: 'spec', type: 'input', disabled: true },
        { label: this.$t('review.mainUnit'), value: 'mainUnit', type: 'input', disabled: true },
        { label: this.$t('review.perQty'), value: 'perQty', type: 'input', disabled: true },
        { label: this.$t('review.drugForm'), value: 'drugForm', type: 'input', disabled: true },
        { label: this.$t('review.mfg'), value: 'mfgName', type: 'input', disabled: true },
        { label: this.$t('review.originCountry'), value: 'originCountry', type: 'input', disabled: true },
        { label: this.$t('review.approvalNumber'), value: 'approvalNumber', type: 'input', disabled: true },
        { label: this.$t('review.brandName'), value: 'brandName', type: 'input', disabled: true }
      ]
      this.diaFormInfoCons.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'barcode', label: this.$t('review.barcode'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('review.skuCode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('review.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('review.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('review.mainUnit'), minWidth: 100 },
        { prop: 'categoryName', label: this.$t('review.categoryName'), minWidth: 100 },
        { prop: 'qty', label: this.$t('review.qty'), minWidth: 100 }
      ]
    },
    // 主页面初始化数据
    initPageData() {
      // 初始化列表
      this.tableInfo1.fieldList = [
        { prop: 'reviewStatusName', label: this.$t('review.reviewStatusName'), minWidth: 100 },
        { prop: 'waitReviewQty', label: this.$t('review.waitReviewQty'), minWidth: 80 },
        { prop: 'sowQty', label: this.$t('review.abnormal.pickQty'), minWidth: 80 },
        { prop: 'allotQty', label: this.$t('review.abnormal.allotQty'), minWidth: 80 },
        { prop: 'baseInvBatch.batchNo', label: this.$t('review.abnormal.batchNo'), minWidth: 100 },
        { prop: 'baseInvBatch.productionBatch', label: this.$t('review.abnormal.productionBatch'), minWidth: 100 },
        { prop: 'baseSku.skuCode', label: this.$t('review.abnormal.skuCode'), minWidth: 120 },
        { prop: 'baseSku.barcode', label: this.$t('review.abnormal.barcode'), minWidth: 120 },
        { prop: 'baseSku.skuName', label: this.$t('review.abnormal.skuName'), minWidth: 200 },
        { prop: 'baseSku.tradeName', label: this.$t('review.abnormal.tradeName'), minWidth: 100 },
        { prop: 'baseSku.spec', label: this.$t('review.abnormal.spec'), minWidth: 100 },
        { prop: 'baseSku.mainUnit', label: this.$t('review.abnormal.mainUnit'), minWidth: 100 },
        { prop: 'baseSku.perQty', label: this.$t('review.abnormal.perQty'), minWidth: 100 },
        { prop: 'baseSku.drugForm', label: this.$t('review.abnormal.drugForm'), minWidth: 100 },
        { prop: 'baseSku.mfgName', label: this.$t('review.abnormal.mfg'), minWidth: 100 },
        { prop: 'baseSku.originCountry', label: this.$t('review.abnormal.originCountry'), minWidth: 100 },
        { prop: 'baseSku.approvalNumber', label: this.$t('review.abnormal.approvalNumber'), minWidth: 100 },
        { prop: 'baseSku.brandName', label: this.$t('review.abnormal.brandName'), minWidth: 100 },
        { prop: 'baseInvBatch.productionDate', label: this.$t('review.abnormal.productionDate'), minWidth: 100 },
        { prop: 'baseInvBatch.validUntil', label: this.$t('review.abnormal.validUntil'), minWidth: 100 },
        { prop: 'baseInvBatch.instoreDate', label: this.$t('review.abnormal.instoreDate'), minWidth: 100 },
        { prop: 'baseInvBatch.sterileNo', label: this.$t('review.abnormal.sterilizationBatch'), minWidth: 100 },
        { prop: 'baseInvBatch.sterileInvaliDate', label: this.$t('review.abnormal.sterilizationDate'), minWidth: 100 }
      ]
      this.tableInfo2.fieldList = [
        { prop: 'boxNo', label: this.$t('review.abnormal.boxNo'), minWidth: 140 },
        { prop: 'reviewedQty', label: this.$t('review.reviewedQty'), minWidth: 100 },
        { prop: 'baseInvBatch.batchNo', label: this.$t('review.abnormal.batchNo'), minWidth: 100 },
        { prop: 'baseInvBatch.productionBatch', label: this.$t('review.abnormal.productionBatch'), minWidth: 100 },
        { prop: 'baseSku.skuCode', label: this.$t('review.abnormal.skuCode'), minWidth: 120 },
        { prop: 'baseSku.barcode', label: this.$t('review.abnormal.barcode'), minWidth: 120 },
        { prop: 'baseSku.skuName', label: this.$t('review.abnormal.skuName'), minWidth: 100 },
        { prop: 'baseSku.tradeName', label: this.$t('review.abnormal.tradeName'), minWidth: 100 },
        { prop: 'baseSku.spec', label: this.$t('review.abnormal.spec'), minWidth: 100 },
        { prop: 'baseSku.mainUnit', label: this.$t('review.abnormal.mainUnit'), minWidth: 100 },
        { prop: 'baseSku.perQty', label: this.$t('review.abnormal.perQty'), minWidth: 100 },
        { prop: 'baseSku.drugForm', label: this.$t('review.abnormal.drugForm'), minWidth: 100 },
        { prop: 'baseSku.mfgName', label: this.$t('review.abnormal.mfg'), minWidth: 100 },
        { prop: 'baseSku.originCountry', label: this.$t('review.abnormal.originCountry'), minWidth: 100 },
        { prop: 'baseSku.approvalNumber', label: this.$t('review.abnormal.approvalNumber'), minWidth: 100 },
        { prop: 'baseSku.brandName', label: this.$t('review.abnormal.brandName'), minWidth: 100 },
        { prop: 'baseInvBatch.productionDate', label: this.$t('review.abnormal.productionDate'), minWidth: 100 },
        { prop: 'baseInvBatch.validUntil', label: this.$t('review.abnormal.validUntil'), minWidth: 100 },
        { prop: 'baseInvBatch.instoreDate', label: this.$t('review.abnormal.instoreDate'), minWidth: 100 },
        { prop: 'baseInvBatch.sterileNo', label: this.$t('review.abnormal.sterilizationBatch'), minWidth: 100 },
        { prop: 'baseInvBatch.sterileInvaliDate', label: this.$t('review.abnormal.sterilizationDate'), minWidth: 100 },
        // { prop: "pickQty", label: this.$t('review.abnormal.pickQty'), minWidth: 100 },
        // { prop: "allotQty", label: this.$t('review.abnormal.allotQty'), minWidth: 100 },
        // { prop: "batchNo", label: this.$t('review.abnormal.batchNo'), minWidth: 100 },
        // { prop: "productionBatch", label: this.$t('review.abnormal.productionBatch'), minWidth: 100 },
        // { prop: "skuCode", label: this.$t('review.abnormal.skuCode'), minWidth: 120 },
        // { prop: "barcode", label: this.$t('review.abnormal.barcode'), minWidth: 120 },
        // { prop: "skuName", label: this.$t('review.abnormal.skuName'), minWidth: 100 },
        // { prop: "tradeName", label: this.$t('review.abnormal.tradeName'), minWidth: 100 },
        // { prop: "spec", label: this.$t('review.abnormal.spec'), minWidth: 100 },
        // { prop: "mainUnit", label: this.$t('review.abnormal.mainUnit'), minWidth: 100 },
        // { prop: "perQty", label: this.$t('review.abnormal.perQty'), minWidth: 100 },
        // { prop: "drugForm", label: this.$t('review.abnormal.drugForm'), minWidth: 100 },
        // { prop: "mfg", label: this.$t('review.abnormal.mfg'), minWidth: 100 },
        // { prop: "originCountry", label: this.$t('review.abnormal.originCountry'), minWidth: 100 },
        // { prop: "approvalNumber", label: this.$t('review.abnormal.approvalNumber'), minWidth: 100 },
        // { prop: "brandName", label: this.$t('review.abnormal.brandName'), minWidth: 100 },
        // { prop: "productionDate", label: this.$t('review.abnormal.productionDate'), minWidth: 100 },
        // { prop: "validUntil", label: this.$t('review.abnormal.validUntil'), minWidth: 100 },
        // { prop: "instoreDate", label: this.$t('review.abnormal.instoreDate'), minWidth: 100 },
        // { prop: "sterilizationBatch", label: this.$t('review.abnormal.sterilizationBatch'), minWidth: 100 },
        // { prop: "sterilizationDate", label: this.$t('review.abnormal.sterilizationDate'), minWidth: 100 },
        { label: '操作', value: 'status', width: 100, type: 'slot', fixed: 'right', align: 'left' }
      ]
    },
    // 初始化差异复核
    initDiaDiffColumns() {
      this.diaFormInfo.dtTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'boxNo', label: this.$t('review.boxNo'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('review.barcode'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('review.skuCode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('review.skuName'), minWidth: 150 },
        { prop: 'spec', label: this.$t('review.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('review.mainUnit'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('review.batchNo'), minWidth: 100 },
        { prop: 'allotQty', label: this.$t('review.allotQty'), minWidth: 100 },
        { prop: 'pickQty', label: this.$t('review.pickQty'), minWidth: 100 },
        { prop: 'reviewedQty', label: this.$t('review.inBoxQty'), minWidth: 100 },
        { prop: 'waitReviewQty', label: this.$t('review.diffReviewQty'), minWidth: 100 }
      ]
    },
    // 初始化双人复核界面
    initDiaDoubleReviewColumns() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('review.reviewPersonTwoUserNo'), value: 'reviewPersonTwoUserNo', type: 'input' },
        { label: this.$t('review.reviewPersonTwoUserPassword'), value: 'reviewPersonTwoUserPassword', type: 'password' }
      ]
      this.diaFormInfo.dtTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        // {prop:"boxNo", label:this.$t('review.boxNo'), minWidth:100},
        { prop: 'barcode', label: this.$t('review.barcode'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('review.skuCode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('review.skuName'), minWidth: 150 },
        { prop: 'spec', label: this.$t('review.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('review.mainUnit'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('review.batchNo'), minWidth: 100 },
        { prop: 'allotQty', label: this.$t('review.allotQty'), minWidth: 100 },
        { prop: 'pickQty', label: this.$t('review.pickQty'), minWidth: 100 },
        { prop: 'reviewedQty', label: this.$t('review.reviewedQty'), minWidth: 100 }
      ]
    },
    // 初始化复核异常单产品
    initDiaAbnormalOneColumns() {
      this.diaFormInfoAbnormal.fieldList = [
        { label: this.$t('review.abnormal.checkPlatformId'), value: 'checkPlatformId', type: 'select', list: 'reviewPlatformList', disabled: true },
        { label: this.$t('review.abnormal.soNo'), value: 'soNo', type: 'input', disabled: true },
        { label: this.$t('review.abnormal.transOrderNo'), value: 'transOrderNo', type: 'input', disabled: true },
        { label: this.$t('review.abnormal.boxNo'), value: 'boxNo', type: 'input', disabled: true },
        { label: this.$t('review.abnormal.skuCode'), value: 'skuCode', type: 'input', disabled: true },
        { label: this.$t('review.abnormal.barcode'), value: 'barcode', type: 'input', disabled: true },
        { label: this.$t('review.abnormal.skuName'), value: 'skuName', type: 'input', disabled: true },
        { label: this.$t('review.abnormal.spec'), value: 'spec', type: 'input', disabled: true },
        { label: this.$t('review.abnormal.mainUnit'), value: 'mainUnit', type: 'input', disabled: true },
        { label: this.$t('review.abnormal.allotQty'), value: 'allotQty', type: 'input', disabled: true },
        { label: this.$t('review.abnormal.pickQty'), value: 'pickQty', type: 'input', disabled: true },
        { label: this.$t('review.abnormal.reviewQty'), value: 'reviewQty', type: 'input', disabled: true },
        { label: this.$t('review.abnormal.abnormalReason'), value: 'abnormalReason', type: 'select', list: 'reviewAbnormalReasonList', disabled: true },
        { label: this.$t('review.abnormal.abnormalQty'), value: 'abnormalQty', type: 'input' },
        { label: this.$t('review.abnormal.remark'), value: 'remark', type: 'input' }
      ]
    },
    // 初始化复核异常多产品
    initDiaAbnormalMoreColumns() {
      this.diaFormInfoAbnormal.fieldList = [
        { label: this.$t('review.abnormal.checkPlatformId'), value: 'checkPlatformId', type: 'select', list: 'reviewPlatformList', disabled: true },
        { label: this.$t('review.abnormal.soNo'), value: 'soNo', type: 'input', disabled: true },
        { label: this.$t('review.abnormal.transOrderNo'), value: 'transOrderNo', type: 'input', disabled: true },
        { label: this.$t('review.abnormal.boxNo'), value: 'boxNo', type: 'input', disabled: true },
        { label: this.$t('review.abnormal.skuId'), value: 'skuId', type: 'slot' },
        { label: this.$t('review.abnormal.barcode'), value: 'barcode', type: 'input', disabled: true },
        { label: this.$t('review.abnormal.skuName'), value: 'skuName', type: 'input', disabled: true },
        { label: this.$t('review.abnormal.spec'), value: 'spec', type: 'input', disabled: true },
        { label: this.$t('review.abnormal.mainUnit'), value: 'mainUnit', type: 'input', disabled: true },
        { label: this.$t('review.abnormal.allotQty'), value: 'allotQty', type: 'input', disabled: true },
        { label: this.$t('review.abnormal.pickQty'), value: 'pickQty', type: 'input', disabled: true },
        { label: this.$t('review.abnormal.reviewQty'), value: 'reviewQty', type: 'input', disabled: true },
        { label: this.$t('review.abnormal.abnormalReason'), value: 'abnormalReason', type: 'select', list: 'reviewAbnormalReasonList', disabled: true },
        { label: this.$t('review.abnormal.abnormalQty'), value: 'abnormalQty', type: 'input' },
        { label: this.$t('review.abnormal.remark'), value: 'remark', type: 'input' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        reviewPersonTwoUserNo: [{ required: true, message: this.$t('review.msg.reviewPersonTwoUserNo'), trigger: 'blur' }],
        reviewPersonTwoUserPassword: [{ required: true, message: this.$t('review.msg.reviewPersonTwoUserPassword'), trigger: 'blur' }]
      }
      this.diaFormInfoAbnormal.rules = {
        skuId: [{ required: true, message: this.$t('review.msg.abnormal.skuId'), trigger: 'blur' }],
        abnormalQty: [{ required: true, message: this.$t('review.msg.abnormal.abnormalQty'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.reqVo = {
        id: null,
        reviewPlatform: null,
        soNo: null,
        skuQty: null,
        totalQty: null,
        barcode: null,
        skuName: null,
        skuNum: null,
        reviewedQty: null,
        reviewingNum: null,
        reviewWtKg: null,
        boxNo: null,
        ticket: null,
        reviewPersonOne: null,
        reviewPersonTwo: null,
        partnerName: null,
        partnerStoreName: null

      }
      this.topForm.data = {
        id: null,
        reviewPlatform: null,
        soNo: null,
        boxNo: null,
        barcode: null,
        batchNo: null,
        reviewingNum: null,
        reviewPersonOne: null,
        reviewPersonTwo: null,
        skuKind: null,
        skuTotal: null
      }
      this.leftForm.data = {
        ownerName: null,
        cusOrderNo: null,
        partnerStoreName: null,
        skuCode: null,
        skuName: null,
        tradeName: null,
        spec: null,
        mainUnit: null,
        perQty: null,
        mfgName: null,
        originCountry: null,
        approvalNumber: null,
        brandName: null
      }
    },
    resetDiaData() {
      this.diaFormInfo.data = {
        reviewPersonTwoUserNo: null,
        reviewPersonTwoUserPassword: null
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
