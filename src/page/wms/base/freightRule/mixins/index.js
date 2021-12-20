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
          name: null,
          partnerId: null,
          province: null,
          city: null,
          area: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {},
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '210', // 默认操作按钮列宽度
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
            }, // event值为notification.js中定义的方法名
            // 默认删除按钮
            {
              label: this.$t('table.delete'),
              type: 'danger',
              icon: '',
              event: 'deleteData',
              show: true,
              disabled: this.$hasPerm('delete')
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
        subTableInfo: {
          title: '列表详情',
          ref: null,
          type: null,
          fieldList: [],
          rules: {},
          labelWidth: '120px',
          // handle:null,
          handle: null,
          saveList: [
            { label: '关闭', type: '', icon: '', event: 'close', show: true },
            { label: '保存', type: 'primary', icon: '', event: 'save', saveLoading: false, show: true }
          ],
          topBtn: { label: '添加明细', type: '', icon: 'el-ali-icon-quanxuan', event: 'addSub', show: true }
        },
        provinceEx: null,
        cityEx: null
      }
    }
  },
  mounted() {
    this.initTopFormColumns()// 初始化查询界面配置数据
    this.rulesInit()// 初始化diaFormInfo表单字段校验规则
    this.resetFormData()
  },
  methods: {
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化top表单
      this.topForm.fieldList = [
        { label: this.$t('freightRule.name'), value: 'name', type: 'input' },
        { label: this.$t('freightRule.partner'), value: 'partnerId', type: 'slot' },
        { label: this.$t('freightRule.province'), value: 'province', type: 'input' },
        { label: this.$t('freightRule.city'), value: 'city', type: 'input' },
        { label: this.$t('freightRule.area'), value: 'area', type: 'input' },
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
        { prop: 'name', label: this.$t('freightRule.name'), minWidth: 100 },
        { prop: 'partnerName', label: this.$t('freightRule.partner'), minWidth: 100 },
        { prop: 'provinceName', label: this.$t('freightRule.province'), minWidth: 100 },
        { prop: 'cityName', label: this.$t('freightRule.city'), minWidth: 100 },
        { prop: 'areaName', label: this.$t('freightRule.area'), minWidth: 100 },
        { prop: 'bigDecimalContinuation', label: this.$t('freightRule.bigDecimalContinuation'), minWidth: 100 },
        {
          prop: 'bigDecimalContinuationFreight',
          label: this.$t('freightRule.bigDecimalContinuationFreight'),
          minWidth: 100
        },
        { prop: 'updater', label: this.$t('freightRule.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('freightRule.updateTime'), minWidth: 100 },
        { prop: 'remark', label: this.$t('freightRule.remark'), minWidth: 100 }
      ]
      // 明细
      this.$set(this.diaFormInfo.data, 'dtList', [])
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('freightRule.name'), value: 'name', type: 'input', readonly: true },
        { label: this.$t('freightRule.partner'), value: 'partnerName', type: 'input', readonly: true },
        {
          label: this.$t('freightRule.province'),
          value: 'provinceName',
          type: 'input',
          readonly: true
        },
        { label: this.$t('freightRule.city'), value: 'cityName', type: 'input', readonly: true },
        { label: this.$t('freightRule.area'), value: 'areaName', type: 'input', readonly: true },
        {
          label: this.$t('freightRule.bigDecimalContinuation'),
          value: 'bigDecimalContinuation',
          type: 'input',
          readonly: true
        },
        {
          label: this.$t('freightRule.bigDecimalContinuationFreight'),
          value: 'bigDecimalContinuationFreight',
          type: 'input',
          readonly: true
        }
      ]
      // 明细数据
      this.diaFormInfo.subTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'bigDecimalFirstWeight', label: this.$t('freightRule.dt.bigDecimalFirstWeight'), minWidth: 100 },
        {
          prop: 'bigDecimalFirstWeightFreight',
          label: this.$t('freightRule.dt.bigDecimalFirstWeightFreight'),
          minWidth: 100
        }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('freightRule.name'), value: 'name', type: 'input' },
        { label: this.$t('freightRule.partner'), value: 'partnerId', type: 'slot' },
        { label: this.$t('freightRule.province'), value: 'provinceId', type: 'slot' },
        { label: this.$t('freightRule.city'), value: 'cityId', type: 'slot' },
        { label: this.$t('freightRule.area'), value: 'areaId', type: 'slot' },
        { label: this.$t('freightRule.bigDecimalContinuation'), value: 'bigDecimalContinuation', type: 'input' },
        {
          label: this.$t('freightRule.bigDecimalContinuationFreight'),
          value: 'bigDecimalContinuationFreight',
          type: 'input'
        },
        { label: this.$t('freightRule.remark'), value: 'remark', type: 'textarea' }
      ]
      // 明细
      this.diaFormInfo.subTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        {
          prop: 'bigDecimalFirstWeight',
          label: this.$t('freightRule.dt.bigDecimalFirstWeight'),
          minWidth: 100,
          edit: { 'name': 'input' }
        },
        {
          prop: 'bigDecimalFirstWeightFreight',
          label: this.$t('freightRule.dt.bigDecimalFirstWeightFreight'),
          minWidth: 100,
          edit: { 'name': 'input' }
        }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('freightRule.name'), value: 'name', type: 'input' },
        { label: this.$t('freightRule.partner'), value: 'partnerId', type: 'slot' },
        { label: this.$t('freightRule.province'), value: 'provinceId', type: 'slot' },
        { label: this.$t('freightRule.city'), value: 'cityId', type: 'slot' },
        { label: this.$t('freightRule.area'), value: 'areaId', type: 'slot' },
        { label: this.$t('freightRule.bigDecimalContinuation'), value: 'bigDecimalContinuation', type: 'input' },
        {
          label: this.$t('freightRule.bigDecimalContinuationFreight'),
          value: 'bigDecimalContinuationFreight',
          type: 'input'
        }
      ]
      // 明细
      this.diaFormInfo.subTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        {
          prop: 'bigDecimalFirstWeight',
          label: this.$t('freightRule.dt.bigDecimalFirstWeight'),
          minWidth: 100,
          edit: { 'name': 'input' }
        },
        {
          prop: 'bigDecimalFirstWeightFreight',
          label: this.$t('freightRule.dt.bigDecimalFirstWeightFreight'),
          minWidth: 100,
          edit: { 'name': 'input' }
        }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        name: [{ required: true, message: this.$t('freightRule.msg.name'), trigger: 'blur' }],
        provinceId: [{
          required: true,
          message: this.$t('freightRule.msg.provinceCodeList'),
          trigger: 'blur'
        }],
        partnerId: [{ required: true, message: this.$t('freightRule.msg.cpCode'), trigger: 'blur' }],
        bigDecimalContinuation: [{
          required: true,
          message: this.$t('freightRule.msg.continuation'),
          trigger: 'blur'
        },
        {
          pattern: /(^[1-9][0-9]*\.[0-9]{1,2}$)|(^[1-9]([0-9])*$)|(^0\.[0-9]{1,2}$)/,
          message: '只能输入大于0的正整数或两位小数!'
        }
        ],
        bigDecimalContinuationFreight: [{
          required: true,
          message: this.$t('freightRule.msg.continuationFreight'),
          trigger: 'blur'
        },
        {
          pattern: /(^[1-9][0-9]*\.[0-9]{1,2}$)|(^[1-9]([0-9])*$)|(^0\.[0-9]{1,2}$)/,
          message: '只能输入大于0的正整数或两位小数!'
        }
        ]
      }
      //
      this.diaFormInfo.subTableInfo.rules = {
        bigDecimalFirstWeight: [{
          required: true,
          message: this.$t('freightRule.msg.firstWeight'),
          trigger: 'blur'
        }, {
          pattern: /(^[1-9][0-9]*\.[0-9]{1,2}$)|(^[1-9]([0-9])*$)|(^0\.[0-9]{1,2}$)/,
          message: '只能输入大于0的正整数或两位小数!'
        }],
        bigDecimalFirstWeightFreight: [{
          required: true,
          message: this.$t('freightRule.msg.firstWeightFreight'),
          trigger: 'blur'
        }, {
          pattern: /(^[1-9][0-9]*\.[0-9]{1,2}$)|(^[1-9]([0-9])*$)|(^0\.[0-9]{1,2}$)/,
          message: '只能输入大于0的正整数或两位小数!'
        }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        cityId: null,
        continuationFreight: null,
        bigDecimalContinuationFreight: null,
        name: null,
        provinceId: null,
        continuation: null,
        bigDecimalContinuation: null,
        partnerId: null,
        areaId: null,
        remark: null,
        dtList: []
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
