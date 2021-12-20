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
          assignOrderNo: null,
          planOrderNo: null,
          corderNo: null,
          assignStatus: null,
          ownerName: null,
          ownerCode: null,
          deliverType: null,
          senderCode: null,
          senderName: null,
          receiverCode: null,
          receiverName: null,
          carrierCode: null,
          carrierName: null,
          transportType: null,
          plateNumber: null,
          createTimeBegin: null,
          createTimeEnd: null,
          affirmDepartTimeBegin: null,
          affirmDepartTimeEnd: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        assignmentStatusList: [],
        deliveryTypeList: [],
        transportTypeList: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '250', // 默认操作按钮列宽度
          btList: [// 添加操作按钮
            // 默认查看按钮
            { label: this.$t('table.view'), type: 'primary', icon: '', event: 'openViewPage', show: true }, // event值为notification.js中定义的方法名
            { slot: true, icon: '', event: 'slotEvent' }
            // { label: '确认发运', type: 'success', icon: '', event: 'confirmAssign', show: true }, // event值为notification.js中定义的方法名
            // { label: '取消配载', type: 'danger', icon: '', event: 'cancelAssign', show: true } // event值为notification.js中定义的方法名
          ]
        }
      },
      // 弹窗表单
      diaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {
          assignOrderNo: null,
          remark: null,
          evidenceList: []
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
    // 主页面初始化数据
    collapsableFormMore() {
      this.topForm.fieldList = [
        { label: this.$t('stowageList.assignOrderNo'), value: 'assignOrderNo', type: 'input' },
        { label: this.$t('stowageList.planOrderNo'), value: 'planOrderNo', type: 'input' },
        { label: this.$t('stowageList.customNo'), value: 'corderNo', type: 'input' },
        { label: this.$t('stowageList.assignStatus'), value: 'assignStatus', type: 'select', list: 'assignmentStatusList' },
        { label: this.$t('stowageList.ownerName'), value: 'ownerName', type: 'slot' },
        { label: this.$t('stowageList.deliverType'), value: 'deliverType', type: 'select', list: 'deliveryTypeList' },
        { label: this.$t('stowageList.senderName'), value: 'senderName', type: 'slot' },
        { label: this.$t('stowageList.receiverName'), value: 'receiverName', type: 'slot' },
        { label: this.$t('stowageList.carrierName'), value: 'carrierName', type: 'slot' },
        { label: this.$t('stowageList.transportType'), value: 'transportType', type: 'select', list: 'transportTypeList' },
        { label: this.$t('stowageList.plateNumber'), value: 'plateNumber', type: 'input' },
        { label: this.$t('stowageList.createTimeBegin'), value: 'createTimeBegin', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('stowageList.createTimeEnd'), value: 'createTimeEnd', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('stowageList.affirmDepartTimeBegin'), value: 'affirmDepartTimeBegin', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('stowageList.affirmDepartTimeEnd'), value: 'affirmDepartTimeEnd', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    // 展开收起表单
    collapsableForm() {
      this.topForm.fieldList = [
        { label: this.$t('stowageList.assignOrderNo'), value: 'assignOrderNo', type: 'input' },
        { label: this.$t('stowageList.planOrderNo'), value: 'planOrderNo', type: 'input' },
        { label: this.$t('stowageList.customNo'), value: 'corderNo', type: 'input' },
        { label: this.$t('stowageList.assignStatus'), value: 'assignStatus', type: 'select', list: 'assignmentStatusList' },
        { label: this.$t('stowageList.ownerName'), value: 'ownerName', type: 'slot' },
        { label: this.$t('stowageList.deliverType'), value: 'deliverType', type: 'select', list: 'deliveryTypeList' },
        { label: this.$t('stowageList.senderName'), value: 'senderName', type: 'slot' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: '', type: 'selection', width: 50 },
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'assignOrderNo', label: this.$t('stowageList.assignOrderNo'), minWidth: 100 },
        { prop: 'assignStatusName', label: this.$t('stowageList.assignStatus'), minWidth: 100 },
        { prop: 'estimateArriveTime', label: this.$t('stowageList.estimateArriveTime'), minWidth: 100 },
        { prop: 'actualArriveTime', label: this.$t('stowageList.actualArriveTime'), minWidth: 100 },
        { prop: 'assignStartTime', label: this.$t('stowageList.assignStartTime'), minWidth: 100 },
        { prop: 'assignEndTime', label: this.$t('stowageList.assignEndTime'), minWidth: 100 },
        { prop: 'affirmDepartTime', label: this.$t('stowageList.affirmDepartTime'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('stowageList.ownerName'), minWidth: 100 },
        { prop: 'deliverTypeName', label: this.$t('stowageList.deliverType'), minWidth: 100 },
        { prop: 'unloadTypeName', label: this.$t('stowageList.unloadType'), minWidth: 100 },
        { prop: 'senderName', label: this.$t('stowageList.senderName'), minWidth: 100 },
        { prop: 'sendProvinceName', label: this.$t('stowageList.sendProvinceName'), minWidth: 100 },
        { prop: 'sendCityName', label: this.$t('stowageList.sendCityName'), minWidth: 100 },
        { prop: 'sendAreaName', label: this.$t('stowageList.sendAreaName'), minWidth: 100 },
        { prop: 'sendLocation', label: this.$t('stowageList.sendLocation'), minWidth: 100 },
        { prop: 'sendContactor', label: this.$t('stowageList.sendContactor'), minWidth: 100 },
        { prop: 'senderPhone', label: this.$t('stowageList.senderPhone'), minWidth: 100 },
        { prop: 'orderNum', label: this.$t('stowageList.orderNum'), minWidth: 100 },
        { prop: 'skuCount', label: this.$t('stowageList.skuCount'), minWidth: 100 },
        { prop: 'numCount', label: this.$t('stowageList.numCount'), minWidth: 100 },
        { prop: 'orderWeight', label: this.$t('stowageList.orderWeight'), minWidth: 100 },
        { prop: 'orderVolume', label: this.$t('stowageList.orderVolume'), minWidth: 100 },
        { prop: 'orderSendTypeName', label: this.$t('stowageList.orderSendType'), minWidth: 100 },
        { prop: 'orderPsTypeName', label: this.$t('stowageList.orderPsType'), minWidth: 100 },
        { prop: 'carrierName', label: this.$t('stowageList.carrierName'), minWidth: 100 },
        { prop: 'transportTypeName', label: this.$t('stowageList.transportType'), minWidth: 100 },
        { prop: 'creatorName', label: this.$t('stowageList.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('stowageList.createTime'), minWidth: 100 },
        { prop: 'updaterName', label: this.$t('stowageList.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('stowageList.updateTime'), minWidth: 100 }
      ]
    },
    diaFormCancelPZFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('stowageList.cancelReson'), value: 'remark', type: 'textarea', maxlength: 200, span: 12 },
        { label: this.$t('stowageList.cancel'), value: 'cancel', type: 'slot' }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
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
        remark: [{ required: true, message: this.$t('stowageList.msg.cancelReson'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        assignOrderNo: null,
        remark: null,
        evidenceList: []
      }
      this.fileList = []
      this.evidenceList = []
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
