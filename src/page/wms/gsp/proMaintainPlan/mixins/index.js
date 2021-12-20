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
          planNo: null,
          maintainType: null,
          planOrigin: null,
          zoneId: null,
          lotId: null,
          lotCode: null,
          ownerId: null,
          creator: null,
          createTimeFrom: null,
          createTimeTo: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        maintainTypeList: [],
        maintainStatusList: [],
        maintainPlanOriginList: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '210', // 默认操作按钮列宽度
          btList: [// 添加操作按钮
            // 默认查看按钮
            { label: this.$t('table.view'), type: 'primary', icon: '', event: 'openViewPage', show: true, disabled: this.$hasPerm('view') }, // event值为notification.js中定义的方法名
            // 默认修改按钮
            { label: this.$t('table.edit'), type: 'success', icon: '', event: 'openEditPage', show: true, disabled: this.$hasPerm('edit') }, // event值为notification.js中定义的方法名
            // 默认删除按钮
            { label: this.$t('table.delete'), type: 'danger', icon: '', event: 'deleteData', show: true, disabled: this.$hasPerm('delete') }// event值为notification.js中定义的方法名
          ]
        }
      },
      //
      // 弹窗表单
      diaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        subTableInfo: {
          topBtn: { label: '增加养护明细', show: true, type: 'primary', disabled: false, loading: false, event: 'openDiaInv' },
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
            maintainType: null,
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
      inStockProList: [], // 存放在选中在库产品对象集合
      distinctList: [], // 用于去重
      tempDistinctList: []// 用于去重
    }
  },
  mounted() {
    this.collapsableForm()// 初始化表单--展开收起
    this.initTopFormColumns()// 初始化查询界面配置数据
    this.initTopFormInvColumns()
    this.rulesInit()// 初始化diaFormInfo表单字段校验规则
  },
  methods: {
    collapsableFormMore() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('proMaintainPlan.planNo'), value: 'planNo', type: 'input' },
        { label: this.$t('proMaintainPlan.maintainType'), value: 'maintainType', type: 'select', list: 'maintainTypeList' },
        { label: this.$t('proMaintainPlan.planOrigin'), value: 'planOrigin', type: 'select', list: 'maintainPlanOriginList' },
        { label: this.$t('proMaintainPlan.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('proMaintainPlan.zoneId'), value: 'zoneId', type: 'slot' },
        { label: this.$t('proMaintainPlan.lotId'), value: 'lotId', type: 'slot' },
        { label: this.$t('proMaintainPlan.creator'), value: 'creator', type: 'input' },
        { label: this.$t('proMaintainPlan.createTimeFrom'), value: 'createTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('proMaintainPlan.createTimeTo'), value: 'createTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('proMaintainPlan.planNo'), value: 'planNo', type: 'input' },
        { label: this.$t('proMaintainPlan.maintainType'), value: 'maintainType', type: 'select', list: 'maintainTypeList' },
        { label: this.$t('proMaintainPlan.planOrigin'), value: 'planOrigin', type: 'select', list: 'maintainPlanOriginList' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
      this.topForm.data.ownerId = null
      this.topForm.data.zoneId = null
      this.topForm.data.lotId = null
    },
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'planNo', label: this.$t('proMaintainPlan.planNo'), minWidth: 130 },
        { prop: 'planOriginName', label: this.$t('proMaintainPlan.planOrigin'), minWidth: 100 },
        { prop: 'maintainTypeName', label: this.$t('proMaintainPlan.maintainType'), minWidth: 100 },
        { prop: 'statusName', label: this.$t('proMaintainPlan.status'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('proMaintainPlan.ownerName'), minWidth: 100 },
        { prop: 'zoneName', label: this.$t('proMaintainPlan.zoneName'), minWidth: 100 },
        { prop: 'skuNum', label: this.$t('proMaintainPlan.skuNum'), minWidth: 100 },
        { prop: 'totalQty', label: this.$t('proMaintainPlan.totalQty'), minWidth: 100 },
        { prop: 'remark', label: this.$t('proMaintainPlan.remark'), minWidth: 100 },
        { prop: 'createName', label: this.$t('proMaintainPlan.createName'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('proMaintainPlan.createTime'), minWidth: 100 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('proMaintainPlan.ownerId'), value: 'ownerName', type: 'input', readonly: true },
        { label: this.$t('proMaintainPlan.zoneId'), value: 'zoneName', type: 'input', readonly: true },
        { label: this.$t('proMaintainPlan.maintainType'), value: 'maintainTypeName', type: 'input', readonly: true },
        { label: this.$t('proMaintainPlan.skuNum'), value: 'skuNum', type: 'input', readonly: true },
        { label: this.$t('proMaintainPlan.totalQty'), value: 'totalQty', type: 'input', readonly: true },
        { label: this.$t('proMaintainPlan.status'), value: 'statusName', type: 'input', readonly: true },
        { label: this.$t('proMaintainPlan.auditUser'), value: 'auditUser', type: 'input', readonly: true },
        { label: this.$t('proMaintainPlan.auditTime'), value: 'auditTime', type: 'input', readonly: true },
        { label: this.$t('proMaintainPlan.remark'), value: 'remark', type: 'textarea', disabled: true }
      ]
      // 明细数据
      this.diaFormInfo.subTableInfo.fieldList = [
        { label: '序列', type: 'index', width: 50 }, // 序列
        { prop: 'zoneName', label: this.$t('proMaintainPlan.dt.zoneName'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('proMaintainPlan.dt.lotCode'), minWidth: 100 },

        { prop: 'baseSku.skuCode', label: this.$t('proMaintainPlan.dt.skuCode'), minWidth: 100 },
        { prop: 'baseSku.barcode', label: this.$t('proMaintainPlan.dt.barcode'), minWidth: 100 },
        { prop: 'baseSku.skuName', label: this.$t('proMaintainPlan.dt.skuName'), minWidth: 100 },
        { prop: 'baseSku.tradeName', label: this.$t('proMaintainPlan.dt.tradeName'), minWidth: 100 },
        { prop: 'baseSku.spec', label: this.$t('proMaintainPlan.dt.spec'), minWidth: 100 },
        { prop: 'baseSku.mainUnit', label: this.$t('proMaintainPlan.dt.mainUnit'), minWidth: 100 },
        { prop: 'baseSku.perQty', label: this.$t('proMaintainPlan.dt.perQty'), minWidth: 100 },
        { prop: 'baseSku.drugForm', label: this.$t('proMaintainPlan.dt.drugForm'), minWidth: 100 },
        { prop: 'baseSku.mfgName', label: this.$t('proMaintainPlan.dt.mfgName'), minWidth: 100 },
        { prop: 'baseSku.originCountry', label: this.$t('proMaintainPlan.dt.originCountry'), minWidth: 100 },
        { prop: 'baseSku.approvalNumber', label: this.$t('proMaintainPlan.dt.approvalNumber'), minWidth: 100 },
        { prop: 'baseSku.brandName', label: this.$t('proMaintainPlan.dt.brandName'), minWidth: 100 },
        { prop: 'baseSku.tempControlName', label: this.$t('proMaintainPlan.dt.tempControlName'), minWidth: 100 },
        { prop: 'baseSku.validityDay', label: this.$t('proMaintainPlan.dt.validityDay'), minWidth: 100 },

        { prop: 'qty', label: this.$t('proMaintainPlan.dt.qty'), minWidth: 100 },
        { prop: 'maintainTypeName', label: this.$t('proMaintainPlan.dt.maintainType'), minWidth: 100 },
        { prop: 'lastTime', label: this.$t('proMaintainPlan.dt.lastTime'), minWidth: 120 },
        { prop: 'planBeginTime', label: this.$t('proMaintainPlan.dt.planBeginTime'), minWidth: 120 },
        { prop: 'planEndTime', label: this.$t('proMaintainPlan.dt.planEndTime'), minWidth: 120 },

        { prop: 'baseInvBatch.batchNo', label: this.$t('proMaintainPlan.dt.batchNo'), minWidth: 100 },
        { prop: 'baseInvBatch.productionBatch', label: this.$t('proMaintainPlan.dt.productionBatch'), minWidth: 100 },
        { prop: 'baseInvBatch.productionDate', label: this.$t('proMaintainPlan.dt.productionDate'), minWidth: 100 },
        { prop: 'baseInvBatch.instoreDate', label: this.$t('proMaintainPlan.dt.instoreDate'), minWidth: 100 },
        { prop: 'baseInvBatch.invalidDate', label: this.$t('proMaintainPlan.dt.invalidDate'), minWidth: 100 },
        { prop: 'baseInvBatch.sterileNo', label: this.$t('proMaintainPlan.dt.sterileNo'), minWidth: 100 },
        { prop: 'baseInvBatch.sterileInvaliDate', label: this.$t('proMaintainPlan.dt.sterileInvaliDate'), minWidth: 100 }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('proMaintainPlan.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('proMaintainPlan.zoneId'), value: 'zoneId', type: 'slot' },
        { label: this.$t('proMaintainPlan.maintainType'), value: 'maintainType', type: 'select', list: 'maintainTypeList', event: 'maintainTypeChange' },
        { label: this.$t('proMaintainPlan.skuNum'), value: 'skuNum', type: 'input', disabled: true },
        { label: this.$t('proMaintainPlan.totalQty'), value: 'totalQty', type: 'input', disabled: true },
        { label: this.$t('proMaintainPlan.remark'), value: 'remark', type: 'textarea' }
      ]
      // 明细数据
      this.diaFormInfo.subTableInfo.fieldList = [
        { label: '', type: 'selection', width: 50 }, // 序列
        { prop: 'zoneName', label: this.$t('proMaintainPlan.dt.zoneName'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('proMaintainPlan.dt.lotCode'), minWidth: 100 },

        { prop: 'baseSku.skuCode', label: this.$t('proMaintainPlan.dt.skuCode'), minWidth: 100 },
        { prop: 'baseSku.barcode', label: this.$t('proMaintainPlan.dt.barcode'), minWidth: 100 },
        { prop: 'baseSku.skuName', label: this.$t('proMaintainPlan.dt.skuName'), minWidth: 100 },
        { prop: 'baseSku.tradeName', label: this.$t('proMaintainPlan.dt.tradeName'), minWidth: 100 },
        { prop: 'baseSku.spec', label: this.$t('proMaintainPlan.dt.spec'), minWidth: 100 },
        { prop: 'baseSku.mainUnit', label: this.$t('proMaintainPlan.dt.mainUnit'), minWidth: 100 },
        { prop: 'baseSku.perQty', label: this.$t('proMaintainPlan.dt.perQty'), minWidth: 100 },
        { prop: 'baseSku.drugForm', label: this.$t('proMaintainPlan.dt.drugForm'), minWidth: 100 },
        { prop: 'baseSku.mfgName', label: this.$t('proMaintainPlan.dt.mfgName'), minWidth: 100 },
        { prop: 'baseSku.originCountry', label: this.$t('proMaintainPlan.dt.originCountry'), minWidth: 100 },
        { prop: 'baseSku.approvalNumber', label: this.$t('proMaintainPlan.dt.approvalNumber'), minWidth: 100 },
        { prop: 'baseSku.brandName', label: this.$t('proMaintainPlan.dt.brandName'), minWidth: 100 },
        { prop: 'baseSku.tempControlName', label: this.$t('proMaintainPlan.dt.tempControlName'), minWidth: 100 },
        { prop: 'baseSku.validityDay', label: this.$t('proMaintainPlan.dt.validityDay'), minWidth: 100 },

        { prop: 'qty', label: this.$t('proMaintainPlan.dt.qty'), minWidth: 100 },
        { prop: 'maintainTypeName', label: this.$t('proMaintainPlan.dt.maintainType'), minWidth: 100 },
        { prop: 'lastTime', label: this.$t('proMaintainPlan.dt.lastTime'), minWidth: 120 },
        { prop: 'planBeginTime', label: this.$t('proMaintainPlan.dt.planBeginTime'), minWidth: 120 },
        { prop: 'planEndTime', label: this.$t('proMaintainPlan.dt.planEndTime'), minWidth: 120 },

        { prop: 'baseInvBatch.batchNo', label: this.$t('proMaintainPlan.dt.batchNo'), minWidth: 100 },
        { prop: 'baseInvBatch.productionBatch', label: this.$t('proMaintainPlan.dt.productionBatch'), minWidth: 100 },
        { prop: 'baseInvBatch.productionDate', label: this.$t('proMaintainPlan.dt.productionDate'), minWidth: 100 },
        { prop: 'baseInvBatch.instoreDate', label: this.$t('proMaintainPlan.dt.instoreDate'), minWidth: 100 },
        { prop: 'baseInvBatch.invalidDate', label: this.$t('proMaintainPlan.dt.invalidDate'), minWidth: 100 },
        { prop: 'baseInvBatch.sterileNo', label: this.$t('proMaintainPlan.dt.sterileNo'), minWidth: 100 },
        { prop: 'baseInvBatch.sterileInvaliDate', label: this.$t('proMaintainPlan.dt.sterileInvaliDate'), minWidth: 100 }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('proMaintainPlan.ownerId'), value: 'ownerName', type: 'input', disabled: true },
        { label: this.$t('proMaintainPlan.zoneId'), value: 'zoneName', type: 'input', disabled: true },
        { label: this.$t('proMaintainPlan.maintainType'), value: 'maintainTypeName', type: 'input', disabled: true },
        { label: this.$t('proMaintainPlan.skuNum'), value: 'skuNum', type: 'input', disabled: true },
        { label: this.$t('proMaintainPlan.totalQty'), value: 'totalQty', type: 'input', disabled: true },
        { label: this.$t('proMaintainPlan.status'), value: 'statusName', type: 'input', disabled: true },
        { label: this.$t('proMaintainPlan.auditUser'), value: 'auditUser', type: 'input', disabled: true },
        { label: this.$t('proMaintainPlan.auditTime'), value: 'auditTime', type: 'input', disabled: true },
        { label: this.$t('proMaintainPlan.remark'), value: 'remark', type: 'textarea' }
      ]
      // 明细数据
      this.diaFormInfo.subTableInfo.fieldList = [
        { label: '', type: 'selection', width: 50 }, // 序列
        { prop: 'zoneName', label: this.$t('proMaintainPlan.dt.zoneName'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('proMaintainPlan.dt.lotCode'), minWidth: 100 },

        { prop: 'baseSku.skuCode', label: this.$t('proMaintainPlan.dt.skuCode'), minWidth: 100 },
        { prop: 'baseSku.barcode', label: this.$t('proMaintainPlan.dt.barcode'), minWidth: 100 },
        { prop: 'baseSku.skuName', label: this.$t('proMaintainPlan.dt.skuName'), minWidth: 100 },
        { prop: 'baseSku.tradeName', label: this.$t('proMaintainPlan.dt.tradeName'), minWidth: 100 },
        { prop: 'baseSku.spec', label: this.$t('proMaintainPlan.dt.spec'), minWidth: 100 },
        { prop: 'baseSku.mainUnit', label: this.$t('proMaintainPlan.dt.mainUnit'), minWidth: 100 },
        { prop: 'baseSku.perQty', label: this.$t('proMaintainPlan.dt.perQty'), minWidth: 100 },
        { prop: 'baseSku.drugForm', label: this.$t('proMaintainPlan.dt.drugForm'), minWidth: 100 },
        { prop: 'baseSku.mfgName', label: this.$t('proMaintainPlan.dt.mfgName'), minWidth: 100 },
        { prop: 'baseSku.originCountry', label: this.$t('proMaintainPlan.dt.originCountry'), minWidth: 100 },
        { prop: 'baseSku.approvalNumber', label: this.$t('proMaintainPlan.dt.approvalNumber'), minWidth: 100 },
        { prop: 'baseSku.brandName', label: this.$t('proMaintainPlan.dt.brandName'), minWidth: 100 },
        { prop: 'baseSku.tempControlName', label: this.$t('proMaintainPlan.dt.tempControlName'), minWidth: 100 },
        { prop: 'baseSku.validityDay', label: this.$t('proMaintainPlan.dt.validityDay'), minWidth: 100 },

        { prop: 'qty', label: this.$t('proMaintainPlan.dt.qty'), minWidth: 100 },
        { prop: 'maintainTypeName', label: this.$t('proMaintainPlan.dt.maintainType'), minWidth: 100 },
        { prop: 'lastTime', label: this.$t('proMaintainPlan.dt.lastTime'), minWidth: 120 },
        { prop: 'planBeginTime', label: this.$t('proMaintainPlan.dt.planBeginTime'), minWidth: 120 },
        { prop: 'planEndTime', label: this.$t('proMaintainPlan.dt.planEndTime'), minWidth: 120 },

        { prop: 'baseInvBatch.batchNo', label: this.$t('proMaintainPlan.dt.batchNo'), minWidth: 100 },
        { prop: 'baseInvBatch.productionBatch', label: this.$t('proMaintainPlan.dt.productionBatch'), minWidth: 100 },
        { prop: 'baseInvBatch.productionDate', label: this.$t('proMaintainPlan.dt.productionDate'), minWidth: 100 },
        { prop: 'baseInvBatch.instoreDate', label: this.$t('proMaintainPlan.dt.instoreDate'), minWidth: 100 },
        { prop: 'baseInvBatch.invalidDate', label: this.$t('proMaintainPlan.dt.invalidDate'), minWidth: 100 },
        { prop: 'baseInvBatch.sterileNo', label: this.$t('proMaintainPlan.dt.sterileNo'), minWidth: 100 },
        { prop: 'baseInvBatch.sterileInvaliDate', label: this.$t('proMaintainPlan.dt.sterileInvaliDate'), minWidth: 100 }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        zoneId: [{ required: true, message: this.$t('proMaintainPlan.msg.zoneId'), trigger: 'blur' }],
        ownerId: [{ required: true, message: this.$t('proMaintainPlan.msg.ownerId'), trigger: 'blur' }],
        maintainType: [{ required: true, message: this.$t('proMaintainPlan.msg.maintainType'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        // planNo:null,
        ownerId: null,
        zoneId: null,
        lotId: null,
        maintainType: null,
        skuNum: null,
        commodityQty: null,
        remark: null,
        status: null,
        auditUser: null,
        auditTime: null,
        dtList: []
      }
    },

    // 增加产品明细参照初始化数据
    initTopFormInvColumns() {
      // 初始化top表单
      this.dialogInfoInv.topFormInv.fieldList = [
        { label: this.$t('proMaintainPlan.invPro.ownerId'), value: 'ownerName', type: 'input', disabled: true },
        { label: this.$t('proMaintainPlan.invPro.zoneId'), value: 'zoneName', type: 'input', disabled: true },
        { label: this.$t('proMaintainPlan.invPro.maintainType'), value: 'maintainType', type: 'select', list: 'maintainTypeList', disabled: true },
        { label: this.$t('proMaintainPlan.invPro.lotId'), value: 'lotId', type: 'slot' },
        { label: this.$t('proMaintainPlan.invPro.skuId'), value: 'skuId', type: 'slot' },
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
        { prop: 'lotCode', label: this.$t('proMaintainPlan.invPro.lotId'), minWidth: 100 },

        { prop: 'baseSku.skuCode', label: this.$t('proMaintainPlan.invPro.skuCode'), minWidth: 100 },
        { prop: 'baseSku.barcode', label: this.$t('proMaintainPlan.invPro.barcode'), minWidth: 100 },
        { prop: 'baseSku.skuName', label: this.$t('proMaintainPlan.invPro.skuName'), minWidth: 100 },
        { prop: 'baseSku.tradeName', label: this.$t('proMaintainPlan.invPro.tradeName'), minWidth: 100 },
        { prop: 'baseSku.spec', label: this.$t('proMaintainPlan.invPro.spec'), minWidth: 100 },
        { prop: 'baseSku.mainUnit', label: this.$t('proMaintainPlan.invPro.mainUnit'), minWidth: 100 },
        { prop: 'baseSku.perQty', label: this.$t('proMaintainPlan.invPro.perQty'), minWidth: 100 },
        { prop: 'baseSku.drugForm', label: this.$t('proMaintainPlan.invPro.drugForm'), minWidth: 100 },
        { prop: 'baseSku.mfgName', label: this.$t('proMaintainPlan.invPro.mfgName'), minWidth: 100 },
        { prop: 'baseSku.originCountry', label: this.$t('proMaintainPlan.invPro.originCountry'), minWidth: 100 },
        { prop: 'baseSku.approvalNumber', label: this.$t('proMaintainPlan.invPro.approvalNumber'), minWidth: 100 },
        { prop: 'baseSku.brandName', label: this.$t('proMaintainPlan.invPro.brandName'), minWidth: 100 },
        { prop: 'baseSku.tempControlName', label: this.$t('proMaintainPlan.invPro.tempControlName'), minWidth: 100 },
        { prop: 'baseSku.validityDay', label: this.$t('proMaintainPlan.invPro.validityDay'), minWidth: 100 },

        { prop: 'qty', label: this.$t('proMaintainPlan.invPro.qty'), minWidth: 100 },
        { prop: 'maintainType', label: this.$t('proMaintainPlan.invPro.maintainType'), minWidth: 100 },
        { prop: 'maintenanceCycle', label: this.$t('proMaintainPlan.invPro.maintenanceCycle'), minWidth: 100 },

        { prop: 'baseInvBatch.batchNo', label: this.$t('proMaintainPlan.invPro.batchNo'), minWidth: 100 },
        { prop: 'baseInvBatch.productionBatch', label: this.$t('proMaintainPlan.invPro.productionBatch'), minWidth: 100 },
        { prop: 'baseInvBatch.productionDate', label: this.$t('proMaintainPlan.invPro.productionDate'), minWidth: 100 },
        { prop: 'baseInvBatch.instoreDate', label: this.$t('proMaintainPlan.invPro.instoreDate'), minWidth: 100 },
        { prop: 'baseInvBatch.invalidDate', label: this.$t('proMaintainPlan.invPro.invalidDate'), minWidth: 100 },
        { prop: 'baseInvBatch.sterileNo', label: this.$t('proMaintainPlan.invPro.sterileNo'), minWidth: 100 },
        { prop: 'baseInvBatch.sterileInvaliDate', label: this.$t('proMaintainPlan.invPro.sterileInvaliDate'), minWidth: 100 }
      ]
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
