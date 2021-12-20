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
          id: null,
          companyCode: null,
          whId: null,
          whName: null,
          businessNo: null,
          businessType: null,
          stockChangeType: null,
          formLotCode: null,
          formBoxCode: null,
          toLotCode: null,
          toBoxCode: null,
          batchNo: null,
          skuId: null,
          skuCode: null,
          ownerSkuCode: null,
          barcode: null,
          ownerCode: null,
          supplierCode: null,
          toQty: null,
          toBadQty: null,
          remark: null,
          operator: null,
          operatTime: null,
          creator: null,
          createTime: null,
          updater: null,
          updateTime: null,
          optimistic: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        businessTypeList: [],
        stockChangeTypeList: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: null
      /*  handle: {//表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'),//操作列名
          width: '210',//默认操作按钮列宽度
          btList: [//添加操作按钮
            //默认查看按钮
            {label:this.$t('table.view'), type: 'primary', icon: '', event: 'openViewPage', show: true,disabled:this.$hasPerm('view')},//event值为notification.js中定义的方法名
            //默认修改按钮
            {label:this.$t('table.edit'), type: 'success', icon: '', event: 'openEditPage', show: true,disabled:this.$hasPerm('edit')},//event值为notification.js中定义的方法名
            //默认删除按钮
            {label:this.$t('table.delete'), type: 'danger', icon: '', event: 'deleteData', show: true,disabled:this.$hasPerm('delete')},//event值为notification.js中定义的方法名
          ]
        }*/
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
        { label: this.$t('stockFlow.businessNo'), value: 'businessNo', type: 'input' },
        { label: this.$t('stockFlow.businessType'), value: 'businessType', type: 'select', list: 'businessTypeList' },
        { label: this.$t('stockFlow.stockChangeType'), value: 'stockChangeType', type: 'select', list: 'stockChangeTypeList' },
        { label: this.$t('stockFlow.formLotCode'), value: 'formLotCode', type: 'input' },
        { label: this.$t('stockFlow.toLotCode'), value: 'toLotCode', type: 'input' },
        { label: this.$t('stockFlow.batchNo'), value: 'batchNo', type: 'input' },
        { label: this.$t('stockFlow.skuCode'), value: 'skuCode', type: 'input' },
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
        { prop: 'businessNo', label: this.$t('stockFlow.businessNo'), minWidth: 100 },
        { prop: 'businessTypeName', label: this.$t('stockFlow.businessTypeName'), minWidth: 100 },
        { prop: 'stockChangeTypeName', label: this.$t('stockFlow.stockChangeTypeName'), minWidth: 100 },
        { prop: 'formLotCode', label: this.$t('stockFlow.formLotCode'), minWidth: 100 },
        // {prop:"formBoxCode", label:this.$t('stockFlow.formBoxCode'), minWidth:100},
        { prop: 'toLotCode', label: this.$t('stockFlow.toLotCode'), minWidth: 100 },
        // {prop:"toBoxCode", label:this.$t('stockFlow.toBoxCode'), minWidth:100},
        { prop: 'batchNo', label: this.$t('stockFlow.batchNo'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('stockFlow.skuCode'), minWidth: 100 },
        { prop: 'ownerSkuCode', label: this.$t('stockFlow.ownerSkuCode'), minWidth: 100 },
        // {prop:"barcode", label:this.$t('stockFlow.barcode'), minWidth:100},
        { prop: 'toQty', label: this.$t('stockFlow.toQty'), minWidth: 100 },
        { prop: 'toBadQty', label: this.$t('stockFlow.toBadQty'), minWidth: 100 },
        { prop: 'operator', label: this.$t('stockFlow.operator'), minWidth: 100 },
        { prop: 'operatTime', label: this.$t('stockFlow.operatTime'), minWidth: 100 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('stockFlow.id'), value: 'id', type: 'input', readonly: true },
        { label: this.$t('stockFlow.companyCode'), value: 'companyCode', type: 'input', readonly: true },
        { label: this.$t('stockFlow.whId'), value: 'whId', type: 'input', readonly: true },
        { label: this.$t('stockFlow.whName'), value: 'whName', type: 'input', readonly: true },
        { label: this.$t('stockFlow.businessNo'), value: 'businessNo', type: 'input', readonly: true },
        { label: this.$t('stockFlow.businessType'), value: 'businessType', type: 'input', readonly: true },
        { label: this.$t('stockFlow.stockChangeType'), value: 'stockChangeType', type: 'input', readonly: true },
        { label: this.$t('stockFlow.formLotCode'), value: 'formLotCode', type: 'input', readonly: true },
        { label: this.$t('stockFlow.formBoxCode'), value: 'formBoxCode', type: 'input', readonly: true },
        { label: this.$t('stockFlow.toLotCode'), value: 'toLotCode', type: 'input', readonly: true },
        { label: this.$t('stockFlow.toBoxCode'), value: 'toBoxCode', type: 'input', readonly: true },
        { label: this.$t('stockFlow.batchNo'), value: 'batchNo', type: 'input', readonly: true },
        { label: this.$t('stockFlow.skuId'), value: 'skuId', type: 'input', readonly: true },
        { label: this.$t('stockFlow.skuCode'), value: 'skuCode', type: 'input', readonly: true },
        // {label: this.$t('stockFlow.ownerSkuCode'), value: "ownerSkuCode", type: "input",readonly:true},
        { label: this.$t('stockFlow.barcode'), value: 'barcode', type: 'input', readonly: true },
        { label: this.$t('stockFlow.ownerCode'), value: 'ownerCode', type: 'input', readonly: true },
        { label: this.$t('stockFlow.supplierCode'), value: 'supplierCode', type: 'input', readonly: true },
        { label: this.$t('stockFlow.toQty'), value: 'toQty', type: 'input', readonly: true },
        { label: this.$t('stockFlow.toBadQty'), value: 'toBadQty', type: 'input', readonly: true },
        { label: this.$t('stockFlow.remark'), value: 'remark', type: 'input', readonly: true },
        { label: this.$t('stockFlow.operator'), value: 'operator', type: 'input', readonly: true },
        { label: this.$t('stockFlow.operatTime'), value: 'operatTime', type: 'input', readonly: true },
        { label: this.$t('stockFlow.creator'), value: 'creator', type: 'input', readonly: true },
        { label: this.$t('stockFlow.createTime'), value: 'createTime', type: 'input', readonly: true },
        { label: this.$t('stockFlow.updater'), value: 'updater', type: 'input', readonly: true },
        { label: this.$t('stockFlow.updateTime'), value: 'updateTime', type: 'input', readonly: true },
        { label: this.$t('stockFlow.optimistic'), value: 'optimistic', type: 'input', readonly: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('stockFlow.id'), value: 'id', type: 'input' },
        { label: this.$t('stockFlow.companyCode'), value: 'companyCode', type: 'input' },
        { label: this.$t('stockFlow.whId'), value: 'whId', type: 'input' },
        { label: this.$t('stockFlow.whName'), value: 'whName', type: 'input' },
        { label: this.$t('stockFlow.businessNo'), value: 'businessNo', type: 'input' },
        { label: this.$t('stockFlow.businessType'), value: 'businessType', type: 'input' },
        { label: this.$t('stockFlow.stockChangeType'), value: 'stockChangeType', type: 'input' },
        { label: this.$t('stockFlow.formLotCode'), value: 'formLotCode', type: 'input' },
        { label: this.$t('stockFlow.formBoxCode'), value: 'formBoxCode', type: 'input' },
        { label: this.$t('stockFlow.toLotCode'), value: 'toLotCode', type: 'input' },
        { label: this.$t('stockFlow.toBoxCode'), value: 'toBoxCode', type: 'input' },
        { label: this.$t('stockFlow.batchNo'), value: 'batchNo', type: 'input' },
        { label: this.$t('stockFlow.skuId'), value: 'skuId', type: 'input' },
        { label: this.$t('stockFlow.skuCode'), value: 'skuCode', type: 'input' },
        { label: this.$t('stockFlow.ownerSkuCode'), value: 'ownerSkuCode', type: 'input' },
        { label: this.$t('stockFlow.barcode'), value: 'barcode', type: 'input' },
        { label: this.$t('stockFlow.ownerCode'), value: 'ownerCode', type: 'input' },
        { label: this.$t('stockFlow.supplierCode'), value: 'supplierCode', type: 'input' },
        { label: this.$t('stockFlow.toQty'), value: 'toQty', type: 'input' },
        { label: this.$t('stockFlow.toBadQty'), value: 'toBadQty', type: 'input' },
        { label: this.$t('stockFlow.remark'), value: 'remark', type: 'input' },
        { label: this.$t('stockFlow.operator'), value: 'operator', type: 'input' },
        { label: this.$t('stockFlow.operatTime'), value: 'operatTime', type: 'input' },
        { label: this.$t('stockFlow.creator'), value: 'creator', type: 'input' },
        { label: this.$t('stockFlow.createTime'), value: 'createTime', type: 'input' },
        { label: this.$t('stockFlow.updater'), value: 'updater', type: 'input' },
        { label: this.$t('stockFlow.updateTime'), value: 'updateTime', type: 'input' },
        { label: this.$t('stockFlow.optimistic'), value: 'optimistic', type: 'input' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('stockFlow.companyCode'), value: 'companyCode', type: 'input' },
        { label: this.$t('stockFlow.whId'), value: 'whId', type: 'input' },
        { label: this.$t('stockFlow.whName'), value: 'whName', type: 'input' },
        { label: this.$t('stockFlow.businessNo'), value: 'businessNo', type: 'input' },
        { label: this.$t('stockFlow.businessType'), value: 'businessType', type: 'input' },
        { label: this.$t('stockFlow.stockChangeType'), value: 'stockChangeType', type: 'input' },
        { label: this.$t('stockFlow.formLotCode'), value: 'formLotCode', type: 'input' },
        { label: this.$t('stockFlow.formBoxCode'), value: 'formBoxCode', type: 'input' },
        { label: this.$t('stockFlow.toLotCode'), value: 'toLotCode', type: 'input' },
        { label: this.$t('stockFlow.toBoxCode'), value: 'toBoxCode', type: 'input' },
        { label: this.$t('stockFlow.batchNo'), value: 'batchNo', type: 'input' },
        { label: this.$t('stockFlow.skuId'), value: 'skuId', type: 'input' },
        { label: this.$t('stockFlow.skuCode'), value: 'skuCode', type: 'input' },
        { label: this.$t('stockFlow.ownerSkuCode'), value: 'ownerSkuCode', type: 'input' },
        { label: this.$t('stockFlow.barcode'), value: 'barcode', type: 'input' },
        { label: this.$t('stockFlow.ownerCode'), value: 'ownerCode', type: 'input' },
        { label: this.$t('stockFlow.supplierCode'), value: 'supplierCode', type: 'input' },
        { label: this.$t('stockFlow.toQty'), value: 'toQty', type: 'input' },
        { label: this.$t('stockFlow.toBadQty'), value: 'toBadQty', type: 'input' },
        { label: this.$t('stockFlow.remark'), value: 'remark', type: 'input' },
        { label: this.$t('stockFlow.operator'), value: 'operator', type: 'input' },
        { label: this.$t('stockFlow.operatTime'), value: 'operatTime', type: 'input' },
        { label: this.$t('stockFlow.creator'), value: 'creator', type: 'input' },
        { label: this.$t('stockFlow.createTime'), value: 'createTime', type: 'input' },
        { label: this.$t('stockFlow.updater'), value: 'updater', type: 'input' },
        { label: this.$t('stockFlow.updateTime'), value: 'updateTime', type: 'input' },
        { label: this.$t('stockFlow.optimistic'), value: 'optimistic', type: 'input' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        ownerCode: [{ required: true, message: this.$t('stockFlow.msg.ownerCode'), trigger: 'blur' }],
        toQty: [{ required: true, message: this.$t('stockFlow.msg.toQty'), trigger: 'blur' }],
        toLotCode: [{ required: true, message: this.$t('stockFlow.msg.toLotCode'), trigger: 'blur' }],
        businessType: [{ required: true, message: this.$t('stockFlow.msg.businessType'), trigger: 'blur' }],
        id: [{ required: true, message: this.$t('stockFlow.msg.id'), trigger: 'blur' }],
        formLotCode: [{ required: true, message: this.$t('stockFlow.msg.formLotCode'), trigger: 'blur' }],
        batchNo: [{ required: true, message: this.$t('stockFlow.msg.batchNo'), trigger: 'blur' }],
        businessNo: [{ required: true, message: this.$t('stockFlow.msg.businessNo'), trigger: 'blur' }],
        skuCode: [{ required: true, message: this.$t('stockFlow.msg.skuCode'), trigger: 'blur' }],
        supplierCode: [{ required: true, message: this.$t('stockFlow.msg.supplierCode'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        ownerCode: null,
        toQty: null,
        remark: null,
        operator: null,
        formBoxCode: null,
        updater: null,
        optimistic: null,
        whName: null,
        updateTime: null,
        toLotCode: null,
        businessType: null,
        companyCode: null,
        id: null,
        formLotCode: null,
        barcode: null,
        toBadQty: null,
        stockChangeType: null,
        creator: null,
        batchNo: null,
        createTime: null,
        businessNo: null,
        skuId: null,
        toBoxCode: null,
        whId: null,
        ownerSkuCode: null,
        operatTime: null,
        skuCode: null,
        supplierCode: null
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
