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
          id: null,
          companyCode: null,
          whId: null,
          containerId: null,
          sowLotCode: null,
          sowLotName: null,
          sowLotGroup: null,
          orderNum: null,
          isEnable: null,
          remark: null,
          creator: null,
          createTime: null,
          updater: null,
          updateTime: null,
          optimistic: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度

      },
      // 下拉选项列表
      listTypeInfo: {
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '150', // 默认操作按钮列宽度
          btList: [// 添加操作按钮
            // 默认查看按钮
            { label: this.$t('table.view'), type: 'primary', icon: '', event: 'openViewPage', show: true, disabled: this.$hasPerm('view') }, // event值为notification.js中定义的方法名
            // 默认修改按钮
            { label: this.$t('table.edit'), type: 'success', icon: '', event: 'openEditPage', show: true, disabled: this.$hasPerm('edit') }// event值为notification.js中定义的方法名
            // 默认删除按钮
            // {label:this.$t('table.delete'), type: 'danger', icon: '', event: 'deleteData', show: true,disabled:this.$hasPerm('delete')},//event值为notification.js中定义的方法名
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
        subTableInfo: {
          title: '列表详情',
          ref: null,
          type: null,
          fieldList: [],
          rules: {},
          labelWidth: '120px',
          // handle:null,
          handle: null,
          saveList: [
            { label: '关闭', type: '', icon: '', event: 'close', show: true },
            { label: '保存', type: 'primary', icon: '', event: 'save', saveLoading: false, show: true }
          ],
          topBtn: {}
        },
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
        { label: this.$t('sowLot.containerCode'), value: 'containerCode', type: 'input' },
        { label: this.$t('sowLot.containerName'), value: 'containerName', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }
      ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'containerCode', label: this.$t('sowLot.containerCode'), minWidth: 100 },
        { prop: 'containerName', label: this.$t('sowLot.containerName'), minWidth: 100 },
        { prop: 'remark', label: this.$t('sowLot.remark'), minWidth: 100 },
        { prop: 'creator', label: this.$t('sowLot.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('sowLot.createTime'), minWidth: 100 },
        { prop: 'updater', label: this.$t('sowLot.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('sowLot.updateTime'), minWidth: 100 }
      ]

      this.$set(this.diaFormInfo.data, 'dtList', [])
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        // {label: this.$t('sowLot.id'), value: "id", type: "input",readonly:true},
        { label: this.$t('sowLot.containerCode'), value: 'containerCode', type: 'input', readonly: true },
        { label: this.$t('sowLot.containerName'), value: 'containerName', type: 'input', readonly: true }
      ]
      this.diaFormInfo.subTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'sowLotCode', label: this.$t('sowLot.dt.sowLotCode'), minWidth: 100 },
        { prop: 'sowLotName', label: this.$t('sowLot.dt.sowLotName'), minWidth: 100 }
        // {prop: "sowLotGroup", label: this.$t('sowLot.dt.sowLotGroup'), minWidth: 50},
        // {prop: "orderNum", label: this.$t('sowLot.dt.orderNum'), minWidth: 50},
      ]
    },
    /*  //新增页面的数据配置
    diaFormInfoAddFieldList(){
      this.diaFormInfo.fieldList = [
        {label: this.$t('sowLot.id'), value: "id", type: "input"},
        {label: this.$t('sowLot.companyCode'), value: "companyCode", type: "input"},
        {label: this.$t('sowLot.whId'), value: "whId", type: "input"},
        {label: this.$t('sowLot.containerId'), value: "containerId", type: "input"},
        {label: this.$t('sowLot.sowLotCode'), value: "sowLotCode", type: "input"},
        {label: this.$t('sowLot.sowLotName'), value: "sowLotName", type: "input"},
        {label: this.$t('sowLot.sowLotGroup'), value: "sowLotGroup", type: "input"},
        {label: this.$t('sowLot.orderNum'), value: "orderNum", type: "input"},
        {label: this.$t('sowLot.isEnable'), value: "isEnable", type: "input"},
        {label: this.$t('sowLot.remark'), value: "remark", type: "input"},
        {label: this.$t('sowLot.creator'), value: "creator", type: "input"},
        {label: this.$t('sowLot.createTime'), value: "createTime", type: "input"},
        {label: this.$t('sowLot.updater'), value: "updater", type: "input"},
        {label: this.$t('sowLot.updateTime'), value: "updateTime", type: "input"},
        {label: this.$t('sowLot.optimistic'), value: "optimistic", type: "input"},
      ]
    },*/
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('sowLot.containerCode'), value: 'containerCode', type: 'input', readonly: true },
        { label: this.$t('sowLot.containerName'), value: 'containerName', type: 'input', readonly: true }
      ]
      this.diaFormInfo.subTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'sowLotCode', label: this.$t('sowLot.dt.sowLotCode'), minWidth: 50 },
        { prop: 'sowLotName', label: this.$t('sowLot.dt.sowLotName'), minWidth: 50, edit: { 'name': 'input' }}
        // {prop: "sowLotGroup", label: this.$t('sowLot.dt.sowLotGroup'), minWidth: 50,edit: { "name": "input" }},
        // {prop: "orderNum", label: this.$t('sowLot.dt.orderNum'), minWidth: 50,edit: { "name": "input" }},
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
      }

      this.diaFormInfo.subTableInfo.rules = {
        sowLotName: [{
          required: true,
          message: '播种位名字不能为空',
          trigger: 'blur' }],

        sowLotGroup: [{
          required: true,
          message: '播种位分组号不能为空',
          trigger: 'blur' }],

        orderNum: [{
          required: true,
          message: '播种顺序不能为空',
          trigger: 'blur' },
        { max: 10, message: '最大长度10个字符' },
        { pattern: /(^[1-9][0-9]*$)|(^0$)/, message: '只能输入正整数' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        containerCode: null,
        containerName: null,
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
