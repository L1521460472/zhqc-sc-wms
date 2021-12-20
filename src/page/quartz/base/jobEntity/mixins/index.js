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
          jobName: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        enableList: [],
        execIntervalList: [],
        freqTypeList: [],
        freqValueMonthList: [],
        freqValueWeekList: [],
        jobCategoryList: [],
        jobTypeList: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '360', // 默认操作按钮列宽度
          btList: [// 添加操作按钮
            // 默认查看按钮
            { label: this.$t('table.view'), type: 'primary', icon: '', event: 'openViewPage', show: true, disabled: this.$hasPerm('view') }, // event值为notification.js中定义的方法名
            // 默认修改按钮
            { label: this.$t('table.edit'), type: 'success', icon: '', event: 'openEditPage', show: true, disabled: this.$hasPerm('edit') }, // event值为notification.js中定义的方法名
            // 默认删除按钮
            { label: this.$t('table.delete'), type: 'danger', icon: '', event: 'deleteData', show: true, disabled: this.$hasPerm('delete') }, // event值为notification.js中定义的方法名
            { label: '执行日志', type: 'primary', icon: '', event: 'openLogPage', show: true }, // event值为notification.js中定义的方法名
            // 自定义按钮
            { slot: true, icon: '', event: 'slotEvent' }// event值为notification.js中定义的方法名

          ]
        }
      },
      // 弹窗表单
      diaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        labelWidth: '150px',
        onceDisabled: true,
        cycleDisabled: true,
        diaParamFormInfo: {
          ref: null, // 对外提供的可操作配置表单的持有对象
          data: {}, // 绑定的数据Model对象
          fieldList: [], // 配置的表单字段集合
          rules: {}// 配置的表单字段校验规则集合
        }
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
        { label: this.$t('jobEntity.jobName'), value: 'jobName', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }
      ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'jobName', label: this.$t('jobEntity.jobName'), minWidth: 100 },
        { prop: 'description', label: this.$t('jobEntity.description'), minWidth: 100 },
        { prop: 'jobCategoryName', label: this.$t('jobEntity.jobCategory'), minWidth: 100 },
        { prop: 'isEnableName', label: this.$t('jobEntity.isEnable'), minWidth: 100 },
        { prop: 'startTime', label: this.$t('jobEntity.startTime'), minWidth: 100 },
        { prop: 'endTime', label: this.$t('jobEntity.endTime'), minWidth: 100 },
        { prop: 'freqTypeName', label: this.$t('jobEntity.freqType'), minWidth: 100 },
        { prop: 'jobTypeName', label: this.$t('jobEntity.jobType'), minWidth: 100 },
        { prop: 'remark', label: this.$t('jobEntity.remark'), minWidth: 100 },
        { prop: 'creatorName', label: this.$t('jobEntity.creatorName'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('jobEntity.createTime'), minWidth: 100 },
        { prop: 'updaterName', label: this.$t('jobEntity.updaterName'), minWidth: 100 },
        { prop: 'updaterTime', label: this.$t('jobEntity.updaterTime'), minWidth: 100 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('jobEntity.jobName'), value: 'jobName', type: 'input', disabled: true },
        { label: this.$t('jobEntity.description'), value: 'description', type: 'input', disabled: true },
        { label: this.$t('jobEntity.jobCategory'), value: 'jobCategory', type: 'select', list: 'jobCategoryList', disabled: true },
        { label: this.$t('jobEntity.startTime'), value: 'startTime', type: 'date', dateType: 'date', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd', disabled: true },
        { label: this.$t('jobEntity.endTime'), value: 'endTime', type: 'date', dateType: 'date', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd', disabled: true },
        { label: this.$t('jobEntity.freqType'), value: 'freqType', type: 'select', list: 'freqTypeList', disabled: true },
        { label: this.$t('jobEntity.freqValue'), value: 'freqValue', type: 'select', list: '', disabled: true },
        { label: this.$t('jobEntity.jobType'), value: 'jobType', type: 'select', list: 'jobTypeList', disabled: true },
        { label: this.$t('jobEntity.onceTime'), value: 'onceTime', type: 'input', disabled: true },
        { label: this.$t('jobEntity.execInterval'), value: 'execInterval', type: 'select', list: 'execIntervalList', disabled: true },
        { label: this.$t('jobEntity.cycleStartTime'), value: 'cycleStartTime', type: 'input', disabled: true },
        { label: this.$t('jobEntity.cycleEndTime'), value: 'cycleEndTime', type: 'input', disabled: true },
        { label: this.$t('jobEntity.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', disabled: true },
        { label: this.$t('jobEntity.remark'), value: 'remark', type: 'input', disabled: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('jobEntity.jobName'), value: 'jobName', type: 'input' },
        { label: this.$t('jobEntity.description'), value: 'description', type: 'input' },
        { label: this.$t('jobEntity.jobCategory'), value: 'jobCategory', type: 'select', list: 'jobCategoryList', event: 'changeJobCategoryEvent' },
        { label: this.$t('jobEntity.startTime'), value: 'startTime', type: 'date', dateType: 'date', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd' },
        { label: this.$t('jobEntity.endTime'), value: 'endTime', type: 'date', dateType: 'date', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd' },
        { label: this.$t('jobEntity.freqType'), value: 'freqType', type: 'select', list: 'freqTypeList', event: 'changeFreqType' },
        { label: this.$t('jobEntity.freqValue'), value: 'freqValue', type: 'select', list: 'freqValueWeekList', disabled: true },
        { label: this.$t('jobEntity.jobType'), value: 'jobType', type: 'select', list: 'jobTypeList', event: 'changeJobType' },
        { label: this.$t('jobEntity.onceTime'), value: 'onceTime', type: 'slot' },
        { label: this.$t('jobEntity.execInterval'), value: 'execInterval', type: 'select', list: 'execIntervalList', disabled: true },
        { label: this.$t('jobEntity.cycleStartTime'), value: 'cycleStartTime', type: 'slot' },
        { label: this.$t('jobEntity.cycleEndTime'), value: 'cycleEndTime', type: 'slot' },
        { label: this.$t('jobEntity.isEnable'), value: 'isEnable', type: 'select', list: 'enableList' },
        { label: this.$t('jobEntity.remark'), value: 'remark', type: 'input' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('jobEntity.jobName'), value: 'jobName', type: 'input', disabled: true },
        { label: this.$t('jobEntity.description'), value: 'description', type: 'input' },
        { label: this.$t('jobEntity.jobCategory'), value: 'jobCategory', type: 'select', list: 'jobCategoryList', disabled: true },
        { label: this.$t('jobEntity.startTime'), value: 'startTime', type: 'date', dateType: 'date', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd' },
        { label: this.$t('jobEntity.endTime'), value: 'endTime', type: 'date', dateType: 'date', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd' },
        { label: this.$t('jobEntity.freqType'), value: 'freqType', type: 'select', list: 'freqTypeList', event: 'changeFreqType' },
        { label: this.$t('jobEntity.freqValue'), value: 'freqValue', type: 'select', list: '' },
        { label: this.$t('jobEntity.jobType'), value: 'jobType', type: 'select', list: 'jobTypeList', event: 'changeJobType' },
        { label: this.$t('jobEntity.onceTime'), value: 'onceTime', type: 'slot' },
        { label: this.$t('jobEntity.execInterval'), value: 'execInterval', type: 'select', list: 'execIntervalList' },
        { label: this.$t('jobEntity.cycleStartTime'), value: 'cycleStartTime', type: 'slot' },
        { label: this.$t('jobEntity.cycleEndTime'), value: 'cycleEndTime', type: 'slot' },
        { label: this.$t('jobEntity.isEnable'), value: 'isEnable', type: 'select', list: 'enableList' },
        { label: this.$t('jobEntity.remark'), value: 'remark', type: 'input' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        jobType: [{ required: true, message: this.$t('jobEntity.msg.jobType'), trigger: 'blur' }],
        startTime: [{ required: true, message: this.$t('jobEntity.msg.jobType'), trigger: 'blur' }],
        endTime: [{ required: true, message: this.$t('jobEntity.msg.jobType'), trigger: 'blur' }],
        isEnable: [{ required: true, message: this.$t('jobEntity.msg.isEnable'), trigger: 'blur' }],
        freqType: [{ required: true, message: this.$t('jobEntity.msg.freqType'), trigger: 'blur' }],
        jobName: [{ required: true, message: this.$t('jobEntity.msg.jobName'), trigger: 'blur' }],
        jobCategory: [{ required: true, message: this.$t('jobEntity.msg.jobCategory'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        cron: null,
        jobType: null,
        jobGroup: null,
        isEnable: null,
        freqType: null,
        freqValue: null,
        endTime: null,
        description: null,
        remark: null,
        onceTime: null,
        execInterval: null,
        cycleEndTime: null,
        startTime: null,
        whId: null,
        jobName: null,
        parameter: null,
        cycleStartTime: null,
        companyCode: null,
        id: null,
        jobCategory: null
      }
    },
    resetParamFormData() {
      this.diaFormInfo.diaParamFormInfo.data = {
        waveModelId: null
      }
      this.waveModelId = null
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
