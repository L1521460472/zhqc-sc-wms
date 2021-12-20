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
          planOrderNo: null,
          orderNo: null,
          cOrderNo: null,
          dispatchStatus: null,
          appointStatus: null,
          ownerCode: null,
          deliverType: null,
          senderCode: null,
          senderName: null,
          receiverCode: null,
          receiverName: null,
          carrierCode: null,
          transportType: null,
          createTimeBegin: null,
          createTimeEnd: null,
          receiveTimeBegin: null,
          receiveTimeEnd: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        dispatchStatusList: [],
        appointStatusList: [],
        deliveryTypeList: [],
        transportTypeList: [],
        errorTypeList: [],
        controlTypeList: [],
        appointTypeList: []
      },
      idsList: [],
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '250', // 默认操作按钮列宽度
          btList: [
            { label: this.$t('table.view'), type: 'primary', icon: '', event: 'openViewPage', show: true, disabled: this.$hasPerm('view') },
            { slot: true, icon: '', event: 'slotEvent' }
          ]
        }
      },
      // 弹框配置
      dialogInfo: {
        ref: null,
        visible: false,
        flag: '',
        title: '',
        type: '',
        width: '',
        data: {},
        rules: {},
        fieldList: [],
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', btLoading: false, show: true }
        ]
      }
    }
  },
  mounted() {
    this.initTableInfo()
    this.rulesInit()
  },
  methods: {
    // 展开收起表单
    collapsableForm() {
      this.topForm.fieldList = [
        { label: this.$t('shippingPlan.planOrderNo'), value: 'planOrderNo', type: 'input' },
        { label: this.$t('shippingPlan.orderNo'), value: 'orderNo', type: 'input' },
        { label: this.$t('shippingPlan.cOrderNo'), value: 'cOrderNo', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }
      ]
    },
    // 展开收起表单
    collapsableFormMore() {
      this.topForm.fieldList = [
        { label: this.$t('shippingPlan.planOrderNo'), value: 'planOrderNo', type: 'input' },
        { label: this.$t('shippingPlan.orderNo'), value: 'orderNo', type: 'input' },
        { label: this.$t('shippingPlan.cOrderNo'), value: 'cOrderNo', type: 'input' },
        { label: this.$t('shippingPlan.dispatchStatus'), value: 'dispatchStatus', type: 'select', list: 'dispatchStatusList' },
        { label: this.$t('shippingPlan.appointStatus'), value: 'appointStatus', type: 'select', list: 'appointStatusList' },
        { label: this.$t('shippingPlan.owner'), value: 'ownerCode', type: 'slot' },
        { label: this.$t('shippingPlan.deliverType'), value: 'deliverType', type: 'select', list: 'deliveryTypeList' },
        { label: this.$t('shippingPlan.sender'), value: 'senderCode', type: 'slot' },
        { label: this.$t('shippingPlan.receiver'), value: 'receiverCode', type: 'slot' },
        { label: this.$t('shippingPlan.carrier'), value: 'carrierCode', type: 'slot' },
        { label: this.$t('shippingPlan.transportType'), value: 'transportType', type: 'select', list: 'transportTypeList' },
        { label: this.$t('shippingPlan.createTimeBegin'), value: 'createTimeBegin', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('shippingPlan.createTimeEnd'), value: 'createTimeEnd', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('shippingPlan.receiveTimeBegin'), value: 'receiveTimeBegin', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('shippingPlan.receiveTimeEnd'), value: 'receiveTimeEnd', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }
      ]
    },
    // 初始化列表
    initTableInfo() {
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'selection', width: 50, fixed: 'left' }, // 选项框
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'planOrderNo', label: this.$t('shippingPlan.planOrderNo'), minWidth: 120 },
        { prop: 'dispatchStatusName', label: this.$t('shippingPlan.dispatchStatus'), minWidth: 100 },
        { prop: 'receiveTime', label: this.$t('shippingPlan.receiveTimeBegin'), minWidth: 140 },
        { prop: 'appointStatusName', label: this.$t('shippingPlan.appointStatus'), minWidth: 100 },
        { prop: 'appointPickupTime', label: this.$t('shippingPlan.prePickupTime'), minWidth: 100 },
        { prop: 'appointSendTime', label: this.$t('shippingPlan.appointSendTime'), minWidth: 100 },
        { prop: 'orderNo', label: this.$t('shippingPlan.orderNo'), minWidth: 120 },
        { prop: 'sourceSystem', label: this.$t('shippingPlan.sourceSystem'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('shippingPlan.createTimeBegin'), minWidth: 140 },
        { prop: 'cOrderNo', label: this.$t('shippingPlan.cOrderNo'), minWidth: 140 },
        { prop: 'businessTypeName', label: this.$t('shippingPlan.businessType'), minWidth: 120 },
        { prop: 'ownerName', label: this.$t('shippingPlan.owner'), minWidth: 100 },
        { prop: 'deliverTypeName', label: this.$t('shippingPlan.deliverType'), minWidth: 100 },
        { prop: 'unloadTypeName', label: this.$t('shippingPlan.unloadType'), minWidth: 100 },
        { prop: 'senderName', label: this.$t('shippingPlan.sender'), minWidth: 100 },
        { prop: 'sendProvinceName', label: this.$t('shippingPlan.sendProvince'), minWidth: 100 },
        { prop: 'sendCityName', label: this.$t('shippingPlan.sendCity'), minWidth: 100 },
        { prop: 'sendAreaName', label: this.$t('shippingPlan.sendArea'), minWidth: 100 },
        { prop: 'sendLocation', label: this.$t('shippingPlan.sendLocation'), minWidth: 100 },
        { prop: 'sendContactor', label: this.$t('shippingPlan.sendContactor'), minWidth: 100 },
        { prop: 'senderPhone', label: this.$t('shippingPlan.senderPhone'), minWidth: 100 },
        { prop: 'receiverName', label: this.$t('shippingPlan.receiver'), minWidth: 100 },
        { prop: 'receiveProvinceName', label: this.$t('shippingPlan.receiveProvince'), minWidth: 100 },
        { prop: 'receiveCityName', label: this.$t('shippingPlan.receiveCity'), minWidth: 100 },
        { prop: 'receiveAreaName', label: this.$t('shippingPlan.receiveArea'), minWidth: 100 },
        { prop: 'receiveLocation', label: this.$t('shippingPlan.receiveLocation'), minWidth: 100 },
        { prop: 'receiveContactor', label: this.$t('shippingPlan.receiveContactor'), minWidth: 100 },
        { prop: 'receiverPhone', label: this.$t('shippingPlan.receiverPhone'), minWidth: 100 },
        { prop: 'planSendTime', label: this.$t('shippingPlan.planSendTime'), minWidth: 100 },
        { prop: 'planDeliveryTime', label: this.$t('shippingPlan.planDeliveryTime'), minWidth: 100 },
        { prop: 'remark', label: this.$t('shippingPlan.orderRemark'), minWidth: 100 },
        { prop: 'orderSendTypeName', label: this.$t('shippingPlan.orderSendType'), minWidth: 100 },
        { prop: 'orderPsTypeName', label: this.$t('shippingPlan.orderPsType'), minWidth: 100 },
        { prop: 'carrierName', label: this.$t('shippingPlan.carrier'), minWidth: 100 },
        { prop: 'transportTypeName', label: this.$t('shippingPlan.transportType'), minWidth: 100 },
        { prop: 'lineTypeName', label: this.$t('shippingPlan.lineType'), minWidth: 100 },
        { prop: 'lineCode', label: this.$t('shippingPlan.lineCode'), minWidth: 100 },
        { prop: 'lineRemark', label: this.$t('shippingPlan.lineRemark'), minWidth: 100 },
        { prop: 'skuCount', label: this.$t('shippingPlan.skuCount'), minWidth: 100 },
        { prop: 'numCount', label: this.$t('shippingPlan.numCount'), minWidth: 100 },
        { prop: 'orderWeight', label: this.$t('shippingPlan.orderWeight'), minWidth: 100 },
        { prop: 'orderVolume', label: this.$t('shippingPlan.orderVolume'), minWidth: 100 },
        { prop: 'creator', label: this.$t('shippingPlan.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('shippingPlan.createTime'), minWidth: 140 },
        { prop: 'updater', label: this.$t('shippingPlan.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('shippingPlan.updateTime'), minWidth: 140 }
      ]
    },
    // 初始化预约登记
    initDialogReport(type) {
      this.dialogInfo.width = '200mm'
      this.dialogInfo.title = this.$t('shippingPlan.preRegisterAdd')
      this.dialogInfo.fieldList = [
        { label: this.$t('shippingPlan.planOrderNo'), value: 'planOrderNo', type: 'input', disabled: true, require },
        { label: this.$t('shippingPlan.orderNo'), value: 'orderNo', type: 'input', disabled: true, require },
        { label: this.$t('shippingPlan.cOrderNo'), value: 'cOrderNo', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.appointType'), value: 'appointType', type: 'select', list: 'appointTypeList', event: 'appointTypeChange', require },
        { label: this.$t('shippingPlan.appointPickupTime'), value: 'appointPickupTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('shippingPlan.appointSendTime'), value: 'appointSendTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('shippingPlan.vehicleType'), value: 'vehicleType', type: 'input' },
        { label: this.$t('shippingPlan.plateNumber'), value: 'plateNumber', type: 'input' },
        { label: this.$t('shippingPlan.controlType'), value: 'controlType', type: 'select', list: 'controlTypeList' },
        { label: this.$t('shippingPlan.platform'), value: 'platform', type: 'input' },
        { label: this.$t('shippingPlan.driverName'), value: 'driverName', type: 'input' },
        { label: this.$t('shippingPlan.driverPhone'), value: 'driverPhone', type: 'input' },
        { label: this.$t('shippingPlan.remark'), value: 'appointRemark', type: 'textarea', maxlength: 200, className: 'long-row' },
        { label: this.$t('shippingPlan.evidenceImage'), value: 'evidence', type: 'slot', className: 'long-row' }
      ]

      if (type) {
        if (type === 1) {
          this.dialogInfo.fieldList.find(item => item.value === 'appointPickupTime').require = true
          this.dialogInfo.fieldList.find(item => item.value === 'appointSendTime').require = false
        } else {
          this.dialogInfo.fieldList.find(item => item.value === 'appointPickupTime').require = false
          this.dialogInfo.fieldList.find(item => item.value === 'appointSendTime').require = true
        }
      }
      if (!type) {
        this.dialogInfo.data = {}
        this.dialogInfo.fieldList.forEach(item => {
          this.$set(this.dialogInfo.data, item.value, '')
        })
      }
    },
    // 初始化异常报备
    initDialogRegister() {
      this.dialogInfo.width = '140mm'
      this.dialogInfo.title = this.$t('shippingPlan.abnormalReport')
      this.dialogInfo.fieldList = [
        { label: this.$t('shippingPlan.abnormalType'), value: 'abnormalType', type: 'select', list: 'errorTypeList' },
        { label: this.$t('shippingPlan.abnormalDesc'), value: 'abnormalDesc', type: 'textarea', maxlength: 200, className: 'long-row' },
        { label: this.$t('shippingPlan.certificate'), value: 'evidence', type: 'slot', className: 'long-row' }
      ]
      this.dialogInfo.data = {}
      this.dialogInfo.fieldList.forEach(item => {
        this.$set(this.dialogInfo.data, item.value, '')
      })
    },
    // 初始化取消发运
    initDialogCancelShip() {
      this.dialogInfo.width = '140mm'
      this.dialogInfo.title = this.$t('shippingPlan.cancelShip')
      this.dialogInfo.fieldList = [
        { label: this.$t('shippingPlan.cancelReason'), value: 'remark', type: 'textarea', maxlength: 200, className: 'long-row' },
        { label: this.$t('shippingPlan.cancelCertificate'), value: 'evidence', type: 'slot', className: 'long-row' }
      ]
      this.dialogInfo.data = {}
      this.dialogInfo.fieldList.forEach(item => {
        this.$set(this.dialogInfo.data, item.value, '')
      })
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit(type) {
      const baseRules = {
        planOrderNo: [{ required: true, message: this.$t('shippingPlan.msg.planOrderNo'), trigger: 'blur' }],
        orderNo: [{ required: true, message: this.$t('shippingPlan.msg.orderNo'), trigger: 'blur' }],
        appointType: [{ required: true, message: this.$t('shippingPlan.msg.appointType'), trigger: 'blur' }],
        abnormalType: [{ required: true, message: this.$t('shippingPlan.msg.abnormalType'), trigger: 'blur' }],
        abnormalDesc: [{ required: true, message: this.$t('shippingPlan.msg.abnormalDesc'), trigger: 'blur' }],
        remark: [{ required: true, message: this.$t('shippingPlan.msg.cancelReason'), trigger: 'blur' }]
      }

      if (type) {
        if (type === 1) {
          this.dialogInfo.rules = Object.assign({}, baseRules, { appointPickupTime: [{ required: true, message: this.$t('appointmentRegistration.msg.appointPickupTime'), trigger: 'blur' }] })
        } else {
          this.dialogInfo.rules = Object.assign({}, baseRules, { appointSendTime: [{ required: true, message: this.$t('appointmentRegistration.msg.appointSendTime'), trigger: 'blur' }] })
        }
        this.$nextTick(() => {
          this.dialogInfo.ref.clearValidate()
        })
      } else {
        this.dialogInfo.rules = baseRules
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
