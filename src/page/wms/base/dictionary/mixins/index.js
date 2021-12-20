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
          dicTypeCode: null,
          dicTypeName: null,
          isSystem: null,
          isEnable: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        enableList: [],
        whetherList: []
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
          ]
        }
      },
      // 弹窗表单
      diaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        dtTableInfo: {
          ref: null,
          dtList: [],
          fieldList: [],
          topBtn: {},
          handle: { // 表格自定义按钮
            fixed: 'right',
            label: this.$t('table.actions'), // 操作列名
            width: '210', // 默认操作按钮列宽度
            btList: [// 添加操作按钮
              // 默认删除按钮
              { label: this.$t('table.delete'), type: 'danger', icon: '', event: 'deleteDt', show: false, disabled: false }, // event值为notification.js中定义的方法名
              // 默认修改按钮
              { label: this.$t('table.edit'), type: 'success', icon: '', event: 'openEditPageDt', show: false, disabled: this.$hasPerm('edit') }// event值为notification.js中定义的方法名
            ]
          }
        }
      },

      // 明细表单
      diaFormInfoDt: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}// 配置的表单字段校验规则集合
      }

    }
  },
  mounted() {
    this.collapsableForm()
    this.initTopFormColumns()// 初始化查询界面配置数据
    this.rulesInit()// 初始化diaFormInfo表单字段校验规则
  },
  methods: {
    collapsableFormMore() {
      // 初始化top表单
      this.topForm.fieldList = [
        { label: this.$t('dictionary.dicTypeCode'), value: 'dicTypeCode', type: 'input' },
        { label: this.$t('dictionary.dicTypeName'), value: 'dicTypeName', type: 'input' },
        { label: this.$t('dictionary.isSystem'), value: 'isSystem', type: 'select', list: 'whetherList' },
        { label: this.$t('dictionary.isEnable'), value: 'isEnable', type: 'select', list: 'enableList' },
        { label: this.$t('dictionary.dicTypeSeq'), value: 'dicTypeSeq', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }
        // {
        //   type: "button",
        //   label: "",
        //   btnlabel: this.$t('table.search'),//查询按钮
        //   btType: "primary",
        //   icon: "el-icon-search",
        //   event: "search",//event值为notification.js中定义的方法名
        //   show: true,
        //   disabled:this.$hasPerm('search')
        // },
        // {
        //   type: "button",
        //   label: "",
        //   btnlabel: this.$t('table.reboot'),//重置按钮
        //   btType: "warning",
        //   icon: "el-icon-refresh-left",
        //   event: "reboot",//event值为notification.js中定义的方法名
        //   show: true,
        //   disabled:this.$hasPerm('search')
        // }
      ]
    },
    collapsableForm() {
      // 初始化top表单
      this.topForm.fieldList = [
        { label: this.$t('dictionary.dicTypeCode'), value: 'dicTypeCode', type: 'input' },
        { label: this.$t('dictionary.dicTypeName'), value: 'dicTypeName', type: 'input' },
        // {label: this.$t('dictionary.isSystem'), value: "isSystem", type: "select",list:'whetherList'},
        // {label: this.$t('dictionary.isEnable'), value: "isEnable", type: "select",list:'enableList'},
        // {label: this.$t('dictionary.dicTypeSeq'), value: "dicTypeSeq", type: "input"},
        { label: '', value: 'sys', type: 'slot' }
        // {
        //   type: "button",
        //   label: "",
        //   btnlabel: this.$t('table.search'),//查询按钮
        //   btType: "primary",
        //   icon: "el-icon-search",
        //   event: "search",//event值为notification.js中定义的方法名
        //   show: true,
        //   disabled:this.$hasPerm('search')
        // },
        // {
        //   type: "button",
        //   label: "",
        //   btnlabel: this.$t('table.reboot'),//重置按钮
        //   btType: "warning",
        //   icon: "el-icon-refresh-left",
        //   event: "reboot",//event值为notification.js中定义的方法名
        //   show: true,
        //   disabled:this.$hasPerm('search')
        // }
      ]
    },
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'dicTypeCode', label: this.$t('dictionary.dicTypeCode'), minWidth: 100 },
        { prop: 'dicTypeName', label: this.$t('dictionary.dicTypeName'), minWidth: 100 },
        { prop: 'isSystemName', label: this.$t('dictionary.isSystem'), minWidth: 100 },
        { prop: 'isEnableName', label: this.$t('dictionary.isEnable'), minWidth: 100 },
        { prop: 'dicTypeSeq', label: this.$t('dictionary.dicTypeSeq'), minWidth: 100, align: 'left' },
        { prop: 'dicTypeDesc', label: this.$t('dictionary.dicTypeDesc'), minWidth: 100 },
        { prop: 'creatorName', label: this.$t('dictionary.creatorName'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('dictionary.createTime'), minWidth: 100 },
        { prop: 'updaterName', label: this.$t('dictionary.updaterName'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('dictionary.updateTime'), minWidth: 100 },
        { prop: 'remark', label: this.$t('dictionary.remark'), minWidth: 100 }
      ]

      // 初始化明细列表
      this.diaFormInfo.dtTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'dicCode', label: this.$t('dictionary.dt.dicCode'), minWidth: 100 },
        { prop: 'dicName', label: this.$t('dictionary.dt.dicName'), minWidth: 100 },
        { prop: 'dicDesc', label: this.$t('dictionary.dt.dicDesc'), minWidth: 100 },
        { prop: 'dicSeq', label: this.$t('dictionary.dt.dicSeq'), minWidth: 100 },
        { prop: 'isSystemName', label: this.$t('dictionary.dt.isEnable'), minWidth: 100 },
        { prop: 'isEnableName', label: this.$t('dictionary.dt.isSystem'), minWidth: 100 },
        { prop: 'creatorName', label: this.$t('dictionary.dt.creatorName'), minWidth: 100 },
        { prop: 'updaterName', label: this.$t('dictionary.dt.updaterName'), minWidth: 100 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('dictionary.dicTypeCode'), value: 'dicTypeCode', type: 'input', disabled: true },
        { label: this.$t('dictionary.dicTypeName'), value: 'dicTypeName', type: 'input', disabled: true },
        { label: this.$t('dictionary.isSystem'), value: 'isSystemName', type: 'input', disabled: true },
        { label: this.$t('dictionary.isEnable'), value: 'isEnableName', type: 'input', disabled: true },
        { label: this.$t('dictionary.dicTypeSeq'), value: 'dicTypeSeq', type: 'number', disabled: true },
        { label: this.$t('dictionary.creatorName'), value: 'creatorName', type: 'input', disabled: true },
        { label: this.$t('dictionary.createTime'), value: 'createTime', type: 'input', disabled: true },
        { label: this.$t('dictionary.updaterName'), value: 'updaterName', type: 'input', disabled: true },
        { label: this.$t('dictionary.updateTime'), value: 'updateTime', type: 'input', disabled: true },
        { label: this.$t('dictionary.dicTypeDesc'), value: 'dicTypeDesc', type: 'textarea', disabled: true },
        { label: this.$t('dictionary.remark'), value: 'remark', type: 'textarea', disabled: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.$set(this.diaFormInfo.data, 'isSystem', 1)
      this.$set(this.diaFormInfo.data, 'isEnable', 1)

      this.diaFormInfo.fieldList = [
        { label: this.$t('dictionary.dicTypeCode'), value: 'dicTypeCode', type: 'input' },
        { label: this.$t('dictionary.dicTypeName'), value: 'dicTypeName', type: 'input' },
        { label: this.$t('dictionary.isSystem'), value: 'isSystem', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('dictionary.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', clearable: false },
        { label: this.$t('dictionary.dicTypeSeq'), value: 'dicTypeSeq', type: 'number' },
        { label: this.$t('dictionary.dicTypeDesc'), value: 'dicTypeDesc', type: 'textarea' },
        { label: this.$t('dictionary.remark'), value: 'remark', type: 'textarea' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('dictionary.dicTypeCode'), value: 'dicTypeCode', type: 'input', disabled: true },
        { label: this.$t('dictionary.dicTypeName'), value: 'dicTypeName', type: 'input' },
        { label: this.$t('dictionary.isSystem'), value: 'isSystem', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('dictionary.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', clearable: false },
        { label: this.$t('dictionary.dicTypeSeq'), value: 'dicTypeSeq', type: 'number' },
        { label: this.$t('dictionary.dicTypeDesc'), value: 'dicTypeDesc', type: 'textarea' },
        { label: this.$t('dictionary.remark'), value: 'remark', type: 'textarea' }
      ]
    },

    // 明细添加页面
    diaFormInfoAddFieldDtList() {
      this.diaFormInfoDt.fieldList = [
        { label: this.$t('dictionary.dt.dicCode'), value: 'dicCode', type: 'input' },
        { label: this.$t('dictionary.dt.dicName'), value: 'dicName', type: 'input' },
        { label: this.$t('dictionary.dt.isSystem'), value: 'isSystem', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('dictionary.dt.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', clearable: false },
        { label: this.$t('dictionary.dt.dicSeq'), value: 'dicSeq', type: 'number' },
        { label: this.$t('dictionary.dt.dicDesc'), value: 'dicDesc', type: 'textarea' },
        { label: this.$t('dictionary.dt.remark'), value: 'remark', type: 'textarea' }
      ]
    },

    // 明细编辑页面
    diaFormInfoEditFieldDtList() {
      this.diaFormInfoDt.fieldList = [
        { label: this.$t('dictionary.dt.dicCode'), value: 'dicCode', type: 'input', disabled: true },
        { label: this.$t('dictionary.dt.dicName'), value: 'dicName', type: 'input' },
        { label: this.$t('dictionary.dt.isSystem'), value: 'isSystem', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('dictionary.dt.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', clearable: false },
        { label: this.$t('dictionary.dt.dicSeq'), value: 'dicSeq', type: 'number' },
        { label: this.$t('dictionary.dt.dicDesc'), value: 'dicDesc', type: 'textarea' },
        { label: this.$t('dictionary.dt.remark'), value: 'remark', type: 'textarea' }
      ]
    },

    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        dicTypeCode: [{ required: true, message: this.$t('dictionary.msg.dicTypeCode'), trigger: 'blur' }],
        dicTypeName: [{ required: true, message: this.$t('dictionary.msg.dicTypeName'), trigger: 'blur' }],
        isSystem: [{ required: true, message: this.$t('dictionary.msg.isSystem'), trigger: 'blur' }],
        isEnable: [{ required: true, message: this.$t('dictionary.msg.isEnable'), trigger: 'blur' }]
      }

      this.diaFormInfoDt.rules = {
        dicCode: [{ required: true, message: this.$t('dictionary.msg.dt.dicCode'), trigger: 'change' }],
        dicName: [{ required: true, message: this.$t('dictionary.msg.dt.dicName'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        dicTypeName: null,
        isSystem: null,
        creator: null,
        createTime: null,
        isEnable: null,
        remark: null,
        updater: null,
        updaterName: null,
        updateTime: null,
        companyCode: null,
        creatorName: null,
        dicTypeCode: null,
        dicTypeDesc: null
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
