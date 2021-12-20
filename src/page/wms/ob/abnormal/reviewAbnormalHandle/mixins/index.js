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
          soNo: null,
          abnormalReason: null,
          abnormalStatus: 'NEW_CREATE',
          checkPlatformId: null,
          barcode: null,
          transOrderNo: null,
          boxNo: null,
          reviewName: null,
          reviewTimeBegin: null,
          reviewTimeEnd: null,
          handleName: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        statusList: [],
        reasonList: [],
        reviewPlatformList: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '180', // 默认操作按钮列宽度
          btList: [// 添加操作按钮
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
        { label: this.$t('reviewAbnormalHandle.soNo'), value: 'soNo', type: 'input' },
        { label: this.$t('reviewAbnormalHandle.abnormalReason'), value: 'abnormalReason', type: 'select', list: 'reasonList' },
        { label: this.$t('reviewAbnormalHandle.abnormalStatus'), value: 'abnormalStatus', type: 'select', list: 'statusList' },
        { label: this.$t('reviewAbnormalHandle.checkPlatformId'), value: 'checkPlatformId', type: 'select', list: 'reviewPlatformList' },
        { label: this.$t('reviewAbnormalHandle.barcode'), value: 'barcode', type: 'input' },
        { label: this.$t('reviewAbnormalHandle.transOrderNo'), value: 'transOrderNo', type: 'input' },
        { label: this.$t('reviewAbnormalHandle.boxNo'), value: 'boxNo', type: 'input' },
        { label: this.$t('reviewAbnormalHandle.reviewName'), value: 'reviewName', type: 'input' },
        { label: this.$t('reviewAbnormalHandle.reviewTimeBegin'), value: 'reviewTimeBegin', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('reviewAbnormalHandle.reviewTimeEnd'), value: 'reviewTimeEnd', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('reviewAbnormalHandle.handleName'), value: 'handleName', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('reviewAbnormalHandle.soNo'), value: 'soNo', type: 'input' },
        { label: this.$t('reviewAbnormalHandle.abnormalReason'), value: 'abnormalReason', type: 'select', list: 'reasonList' },
        { label: this.$t('reviewAbnormalHandle.abnormalStatus'), value: 'abnormalStatus', type: 'select', list: 'statusList' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'checkPlatformName', label: this.$t('reviewAbnormalHandle.checkPlatformName'), minWidth: 100 },
        { prop: 'soNo', label: this.$t('reviewAbnormalHandle.soNo'), minWidth: 140 },
        { prop: 'transOrderNo', label: this.$t('reviewAbnormalHandle.transOrderNo'), minWidth: 100 },
        { prop: 'boxNo', label: this.$t('reviewAbnormalHandle.boxNo'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('reviewAbnormalHandle.lotCode'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('reviewAbnormalHandle.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('reviewAbnormalHandle.barcode'), minWidth: 120 },
        { prop: 'skuName', label: this.$t('reviewAbnormalHandle.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('reviewAbnormalHandle.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('reviewAbnormalHandle.mainUnit'), minWidth: 100 },
        { prop: 'allotQty', label: this.$t('reviewAbnormalHandle.allotQty'), minWidth: 100 },
        { prop: 'pickQty', label: this.$t('reviewAbnormalHandle.pickQty'), minWidth: 100 },
        { prop: 'reviewQty', label: this.$t('reviewAbnormalHandle.reviewQty'), minWidth: 100 },
        { prop: 'abnormalReasonName', label: this.$t('reviewAbnormalHandle.abnormalReasonName'), minWidth: 100 },
        { prop: 'abnormalQty', label: this.$t('reviewAbnormalHandle.abnormalQty'), minWidth: 100 },
        { prop: 'abnormalStatusName', label: this.$t('reviewAbnormalHandle.abnormalStatusName'), minWidth: 100 },
        { prop: 'reviewName', label: this.$t('reviewAbnormalHandle.reviewName'), minWidth: 100 },
        { prop: 'reviewTime', label: this.$t('reviewAbnormalHandle.reviewTime'), minWidth: 100 },
        { prop: 'handleResult', label: this.$t('reviewAbnormalHandle.handleResult'), minWidth: 100 },
        { prop: 'handleName', label: this.$t('reviewAbnormalHandle.handleName'), minWidth: 100 },
        { prop: 'handleTime', label: this.$t('reviewAbnormalHandle.handleTime'), minWidth: 100 },
        { prop: 'remark', label: this.$t('reviewAbnormalHandle.remark'), minWidth: 100 },
        { prop: 'creatorName', label: this.$t('reviewAbnormalHandle.creatorName'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('reviewAbnormalHandle.createTime'), minWidth: 100 },
        { prop: 'updateName', label: this.$t('reviewAbnormalHandle.updateName'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('reviewAbnormalHandle.updateTime'), minWidth: 100 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('reviewAbnormalHandle.checkPlatformId'), value: 'checkPlatformId', type: 'select', list: 'reviewPlatformList', disabled: true },
        { label: this.$t('reviewAbnormalHandle.soNo'), value: 'soNo', type: 'input', readonly: true },
        { label: this.$t('reviewAbnormalHandle.transOrderNo'), value: 'transOrderNo', type: 'input', readonly: true },
        { label: this.$t('reviewAbnormalHandle.boxNo'), value: 'boxNo', type: 'input', readonly: true },
        { label: this.$t('reviewAbnormalHandle.lotCode'), value: 'lotCode', type: 'input', readonly: true },
        { label: this.$t('reviewAbnormalHandle.barcode'), value: 'barcode', type: 'input', readonly: true },
        { label: this.$t('reviewAbnormalHandle.skuCode'), value: 'skuCode', type: 'input', readonly: true },
        { label: this.$t('reviewAbnormalHandle.skuName'), value: 'skuName', type: 'input', readonly: true },
        { label: this.$t('reviewAbnormalHandle.spec'), value: 'spec', type: 'input', readonly: true },
        { label: this.$t('reviewAbnormalHandle.mainUnit'), value: 'mainUnit', type: 'input', readonly: true },
        { label: this.$t('reviewAbnormalHandle.allotQty'), value: 'allotQty', type: 'input', readonly: true },
        { label: this.$t('reviewAbnormalHandle.pickQty'), value: 'pickQty', type: 'input', readonly: true },
        { label: this.$t('reviewAbnormalHandle.reviewQty'), value: 'reviewQty', type: 'input', readonly: true },
        { label: this.$t('reviewAbnormalHandle.abnormalReason'), value: 'abnormalReason', type: 'select', list: 'reasonList', disabled: true },
        { label: this.$t('reviewAbnormalHandle.abnormalQty'), value: 'abnormalQty', type: 'input', readonly: true },
        { label: this.$t('reviewAbnormalHandle.abnormalStatus'), value: 'abnormalStatus', type: 'select', list: 'statusList', disabled: true },
        { label: this.$t('reviewAbnormalHandle.reviewName'), value: 'reviewName', type: 'input', readonly: true },
        { label: this.$t('reviewAbnormalHandle.reviewTime'), value: 'reviewTime', type: 'input', readonly: true },
        { label: this.$t('reviewAbnormalHandle.remark'), value: 'remark', type: 'input', readonly: true },
        { label: this.$t('reviewAbnormalHandle.handleResult'), value: 'handleResult', type: 'textarea', disabled: true },
        { label: this.$t('reviewAbnormalHandle.handleName'), value: 'handleName', type: 'input', readonly: true },
        { label: this.$t('reviewAbnormalHandle.handleTime'), value: 'handleTime', type: 'input', readonly: true }
      ]
    },

    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('reviewAbnormalHandle.checkPlatformId'), value: 'checkPlatformId', type: 'select', list: 'reviewPlatformList', disabled: true },
        { label: this.$t('reviewAbnormalHandle.soNo'), value: 'soNo', type: 'input', readonly: true },
        { label: this.$t('reviewAbnormalHandle.transOrderNo'), value: 'transOrderNo', type: 'input', readonly: true },
        { label: this.$t('reviewAbnormalHandle.boxNo'), value: 'boxNo', type: 'input', readonly: true },
        { label: this.$t('reviewAbnormalHandle.lotCode'), value: 'lotCode', type: 'input', readonly: true },
        { label: this.$t('reviewAbnormalHandle.barcode'), value: 'barcode', type: 'input', readonly: true },
        { label: this.$t('reviewAbnormalHandle.skuCode'), value: 'skuCode', type: 'input', readonly: true },
        { label: this.$t('reviewAbnormalHandle.skuName'), value: 'skuName', type: 'input', readonly: true },
        { label: this.$t('reviewAbnormalHandle.spec'), value: 'spec', type: 'input', readonly: true },
        { label: this.$t('reviewAbnormalHandle.mainUnit'), value: 'mainUnit', type: 'input', readonly: true },
        { label: this.$t('reviewAbnormalHandle.allotQty'), value: 'allotQty', type: 'input', readonly: true },
        { label: this.$t('reviewAbnormalHandle.pickQty'), value: 'pickQty', type: 'input', readonly: true },
        { label: this.$t('reviewAbnormalHandle.reviewQty'), value: 'reviewQty', type: 'input', readonly: true },
        { label: this.$t('reviewAbnormalHandle.abnormalReason'), value: 'abnormalReason', type: 'select', list: 'reasonList', disabled: true },
        { label: this.$t('reviewAbnormalHandle.abnormalQty'), value: 'abnormalQty', type: 'input', readonly: true },
        { label: this.$t('reviewAbnormalHandle.abnormalStatus'), value: 'abnormalStatus', type: 'select', list: 'statusList', disabled: true },
        { label: this.$t('reviewAbnormalHandle.reviewName'), value: 'reviewName', type: 'input', readonly: true },
        { label: this.$t('reviewAbnormalHandle.reviewTime'), value: 'reviewTime', type: 'input', readonly: true },
        { label: this.$t('reviewAbnormalHandle.remark'), value: 'remark', type: 'input', readonly: true },
        { label: this.$t('reviewAbnormalHandle.handleResult'), value: 'handleResult', type: 'textarea' }

      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        handleResult: [{ required: true, message: this.$t('reviewAbnormalHandle.msg.handleResult'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        mainUnit: null,
        handleName: null,
        reviewId: null,
        handleTime: null,
        handleResult: null,
        abnormalReason: null,
        checkPlatformId: null,
        transOrderNo: null,
        skuId: null,
        pickQty: null,
        remark: null,
        soNo: null,
        abnormalStatus: null,
        spec: null,
        reviewQty: null,
        lotCode: null,
        abnormalQty: null,
        boxNo: null,
        skuName: null,
        allotQty: null,
        reviewTime: null,
        barcode: null,
        skuCode: null,
        reviewName: null
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
