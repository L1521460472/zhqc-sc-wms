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
            { label: this.$t('table.view'), type: 'success', icon: '', event: 'view', show: true }, // event值为notification.js中定义的方法名
            // 默认修改按钮
            { label: this.$t('table.edit'), type: 'success', icon: '', event: 'update', show: true, disabled: this.hasPerm('edit') }, // event值为notification.js中定义的方法名
            // 默认删除按钮
            { label: this.$t('table.delete'), type: 'danger', icon: '', event: 'delete', show: true, disabled: this.hasPerm('delete') }// event值为notification.js中定义的方法名
          ]
        }
      },
      // 弹窗表单
      diaFormInfo: {
        title: '基础信息',
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        subTableInfo: {
          title: '列表详情',
          ref: null,
          type: null,
          fieldList: [],
          rules: { },
          addShow: true,
          labelWidth: '120px',
          handle: {
            fixed: 'right',
            label: '操作',
            width: '150',
            btList: [
              // 默认修改按钮
              { label: this.$t('table.edit'), type: 'success', icon: '', event: 'updateSub', show: true, disabled: this.hasPerm('edit') },
              // 默认删除按钮
              { label: this.$t('table.delete'), type: 'danger', icon: '', event: 'deleteSub', show: true, disabled: this.hasPerm('delete') }
            ]
          },
          saveList: [
            { label: '关闭', type: '', icon: '', event: 'close', show: true },
            { label: '保存', type: 'primary', icon: '', event: 'save', saveLoading: false, show: true }],
          closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
          topBtn: { label: '添加明细', type: '', icon: 'el-ali-icon-quanxuan', event: 'addSub', show: true },
          formInfo: {
            ref: null,
            data: {},
            rules: {},
            title: '子项信息',
            visible: false,
            width: '800',
            btList: [
              {
                label: this.$t('table.close'),
                type: '',
                icon: '',
                event: 'closeSub',
                show: true
              },
              {
                label: this.$t('table.save'),
                type: 'primary',
                icon: '',
                event: 'saveSub',
                btLoading: false,
                show: true
              }
            ]
          }
        }
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
        { label: this.$t('productCategorySkuProperty.categoryCode'), value: 'categoryCode', type: 'input' },
        { label: this.$t('productCategorySkuProperty.name'), value: 'name', type: 'input' },
        { label: this.$t('productCategorySkuProperty.propertyType'), value: 'propertyType', type: 'input' },
        { type: 'button', label: '', btnlabel: this.$t('table.search'), btType: 'primary', icon: 'el-icon-search', event: 'search', show: true, disabled: this.hasPerm('search') }
      ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 },
        { label: this.$t('productCategorySkuProperty.id'), prop: 'id', 'minWidth': 100, formatter: this.showTableString },
        { label: this.$t('productCategorySkuProperty.categoryCode'), prop: 'categoryCode', 'minWidth': 100, formatter: this.showTableString },
        { label: this.$t('productCategorySkuProperty.name'), prop: 'name', 'minWidth': 100, formatter: this.showTableString },
        { label: this.$t('productCategorySkuProperty.code'), prop: 'code', 'minWidth': 100, formatter: this.showTableString },
        { label: this.$t('productCategorySkuProperty.propertyType'), prop: 'propertyType', 'minWidth': 100, formatter: this.showTableString },
        { label: this.$t('productCategorySkuProperty.suffix'), prop: 'suffix', 'minWidth': 100, formatter: this.showTableString },
        { label: this.$t('productCategorySkuProperty.orderNo'), prop: 'orderNo', 'minWidth': 100, formatter: this.showTableString },
        { label: this.$t('productCategorySkuProperty.usable'), prop: 'usable', 'minWidth': 100, formatter: this.showTableString },
        { label: this.$t('productCategorySkuProperty.necessaryFlag'), prop: 'necessaryFlag', 'minWidth': 100, formatter: this.showTableString },
        { label: this.$t('productCategorySkuProperty.createTime'), prop: 'createTime', 'minWidth': 100, formatter: this.showTableString },
        { label: this.$t('productCategorySkuProperty.createOwner'), prop: 'createOwner', 'minWidth': 100, formatter: this.showTableString },
        { label: this.$t('productCategorySkuProperty.updateTime'), prop: 'updateTime', 'minWidth': 100, formatter: this.showTableString },
        { label: this.$t('productCategorySkuProperty.updateOwner'), prop: 'updateOwner', 'minWidth': 100, formatter: this.showTableString }]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('productCategorySkuProperty.id'), value: 'id', type: 'input', readonly: true },
        { label: this.$t('productCategorySkuProperty.categoryCode'), value: 'categoryCode', type: 'input', readonly: true },
        { label: this.$t('productCategorySkuProperty.name'), value: 'name', type: 'input', readonly: true },
        { label: this.$t('productCategorySkuProperty.code'), value: 'code', type: 'input', readonly: true },
        { label: this.$t('productCategorySkuProperty.propertyType'), value: 'propertyType', type: 'input', readonly: true },
        { label: this.$t('productCategorySkuProperty.suffix'), value: 'suffix', type: 'input', readonly: true },
        { label: this.$t('productCategorySkuProperty.orderNo'), value: 'orderNo', type: 'input', readonly: true },
        { label: this.$t('productCategorySkuProperty.usable'), value: 'usable', type: 'boolean', disabled: true },
        { label: this.$t('productCategorySkuProperty.necessaryFlag'), value: 'necessaryFlag', type: 'boolean', disabled: true },
        { label: this.$t('productCategorySkuProperty.createTime'), value: 'createTime', type: 'input', readonly: true },
        { label: this.$t('productCategorySkuProperty.createOwner'), value: 'createOwner', type: 'input', readonly: true },
        { label: this.$t('productCategorySkuProperty.updateTime'), value: 'updateTime', type: 'input', readonly: true },
        { label: this.$t('productCategorySkuProperty.updateOwner'), value: 'updateOwner', type: 'input', readonly: true }
      ]

      this.diaFormInfo.subTableInfo.fieldList = [
        { 'label': this.$t('table.id'), 'type': 'index', 'width': 50 },
        { 'prop': 'optionLabel', 'label': '选项名称', 'minWidth': 100 },
        { 'prop': 'id', 'label': '编码', 'minWidth': 100 },
        { 'prop': 'parentId', 'label': '父表ID', 'minWidth': 100 },
        { 'prop': 'propertyCode', 'label': 'SKu属性编码', 'minWidth': 100 },
        { 'prop': 'optionValue', 'label': '选项值', 'minWidth': 100 },
        { 'prop': 'usable', 'label': '是否可用', 'minWidth': 100 },
        { 'prop': 'createTime', 'label': '创建时间', 'minWidth': 100 },
        { 'prop': 'createOwner', 'label': '创建人', 'minWidth': 100 },
        { 'prop': 'updateTime', 'label': '修改时间', 'minWidth': 100 },
        { 'prop': 'updateOwner', 'label': '修改人', 'minWidth': 100 }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('productCategorySkuProperty.id'), value: 'id', type: 'number' },
        { label: this.$t('productCategorySkuProperty.categoryCode'), value: 'categoryCode', type: 'input' },
        { label: this.$t('productCategorySkuProperty.name'), value: 'name', type: 'input' },
        { label: this.$t('productCategorySkuProperty.code'), value: 'code', type: 'input' },
        { label: this.$t('productCategorySkuProperty.propertyType'), value: 'propertyType', type: 'input' },
        { label: this.$t('productCategorySkuProperty.suffix'), value: 'suffix', type: 'input' },
        { label: this.$t('productCategorySkuProperty.orderNo'), value: 'orderNo', type: 'number' },
        { label: this.$t('productCategorySkuProperty.usable'), value: 'usable', type: 'boolean' },
        { label: this.$t('productCategorySkuProperty.necessaryFlag'), value: 'necessaryFlag', type: 'boolean' },
        { label: this.$t('productCategorySkuProperty.createTime'), value: 'createTime', type: 'date', dateType: 'datetime' },
        { label: this.$t('productCategorySkuProperty.createOwner'), value: 'createOwner', type: 'input' },
        { label: this.$t('productCategorySkuProperty.updateTime'), value: 'updateTime', type: 'date', dateType: 'datetime' },
        { label: this.$t('productCategorySkuProperty.updateOwner'), value: 'updateOwner', type: 'input' }]

      this.diaFormInfo.subTableInfo.fieldList = [
        { 'label': this.$t('table.id'), 'type': 'index', 'width': 50 },
        { 'prop': 'optionLabel', 'label': '选项名称', 'minWidth': 100, 'edit': { 'name': 'input' }},
        { 'prop': 'propertyCode', 'label': 'SKu属性编码', 'minWidth': 100, 'edit': { 'name': 'input' }},
        { 'prop': 'optionValue', 'label': '选项值', 'minWidth': 100, 'edit': { 'name': 'input' }},
        { 'prop': 'usable', 'label': '是否可用', 'minWidth': 100, 'edit': { 'name': 'boolean' }}
      ]

      this.diaFormInfo.subTableInfo.formList = [
        { label: '选项名称', value: 'optionLabel', type: 'input' },
        { label: '编码', value: 'id', type: 'number' },
        { label: '父表ID', value: 'parentId', type: 'number' },
        { label: 'SKu属性编码', value: 'propertyCode', type: 'input' },
        { label: '选项值', value: 'optionValue', type: 'input' },
        { label: '是否可用', value: 'usable', type: 'boolean' },
        { label: '创建时间', value: 'createTime', type: 'date', dateType: 'datetime' },
        { label: '创建人', value: 'createOwner', type: 'input' },
        { label: '修改时间', value: 'updateTime', type: 'date', dateType: 'datetime' },
        { label: '修改人', value: 'updateOwner', type: 'input' }

      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('productCategorySkuProperty.id'), value: 'id', type: 'input', readonly: true },
        { label: this.$t('productCategorySkuProperty.categoryCode'), value: 'categoryCode', type: 'input' },
        { label: this.$t('productCategorySkuProperty.name'), value: 'name', type: 'input' },
        { label: this.$t('productCategorySkuProperty.code'), value: 'code', type: 'input' },
        { label: this.$t('productCategorySkuProperty.propertyType'), value: 'propertyType', type: 'input' },
        { label: this.$t('productCategorySkuProperty.suffix'), value: 'suffix', type: 'input' },
        { label: this.$t('productCategorySkuProperty.orderNo'), value: 'orderNo', type: 'number' },
        { label: this.$t('productCategorySkuProperty.usable'), value: 'usable', type: 'boolean' },
        { label: this.$t('productCategorySkuProperty.necessaryFlag'), value: 'necessaryFlag', type: 'boolean' },
        { label: this.$t('productCategorySkuProperty.createTime'), value: 'createTime', type: 'input', readonly: true },
        { label: this.$t('productCategorySkuProperty.createOwner'), value: 'createOwner', type: 'input', readonly: true },
        { label: this.$t('productCategorySkuProperty.updateTime'), value: 'updateTime', type: 'input', readonly: true },
        { label: this.$t('productCategorySkuProperty.updateOwner'), value: 'updateOwner', type: 'input', readonly: true }]

      this.diaFormInfo.subTableInfo.fieldList = [
        { 'label': this.$t('table.id'), 'type': 'index', 'width': 50 },
        { 'prop': 'optionLabel', 'label': '选项名称', 'minWidth': 100, 'edit': { 'name': 'input' }},
        { 'prop': 'id', 'label': '编码', 'minWidth': 100 },
        { 'prop': 'parentId', 'label': '父表ID', 'minWidth': 100 },
        { 'prop': 'propertyCode', 'label': 'SKu属性编码', 'minWidth': 100, 'edit': { 'name': 'input' }},
        { 'prop': 'optionValue', 'label': '选项值', 'minWidth': 100, 'edit': { 'name': 'input' }},
        { 'prop': 'usable', 'label': '是否可用', 'minWidth': 100, 'edit': { 'name': 'boolean' }}
      ]

      this.diaFormInfo.subTableInfo.formList = [
        { label: '选项名称', value: 'optionLabel', type: 'input' },
        { label: '编码', value: 'id', type: 'input', readonly: true },
        { label: '父表ID', value: 'parentId', type: 'number' },
        { label: 'SKu属性编码', value: 'propertyCode', type: 'input' },
        { label: '选项值', value: 'optionValue', type: 'input' },
        { label: '是否可用', value: 'usable', type: 'boolean' },
        { label: '创建时间', value: 'createTime', type: 'input', readonly: true },
        { label: '创建人', value: 'createOwner', type: 'input', readonly: true },
        { label: '修改时间', value: 'updateTime', type: 'input', readonly: true },
        { label: '修改人', value: 'updateOwner', type: 'input', readonly: true }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        categoryCode: [{ 'required': true, message: this.$t('productCategorySkuProperty.msg.categoryCode'), trigger: 'blur' },
          { max: 32, message: this.$t('productCategorySkuProperty.msg.categoryCode') }
        ],
        name: [{ 'required': true, message: this.$t('productCategorySkuProperty.msg.name'), trigger: 'blur' },
          { max: 30, message: this.$t('productCategorySkuProperty.msg.name') }
        ],
        code: [{ 'required': true, message: this.$t('productCategorySkuProperty.msg.code'), trigger: 'blur' },
          { max: 32, message: this.$t('productCategorySkuProperty.msg.code') }
        ],
        propertyType: [{ 'required': true, message: this.$t('productCategorySkuProperty.msg.propertyType'), trigger: 'blur' },
          { max: 10, message: this.$t('productCategorySkuProperty.msg.propertyType') }
        ],
        suffix: [{ max: 10, message: this.$t('productCategorySkuProperty.msg.suffix') }],
        usable: [{ 'required': true, message: this.$t('productCategorySkuProperty.msg.usable'), trigger: 'blur' }
        ],
        necessaryFlag: [{ 'required': true, message: this.$t('productCategorySkuProperty.msg.necessaryFlag'), trigger: 'blur' }
        ],
        createTime: [{ 'required': true, message: this.$t('productCategorySkuProperty.msg.createTime'), trigger: 'blur' }
        ],
        createOwner: [{ 'required': true, message: this.$t('productCategorySkuProperty.msg.createOwner'), trigger: 'blur' },
          { max: 32, message: this.$t('productCategorySkuProperty.msg.createOwner') }
        ],
        updateOwner: [{ max: 32, message: this.$t('productCategorySkuProperty.msg.updateOwner') }]
      }

      this.diaFormInfo.subTableInfo.rules = {
        'optionLabel': [{
          'required': true,
          'message': '请输入选项名称',
          'trigger': 'blur'
        }, { 'max': 32, 'message': '最大长度32个字符' }
        ],
        'propertyCode': [{
          'required': true,
          'message': '请输入SKu属性编码',
          'trigger': 'blur'
        }, { 'max': 32, 'message': '最大长度32个字符' }
        ],
        'optionValue': [{
          'required': true,
          'message': '请输入选项值',
          'trigger': 'blur'
        }, { 'max': 100, 'message': '最大长度100个字符' }
        ],
        'usable': [{
          'required': true,
          'message': '请输入是否可用',
          'trigger': 'blur'
        }
        ],
        'createTime': [{
          'required': true,
          'message': '请输入创建时间',
          'trigger': 'blur'
        }
        ],
        'createOwner': [{
          'required': true,
          'message': '请输入创建人',
          'trigger': 'blur'
        }, { 'max': 32, 'message': '最大长度32个字符' }
        ],
        'updateOwner': [{ 'max': 32, 'message': '最大长度32个字符' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        'id': null,
        'categoryCode': null,
        'name': null,
        'code': null,
        'propertyType': null,
        'suffix': null,
        'orderNo': null,
        'usable': null,
        'necessaryFlag': null,
        'createTime': null,
        'createOwner': null,
        'updateTime': null,
        'updateOwner': null,
        'subRecords': []
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
