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
          waveOrderNo: null,
          waveOrderStatus: null,
          waveOrderType: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '130px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        waveOrderTypeList: [
        ],
        waveOrderStatusList: [
        ],
        pickModeList: []
      },
      idsList: [],
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '150', // 默认操作按钮列宽度
          btList: [// 添加操作按钮
            // 默认查看按钮
            { label: this.$t('table.view'), type: 'primary', icon: '', event: 'openViewPage', show: true, disabled: this.$hasPerm('view') }, // event值为notification.js中定义的方法名
            // 默认修改按钮
            { label: this.$t('table.edit'), type: 'success', icon: '', event: 'openEditPage', show: true, disabled: this.$hasPerm('edit') }// event值为notification.js中定义的方法名
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
          data: [],
          fieldList: [],
          topBtn: {},
          handle: { // 表格自定义按钮
            fixed: 'right',
            label: this.$t('table.actions'), // 操作列名
            width: '100', // 默认操作按钮列宽度
            btList: [// 添加操作按钮
              // 默认删除按钮
              { label: this.$t('table.delete'), type: 'danger', icon: '', event: 'deleteDt', show: true, disabled: false }// event值为notification.js中定义的方法名
            ]
          }
        }
      },
      // 明细表单
      diaFormInfoDt: {
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
        { label: this.$t('waveOrder.waveOrderNo'), value: 'waveOrderNo', type: 'input' },
        { label: this.$t('waveOrder.waveOrderStatus'), value: 'waveOrderStatus', type: 'select', list: 'waveOrderStatusList' },
        { label: this.$t('waveOrder.waveOrderType'), value: 'waveOrderType', type: 'select', list: 'waveOrderTypeList' },
        { label: this.$t('waveOrder.pickMode'), value: 'pickMode', type: 'select', list: 'pickModeList' },
        { label: this.$t('waveOrder.createTimeStart'), value: 'createTimeStart', type: 'date' },
        { label: this.$t('waveOrder.createTimeEnd'), value: 'createTimeEnd', type: 'date' },
        { label: this.$t('waveOrder.expOutTimeStart'), value: 'expOutTimeStart', type: 'date' },
        { label: this.$t('waveOrder.expOutTimeEnd'), value: 'expOutTimeEnd', type: 'date' },
        { label: '', value: 'sys', type: 'slot' }
      ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'selection', width: 50, fixed: 'left' }, // 选项框
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'waveOrderNo', label: this.$t('waveOrder.waveOrderNo'), minWidth: 120 },
        { prop: 'waveOrderStatusName', label: this.$t('waveOrder.waveOrderStatus'), minWidth: 100 },
        { prop: 'waveOrderTypeName', label: this.$t('waveOrder.waveOrderType'), minWidth: 100 },
        { prop: 'pickModeName', label: this.$t('waveOrder.pickMode'), minWidth: 100 },
        { prop: 'waveOrderLevel', label: this.$t('waveOrder.waveOrderLevel'), minWidth: 100 },
        { prop: 'soNum', label: this.$t('waveOrder.soNum'), minWidth: 100 },
        { prop: 'pickNum', label: this.$t('waveOrder.pickNum'), minWidth: 100 },
        { prop: 'skuNum', label: this.$t('waveOrder.skuNum'), minWidth: 100 },
        { prop: 'expOutTime', label: this.$t('waveOrder.expOutTime'), minWidth: 100 },
        { prop: 'remark', label: this.$t('waveOrder.remark'), minWidth: 100 },
        { prop: 'creator', label: this.$t('waveOrder.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('waveOrder.createTime'), minWidth: 100 },
        { prop: 'updater', label: this.$t('waveOrder.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('waveOrder.updateTime'), minWidth: 100 }
      ]
      // 初始化明细表格
      this.diaFormInfo.dtTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'soNo', label: this.$t('waveOrder.dt.soNo'), minWidth: 100 },
        { prop: 'soTypeName', label: this.$t('waveOrder.dt.soTypeName'), minWidth: 100 },
        { prop: 'soStatusName', label: this.$t('waveOrder.dt.soStatusName'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('waveOrder.dt.ownerName'), minWidth: 100 },
        { prop: 'customerName', label: this.$t('waveOrder.dt.customerName'), minWidth: 100 },
        { prop: 'partnerName', label: this.$t('waveOrder.dt.partnerName'), minWidth: 100 },
        { prop: 'storeName', label: this.$t('waveOrder.dt.storeName'), minWidth: 100 },
        { prop: 'cusOrderNo', label: this.$t('waveOrder.dt.cusOrderNo'), minWidth: 100 },
        { prop: 'receiver', label: this.$t('waveOrder.dt.receiver'), minWidth: 100 },
        { prop: 'receiverTel', label: this.$t('waveOrder.dt.receiverTel'), minWidth: 100 },
        { prop: 'addressDetail', label: this.$t('waveOrder.dt.addressDetail'), minWidth: 100 },
        { prop: 'isSelfName', label: this.$t('waveOrder.dt.isSelfName'), minWidth: 100 },
        { prop: 'isHasInvoiceName', label: this.$t('waveOrder.dt.isHasInvoiceName'), minWidth: 100 }

      ]
      // 初始化新增明细表单
      this.diaFormInfoDt.fieldList = [
        { label: this.$t('waveOrder.dt.soId'), value: 'soId', type: 'input' },
        { label: this.$t('waveOrder.dt.soNo'), value: 'soNo', type: 'input' },
        { label: this.$t('waveOrder.dt.remark'), value: 'remark', type: 'input' }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('waveOrder.id'), value: 'id', type: 'input', readonly: true },
        { label: this.$t('waveOrder.waveOrderNo'), value: 'waveOrderNo', type: 'input', readonly: true },
        { label: this.$t('waveOrder.waveOrderStatus'), value: 'waveOrderStatus', type: 'select', list: 'waveOrderStatusList', disabled: true },
        { label: this.$t('waveOrder.waveOrderType'), value: 'waveOrderType', type: 'select', list: 'waveOrderTypeList', disabled: true },
        { label: this.$t('waveOrder.pickMode'), value: 'pickMode', type: 'select', list: 'pickModeList', disabled: true },
        { label: this.$t('waveOrder.waveOrderLevel'), value: 'waveOrderLevel', type: 'input', readonly: true },
        { label: this.$t('waveOrder.soNum'), value: 'soNum', type: 'input', readonly: true },
        { label: this.$t('waveOrder.pickNum'), value: 'pickNum', type: 'input', readonly: true },
        { label: this.$t('waveOrder.skuNum'), value: 'skuNum', type: 'input', readonly: true },
        { label: this.$t('waveOrder.expOutTime'), value: 'expOutTime', type: 'input', readonly: true },
        { label: this.$t('waveOrder.remark'), value: 'remark', type: 'input', readonly: true },
        { label: this.$t('waveOrder.creator'), value: 'creator', type: 'input', readonly: true },
        { label: this.$t('waveOrder.createTime'), value: 'createTime', type: 'input', readonly: true },
        { label: this.$t('waveOrder.updater'), value: 'updater', type: 'input', readonly: true },
        { label: this.$t('waveOrder.updateTime'), value: 'updateTime', type: 'input', readonly: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.data = {
        waveOrderType: this.listTypeInfo.waveOrderTypeList.length == 0 ? null : this.listTypeInfo.waveOrderTypeList[0].value,
        waveOrderStatus: this.listTypeInfo.waveOrderStatusList.length == 0 ? null : this.listTypeInfo.waveOrderStatusList[0].value
      }

      this.diaFormInfo.fieldList = [
        { label: this.$t('waveOrder.waveOrderType'), value: 'waveOrderType', type: 'select', list: 'waveOrderTypeList' },
        { label: this.$t('waveOrder.waveOrderLevel'), value: 'waveOrderLevel', type: 'input' },
        { label: this.$t('waveOrder.expOutTime'), value: 'expOutTime', type: 'input' },
        { label: this.$t('waveOrder.soNum'), value: 'soNum', type: 'input' },
        { label: this.$t('waveOrder.remark'), value: 'remark', type: 'input' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('waveOrder.waveOrderNo'), value: 'waveOrderNo', type: 'input', readonly: true },
        { label: this.$t('waveOrder.waveRuleId'), value: 'waveRuleId', type: 'input', readonly: true },
        { label: this.$t('waveOrder.soNum'), value: 'soNum', type: 'input', readonly: true },
        { label: this.$t('waveOrder.waveOrderStatus'), value: 'waveOrderStatus', type: 'select', list: 'waveOrderStatusList', disabled: true },
        { label: this.$t('waveOrder.waveOrderType'), value: 'waveOrderType', type: 'select', list: 'waveOrderTypeList', disabled: true },
        { label: this.$t('waveOrder.pickMode'), value: 'pickMode', type: 'select', list: 'pickModeList', disabled: true },
        { label: this.$t('waveOrder.waveOrderLevel'), value: 'waveOrderLevel', type: 'input', readonly: true },
        { label: this.$t('waveOrder.pickNum'), value: 'pickNum', type: 'input', readonly: true },
        { label: this.$t('waveOrder.skuNum'), value: 'skuNum', type: 'input', readonly: true },
        { label: this.$t('waveOrder.expOutTime'), value: 'expOutTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss', readonly: true },
        { label: this.$t('waveOrder.remark'), value: 'remark', type: 'input', readonly: true }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        soNum: [{ required: true, message: this.$t('waveOrder.msg.soNum'), trigger: 'blur' }],
        waveOrderType: [{ required: true, message: this.$t('waveOrder.msg.waveOrderType'), trigger: 'blur' }],
        waveOrderNo: [{ required: true, message: this.$t('waveOrder.msg.waveOrderNo'), trigger: 'blur' }],
        pickNum: [{ required: true, message: this.$t('waveOrder.msg.pickNum'), trigger: 'blur' }],
        expOutTime: [{ required: true, message: this.$t('waveOrder.msg.expOutTime'), trigger: 'blur' }],
        waveOrderLevel: [{ required: true, message: this.$t('waveOrder.msg.waveOrderLevel'), trigger: 'blur' }],
        skuNum: [{ required: true, message: this.$t('waveOrder.msg.skuNum'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        soNum: null,
        waveOrderType: null,
        waveOrderNo: null,
        remark: null,
        pickQty: null,
        waveRuleId: null,
        expOutTime: null,
        waveOrderLevel: null,
        skuQty: null,
        soQty: null
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
