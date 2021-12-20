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
          roadwayId: null,
          lotCode: null,
          lotName: null,
          lotStatus: null,
          lotType: null,
          lotCategory: null,
          storageType: null,
          isEnable: null,
          zoneId: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        lotCategoryList: [],
        lotTypeList: [],
        lotStatusList: [],
        enableList: [],
        isMixProductList: [],
        isMixBatchList: [],
        isMixProductionBatchList: [],
        abcTypeList: [],
        scatteredPropertiesList: [],
        packageAttrList: [],
        storageTypeList: [],
        qualityList: [],
        turnoverLevelList: [],
        wklxList: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: null
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
        { label: this.$t('whLot.lotCode'), value: 'lotCode', type: 'input' },
        { label: this.$t('whLot.zoneId'), value: 'zoneId', type: 'slot' },
        { label: this.$t('whLot.roadwayId'), value: 'roadwayId', type: 'slot' },
        { label: this.$t('whLot.lotStatus'), value: 'lotStatus', type: 'select', list: 'lotStatusList' },
        { label: this.$t('whLot.lotType'), value: 'lotType', type: 'select', list: 'lotTypeList' },
        { label: this.$t('whLot.lotCategory'), value: 'lotCategory', type: 'select', list: 'lotCategoryList' },
        { label: this.$t('whLot.storageType'), value: 'storageType', type: 'select', list: 'storageTypeList' },
        { label: this.$t('whLot.isEnable'), value: 'isEnable', type: 'select', list: 'enableList' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('whLot.lotCode'), value: 'lotCode', type: 'input' },
        { label: this.$t('whLot.zoneId'), value: 'zoneId', type: 'slot' },
        { label: this.$t('whLot.roadwayId'), value: 'roadwayId', type: 'slot' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },

    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'lotCode', label: this.$t('whLot.lotCode'), minWidth: 100 },
        { prop: 'lotName', label: this.$t('whLot.lotName'), minWidth: 100 },
        { prop: 'areaName', label: this.$t('whLot.areaId'), minWidth: 100 },
        { prop: 'zoneName', label: this.$t('whLot.zoneId'), minWidth: 100 },
        { prop: 'roadwayName', label: this.$t('whLot.roadwayId'), minWidth: 100 },
        { prop: 'lotStatusName', label: this.$t('whLot.lotStatus'), minWidth: 100 },
        { prop: 'lotTypeName', label: this.$t('whLot.lotType'), minWidth: 100 },
        { prop: 'lotCategoryName', label: this.$t('whLot.lotCategory'), minWidth: 100 },
        { prop: 'storageTypeName', label: this.$t('whLot.storageType'), minWidth: 100 },
        { prop: 'abcType', label: this.$t('whLot.abcType'), minWidth: 100 },
        { prop: 'isEnableName', label: this.$t('whLot.isEnable'), minWidth: 100 },
        { prop: 'putawaySeq', label: this.$t('whLot.putawaySeq'), minWidth: 100 },
        { prop: 'pickSeq', label: this.$t('whLot.pickSeq'), minWidth: 100 },
        { prop: 'scatteredPropertiesName', label: this.$t('whLot.scatteredProperties'), minWidth: 100 },
        { prop: 'isMixProductName', label: this.$t('whLot.isMixProduct'), minWidth: 100 },
        { prop: 'isMixBatchName', label: this.$t('whLot.isMixBatch'), minWidth: 100 },
        { prop: 'hdRecLotCode', label: this.$t('whLot.hdRecLotCode'), minWidth: 100 },
        { prop: 'byRecLotCode', label: this.$t('whLot.byRecLotCode'), minWidth: 100 },
        { prop: 'length', label: this.$t('whLot.length'), minWidth: 100 },
        { prop: 'width', label: this.$t('whLot.width'), minWidth: 100 },
        { prop: 'height', label: this.$t('whLot.height'), minWidth: 100 },
        { prop: 'volume', label: this.$t('whLot.volume'), minWidth: 100 },
        { prop: 'weight', label: this.$t('whLot.weight'), minWidth: 100 },
        { prop: 'row', label: this.$t('whLot.row'), minWidth: 100 },
        { prop: 'column', label: this.$t('whLot.column'), minWidth: 100 },
        { prop: 'floor', label: this.$t('whLot.floor'), minWidth: 100 },
        { label: '操作', value: 'status', width: 220, type: 'slot', fixed: 'right' } // value: 'status' 对应页面上 自定义插槽的名字v-slot:col-status
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('whLot.lotCode'), value: 'lotCode', type: 'input', readonly: true },
        { label: this.$t('whLot.lotName'), value: 'lotName', type: 'input', readonly: true },
        { label: this.$t('whLot.areaId'), value: 'areaId', type: 'slot', disabled: true },
        { label: this.$t('whLot.zoneId'), value: 'zoneId', type: 'slot', disabled: true },
        { label: this.$t('whLot.roadwayId'), value: 'roadwayId', type: 'slot', disabled: true },
        { label: this.$t('whLot.lotStatus'), value: 'lotStatus', type: 'select', list: 'lotStatusList', disabled: true },
        { label: this.$t('whLot.lotType'), value: 'lotType', type: 'select', list: 'lotTypeList', disabled: true },
        { label: this.$t('whLot.lotCategory'), value: 'lotCategory', type: 'select', list: 'lotCategoryList', disabled: true },
        { label: this.$t('whLot.storageType'), value: 'storageType', type: 'select', list: 'storageTypeList', disabled: true },
        { label: this.$t('whLot.turnoverLevel'), value: 'turnoverLevel', type: 'select', list: 'turnoverLevelList', disabled: true },
        { label: this.$t('whLot.quality'), value: 'quality', type: 'select', list: 'qualityList', disabled: true },
        { label: this.$t('whLot.packageAttr'), value: 'packageAttr', type: 'select', list: 'packageAttrList', disabled: true },
        { label: this.$t('whLot.scatteredProperties'), value: 'scatteredProperties', type: 'select', list: 'scatteredPropertiesList', disabled: true },
        { label: this.$t('whLot.abcType'), value: 'abcType', type: 'select', list: 'abcTypeList', disabled: true },
        { label: this.$t('whLot.putawaySeq'), value: 'putawaySeq', type: 'input', readonly: true },
        { label: this.$t('whLot.pickSeq'), value: 'pickSeq', type: 'input', readonly: true },
        { label: this.$t('whLot.length'), value: 'length', type: 'input', readonly: true },
        { label: this.$t('whLot.width'), value: 'width', type: 'input', readonly: true },
        { label: this.$t('whLot.height'), value: 'height', type: 'input', readonly: true },
        { label: this.$t('whLot.volume'), value: 'volume', type: 'input', readonly: true },
        { label: this.$t('whLot.weight'), value: 'weight', type: 'input', readonly: true },
        { label: this.$t('whLot.row'), value: 'row', type: 'input', readonly: true },
        { label: this.$t('whLot.column'), value: 'column', type: 'input', readonly: true },
        { label: this.$t('whLot.floor'), value: 'floor', type: 'input', readonly: true },
        { label: this.$t('whLot.isMixProduct'), value: 'isMixProduct', type: 'select', list: 'isMixProductList', disabled: true },
        { label: this.$t('whLot.isMixBatch'), value: 'isMixBatch', type: 'select', list: 'isMixBatchList', disabled: true },
        { label: this.$t('whLot.isMixProductionBatch'), value: 'isMixProductionBatch', type: 'select', list: 'isMixProductionBatchList', disabled: true },
        { label: this.$t('whLot.qtyLimit'), value: 'qtyLimit', type: 'input', readonly: true },
        { label: this.$t('whLot.containerLimit'), value: 'containerLimit', type: 'input', readonly: true },
        { label: this.$t('whLot.x'), value: 'x', type: 'input', readonly: true },
        { label: this.$t('whLot.y'), value: 'y', type: 'input', readonly: true },
        { label: this.$t('whLot.z'), value: 'z', type: 'input', readonly: true },
        { label: this.$t('whLot.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', disabled: true },
        { label: this.$t('whLot.hdRecLotCode'), value: 'hdRecLotCode', type: 'input', readonly: true },
        { label: this.$t('whLot.byRecLotCode'), value: 'byRecLotCode', type: 'input', readonly: true },
        { label: this.$t('whLot.remark'), value: 'remark', type: 'textarea', disabled: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.data = {
        lotStatus: this.listTypeInfo.lotStatusList.length == 0 ? null : this.listTypeInfo.lotStatusList[0].value,
        lotCategory: this.listTypeInfo.lotCategoryList.length == 0 ? null : this.listTypeInfo.lotCategoryList[0].value,
        isEnable: this.listTypeInfo.enableList.length == 0 ? null : this.listTypeInfo.enableList[1].value,
        isMixProduct: this.listTypeInfo.isMixProductList.length == 0 ? null : this.listTypeInfo.isMixProductList[0].value,
        isMixBatch: this.listTypeInfo.isMixBatchList.length == 0 ? null : this.listTypeInfo.isMixBatchList[0].value,
        isMixProductionBatch: this.listTypeInfo.isMixProductionBatchList.length == 0 ? null : this.listTypeInfo.isMixProductionBatchList[0].value,
        scatteredProperties: this.listTypeInfo.scatteredPropertiesList.length == 0 ? null : this.listTypeInfo.scatteredPropertiesList[0].value,
        abcType: this.listTypeInfo.abcTypeList.length == 0 ? null : this.listTypeInfo.abcTypeList[0].value,
        lotType: this.listTypeInfo.lotTypeList.length == 0 ? null : this.listTypeInfo.lotTypeList[0].value
      }

      this.diaFormInfo.fieldList = [
        { label: this.$t('whLot.lotCode'), value: 'lotCode', type: 'input' },
        { label: this.$t('whLot.lotName'), value: 'lotName', type: 'input' },
        { label: this.$t('whLot.areaId'), value: 'areaId', type: 'slot' },
        { label: this.$t('whLot.zoneId'), value: 'zoneId', type: 'slot' },
        { label: this.$t('whLot.roadwayId'), value: 'roadwayId', type: 'slot' },
        { label: this.$t('whLot.lotStatus'), value: 'lotStatus', type: 'select', list: 'lotStatusList', clearable: false },
        { label: this.$t('whLot.lotType'), value: 'lotType', type: 'select', list: 'lotTypeList', clearable: false },
        { label: this.$t('whLot.lotCategory'), value: 'lotCategory', type: 'select', list: 'lotCategoryList', clearable: false },
        { label: this.$t('whLot.storageType'), value: 'storageType', type: 'select', list: 'storageTypeList', disabled: true },
        { label: this.$t('whLot.turnoverLevel'), value: 'turnoverLevel', type: 'select', list: 'turnoverLevelList', disabled: true },
        { label: this.$t('whLot.quality'), value: 'quality', type: 'select', list: 'qualityList', disabled: true },
        { label: this.$t('whLot.packageAttr'), value: 'packageAttr', type: 'select', list: 'packageAttrList', disabled: true },
        { label: this.$t('whLot.scatteredProperties'), value: 'scatteredProperties', type: 'select', list: 'scatteredPropertiesList', clearable: false },
        { label: this.$t('whLot.abcType'), value: 'abcType', type: 'select', list: 'abcTypeList', clearable: false },
        { label: this.$t('whLot.putawaySeq'), value: 'putawaySeq', type: 'input' },
        { label: this.$t('whLot.pickSeq'), value: 'pickSeq', type: 'input' },
        { label: this.$t('whLot.length'), value: 'length', type: 'number' },
        { label: this.$t('whLot.width'), value: 'width', type: 'number' },
        { label: this.$t('whLot.height'), value: 'height', type: 'number' },
        { label: this.$t('whLot.volume'), value: 'volume', type: 'number' },
        { label: this.$t('whLot.weight'), value: 'weight', type: 'number' },
        { label: this.$t('whLot.row'), value: 'row', type: 'number' },
        { label: this.$t('whLot.column'), value: 'column', type: 'number' },
        { label: this.$t('whLot.floor'), value: 'floor', type: 'number' },
        { label: this.$t('whLot.isMixProduct'), value: 'isMixProduct', type: 'select', list: 'isMixProductList', clearable: false },
        { label: this.$t('whLot.isMixBatch'), value: 'isMixBatch', type: 'select', list: 'isMixBatchList', clearable: false },
        { label: this.$t('whLot.isMixProductionBatch'), value: 'isMixProductionBatch', type: 'select', list: 'isMixProductionBatchList', clearable: false },
        { label: this.$t('whLot.qtyLimit'), value: 'qtyLimit', type: 'number' },
        { label: this.$t('whLot.containerLimit'), value: 'containerLimit', type: 'number' },
        { label: this.$t('whLot.x'), value: 'x', type: 'number' },
        { label: this.$t('whLot.y'), value: 'y', type: 'number' },
        { label: this.$t('whLot.z'), value: 'z', type: 'number' },
        { label: this.$t('whLot.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', clearable: false },
        { label: this.$t('whLot.hdRecLotCode'), value: 'hdRecLotCode', type: 'input' },
        { label: this.$t('whLot.byRecLotCode'), value: 'byRecLotCode', type: 'input' },
        { label: this.$t('whLot.remark'), value: 'remark', type: 'textarea' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('whLot.lotCode'), value: 'lotCode', type: 'input', disabled: true },
        { label: this.$t('whLot.lotName'), value: 'lotName', type: 'input' },
        { label: this.$t('whLot.areaId'), value: 'areaId', type: 'slot' },
        { label: this.$t('whLot.zoneId'), value: 'zoneId', type: 'slot' },
        { label: this.$t('whLot.roadwayId'), value: 'roadwayId', type: 'slot' },
        { label: this.$t('whLot.lotStatus'), value: 'lotStatus', type: 'select', list: 'lotStatusList', clearable: false },
        { label: this.$t('whLot.lotType'), value: 'lotType', type: 'select', list: 'lotTypeList', clearable: false },
        { label: this.$t('whLot.lotCategory'), value: 'lotCategory', type: 'select', list: 'lotCategoryList', clearable: false },
        { label: this.$t('whLot.storageType'), value: 'storageType', type: 'select', list: 'storageTypeList', disabled: true },
        { label: this.$t('whLot.turnoverLevel'), value: 'turnoverLevel', type: 'select', list: 'turnoverLevelList', disabled: true },
        { label: this.$t('whLot.quality'), value: 'quality', type: 'select', list: 'qualityList', disabled: true },
        { label: this.$t('whLot.packageAttr'), value: 'packageAttr', type: 'select', list: 'packageAttrList', disabled: true },
        { label: this.$t('whLot.scatteredProperties'), value: 'scatteredProperties', type: 'select', list: 'scatteredPropertiesList', clearable: false },
        { label: this.$t('whLot.abcType'), value: 'abcType', type: 'select', list: 'abcTypeList', clearable: false },
        { label: this.$t('whLot.putawaySeq'), value: 'putawaySeq', type: 'input' },
        { label: this.$t('whLot.pickSeq'), value: 'pickSeq', type: 'input' },
        { label: this.$t('whLot.length'), value: 'length', type: 'number' },
        { label: this.$t('whLot.width'), value: 'width', type: 'number' },
        { label: this.$t('whLot.height'), value: 'height', type: 'number' },
        { label: this.$t('whLot.volume'), value: 'volume', type: 'number' },
        { label: this.$t('whLot.weight'), value: 'weight', type: 'number' },
        { label: this.$t('whLot.row'), value: 'row', type: 'number' },
        { label: this.$t('whLot.column'), value: 'column', type: 'number' },
        { label: this.$t('whLot.floor'), value: 'floor', type: 'number' },
        { label: this.$t('whLot.isMixProduct'), value: 'isMixProduct', type: 'select', list: 'isMixProductList', clearable: false },
        { label: this.$t('whLot.isMixBatch'), value: 'isMixBatch', type: 'select', list: 'isMixBatchList', clearable: false },
        { label: this.$t('whLot.isMixProductionBatch'), value: 'isMixProductionBatch', type: 'select', list: 'isMixProductionBatchList', clearable: false },
        { label: this.$t('whLot.qtyLimit'), value: 'qtyLimit', type: 'number' },
        { label: this.$t('whLot.containerLimit'), value: 'containerLimit', type: 'number' },
        { label: this.$t('whLot.x'), value: 'x', type: 'number' },
        { label: this.$t('whLot.y'), value: 'y', type: 'number' },
        { label: this.$t('whLot.z'), value: 'z', type: 'number' },
        { label: this.$t('whLot.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', clearable: false },
        { label: this.$t('whLot.hdRecLotCode'), value: 'hdRecLotCode', type: 'input' },
        { label: this.$t('whLot.byRecLotCode'), value: 'byRecLotCode', type: 'input' },
        { label: this.$t('whLot.remark'), value: 'remark', type: 'textarea' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        areaId: [{ required: true, message: this.$t('whLot.msg.areaId'), trigger: 'blur' }],
        zoneId: [{ required: true, message: this.$t('whLot.msg.zoneId'), trigger: 'blur' }],
        lotCode: [{ required: true, message: this.$t('whLot.msg.lotCode'), trigger: 'blur' }],
        lotName: [{ required: true, message: this.$t('whLot.msg.lotName'), trigger: 'blur' }],
        lotStatus: [{ required: true, message: this.$t('whLot.msg.lotStatus'), trigger: 'blur' }],
        lotType: [{ required: true, message: this.$t('whLot.msg.lotType'), trigger: 'blur' }],
        isEnable: [{ required: true, message: this.$t('whLot.msg.isEnable'), trigger: 'blur' }],
        turnoverLevel: [{ required: true, message: this.$t('whLot.msg.turnoverLevel'), trigger: 'blur' }],
        quality: [{ required: true, message: this.$t('whLot.msg.quality'), trigger: 'blur' }],
        packageAttr: [{ required: true, message: this.$t('whLot.msg.packageAttr'), trigger: 'blur' }],
        scatteredProperties: [{ required: true, message: this.$t('whLot.msg.scatteredProperties'), trigger: 'blur' }],
        storageType: [{ required: true, message: this.$t('whLot.msg.storageType'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        storageType: null,
        isEnable: null,
        isMixProduct: null,
        putawaySeq: null,
        roadwayId: null,
        remark: null,
        lotName: null,
        lotStatus: null,
        zoneId: null,
        id: null,
        row: null,
        floor: null,
        lotType: null,
        height: null,
        lotCategory: null,
        containerLimit: null,
        length: null,
        column: null,
        weight: null,
        volume: null,
        isMixBatch: null,
        isMixProductionBatch: null,
        pickSeq: null,
        lotCode: null,
        width: null,
        x: null,
        y: null,
        z: null,
        qtyLimit: null,
        hdRecLotCode: null,
        byRecLotCode: null
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
