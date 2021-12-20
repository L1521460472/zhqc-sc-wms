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
          replenishNo: null,
          replenishOrigin: null,
          replenishStatus: null,
          ownerId: null,
          zoneId: null,
          lotId: null,
          skuId: null,
          createTimeBegin: null,
          createTimeEnd: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        replenishStatusList: [],
        replenishTypeList: [],
        replenishOriginList: []
      },
      idsList: [],
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '200', // 默认操作按钮列宽度
          btList: [
            {
              label: '查看',
              type: 'primary',
              icon: '',
              event: 'openViewPage',
              show: true,
              disabled: this.$hasPerm('view')
            },
            // 自定义按钮
            { slot: true, icon: '', event: 'slotEvent' }// event值为notification.js中定义的方法名
          ]
        }
      },
      // 弹窗表单
      diaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {
          dtList: []
        }, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        subTableInfo: {
          title: '列表详情',
          ref: null,
          type: null,
          fieldList: [],
          rules: {},
          labelWidth: '120px',
          handle: null,
          saveList: [
            { label: '关闭', type: '', icon: '', event: 'close', show: true },
            { label: '保存', type: 'primary', icon: '', event: 'save', saveLoading: false, show: true }
          ],
          topBtn: {}
        }
      }
    }
  },
  mounted() {
    this.collapsableForm()// 初始化表单-----------------展开收起
    this.initTopFormColumns()// 初始化查询界面配置数据
    this.rulesInit()// 初始化diaFormInfo表单字段校验规则
  },
  methods: {
    collapsableFormMore() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('replenish.replenishNo'), value: 'replenishNo', type: 'input' },
        {
          label: this.$t('replenish.replenishOrigin'),
          value: 'replenishOrigin',
          type: 'select',
          list: 'replenishOriginList'
        },
        {
          label: this.$t('replenish.replenishStatus'),
          value: 'replenishStatus',
          type: 'select',
          list: 'replenishStatusList'
        },
        { label: this.$t('replenish.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('replenish.zoneId'), value: 'zoneId', type: 'slot' },
        { label: this.$t('replenish.lotId'), value: 'lotId', type: 'slot' },
        { label: this.$t('replenish.skuId'), value: 'skuId', type: 'slot' },
        {
          label: this.$t('replenish.createTimeBegin'),
          value: 'createTimeBegin',
          type: 'date',
          dateType: 'datetime',
          format: 'yyyy-MM-dd HH:mm:ss',
          valueFormat: 'yyyy-MM-dd HH:mm:ss'
        },
        {
          label: this.$t('replenish.createTimeEnd'),
          value: 'createTimeEnd',
          type: 'date',
          dateType: 'datetime',
          format: 'yyyy-MM-dd HH:mm:ss',
          valueFormat: 'yyyy-MM-dd HH:mm:ss'
        },
        { label: '', value: 'sys', type: 'slot' }
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('replenish.replenishNo'), value: 'replenishNo', type: 'input' },
        {
          label: this.$t('replenish.replenishOrigin'),
          value: 'replenishOrigin',
          type: 'select',
          list: 'replenishOriginList'
        },
        {
          label: this.$t('replenish.replenishStatus'),
          value: 'replenishStatus',
          type: 'select',
          list: 'replenishStatusList'
        },
        { label: '', value: 'sys', type: 'slot' }
      ]
      this.topForm.data.ownerId = null
      this.topForm.data.zoneId = null
      this.topForm.data.lotId = null
      this.topForm.data.skuId = null
    },
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'selection', width: 50 }, // 序列
        { prop: 'replenishNo', label: this.$t('replenish.replenishNo'), minWidth: 130 },
        { prop: 'ownerName', label: this.$t('replenish.ownerId'), minWidth: 100 },
        { prop: 'replenishStatusName', label: this.$t('replenish.replenishStatus'), minWidth: 100 },
        { prop: 'replenishOriginName', label: this.$t('replenish.replenishOrigin'), minWidth: 100 },
        { prop: 'planQty', label: this.$t('replenish.planQty'), minWidth: 100 },
        { prop: 'planTime', label: this.$t('replenish.planTime'), minWidth: 100 },
        { prop: 'finishQty', label: this.$t('replenish.finishQty'), minWidth: 100 },
        { prop: 'cancelUserName', label: this.$t('replenish.cancelUserName'), minWidth: 100 },
        { prop: 'cancelTime', label: this.$t('replenish.cancelTime'), minWidth: 100 },
        { prop: 'auditUserName', label: this.$t('replenish.auditUserName'), minWidth: 100 },
        { prop: 'auditTime', label: this.$t('replenish.auditTime'), minWidth: 100 },
        { prop: 'createName', label: this.$t('replenish.createName'), minWidth: 100 },
        { prop: 'remark', label: this.$t('replenish.remark'), minWidth: 100 }
      ]
      this.$set(this.diaFormInfo.data, 'dtList', [])
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('replenish.replenishNo'), value: 'replenishNo', type: 'input', readonly: true },
        { label: this.$t('replenish.ownerId'), value: 'ownerName', type: 'input', readonly: true },
        {
          label: this.$t('replenish.replenishStatus'),
          value: 'replenishStatusName',
          type: 'input',
          readonly: true
        },
        {
          label: this.$t('replenish.replenishOrigin'),
          value: 'replenishOriginName',
          type: 'input',
          readonly: true
        },
        { label: this.$t('replenish.planQty'), value: 'planQty', type: 'input', readonly: true },
        { label: this.$t('replenish.planTime'), value: 'planTime', type: 'input', readonly: true },
        { label: this.$t('replenish.createName'), value: 'createName', type: 'input', readonly: true },
        { label: this.$t('replenish.createTime'), value: 'createTime', type: 'input', readonly: true },
        { label: this.$t('replenish.remark'), value: 'remark', type: 'textarea', disabled: true }
      ]
      // 明细数据
      this.diaFormInfo.subTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'seq', width: 50 }, // 序列
        { prop: 'skuCode', label: this.$t('replenish.dt.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('replenish.dt.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('replenish.dt.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('replenish.dt.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('replenish.dt.mainUnit'), minWidth: 100 },
        { prop: 'mfg', label: this.$t('replenish.dt.mfg'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('replenish.dt.originCountry'), minWidth: 100 },
        { prop: 'brandName', label: this.$t('replenish.dt.brandName'), minWidth: 100 },
        { prop: 'approveNo', label: this.$t('replenish.dt.approveNo'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('replenish.dt.drugForm'), minWidth: 100 },
        { prop: 'drugFormSpec', label: this.$t('replenish.dt.drugFormSpec'), minWidth: 100 },
        { prop: 'cmdPkgQty', label: this.$t('replenish.dt.cmdPkgQty'), minWidth: 60 },
        { prop: 'planQty', label: this.$t('replenish.dt.planQty'), minWidth: 100 },
        { prop: 'fmLotCode', label: this.$t('replenish.dt.fmLotCode'), minWidth: 80 },
        { prop: 'toLotCode', label: this.$t('replenish.dt.toLotCode'), minWidth: 80 },
        { prop: 'batchNo', label: this.$t('replenish.dt.batchNo'), minWidth: 80 },
        { prop: 'downShelfQty', label: this.$t('replenish.dt.downShelfQty'), minWidth: 100 },
        { prop: 'upShelfQty', label: this.$t('replenish.dt.upShelfQty'), minWidth: 100 },
        { prop: 'replenishDtStatusName', label: this.$t('replenish.dt.replenishDtStatusName'), minWidth: 100 },
        { prop: 'upShelfTime', label: this.$t('replenish.dt.upShelfTime'), minWidth: 100 }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('replenish.id'), value: 'id', type: 'input' },
        { label: this.$t('replenish.companyCode'), value: 'companyCode', type: 'input' },
        { label: this.$t('replenish.whId'), value: 'whId', type: 'input' },
        { label: this.$t('replenish.ownerId'), value: 'ownerId', type: 'input' },
        { label: this.$t('replenish.replenishNo'), value: 'replenishNo', type: 'input' },
        { label: this.$t('replenish.replenishStatus'), value: 'replenishStatus', type: 'input' },
        { label: this.$t('replenish.replenishType'), value: 'replenishType', type: 'input' },
        { label: this.$t('replenish.replenishOrigin'), value: 'replenishOrigin', type: 'input' },
        { label: this.$t('replenish.planQty'), value: 'planQty', type: 'input' },
        { label: this.$t('replenish.planTime'), value: 'planTime', type: 'input' },
        { label: this.$t('replenish.finishQty'), value: 'finishQty', type: 'input' },
        { label: this.$t('replenish.cancelUser'), value: 'cancelUser', type: 'input' },
        { label: this.$t('replenish.cancelUserName'), value: 'cancelUserName', type: 'input' },
        { label: this.$t('replenish.cancelTime'), value: 'cancelTime', type: 'input' },
        { label: this.$t('replenish.auditUser'), value: 'auditUser', type: 'input' },
        { label: this.$t('replenish.auditUserName'), value: 'auditUserName', type: 'input' },
        { label: this.$t('replenish.auditTime'), value: 'auditTime', type: 'input' },
        { label: this.$t('replenish.creator'), value: 'creator', type: 'input' },
        { label: this.$t('replenish.createName'), value: 'createName', type: 'input' },
        { label: this.$t('replenish.createTime'), value: 'createTime', type: 'input' },
        { label: this.$t('replenish.remark'), value: 'remark', type: 'input' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('replenish.companyCode'), value: 'companyCode', type: 'input' },
        { label: this.$t('replenish.whId'), value: 'whId', type: 'input' },
        { label: this.$t('replenish.ownerId'), value: 'ownerId', type: 'input' },
        { label: this.$t('replenish.replenishNo'), value: 'replenishNo', type: 'input' },
        { label: this.$t('replenish.replenishStatus'), value: 'replenishStatus', type: 'input' },
        { label: this.$t('replenish.replenishType'), value: 'replenishType', type: 'input' },
        { label: this.$t('replenish.replenishOrigin'), value: 'replenishOrigin', type: 'input' },
        { label: this.$t('replenish.planQty'), value: 'planQty', type: 'input' },
        { label: this.$t('replenish.planTime'), value: 'planTime', type: 'input' },
        { label: this.$t('replenish.finishQty'), value: 'finishQty', type: 'input' },
        { label: this.$t('replenish.cancelUser'), value: 'cancelUser', type: 'input' },
        { label: this.$t('replenish.cancelUserName'), value: 'cancelUserName', type: 'input' },
        { label: this.$t('replenish.cancelTime'), value: 'cancelTime', type: 'input' },
        { label: this.$t('replenish.auditUser'), value: 'auditUser', type: 'input' },
        { label: this.$t('replenish.auditUserName'), value: 'auditUserName', type: 'input' },
        { label: this.$t('replenish.auditTime'), value: 'auditTime', type: 'input' },
        { label: this.$t('replenish.updater'), value: 'updater', type: 'input' },
        { label: this.$t('replenish.updateName'), value: 'updateName', type: 'input' },
        { label: this.$t('replenish.updateTime'), value: 'updateTime', type: 'input' },
        { label: this.$t('replenish.remark'), value: 'remark', type: 'input' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {}
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        cancelTime: null,
        creator: null,
        cancelUser: null,
        createTime: null,
        planQty: null,
        ownerId: null,
        replenishOrigin: null,
        replenishType: null,
        cancelUserName: null,
        remark: null,
        finishQty: null,
        auditUser: null,
        replenishStatus: null,
        updateName: null,
        updater: null,
        auditTime: null,
        planTime: null,
        updateTime: null,
        whId: null,
        replenishNo: null,
        companyCode: null,
        id: null,
        auditUserName: null,
        createName: null,
        dtList: []
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
    },

    // 列表复选框,选中事件
    handleSelectionChange(event, data) {
      if (data.length == 0) {
        this.idsList.length = 0
      }
      if (data.length > 0) {
        this.idsList.length = 0
        for (let i = 0; i < data.length; i++) {
          this.idsList.push(data[i].id)
        }
      }
    }

  }
}
