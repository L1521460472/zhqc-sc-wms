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
          deviceTypeId: null,
          deviceCode: null,
          deviceName: null,
          areaId: null,
          zoneId: null,
          lotId: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        deviceTypList: []
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
        { label: this.$t('deviceWorkCfg.deviceTypeId'), value: 'deviceTypeId', type: 'select', list: 'deviceTypList' },
        { label: this.$t('deviceWorkCfg.deviceCode'), value: 'deviceCode', type: 'input' },
        { label: this.$t('deviceWorkCfg.deviceName'), value: 'deviceName', type: 'input' },
        { label: this.$t('deviceWorkCfg.areaId'), value: 'areaId', type: 'slot' },
        { label: this.$t('deviceWorkCfg.zoneId'), value: 'zoneId', type: 'slot' },
        { label: this.$t('deviceWorkCfg.lotId'), value: 'lotId', type: 'slot' },
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
        { prop: 'deviceTypeName', label: this.$t('deviceWorkCfg.deviceTypeId'), minWidth: 100 },
        { prop: 'deviceCode', label: this.$t('deviceWorkCfg.deviceCode'), minWidth: 100 },
        { prop: 'deviceName', label: this.$t('deviceWorkCfg.deviceName'), minWidth: 100 },
        { prop: 'areaName', label: this.$t('deviceWorkCfg.areaId'), minWidth: 100 },
        { prop: 'zoneName', label: this.$t('deviceWorkCfg.zoneId'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('deviceWorkCfg.lotId'), minWidth: 100 },
        { prop: 'isEnableName', label: this.$t('deviceWorkCfg.isEnableName'), minWidth: 100 },
        { prop: 'remark', label: this.$t('deviceWorkCfg.remark'), minWidth: 100 },
        { label: '操作', value: 'status', width: 220, type: 'slot', fixed: 'right' } // value: 'status' 对应页面上 自定义插槽的名字v-slot:col-status
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('deviceWorkCfg.companyCode'), value: 'companyCode', type: 'input', readonly: true },
        { label: this.$t('deviceWorkCfg.whId'), value: 'whId', type: 'input', readonly: true },
        { label: this.$t('deviceWorkCfg.deviceId'), value: 'deviceId', type: 'input', readonly: true },
        { label: this.$t('deviceWorkCfg.areaId'), value: 'areaId', type: 'input', readonly: true },
        { label: this.$t('deviceWorkCfg.zoneId'), value: 'zoneId', type: 'input', readonly: true },
        { label: this.$t('deviceWorkCfg.lotId'), value: 'lotId', type: 'input', readonly: true },
        { label: this.$t('deviceWorkCfg.remark'), value: 'remark', type: 'input', readonly: true },
        { label: this.$t('deviceWorkCfg.isEnable'), value: 'isEnable', type: 'input', readonly: true },
        { label: this.$t('deviceWorkCfg.creator'), value: 'creator', type: 'input', readonly: true },
        { label: this.$t('deviceWorkCfg.creatorName'), value: 'creatorName', type: 'input', readonly: true },
        { label: this.$t('deviceWorkCfg.createTime'), value: 'createTime', type: 'input', readonly: true },
        { label: this.$t('deviceWorkCfg.updater'), value: 'updater', type: 'input', readonly: true },
        { label: this.$t('deviceWorkCfg.updaterName'), value: 'updaterName', type: 'input', readonly: true },
        { label: this.$t('deviceWorkCfg.updateTime'), value: 'updateTime', type: 'input', readonly: true },
        { label: this.$t('deviceWorkCfg.optimistic'), value: 'optimistic', type: 'input', readonly: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('deviceWorkCfg.deviceCode'), value: 'deviceId', type: 'slot' },
        { label: this.$t('deviceWorkCfg.deviceName'), value: 'deviceName', type: 'input', disabled: true },
        { label: this.$t('deviceWorkCfg.deviceTypeId'), value: 'deviceTypeName', type: 'input', disabled: true },
        { label: this.$t('deviceWorkCfg.areaId'), value: 'areaId', type: 'slot' },
        { label: this.$t('deviceWorkCfg.zoneId'), value: 'zoneId', type: 'slot' },
        { label: this.$t('deviceWorkCfg.lotId'), value: 'lotId', type: 'slot' },
        { label: this.$t('deviceWorkCfg.remark'), value: 'remark', type: 'textarea' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('deviceWorkCfg.deviceCode'), value: 'deviceId', type: 'slot' },
        { label: this.$t('deviceWorkCfg.deviceName'), value: 'deviceName', type: 'input', disabled: true },
        { label: this.$t('deviceWorkCfg.deviceTypeId'), value: 'deviceTypeName', type: 'input', disabled: true },
        { label: this.$t('deviceWorkCfg.areaId'), value: 'areaId', type: 'slot' },
        { label: this.$t('deviceWorkCfg.zoneId'), value: 'zoneId', type: 'slot' },
        { label: this.$t('deviceWorkCfg.lotId'), value: 'lotId', type: 'slot' },
        { label: this.$t('deviceWorkCfg.remark'), value: 'remark', type: 'textarea' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        deviceId: [{ required: true, message: this.$t('deviceWorkCfg.msg.deviceId'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        creator: null,
        deviceId: null,
        createTime: null,
        isEnable: null,
        remark: null,
        areaId: null,
        updater: null,
        updaterName: null,
        optimistic: null,
        zoneId: null,
        updateTime: null,
        whId: null,
        lotId: null,
        companyCode: null,
        creatorName: null
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
