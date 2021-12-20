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
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}// 配置的表单字段校验规则集合
      }
    }
  },
  mounted() {
    this.initTopFormColumns()
    // this.rulesInit();//初始化diaFormInfo表单字段校验规则
  },
  methods: {
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化top表单
      this.topForm.fieldList = [
        // { label: this.$t('目录'), value: "category", type: "input" },
        // { label: this.$t('SKU编码'), value: "sku_code", type: "input" },
        { label: this.$t('产品编码'), value: 'spu_code', type: 'input' },
        { type: 'button', label: '', btnlabel: this.$t('table.search'), btType: 'primary', icon: 'el-icon-search', event: 'search', show: true, disabled: this.hasPerm('search') }
      ]
      // 初始化列表
      const fieldList = [{ label: this.$t('table.id'), type: 'index', width: 50 }]
      this.skuProperty.forEach(item => {
        const obj = { 'minWidth': 100, formatter: this.showTableString }
        obj.label = item.name
        obj.prop = item.code
        fieldList.push(obj)
      })
      this.tableInfo.fieldList = fieldList
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      const fieldList = []
      this.skuProperty.forEach(item => {
        const obj = {}
        obj.label = item.name
        obj.value = item.code
        obj.type = item.propertyType
        obj.readonly = true
        fieldList.push(obj)
      })
      this.diaFormInfo.fieldList = fieldList
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      const fieldList = []
      const _this = this
      this.skuProperty.forEach(item => {
        const obj = {}
        obj.label = item.name
        obj.value = item.code
        obj.type = item.propertyType
        if (obj.type === 'select') {
          const str = item.name + 'List'
          obj.list = str
          const list = []
          item.subRecords.forEach(value => {
            const element = {}
            element.key = value.optionLabel
            element.value = value.optionValue
            list.push(element)
          })
          _this.listTypeInfo[str] = list
        }
        fieldList.push(obj)
      })
      this.diaFormInfo.fieldList = fieldList
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      const fieldList = []
      const _this = this
      this.skuProperty.forEach(item => {
        const obj = {}
        obj.label = item.name
        obj.value = item.code
        obj.type = item.propertyType
        if (obj.type === 'select') {
          const str = item.name + 'List'
          obj.list = str
          const list = []
          item.subRecords.forEach(value => {
            const element = {}
            element.key = value.optionLabel
            element.value = value.optionValue
            list.push(element)
          })
          _this.listTypeInfo[str] = list
        }
        fieldList.push(obj)
      })
      this.diaFormInfo.fieldList = fieldList
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        code: [{ 'required': true, message: this.$t('sku.msg.code'), trigger: 'blur' },
          { max: 32, message: this.$t('sku.msg.code') }
        ],
        ownerCode: [{ 'required': true, message: this.$t('sku.msg.ownerCode'), trigger: 'blur' },
          { max: 32, message: this.$t('sku.msg.ownerCode') }
        ],
        customerSpu: [{ max: 32, message: this.$t('sku.msg.customerSpu') }],
        name: [{ 'required': true, message: this.$t('sku.msg.name'), trigger: 'blur' },
          { max: 100, message: this.$t('sku.msg.name') }
        ],
        barcode: [{ max: 50, message: this.$t('sku.msg.barcode') }],
        categoryCode: [{ max: 32, message: this.$t('sku.msg.categoryCode') }],
        storageTemp: [{ 'required': true, message: this.$t('sku.msg.storageTemp'), trigger: 'blur' },
          { max: 10, message: this.$t('sku.msg.storageTemp') }
        ]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        'id': null,
        'code': null,
        'ownerCode': null,
        'customerSpu': null,
        'name': null,
        'barcode': null,
        'categoryCode': null,
        'pLength': null,
        'pWidth': null,
        'pHeight': null,
        'pWeidht': null,
        'storageTemp': null,
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
