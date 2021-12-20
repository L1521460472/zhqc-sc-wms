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
          containerCode: null,
          containerName: null,
          containerTypeId: null,
          isEnable: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        containerTypeList: [],
        useStatusList: [],
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
        { label: this.$t('container.containerCode'), value: 'containerCode', type: 'input' },
        { label: this.$t('container.containerName'), value: 'containerName', type: 'input' },
        { label: this.$t('container.containerTypeId'), value: 'containerTypeId', type: 'select', list: 'containerTypeList' },
        { label: this.$t('container.isEnable'), value: 'isEnable', type: 'select', list: 'enableList' },
        { label: '', value: 'sys', type: 'slot' }
      ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'containerCode', label: this.$t('container.containerCode'), minWidth: 100 },
        { prop: 'containerName', label: this.$t('container.containerName'), minWidth: 100 },
        { prop: 'containerBarcode', label: this.$t('container.containerBarcode'), minWidth: 100 },
        { prop: 'rfid', label: this.$t('container.rfid'), minWidth: 100 },
        { prop: 'containerTypeName', label: this.$t('container.containerTypeId'), minWidth: 100 },
        { prop: 'useStatusName', label: this.$t('container.useStatus'), minWidth: 100 },
        { prop: 'isEnableName', label: this.$t('container.isEnable'), minWidth: 100 },
        { label: '操作', value: 'status', width: 220, type: 'slot', fixed: 'right' } // value: 'status' 对应页面上 自定义插槽的名字v-slot:col-status
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('container.containerCode'), value: 'containerCode', type: 'input', readonly: true },
        { label: this.$t('container.containerName'), value: 'containerName', type: 'input', readonly: true },
        { label: this.$t('container.containerBarcode'), value: 'containerBarcode', type: 'input', readonly: true },
        { label: this.$t('container.rfid'), value: 'rfid', type: 'input', readonly: true },
        { label: this.$t('container.containerTypeId'), value: 'containerTypeId', type: 'select', list: 'containerTypeList', disabled: true },
        { label: this.$t('container.useStatus'), value: 'useStatus', type: 'select', list: 'useStatusList', disabled: true },
        { label: this.$t('container.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', disabled: true },
        { label: this.$t('container.latticeNum'), value: 'latticeNum', type: 'number', readonly: true },
        { label: this.$t('container.remark'), value: 'remark', type: 'textarea', disabled: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.data = {
        containerTypeId: this.listTypeInfo.containerTypeList.length == 0 ? null : this.listTypeInfo.containerTypeList[0].value,
        useStatus: this.listTypeInfo.useStatusList.length == 0 ? null : this.listTypeInfo.useStatusList[0].value,
        isEnable: this.listTypeInfo.enableList.length == 0 ? null : this.listTypeInfo.enableList[1].value
      }

      this.diaFormInfo.fieldList = [
        { label: this.$t('container.containerCode'), value: 'containerCode', type: 'input' },
        { label: this.$t('container.containerName'), value: 'containerName', type: 'input' },
        { label: this.$t('container.containerBarcode'), value: 'containerBarcode', type: 'input' },
        { label: this.$t('container.rfid'), value: 'rfid', type: 'input' },
        { label: this.$t('container.containerTypeId'), value: 'containerTypeId', type: 'select', list: 'containerTypeList', clearable: false },
        { label: this.$t('container.useStatus'), value: 'useStatus', type: 'select', list: 'useStatusList', clearable: false },
        { label: this.$t('container.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', clearable: false },
        { label: this.$t('container.latticeNum'), value: 'latticeNum', type: 'number' },
        { label: this.$t('container.remark'), value: 'remark', type: 'textarea' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('container.containerCode'), value: 'containerCode', type: 'input', disabled: true },
        { label: this.$t('container.containerName'), value: 'containerName', type: 'input' },
        { label: this.$t('container.containerBarcode'), value: 'containerBarcode', type: 'input' },
        { label: this.$t('container.rfid'), value: 'rfid', type: 'input' },
        { label: this.$t('container.containerTypeId'), value: 'containerTypeId', type: 'select', list: 'containerTypeList', clearable: false },
        { label: this.$t('container.useStatus'), value: 'useStatus', type: 'select', list: 'useStatusList', clearable: false },
        { label: this.$t('container.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', clearable: false },
        { label: this.$t('container.latticeNum'), value: 'latticeNum', type: 'number' },
        { label: this.$t('container.remark'), value: 'remark', type: 'textarea' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        containerCode: [{ required: true, message: this.$t('container.msg.containerCode'), trigger: 'blur' }],
        containerName: [{ required: true, message: this.$t('container.msg.containerName'), trigger: 'blur' }],
        containerTypeId: [{ required: true, message: this.$t('container.msg.containerTypeId'), trigger: 'blur' }],
        useStatus: [{ required: true, message: this.$t('container.msg.useStatus'), trigger: 'blur' }],
        isEnable: [{ required: true, message: this.$t('container.msg.isEnable'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        containerCode: null,
        whId: null,
        containerName: null,
        containerTypeId: null,
        isEnable: null,
        useStatus: null,
        rfid: null,
        remark: null,
        containerBarcode: null,
        latticeNum: null
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
