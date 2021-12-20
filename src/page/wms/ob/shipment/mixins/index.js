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
          shipmentNo: null,
          shipmentStatus: null,
          shipmentTime: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        shipmentStatusList: [],
        shipTypeList: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '210', // 默认操作按钮列宽度
          btList: []
          /* btList: [//添加操作按钮
            //默认查看按钮
            {label:this.$t('table.view'), type: 'primary', icon: '', event: 'openViewPage', show: true,disabled:this.$hasPerm('view')},//event值为notification.js中定义的方法名
            //默认修改按钮
            {label:this.$t('table.edit'), type: 'success', icon: '', event: 'openEditPage', show: true,disabled:this.$hasPerm('edit')},//event值为notification.js中定义的方法名
            //默认删除按钮
            {label:this.$t('table.delete'), type: 'danger', icon: '', event: 'deleteData', show: true ,disabled:this.$hasPerm('delete')},//event值为notification.js中定义的方法名
          ]*/
        }
      },
      // 弹窗表单
      diaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {
          shipmentNo: null,
          boxNo: null, // 箱号
          cusOrderNo: null, // 客户订单号
          dtList: []
        }, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合

        subTop: {
          ref: null,
          fieldList: [],
          handle: null
        },

        subTableInfo: {
          topBtn: { label: '增加明细', show: false, type: 'primary', disabled: false },
          ref: null,
          fieldList: [],
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
        { label: this.$t('shipment.shipmentNo'), value: 'shipmentNo', type: 'input' },
        { label: this.$t('shipment.shipmentStatus'), value: 'shipmentStatus', type: 'select', list: 'shipmentStatusList' },
        { label: this.$t('shipment.shipType'), value: 'shipType', type: 'select', list: 'shipTypeList' },
        { label: this.$t('shipment.dt.transOrderNo'), value: 'transOrderNo', type: 'input' },
        { label: this.$t('shipment.dt.boxNo'), value: 'boxNo', type: 'input' },
        { label: this.$t('shipment.partnerId'), value: 'partnerId', type: 'slot' },
        { label: this.$t('shipment.dt.cusOrderNo'), value: 'cusOrderNo', type: 'input' },
        { label: this.$t('shipment.supplierName'), value: 'supplierName', type: 'input' },
        { label: this.$t('shipment.partnerStoreName'), value: 'partnerStoreName', type: 'input' },
        { label: this.$t('shipment.driverName'), value: 'driverName', type: 'input' },
        { label: this.$t('shipment.shipperName'), value: 'shipperName', type: 'input' },
        { label: this.$t('出库时间From'), value: 'beginShipmentTime', type: 'date', dateType: 'date' },
        { label: this.$t('To'), value: 'endShipmentTime', type: 'date', dateType: 'date' },
        { label: this.$t('创建时间From'), value: 'beginCreateTime', type: 'date', dateType: 'date' },
        { label: this.$t('To'), value: 'endCreateTime', type: 'date', dateType: 'date' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('shipment.shipmentNo'), value: 'shipmentNo', type: 'input' },
        { label: this.$t('shipment.shipmentStatus'), value: 'shipmentStatus', type: 'select', list: 'shipmentStatusList' },
        { label: this.$t('shipment.dt.transOrderNo'), value: 'transOrderNo', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
      this.topForm.data.partnerId = null
    },
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'shipmentNo', label: this.$t('shipment.shipmentNo'), minWidth: 150 },
        { prop: 'shipTypeName', label: this.$t('shipment.shipTypeName'), minWidth: 150 },
        { prop: 'shipmentStatusName', label: this.$t('shipment.shipmentStatusName'), minWidth: 80 },
        { prop: 'partnerShortName', label: this.$t('shipment.partnerShortName'), minWidth: 100 },
        { prop: 'partnerStoreName', label: this.$t('shipment.partnerStoreName'), minWidth: 100 },
        { prop: 'supplierName', label: this.$t('shipment.supplierName'), minWidth: 100 },
        { prop: 'driverName', label: this.$t('shipment.driverName'), minWidth: 100 },
        { prop: 'carNo', label: this.$t('shipment.carNo'), minWidth: 100 },
        { prop: 'shipperName', label: this.$t('shipment.shipperName'), minWidth: 100 },
        { prop: 'shipperTel', label: this.$t('shipment.shipperTel'), minWidth: 100 },
        { prop: 'shipperCertNo', label: this.$t('shipment.shipperCertNo'), minWidth: 150 },
        { prop: 'shipmentTime', label: this.$t('shipment.shipmentTime'), minWidth: 150 },
        { prop: 'soNum', label: this.$t('shipment.soNum'), minWidth: 70 },
        { prop: 'boxNum', label: this.$t('shipment.boxNum'), minWidth: 50 },
        { prop: 'totalWeightStr', label: this.$t('shipment.totalWeightStr'), minWidth: 100 },
        { prop: 'totalVolStr', label: this.$t('shipment.totalVolStr'), minWidth: 100 },
        { prop: 'remark', label: this.$t('shipment.remark'), minWidth: 100 },
        { prop: 'createName', label: this.$t('shipment.createName'), minWidth: 70 },
        { prop: 'createTime', label: this.$t('shipment.createTime'), minWidth: 150 },
        { prop: 'updateName', label: this.$t('shipment.updateName'), minWidth: 70 },
        { prop: 'updateTime', label: this.$t('shipment.updateTime'), minWidth: 150 },
        { label: '操作', value: 'status', width: 200, type: 'slot', fixed: 'right' }

      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('shipment.shipmentNo'), value: 'shipmentNo', type: 'input', readonly: true },
        { label: this.$t('shipment.shipTypeName'), value: 'shipTypeName', type: 'input', readonly: true },
        { label: this.$t('shipment.shipmentStatusName'), value: 'shipmentStatusName', type: 'input', readonly: true },
        { label: this.$t('shipment.partnerShortName'), value: 'partnerShortName', type: 'input', readonly: true },

        { label: this.$t('shipment.partnerStoreName'), value: 'partnerStoreName', type: 'input', readonly: true },
        { label: this.$t('shipment.supplierName'), value: 'supplierName', type: 'input', readonly: true },
        { label: this.$t('shipment.driverName'), value: 'driverName', type: 'input', readonly: true },
        { label: this.$t('shipment.carNo'), value: 'carNo', type: 'input', readonly: true },
        { label: this.$t('shipment.shipperName'), value: 'shipperName', type: 'input', readonly: true },
        { label: this.$t('shipment.shipperTel'), value: 'shipperTel', type: 'input', readonly: true },
        { label: this.$t('shipment.shipperCertNo'), value: 'shipperCertNo', type: 'input', readonly: true },

        { label: this.$t('shipment.shipmentTime'), value: 'shipmentTime', type: 'input', readonly: true },
        { label: this.$t('shipment.soNum'), value: 'soNum', type: 'input', readonly: true },
        { label: this.$t('shipment.boxNum'), value: 'boxNum', type: 'input', readonly: true },
        { label: this.$t('shipment.totalWeightStr'), value: 'totalWeightStr', type: 'input', readonly: true },
        { label: this.$t('shipment.totalVolStr'), value: 'totalVolStr', type: 'input', readonly: true },
        { label: this.$t('shipment.remark'), value: 'remark', type: 'input', readonly: true },
        { label: this.$t('shipment.createName'), value: 'createName', type: 'input', readonly: true },
        { label: this.$t('shipment.createTime'), value: 'createTime', type: 'input', readonly: true },
        { label: this.$t('shipment.updateName'), value: 'updateName', type: 'input', readonly: true },
        { label: this.$t('shipment.updateTime'), value: 'updateTime', type: 'input', readonly: true }
      ]

      this.diaFormInfo.subTop.fieldList = []
      // 明细数据
      this.diaFormInfo.subTableInfo.fieldList = [
        // {label:'' , type: "selection", width: 50},//序列
        { prop: 'boxNo', label: this.$t('shipment.dt.boxNo'), minWidth: 100 },
        { prop: 'transOrderNo', label: this.$t('shipment.dt.transOrderNo'), minWidth: 100 },
        { prop: 'weightStr', label: this.$t('shipment.dt.weightStr'), minWidth: 100 },
        { prop: 'volStr', label: this.$t('shipment.dt.volStr'), minWidth: 100 },
        { prop: 'cusOrderNo', label: this.$t('shipment.dt.cusOrderNo'), minWidth: 100 },
        { prop: 'receiver', label: this.$t('shipment.dt.receiver'), minWidth: 100 },
        { prop: 'receiverTel', label: this.$t('shipment.dt.receiverTel'), minWidth: 100 },
        { prop: 'receiverAddr', label: this.$t('shipment.dt.receiverAddr'), minWidth: 100 }
      ]

      this.diaFormInfo.subTableInfo.handle = null
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('shipment.shipmentNo'), value: 'shipmentNo', type: 'input', readonly: true },
        // {label: this.$t('shipment.shipmentStatus'), value: "shipmentStatus", type: "select", list:'shipmentStatusList'},
        { label: this.$t('shipment.shipType'), value: 'shipType', type: 'select', list: 'shipTypeList' },

        { label: this.$t('shipment.partnerId'), value: 'partnerId', type: 'slot' },
        { label: this.$t('shipment.partnerStoreId'), value: 'partnerStoreId', type: 'slot' },
        { label: this.$t('shipment.supplierId'), value: 'supplierId', type: 'slot' },
        { label: this.$t('shipment.driverName'), value: 'driverName', type: 'input' },
        { label: this.$t('shipment.carNo'), value: 'carNo', type: 'input' },
        { label: this.$t('shipment.shipperName'), value: 'shipperName', type: 'input' },
        { label: this.$t('shipment.shipperTel'), value: 'shipperTel', type: 'input' },
        { label: this.$t('shipment.shipperCertNo'), value: 'shipperCertNo', type: 'input' },

        { label: this.$t('shipment.shipmentTime'), value: 'shipmentTime', type: 'date', dateType: 'date' },
        { label: this.$t('shipment.soNum'), value: 'soNum', type: 'input' },
        { label: this.$t('shipment.boxNum'), value: 'boxNum', type: 'input' },
        { label: this.$t('shipment.totalWeightStr'), value: 'totalWeightStr', type: 'input' },
        { label: this.$t('shipment.totalVolStr'), value: 'totalVolStr', type: 'input' },
        { label: this.$t('shipment.remark'), value: 'remark', type: 'input' }
      ]

      // 明细数据
      this.diaFormInfo.subTop.fieldList = [
        { label: '箱号', value: 'boxNo', type: 'slot' },
        { label: '客户订单号', value: 'cusOrderNo', type: 'slot' }
      ]

      // 明细数据
      this.diaFormInfo.subTableInfo.fieldList = [
        // {label:'' , type: "selection", width: 50},//序列
        { prop: 'boxNo', label: this.$t('shipment.dt.boxNo'), minWidth: 100 },
        { prop: 'transOrderNo', label: this.$t('shipment.dt.transOrderNo'), minWidth: 100 },
        { prop: 'weightStr', label: this.$t('shipment.dt.weightStr'), minWidth: 100 },
        { prop: 'volStr', label: this.$t('shipment.dt.volStr'), minWidth: 100 },
        { prop: 'cusOrderNo', label: this.$t('shipment.dt.cusOrderNo'), minWidth: 100 },
        { prop: 'receiver', label: this.$t('shipment.dt.receiver'), minWidth: 100 },
        { prop: 'receiverTel', label: this.$t('shipment.dt.receiverTel'), minWidth: 100 },
        { prop: 'receiverAddr', label: this.$t('shipment.dt.receiverAddr'), minWidth: 100 }
      ]

      this.diaFormInfo.subTableInfo.handle = { // 表格自定义按钮
        fixed: 'right',
        label: this.$t('table.actions'), // 操作列名
        width: '100', // 默认操作按钮列宽度
        btList: [// 添加操作按钮
          // 默认删除按钮
          {
            label: this.$t('table.delete'),
            type: 'danger',
            icon: '',
            event: 'deleteDt',
            show: true,
            disabled: false
          }// event值为notification.js中定义的方法名
        ]
      }
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('shipment.shipmentNo'), value: 'shipmentNo', type: 'input', readonly: true },
        { label: this.$t('shipment.shipmentStatusName'), value: 'shipmentStatusName', type: 'input', readonly: true },
        // {label: this.$t('shipment.shipType'), value: "shipType", type: "select" ,list:'shipTypeList'},
        // {label: this.$t('shipment.partnerId'), value: "partnerId", type: "slot"},
        { label: this.$t('shipment.shipTypeName'), value: 'shipTypeName', type: 'input', readonly: true },
        { label: this.$t('shipment.partnerShortName'), value: 'partnerShortName', type: 'input', readonly: true },

        { label: this.$t('shipment.partnerStoreId'), value: 'partnerStoreId', type: 'slot' },
        { label: this.$t('shipment.supplierId'), value: 'supplierId', type: 'slot' },
        { label: this.$t('shipment.driverName'), value: 'driverName', type: 'input' },
        { label: this.$t('shipment.carNo'), value: 'carNo', type: 'input' },
        { label: this.$t('shipment.shipperName'), value: 'shipperName', type: 'input' },
        { label: this.$t('shipment.shipperTel'), value: 'shipperTel', type: 'input' },
        { label: this.$t('shipment.shipperCertNo'), value: 'shipperCertNo', type: 'input' },
        { label: this.$t('shipment.shipmentTime'), value: 'shipmentTime', type: 'input', readonly: true },
        { label: this.$t('shipment.soNum'), value: 'soNum', type: 'input', readonly: true },
        { label: this.$t('shipment.boxNum'), value: 'boxNum', type: 'input', readonly: true },
        { label: this.$t('shipment.totalWeightStr'), value: 'totalWeightStr', type: 'input', readonly: true },
        { label: this.$t('shipment.totalVolStr'), value: 'totalVolStr', type: 'input', readonly: true },
        { label: this.$t('shipment.remark'), value: 'remark', type: 'input' },
        { label: this.$t('shipment.createName'), value: 'createName', type: 'input', readonly: true },
        { label: this.$t('shipment.createTime'), value: 'createTime', type: 'input', readonly: true },
        { label: this.$t('shipment.updateName'), value: 'updateName', type: 'input', readonly: true },
        { label: this.$t('shipment.updateTime'), value: 'updateTime', type: 'input', readonly: true }
      ]
      // 明细数据
      this.diaFormInfo.subTop.fieldList = [
        { label: '箱号', value: 'boxNo', type: 'slot' },
        { label: '客户订单号', value: 'cusOrderNo', type: 'slot' }
      ]

      // 明细数据
      this.diaFormInfo.subTableInfo.fieldList = [
        // {label:'' , type: "selection", width: 50},//序列
        { prop: 'boxNo', label: this.$t('shipment.dt.boxNo'), minWidth: 100 },
        { prop: 'transOrderNo', label: this.$t('shipment.dt.transOrderNo'), minWidth: 100 },
        { prop: 'weightStr', label: this.$t('shipment.dt.weightStr'), minWidth: 100 },
        { prop: 'volStr', label: this.$t('shipment.dt.volStr'), minWidth: 100 },
        { prop: 'cusOrderNo', label: this.$t('shipment.dt.cusOrderNo'), minWidth: 100 },
        { prop: 'receiver', label: this.$t('shipment.dt.receiver'), minWidth: 100 },
        { prop: 'receiverTel', label: this.$t('shipment.dt.receiverTel'), minWidth: 100 },
        { prop: 'receiverAddr', label: this.$t('shipment.dt.receiverAddr'), minWidth: 100 }
      ]

      this.diaFormInfo.subTableInfo.handle = { // 表格自定义按钮
        fixed: 'right',
        label: this.$t('table.actions'), // 操作列名
        width: '100', // 默认操作按钮列宽度
        btList: [// 添加操作按钮
          // 默认删除按钮
          {
            label: this.$t('table.delete'),
            type: 'danger',
            icon: '',
            event: 'deleteDt',
            show: true,
            disabled: false
          }// event值为notification.js中定义的方法名
        ]
      }
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        // soNum:[{required: true, message: this.$t('shipment.msg.soNum'), trigger: 'blur'}],
        // boxNum:[{required: true, message: this.$t('shipment.msg.boxNum'), trigger: 'blur'}],
        shipType: [{ required: true, message: this.$t('shipment.msg.shipType'), trigger: 'blur' }],
        partnerId: [{ required: true, message: this.$t('shipment.msg.partnerId'), trigger: 'blur' }],
        whId: [{ required: true, message: this.$t('shipment.msg.whId'), trigger: 'blur' }],
        companyCode: [{ required: true, message: this.$t('shipment.msg.companyCode'), trigger: 'blur' }],
        shipmentStatus: [{ required: true, message: this.$t('shipment.msg.shipmentStatus'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        creator: null,
        totalVol: null,
        createTime: null,
        soNum: null,
        boxNum: null,
        shipmentNo: null,
        remark: null,
        totalWeight: null,
        updateName: null,
        updater: null,
        optimistic: null,
        shipmentTime: null,
        updateTime: null,
        partnerId: null,
        whId: null,
        companyCode: null,
        shipmentStatus: null,
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
    }
  }
}
