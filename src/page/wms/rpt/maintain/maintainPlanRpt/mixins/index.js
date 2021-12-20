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
          planNo: null,
          ownerId: null,
          maintainType: null,
          createName: null,
          createTime: null,
          auditUserName: null,
          auditTime: null,
          lotId: null,
          zoneId: null,
          skuId: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        maintainTypeList: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: null
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
    this.collapsableForm()// 初始化表单--展开收起
    this.initTopFormColumns()// 初始化查询界面配置数据
    this.rulesInit()// 初始化diaFormInfo表单字段校验规则
  },
  methods: {

    collapsableFormMore() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('maintainPlanRpt.planNo'), value: 'planNo', type: 'input' },
        { label: this.$t('maintainPlanRpt.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('maintainPlanRpt.maintainType'), value: 'maintainType', type: 'select', list: 'maintainTypeList' },
        { label: this.$t('maintainPlanRpt.createName'), value: 'createName', type: 'input' },
        { label: this.$t('maintainPlanRpt.createTimeBegin'), value: 'createTimeBegin', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('maintainPlanRpt.createTimeEnd'), value: 'createTimeEnd', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('maintainPlanRpt.auditTimeBegin'), value: 'auditTimeBegin', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('maintainPlanRpt.auditTimeEnd'), value: 'auditTimeEnd', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('maintainPlanRpt.auditUserName'), value: 'auditUserName', type: 'input' },
        { label: this.$t('maintainPlanRpt.lotId'), value: 'lotId', type: 'slot' },
        { label: this.$t('maintainPlanRpt.zoneId'), value: 'zoneId', type: 'slot' },
        { label: this.$t('maintainPlanRpt.skuId'), value: 'skuId', type: 'slot' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('maintainPlanRpt.planNo'), value: 'planNo', type: 'input' },
        { label: this.$t('maintainPlanRpt.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('maintainPlanRpt.maintainType'), value: 'maintainType', type: 'select', list: 'maintainTypeList' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'planNo', label: this.$t('maintainPlanRpt.planNo'), minWidth: 100 },
        // {prop:"ownerId", label:this.$t('maintainPlanRpt.ownerId'), minWidth:100},
        { prop: 'ownerName', label: this.$t('maintainPlanRpt.ownerName'), minWidth: 100 },
        { prop: 'maintainTypeName', label: this.$t('maintainPlanRpt.maintainTypeName'), minWidth: 100 },
        { prop: 'planOriginName', label: this.$t('maintainPlanRpt.planOriginName'), minWidth: 100 },
        { prop: 'skuNum', label: this.$t('maintainPlanRpt.skuNum'), minWidth: 100 },
        { prop: 'commodityQty', label: this.$t('maintainPlanRpt.commodityQty'), minWidth: 100 },
        { prop: 'remark', label: this.$t('maintainPlanRpt.remark'), minWidth: 100 },
        { prop: 'createName', label: this.$t('maintainPlanRpt.createName'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('maintainPlanRpt.createTime'), minWidth: 100 },
        { prop: 'auditUserName', label: this.$t('maintainPlanRpt.auditUserName'), minWidth: 100 },
        { prop: 'auditTime', label: this.$t('maintainPlanRpt.auditTime'), minWidth: 100 },
        // {prop:"lotId", label:this.$t('maintainPlanRpt.lotId'), minWidth:100},
        { prop: 'lotCode', label: this.$t('maintainPlanRpt.lotCode'), minWidth: 100 },
        // {prop:"zoneId", label:this.$t('maintainPlanRpt.zoneId'), minWidth:100},
        { prop: 'zoneName', label: this.$t('maintainPlanRpt.zoneName'), minWidth: 100 },
        // {prop:"skuId", label:this.$t('maintainPlanRpt.skuId'), minWidth:100},
        { prop: 'skuCode', label: this.$t('maintainPlanRpt.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('maintainPlanRpt.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('maintainPlanRpt.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('maintainPlanRpt.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('maintainPlanRpt.mainUnit'), minWidth: 100 },
        { prop: 'supplierName', label: this.$t('maintainPlanRpt.supplierName'), minWidth: 100 },
        { prop: 'mfgName', label: this.$t('maintainPlanRpt.mfgName'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('maintainPlanRpt.originCountry'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('maintainPlanRpt.drugForm'), minWidth: 100 },
        { prop: 'drugFormSpec', label: this.$t('maintainPlanRpt.drugFormSpec'), minWidth: 100 },
        { prop: 'lastTime', label: this.$t('maintainPlanRpt.lastTime'), minWidth: 150 },
        { prop: 'planBeginTime', label: this.$t('maintainPlanRpt.planBeginTime'), minWidth: 100 },
        { prop: 'planEndTime', label: this.$t('maintainPlanRpt.planEndTime'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('maintainPlanRpt.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('maintainPlanRpt.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('maintainPlanRpt.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('maintainPlanRpt.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('maintainPlanRpt.invalidDate'), minWidth: 100 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.diaFormInfo.fieldList = [
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.diaFormInfo.fieldList = [
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.diaFormInfo.fieldList = [
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
