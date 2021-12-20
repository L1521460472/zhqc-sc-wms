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
          proMaintainNo: null,
          proMaintainStatus: null,
          ownerId: null,
          creator: null,
          maintainUser: null,
          maintainUserId: null,
          auditUser: null,
          maintainDateFrom: null,
          maintainDateTo: null,
          auditTimeFrom: null,
          auditTimeTo: null,
          createTimeFrom: null,
          createTimeTo: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        proMaintainStatusList: [],
        maintainTypeList: [],
        proQualityStatusList: [],
        proMaintainMeasureList: [],
        proMaintainConclusionList: [],

        vxeProQualityStatusList: [],
        vxeProMaintainMeasureList: [],
        vxeProMaintainConclusionList: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '210', // 默认操作按钮列宽度
          btList: [
            { label: '查看', type: 'primary', icon: '', event: 'openViewPage', show: true, disabled: this.$hasPerm('view') },
            { label: '编辑', type: 'success', icon: '', event: 'openEditPage', show: true, disabled: this.$hasPerm('edit') },
            { label: '更多', type: 'warning', icon: 'el-icon-more', event: '', btShow: true,
              moreList: [
                { label: '删除', type: 'danger', icon: '', event: 'deleteData', show: true, disabled: this.$hasPerm('delete') },
                { label: '审核', type: 'primary', icon: '', show: true, event: 'audit', disabled: this.$hasPerm('audit') },
                { label: '取消审核', type: 'primary', icon: '', show: true, event: 'cancelAudit', disabled: this.$hasPerm('cancelAudit') }
              ] }
          ]
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
            barcode: null,
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
    this.rulesInit()// 初始化diaFormInfo表单字段校验规则
  },
  methods: {
    collapsableFormMore() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('proMaintain.proMaintainNo'), value: 'proMaintainNo', type: 'input' },
        { label: this.$t('proMaintain.proMaintainStatus'), value: 'proMaintainStatus', type: 'select', list: 'proMaintainStatusList' },
        { label: this.$t('proMaintain.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('proMaintain.creator'), value: 'creator', type: 'input' },
        { label: this.$t('proMaintain.maintainUser'), value: 'maintainUserId', type: 'slot' },
        { label: this.$t('proMaintain.auditUser'), value: 'auditUser', type: 'input' },
        { label: this.$t('proMaintain.maintainDateFrom'), value: 'maintainDateFrom', type: 'date', dateType: 'date', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd' },
        { label: this.$t('proMaintain.maintainDateTo'), value: 'maintainDateTo', type: 'date', dateType: 'date', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd' },
        { label: this.$t('proMaintain.auditTimeFrom'), value: 'auditTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('proMaintain.auditTimeTo'), value: 'auditTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('proMaintain.createTimeFrom'), value: 'createTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('proMaintain.createTimeTo'), value: 'createTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('proMaintain.proMaintainNo'), value: 'proMaintainNo', type: 'input' },
        { label: this.$t('proMaintain.proMaintainStatus'), value: 'proMaintainStatus', type: 'select', list: 'proMaintainStatusList' },
        { label: this.$t('proMaintain.ownerId'), value: 'ownerId', type: 'slot' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
      this.topForm.data.maintainUserId = null
    },
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'proMaintainNo', label: this.$t('proMaintain.proMaintainNo'), minWidth: 130 },
        { prop: 'proMaintainStatusName', label: this.$t('proMaintain.proMaintainStatus'), minWidth: 100 },
        { prop: 'maintainTypeName', label: this.$t('proMaintain.maintainType'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('proMaintain.ownerId'), minWidth: 100 },
        { prop: 'maintainDate', label: this.$t('proMaintain.maintainDate'), minWidth: 100 },
        { prop: 'maintainUserName', label: this.$t('proMaintain.maintainUserName'), minWidth: 100 },
        { prop: 'auditUserName', label: this.$t('proMaintain.auditUser'), minWidth: 100 },
        { prop: 'auditTime', label: this.$t('proMaintain.auditTime'), minWidth: 100 },
        { prop: 'createName', label: this.$t('proMaintain.creator'), minWidth: 100 },
        { prop: 'remark', label: this.$t('proMaintain.remark'), minWidth: 100 },
        { label: '操作', value: 'status', width: 200, type: 'slot', fixed: 'right', align: 'left' }
      ]
    },

    // 增加产品明细参照初始化数据
    initTopFormInvColumns() {
      // 初始化top表单
      this.dialogInfoInv.topFormInv.fieldList = [
        { label: this.$t('proMaintain.invPro.zoneName'), value: 'zoneId', type: 'slot' },
        { label: this.$t('proMaintain.invPro.lotCode'), value: 'lotId', type: 'slot' },
        { label: this.$t('proMaintain.invPro.skuId'), value: 'skuId', type: 'slot' },
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
        { prop: 'zoneName', label: this.$t('proMaintain.invPro.zoneName'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('proMaintain.invPro.lotCode'), minWidth: 100 },

        { prop: 'baseSku.skuCode', label: this.$t('proMaintain.invPro.skuCode'), minWidth: 100 },
        { prop: 'baseSku.barcode', label: this.$t('proMaintain.invPro.barcode'), minWidth: 100 },
        { prop: 'baseSku.skuName', label: this.$t('proMaintain.invPro.skuName'), minWidth: 100 },
        { prop: 'baseSku.tradeName', label: this.$t('proMaintain.invPro.tradeName'), minWidth: 100 },
        { prop: 'baseSku.spec', label: this.$t('proMaintain.invPro.spec'), minWidth: 100 },
        { prop: 'baseSku.mainUnit', label: this.$t('proMaintain.invPro.mainUnit'), minWidth: 100 },
        { prop: 'baseSku.perQty', label: this.$t('proMaintain.invPro.perQty'), minWidth: 100 },
        { prop: 'baseSku.drugForm', label: this.$t('proMaintain.invPro.drugForm'), minWidth: 100 },
        { prop: 'baseSku.mfgName', label: this.$t('proMaintain.invPro.mfgName'), minWidth: 100 },
        { prop: 'baseSku.originCountry', label: this.$t('proMaintain.invPro.originCountry'), minWidth: 100 },
        { prop: 'baseSku.approvalNumber', label: this.$t('proMaintain.invPro.approvalNumber'), minWidth: 100 },
        { prop: 'baseSku.brandName', label: this.$t('proMaintain.invPro.brandName'), minWidth: 100 },
        { prop: 'baseSku.tempControlName', label: this.$t('proMaintain.invPro.tempControlName'), minWidth: 100 },
        { prop: 'baseSku.validityDay', label: this.$t('proMaintain.invPro.validityDay'), minWidth: 100 },

        { prop: 'qty', label: this.$t('proMaintain.invPro.qty'), minWidth: 100 },

        { prop: 'baseInvBatch.batchNo', label: this.$t('proMaintain.invPro.batchNo'), minWidth: 100 },
        { prop: 'baseInvBatch.productionBatch', label: this.$t('proMaintain.invPro.productionBatch'), minWidth: 100 },
        { prop: 'baseInvBatch.productionDate', label: this.$t('proMaintain.invPro.productionDate'), minWidth: 100 },
        { prop: 'baseInvBatch.instoreDate', label: this.$t('proMaintain.invPro.instoreDate'), minWidth: 100 },
        { prop: 'baseInvBatch.invalidDate', label: this.$t('proMaintain.invPro.invalidDate'), minWidth: 100 },
        { prop: 'baseInvBatch.sterileNo', label: this.$t('proMaintain.invPro.sterileNo'), minWidth: 100 },
        { prop: 'baseInvBatch.sterileInvaliDate', label: this.$t('proMaintain.invPro.sterileInvaliDate'), minWidth: 100 }
      ]
    },

    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('proMaintain.ownerId'), value: 'ownerName', type: 'input', disabled: true },
        { label: this.$t('proMaintain.maintainType'), value: 'maintainType', type: 'select', list: 'maintainTypeList', disabled: true },
        { label: this.$t('proMaintain.proMaintainStatus'), value: 'proMaintainStatus', type: 'select', list: 'proMaintainStatusList', disabled: true },
        { label: this.$t('proMaintain.maintainDate'), value: 'maintainDate', type: 'input', disabled: true },
        { label: this.$t('proMaintain.maintainUser'), value: 'maintainUserName', type: 'input', disabled: true },
        { label: this.$t('proMaintain.auditUser'), value: 'auditUserName', type: 'input', disabled: true },
        { label: this.$t('proMaintain.auditTime'), value: 'auditTime', type: 'input', disabled: true },
        { label: this.$t('proMaintain.remark'), value: 'remark', type: 'textarea', disabled: true }
      ]
      // 明细数据
      this.diaFormInfo.subTableInfo.fieldList = [
        { label: '', type: 'checkbox', width: 50 }, // 序列
        { prop: 'zoneName', label: this.$t('proMaintain.dt.zoneName'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('proMaintain.dt.lotCode'), minWidth: 100 },

        { prop: 'baseSku.skuCode', label: this.$t('proMaintain.dt.skuCode'), minWidth: 100 },
        { prop: 'baseSku.barcode', label: this.$t('proMaintain.dt.barcode'), minWidth: 100 },
        { prop: 'baseSku.skuName', label: this.$t('proMaintain.dt.skuName'), minWidth: 100 },
        { prop: 'baseSku.tradeName', label: this.$t('proMaintain.dt.tradeName'), minWidth: 100 },
        { prop: 'baseSku.spec', label: this.$t('proMaintain.dt.spec'), minWidth: 100 },
        { prop: 'baseSku.mainUnit', label: this.$t('proMaintain.dt.mainUnit'), minWidth: 100 },
        { prop: 'baseSku.perQty', label: this.$t('proMaintain.dt.perQty'), minWidth: 100 },
        { prop: 'baseSku.drugForm', label: this.$t('proMaintain.dt.drugForm'), minWidth: 100 },
        { prop: 'baseSku.mfgName', label: this.$t('proMaintain.dt.mfgName'), minWidth: 100 },
        { prop: 'baseSku.originCountry', label: this.$t('proMaintain.dt.originCountry'), minWidth: 100 },
        { prop: 'baseSku.approvalNumber', label: this.$t('proMaintain.dt.approvalNumber'), minWidth: 100 },
        { prop: 'baseSku.brandName', label: this.$t('proMaintain.dt.brandName'), minWidth: 100 },
        { prop: 'baseSku.tempControlName', label: this.$t('proMaintain.dt.tempControlName'), minWidth: 100 },
        { prop: 'baseSku.validityDay', label: this.$t('proMaintain.dt.validityDay'), minWidth: 100 },

        { prop: 'qty', label: this.$t('proMaintain.dt.qty'), minWidth: 100 },
        { prop: 'qualityStatusName', label: this.$t('proMaintain.dt.qualityStatus'), minWidth: 100 },
        { prop: 'maintainMeasureName', label: this.$t('proMaintain.dt.maintainMeasure'), minWidth: 100 },
        { prop: 'maintainConclusionName', label: this.$t('proMaintain.dt.maintainConclusion'), minWidth: 100 },

        { prop: 'baseInvBatch.batchNo', label: this.$t('proMaintain.dt.batchNo'), minWidth: 100 },
        { prop: 'baseInvBatch.productionBatch', label: this.$t('proMaintain.dt.productionBatch'), minWidth: 100 },
        { prop: 'baseInvBatch.productionDate', label: this.$t('proMaintain.dt.productionDate'), minWidth: 100 },
        { prop: 'baseInvBatch.instoreDate', label: this.$t('proMaintain.dt.instoreDate'), minWidth: 100 },
        { prop: 'baseInvBatch.invalidDate', label: this.$t('proMaintain.dt.invalidDate'), minWidth: 100 },
        { prop: 'baseInvBatch.sterileNo', label: this.$t('proMaintain.dt.sterileNo'), minWidth: 100 },
        { prop: 'baseInvBatch.sterileInvaliDate', label: this.$t('proMaintain.dt.sterileInvaliDate'), minWidth: 100 }
      ]
    },

    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.$set(this.diaFormInfo.data, 'proMaintainStatus', 'CJ')

      this.diaFormInfo.fieldList = [
        { label: this.$t('proMaintain.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('proMaintain.maintainUser'), value: 'maintainUserId', type: 'slot' },
        { label: this.$t('proMaintain.maintainType'), value: 'maintainType', type: 'select', list: 'maintainTypeList', disabled: true },
        { label: this.$t('proMaintain.maintainDate'), value: 'maintainDate', type: 'date', dateType: 'date', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd' },
        { label: this.$t('proMaintain.remark'), value: 'remark', type: 'textarea' }
      ]
      // 明细数据
      this.diaFormInfo.subTableInfo.fieldList = [
        { label: '', type: 'checkbox', width: 50 }, // 序列
        { prop: 'zoneName', label: this.$t('proMaintain.dt.zoneName'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('proMaintain.dt.lotCode'), minWidth: 100 },

        { prop: 'baseSku.skuCode', label: this.$t('proMaintain.dt.skuCode'), minWidth: 100 },
        { prop: 'baseSku.barcode', label: this.$t('proMaintain.dt.barcode'), minWidth: 100 },
        { prop: 'baseSku.skuName', label: this.$t('proMaintain.dt.skuName'), minWidth: 100 },
        { prop: 'baseSku.tradeName', label: this.$t('proMaintain.dt.tradeName'), minWidth: 100 },
        { prop: 'baseSku.spec', label: this.$t('proMaintain.dt.spec'), minWidth: 100 },
        { prop: 'baseSku.mainUnit', label: this.$t('proMaintain.dt.mainUnit'), minWidth: 100 },
        { prop: 'baseSku.perQty', label: this.$t('proMaintain.dt.perQty'), minWidth: 100 },
        { prop: 'baseSku.drugForm', label: this.$t('proMaintain.dt.drugForm'), minWidth: 100 },
        { prop: 'baseSku.mfgName', label: this.$t('proMaintain.dt.mfgName'), minWidth: 100 },
        { prop: 'baseSku.originCountry', label: this.$t('proMaintain.dt.originCountry'), minWidth: 100 },
        { prop: 'baseSku.approvalNumber', label: this.$t('proMaintain.dt.approvalNumber'), minWidth: 100 },
        { prop: 'baseSku.brandName', label: this.$t('proMaintain.dt.brandName'), minWidth: 100 },
        { prop: 'baseSku.tempControlName', label: this.$t('proMaintain.dt.tempControlName'), minWidth: 100 },
        { prop: 'baseSku.validityDay', label: this.$t('proMaintain.dt.validityDay'), minWidth: 100 },

        { prop: 'qty', label: this.$t('proMaintain.dt.qty'), minWidth: 100 },
        { prop: 'qualityStatus', label: this.$t('proMaintain.dt.qualityStatus'), minWidth: 100, edit: { 'name': '$select', options: this.listTypeInfo.vxeProQualityStatusList, events: { 'change': this.selectChange }}},
        { prop: 'maintainMeasureList', label: this.$t('proMaintain.dt.maintainMeasure'), minWidth: 100, edit: { 'name': '$select', options: this.listTypeInfo.vxeProMaintainMeasureList, props: { 'multiple': true }, events: { 'change': this.selectChangePath }}},
        { prop: 'maintainConclusion', label: this.$t('proMaintain.dt.maintainConclusion'), minWidth: 100, edit: { 'name': '$select', options: this.listTypeInfo.vxeProMaintainConclusionList, events: { 'change': this.selectChangeOther }}},

        { prop: 'baseInvBatch.batchNo', label: this.$t('proMaintain.dt.batchNo'), minWidth: 100 },
        { prop: 'baseInvBatch.productionBatch', label: this.$t('proMaintain.dt.productionBatch'), minWidth: 100 },
        { prop: 'baseInvBatch.productionDate', label: this.$t('proMaintain.dt.productionDate'), minWidth: 100 },
        { prop: 'baseInvBatch.instoreDate', label: this.$t('proMaintain.dt.instoreDate'), minWidth: 100 },
        { prop: 'baseInvBatch.invalidDate', label: this.$t('proMaintain.dt.invalidDate'), minWidth: 100 },
        { prop: 'baseInvBatch.sterileNo', label: this.$t('proMaintain.dt.sterileNo'), minWidth: 100 },
        { prop: 'baseInvBatch.sterileInvaliDate', label: this.$t('proMaintain.dt.sterileInvaliDate'), minWidth: 100 }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('proMaintain.ownerId'), value: 'ownerName', type: 'input', disabled: true },
        { label: this.$t('proMaintain.maintainType'), value: 'maintainType', type: 'select', list: 'maintainTypeList', disabled: true },
        { label: this.$t('proMaintain.proMaintainStatus'), value: 'proMaintainStatus', type: 'select', list: 'proMaintainStatusList', disabled: true },
        { label: this.$t('proMaintain.maintainDate'), value: 'maintainDate', type: 'input', disabled: true },
        { label: this.$t('proMaintain.maintainUser'), value: 'maintainUserName', type: 'input', disabled: true },
        { label: this.$t('proMaintain.auditUser'), value: 'auditUserName', type: 'input', disabled: true },
        { label: this.$t('proMaintain.auditTime'), value: 'auditTime', type: 'input', disabled: true },
        { label: this.$t('proMaintain.remark'), value: 'remark', type: 'textarea' }
      ]
      // 明细数据
      this.diaFormInfo.subTableInfo.fieldList = [
        { label: '', type: 'checkbox', width: 50 }, // 序列
        { prop: 'zoneName', label: this.$t('proMaintain.dt.zoneName'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('proMaintain.dt.lotCode'), minWidth: 100 },

        { prop: 'baseSku.skuCode', label: this.$t('proMaintain.dt.skuCode'), minWidth: 100 },
        { prop: 'baseSku.barcode', label: this.$t('proMaintain.dt.barcode'), minWidth: 100 },
        { prop: 'baseSku.skuName', label: this.$t('proMaintain.dt.skuName'), minWidth: 100 },
        { prop: 'baseSku.tradeName', label: this.$t('proMaintain.dt.tradeName'), minWidth: 100 },
        { prop: 'baseSku.spec', label: this.$t('proMaintain.dt.spec'), minWidth: 100 },
        { prop: 'baseSku.mainUnit', label: this.$t('proMaintain.dt.mainUnit'), minWidth: 100 },
        { prop: 'baseSku.perQty', label: this.$t('proMaintain.dt.perQty'), minWidth: 100 },
        { prop: 'baseSku.drugForm', label: this.$t('proMaintain.dt.drugForm'), minWidth: 100 },
        { prop: 'baseSku.mfgName', label: this.$t('proMaintain.dt.mfgName'), minWidth: 100 },
        { prop: 'baseSku.originCountry', label: this.$t('proMaintain.dt.originCountry'), minWidth: 100 },
        { prop: 'baseSku.approvalNumber', label: this.$t('proMaintain.dt.approvalNumber'), minWidth: 100 },
        { prop: 'baseSku.brandName', label: this.$t('proMaintain.dt.brandName'), minWidth: 100 },
        { prop: 'baseSku.tempControlName', label: this.$t('proMaintain.dt.tempControlName'), minWidth: 100 },
        { prop: 'baseSku.validityDay', label: this.$t('proMaintain.dt.validityDay'), minWidth: 100 },

        { prop: 'qty', label: this.$t('proMaintain.dt.qty'), minWidth: 100 },
        { prop: 'qualityStatus', label: this.$t('proMaintain.dt.qualityStatus'), minWidth: 100, edit: { 'name': '$select', options: this.listTypeInfo.vxeProQualityStatusList, events: { 'change': this.selectChange }}},
        { prop: 'maintainMeasureList', label: this.$t('proMaintain.dt.maintainMeasure'), minWidth: 100, edit: { 'name': '$select', options: this.listTypeInfo.vxeProMaintainMeasureList, props: { 'multiple': true }, events: { 'change': this.selectChangePath }}},
        { prop: 'maintainConclusion', label: this.$t('proMaintain.dt.maintainConclusion'), minWidth: 100, edit: { 'name': '$select', options: this.listTypeInfo.vxeProMaintainConclusionList, events: { 'change': this.selectChangeOther }}},

        { prop: 'baseInvBatch.batchNo', label: this.$t('proMaintain.dt.batchNo'), minWidth: 100 },
        { prop: 'baseInvBatch.productionBatch', label: this.$t('proMaintain.dt.productionBatch'), minWidth: 100 },
        { prop: 'baseInvBatch.productionDate', label: this.$t('proMaintain.dt.productionDate'), minWidth: 100 },
        { prop: 'baseInvBatch.instoreDate', label: this.$t('proMaintain.dt.instoreDate'), minWidth: 100 },
        { prop: 'baseInvBatch.invalidDate', label: this.$t('proMaintain.dt.invalidDate'), minWidth: 100 },
        { prop: 'baseInvBatch.sterileNo', label: this.$t('proMaintain.dt.sterileNo'), minWidth: 100 },
        { prop: 'baseInvBatch.sterileInvaliDate', label: this.$t('proMaintain.dt.sterileInvaliDate'), minWidth: 100 }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        maintainUser: [{ required: true, message: this.$t('proMaintain.msg.maintainUser'), trigger: 'blur' }],
        ownerId: [{ required: true, message: this.$t('proMaintain.msg.ownerId'), trigger: 'blur' }],
        maintainDate: [{ required: true, message: this.$t('proMaintain.msg.maintainDate'), trigger: 'blur' }],
        remark: [{ required: true, message: this.$t('proMaintain.msg.remark'), trigger: 'blur' }],
        maintainType: [{ required: true, message: this.$t('proMaintain.msg.maintainType'), trigger: 'blur' }],
        proMaintainStatus: [{ required: true, message: this.$t('proMaintain.msg.proMaintainStatus'), trigger: 'blur' }]
      }
      //
      this.diaFormInfo.subTableInfo.rules = {
        qualityStatus: [{
          required: true,
          message: '请选择质量状态'
        }],
        maintainMeasureList: [{
          required: true,
          message: '请选择养护措施'
        }],
        maintainConclusion: [{
          required: true,
          message: '请选择养护结论'
        }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        maintainUser: null,
        creator: null,
        proMaintainStatus: null,
        createTime: null,
        ownerId: null,
        proMaintainType: null,
        remark: null,
        auditUser: null,
        updateName: null,
        updater: null,
        auditTime: null,
        updateTime: null,
        whId: null,
        maintainDate: null,
        companyCode: null,
        proMaintainNo: null,
        id: null,
        maintainUserName: null,
        auditUserName: null,
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
