import risize from '@/layout/Home/mixin/RisizeTable'
import notification from './notification'
export default {
  mixins: [risize, notification],
  data() {
    return {
      // 主页面的top表单
      topForm: {
        ref: null, // 对外提供的可操作表单的持有对象
        fieldList: null, // 配置的表单字段集合
        data: { // 表单绑定的数据Model
          companyCode: null,
          origCode: null,
          origSys: null,
          isEnable: null,
          ownerCode: null,
          ownerName: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px' // 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        origSysList: [
          { key: '恒大SAP', value: '恒大SAP' },
          { key: '恒大NC', value: '恒大NC' },
          { key: '恒大订单中心', value: '恒大订单中心' }

        ]

      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '260', // 默认操作按钮列宽度
          btList: [
            { slot: true, icon: '', event: 'slotEvent' }
          ]
        }
      },
      // 弹窗表单
      diaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}// 配置的表单字段校验规则集合
      },
      // 嵌套 弹窗表单
      nestDiaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}// 配置的表单字段校验规则集合
      },
      // 列表信息
      popTableInfo: {
        fieldList: null, // 表格列集合
        handle: null,
        data: [{ value2: '1' }]
      },
      nestingDialogInfo: {
        title: '',
        visible: false,
        type: '',
        width: '120mm',
        // 返回按钮
        closeBtn: { label: '', type: '', icon: '', event: 'nestClose', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'nestClose', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'nestSave', btLoading: false, show: true }]
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
        { label: '经销商编码', value: 'companyCode', type: 'input' },
        { label: '经销商名称', value: 'companyCode', type: 'input' },
        { label: this.$t('distributor.origSys'), value: 'origSys', type: 'input' },
        { label: '来源编码', value: 'origCode', type: 'input' },
        { label: '所属公司', value: 'ownerName', type: 'input' },
        { label: this.$t('distributor.isEnable'), value: 'isEnable', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }// 查询 重置 展开收起表单
      ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'companyCode', label: '经销商编码', minWidth: 100 },
        { prop: 'companyCode', label: '经销商名称', minWidth: 100 },
        { prop: 'origSys', label: this.$t('distributor.origSys'), minWidth: 100 },
        { prop: 'contactName', label: this.$t('distributor.contactName'), minWidth: 100 },
        { prop: 'contactAddr', label: this.$t('distributor.contactAddr'), minWidth: 100 },
        { prop: 'provinceId', label: this.$t('distributor.provinceId'), minWidth: 100 },
        { prop: 'cityId', label: this.$t('distributor.cityId'), minWidth: 100 },
        { prop: 'areaId', label: this.$t('distributor.areaId'), minWidth: 100 },
        { prop: 'ownerCode', label: this.$t('distributor.ownerCode'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('distributor.ownerName'), minWidth: 100 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.diaFormInfo.fieldList = [
        { label: '经销商编码', value: 'companyCode', type: 'input', readonly: true, disabled: true },
        { label: '经销商名称', value: 'companyName', type: 'input', readonly: true, disabled: true },
        { label: this.$t('distributor.origSys'), value: 'origSys', type: 'select', list: 'origSysList', readonly: true, disabled: true },
        { label: this.$t('distributor.origCode'), value: 'origCode', type: 'input', readonly: true, disabled: true },
        { label: '所属公司', value: 'company', type: 'select', list: 'origSysList', readonly: true, disabled: true },
        { label: this.$t('distributor.country'), value: 'country', type: 'select', list: 'origSysList', readonly: true, disabled: true },
        { label: this.$t('distributor.provinceId'), value: 'provinceId', type: 'select', list: 'origSysList', readonly: true, disabled: true },
        { label: this.$t('distributor.cityId'), value: 'cityId', type: 'select', list: 'origSysList', readonly: true, disabled: true },
        { label: this.$t('distributor.areaId'), value: 'areaId', type: 'select', list: 'origSysList', readonly: true, disabled: true },
        { label: this.$t('distributor.contactAddr'), value: 'contactAddr', type: 'input', readonly: true, disabled: true },
        { label: this.$t('distributor.contactName'), value: 'contactName', type: 'input', readonly: true, disabled: true },
        { label: this.$t('distributor.contactTel'), value: 'contactTel', type: 'input', readonly: true, disabled: true },
        { label: this.$t('distributor.contactPhone'), value: 'contactPhone', type: 'input', readonly: true, disabled: true },
        { label: this.$t('distributor.contactFax'), value: 'contactFax', type: 'input', readonly: true, disabled: true },
        { label: this.$t('distributor.contactMailbox'), value: 'contactMailbox', type: 'input', readonly: true, disabled: true },
        { label: this.$t('distributor.shortName'), value: 'shortName', type: 'input', readonly: true, disabled: true },
        { label: this.$t('distributor.mnemonicCode'), value: 'mnemonicCode', type: 'input' },
        { label: this.$t('distributor.orderCycle'), value: 'orderCycle', type: 'select', list: 'origSysList', readonly: true, disabled: true },
        { label: this.$t('distributor.companyRegistTime'), value: 'companyRegistTime', type: 'date', readonly: true, disabled: true },
        { label: this.$t('distributor.taxType'), value: 'taxType', type: 'select', list: 'origSysList', readonly: true, disabled: true },
        { label: this.$t('distributor.taxIdNum'), value: 'taxIdNum', type: 'input', readonly: true, disabled: true },
        { label: this.$t('distributor.bankName'), value: 'bankName', type: 'input', readonly: true, disabled: true },
        { label: this.$t('distributor.bankAccount'), value: 'bankAccount', type: 'input', readonly: true, disabled: true },
        { label: this.$t('distributor.creditLimit'), value: 'creditLimit', type: 'input', readonly: true, disabled: true },
        { label: this.$t('distributor.invoiceType'), value: 'invoiceType', type: 'select', list: 'origSysList', readonly: true, disabled: true },
        { label: this.$t('distributor.invoiceTitle'), value: 'invoiceTitle', type: 'input', readonly: true, disabled: true },
        { label: this.$t('distributor.paymentPeriod'), value: 'paymentPeriod', type: 'select', list: 'origSysList', readonly: true, disabled: true },
        { label: this.$t('distributor.paymentMethod'), value: 'paymentMethod', type: 'select', list: 'origSysList', readonly: true, disabled: true },
        { label: this.$t('distributor.isEnable'), value: 'isEnable', type: 'select', list: 'origSysList', readonly: true, disabled: true },
        { label: this.$t('distributor.remark'), value: 'remark', type: 'input', readonly: true, disabled: true }
      ]

      this.popTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'value2', label: '作业顺序', minWidth: 100 },
        { prop: 'value1', label: '作业类型', minWidth: 100 },
        { prop: 'value3', label: '起始地', minWidth: 100 },
        { prop: 'value4', label: '目的地', minWidth: 100 },
        { prop: 'value5', label: '分段运输方式', minWidth: 100 }

      ]
      this.popTableInfo.handle = null
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.diaFormInfo.fieldList = [
        { label: '经销商编码', value: 'companyCode', type: 'input' },
        { label: '经销商名称', value: 'companyName', type: 'input' },
        { label: this.$t('distributor.origSys'), value: 'origSys', type: 'select', list: 'origSysList' },
        { label: this.$t('distributor.origCode'), value: 'origCode', type: 'input' },
        { label: '所属公司', value: 'company', type: 'select', list: 'origSysList' },
        { label: this.$t('distributor.country'), value: 'country', type: 'select', list: 'origSysList' },
        { label: this.$t('distributor.provinceId'), value: 'provinceId', type: 'select', list: 'origSysList' },
        { label: this.$t('distributor.cityId'), value: 'cityId', type: 'select', list: 'origSysList' },
        { label: this.$t('distributor.areaId'), value: 'areaId', type: 'select', list: 'origSysList' },
        { label: this.$t('distributor.contactAddr'), value: 'contactAddr', type: 'input' },
        { label: this.$t('distributor.contactName'), value: 'contactName', type: 'input' },
        { label: this.$t('distributor.contactTel'), value: 'contactTel', type: 'input' },
        { label: this.$t('distributor.contactPhone'), value: 'contactPhone', type: 'input' },
        { label: this.$t('distributor.contactFax'), value: 'contactFax', type: 'input' },
        { label: this.$t('distributor.contactMailbox'), value: 'contactMailbox', type: 'input' },
        { label: this.$t('distributor.shortName'), value: 'shortName', type: 'input' },
        { label: this.$t('distributor.mnemonicCode'), value: 'mnemonicCode', type: 'input' },
        { label: this.$t('distributor.orderCycle'), value: 'orderCycle', type: 'select', list: 'origSysList' },
        { label: this.$t('distributor.companyRegistTime'), value: 'companyRegistTime', type: 'date' },
        { label: this.$t('distributor.taxType'), value: 'taxType', type: 'select', list: 'origSysList' },
        { label: this.$t('distributor.taxIdNum'), value: 'taxIdNum', type: 'input' },
        { label: this.$t('distributor.bankName'), value: 'bankName', type: 'input' },
        { label: this.$t('distributor.bankAccount'), value: 'bankAccount', type: 'input' },
        { label: this.$t('distributor.creditLimit'), value: 'creditLimit', type: 'input' },
        { label: this.$t('distributor.invoiceType'), value: 'invoiceType', type: 'select', list: 'origSysList' },
        { label: this.$t('distributor.invoiceTitle'), value: 'invoiceTitle', type: 'input' },
        { label: this.$t('distributor.paymentPeriod'), value: 'paymentPeriod', type: 'select', list: 'origSysList' },
        { label: this.$t('distributor.paymentMethod'), value: 'paymentMethod', type: 'select', list: 'origSysList' },
        { label: this.$t('distributor.isEnable'), value: 'isEnable', type: 'select', list: 'origSysList' },
        { label: this.$t('distributor.remark'), value: 'remark', type: 'input' }
      ]
      this.popTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'value1', label: '省份', minWidth: 130 },
        { prop: 'value2', label: '城市', minWidth: 130 },
        { prop: 'value3', label: '区县', minWidth: 130 }

      ]
      this.popTableInfo.handle = { // 表格自定义按钮
        fixed: 'right',
        label: this.$t('table.actions'), // 操作列名
        width: '90', // 默认操作按钮列宽度
        btList: [// 添加操作按钮
          // { label: '编辑', type: 'success', icon: '', event: 'editItem', show: true, disabled: false },
          { label: '删除', type: 'danger', icon: '', event: 'deleteItem', show: true, disabled: false } // event值为notification.js中定义的方法名
        ]
      }
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.diaFormInfo.fieldList = [
        { label: '经销商编码', value: 'companyCode', type: 'input', disabled: true },
        { label: '经销商名称', value: 'companyName', type: 'input', disabled: true },
        { label: this.$t('distributor.origSys'), value: 'origSys', type: 'select', list: 'origSysList', disabled: true },
        { label: this.$t('distributor.origCode'), value: 'origCode', type: 'input', disabled: true },
        { label: '所属公司', value: 'company', type: 'select', list: 'origSysList', disabled: true },
        { label: this.$t('distributor.country'), value: 'country', type: 'select', list: 'origSysList' },
        { label: this.$t('distributor.provinceId'), value: 'provinceId', type: 'select', list: 'origSysList' },
        { label: this.$t('distributor.cityId'), value: 'cityId', type: 'select', list: 'origSysList' },
        { label: this.$t('distributor.areaId'), value: 'areaId', type: 'select', list: 'origSysList' },
        { label: this.$t('distributor.contactAddr'), value: 'contactAddr', type: 'input' },
        { label: this.$t('distributor.contactName'), value: 'contactName', type: 'input' },
        { label: this.$t('distributor.contactTel'), value: 'contactTel', type: 'input' },
        { label: this.$t('distributor.contactPhone'), value: 'contactPhone', type: 'input' },
        { label: this.$t('distributor.contactFax'), value: 'contactFax', type: 'input' },
        { label: this.$t('distributor.contactMailbox'), value: 'contactMailbox', type: 'input' },
        { label: this.$t('distributor.shortName'), value: 'shortName', type: 'input' },
        { label: this.$t('distributor.mnemonicCode'), value: 'mnemonicCode', type: 'input' },
        { label: this.$t('distributor.orderCycle'), value: 'orderCycle', type: 'select', list: 'origSysList' },
        { label: this.$t('distributor.companyRegistTime'), value: 'companyRegistTime', type: 'date' },
        { label: this.$t('distributor.taxType'), value: 'taxType', type: 'select', list: 'origSysList' },
        { label: this.$t('distributor.taxIdNum'), value: 'taxIdNum', type: 'input' },
        { label: this.$t('distributor.bankName'), value: 'bankName', type: 'input' },
        { label: this.$t('distributor.bankAccount'), value: 'bankAccount', type: 'input' },
        { label: this.$t('distributor.creditLimit'), value: 'creditLimit', type: 'input' },
        { label: this.$t('distributor.invoiceType'), value: 'invoiceType', type: 'select', list: 'origSysList' },
        { label: this.$t('distributor.invoiceTitle'), value: 'invoiceTitle', type: 'input' },
        { label: this.$t('distributor.paymentPeriod'), value: 'paymentPeriod', type: 'select', list: 'origSysList' },
        { label: this.$t('distributor.paymentMethod'), value: 'paymentMethod', type: 'select', list: 'origSysList' },
        { label: this.$t('distributor.isEnable'), value: 'isEnable', type: 'select', list: 'origSysList' },
        { label: this.$t('distributor.remark'), value: 'remark', type: 'input' }
      ]
      this.popTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'value1', label: '省份', minWidth: 130 },
        { prop: 'value2', label: '城市', minWidth: 130 },
        { prop: 'value3', label: '区县', minWidth: 130 }
      ]
      this.popTableInfo.handle = { // 表格自定义按钮
        fixed: 'right',
        label: this.$t('table.actions'), // 操作列名
        width: '90', // 默认操作按钮列宽度
        btList: [// 添加操作按钮
          // { label: '编辑', type: 'success', icon: '', event: 'editItem', show: true, disabled: false },
          { label: '删除', type: 'danger', icon: '', event: 'deleteItem', show: true, disabled: false } // event值为notification.js中定义的方法名
        ]
      }
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        companyCode: [{ required: true, message: this.$t('distributor.msg.companyCode'), trigger: 'blur' }],
        companyName: [{ required: true, message: '请输入经销商名称', trigger: 'blur' }],
        company: [{ required: true, message: '请选择公司', trigger: 'change' }],
        country: [{ required: true, message: this.$t('distributor.msg.country'), trigger: 'change' }],
        provinceId: [{ required: true, message: '请选择省份', trigger: 'change' }],
        cityId: [{ required: true, message: '请选择城市', trigger: 'change' }],
        areaId: [{ required: true, message: '请选择区县', trigger: 'change' }],
        contactAddr: [{ required: true, message: '请输入联系地址', trigger: 'blur' }],
        contactName: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
        contactTel: [{ required: true, message: '请输入联系电话', trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        country: null,
        contactPhone: null,
        isEnable: null,
        invoiceTitle: null,
        contactTel: null,
        ownerCode: null,
        contactFax: null,
        remark: null,
        orderCycle: null,
        areaId: null,
        contactAddr: null,
        paymentPeriod: null,
        bankName: null,
        creditLimit: null,
        mnemonicCode: null,
        companyCode: null,
        invoiceType: null,
        customerCode: null,
        paymentMethod: null,
        bankAccount: null,
        origSys: null,
        contactName: null,
        ownerName: null,
        origCode: null,
        companyRegistTime: null,
        contactMailbox: null,
        taxType: null,
        provinceId: null,
        shortName: null,
        taxIdNum: null,
        customerName: null,
        cityId: null
      }
    },
    nestFormInfoAddFieldList() {
      this.nestDiaFormInfo.fieldList = [
        { label: '省份', value: 'value1', type: 'select', list: 'workTypeList' },
        { label: '城市', value: 'value2', type: 'select', list: 'workTypeList' },
        { label: '区县', value: 'value3', type: 'select', list: 'workTypeList' }

      ]
      this.nestDiaFormInfo.rules = {
        // value1: [{ required: true, message: '例子：必填', trigger: 'blur' }],
        // value2: [{ required: true, message: '例子：必填', trigger: 'blur' }],
        // value3: [{ required: true, message: '例子：必填', trigger: 'blur' }],
        // value4: [{ required: true, message: '例子：必填', trigger: 'blur' }],
        // value5: [{ required: true, message: '例子：必填', trigger: 'blur' }]

      }
    },
    nestFormInfoEditFieldList() {
      this.nestDiaFormInfo.fieldList = [
        { label: '省份', value: 'value1', type: 'select', list: 'workTypeList' },
        { label: '城市', value: 'value2', type: 'select', list: 'workTypeList' },
        { label: '区县', value: 'value3', type: 'select', list: 'workTypeList' }
      ]
      this.nestDiaFormInfo.rules = {}
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
