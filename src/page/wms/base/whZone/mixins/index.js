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
          zoneCode: null,
          zoneName: null,
          areaId: null,
          zoneType: null,
          storageType: null,
          useScenes: null,
          packageAttr: null,
          abcType: null,
          isEnable: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        abcTypeList: [],
        packageAttrList: [],
        qualityList: [],
        storageTypeList: [],
        tcTypeList: [],
        zoneTypeList: [],
        useScenesList: [],
        fclReplenisOriginList: [],
        scatteredReplenisOriginList: [],
        enableList: [],
        turnoverLevelList: []
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
        { label: this.$t('whZone.zoneCode'), value: 'zoneCode', type: 'input' },
        { label: this.$t('whZone.zoneName'), value: 'zoneName', type: 'input' },
        { label: this.$t('whZone.areaId'), value: 'areaId', type: 'slot' },
        { label: this.$t('whZone.zoneType'), value: 'zoneType', type: 'select', list: 'zoneTypeList' },
        { label: this.$t('whZone.storageType'), value: 'storageType', type: 'select', list: 'storageTypeList' },
        { label: this.$t('whZone.packageAttr'), value: 'packageAttr', type: 'select', list: 'packageAttrList' },
        { label: this.$t('whZone.abcType'), value: 'abcType', type: 'select', list: 'abcTypeList' },
        { label: this.$t('whZone.isEnable'), value: 'isEnable', type: 'select', list: 'enableList' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('whZone.zoneCode'), value: 'zoneCode', type: 'input' },
        { label: this.$t('whZone.zoneName'), value: 'zoneName', type: 'input' },
        { label: this.$t('whZone.areaId'), value: 'areaId', type: 'slot' },
        { label: this.$t('whZone.zoneType'), value: 'zoneType', type: 'select', list: 'zoneTypeList' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },

    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'zoneCode', label: this.$t('whZone.zoneCode'), minWidth: 100 },
        { prop: 'zoneName', label: this.$t('whZone.zoneName'), minWidth: 100 },
        { prop: 'areaName', label: this.$t('whZone.areaId'), minWidth: 100 },
        { prop: 'zoneTypeName', label: this.$t('whZone.zoneType'), minWidth: 100 },
        { prop: 'storageTypeName', label: this.$t('whZone.storageType'), minWidth: 100 },
        { prop: 'packageAttrName', label: this.$t('whZone.packageAttr'), minWidth: 100 },
        { prop: 'tcTypeName', label: this.$t('whZone.tcType'), minWidth: 100 },
        { prop: 'abcTypeName', label: this.$t('whZone.abcType'), minWidth: 100 },
        { prop: 'qualityName', label: this.$t('whZone.quality'), minWidth: 100 },
        { prop: 'priority', label: this.$t('whZone.priority'), minWidth: 100 },
        { prop: 'fclReplenisOriginName', label: this.$t('whZone.fclReplenisOrigin'), minWidth: 100 },
        { prop: 'scatteredReplenisOriginName', label: this.$t('whZone.scatteredReplenisOrigin'), minWidth: 100 },
        { prop: 'isEnableName', label: this.$t('whZone.isEnable'), minWidth: 100 },
        { prop: 'remark', label: this.$t('whZone.remark'), minWidth: 100 },
        { label: '操作', value: 'status', width: 280, type: 'slot', fixed: 'right' } // value: 'status' 对应页面上 自定义插槽的名字v-slot:col-status
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('whZone.zoneCode'), value: 'zoneCode', type: 'input', readonly: true },
        { label: this.$t('whZone.zoneName'), value: 'zoneName', type: 'input', readonly: true },
        { label: this.$t('whZone.areaId'), value: 'areaId', type: 'slot', disabled: true },
        { label: this.$t('whZone.zoneType'), value: 'zoneType', type: 'select', list: 'zoneTypeList', disabled: true },
        { label: this.$t('whZone.storageType'), value: 'storageType', type: 'select', list: 'storageTypeList', disabled: true },
        { label: this.$t('whZone.packageAttr'), value: 'packageAttr', type: 'select', list: 'packageAttrList', disabled: true },
        { label: this.$t('whZone.tcType'), value: 'tcType', type: 'select', list: 'tcTypeList', disabled: true },
        { label: this.$t('whZone.abcType'), value: 'abcType', type: 'select', list: 'abcTypeList', disabled: true },
        { label: this.$t('whZone.quality'), value: 'quality', type: 'select', list: 'qualityList', disabled: true },
        { label: this.$t('whZone.turnoverLevel'), value: 'turnoverLevel', type: 'select', list: 'turnoverLevelList', disabled: true },
        { label: this.$t('whZone.fclReplenisOrigin'), value: 'fclReplenisOrigin', type: 'select', list: 'fclReplenisOriginList', disabled: true },
        { label: this.$t('whZone.scatteredReplenisOrigin'), value: 'scatteredReplenisOrigin', type: 'select', list: 'scatteredReplenisOriginList', disabled: true },
        { label: this.$t('whZone.priority'), value: 'priority', type: 'input', readonly: true },
        { label: this.$t('whZone.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', disabled: true },
        { label: this.$t('whArea.remark'), value: 'remark', type: 'textarea', disabled: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.data = {
        zoneType: this.listTypeInfo.zoneTypeList.length == 0 ? null : this.listTypeInfo.zoneTypeList[0].value,
        storageType: this.listTypeInfo.storageTypeList.length == 0 ? null : this.listTypeInfo.storageTypeList[0].value,
        packageAttr: this.listTypeInfo.packageAttrList.length == 0 ? null : this.listTypeInfo.packageAttrList[0].value,
        abcType: this.listTypeInfo.abcTypeList.length == 0 ? null : this.listTypeInfo.abcTypeList[0].value,
        quality: this.listTypeInfo.qualityList.length == 0 ? null : this.listTypeInfo.qualityList[0].value,
        fclReplenisOrigin: this.listTypeInfo.fclReplenisOriginList.length == 0 ? null : this.listTypeInfo.fclReplenisOriginList[0].value,
        scatteredReplenisOrigin: this.listTypeInfo.scatteredReplenisOriginList.length == 0 ? null : this.listTypeInfo.scatteredReplenisOriginList[0].value,
        isEnable: this.listTypeInfo.enableList.length == 0 ? null : this.listTypeInfo.enableList[1].value,
        turnoverLevel: this.listTypeInfo.turnoverLevelList.length == 0 ? null : this.listTypeInfo.turnoverLevelList[0].value
      }

      this.diaFormInfo.fieldList = [
        { label: this.$t('whZone.zoneCode'), value: 'zoneCode', type: 'input' },
        { label: this.$t('whZone.zoneName'), value: 'zoneName', type: 'input' },
        { label: this.$t('whZone.areaId'), value: 'areaId', type: 'slot' },
        { label: this.$t('whZone.zoneType'), value: 'zoneType', type: 'select', list: 'zoneTypeList' },
        { label: this.$t('whZone.storageType'), value: 'storageType', type: 'select', list: 'storageTypeList' },
        { label: this.$t('whZone.packageAttr'), value: 'packageAttr', type: 'select', list: 'packageAttrList' },
        { label: this.$t('whZone.tcType'), value: 'tcType', type: 'select', list: 'tcTypeList', clearable: false },
        { label: this.$t('whZone.abcType'), value: 'abcType', type: 'select', list: 'abcTypeList' },
        { label: this.$t('whZone.quality'), value: 'quality', type: 'select', list: 'qualityList' },
        { label: this.$t('whZone.turnoverLevel'), value: 'turnoverLevel', type: 'select', list: 'turnoverLevelList' },
        { label: this.$t('whZone.fclReplenisOrigin'), value: 'fclReplenisOrigin', type: 'select', list: 'fclReplenisOriginList' },
        { label: this.$t('whZone.scatteredReplenisOrigin'), value: 'scatteredReplenisOrigin', type: 'select', list: 'scatteredReplenisOriginList' },
        { label: this.$t('whZone.priority'), value: 'priority', type: 'number' },
        { label: this.$t('whZone.isEnable'), value: 'isEnable', type: 'select', list: 'enableList' },
        { label: this.$t('whArea.remark'), value: 'remark', type: 'textarea' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('whZone.zoneCode'), value: 'zoneCode', type: 'input', disabled: true },
        { label: this.$t('whZone.zoneName'), value: 'zoneName', type: 'input' },
        { label: this.$t('whZone.areaId'), value: 'areaId', type: 'slot' },
        { label: this.$t('whZone.zoneType'), value: 'zoneType', type: 'select', list: 'zoneTypeList' },
        { label: this.$t('whZone.storageType'), value: 'storageType', type: 'select', list: 'storageTypeList' },
        { label: this.$t('whZone.packageAttr'), value: 'packageAttr', type: 'select', list: 'packageAttrList' },
        { label: this.$t('whZone.tcType'), value: 'tcType', type: 'select', list: 'tcTypeList', clearable: false },
        { label: this.$t('whZone.abcType'), value: 'abcType', type: 'select', list: 'abcTypeList' },
        { label: this.$t('whZone.quality'), value: 'quality', type: 'select', list: 'qualityList' },
        { label: this.$t('whZone.turnoverLevel'), value: 'turnoverLevel', type: 'select', list: 'turnoverLevelList' },
        { label: this.$t('whZone.fclReplenisOrigin'), value: 'fclReplenisOrigin', type: 'select', list: 'fclReplenisOriginList' },
        { label: this.$t('whZone.scatteredReplenisOrigin'), value: 'scatteredReplenisOrigin', type: 'select', list: 'scatteredReplenisOriginList' },
        { label: this.$t('whZone.priority'), value: 'priority', type: 'number' },
        { label: this.$t('whZone.isEnable'), value: 'isEnable', type: 'select', list: 'enableList' },
        { label: this.$t('whArea.remark'), value: 'remark', type: 'textarea' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        isEnable: [{ required: true, message: this.$t('whZone.msg.isEnable'), trigger: 'blur' }],
        zoneName: [{ required: true, message: this.$t('whZone.msg.zoneName'), trigger: 'blur' }],
        areaId: [{ required: true, message: this.$t('whZone.msg.areaId'), trigger: 'blur' }],
        zoneCode: [{ required: true, message: this.$t('whZone.msg.zoneCode'), trigger: 'blur' }],
        zoneType: [{ required: true, message: this.$t('whZone.msg.zoneType'), trigger: 'blur' }],
        tcType: [{ required: true, message: this.$t('whZone.msg.tcType'), trigger: 'blur' }],
        storageType: [{ required: true, message: this.$t('whZone.msg.storageType'), trigger: 'blur' }],
        packageAttr: [{ required: true, message: this.$t('whZone.msg.packageAttr'), trigger: 'blur' }],
        abcType: [{ required: true, message: this.$t('whZone.msg.abcType'), trigger: 'blur' }],
        quality: [{ required: true, message: this.$t('whZone.msg.quality'), trigger: 'blur' }],
        turnoverLevel: [{ required: true, message: this.$t('whZone.msg.turnoverLevel'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        storageType: null,
        abcType: null,
        isEnable: null,
        pickTransitionLot: null,
        zoneName: null,
        useScenes: null,
        ibTransitionLot: null,
        areaId: null,
        priority: null,
        zoneCode: null,
        quality: null,
        turnoverLevel: null,
        scatteredReplenisOrigin: null,
        fclReplenisOrigin: null,
        tcType: null,
        zoneType: null,
        id: null,
        packageAttr: null
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
