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
          skuCategoryId: null,
          validityDay: null,
          warmValidityDay: null,
          inWhValidity: null,
          outWhValidity: null,
          remark: null,
          creator: null,
          createName: null,
          createTime: null,
          updater: null,
          updateName: null,
          updateTime: null
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
        { label: this.$t('validityWarn.skuCategoryId'), value: 'skuCategoryId', type: 'slot' },
        { label: this.$t('validityWarn.creator'), value: 'createName', type: 'input' },
        { label: this.$t('validityWarn.createTimeBegin'), value: 'createTimeBegin', type: 'date' },
        { label: this.$t('validityWarn.createTimeEnd'), value: 'createTimeEnd', type: 'date' },
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
        { prop: 'categoryName', label: this.$t('validityWarn.skuCategoryId'), minWidth: 100 },
        { prop: 'validityDay', label: this.$t('validityWarn.validityDay'), minWidth: 100 },
        { prop: 'warmValidityDay', label: this.$t('validityWarn.warmValidityDay'), minWidth: 100 },
        { prop: 'inWhValidity', label: this.$t('validityWarn.inWhValidity'), minWidth: 100 },
        { prop: 'outWhValidity', label: this.$t('validityWarn.outWhValidity'), minWidth: 100 },
        { prop: 'remark', label: this.$t('validityWarn.remark'), minWidth: 100 },
        { prop: 'createName', label: this.$t('validityWarn.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('validityWarn.createTime'), minWidth: 100 },
        { prop: 'updateName', label: this.$t('validityWarn.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('validityWarn.updateTime'), minWidth: 100 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('validityWarn.skuCategoryId'), value: 'skuCategoryId', type: 'slot', readonly: true },
        { label: this.$t('validityWarn.validityDay'), value: 'validityDay', type: 'input', readonly: true },
        { label: this.$t('validityWarn.warmValidityDay'), value: 'warmValidityDay', type: 'input', readonly: true },
        { label: this.$t('validityWarn.inWhValidity'), value: 'inWhValidity', type: 'input', readonly: true },
        { label: this.$t('validityWarn.outWhValidity'), value: 'outWhValidity', type: 'input', readonly: true },
        { label: this.$t('validityWarn.remark'), value: 'remark', type: 'input', readonly: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('validityWarn.skuCategoryId'), value: 'skuCategoryId', type: 'slot' },
        { label: this.$t('validityWarn.validityDay'), value: 'validityDay', type: 'input' },
        { label: this.$t('validityWarn.warmValidityDay'), value: 'warmValidityDay', type: 'input' },
        { label: this.$t('validityWarn.inWhValidity'), value: 'inWhValidity', type: 'input' },
        { label: this.$t('validityWarn.outWhValidity'), value: 'outWhValidity', type: 'input' },
        { label: this.$t('validityWarn.remark'), value: 'remark', type: 'input' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('validityWarn.skuCategoryId'), value: 'skuCategoryId', type: 'slot' },
        { label: this.$t('validityWarn.validityDay'), value: 'validityDay', type: 'input' },
        { label: this.$t('validityWarn.warmValidityDay'), value: 'warmValidityDay', type: 'input' },
        { label: this.$t('validityWarn.inWhValidity'), value: 'inWhValidity', type: 'input' },
        { label: this.$t('validityWarn.outWhValidity'), value: 'outWhValidity', type: 'input' },
        { label: this.$t('validityWarn.remark'), value: 'remark', type: 'input' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        skuCategoryId: [{ required: true, message: this.$t('validityWarn.msg.skuCategoryId'), trigger: 'blur' }],
        inWhValidity: [{ required: true, validator: this.$valid.getIntegerValidatorGtZreo(), trigger: 'blur' }],
        creator: [{ required: true, message: this.$t('validityWarn.msg.creator'), trigger: 'blur' }],
        createTime: [{ required: true, message: this.$t('validityWarn.msg.createTime'), trigger: 'blur' }],
        warmValidityDay: [{ required: true, validator: this.$valid.getIntegerValidatorGtZreo(), trigger: 'blur' }],
        remark: [{ required: false, message: this.$t('validityWarn.msg.remark'), trigger: 'blur' }],
        validityDay: [{ required: true, validator: this.$valid.getIntegerValidatorGtZreo(), trigger: 'blur' }],
        updateName: [{ required: true, message: this.$t('validityWarn.msg.updateName'), trigger: 'blur' }],
        updater: [{ required: true, message: this.$t('validityWarn.msg.updater'), trigger: 'blur' }],
        optimistic: [{ required: true, message: this.$t('validityWarn.msg.optimistic'), trigger: 'blur' }],
        outWhValidity: [{ required: true, validator: this.$valid.getIntegerValidatorGtZreo(), trigger: 'blur' }],
        updateTime: [{ required: true, message: this.$t('validityWarn.msg.updateTime'), trigger: 'blur' }],
        whId: [{ required: true, message: this.$t('validityWarn.msg.whId'), trigger: 'blur' }],
        companyCode: [{ required: true, message: this.$t('validityWarn.msg.companyCode'), trigger: 'blur' }],
        id: [{ required: true, message: this.$t('validityWarn.msg.id'), trigger: 'blur' }],
        createName: [{ required: true, message: this.$t('validityWarn.msg.createName'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        skuCategoryId: null,
        inWhValidity: null,
        creator: null,
        createTime: null,
        warmValidityDay: null,
        remark: null,
        validityDay: null,
        updateName: null,
        updater: null,
        optimistic: null,
        outWhValidity: null,
        updateTime: null,
        whId: null,
        companyCode: null,
        id: null,
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
