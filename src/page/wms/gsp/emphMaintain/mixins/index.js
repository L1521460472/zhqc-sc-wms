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
          emphMaintainNo: null,
          emphMaintainStatus: null,
          ownerId: null,
          beginTimeFrom: null,
          beginTimeTo: null,
          endTimeFrom: null,
          endTimeTo: null,
          creator: null,
          maintainUser: null,
          maintainUserId: null,
          auditUser: null,
          auditTimeBegin: null,
          auditTimeEnd: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        maintainStatusList: [],
        maintainTypeList: []
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
      inStockProList: [], // 存放选中在库产品对象集合
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
        { label: this.$t('emphMaintain.emphMaintainNo'), value: 'emphMaintainNo', type: 'input' },
        { label: this.$t('emphMaintain.emphMaintainStatus'), value: 'emphMaintainStatus', type: 'select', list: 'maintainStatusList' },
        { label: this.$t('emphMaintain.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('emphMaintain.maintainUser'), value: 'maintainUserId', type: 'slot' },
        { label: this.$t('emphMaintain.creator'), value: 'creator', type: 'input' },
        { label: this.$t('emphMaintain.auditUser'), value: 'auditUser', type: 'input' },
        { label: this.$t('emphMaintain.beginTimeFrom'), value: 'beginTimeFrom', type: 'date', dateType: 'date', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd' },
        { label: this.$t('emphMaintain.beginTimeTo'), value: 'beginTimeTo', type: 'date', dateType: 'date', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd' },
        { label: this.$t('emphMaintain.endTimeFrom'), value: 'endTimeFrom', type: 'date', dateType: 'date', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd' },
        { label: this.$t('emphMaintain.endTimeTo'), value: 'endTimeTo', type: 'date', dateType: 'date', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd' },
        { label: this.$t('emphMaintain.auditTimeBegin'), value: 'auditTimeBegin', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('emphMaintain.auditTimeEnd'), value: 'auditTimeEnd', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('emphMaintain.emphMaintainNo'), value: 'emphMaintainNo', type: 'input' },
        { label: this.$t('emphMaintain.emphMaintainStatus'), value: 'emphMaintainStatus', type: 'select', list: 'maintainStatusList' },
        { label: this.$t('emphMaintain.ownerId'), value: 'ownerId', type: 'slot' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
      this.topForm.data.maintainUserId = null
    },
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'emphMaintainNo', label: this.$t('emphMaintain.emphMaintainNo'), minWidth: 120 },
        { prop: 'emphMaintainStatusName', label: this.$t('emphMaintain.emphMaintainStatus'), minWidth: 100 },
        { prop: 'emphMaintainTypeName', label: this.$t('emphMaintain.emphMaintainType'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('emphMaintain.ownerId'), minWidth: 100 },
        { prop: 'beginTime', label: this.$t('emphMaintain.beginTime'), minWidth: 100 },
        { prop: 'endTime', label: this.$t('emphMaintain.endTime'), minWidth: 100 },
        { prop: 'maintainUserName', label: this.$t('emphMaintain.maintainUserName'), minWidth: 100 },
        { prop: 'auditUserName', label: this.$t('emphMaintain.auditUserName'), minWidth: 100 },
        { prop: 'auditTime', label: this.$t('emphMaintain.auditTime'), minWidth: 100 },
        { prop: 'createName', label: this.$t('emphMaintain.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('emphMaintain.createTime'), minWidth: 100 },
        { prop: 'remark', label: this.$t('emphMaintain.remark'), minWidth: 100 },
        { label: '操作', value: 'status', width: 200, type: 'slot', fixed: 'right', align: 'left' }
      ]
    },

    // 增加产品明细参照初始化数据
    initTopFormInvColumns() {
      // 初始化top表单
      this.dialogInfoInv.topFormInv.fieldList = [
        { label: this.$t('emphMaintain.invPro.zoneName'), value: 'zoneId', type: 'slot' },
        { label: this.$t('emphMaintain.invPro.lotCode'), value: 'lotId', type: 'slot' },
        { label: this.$t('emphMaintain.invPro.skuId'), value: 'skuId', type: 'slot' },
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
        { prop: 'zoneName', label: this.$t('emphMaintain.invPro.zoneName'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('emphMaintain.invPro.lotCode'), minWidth: 100 },

        { prop: 'baseSku.skuCode', label: this.$t('emphMaintain.invPro.skuCode'), minWidth: 100 },
        { prop: 'baseSku.barcode', label: this.$t('emphMaintain.invPro.barcode'), minWidth: 100 },
        { prop: 'baseSku.skuName', label: this.$t('emphMaintain.invPro.skuName'), minWidth: 100 },
        { prop: 'baseSku.tradeName', label: this.$t('emphMaintain.invPro.tradeName'), minWidth: 100 },
        { prop: 'baseSku.spec', label: this.$t('emphMaintain.invPro.spec'), minWidth: 100 },
        { prop: 'baseSku.mainUnit', label: this.$t('emphMaintain.invPro.mainUnit'), minWidth: 100 },
        { prop: 'baseSku.perQty', label: this.$t('emphMaintain.invPro.perQty'), minWidth: 100 },
        { prop: 'baseSku.drugForm', label: this.$t('emphMaintain.invPro.drugForm'), minWidth: 100 },
        { prop: 'baseSku.mfgName', label: this.$t('emphMaintain.invPro.mfgName'), minWidth: 100 },
        { prop: 'baseSku.originCountry', label: this.$t('emphMaintain.invPro.originCountry'), minWidth: 100 },
        { prop: 'baseSku.approvalNumber', label: this.$t('emphMaintain.invPro.approvalNumber'), minWidth: 100 },
        { prop: 'baseSku.brandName', label: this.$t('emphMaintain.invPro.brandName'), minWidth: 100 },
        { prop: 'baseSku.tempControlName', label: this.$t('emphMaintain.invPro.tempControlName'), minWidth: 100 },
        { prop: 'baseSku.validityDay', label: this.$t('emphMaintain.invPro.validityDay'), minWidth: 100 },

        { prop: 'qty', label: this.$t('emphMaintain.invPro.qty'), minWidth: 100 },

        { prop: 'baseInvBatch.batchNo', label: this.$t('emphMaintain.invPro.batchNo'), minWidth: 100 },
        { prop: 'baseInvBatch.productionBatch', label: this.$t('emphMaintain.invPro.productionBatch'), minWidth: 100 },
        { prop: 'baseInvBatch.productionDate', label: this.$t('emphMaintain.invPro.productionDate'), minWidth: 100 },
        { prop: 'baseInvBatch.instoreDate', label: this.$t('emphMaintain.invPro.instoreDate'), minWidth: 100 },
        { prop: 'baseInvBatch.invalidDate', label: this.$t('emphMaintain.invPro.invalidDate'), minWidth: 100 },
        { prop: 'baseInvBatch.sterileNo', label: this.$t('emphMaintain.invPro.sterileNo'), minWidth: 100 },
        { prop: 'baseInvBatch.sterileInvaliDate', label: this.$t('emphMaintain.invPro.sterileInvaliDate'), minWidth: 100 }
      ]
    },

    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('emphMaintain.emphMaintainNo'), value: 'emphMaintainNo', type: 'input', readonly: true },
        { label: this.$t('emphMaintain.ownerId'), value: 'ownerName', type: 'input', readonly: true },
        { label: this.$t('emphMaintain.emphMaintainType'), value: 'emphMaintainTypeName', type: 'input', readonly: true },
        { label: this.$t('emphMaintain.emphMaintainStatus'), value: 'emphMaintainStatusName', type: 'input', readonly: true },
        { label: this.$t('emphMaintain.beginTime'), value: 'beginTime', type: 'input', readonly: true },
        { label: this.$t('emphMaintain.endTime'), value: 'endTime', type: 'input', readonly: true },
        { label: this.$t('emphMaintain.maintainUser'), value: 'maintainUserName', type: 'input', readonly: true },
        { label: this.$t('emphMaintain.auditUser'), value: 'auditUserName', type: 'input', readonly: true },
        { label: this.$t('emphMaintain.auditTime'), value: 'auditTime', type: 'input', readonly: true },
        { label: this.$t('emphMaintain.remark'), value: 'remark', type: 'textarea', disabled: true }
      ]
      // 明细数据
      this.diaFormInfo.subTableInfo.fieldList = [
        { label: '', type: 'selection', width: 50 }, // 序列
        { prop: 'zoneName', label: this.$t('emphMaintain.dt.zoneName'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('emphMaintain.dt.lotCode'), minWidth: 100 },

        { prop: 'baseSku.skuCode', label: this.$t('emphMaintain.dt.skuCode'), minWidth: 100 },
        { prop: 'baseSku.barcode', label: this.$t('emphMaintain.dt.barcode'), minWidth: 100 },
        { prop: 'baseSku.skuName', label: this.$t('emphMaintain.dt.skuName'), minWidth: 100 },
        { prop: 'baseSku.tradeName', label: this.$t('emphMaintain.dt.tradeName'), minWidth: 100 },
        { prop: 'baseSku.spec', label: this.$t('emphMaintain.dt.spec'), minWidth: 100 },
        { prop: 'baseSku.mainUnit', label: this.$t('emphMaintain.dt.mainUnit'), minWidth: 100 },
        { prop: 'baseSku.perQty', label: this.$t('emphMaintain.dt.perQty'), minWidth: 100 },
        { prop: 'baseSku.drugForm', label: this.$t('emphMaintain.dt.drugForm'), minWidth: 100 },
        { prop: 'baseSku.mfgName', label: this.$t('emphMaintain.dt.mfgName'), minWidth: 100 },
        { prop: 'baseSku.originCountry', label: this.$t('emphMaintain.dt.originCountry'), minWidth: 100 },
        { prop: 'baseSku.approvalNumber', label: this.$t('emphMaintain.dt.approvalNumber'), minWidth: 100 },
        { prop: 'baseSku.brandName', label: this.$t('emphMaintain.dt.brandName'), minWidth: 100 },
        { prop: 'baseSku.tempControlName', label: this.$t('emphMaintain.dt.tempControlName'), minWidth: 100 },
        { prop: 'baseSku.validityDay', label: this.$t('emphMaintain.dt.validityDay'), minWidth: 100 },

        { prop: 'qty', label: this.$t('emphMaintain.dt.qty'), minWidth: 100 },
        { prop: 'reason', label: this.$t('emphMaintain.dt.reason'), minWidth: 100 },
        { prop: 'maintainKey', label: this.$t('emphMaintain.dt.maintainKey'), minWidth: 100 },
        { prop: 'remark', label: this.$t('emphMaintain.dt.remark'), minWidth: 100 },

        { prop: 'baseInvBatch.batchNo', label: this.$t('emphMaintain.dt.batchNo'), minWidth: 100 },
        { prop: 'baseInvBatch.productionBatch', label: this.$t('emphMaintain.dt.productionBatch'), minWidth: 100 },
        { prop: 'baseInvBatch.productionDate', label: this.$t('emphMaintain.dt.productionDate'), minWidth: 100 },
        { prop: 'baseInvBatch.instoreDate', label: this.$t('emphMaintain.dt.instoreDate'), minWidth: 100 },
        { prop: 'baseInvBatch.invalidDate', label: this.$t('emphMaintain.dt.invalidDate'), minWidth: 100 },
        { prop: 'baseInvBatch.sterileNo', label: this.$t('emphMaintain.dt.sterileNo'), minWidth: 100 },
        { prop: 'baseInvBatch.sterileInvaliDate', label: this.$t('emphMaintain.dt.sterileInvaliDate'), minWidth: 100 }
      ]
    },

    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.$set(this.diaFormInfo.data, 'emphMaintainStatus', 'CJ')
      this.diaFormInfo.fieldList = [
        { label: this.$t('emphMaintain.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('emphMaintain.maintainUser'), value: 'maintainUserId', type: 'slot' },
        { label: this.$t('emphMaintain.emphMaintainType'), value: 'emphMaintainType', type: 'select', list: 'maintainTypeList', disabled: true },
        { label: this.$t('emphMaintain.beginTime'), value: 'beginTime', type: 'date', dateType: 'date', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd' },
        { label: this.$t('emphMaintain.endTime'), value: 'endTime', type: 'date', dateType: 'date', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd' },
        { label: this.$t('emphMaintain.remark'), value: 'remark', type: 'textarea' }
      ]
      // 明细数据
      this.diaFormInfo.subTableInfo.fieldList = [
        { label: '', type: 'selection', width: 50 }, // 序列
        { prop: 'zoneName', label: this.$t('emphMaintain.dt.zoneName'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('emphMaintain.dt.lotCode'), minWidth: 100 },

        { prop: 'baseSku.skuCode', label: this.$t('emphMaintain.dt.skuCode'), minWidth: 100 },
        { prop: 'baseSku.barcode', label: this.$t('emphMaintain.dt.barcode'), minWidth: 100 },
        { prop: 'baseSku.skuName', label: this.$t('emphMaintain.dt.skuName'), minWidth: 100 },
        { prop: 'baseSku.tradeName', label: this.$t('emphMaintain.dt.tradeName'), minWidth: 100 },
        { prop: 'baseSku.spec', label: this.$t('emphMaintain.dt.spec'), minWidth: 100 },
        { prop: 'baseSku.mainUnit', label: this.$t('emphMaintain.dt.mainUnit'), minWidth: 100 },
        { prop: 'baseSku.perQty', label: this.$t('emphMaintain.dt.perQty'), minWidth: 100 },
        { prop: 'baseSku.drugForm', label: this.$t('emphMaintain.dt.drugForm'), minWidth: 100 },
        { prop: 'baseSku.mfgName', label: this.$t('emphMaintain.dt.mfgName'), minWidth: 100 },
        { prop: 'baseSku.originCountry', label: this.$t('emphMaintain.dt.originCountry'), minWidth: 100 },
        { prop: 'baseSku.approvalNumber', label: this.$t('emphMaintain.dt.approvalNumber'), minWidth: 100 },
        { prop: 'baseSku.brandName', label: this.$t('emphMaintain.dt.brandName'), minWidth: 100 },
        { prop: 'baseSku.tempControlName', label: this.$t('emphMaintain.dt.tempControlName'), minWidth: 100 },
        { prop: 'baseSku.validityDay', label: this.$t('emphMaintain.dt.validityDay'), minWidth: 100 },

        { prop: 'qty', label: this.$t('emphMaintain.dt.qty'), minWidth: 100 },
        { prop: 'reason', label: this.$t('emphMaintain.dt.reason'), minWidth: 100, edit: { 'name': 'input' }},
        { prop: 'maintainKey', label: this.$t('emphMaintain.dt.maintainKey'), minWidth: 100, edit: { 'name': 'input' }},
        { prop: 'remark', label: this.$t('emphMaintain.dt.remark'), minWidth: 100, edit: { 'name': 'input' }},

        { prop: 'baseInvBatch.batchNo', label: this.$t('emphMaintain.dt.batchNo'), minWidth: 100 },
        { prop: 'baseInvBatch.productionBatch', label: this.$t('emphMaintain.dt.productionBatch'), minWidth: 100 },
        { prop: 'baseInvBatch.productionDate', label: this.$t('emphMaintain.dt.productionDate'), minWidth: 100 },
        { prop: 'baseInvBatch.instoreDate', label: this.$t('emphMaintain.dt.instoreDate'), minWidth: 100 },
        { prop: 'baseInvBatch.invalidDate', label: this.$t('emphMaintain.dt.invalidDate'), minWidth: 100 },
        { prop: 'baseInvBatch.sterileNo', label: this.$t('emphMaintain.dt.sterileNo'), minWidth: 100 },
        { prop: 'baseInvBatch.sterileInvaliDate', label: this.$t('emphMaintain.dt.sterileInvaliDate'), minWidth: 100 }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('emphMaintain.emphMaintainNo'), value: 'emphMaintainNo', type: 'input', disabled: true },
        { label: this.$t('emphMaintain.ownerId'), value: 'ownerName', type: 'input', disabled: true },
        { label: this.$t('emphMaintain.emphMaintainType'), value: 'emphMaintainTypeName', type: 'input', disabled: true },
        { label: this.$t('emphMaintain.beginTime'), value: 'beginTime', type: 'date', dateType: 'date', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd' },
        { label: this.$t('emphMaintain.endTime'), value: 'endTime', type: 'date', dateType: 'date', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd' },
        { label: this.$t('emphMaintain.maintainUser'), value: 'maintainUserName', type: 'input', disabled: true },
        { label: this.$t('emphMaintain.auditUser'), value: 'auditUserName', type: 'input', disabled: true },
        { label: this.$t('emphMaintain.auditTime'), value: 'auditTime', type: 'input', disabled: true },
        { label: this.$t('emphMaintain.remark'), value: 'remark', type: 'textarea' }
      ]
      // 明细数据
      this.diaFormInfo.subTableInfo.fieldList = [
        { label: '', type: 'selection', width: 50 }, // 序列
        { prop: 'zoneName', label: this.$t('emphMaintain.dt.zoneName'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('emphMaintain.dt.lotCode'), minWidth: 100 },

        { prop: 'baseSku.skuCode', label: this.$t('emphMaintain.dt.skuCode'), minWidth: 100 },
        { prop: 'baseSku.barcode', label: this.$t('emphMaintain.dt.barcode'), minWidth: 100 },
        { prop: 'baseSku.skuName', label: this.$t('emphMaintain.dt.skuName'), minWidth: 100 },
        { prop: 'baseSku.tradeName', label: this.$t('emphMaintain.dt.tradeName'), minWidth: 100 },
        { prop: 'baseSku.spec', label: this.$t('emphMaintain.dt.spec'), minWidth: 100 },
        { prop: 'baseSku.mainUnit', label: this.$t('emphMaintain.dt.mainUnit'), minWidth: 100 },
        { prop: 'baseSku.perQty', label: this.$t('emphMaintain.dt.perQty'), minWidth: 100 },
        { prop: 'baseSku.drugForm', label: this.$t('emphMaintain.dt.drugForm'), minWidth: 100 },
        { prop: 'baseSku.mfgName', label: this.$t('emphMaintain.dt.mfgName'), minWidth: 100 },
        { prop: 'baseSku.originCountry', label: this.$t('emphMaintain.dt.originCountry'), minWidth: 100 },
        { prop: 'baseSku.approvalNumber', label: this.$t('emphMaintain.dt.approvalNumber'), minWidth: 100 },
        { prop: 'baseSku.brandName', label: this.$t('emphMaintain.dt.brandName'), minWidth: 100 },
        { prop: 'baseSku.tempControlName', label: this.$t('emphMaintain.dt.tempControlName'), minWidth: 100 },
        { prop: 'baseSku.validityDay', label: this.$t('emphMaintain.dt.validityDay'), minWidth: 100 },

        { prop: 'qty', label: this.$t('emphMaintain.dt.qty'), minWidth: 100 },
        { prop: 'reason', label: this.$t('emphMaintain.dt.reason'), minWidth: 100, edit: { 'name': 'input' }},
        { prop: 'maintainKey', label: this.$t('emphMaintain.dt.maintainKey'), minWidth: 100, edit: { 'name': 'input' }},
        { prop: 'remark', label: this.$t('emphMaintain.dt.remark'), minWidth: 100, edit: { 'name': 'input' }},

        { prop: 'baseInvBatch.batchNo', label: this.$t('emphMaintain.dt.batchNo'), minWidth: 100 },
        { prop: 'baseInvBatch.productionBatch', label: this.$t('emphMaintain.dt.productionBatch'), minWidth: 100 },
        { prop: 'baseInvBatch.productionDate', label: this.$t('emphMaintain.dt.productionDate'), minWidth: 100 },
        { prop: 'baseInvBatch.instoreDate', label: this.$t('emphMaintain.dt.instoreDate'), minWidth: 100 },
        { prop: 'baseInvBatch.invalidDate', label: this.$t('emphMaintain.dt.invalidDate'), minWidth: 100 },
        { prop: 'baseInvBatch.sterileNo', label: this.$t('emphMaintain.dt.sterileNo'), minWidth: 100 },
        { prop: 'baseInvBatch.sterileInvaliDate', label: this.$t('emphMaintain.dt.sterileInvaliDate'), minWidth: 100 }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        maintainUser: [{ required: true, message: this.$t('emphMaintain.msg.maintainUser'), trigger: 'blur' }],
        ownerId: [{ required: true, message: this.$t('emphMaintain.msg.ownerId'), trigger: 'blur' }],
        endTime: [{ required: true, message: this.$t('emphMaintain.msg.endTime'), trigger: 'blur' }],
        beginTime: [{ required: true, message: this.$t('emphMaintain.msg.beginTime'), trigger: 'blur' }],
        remark: [{ required: true, message: this.$t('emphMaintain.msg.remark'), trigger: 'blur' }],
        emphMaintainType: [{ required: true, message: this.$t('emphMaintain.msg.emphMaintainType'), trigger: 'blur' }],
        emphMaintainStatus: [{ required: true, message: this.$t('emphMaintain.msg.emphMaintainStatus'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        maintainUser: null,
        creator: null,
        createTime: null,
        ownerId: null,
        endTime: null,
        beginTime: null,
        remark: null,
        emphMaintainType: null,
        auditUser: null,
        emphMaintainStatus: null,
        updateName: null,
        updater: null,
        auditTime: null,
        updateTime: null,
        whId: null,
        emphMaintainNo: null,
        companyCode: null,
        id: null,
        maintainUserName: null,
        auditUserName: null,
        createName: null
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
