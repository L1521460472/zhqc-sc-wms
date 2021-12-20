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
          frozenNo: null,
          frozenStatus: null,
          ownerId: null,
          zoneId: null,
          lotId: null,
          whAreaId: null,
          barcode: null,
          frozenType: null,
          sourceType: null,
          origNo: null,
          createTimeStart: null,
          createTimeEnd: null,
          auditTimeStart: null,
          auditTimeEnd: null,
          createName: null,
          auditorName: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        frozenSourceTypeList: [],
        frozenStatusList: [],
        frozenTypeAddList: [],
        frozenTypeList: []
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
          handle: null
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
          // handle: {//表格自定义按钮
          //   width: '0',//默认操作按钮列宽度
          //   btList: []
          // },
          handle: null
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

    collapsableFormMore() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('inventoryFrozen.frozenNo'), value: 'frozenNo', type: 'input' },
        { label: this.$t('inventoryFrozen.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('inventoryFrozen.dt.lotCode'), value: 'lotId', type: 'slot' },
        { label: this.$t('inventoryFrozen.dt.barcode'), value: 'barcode', type: 'input' },
        { label: this.$t('inventoryFrozen.salesWarehouse'), value: 'whAreaId', type: 'slot' },
        { label: this.$t('inventoryFrozen.frozenType'), value: 'frozenType', type: 'select', list: 'frozenTypeList' },
        { label: this.$t('inventoryFrozen.frozenStatus'), value: 'frozenStatus', type: 'select', list: 'frozenStatusList' },
        { label: this.$t('inventoryFrozen.sourceType'), value: 'sourceType', type: 'select', list: 'frozenSourceTypeList' },
        { label: this.$t('inventoryFrozen.createTimeStart'), value: 'createTimeStart', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm', valueFormat: 'yyyy-MM-dd HH:mm' },
        { label: this.$t('inventoryFrozen.createTimeEnd'), value: 'createTimeEnd', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm', valueFormat: 'yyyy-MM-dd HH:mm' },
        { label: this.$t('inventoryFrozen.auditTimeStart'), value: 'auditTimeStart', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm', valueFormat: 'yyyy-MM-dd HH:mm' },
        { label: this.$t('inventoryFrozen.auditTimeEnd'), value: 'auditTimeEnd', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm', valueFormat: 'yyyy-MM-dd HH:mm' },
        { label: this.$t('inventoryFrozen.createName'), value: 'createName', type: 'input' },
        { label: this.$t('inventoryFrozen.auditor'), value: 'auditorName', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('inventoryFrozen.frozenNo'), value: 'frozenNo', type: 'input' },
        { label: this.$t('inventoryFrozen.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('inventoryFrozen.dt.lotCode'), value: 'lotId', type: 'slot' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: '', type: 'selection', width: 50 }, // 序列
        { prop: 'frozenNo', label: this.$t('inventoryFrozen.frozenNo'), minWidth: 120 },
        { prop: 'frozenStatusName', label: this.$t('inventoryFrozen.frozenStatus'), minWidth: 100 },
        { prop: 'frozenSourceTypeName', label: this.$t('inventoryFrozen.frozenSourceTypeName'), minWidth: 100 },
        { prop: 'origNo', label: this.$t('inventoryFrozen.origNo'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('inventoryFrozen.ownerName'), minWidth: 150 },
        { prop: 'frozenTypeName', label: this.$t('inventoryFrozen.frozenTypeName'), minWidth: 150 },
        { prop: 'createName', label: this.$t('inventoryFrozen.createName'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('inventoryFrozen.createTime'), minWidth: 150 },
        { prop: 'auditorName', label: this.$t('inventoryFrozen.auditorName'), minWidth: 100 },
        { prop: 'auditTime', label: this.$t('inventoryFrozen.auditTime'), minWidth: 150 },
        { label: '操作', value: 'status', width: 200, type: 'slot', fixed: 'right', align: 'left' }
      ]
    },
    // 增加产品明细参照初始化数据
    initTopFormInvColumns() {
      // 初始化top表单
      this.dialogInfoInv.topFormInv.fieldList = [
        { label: this.$t('inventoryFrozen.dt.zoneId'), value: 'zoneId', type: 'slot' },
        { label: this.$t('inventoryFrozen.dt.lotCode'), value: 'lotId', type: 'slot' },
        { label: this.$t('inventoryFrozen.dt.barcode'), value: 'barcode', type: 'input' },
        { label: this.$t('inventoryFrozen.dt.skuName'), value: 'skuName', type: 'input' },
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
        { prop: 'lotCode', label: this.$t('inventoryFrozen.dt.lotCode'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('inventoryFrozen.dt.skuCode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('inventoryFrozen.dt.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('inventoryFrozen.dt.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('inventoryFrozen.dt.mainUnit'), minWidth: 100 },
        { prop: 'planPdQty', label: this.$t('inventoryFrozen.dt.planPdQty'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('inventoryFrozen.dt.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('inventoryFrozen.dt.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('inventoryFrozen.dt.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('inventoryFrozen.dt.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('inventoryFrozen.dt.invalidDate'), minWidth: 100 }
      ]
    },

    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('inventoryFrozen.frozenNo'), value: 'frozenNo', type: 'input', readonly: true },
        { label: this.$t('inventoryFrozen.ownerName'), value: 'ownerName', type: 'input', readonly: true },
        { label: this.$t('inventoryFrozen.salesWarehouse'), value: 'whAreaName', type: 'input', readonly: true },
        { label: this.$t('inventoryFrozen.frozenSourceTypeName'), value: 'frozenSourceTypeName', type: 'input', readonly: true },
        { label: this.$t('inventoryFrozen.frozenType'), value: 'frozenTypeName', type: 'input', readonly: true },
        { label: this.$t('inventoryFrozen.frozenStatus'), value: 'frozenSourceTypeName', type: 'input', readonly: true },
        { label: this.$t('inventoryFrozen.createName'), value: 'createName', type: 'input', readonly: true },
        { label: this.$t('inventoryFrozen.createTime'), value: 'createTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm', valueFormat: 'yyyy-MM-dd HH:mm', disabled: true },
        { label: this.$t('inventoryFrozen.auditorName'), value: 'auditorName', type: 'input', readonly: true },
        { label: this.$t('inventoryFrozen.auditTime'), value: 'auditTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm', valueFormat: 'yyyy-MM-dd HH:mm', disabled: true },
        { label: this.$t('inventoryFrozen.remark'), value: 'remark', type: 'textarea', readonly: true }
      ]
      // 明细数据
      this.diaFormInfo.subTableInfo.fieldList = [
        { label: '序号', type: 'seq', width: 50 },
        { prop: 'lineNum', label: this.$t('inventoryFrozen.dt.lineNum'), minWidth: 100 },
        { prop: 'zoneName', label: this.$t('inventoryFrozen.dt.zoneName'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('inventoryFrozen.dt.lotCode'), minWidth: 100 },
        { prop: 'planPdQty', label: this.$t('inventoryFrozen.dt.planPdQty'), minWidth: 100 },
        { prop: 'frozenQty', label: this.$t('inventoryFrozen.dt.frozenQty'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('inventoryFrozen.dt.productionDate'), minWidth: 100 },

        { prop: 'skuCode', label: this.$t('inventoryFrozen.dt.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('inventoryFrozen.dt.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('inventoryFrozen.dt.skuName'), minWidth: 100 },
        { prop: 'tradeName', label: this.$t('inventoryFrozen.dt.tradeName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('inventoryFrozen.dt.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('inventoryFrozen.dt.mainUnit'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('inventoryFrozen.dt.drugForm'), minWidth: 100 },
        { prop: 'mfgName', label: this.$t('inventoryFrozen.dt.mfgName'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('inventoryFrozen.dt.originCountry'), minWidth: 100 },
        { prop: 'approvalNumber', label: this.$t('inventoryFrozen.dt.approvalNumber'), minWidth: 100 },
        { prop: 'brandName', label: this.$t('inventoryFrozen.dt.brandName'), minWidth: 100 },
        { prop: 'tempControlName', label: this.$t('inventoryFrozen.dt.tempControlName'), minWidth: 100 },
        { prop: 'validityDay', label: this.$t('inventoryFrozen.dt.validityDay'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('inventoryFrozen.dt.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('inventoryFrozen.dt.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('inventoryFrozen.dt.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('inventoryFrozen.dt.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('inventoryFrozen.dt.invalidDate'), minWidth: 100 },
        { prop: 'sterileNo', label: this.$t('inventoryFrozen.dt.sterileNo'), minWidth: 100 },
        { prop: 'sterileInvaliDate', label: this.$t('inventory.dt.sterileInvaliDate'), minWidth: 100 }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        // { label: this.$t('inventoryFrozen.frozenNo'), value: 'frozenNo', type: 'input' },
        { label: this.$t('inventoryFrozen.ownerName'), value: 'ownerId', type: 'slot' },
        { label: this.$t('inventoryFrozen.salesWarehouse'), value: 'whAreaId', link: 'whAreaName', type: 'slot' },
        { label: this.$t('inventoryFrozen.sourceType'), value: 'sourceType', type: 'select', list: 'frozenSourceTypeList', disabled: true },
        { label: this.$t('inventoryFrozen.frozenType'), value: 'frozenType', type: 'select', list: 'frozenTypeAddList' },
        { label: this.$t('inventoryFrozen.frozenStatus'), value: 'frozenStatus', type: 'select', list: 'frozenStatusList', disabled: true },
        { label: this.$t('inventoryFrozen.creator'), value: 'creator', type: 'input', readonly: true },
        { label: this.$t('inventoryFrozen.createTime'), value: 'createTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm', valueFormat: 'yyyy-MM-dd HH:mm', disabled: true },
        { label: this.$t('inventoryFrozen.auditorName'), value: 'auditor', type: 'input', readonly: true },
        { label: this.$t('inventoryFrozen.auditTime'), value: 'auditTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm', valueFormat: 'yyyy-MM-dd HH:mm', disabled: true },
        { label: this.$t('inventoryFrozen.remark'), value: 'remark', type: 'textarea' }
      ]
      // 明细数据
      this.diaFormInfo.subTableInfo.fieldList = [
        { label: '序号', type: 'seq', width: 50 },
        { prop: 'lineNum', label: this.$t('inventoryFrozen.dt.lineNum'), minWidth: 100 },
        { prop: 'zoneName', label: this.$t('inventoryFrozen.dt.zoneName'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('inventoryFrozen.dt.lotCode'), minWidth: 100 },
        { prop: 'planPdQty', label: this.$t('inventoryFrozen.dt.planPdQty'), minWidth: 100 },
        { prop: 'frozenQty', label: this.$t('inventoryFrozen.dt.frozenQty'), minWidth: 100, edit: { 'name': 'input' }},

        { prop: 'skuCode', label: this.$t('inventoryFrozen.dt.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('inventoryFrozen.dt.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('inventoryFrozen.dt.skuName'), minWidth: 100 },
        { prop: 'tradeName', label: this.$t('inventoryFrozen.dt.tradeName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('inventoryFrozen.dt.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('inventoryFrozen.dt.mainUnit'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('inventoryFrozen.dt.drugForm'), minWidth: 100 },
        { prop: 'mfgName', label: this.$t('inventoryFrozen.dt.mfgName'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('inventoryFrozen.dt.originCountry'), minWidth: 100 },
        { prop: 'approvalNumber', label: this.$t('inventoryFrozen.dt.approvalNumber'), minWidth: 100 },
        { prop: 'brandName', label: this.$t('inventoryFrozen.dt.brandName'), minWidth: 100 },
        { prop: 'tempControlName', label: this.$t('inventoryFrozen.dt.tempControlName'), minWidth: 100 },
        { prop: 'validityDay', label: this.$t('inventoryFrozen.dt.validityDay'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('inventoryFrozen.dt.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('inventoryFrozen.dt.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('inventoryFrozen.dt.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('inventoryFrozen.dt.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('inventoryFrozen.dt.invalidDate'), minWidth: 100 },
        { prop: 'sterileNo', label: this.$t('inventoryFrozen.dt.sterileNo'), minWidth: 100 },
        { prop: 'sterileInvaliDate', label: this.$t('inventory.dt.sterileInvaliDate'), minWidth: 100 }
      ]
      //
      this.diaFormInfo.subTableInfo.handle = { // 表格自定义按钮
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
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('inventoryFrozen.frozenNo'), value: 'frozenNo', type: 'input', readonly: true },
        { label: this.$t('inventoryFrozen.ownerName'), value: 'ownerName', type: 'input', readonly: true },
        { label: this.$t('inventoryFrozen.salesWarehouse'), value: 'whAreaId', link: 'whAreaName', type: 'slot' },
        { label: this.$t('inventoryFrozen.sourceType'), value: 'sourceType', type: 'select', list: 'frozenSourceTypeList', disabled: true },
        { label: this.$t('inventoryFrozen.frozenType'), value: 'frozenType', type: 'select', list: 'frozenTypeAddList' },
        { label: this.$t('inventoryFrozen.frozenStatus'), value: 'frozenStatus', type: 'select', list: 'frozenStatusList', disabled: true },
        { label: this.$t('inventoryFrozen.createName'), value: 'createName', type: 'input', readonly: true },
        { label: this.$t('inventoryFrozen.createTime'), value: 'createTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm', valueFormat: 'yyyy-MM-dd HH:mm', disabled: true },
        { label: this.$t('inventoryFrozen.auditorName'), value: 'auditorName', type: 'input', readonly: true },
        { label: this.$t('inventoryFrozen.auditTime'), value: 'auditTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm', valueFormat: 'yyyy-MM-dd HH:mm', disabled: true },
        { label: this.$t('inventoryFrozen.remark'), value: 'remark', type: 'textarea' }
      ]
      // 明细数据
      this.diaFormInfo.subTableInfo.fieldList = [
        { label: '序号', type: 'seq', width: 50 },
        { prop: 'lineNum', label: this.$t('inventoryFrozen.dt.lineNum'), minWidth: 100 },
        { prop: 'zoneName', label: this.$t('inventoryFrozen.dt.zoneId'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('inventoryFrozen.dt.lotCode'), minWidth: 100 },
        { prop: 'planPdQty', label: this.$t('inventoryFrozen.dt.planPdQty'), minWidth: 100 },
        { prop: 'frozenQty', label: this.$t('inventoryFrozen.dt.frozenQty'), minWidth: 100, edit: { 'name': 'input' }},

        { prop: 'skuCode', label: this.$t('inventoryFrozen.dt.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('inventoryFrozen.dt.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('inventoryFrozen.dt.skuName'), minWidth: 100 },
        { prop: 'tradeName', label: this.$t('inventoryFrozen.dt.tradeName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('inventoryFrozen.dt.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('inventoryFrozen.dt.mainUnit'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('inventoryFrozen.dt.drugForm'), minWidth: 100 },
        { prop: 'mfgName', label: this.$t('inventoryFrozen.dt.mfgName'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('inventoryFrozen.dt.originCountry'), minWidth: 100 },
        { prop: 'approvalNumber', label: this.$t('inventoryFrozen.dt.approvalNumber'), minWidth: 100 },
        { prop: 'brandName', label: this.$t('inventoryFrozen.dt.brandName'), minWidth: 100 },
        { prop: 'tempControlName', label: this.$t('inventoryFrozen.dt.tempControlName'), minWidth: 100 },
        { prop: 'validityDay', label: this.$t('inventoryFrozen.dt.validityDay'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('inventoryFrozen.dt.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('inventoryFrozen.dt.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('inventoryFrozen.dt.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('inventoryFrozen.dt.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('inventoryFrozen.dt.invalidDate'), minWidth: 100 },
        { prop: 'sterileNo', label: this.$t('inventoryFrozen.dt.sterileNo'), minWidth: 100 },
        { prop: 'sterileInvaliDate', label: this.$t('inventory.dt.sterileInvaliDate'), minWidth: 100 }
      ]
      //
      this.diaFormInfo.subTableInfo.handle = { // 表格自定义按钮
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
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        ownerId: [{ required: true, message: this.$t('inventoryFrozen.msg.ownerId'), trigger: 'blur' }],
        whAreaId: [{ required: true, message: this.$t('inventoryFrozen.msg.whAreaId'), trigger: 'blur' }],
        frozenType: [{ required: true, message: this.$t('inventoryFrozen.msg.adjReason'), trigger: 'blur' }]
      }
      this.diaFormInfo.subTableInfo.rules = {
        frozenQty: [{
          required: true,
          message: this.$t('inventoryFrozen.msg.dt.frozenQty'),
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
        createTime: null,
        auditorName: null,
        ownerId: null,
        whAreaId: null,
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
    /**
     * 重置
     */
    reboot() {
      const obj = this.topForm.data
      Reflect.ownKeys(obj).forEach(key => {
        obj[key] = null
      })
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
