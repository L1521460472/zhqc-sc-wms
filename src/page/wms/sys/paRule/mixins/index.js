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
          paRuleCode: null,
          paRuleName: null,
          isEnable: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        paRuleTypeList: [],
        asnTypeList: [],
        whetherList: [],
        enableList: [],
        turnoverLevelList: [],
        goodsQualityList: [],
        packageAttrList: [],
        storageTypeList: [],
        lotTypeList: [],
        zoneList: [],
        lotList: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '280', // 默认操作按钮列宽度
          btList: [// 添加操作按钮
            // 默认查看按钮
            { label: this.$t('table.view'), type: 'primary', icon: '', event: 'openViewPage', show: true, disabled: this.$hasPerm('view') }, // event值为notification.js中定义的方法名
            // 默认修改按钮
            { label: this.$t('table.edit'), type: 'success', icon: '', event: 'openEditPage', show: true, disabled: this.$hasPerm('edit') }, // event值为notification.js中定义的方法名
            // 默认删除按钮
            { label: this.$t('table.delete'), type: 'danger', icon: '', event: 'deleteData', show: true, disabled: this.$hasPerm('delete') }, // event值为notification.js中定义的方法名
            // 自定义按钮
            { slot: true, icon: '', event: 'slotEvent' }// event值为notification.js中定义的方法名

          ]

        }
      },
      // 弹窗表单
      diaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        dtTableInfo: {
          ref: null,
          data: [],
          deleteIds: [],
          fieldList: [],
          handle: { // 表格自定义按钮
            fixed: 'right',
            label: this.$t('table.actions'), // 操作列名
            width: '160', // 默认操作按钮列宽度
            btList: [// 添加操作按钮
              {
                label: this.$t('table.edit'),
                type: 'success',
                icon: '',
                event: 'openDiaLogDtEdit',
                show: true,
                disabled: false
              },
              // 默认删除按钮
              {
                label: this.$t('table.delete'),
                type: 'danger',
                icon: '',
                event: 'deleteDtData',
                show: true,
                disabled: false
              }

            ]
          },
          topBtn: { label: '添加策略明细', show: true, type: 'primary', disabled: false, loading: false, event: 'openDiaLogDtAdd' }
        }
      },
      diaFormInfoDt: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        canEditZone: false,
        canEditLot: false,
        rowIndex: null
      }
    }
  },
  mounted() {
    this.initTopFormColumns()// 初始化查询界面配置数据
    this.rulesInit()// 初始化diaFormInfo表单字段校验规则
  },
  methods: {
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化top表单
      this.topForm.fieldList = [
        { label: this.$t('paRule.paRuleCode'), value: 'paRuleCode', type: 'input' },
        { label: this.$t('paRule.paRuleName'), value: 'paRuleName', type: 'input' },
        { label: this.$t('paRule.isEnable'), value: 'isEnable', type: 'select', list: 'enableList' },
        { label: '', value: 'sys', type: 'slot' }
      ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'paRuleCode', label: this.$t('paRule.paRuleCode'), minWidth: 100 },
        { prop: 'paRuleName', label: this.$t('paRule.paRuleName'), minWidth: 100 },
        // {prop:"asnTypeName", label:this.$t('paRule.asnType'), minWidth:100},
        // {prop:"destZoneName", label:this.$t('paRule.destZone'), minWidth:100},
        // {prop:"destLotCode", label:this.$t('paRule.destLot'), minWidth:100},
        // {prop:"isEmptyLotPriorName", label:this.$t('paRule.isEmptyLotPrior'), minWidth:120},
        // {prop:"isSameProductName", label:this.$t('paRule.isSameProduct'), minWidth:120},
        // {prop:"isMixSkuName", label:this.$t('paRule.isMixSku'), minWidth:120},
        // {prop:"mixSkuMaxQty", label:this.$t('paRule.mixSkuMaxQty'), minWidth:120},
        // {prop:"isMixBatchName", label:this.$t('paRule.isMixBatch'), minWidth:120},
        // {prop:"mixBatchMaxQty", label:this.$t('paRule.mixBatchMaxQty'), minWidth:100},
        { prop: 'isEnableName', label: this.$t('paRule.isEnable'), minWidth: 100 },
        { prop: 'isDefaultName', label: this.$t('paRule.isDefault'), minWidth: 100 },
        { prop: 'remark', label: this.$t('paRule.remark'), minWidth: 100 },
        { prop: 'creator', label: this.$t('paRule.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('paRule.createTime'), minWidth: 100 },
        { prop: 'updater', label: this.$t('paRule.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('paRule.updateTime'), minWidth: 100 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('paRule.paRuleCode'), value: 'paRuleCode', type: 'input', disabled: true },
        { label: this.$t('paRule.paRuleName'), value: 'paRuleName', type: 'input', disabled: true },
        { label: this.$t('paRule.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', disabled: true },
        { label: this.$t('paRule.isDefault'), value: 'isDefault', type: 'select', list: 'whetherList', disabled: true },
        { label: this.$t('paRule.remark'), value: 'remark', type: 'input', disabled: true }
      ]
      this.diaFormInfo.dtTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { label: this.$t('paRule.paRuleDt.sortNum'), prop: 'sortNum', minWidth: 100, edit: { name: 'ElInputNumber', props: { min: 0, precision: 0 }}},
        { label: this.$t('paRule.paRuleDt.paRuleType'), prop: 'paRuleTypeName', minWidth: 100 },
        { label: this.$t('paRule.paRuleDt.paZoneIds'), prop: 'paZoneNames', minWidth: 100 },
        { label: this.$t('paRule.paRuleDt.paLotIds'), prop: 'paLotCodes', minWidth: 100 },
        { label: this.$t('paRule.paRuleDt.asnTypes'), prop: 'asnTypeNames', minWidth: 100 },
        { label: this.$t('paRule.paRuleDt.goodsQuality'), prop: 'goodsQualityName', minWidth: 100 },
        { label: this.$t('paRule.paRuleDt.storageType'), prop: 'storageTypeName', minWidth: 100 },
        { label: this.$t('paRule.paRuleDt.remark'), prop: 'remark', minWidth: 100 }
      ]
      this.diaFormInfoDt.fieldList = [
        { label: this.$t('paRule.paRuleDt.paRuleType'), value: 'paRuleType', type: 'select', list: 'paRuleTypeList', event: 'handlePaRuleType' },
        { label: this.$t('paRule.paRuleDt.paZoneIds'), value: 'paZoneIdArray', type: 'slot' },
        { label: this.$t('paRule.paRuleDt.paLotIds'), value: 'paLotIdArray', type: 'input', disabled: true },
        { label: this.$t('paRule.paRuleDt.asnTypes'), value: 'asnTypeArray', type: 'slot' },
        { label: this.$t('paRule.paRuleDt.goodsQuality'), value: 'goodsQuality', type: 'select', list: 'goodsQualityList' },
        { label: this.$t('paRule.paRuleDt.isEmptyFirst'), value: 'isEmptyFirst', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('paRule.paRuleDt.isMixSku'), value: 'isMixSku', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('paRule.paRuleDt.isMixBatch'), value: 'isMixBatch', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('paRule.paRuleDt.lotTypes'), value: 'lotTypeArray', type: 'slot' },
        { label: this.$t('paRule.paRuleDt.storageType'), value: 'storageType', type: 'select', list: 'storageTypeList' },
        { label: this.$t('paRule.paRuleDt.isQtyLimit'), value: 'isQtyLimit', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('paRule.paRuleDt.turnoverLevel'), value: 'turnoverLevel', type: 'select', list: 'turnoverLevelList' },
        { label: this.$t('paRule.paRuleDt.packageAttr'), value: 'packageAttr', type: 'select', list: 'packageAttrList' },
        { label: this.$t('paRule.paRuleDt.isVolLimit'), value: 'isVolLimit', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('paRule.paRuleDt.isWeightLimit'), value: 'isWeightLimit', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('paRule.paRuleDt.isPalletLimit'), value: 'isPalletLimit', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('paRule.paRuleDt.sortNum'), value: 'sortNum', type: 'number', min: 0, precision: 0 },
        { label: this.$t('paRule.paRuleDt.remark'), value: 'remark', type: 'input' }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('paRule.paRuleCode'), value: 'paRuleCode', type: 'input' },
        { label: this.$t('paRule.paRuleName'), value: 'paRuleName', type: 'input' },
        { label: this.$t('paRule.isEnable'), value: 'isEnable', type: 'select', list: 'enableList' },
        { label: this.$t('paRule.isDefault'), value: 'isDefault', type: 'select', list: 'whetherList' },
        { label: this.$t('paRule.remark'), value: 'remark', type: 'input' }
      ]
      this.diaFormInfo.dtTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { label: this.$t('paRule.paRuleDt.sortNum'), prop: 'sortNum', minWidth: 100, edit: { name: 'ElInputNumber', props: { min: 0, precision: 0 }}},
        { label: this.$t('paRule.paRuleDt.paRuleType'), prop: 'paRuleTypeName', minWidth: 100 },
        { label: this.$t('paRule.paRuleDt.paZoneIds'), prop: 'paZoneNames', minWidth: 100 },
        { label: this.$t('paRule.paRuleDt.paLotIds'), prop: 'paLotCodes', minWidth: 100 },
        { label: this.$t('paRule.paRuleDt.asnTypes'), prop: 'asnTypeNames', minWidth: 100 },
        { label: this.$t('paRule.paRuleDt.goodsQuality'), prop: 'goodsQualityName', minWidth: 100 },
        { label: this.$t('paRule.paRuleDt.storageType'), prop: 'storageTypeName', minWidth: 100 },
        { label: this.$t('paRule.paRuleDt.remark'), prop: 'remark', minWidth: 100 }
      ]
      this.diaFormInfoDt.fieldList = [
        { label: this.$t('paRule.paRuleDt.paRuleType'), value: 'paRuleType', type: 'select', list: 'paRuleTypeList', event: 'handlePaRuleType' },
        { label: this.$t('paRule.paRuleDt.paZoneIds'), value: 'paZoneIdArray', type: 'slot' },
        { label: this.$t('paRule.paRuleDt.paLotIds'), value: 'paLotIdArray', type: 'input', disabled: true },
        { label: this.$t('paRule.paRuleDt.asnTypes'), value: 'asnTypeArray', type: 'slot' },
        { label: this.$t('paRule.paRuleDt.goodsQuality'), value: 'goodsQuality', type: 'select', list: 'goodsQualityList' },
        { label: this.$t('paRule.paRuleDt.isEmptyFirst'), value: 'isEmptyFirst', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('paRule.paRuleDt.isMixSku'), value: 'isMixSku', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('paRule.paRuleDt.isMixBatch'), value: 'isMixBatch', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('paRule.paRuleDt.lotTypes'), value: 'lotTypeArray', type: 'slot' },
        { label: this.$t('paRule.paRuleDt.storageType'), value: 'storageType', type: 'select', list: 'storageTypeList' },
        { label: this.$t('paRule.paRuleDt.isQtyLimit'), value: 'isQtyLimit', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('paRule.paRuleDt.turnoverLevel'), value: 'turnoverLevel', type: 'select', list: 'turnoverLevelList' },
        { label: this.$t('paRule.paRuleDt.packageAttr'), value: 'packageAttr', type: 'select', list: 'packageAttrList' },
        { label: this.$t('paRule.paRuleDt.isVolLimit'), value: 'isVolLimit', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('paRule.paRuleDt.isWeightLimit'), value: 'isWeightLimit', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('paRule.paRuleDt.isPalletLimit'), value: 'isPalletLimit', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('paRule.paRuleDt.sortNum'), value: 'sortNum', type: 'number', min: 0, precision: 0 },
        { label: this.$t('paRule.paRuleDt.remark'), value: 'remark', type: 'input' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('paRule.paRuleCode'), value: 'paRuleCode', type: 'input' },
        { label: this.$t('paRule.paRuleName'), value: 'paRuleName', type: 'input' },
        { label: this.$t('paRule.isEnable'), value: 'isEnable', type: 'select', list: 'enableList' },
        { label: this.$t('paRule.isDefault'), value: 'isDefault', type: 'select', list: 'whetherList' },
        { label: this.$t('paRule.remark'), value: 'remark', type: 'input' }
      ]
      this.diaFormInfo.dtTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { label: this.$t('paRule.paRuleDt.sortNum'), prop: 'sortNum', minWidth: 100, edit: { name: 'ElInputNumber', props: { min: 0, precision: 0 }}},
        { label: this.$t('paRule.paRuleDt.paRuleType'), prop: 'paRuleTypeName', minWidth: 100 },
        { label: this.$t('paRule.paRuleDt.paZoneIds'), prop: 'paZoneNames', minWidth: 100 },
        { label: this.$t('paRule.paRuleDt.paLotIds'), prop: 'paLotCodes', minWidth: 100 },
        { label: this.$t('paRule.paRuleDt.asnTypes'), prop: 'asnTypeNames', minWidth: 100 },
        { label: this.$t('paRule.paRuleDt.goodsQuality'), prop: 'goodsQualityName', minWidth: 100 },
        { label: this.$t('paRule.paRuleDt.storageType'), prop: 'storageTypeName', minWidth: 100 },
        { label: this.$t('paRule.paRuleDt.remark'), prop: 'remark', minWidth: 100 }
      ]
      this.diaFormInfoDt.fieldList = [
        { label: this.$t('paRule.paRuleDt.paRuleType'), value: 'paRuleType', type: 'select', list: 'paRuleTypeList', event: 'handlePaRuleType' },
        { label: this.$t('paRule.paRuleDt.paZoneIds'), value: 'paZoneIdArray', type: 'slot' },
        { label: this.$t('paRule.paRuleDt.paLotIds'), value: 'paLotIdArray', type: 'input' },
        { label: this.$t('paRule.paRuleDt.asnTypes'), value: 'asnTypeArray', type: 'slot' },
        { label: this.$t('paRule.paRuleDt.goodsQuality'), value: 'goodsQuality', type: 'select', list: 'goodsQualityList' },
        { label: this.$t('paRule.paRuleDt.isEmptyFirst'), value: 'isEmptyFirst', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('paRule.paRuleDt.isMixSku'), value: 'isMixSku', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('paRule.paRuleDt.isMixBatch'), value: 'isMixBatch', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('paRule.paRuleDt.lotTypes'), value: 'lotTypeArray', type: 'slot' },
        { label: this.$t('paRule.paRuleDt.storageType'), value: 'storageType', type: 'select', list: 'storageTypeList' },
        { label: this.$t('paRule.paRuleDt.isQtyLimit'), value: 'isQtyLimit', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('paRule.paRuleDt.turnoverLevel'), value: 'turnoverLevel', type: 'select', list: 'turnoverLevelList' },
        { label: this.$t('paRule.paRuleDt.packageAttr'), value: 'packageAttr', type: 'select', list: 'packageAttrList' },
        { label: this.$t('paRule.paRuleDt.isVolLimit'), value: 'isVolLimit', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('paRule.paRuleDt.isWeightLimit'), value: 'isWeightLimit', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('paRule.paRuleDt.isPalletLimit'), value: 'isPalletLimit', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('paRule.paRuleDt.sortNum'), value: 'sortNum', type: 'number', min: 0, precision: 0 },
        { label: this.$t('paRule.paRuleDt.remark'), value: 'remark', type: 'input' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        paRuleCode: [{ required: true, message: this.$t('paRule.msg.paRuleCode'), trigger: 'blur' }],
        isEnable: [{ required: true, message: this.$t('paRule.msg.isEnable'), trigger: 'blur' }],
        paRuleName: [{ required: true, message: this.$t('paRule.msg.paRuleName'), trigger: 'blur' }],
        isDefault: [{ required: true, message: this.$t('paRule.msg.isDefault'), trigger: 'blur' }],
        isSameProduct: [{ required: true, message: this.$t('paRule.msg.isSameProduct'), trigger: 'blur' }]
      }
      this.diaFormInfoDt.rules = {
        paRuleType: [{ required: true, message: this.$t('paRule.msg.paRuleDt.paRuleType'), trigger: 'change' }],
        goodsQuality: [{ required: true, message: this.$t('paRule.msg.paRuleDt.goodsQuality'), trigger: 'change' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        destLot: null,
        mixSkuMaxQty: null,
        paRuleCode: null,
        isEnable: 1,
        remark: null,
        paRuleName: null,
        isDefault: 0,
        destZone: null,
        isMixSku: 0,
        isMixBatch: 0,
        mixBatchMaxQty: null,
        whId: null,
        isEmptyLotPrior: 0,
        asnType: null,
        companyCode: null,
        id: null,
        isSameProduct: 0
      }
      this.diaFormInfo.dtTableInfo.data = []
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
