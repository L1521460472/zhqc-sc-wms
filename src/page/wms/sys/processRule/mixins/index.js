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
          ruleName: null,
          whAreaId: null,
          salesStorehouseCode: null,
          ownerCode: null,
          isEnable: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        businessTypeList: [],
        isDefaultList: [],
        isVirtualList: [],
        processTypeList: [],
        executionTypeList: [],
        sourceSystemList: [],
        isEnableList: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        topBtn: {},
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '250', // 默认操作按钮列宽度
          btList: [
            { label: this.$t('table.view'), type: 'primary', icon: '', event: 'view', show: true, disabled: this.$hasPerm('view') },
            { slot: true, icon: '', event: 'slotEvent' }
          ]
        }
      },
      // 弹框配置
      fullDialogInfo: {
        title: '',
        visible: false,
        type: '',
        varSup: false,
        varCus: false,
        varStore: false,
        varProvince: true,
        varCity: true,
        varArea: true,
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', show: true }
        ],
        topForm1: {
          ref: null, // 对外提供的可操作表单的持有对象
          fieldList: null, // 配置的表单字段集合
          data: {}, // 表单绑定的数据Model
          rules: {}, // 配置表单字段的校验规则集合
          labelWidth: '110px' // 默认表单字段label宽度
        },
        tableInfo: {
          fieldList: null, // 表格列集合
          data: [{ businessType: 1 }],
          topBtn: {
            type: 'primary',
            show: false,
            icon: 'el-icon-folder-add',
            disabled: false,
            loading: false,
            event: 'openAddDtPage',
            label: this.$t('processRule.addButtom')
          },
          handle: { // 表格自定义按钮
            fixed: 'right',
            label: this.$t('table.actions'), // 操作列名
            width: '200', // 默认操作按钮列宽度
            btList: [
              { label: this.$t('table.edit'), type: 'success', icon: '', event: 'editDt', show: true, disabled: false },
              { label: this.$t('table.delete'), type: 'danger', icon: '', event: 'deleteDt', show: true, disabled: false }
            ]
          }
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
          businessType: null,
          sourceSystem: null,
          orderType: null,
          runType: null,
          isVirtual: null,
          processType: null,
          isDefault: null,
          remark: null
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
    this.initTopForm()
    this.initTableInfo()
    this.rulesInit()
    this.initDialogField()
  },
  methods: {
    // 初始化查询表单
    initTopForm() {
      this.topForm.fieldList = [
        { label: this.$t('processRule.ruleName'), value: 'ruleName', type: 'input' },
        { label: this.$t('processRule.whAreaId'), value: 'whAreaId', type: 'slot' },
        { label: this.$t('processRule.ownerCode'), value: 'ownerCode', type: 'slot' },
        { label: this.$t('processRule.isEnable'), value: 'isEnable', type: 'select', list: 'isEnableList' },
        { label: '', value: 'sys', type: 'slot' }
      ]
    },
    // 初始化主页面列表
    initTableInfo() {
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'ruleName', label: this.$t('processRule.ruleName'), minWidth: 100 },
        { prop: 'whAreaName', label: this.$t('processRule.whAreaName'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('processRule.ownerName'), minWidth: 120 },
        { prop: 'isEnableName', label: this.$t('processRule.isEnableName'), minWidth: 100 },
        { prop: 'remark', label: this.$t('processRule.remark'), minWidth: 100 },
        { prop: 'creator', label: this.$t('processRule.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('processRule.createTime'), minWidth: 100 },
        { prop: 'updater', label: this.$t('processRule.updater'), minWidth: 100 }
      ]
    },
    // 查看初始化弹框列表
    initDiaFormView() {
      const disabled = this.fullDialogInfo.type === 'view'
      this.fullDialogInfo.topForm1.fieldList = [
        { label: this.$t('processRule.storehouseName'), value: 'storehouseName', type: 'input', disabled },
        { label: this.$t('processRule.whAreaId'), value: 'whAreaName', type: 'input', disabled },
        { label: this.$t('processRule.ownerCode'), value: 'ownerCode', type: 'input', list: 'statusList', disabled },
        { label: this.$t('processRule.ruleName'), value: 'ruleName', type: 'input', disabled },
        { label: this.$t('processRule.remark'), value: 'remark', type: 'input', disabled },
        { label: this.$t('processRule.isEnable'), value: 'isEnableName', type: 'input', list: 'isEnableList', disabled }
      ]
      this.fullDialogInfo.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'businessTypeName', label: this.$t('processRule.businessTypeName'), minWidth: 100 },
        { prop: 'sourceSystemName', label: this.$t('processRule.sourceSystemName'), minWidth: 100 },
        { prop: 'orderTypeName', label: this.$t('processRule.orderTypeName'), minWidth: 120 },
        { prop: 'runTypeName', label: this.$t('processRule.runTypeName'), minWidth: 100 },
        { prop: 'isVirtualName', label: this.$t('processRule.isVirtualName'), minWidth: 100 },
        { prop: 'processTypeName', label: this.$t('processRule.processTypeName'), minWidth: 100 },
        { prop: 'isDefaultName', label: this.$t('processRule.isDefaultName'), minWidth: 100 },
        { prop: 'remark', label: this.$t('processRule.remark'), minWidth: 100 }
      ]
      this.fullDialogInfo.tableInfo.data = []
      this.fullDialogInfo.tableInfo.topBtn.show = false
      this.fullDialogInfo.tableInfo.handle.btList[0].show = false
      this.fullDialogInfo.tableInfo.handle.btList[1].show = false
    },
    // 新增初始化弹框列表
    initDiaFormAdd() {
      this.initEmpty()
      // const disabled = this.fullDialogInfo.type === 'add'
      this.fullDialogInfo.topForm1.fieldList = [
        { label: this.$t('processRule.storehouseName'), value: 'storehouseName', type: 'input', disabled: true },
        { label: this.$t('processRule.whAreaId'), value: 'whAreaId', link: 'consigneeName', type: 'slot' },
        { label: this.$t('processRule.ownerName'), value: 'ownerName', type: 'input', disabled: true },
        { label: this.$t('processRule.ruleName'), value: 'ruleName', type: 'input' },
        { label: this.$t('processRule.remark'), value: 'remark', type: 'input' },
        { label: this.$t('processRule.isEnable'), value: 'isEnable', type: 'select', list: 'isEnableList' }
      ]
      this.fullDialogInfo.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'businessTypeName', label: this.$t('processRule.businessTypeName'), minWidth: 100 },
        { prop: 'sourceSystemName', label: this.$t('processRule.sourceSystemName'), minWidth: 100 },
        { prop: 'orderTypeName', label: this.$t('processRule.orderTypeName'), minWidth: 120 },
        { prop: 'runTypeName', label: this.$t('processRule.runTypeName'), minWidth: 100 },
        { prop: 'isVirtualName', label: this.$t('processRule.isVirtualName'), minWidth: 100 },
        { prop: 'processTypeName', label: this.$t('processRule.processTypeName'), minWidth: 100 },
        { prop: 'isDefaultName', label: this.$t('processRule.isDefaultName'), minWidth: 100 },
        { prop: 'remark', label: this.$t('processRule.remark'), minWidth: 100 }
      ]
      this.fullDialogInfo.tableInfo.data = []
      this.fullDialogInfo.tableInfo.topBtn.show = true
      this.fullDialogInfo.tableInfo.handle.btList[0].show = true
      this.fullDialogInfo.tableInfo.handle.btList[1].show = true
    },
    // 编辑初始化弹框列表
    initDiaFormEdit() {
      this.initEmpty()
      // const disabled = this.fullDialogInfo.type === 'edit'
      this.fullDialogInfo.topForm1.fieldList = [
        { label: this.$t('processRule.storehouseName'), value: 'storehouseName', type: 'input', disabled: true },
        { label: this.$t('processRule.whAreaId'), value: 'whAreaId', link: 'consigneeName', type: 'slot' },
        { label: this.$t('processRule.ownerName'), value: 'ownerName', type: 'input', disabled: true },
        { label: this.$t('processRule.ruleName'), value: 'ruleName', type: 'input' },
        { label: this.$t('processRule.remark'), value: 'remark', type: 'input' },
        { label: this.$t('processRule.isEnable'), value: 'isEnable', type: 'select', list: 'isEnableList' }
      ]
      this.fullDialogInfo.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'businessTypeName', label: this.$t('processRule.businessTypeName'), minWidth: 100 },
        { prop: 'sourceSystemName', label: this.$t('processRule.sourceSystemName'), minWidth: 100 },
        { prop: 'orderTypeName', label: this.$t('processRule.orderTypeName'), minWidth: 120 },
        { prop: 'runTypeName', label: this.$t('processRule.runTypeName'), minWidth: 100 },
        { prop: 'isVirtualName', label: this.$t('processRule.isVirtualName'), minWidth: 100 },
        { prop: 'processTypeName', label: this.$t('processRule.processTypeName'), minWidth: 100 },
        { prop: 'isDefaultName', label: this.$t('processRule.isDefaultName'), minWidth: 100 },
        { prop: 'remark', label: this.$t('processRule.remark'), minWidth: 100 }
      ]
      this.fullDialogInfo.tableInfo.topBtn.show = true
      this.fullDialogInfo.tableInfo.handle.btList[0].show = true
      this.fullDialogInfo.tableInfo.handle.btList[1].show = true
    },
    // 新增编辑置空
    initEmpty() {
      this.fullDialogInfo.topForm1.data = {
        storehouseName: null,
        whAreaId: null,
        ownerCode: null,
        ownerName: null,
        ruleName: null,
        remark: null,
        isEnable: 1
      }
    },
    // 明细新增配置
    initDialogField() {
      this.dialogInfo.fieldList = [
        { label: this.$t('processRule.businessType'), value: 'businessType', type: 'selectLink', link: 'businessTypeName', list: 'businessTypeList', event: 'businessTypeChange' },
        { label: this.$t('processRule.sourceSystem'), value: 'sourceSystem', type: 'selectLink', link: 'sourceSystemName', list: 'sourceSystemList' },
        { label: this.$t('processRule.orderType'), value: 'orderType', type: 'selectLink', link: 'orderTypeName', list: 'orderTypeList' },
        { label: this.$t('processRule.runType'), value: 'runType', type: 'selectLink', link: 'runTypeName', list: 'executionTypeList' },
        { label: this.$t('processRule.isVirtual'), value: 'isVirtual', type: 'selectLink', link: 'isVirtualName', list: 'isVirtualList' },
        { label: this.$t('processRule.processType'), value: 'processType', type: 'selectLink', link: 'processTypeName', list: 'processTypeList' },
        { label: this.$t('processRule.isDefault'), value: 'isDefault', type: 'selectLink', link: 'isDefaultName', list: 'isDefaultList' },
        { label: this.$t('processRule.remark'), value: 'remark', type: 'input' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.fullDialogInfo.topForm1.rules = {
        storehouseName: [{ required: true, message: this.$t('processRule.msg.storehouseName'), trigger: 'blur' }],
        ruleName: [{ required: true, message: this.$t('processRule.msg.ruleName'), trigger: 'blur' }],
        isEnable: [{ required: true, message: this.$t('processRule.msg.isEnable'), trigger: 'blur' }]
      }
      this.dialogInfo.rules = {
        businessType: [{ required: true, message: this.$t('processRule.msg.businessType'), trigger: 'blur' }],
        runType: [{ required: true, message: this.$t('processRule.msg.executionType'), trigger: 'blur' }],
        processType: [{ required: true, message: this.$t('processRule.msg.processType'), trigger: 'blur' }],
        isDefault: [{ required: true, message: this.$t('processRule.msg.isDefault'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.dialogInfo.data = {
        businessType: null,
        sourceSystem: null,
        orderType: null,
        runType: null,
        isVirtual: null,
        processType: null,
        isDefault: null,
        remark: null
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
