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
          wmsLpCode: null,
          lpCode: null,
          lpId: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '120px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        epsPlatformTypeList: [],
        standardTemplateList: [],
        customizeTemplateList: [],
        wmsLpCodeList: []
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
            {
              label: this.$t('table.view'),
              type: 'primary',
              icon: '',
              event: 'openViewPage',
              show: true,
              disabled: this.$hasPerm('view')
            }, // event值为notification.js中定义的方法名
            // 默认修改按钮
            {
              label: this.$t('table.edit'),
              type: 'success',
              icon: '',
              event: 'openEditPage',
              show: true,
              disabled: this.$hasPerm('edit')
            }// event值为notification.js中定义的方法名
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
        {
          label: this.$t('epsLogisticsRelatio.platformType'),
          value: 'platformType',
          type: 'select',
          list: 'epsPlatformTypeList'
        },
        { label: this.$t('epsLogisticsRelatio.wmsLpCode'), value: 'wmsLpCode', type: 'input' },
        { label: this.$t('epsLogisticsRelatio.lpCode'), value: 'lpCode', type: 'input' },
        /* {label: this.$t('epsLogisticsRelatio.lpId'), value: "lpId", type: "input"},*/
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
        { prop: 'platformType', label: this.$t('epsLogisticsRelatio.platformType'), minWidth: 100 },
        { prop: 'wmsLpCode', label: this.$t('epsLogisticsRelatio.wmsLpCode'), minWidth: 120 },
        { prop: 'lpCode', label: this.$t('epsLogisticsRelatio.lpCode'), minWidth: 120 },
        /* {prop: "lpId", label: this.$t('epsLogisticsRelatio.lpId'), minWidth: 100},*/
        { prop: 'lpName', label: this.$t('epsLogisticsRelatio.lpName'), minWidth: 120 },
        { prop: 'lpTypeStr', label: this.$t('epsLogisticsRelatio.lpType'), minWidth: 120 },
        { prop: 'standardTemplate', label: this.$t('epsLogisticsRelatio.standardTemplate'), minWidth: 180 },
        { prop: 'customizeTemplate', label: this.$t('epsLogisticsRelatio.customizeTemplate'), minWidth: 150 },
        { prop: 'updater', label: this.$t('epsLogisticsRelatio.updater'), minWidth: 80 },
        { prop: 'updateTime', label: this.$t('epsLogisticsRelatio.updateTime'), minWidth: 100 },
        { prop: 'remark', label: this.$t('epsLogisticsRelatio.remark'), minWidth: 100 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.diaFormInfo.fieldList = [
        {
          label: this.$t('epsLogisticsRelatio.platformType'),
          value: 'platformType',
          type: 'input',
          readonly: true
        },
        { label: this.$t('epsLogisticsRelatio.wmsLpCode'), value: 'wmsLpCode', type: 'input', readonly: true },
        { label: this.$t('epsLogisticsRelatio.lpCode'), value: 'lpCode', type: 'input', readonly: true },
        /* {label: this.$t('epsLogisticsRelatio.lpId'), value: "lpId", type: "input", readonly: true},*/
        { label: this.$t('epsLogisticsRelatio.lpName'), value: 'lpName', type: 'input', readonly: true },
        { label: this.$t('epsLogisticsRelatio.lpType'), value: 'lpTypeStr', type: 'input', readonly: true },
        {
          label: this.$t('epsLogisticsRelatio.standardTemplate'),
          value: 'standardTemplate',
          type: 'input',
          readonly: true
        },
        {
          label: this.$t('epsLogisticsRelatio.customizeTemplate'),
          value: 'customizeTemplate',
          type: 'input',
          readonly: true
        },
        {
          label: this.$t('epsLogisticsRelatio.standardUrl'),
          value: 'standardUrl',
          type: 'input',
          readonly: true
        },
        {
          label: this.$t('epsLogisticsRelatio.customizeUrl'),
          value: 'customizeUrl',
          type: 'input',
          readonly: true
        },
        /* {label: this.$t('epsLogisticsRelatio.creator'), value: "creator", type: "input",readonly:true},
                                                {label: this.$t('epsLogisticsRelatio.createTime'), value: "createTime", type: "input",readonly:true},*/
        { label: this.$t('epsLogisticsRelatio.updater'), value: 'updater', type: 'input', readonly: true },
        { label: this.$t('epsLogisticsRelatio.updateTime'), value: 'updateTime', type: 'input', readonly: true },
        { label: this.$t('epsLogisticsRelatio.remark'), value: 'remark', type: 'input', readonly: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.diaFormInfo.fieldList = [
        {
          label: this.$t('epsLogisticsRelatio.platformType'),
          value: 'platformType',
          type: 'input',
          readonly: true
        },
        {
          label: this.$t('epsLogisticsRelatio.wmsLpCode'),
          value: 'wmsLpCode',
          type: 'select',
          list: 'wmsLpCodeList',
          filterable: true
        },
        { label: this.$t('epsLogisticsRelatio.lpCode'), value: 'lpCode', type: 'input', readonly: true },
        /* {label: this.$t('epsLogisticsRelatio.lpId'), value: "lpId", type: "input", readonly: true},*/
        { label: this.$t('epsLogisticsRelatio.lpName'), value: 'lpName', type: 'input', readonly: true },
        { label: this.$t('epsLogisticsRelatio.lpType'), value: 'lpTypeStr', type: 'input', readonly: true },
        {
          label: this.$t('epsLogisticsRelatio.standardTemplate'),
          value: 'standardTemplateId',
          type: 'select',
          list: 'standardTemplateList'
        },
        {
          label: this.$t('epsLogisticsRelatio.customizeTemplate'),
          value: 'customizeTemplateId',
          type: 'select',
          list: 'customizeTemplateList'
        },
        { label: this.$t('epsLogisticsRelatio.remark'), value: 'remark', type: 'input' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        wmsLpCode: [{ required: true, message: this.$t('epsLogisticsRelatio.msg.wmsLpCode'), trigger: 'blur' }],
        platformType: [{
          required: true,
          message: this.$t('epsLogisticsRelatio.msg.platformType'),
          trigger: 'blur'
        }],
        id: [{ required: true, message: this.$t('epsLogisticsRelatio.msg.id'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        lpCode: null,
        creator: null,
        lpType: null,
        createTime: null,
        customizeTemplateId: null,
        remark: null,
        lpName: null,
        wmsLpCode: null,
        updater: null,
        lpId: null,
        updateTime: null,
        platformType: null,
        id: null,
        standardTemplateId: null
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
