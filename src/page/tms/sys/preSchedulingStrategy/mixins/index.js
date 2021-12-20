import risize from '@/layout/Home/mixin/RisizeTable'
import notification from './notification'
export default {
  mixins: [risize, notification],
  data() {
    return {
      // 主页面的top表单
      topForm: {
        ref: null, // 对外提供的可操作表单的持有对象
        fieldList: null, // 配置的表单字段集合
        data: { // 表单绑定的数据Model
          ruleCode: null,
          ruleName: null,
          isEnable: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px' // 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        deliveryTypeList: [], // 配送模式
        isDefaultList: [], // 是否默认
        transportTypeList: [], // 运输类型
        businessTypeList: [], // 业务类型
        dispatchModelList: [], // 派单模式
        enableList: [] // 是否启用
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '200', // 默认操作按钮列宽度
          btList: [
            { slot: true, icon: '', event: 'slotEvent' }
          ]
        }
      },
      // 全屏弹框配置
      fullDialogInfo: {
        visible: false,
        title: '',
        type: '',
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', btLoading: false, show: true }
        ],
        diaFormInfo: {
          ref: null, // 对外提供的可操作配置表单的持有对象
          data: {
            ruleCode: null,
            ruleName: null,
            isEnable: null,
            isDefault: null
          }, // 绑定的数据Model对象
          fieldList: [], // 配置的表单字段集合
          rules: {}, // 配置的表单字段校验规则集合
          viewFlag: '',
          addDtBtnShow: true
        },
        diaTableInfo: {
          ref: null,
          data: [],
          deleteIds: [],
          fieldList: [],
          topBtn: {},
          handle: null
        }
      },
      // 弹框配置
      dialogInfo: {
        ref: null,
        visible: false,
        flag: '',
        title: '',
        type: '',
        width: '210mm',
        rules: {},
        data: {
          ownerName: null,
          businessType: null,
          businessTypeName: null,
          senderName: null,
          receiverName: null,
          transportType: null,
          transportTypeName: null,
          orderPsType: null,
          orderPsTypeName: null,
          orderSendType: null,
          orderSendTypeName: null,
          carrierName: null
        },
        fieldList: [],
        closeBtn: { label: '', type: '', icon: '', event: 'closeDetail', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'closeDetail', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'saveDetail', btLoading: false, show: true }
        ]
      }
    }
  },
  mounted() {
    this.initTopFormColumns()// 初始化查询界面配置数据
    this.rulesInit()// 初始化diaFormInfo表单字段校验规则
    this.initDialogField()
  },
  methods: {
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化top表单
      this.topForm.fieldList = [
        { label: this.$t('preSchedulingStrategy.ruleCode'), value: 'ruleCode', type: 'input' },
        { label: this.$t('preSchedulingStrategy.ruleName'), value: 'ruleName', type: 'input' },
        { label: this.$t('preSchedulingStrategy.isEnable'), value: 'isEnable', type: 'select', list: 'enableList' },
        { label: '', value: 'sys', type: 'slot' }// 查询 重置 展开收起表单
      ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 },
        { prop: 'ruleCode', label: this.$t('preSchedulingStrategy.ruleCode'), minWidth: 100 },
        { prop: 'ruleName', label: this.$t('preSchedulingStrategy.ruleName'), minWidth: 100 },
        { prop: 'isEnableName', label: this.$t('preSchedulingStrategy.isEnable'), minWidth: 100 },
        { prop: 'isDefaultName', label: this.$t('preSchedulingStrategy.isDefault'), minWidth: 100 },
        { prop: 'remark', label: this.$t('preSchedulingStrategy.remark'), minWidth: 100 },
        { prop: 'creatorName', label: this.$t('preSchedulingStrategy.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('preSchedulingStrategy.createTime'), minWidth: 100 },
        { prop: 'updaterName', label: this.$t('preSchedulingStrategy.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('preSchedulingStrategy.updateTime'), minWidth: 100 }
      ]
    },

    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.fullDialogInfo.diaFormInfo.viewFlag = 'viewFlag'
      this.fullDialogInfo.diaFormInfo.addDtBtnShow = false
      this.fullDialogInfo.diaTableInfo.handle = null
      this.fullDialogInfo.diaFormInfo.fieldList = [
        { label: this.$t('preSchedulingStrategy.ruleCode'), value: 'ruleCode', type: 'input', readonly: true },
        { label: this.$t('preSchedulingStrategy.ruleName'), value: 'ruleName', type: 'input', readonly: true },
        { label: this.$t('preSchedulingStrategy.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', disabled: true },
        { label: this.$t('preSchedulingStrategy.isDefault'), value: 'isDefault', type: 'select', list: 'isDefaultList', disabled: true }
      ]
      this.fullDialogInfo.diaTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 },
        { prop: 'ownerName', label: this.$t('preSchedulingStrategy.ownerName'), minWidth: 100 },
        { prop: 'businessTypeName', label: this.$t('preSchedulingStrategy.businessType'), minWidth: 100 },
        { prop: 'senderName', label: this.$t('preSchedulingStrategy.senderName'), minWidth: 100 },
        { prop: 'receiverName', label: this.$t('preSchedulingStrategy.receiverName'), minWidth: 100 },
        { prop: 'transportTypeName', label: this.$t('preSchedulingStrategy.transportType'), minWidth: 100 },
        { prop: 'orderPsTypeName', label: this.$t('preSchedulingStrategy.orderPsType'), minWidth: 100 },
        { prop: 'orderSendTypeName', label: this.$t('preSchedulingStrategy.orderSendType'), minWidth: 100 },
        { prop: 'carrierName', label: this.$t('preSchedulingStrategy.carrierName'), minWidth: 100 }
      ]
    },

    initDialogField() {
      this.dialogInfo.fieldList = [
        { label: this.$t('preSchedulingStrategy.ownerName'), value: 'ownerName', type: 'slot' },
        { label: this.$t('preSchedulingStrategy.businessType'), value: 'businessType', link: 'businessTypeName', type: 'selectLink', list: 'businessTypeList', event: 'businessTypeChange' },
        { label: this.$t('preSchedulingStrategy.senderName'), value: 'senderName', type: 'slot' },
        { label: this.$t('preSchedulingStrategy.receiverName'), value: 'receiverName', type: 'slot' },
        { label: this.$t('preSchedulingStrategy.transportType'), value: 'transportType', link: 'transportTypeName', type: 'selectLink', list: 'transportTypeList' },
        { label: this.$t('preSchedulingStrategy.orderPsType'), value: 'orderPsType', link: 'orderPsTypeName', type: 'selectLink', list: 'deliveryTypeList' },
        { label: this.$t('preSchedulingStrategy.orderSendType'), value: 'orderSendType', link: 'orderSendTypeName', type: 'selectLink', list: 'dispatchModelList' },
        { label: this.$t('preSchedulingStrategy.carrierName'), value: 'carrierName', type: 'slot' }
      ]
    },

    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.fullDialogInfo.diaFormInfo.data = {}
      this.fullDialogInfo.diaTableInfo.data = []
      this.diaFormInfoFieldList()
    },

    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.fullDialogInfo.diaFormInfo.viewFlag = ''
      this.fullDialogInfo.diaFormInfo.addDtBtnShow = true
      this.fullDialogInfo.diaTableInfo.handle = null
      this.fullDialogInfo.diaFormInfo.fieldList = [
        { label: this.$t('preSchedulingStrategy.ruleCode'), value: 'ruleCode', type: 'input', disabled: true },
        { label: this.$t('preSchedulingStrategy.ruleName'), value: 'ruleName', type: 'input' },
        { label: this.$t('preSchedulingStrategy.isEnable'), value: 'isEnable', type: 'select', list: 'enableList' },
        { label: this.$t('preSchedulingStrategy.isDefault'), value: 'isDefault', type: 'select', list: 'isDefaultList' }
      ]
      this.fullDialogInfo.diaTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 },
        { prop: 'ownerName', label: this.$t('preSchedulingStrategy.ownerName'), minWidth: 100 },
        { prop: 'businessTypeName', label: this.$t('preSchedulingStrategy.businessType'), minWidth: 100 },
        { prop: 'senderName', label: this.$t('preSchedulingStrategy.senderName'), minWidth: 100 },
        { prop: 'receiverName', label: this.$t('preSchedulingStrategy.receiverName'), minWidth: 100 },
        { prop: 'transportTypeName', label: this.$t('preSchedulingStrategy.transportType'), minWidth: 100 },
        { prop: 'orderPsTypeName', label: this.$t('preSchedulingStrategy.orderPsType'), minWidth: 100 },
        { prop: 'orderSendTypeName', label: this.$t('preSchedulingStrategy.orderSendType'), minWidth: 100 },
        { prop: 'carrierName', label: this.$t('preSchedulingStrategy.carrierName'), minWidth: 100 },
        { label: this.$t('table.actions'), prop: 'operation', width: 200, type: 'slot', fixed: 'right' }
      ]
    },

    diaFormInfoFieldList() {
      this.fullDialogInfo.diaFormInfo.viewFlag = ''
      this.fullDialogInfo.diaFormInfo.addDtBtnShow = true
      this.fullDialogInfo.diaTableInfo.handle = null
      this.fullDialogInfo.diaFormInfo.fieldList = [
        { label: this.$t('preSchedulingStrategy.ruleCode'), value: 'ruleCode', type: 'input' },
        { label: this.$t('preSchedulingStrategy.ruleName'), value: 'ruleName', type: 'input' },
        { label: this.$t('preSchedulingStrategy.isEnable'), value: 'isEnable', type: 'select', list: 'enableList' },
        { label: this.$t('preSchedulingStrategy.isDefault'), value: 'isDefault', type: 'select', list: 'isDefaultList' }
      ]
      this.fullDialogInfo.diaTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 },
        { prop: 'ownerName', label: this.$t('preSchedulingStrategy.ownerName'), minWidth: 100 },
        { prop: 'businessTypeName', label: this.$t('preSchedulingStrategy.businessType'), minWidth: 100 },
        { prop: 'senderName', label: this.$t('preSchedulingStrategy.senderName'), minWidth: 100 },
        { prop: 'receiverName', label: this.$t('preSchedulingStrategy.receiverName'), minWidth: 100 },
        { prop: 'transportTypeName', label: this.$t('preSchedulingStrategy.transportType'), minWidth: 100 },
        { prop: 'orderPsTypeName', label: this.$t('preSchedulingStrategy.orderPsType'), minWidth: 100 },
        { prop: 'orderSendTypeName', label: this.$t('preSchedulingStrategy.orderSendType'), minWidth: 100 },
        { prop: 'carrierName', label: this.$t('preSchedulingStrategy.carrierName'), minWidth: 100 },
        { label: this.$t('table.actions'), prop: 'operation', width: 200, type: 'slot', fixed: 'right' }
      ]
    },

    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.fullDialogInfo.diaFormInfo.rules = {
        ruleCode: [{ required: true, message: this.$t('preSchedulingStrategy.msg.ruleCode'), trigger: 'blur' }],
        ruleName: [{ required: true, message: this.$t('preSchedulingStrategy.msg.ruleName'), trigger: 'blur' }],
        isEnable: [{ required: true, message: this.$t('preSchedulingStrategy.msg.isEnable'), trigger: 'blur' }],
        isDefault: [{ required: true, message: this.$t('preSchedulingStrategy.msg.isDefault'), trigger: 'blur' }]
      }
      this.dialogInfo.rules = {
        // 要打开的 调试先不打开 todo
        ownerName: [{ required: true, message: this.$t('preSchedulingStrategy.msg.owner'), trigger: 'blur' }],
        transportType: [{ required: true, message: this.$t('preSchedulingStrategy.msg.shipType'), trigger: 'blur' }],
        orderSendType: [{ required: true, message: this.$t('preSchedulingStrategy.msg.dispatchMode'), trigger: 'blur' }],
        carrierName: [{ required: true, message: this.$t('preSchedulingStrategy.msg.carrier'), trigger: 'blur' }]
      }
    },

    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.fullDialogInfo.diaFormInfo.data = {
        ruleName: null,
        isEnable: null,
        ruleCode: null,
        isDefault: null
      }
      this.fullDialogInfo.diaTableInfo.data = []
      this.dialogInfo.data = {
        ownerName: null,
        businessType: null,
        businessTypeName: null,
        senderName: null,
        receiverName: null,
        transportType: null,
        transportTypeName: null,
        orderPsType: null,
        orderPsTypeName: null,
        orderSendType: null,
        orderSendTypeName: null,
        carrierName: null
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
