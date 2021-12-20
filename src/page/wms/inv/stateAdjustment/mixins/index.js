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
          adjType: 'STATUS',
          adjNo: null,
          ownerCode: null,
          whAreaId: null,
          adjStatus: null,
          skuName: null,
          createTimeStart: null,
          createTimeEnd: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        // 下拉选项列表
        tLotCodeList: [],
        statusList: [],
        typeList: [],
        sourceList: [],
        querySkuCbList: [],
        skuStatusList: [],
        skuStatusListCopy: []
      },
      skuStatusEum: {},
      idsList: [],
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '210', // 默认操作按钮列宽度
          btList: []
        }
      },
      // 弹窗表单
      diaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {
          dtList: []
        }, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        imgInfo: {
          pictureList: [],
          disabled: false,
          accept: [{ type: 'img', limit: 6 }]
        },
        subTableInfo: {
          topBtn: { label: '添加商品明细', show: true, type: 'primary', disabled: false, loading: false, event: 'openDiaInv' },
          ref: null,
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

      // 弹窗 在库重点养护产品参照
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
            zoneId: null,
            lotId: null,
            skuName: null,
            barcode: null
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

      // 审核
      auditFormInfo: {
        ref: null, // 对外提供的可操作表单的持有对象
        fieldList: null, // 配置的表单字段集合
        data: {
          id: null,
          adjStatus: 'SUCCESS',
          auditReason: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },

      tempInStockProList: [], // 临时存放在选中在库产品对象集合
      inStockProList: [], // 存放在选中在库产品对象集合
      distinctList: [], // 用于去重
      tempDistinctList: [], // 用于去重
      ownerId: null// 货主id
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
        { label: this.$t('stateAdjustment.batchAdjustmentNo'), value: 'adjNo', type: 'input' },
        { label: this.$t('stateAdjustment.ownerId'), value: 'ownerCode', type: 'slot' },
        { label: this.$t('stateAdjustment.whAreaId'), value: 'whAreaId', type: 'slot' },
        { label: this.$t('stateAdjustment.status'), value: 'adjStatus', type: 'select', list: 'statusList' },
        { label: this.$t('stateAdjustment.skuName'), value: 'skuName', type: 'input' },
        { label: this.$t('inOrder.createTimeFrom'), value: 'createTimeStart', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('inOrder.createTimeTo'), value: 'createTimeEnd', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('stateAdjustment.batchAdjustmentNo'), value: 'adjNo', type: 'input' },
        { label: this.$t('stateAdjustment.ownerId'), value: 'ownerCode', type: 'slot' },
        { label: this.$t('stateAdjustment.whAreaId'), value: 'whAreaId', type: 'slot' },
        // { label: this.$t('stateAdjustment.inventoryType'), value: 'inventoryType', type: 'select', list: 'inventoryTypeList' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 },
        { prop: 'adjNo', label: this.$t('stateAdjustment.batchAdjustmentNo'), minWidth: 120 },
        { prop: 'adjStatusName', label: this.$t('stateAdjustment.status'), minWidth: 100 },
        { prop: 'sourceTypeName', label: this.$t('stateAdjustment.sourceType'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('stateAdjustment.ownerName'), minWidth: 150 },
        { prop: 'whAreaName', label: this.$t('stateAdjustment.whAreaId'), minWidth: 100 },
        { prop: 'remark', label: this.$t('stateAdjustment.adjustmentDescription'), minWidth: 100 },
        { prop: 'auditReason', label: this.$t('stateAdjustment.reason'), minWidth: 100 },
        { prop: 'creatorName', label: this.$t('stateAdjustment.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('stateAdjustment.createTime'), minWidth: 100 },
        { prop: 'updaterName', label: this.$t('stateAdjustment.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('stateAdjustment.updateTime'), minWidth: 100 },
        { prop: 'auditorName', label: this.$t('stateAdjustment.auditor'), minWidth: 100 },
        { prop: 'auditTime', label: this.$t('stateAdjustment.auditorTime'), minWidth: 150 },
        { label: '操作', value: 'status', width: 215, type: 'slot', fixed: 'right', align: 'left' }
      ]
    },

    // 增加产品明细参照初始化数据
    initTopFormInvColumns() {
      // 初始化top表单
      this.dialogInfoInv.topFormInv.fieldList = [
        { label: this.$t('stateAdjustment.invPro.zoneName'), value: 'zoneId', type: 'slot' },
        { label: this.$t('stateAdjustment.invPro.lotCode'), value: 'lotId', type: 'slot' },
        { label: this.$t('stateAdjustment.invPro.skuCode'), value: 'skuCode', type: 'input' },
        { label: this.$t('stateAdjustment.invPro.skuName'), value: 'skuName', type: 'input' },
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
        { prop: 'zoneName', label: this.$t('stateAdjustment.invPro.zoneName'), minWidth: 100 },
        { prop: 'lotName', label: this.$t('stateAdjustment.invPro.lotCode'), minWidth: 100 },
        { prop: 'skuBarcode', label: this.$t('stateAdjustment.invPro.barcode'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('stateAdjustment.invPro.skuCode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('stateAdjustment.invPro.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('stateAdjustment.invPro.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('stateAdjustment.invPro.mainUnit'), minWidth: 100 },
        { prop: 'stockQty', label: this.$t('stateAdjustment.invPro.planPdQty'), minWidth: 100 },
        { prop: 'lotQualityName', label: this.$t('stateAdjustment.invPro.skuStatus'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('stateAdjustment.invPro.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('stateAdjustment.invPro.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('stateAdjustment.invPro.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('stateAdjustment.invPro.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('stateAdjustment.invPro.invalidDate'), minWidth: 100 }
      ]
    },

    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'

      this.diaFormInfo.fieldList = [
        { label: this.$t('stateAdjustment.ownerName'), value: 'ownerName', type: 'input', readonly: true },
        { label: this.$t('stateAdjustment.whAreaId'), value: 'whAreaName', type: 'input', readonly: true },
        { label: this.$t('stateAdjustment.adjustmentDescription'), value: 'remark', type: 'input', readonly: true },
        { label: this.$t('stateAdjustment.creator'), value: 'creatorName', type: 'input', readonly: true },
        { label: this.$t('stateAdjustment.createTime'), value: 'createTime', type: 'input', readonly: true },
        { label: this.$t('stateAdjustment.updater'), value: 'updaterName', type: 'input', readonly: true },
        { label: this.$t('stateAdjustment.updateTime'), value: 'updateTime', type: 'input', readonly: true },
        { label: this.$t('stateAdjustment.auditorName'), value: 'auditorName', type: 'input', readonly: true },
        { label: this.$t('stateAdjustment.auditorTime'), value: 'auditTime', type: 'input', readonly: true }
      ]

      // 明细数据
      this.diaFormInfo.subTableInfo.fieldList = [
        { label: '序号', type: 'seq', width: 50 },
        { prop: 'zoneName', label: this.$t('stateAdjustment.dt.zoneName'), minWidth: 100 },
        { prop: 'lotName', label: this.$t('stateAdjustment.dt.lotCode'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('stateAdjustment.dt.skuCode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('stateAdjustment.dt.skuName'), minWidth: 100 },
        { prop: 'stockQty', label: this.$t('stateAdjustment.dt.planPdQty'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('stateAdjustment.dt.mainUnit'), minWidth: 100 },
        { prop: 'qualityName', label: this.$t('stateAdjustment.dt.skuStatus'), minWidth: 100 },
        { prop: 'tSkuStatusName', label: this.$t('stateAdjustment.dt.targetStatus'), minWidth: 100 },
        { prop: 'adjQty', label: this.$t('stateAdjustment.dt.adjustmentPdQty'), minWidth: 100 },
        { prop: 'consumeOwnerName', label: this.$t('stateAdjustment.dt.consumablesOwner'), minWidth: 100 },
        { prop: 'consumeSkuName', label: this.$t('stateAdjustment.dt.consumablesName'), minWidth: 100 },
        { prop: 'consumeQty', label: this.$t('stateAdjustment.dt.useNUm'), minWidth: 100 },
        { prop: 'tLotCode', label: this.$t('stateAdjustment.dt.targetLotCode'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('stateAdjustment.dt.instoreDate'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('stateAdjustment.dt.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('stateAdjustment.dt.productionDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('stateAdjustment.dt.invalidDate'), minWidth: 100 }

      ]
    },
    initSubTableInfo() {
      // 明细数据
      this.diaFormInfo.subTableInfo.fieldList = [
        { label: '序号', type: 'seq', width: 50 },
        { prop: 'zoneName', label: this.$t('stateAdjustment.dt.zoneName'), minWidth: 100 },
        { prop: 'lotName', label: this.$t('stateAdjustment.dt.lotCode'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('stateAdjustment.dt.skuCode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('stateAdjustment.dt.skuName'), minWidth: 100 },
        { prop: 'stockQty', label: this.$t('stateAdjustment.dt.planPdQty'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('stateAdjustment.dt.mainUnit'), minWidth: 100 },
        { prop: 'qualityName', label: this.$t('stateAdjustment.dt.skuStatus'), minWidth: 100 },
        { prop: 'tSkuStatus', label: this.$t('stateAdjustment.dt.targetStatus'), minWidth: 130, edit: { name: 'ElSelect', options: this.listTypeInfo.skuStatusList, props: { clearable: false }, events: {
          change: this.tskuStatusChangeEvent
        }}},
        { prop: 'adjQty', label: this.$t('stateAdjustment.dt.adjustmentPdQty'), minWidth: 130, edit: { name: 'ElInputNumber', props: { min: 0, precision: 0 }, events: {
          change: this.changeEvent
        }}},
        { prop: 'consumeOwnerName', label: this.$t('stateAdjustment.dt.consumablesOwner'), link: 'consumeOwnerId', minWidth: 250, type: 'editslot', edit: {}},
        { prop: 'consumeSkuName', label: this.$t('stateAdjustment.dt.consumablesName'), minWidth: 250, type: 'editslot', edit: {}},
        // { prop: 'consumeSkuName', label: this.$t('stateAdjustment.dt.consumablesName'), minWidth: 150, type: 'slot', edit: { name: 'ElSelect', props: { clearable: true }, options: this.listTypeInfo.querySkuCbList, events: {
        //   focus: this.querySkuCbListFocusEvent,
        //   blur: this.querySkuCbListBlurEvent
        // }}},
        { prop: 'consumeQty', label: this.$t('stateAdjustment.dt.useNUm'), minWidth: 130, edit: { name: 'ElInputNumber', props: { min: 0, precision: 0 }}},
        // { prop: 'tLotCode', label: this.$t('stateAdjustment.dt.targetLotCode'), minWidth: 200, edit: { name: 'ElSelect', props: { clearable: true }, options: this.listTypeInfo.tLotCodeList, events: {
        //   focus: this.focusEvent
        // }}},
        { prop: 'tLotCode', label: this.$t('stateAdjustment.dt.targetLotCode'), minWidth: 200, type: 'editslot', edit: {}},
        { prop: 'instoreDate', label: this.$t('stateAdjustment.dt.instoreDate'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('stateAdjustment.dt.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('stateAdjustment.dt.productionDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('stateAdjustment.dt.invalidDate'), minWidth: 100 }
      ]
    },
    SubTableRules() {
      this.diaFormInfo.subTableInfo.rules = {
        tSkuStatus: [
          { required: true, message: '必须填写' }
        ],
        tLotCode: [
          { required: true, message: '必须填写' }
        ],
        adjQty: [
          { required: true, message: '必须填写' },
          { type: 'number', message: '必须是数量字' }
        ]
      }
    },

    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''

      this.diaFormInfo.fieldList = [
        { label: this.$t('stateAdjustment.ownerName'), value: 'ownerCode', type: 'slot' },
        { label: this.$t('stateAdjustment.whAreaId'), value: 'whAreaId', type: 'slot' },
        { label: this.$t('stateAdjustment.adjustmentDescription'), value: 'remark', type: 'input' }
      ]
      this.SubTableRules()
      this.initSubTableInfo()
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('stateAdjustment.ownerName'), value: 'ownerCode', type: 'slot' },
        { label: this.$t('stateAdjustment.whAreaId'), value: 'whAreaId', type: 'slot' },
        { label: this.$t('stateAdjustment.adjustmentDescription'), value: 'remark', type: 'input' }
      ]
      // 明细数据
      this.SubTableRules()
      this.initSubTableInfo()
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        isVisible: [{ required: true, message: this.$t('stateAdjustment.msg.isVisible'), trigger: 'blur' }],
        ownerCode: [{ required: true, message: this.$t('stateAdjustment.msg.ownerId'), trigger: 'blur' }],
        sourceType: [{ required: true, message: this.$t('stateAdjustment.msg.sourceType'), trigger: 'blur' }],
        inventoryStatus: [{ required: true, message: this.$t('stateAdjustment.msg.inventoryStatus'), trigger: 'blur' }],
        inventoryMethod: [{ required: true, message: this.$t('stateAdjustment.msg.inventoryMethod'), trigger: 'blur' }],
        companyCode: [{ required: true, message: this.$t('stateAdjustment.msg.companyCode'), trigger: 'blur' }],
        inventoryType: [{ required: true, message: this.$t('stateAdjustment.msg.inventoryType'), trigger: 'blur' }],
        whAreaId: [{ required: true, message: this.$t('stateAdjustment.msg.whAreaId'), trigger: 'blur' }],
        remark: [{ required: true, message: this.$t('stateAdjustment.msg.adjustmentDescription'), trigger: 'blur' }]

      }
    },

    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        ownerId: null,
        ownerCode: null,
        ownerName: null,
        whAreaId: null,
        adjType: 'STATUS',
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
