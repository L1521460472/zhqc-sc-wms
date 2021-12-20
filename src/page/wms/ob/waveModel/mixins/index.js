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
          modelName: null,
          isEnable: null,
          createTimeBegin: null,
          createTimeEnd: null,
          enableTimeBegin: null,
          enableTimeEnd: null,
          deactivateTimeBegin: null,
          deactivateTimeEnd: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        payMethodList: [],
        waveMethodList: [],
        enableList: [],
        whetherList: [],
        soTypeList: [],
        soStatusList: [],
        pickModeList: []
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
            { label: '复制', type: 'primary', icon: '', event: 'openCopyPage', show: true, disabled: this.$hasPerm('copy') }, // event值为notification.js中定义的方法名
            // 默认删除按钮
            // {label:this.$t('table.delete'), type: 'danger', icon: '', event: 'deleteData', show: true,disabled:this.$hasPerm('delete')},//event值为notification.js中定义的方法名
            // 自定义按钮
            { slot: true, icon: '', event: 'slotEvent' }// event值为notification.js中定义的方法名

          ]
        }
      },
      // 弹窗表单
      diaFormInfo: {
        labelWidth: '140px',
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        tableInfoSku: {
          ref: null,
          fieldList: null,
          handle: {
            fixed: 'right',
            label: this.$t('table.actions'), // 操作列名
            width: '100', // 默认操作按钮列宽度
            btList: [// 添加操作按钮
              // 默认删除按钮
              { label: this.$t('table.delete'), type: 'danger', icon: '', event: 'deleteSku', show: true, disabled: false }// event值为notification.js中定义的方法名
            ]
          },
          data: [],
          deleteIds: [],
          topBtn: { label: '添加产品', show: true, type: 'primary', disabled: false, loading: false, event: 'openSkuPage' }
        }

      },
      diaFormInfoSku: {
        labelWidth: '140px',
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}// 配置的表单字段校验规则集合
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
        { label: this.$t('waveModel.modelName'), value: 'modelName', type: 'input' },
        { label: this.$t('waveModel.isEnable'), value: 'isEnable', type: 'select', list: 'enableList' },
        { label: this.$t('waveModel.createTimeBegin'), value: 'createTimeBegin', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('waveModel.createTimeEnd'), value: 'createTimeEnd', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('waveModel.enableTimeBegin'), value: 'enableTimeBegin', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('waveModel.enableTimeEnd'), value: 'enableTimeEnd', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('waveModel.deactivateTimeBegin'), value: 'deactivateTimeBegin', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('waveModel.deactivateTimeEnd'), value: 'deactivateTimeEnd', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }
      ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'modelName', label: this.$t('waveModel.modelName'), minWidth: 100 },
        { prop: 'remark', label: this.$t('waveModel.remark'), minWidth: 100 },
        { prop: 'waveMethodName', label: this.$t('waveModel.waveMethod'), minWidth: 100 },
        { prop: 'pickModeName', label: this.$t('waveModel.pickMode'), minWidth: 100 },
        { prop: 'orderMaxQty', label: this.$t('waveModel.orderMaxQty'), minWidth: 100 },
        { prop: 'orderMinQty', label: this.$t('waveModel.orderMinQty'), minWidth: 100 },
        { prop: 'isEnableName', label: this.$t('waveModel.isEnable'), minWidth: 100 },
        { prop: 'creatorName', label: this.$t('waveModel.creatorName'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('waveModel.createTime'), minWidth: 100 },
        { prop: 'updaterName', label: this.$t('waveModel.updaterName'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('waveModel.updateTime'), minWidth: 100 },
        { prop: 'enableName', label: this.$t('waveModel.enableName'), minWidth: 100 },
        { prop: 'enableTime', label: this.$t('waveModel.enableTime'), minWidth: 100 },
        { prop: 'deactivateName', label: this.$t('waveModel.deactivateName'), minWidth: 100 },
        { prop: 'deactivateTime', label: this.$t('waveModel.deactivateTime'), minWidth: 100 }
      ]

      // 初始化明细表格
      this.diaFormInfo.tableInfoSku.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'baseSku.skuCode', label: this.$t('inventoryFrozen.dt.skuCode'), minWidth: 100 },
        { prop: 'baseSku.barcode', label: this.$t('inventoryFrozen.dt.barcode'), minWidth: 100 },
        { prop: 'baseSku.skuName', label: this.$t('inventoryFrozen.dt.skuName'), minWidth: 100 },
        { prop: 'baseSku.tradeName', label: this.$t('inventoryFrozen.dt.tradeName'), minWidth: 100 },
        { prop: 'baseSku.spec', label: this.$t('inventoryFrozen.dt.spec'), minWidth: 100 },
        { prop: 'baseSku.mainUnit', label: this.$t('inventoryFrozen.dt.mainUnit'), minWidth: 100 },
        { prop: 'baseSku.drugForm', label: this.$t('inventoryFrozen.dt.drugForm'), minWidth: 100 },
        { prop: 'baseSku.mfgName', label: this.$t('inventoryFrozen.dt.mfgName'), minWidth: 100 },
        { prop: 'baseSku.originCountry', label: this.$t('inventoryFrozen.dt.originCountry'), minWidth: 100 },
        { prop: 'baseSku.approvalNumber', label: this.$t('inventoryFrozen.dt.approvalNumber'), minWidth: 100 },
        { prop: 'baseSku.brandName', label: this.$t('inventoryFrozen.dt.brandName'), minWidth: 100 },
        { prop: 'baseSku.tempControlName', label: this.$t('inventoryFrozen.dt.tempControlName'), minWidth: 100 },
        { prop: 'baseSku.validityDay', label: this.$t('inventoryFrozen.dt.validityDay'), minWidth: 100 }
      ]
      this.diaFormInfoSku.fieldList = [
        { label: this.$t('inventoryFrozen.dt.skuCode'), value: 'skuId', type: 'slot' },
        { label: this.$t('inventoryFrozen.dt.barcode'), value: 'barcode', type: 'input', disabled: true },
        { label: this.$t('inventoryFrozen.dt.skuName'), value: 'skuName', type: 'input', disabled: true },
        { label: this.$t('inventoryFrozen.dt.tradeName'), value: 'tradeName', type: 'input', disabled: true },
        { label: this.$t('inventoryFrozen.dt.spec'), value: 'spec', type: 'input', disabled: true },
        { label: this.$t('inventoryFrozen.dt.mainUnit'), value: 'mainUnit', type: 'input', disabled: true },
        { label: this.$t('inventoryFrozen.dt.drugForm'), value: 'drugForm', type: 'input', disabled: true },
        { label: this.$t('inventoryFrozen.dt.mfgName'), value: 'mfgName', type: 'input', disabled: true },
        { label: this.$t('inventoryFrozen.dt.originCountry'), value: 'originCountry', type: 'input', disabled: true },
        { label: this.$t('inventoryFrozen.dt.approvalNumber'), value: 'approvalNumber', type: 'input', disabled: true },
        { label: this.$t('inventoryFrozen.dt.brandName'), value: 'brandName', type: 'input', disabled: true },
        { label: this.$t('inventoryFrozen.dt.tempControlName'), value: 'tempControlName', type: 'input', disabled: true },
        { label: this.$t('inventoryFrozen.dt.validityDay'), value: 'validityDay', type: 'input', disabled: true }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('waveModel.modelName'), value: 'modelName', type: 'input', disabled: true },
        { label: this.$t('waveModel.remark'), value: 'remark', type: 'input', disabled: true },
        { label: this.$t('waveModel.pickMode'), value: 'pickMode', type: 'select', list: 'pickModeList', disabled: true },

        { label: this.$t('waveModel.ownerId'), value: 'ownerId', type: 'slot', disabled: true },
        { label: this.$t('waveModel.soTypeList'), value: 'soTypeList', type: 'slot', disabled: true },
        { label: this.$t('waveModel.soStatusList'), value: 'soStatusList', type: 'slot', disabled: true },
        { label: this.$t('waveModel.partnerStoreId'), value: 'partnerStoreId', type: 'slot', disabled: true },
        { label: this.$t('waveModel.partnerId'), value: 'partnerId', type: 'slot', disabled: true },
        { label: this.$t('waveModel.payMethod'), value: 'payMethod', type: 'select', list: 'payMethodList', disabled: true },
        // {label: this.$t('waveModel.whZoneId'), value: "whZoneId", type: "slot",disabled:true},
        { label: this.$t('waveModel.provinceId'), value: 'provinceId', type: 'slot', disabled: true },
        { label: this.$t('waveModel.cityId'), value: 'cityId', type: 'slot', disabled: true },
        { label: this.$t('waveModel.isHasInvoice'), value: 'isHasInvoice', type: 'select', list: 'whetherList', disabled: true },
        { label: this.$t('waveModel.waveMethod'), value: 'waveMethod', type: 'select', list: 'waveMethodList', disabled: true },
        { label: this.$t('waveModel.orderMaxQty'), value: 'orderMaxQty', type: 'number', min: 1, disabled: true },
        { label: this.$t('waveModel.orderMinQty'), value: 'orderMinQty', type: 'number', min: 1, disabled: true },
        { label: this.$t('waveModel.orderKindMaxQty'), value: 'orderKindMaxQty', type: 'number', min: 0, disabled: true },
        { label: this.$t('waveModel.waveKindMaxQty'), value: 'waveKindMaxQty', type: 'number', min: 0, disabled: true },
        { label: this.$t('waveModel.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', disabled: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('waveModel.modelName'), value: 'modelName', type: 'input' },
        { label: this.$t('waveModel.remark'), value: 'remark', type: 'input' },
        { label: this.$t('waveModel.pickMode'), value: 'pickMode', type: 'select', list: 'pickModeList', disabled: false },

        { label: this.$t('waveModel.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('waveModel.soTypeList'), value: 'soTypeList', type: 'slot' },
        { label: this.$t('waveModel.soStatusList'), value: 'soStatusList', type: 'slot' },
        { label: this.$t('waveModel.partnerStoreId'), value: 'partnerStoreId', type: 'slot' },
        { label: this.$t('waveModel.partnerId'), value: 'partnerId', type: 'slot' },
        { label: this.$t('waveModel.payMethod'), value: 'payMethod', type: 'select', list: 'payMethodList' },
        // {label: this.$t('waveModel.whZoneId'), value: "whZoneId", type: "slot",},
        { label: this.$t('waveModel.provinceId'), value: 'provinceId', type: 'slot' },
        { label: this.$t('waveModel.cityId'), value: 'cityId', type: 'slot' },
        { label: this.$t('waveModel.isHasInvoice'), value: 'isHasInvoice', type: 'select', list: 'whetherList' },
        { label: this.$t('waveModel.waveMethod'), value: 'waveMethod', type: 'select', list: 'waveMethodList' },
        { label: this.$t('waveModel.orderMaxQty'), value: 'orderMaxQty', type: 'number', min: 1 },
        { label: this.$t('waveModel.orderMinQty'), value: 'orderMinQty', type: 'number', min: 1 },
        { label: this.$t('waveModel.orderKindMaxQty'), value: 'orderKindMaxQty', type: 'number', min: 0 },
        { label: this.$t('waveModel.waveKindMaxQty'), value: 'waveKindMaxQty', type: 'number', min: 0 }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('waveModel.modelName'), value: 'modelName', type: 'input' },
        { label: this.$t('waveModel.remark'), value: 'remark', type: 'input' },
        { label: this.$t('waveModel.pickMode'), value: 'pickMode', type: 'select', list: 'pickModeList', disabled: false },

        { label: this.$t('waveModel.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('waveModel.soTypeList'), value: 'soTypeList', type: 'slot' },
        { label: this.$t('waveModel.soStatusList'), value: 'soStatusList', type: 'slot' },
        { label: this.$t('waveModel.partnerStoreId'), value: 'partnerStoreId', type: 'slot' },
        { label: this.$t('waveModel.partnerId'), value: 'partnerId', type: 'slot' },
        { label: this.$t('waveModel.payMethod'), value: 'payMethod', type: 'select', list: 'payMethodList' },
        // {label: this.$t('waveModel.whZoneId'), value: "whZoneId", type: "slot",},
        { label: this.$t('waveModel.provinceId'), value: 'provinceId', type: 'slot' },
        { label: this.$t('waveModel.cityId'), value: 'cityId', type: 'slot' },
        { label: this.$t('waveModel.isHasInvoice'), value: 'isHasInvoice', type: 'select', list: 'whetherList' },
        { label: this.$t('waveModel.waveMethod'), value: 'waveMethod', type: 'select', list: 'waveMethodList' },
        { label: this.$t('waveModel.orderMaxQty'), value: 'orderMaxQty', type: 'number', min: 1 },
        { label: this.$t('waveModel.orderMinQty'), value: 'orderMinQty', type: 'number', min: 1 },
        { label: this.$t('waveModel.orderKindMaxQty'), value: 'orderKindMaxQty', type: 'number', min: 0 },
        { label: this.$t('waveModel.waveKindMaxQty'), value: 'waveKindMaxQty', type: 'number', min: 0 }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        // isEnable:[{required: true, message: this.$t('waveModel.msg.isEnable'), trigger: 'change'}],
        pickMode: [{ required: true, message: this.$t('waveModel.msg.pickMode'), trigger: 'change' }],
        orderMinQty: [{ required: true, message: this.$t('waveModel.msg.orderMinQty'), trigger: 'change' }],
        waveMethod: [{ required: true, message: this.$t('waveModel.msg.waveMethod'), trigger: 'change' }],
        orderMaxQty: [{ required: true, message: this.$t('waveModel.msg.orderMaxQty'), trigger: 'change' }],
        modelName: [{ required: true, message: this.$t('waveModel.msg.modelName'), trigger: 'blur' }]
      }
      this.diaFormInfoSku.rules = {
        skuId: [{ required: true, message: this.$t('waveModel.msg.skuId'), trigger: 'change' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        cityId: null,
        isEnable: 1,
        ownerId: null,
        partnerStoreId: null,
        waveKindMaxQty: null,
        remark: null,
        payMethod: null,
        orderMinQty: null,
        waveMethod: null,
        orderKindMaxQty: null,
        soStatusList: null,
        partnerId: null,
        isHasInvoice: null,
        orderMaxQty: null,
        modelName: null,
        provinceId: null,
        soTypeList: null,
        id: null,
        whZoneId: null
      }
      this.diaFormInfo.tableInfoSku.data = []
      this.diaFormInfo.tableInfoSku.deleteIds = []
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
