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
          ownerName: null,
          customerCode: null,
          customerName: null,
          authorizedPerson: null,
          contactDetails: null,
          isEnable: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px' // 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        isEnableList: [],
        ownerList: [],
        customList: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '200', // 默认操作按钮列宽度
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
        { label: this.$t('electronicAuthorization.authorizedPerson'), value: 'authorizedPerson', type: 'input' },
        { label: this.$t('electronicAuthorization.contactDetails'), value: 'contactDetails', type: 'input' },
        // { label: this.$t('electronicAuthorization.customerCode'), value: 'customerCode', type: 'input' },
        // { label: this.$t('electronicAuthorization.customerName'), value: 'customerName', type: 'input' },
        // { label: this.$t('electronicAuthorization.ownerName'), value: 'ownerName', type: 'input' },
        { label: this.$t('electronicAuthorization.customerName'), value: 'customerCode', link: 'customerName', type: 'selectLink', list: 'customList' },
        { label: this.$t('electronicAuthorization.ownerName'), value: 'ownerCode', link: 'ownerName', type: 'selectLink', list: 'ownerList' },
        { label: this.$t('electronicAuthorization.isEnable'), value: 'isEnable', type: 'select', list: 'isEnableList' },
        { label: '', value: 'sys', type: 'slot' }// 查询 重置 展开收起表单
      ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'authorizedPerson', label: this.$t('electronicAuthorization.authorizedPerson'), minWidth: 100 },
        { prop: 'contactDetails', label: this.$t('electronicAuthorization.contactDetails'), minWidth: 100 },
        { prop: 'startDate', label: this.$t('electronicAuthorization.startDate'), minWidth: 100 },
        { prop: 'endDate', label: this.$t('electronicAuthorization.endDate'), minWidth: 100 },
        { prop: 'validDate', label: '有效天数', minWidth: 100 },
        { prop: 'customerCode', label: this.$t('electronicAuthorization.customerCode'), minWidth: 100 },
        // { prop: 'ownerCode', label: this.$t('electronicAuthorization.ownerCode'), minWidth: 100 },
        { prop: 'customerName', label: this.$t('electronicAuthorization.customerName'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('electronicAuthorization.ownerName'), minWidth: 100 },
        { prop: 'remark', label: this.$t('electronicAuthorization.remark'), minWidth: 100 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('electronicAuthorization.authorizedPerson'), value: 'authorizedPerson', type: 'input', disabled: true, readonly: true },
        { label: this.$t('electronicAuthorization.contactDetails'), value: 'contactDetails', type: 'input', disabled: true, readonly: true },
        { label: this.$t('electronicAuthorization.startDate'), value: 'startDate', type: 'date', disabled: true, readonly: true },
        { label: this.$t('electronicAuthorization.endDate'), value: 'endDate', type: 'date', disabled: true, readonly: true },
        { label: this.$t('electronicAuthorization.customerName'), value: 'customerName', type: 'input', disabled: true, readonly: true },
        { label: this.$t('electronicAuthorization.ownerName'), value: 'ownerName', type: 'input', disabled: true, readonly: true },
        { label: this.$t('electronicAuthorization.isEnable'), value: 'isEnable', type: 'select', list: 'isEnableList', disabled: true, readonly: true },
        { label: this.$t('electronicAuthorization.remark'), value: 'remark', type: 'input', disabled: true, readonly: true }
        // { label: this.$t('electronicAuthorization.authorizationLetter'), value: 'authorizationLetter', type: 'input', disabled: true, readonly: true }

      ]
      this.$nextTick(() => {
        this.disabled = true
      })
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('electronicAuthorization.authorizedPerson'), value: 'authorizedPerson', type: 'input' },
        { label: this.$t('electronicAuthorization.contactDetails'), value: 'contactDetails', type: 'input' },
        { label: this.$t('electronicAuthorization.startDate'), value: 'startDate', type: 'date', dateType: 'date' },
        { label: this.$t('electronicAuthorization.endDate'), value: 'endDate', type: 'date', dateType: 'date' },
        { label: this.$t('electronicAuthorization.customerName'), value: 'customerCode', link: 'customerName', type: 'selectLink', list: 'customList' },
        // { label: this.$t('electronicAuthorization.ownerName'), value: 'ownerName', type: 'input' },
        { label: this.$t('electronicAuthorization.ownerName'), value: 'ownerCode', link: 'ownerName', type: 'selectLink', list: 'ownerList' },
        { label: this.$t('electronicAuthorization.isEnable'), value: 'isEnable', type: 'select', list: 'isEnableList' },
        { label: this.$t('electronicAuthorization.remark'), value: 'remark', type: 'input' }
        // { label: this.$t('electronicAuthorization.authorizationLetter'), value: 'authorizationLetter', type: 'input' }

      ]
      this.disabled = false
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('electronicAuthorization.authorizedPerson'), value: 'authorizedPerson', type: 'input', disabled: true },
        { label: this.$t('electronicAuthorization.contactDetails'), value: 'contactDetails', type: 'input' },
        { label: this.$t('electronicAuthorization.startDate'), value: 'startDate', type: 'date', dateType: 'date' },
        { label: this.$t('electronicAuthorization.endDate'), value: 'endDate', type: 'date', dateType: 'date' },
        { label: this.$t('electronicAuthorization.customerName'), value: 'customerName', type: 'input', disabled: true },
        // { label: this.$t('electronicAuthorization.ownerName'), value: 'ownerName', type: 'input', },
        { label: this.$t('electronicAuthorization.ownerName'), value: 'ownerCode', type: 'select', list: 'ownerList', disabled: true },
        { label: this.$t('electronicAuthorization.isEnable'), value: 'isEnable', type: 'select', list: 'isEnableList' },
        { label: this.$t('electronicAuthorization.remark'), value: 'remark', type: 'input' }
        // { label: this.$t('electronicAuthorization.authorizationLetter'), value: 'authorizationLetter', type: 'input' }
      ]
      this.disabled = false
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        endDate: [{ required: true, message: this.$t('electronicAuthorization.msg.endDate'), trigger: 'blur' }],
        // authorizationLetter: [{ required: true, message: this.$t('electronicAuthorization.msg.authorizationLetter'), trigger: 'blur' }],
        isEnable: [{ required: true, message: this.$t('electronicAuthorization.msg.isEnable'), trigger: 'blur' }],
        authorizedPerson: [{ required: true, message: this.$t('electronicAuthorization.msg.authorizedPerson'), trigger: 'blur' }],
        contactDetails: [{ required: true, message: this.$t('electronicAuthorization.msg.contactDetails'), trigger: 'blur' }],
        startDate: [{ required: true, message: this.$t('electronicAuthorization.msg.startDate'), trigger: 'blur' }],
        customerName: [{ required: true, message: this.$t('electronicAuthorization.customerName'), trigger: 'blur' }],
        customerCode: [{ required: true, message: this.$t('electronicAuthorization.customerName'), trigger: 'blur' }],
        ownerName: [{ required: true, message: this.$t('electronicAuthorization.ownerName'), trigger: 'blur' }],
        ownerCode: [{ required: true, message: this.$t('electronicAuthorization.ownerName'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        endDate: null,
        ownerCode: null,
        ownerName: null,
        authorizationLetter: null,
        isEnable: null,
        authorizedPerson: null,
        contactDetails: null,
        remark: null,
        customerName: null,
        customerCode: null,
        startDate: null
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
