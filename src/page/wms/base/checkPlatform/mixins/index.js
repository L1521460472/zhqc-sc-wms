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
          checkPlatformCode: null,
          checkPlatformName: null,
          checkPlatformType: null,
          isEnable: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        enableList: [],
        checkPlatformTypeList: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '300', // 默认操作按钮列宽度
          btList: [// 添加操作按钮
            // 默认查看按钮
            { label: this.$t('table.view'), type: 'primary', icon: '', event: 'openViewPage', show: true, disabled: this.$hasPerm('view') }, // event值为notification.js中定义的方法名
            // 默认修改按钮
            { label: this.$t('table.edit'), type: 'success', icon: '', event: 'openEditPage', show: true, disabled: this.$hasPerm('edit') }, // event值为notification.js中定义的方法名
            // 默认删除按钮
            { label: this.$t('table.delete'), type: 'danger', icon: '', event: 'deleteData', show: true, disabled: this.$hasPerm('delete') }, // event值为notification.js中定义的方法名
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
        { label: this.$t('checkPlatform.checkPlatformCode'), value: 'checkPlatformCode', type: 'input' },
        { label: this.$t('checkPlatform.checkPlatformName'), value: 'checkPlatformName', type: 'input' },
        { label: this.$t('checkPlatform.checkPlatformType'), value: 'checkPlatformType', type: 'select', list: 'checkPlatformTypeList' },
        { label: this.$t('checkPlatform.isEnable'), value: 'isEnable', type: 'select', list: 'enableList' },
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
        { prop: 'checkPlatformCode', label: this.$t('checkPlatform.checkPlatformCode'), minWidth: 100 },
        { prop: 'checkPlatformName', label: this.$t('checkPlatform.checkPlatformName'), minWidth: 100 },
        { prop: 'checkPlatformTypeName', label: this.$t('checkPlatform.checkPlatformType'), minWidth: 100 },
        { prop: 'deviceName', label: this.$t('checkPlatform.deviceName'), minWidth: 100 },
        { prop: 'isEnableName', label: this.$t('checkPlatform.isEnable'), minWidth: 100 },
        { prop: 'remark', label: this.$t('checkPlatform.remark'), minWidth: 100 },
        { prop: 'creator', label: this.$t('checkPlatform.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('checkPlatform.createTime'), minWidth: 100 },
        { prop: 'updater', label: this.$t('checkPlatform.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('checkPlatform.updateTime'), minWidth: 100 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('checkPlatform.checkPlatformCode'), value: 'checkPlatformCode', type: 'input', disabled: true },
        { label: this.$t('checkPlatform.checkPlatformName'), value: 'checkPlatformName', type: 'input', disabled: true },
        { label: this.$t('checkPlatform.checkPlatformType'), value: 'checkPlatformType', type: 'select', list: 'checkPlatformTypeList', disabled: true },
        { label: this.$t('checkPlatform.deviceId'), value: 'deviceId', type: 'slot' },
        { label: this.$t('checkPlatform.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', disabled: true },
        { label: this.$t('checkPlatform.remark'), value: 'remark', type: 'input', disabled: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('checkPlatform.checkPlatformCode'), value: 'checkPlatformCode', type: 'input' },
        { label: this.$t('checkPlatform.checkPlatformName'), value: 'checkPlatformName', type: 'input' },
        { label: this.$t('checkPlatform.checkPlatformType'), value: 'checkPlatformType', type: 'select', list: 'checkPlatformTypeList' },
        { label: this.$t('checkPlatform.deviceId'), value: 'deviceId', type: 'slot' },
        { label: this.$t('checkPlatform.isEnable'), value: 'isEnable', type: 'select', list: 'enableList' },
        { label: this.$t('checkPlatform.remark'), value: 'remark', type: 'input' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('checkPlatform.checkPlatformCode'), value: 'checkPlatformCode', type: 'input', disabled: true },
        { label: this.$t('checkPlatform.checkPlatformName'), value: 'checkPlatformName', type: 'input' },
        { label: this.$t('checkPlatform.checkPlatformType'), value: 'checkPlatformType', type: 'select', list: 'checkPlatformTypeList' },
        { label: this.$t('checkPlatform.deviceId'), value: 'deviceId', type: 'slot' },
        { label: this.$t('checkPlatform.isEnable'), value: 'isEnable', type: 'select', list: 'enableList' },
        { label: this.$t('checkPlatform.remark'), value: 'remark', type: 'input' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        checkPlatformCode: [{ required: true, message: this.$t('checkPlatform.msg.checkPlatformCode'), trigger: 'blur' }],
        checkPlatformType: [{ required: true, message: this.$t('checkPlatform.msg.checkPlatformType'), trigger: 'blur' }],
        isEnable: [{ required: true, message: this.$t('checkPlatform.msg.isEnable'), trigger: 'blur' }],
        checkPlatformName: [{ required: true, message: this.$t('checkPlatform.msg.checkPlatformName'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        checkPlatformCode: null,
        checkPlatformType: null,
        isEnable: null,
        deviceId: null,
        checkPlatformName: null,
        remark: null
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
