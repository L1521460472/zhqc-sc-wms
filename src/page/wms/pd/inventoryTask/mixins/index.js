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
          ownerId: null,
          inventoryType: null,
          inventoryMethod: null,
          creator: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '130px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        inventoryTypeList: [],
        inventoryMethodList: [],
        isEmptyLotList: [],
        isTransitionalLotList: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '210', // 默认操作按钮列宽度
          btList: [// 添加操作按钮
            // 默认查看按钮
            {
              label: this.$t('table.view'),
              type: 'primary',
              icon: '',
              event: 'openViewPage',
              show: true,
              disabled: this.$hasPerm('view')
            }, // event值为notification.js中定义的方法名
            // 默认修改按钮
            {
              label: this.$t('复制'),
              type: 'success',
              icon: '',
              event: 'openCopyPage',
              show: true,
              disabled: this.$hasPerm('copy')
            }, // event值为notification.js中定义的方法名
            // 默认删除按钮
            {
              label: this.$t('table.delete'),
              type: 'danger',
              icon: '',
              event: 'deleteData',
              show: true,
              disabled: this.$hasPerm('delete')
            }// event值为notification.js中定义的方法名
          ]
        }
      },
      // 弹窗表单
      diaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        labelWidth: '170px'
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
        { label: this.$t('inventoryTask.inventoryType'), value: 'inventoryType', type: 'select', list: 'inventoryTypeList' },
        { label: this.$t('inventoryTask.owner'), value: 'ownerId', type: 'slot' },
        { label: this.$t('inventoryTask.inventoryMethod'), value: 'inventoryMethod', type: 'select', list: 'inventoryMethodList' },
        { label: this.$t('inventoryTask.planStartTimeBegin'), value: 'planStartTimeBegin', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('inventoryTask.planStartTimeEnd'), value: 'planStartTimeEnd', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('inventoryTask.creator'), value: 'creator', type: 'input' },
        { label: this.$t('inventoryTask.createTimeBegin'), value: 'createTimeBegin', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('inventoryTask.createTimeEnd'), value: 'createTimeEnd', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('inventoryTask.inventoryType'), value: 'inventoryType', type: 'select', list: 'inventoryTypeList' },
        { label: this.$t('inventoryTask.owner'), value: 'ownerId', type: 'slot' },
        { label: this.$t('inventoryTask.inventoryMethod'), value: 'inventoryMethod', type: 'select', list: 'inventoryMethodList' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },

    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'inventoryTypeStr', label: this.$t('inventoryTask.inventoryType'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('inventoryTask.owner'), minWidth: 100 },
        { prop: 'planStartTime', label: this.$t('inventoryTask.planStartTime'), minWidth: 120 },
        {
          prop: 'inventoryMethodStr',
          label: this.$t('inventoryTask.inventoryMethod'),
          minWidth: 100
        },
        {
          prop: 'priority',
          label: this.$t('inventoryTask.priority'),
          minWidth: 80
        },
        { prop: 'inventoryNo', label: this.$t('inventoryTask.inventoryNo'), minWidth: 120 },
        { prop: 'createName', label: this.$t('inventoryTask.createName'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('inventoryTask.createTime'), minWidth: 100 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.diaFormInfo.fieldList = [
        {
          label: this.$t('inventoryTask.inventoryType'),
          value: 'inventoryTypeStr',
          type: 'input',
          readonly: true
        },
        { label: this.$t('inventoryTask.owner'), value: 'ownerName', type: 'input', readonly: true },
        { label: this.$t('inventoryTask.planStartTime'), value: 'planStartTime', type: 'input', readonly: true },
        {
          label: this.$t('inventoryTask.inventoryMethod'),
          value: 'inventoryMethodStr',
          type: 'input',
          readonly: true
        },
        {
          label: this.$t('inventoryTask.dynamicInventoryStartTime'),
          value: 'dynamicInventoryStartTime',
          type: 'input',
          readonly: true
        },
        {
          label: this.$t('inventoryTask.dynamicInventoryEndTime'),
          value: 'dynamicInventoryEndTime',
          type: 'input',
          readonly: true
        },
        {
          label: this.$t('inventoryTask.randomInventoryDtQty'),
          value: 'randomInventoryDtQty',
          type: 'input',
          readonly: true
        },
        { label: this.$t('inventoryTask.priority'), value: 'priority', type: 'input', readonly: true },
        { label: this.$t('inventoryTask.isEmptyLot'), value: 'isEmptyLotStr', type: 'input', readonly: true },
        {
          label: this.$t('inventoryTask.isTransitionalLot'),
          value: 'isTransitionalLotStr',
          type: 'input',
          readonly: true
        },
        { label: this.$t('inventoryTask.skuIdStart'), value: 'skuStartName', type: 'input', readonly: true },
        { label: this.$t('inventoryTask.skuIdEnd'), value: 'skuEndName', type: 'input', readonly: true },
        { label: this.$t('inventoryTask.zoneIdStart'), value: 'zoneStartName', type: 'input', readonly: true },
        { label: this.$t('inventoryTask.zoneIdEnd'), value: 'zoneEndName', type: 'input', readonly: true },
        { label: this.$t('inventoryTask.lotIdStart'), value: 'lotStartName', type: 'input', readonly: true },
        { label: this.$t('inventoryTask.lotIdEnd'), value: 'lotEndName', type: 'input', readonly: true },
        {
          label: this.$t('inventoryTask.productionBatchStart'),
          value: 'productionBatchStart',
          type: 'input',
          readonly: true
        },
        {
          label: this.$t('inventoryTask.productionBatchEnd'),
          value: 'productionBatchEnd',
          type: 'input',
          readonly: true
        },
        {
          label: this.$t('inventoryTask.instoreDateStartDate'),
          value: 'instoreDateStartDate',
          type: 'input',
          readonly: true
        },
        {
          label: this.$t('inventoryTask.instoreDateEndDate'),
          value: 'instoreDateEndDate',
          type: 'input',
          readonly: true
        },
        {
          label: this.$t('inventoryTask.invalidDateStartDate'),
          value: 'invalidDateStartDate',
          type: 'input',
          readonly: true
        },
        {
          label: this.$t('inventoryTask.invalidDateEndDate'),
          value: 'invalidDateEndDate',
          type: 'input',
          readonly: true
        },
        { label: this.$t('inventoryTask.remark'), value: 'remark', type: 'textarea', disabled: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.diaFormInfo.data = {
        inventoryMethod: this.listTypeInfo.inventoryMethodList.length == 0 ? null : this.listTypeInfo.inventoryMethodList[1].value,
        isEmptyLot: this.listTypeInfo.isEmptyLotList.length == 0 ? null : this.listTypeInfo.isEmptyLotList[1].value,
        isTransitionalLot: this.listTypeInfo.isTransitionalLotList.length == 0 ? null : this.listTypeInfo.isTransitionalLotList[1].value

      }
      this.diaFormInfo.fieldList = [
        {
          label: this.$t('inventoryTask.inventoryType'),
          value: 'inventoryType',
          type: 'select',
          list: 'inventoryTypeList'
        },
        { label: this.$t('inventoryTask.owner'), value: 'ownerId', type: 'slot' },
        {
          label: this.$t('inventoryTask.planStartTime'),
          value: 'planStartTime',
          type: 'date',
          dateType: 'datetime',
          format: 'yyyy-MM-dd HH:mm:ss',
          valueFormat: 'yyyy-MM-dd HH:mm:ss'
        },
        {
          label: this.$t('inventoryTask.inventoryMethod'),
          value: 'inventoryMethod',
          type: 'select',
          list: 'inventoryMethodList'
        },
        {
          label: this.$t('inventoryTask.dynamicInventoryStartTime'),
          value: 'dynamicInventoryStartTime',
          type: 'date',
          dateType: 'datetime',
          format: 'yyyy-MM-dd HH:mm:ss',
          valueFormat: 'yyyy-MM-dd HH:mm:ss',
          disabled: true
        },
        {
          label: this.$t('inventoryTask.dynamicInventoryEndTime'),
          value: 'dynamicInventoryEndTime',
          type: 'date',
          dateType: 'datetime',
          format: 'yyyy-MM-dd HH:mm:ss',
          valueFormat: 'yyyy-MM-dd HH:mm:ss',
          disabled: true
        },
        {
          label: this.$t('inventoryTask.randomInventoryDtQty'),
          value: 'randomInventoryDtQty',
          type: 'input',
          disabled: true
        },
        { label: this.$t('inventoryTask.priority'), value: 'priority', type: 'input', disabled: true },
        {
          label: this.$t('inventoryTask.isEmptyLot'),
          value: 'isEmptyLot',
          type: 'select',
          list: 'isEmptyLotList'
        },
        {
          label: this.$t('inventoryTask.isTransitionalLot'),
          value: 'isTransitionalLot',
          type: 'select',
          list: 'isTransitionalLotList'
        },

        { label: this.$t('inventoryTask.skuIdStart'), value: 'skuIdStart', type: 'slot' },
        { label: this.$t('inventoryTask.skuIdEnd'), value: 'skuIdEnd', type: 'slot' },
        { label: this.$t('inventoryTask.zoneIdStart'), value: 'zoneIdStart', type: 'slot' },
        { label: this.$t('inventoryTask.zoneIdEnd'), value: 'zoneIdEnd', type: 'slot' },
        { label: this.$t('inventoryTask.lotIdStart'), value: 'lotIdStart', type: 'slot' },
        { label: this.$t('inventoryTask.lotIdEnd'), value: 'lotIdEnd', type: 'slot' },
        { label: this.$t('inventoryTask.productionBatchStart'), value: 'productionBatchStart', type: 'input' },
        { label: this.$t('inventoryTask.productionBatchEnd'), value: 'productionBatchEnd', type: 'input' },
        {
          label: this.$t('inventoryTask.instoreDateStartDate'),
          value: 'instoreDateStartDate',
          type: 'date'
        },
        {
          label: this.$t('inventoryTask.instoreDateEndDate'),
          value: 'instoreDateEndDate',
          type: 'date'
        },
        {
          label: this.$t('inventoryTask.invalidDateStartDate'),
          value: 'invalidDateStartDate',
          type: 'date'
        },
        {
          label: this.$t('inventoryTask.invalidDateEndDate'),
          value: 'invalidDateEndDate',
          type: 'date'
        },
        { label: this.$t('inventoryTask.remark'), value: 'remark', type: 'textarea' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.diaFormInfo.fieldList = []
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        planStartTime: [{ required: true, message: this.$t('inventoryTask.msg.planStartTime'), trigger: 'blur' }],
        ownerId: [{ required: true, message: this.$t('inventoryTask.msg.ownerId'), trigger: 'blur' }],
        isTransitionalLot: [{
          required: true,
          message: this.$t('inventoryTask.msg.isTransitionalLot'),
          trigger: 'blur'
        }],
        updater: [{ required: true, message: this.$t('inventoryTask.msg.updater'), trigger: 'blur' }],
        updateTime: [{ required: true, message: this.$t('inventoryTask.msg.updateTime'), trigger: 'blur' }],
        inventoryMethod: [{
          required: true,
          message: this.$t('inventoryTask.msg.inventoryMethod'),
          trigger: 'blur'
        }],
        companyCode: [{ required: true, message: this.$t('inventoryTask.msg.companyCode'), trigger: 'blur' }],
        id: [{ required: true, message: this.$t('inventoryTask.msg.id'), trigger: 'blur' }],
        creator: [{ required: true, message: this.$t('inventoryTask.msg.creator'), trigger: 'blur' }],
        createTime: [{ required: true, message: this.$t('inventoryTask.msg.createTime'), trigger: 'blur' }],
        whId: [{ required: true, message: this.$t('inventoryTask.msg.whId'), trigger: 'blur' }],
        isEmptyLot: [{ required: true, message: this.$t('inventoryTask.msg.isEmptyLot'), trigger: 'blur' }],
        inventoryType: [{ required: true, message: this.$t('inventoryTask.msg.inventoryType'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        productionBatchStart: null,
        planStartTime: null,
        ownerId: null,
        isTransitionalLot: null,
        remark: null,
        updateName: null,
        updater: null,
        optimistic: null,
        zoneIdEnd: null,
        updateTime: null,
        productionBatchEnd: null,
        skuIdEnd: null,
        lotIdStart: null,
        zoneIdStart: null,
        inventoryMethod: null,
        companyCode: null,
        randomInventoryDtQty: null,
        id: null,
        lotIdEnd: null,
        creator: null,
        createTime: null,
        inventoryId: null,
        dynamicInventoryStartTime: null,
        skuIdStart: null,
        priority: null,
        whId: null,
        isEmptyLot: null,
        dynamicInventoryEndTime: null,
        inventoryType: null,
        inventoryNo: null,
        createName: null
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
