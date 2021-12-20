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
          ownerId: null,
          adjNo: null,
          adjStatus: null,
          sourceType: null,
          origNo: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        sourceTypeList: [],
        adjStatusList: []

      },
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
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        subTableInfo: {
          topBtn: { label: '增加产品明细', show: true, type: 'primary', disabled: false, loading: false, event: 'openDiaInv' },
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
    // 主页面初始化数据
    collapsableFormMore() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('inventoryAdj.adjNo'), value: 'adjNo', type: 'input' },
        { label: this.$t('inventoryAdj.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('inventoryAdj.adjStatus'), value: 'adjStatus', type: 'select', list: 'adjStatusList' },
        { label: this.$t('inventoryAdj.sourceType'), value: 'sourceType', type: 'select', list: 'sourceTypeList' },
        { label: this.$t('inventoryAdj.origNo'), value: 'origNo', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('inventoryAdj.adjNo'), value: 'adjNo', type: 'input' },
        { label: this.$t('inventoryAdj.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('inventoryAdj.adjStatus'), value: 'adjStatus', type: 'select', list: 'adjStatusList' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },

    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: '', type: 'selection', width: 50 }, // 序列
        { prop: 'adjNo', label: this.$t('inventoryAdj.adjNo'), minWidth: 150 },
        { prop: 'adjStatusName', label: this.$t('inventoryAdj.adjStatusName'), minWidth: 100 },
        { prop: 'sourceTypeName', label: this.$t('inventoryAdj.sourceTypeName'), minWidth: 100 },
        { prop: 'origNo', label: this.$t('inventoryAdj.origNo'), minWidth: 150 },
        { prop: 'ownerName', label: this.$t('inventoryAdj.ownerName'), minWidth: 150 },
        { prop: 'adjReason', label: this.$t('inventoryAdj.adjReason'), minWidth: 200 },
        { prop: 'auditorName', label: this.$t('inventoryAdj.auditorName'), minWidth: 100 },
        { prop: 'auditTime', label: this.$t('inventoryAdj.auditTime'), minWidth: 150 },
        { prop: 'unauditorName', label: this.$t('inventoryAdj.unauditorName'), minWidth: 100 },
        { prop: 'unauditTime', label: this.$t('inventoryAdj.unauditTime'), minWidth: 150 },
        { prop: 'remark', label: this.$t('inventoryAdj.remark'), minWidth: 100 },
        { prop: 'createName', label: this.$t('inventoryAdj.createName'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('inventoryAdj.createTime'), minWidth: 150 },
        { prop: 'updateName', label: this.$t('inventoryAdj.updateName'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('inventoryAdj.updateTime'), minWidth: 150 },
        { label: '操作', value: 'status', width: 200, type: 'slot', fixed: 'right', align: 'left' }
      ]
    },

    // 增加产品明细参照初始化数据
    initTopFormInvColumns() {
      // 初始化top表单
      this.dialogInfoInv.topFormInv.fieldList = [
        { label: this.$t('inventory.invPro.zoneName'), value: 'zoneId', type: 'slot' },
        { label: this.$t('inventory.invPro.lotCode'), value: 'lotId', type: 'slot' },
        { label: this.$t('inventory.invPro.barcode'), value: 'barcode', type: 'input' },
        { label: this.$t('inventory.invPro.skuName'), value: 'skuName', type: 'input' },
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
        { prop: 'zoneName', label: this.$t('inventoryAdj.invPro.zoneName'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('inventoryAdj.invPro.lotCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('inventoryAdj.invPro.barcode'), minWidth: 100 },
        // {prop:"skuId", label:this.$t('inventoryAdj.invPro.skuId'), minWidth:100},
        { prop: 'skuCode', label: this.$t('inventoryAdj.invPro.skuCode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('inventoryAdj.invPro.skuName'), minWidth: 100 },
        { prop: 'supplierCode', label: this.$t('inventoryAdj.invPro.supplierCode'), minWidth: 100 },
        { prop: 'supplierShortName', label: this.$t('inventoryAdj.invPro.supplierShortName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('inventoryAdj.invPro.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('inventoryAdj.invPro.mainUnit'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('inventoryAdj.invPro.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('inventoryAdj.invPro.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('inventoryAdj.invPro.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('inventoryAdj.invPro.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('inventoryAdj.invPro.invalidDate'), minWidth: 100 },
        { prop: 'planPdQty', label: this.$t('inventoryAdj.invPro.planPdQty'), minWidth: 100 }
      ]
    },

    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('inventoryAdj.adjNo'), value: 'adjNo', type: 'input', readonly: true },
        { label: this.$t('inventoryAdj.ownerName'), value: 'ownerName', type: 'input', readonly: true },
        { label: this.$t('inventoryAdj.adjStatusName'), value: 'adjStatusName', type: 'input', readonly: true },
        { label: this.$t('inventoryAdj.sourceTypeName'), value: 'sourceTypeName', type: 'input', readonly: true },
        { label: this.$t('inventoryAdj.origNo'), value: 'origNo', type: 'input', readonly: true },
        { label: this.$t('inventoryAdj.adjReason'), value: 'adjReason', type: 'input', readonly: true },
        { label: this.$t('inventoryAdj.auditorName'), value: 'auditorName', type: 'input', readonly: true },
        { label: this.$t('inventoryAdj.auditTime'), value: 'auditTime', type: 'input', readonly: true },
        { label: this.$t('inventoryAdj.unauditorName'), value: 'unauditorName', type: 'input', readonly: true },
        { label: this.$t('inventoryAdj.unauditTime'), value: 'unauditTime', type: 'input', readonly: true },
        { label: this.$t('inventoryAdj.remark'), value: 'remark', type: 'input', readonly: true },
        { label: this.$t('inventoryAdj.createName'), value: 'createName', type: 'input', readonly: true },
        { label: this.$t('inventoryAdj.createTime'), value: 'createTime', type: 'input', readonly: true },
        { label: this.$t('inventoryAdj.updateName'), value: 'updateName', type: 'input', readonly: true },
        { label: this.$t('inventoryAdj.updateTime'), value: 'updateTime', type: 'input', readonly: true }
      ]
      // 明细数据
      this.diaFormInfo.subTableInfo.fieldList = [
        { label: '序号', type: 'seq', width: 50 },
        { prop: 'lineNum', label: this.$t('inventoryAdj.dt.lineNum'), minWidth: 100 },
        { prop: 'zoneName', label: this.$t('inventoryAdj.dt.zoneName'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('inventoryAdj.dt.lotCode'), minWidth: 100 },
        { prop: 'planPdQty', label: this.$t('inventoryAdj.dt.planPdQty'), minWidth: 100 },
        { prop: 'adjQty', label: this.$t('inventoryAdj.dt.adjQty'), minWidth: 100 },
        { prop: 'origLineNum', label: this.$t('inventoryAdj.dt.origLineNum'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('inventoryAdj.dt.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('inventoryAdj.dt.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('inventoryAdj.dt.skuName'), minWidth: 100 },
        { prop: 'tradeName', label: this.$t('inventoryAdj.dt.tradeName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('inventoryAdj.dt.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('inventoryAdj.dt.mainUnit'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('inventoryAdj.dt.drugForm'), minWidth: 100 },
        { prop: 'mfgName', label: this.$t('inventoryAdj.dt.mfgName'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('inventoryAdj.dt.originCountry'), minWidth: 100 },
        { prop: 'approvalNumber', label: this.$t('inventoryAdj.dt.approvalNumber'), minWidth: 100 },
        { prop: 'brandName', label: this.$t('inventoryAdj.dt.brandName'), minWidth: 100 },
        { prop: 'tempControlName', label: this.$t('inventoryAdj.dt.tempControlName'), minWidth: 100 },
        { prop: 'validityDay', label: this.$t('inventoryAdj.dt.validityDay'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('inventoryAdj.dt.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('inventoryAdj.dt.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('inventoryAdj.dt.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('inventoryAdj.dt.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('inventoryAdj.dt.invalidDate'), minWidth: 100 },
        { prop: 'sterileNo', label: this.$t('inventoryAdj.dt.sterileNo'), minWidth: 100 },
        { prop: 'sterileInvaliDate', label: this.$t('inventoryAdj.dt.sterileInvaliDate'), minWidth: 100 }

      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('inventoryAdj.ownerName'), value: 'ownerId', type: 'slot' },
        { label: this.$t('inventoryAdj.adjStatus'), value: 'adjStatus', type: 'select', list: 'adjStatusList', disabled: true },
        { label: this.$t('inventoryAdj.sourceType'), value: 'sourceType', type: 'select', list: 'sourceTypeList', disabled: true },
        { label: this.$t('inventoryAdj.origNo'), value: 'origNo', type: 'input' },
        { label: this.$t('inventoryAdj.adjReason'), value: 'adjReason', type: 'input' },
        { label: this.$t('inventoryAdj.remark'), value: 'remark', type: 'input' }
      ]
      // 明细数据
      this.diaFormInfo.subTableInfo.fieldList = [
        { label: '序号', type: 'seq', width: 50 },
        // {prop:"lineNum", label:this.$t('inventoryAdj.dt.lineNum'), minWidth:100},
        { prop: 'zoneName', label: this.$t('inventoryAdj.dt.zoneName'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('inventoryAdj.dt.lotCode'), minWidth: 100 },
        { prop: 'planPdQty', label: this.$t('inventoryAdj.dt.planPdQty'), minWidth: 100 },
        { prop: 'adjQty', label: this.$t('inventoryAdj.dt.adjQty'), minWidth: 100, edit: { 'name': 'input' }},
        // {prop:"origLineNum", label:this.$t('inventoryAdj.dt.origLineNum'), minWidth:100},
        { prop: 'skuCode', label: this.$t('inventoryAdj.dt.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('inventoryAdj.dt.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('inventoryAdj.dt.skuName'), minWidth: 100 },
        { prop: 'tradeName', label: this.$t('inventoryAdj.dt.tradeName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('inventoryAdj.dt.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('inventoryAdj.dt.mainUnit'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('inventoryAdj.dt.drugForm'), minWidth: 100 },
        { prop: 'mfgName', label: this.$t('inventoryAdj.dt.mfgName'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('inventoryAdj.dt.originCountry'), minWidth: 100 },
        { prop: 'approvalNumber', label: this.$t('inventoryAdj.dt.approvalNumber'), minWidth: 100 },
        { prop: 'brandName', label: this.$t('inventoryAdj.dt.brandName'), minWidth: 100 },
        { prop: 'tempControlName', label: this.$t('inventoryAdj.dt.tempControlName'), minWidth: 100 },
        { prop: 'validityDay', label: this.$t('inventoryAdj.dt.validityDay'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('inventoryAdj.dt.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('inventoryAdj.dt.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('inventoryAdj.dt.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('inventoryAdj.dt.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('inventoryAdj.dt.invalidDate'), minWidth: 100 },
        { prop: 'sterileNo', label: this.$t('inventoryAdj.dt.sterileNo'), minWidth: 100 },
        { prop: 'sterileInvaliDate', label: this.$t('inventoryAdj.dt.sterileInvaliDate'), minWidth: 100 }

      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('inventoryAdj.adjNo'), value: 'adjNo', type: 'input', readonly: true },
        { label: this.$t('inventoryAdj.ownerName'), value: 'ownerName', type: 'input', readonly: true },
        { label: this.$t('inventoryAdj.adjStatusName'), value: 'adjStatusName', type: 'input', readonly: true },
        { label: this.$t('inventoryAdj.sourceTypeName'), value: 'sourceTypeName', type: 'input', readonly: true },
        { label: this.$t('inventoryAdj.origNo'), value: 'origNo', type: 'input' },
        { label: this.$t('inventoryAdj.adjReason'), value: 'adjReason', type: 'input' },
        { label: this.$t('inventoryAdj.auditorName'), value: 'auditorName', type: 'input', readonly: true },
        { label: this.$t('inventoryAdj.auditTime'), value: 'auditTime', type: 'input', readonly: true },
        { label: this.$t('inventoryAdj.unauditorName'), value: 'unauditorName', type: 'input', readonly: true },
        { label: this.$t('inventoryAdj.unauditTime'), value: 'unauditTime', type: 'input', readonly: true },
        { label: this.$t('inventoryAdj.remark'), value: 'remark', type: 'input' },
        { label: this.$t('inventoryAdj.createName'), value: 'createName', type: 'input', readonly: true },
        { label: this.$t('inventoryAdj.createTime'), value: 'createTime', type: 'input', readonly: true },
        { label: this.$t('inventoryAdj.updateName'), value: 'updateName', type: 'input', readonly: true },
        { label: this.$t('inventoryAdj.updateTime'), value: 'updateTime', type: 'input', readonly: true }
      ]
      // 明细数据
      this.diaFormInfo.subTableInfo.fieldList = [
        { label: '序号', type: 'seq', width: 50 },
        { prop: 'lineNum', label: this.$t('inventoryAdj.dt.lineNum'), minWidth: 100 },
        { prop: 'zoneName', label: this.$t('inventoryAdj.dt.zoneName'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('inventoryAdj.dt.lotCode'), minWidth: 100 },
        { prop: 'planPdQty', label: this.$t('inventoryAdj.dt.planPdQty'), minWidth: 100 },
        { prop: 'adjQty', label: this.$t('inventoryAdj.dt.adjQty'), minWidth: 100, edit: { 'name': 'input' }},
        { prop: 'origLineNum', label: this.$t('inventoryAdj.dt.origLineNum'), minWidth: 100 },

        { prop: 'skuCode', label: this.$t('inventoryAdj.dt.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('inventoryAdj.dt.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('inventoryAdj.dt.skuName'), minWidth: 100 },
        { prop: 'tradeName', label: this.$t('inventoryAdj.dt.tradeName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('inventoryAdj.dt.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('inventoryAdj.dt.mainUnit'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('inventoryAdj.dt.drugForm'), minWidth: 100 },
        { prop: 'mfgName', label: this.$t('inventoryAdj.dt.mfgName'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('inventoryAdj.dt.originCountry'), minWidth: 100 },
        { prop: 'approvalNumber', label: this.$t('inventoryAdj.dt.approvalNumber'), minWidth: 100 },
        { prop: 'brandName', label: this.$t('inventoryAdj.dt.brandName'), minWidth: 100 },
        { prop: 'tempControlName', label: this.$t('inventoryAdj.dt.tempControlName'), minWidth: 100 },
        { prop: 'validityDay', label: this.$t('inventoryAdj.dt.validityDay'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('inventoryAdj.dt.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('inventoryAdj.dt.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('inventoryAdj.dt.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('inventoryAdj.dt.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('inventoryAdj.dt.invalidDate'), minWidth: 100 },
        { prop: 'sterileNo', label: this.$t('inventoryAdj.dt.sterileNo'), minWidth: 100 },
        { prop: 'sterileInvaliDate', label: this.$t('inventoryAdj.dt.sterileInvaliDate'), minWidth: 100 }

      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        ownerId: [{ required: true, message: this.$t('inventory.msg.ownerId'), trigger: 'blur' }],
        adjNo: [{ required: true, message: this.$t('inventoryAdj.msg.adjNo'), trigger: 'blur' }],
        adjStatus: [{ required: true, message: this.$t('inventoryAdj.msg.adjStatus'), trigger: 'blur' }],
        sourceType: [{ required: true, message: this.$t('inventoryAdj.msg.sourceType'), trigger: 'blur' }],
        adjReason: [{ required: true, message: this.$t('inventoryAdj.msg.adjReason'), trigger: 'blur' }]

      }

      this.diaFormInfo.subTableInfo.rules = {
        adjQty: [{
          required: true,
          message: this.$t('inventoryAdj.msg.dt.adjQty'),
          trigger: 'blur' },
        { max: 10, message: '最大长度10个字符' },
        { pattern: /^-?[1-9]\d*$/, message: '只能输入非0整数' }]

      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        adjNo: null,
        creator: null,
        adjStatus: null,
        createTime: null,
        auditorName: null,
        ownerId: null,
        auditor: null,
        sourceType: null,
        remark: null,
        origNo: null,
        origId: null,
        updateName: null,
        updater: null,
        auditTime: null,
        optimistic: null,
        updateTime: null,
        whId: null,
        unauditorName: null,
        companyCode: null,
        unauditor: null,
        adjReason: null,
        unauditTime: null,
        createName: null,
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
