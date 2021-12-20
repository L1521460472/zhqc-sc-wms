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
          ownerCode: null,
          ownerName: null,
          senderCode: null,
          senderName: null,
          receiverCode: null,
          receiverName: null,
          lineCode: null,
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
        transportType: [],
        transportWorkType: [],
        workType: [],
        provinceList: [],
        cityList: [],
        areaList: []
      },
      tableInfo: {
        ref: null,
        fieldList: null, // 表格列集合
        handle: null,
        rules: {},
        topBtn: {}
      },
      vueTableInfo: {
        ref: null,
        fieldList: [],
        rules: {},
        topBtn: {},
        data: [],
        handle: {
          fixed: 'right',
          width: 80,
          label: this.$t('table.actions'),
          btList: [
            { show: true, type: '', icon: '', disabled: false, loading: false, label: this.$t('transportationScheduling.remove'), solt: '', event: 'remove' }
          ]
        }
      },
      vueTableInfo2: {
        ref: null,
        fieldList: [],
        rules: {},
        topBtn: {},
        data: [],
        handle: null
      },
      // 弹窗表单
      diaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}// 配置的表单字段校验规则集合
      },
      // 弹框配置
      dialogInfo: {
        title: '',
        visible: false,
        width: '200mm',
        type: '',
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', btLoading: false, show: true }
        ]
      }
    }
  },
  mounted() {
    this.initFieldList()
  },
  actived() {
    this.initFieldList()
  },
  methods: {
    initFieldList() {
      this.topFormFieldList()
      this.tableInfoFieldList()
      this.vueTableInfoFieldList()
      this.vueTableInfo2FieldList()
    },
    // 展开收起表单
    topFormFieldList() {
      this.topForm.fieldList = [
        { label: this.$t('transportationScheduling.planOrderNo'), value: 'planOrderNo', type: 'input' },
        { label: this.$t('transportationScheduling.orderNo'), value: 'orderNo', type: 'input' },
        { label: this.$t('transportationScheduling.cOrderNo'), value: 'cOrderNo', type: 'input' },
        { label: this.$t('transportationScheduling.ownerId'), value: 'ownerCode', type: 'slot' },
        { label: this.$t('transportationScheduling.carrier'), value: 'carrierCode', type: 'slot' },
        { label: this.$t('transportationScheduling.sender'), value: 'senderCode', type: 'slot' },
        { label: this.$t('transportationScheduling.receiver'), value: 'receiverCode', type: 'slot' },
        { label: this.$t('transportationScheduling.lineCode'), value: 'lineCode', type: 'input' },
        { label: this.$t('transportationScheduling.createTimeBegin'), value: 'createTimeBegin', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('transportationScheduling.operationDateEnd'), value: 'createTimeEnd', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('transportationScheduling.receiveTimeBegin'), value: 'receiveTimeBegin', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('transportationScheduling.operationDateEnd'), value: 'receiveTimeEnd', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },

    // 待调度列表
    tableInfoFieldList() {
      this.tableInfo.fieldList = [
        { label: '', type: 'checkbox', width: 50, fixed: 'left' }, // 选项框
        { label: this.$t('table.id'), type: 'seq', width: 50 }, // 序列
        { prop: 'planOrderNo', label: this.$t('transportationScheduling.planOrderNo'), minWidth: 100 },
        { prop: 'dispatchStatusName', label: this.$t('transportationScheduling.dispatchStatus'), minWidth: 100 },
        { prop: 'receiveTime', label: this.$t('transportationScheduling.receiveTimeBegin'), minWidth: 100 },
        { prop: 'appointStatusName', label: this.$t('transportationScheduling.appointStatus'), minWidth: 100 },
        { prop: 'appointPickupTime', label: this.$t('transportationScheduling.appointPickupTime'), minWidth: 100 },
        { prop: 'appointSendTime', label: this.$t('transportationScheduling.appointSendTime'), minWidth: 100 },
        { prop: 'orderNo', label: this.$t('transportationScheduling.orderNo'), minWidth: 100 },
        { prop: 'sourceSystem', label: this.$t('transportationScheduling.sourceSystem'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('transportationScheduling.createTimeBegin'), minWidth: 100 },
        { prop: 'cOrderNo', label: this.$t('transportationScheduling.cOrderNo'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('transportationScheduling.ownerId'), minWidth: 100 },
        { prop: 'deliverTypeName', label: this.$t('transportationScheduling.deliverType'), minWidth: 100 },
        { prop: 'unloadTypeName', label: this.$t('transportationScheduling.unloadType'), minWidth: 100 },
        { prop: 'senderName', label: this.$t('transportationScheduling.sender'), minWidth: 100 },
        { prop: 'sendProvinceName', label: this.$t('transportationScheduling.sendProvince'), minWidth: 100 },
        { prop: 'sendCityName', label: this.$t('transportationScheduling.sendCity'), minWidth: 100 },
        { prop: 'sendAreaName', label: this.$t('transportationScheduling.sendArea'), minWidth: 100 },
        { prop: 'sendLocation', label: this.$t('transportationScheduling.sendLocation'), minWidth: 100 },
        { prop: 'sendContactor', label: this.$t('transportationScheduling.sendContactor'), minWidth: 100 },
        { prop: 'senderPhone', label: this.$t('transportationScheduling.senderPhone'), minWidth: 100 },
        { prop: 'receiverName', label: this.$t('transportationScheduling.receiver'), minWidth: 100 },
        { prop: 'receiveProvinceName', label: this.$t('transportationScheduling.receiveProvince'), minWidth: 100 },
        { prop: 'receiveCityName', label: this.$t('transportationScheduling.receiveCity'), minWidth: 100 },
        { prop: 'receiveAreaName', label: this.$t('transportationScheduling.receiveArea'), minWidth: 100 },
        { prop: 'receiveLocation', label: this.$t('transportationScheduling.receiveLocation'), minWidth: 100 },
        { prop: 'receiveContactor', label: this.$t('transportationScheduling.receiveContactor'), minWidth: 100 },
        { prop: 'receiverPhone', label: this.$t('transportationScheduling.receiverPhone'), minWidth: 100 },
        { prop: 'planSendTime', label: this.$t('transportationScheduling.planSendTime'), minWidth: 100 },
        { prop: 'planDeliveryTime', label: this.$t('transportationScheduling.planDeliveryTime'), minWidth: 100 },
        { prop: 'remark', label: this.$t('transportationScheduling.orderRemark'), minWidth: 100 },
        { prop: 'orderSendTypeName', label: this.$t('transportationScheduling.orderSendType'), minWidth: 100 },
        { prop: 'orderPsTypeName', label: this.$t('transportationScheduling.orderPsType'), minWidth: 100 },
        { prop: 'carrierName', label: this.$t('transportationScheduling.carrier'), minWidth: 100 },
        { prop: 'transportTypeName', label: this.$t('transportationScheduling.transportType'), minWidth: 100 },
        { prop: 'lineTypeName', label: this.$t('transportationScheduling.lineType'), minWidth: 100 },
        { prop: 'lineCode', label: this.$t('transportationScheduling.lineCode'), minWidth: 100 },
        { prop: 'lineRemark', label: this.$t('transportationScheduling.lineRemark'), minWidth: 100 },
        { prop: 'skuCount', label: this.$t('transportationScheduling.skuCount'), minWidth: 100 },
        { prop: 'numCount', label: this.$t('transportationScheduling.numCount'), minWidth: 100 },
        { prop: 'orderWeight', label: this.$t('transportationScheduling.orderWeight'), minWidth: 100 },
        { prop: 'orderVolume', label: this.$t('transportationScheduling.orderVolume'), minWidth: 100 },
        { prop: 'creator', label: this.$t('transportationScheduling.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('transportationScheduling.createTime'), minWidth: 100 },
        { prop: 'updater', label: this.$t('transportationScheduling.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('transportationScheduling.updateTime'), minWidth: 100 }
      ]
    },

    // 已加入调度列表
    vueTableInfoFieldList() {
      this.vueTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'seq', width: 50 }, // 序列
        { prop: 'planOrderNo', label: this.$t('transportationScheduling.planOrderNo'), minWidth: 100 },
        { prop: 'dispatchStatusName', label: this.$t('transportationScheduling.dispatchStatus'), minWidth: 100 },
        { prop: 'orderNo', label: this.$t('transportationScheduling.orderNo'), minWidth: 100 },
        { prop: 'cOrderNo', label: this.$t('transportationScheduling.cOrderNo'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('transportationScheduling.skuName'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('transportationScheduling.skuId'), minWidth: 100 },
        { prop: 'spec', label: this.$t('transportationScheduling.spec'), minWidth: 100 },
        { prop: 'unit', label: this.$t('transportationScheduling.unit'), minWidth: 100 },
        { prop: 'dispatchNum', label: this.$t('transportationScheduling.dispatchNum'), minWidth: 100, type: 'slot' },
        { prop: 'numInt', label: this.$t('transportationScheduling.numInt'), minWidth: 100 },
        { prop: 'numEa', label: this.$t('transportationScheduling.numEa'), minWidth: 100 },
        { prop: 'weight', label: this.$t('transportationScheduling.weightKg'), minWidth: 100 },
        { prop: 'volume', label: this.$t('transportationScheduling.volumeCm'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('transportationScheduling.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('transportationScheduling.productionDate'), minWidth: 100 },
        { prop: 'expirationDate', label: this.$t('transportationScheduling.expirationDate'), minWidth: 100 },
        { prop: 'receiveTime', label: this.$t('transportationScheduling.receiveTimeBegin'), minWidth: 100 },
        { prop: 'sourceSystem', label: this.$t('transportationScheduling.sourceSystem'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('transportationScheduling.createTimeBegin'), minWidth: 100 },
        { prop: 'businessTypeName', label: this.$t('transportationScheduling.businessType'), minWidth: 100 },
        { prop: 'appointStatusName', label: this.$t('transportationScheduling.appointStatus'), minWidth: 100 },
        { prop: 'appointPickupTime', label: this.$t('transportationScheduling.appointPickupTime'), minWidth: 100 },
        { prop: 'appointSendTime', label: this.$t('transportationScheduling.appointSendTime'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('transportationScheduling.ownerId'), minWidth: 100 },
        { prop: 'deliverTypeName', label: this.$t('transportationScheduling.deliverType'), minWidth: 100 },
        { prop: 'unloadTypeName', label: this.$t('transportationScheduling.unloadType'), minWidth: 100 },
        { prop: 'senderName', label: this.$t('transportationScheduling.sender'), minWidth: 100 },
        { prop: 'sendProvinceName', label: this.$t('transportationScheduling.sendProvince'), minWidth: 100 },
        { prop: 'sendCityName', label: this.$t('transportationScheduling.sendCity'), minWidth: 100 },
        { prop: 'sendAreaName', label: this.$t('transportationScheduling.sendArea'), minWidth: 100 },
        { prop: 'sendLocation', label: this.$t('transportationScheduling.sendLocation'), minWidth: 100 },
        { prop: 'receiverName', label: this.$t('transportationScheduling.receiver'), minWidth: 100 },
        { prop: 'receiveProvinceName', label: this.$t('transportationScheduling.receiveProvince'), minWidth: 100 },
        { prop: 'receiveCityName', label: this.$t('transportationScheduling.receiveCity'), minWidth: 100 },
        { prop: 'receiveAreaName', label: this.$t('transportationScheduling.receiveArea'), minWidth: 100 },
        { prop: 'receiveLocation', label: this.$t('transportationScheduling.receiveLocation'), minWidth: 100 },
        { prop: 'receiveContactor', label: this.$t('transportationScheduling.receiveContactor'), minWidth: 100 },
        { prop: 'receiverPhone', label: this.$t('transportationScheduling.receiverPhone'), minWidth: 100 },
        { prop: 'planSendTime', label: this.$t('transportationScheduling.planSendTime'), minWidth: 100 },
        { prop: 'planDeliveryTime', label: this.$t('transportationScheduling.planDeliveryTime'), minWidth: 100 },
        { prop: 'remark', label: this.$t('transportationScheduling.orderRemark'), minWidth: 100 },
        { prop: 'orderSendTypeName', label: this.$t('transportationScheduling.orderSendType'), minWidth: 100 },
        { prop: 'orderPsTypeName', label: this.$t('transportationScheduling.orderPsType'), minWidth: 100 },
        { prop: 'carrierName', label: this.$t('transportationScheduling.carrier'), minWidth: 100 },
        { prop: 'transportTypeName', label: this.$t('transportationScheduling.transportType'), minWidth: 100 },
        { prop: 'lineTypeName', label: this.$t('transportationScheduling.lineType'), minWidth: 100 },
        { prop: 'lineCode', label: this.$t('transportationScheduling.lineCode'), minWidth: 100 },
        { prop: 'lineRemark', label: this.$t('transportationScheduling.lineRemark'), minWidth: 100 }
      ]
    },

    maxValid({ cellValue }) {
      return new Promise((resolve, reject) => {
        if (cellValue > 7) {
          reject()
        } else {
          resolve()
        }
      })
    },

    // 运输工具列表
    vueTableInfo2FieldList() {
      if (this.vueTableInfo2.data.length === 1) {
        this.listTypeInfo.workType = this.listTypeInfo.transportWorkType.filter(item => item.value === 1)
      } else if (this.vueTableInfo2.data.length > 1) {
        this.listTypeInfo.workType = this.listTypeInfo.transportWorkType
      }

      this.vueTableInfo2.fieldList = [
        { label: '', type: 'radio', width: 50, fixed: 'left' }, // 选项框
        { label: this.$t('table.id'), type: 'seq', width: 50 }, // 序列
        // { prop: 'opDesc', label: this.$t('transportationScheduling.opDesc'), minWidth: 100, type: 'slot' },
        { prop: 'startName', label: this.$t('transportationScheduling.startName'), minWidth: 100 },
        { prop: 'endName', label: this.$t('transportationScheduling.destination'), minWidth: 100 },
        { prop: 'carrierName', label: this.$t('transportationScheduling.carrier'), minWidth: 100 },
        { prop: 'subOpType', label: this.$t('transportationScheduling.subOpType'), minWidth: 120, edit: { name: '$select', options: this.listTypeInfo.workType }},
        { prop: 'subTransportTypeName', label: this.$t('transportationScheduling.subTransportType'), minWidth: 100 },
        { prop: 'transportCompany', label: this.$t('transportationScheduling.transportCompany'), minWidth: 120, edit: { name: 'input' }},
        { prop: 'vehicleModel', label: this.$t('transportationScheduling.vehicleModel'), minWidth: 150, edit: { name: 'input' }},
        { prop: 'trainNumber', label: this.$t('transportationScheduling.trainNumber'), minWidth: 180, edit: { name: 'input' }},
        { prop: 'plateNumber', label: this.$t('transportationScheduling.plateNumber'), minWidth: 100, edit: { name: 'input' }},
        { prop: 'driver', label: this.$t('transportationScheduling.driverName'), minWidth: 100, edit: { name: 'input' }},
        { prop: 'driverPhone', label: this.$t('transportationScheduling.driverPhone'), minWidth: 100, edit: { name: 'input' }},
        { prop: 'cntrNo', label: this.$t('transportationScheduling.cntrNo'), minWidth: 100, edit: { name: 'input' }},
        { prop: 'wagonNo', label: this.$t('transportationScheduling.wagonNo'), minWidth: 100, edit: { name: 'input' }},
        { prop: 'shippingSpace', label: this.$t('transportationScheduling.shippingSpace'), minWidth: 100, edit: { name: 'input' }},
        { prop: 'facingSlip', label: this.$t('transportationScheduling.facingSlip'), minWidth: 120, edit: { name: 'input' }},
        { prop: 'estimateArriveTime', label: this.$t('transportationScheduling.estimateArriveTime'), minWidth: 200, edit: { name: '$input', props: { type: 'date', placeholder: '请选择日期' }}},
        { prop: 'estimateSendTime', label: this.$t('transportationScheduling.estimateSendTime'), minWidth: 200, edit: { name: '$input', props: { type: 'date', placeholder: '请选择日期' }}},
        { prop: 'estimateReceiveTime', label: this.$t('transportationScheduling.estimateReceiveTime'), minWidth: 200, edit: { name: '$input', props: { type: 'date', placeholder: '请选择日期' }}}
      ]
      this.diaFormInfo.fieldList.forEach(item => {
        this.$set(this.diaFormInfo.data, item.value, null)
      })
    },

    diaFormInfoStowage() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('transportationScheduling.assignmentNo'), value: 'assignmentNo', type: 'input', disabled: false }
      ]
      this.diaFormInfo.rules = {
        assignmentNo: [{ required: true, message: this.$t('transportationScheduling.msg.assignmentNo'), trigger: 'blur' }]
      }
      this.diaFormInfo.fieldList.forEach(item => {
        this.$set(this.diaFormInfo.data, item.value, null)
      })
    },

    diaFormInfoTransit() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('transportationScheduling.jobType'), value: 'subOpType', type: 'select', list: 'transportWorkType', disabled: true },
        { label: this.$t('transportationScheduling.intrm'), value: 'intrm', type: 'input', disabled: false },
        { label: this.$t('transportationScheduling.intrmProvince'), value: 'intrmProvinceId', type: 'select', list: 'provinceList', disabled: false },
        { label: this.$t('transportationScheduling.intrmCity'), value: 'intrmCityId', type: 'select', list: 'cityList', disabled: false },
        { label: this.$t('transportationScheduling.intrmArea'), value: 'intrmAreaId', type: 'select', list: 'areaList', disabled: false },
        { label: this.$t('transportationScheduling.intrmLocation'), value: 'intrmLocation', type: 'input', disabled: false },
        { label: this.$t('transportationScheduling.intrmContactor'), value: 'intrmContactor', type: 'input', disabled: false },
        { label: this.$t('transportationScheduling.intrmPhone'), value: 'intrmPhone', type: 'input', disabled: false },
        { label: this.$t('transportationScheduling.carrier'), value: 'carrierName', type: 'input', disabled: true },
        { label: this.$t('transportationScheduling.transitTransportType'), value: 'subTransportType', type: 'select', list: 'transportType', disabled: false },
        { label: this.$t('transportationScheduling.transitTransportCompany'), value: 'transportCompany', type: 'input', disabled: false },
        { label: this.$t('transportationScheduling.vehicleModel'), value: 'vehicleModel', type: 'input', disabled: false },
        { label: this.$t('transportationScheduling.trainNumber'), value: 'trainNumber', type: 'input', disabled: false },
        { label: this.$t('transportationScheduling.plateNumber'), value: 'plateNumber', type: 'input', disabled: false },
        { label: this.$t('transportationScheduling.driverName'), value: 'driver', type: 'input', disabled: false },
        { label: this.$t('transportationScheduling.driverPhone'), value: 'driverPhone', type: 'input', disabled: false },
        { label: this.$t('transportationScheduling.cntrNo'), value: 'cntrNo', type: 'input', disabled: false },
        { label: this.$t('transportationScheduling.wagonNo'), value: 'wagonNo', type: 'input', disabled: false },
        { label: this.$t('transportationScheduling.shippingSpace'), value: 'shippingSpace', type: 'input', disabled: false },
        { label: this.$t('transportationScheduling.facingSlip'), value: 'facingSlip', type: 'input', disabled: false },
        { label: this.$t('transportationScheduling.estimateArriveTime'), value: 'estimateArriveTime', type: 'date', disabled: false },
        { label: this.$t('transportationScheduling.estimateSendTime'), value: 'estimateSendTime', type: 'date', disabled: false },
        { label: this.$t('transportationScheduling.estimateReceiveTime'), value: 'estimateReceiveTime', type: 'date', disabled: false }
      ]
      this.diaFormInfo.rules = {
        intrm: [{ required: true, message: this.$t('transportationScheduling.msg.intrm'), trigger: 'blur' }],
        subTransportType: [{ required: true, message: this.$t('transportationScheduling.msg.transitTransportType'), trigger: 'blur' }]
      }
      this.diaFormInfo.fieldList.forEach(item => {
        this.$set(this.diaFormInfo.data, item.value, null)
      })
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
