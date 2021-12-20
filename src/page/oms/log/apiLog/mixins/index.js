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
          requestType: null,
          requestCode: null,
          requestStatus: null,
          createTimeBegin: null,
          createTimeEnd: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        requestTypeList: [],
        requestStatusList: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '100', // 默认操作按钮列宽度
          btList: [// 添加操作按钮
            // 默认查看按钮
            { label: this.$t('table.view'), type: 'primary', icon: '', event: 'openViewPage', show: true, disabled: this.$hasPerm('view') }// event值为notification.js中定义的方法名
            // //默认修改按钮
            // {label:this.$t('table.edit'), type: 'success', icon: '', event: 'openEditPage', show: true,disabled:this.$hasPerm('edit')},//event值为notification.js中定义的方法名
            // //默认删除按钮
            // {label:this.$t('table.delete'), type: 'danger', icon: '', event: 'deleteData', show: true,disabled:this.$hasPerm('delete')},//event值为notification.js中定义的方法名
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
        { label: this.$t('apiLog.requestType'), value: 'requestType', type: 'select', list: 'requestTypeList' },
        { label: this.$t('apiLog.requestCode'), value: 'requestCode', type: 'input' },
        { label: this.$t('apiLog.requestStatus'), value: 'requestStatus', type: 'select', list: 'requestStatusList' },
        { label: this.$t('apiLog.createTimeBegin'), value: 'createTimeBegin', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('apiLog.createTimeEnd'), value: 'createTimeEnd', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
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
        { prop: 'requestTypeName', label: this.$t('apiLog.requestType'), minWidth: 100 },
        { prop: 'requestCode', label: this.$t('apiLog.requestCode'), minWidth: 100 },
        { prop: 'requestUrl', label: this.$t('apiLog.requestUrl'), minWidth: 100 },
        { prop: 'requestStatusName', label: this.$t('apiLog.requestStatus'), minWidth: 100 },
        { prop: 'requestJson', label: this.$t('apiLog.requestJson'), minWidth: 100 },
        { prop: 'responseMsg', label: this.$t('apiLog.responseMsg'), minWidth: 100 },
        { prop: 'creator', label: this.$t('apiLog.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('apiLog.createTime'), minWidth: 100 },
        { prop: 'updater', label: this.$t('apiLog.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('apiLog.updateTime'), minWidth: 100 },
        { prop: 'remark', label: this.$t('apiLog.remark'), minWidth: 100 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('apiLog.requestType'), value: 'requestType', type: 'select', list: 'requestTypeList', disabled: true },
        { label: this.$t('apiLog.requestCode'), value: 'requestCode', type: 'input', disabled: true },
        { label: this.$t('apiLog.requestUrl'), value: 'requestUrl', type: 'input', disabled: true },
        { label: this.$t('apiLog.requestStatus'), value: 'requestStatus', type: 'select', list: 'requestStatusList', disabled: true },
        { label: this.$t('apiLog.requestJson'), value: 'requestJson', type: 'input', disabled: true },
        { label: this.$t('apiLog.responseMsg'), value: 'responseMsg', type: 'input', disabled: true },
        { label: this.$t('apiLog.remark'), value: 'remark', type: 'input', disabled: true },
        { label: this.$t('apiLog.extendOne'), value: 'extendOne', type: 'input', disabled: true },
        { label: this.$t('apiLog.extendTwo'), value: 'extendTwo', type: 'input', disabled: true },
        { label: this.$t('apiLog.extendThree'), value: 'extendThree', type: 'input', disabled: true },
        { label: this.$t('apiLog.extendFour'), value: 'extendFour', type: 'input', disabled: true },
        { label: this.$t('apiLog.extendFive'), value: 'extendFive', type: 'input', disabled: true },
        { label: this.$t('apiLog.extendSix'), value: 'extendSix', type: 'input', disabled: true },
        { label: this.$t('apiLog.extendSeven'), value: 'extendSeven', type: 'input', disabled: true },
        { label: this.$t('apiLog.extendEight'), value: 'extendEight', type: 'input', disabled: true },
        { label: this.$t('apiLog.extendNine'), value: 'extendNine', type: 'input', disabled: true },
        { label: this.$t('apiLog.extendTen'), value: 'extendTen', type: 'input', disabled: true }
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

      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        // requestStatus:[{required: true, message: this.$t('apiLog.msg.requestStatus'), trigger: 'blur'}],
        // requestType:[{required: true, message: this.$t('apiLog.msg.requestType'), trigger: 'blur'}],
        // requestUrl:[{required: true, message: this.$t('apiLog.msg.requestUrl'), trigger: 'blur'}],
        // responseMsg:[{required: true, message: this.$t('apiLog.msg.responseMsg'), trigger: 'blur'}],
        // requestJson:[{required: true, message: this.$t('apiLog.msg.requestJson'), trigger: 'blur'}],
        // whId:[{required: true, message: this.$t('apiLog.msg.whId'), trigger: 'blur'}],
        // companyCode:[{required: true, message: this.$t('apiLog.msg.companyCode'), trigger: 'blur'}],
        // id:[{required: true, message: this.$t('apiLog.msg.id'), trigger: 'blur'}],
        // requestCode:[{required: true, message: this.$t('apiLog.msg.requestCode'), trigger: 'blur'}],
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        requestStatus: null,
        requestType: null,
        extendThree: null,
        extendTwo: null,
        remark: null,
        extendFive: null,
        extendSeven: null,
        requestUrl: null,
        responseMsg: null,
        extendOne: null,
        requestJson: null,
        extendSix: null,
        whId: null,
        extendEight: null,
        extendFour: null,
        extendTen: null,
        extendNine: null,
        companyCode: null,
        id: null,
        requestCode: null
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
