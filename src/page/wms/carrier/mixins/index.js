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
          carrierCode: null,
          carrierNickname: null,
          isEnable: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        enableList: [],
        whTypeList: [],
        countryList: [],
        provinceList: [],
        cityList: [],
        areaList: []
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
        provinceEx: null,
        cityEx: null,
        areaEx: null
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
        { label: this.$t('carrier.carrierCode'), value: 'carrierCode', type: 'input' },
        { label: this.$t('carrier.carrierNickname'), value: 'carrierNickname', type: 'input' },
        { label: this.$t('carrier.isEnable'), value: 'isEnable', type: 'select', list: 'enableList' },
        { label: '', value: 'sys', type: 'slot' }
      ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'carrierCode', label: this.$t('carrier.carrierCode'), minWidth: 100 },
        { prop: 'carrierName', label: this.$t('carrier.carrierName'), minWidth: 130 },
        { prop: 'carrierNickname', label: this.$t('carrier.carrierNickname'), minWidth: 100 },
        { prop: 'address', label: this.$t('carrier.address'), minWidth: 140 },
        { prop: 'contactName', label: this.$t('carrier.contactName'), minWidth: 110 },
        { prop: 'contactTel', label: this.$t('carrier.contactTel'), minWidth: 110 },
        { prop: 'contactPhone', label: this.$t('carrier.contactPhone'), minWidth: 110 },
        { prop: 'remark', label: this.$t('carrier.remark'), minWidth: 100 },
        { prop: 'isEnableName', label: this.$t('carrier.isEnable'), minWidth: 100 },
        { label: '操作', value: 'status', width: 200, type: 'slot', fixed: 'right' } // value: 'status' 对应页面上 自定义插槽的名字v-slot:col-status
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('carrier.carrierCode'), value: 'carrierCode', type: 'input', disabled: true },
        { label: this.$t('carrier.carrierName'), value: 'carrierName', type: 'input', disabled: true },
        { label: this.$t('carrier.carrierNickname'), value: 'carrierNickname', type: 'input', disabled: true },
        { label: this.$t('carrier.address'), value: 'address', type: 'input', disabled: true },
        { label: this.$t('carrier.contactName'), value: 'contactName', type: 'input', disabled: true },
        { label: this.$t('carrier.contactTel'), value: 'contactTel', type: 'input', disabled: true },
        { label: this.$t('carrier.contactPhone'), value: 'contactPhone', type: 'input', disabled: true },
        { label: this.$t('carrier.contactFax'), value: 'contactFax', type: 'input', disabled: true },
        { label: this.$t('carrier.contactMailbox'), value: 'contactMailbox', type: 'input', disabled: true },
        { label: this.$t('carrier.postcode'), value: 'postcode', type: 'input', disabled: true },
        { label: this.$t('carrier.taxpayerNum'), value: 'taxpayerNum', type: 'input', disabled: true },
        { label: this.$t('carrier.openAccountBank'), value: 'openAccountBank', type: 'input', disabled: true },
        { label: this.$t('carrier.bankAccount'), value: 'bankAccount', type: 'input', disabled: true },
        { label: this.$t('carrier.remark'), value: 'remark', type: 'textarea', disabled: true },
        { label: this.$t('carrier.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', disabled: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.data = {
        isEnable: this.listTypeInfo.enableList.length == 0 ? null : this.listTypeInfo.enableList[1].value
      }

      this.diaFormInfo.fieldList = [
        { label: this.$t('carrier.carrierCode'), value: 'carrierCode', type: 'input' },
        { label: this.$t('carrier.carrierName'), value: 'carrierName', type: 'input' },
        { label: this.$t('carrier.carrierNickname'), value: 'carrierNickname', type: 'input' },
        { label: this.$t('carrier.address'), value: 'address', type: 'input' },
        { label: this.$t('carrier.contactName'), value: 'contactName', type: 'input' },
        { label: this.$t('carrier.contactTel'), value: 'contactTel', type: 'input' },
        { label: this.$t('carrier.contactPhone'), value: 'contactPhone', type: 'input' },
        { label: this.$t('carrier.contactFax'), value: 'contactFax', type: 'input' },
        { label: this.$t('carrier.contactMailbox'), value: 'contactMailbox', type: 'input' },
        { label: this.$t('carrier.postcode'), value: 'postcode', type: 'input' },
        { label: this.$t('carrier.taxpayerNum'), value: 'taxpayerNum', type: 'input' },
        { label: this.$t('carrier.openAccountBank'), value: 'openAccountBank', type: 'input' },
        { label: this.$t('carrier.bankAccount'), value: 'bankAccount', type: 'input' },
        { label: this.$t('carrier.remark'), value: 'remark', type: 'textarea' },
        { label: this.$t('carrier.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', clearable: false }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('carrier.carrierCode'), value: 'carrierCode', type: 'input', disabled: true },
        { label: this.$t('carrier.carrierName'), value: 'carrierName', type: 'input' },
        { label: this.$t('carrier.carrierNickname'), value: 'carrierNickname', type: 'input' },
        { label: this.$t('carrier.address'), value: 'address', type: 'input' },
        { label: this.$t('carrier.contactName'), value: 'contactName', type: 'input' },
        { label: this.$t('carrier.contactTel'), value: 'contactTel', type: 'input' },
        { label: this.$t('carrier.contactPhone'), value: 'contactPhone', type: 'input' },
        { label: this.$t('carrier.contactFax'), value: 'contactFax', type: 'input' },
        { label: this.$t('carrier.contactMailbox'), value: 'contactMailbox', type: 'input' },
        { label: this.$t('carrier.postcode'), value: 'postcode', type: 'input' },
        { label: this.$t('carrier.taxpayerNum'), value: 'taxpayerNum', type: 'input' },
        { label: this.$t('carrier.openAccountBank'), value: 'openAccountBank', type: 'input' },
        { label: this.$t('carrier.bankAccount'), value: 'bankAccount', type: 'input' },
        { label: this.$t('carrier.remark'), value: 'remark', type: 'textarea' },
        { label: this.$t('carrier.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', clearable: false }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        carrierCode: [{ required: true, message: this.$t('carrier.msg.carrierCode'), trigger: 'blur' }],
        carrierName: [{ required: true, message: this.$t('carrier.msg.carrierName'), trigger: 'blur' }],
        carrierNickname: [{ required: true, message: this.$t('carrier.msg.carrierNickname'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        contactName: null,
        contactPhone: null,
        isEnable: null,
        postcode: null,
        contactTel: null,
        contactFax: null,
        remark: null,
        contactMailbox: null,
        carrierName: null,
        carrierNickname: null,
        address: null,
        id: null,
        carrierCode: null,
        taxpayerNum: null,
        openAccountBank: null,
        bankAccount: null
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
