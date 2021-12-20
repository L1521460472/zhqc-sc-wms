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
          companyCode: null,
          whId: null,
          ownerId: null,
          inventoryNo: null,
          inventoryType: null,
          inventoryStatus: null,
          sourceType: null,
          origId: null,
          origNo: null,
          inventoryMethod: null,
          planStartTime: null,
          isVisible: null,
          confirmUser: null,
          confirmTime: null,
          pdFinishTime: null,
          remark: null,
          creator: null,
          createName: null,
          createTime: null,
          updater: null,
          updateName: null,
          updateTime: null,
          optimistic: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        inventoryTypeList: [],
        inventoryStatusList: [],
        sourceTypeList: [],
        inventoryMethodList: [],
        rangeList: [],
        goodStatusList: [],
        isVisibleList: []
      },
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
          size: 5,
          accept: [{ type: 'img', limit: 8 }, { type: 'pdf', limit: 2 }]
        },
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
            btList: null
          }
        }
      },

      // 审核
      auditFormInfo: {
        ref: null, // 对外提供的可操作表单的持有对象
        fieldList: null, // 配置的表单字段集合
        data: {
          id: null,
          isPass: 1,
          content: null
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
        { label: this.$t('inventory.inventoryNo'), value: 'inventoryNo', type: 'input' },
        { label: this.$t('inventory.ownerName'), value: 'ownerId', type: 'slot' },
        { label: this.$t('inventory.consignee'), value: 'whAreaId', type: 'slot' },
        // { label: this.$t('inventory.inventoryType'), value: 'inventoryType', type: 'select', list: 'inventoryTypeList' },
        { label: this.$t('inventory.inventoryNoStatus'), value: 'inventoryStatus', type: 'select', list: 'inventoryStatusList' },
        { label: this.$t('inventory.sourceType'), value: 'sourceType', type: 'select', list: 'sourceTypeList' },
        { label: this.$t('inventory.stockist'), value: 'inventoryOperator', type: 'input' },
        { label: this.$t('inventory.supervisor'), value: 'supervisionOperator', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('inventory.inventoryNo'), value: 'inventoryNo', type: 'input' },
        { label: this.$t('inventory.ownerName'), value: 'ownerId', type: 'slot' },
        { label: this.$t('inventory.consignee'), value: 'whAreaId', type: 'slot' },
        // { label: this.$t('inventory.inventoryType'), value: 'inventoryType', type: 'select', list: 'inventoryTypeList' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: '', type: 'selection', width: 50 }, // 序列
        { prop: 'inventoryNo', label: this.$t('inventory.inventoryNo'), minWidth: 120 },
        { prop: 'inventoryStatusName', label: this.$t('inventory.inventoryNoStatus'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('inventory.ownerName'), minWidth: 150 },
        { prop: 'areaName', label: this.$t('inventory.consignee'), minWidth: 100 },
        { prop: 'inventoryTypeName', label: this.$t('inventory.inventoryTypeName'), minWidth: 100 },
        { prop: 'inventoryMethodName', label: this.$t('inventory.inventoryMethodName'), minWidth: 100 },
        { prop: 'inventoryRangeNameList', label: this.$t('inventory.inventoryRange'), minWidth: 100 },
        { prop: 'inventoryGoodStatusName', label: this.$t('inventory.inventoryStatus'), minWidth: 100 },
        { prop: 'isVisibleName', label: this.$t('inventory.isVisibleName'), minWidth: 100 },
        { prop: 'remark', label: this.$t('inventory.remark'), minWidth: 100 },
        { prop: 'sourceTypeName', label: this.$t('inventory.sourceTypeName'), minWidth: 100 },
        { prop: 'origNo', label: this.$t('inventory.origNo'), minWidth: 150 },
        { prop: 'inventoryOperator', label: this.$t('inventory.stockist'), minWidth: 150 },
        { prop: 'inventoryDate', label: this.$t('inventory.inventoryDate'), minWidth: 150 },
        { prop: 'supervisionOperator', label: this.$t('inventory.supervisor'), minWidth: 150 },
        { prop: 'supervisionDate', label: this.$t('inventory.supervisionDate'), minWidth: 150 },
        // { prop: 'planStartTime', label: this.$t('inventory.planStartTime'), minWidth: 150 },
        { prop: 'createName', label: this.$t('inventory.createName'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('inventory.createTime'), minWidth: 150 },
        { prop: 'updateName', label: this.$t('inventory.updateName'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('inventory.updateTime'), minWidth: 150 },
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
        { prop: 'zoneName', label: this.$t('inventory.invPro.zoneName'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('inventory.invPro.lotCode'), minWidth: 100 },
        { prop: 'inventoryCategory', label: this.$t('inventory.invPro.InventoryCategory'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('inventory.invPro.skuCode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('inventory.invPro.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('inventory.invPro.spec'), minWidth: 100 },
        { prop: 'recUnit', label: this.$t('inventory.invPro.mainUnit'), minWidth: 100 },
        { prop: 'planPdQtyB', label: this.$t('inventory.invPro.unInventory'), minWidth: 100 },
        { prop: 'badQtyB', label: this.$t('inventory.invPro.frozenInventory'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('inventory.invPro.batchNo'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('inventory.invPro.instoreDate'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('inventory.invPro.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('inventory.invPro.productionDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('inventory.invPro.invalidDate'), minWidth: 100 }
        // { prop: 'planPdQty', label: this.$t('inventory.invPro.planPdQty'), minWidth: 100 }
      ]
    },

    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('inventory.ownerName'), value: 'ownerName', type: 'input' },
        { label: this.$t('inventory.consignee'), value: 'areaName', type: 'input' },
        { label: this.$t('inventory.inventoryTypeName'), value: 'inventoryTypeName', type: 'input' },
        { label: this.$t('inventory.inventoryMethodName'), value: 'inventoryMethodName', type: 'input' },
        { label: this.$t('inventory.inventoryRange'), value: 'inventoryRangeNameList', type: 'input' },
        { label: this.$t('inventory.inventoryStatusName'), value: 'inventoryGoodStatusName', type: 'input' },
        { label: this.$t('inventory.isVisibleName'), value: 'isVisibleName', type: 'input' },
        { label: this.$t('inventory.inventoryDate'), value: 'inventoryDate', type: 'input' },
        { label: this.$t('inventory.stockist'), value: 'inventoryOperator', type: 'input' },
        { label: this.$t('inventory.supervisor'), value: 'supervisionOperator', type: 'input' },
        { label: this.$t('inventory.planStartTime'), value: 'planStartTime', type: 'input' },
        { label: this.$t('inventory.sourceTypeName'), value: 'sourceTypeName', type: 'input' },
        { label: this.$t('inventory.inventoryNoStatus'), value: 'inventoryStatusName', type: 'input' },
        { label: this.$t('inventory.remark'), value: 'remark', type: 'input' },
        // { label: this.$t('inventory.createName'), value: 'createName', type: 'input', readonly: true },
        // { label: this.$t('inventory.createTime'), value: 'createTime', type: 'input', readonly: true },
        { label: this.$t('inventory.updateName'), value: 'updateName', type: 'input' },
        { label: this.$t('inventory.confirmName'), value: 'confirmName', type: 'input' },
        { label: this.$t('inventory.confirmTime'), value: 'confirmTime', type: 'input' },
        { label: this.$t('inventory.supervisionTime'), value: 'supervisionTime', type: 'input' },
        { value: 'imgInfo', type: 'slot', className: 'item-image' }

      ]
      // 明细数据
      this.diaFormInfo.subTableInfo.fieldList = [
        { label: '序号', type: 'seq', width: 50 },
        { prop: 'areaName', label: this.$t('inventory.dt.consignee'), minWidth: 100 },
        { prop: 'zoneName', label: this.$t('inventory.dt.zoneName'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('inventory.dt.lotCode'), minWidth: 100 },
        { prop: 'inventoryCategory', label: this.$t('inventory.dt.InventoryCategory'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('inventory.dt.skuCode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('inventory.dt.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('inventory.dt.spec'), minWidth: 100 },
        { prop: 'recUnit', label: this.$t('inventory.dt.mainUnit'), minWidth: 100 },
        { prop: 'goodQty', label: this.$t('inventory.dt.unInventory'), minWidth: 100 },
        { prop: 'badQty', label: this.$t('inventory.dt.frozenInventory'), minWidth: 100 },
        { prop: 'sumPdQty', label: this.$t('inventory.dt.firstPdQty'), minWidth: 100 },
        { prop: 'inventoryStatus', label: this.$t('inventory.dt.inventoryStatus'), children: [
          { prop: 'goodPdQty', label: this.$t('inventory.dt.goodProduct'), minWidth: 130 },
          { prop: 'brokenPdQty', label: this.$t('inventory.dt.damagedProduct'), minWidth: 130 },
          { prop: 'expiredPdQty', label: this.$t('inventory.dt.expiredProduct'), minWidth: 130 },
          { prop: 'badPdQty', label: this.$t('inventory.dt.badProduct'), minWidth: 130 }
        ] },
        { prop: 'diffQty', label: this.$t('inventory.dt.varianceQty'), minWidth: 130 },
        { prop: 'remark', label: this.$t('inventory.dt.remark'), minWidth: 150 },
        { prop: 'batchNo', label: this.$t('inventory.dt.batchNo'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('inventory.dt.instoreDate'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('inventory.dt.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('inventory.dt.productionDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('inventory.dt.invalidDate'), minWidth: 100 }
      ]
      this.diaFormInfo.imgInfo.disabled = true
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.data = {
        inventoryMethod: this.listTypeInfo.inventoryMethodList.length == 0 ? null : this.listTypeInfo.inventoryMethodList[1].value,
        isVisible: this.listTypeInfo.isVisibleList.length == 0 ? null : this.listTypeInfo.isVisibleList[1].value,
        inventoryType: this.listTypeInfo.inventoryTypeList.length == 0 ? null : this.listTypeInfo.inventoryTypeList[0].value,
        inventoryStatus: this.listTypeInfo.inventoryStatusList.length == 0 ? null : this.listTypeInfo.inventoryStatusList[0].value,
        sourceType: this.listTypeInfo.sourceTypeList.length == 0 ? null : this.listTypeInfo.sourceTypeList[0].value

      }

      this.diaFormInfo.fieldList = [
        { label: this.$t('inventory.ownerName'), value: 'ownerId', type: 'slot' },
        { label: this.$t('inventory.consignee'), value: 'whAreaId', type: 'slot' },
        { label: this.$t('inventory.inventoryTypeName'), value: 'inventoryType', type: 'select', list: 'inventoryTypeList' },
        { label: this.$t('inventory.inventoryMethodName'), value: 'inventoryMethod', type: 'select', list: 'inventoryMethodList' },
        { label: this.$t('inventory.inventoryRange'), value: 'inventoryRangeList', type: 'select', list: 'rangeList', multiple: 'multiple' },
        { label: this.$t('inventory.inventoryStatusName'), value: 'inventoryGoodStatus', type: 'select', list: 'goodStatusList' },
        { label: this.$t('inventory.isVisibleName'), value: 'isVisible', type: 'select', list: 'isVisibleList' },
        { label: this.$t('inventory.inventoryDate'), value: 'inventoryDate', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd' },
        { label: this.$t('inventory.stockist'), value: 'inventoryOperator', type: 'input' },
        { label: this.$t('inventory.supervisor'), value: 'supervisionOperator', type: 'input' },
        { label: this.$t('inventory.planStartTime'), value: 'planStartTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd' },
        { label: this.$t('inventory.sourceTypeName'), value: 'sourceType', type: 'select', list: 'sourceTypeList', disabled: true },
        { label: this.$t('inventory.inventoryNoStatus'), value: 'inventoryStatus', type: 'select', list: 'inventoryStatusList', disabled: true },
        { label: this.$t('inventory.remark'), value: 'remark', type: 'input' },
        { value: 'imgInfo', type: 'slot', className: 'item-image' }

      ]
      // 明细数据
      this.diaFormInfo.subTableInfo.fieldList = [//
        { label: '序号', type: 'seq', width: 50 },
        { prop: 'areaName', label: this.$t('inventory.dt.consignee'), minWidth: 100 },
        { prop: 'zoneName', label: this.$t('inventory.dt.zoneName'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('inventory.dt.lotCode'), minWidth: 100 },
        { prop: 'inventoryCategory', label: this.$t('inventory.dt.InventoryCategory'), minWidth: 100 },
        // { prop: 'planPdQty', label: this.$t('inventory.dt.planPdQty'), minWidth: 100 },
        // { prop: 'firstPdQty', label: this.$t('inventory.dt.firstPdQty'), minWidth: 100 },
        // { prop: 'firstDiffQty', label: this.$t('inventory.dt.firstDiffQty'), minWidth: 100 },
        // { prop: 'secPdQty', label: this.$t('inventory.dt.secPdQty'), minWidth: 100 },
        // { prop: 'secDiffQty', label: this.$t('inventory.dt.secDiffQty'), minWidth: 100 },
        // { prop: 'confirmQty', label: this.$t('inventory.dt.confirmQty'), minWidth: 100 },
        // { prop: 'confirmDiffQty', label: this.$t('inventory.dt.confirmDiffQty'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('inventory.dt.skuCode'), minWidth: 100 },
        // { prop: 'barcode', label: this.$t('inventory.dt.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('inventory.dt.skuName'), minWidth: 100 },
        // { prop: 'tradeName', label: this.$t('inventory.dt.tradeName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('inventory.dt.spec'), minWidth: 100 },
        { prop: 'recUnit', label: this.$t('inventory.dt.mainUnit'), minWidth: 100 },
        { prop: 'goodQty', label: this.$t('inventory.dt.unInventory'), minWidth: 100 },
        { prop: 'badQty', label: this.$t('inventory.dt.frozenInventory'), minWidth: 100 },
        { prop: 'sumPdQty', label: this.$t('inventory.dt.firstPdQty'), minWidth: 100 },
        { prop: 'inventoryStatus', label: this.$t('inventory.dt.inventoryStatus'), children: [
          { prop: 'goodPdQty', label: this.$t('inventory.dt.goodProduct'), minWidth: 130 },
          { prop: 'brokenPdQty', label: this.$t('inventory.dt.damagedProduct'), minWidth: 130 },
          { prop: 'expiredPdQty', label: this.$t('inventory.dt.expiredProduct'), minWidth: 130 },
          { prop: 'badPdQty', label: this.$t('inventory.dt.badProduct'), minWidth: 130 }
        ] },
        { prop: 'diffQty', label: this.$t('inventory.dt.varianceQty'), minWidth: 130 },
        { prop: 'remark', label: this.$t('inventory.dt.remark'), minWidth: 150 },
        // { prop: 'drugForm', label: this.$t('inventory.dt.drugForm'), minWidth: 100 },
        // { prop: 'mfgName', label: this.$t('inventory.dt.mfgName'), minWidth: 100 },
        // { prop: 'originCountry', label: this.$t('inventory.dt.originCountry'), minWidth: 100 },
        // { prop: 'approvalNumber', label: this.$t('inventory.dt.approvalNumber'), minWidth: 100 },
        // { prop: 'brandName', label: this.$t('inventory.dt.brandName'), minWidth: 100 },
        // { prop: 'tempControlName', label: this.$t('inventory.dt.tempControlName'), minWidth: 100 },
        // { prop: 'validityDay', label: this.$t('inventory.dt.validityDay'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('inventory.dt.batchNo'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('inventory.dt.instoreDate'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('inventory.dt.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('inventory.dt.productionDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('inventory.dt.invalidDate'), minWidth: 100 }

      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('inventory.ownerName'), value: 'ownerId', type: 'slot' },
        { label: this.$t('inventory.consignee'), value: 'whAreaId', type: 'slot' },
        { label: this.$t('inventory.inventoryTypeName'), value: 'inventoryType', type: 'select', list: 'inventoryTypeList' },
        { label: this.$t('inventory.inventoryMethodName'), value: 'inventoryMethod', type: 'select', list: 'inventoryMethodList' },
        { label: this.$t('inventory.inventoryRange'), value: 'inventoryRangeList', type: 'select', list: 'rangeList', multiple: 'multiple' },
        { label: this.$t('inventory.inventoryStatusName'), value: 'inventoryGoodStatus', type: 'select', list: 'goodStatusList' },
        { label: this.$t('inventory.isVisibleName'), value: 'isVisible', type: 'select', list: 'isVisibleList' },
        { label: this.$t('inventory.inventoryDate'), value: 'inventoryDate', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd' },
        { label: this.$t('inventory.stockist'), value: 'inventoryOperator', type: 'input' },
        { label: this.$t('inventory.supervisor'), value: 'supervisionOperator', type: 'input' },
        { label: this.$t('inventory.planStartTime'), value: 'planStartTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd' },
        { label: this.$t('inventory.sourceTypeName'), value: 'sourceType', type: 'select', list: 'sourceTypeList', disabled: true },
        { label: this.$t('inventory.inventoryNoStatus'), value: 'inventoryStatus', type: 'select', list: 'inventoryStatusList', disabled: true },
        { label: this.$t('inventory.remark'), value: 'remark', type: 'input' },
        { value: 'imgInfo', type: 'slot', className: 'item-image' }

      ]
      // 明细数据
      this.diaFormInfo.subTableInfo.fieldList = [
        { label: '序号', type: 'seq', width: 50 },
        { prop: 'areaName', label: this.$t('inventory.dt.consignee'), minWidth: 100 },
        { prop: 'zoneName', label: this.$t('inventory.dt.zoneName'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('inventory.dt.lotCode'), minWidth: 100 },
        { prop: 'inventoryCategory', label: this.$t('inventory.dt.InventoryCategory'), minWidth: 100 },
        // { prop: 'planPdQty', label: this.$t('inventory.dt.planPdQty'), minWidth: 100 },
        // { prop: 'firstPdQty', label: this.$t('inventory.dt.firstPdQty'), minWidth: 100 },
        // { prop: 'firstDiffQty', label: this.$t('inventory.dt.firstDiffQty'), minWidth: 100 },
        // { prop: 'secPdQty', label: this.$t('inventory.dt.secPdQty'), minWidth: 100 },
        // { prop: 'secDiffQty', label: this.$t('inventory.dt.secDiffQty'), minWidth: 100 },
        // { prop: 'confirmQty', label: this.$t('inventory.dt.confirmQty'), minWidth: 100 },
        // { prop: 'confirmDiffQty', label: this.$t('inventory.dt.confirmDiffQty'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('inventory.dt.skuCode'), minWidth: 100 },
        // { prop: 'barcode', label: this.$t('inventory.dt.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('inventory.dt.skuName'), minWidth: 100 },
        // { prop: 'tradeName', label: this.$t('inventory.dt.tradeName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('inventory.dt.spec'), minWidth: 100 },
        { prop: 'recUnit', label: this.$t('inventory.dt.mainUnit'), minWidth: 100 },
        { prop: 'goodQty', label: this.$t('inventory.dt.unInventory'), minWidth: 100 },
        { prop: 'badQty', label: this.$t('inventory.dt.frozenInventory'), minWidth: 100 },
        { prop: 'sumPdQty', label: this.$t('inventory.dt.firstPdQty'), minWidth: 100 },
        { prop: 'inventoryStatus', label: this.$t('inventory.dt.inventoryStatus'), children: [
          { prop: 'goodPdQty', label: this.$t('inventory.dt.goodProduct'), minWidth: 130, edit: { name: 'ElInputNumber', props: { min: 0 }, events: { focus: this.goodProductFocusEvent, change: this.goodProductChangeEvent }}},
          { prop: 'brokenPdQty', label: this.$t('inventory.dt.damagedProduct'), minWidth: 130, edit: { name: 'ElInputNumber', props: { min: 0 }, events: { focus: this.damagedProductFocusEvent, change: this.damagedProductChangeEvent }}},
          { prop: 'expiredPdQty', label: this.$t('inventory.dt.expiredProduct'), minWidth: 130, edit: { name: 'ElInputNumber', props: { min: 0 }, events: { focus: this.expiredProductFocusEvent, change: this.expiredProductChangeEvent }}},
          { prop: 'badPdQty', label: this.$t('inventory.dt.badProduct'), minWidth: 130, edit: { name: 'ElInputNumber', props: { min: 0 }, events: { focus: this.badProductFocusEvent, change: this.badProductChangeEvent }}}
        ] },
        { prop: 'diffQty', label: this.$t('inventory.dt.varianceQty'), minWidth: 130 },
        { prop: 'remark', label: this.$t('inventory.dt.remark'), minWidth: 150, edit: { name: 'ElInput' }},
        // { prop: 'drugForm', label: this.$t('inventory.dt.drugForm'), minWidth: 100 },
        // { prop: 'mfgName', label: this.$t('inventory.dt.mfgName'), minWidth: 100 },
        // { prop: 'originCountry', label: this.$t('inventory.dt.originCountry'), minWidth: 100 },
        // { prop: 'approvalNumber', label: this.$t('inventory.dt.approvalNumber'), minWidth: 100 },
        // { prop: 'brandName', label: this.$t('inventory.dt.brandName'), minWidth: 100 },
        // { prop: 'tempControlName', label: this.$t('inventory.dt.tempControlName'), minWidth: 100 },
        // { prop: 'validityDay', label: this.$t('inventory.dt.validityDay'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('inventory.dt.batchNo'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('inventory.dt.instoreDate'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('inventory.dt.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('inventory.dt.productionDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('inventory.dt.invalidDate'), minWidth: 100 }

      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        isVisible: [{ required: true, message: this.$t('inventory.msg.isVisible'), trigger: 'blur' }],
        ownerId: [{ required: true, message: this.$t('inventory.msg.ownerId'), trigger: 'blur' }],
        sourceType: [{ required: true, message: this.$t('inventory.msg.sourceType'), trigger: 'blur' }],
        inventoryStatus: [{ required: true, message: this.$t('inventory.msg.inventoryStatus'), trigger: 'blur' }],
        inventoryMethod: [{ required: true, message: this.$t('inventory.msg.inventoryMethod'), trigger: 'blur' }],
        inventoryRangeList: [{ required: true, message: this.$t('inventory.msg.inventoryRangeNameList'), trigger: 'blur' }],
        inventoryGoodStatus: [{ required: true, message: this.$t('inventory.msg.inventoryGoodStatusName'), trigger: 'blur' }],
        // inventoryDate: [{ required: true, message: this.$t('inventory.msg.inventoryDate'), trigger: 'blur' }],
        companyCode: [{ required: true, message: this.$t('inventory.msg.companyCode'), trigger: 'blur' }],
        inventoryType: [{ required: true, message: this.$t('inventory.msg.inventoryType'), trigger: 'blur' }],
        supervisionOperator: [{ required: true, message: this.$t('inventory.msg.supervisionOperator'), trigger: 'blur' }],
        inventoryOperator: [{ required: true, message: this.$t('inventory.msg.inventoryOperator'), trigger: 'blur' }]

      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        creator: null,
        isVisible: null,
        planStartTime: null,
        createTime: null,
        ownerId: null,
        confirmUser: null,
        sourceType: null,
        remark: null,
        origNo: null,
        origId: null,
        inventoryStatus: null,
        confirmTime: null,
        updateName: null,
        updater: null,
        optimistic: null,
        updateTime: null,
        whId: null,
        pdFinishTime: null,
        inventoryMethod: null,
        companyCode: null,
        inventoryType: null,
        inventoryNo: null,
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
