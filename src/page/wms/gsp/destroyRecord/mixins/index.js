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
          origSys: null,
          ownerId: null,
          supervisorNo: null,
          supplierId: null,
          skuId: null,
          createTimeFrom: null,
          createTimeTo: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        asnSourceList: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '210', // 默认操作按钮列宽度
          btList: [
            { label: this.$t('table.view'), type: 'primary', icon: '', event: 'openViewPage', show: true, disabled: this.$hasPerm('view') }
          ]
        }
      },
      // 弹窗表单
      diaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        dtTableInfo: {
          ref: null,
          fieldList: null,
          data: null,
          handle: null
        }
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
        { label: this.$t('destroyRecord.badDestroyNo'), value: 'badDestroyNo', type: 'input' },
        { label: this.$t('destroyRecord.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('destroyRecord.supplierId'), value: 'supplierId', type: 'slot' },
        { label: this.$t('destroyRecord.skuId'), value: 'skuId', type: 'slot' },
        { label: this.$t('destroyRecord.createTimeFrom'), value: 'createTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('destroyRecord.createTimeTo'), value: 'createTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('destroyRecord.badDestroyNo'), value: 'badDestroyNo', type: 'input' },
        { label: this.$t('destroyRecord.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('destroyRecord.supplierId'), value: 'supplierId', type: 'slot' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },

    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'badDestroyNo', label: this.$t('destroyRecord.badDestroyNo'), minWidth: 100 },
        { prop: 'origSysName', label: this.$t('destroyRecord.origSys'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('destroyRecord.ownerName'), minWidth: 100 },
        { prop: 'supervisorNo', label: this.$t('destroyRecord.supervisorNo'), minWidth: 120 },
        { prop: 'destroyMethod', label: this.$t('destroyRecord.destroyMethod'), minWidth: 100 },
        { prop: 'destroyAddr', label: this.$t('destroyRecord.destroyAddr'), minWidth: 100 },
        { prop: 'destroyTime', label: this.$t('destroyRecord.destroyTime'), minWidth: 100 },
        { prop: 'status', label: this.$t('destroyRecord.status'), minWidth: 100 },
        { prop: 'erpCreateTime', label: this.$t('destroyRecord.erpCreateTime'), minWidth: 100 },
        { prop: 'erpUpdateTime', label: this.$t('destroyRecord.erpUpdateTime'), minWidth: 100 },
        { prop: 'creator', label: this.$t('destroyRecord.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('destroyRecord.createTime'), minWidth: 100 },
        { prop: 'updater', label: this.$t('destroyRecord.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('destroyRecord.updateTime'), minWidth: 100 },
        { prop: 'remark', label: this.$t('destroyRecord.remark'), minWidth: 100 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('destroyRecord.badDestroyNo'), value: 'badDestroyNo', type: 'input', readonly: true },
        { label: this.$t('destroyRecord.origSys'), value: 'origSysName', type: 'input', readonly: true },
        { label: this.$t('destroyRecord.ownerName'), value: 'ownerName', type: 'input', readonly: true },
        { label: this.$t('destroyRecord.supervisorNo'), value: 'supervisorNo', type: 'input', readonly: true },
        { label: this.$t('destroyRecord.destroyMethod'), value: 'destroyMethod', type: 'input', readonly: true },
        { label: this.$t('destroyRecord.destroyAddr'), value: 'destroyAddr', type: 'input', readonly: true },
        { label: this.$t('destroyRecord.destroyTime'), value: 'destroyTime', type: 'input', readonly: true },
        { label: this.$t('destroyRecord.status'), value: 'status', type: 'input', readonly: true },
        { label: this.$t('destroyRecord.erpCreateTime'), value: 'erpCreateTime', type: 'input', readonly: true },
        { label: this.$t('destroyRecord.erpUpdateTime'), value: 'erpUpdateTime', type: 'input', readonly: true },
        { label: this.$t('destroyRecord.creator'), value: 'creator', type: 'input', readonly: true },
        { label: this.$t('destroyRecord.createTime'), value: 'createTime', type: 'input', readonly: true },
        { label: this.$t('destroyRecord.updater'), value: 'updater', type: 'input', readonly: true },
        { label: this.$t('destroyRecord.updateTime'), value: 'updateTime', type: 'input', readonly: true },
        { label: this.$t('destroyRecord.remark'), value: 'remark', type: 'input', readonly: true }
      ]

      // 明细数据
      this.diaFormInfo.dtTableInfo.fieldList = [
        { label: '序号', type: 'index', width: 50 },
        { prop: 'skuCode', label: this.$t('destroyRecord.dt.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('destroyRecord.dt.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('destroyRecord.dt.skuName'), minWidth: 100 },
        { prop: 'tradeName', label: this.$t('destroyRecord.dt.tradeName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('destroyRecord.dt.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('destroyRecord.dt.mainUnit'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('destroyRecord.dt.drugForm'), minWidth: 100 },
        { prop: 'mfgName', label: this.$t('destroyRecord.dt.mfgName'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('destroyRecord.dt.originCountry'), minWidth: 100 },
        { prop: 'approvalNumber', label: this.$t('destroyRecord.dt.approvalNumber'), minWidth: 100 },
        { prop: 'brandName', label: this.$t('destroyRecord.dt.brandName'), minWidth: 100 },
        { prop: 'tempControlName', label: this.$t('destroyRecord.dt.tempControlName'), minWidth: 100 },
        { prop: 'validityDay', label: this.$t('destroyRecord.dt.validityDay'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('destroyRecord.dt.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('destroyRecord.dt.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('destroyRecord.dt.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('destroyRecord.dt.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('destroyRecord.dt.invalidDate'), minWidth: 100 },
        { prop: 'sterileNo', label: this.$t('destroyRecord.dt.sterileNo'), minWidth: 100 },
        { prop: 'sterileInvaliDate', label: this.$t('destroyRecord.dt.sterileInvaliDate'), minWidth: 100 },
        { prop: 'rowNo', label: this.$t('destroyRecord.dt.rowNo'), minWidth: 100 },
        { prop: 'reportRowNo', label: this.$t('destroyRecord.dt.reportRowNo'), minWidth: 100 },
        { prop: 'destroyQty', label: this.$t('destroyRecord.dt.destroyQty'), minWidth: 100 },
        { prop: 'remark', label: this.$t('destroyRecord.dt.remark'), minWidth: 100 }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        destroyMethod: null,
        erpUpdateTime: null,
        warehouseCode: null,
        extendThree: null,
        ownerCode: null,
        remark: null,
        extendFive: null,
        extendSeven: null,
        destroyAddr: null,
        updater: null,
        extendOne: null,
        updateTime: null,
        destroyTime: null,
        extendFour: null,
        companyCode: null,
        id: null,
        origSys: null,
        creator: null,
        createTime: null,
        extendTwo: null,
        supervisorNo: null,
        extendSix: null,
        extendEight: null,
        badDestroyNo: null,
        extendTen: null,
        extendNine: null,
        erpCreateTime: null,
        status: null
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
