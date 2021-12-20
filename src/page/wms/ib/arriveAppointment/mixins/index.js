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
          appointmentNo: null,
          asnNo: null,
          ownerId: null,
          supplierId: null,
          partnerId: null,
          arrivePerson: null,
          arrivePersonTel: null,
          appointmentStatus: null,
          platformId: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        appointmentStatusList: [],
        tempMethodList: [],
        transMethodList: []
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
            { label: this.$t('table.view'), type: 'primary', icon: '', event: 'openViewPage', show: true, disabled: this.$hasPerm('view') }, // event值为notification.js中定义的方法名
            // 默认修改按钮
            { label: this.$t('table.edit'), type: 'success', icon: '', event: 'openEditPage', show: true, disabled: this.$hasPerm('edit') }, // event值为notification.js中定义的方法名
            // 默认删除按钮
            { label: this.$t('table.delete'), type: 'danger', icon: '', event: 'deleteData', show: true, disabled: this.$hasPerm('delete') }// event值为notification.js中定义的方法名
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
        { label: this.$t('arriveAppointment.appointmentNo'), value: 'appointmentNo', type: 'input' },
        { label: this.$t('arriveAppointment.asnNo'), value: 'asnNo', type: 'input' },
        { label: this.$t('arriveAppointment.appointmentStatus'), value: 'appointmentStatus', type: 'select', list: 'appointmentStatusList' },
        { label: this.$t('arriveAppointment.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('arriveAppointment.supplierId'), value: 'supplierId', type: 'slot' },
        { label: this.$t('arriveAppointment.appointmentTimeBegin'), value: 'appointmentTimeBegin', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('arriveAppointment.appointmentTimeEnd'), value: 'appointmentTimeEnd', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('arriveAppointment.partnerId'), value: 'partnerId', type: 'slot' },
        { label: this.$t('arriveAppointment.arrivePerson'), value: 'arrivePerson', type: 'input' },
        { label: this.$t('arriveAppointment.arrivePersonTel'), value: 'arrivePersonTel', type: 'input' },
        { label: this.$t('arriveAppointment.platformId'), value: 'platformId', type: 'slot' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('arriveAppointment.appointmentNo'), value: 'appointmentNo', type: 'input' },
        { label: this.$t('arriveAppointment.asnNo'), value: 'asnNo', type: 'input' },
        { label: this.$t('arriveAppointment.appointmentStatus'), value: 'appointmentStatus', type: 'select', list: 'appointmentStatusList' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
      this.topForm.data.ownerId = null
      this.topForm.data.supplierId = null
      this.topForm.data.partnerId = null
      this.topForm.data.platformId = null
    },
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'appointmentNo', label: this.$t('arriveAppointment.appointmentNo'), minWidth: 150 },
        { prop: 'asnNo', label: this.$t('arriveAppointment.asnNo'), minWidth: 150 },
        { prop: 'arriveOrderNo', label: this.$t('arriveAppointment.arriveOrderNo'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('arriveAppointment.ownerId'), minWidth: 100 },
        { prop: 'supplierName', label: this.$t('arriveAppointment.supplierId'), minWidth: 100 },
        { prop: 'areaName', label: this.$t('arriveAppointment.whAreaId'), minWidth: 100 },
        { prop: 'customerName', label: this.$t('arriveAppointment.customer'), minWidth: 100 },
        { prop: 'appointmentTime', label: this.$t('arriveAppointment.appointmentTime'), minWidth: 130 },
        { prop: 'platformName', label: this.$t('arriveAppointment.platformId'), minWidth: 100 },
        { prop: 'partnerName', label: this.$t('arriveAppointment.partnerId'), minWidth: 100 },
        { prop: 'arrivePerson', label: this.$t('arriveAppointment.arrivePerson'), minWidth: 100 },
        { prop: 'arrivePersonTel', label: this.$t('arriveAppointment.arrivePersonTel'), minWidth: 100 },
        { prop: 'appointmentStatusName', label: this.$t('arriveAppointment.appointmentStatus'), minWidth: 100 }

        // {prop:"transStartTime", label:this.$t('arriveAppointment.transStartTime'), minWidth:100},
        // {prop:"transArriveTime", label:this.$t('arriveAppointment.transArriveTime'), minWidth:100},
        // {prop:"transMethod", label:this.$t('arriveAppointment.transMethod'), minWidth:100},
        // {prop:"tempMethod", label:this.$t('arriveAppointment.tempMethod'), minWidth:100},
        // {prop:"startTemp", label:this.$t('arriveAppointment.startTemp'), minWidth:100},
        // {prop:"arriveTemp", label:this.$t('arriveAppointment.arriveTemp'), minWidth:100},
        // {prop:"startAddr", label:this.$t('arriveAppointment.startAddr'), minWidth:100},
        // {prop:"carMark", label:this.$t('arriveAppointment.carMark'), minWidth:100},
        // {prop:"remark", label:this.$t('arriveAppointment.remark'), minWidth:100},
        // {prop:"creator", label:this.$t('arriveAppointment.creator'), minWidth:100},
        // {prop:"creatorName", label:this.$t('arriveAppointment.creatorName'), minWidth:100},
        // {prop:"createTime", label:this.$t('arriveAppointment.createTime'), minWidth:100},
        // {prop:"updater", label:this.$t('arriveAppointment.updater'), minWidth:100},
        // {prop:"updaterName", label:this.$t('arriveAppointment.updaterName'), minWidth:100},
        // {prop:"updateTime", label:this.$t('arriveAppointment.updateTime'), minWidth:100},
        // {prop:"optimistic", label:this.$t('arriveAppointment.optimistic'), minWidth:100},

      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('arriveAppointment.appointmentNo'), value: 'appointmentNo', type: 'input', disabled: true },
        { label: this.$t('arriveAppointment.asnNo'), value: 'asnNo', type: 'input', disabled: true },
        { label: this.$t('arriveAppointment.arriveOrderNo'), value: 'arriveOrderNo', type: 'input', disabled: true },
        { label: this.$t('arriveAppointment.ownerId'), value: 'ownerId', type: 'slot', disabled: true },
        { label: this.$t('arriveAppointment.supplierId'), value: 'supplierId', type: 'slot', disabled: true },
        { label: this.$t('arriveAppointment.customer'), value: 'customerId', type: 'slot', disabled: true },
        { label: this.$t('arriveAppointment.appointmentTime'), value: 'appointmentTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss', disabled: true },
        { label: this.$t('arriveAppointment.partnerId'), value: 'partnerId', type: 'slot', disabled: true },
        { label: this.$t('arriveAppointment.whAreaId'), value: 'whAreaId', link: 'whAreaName', type: 'slot', disabled: true },
        // { label: this.$t('arriveAppointment.deliveryWH'), value: 'whAreaId', type: 'input', disabled: true },
        { label: this.$t('arriveAppointment.arrivePerson'), value: 'arrivePerson', type: 'input', disabled: true },
        { label: this.$t('arriveAppointment.arrivePersonTel'), value: 'arrivePersonTel', type: 'input', disabled: true },
        { label: this.$t('arriveAppointment.transStartTime'), value: 'transStartTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss', disabled: true },
        { label: this.$t('arriveAppointment.transArriveTime'), value: 'transArriveTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss', disabled: true },
        { label: this.$t('arriveAppointment.transMethod'), value: 'transMethod', type: 'select', list: 'transMethodList', disabled: true },
        { label: this.$t('arriveAppointment.tempMethod'), value: 'tempMethod', type: 'select', list: 'tempMethodList', disabled: true },
        { label: this.$t('arriveAppointment.startTemp'), value: 'startTempDec', type: 'input', disabled: true },
        { label: this.$t('arriveAppointment.arriveTemp'), value: 'arriveTempDec', type: 'input', disabled: true },
        { label: this.$t('arriveAppointment.startAddr'), value: 'startAddr', type: 'input', disabled: true },
        { label: this.$t('arriveAppointment.carMark'), value: 'carMark', type: 'input', disabled: true },
        { label: this.$t('arriveAppointment.remark'), value: 'remark', type: 'input', disabled: true },
        { label: this.$t('arriveAppointment.appointmentStatus'), value: 'appointmentStatus', type: 'select', list: 'appointmentStatusList', disabled: true },
        { label: this.$t('arriveAppointment.platformId'), value: 'platformId', type: 'slot', disabled: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('arriveAppointment.asnNo'), value: 'asnNo', type: 'input' },
        { label: this.$t('arriveAppointment.arriveOrderNo'), value: 'arriveOrderNo', type: 'input' },
        { label: this.$t('arriveAppointment.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('arriveAppointment.supplierId'), value: 'supplierId', type: 'slot' },
        { label: this.$t('arriveAppointment.customer'), value: 'customerId', type: 'slot' },
        { label: this.$t('arriveAppointment.appointmentTime'), value: 'appointmentTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('arriveAppointment.partnerId'), value: 'partnerId', type: 'slot' },
        { label: this.$t('arriveAppointment.whAreaId'), value: 'whAreaId', link: 'whAreaName', type: 'slot' },
        { label: this.$t('arriveAppointment.arrivePerson'), value: 'arrivePerson', type: 'input' },
        { label: this.$t('arriveAppointment.arrivePersonTel'), value: 'arrivePersonTel', type: 'input' },
        { label: this.$t('arriveAppointment.transStartTime'), value: 'transStartTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('arriveAppointment.transArriveTime'), value: 'transArriveTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('arriveAppointment.transMethod'), value: 'transMethod', type: 'select', list: 'transMethodList' },
        { label: this.$t('arriveAppointment.tempMethod'), value: 'tempMethod', type: 'select', list: 'tempMethodList' },
        { label: this.$t('arriveAppointment.startTemp'), value: 'startTempDec', type: 'input' },
        { label: this.$t('arriveAppointment.arriveTemp'), value: 'arriveTempDec', type: 'input' },
        { label: this.$t('arriveAppointment.startAddr'), value: 'startAddr', type: 'input' },
        { label: this.$t('arriveAppointment.carMark'), value: 'carMark', type: 'input' },
        { label: this.$t('arriveAppointment.remark'), value: 'remark', type: 'input' },
        { label: this.$t('arriveAppointment.platformId'), value: 'platformId', type: 'slot' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('arriveAppointment.appointmentNo'), value: 'appointmentNo', type: 'input', disabled: true },
        { label: this.$t('arriveAppointment.asnNo'), value: 'asnNo', type: 'input', disabled: true },
        { label: this.$t('arriveAppointment.arriveOrderNo'), value: 'arriveOrderNo', type: 'input' },
        { label: this.$t('arriveAppointment.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('arriveAppointment.supplierId'), value: 'supplierId', type: 'slot' },
        { label: this.$t('arriveAppointment.customer'), value: 'customerId', type: 'slot' },
        { label: this.$t('arriveAppointment.appointmentTime'), value: 'appointmentTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('arriveAppointment.partnerId'), value: 'partnerId', type: 'slot' },
        { label: this.$t('arriveAppointment.whAreaId'), value: 'whAreaId', link: 'whAreaName', type: 'slot' },
        { label: this.$t('arriveAppointment.arrivePerson'), value: 'arrivePerson', type: 'input' },
        { label: this.$t('arriveAppointment.arrivePersonTel'), value: 'arrivePersonTel', type: 'input' },
        { label: this.$t('arriveAppointment.transStartTime'), value: 'transStartTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('arriveAppointment.transArriveTime'), value: 'transArriveTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('arriveAppointment.transMethod'), value: 'transMethod', type: 'select', list: 'transMethodList' },
        { label: this.$t('arriveAppointment.tempMethod'), value: 'tempMethod', type: 'select', list: 'tempMethodList' },
        { label: this.$t('arriveAppointment.startTemp'), value: 'startTempDec', type: 'input' },
        { label: this.$t('arriveAppointment.arriveTemp'), value: 'arriveTempDec', type: 'input' },
        { label: this.$t('arriveAppointment.startAddr'), value: 'startAddr', type: 'input' },
        { label: this.$t('arriveAppointment.carMark'), value: 'carMark', type: 'input' },
        { label: this.$t('arriveAppointment.remark'), value: 'remark', type: 'input' },
        { label: this.$t('arriveAppointment.appointmentStatus'), value: 'appointmentStatus', type: 'select', list: 'appointmentStatusList', disabled: true },
        { label: this.$t('arriveAppointment.platformId'), value: 'platformId', type: 'slot' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        appointmentTime: [{ required: true, message: this.$t('arriveAppointment.msg.appointmentTime'), trigger: 'blur' }],
        appointmentStatus: [{ required: true, message: this.$t('arriveAppointment.msg.appointmentStatus'), trigger: 'blur' }],
        ownerId: [{ required: true, message: this.$t('arriveAppointment.msg.ownerId'), trigger: 'blur' }],
        asnNo: [{ required: true, message: this.$t('arriveAppointment.msg.asnNo'), trigger: 'blur' }],
        arriveOrderNo: [{ required: true, message: this.$t('arriveAppointment.msg.arriveOrderNo'), trigger: 'blur' }],
        arrivePerson: [{ required: true, message: this.$t('arriveAppointment.msg.arrivePerson'), trigger: 'blur' }],
        appointmentNo: [{ required: true, message: this.$t('arriveAppointment.msg.appointmentNo'), trigger: 'blur' }],
        partnerId: [{ required: true, message: this.$t('arriveAppointment.msg.partnerId'), trigger: 'blur' }],
        arrivePersonTel: [{ required: true, message: this.$t('arriveAppointment.msg.arrivePersonTel'), trigger: 'blur' }],
        supplierId: [{ required: true, message: this.$t('arriveAppointment.msg.supplierId'), trigger: 'blur' }],
        startTempDec: [{ required: false, validator: this.$valid.getTempValidatorAllowNull(), trigger: 'blur' }],
        arriveTempDec: [{ required: false, validator: this.$valid.getTempValidatorAllowNull(), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        appointmentTime: null,
        appointmentStatus: null,
        ownerId: null,
        arriveTemp: null,
        arriveTempDec: null,
        asnNo: null,
        transStartTime: null,
        startTemp: null,
        startTempDec: null,
        remark: null,
        whAreaId: null,
        arriveOrderNo: null,
        arrivePerson: null,
        appointmentNo: null,
        partnerId: null,
        whId: null,
        arrivePersonTel: null,
        transMethod: null,
        platformId: null,
        companyCode: null,
        id: null,
        tempMethod: null,
        startAddr: null,
        supplierId: null,
        transArriveTime: null,
        carMark: null
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
