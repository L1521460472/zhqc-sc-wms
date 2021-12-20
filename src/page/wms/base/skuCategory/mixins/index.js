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
          companyCode: null,
          partnerId: null,
          hasChild: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        origSysList: []
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
        { label: this.$t('skuCategory.companyCode'), value: 'companyCode', type: 'input' },
        { label: this.$t('skuCategory.partnerId'), value: 'partnerId', type: 'input' },
        { label: this.$t('skuCategory.hasChild'), value: 'hasChild', type: 'input' },
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
        { prop: 'companyCode', label: this.$t('skuCategory.companyCode'), minWidth: 100 },
        { prop: 'partnerId', label: this.$t('skuCategory.partnerId'), minWidth: 100 },
        { prop: 'categoryName', label: this.$t('skuCategory.categoryName'), minWidth: 100 },
        { prop: 'hasChild', label: this.$t('skuCategory.hasChild'), minWidth: 100 },
        { prop: 'depth', label: this.$t('skuCategory.depth'), minWidth: 100 },
        { prop: 'remark', label: this.$t('skuCategory.remark'), minWidth: 100 },
        { prop: 'creator', label: this.$t('skuCategory.creator'), minWidth: 100 },
        { prop: 'createName', label: this.$t('skuCategory.createName'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('skuCategory.createTime'), minWidth: 100 },
        { prop: 'updater', label: this.$t('skuCategory.updater'), minWidth: 100 },
        { prop: 'updateName', label: this.$t('skuCategory.updateName'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('skuCategory.updateTime'), minWidth: 100 },
        { prop: 'optimistic', label: this.$t('skuCategory.optimistic'), minWidth: 100 }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('skuCategory.parentName'), value: 'parentName', disabled: true, type: 'input' },
        { label: this.$t('skuCategory.categoryCode'), value: 'categoryCode', disabled: true, type: 'input' },
        { label: this.$t('skuCategory.categoryName'), value: 'categoryName', type: 'input' },
        // {label: this.$t('skuCategory.origSys'), value: "origSys", type: "select" ,disabled:true,list:'origSysList'},
        // {label: this.$t('skuCategory.origCode'), value: "origCode", type: "input"},
        { label: this.$t('skuCategory.remark'), value: 'remark', type: 'input' }
      ]
    },

    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        partnerId: [{ required: true, message: this.$t('skuCategory.msg.partnerId'), trigger: 'blur' }],
        categoryCode: [{ required: true, message: this.$t('skuCategory.msg.categoryCode'), trigger: 'blur' }],
        categoryName: [{ required: true, message: this.$t('skuCategory.msg.categoryName'), trigger: 'blur' }]
        // origSys:[{required: true, message: this.$t('skuCategory.msg.origSys'), trigger: 'blur'}],
        // origCode:[{required: true, message: this.$t('skuCategory.msg.origCode'), trigger: 'blur'}],
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        parentId: null,
        parentName: null,
        categoryCode: null,
        categoryName: null,
        origSys: null,
        origCode: null,
        remark: null,
        id: null
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
