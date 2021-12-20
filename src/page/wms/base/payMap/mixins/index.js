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
          formCode: null,
          erpPayCode: null,
          payCode: null,
          isEnable: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '130px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        formList: [
        ],
        payCodeList: [
        ],
        enableList: [
        ]
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
        labelWidth: '40mm'
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
        { label: this.$t('payMap.formCode'), value: 'formCode', type: 'select', list: 'formList' },
        { label: this.$t('payMap.erpPayCode'), value: 'erpPayCode', type: 'input' },
        { label: this.$t('payMap.payCode'), value: 'payCode', type: 'select', list: 'payCodeList' },
        { label: this.$t('payMap.isEnable'), value: 'isEnable', type: 'select', list: 'enableList' },
        {
          type: 'button',
          label: '',
          btnlabel: this.$t('table.search'), // 查询按钮
          btType: 'primary',
          icon: 'el-icon-search',
          event: 'search', // event值为notification.js中定义的方法名
          show: true,
          disabled: this.$hasPerm('search')
        },
        {
          type: 'button',
          label: '',
          btnlabel: this.$t('table.reboot'), // 重置按钮
          btType: 'warning',
          icon: 'el-icon-refresh-left',
          event: 'reboot', // event值为notification.js中定义的方法名
          show: true,
          disabled: this.$hasPerm('search')
        }
      ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'formCode', label: this.$t('payMap.formCode'), minWidth: 100 },
        { prop: 'formName', label: this.$t('payMap.formName'), minWidth: 100 },
        { prop: 'erpPayCode', label: this.$t('payMap.erpPayCode'), minWidth: 100 },
        { prop: 'erpPayName', label: this.$t('payMap.erpPayName'), minWidth: 100 },
        { prop: 'payCode', label: this.$t('payMap.payCode'), minWidth: 100 },
        { prop: 'payName', label: this.$t('payMap.payName'), minWidth: 100 },
        { prop: 'isEnableName', label: this.$t('payMap.isEnable'), minWidth: 100 },
        { prop: 'creator', label: this.$t('payMap.creator'), minWidth: 100 },
        { prop: 'creatorName', label: this.$t('payMap.creatorName'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('payMap.createTime'), minWidth: 100 },
        { prop: 'updater', label: this.$t('payMap.updater'), minWidth: 100 },
        { prop: 'updaterName', label: this.$t('payMap.updaterName'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('payMap.updateTime'), minWidth: 100 },
        { prop: 'remark', label: this.$t('payMap.remark'), minWidth: 100 },
        { label: '操作', value: 'status', width: 280, type: 'slot', fixed: 'right' } // value: 'status' 对应页面上 自定义插槽的名字v-slot:col-status
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('payMap.formName'), value: 'formName', type: 'input', readonly: true },
        { label: this.$t('payMap.erpPayCode'), value: 'erpPayCode', type: 'input', readonly: true },
        { label: this.$t('payMap.erpPayName'), value: 'erpPayName', type: 'input', readonly: true },
        { label: this.$t('payMap.payName'), value: 'payName', type: 'input', readonly: true },
        { label: this.$t('payMap.isEnable'), value: 'isEnableName', type: 'input', readonly: true },
        { label: this.$t('payMap.creator'), value: 'creator', type: 'input', readonly: true },
        { label: this.$t('payMap.createTime'), value: 'createTime', type: 'input', readonly: true },
        { label: this.$t('payMap.updater'), value: 'updater', type: 'input', readonly: true },
        { label: this.$t('payMap.updateTime'), value: 'updateTime', type: 'input', readonly: true },
        { label: this.$t('payMap.remark'), value: 'remark', type: 'input', readonly: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('payMap.formCode'), value: 'formCode', type: 'select', list: 'formList' },
        { label: this.$t('payMap.erpPayCode'), value: 'erpPayCode', type: 'input' },
        { label: this.$t('payMap.erpPayName'), value: 'erpPayName', type: 'input' },
        { label: this.$t('payMap.payCode'), value: 'payCode', type: 'select', list: 'payCodeList' },
        { label: this.$t('payMap.isEnable'), value: 'isEnable', type: 'select', list: 'enableList' },
        { label: this.$t('payMap.remark'), value: 'remark', type: 'input' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('payMap.formCode'), value: 'formCode', type: 'select', list: 'formList' },
        { label: this.$t('payMap.erpPayCode'), value: 'erpPayCode', type: 'input' },
        { label: this.$t('payMap.erpPayName'), value: 'erpPayName', type: 'input' },
        { label: this.$t('payMap.payCode'), value: 'payCode', type: 'select', list: 'payCodeList' },
        { label: this.$t('payMap.isEnable'), value: 'isEnable', type: 'select', list: 'enableList' },
        { label: this.$t('payMap.remark'), value: 'remark', type: 'input' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        erpPayName: [{ required: true, message: this.$t('payMap.msg.erpPayName'), trigger: 'blur' }],
        isEnable: [{ required: true, message: this.$t('payMap.msg.isEnable'), trigger: 'blur' }],
        payCode: [{ required: true, message: this.$t('payMap.msg.payCode'), trigger: 'blur' }],
        erpPayCode: [{ required: true, message: this.$t('payMap.msg.erpPayCode'), trigger: 'blur' }],
        formCode: [{ required: true, message: this.$t('payMap.msg.formCode'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        creator: null,
        erpPayName: null,
        createTime: null,
        isEnable: null,
        payCode: null,
        remark: null,
        updater: null,
        updaterName: null,
        updateTime: null,
        erpPayCode: null,
        companyCode: null,
        creatorName: null,
        id: null,
        formCode: null
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
