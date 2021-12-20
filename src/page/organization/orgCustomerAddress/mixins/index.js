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
        { label: this.$t('orgCustomerAddress.custCode'), value: 'custCode', type: 'input' },
        { type: 'button', label: '', btnlabel: this.$t('table.search'), btType: 'primary', icon: 'el-icon-search', event: 'search', show: true, disabled: this.hasPerm('search') }
      ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 },
        { label: this.$t('orgCustomerAddress.id'), prop: 'id', 'minWidth': 100, formatter: this.showTableString },
        { label: this.$t('orgCustomerAddress.custCode'), prop: 'custCode', 'minWidth': 100, formatter: this.showTableString },
        { label: this.$t('orgCustomerAddress.code'), prop: 'code', 'minWidth': 100, formatter: this.showTableString },
        { label: this.$t('orgCustomerAddress.custAddrCode'), prop: 'custAddrCode', 'minWidth': 100, formatter: this.showTableString },
        { label: this.$t('orgCustomerAddress.name'), prop: 'name', 'minWidth': 100, formatter: this.showTableString },
        { label: this.$t('orgCustomerAddress.detail'), prop: 'detail', 'minWidth': 100, formatter: this.showTableString },
        { label: this.$t('orgCustomerAddress.contact'), prop: 'contact', 'minWidth': 100, formatter: this.showTableString },
        { label: this.$t('orgCustomerAddress.tel'), prop: 'tel', 'minWidth': 100, formatter: this.showTableString },
        { label: this.$t('orgCustomerAddress.telBak'), prop: 'telBak', 'minWidth': 100, formatter: this.showTableString },
        { label: this.$t('orgCustomerAddress.isDefault'), prop: 'isDefault', 'minWidth': 100, formatter: this.showTableString },
        { label: this.$t('orgCustomerAddress.description'), prop: 'description', 'minWidth': 100, formatter: this.showTableString },
        { label: this.$t('orgCustomerAddress.createTime'), prop: 'createTime', 'minWidth': 100, formatter: this.showTableString },
        { label: this.$t('orgCustomerAddress.createOwner'), prop: 'createOwner', 'minWidth': 100, formatter: this.showTableString },
        { label: this.$t('orgCustomerAddress.updateTime'), prop: 'updateTime', 'minWidth': 100, formatter: this.showTableString },
        { label: this.$t('orgCustomerAddress.updateOwner'), prop: 'updateOwner', 'minWidth': 100, formatter: this.showTableString }]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('orgCustomerAddress.id'), value: 'id', type: 'input', readonly: true },
        { label: this.$t('orgCustomerAddress.custCode'), value: 'custCode', type: 'input', readonly: true },
        { label: this.$t('orgCustomerAddress.code'), value: 'code', type: 'input', readonly: true },
        { label: this.$t('orgCustomerAddress.custAddrCode'), value: 'custAddrCode', type: 'input', readonly: true },
        { label: this.$t('orgCustomerAddress.name'), value: 'name', type: 'input', readonly: true },
        { label: this.$t('orgCustomerAddress.detail'), value: 'detail', type: 'input', readonly: true },
        { label: this.$t('orgCustomerAddress.contact'), value: 'contact', type: 'input', readonly: true },
        { label: this.$t('orgCustomerAddress.tel'), value: 'tel', type: 'input', readonly: true },
        { label: this.$t('orgCustomerAddress.telBak'), value: 'telBak', type: 'input', readonly: true },
        { label: this.$t('orgCustomerAddress.isDefault'), value: 'isDefault', type: 'boolean', disabled: true },
        { label: this.$t('orgCustomerAddress.description'), value: 'description', type: 'input', readonly: true },
        { label: this.$t('orgCustomerAddress.createTime'), value: 'createTime', type: 'input', readonly: true },
        { label: this.$t('orgCustomerAddress.createOwner'), value: 'createOwner', type: 'input', readonly: true },
        { label: this.$t('orgCustomerAddress.updateTime'), value: 'updateTime', type: 'input', readonly: true },
        { label: this.$t('orgCustomerAddress.updateOwner'), value: 'updateOwner', type: 'input', readonly: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.diaFormInfo.fieldList = [
        // {label: this.$t('smBase.id'), value: "id", type: "input"},
        { label: this.$t('orgCustomerAddress.id'), value: 'id', type: 'number' },
        { label: this.$t('orgCustomerAddress.custCode'), value: 'custCode', type: 'input' },
        { label: this.$t('orgCustomerAddress.code'), value: 'code', type: 'input' },
        { label: this.$t('orgCustomerAddress.custAddrCode'), value: 'custAddrCode', type: 'input' },
        { label: this.$t('orgCustomerAddress.name'), value: 'name', type: 'input' },
        { label: this.$t('orgCustomerAddress.detail'), value: 'detail', type: 'input' },
        { label: this.$t('orgCustomerAddress.contact'), value: 'contact', type: 'input' },
        { label: this.$t('orgCustomerAddress.tel'), value: 'tel', type: 'input' },
        { label: this.$t('orgCustomerAddress.telBak'), value: 'telBak', type: 'input' },
        { label: this.$t('orgCustomerAddress.isDefault'), value: 'isDefault', type: 'boolean' },
        { label: this.$t('orgCustomerAddress.description'), value: 'description', type: 'input' },
        { label: this.$t('orgCustomerAddress.createTime'), value: 'createTime', type: 'date', dateType: 'datetime' },
        { label: this.$t('orgCustomerAddress.createOwner'), value: 'createOwner', type: 'input' },
        { label: this.$t('orgCustomerAddress.updateTime'), value: 'updateTime', type: 'date', dateType: 'datetime' },
        { label: this.$t('orgCustomerAddress.updateOwner'), value: 'updateOwner', type: 'input' }]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('orgCustomerAddress.id'), value: 'id', type: 'input', readonly: true },
        { label: this.$t('orgCustomerAddress.custCode'), value: 'custCode', type: 'input' },
        { label: this.$t('orgCustomerAddress.code'), value: 'code', type: 'input' },
        { label: this.$t('orgCustomerAddress.custAddrCode'), value: 'custAddrCode', type: 'input' },
        { label: this.$t('orgCustomerAddress.name'), value: 'name', type: 'input' },
        { label: this.$t('orgCustomerAddress.detail'), value: 'detail', type: 'input' },
        { label: this.$t('orgCustomerAddress.contact'), value: 'contact', type: 'input' },
        { label: this.$t('orgCustomerAddress.tel'), value: 'tel', type: 'input' },
        { label: this.$t('orgCustomerAddress.telBak'), value: 'telBak', type: 'input' },
        { label: this.$t('orgCustomerAddress.isDefault'), value: 'isDefault', type: 'boolean' },
        { label: this.$t('orgCustomerAddress.description'), value: 'description', type: 'input' },
        { label: this.$t('orgCustomerAddress.createTime'), value: 'createTime', type: 'input', readonly: true },
        { label: this.$t('orgCustomerAddress.createOwner'), value: 'createOwner', type: 'input', readonly: true },
        { label: this.$t('orgCustomerAddress.updateTime'), value: 'updateTime', type: 'input', readonly: true },
        { label: this.$t('orgCustomerAddress.updateOwner'), value: 'updateOwner', type: 'input', readonly: true }]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        custCode: [{ 'required': true, message: this.$t('orgCustomerAddress.msg.custCode'), trigger: 'blur' },
          { max: 32, message: this.$t('orgCustomerAddress.msg.custCode') }
        ],
        code: [{ 'required': true, message: this.$t('orgCustomerAddress.msg.code'), trigger: 'blur' },
          { max: 32, message: this.$t('orgCustomerAddress.msg.code') }
        ],
        custAddrCode: [{ 'required': true, message: this.$t('orgCustomerAddress.msg.custAddrCode'), trigger: 'blur' },
          { max: 32, message: this.$t('orgCustomerAddress.msg.custAddrCode') }
        ],
        name: [{ 'required': true, message: this.$t('orgCustomerAddress.msg.name'), trigger: 'blur' },
          { max: 50, message: this.$t('orgCustomerAddress.msg.name') }
        ],
        detail: [{ 'required': true, message: this.$t('orgCustomerAddress.msg.detail'), trigger: 'blur' },
          { max: 100, message: this.$t('orgCustomerAddress.msg.detail') }
        ],
        contact: [{ max: 30, message: this.$t('orgCustomerAddress.msg.contact') }],
        tel: [{ max: 18, message: this.$t('orgCustomerAddress.msg.tel') }],
        telBak: [{ max: 18, message: this.$t('orgCustomerAddress.msg.telBak') }],
        isDefault: [{ 'required': true, message: this.$t('orgCustomerAddress.msg.isDefault'), trigger: 'blur' }
        ],
        description: [{ max: 100, message: this.$t('orgCustomerAddress.msg.description') }],
        createTime: [{ 'required': true, message: this.$t('orgCustomerAddress.msg.createTime'), trigger: 'blur' }
        ],
        createOwner: [{ 'required': true, message: this.$t('orgCustomerAddress.msg.createOwner'), trigger: 'blur' },
          { max: 32, message: this.$t('orgCustomerAddress.msg.createOwner') }
        ],
        updateOwner: [{ max: 32, message: this.$t('orgCustomerAddress.msg.updateOwner') }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        'id': null,
        'custCode': null,
        'code': null,
        'custAddrCode': null,
        'name': null,
        'detail': null,
        'contact': null,
        'tel': null,
        'telBak': null,
        'isDefault': null,
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
