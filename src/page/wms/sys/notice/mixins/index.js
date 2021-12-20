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
          topic: null,
          publisher: null,
          publishTime: null,
          creator: null,
          createTime: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        noticeStatusList: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '280', // 默认操作按钮列宽度
          btList: [// 添加操作按钮
            // 默认查看按钮
            { label: this.$t('table.view'), type: 'primary', icon: '', event: 'openViewPage', show: true, disabled: this.$hasPerm('view') }, // event值为notification.js中定义的方法名
            // 默认删除按钮
            { label: this.$t('table.delete'), type: 'danger', icon: '', event: 'deleteData', show: true, disabled: this.$hasPerm('delete') }, // event值为notification.js中定义的方法名
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
        { label: this.$t('notice.topic'), value: 'topic', type: 'input' },
        { label: this.$t('notice.creator'), value: 'creator', type: 'input' },
        { label: this.$t('notice.publisher'), value: 'publisher', type: 'input' },
        { label: this.$t('notice.noticeStatus'), value: 'noticeStatus', type: 'select', list: 'noticeStatusList' },

        { label: this.$t('notice.createTimeBegin'), value: 'createTimeBegin', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('notice.createTimeEnd'), value: 'createTimeEnd', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('notice.publishTimeBegin'), value: 'publishTimeBegin', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('notice.publishTimeEnd'), value: 'publishTimeEnd', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }
      ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'topic', label: this.$t('notice.topic'), minWidth: 100 },
        { prop: 'noticeStatusName', label: this.$t('notice.noticeStatus'), minWidth: 100 },
        { prop: 'publisherName', label: this.$t('notice.publisherName'), minWidth: 100 },
        { prop: 'publishTime', label: this.$t('notice.publishTime'), minWidth: 100 },
        { prop: 'remark', label: this.$t('notice.remark'), minWidth: 100 },
        { prop: 'creatorName', label: this.$t('notice.creatorName'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('notice.createTime'), minWidth: 100 },
        { prop: 'updaterName', label: this.$t('notice.updaterName'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('notice.updateTime'), minWidth: 100 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('notice.topic'), value: 'topic', type: 'input' },
        { label: this.$t('notice.remark'), value: 'remark', type: 'input' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('notice.topic'), value: 'topic', type: 'input' },
        // {label: this.$t('notice.noticeStatus'), value: "noticeStatus", type: "select",list:'noticeStatusList',disabled:true},
        { label: this.$t('notice.remark'), value: 'remark', type: 'input' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        htmlContent: [{ required: true, message: this.$t('notice.msg.htmlContent'), trigger: 'blur' }],
        topic: [{ required: true, message: this.$t('notice.msg.topic'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        htmlContent: null,
        noticeStatus: null,
        topic: null,
        remark: null,
        resources: []
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
