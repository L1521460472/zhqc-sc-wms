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
          platformType: null,
          carrierId: null,
          carrierCode: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        epsPlatformTypeList: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '150', // 默认操作按钮列宽度
          btList: [// 添加操作按钮
            // 默认查看按钮
            { label: this.$t('table.view'), type: 'primary', icon: '', event: 'openViewPage', show: true, disabled: this.$hasPerm('view') }, // event值为notification.js中定义的方法名
            // 默认修改按钮
            { label: this.$t('table.edit'), type: 'success', icon: '', event: 'openEditPage', show: true, disabled: this.$hasPerm('edit') }// event值为notification.js中定义的方法名
          ]
        }
      },
      // 弹窗表单
      diaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        labelWidth: '150px'
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
        { label: this.$t('expressProviderDetail.platformType'), value: 'platformType', type: 'select', list: 'epsPlatformTypeList' },
        /*
        {label: this.$t('expressProviderDetail.carrierCode'), value: "carrierId", type: "slot"},
*/
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
        { prop: 'platformTypeName', label: this.$t('expressProviderDetail.platformType'), minWidth: 100 },
        { prop: 'platformLpCode', label: this.$t('expressProviderDetail.platformEpsCode'), minWidth: 120 },
        { prop: 'allocatedQuantity', label: this.$t('expressProviderDetail.allocatedQuantity'), minWidth: 120 },
        { prop: 'printQuantity', label: this.$t('expressProviderDetail.printQuantity'), minWidth: 120 },
        { prop: 'cancelQuantity', label: this.$t('expressProviderDetail.cancelQuantity'), minWidth: 120 },
        { prop: 'quantity', label: this.$t('expressProviderDetail.quantity'), minWidth: 120 },
        { prop: 'branchCode', label: this.$t('expressProviderDetail.branchCode'), minWidth: 100 },
        { prop: 'branchName', label: this.$t('expressProviderDetail.branchName'), minWidth: 100 },
        { prop: 'province', label: this.$t('expressProviderDetail.province'), minWidth: 100 },
        { prop: 'city', label: this.$t('expressProviderDetail.city'), minWidth: 100 },
        { prop: 'district', label: this.$t('expressProviderDetail.district'), minWidth: 100 },
        { prop: 'detailAddress', label: this.$t('expressProviderDetail.detailAddress'), minWidth: 100 },
        { prop: 'updater', label: this.$t('expressProviderDetail.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('expressProviderDetail.updateTime'), minWidth: 100 },
        { prop: 'remark', label: this.$t('expressProviderDetail.remark'), minWidth: 100 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('expressProviderDetail.platformType'), value: 'platformTypeName', type: 'input', readonly: true },
        { label: this.$t('expressProviderDetail.platformEpsCode'), value: 'platformLpCode', type: 'input', readonly: true },
        { label: this.$t('expressProviderDetail.allocatedQuantity'), value: 'allocatedQuantity', type: 'input', readonly: true },
        { label: this.$t('expressProviderDetail.printQuantity'), value: 'printQuantity', type: 'input', readonly: true },
        { label: this.$t('expressProviderDetail.cancelQuantity'), value: 'cancelQuantity', type: 'input', readonly: true },
        { label: this.$t('expressProviderDetail.quantity'), value: 'quantity', type: 'input', readonly: true },
        { label: this.$t('expressProviderDetail.branchCode'), value: 'branchCode', type: 'input', readonly: true },
        { label: this.$t('expressProviderDetail.branchName'), value: 'branchName', type: 'input', readonly: true },
        { label: this.$t('expressProviderDetail.province'), value: 'province', type: 'input', readonly: true },
        { label: this.$t('expressProviderDetail.city'), value: 'city', type: 'input', readonly: true },
        { label: this.$t('expressProviderDetail.district'), value: 'district', type: 'input', readonly: true },
        { label: this.$t('expressProviderDetail.detailAddress'), value: 'detailAddress', type: 'input', readonly: true },
        { label: this.$t('expressProviderDetail.updater'), value: 'updater', type: 'input', readonly: true },
        { label: this.$t('expressProviderDetail.updateTime'), value: 'updateTime', type: 'input', readonly: true },
        { label: this.$t('expressProviderDetail.remark'), value: 'remark', type: 'textarea', disabled: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.diaFormInfo.fieldList = [
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('expressProviderDetail.platformType'), value: 'platformTypeName', type: 'input', readonly: true },
        { label: this.$t('expressProviderDetail.platformEpsCode'), value: 'platformLpCode', type: 'input', readonly: true },
        { label: this.$t('expressProviderDetail.allocatedQuantity'), value: 'allocatedQuantity', type: 'input', readonly: true },
        { label: this.$t('expressProviderDetail.printQuantity'), value: 'printQuantity', type: 'input', readonly: true },
        { label: this.$t('expressProviderDetail.cancelQuantity'), value: 'cancelQuantity', type: 'input', readonly: true },
        { label: this.$t('expressProviderDetail.quantity'), value: 'quantity', type: 'input', readonly: true },
        { label: this.$t('expressProviderDetail.branchCode'), value: 'branchCode', type: 'input', readonly: true },
        { label: this.$t('expressProviderDetail.branchName'), value: 'branchName', type: 'input', readonly: true },
        { label: this.$t('expressProviderDetail.province'), value: 'province', type: 'input' },
        { label: this.$t('expressProviderDetail.city'), value: 'city', type: 'input' },
        { label: this.$t('expressProviderDetail.district'), value: 'district', type: 'input' },
        { label: this.$t('expressProviderDetail.detailAddress'), value: 'detailAddress', type: 'input' },
        { label: this.$t('expressProviderDetail.whId'), value: 'whId', type: 'input' },
        { label: this.$t('expressProviderDetail.updater'), value: 'updater', type: 'input', readonly: true },
        { label: this.$t('expressProviderDetail.updateTime'), value: 'updateTime', type: 'input', readonly: true },
        { label: this.$t('expressProviderDetail.remark'), value: 'remark', type: 'textarea' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        province: [{ required: true, message: this.$t('expressProviderDetail.msg.province'), trigger: 'blur' }],
        city: [{ required: true, message: this.$t('expressProviderDetail.msg.city'), trigger: 'blur' }],
        district: [{ required: true, message: this.$t('expressProviderDetail.msg.district'), trigger: 'blur' }],
        detailAddress: [{ required: true, message: this.$t('expressProviderDetail.msg.detailAddress'), trigger: 'blur' }],
        whId: [{ required: true, message: this.$t('expressProviderDetail.msg.whId'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
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
