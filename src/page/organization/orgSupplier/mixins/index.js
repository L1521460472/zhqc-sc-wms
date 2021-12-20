import notification from './notification'
export default {
  mixins: [notification],
  data() {
    return {
      // 主页面的top表单
      topForm: {
        ref: null, // 对外提供的可操作表单的持有对象
        fieldList: null, // 配置的表单字段集合
        data: {// 表单绑定的数据Model

        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        //          statusList: [
        //              { key: '是', value: 1 },
        //              { key: '否', value: 0 },
        //          ]
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '210', // 默认操作按钮列宽度
          btList: [// 添加操作按钮
            // 默认修改按钮
            { label: this.$t('table.view'), type: 'success', icon: '', event: 'view', show: true }// event值为notification.js中定义的方法名
            // {label:this.$t('table.edit'), type: 'success', icon: '', event: 'update', show: true,disabled:this.hasPerm('edit')},//event值为notification.js中定义的方法名
            // 默认删除按钮
            // {label:this.$t('table.delete'), type: 'danger', icon: '', event: 'delete', show: true,disabled:this.hasPerm('delete')},//event值为notification.js中定义的方法名
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
        { label: this.$t('orgSupplier.name'), value: 'name', type: 'input' },
        { type: 'button', label: '', btnlabel: this.$t('table.search'), btType: 'primary', icon: 'el-icon-search', event: 'search', show: true, disabled: this.hasPerm('search') }
      ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 },
        { label: this.$t('orgSupplier.id'), prop: 'id', 'minWidth': 100, formatter: this.showTableString },
        { label: this.$t('orgSupplier.ownerCode'), prop: 'ownerCode', 'minWidth': 100, formatter: this.showTableString },
        { label: this.$t('orgSupplier.code'), prop: 'code', 'minWidth': 100, formatter: this.showTableString },
        { label: this.$t('orgSupplier.ownerSupplierCode'), prop: 'ownerSupplierCode', 'minWidth': 100, formatter: this.showTableString },
        { label: this.$t('orgSupplier.name'), prop: 'name', 'minWidth': 100, formatter: this.showTableString },
        { label: this.$t('orgSupplier.supplierType'), prop: 'supplierType', 'minWidth': 100, formatter: this.showTableString },
        { label: this.$t('orgSupplier.contact'), prop: 'contact', 'minWidth': 100, formatter: this.showTableString },
        { label: this.$t('orgSupplier.tel'), prop: 'tel', 'minWidth': 100, formatter: this.showTableString },
        { label: this.$t('orgSupplier.description'), prop: 'description', 'minWidth': 100, formatter: this.showTableString },
        { label: this.$t('orgSupplier.createTime'), prop: 'createTime', 'minWidth': 100, formatter: this.showTableString },
        { label: this.$t('orgSupplier.createOwner'), prop: 'createOwner', 'minWidth': 100, formatter: this.showTableString },
        { label: this.$t('orgSupplier.updateTime'), prop: 'updateTime', 'minWidth': 100, formatter: this.showTableString },
        { label: this.$t('orgSupplier.updateOwner'), prop: 'updateOwner', 'minWidth': 100, formatter: this.showTableString }]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('orgSupplier.id'), value: 'id', type: 'input', readonly: true },
        { label: this.$t('orgSupplier.ownerCode'), value: 'ownerCode', type: 'input', readonly: true },
        { label: this.$t('orgSupplier.code'), value: 'code', type: 'input', readonly: true },
        { label: this.$t('orgSupplier.ownerSupplierCode'), value: 'ownerSupplierCode', type: 'input', readonly: true },
        { label: this.$t('orgSupplier.name'), value: 'name', type: 'input', readonly: true },
        { label: this.$t('orgSupplier.supplierType'), value: 'supplierType', type: 'input', readonly: true },
        { label: this.$t('orgSupplier.contact'), value: 'contact', type: 'input', readonly: true },
        { label: this.$t('orgSupplier.tel'), value: 'tel', type: 'input', readonly: true },
        { label: this.$t('orgSupplier.description'), value: 'description', type: 'input', readonly: true },
        { label: this.$t('orgSupplier.createTime'), value: 'createTime', type: 'input', readonly: true },
        { label: this.$t('orgSupplier.createOwner'), value: 'createOwner', type: 'input', readonly: true },
        { label: this.$t('orgSupplier.updateTime'), value: 'updateTime', type: 'input', readonly: true },
        { label: this.$t('orgSupplier.updateOwner'), value: 'updateOwner', type: 'input', readonly: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('orgSupplier.id'), value: 'id', type: 'number' },
        { label: this.$t('orgSupplier.ownerCode'), value: 'ownerCode', type: 'input' },
        { label: this.$t('orgSupplier.code'), value: 'code', type: 'input' },
        { label: this.$t('orgSupplier.ownerSupplierCode'), value: 'ownerSupplierCode', type: 'input' },
        { label: this.$t('orgSupplier.name'), value: 'name', type: 'input' },
        { label: this.$t('orgSupplier.supplierType'), value: 'supplierType', type: 'input' },
        { label: this.$t('orgSupplier.contact'), value: 'contact', type: 'input' },
        { label: this.$t('orgSupplier.tel'), value: 'tel', type: 'input' },
        { label: this.$t('orgSupplier.description'), value: 'description', type: 'input' },
        { label: this.$t('orgSupplier.createTime'), value: 'createTime', type: 'date', dateType: 'datetime' },
        { label: this.$t('orgSupplier.createOwner'), value: 'createOwner', type: 'input' },
        { label: this.$t('orgSupplier.updateTime'), value: 'updateTime', type: 'date', dateType: 'datetime' },
        { label: this.$t('orgSupplier.updateOwner'), value: 'updateOwner', type: 'input' }]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('orgSupplier.id'), value: 'id', type: 'input', readonly: true },
        { label: this.$t('orgSupplier.ownerCode'), value: 'ownerCode', type: 'input' },
        { label: this.$t('orgSupplier.code'), value: 'code', type: 'input' },
        { label: this.$t('orgSupplier.ownerSupplierCode'), value: 'ownerSupplierCode', type: 'input' },
        { label: this.$t('orgSupplier.name'), value: 'name', type: 'input' },
        { label: this.$t('orgSupplier.supplierType'), value: 'supplierType', type: 'input' },
        { label: this.$t('orgSupplier.contact'), value: 'contact', type: 'input' },
        { label: this.$t('orgSupplier.tel'), value: 'tel', type: 'input' },
        { label: this.$t('orgSupplier.description'), value: 'description', type: 'input' },
        { label: this.$t('orgSupplier.createTime'), value: 'createTime', type: 'input', readonly: true },
        { label: this.$t('orgSupplier.createOwner'), value: 'createOwner', type: 'input', readonly: true },
        { label: this.$t('orgSupplier.updateTime'), value: 'updateTime', type: 'input', readonly: true },
        { label: this.$t('orgSupplier.updateOwner'), value: 'updateOwner', type: 'input', readonly: true }]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        ownerCode: [{ 'required': true, message: this.$t('orgSupplier.msg.ownerCode'), trigger: 'blur' },
          { max: 32, message: this.$t('orgSupplier.msg.ownerCode') }
        ],
        code: [{ 'required': true, message: this.$t('orgSupplier.msg.code'), trigger: 'blur' },
          { max: 32, message: this.$t('orgSupplier.msg.code') }
        ],
        ownerSupplierCode: [{ 'required': true, message: this.$t('orgSupplier.msg.ownerSupplierCode'), trigger: 'blur' },
          { max: 32, message: this.$t('orgSupplier.msg.ownerSupplierCode') }
        ],
        name: [{ 'required': true, message: this.$t('orgSupplier.msg.name'), trigger: 'blur' },
          { max: 50, message: this.$t('orgSupplier.msg.name') }
        ],
        supplierType: [{ max: 20, message: this.$t('orgSupplier.msg.supplierType') }],
        contact: [{ max: 30, message: this.$t('orgSupplier.msg.contact') }],
        tel: [{ max: 18, message: this.$t('orgSupplier.msg.tel') }],
        description: [{ max: 100, message: this.$t('orgSupplier.msg.description') }],
        createTime: [{ 'required': true, message: this.$t('orgSupplier.msg.createTime'), trigger: 'blur' }
        ],
        createOwner: [{ 'required': true, message: this.$t('orgSupplier.msg.createOwner'), trigger: 'blur' },
          { max: 32, message: this.$t('orgSupplier.msg.createOwner') }
        ],
        updateOwner: [{ max: 32, message: this.$t('orgSupplier.msg.updateOwner') }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        'id': null,
        'ownerCode': null,
        'code': null,
        'ownerSupplierCode': null,
        'name': null,
        'supplierType': null,
        'contact': null,
        'tel': null,
        'description': null,
        'createTime': null,
        'createOwner': null,
        'updateTime': null,
        'updateOwner': null
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
