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
          areaCode: null,
          areaName: null,
          ownerCode: null,
          ownerName: null,
          tcType: null,
          structureType: null,
          isEnable: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        areaTypeList: [],
        tcTypeList: [],
        structureTypeList: [],
        enableList: []
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
    this.initTopFormColumns()// 初始化查询界面配置数据
    this.rulesInit()// 初始化diaFormInfo表单字段校验规则
  },
  methods: {
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化top表单
      this.topForm.fieldList = [
        { label: this.$t('whArea.areaCode'), value: 'areaCode', type: 'input' },
        { label: this.$t('whArea.areaName'), value: 'areaName', type: 'input' },
        // { label: this.$t('whArea.areaType'), value: 'areaType', type: 'select', list: 'areaTypeList' },
        // { label: this.$t('whArea.owner'), value: 'owner', type: 'input' },
        { label: this.$t('shippingOrder.ownerName'), value: 'ownerName', type: 'slot' },
        { label: this.$t('whArea.tcType'), value: 'tcType', type: 'select', list: 'tcTypeList' },
        { label: this.$t('whArea.structureType'), value: 'structureType', type: 'select', list: 'structureTypeList' },
        { label: this.$t('whArea.isEnable'), value: 'isEnable', type: 'select', list: 'enableList' },
        { label: '', value: 'sys', type: 'slot' }
      ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'whName', label: this.$t('whArea.whName'), minWidth: 100 },
        { prop: 'areaCode', label: this.$t('whArea.areaCode'), minWidth: 100 },
        { prop: 'areaName', label: this.$t('whArea.areaName'), minWidth: 100 },
        // { prop: 'areaTypeName', label: this.$t('whArea.areaType'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('whArea.ownerName'), minWidth: 100 },
        { prop: 'tcTypeName', label: this.$t('whArea.tcTypeName'), minWidth: 100 },
        { prop: 'structureTypeName', label: this.$t('whArea.structureType'), minWidth: 100 },
        { prop: 'priority', label: this.$t('whArea.priority'), minWidth: 100 },
        { prop: 'acreage', label: this.$t('whArea.acreage'), minWidth: 100 },
        { prop: 'isEnableName', label: this.$t('whArea.isEnable'), minWidth: 100 },
        { prop: 'remark', label: this.$t('whArea.remark'), minWidth: 100 },
        { prop: 'creator', label: this.$t('whArea.creator'), minWidth: 100 },
        { label: '操作', value: 'status', width: 280, type: 'slot', fixed: 'right' } // value: 'status' 对应页面上 自定义插槽的名字v-slot:col-status
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('whArea.whName'), value: 'whName', type: 'input', disabled: true },
        { label: this.$t('whArea.areaCode'), value: 'areaCode', type: 'input', disabled: true },
        { label: this.$t('whArea.areaName'), value: 'areaName', type: 'input', disabled: true },
        { label: this.$t('whArea.ownerName'), value: 'ownerName', type: 'input', disabled: true },
        // { label: this.$t('whArea.areaType'), value: 'areaType', type: 'select', list: 'areaTypeList', disabled: true },
        { label: this.$t('whArea.tcType'), value: 'tcType', type: 'select', list: 'tcTypeList', disabled: true },
        { label: this.$t('whArea.structureType'), value: 'structureType', type: 'select', list: 'structureTypeList', disabled: true },
        { label: this.$t('whArea.acreage'), value: 'acreage', type: 'input', disabled: true },
        { label: this.$t('whArea.priority'), value: 'priority', type: 'input', disabled: true },
        { label: this.$t('whArea.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', disabled: true },
        { label: this.$t('whArea.remark'), value: 'remark', type: 'textarea', disabled: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.data = {
        whId: sessionStorage.warehouseId,
        whName: sessionStorage.warehouseName,
        areaCode: null,
        areaName: null,
        ownerCode: null,
        ownerName: null,
        acreage: null,
        priority: null,
        remark: null,
        areaType: this.listTypeInfo.areaTypeList.length == 0 ? null : this.listTypeInfo.areaTypeList[0].value,
        tcType: this.listTypeInfo.tcTypeList.length == 0 ? null : this.listTypeInfo.tcTypeList[0].value,
        structureType: this.listTypeInfo.structureTypeList.length == 0 ? null : this.listTypeInfo.structureTypeList[0].value,
        isEnable: this.listTypeInfo.enableList.length == 0 ? null : this.listTypeInfo.enableList[1].value
      }

      this.diaFormInfo.fieldList = [
        { label: this.$t('whArea.whName'), value: 'whName', type: 'input', disabled: true },
        { label: this.$t('whArea.areaCode'), value: 'areaCode', type: 'input' },
        { label: this.$t('whArea.areaName'), value: 'areaName', type: 'input' },
        { label: this.$t('whArea.ownerName'), value: 'ownerName', type: 'slot' },
        { label: this.$t('whArea.tcType'), value: 'tcType', type: 'select', list: 'tcTypeList', clearable: false },
        { label: this.$t('whArea.structureType'), value: 'structureType', type: 'select', list: 'structureTypeList', clearable: false },
        { label: this.$t('whArea.acreage'), value: 'acreage', type: 'number' },
        { label: this.$t('whArea.priority'), value: 'priority', type: 'number' },
        { label: this.$t('whArea.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', clearable: false },
        { label: this.$t('whArea.remark'), value: 'remark', type: 'textarea' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('whArea.whName'), value: 'whName', type: 'input', disabled: true },
        { label: this.$t('whArea.areaCode'), value: 'areaCode', type: 'input', disabled: true },
        { label: this.$t('whArea.areaName'), value: 'areaName', type: 'input' },
        { label: this.$t('whArea.ownerName'), value: 'ownerName', type: 'slot' },
        // { label: this.$t('whArea.areaType'), value: 'areaType', type: 'select', list: 'areaTypeList', clearable: false },
        { label: this.$t('whArea.tcType'), value: 'tcType', type: 'select', list: 'tcTypeList', clearable: false },
        { label: this.$t('whArea.structureType'), value: 'structureType', type: 'select', list: 'structureTypeList', clearable: false },
        { label: this.$t('whArea.acreage'), value: 'acreage', type: 'number' },
        { label: this.$t('whArea.priority'), value: 'priority', type: 'number' },
        { label: this.$t('whArea.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', clearable: false },
        { label: this.$t('whArea.remark'), value: 'remark', type: 'textarea' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        areaName: [{ required: true, message: this.$t('whArea.msg.areaName'), trigger: 'blur' }],
        structureType: [{ required: true, message: this.$t('whArea.msg.structureType'), trigger: 'blur' }],
        isEnable: [{ required: true, message: this.$t('whArea.msg.isEnable'), trigger: 'blur' }],
        areaCode: [{ required: true, message: this.$t('whArea.msg.areaCode'), trigger: 'blur' }],
        ownerName: [{ required: true, message: this.$t('whArea.msg.ownerName'), trigger: 'blur' }],
        tcType: [{ required: true, message: this.$t('whArea.msg.tcType'), trigger: 'blur' }],
        companyCode: [{ required: true, message: this.$t('whArea.msg.companyCode'), trigger: 'blur' }]
        // areaType: [{ required: true, message: this.$t('whArea.msg.areaType'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        areaName: null,
        structureType: null,
        isEnable: null,
        areaCode: null,
        acreage: null,
        tcType: null,
        companyCode: null,
        remark: null,
        id: null,
        areaType: null,
        priority: null
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
