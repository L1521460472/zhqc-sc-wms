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
          deviceCode: null,
          deviceName: null,
          deviceTypeId: null,
          brand: null,
          deviceModel: null,
          purchaseDate: null,
          loadWeight: null,
          workHeight: null,
          ipAddr: null,
          remark: null,
          isEnable: null,
          creator: null,
          creatorName: null,
          createTime: null,
          updater: null,
          updaterName: null,
          updateTime: null,
          optimistic: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        whetherList: [],
        deviceTypeList: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '210', // 默认操作按钮列宽度
          btList: [// 添加操作按钮
            // 默认查看按钮
            { label: this.$t('table.view'), type: 'primary', icon: '', event: 'openViewPage', show: true, disabled: this.$hasPerm('view') }, // event值为notification.js中定义的方法名
            // 默认修改按钮
            { label: this.$t('table.edit'), type: 'success', icon: '', event: 'openEditPage', show: true, disabled: this.$hasPerm('edit') }, // event值为notification.js中定义的方法名
            // 默认删除按钮
            { label: this.$t('table.delete'), type: 'danger', icon: '', event: 'deleteData', show: true, disabled: this.$hasPerm('delete') }// event值为notification.js中定义的方法名
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
        { label: this.$t('device.deviceCode'), value: 'deviceCode', type: 'input' },
        { label: this.$t('device.deviceName'), value: 'deviceName', type: 'input' },
        { label: this.$t('device.deviceTypeId'), value: 'deviceTypeId', type: 'select', list: 'deviceTypeList' },
        { label: this.$t('device.isEnable'), value: 'isEnable', type: 'select', list: 'whetherList' },
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
        { prop: 'deviceCode', label: this.$t('device.deviceCode'), minWidth: 100 },
        { prop: 'deviceName', label: this.$t('device.deviceName'), minWidth: 100 },
        { prop: 'deviceTypeName', label: this.$t('device.deviceTypeName'), minWidth: 100 },
        { prop: 'brand', label: this.$t('device.brand'), minWidth: 100 },
        { prop: 'deviceModel', label: this.$t('device.deviceModel'), minWidth: 100 },
        { prop: 'purchaseDate', label: this.$t('device.purchaseDate'), minWidth: 100 },
        { prop: 'loadWeight', label: this.$t('device.loadWeight'), minWidth: 100 },
        { prop: 'workHeight', label: this.$t('device.workHeight'), minWidth: 100 },
        { prop: 'ipAddr', label: this.$t('device.ipAddr'), minWidth: 100 },
        { prop: 'remark', label: this.$t('device.remark'), minWidth: 100 },
        { prop: 'isEnableName', label: this.$t('device.isEnableName'), minWidth: 100 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('device.deviceCode'), value: 'deviceCode', type: 'input', readonly: true },
        { label: this.$t('device.deviceName'), value: 'deviceName', type: 'input', readonly: true },
        { label: this.$t('device.deviceTypeName'), value: 'deviceTypeName', type: 'input', readonly: true },
        { label: this.$t('device.brand'), value: 'brand', type: 'input', readonly: true },
        { label: this.$t('device.deviceModel'), value: 'deviceModel', type: 'input', readonly: true },
        { label: this.$t('device.purchaseDate'), value: 'purchaseDate', type: 'input', readonly: true },
        { label: this.$t('device.loadWeight'), value: 'loadWeight', type: 'input', readonly: true },
        { label: this.$t('device.workHeight'), value: 'workHeight', type: 'input', readonly: true },
        { label: this.$t('device.ipAddr'), value: 'ipAddr', type: 'input', readonly: true },
        { label: this.$t('device.mac'), value: 'mac', type: 'input', readonly: true },
        { label: this.$t('device.remark'), value: 'remark', type: 'input', readonly: true },
        { label: this.$t('device.isEnable'), value: 'isEnable', type: 'select', list: 'whetherList', disabled: true },
        { label: this.$t('device.creatorName'), value: 'creatorName', type: 'input', readonly: true },
        { label: this.$t('device.createTime'), value: 'createTime', type: 'input', readonly: true },
        { label: this.$t('device.updaterName'), value: 'updaterName', type: 'input', readonly: true },
        { label: this.$t('device.updateTime'), value: 'updateTime', type: 'input', readonly: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('device.deviceCode'), value: 'deviceCode', type: 'input' },
        { label: this.$t('device.deviceName'), value: 'deviceName', type: 'input' },
        { label: this.$t('device.deviceTypeId'), value: 'deviceTypeId', type: 'select', list: 'deviceTypeList' },
        { label: this.$t('device.brand'), value: 'brand', type: 'input' },
        { label: this.$t('device.deviceModel'), value: 'deviceModel', type: 'input' },
        { label: this.$t('device.purchaseDate'), value: 'purchaseDate', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd' },
        { label: this.$t('device.loadWeight'), value: 'loadWeight', type: 'input' },
        { label: this.$t('device.workHeight'), value: 'workHeight', type: 'input' },
        { label: this.$t('device.ipAddr'), value: 'ipAddr', type: 'input' },
        { label: this.$t('device.mac'), value: 'mac', type: 'input' },
        { label: this.$t('device.remark'), value: 'remark', type: 'input' },
        { label: this.$t('device.isEnable'), value: 'isEnable', type: 'select', list: 'whetherList' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('device.deviceCode'), value: 'deviceCode', type: 'input' },
        { label: this.$t('device.deviceName'), value: 'deviceName', type: 'input' },
        { label: this.$t('device.deviceTypeId'), value: 'deviceTypeId', type: 'select', list: 'deviceTypeList' },
        { label: this.$t('device.brand'), value: 'brand', type: 'input' },
        { label: this.$t('device.deviceModel'), value: 'deviceModel', type: 'input' },
        { label: this.$t('device.purchaseDate'), value: 'purchaseDate', type: 'input' },
        { label: this.$t('device.loadWeight'), value: 'loadWeight', type: 'input' },
        { label: this.$t('device.workHeight'), value: 'workHeight', type: 'input' },
        { label: this.$t('device.ipAddr'), value: 'ipAddr', type: 'input' },
        { label: this.$t('device.mac'), value: 'mac', type: 'input' },
        { label: this.$t('device.remark'), value: 'remark', type: 'input' },
        { label: this.$t('device.isEnable'), value: 'isEnable', type: 'select', list: 'whetherList' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        isEnable: [{ required: true, message: this.$t('device.msg.isEnable'), trigger: 'blur' }],
        deviceName: [{ required: true, message: this.$t('device.msg.deviceName'), trigger: 'blur' }],
        deviceCode: [{ required: true, message: this.$t('device.msg.deviceCode'), trigger: 'blur' }],
        deviceTypeId: [{ required: true, message: this.$t('device.msg.deviceTypeId'), trigger: 'blur' }]

      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        creator: null,
        deviceModel: null,
        createTime: null,
        isEnable: null,
        loadWeight: null,
        remark: null,
        updater: null,
        updaterName: null,
        optimistic: null,
        deviceName: null,
        updateTime: null,
        workHeight: null,
        whId: null,
        deviceCode: null,
        deviceTypeId: null,
        companyCode: null,
        creatorName: null,
        purchaseDate: null,
        ipAddr: null,
        mac: null,
        brand: null
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
