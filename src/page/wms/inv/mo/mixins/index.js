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
          moNo: null,
          moType: null,
          moStatus: null,
          ownerId: null,
          fpSkuId: null,
          sourceType: null,
          origNo: null,
          creatorName: null,
          planStartTimeBegin: null,
          planStartTimeEnd: null,
          planFinishTimeBegin: null,
          planFinishTimeEnd: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '130px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        moTypeList: [],
        moStatusList: [],
        moSourceTypeList: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '150', // 默认操作按钮列宽度
          btList: [
            // 默认查看按钮
            { label: this.$t('table.view'), type: 'primary', icon: '', event: 'openViewPage', show: true, disabled: this.$hasPerm('view') }, // event值为notification.js中定义的方法名
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
        addDtBtnShow: false,
        labelWidth: '150px',
        dtTableInfo: {
          ref: null, // 对外提供的可操作配置表单的持有对象
          data: [],
          fieldList: [],
          handle: { // 表格自定义按钮
            fixed: 'right',
            label: this.$t('table.actions'), // 操作列名
            width: '80', // 默认操作按钮列宽度
            btList: [// 添加操作按钮
              // 自定义按钮
              { slot: true, icon: '', event: 'slotEvent' }// event值为notification.js中定义的方法名
            ]
          }
        }
      },
      // 表单
      diaFormInfoDt: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}// 配置的表单字段校验规则集合
      }
    }
  },
  mounted() {
    this.collapsableForm()// 初始化表单--展开收起
    this.initTopFormColumns()// 初始化查询界面配置数据
    this.rulesInit()// 初始化diaFormInfo表单字段校验规则
  },
  methods: {

    collapsableFormMore() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('mo.moNo'), value: 'moNo', type: 'input' },
        { label: this.$t('mo.moType'), value: 'moType', type: 'select', list: 'moTypeList' },
        { label: this.$t('mo.moStatus'), value: 'moStatus', type: 'select', list: 'moStatusList' },
        { label: this.$t('mo.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('mo.fpSkuId'), value: 'fpSkuId', type: 'slot' },
        { label: this.$t('mo.sourceType'), value: 'sourceType', type: 'select', list: 'moSourceTypeList' },
        { label: this.$t('mo.origNo'), value: 'origNo', type: 'input' },
        { label: this.$t('mo.creatorName'), value: 'creatorName', type: 'input' },
        { label: this.$t('mo.planStartTimeBegin'), value: 'planStartTimeBegin', type: 'date', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd' },
        { label: this.$t('mo.planStartTimeEnd'), value: 'planStartTimeEnd', type: 'date', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd' },
        { label: this.$t('mo.planFinishTimeBegin'), value: 'planFinishTimeBegin', type: 'date', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd' },
        { label: this.$t('mo.planFinishTimeEnd'), value: 'planFinishTimeEnd', type: 'date', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('mo.moNo'), value: 'moNo', type: 'input' },
        { label: this.$t('mo.moType'), value: 'moType', type: 'select', list: 'moTypeList' },
        { label: this.$t('mo.moStatus'), value: 'moStatus', type: 'select', list: 'moStatusList' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
      this.topForm.data.ownerId = null
      this.topForm.data.fpSkuId = null
    },
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'moNo', label: this.$t('mo.moNo'), minWidth: 120 },
        { prop: 'ownerName', label: this.$t('mo.ownerName'), minWidth: 100 },
        { prop: 'moTypeName', label: this.$t('mo.moTypeName'), minWidth: 100 },
        { prop: 'moStatusName', label: this.$t('mo.moStatusName'), minWidth: 100 },
        { prop: 'sourceTypeName', label: this.$t('mo.sourceTypeName'), minWidth: 100 },
        { prop: 'origNo', label: this.$t('mo.origNo'), minWidth: 100 },
        { prop: 'fpSkuCode', label: this.$t('mo.fpSkuCode'), minWidth: 100 },
        { prop: 'fpSkuName', label: this.$t('mo.fpSkuName'), minWidth: 100 },
        { prop: 'fpSpec', label: this.$t('mo.fpSpec'), minWidth: 100 },
        { prop: 'fpMainUnit', label: this.$t('mo.fpMainUnit'), minWidth: 100 },
        { prop: 'moQty', label: this.$t('mo.moQty'), minWidth: 100 },
        { prop: 'planStartTime', label: this.$t('mo.planStartTime'), minWidth: 150 },
        { prop: 'planFinishTime', label: this.$t('mo.planFinishTime'), minWidth: 150 },
        { prop: 'remark', label: this.$t('mo.remark'), minWidth: 100 },
        { prop: 'creatorName', label: this.$t('mo.creatorName'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('mo.createTime'), minWidth: 150 },
        { prop: 'updaterName', label: this.$t('mo.updaterName'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('mo.updateTime'), minWidth: 150 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('mo.moNo'), value: 'moNo', type: 'input', disabled: true },
        { label: this.$t('mo.ownerName'), value: 'ownerName', type: 'input', disabled: true },
        { label: this.$t('mo.fpSkuCode'), value: 'fpSkuCode', type: 'input', disabled: true },
        { label: this.$t('mo.fpSkuName'), value: 'fpSkuName', type: 'input', disabled: true },
        { label: this.$t('mo.fpSpec'), value: 'fpSpec', type: 'input', disabled: true },
        { label: this.$t('mo.fpMainUnit'), value: 'fpMainUnit', type: 'input', disabled: true },
        { label: this.$t('mo.moQty'), value: 'moQty', type: 'number', min: 1, event: 'updateDtQty', disabled: true },
        { label: this.$t('mo.moType'), value: 'moType', type: 'select', list: 'moTypeList', disabled: true },
        { label: this.$t('mo.moLotCode'), value: 'moLotCode', type: 'input', disabled: true },
        { label: this.$t('mo.planStartTime'), value: 'planStartTime', type: 'date', disabled: true },
        { label: this.$t('mo.planFinishTime'), value: 'planFinishTime', type: 'date', disabled: true },
        { label: this.$t('mo.remark'), value: 'remark', type: 'input', disabled: true },
        { label: this.$t('mo.sourceType'), value: 'sourceType', type: 'select', list: 'moSourceTypeList', disabled: true },
        { label: this.$t('mo.origNo'), value: 'origNo', type: 'input', disabled: true },
        { label: this.$t('mo.actualStartTime'), value: 'actualStartTime', type: 'input', disabled: true },
        { label: this.$t('mo.actualFinishTime'), value: 'actualFinishTime', type: 'input', disabled: true },
        { label: this.$t('mo.creatorName'), value: 'creatorName', type: 'input', disabled: true },
        { label: this.$t('mo.createTime'), value: 'createTime', type: 'input', disabled: true }
      ]
      this.diaFormInfo.dtTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'bomSkuCode', label: this.$t('mo.dt.bomSkuCode'), minWidth: 100 },
        { prop: 'bomSkuName', label: this.$t('mo.dt.bomSkuName'), minWidth: 100 },
        { prop: 'bomSpec', label: this.$t('mo.dt.bomSpec'), minWidth: 100 },
        { prop: 'bomMainUnit', label: this.$t('mo.dt.bomMainUnit'), minWidth: 100 },
        { prop: 'bomQty', label: this.$t('mo.dt.bomQty'), minWidth: 100 },
        { prop: 'normQty', label: this.$t('mo.dt.normQty'), minWidth: 100 },
        { prop: 'planPickQty', label: this.$t('mo.dt.planPickQty'), minWidth: 100 },
        { prop: 'planFinishQty', label: this.$t('mo.dt.planFinishQty'), minWidth: 100 },
        { prop: 'sourceTypeName', label: this.$t('mo.dt.sourceTypeName'), minWidth: 100 }
        // {prop:"preAllotQty", label:this.$t('mo.dt.preAllotQty'), minWidth:100},
        // {prop:"allotQty", label:this.$t('mo.dt.allotQty'), minWidth:100},
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('mo.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('mo.fpSkuId'), value: 'fpSkuId', type: 'slot' },
        { label: this.$t('mo.fpSkuName'), value: 'fpSkuName', type: 'input', disabled: true },
        { label: this.$t('mo.fpSpec'), value: 'fpSpec', type: 'input', disabled: true },
        { label: this.$t('mo.fpMainUnit'), value: 'fpMainUnit', type: 'input', disabled: true },
        { label: this.$t('mo.moQty'), value: 'moQty', type: 'number', min: 1, precision: 0, event: 'updateDtQty' },
        { label: this.$t('mo.moType'), value: 'moType', type: 'select', list: 'moTypeList', event: 'updateDtQty' },
        { label: this.$t('mo.moLotCode'), value: 'moLotCode', type: 'slot' },
        { label: this.$t('mo.planStartTime'), value: 'planStartTime', type: 'date', valueFormat: 'yyyy-MM-dd' },
        { label: this.$t('mo.planFinishTime'), value: 'planFinishTime', type: 'date', valueFormat: 'yyyy-MM-dd' },
        { label: this.$t('mo.remark'), value: 'remark', type: 'input' }
      ]
      this.diaFormInfo.dtTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'bomSkuCode', label: this.$t('mo.dt.bomSkuCode'), minWidth: 100 },
        { prop: 'bomSkuName', label: this.$t('mo.dt.bomSkuName'), minWidth: 100 },
        { prop: 'bomSpec', label: this.$t('mo.dt.bomSpec'), minWidth: 100 },
        { prop: 'bomMainUnit', label: this.$t('mo.dt.bomMainUnit'), minWidth: 100 },
        { prop: 'bomQty', label: this.$t('mo.dt.bomQty'), minWidth: 100 },
        { prop: 'normQty', label: this.$t('mo.dt.normQty'), minWidth: 100 },
        { prop: 'planPickQty', label: this.$t('mo.dt.planPickQty'), minWidth: 100 },
        { prop: 'planFinishQty', label: this.$t('mo.dt.planFinishQty'), minWidth: 100 },
        { prop: 'sourceTypeName', label: this.$t('mo.dt.sourceTypeName'), minWidth: 100 }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('mo.moNo'), value: 'moNo', type: 'input', disabled: true },
        { label: this.$t('mo.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('mo.fpSkuId'), value: 'fpSkuId', type: 'slot' },
        { label: this.$t('mo.fpSkuName'), value: 'fpSkuName', type: 'input', disabled: true },
        { label: this.$t('mo.fpSpec'), value: 'fpSpec', type: 'input', disabled: true },
        { label: this.$t('mo.fpMainUnit'), value: 'fpMainUnit', type: 'input', disabled: true },
        { label: this.$t('mo.moQty'), value: 'moQty', type: 'number', min: 1, precision: 0, event: 'updateDtQty' },
        { label: this.$t('mo.moType'), value: 'moType', type: 'select', list: 'moTypeList', event: 'updateDtQty' },
        { label: this.$t('mo.moLotCode'), value: 'moLotCode', type: 'slot' },
        { label: this.$t('mo.planStartTime'), value: 'planStartTime', type: 'date', valueFormat: 'yyyy-MM-dd' },
        { label: this.$t('mo.planFinishTime'), value: 'planFinishTime', type: 'date', valueFormat: 'yyyy-MM-dd' },
        { label: this.$t('mo.remark'), value: 'remark', type: 'input' },
        { label: this.$t('mo.sourceType'), value: 'sourceType', type: 'select', list: 'moSourceTypeList', disabled: true },
        { label: this.$t('mo.origNo'), value: 'origNo', type: 'input', disabled: true },
        { label: this.$t('mo.actualStartTime'), value: 'actualStartTime', type: 'input', disabled: true },
        { label: this.$t('mo.actualFinishTime'), value: 'actualFinishTime', type: 'input', disabled: true },
        { label: this.$t('mo.creatorName'), value: 'creatorName', type: 'input', disabled: true },
        { label: this.$t('mo.createTime'), value: 'createTime', type: 'input', disabled: true }
      ]
      this.diaFormInfo.dtTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'bomSkuCode', label: this.$t('mo.dt.bomSkuCode'), minWidth: 100 },
        { prop: 'bomSkuName', label: this.$t('mo.dt.bomSkuName'), minWidth: 100 },
        { prop: 'bomSpec', label: this.$t('mo.dt.bomSpec'), minWidth: 100 },
        { prop: 'bomMainUnit', label: this.$t('mo.dt.bomMainUnit'), minWidth: 100 },
        { prop: 'bomQty', label: this.$t('mo.dt.bomQty'), minWidth: 100 },
        { prop: 'normQty', label: this.$t('mo.dt.normQty'), minWidth: 100 },
        { prop: 'planPickQty', label: this.$t('mo.dt.planPickQty'), minWidth: 100 },
        { prop: 'planFinishQty', label: this.$t('mo.dt.planFinishQty'), minWidth: 100 },
        { prop: 'sourceTypeName', label: this.$t('mo.dt.sourceTypeName'), minWidth: 100 }
      ]
    },
    // 弹窗表单
    diaFormInfoDtFieldList() {
      this.diaFormInfoDt.fieldList = [
        { label: this.$t('mo.dt.bomSkuId'), value: 'bomSkuId', type: 'slot' },
        { label: this.$t('mo.dt.bomSkuName'), value: 'bomSkuName', type: 'input', disabled: true },
        { label: this.$t('mo.dt.bomSpec'), value: 'bomSpec', type: 'input', disabled: true },
        { label: this.$t('mo.dt.bomMainUnit'), value: 'bomMainUnit', type: 'input', disabled: true },
        { label: this.$t('mo.dt.bomQty'), value: 'bomQty', type: 'number', min: 1, precision: 0 }
      ]
    },
    // 更新库位表单
    diaFormInfoLotFieldList() {
      this.diaFormInfoDt.fieldList = [
        { label: this.$t('mo.moLotCode'), value: 'moLotCode', type: 'slot' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        ownerId: [{ required: true, message: this.$t('mo.msg.ownerId'), trigger: 'blur' }],
        fpSkuId: [{ required: true, message: this.$t('mo.msg.fpSkuId'), trigger: 'blur' }],
        moQty: [{ required: true, message: this.$t('mo.msg.moQty'), trigger: 'blur' }],
        moType: [{ required: true, message: this.$t('mo.msg.moType'), trigger: 'change' }],
        moLotCode: [{ required: true, message: this.$t('mo.msg.moLotCode'), trigger: 'blur' }],
        planStartTime: [{ required: true, message: this.$t('mo.msg.planStartTime'), trigger: 'blur' }],
        planFinishTime: [{ required: true, message: this.$t('mo.msg.planFinishTime'), trigger: 'blur' }]
      }
      this.diaFormInfoDt.rules = {
        bomSkuId: [{ required: true, message: this.$t('mo.msg.dt.bomSkuId'), trigger: 'blur' }],
        bomQty: [{ required: true, message: this.$t('mo.msg.dt.bomQty'), trigger: 'blur' }],
        moLotCode: [{ required: true, message: this.$t('mo.msg.moLotCode'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        id: null,
        ownerId: null,
        fpSkuId: null,
        fpSkuName: null,
        fpSpec: null,
        fpMainUnit: null,
        moQty: 1,
        moLotCode: null,
        moType: null,
        planStartTime: null,
        planFinishTime: null,
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
