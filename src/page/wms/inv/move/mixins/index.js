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
          moveLotOrderNo: null,
          origin: null,
          moveLotOrderStatus: null,
          ownerId: null,
          creator: null,
          moveTimeFrom: null,
          moveTimeTo: null,
          fmZoneId: null,
          fmLotId: null,
          toZoneId: null,
          toLotId: null,
          fmLotCode: null,
          toLotCode: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        moveLotOrderOriginList: [],
        moveLotOrderStatusList: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: null
      },
      // 弹窗表单
      diaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {
          dtList: []
        }, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        subTableInfo: {
          topBtn: { label: '增加产品明细', show: true, type: 'primary', disabled: false, loading: false, event: 'openDiaInv' },
          ref: null,
          // data: [],
          fieldList: [],
          handle: { // 表格自定义按钮
            fixed: 'right',
            label: this.$t('table.actions'), // 操作列名
            width: '100', // 默认操作按钮列宽度
            btList: [// 添加操作按钮
              // 默认删除按钮
              {
                label: this.$t('table.delete'),
                type: 'danger',
                icon: '',
                event: 'deleteDt',
                show: true,
                disabled: false
              }// event值为notification.js中定义的方法名
            ]
          }
        }
      },

      // 弹窗 在库产品参照
      dialogInfoInv: {
        title: '',
        visible: false,
        type: '',
        closeBtn: { label: '', type: '', icon: '', event: 'closeInStockPro', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'closeInStockPro', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', btLoading: false, show: false }],

        // 查询表单
        topFormInv: {
          ref: null, // 对外提供的可操作表单的持有对象
          fieldList: null, // 配置的表单字段集合
          data: {
            fmZoneId: null,
            fmLotId: null,
            skuId: null,
            ownerId: null
          },
          rules: {}, // 配置表单字段的校验规则集合
          labelWidth: '110px'// 默认表单字段label宽度
        },

        // 在库重点养护产品参照列表
        tableInfoInv: {
          fieldList: null, // 表格列集合
          handle: { // 表格自定义按钮
            width: '0', // 默认操作按钮列宽度
            btList: []
          }
        }
      },

      tempInStockProList: [], // 临时存放在选中在库产品对象集合
      inStockProList: [], // 存放选中在库产品对象集合
      distinctList: [], // 用于去重
      tempDistinctList: [], // 用于去重
      fmLotId: null, // 来源库位id
      maintainType: null// 养护类型
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
        { label: this.$t('move.moveLotOrderNo'), value: 'moveLotOrderNo', type: 'input' },
        { label: this.$t('move.origin'), value: 'origin', type: 'select', list: 'moveLotOrderOriginList' },
        { label: this.$t('move.moveLotOrderStatus'), value: 'moveLotOrderStatus', type: 'select', list: 'moveLotOrderStatusList' },
        { label: this.$t('move.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('move.fmZoneId'), value: 'fmZoneId', type: 'slot' },
        { label: this.$t('move.fmLotCode'), value: 'fmLotId', type: 'slot' },
        { label: this.$t('move.toZoneId'), value: 'toZoneId', type: 'slot' },
        { label: this.$t('move.toLotCode'), value: 'toLotId', type: 'slot' },
        { label: this.$t('move.creatorName'), value: 'creator', type: 'input' },
        { label: this.$t('move.moveTimeFrom'), value: 'moveTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('move.moveTimeTo'), value: 'moveTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('move.moveLotOrderNo'), value: 'moveLotOrderNo', type: 'input' },
        { label: this.$t('move.origin'), value: 'origin', type: 'select', list: 'moveLotOrderOriginList' },
        { label: this.$t('move.moveLotOrderStatus'), value: 'moveLotOrderStatus', type: 'select', list: 'moveLotOrderStatusList' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
      this.topForm.data.ownerId = null
      this.topForm.data.fmZoneId = null
      this.topForm.data.fmLotId = null
      this.topForm.data.toZoneId = null
      this.topForm.data.toLotId = null
    },
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'moveLotOrderNo', label: this.$t('move.moveLotOrderNo'), minWidth: 130 },
        { prop: 'ownerName', label: this.$t('move.ownerId'), minWidth: 100 },
        { prop: 'originName', label: this.$t('move.origin'), minWidth: 100 },
        { prop: 'moveLotOrderStatusName', label: this.$t('move.moveLotOrderStatus'), minWidth: 100 },
        { prop: 'fmZoneName', label: this.$t('move.fmZoneId'), minWidth: 100 },
        { prop: 'fmLotCode', label: this.$t('move.fmLotCode'), minWidth: 100 },
        { prop: 'toZoneName', label: this.$t('move.toZoneId'), minWidth: 100 },
        { prop: 'toLotCode', label: this.$t('move.toLotCode'), minWidth: 100 },
        { prop: 'varietyNum', label: this.$t('move.varietyNum'), minWidth: 100 },
        { prop: 'canMoveQty', label: this.$t('move.canMoveQty'), minWidth: 100 },
        { prop: 'planMoveQty', label: this.$t('move.planMoveQty'), minWidth: 100 },
        { prop: 'creatorName', label: this.$t('move.creatorName'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('move.createTime'), minWidth: 100 },
        { prop: 'remark', label: this.$t('move.remark'), minWidth: 100 },
        { label: '操作', value: 'status', width: 230, type: 'slot', fixed: 'right' } // value: 'status' 对应页面上 自定义插槽的名字v-slot:col-status
      ]
    },

    // 增加产品明细参照初始化数据
    initTopFormInvColumns() {
      // 初始化top表单
      this.dialogInfoInv.topFormInv.fieldList = [
        { label: this.$t('move.invPro.skuId'), value: 'skuId', type: 'slot' },
        { label: this.$t('move.invPro.fmLotCode'), value: 'fmLotId', type: 'slot' },
        { label: this.$t('move.invPro.toLotCode'), value: 'toLotId', type: 'slot' },

        {
          type: 'button',
          label: '',
          btnlabel: this.$t('table.search'), // 查询按钮
          btType: 'primary',
          icon: 'el-icon-search',
          event: 'searchQueryInStockPro', // event值为notification.js中定义的方法名
          show: true,
          disabled: this.$hasPerm('add')
        },
        {
          type: 'button',
          label: '',
          btnlabel: '确定',
          btType: 'success',
          icon: 'el-icon-check',
          event: 'determine', // event值为notification.js中定义的方法名
          show: true,
          disabled: this.$hasPerm('add')
        }
      ]
      // 初始化列表
      this.dialogInfoInv.tableInfoInv.fieldList = [
        { label: '', type: 'selection', width: 50 }, // 序列
        { prop: 'fmLotCode', label: this.$t('move.invPro.lotCode'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('move.invPro.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('move.invPro.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('move.invPro.skuName'), minWidth: 100 },
        { prop: 'tradeName', label: this.$t('move.invPro.tradeName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('move.invPro.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('move.invPro.mainUnit'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('move.invPro.drugForm'), minWidth: 100 },
        { prop: 'mfgName', label: this.$t('move.invPro.mfgName'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('move.invPro.originCountry'), minWidth: 100 },
        { prop: 'approvalNumber', label: this.$t('move.invPro.approvalNumber'), minWidth: 100 },
        { prop: 'brandName', label: this.$t('move.invPro.brandName'), minWidth: 100 },
        { prop: 'tempControlName', label: this.$t('move.invPro.tempControlName'), minWidth: 100 },
        { prop: 'validityDay', label: this.$t('move.invPro.validityDay'), minWidth: 100 },
        { prop: 'canMoveQty', label: this.$t('move.invPro.canMoveQty'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('move.invPro.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('move.invPro.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('move.invPro.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('move.invPro.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('move.invPro.invalidDate'), minWidth: 100 },
        { prop: 'sterileNo', label: this.$t('move.invPro.sterileNo'), minWidth: 100 },
        { prop: 'sterileInvaliDate', label: this.$t('move.invPro.sterileInvaliDate'), minWidth: 100 }
      ]
    },

    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('move.fmZoneId'), value: 'fmZoneName', type: 'input', disabled: true },
        { label: this.$t('move.toZoneId'), value: 'toZoneName', type: 'input', disabled: true },
        { label: this.$t('move.ownerId'), value: 'ownerName', type: 'input', disabled: true },
        { label: this.$t('move.remark'), value: 'remark', type: 'textarea', disabled: true }
      ]
      // 明细数据
      this.diaFormInfo.subTableInfo.fieldList = [
        { label: '', type: 'selection', width: 50 }, // 序列
        { prop: 'fmLotCode', label: this.$t('move.dt.lotCode'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('move.dt.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('move.dt.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('move.dt.skuName'), minWidth: 100 },
        { prop: 'tradeName', label: this.$t('move.dt.tradeName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('move.dt.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('move.dt.mainUnit'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('move.dt.drugForm'), minWidth: 100 },
        { prop: 'canMoveQty', label: this.$t('move.dt.canMoveQty'), minWidth: 100 },
        { prop: 'planMoveQty', label: this.$t('move.dt.planMoveQty'), minWidth: 120 },
        { prop: 'mfgName', label: this.$t('move.dt.mfgName'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('move.dt.originCountry'), minWidth: 100 },
        { prop: 'approvalNumber', label: this.$t('move.dt.approvalNumber'), minWidth: 100 },
        { prop: 'brandName', label: this.$t('move.dt.brandName'), minWidth: 100 },
        { prop: 'tempControlName', label: this.$t('move.dt.tempControlName'), minWidth: 100 },
        { prop: 'validityDay', label: this.$t('move.dt.validityDay'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('move.dt.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('move.dt.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('move.dt.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('move.dt.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('move.dt.invalidDate'), minWidth: 100 },
        { prop: 'sterileNo', label: this.$t('move.dt.sterileNo'), minWidth: 100 },
        { prop: 'sterileInvaliDate', label: this.$t('move.dt.sterileInvaliDate'), minWidth: 100 }
      ]
    },

    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('move.fmZoneId'), value: 'fmZoneId', type: 'slot' },
        { label: this.$t('move.toZoneId'), value: 'toZoneId', type: 'slot' },
        { label: this.$t('move.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('move.remark'), value: 'remark', type: 'textarea' }
      ]
      // 明细数据
      this.diaFormInfo.subTableInfo.fieldList = [
        { label: '', type: 'selection', width: 50 }, // 序列
        { prop: 'fmLotCode', label: this.$t('move.dt.lotCode'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('move.dt.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('move.dt.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('move.dt.skuName'), minWidth: 100 },
        { prop: 'tradeName', label: this.$t('move.dt.tradeName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('move.dt.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('move.dt.mainUnit'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('move.dt.drugForm'), minWidth: 100 },
        { prop: 'canMoveQty', label: this.$t('move.dt.canMoveQty'), minWidth: 100 },
        { prop: 'planMoveQty', label: this.$t('move.dt.planMoveQty'), minWidth: 120, edit: { 'name': 'input' }},
        { prop: 'mfgName', label: this.$t('move.dt.mfgName'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('move.dt.originCountry'), minWidth: 100 },
        { prop: 'approvalNumber', label: this.$t('move.dt.approvalNumber'), minWidth: 100 },
        { prop: 'brandName', label: this.$t('move.dt.brandName'), minWidth: 100 },
        { prop: 'tempControlName', label: this.$t('move.dt.tempControlName'), minWidth: 100 },
        { prop: 'validityDay', label: this.$t('move.dt.validityDay'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('move.dt.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('move.dt.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('move.dt.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('move.dt.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('move.dt.invalidDate'), minWidth: 100 },
        { prop: 'sterileNo', label: this.$t('move.dt.sterileNo'), minWidth: 100 },
        { prop: 'sterileInvaliDate', label: this.$t('move.dt.sterileInvaliDate'), minWidth: 100 }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('move.fmZoneId'), value: 'fmZoneName', type: 'input', disabled: true },
        { label: this.$t('move.toZoneId'), value: 'toZoneName', type: 'input', disabled: true },
        { label: this.$t('move.ownerId'), value: 'ownerName', type: 'input', disabled: true },
        { label: this.$t('move.remark'), value: 'remark', type: 'textarea' }
      ]
      // 明细数据
      this.diaFormInfo.subTableInfo.fieldList = [
        { label: '', type: 'selection', width: 50 }, // 序列
        { prop: 'fmLotCode', label: this.$t('move.dt.lotCode'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('move.dt.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('move.dt.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('move.dt.skuName'), minWidth: 100 },
        { prop: 'tradeName', label: this.$t('move.dt.tradeName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('move.dt.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('move.dt.mainUnit'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('move.dt.drugForm'), minWidth: 100 },
        { prop: 'canMoveQty', label: this.$t('move.dt.canMoveQty'), minWidth: 100 },
        { prop: 'planMoveQty', label: this.$t('move.dt.planMoveQty'), minWidth: 120, edit: { 'name': 'input' }},
        { prop: 'mfgName', label: this.$t('move.dt.mfgName'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('move.dt.originCountry'), minWidth: 100 },
        { prop: 'approvalNumber', label: this.$t('move.dt.approvalNumber'), minWidth: 100 },
        { prop: 'brandName', label: this.$t('move.dt.brandName'), minWidth: 100 },
        { prop: 'tempControlName', label: this.$t('move.dt.tempControlName'), minWidth: 100 },
        { prop: 'validityDay', label: this.$t('move.dt.validityDay'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('move.dt.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('move.dt.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('move.dt.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('move.dt.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('move.dt.invalidDate'), minWidth: 100 },
        { prop: 'sterileNo', label: this.$t('move.dt.sterileNo'), minWidth: 100 },
        { prop: 'sterileInvaliDate', label: this.$t('move.dt.sterileInvaliDate'), minWidth: 100 }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        fmZoneId: [{ required: true, message: this.$t('move.msg.fmZoneId'), trigger: 'change' }],
        fmLotId: [{ required: true, message: this.$t('move.msg.fmLotId'), trigger: 'change' }],
        toZoneId: [{ required: true, message: this.$t('move.msg.toZoneId'), trigger: 'change' }],
        toLotId: [{ required: true, message: this.$t('move.msg.toLotId'), trigger: 'change' }],
        ownerId: [{ required: true, message: this.$t('move.msg.ownerId'), trigger: 'change' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        fmZoneId: null,
        fmLotId: null,
        toZoneId: null,
        toLotId: null,
        ownerId: null,
        remark: null,
        dtList: []
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
