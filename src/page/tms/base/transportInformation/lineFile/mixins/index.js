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
          lineCode: null,
          lineType: null,
          transportType: null,
          sourceSystem: null,
          ownerName: null,
          startName: null,
          isEnable: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px' // 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        countryList: [],
        provinceList: [],
        cityList: [],
        areaList: [],
        targetList: [],
        lineTypeList: [],
        transportTypeList: [],
        ownerList: [],
        workTypeList: [
        ],
        sourceSystemList: [],
        isEnableList: []
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
      // 弹窗表单
      diaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {

        }, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}// 配置的表单字段校验规则集合
      },
      // 嵌套 弹窗表单
      nestDiaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}// 配置的表单字段校验规则集合
      },
      // 列表信息
      popTableInfo: {
        fieldList: null, // 表格列集合
        handle: null,
        data: []
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
        { label: this.$t('lineFile.lineCode'), value: 'lineCode', type: 'input' },
        { label: this.$t('lineFile.lineType'), value: 'lineType', type: 'select', list: 'lineTypeList' },
        { label: this.$t('lineFile.sourceSystem'), value: 'sourceSystem', type: 'select', list: 'sourceSystemList' },
        { label: this.$t('lineFile.ownerName'), value: 'ownerCode', link: 'ownerName', type: 'selectLink', list: 'ownerList' },
        { label: this.$t('lineFile.startName'), value: 'startName', type: 'slot' },
        { label: this.$t('lineFile.transportType'), value: 'transportType', type: 'select', list: 'transportTypeList' },
        { label: this.$t('lineFile.isEnable'), value: 'isEnable', type: 'select', list: 'isEnableList' },
        { label: '', value: 'sys', type: 'slot' }// 查询 重置 展开收起表单
      ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'lineCode', label: this.$t('lineFile.lineCode'), minWidth: 100 },
        { prop: 'lineTypeName', label: this.$t('lineFile.lineType'), minWidth: 100 },
        { prop: 'sourceSystem', label: this.$t('lineFile.sourceSystem'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('lineFile.ownerName'), minWidth: 100 },
        { prop: 'startName', label: this.$t('lineFile.startName'), minWidth: 100 },
        { prop: 'receiveProviceName', label: this.$t('lineFile.receiveProviceName'), minWidth: 100 },
        { prop: 'receiveCityName', label: this.$t('lineFile.receiveCityName'), minWidth: 100 },
        { prop: 'receiveAreaName', label: this.$t('lineFile.receiveAreaName'), minWidth: 100 },
        { prop: 'transportTypeName', label: this.$t('lineFile.transportType'), minWidth: 100 },
        { prop: 'lineRemark', label: this.$t('lineFile.lineRemark'), minWidth: 100 },
        { prop: 'remark', label: this.$t('lineFile.remark'), minWidth: 100 },
        { prop: 'isEnableName', label: this.$t('lineFile.isEnable'), minWidth: 100 },
        { prop: 'creatorName', label: this.$t('lineFile.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('lineFile.createTime'), minWidth: 100 },
        { prop: 'updaterName', label: this.$t('lineFile.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('lineFile.updateTime'), minWidth: 100 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('lineFile.lineCode'), value: 'lineCode', type: 'input', readonly: true, disabled: true },
        { label: this.$t('lineFile.lineType'), value: 'lineTypeName', type: 'input', readonly: true, disabled: true },
        { label: this.$t('lineFile.sourceSystem'), value: 'sourceSystem', type: 'input', readonly: true, disabled: true },
        { label: this.$t('lineFile.sourceCode'), value: 'sourceCode', type: 'input', readonly: true, disabled: true },
        { label: this.$t('lineFile.ownerName'), value: 'ownerName', type: 'input', readonly: true, disabled: true },
        { label: this.$t('lineFile.startName'), value: 'startName', type: 'input', readonly: true, disabled: true },
        { value: 'receiveProviceName', label: this.$t('lineFile.receiveProviceName'), type: 'input', readonly: true, disabled: true },
        { value: 'receiveCityName', label: this.$t('lineFile.receiveCityName'), type: 'input', readonly: true, disabled: true },
        { value: 'receiveAreaName', label: this.$t('lineFile.receiveAreaName'), type: 'input', readonly: true, disabled: true },
        { label: this.$t('lineFile.transportType'), value: 'transportTypeName', type: 'input', readonly: true, disabled: true },
        { label: this.$t('lineFile.lineRemark'), value: 'lineRemark', type: 'slot', readonly: true, disabled: true },
        { label: this.$t('lineFile.isEnable'), value: 'isEnableName', type: 'input', readonly: true, disabled: true },
        { label: this.$t('lineFile.remark'), value: 'remark', type: 'input', readonly: true, disabled: true }

      ]

      this.popTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'opDesc', label: this.$t('lineFile.lineRemark'), minWidth: 100 },
        { prop: 'opTypeName', label: this.$t('lineFile.lineRemark'), minWidth: 100 },
        { prop: 'startName', label: this.$t('lineFile.startName'), minWidth: 100 },
        { prop: 'endName', label: this.$t('lineFile.endName'), minWidth: 100 },
        { prop: 'transportTypeName', label: this.$t('lineFile.transportTypeName'), minWidth: 100 },
        { prop: 'remark', label: this.$t('lineFile.remark'), minWidth: 100 }
      ]
      this.popTableInfo.handle = null
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.diaFormInfo.data = {
        lineCode: null,
        lineType: null,
        sourceSystem: null,
        sourceCode: null,
        ownerName: null,
        startCode: null,
        startName: null,
        receiveProviceId: null,
        receiveProviceName: null,
        receiveCityId: null,
        receiveCityName: null,
        receiveAreaId: null,
        receiveAreaName: null,
        transportType: null,
        lineRemark: null,
        isEnable: null,
        remark: null
      }
      this.diaFormInfo.fieldList = [
        { label: this.$t('lineFile.lineCode'), value: 'lineCode', type: 'input' },
        { label: this.$t('lineFile.lineType'), value: 'lineType', link: 'lineTypeName', type: 'selectLink', list: 'lineTypeList', event: 'lineTypeChange' },
        { label: this.$t('lineFile.sourceSystem'), value: 'sourceSystem', type: 'select', list: 'sourceSystemList' },
        { label: this.$t('lineFile.sourceCode'), value: 'sourceCode', type: 'input' },
        { label: this.$t('lineFile.ownerName'), value: 'ownerCode', link: 'ownerName', type: 'selectLink', list: 'ownerList' },
        { label: this.$t('lineFile.startName'), value: 'startName', type: 'slot' },
        { value: 'receiveProviceId', linkId: '', link: 'receiveProviceName', label: this.$t('lineFile.receiveProviceName'), type: 'slot', list: 'provinceList' },
        { value: 'receiveCityId', linkId: 'receiveProviceId', link: 'receiveCityName', label: this.$t('lineFile.receiveCityName'), type: 'slot', list: 'cityList' },
        { value: 'receiveAreaId', linkId: 'receiveCityId', link: 'receiveAreaName', label: this.$t('lineFile.receiveAreaName'), type: 'slot', list: 'areaList' },
        { label: this.$t('lineFile.transportType'), value: 'transportType', type: 'select', list: 'transportTypeList' },
        { label: this.$t('lineFile.lineRemark'), value: 'lineRemark', type: 'slot', readonly: true, disabled: true },
        { label: this.$t('lineFile.isEnable'), value: 'isEnable', type: 'select', list: 'isEnableList' },
        { label: this.$t('lineFile.remark'), value: 'remark', type: 'input' }
      ]

      this.popTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'opDesc', label: this.$t('lineFile.opDesc'), minWidth: 100 },
        { prop: 'opTypeName', label: this.$t('lineFile.opTypeName'), minWidth: 100 },
        { prop: 'startName', label: this.$t('lineFile.startName'), minWidth: 100 },
        { prop: 'endName', label: this.$t('lineFile.endName'), minWidth: 100 },
        { prop: 'transportTypeName', label: this.$t('lineFile.transportTypeName'), minWidth: 100 },
        { prop: 'remark', label: this.$t('lineFile.remark'), minWidth: 100 }
      ]

      this.popTableInfo.data = []
      this.popTableInfo.handle = { // 表格自定义按钮
        fixed: 'right',
        label: this.$t('table.actions'), // 操作列名
        width: '150', // 默认操作按钮列宽度
        btList: [// 添加操作按钮
          { label: '编辑', type: 'success', icon: '', event: 'editItem', show: true, disabled: false },
          { label: '删除', type: 'danger', icon: '', event: 'deleteItem', show: true, disabled: false } // event值为notification.js中定义的方法名
        ]
      }
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('lineFile.lineCode'), value: 'lineCode', type: 'input', disabled: true },
        { label: this.$t('lineFile.lineType'), value: 'lineType', type: 'select', list: 'lineTypeList' },
        { label: this.$t('lineFile.sourceSystem'), value: 'sourceSystem', type: 'select', list: 'sourceSystemList' },
        { label: this.$t('lineFile.sourceCode'), value: 'sourceCode', type: 'input' },
        { label: this.$t('lineFile.ownerName'), value: 'ownerCode', link: 'ownerName', type: 'selectLink', list: 'ownerList' },
        { label: this.$t('lineFile.startName'), value: 'startName', type: 'slot' },
        { value: 'receiveProviceId', linkId: '', link: 'receiveProviceName', label: this.$t('lineFile.receiveProviceName'), type: 'slot', list: 'provinceList' },
        { value: 'receiveCityId', linkId: 'receiveProviceId', link: 'receiveCityName', label: this.$t('lineFile.receiveCityName'), type: 'slot', list: 'cityList' },
        { value: 'receiveAreaId', linkId: 'receiveCityId', link: 'receiveAreaName', label: this.$t('lineFile.receiveAreaName'), type: 'slot', list: 'areaList' },
        { label: this.$t('lineFile.transportType'), value: 'transportType', type: 'select', list: 'transportTypeList' },
        { label: this.$t('lineFile.lineRemark'), value: 'lineRemark', type: 'slot', readonly: true, disabled: true },
        { label: this.$t('lineFile.isEnable'), value: 'isEnable', type: 'select', list: 'isEnableList' },
        { label: this.$t('lineFile.remark'), value: 'remark', type: 'input' }
      ]
      this.popTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'opDesc', label: this.$t('lineFile.opDesc'), minWidth: 100 },
        { prop: 'opTypeName', label: this.$t('lineFile.opTypeName'), minWidth: 100 },
        { prop: 'startName', label: this.$t('lineFile.startName'), minWidth: 100 },
        { prop: 'endName', label: this.$t('lineFile.endName'), minWidth: 100 },
        { prop: 'transportTypeName', label: this.$t('lineFile.transportTypeName'), minWidth: 100 },
        { prop: 'remark', label: this.$t('lineFile.remark'), minWidth: 100 }
      ]
      this.popTableInfo.handle = { // 表格自定义按钮
        fixed: 'right',
        label: this.$t('table.actions'), // 操作列名
        width: '150', // 默认操作按钮列宽度
        btList: [// 添加操作按钮
          { label: '编辑', type: 'success', icon: '', event: 'editItem', show: true, disabled: false },
          { label: '删除', type: 'danger', icon: '', event: 'deleteItem', show: true, disabled: false } // event值为notification.js中定义的方法名
        ]
      }
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        lineCode: [{ required: true, message: this.$t('lineFile.msg.lineCode'), trigger: 'blur' }],
        lineType: [{ required: true, message: this.$t('lineFile.msg.lineType'), trigger: 'blur' }],
        ownerName: [{ required: true, message: this.$t('lineFile.msg.ownerName'), trigger: 'blur' }],
        ownerCode: [{ required: true, message: this.$t('lineFile.msg.ownerName'), trigger: 'blur' }],
        startName: [{ required: true, message: this.$t('lineFile.msg.startName'), trigger: 'blur' }],
        startCode: [{ required: true, message: this.$t('lineFile.msg.startName'), trigger: 'blur' }],
        receiveProviceName: [{ required: true, message: this.$t('lineFile.msg.receiveProviceName'), trigger: 'blur' }],
        receiveProviceId: [{ required: true, message: this.$t('lineFile.msg.receiveProviceName'), trigger: 'blur' }],
        transportType: [{ required: true, message: this.$t('lineFile.msg.transportType'), trigger: 'blur' }],
        isEnable: [{ required: true, message: this.$t('lineFile.msg.isEnable'), trigger: 'blur' }]
        // lineRemark: [{ required: true, message: this.$t('lineFile.msg.lineRemark'), trigger: 'blur' }]

      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        creator: null,
        ownerName: null,
        createTime: null,
        isEnable: null,
        sourceSystem: null,
        ownerCode: null,
        remark: null,
        updater: null,
        lineCode: null,
        updateTime: null,
        lineType: null,
        transportType: null,
        lineRemark: null,
        sourceCode: null
      }
    },
    nestFormInfoAddFieldList() {
      this.nestDiaFormInfo.data = {
        opTypeName: null,
        opDesc: null,
        startName: null,
        startCode: null,
        endName: null,
        endCode: null,
        transportType: null,
        remark: null
      }
      this.nestDiaFormInfo.fieldList = [
        { label: '作业类型', value: 'opType', link: 'opTypeName', type: 'selectLink', list: 'workTypeList' },
        { label: '作业顺序', value: 'opDesc', type: 'number', min: 0 },
        // { label: '起始地', value: 'startCode', link: 'startName', type: 'selectLink', list: 'targetList' },
        { label: this.$t('lineFile.startName'), value: 'startName', type: 'slot' },
        // { label: '目的地', value: 'endCode', link: 'endName', type: 'selectLink', list: 'targetList' },
        { label: '目的地', value: 'endName', type: 'slot' },
        { label: '分段运输方式', value: 'transportType', link: 'transportTypeName', type: 'selectLink', list: 'transportTypeList' },
        { label: '备注', value: 'remark', type: 'input' }
      ]
      this.nestDiaFormInfo.rules = {
        opTypeName: [{ required: true, message: '请选择作业类型', trigger: 'change' }],
        opType: [{ required: true, message: '请选择作业类型', trigger: 'change' }],
        opDesc: [{ required: true, message: '请输入作业顺序', trigger: 'blur' }],
        startName: [{ required: true, message: '请输入起始地', trigger: 'change' }],
        startCode: [{ required: true, message: '请输入起始地', trigger: 'change' }],
        endName: [{ required: true, message: '请输入目的地', trigger: 'change' }],
        endCode: [{ required: true, message: '请输入目的地', trigger: 'change' }],
        transportType: [{ required: true, message: '请选择分段运输方式', trigger: 'change' }],
        transportTypeName: [{ required: true, message: '请选择分段运输方式', trigger: 'change' }]
      }
    },
    nestFormInfoEditFieldList() {
      this.nestDiaFormInfo.fieldList = [
        { label: '作业类型', value: 'opType', link: 'opTypeName', type: 'selectLink', list: 'workTypeList' },
        { label: '作业顺序', value: 'opDesc', type: 'number', min: 0 },
        // { label: '起始地', value: 'startCode', link: 'startName', type: 'selectLink', list: 'targetList' },
        { label: this.$t('lineFile.startName'), value: 'startName', type: 'slot' },
        // { label: '目的地', value: 'endCode', link: 'endName', type: 'selectLink', list: 'targetList' },
        { label: '目的地', value: 'endName', type: 'slot' },
        { label: '分段运输方式', value: 'transportType', link: 'transportTypeName', type: 'selectLink', list: 'transportTypeList' },
        { label: '备注', value: 'remark', type: 'input' }
      ]
      this.nestDiaFormInfo.rules = {
        opTypeName: [{ required: true, message: '请选择作业类型', trigger: 'change' }],
        opType: [{ required: true, message: '请选择作业类型', trigger: 'change' }],
        opDesc: [{ required: true, message: '请输入作业顺序', trigger: 'blur' }],
        startName: [{ required: true, message: '请输入起始地', trigger: 'change' }],
        startCode: [{ required: true, message: '请输入起始地', trigger: 'change' }],
        endName: [{ required: true, message: '请输入目的地', trigger: 'change' }],
        endCode: [{ required: true, message: '请输入目的地', trigger: 'change' }],
        transportTypeName: [{ required: true, message: '请选择分段运输方式', trigger: 'change' }]
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
