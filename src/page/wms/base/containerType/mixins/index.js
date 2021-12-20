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
          containerTypeCode: null,
          containerTypeName: null,
          isEnable: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        containerTypeList: [],
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
      },
      isHaveLattice: false
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
        { label: this.$t('containerType.containerTypeCode'), value: 'containerTypeCode', type: 'input' },
        { label: this.$t('containerType.containerTypeName'), value: 'containerTypeName', type: 'input' },
        { label: this.$t('containerType.isEnable'), value: 'isEnable', type: 'select', list: 'enableList' },
        { label: '', value: 'sys', type: 'slot' }
      ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'containerTypeCode', label: this.$t('containerType.containerTypeCode'), minWidth: 100 },
        { prop: 'containerTypeName', label: this.$t('containerType.containerTypeName'), minWidth: 100 },
        { prop: 'length', label: this.$t('containerType.length'), minWidth: 100 },
        { prop: 'width', label: this.$t('containerType.width'), minWidth: 100 },
        { prop: 'height', label: this.$t('containerType.height'), minWidth: 100 },
        { prop: 'volume', label: this.$t('containerType.volume'), minWidth: 100 },
        { prop: 'weight', label: this.$t('containerType.weight'), minWidth: 100 },
        { prop: 'palletNum', label: this.$t('containerType.palletNum'), minWidth: 100 },
        { prop: 'latticeNum', label: this.$t('containerType.latticeNum'), minWidth: 100 },
        { prop: 'isEnableName', label: this.$t('containerType.isEnable'), minWidth: 100 },
        { prop: 'remark', label: this.$t('containerType.remark'), minWidth: 100 },
        { label: '操作', value: 'status', width: 280, type: 'slot', fixed: 'right' } // value: 'status' 对应页面上 自定义插槽的名字v-slot:col-status
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('containerType.containerTypeCode'), value: 'containerTypeCode', type: 'input', readonly: true },
        { label: this.$t('containerType.containerTypeName'), value: 'containerTypeName', type: 'input', readonly: true },
        { label: this.$t('containerType.length'), value: 'length', type: 'input', readonly: true },
        { label: this.$t('containerType.width'), value: 'width', type: 'input', readonly: true },
        { label: this.$t('containerType.height'), value: 'height', type: 'input', readonly: true },
        { label: this.$t('containerType.volume'), value: 'volume', type: 'input', readonly: true },
        { label: this.$t('containerType.weight'), value: 'weight', type: 'input', readonly: true },
        { label: this.$t('containerType.latticeNum'), value: 'latticeNum', type: 'input', readonly: true },
        { label: this.$t('containerType.palletNum'), value: 'palletNum', type: 'input', readonly: true },
        { label: this.$t('containerType.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', disabled: true },
        { label: this.$t('containerType.remark'), value: 'remark', type: 'textarea', disabled: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.data = {
        isEnable: this.listTypeInfo.enableList.length == 0 ? null : this.listTypeInfo.enableList[1].value
      }

      this.diaFormInfo.fieldList = [
        { label: this.$t('containerType.containerTypeCode'), value: 'containerTypeCode', type: 'input' },
        { label: this.$t('containerType.containerTypeName'), value: 'containerTypeName', type: 'input' },
        { label: this.$t('containerType.length'), value: 'length', type: 'input' },
        { label: this.$t('containerType.width'), value: 'width', type: 'input' },
        { label: this.$t('containerType.height'), value: 'height', type: 'input' },
        { label: this.$t('containerType.volume'), value: 'volume', type: 'input' },
        { label: this.$t('containerType.weight'), value: 'weight', type: 'input' },
        { label: this.$t('containerType.palletNum'), value: 'palletNum', type: 'input' },
        { label: this.$t('containerType.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', clearable: false },
        { label: this.$t('containerType.isHaveLattice'), value: 'click', type: 'slot' },
        { label: this.$t('containerType.latticeNum'), value: 'latticeNum', type: 'input', disabled: true },
        { label: this.$t('containerType.remark'), value: 'remark', type: 'textarea' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('containerType.containerTypeCode'), value: 'containerTypeCode', type: 'input', disabled: true },
        { label: this.$t('containerType.containerTypeName'), value: 'containerTypeName', type: 'input' },
        { label: this.$t('containerType.length'), value: 'length', type: 'input' },
        { label: this.$t('containerType.width'), value: 'width', type: 'input' },
        { label: this.$t('containerType.height'), value: 'height', type: 'input' },
        { label: this.$t('containerType.volume'), value: 'volume', type: 'input' },
        { label: this.$t('containerType.weight'), value: 'weight', type: 'input' },
        { label: this.$t('containerType.palletNum'), value: 'palletNum', type: 'input' },
        { label: this.$t('containerType.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', clearable: false },
        { label: this.$t('containerType.isHaveLattice'), value: 'click', type: 'slot' },
        { label: this.$t('containerType.latticeNum'), value: 'latticeNum', type: 'input', disabled: true },
        { label: this.$t('containerType.remark'), value: 'remark', type: 'textarea' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        isEnable: [{ required: true, message: this.$t('containerType.msg.isEnable'), trigger: 'blur' }],
        containerTypeCode: [{ required: true, message: this.$t('containerType.msg.containerTypeCode'), trigger: 'blur' }],
        containerTypeName: [{ required: true, message: this.$t('containerType.msg.containerTypeName'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        creator: null,
        createTime: null,
        isEnable: null,
        length: null,
        weight: null,
        latticeNum: null,
        containerTypeCode: null,
        remark: null,
        updateName: null,
        updater: null,
        volume: null,
        containerTypeName: null,
        updateTime: null,
        whId: null,
        width: null,
        companyCode: null,
        id: null,
        height: null,
        palletNum: null,
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
