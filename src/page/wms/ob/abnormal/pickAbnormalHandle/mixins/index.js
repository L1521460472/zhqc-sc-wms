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
          pickOrderNo: null,
          status: null,
          abnormalReason: null,
          creator: null,
          lotId: null,
          skuId: null,
          createTimeFrom: null,
          createTimeTo: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        statusList: [],
        abReasonList: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: null
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
    this.collapsableForm()// 初始化表单--展开收起
    this.initTopFormColumns()// 初始化查询界面配置数据
    this.rulesInit()// 初始化diaFormInfo表单字段校验规则
  },
  methods: {
    collapsableFormMore() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('pickAbnormalHandle.pickOrderNo'), value: 'pickOrderNo', type: 'input' },
        { label: this.$t('pickAbnormalHandle.status'), value: 'status', type: 'select', list: 'statusList' },
        { label: this.$t('pickAbnormalHandle.abnormalReason'), value: 'abnormalReason', type: 'select', list: 'abReasonList' },
        { label: this.$t('pickAbnormalHandle.creator'), value: 'creator', type: 'input' },
        { label: this.$t('pickAbnormalHandle.lotCode'), value: 'lotId', type: 'slot' },
        { label: this.$t('pickAbnormalHandle.skuCode'), value: 'skuId', type: 'slot' },
        { label: this.$t('pickAbnormalHandle.createTimeFrom'), value: 'createTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('pickAbnormalHandle.createTimeTo'), value: 'createTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('pickAbnormalHandle.pickOrderNo'), value: 'pickOrderNo', type: 'input' },
        { label: this.$t('pickAbnormalHandle.status'), value: 'status', type: 'select', list: 'statusList' },
        { label: this.$t('pickAbnormalHandle.abnormalReason'), value: 'abnormalReason', type: 'select', list: 'abReasonList' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
      this.topForm.data.lotId = null
      this.topForm.data.skuId = null
    },
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'pickOrderNo', label: this.$t('pickAbnormalHandle.pickOrderNo'), minWidth: 100 },
        { prop: 'zoneName', label: this.$t('pickAbnormalHandle.zoneName'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('pickAbnormalHandle.lotCode'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('pickAbnormalHandle.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('pickAbnormalHandle.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('pickAbnormalHandle.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('pickAbnormalHandle.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('pickAbnormalHandle.mainUnit'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('pickAbnormalHandle.batchNo'), minWidth: 100 },
        { prop: 'shouldPickQty', label: this.$t('pickAbnormalHandle.shouldPickQty'), minWidth: 100 },
        { prop: 'diffQty', label: this.$t('pickAbnormalHandle.diffQty'), minWidth: 100 },
        { prop: 'abnormalReasonName', label: this.$t('pickAbnormalHandle.abnormalReason'), minWidth: 100 },
        { prop: 'abnormalDesc', label: this.$t('pickAbnormalHandle.abnormalDesc'), minWidth: 100 },
        { prop: 'statusName', label: this.$t('pickAbnormalHandle.status'), minWidth: 100 },
        { prop: 'auditUserName', label: this.$t('pickAbnormalHandle.auditUserName'), minWidth: 100 },
        { prop: 'auditTime', label: this.$t('pickAbnormalHandle.auditTime'), minWidth: 100 },
        { prop: 'auditOpinion', label: this.$t('pickAbnormalHandle.auditOpinion'), minWidth: 100 },
        { prop: 'creatorName', label: this.$t('pickAbnormalHandle.creatorName'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('pickAbnormalHandle.createTime'), minWidth: 100 },
        { prop: 'updaterName', label: this.$t('pickAbnormalHandle.updaterName'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('pickAbnormalHandle.updateTime'), minWidth: 100 },
        { label: '操作', value: 'status', width: 230, type: 'slot', fixed: 'right' } // value: 'status' 对应页面上 自定义插槽的名字v-slot:col-status
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('pickAbnormalHandle.pickOrderNo'), value: 'pickOrderNo', type: 'input', disabled: true },
        { label: this.$t('pickAbnormalHandle.zoneName'), value: 'zoneName', type: 'input', disabled: true },
        { label: this.$t('pickAbnormalHandle.lotCode'), value: 'lotCode', type: 'input', disabled: true },
        { label: this.$t('pickAbnormalHandle.skuCode'), value: 'skuCode', type: 'input', disabled: true },
        { label: this.$t('pickAbnormalHandle.barcode'), value: 'barcode', type: 'input', disabled: true },
        { label: this.$t('pickAbnormalHandle.skuName'), value: 'skuName', type: 'input', disabled: true },
        { label: this.$t('pickAbnormalHandle.spec'), value: 'spec', type: 'input', disabled: true },
        { label: this.$t('pickAbnormalHandle.mainUnit'), value: 'mainUnit', type: 'input', disabled: true },
        { label: this.$t('pickAbnormalHandle.batchNo'), value: 'batchNo', type: 'input', disabled: true },
        { label: this.$t('pickAbnormalHandle.shouldPickQty'), value: 'shouldPickQty', type: 'input', disabled: true },
        { label: this.$t('pickAbnormalHandle.diffQty'), value: 'diffQty', type: 'input', disabled: true },
        { label: this.$t('pickAbnormalHandle.abnormalReason'), value: 'abnormalReasonName', type: 'input', disabled: true },
        { label: this.$t('pickAbnormalHandle.abnormalDesc'), value: 'abnormalDesc', type: 'textarea', disabled: true },
        { label: this.$t('pickAbnormalHandle.status'), value: 'statusName', type: 'input', disabled: true },
        { label: this.$t('pickAbnormalHandle.auditUserName'), value: 'auditUserName', type: 'input', disabled: true },
        { label: this.$t('pickAbnormalHandle.auditTime'), value: 'auditTime', type: 'input', disabled: true },
        { label: this.$t('pickAbnormalHandle.auditOpinion'), value: 'auditOpinion', type: 'textarea', disabled: true },
        { label: this.$t('pickAbnormalHandle.creatorName'), value: 'creatorName', type: 'input', disabled: true },
        { label: this.$t('pickAbnormalHandle.createTime'), value: 'createTime', type: 'input', disabled: true },
        { label: this.$t('pickAbnormalHandle.updaterName'), value: 'updaterName', type: 'input', disabled: true },
        { label: this.$t('pickAbnormalHandle.updateTime'), value: 'updateTime', type: 'input', disabled: true },
        { label: this.$t('pickAbnormalHandle.remark'), value: 'remark', type: 'textarea', disabled: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('pickAbnormalHandle.id'), value: 'id', type: 'input' },
        { label: this.$t('pickAbnormalHandle.companyCode'), value: 'companyCode', type: 'input' },
        { label: this.$t('pickAbnormalHandle.whId'), value: 'whId', type: 'input' },
        { label: this.$t('pickAbnormalHandle.pickOrderId'), value: 'pickOrderId', type: 'input' },
        { label: this.$t('pickAbnormalHandle.pickOrderNo'), value: 'pickOrderNo', type: 'input' },
        { label: this.$t('pickAbnormalHandle.lotCode'), value: 'lotCode', type: 'input' },
        { label: this.$t('pickAbnormalHandle.status'), value: 'status', type: 'input' },
        { label: this.$t('pickAbnormalHandle.skuId'), value: 'skuId', type: 'input' },
        { label: this.$t('pickAbnormalHandle.skuCode'), value: 'skuCode', type: 'input' },
        { label: this.$t('pickAbnormalHandle.batchNo'), value: 'batchNo', type: 'input' },
        { label: this.$t('pickAbnormalHandle.shouldPickQty'), value: 'shouldPickQty', type: 'input' },
        { label: this.$t('pickAbnormalHandle.diffQty'), value: 'diffQty', type: 'input' },
        { label: this.$t('pickAbnormalHandle.abnormalReason'), value: 'abnormalReason', type: 'input' },
        { label: this.$t('pickAbnormalHandle.abnormalDesc'), value: 'abnormalDesc', type: 'input' },
        { label: this.$t('pickAbnormalHandle.auditUser'), value: 'auditUser', type: 'input' },
        { label: this.$t('pickAbnormalHandle.auditUserName'), value: 'auditUserName', type: 'input' },
        { label: this.$t('pickAbnormalHandle.auditTime'), value: 'auditTime', type: 'input' },
        { label: this.$t('pickAbnormalHandle.cancelAuditUser'), value: 'cancelAuditUser', type: 'input' },
        { label: this.$t('pickAbnormalHandle.cancelAuditUserName'), value: 'cancelAuditUserName', type: 'input' },
        { label: this.$t('pickAbnormalHandle.cancelAuditTime'), value: 'cancelAuditTime', type: 'input' },
        { label: this.$t('pickAbnormalHandle.creator'), value: 'creator', type: 'input' },
        { label: this.$t('pickAbnormalHandle.creatorName'), value: 'creatorName', type: 'input' },
        { label: this.$t('pickAbnormalHandle.createTime'), value: 'createTime', type: 'input' },
        { label: this.$t('pickAbnormalHandle.remark'), value: 'remark', type: 'input' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('pickAbnormalHandle.pickOrderNo'), value: 'pickOrderNo', type: 'input', disabled: true },
        { label: this.$t('pickAbnormalHandle.zoneName'), value: 'zoneName', type: 'input', disabled: true },
        { label: this.$t('pickAbnormalHandle.lotCode'), value: 'lotCode', type: 'input', disabled: true },
        { label: this.$t('pickAbnormalHandle.skuCode'), value: 'skuCode', type: 'input', disabled: true },
        { label: this.$t('pickAbnormalHandle.barcode'), value: 'barcode', type: 'input', disabled: true },
        { label: this.$t('pickAbnormalHandle.skuName'), value: 'skuName', type: 'input', disabled: true },
        { label: this.$t('pickAbnormalHandle.spec'), value: 'spec', type: 'input', disabled: true },
        { label: this.$t('pickAbnormalHandle.mainUnit'), value: 'mainUnit', type: 'input', disabled: true },
        { label: this.$t('pickAbnormalHandle.batchNo'), value: 'batchNo', type: 'input', disabled: true },
        { label: this.$t('pickAbnormalHandle.shouldPickQty'), value: 'shouldPickQty', type: 'input', disabled: true },
        { label: this.$t('pickAbnormalHandle.diffQty'), value: 'diffQty', type: 'input' },
        { label: this.$t('pickAbnormalHandle.abnormalReason'), value: 'abnormalReason', type: 'select', list: 'abReasonList', clearable: false },
        { label: this.$t('pickAbnormalHandle.abnormalDesc'), value: 'abnormalDesc', type: 'textarea' },
        { label: this.$t('pickAbnormalHandle.status'), value: 'status', type: 'input', disabled: true },
        { label: this.$t('pickAbnormalHandle.creatorName'), value: 'creatorName', type: 'input', disabled: true },
        { label: this.$t('pickAbnormalHandle.createTime'), value: 'createTime', type: 'input', disabled: true },
        { label: this.$t('pickAbnormalHandle.updaterName'), value: 'updaterName', type: 'input', disabled: true },
        { label: this.$t('pickAbnormalHandle.updateTime'), value: 'updateTime', type: 'input', disabled: true },
        { label: this.$t('pickAbnormalHandle.remark'), value: 'remark', type: 'textarea' }
      ]
    },

    // 编辑页面的数据配置
    diaFormInfoAbnormalHandleFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('pickAbnormalHandle.auditOpinion'), value: 'auditOpinion', type: 'textarea' }
      ]
    },

    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        pickOrderId: null,
        diffQty: null,
        abnormalReason: null,
        shouldPickQty: null,
        remark: null,
        cancelAuditUserName: null,
        auditUser: null,
        updater: null,
        auditTime: null,
        pickOrderNo: null,
        updateTime: null,
        companyCode: null,
        id: null,
        creator: null,
        batchNo: null,
        createTime: null,
        abnormalDesc: null,
        skuId: null,
        updaterName: null,
        cancelAuditUser: null,
        cancelAuditTime: null,
        whId: null,
        lotCode: null,
        creatorName: null,
        auditUserName: null,
        skuCode: null,
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
