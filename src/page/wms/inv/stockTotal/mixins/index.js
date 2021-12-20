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
          companyCode: null,
          whId: null,
          skuId: null,
          sysSkuCode: null,
          skuCode: null,
          stockQty: null,
          usableQty: null,
          allotQty: null,
          frozenQty: null,
          badQty: null,
          remark: null,
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
      },
      // 主页面表格
      tableInfo: {
        fieldList: null// 表格列集合
        /* handle: {//表格自定义按钮
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
        { label: this.$t('stockTotal.sysSkuCode'), value: 'sysSkuCode', type: 'input' },
        { label: this.$t('stockTotal.skuCode'), value: 'skuCode', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }
      ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列

        { prop: 'ownerCode', label: this.$t('stockTotal.ownerCode'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('stockTotal.ownerName'), minWidth: 140 },
        { prop: 'whAreaName', label: '销售仓', minWidth: 140 },

        { prop: 'supplierCode', label: this.$t('stockTotal.supplierCode'), minWidth: 100 },
        { prop: 'supplierShortName', label: this.$t('stockTotal.supplierShortName'), minWidth: 100 },

        { prop: 'sysSkuCode', label: this.$t('stockTotal.sysSkuCode'), minWidth: 140 },
        { prop: 'skuCode', label: this.$t('stockTotal.skuCode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('stockTotal.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('stockTotal.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('stockTotal.mainUnit'), minWidth: 100 },

        { prop: 'stockQty', label: this.$t('stockTotal.stockQty'), minWidth: 100 },
        { prop: 'usableQty', label: this.$t('stockTotal.usableQty'), minWidth: 100 },
        { prop: 'allotQty', label: this.$t('stockTotal.allotQty'), minWidth: 100 },
        { prop: 'frozenQty', label: this.$t('stockTotal.frozenQty'), minWidth: 100 },
        { prop: 'badQty', label: this.$t('stockTotal.badQty'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('操作时间'), minWidth: 100 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('stockTotal.sysSkuCode'), value: 'sysSkuCode', type: 'input', readonly: true },
        { label: this.$t('stockTotal.skuCode'), value: 'skuCode', type: 'input', readonly: true },
        { label: this.$t('stockTotal.skuName'), value: 'skuName', type: 'input', readonly: true },
        { label: this.$t('stockTotal.spec'), value: 'spec', type: 'input', readonly: true },
        { label: this.$t('stockTotal.mainUnit'), value: 'mainUnit', type: 'input', readonly: true },
        { label: this.$t('stockTotal.stockQty'), value: 'stockQty', type: 'input', readonly: true },
        { label: this.$t('stockTotal.usableQty'), value: 'usableQty', type: 'input', readonly: true },
        { label: this.$t('stockTotal.allotQty'), value: 'allotQty', type: 'input', readonly: true },
        { label: this.$t('stockTotal.frozenQty'), value: 'frozenQty', type: 'input', readonly: true },
        { label: this.$t('stockTotal.badQty'), value: 'badQty', type: 'input', readonly: true },
        { label: this.$t('操作时间'), value: 'updateTime', type: 'input', readonly: true }

      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('stockTotal.sysSkuCode'), value: 'sysSkuCode', type: 'input' },
        { label: this.$t('stockTotal.skuCode'), value: 'skuCode', type: 'input' },
        { label: this.$t('stockTotal.stockQty'), value: 'stockQty', type: 'input' },
        { label: this.$t('stockTotal.usableQty'), value: 'usableQty', type: 'input' },
        { label: this.$t('stockTotal.allotQty'), value: 'allotQty', type: 'input' },
        { label: this.$t('stockTotal.frozenQty'), value: 'frozenQty', type: 'input' },
        { label: this.$t('stockTotal.badQty'), value: 'badQty', type: 'input' },
        { label: this.$t('操作时间'), value: 'updateTime', type: 'input' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('stockTotal.companyCode'), value: 'companyCode', type: 'input' },
        { label: this.$t('stockTotal.sysSkuCode'), value: 'sysSkuCode', type: 'input' },
        { label: this.$t('stockTotal.skuCode'), value: 'skuCode', type: 'input' },
        { label: this.$t('stockTotal.stockQty'), value: 'stockQty', type: 'input' },
        { label: this.$t('stockTotal.usableQty'), value: 'usableQty', type: 'input' },
        { label: this.$t('stockTotal.allotQty'), value: 'allotQty', type: 'input' },
        { label: this.$t('stockTotal.frozenQty'), value: 'frozenQty', type: 'input' },
        { label: this.$t('stockTotal.badQty'), value: 'badQty', type: 'input' },
        { label: this.$t('操作时间'), value: 'updateTime', type: 'input' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        creator: [{ required: true, message: this.$t('stockTotal.msg.creator'), trigger: 'blur' }],
        createTime: [{ required: true, message: this.$t('stockTotal.msg.createTime'), trigger: 'blur' }],
        usableQty: [{ required: true, message: this.$t('stockTotal.msg.usableQty'), trigger: 'blur' }],
        skuId: [{ required: true, message: this.$t('stockTotal.msg.skuId'), trigger: 'blur' }],
        badQty: [{ required: true, message: this.$t('stockTotal.msg.badQty'), trigger: 'blur' }],
        remark: [{ required: true, message: this.$t('stockTotal.msg.remark'), trigger: 'blur' }],
        updater: [{ required: true, message: this.$t('stockTotal.msg.updater'), trigger: 'blur' }],
        optimistic: [{ required: true, message: this.$t('stockTotal.msg.optimistic'), trigger: 'blur' }],
        updateTime: [{ required: true, message: this.$t('stockTotal.msg.updateTime'), trigger: 'blur' }],
        whId: [{ required: true, message: this.$t('stockTotal.msg.whId'), trigger: 'blur' }],
        stockQty: [{ required: true, message: this.$t('stockTotal.msg.stockQty'), trigger: 'blur' }],
        companyCode: [{ required: true, message: this.$t('stockTotal.msg.companyCode'), trigger: 'blur' }],
        sysSkuCode: [{ required: true, message: this.$t('stockTotal.msg.sysSkuCode'), trigger: 'blur' }],
        allotQty: [{ required: true, message: this.$t('stockTotal.msg.allotQty'), trigger: 'blur' }],
        frozenQty: [{ required: true, message: this.$t('stockTotal.msg.frozenQty'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        creator: null,
        createTime: null,
        usableQty: null,
        skuId: null,
        badQty: null,
        remark: null,
        updater: null,
        optimistic: null,
        updateTime: null,
        whId: null,
        stockQty: null,
        companyCode: null,
        sysSkuCode: null,
        allotQty: null,
        frozenQty: null,
        skuCode: null
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
