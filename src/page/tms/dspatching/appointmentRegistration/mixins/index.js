import risize from '@/layout/Home/mixin/RisizeTable'
import notification from './notification'
export default {
  mixins: [risize, notification],
  data() {
    return {
      // 主页面的top表单
      topForm: {
        ref: null, // 对外提供的可操作表单的持有对象
        fieldList: null, // 配置的表单字段集合
        data: { // 表单绑定的数据Model
          appointOrderNo: null,
          appointType: null,
          planOrderNo: null,
          orderNo: null,
          cOrderNo: null,
          ownerCode: null,
          ownerName: null,
          senderCode: null,
          senderName: null,
          receiverCode: null,
          receiverName: null,
          carrierCode: null,
          carrierName: null,
          plateNumber: null,
          appointPickupTime: null,
          prePickupTimeTo: null,
          appointSendTime: null,
          preSendTimeTo: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px' // 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        enableList: [
          { key: '否', value: 1 },
          { key: '是', value: 2 }
        ],
        controlTypeList: [],
        appointTypeList: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '150', // 默认操作按钮列宽度
          btList: [
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
        width: '210mm',
        rules: {},
        data: {},
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
    this.initTopFormColumns()// 初始化查询界面配置数据
    // this.rulesInit()// 初始化diaFormInfo表单字段校验规则
  },
  methods: {
    // 展开收起表单
    collapsableForm() {
      this.topForm.fieldList = [
        { label: this.$t('appointmentRegistration.appointOrderNo'), value: 'appointOrderNo', type: 'input' },
        { label: this.$t('appointmentRegistration.appointType'), value: 'appointType', type: 'select', list: 'appointTypeList' },
        { label: this.$t('appointmentRegistration.planOrderNo'), value: 'planOrderNo', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }
      ]
    },

    // 展开收起表单
    collapsableFormMore() {
      this.topForm.fieldList = [
        { label: this.$t('appointmentRegistration.appointOrderNo'), value: 'appointOrderNo', type: 'input' },
        { label: this.$t('appointmentRegistration.appointType'), value: 'appointType', type: 'select', list: 'appointTypeList' },
        { label: this.$t('appointmentRegistration.planOrderNo'), value: 'planOrderNo', type: 'input' },
        { label: this.$t('appointmentRegistration.orderNo'), value: 'orderNo', type: 'input' },
        { label: this.$t('appointmentRegistration.cOrderNo'), value: 'cOrderNo', type: 'input' },
        { label: this.$t('appointmentRegistration.owner'), value: 'ownerCode', type: 'slot' },
        { label: this.$t('appointmentRegistration.sender'), value: 'senderCode', type: 'slot' },
        { label: this.$t('appointmentRegistration.receiver'), value: 'receiverCode', type: 'slot' },
        { label: this.$t('appointmentRegistration.carrier'), value: 'carrierCode', type: 'slot' },
        { label: this.$t('appointmentRegistration.plateNumber'), value: 'plateNumber', type: 'input' },
        { label: this.$t('appointmentRegistration.appointPickupTime'), value: 'appointPickupTimeBegin', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('appointmentRegistration.prePickupTimeTo'), value: 'appointPickupTimeEnd', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('appointmentRegistration.appointSendTime'), value: 'appointSendTimeBegin', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('appointmentRegistration.preSendTimeTo'), value: 'appointSendTimeEnd', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }
      ]
    },

    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 },
        { prop: 'appointOrderNo', label: this.$t('appointmentRegistration.appointOrderNo'), minWidth: 100 },
        { prop: 'appointTypeName', label: this.$t('appointmentRegistration.appointType'), minWidth: 100 },
        { prop: 'orderNo', label: this.$t('appointmentRegistration.orderNo'), minWidth: 100 },
        { prop: 'cOrderNo', label: this.$t('appointmentRegistration.cOrderNo'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('appointmentRegistration.owner'), minWidth: 100 },
        { prop: 'carrierName', label: this.$t('appointmentRegistration.carrier'), minWidth: 100 },
        { prop: 'senderName', label: this.$t('appointmentRegistration.sender'), minWidth: 100 },
        { prop: 'receiverName', label: this.$t('appointmentRegistration.receiver'), minWidth: 100 },
        { prop: 'appointPickupTime', label: this.$t('appointmentRegistration.appointPickupTime'), minWidth: 100 },
        { prop: 'appointSendTime', label: this.$t('appointmentRegistration.appointSendTime'), minWidth: 100 },
        { prop: 'vehicleType', label: this.$t('appointmentRegistration.vehicleType'), minWidth: 100 },
        { prop: 'plateNumber', label: this.$t('appointmentRegistration.plateNumber'), minWidth: 100 },
        { prop: 'driverName', label: this.$t('appointmentRegistration.driverName'), minWidth: 100 },
        { prop: 'driverPhone', label: this.$t('appointmentRegistration.driverPhone'), minWidth: 100 },
        { prop: 'controlTypeName', label: this.$t('appointmentRegistration.controlType'), minWidth: 100 },
        { prop: 'platform', label: this.$t('appointmentRegistration.platform'), minWidth: 100 },
        { prop: 'remark', label: this.$t('appointmentRegistration.remark'), minWidth: 100 },
        { prop: 'creator', label: this.$t('appointmentRegistration.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('appointmentRegistration.createTime'), minWidth: 100 },
        { prop: 'updater', label: this.$t('appointmentRegistration.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('appointmentRegistration.updateTime'), minWidth: 100 }
      ]
    },

    // 查看
    initViewDialogField() {
      this.dialogInfo.fieldList = [
        { label: this.$t('appointmentRegistration.appointOrderNo'), value: 'appointOrderNo', type: 'input', disabled: true },
        { label: this.$t('appointmentRegistration.appointType'), value: 'appointType', type: 'select', list: 'appointTypeList', disabled: true },
        { label: this.$t('appointmentRegistration.planOrderNo'), value: 'planOrderNo', type: 'input', disabled: true },
        { label: this.$t('appointmentRegistration.orderNo'), value: 'orderNo', type: 'input', disabled: true },
        { label: this.$t('appointmentRegistration.cOrderNo'), value: 'cOrderNo', type: 'input', disabled: true },
        { label: this.$t('appointmentRegistration.owner'), value: 'ownerName', type: 'input', disabled: true },
        { label: this.$t('appointmentRegistration.carrier'), value: 'carrierName', type: 'input', disabled: true },
        { label: this.$t('appointmentRegistration.sender'), value: 'senderName', type: 'input', disabled: true },
        { label: this.$t('appointmentRegistration.receiver'), value: 'receiverName', type: 'input', disabled: true },
        { label: this.$t('appointmentRegistration.appointPickupTime'), value: 'appointPickupTime', type: 'input', disabled: true },
        { label: this.$t('appointmentRegistration.appointSendTime'), value: 'appointSendTime', type: 'input', disabled: true },
        { label: this.$t('appointmentRegistration.vehicleType'), value: 'vehicleType', type: 'input', disabled: true },
        { label: this.$t('appointmentRegistration.plateNumber'), value: 'plateNumber', type: 'input', disabled: true },
        { label: this.$t('appointmentRegistration.driverName'), value: 'driverName', type: 'input', disabled: true },
        { label: this.$t('appointmentRegistration.driverPhone'), value: 'driverPhone', type: 'input', disabled: true },
        { label: this.$t('appointmentRegistration.controlType'), value: 'controlType', type: 'select', list: 'controlTypeList', disabled: true },
        { label: this.$t('appointmentRegistration.platform'), value: 'platform', type: 'input', disabled: true },
        { label: this.$t('appointmentRegistration.remark'), value: 'remark', type: 'textarea', maxlength: 200, className: 'long-row', disabled: true },
        { label: this.$t('appointmentRegistration.reserveCertificate'), value: 'img', type: 'slot', className: 'long-row' }
      ]
    },

    // 新增
    initAddDialogField(type) {
      this.dialogInfo.fieldList = [
        { label: this.$t('appointmentRegistration.planOrderNo'), value: 'planOrderNo', type: 'input', eventBlur: 'planOrderNoBlur', disabled: false, require },
        { label: this.$t('appointmentRegistration.orderNo'), value: 'orderNo', type: 'input', disabled: true, require },
        { label: this.$t('appointmentRegistration.cOrderNo'), value: 'cOrderNo', type: 'input', disabled: true },
        { label: this.$t('appointmentRegistration.appointType'), value: 'appointType', type: 'select', list: 'appointTypeList', event: 'appointTypeChange', require },
        { label: this.$t('appointmentRegistration.appointPickupTime'), value: 'appointPickupTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('appointmentRegistration.appointSendTime'), value: 'appointSendTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('appointmentRegistration.vehicleType'), value: 'vehicleType', type: 'input' },
        { label: this.$t('appointmentRegistration.plateNumber'), value: 'plateNumber', type: 'input' },
        { label: this.$t('appointmentRegistration.controlType'), value: 'controlType', type: 'select', list: 'controlTypeList', clearable: false },
        { label: this.$t('appointmentRegistration.platform'), value: 'platform', type: 'input' },
        { label: this.$t('appointmentRegistration.driverName'), value: 'driverName', type: 'input' },
        { label: this.$t('appointmentRegistration.driverPhone'), value: 'driverPhone', type: 'input' },
        { label: this.$t('appointmentRegistration.remark'), value: 'remark', type: 'textarea', maxlength: 200, className: 'long-row' },
        { label: this.$t('appointmentRegistration.reserveCertificate'), value: 'img', type: 'slot', className: 'long-row' }
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
          if (item.value === 'controlType') {
            this.$set(this.dialogInfo.data, item.value, 1)
          } else {
            this.$set(this.dialogInfo.data, item.value, '')
          }
        })
      }
    },

    // 编辑
    initEditDialogField() {
      this.dialogInfo.fieldList = [
        { label: this.$t('appointmentRegistration.appointOrderNo'), value: 'appointOrderNo', type: 'input', disabled: true, require },
        { label: this.$t('appointmentRegistration.appointType'), value: 'appointType', type: 'select', list: 'appointTypeList', disabled: true, require },
        { label: this.$t('appointmentRegistration.planOrderNo'), value: 'planOrderNo', type: 'input', disabled: true, require },
        { label: this.$t('appointmentRegistration.orderNo'), value: 'orderNo', type: 'input', disabled: true, require },
        { label: this.$t('appointmentRegistration.cOrderNo'), value: 'cOrderNo', type: 'input', disabled: true, require },
        { label: this.$t('appointmentRegistration.owner'), value: 'ownerName', type: 'input', disabled: true, require },
        { label: this.$t('appointmentRegistration.carrier'), value: 'carrierName', type: 'input', disabled: true, require },
        { label: this.$t('appointmentRegistration.sender'), value: 'senderName', type: 'input', disabled: true, require },
        { label: this.$t('appointmentRegistration.receiver'), value: 'receiverName', type: 'input', disabled: true, require },
        { label: this.$t('appointmentRegistration.appointPickupTime'), value: 'appointPickupTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss', require },
        { label: this.$t('appointmentRegistration.appointSendTime'), value: 'appointSendTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss', require },
        { label: this.$t('appointmentRegistration.vehicleType'), value: 'vehicleType', type: 'input' },
        { label: this.$t('appointmentRegistration.plateNumber'), value: 'plateNumber', type: 'input' },
        { label: this.$t('appointmentRegistration.driverName'), value: 'driverName', type: 'input' },
        { label: this.$t('appointmentRegistration.driverPhone'), value: 'driverPhone', type: 'input' },
        { label: this.$t('appointmentRegistration.controlType'), value: 'controlType', type: 'select', list: 'controlTypeList' },
        { label: this.$t('appointmentRegistration.platform'), value: 'platform', type: 'input' },
        { label: this.$t('appointmentRegistration.remark'), value: 'remark', type: 'textarea', maxlength: 200, className: 'long-row' },
        { label: this.$t('appointmentRegistration.reserveCertificate'), value: 'img', type: 'slot', className: 'long-row' }
      ]
      this.dialogInfo.data = {}
      this.dialogInfo.fieldList.forEach(item => {
        this.$set(this.dialogInfo.data, item.value, '')
      })
    },

    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit(type) {
      const baseRules = {
        appointOrderNo: [{ required: true, message: this.$t('appointmentRegistration.msg.appointOrderNo'), trigger: 'blur' }],
        planOrderNo: [{ required: true, message: this.$t('appointmentRegistration.msg.planOrderNo'), trigger: 'blur' }],
        orderNo: [{ required: true, message: this.$t('appointmentRegistration.msg.orderNo'), trigger: 'blur' }],
        appointType: [{ required: true, message: this.$t('appointmentRegistration.msg.appointType'), trigger: 'blur' }]
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
