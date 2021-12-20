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
          areaId: null,
          lotId: null,
          ownerId: null,
          barcode: null,
          instoreDateStart: null,
          instoreDateEnd: null,
          validityDateStart: null,
          validityDateEnd: null,
          productionDateStart: null,
          productionDateEnd: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
      },
      // 主页面表格skuCode
      tableInfo: {
        fieldList: null// 表格列集合
        // handle: {//表格自定义按钮
        //   fixed: 'right',
        //   label: this.$t('table.actions'),//操作列名
        //   width: '210',//默认操作按钮列宽度
        //   btList: [//添加操作按钮
        //     //默认查看按钮
        //     {label:this.$t('table.view'), type: 'primary', icon: '', event: 'openViewPage', show: true,disabled:this.$hasPerm('view')},//event值为notification.js中定义的方法名
        //     //默认修改按钮
        //     {label:this.$t('table.edit'), type: 'success', icon: '', event: 'openEditPage', show: true,disabled:this.$hasPerm('edit')},//event值为notification.js中定义的方法名
        //     //默认删除按钮
        //     {label:this.$t('table.delete'), type: 'danger', icon: '', event: 'deleteData', show: true,disabled:this.$hasPerm('delete')},//event值为notification.js中定义的方法名
        //   ]
        // }
      },
      // 弹窗表单
      diaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}// 配置的表单字段校验规则集合
      }
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
        { label: this.$t('goodsForewarn.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('goodsForewarn.areaId'), value: 'areaId', type: 'slot' },
        { label: this.$t('goodsForewarn.lotId'), value: 'lotId', type: 'slot' },
        { label: this.$t('goodsForewarn.barcode'), value: 'barcode', type: 'input' },

        { label: this.$t('goodsForewarn.instoreDateStart'), value: 'instoreDateStart', type: 'date', dateType: 'date', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd' },
        { label: this.$t('goodsForewarn.instoreDateEnd'), value: 'instoreDateEnd', type: 'date', dateType: 'date', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd' },
        { label: this.$t('goodsForewarn.validityDateStart'), value: 'validityDateStart', type: 'date', dateType: 'date', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd' },
        { label: this.$t('goodsForewarn.validityDateEnd'), value: 'validityDateEnd', type: 'date', dateType: 'date', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd' },
        { label: this.$t('goodsForewarn.productionDateStart'), value: 'productionDateStart', type: 'date', dateType: 'date', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd' },
        { label: this.$t('goodsForewarn.productionDateEnd'), value: 'productionDateEnd', type: 'date', dateType: 'date', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('goodsForewarn.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('goodsForewarn.areaId'), value: 'areaId', type: 'slot' },
        { label: this.$t('goodsForewarn.lotId'), value: 'lotId', type: 'slot' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'areaName', label: this.$t('goodsForewarn.areaName'), minWidth: 100 },
        { prop: 'zoneName', label: this.$t('goodsForewarn.zoneName'), minWidth: 100 },
        { prop: 'lotName', label: this.$t('goodsForewarn.lotName'), minWidth: 100 },

        { prop: 'skuCode', label: this.$t('goodsForewarn.invPro.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('goodsForewarn.invPro.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('goodsForewarn.invPro.skuName'), minWidth: 100 },
        { prop: 'tradeName', label: this.$t('goodsForewarn.invPro.tradeName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('goodsForewarn.invPro.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('goodsForewarn.invPro.mainUnit'), minWidth: 100 },
        { prop: 'perQty', label: this.$t('goodsForewarn.invPro.perQty'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('goodsForewarn.invPro.drugForm'), minWidth: 100 },
        { prop: 'mfgName', label: this.$t('goodsForewarn.invPro.mfgName'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('goodsForewarn.invPro.originCountry'), minWidth: 100 },
        { prop: 'approvalNumber', label: this.$t('goodsForewarn.invPro.approvalNumber'), minWidth: 100 },
        { prop: 'brandName', label: this.$t('goodsForewarn.invPro.brandName'), minWidth: 100 },
        { prop: 'tempControlName', label: this.$t('goodsForewarn.invPro.tempControlName'), minWidth: 100 },
        { prop: 'validityDay', label: this.$t('goodsForewarn.invPro.validityDay'), minWidth: 100 },

        { prop: 'supplierName', label: this.$t('goodsForewarn.supplierName'), minWidth: 100 },
        { prop: 'validityDay', label: this.$t('goodsForewarn.validityDay'), minWidth: 100 },

        { prop: 'batchNo', label: this.$t('goodsForewarn.invPro.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('goodsForewarn.invPro.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('goodsForewarn.invPro.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('goodsForewarn.invPro.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('goodsForewarn.invPro.invalidDate'), minWidth: 100 },
        { prop: 'sterileNo', label: this.$t('goodsForewarn.invPro.sterileNo'), minWidth: 100 },
        { prop: 'sterileInvaliDate', label: this.$t('goodsForewarn.invPro.sterileInvaliDate'), minWidth: 100 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('goodsForewarn.id'), value: 'id', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.companyCode'), value: 'companyCode', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.ownerId'), value: 'ownerId', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.supplierId'), value: 'supplierId', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.sysSkuCode'), value: 'sysSkuCode', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.skuCode'), value: 'skuCode', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.skuName'), value: 'skuName', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.skuCategory'), value: 'skuCategory', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.spec'), value: 'spec', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.brandName'), value: 'brandName', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.barcode'), value: 'barcode', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.mainUnit'), value: 'mainUnit', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.recUnit'), value: 'recUnit', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.obUnit'), value: 'obUnit', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.invUnit'), value: 'invUnit', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.hgSkuCode'), value: 'hgSkuCode', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.hgSkuName'), value: 'hgSkuName', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.length'), value: 'length', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.width'), value: 'width', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.height'), value: 'height', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.vol'), value: 'vol', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.grossWeight'), value: 'grossWeight', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.netWeight'), value: 'netWeight', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.costPrice'), value: 'costPrice', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.tagPrice'), value: 'tagPrice', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.salePrice'), value: 'salePrice', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.abc'), value: 'abc', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.mfgId'), value: 'mfgId', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.mfg'), value: 'mfg', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.outFactoryCode'), value: 'outFactoryCode', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.model'), value: 'model', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.originCountry'), value: 'originCountry', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.typeNo'), value: 'typeNo', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.colour'), value: 'colour', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.size'), value: 'size', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.logistics'), value: 'logistics', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.isBatchManage'), value: 'isBatchManage', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.batchId'), value: 'batchId', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.isSerialNumber'), value: 'isSerialNumber', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.serialNumberId'), value: 'serialNumberId', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.isValidity'), value: 'isValidity', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.validityType'), value: 'validityType', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.validityDay'), value: 'validityDay', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.warmValidityDay'), value: 'warmValidityDay', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.inWhValidity'), value: 'inWhValidity', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.outWhValidity'), value: 'outWhValidity', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.isValuables'), value: 'isValuables', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.isCombination'), value: 'isCombination', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.isGift'), value: 'isGift', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.isFresh'), value: 'isFresh', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.isConsumables'), value: 'isConsumables', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.perQty'), value: 'perQty', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.midPackQty'), value: 'midPackQty', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.isEnable'), value: 'isEnable', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.remark'), value: 'remark', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.creator'), value: 'creator', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.creatorName'), value: 'creatorName', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.createTime'), value: 'createTime', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.updater'), value: 'updater', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.updaterName'), value: 'updaterName', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.updateTime'), value: 'updateTime', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.optimistic'), value: 'optimistic', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.barcodeTwo'), value: 'barcodeTwo', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.barcodeThree'), value: 'barcodeThree', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.sourceId'), value: 'sourceId', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.sourceName'), value: 'sourceName', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.sourceSpec'), value: 'sourceSpec', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.defaultZoneId'), value: 'defaultZoneId', type: 'input', readonly: true },
        { label: this.$t('goodsForewarn.defaultLotId'), value: 'defaultLotId', type: 'input', readonly: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('goodsForewarn.id'), value: 'id', type: 'input' },
        { label: this.$t('goodsForewarn.companyCode'), value: 'companyCode', type: 'input' },
        { label: this.$t('goodsForewarn.ownerId'), value: 'ownerId', type: 'input' },
        { label: this.$t('goodsForewarn.supplierId'), value: 'supplierId', type: 'input' },
        { label: this.$t('goodsForewarn.sysSkuCode'), value: 'sysSkuCode', type: 'input' },
        { label: this.$t('goodsForewarn.skuCode'), value: 'skuCode', type: 'input' },
        { label: this.$t('goodsForewarn.skuName'), value: 'skuName', type: 'input' },
        { label: this.$t('goodsForewarn.skuCategory'), value: 'skuCategory', type: 'input' },
        { label: this.$t('goodsForewarn.spec'), value: 'spec', type: 'input' },
        { label: this.$t('goodsForewarn.brandName'), value: 'brandName', type: 'input' },
        { label: this.$t('goodsForewarn.barcode'), value: 'barcode', type: 'input' },
        { label: this.$t('goodsForewarn.mainUnit'), value: 'mainUnit', type: 'input' },
        { label: this.$t('goodsForewarn.recUnit'), value: 'recUnit', type: 'input' },
        { label: this.$t('goodsForewarn.obUnit'), value: 'obUnit', type: 'input' },
        { label: this.$t('goodsForewarn.invUnit'), value: 'invUnit', type: 'input' },
        { label: this.$t('goodsForewarn.hgSkuCode'), value: 'hgSkuCode', type: 'input' },
        { label: this.$t('goodsForewarn.hgSkuName'), value: 'hgSkuName', type: 'input' },
        { label: this.$t('goodsForewarn.length'), value: 'length', type: 'input' },
        { label: this.$t('goodsForewarn.width'), value: 'width', type: 'input' },
        { label: this.$t('goodsForewarn.height'), value: 'height', type: 'input' },
        { label: this.$t('goodsForewarn.vol'), value: 'vol', type: 'input' },
        { label: this.$t('goodsForewarn.grossWeight'), value: 'grossWeight', type: 'input' },
        { label: this.$t('goodsForewarn.netWeight'), value: 'netWeight', type: 'input' },
        { label: this.$t('goodsForewarn.costPrice'), value: 'costPrice', type: 'input' },
        { label: this.$t('goodsForewarn.tagPrice'), value: 'tagPrice', type: 'input' },
        { label: this.$t('goodsForewarn.salePrice'), value: 'salePrice', type: 'input' },
        { label: this.$t('goodsForewarn.abc'), value: 'abc', type: 'input' },
        { label: this.$t('goodsForewarn.mfgId'), value: 'mfgId', type: 'input' },
        { label: this.$t('goodsForewarn.mfg'), value: 'mfg', type: 'input' },
        { label: this.$t('goodsForewarn.outFactoryCode'), value: 'outFactoryCode', type: 'input' },
        { label: this.$t('goodsForewarn.model'), value: 'model', type: 'input' },
        { label: this.$t('goodsForewarn.originCountry'), value: 'originCountry', type: 'input' },
        { label: this.$t('goodsForewarn.typeNo'), value: 'typeNo', type: 'input' },
        { label: this.$t('goodsForewarn.colour'), value: 'colour', type: 'input' },
        { label: this.$t('goodsForewarn.size'), value: 'size', type: 'input' },
        { label: this.$t('goodsForewarn.logistics'), value: 'logistics', type: 'input' },
        { label: this.$t('goodsForewarn.isBatchManage'), value: 'isBatchManage', type: 'input' },
        { label: this.$t('goodsForewarn.batchId'), value: 'batchId', type: 'input' },
        { label: this.$t('goodsForewarn.isSerialNumber'), value: 'isSerialNumber', type: 'input' },
        { label: this.$t('goodsForewarn.serialNumberId'), value: 'serialNumberId', type: 'input' },
        { label: this.$t('goodsForewarn.isValidity'), value: 'isValidity', type: 'input' },
        { label: this.$t('goodsForewarn.validityType'), value: 'validityType', type: 'input' },
        { label: this.$t('goodsForewarn.validityDay'), value: 'validityDay', type: 'input' },
        { label: this.$t('goodsForewarn.warmValidityDay'), value: 'warmValidityDay', type: 'input' },
        { label: this.$t('goodsForewarn.inWhValidity'), value: 'inWhValidity', type: 'input' },
        { label: this.$t('goodsForewarn.outWhValidity'), value: 'outWhValidity', type: 'input' },
        { label: this.$t('goodsForewarn.isValuables'), value: 'isValuables', type: 'input' },
        { label: this.$t('goodsForewarn.isCombination'), value: 'isCombination', type: 'input' },
        { label: this.$t('goodsForewarn.isGift'), value: 'isGift', type: 'input' },
        { label: this.$t('goodsForewarn.isFresh'), value: 'isFresh', type: 'input' },
        { label: this.$t('goodsForewarn.isConsumables'), value: 'isConsumables', type: 'input' },
        { label: this.$t('goodsForewarn.perQty'), value: 'perQty', type: 'input' },
        { label: this.$t('goodsForewarn.midPackQty'), value: 'midPackQty', type: 'input' },
        { label: this.$t('goodsForewarn.isEnable'), value: 'isEnable', type: 'input' },
        { label: this.$t('goodsForewarn.remark'), value: 'remark', type: 'input' },
        { label: this.$t('goodsForewarn.creator'), value: 'creator', type: 'input' },
        { label: this.$t('goodsForewarn.creatorName'), value: 'creatorName', type: 'input' },
        { label: this.$t('goodsForewarn.createTime'), value: 'createTime', type: 'input' },
        { label: this.$t('goodsForewarn.updater'), value: 'updater', type: 'input' },
        { label: this.$t('goodsForewarn.updaterName'), value: 'updaterName', type: 'input' },
        { label: this.$t('goodsForewarn.updateTime'), value: 'updateTime', type: 'input' },
        { label: this.$t('goodsForewarn.optimistic'), value: 'optimistic', type: 'input' },
        { label: this.$t('goodsForewarn.barcodeTwo'), value: 'barcodeTwo', type: 'input' },
        { label: this.$t('goodsForewarn.barcodeThree'), value: 'barcodeThree', type: 'input' },
        { label: this.$t('goodsForewarn.sourceId'), value: 'sourceId', type: 'input' },
        { label: this.$t('goodsForewarn.sourceName'), value: 'sourceName', type: 'input' },
        { label: this.$t('goodsForewarn.sourceSpec'), value: 'sourceSpec', type: 'input' },
        { label: this.$t('goodsForewarn.defaultZoneId'), value: 'defaultZoneId', type: 'input' },
        { label: this.$t('goodsForewarn.defaultLotId'), value: 'defaultLotId', type: 'input' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('goodsForewarn.companyCode'), value: 'companyCode', type: 'input' },
        { label: this.$t('goodsForewarn.ownerId'), value: 'ownerId', type: 'input' },
        { label: this.$t('goodsForewarn.supplierId'), value: 'supplierId', type: 'input' },
        { label: this.$t('goodsForewarn.sysSkuCode'), value: 'sysSkuCode', type: 'input' },
        { label: this.$t('goodsForewarn.skuCode'), value: 'skuCode', type: 'input' },
        { label: this.$t('goodsForewarn.skuName'), value: 'skuName', type: 'input' },
        { label: this.$t('goodsForewarn.skuCategory'), value: 'skuCategory', type: 'input' },
        { label: this.$t('goodsForewarn.spec'), value: 'spec', type: 'input' },
        { label: this.$t('goodsForewarn.brandName'), value: 'brandName', type: 'input' },
        { label: this.$t('goodsForewarn.barcode'), value: 'barcode', type: 'input' },
        { label: this.$t('goodsForewarn.mainUnit'), value: 'mainUnit', type: 'input' },
        { label: this.$t('goodsForewarn.recUnit'), value: 'recUnit', type: 'input' },
        { label: this.$t('goodsForewarn.obUnit'), value: 'obUnit', type: 'input' },
        { label: this.$t('goodsForewarn.invUnit'), value: 'invUnit', type: 'input' },
        { label: this.$t('goodsForewarn.hgSkuCode'), value: 'hgSkuCode', type: 'input' },
        { label: this.$t('goodsForewarn.hgSkuName'), value: 'hgSkuName', type: 'input' },
        { label: this.$t('goodsForewarn.length'), value: 'length', type: 'input' },
        { label: this.$t('goodsForewarn.width'), value: 'width', type: 'input' },
        { label: this.$t('goodsForewarn.height'), value: 'height', type: 'input' },
        { label: this.$t('goodsForewarn.vol'), value: 'vol', type: 'input' },
        { label: this.$t('goodsForewarn.grossWeight'), value: 'grossWeight', type: 'input' },
        { label: this.$t('goodsForewarn.netWeight'), value: 'netWeight', type: 'input' },
        { label: this.$t('goodsForewarn.costPrice'), value: 'costPrice', type: 'input' },
        { label: this.$t('goodsForewarn.tagPrice'), value: 'tagPrice', type: 'input' },
        { label: this.$t('goodsForewarn.salePrice'), value: 'salePrice', type: 'input' },
        { label: this.$t('goodsForewarn.abc'), value: 'abc', type: 'input' },
        { label: this.$t('goodsForewarn.mfgId'), value: 'mfgId', type: 'input' },
        { label: this.$t('goodsForewarn.mfg'), value: 'mfg', type: 'input' },
        { label: this.$t('goodsForewarn.outFactoryCode'), value: 'outFactoryCode', type: 'input' },
        { label: this.$t('goodsForewarn.model'), value: 'model', type: 'input' },
        { label: this.$t('goodsForewarn.originCountry'), value: 'originCountry', type: 'input' },
        { label: this.$t('goodsForewarn.typeNo'), value: 'typeNo', type: 'input' },
        { label: this.$t('goodsForewarn.colour'), value: 'colour', type: 'input' },
        { label: this.$t('goodsForewarn.size'), value: 'size', type: 'input' },
        { label: this.$t('goodsForewarn.logistics'), value: 'logistics', type: 'input' },
        { label: this.$t('goodsForewarn.isBatchManage'), value: 'isBatchManage', type: 'input' },
        { label: this.$t('goodsForewarn.batchId'), value: 'batchId', type: 'input' },
        { label: this.$t('goodsForewarn.isSerialNumber'), value: 'isSerialNumber', type: 'input' },
        { label: this.$t('goodsForewarn.serialNumberId'), value: 'serialNumberId', type: 'input' },
        { label: this.$t('goodsForewarn.isValidity'), value: 'isValidity', type: 'input' },
        { label: this.$t('goodsForewarn.validityType'), value: 'validityType', type: 'input' },
        { label: this.$t('goodsForewarn.validityDay'), value: 'validityDay', type: 'input' },
        { label: this.$t('goodsForewarn.warmValidityDay'), value: 'warmValidityDay', type: 'input' },
        { label: this.$t('goodsForewarn.inWhValidity'), value: 'inWhValidity', type: 'input' },
        { label: this.$t('goodsForewarn.outWhValidity'), value: 'outWhValidity', type: 'input' },
        { label: this.$t('goodsForewarn.isValuables'), value: 'isValuables', type: 'input' },
        { label: this.$t('goodsForewarn.isCombination'), value: 'isCombination', type: 'input' },
        { label: this.$t('goodsForewarn.isGift'), value: 'isGift', type: 'input' },
        { label: this.$t('goodsForewarn.isFresh'), value: 'isFresh', type: 'input' },
        { label: this.$t('goodsForewarn.isConsumables'), value: 'isConsumables', type: 'input' },
        { label: this.$t('goodsForewarn.perQty'), value: 'perQty', type: 'input' },
        { label: this.$t('goodsForewarn.midPackQty'), value: 'midPackQty', type: 'input' },
        { label: this.$t('goodsForewarn.isEnable'), value: 'isEnable', type: 'input' },
        { label: this.$t('goodsForewarn.remark'), value: 'remark', type: 'input' },
        { label: this.$t('goodsForewarn.creator'), value: 'creator', type: 'input' },
        { label: this.$t('goodsForewarn.creatorName'), value: 'creatorName', type: 'input' },
        { label: this.$t('goodsForewarn.createTime'), value: 'createTime', type: 'input' },
        { label: this.$t('goodsForewarn.updater'), value: 'updater', type: 'input' },
        { label: this.$t('goodsForewarn.updaterName'), value: 'updaterName', type: 'input' },
        { label: this.$t('goodsForewarn.updateTime'), value: 'updateTime', type: 'input' },
        { label: this.$t('goodsForewarn.optimistic'), value: 'optimistic', type: 'input' },
        { label: this.$t('goodsForewarn.barcodeTwo'), value: 'barcodeTwo', type: 'input' },
        { label: this.$t('goodsForewarn.barcodeThree'), value: 'barcodeThree', type: 'input' },
        { label: this.$t('goodsForewarn.sourceId'), value: 'sourceId', type: 'input' },
        { label: this.$t('goodsForewarn.sourceName'), value: 'sourceName', type: 'input' },
        { label: this.$t('goodsForewarn.sourceSpec'), value: 'sourceSpec', type: 'input' },
        { label: this.$t('goodsForewarn.defaultZoneId'), value: 'defaultZoneId', type: 'input' },
        { label: this.$t('goodsForewarn.defaultLotId'), value: 'defaultLotId', type: 'input' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        validityType: [{ required: true, message: this.$t('goodsForewarn.msg.validityType'), trigger: 'blur' }],
        invUnit: [{ required: true, message: this.$t('goodsForewarn.msg.invUnit'), trigger: 'blur' }],
        isEnable: [{ required: true, message: this.$t('goodsForewarn.msg.isEnable'), trigger: 'blur' }],
        ownerId: [{ required: true, message: this.$t('goodsForewarn.msg.ownerId'), trigger: 'blur' }],
        netWeight: [{ required: true, message: this.$t('goodsForewarn.msg.netWeight'), trigger: 'blur' }],
        spec: [{ required: true, message: this.$t('goodsForewarn.msg.spec'), trigger: 'blur' }],
        perQty: [{ required: true, message: this.$t('goodsForewarn.msg.perQty'), trigger: 'blur' }],
        isValuables: [{ required: true, message: this.$t('goodsForewarn.msg.isValuables'), trigger: 'blur' }],
        tagPrice: [{ required: true, message: this.$t('goodsForewarn.msg.tagPrice'), trigger: 'blur' }],
        skuName: [{ required: true, message: this.$t('goodsForewarn.msg.skuName'), trigger: 'blur' }],
        model: [{ required: true, message: this.$t('goodsForewarn.msg.model'), trigger: 'blur' }],
        id: [{ required: true, message: this.$t('goodsForewarn.msg.id'), trigger: 'blur' }],
        grossWeight: [{ required: true, message: this.$t('goodsForewarn.msg.grossWeight'), trigger: 'blur' }],
        barcode: [{ required: true, message: this.$t('goodsForewarn.msg.barcode'), trigger: 'blur' }],
        height: [{ required: true, message: this.$t('goodsForewarn.msg.height'), trigger: 'blur' }],
        createTime: [{ required: true, message: this.$t('goodsForewarn.msg.createTime'), trigger: 'blur' }],
        brandName: [{ required: true, message: this.$t('goodsForewarn.msg.brandName'), trigger: 'blur' }],
        isCombination: [{ required: true, message: this.$t('goodsForewarn.msg.isCombination'), trigger: 'blur' }],
        recUnit: [{ required: true, message: this.$t('goodsForewarn.msg.recUnit'), trigger: 'blur' }],
        barcodeTwo: [{ required: true, message: this.$t('goodsForewarn.msg.barcodeTwo'), trigger: 'blur' }],
        isGift: [{ required: true, message: this.$t('goodsForewarn.msg.isGift'), trigger: 'blur' }],
        size: [{ required: true, message: this.$t('goodsForewarn.msg.size'), trigger: 'blur' }],
        sysSkuCode: [{ required: true, message: this.$t('goodsForewarn.msg.sysSkuCode'), trigger: 'blur' }],
        serialNumberId: [{ required: true, message: this.$t('goodsForewarn.msg.serialNumberId'), trigger: 'blur' }],
        skuCategory: [{ required: true, message: this.$t('goodsForewarn.msg.skuCategory'), trigger: 'blur' }],
        supplierId: [{ required: true, message: this.$t('goodsForewarn.msg.supplierId'), trigger: 'blur' }],
        skuCode: [{ required: true, message: this.$t('goodsForewarn.msg.skuCode'), trigger: 'blur' }],
        defaultZoneId: [{ required: true, message: this.$t('goodsForewarn.msg.defaultZoneId'), trigger: 'blur' }],
        mainUnit: [{ required: true, message: this.$t('goodsForewarn.msg.mainUnit'), trigger: 'blur' }],
        typeNo: [{ required: true, message: this.$t('goodsForewarn.msg.typeNo'), trigger: 'blur' }],
        mfgId: [{ required: true, message: this.$t('goodsForewarn.msg.mfgId'), trigger: 'blur' }],
        inWhValidity: [{ required: true, message: this.$t('goodsForewarn.msg.inWhValidity'), trigger: 'blur' }],
        hgSkuCode: [{ required: true, message: this.$t('goodsForewarn.msg.hgSkuCode'), trigger: 'blur' }],
        batchId: [{ required: true, message: this.$t('goodsForewarn.msg.batchId'), trigger: 'blur' }],
        warmValidityDay: [{ required: true, message: this.$t('goodsForewarn.msg.warmValidityDay'), trigger: 'blur' }],
        logistics: [{ required: true, message: this.$t('goodsForewarn.msg.logistics'), trigger: 'blur' }],
        remark: [{ required: true, message: this.$t('goodsForewarn.msg.remark'), trigger: 'blur' }],
        validityDay: [{ required: true, message: this.$t('goodsForewarn.msg.validityDay'), trigger: 'blur' }],
        isSerialNumber: [{ required: true, message: this.$t('goodsForewarn.msg.isSerialNumber'), trigger: 'blur' }],
        defaultLotId: [{ required: true, message: this.$t('goodsForewarn.msg.defaultLotId'), trigger: 'blur' }],
        updater: [{ required: true, message: this.$t('goodsForewarn.msg.updater'), trigger: 'blur' }],
        optimistic: [{ required: true, message: this.$t('goodsForewarn.msg.optimistic'), trigger: 'blur' }],
        vol: [{ required: true, message: this.$t('goodsForewarn.msg.vol'), trigger: 'blur' }],
        updateTime: [{ required: true, message: this.$t('goodsForewarn.msg.updateTime'), trigger: 'blur' }],
        outFactoryCode: [{ required: true, message: this.$t('goodsForewarn.msg.outFactoryCode'), trigger: 'blur' }],
        companyCode: [{ required: true, message: this.$t('goodsForewarn.msg.companyCode'), trigger: 'blur' }],
        isValidity: [{ required: true, message: this.$t('goodsForewarn.msg.isValidity'), trigger: 'blur' }],
        costPrice: [{ required: true, message: this.$t('goodsForewarn.msg.costPrice'), trigger: 'blur' }],
        midPackQty: [{ required: true, message: this.$t('goodsForewarn.msg.midPackQty'), trigger: 'blur' }],
        creator: [{ required: true, message: this.$t('goodsForewarn.msg.creator'), trigger: 'blur' }],
        abc: [{ required: true, message: this.$t('goodsForewarn.msg.abc'), trigger: 'blur' }],
        isBatchManage: [{ required: true, message: this.$t('goodsForewarn.msg.isBatchManage'), trigger: 'blur' }],
        length: [{ required: true, message: this.$t('goodsForewarn.msg.length'), trigger: 'blur' }],
        salePrice: [{ required: true, message: this.$t('goodsForewarn.msg.salePrice'), trigger: 'blur' }],
        isFresh: [{ required: true, message: this.$t('goodsForewarn.msg.isFresh'), trigger: 'blur' }],
        mfg: [{ required: true, message: this.$t('goodsForewarn.msg.mfg'), trigger: 'blur' }],
        originCountry: [{ required: true, message: this.$t('goodsForewarn.msg.originCountry'), trigger: 'blur' }],
        obUnit: [{ required: true, message: this.$t('goodsForewarn.msg.obUnit'), trigger: 'blur' }],
        updaterName: [{ required: true, message: this.$t('goodsForewarn.msg.updaterName'), trigger: 'blur' }],
        outWhValidity: [{ required: true, message: this.$t('goodsForewarn.msg.outWhValidity'), trigger: 'blur' }],
        colour: [{ required: true, message: this.$t('goodsForewarn.msg.colour'), trigger: 'blur' }],
        width: [{ required: true, message: this.$t('goodsForewarn.msg.width'), trigger: 'blur' }],
        creatorName: [{ required: true, message: this.$t('goodsForewarn.msg.creatorName'), trigger: 'blur' }],
        isConsumables: [{ required: true, message: this.$t('goodsForewarn.msg.isConsumables'), trigger: 'blur' }],
        hgSkuName: [{ required: true, message: this.$t('goodsForewarn.msg.hgSkuName'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        areaId: null,
        lotId: null,
        ownerId: null,
        barcode: null,
        instoreDateStart: null,
        instoreDateEnd: null,
        validityDateStart: null,
        validityDateEnd: null,
        productionDateStart: null,
        productionDateEnd: null
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
