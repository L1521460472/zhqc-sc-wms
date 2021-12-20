import notification from './notification'
export default {
  mixins: [notification],
  data() {
    return {
      topForm: {
        ref: null, // 对外提供的可操作表单的持有对象
        fieldList: null, // 配置的表单字段集合
        data: { // 表单绑定的数据Model
          parentSuject: null,
          sujectCode: null,
          sujectName: null,
          remark: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      }
    }
  },
  mounted() {
    this.initTopForm()
    this.rulesInit()
  },
  methods: {
    initTopForm() {
      this.topForm.fieldList = [
        { label: this.$t('billSuject.parentSuject'), value: 'parentSuject', type: 'input' },
        { label: this.$t('billSuject.sujectCode'), value: 'sujectCode', type: 'input' },
        { label: this.$t('billSuject.sujectName'), value: 'sujectName', type: 'input' },
        { label: this.$t('billSuject.remark'), value: 'remark', type: 'input' }
      ]
    },
    rulesInit() {
      this.topForm.rules = {
        sujectCode: [{ required: true, message: this.$t('billSuject.msg.sujectCode'), trigger: 'blur' }],
        sujectName: [{ required: true, message: this.$t('billSuject.msg.sujectName'), trigger: 'blur' }]
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
