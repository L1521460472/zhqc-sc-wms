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
          zoneId: null,
          roadwayCode: null,
          roadwayName: null,
          isEnable: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
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
        rules: {}, // 配置的表单字段校验规则集合
        areaIdEx: null
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
        { label: this.$t('whRoadway.zoneId'), value: 'zoneId', type: 'slot' },
        { label: this.$t('whRoadway.roadwayCode'), value: 'roadwayCode', type: 'input' },
        { label: this.$t('whRoadway.roadwayName'), value: 'roadwayName', type: 'input' },
        { label: this.$t('whRoadway.isEnable'), value: 'isEnable', type: 'select', list: 'enableList' },
        { label: '', value: 'sys', type: 'slot' }
      ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'roadwayCode', label: this.$t('whRoadway.roadwayCode'), minWidth: 100 },
        { prop: 'roadwayName', label: this.$t('whRoadway.roadwayName'), minWidth: 100 },
        { prop: 'zoneName', label: this.$t('whRoadway.zoneId'), minWidth: 100 },
        { prop: 'length', label: this.$t('whRoadway.length'), minWidth: 100 },
        { prop: 'width', label: this.$t('whRoadway.width'), minWidth: 100 },
        { prop: 'height', label: this.$t('whRoadway.height'), minWidth: 100 },
        { prop: 'isEnableName', label: this.$t('whRoadway.isEnable'), minWidth: 100 },
        { prop: 'remark', label: this.$t('whRoadway.remark'), minWidth: 100 },
        { label: '操作', value: 'status', width: 280, type: 'slot', fixed: 'right' } // value: 'status' 对应页面上 自定义插槽的名字v-slot:col-status
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('whRoadway.areaId'), value: 'areaId', type: 'slot', disabled: true },
        { label: this.$t('whRoadway.zoneId'), value: 'zoneId', type: 'slot', disabled: true },
        { label: this.$t('whRoadway.roadwayCode'), value: 'roadwayCode', type: 'input', disabled: true },
        { label: this.$t('whRoadway.roadwayName'), value: 'roadwayName', type: 'input', disabled: true },
        { label: this.$t('whRoadway.length'), value: 'length', type: 'input', disabled: true },
        { label: this.$t('whRoadway.width'), value: 'width', type: 'input', disabled: true },
        { label: this.$t('whRoadway.height'), value: 'height', type: 'input', disabled: true },
        { label: this.$t('whRoadway.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', disabled: true },
        { label: this.$t('whRoadway.remark'), value: 'remark', type: 'textarea', disabled: true }
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
        { label: this.$t('whRoadway.areaId'), value: 'areaId', type: 'slot' },
        { label: this.$t('whRoadway.zoneId'), value: 'zoneId', type: 'slot' },
        { label: this.$t('whRoadway.roadwayCode'), value: 'roadwayCode', type: 'input' },
        { label: this.$t('whRoadway.roadwayName'), value: 'roadwayName', type: 'input' },
        { label: this.$t('whRoadway.length'), value: 'length', type: 'number' },
        { label: this.$t('whRoadway.width'), value: 'width', type: 'number' },
        { label: this.$t('whRoadway.height'), value: 'height', type: 'number' },
        { label: this.$t('whRoadway.isEnable'), value: 'isEnable', type: 'select', list: 'enableList' },
        { label: this.$t('whRoadway.remark'), value: 'remark', type: 'textarea' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('whRoadway.areaId'), value: 'areaId', type: 'slot' },
        { label: this.$t('whRoadway.zoneId'), value: 'zoneId', type: 'slot' },
        { label: this.$t('whRoadway.roadwayCode'), value: 'roadwayCode', type: 'input', disabled: true },
        { label: this.$t('whRoadway.roadwayName'), value: 'roadwayName', type: 'input' },
        { label: this.$t('whRoadway.length'), value: 'length', type: 'number' },
        { label: this.$t('whRoadway.width'), value: 'width', type: 'number' },
        { label: this.$t('whRoadway.height'), value: 'height', type: 'number' },
        { label: this.$t('whRoadway.isEnable'), value: 'isEnable', type: 'select', list: 'enableList' },
        { label: this.$t('whRoadway.remark'), value: 'remark', type: 'textarea' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        areaId: [{ required: true, message: this.$t('whRoadway.msg.areaId'), trigger: 'blur' }],
        zoneId: [{ required: true, message: this.$t('whRoadway.msg.zoneId'), trigger: 'blur' }],
        isEnable: [{ required: true, message: this.$t('whRoadway.msg.isEnable'), trigger: 'blur' }],
        roadwayCode: [{ required: true, message: this.$t('whRoadway.msg.roadwayCode'), trigger: 'blur' }],
        roadwayName: [{ required: true, message: this.$t('whRoadway.msg.roadwayName'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        zoneId: null,
        whId: null,
        isEnable: null,
        length: null,
        width: null,
        remark: null,
        areaId: null,
        roadwayCode: null,
        roadwayName: null,
        height: null
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
