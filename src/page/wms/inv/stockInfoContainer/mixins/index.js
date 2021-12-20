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
          asnId: null,
          asnNo: null,
          lotCode: null,
          containerNo: null,
          batchNo: null,
          stockQty: null,
          usableQty: null,
          allotQty: null,
          frozenQty: null,
          badQty: null,
          instoreDate: null,
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
        { label: this.$t('stockInfoContainer.sysSkuCode'), value: 'sysSkuCode', type: 'input' },
        { label: this.$t('stockInfoContainer.skuCode'), value: 'skuCode', type: 'input' },
        { label: this.$t('stockInfoContainer.asnNo'), value: 'asnNo', type: 'input' },
        { label: this.$t('stockInfoContainer.lotCode'), value: 'lotCode', type: 'input' },
        { label: this.$t('stockInfoContainer.containerNo'), value: 'containerNo', type: 'input' },
        { label: this.$t('stockInfoContainer.batchNo'), value: 'batchNo', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }
      ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'ownerCode', label: this.$t('stockInfo.ownerCode'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('stockInfo.ownerName'), minWidth: 150 },
        { prop: 'supplierCode', label: this.$t('stockInfo.supplierCode'), minWidth: 100 },
        { prop: 'supplierShortName', label: this.$t('stockInfo.supplierShortName'), minWidth: 150 },
        { prop: 'whAreaName', label: '销售仓', minWidth: 140 },
        { prop: 'sysSkuCode', label: this.$t('stockInfoContainer.sysSkuCode'), minWidth: 150 },
        { prop: 'skuCode', label: this.$t('stockInfoContainer.skuCode'), minWidth: 150 },
        { prop: 'skuName', label: this.$t('stockInfoContainer.skuName'), minWidth: 150 },
        { prop: 'spec', label: this.$t('stockInfoContainer.spec'), minWidth: 150 },
        { prop: 'mainUnit', label: this.$t('stockInfoContainer.mainUnit'), minWidth: 150 },
        { prop: 'asnNo', label: this.$t('stockInfoContainer.asnNo'), minWidth: 150 },
        { prop: 'lotCode', label: this.$t('stockInfoContainer.lotCode'), minWidth: 100 },
        { prop: 'containerNo', label: this.$t('stockInfoContainer.containerNo'), minWidth: 100 },
        { prop: 'palletNo', label: this.$t('stockInfoContainer.palletNo'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('stockInfoContainer.batchNo'), minWidth: 100 },
        { prop: 'stockQty', label: this.$t('stockInfoContainer.stockQty'), minWidth: 100 },
        { prop: 'usableQty', label: this.$t('stockInfoContainer.usableQty'), minWidth: 100 },
        { prop: 'allotQty', label: this.$t('stockInfoContainer.allotQty'), minWidth: 100 },
        { prop: 'frozenQty', label: this.$t('stockInfoContainer.frozenQty'), minWidth: 100 },
        { prop: 'badQty', label: this.$t('stockInfoContainer.badQty'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('stockInfoContainer.instoreDate'), minWidth: 100 },
        { prop: 'opTime', label: this.$t('stockInfo.opTime'), minWidth: 150 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('stockInfoContainer.companyCode'), value: 'companyCode', type: 'input', readonly: true },
        { label: this.$t('stockInfoContainer.whId'), value: 'whId', type: 'input', readonly: true },
        { label: this.$t('stockInfoContainer.skuId'), value: 'skuId', type: 'input', readonly: true },
        { label: this.$t('stockInfoContainer.sysSkuCode'), value: 'sysSkuCode', type: 'input', readonly: true },
        { label: this.$t('stockInfoContainer.skuCode'), value: 'skuCode', type: 'input', readonly: true },
        { label: this.$t('stockInfoContainer.asnId'), value: 'asnId', type: 'input', readonly: true },
        { label: this.$t('stockInfoContainer.asnNo'), value: 'asnNo', type: 'input', readonly: true },
        { label: this.$t('stockInfoContainer.lotCode'), value: 'lotCode', type: 'input', readonly: true },
        { label: this.$t('stockInfoContainer.containerNo'), value: 'containerNo', type: 'input', readonly: true },
        { label: this.$t('stockInfoContainer.batchNo'), value: 'batchNo', type: 'input', readonly: true },
        { label: this.$t('stockInfoContainer.stockQty'), value: 'stockQty', type: 'input', readonly: true },
        { label: this.$t('stockInfoContainer.usableQty'), value: 'usableQty', type: 'input', readonly: true },
        { label: this.$t('stockInfoContainer.allotQty'), value: 'allotQty', type: 'input', readonly: true },
        { label: this.$t('stockInfoContainer.frozenQty'), value: 'frozenQty', type: 'input', readonly: true },
        { label: this.$t('stockInfoContainer.badQty'), value: 'badQty', type: 'input', readonly: true },
        { label: this.$t('stockInfoContainer.instoreDate'), value: 'instoreDate', type: 'input', readonly: true },
        { label: this.$t('stockInfoContainer.remark'), value: 'remark', type: 'input', readonly: true },
        { label: this.$t('stockInfoContainer.creator'), value: 'creator', type: 'input', readonly: true },
        { label: this.$t('stockInfoContainer.createTime'), value: 'createTime', type: 'input', readonly: true },
        { label: this.$t('stockInfoContainer.updater'), value: 'updater', type: 'input', readonly: true },
        { label: this.$t('stockInfoContainer.updateTime'), value: 'updateTime', type: 'input', readonly: true },
        { label: this.$t('stockInfoContainer.optimistic'), value: 'optimistic', type: 'input', readonly: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('stockInfoContainer.companyCode'), value: 'companyCode', type: 'input' },
        { label: this.$t('stockInfoContainer.whId'), value: 'whId', type: 'input' },
        { label: this.$t('stockInfoContainer.skuId'), value: 'skuId', type: 'input' },
        { label: this.$t('stockInfoContainer.sysSkuCode'), value: 'sysSkuCode', type: 'input' },
        { label: this.$t('stockInfoContainer.skuCode'), value: 'skuCode', type: 'input' },
        { label: this.$t('stockInfoContainer.asnId'), value: 'asnId', type: 'input' },
        { label: this.$t('stockInfoContainer.asnNo'), value: 'asnNo', type: 'input' },
        { label: this.$t('stockInfoContainer.lotCode'), value: 'lotCode', type: 'input' },
        { label: this.$t('stockInfoContainer.containerNo'), value: 'containerNo', type: 'input' },
        { label: this.$t('stockInfoContainer.batchNo'), value: 'batchNo', type: 'input' },
        { label: this.$t('stockInfoContainer.stockQty'), value: 'stockQty', type: 'input' },
        { label: this.$t('stockInfoContainer.usableQty'), value: 'usableQty', type: 'input' },
        { label: this.$t('stockInfoContainer.allotQty'), value: 'allotQty', type: 'input' },
        { label: this.$t('stockInfoContainer.frozenQty'), value: 'frozenQty', type: 'input' },
        { label: this.$t('stockInfoContainer.badQty'), value: 'badQty', type: 'input' },
        { label: this.$t('stockInfoContainer.instoreDate'), value: 'instoreDate', type: 'input' },
        { label: this.$t('stockInfoContainer.remark'), value: 'remark', type: 'input' },
        { label: this.$t('stockInfoContainer.creator'), value: 'creator', type: 'input' },
        { label: this.$t('stockInfoContainer.createTime'), value: 'createTime', type: 'input' },
        { label: this.$t('stockInfoContainer.updater'), value: 'updater', type: 'input' },
        { label: this.$t('stockInfoContainer.updateTime'), value: 'updateTime', type: 'input' },
        { label: this.$t('stockInfoContainer.optimistic'), value: 'optimistic', type: 'input' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('stockInfoContainer.companyCode'), value: 'companyCode', type: 'input' },
        { label: this.$t('stockInfoContainer.whId'), value: 'whId', type: 'input' },
        { label: this.$t('stockInfoContainer.skuId'), value: 'skuId', type: 'input' },
        { label: this.$t('stockInfoContainer.sysSkuCode'), value: 'sysSkuCode', type: 'input' },
        { label: this.$t('stockInfoContainer.skuCode'), value: 'skuCode', type: 'input' },
        { label: this.$t('stockInfoContainer.asnId'), value: 'asnId', type: 'input' },
        { label: this.$t('stockInfoContainer.asnNo'), value: 'asnNo', type: 'input' },
        { label: this.$t('stockInfoContainer.lotCode'), value: 'lotCode', type: 'input' },
        { label: this.$t('stockInfoContainer.containerNo'), value: 'containerNo', type: 'input' },
        { label: this.$t('stockInfoContainer.batchNo'), value: 'batchNo', type: 'input' },
        { label: this.$t('stockInfoContainer.stockQty'), value: 'stockQty', type: 'input' },
        { label: this.$t('stockInfoContainer.usableQty'), value: 'usableQty', type: 'input' },
        { label: this.$t('stockInfoContainer.allotQty'), value: 'allotQty', type: 'input' },
        { label: this.$t('stockInfoContainer.frozenQty'), value: 'frozenQty', type: 'input' },
        { label: this.$t('stockInfoContainer.badQty'), value: 'badQty', type: 'input' },
        { label: this.$t('stockInfoContainer.instoreDate'), value: 'instoreDate', type: 'input' },
        { label: this.$t('stockInfoContainer.remark'), value: 'remark', type: 'input' },
        { label: this.$t('stockInfoContainer.creator'), value: 'creator', type: 'input' },
        { label: this.$t('stockInfoContainer.createTime'), value: 'createTime', type: 'input' },
        { label: this.$t('stockInfoContainer.updater'), value: 'updater', type: 'input' },
        { label: this.$t('stockInfoContainer.updateTime'), value: 'updateTime', type: 'input' },
        { label: this.$t('stockInfoContainer.optimistic'), value: 'optimistic', type: 'input' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        creator: [{ required: true, message: this.$t('stockInfoContainer.msg.creator'), trigger: 'blur' }],
        batchNo: [{ required: true, message: this.$t('stockInfoContainer.msg.batchNo'), trigger: 'blur' }],
        createTime: [{ required: true, message: this.$t('stockInfoContainer.msg.createTime'), trigger: 'blur' }],
        usableQty: [{ required: true, message: this.$t('stockInfoContainer.msg.usableQty'), trigger: 'blur' }],
        skuId: [{ required: true, message: this.$t('stockInfoContainer.msg.skuId'), trigger: 'blur' }],
        asnNo: [{ required: true, message: this.$t('stockInfoContainer.msg.asnNo'), trigger: 'blur' }],
        badQty: [{ required: true, message: this.$t('stockInfoContainer.msg.badQty'), trigger: 'blur' }],
        remark: [{ required: true, message: this.$t('stockInfoContainer.msg.remark'), trigger: 'blur' }],
        updater: [{ required: true, message: this.$t('stockInfoContainer.msg.updater'), trigger: 'blur' }],
        asnId: [{ required: true, message: this.$t('stockInfoContainer.msg.asnId'), trigger: 'blur' }],
        optimistic: [{ required: true, message: this.$t('stockInfoContainer.msg.optimistic'), trigger: 'blur' }],
        updateTime: [{ required: true, message: this.$t('stockInfoContainer.msg.updateTime'), trigger: 'blur' }],
        whId: [{ required: true, message: this.$t('stockInfoContainer.msg.whId'), trigger: 'blur' }],
        lotCode: [{ required: true, message: this.$t('stockInfoContainer.msg.lotCode'), trigger: 'blur' }],
        stockQty: [{ required: true, message: this.$t('stockInfoContainer.msg.stockQty'), trigger: 'blur' }],
        containerNo: [{ required: true, message: this.$t('stockInfoContainer.msg.containerNo'), trigger: 'blur' }],
        companyCode: [{ required: true, message: this.$t('stockInfoContainer.msg.companyCode'), trigger: 'blur' }],
        sysSkuCode: [{ required: true, message: this.$t('stockInfoContainer.msg.sysSkuCode'), trigger: 'blur' }],
        allotQty: [{ required: true, message: this.$t('stockInfoContainer.msg.allotQty'), trigger: 'blur' }],
        frozenQty: [{ required: true, message: this.$t('stockInfoContainer.msg.frozenQty'), trigger: 'blur' }],
        instoreDate: [{ required: true, message: this.$t('stockInfoContainer.msg.instoreDate'), trigger: 'blur' }],
        skuCode: [{ required: true, message: this.$t('stockInfoContainer.msg.skuCode'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        creator: null,
        batchNo: null,
        createTime: null,
        usableQty: null,
        skuId: null,
        asnNo: null,
        badQty: null,
        remark: null,
        updater: null,
        asnId: null,
        optimistic: null,
        updateTime: null,
        whId: null,
        lotCode: null,
        stockQty: null,
        containerNo: null,
        companyCode: null,
        sysSkuCode: null,
        allotQty: null,
        frozenQty: null,
        instoreDate: null,
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
