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
          inventoryNo: null,
          inventoryType: null,
          inventoryStatus: null,
          inventorySource: null,
          origNo: null,
          inventoryMethod: null,
          isVisible: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        inventorySourceList: [
        ],
        isVisibleList: [
        ],
        inventoryMethodList: [
        ],
        inventoryTypeList: [
        ],
        inventoryStatusList: [
        ]
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '210', // 默认操作按钮列宽度
          btList: [// 添加操作按钮
            // 默认查看按钮
            { label: this.$t('table.view'), type: 'primary', icon: '', event: 'openViewPage', show: true, disabled: this.$hasPerm('view') }, // event值为notification.js中定义的方法名
            // 默认修改按钮
            { label: this.$t('table.edit'), type: 'success', icon: '', event: 'openEditPage', show: true, disabled: this.$hasPerm('edit') }, // event值为notification.js中定义的方法名
            // 默认删除按钮
            { label: this.$t('table.delete'), type: 'danger', icon: '', event: 'deleteData', show: true, disabled: this.$hasPerm('delete') }// event值为notification.js中定义的方法名
          ]
        }
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
        { label: this.$t('standardInventory.inventoryNo'), value: 'inventoryNo', type: 'input' },
        { label: this.$t('standardInventory.inventoryType'), value: 'inventoryType', type: 'select', list: 'inventoryTypeList' },
        { label: this.$t('standardInventory.inventoryStatus'), value: 'inventoryStatus', type: 'select', list: 'inventoryStatusList' },
        { label: this.$t('standardInventory.inventorySource'), value: 'inventorySource', type: 'select', list: 'inventorySourceList' },
        { label: this.$t('standardInventory.origNo'), value: 'origNo', type: 'input' },
        { label: this.$t('standardInventory.inventoryMethod'), value: 'inventoryMethod', type: 'select', list: 'inventoryMethodList' },
        { label: this.$t('standardInventory.isVisible'), value: 'isVisible', type: 'select', list: 'isVisibleList' },
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
        { prop: 'companyCode', label: this.$t('standardInventory.companyCode'), minWidth: 100 },
        { prop: 'whId', label: this.$t('standardInventory.whId'), minWidth: 100 },
        { prop: 'inventoryNo', label: this.$t('standardInventory.inventoryNo'), minWidth: 100 },
        { prop: 'inventoryType', label: this.$t('standardInventory.inventoryType'), minWidth: 100 },
        { prop: 'inventoryStatus', label: this.$t('standardInventory.inventoryStatus'), minWidth: 100 },
        { prop: 'inventorySource', label: this.$t('standardInventory.inventorySource'), minWidth: 100 },
        { prop: 'origNo', label: this.$t('standardInventory.origNo'), minWidth: 100 },
        { prop: 'inventoryMethod', label: this.$t('standardInventory.inventoryMethod'), minWidth: 100 },
        { prop: 'expStartTime', label: this.$t('standardInventory.expStartTime'), minWidth: 100 },
        { prop: 'isVisible', label: this.$t('standardInventory.isVisible'), minWidth: 100 },
        { prop: 'confirmUser', label: this.$t('standardInventory.confirmUser'), minWidth: 100 },
        { prop: 'inventoryConfirmTime', label: this.$t('standardInventory.inventoryConfirmTime'), minWidth: 100 },
        { prop: 'inventoryEndTime', label: this.$t('standardInventory.inventoryEndTime'), minWidth: 100 },
        { prop: 'remark', label: this.$t('standardInventory.remark'), minWidth: 100 },
        { prop: 'creator', label: this.$t('standardInventory.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('standardInventory.createTime'), minWidth: 100 },
        { prop: 'updater', label: this.$t('standardInventory.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('standardInventory.updateTime'), minWidth: 100 },
        { prop: 'optimistic', label: this.$t('standardInventory.optimistic'), minWidth: 100 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('standardInventory.inventoryNo'), value: 'inventoryNo', type: 'input', readonly: true },
        { label: this.$t('standardInventory.inventoryType'), value: 'inventoryType', type: 'input', readonly: true },
        { label: this.$t('standardInventory.inventoryStatus'), value: 'inventoryStatus', type: 'input', readonly: true },
        { label: this.$t('standardInventory.inventorySource'), value: 'inventorySource', type: 'input', readonly: true },
        { label: this.$t('standardInventory.origNo'), value: 'origNo', type: 'input', readonly: true },
        { label: this.$t('standardInventory.inventoryMethod'), value: 'inventoryMethod', type: 'input', readonly: true },
        { label: this.$t('standardInventory.expStartTime'), value: 'expStartTime', type: 'input', readonly: true },
        { label: this.$t('standardInventory.isVisible'), value: 'isVisible', type: 'input', readonly: true },
        { label: this.$t('standardInventory.remark'), value: 'remark', type: 'input', readonly: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('standardInventory.inventoryNo'), value: 'inventoryNo', type: 'input' },
        { label: this.$t('standardInventory.inventoryType'), value: 'inventoryType', type: 'input' },
        { label: this.$t('standardInventory.inventoryStatus'), value: 'inventoryStatus', type: 'input' },
        { label: this.$t('standardInventory.inventorySource'), value: 'inventorySource', type: 'input' },
        { label: this.$t('standardInventory.origNo'), value: 'origNo', type: 'input' },
        { label: this.$t('standardInventory.inventoryMethod'), value: 'inventoryMethod', type: 'input' },
        { label: this.$t('standardInventory.expStartTime'), value: 'expStartTime', type: 'input' },
        { label: this.$t('standardInventory.isVisible'), value: 'isVisible', type: 'input' },
        { label: this.$t('standardInventory.remark'), value: 'remark', type: 'input' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('standardInventory.inventoryNo'), value: 'inventoryNo', type: 'input' },
        { label: this.$t('standardInventory.inventoryType'), value: 'inventoryType', type: 'input' },
        { label: this.$t('standardInventory.inventoryStatus'), value: 'inventoryStatus', type: 'input' },
        { label: this.$t('standardInventory.inventorySource'), value: 'inventorySource', type: 'input' },
        { label: this.$t('standardInventory.origNo'), value: 'origNo', type: 'input' },
        { label: this.$t('standardInventory.inventoryMethod'), value: 'inventoryMethod', type: 'input' },
        { label: this.$t('standardInventory.expStartTime'), value: 'expStartTime', type: 'input' },
        { label: this.$t('standardInventory.isVisible'), value: 'isVisible', type: 'input' },
        { label: this.$t('standardInventory.confirmUser'), value: 'confirmUser', type: 'input' },
        { label: this.$t('standardInventory.remark'), value: 'remark', type: 'input' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        inventorySource: [{ required: true, message: this.$t('standardInventory.msg.inventorySource'), trigger: 'blur' }],
        expStartTime: [{ required: true, message: this.$t('standardInventory.msg.expStartTime'), trigger: 'blur' }],
        isVisible: [{ required: true, message: this.$t('standardInventory.msg.isVisible'), trigger: 'blur' }],
        inventoryMethod: [{ required: true, message: this.$t('standardInventory.msg.inventoryMethod'), trigger: 'blur' }],
        remark: [{ required: true, message: this.$t('standardInventory.msg.remark'), trigger: 'blur' }],
        inventoryType: [{ required: true, message: this.$t('standardInventory.msg.inventoryType'), trigger: 'blur' }],
        origNo: [{ required: true, message: this.$t('standardInventory.msg.origNo'), trigger: 'blur' }],
        inventoryNo: [{ required: true, message: this.$t('standardInventory.msg.inventoryNo'), trigger: 'blur' }],
        inventoryStatus: [{ required: true, message: this.$t('standardInventory.msg.inventoryStatus'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        inventorySource: null,
        expStartTime: null,
        isVisible: null,
        inventoryMethod: null,
        confirmUser: null,
        remark: null,
        inventoryType: null,
        origNo: null,
        inventoryNo: null,
        inventoryStatus: null
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
