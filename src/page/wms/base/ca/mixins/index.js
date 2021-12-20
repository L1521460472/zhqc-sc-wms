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
          whName: null,
          carrierWhName: null,
          origCode: null,
          origSys: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px' // 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        enableList: [],
        sysCarrierList: [],
        origSysList: [],
        pushTypeList: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '150', // 默认操作按钮列宽度
          btList: [// 添加操作按钮
            // 默认查看按钮
            { label: this.$t('table.view'), type: 'primary', icon: '', event: 'openViewPage', show: true }, // event值为notification.js中定义的方法名
            // 默认修改按钮
            { label: this.$t('table.edit'), type: 'success', icon: '', event: 'openEditPage', show: true } // event值为notification.js中定义的方法名
          ]
        }
      },
      // 弹窗表单
      diaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        pushConfig: {
          ref: null,
          data: {
            proWareHousing: 0,
            returnWareHousing: 0,
            transfersWareHousing: 0,
            otherWareHousing: 0,
            sellOut: 0,
            allotOut: 0,
            returnOut: 0,
            otherOut: 0
          },
          fieldList: [],
          rules: {}
          // labelWidth: "160"
        },
        dtTableInfo: {
          ref: null,
          dtList: [],
          fieldList: [],
          handle: { // 表格自定义按钮
            fixed: 'right',
            label: this.$t('table.actions'), // 操作列名
            width: '160', // 默认操作按钮列宽度
            btList: [// 添加操作按钮
              // 默认删除按钮
              { label: this.$t('table.delete'), type: 'danger', icon: '', event: 'deleteDt', show: false, disabled: false }, // event值为notification.js中定义的方法名
              // 默认修改按钮
              { label: this.$t('table.edit'), type: 'success', icon: '', event: 'openEditPageDt', show: false } // event值为notification.js中定义的方法名
            ]
          }
        }
      },

      // 明细表单
      diaFormInfoDt: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {} // 配置的表单字段校验规则集合
      }

    }
  },
  mounted() {
    this.collapsableForm()
    this.initTopFormColumns()// 初始化查询界面配置数据
    this.rulesInit()// 初始化diaFormInfo表单字段校验规则
  },
  methods: {
    collapsableFormMore() {
      // 初始化top表单
      this.topForm.fieldList = [
        { label: this.$t('ca.whName'), value: 'whName', type: 'input' },
        { label: this.$t('ca.carrierWhName'), value: 'carrierWhName', type: 'input' },
        { label: this.$t('ca.origCode'), value: 'origCode', type: 'input' },
        { label: this.$t('ca.origSys'), value: 'origSys', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }
      ]
      this.$nextTick(() => {
        this.layoutHeight()
      })
    },
    collapsableForm() {
      // 初始化top表单
      this.topForm.fieldList = [
        { label: this.$t('ca.whName'), value: 'whName', type: 'input' },
        { label: this.$t('ca.carrierWhName'), value: 'carrierWhName', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }
      ]
      this.$nextTick(() => {
        this.layoutHeight()
      })
    },
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { prop: 'whName', label: this.$t('ca.whName'), minWidth: 100 },
        { prop: 'whAreaName', label: this.$t('ca.whAreaName'), minWidth: 100 },
        { prop: 'origSys', label: this.$t('ca.origSys'), minWidth: 100 },
        { prop: 'origCode', label: this.$t('ca.origCode'), minWidth: 100 },
        { prop: 'oldWhCode', label: this.$t('ca.oldWhCode'), minWidth: 100 },
        { prop: 'thirdWhCode', label: this.$t('ca.thirdWhCode'), minWidth: 100 },
        { prop: 'pushTypeName', label: this.$t('ca.pushType'), minWidth: 70 },
        { prop: 'origWhName', label: this.$t('ca.origWhName'), minWidth: 100 },
        { prop: 'creator', label: this.$t('ca.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('ca.createTime'), minWidth: 100 },
        { prop: 'updater', label: this.$t('ca.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('ca.updateTime'), minWidth: 100 }
      ]

      // 初始化明细列表
      this.diaFormInfo.dtTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'attrCode', label: this.$t('ca.dt.attrCode'), minWidth: 100 },
        { prop: 'attrName', label: this.$t('ca.dt.attrName'), minWidth: 100 },
        { prop: 'attrValue', label: this.$t('ca.dt.attrValue'), minWidth: 100 },
        { prop: 'categoryCode', label: this.$t('ca.dt.categoryCode'), minWidth: 100 },
        { prop: 'categoryName', label: this.$t('ca.dt.categoryName'), minWidth: 100 },
        { prop: 'dataType', label: this.$t('ca.dt.dataType'), minWidth: 100 },
        { prop: 'isEnableName', label: this.$t('ca.dt.isEnable'), minWidth: 100 },
        { prop: 'seqNo', label: this.$t('ca.dt.seqNo'), minWidth: 100 },
        { prop: 'creator', label: this.$t('ca.dt.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('ca.dt.createTime'), minWidth: 100 },
        { prop: 'updater', label: this.$t('ca.dt.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('ca.dt.updateTime'), minWidth: 100 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.diaFormInfo.fieldList = [
        // {label: this.$t('ca.whName'), value: "whName", type: "input", disabled: true},
        // { label: this.$t('ca.whName'), value: 'whName', type: 'input', disabled: true },
        { label: this.$t('ca.whAreaName'), value: 'whName', type: 'input', disabled: true },
        // {label: this.$t('ca.origSys'), value: "origSys", type: "input", disabled: true},
        { label: this.$t('ca.origSys'), value: 'origSys', type: 'select', list: 'origSysList', clearable: false, disabled: true },
        { label: this.$t('ca.origCode'), value: 'origCode', type: 'input', disabled: true },
        { label: this.$t('ca.oldWhCode'), value: 'oldWhCode', type: 'input', disabled: true },
        { label: this.$t('ca.origWhName'), value: 'origWhName', type: 'input', disabled: true },
        { label: this.$t('ca.carrierName'), value: 'carrierName', type: 'input', disabled: true },
        // {label: this.$t('ca.carrierName'), value: "carrierName", type: "input", disabled: true},
        // {label: this.$t('ca.pushType'), value: "pushType", type: "input", disabled: true},
        { label: this.$t('ca.pushType'), value: 'pushType', type: 'select', list: 'pushTypeList', clearable: false, disabled: true },
        { label: this.$t('ca.carrierSysCode'), value: 'carrierSysCode', type: 'select', list: 'sysCarrierList', clearable: false, disabled: true },
        { label: this.$t('ca.thirdWhCode'), value: 'thirdWhCode', type: 'input', disabled: true },
        { label: this.$t('ca.carrierMonthcardNo'), value: 'carrierMonthcardNo', type: 'input', disabled: true },
        { label: this.$t('ca.siteId'), value: 'siteId', type: 'input', disabled: true }

      ]
      this.diaFormInfo.pushConfig.fieldList = [
        { label: '采购入库', value: 'proWareHousing', type: 'select', list: 'pushTypeList', clearable: false, disabled: true },
        { label: '退货入库', value: 'returnWareHousing', type: 'select', list: 'pushTypeList', clearable: false, disabled: true },
        { label: '调拨入库', value: 'transfersWareHousing', type: 'select', list: 'pushTypeList', clearable: false, disabled: true },
        { label: '其他入库', value: 'otherWareHousing', type: 'select', list: 'pushTypeList', clearable: false, disabled: true },
        { label: '销售出库', value: 'sellOut', type: 'select', list: 'pushTypeList', clearable: false, disabled: true },
        { label: '调拨出库', value: 'allotOut', type: 'select', list: 'pushTypeList', clearable: false, disabled: true },
        { label: '退货出库', value: 'returnOut', type: 'select', list: 'pushTypeList', clearable: false, disabled: true },
        { label: '其他出库', value: 'otherOut', type: 'select', list: 'pushTypeList', clearable: false, disabled: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      // this.$set(this.diaFormInfo.data, 'isSystem', 1);
      // this.$set(this.diaFormInfo.data, 'isEnable', 1);

      this.diaFormInfo.fieldList = [
        // {label: this.$t('ca.whName'), value: "whName", type: "input"},
        { label: this.$t('ca.whAreaId'), value: 'whAreaId', link: 'whAreaName', type: 'slot' },
        { label: this.$t('ca.origSys'), value: 'origSys', type: 'select', list: 'origSysList', clearable: false, disabled: false },
        // {label: this.$t('ca.isSystem'), value: "isSystem", type: "select",list:'whetherList',clearable:false},
        // {label: this.$t('ca.isEnable'), value: "isEnable", type: "select",list:'enableList',clearable:false},
        { label: this.$t('ca.origCode'), value: 'origCode', type: 'input' },
        { label: this.$t('ca.oldWhCode'), value: 'oldWhCode', type: 'input' },
        { label: this.$t('ca.origWhName'), value: 'origWhName', type: 'input' },
        { label: this.$t('ca.carrierName'), value: 'carrierId', type: 'slot' },
        // {label: this.$t('ca.carrierId'), value: "carrierId", type: "input"},
        // {label: this.$t('ca.carrierName'), value: "carrierName", type: "input"},
        // {label: this.$t('ca.pushType'), value: "pushType", type: "input"},
        { label: this.$t('ca.pushType'), value: 'pushType', type: 'select', list: 'pushTypeList', clearable: false },
        { label: this.$t('ca.carrierSysCode'), value: 'carrierSysCode', type: 'select', list: 'sysCarrierList' },
        { label: this.$t('ca.thirdWhCode'), value: 'thirdWhCode', type: 'input' },
        { label: this.$t('ca.carrierMonthcardNo'), value: 'carrierMonthcardNo', type: 'input' },
        { label: this.$t('ca.siteId'), value: 'siteId', type: 'input' }
      ]
      this.diaFormInfo.pushConfig.fieldList = [
        { label: '采购入库', value: 'proWareHousing', type: 'select', list: 'pushTypeList', clearable: false },
        { label: '退货入库', value: 'returnWareHousing', type: 'select', list: 'pushTypeList', clearable: false },
        { label: '调拨入库', value: 'transfersWareHousing', type: 'select', list: 'pushTypeList', clearable: false },
        { label: '其他入库', value: 'otherWareHousing', type: 'select', list: 'pushTypeList', clearable: false },
        { label: '销售出库', value: 'sellOut', type: 'select', list: 'pushTypeList', clearable: false },
        { label: '调拨出库', value: 'allotOut', type: 'select', list: 'pushTypeList', clearable: false },
        { label: '退货出库', value: 'returnOut', type: 'select', list: 'pushTypeList', clearable: false },
        { label: '其他出库', value: 'otherOut', type: 'select', list: 'pushTypeList', clearable: false }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.diaFormInfo.fieldList = [
        // {label: this.$t('ca.whName'), value: "whName", type: "slot"},

        { label: this.$t('ca.whAreaId'), value: 'whAreaId', link: 'whAreaName', type: 'slot', disabled: true },
        { label: this.$t('ca.origSys'), value: 'origSys', type: 'select', list: 'origSysList', clearable: false, disabled: false },
        // {label: this.$t('ca.isSystem'), value: "isSystem", type: "select",list:'whetherList',clearable:false},
        // {label: this.$t('ca.isEnable'), value: "isEnable", type: "select",list:'enableList',clearable:false},
        { label: this.$t('ca.origCode'), value: 'origCode', type: 'input' },
        { label: this.$t('ca.oldWhCode'), value: 'oldWhCode', type: 'input' },
        { label: this.$t('ca.origWhName'), value: 'origWhName', type: 'input' },
        { label: this.$t('ca.carrierName'), value: 'carrierId', type: 'slot' },
        // {label: this.$t('ca.pushType'), value: "pushType", type: "input"},
        { label: this.$t('ca.pushType'), value: 'pushType', type: 'select', list: 'pushTypeList', clearable: false },
        { label: this.$t('ca.carrierSysCode'), value: 'carrierSysCode', type: 'select', list: 'sysCarrierList' },
        { label: this.$t('ca.thirdWhCode'), value: 'thirdWhCode', type: 'input' },
        { label: this.$t('ca.carrierMonthcardNo'), value: 'carrierMonthcardNo', type: 'input' },
        { label: this.$t('ca.siteId'), value: 'siteId', type: 'input' }
      ]
      this.diaFormInfo.pushConfig.fieldList = [
        { label: '采购入库', value: 'proWareHousing', type: 'select', list: 'pushTypeList', clearable: false },
        { label: '退货入库', value: 'returnWareHousing', type: 'select', list: 'pushTypeList', clearable: false },
        { label: '调拨入库', value: 'transfersWareHousing', type: 'select', list: 'pushTypeList', clearable: false },
        { label: '其他入库', value: 'otherWareHousing', type: 'select', list: 'pushTypeList', clearable: false },
        { label: '销售出库', value: 'sellOut', type: 'select', list: 'pushTypeList', clearable: false },
        { label: '调拨出库', value: 'allotOut', type: 'select', list: 'pushTypeList', clearable: false },
        { label: '退货出库', value: 'returnOut', type: 'select', list: 'pushTypeList', clearable: false },
        { label: '其他出库', value: 'otherOut', type: 'select', list: 'pushTypeList', clearable: false }
      ]
    },

    // 明细添加页面
    diaFormInfoAddFieldDtList() {
      this.diaFormInfoDt.fieldList = [
        { label: this.$t('ca.dt.attrCode'), value: 'attrCode', type: 'input' },
        { label: this.$t('ca.dt.attrName'), value: 'attrName', type: 'input' },
        { label: this.$t('ca.dt.attrValue'), value: 'attrValue', type: 'input' },
        { label: this.$t('ca.dt.dataType'), value: 'dataType', type: 'input' },
        { label: this.$t('ca.dt.categoryCode'), value: 'categoryCode', type: 'input' },
        { label: this.$t('ca.dt.categoryName'), value: 'categoryName', type: 'input' },
        { label: this.$t('ca.dt.seqNo'), value: 'seqNo', type: 'number' },
        { label: this.$t('ca.dt.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', clearable: false },
        { label: this.$t('ca.dt.remark'), value: 'remark', type: 'textarea' }
      ]
    },

    // 明细编辑页面
    diaFormInfoEditFieldDtList() {
      this.diaFormInfoDt.fieldList = [
        { label: this.$t('ca.dt.attrCode'), value: 'attrCode', type: 'input' },
        { label: this.$t('ca.dt.attrName'), value: 'attrName', type: 'input' },
        { label: this.$t('ca.dt.attrValue'), value: 'attrValue', type: 'input' },
        { label: this.$t('ca.dt.dataType'), value: 'dataType', type: 'input' },
        { label: this.$t('ca.dt.categoryCode'), value: 'categoryCode', type: 'input' },
        { label: this.$t('ca.dt.categoryName'), value: 'categoryName', type: 'input' },
        { label: this.$t('ca.dt.seqNo'), value: 'seqNo', type: 'number' },
        { label: this.$t('ca.dt.isEnable'), value: 'isEnable', type: 'select', list: 'enableList', clearable: false },
        { label: this.$t('ca.dt.remark'), value: 'remark', type: 'textarea' }
      ]
    },

    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        whAreaId: [{ required: true, message: this.$t('ca.msg.whName'), trigger: 'blur' }],
        whName: [{ required: true, message: this.$t('ca.msg.whName'), trigger: 'blur' }],
        origSys: [{ required: true, message: this.$t('ca.msg.origSys'), trigger: 'blur' }],
        carrierSysCode: [{ required: true, message: this.$t('ca.msg.carrierSysCode'), trigger: 'blur' }],
        pushType: [{ required: true, message: this.$t('ca.msg.pushType'), trigger: 'blur' }],
        origCode: [{ required: true, message: this.$t('ca.msg.origCode'), trigger: 'blur' }]
        // dicTypeCode:[{required: true, message: this.$t('ca.msg.dicTypeCode'), trigger: 'blur'}],
        // dicTypeName:[{required: true, message: this.$t('ca.msg.dicTypeName'), trigger: 'blur'}],
        // isSystem:[{required: true, message: this.$t('ca.msg.isSystem'), trigger: 'blur'}],
        // isEnable:[{required: true, message: this.$t('ca.msg.isEnable'), trigger: 'blur'}],
      }

      this.diaFormInfoDt.rules = {
        attrCode: [{ required: true, message: this.$t('ca.dt.msg.attrCode'), trigger: 'change' }]
        // attrValue:[{required: true, message: this.$t('ca.msg.dt.dicName'), trigger: 'blur'}],
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        whName: null,
        origSys: 'HD_OMS',
        creatorName: null,
        dicTypeCode: null,
        dicTypeDesc: null
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
