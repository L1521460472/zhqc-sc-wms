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
          whName: null
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
        { label: this.$t('epsLogisticsAddress.whName'), value: 'whName', type: 'input' },
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
        { prop: 'whName', label: this.$t('epsLogisticsAddress.whName'), minWidth: 100 },
        { prop: 'province', label: this.$t('epsLogisticsAddress.province'), minWidth: 100 },
        { prop: 'city', label: this.$t('epsLogisticsAddress.city'), minWidth: 100 },
        { prop: 'area', label: this.$t('epsLogisticsAddress.area'), minWidth: 100 },
        { prop: 'address', label: this.$t('epsLogisticsAddress.address'), minWidth: 100 },
        { prop: 'contactName', label: this.$t('epsLogisticsAddress.contactName'), minWidth: 100 },
        { prop: 'contactTel', label: this.$t('epsLogisticsAddress.contactTel'), minWidth: 100 },
        { prop: 'contactPhone', label: this.$t('epsLogisticsAddress.contactPhone'), minWidth: 100 },
        { prop: 'contactFax', label: this.$t('epsLogisticsAddress.contactFax'), minWidth: 100 },
        { prop: 'contactMailbox', label: this.$t('epsLogisticsAddress.contactMailbox'), minWidth: 100 },

        { prop: 'remark', label: this.$t('epsLogisticsAddress.remark'), minWidth: 100 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('epsLogisticsAddress.whName'), value: 'whName', type: 'input', readonly: true },
        { label: this.$t('epsLogisticsAddress.contactName'), value: 'contactName', type: 'input', readonly: true },
        { label: this.$t('epsLogisticsAddress.contactTel'), value: 'contactTel', type: 'input', readonly: true },
        { label: this.$t('epsLogisticsAddress.contactPhone'), value: 'contactPhone', type: 'input', readonly: true },
        { label: this.$t('epsLogisticsAddress.contactFax'), value: 'contactFax', type: 'input', readonly: true },
        { label: this.$t('epsLogisticsAddress.contactMailbox'), value: 'contactMailbox', type: 'input', readonly: true },
        { label: this.$t('epsLogisticsAddress.province'), value: 'province', type: 'input', readonly: true },
        { label: this.$t('epsLogisticsAddress.city'), value: 'city', type: 'input', readonly: true },
        { label: this.$t('epsLogisticsAddress.area'), value: 'area', type: 'input', readonly: true },
        { label: this.$t('epsLogisticsAddress.address'), value: 'address', type: 'textarea', readonly: true },
        { label: this.$t('epsLogisticsAddress.remark'), value: 'remark', type: 'textarea', readonly: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('epsLogisticsAddress.id'), value: 'id', type: 'input' },
        { label: this.$t('epsLogisticsAddress.companyCode'), value: 'companyCode', type: 'input' },
        { label: this.$t('epsLogisticsAddress.whCode'), value: 'whCode', type: 'input' },
        { label: this.$t('epsLogisticsAddress.whName'), value: 'whName', type: 'input' },
        { label: this.$t('epsLogisticsAddress.contactName'), value: 'contactName', type: 'input' },
        { label: this.$t('epsLogisticsAddress.contactTel'), value: 'contactTel', type: 'input' },
        { label: this.$t('epsLogisticsAddress.contactPhone'), value: 'contactPhone', type: 'input' },
        { label: this.$t('epsLogisticsAddress.contactFax'), value: 'contactFax', type: 'input' },
        { label: this.$t('epsLogisticsAddress.contactMailbox'), value: 'contactMailbox', type: 'input' },
        { label: this.$t('epsLogisticsAddress.province'), value: 'province', type: 'input' },
        { label: this.$t('epsLogisticsAddress.city'), value: 'city', type: 'input' },
        { label: this.$t('epsLogisticsAddress.area'), value: 'area', type: 'input' },
        { label: this.$t('epsLogisticsAddress.address'), value: 'address', type: 'input' },
        { label: this.$t('epsLogisticsAddress.creator'), value: 'creator', type: 'input' },
        { label: this.$t('epsLogisticsAddress.createTime'), value: 'createTime', type: 'input' },
        { label: this.$t('epsLogisticsAddress.updater'), value: 'updater', type: 'input' },
        { label: this.$t('epsLogisticsAddress.updateTime'), value: 'updateTime', type: 'input' },
        { label: this.$t('epsLogisticsAddress.remark'), value: 'remark', type: 'input' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('epsLogisticsAddress.whName'), value: 'whName', type: 'input', readonly: true },
        { label: this.$t('epsLogisticsAddress.contactName'), value: 'contactName', type: 'input' },
        { label: this.$t('epsLogisticsAddress.contactTel'), value: 'contactTel', type: 'input' },
        { label: this.$t('epsLogisticsAddress.contactPhone'), value: 'contactPhone', type: 'input' },
        { label: this.$t('epsLogisticsAddress.contactFax'), value: 'contactFax', type: 'input' },
        { label: this.$t('epsLogisticsAddress.contactMailbox'), value: 'contactMailbox', type: 'input' },
        { label: this.$t('epsLogisticsAddress.province'), value: 'province', type: 'input' },
        { label: this.$t('epsLogisticsAddress.city'), value: 'city', type: 'input' },
        { label: this.$t('epsLogisticsAddress.area'), value: 'area', type: 'input' },
        { label: this.$t('epsLogisticsAddress.address'), value: 'address', type: 'textarea' },
        { label: this.$t('epsLogisticsAddress.remark'), value: 'remark', type: 'textarea' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        province: [{ required: true, message: this.$t('epsLogisticsAddress.msg.province'), trigger: 'change' }],
        city: [{ required: true, message: this.$t('epsLogisticsAddress.msg.city'), trigger: 'change' }],
        area: [{ required: true, message: this.$t('epsLogisticsAddress.msg.area'), trigger: 'change' }],
        address: [{ required: true, message: this.$t('epsLogisticsAddress.msg.address'), trigger: 'change' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        area: null,
        contactName: null,
        creator: null,
        address: null,
        contactPhone: null,
        createTime: null,
        city: null,
        contactTel: null,
        contactFax: null,
        remark: null,
        contactMailbox: null,
        updater: null,
        whName: null,
        updateTime: null,
        province: null,
        companyCode: null,
        id: null,
        whCode: null
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
