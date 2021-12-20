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
          transportNo: null,
          status: null,
          ownerCode: null,
          ownerName: null,
          carrierCode: null,
          carrierName: null,
          actualSendDateBegin: null,
          actualSendDateEnd: null,
          deliverType: null,
          orderPsType: null,
          transportType: null,
          senderName: null,
          senderCode: null,
          sendContactor: null,
          senderPhone: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px' // 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        orderDateNameList: [],
        orderPsTypeList: [],
        errorReportList: [],
        deliveryTypeList: [],
        transportStatusList: [],
        transportTypeList: [],
        VexTransportStatusList: [],
        transportStatusByRouteList: []

      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '380', // 默认操作按钮列宽度
          btList: [// 添加操作按钮
            { label: this.$t('table.view'), type: 'primary', icon: '', event: 'openViewPage', show: true, disabled: false, status: 1 },
            { label: '改派', type: 'success', icon: '', event: 'openEditPage', show: true, disabled: false },
            { label: '更多', type: 'warning', icon: 'el-icon-more', event: '', btShow: true,
              moreList: [
                { label: '路由维护', type: 'success', icon: '', event: 'openEditRoutePage', show: true, disabled: false },
                { label: '异常报备', type: 'danger', icon: '', event: 'openAbnormalPage', show: true, disabled: false }, // event值为notification.js中定义的方法名
                { label: '取消', type: 'danger', icon: '', event: 'openCancelPage', show: true, disabled: false } // event值为notification.js中定义的方法名
              ] }
          ]
        }
      },
      // 全屏弹窗
      fullDialogInfo: {
        title: '',
        visible: false,
        type: '',
        // 返回按钮
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
        btList: [
          {
            label: this.$t('table.close'),
            type: '',
            icon: '',
            event: 'close',
            show: true
          },
          {
            label: this.$t('table.save'),
            type: 'primary',
            icon: '',
            event: 'fullSaveDate',
            btLoading: false,
            show: true
          }
        ]
      },
      // 全屏弹窗表单
      fullDiaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        config: { trigger: 'click', mode: 'cell', activeMethod: this.activeCellMethod },
        dtTableInfo: { // 改派
          ref: null,
          data: [],
          deleteIds: [],
          fieldList: [],
          topBtn: {},
          handle: null
        },
        dtTableInfoRoute: { // 路由维护
          ref: null,
          data: [],
          deleteIds: [],
          fieldList: [],
          topBtn: { label: '添加', type: 'primary', icon: 'el-icon-folder-add', event: 'addDt', show: true },
          handle: { // 表格自定义按钮
            fixed: 'right',
            label: this.$t('table.actions'), // 操作列名
            width: '100', // 默认操作按钮列宽度
            btList: [// 添加操作按钮
              // 默认删除按钮
              { label: this.$t('table.delete'), type: 'danger', icon: '', event: 'deleteDt', show: true, disabled: false }
            ]
          },
          rules: {}
        }
      },
      // 模态框表单
      diaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {
          transportNo: null,
          subTransportCompany: null,
          subTransportType: null,
          vehicleModel: null,
          trainNumber: null,
          plateNumber: null,
          driver: null,
          driverPhone: null,
          cntrNo: null,
          wagon: null,
          shippingSpace: null,
          facingSlip: null,
          estimateSendTime: null,
          actualSendTime: null,
          estimateReceiveTime: null,
          actualReceiveTime: null
        }, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}// 配置的表单字段校验规则集合
      },
      diaFormInfoAbnormal: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {
          transportNo: null,
          errReport: null,
          operationDesc: null,
          evidenceImage: null,
          evidencePdf: null,
          evidenceWord: null
        }, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}// 配置的表单字段校验规则集合
      }
    }
  },
  mounted() {
    this.collapsableForm()
    this.initTopFormColumns()// 初始化查询界面配置数据
    this.rulesInit()// 初始化diaFormInfo表单字段校验规则
  },
  methods: {
    // 展开收起表单
    collapsableFormMore() {
      this.topForm.fieldList = [
        { label: this.$t('waybill.transportNo'), value: 'transportNo', type: 'input' },
        { label: this.$t('waybill.status'), value: 'status', type: 'select', list: 'transportStatusList' },
        { label: this.$t('waybill.transportType'), value: 'transportType', type: 'select', list: 'transportTypeList' },
        { label: this.$t('waybill.orderPsType'), value: 'orderPsType', type: 'select', list: 'orderPsTypeList' },
        { label: this.$t('waybill.deliverType'), value: 'deliverType', type: 'select', list: 'deliveryTypeList' },
        { label: this.$t('waybill.carrierName'), value: 'carrierName', type: 'slot' },
        { label: this.$t('waybill.senderName'), value: 'senderName', type: 'slot' },
        { label: this.$t('waybill.sendContactor'), value: 'sendContactor', type: 'input' },
        { label: this.$t('waybill.senderPhone'), value: 'senderPhone', type: 'input' },
        { label: this.$t('waybill.ownerName'), value: 'ownerName', type: 'slot' },
        { label: this.$t('waybill.actualSendDateBegin'), value: 'actualSendDateBegin', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('waybill.actualSendDateEnd'), value: 'actualSendDateEnd', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    // 展开收起表单
    collapsableForm() {
      this.topForm.fieldList = [
        { label: this.$t('waybill.transportNo'), value: 'transportNo', type: 'input' },
        { label: this.$t('waybill.status'), value: 'status', type: 'select', list: 'transportStatusList' },
        { label: this.$t('waybill.transportType'), value: 'transportType', type: 'select', list: 'transportTypeList' },
        { label: this.$t('waybill.orderPsType'), value: 'orderPsType', type: 'select', list: 'orderPsTypeList' },
        { label: this.$t('waybill.deliverType'), value: 'deliverType', type: 'select', list: 'deliveryTypeList' },
        { label: this.$t('waybill.carrierName'), value: 'carrierName', type: 'slot' },
        { label: this.$t('waybill.senderName'), value: 'senderName', type: 'slot' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: '', type: 'selection', width: 50 }, // 序列
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'transportNo', label: this.$t('waybill.transportNo'), minWidth: 100 },
        { prop: 'assignOrderNo', label: this.$t('waybill.assignOrderNo'), minWidth: 100 },
        { prop: 'statusName', label: this.$t('waybill.status'), minWidth: 100 },
        { prop: 'routeUpdateTime', label: this.$t('waybill.routeUpdateTime'), minWidth: 100 },
        { prop: 'taskNum', label: this.$t('waybill.taskNum'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('waybill.ownerName'), minWidth: 100 },
        { prop: 'deliverTypeName', label: this.$t('waybill.deliverType'), minWidth: 100 },
        { prop: 'unloadTypeName', label: this.$t('waybill.unloadType'), minWidth: 100 },
        { prop: 'senderName', label: this.$t('waybill.senderName'), minWidth: 100 },
        { prop: 'sendProvinceName', label: this.$t('waybill.sendProvinceName'), minWidth: 100 },
        { prop: 'sendCityName', label: this.$t('waybill.sendCityName'), minWidth: 100 },
        { prop: 'sendAreaName', label: this.$t('waybill.sendAreaName'), minWidth: 100 },
        { prop: 'sendLocation', label: this.$t('waybill.sendLocation'), minWidth: 100 },
        { prop: 'sendContactor', label: this.$t('waybill.sendContactor'), minWidth: 100 },
        { prop: 'senderPhone', label: this.$t('waybill.senderPhone'), minWidth: 100 },
        { prop: 'orderSendTypeName', label: this.$t('waybill.orderSendType'), minWidth: 100 },
        { prop: 'orderPsTypeName', label: this.$t('waybill.orderPsType'), minWidth: 100 },
        { prop: 'carrierName', label: this.$t('waybill.carrierName'), minWidth: 100 },
        { prop: 'transportTypeName', label: this.$t('waybill.transportType'), minWidth: 100 },
        { prop: 'actualSendDate', label: this.$t('waybill.actualSendDate'), minWidth: 100 },
        { prop: 'creatorName', label: this.$t('waybill.creatorName'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('waybill.createTime'), minWidth: 100 },
        { prop: 'updaterName', label: this.$t('waybill.updaterName'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('waybill.updateTime'), minWidth: 100 },
        { label: '操作', value: 'status', width: 200, type: 'slot', fixed: 'right', align: 'left' }// 更多按钮时需要增加此列
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.fullDiaFormInfo.fieldList = [
        { label: this.$t('waybill.transportNo'), value: 'transportNo', type: 'input', disabled: true },
        { label: this.$t('waybill.carrierName'), value: 'carrierName', type: 'select', disabled: true },
        { label: this.$t('waybill.deliverType'), value: 'deliverTypeName', type: 'select', disabled: true },
        { label: this.$t('waybill.transportType'), value: 'transportTypeName', type: 'select', disabled: true },
        { label: this.$t('waybill.orderSendType'), value: 'orderSendTypeName', type: 'select', disabled: true },
        { label: this.$t('waybill.orderPsType'), value: 'orderPsTypeName', type: 'select', disabled: true },
        { label: this.$t('waybill.unloadType'), value: 'unloadTypeName', type: 'select', disabled: true },
        { label: this.$t('waybill.ownerName'), value: 'ownerName', type: 'input', disabled: true },
        { label: this.$t('waybill.senderName'), value: 'senderName', type: 'input', disabled: true },
        { label: this.$t('waybill.sendProvinceName'), value: 'sendProvinceName', type: 'input', disabled: true },
        { label: this.$t('waybill.sendCityName'), value: 'sendCityName', type: 'input', disabled: true },
        { label: this.$t('waybill.sendAreaName'), value: 'sendAreaName', type: 'input', disabled: true },
        { label: this.$t('waybill.sendLocation'), value: 'sendLocation', type: 'input', disabled: true },
        { label: this.$t('waybill.sendContactor'), value: 'sendContactor', type: 'input', disabled: true },
        { label: this.$t('waybill.senderPhone'), value: 'senderPhone', type: 'input', disabled: true },
        { label: this.$t('waybill.taskNum'), value: 'taskNum', type: 'input', disabled: true },
        { label: this.$t('waybill.routeUpdateTime'), value: 'routeUpdateTime', type: 'input', disabled: true },
        { label: this.$t('waybill.creator'), value: 'creator', type: 'input', disabled: true },
        { label: this.$t('waybill.createTime'), value: 'createTime', type: 'input', disabled: true }
      ]

      this.fullDiaFormInfo.dtTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'transportStatusName', label: this.$t('waybill.status'), minWidth: 100 },
        { prop: 'startName', label: this.$t('stowageList.startCode'), minWidth: 100 },
        { prop: 'endName', label: this.$t('stowageList.endCode'), minWidth: 100 },
        { prop: 'opTypeName', label: this.$t('stowageList.subOpType'), minWidth: 100 },
        { prop: 'subTransportTypeName', label: this.$t('stowageList.subTransportType'), minWidth: 100 },
        { prop: 'subTransportCompany', label: this.$t('stowageList.transportCompany'), minWidth: 100 },
        { prop: 'vehicleModel', label: this.$t('stowageList.vehicleModel'), minWidth: 100 },
        { prop: 'trainNumber', label: this.$t('stowageList.trainNumber'), minWidth: 100 },
        { prop: 'plateNumber', label: this.$t('stowageList.plateNumber'), minWidth: 100 },
        { prop: 'driver', label: this.$t('stowageList.driver'), minWidth: 100 },
        { prop: 'driverPhone', label: this.$t('stowageList.driverPhone'), minWidth: 100 },
        { prop: 'cntrNo', label: this.$t('stowageList.cntrNo'), minWidth: 100 },
        { prop: 'wagon', label: this.$t('stowageList.wagonNo'), minWidth: 100 },
        { prop: 'shippingSpace', label: this.$t('stowageList.shippingSpace'), minWidth: 100 },
        { prop: 'facingSlip', label: this.$t('stowageList.facingSlip'), minWidth: 100 },
        { prop: 'estimateSendTime', label: this.$t('stowageList.estimateSendTime'), minWidth: 100 },
        { prop: 'estimateReceiveTime', label: this.$t('stowageList.estimateReceiveTime'), minWidth: 100 },
        { label: this.$t('table.actions'), prop: 'operation', width: 100, type: 'slot' }
      ]
    },
    // 路由维护
    RtouteFormInfoFieldList() {
      this.fullDiaFormInfo.dtTableInfoRoute.rules = {
        transportStatus: [{ required: true, message: '请选择运输状态' }],
        transportStatusName: [{ required: true, message: '请选择运输状态' }],
        orderDate: [{ required: true, message: '请选择订单日期' }]
      }

      this.fullDiaFormInfo.dtTableInfoRoute.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'transportStatusName', label: this.$t('waybill.status'), minWidth: 100, edit: { name: '$select', options: this.listTypeInfo.transportStatusByRouteList }},
        { prop: 'location', label: '地点', minWidth: 100, edit: { name: 'input' }},
        { prop: 'orderDateKey', label: '订单日期名称', minWidth: 100, edit: { name: '$select', options: this.listTypeInfo.vxeOrderDateNameList }},
        { prop: 'orderDate', label: '订单日期', minWidth: 100, edit: { name: '$input', props: { type: 'date' }}},
        { prop: 'remark', label: '描述', minWidth: 100, edit: { name: 'input' }},
        { prop: 'creatorName', label: this.$t('waybill.updater'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('waybill.updateTime'), minWidth: 100 }
      ]
    },
    // 编辑改派
    diaFormInfoFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('waybill.intrm'), value: 'intrm', type: 'input', disabled: true },
        { label: this.$t('waybill.intrmProvince'), value: 'intrmProvince', type: 'input', disabled: true },
        { label: this.$t('waybill.intrmCity'), value: 'intrmCity', type: 'input', disabled: true },
        { label: this.$t('waybill.intrmArea'), value: 'intrmArea', type: 'input', disabled: true },
        { label: this.$t('waybill.intrmLocation'), value: 'intrmLocation', type: 'input', disabled: true },
        { label: this.$t('waybill.intrmContactor'), value: 'intrmContactor', type: 'input', disabled: true },
        { label: this.$t('waybill.intrmPhone'), value: 'intrmPhone', type: 'input', disabled: true },
        { label: this.$t('waybill.transportCompany'), value: 'subTransportCompany', type: 'input' },
        { label: this.$t('waybill.subTransportType'), value: 'subTransportType', type: 'select', list: 'transportTypeList' },
        { label: this.$t('waybill.vehicleModel'), value: 'vehicleModel', type: 'input' },
        { label: this.$t('waybill.trainNumber'), value: 'trainNumber', type: 'input' },
        { label: this.$t('waybill.plateNumber'), value: 'plateNumber', type: 'input' },
        { label: this.$t('waybill.driver'), value: 'driver', type: 'input' },
        { label: this.$t('waybill.driverPhone'), value: 'driverPhone', type: 'input' },
        { label: this.$t('waybill.cntrNo'), value: 'cntrNo', type: 'input' },
        { label: this.$t('waybill.wagonNo'), value: 'wagon', type: 'input' },
        { label: this.$t('waybill.shippingSpace'), value: 'shippingSpace', type: 'input' },
        { label: this.$t('waybill.facingSlip'), value: 'facingSlip', type: 'input' },
        { label: this.$t('waybill.estimateSendTime'), value: 'estimateSendTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('waybill.actualSendTime'), value: 'actualSendTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('waybill.estimateReceiveTime'), value: 'estimateReceiveTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('waybill.actualReceiveTime'), value: 'actualReceiveTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('waybill.intremark'), value: 'remark', type: 'input', disabled: true }
      ]
    },
    // 异常报备弹窗
    diaFormInfoAbnormalFieldList() {
      this.diaFormInfoAbnormal.fieldList = [
        { label: this.$t('waybill.abnormalType'), value: 'errReport', type: 'select', list: 'errorReportList' },
        { label: this.$t('waybill.abnormalDesc'), value: 'operationDesc', type: 'textarea', maxlength: 200 },
        { label: this.$t('waybill.abnormalReport'), value: 'abnormalEvidence', type: 'slot' }
      ]
    },
    // 取消弹窗
    diaFormInfoCancelFieldList() {
      this.diaFormInfoAbnormal.fieldList = [
        { label: this.$t('waybill.cancelReason'), value: 'operationDesc', type: 'textarea', maxlength: 200 },
        { label: this.$t('waybill.cancelRelease'), value: 'abnormalEvidence', type: 'slot' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        subTransportCompany: [{ required: true, message: this.$t('waybill.msg.subTransportCompany'), trigger: 'blur' }],
        subTransportType: [{ required: true, message: this.$t('waybill.msg.subTransportType'), trigger: 'blur' }]
      }
      this.diaFormInfoAbnormal.rules = {
        errReport: [{ required: true, message: this.$t('waybill.msg.errReport'), trigger: 'blur' }],
        operationDesc: [{ required: true, message: this.$t('waybill.msg.operationDesc'), trigger: 'blur' }]
      }
      this.fullDiaFormInfo.dtTableInfoRoute.rules = {
        status: [{ required: true, message: this.$t('waybill.msg.status'), trigger: 'blur' }],
        date: [{ required: true, message: this.$t('waybill.msg.date'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        transportNo: null,
        subTransportCompany: null,
        subTransportType: null,
        vehicleModel: null,
        trainNumber: null,
        plateNumber: null,
        driver: null,
        driverPhone: null,
        cntrNo: null,
        wagon: null,
        shippingSpace: null,
        facingSlip: null,
        estimateSendTime: null,
        actualSendTime: null,
        estimateReceiveTime: null,
        actualReceiveTime: null
      }
      this.diaFormInfoAbnormal.data = {
        transportNo: null,
        errReport: null,
        operationDesc: null,
        evidenceImage: null,
        evidencePdf: null,
        evidenceWord: null
      }
      this.fileList = []
      this.evidenceList = []
    },
    activeCellMethod({ row }) {
      if (row.id) {
        return false
      }
      return true
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
