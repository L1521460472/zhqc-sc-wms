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
        topBtn: {},
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '100', // 默认操作按钮列宽度
          btList: [
            { label: this.$t('table.view'), type: 'primary', icon: '', event: 'view', show: true, disabled: this.$hasPerm('view') }
          ]
        }
      },
      // 弹框配置
      fullDialogInfo: {
        title: this.$t('pushOrderRule.view'),
        visible: false,
        type: 'view',
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', show: false }
        ],
        topForm: {
          ref: null, // 对外提供的可操作表单的持有对象
          fieldList: null, // 配置的表单字段集合
          data: {}, // 表单绑定的数据Model
          rules: {}, // 配置表单字段的校验规则集合
          labelWidth: '110px' // 默认表单字段label宽度
        },
        tableInfo: {
          fieldList: null, // 表格列集合
          data: []
        }
      }
    }
  },
  mounted() {
    this.initTopForm()
    this.initTableInfo()
    this.rulesInit()
  },
  methods: {
    // 初始化查询表单
    initTopForm() {
      this.topForm.fieldList = [
        { label: this.$t('pushOrderRule.whName'), value: 'whName', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }
      ]
    },
    // 初始化列表
    initTableInfo() {
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'whName', label: this.$t('pushOrderRule.whName'), minWidth: 100 },
        { prop: 'remark', label: this.$t('pushOrderRule.remark'), minWidth: 100 },
        { prop: 'creatorName', label: this.$t('pushOrderRule.creatorName'), minWidth: 120 },
        { prop: 'createTime', label: this.$t('pushOrderRule.createTime'), minWidth: 100 },
        { prop: 'updaterName', label: this.$t('pushOrderRule.updaterName'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('pushOrderRule.updateTime'), minWidth: 100 }
      ]
    },
    // 初始化列表
    initDiaForm() {
      this.fullDialogInfo.topForm.fieldList = [
        { label: this.$t('pushOrderRule.whName'), value: 'whName', type: 'input', disabled: true }
      ]
      this.fullDialogInfo.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'whAreaName', label: this.$t('pushOrderRule.whAreaName'), minWidth: 100 },
        { prop: 'bizCodeStr', label: this.$t('pushOrderRule.bizCodeStr'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('pushOrderRule.ownerName'), minWidth: 120 },
        { prop: 'courierName', label: this.$t('pushOrderRule.courierName'), minWidth: 100 },
        { prop: 'originCodeStr', label: this.$t('pushOrderRule.originCodeStr'), minWidth: 100 },
        { prop: 'bizOrderTypeStr', label: this.$t('pushOrderRule.bizOrderTypeStr'), minWidth: 100 },
        { prop: 'bizOrderStatusStr', label: this.$t('pushOrderRule.bizOrderStatusStr'), minWidth: 100 },
        { prop: 'executeTypeStr', label: this.$t('pushOrderRule.executeTypeStr'), minWidth: 100 },
        { prop: 'pushTypeStr', label: this.$t('pushOrderRule.pushTypeStr'), minWidth: 100 },
        { prop: 'remark', label: this.$t('pushOrderRule.remark'), minWidth: 100 }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {

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
