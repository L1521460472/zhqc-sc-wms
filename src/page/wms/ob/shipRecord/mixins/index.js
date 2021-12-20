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
          id: null,
          companyCode: null,
          whId: null,
          shipRecordNo: null,
          shipmentId: null,
          shipmentNo: null,
          shipTime: null,
          loadAddr: null,
          shipTool: null,
          carMark: null,
          loadPerature: null,
          boxNo: null,
          transUser: null,
          driverName: null,
          signName: null,
          unloadPerature: null,
          shipStatus: null,
          partnerStoreId: null,
          partnerStoreName: null,
          deliveryAddr: null,
          goodsNum: null,
          remark: null,
          creator: null,
          creatorName: null,
          createTime: null,
          updater: null,
          updaterName: null,
          updateTime: null,
          optimistic: null,
          shipTimeBegin: null,
          shipTimeEnd: null,
          createTimeBegin: null,
          createTimeEnd: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        shipToolList: [],
        shipStatusList: []
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
        data: {

        }, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}// 配置的表单字段校验规则集合
      }
    }
  },
  mounted() {
    this.collapsableForm()// 初始化表单-----------------展开收起
    this.initTopFormColumns()// 初始化查询界面配置数据
    this.rulesInit()// 初始化diaFormInfo表单字段校验规则
    this.resetFormData()
  },
  methods: {
    collapsableFormMore() { // 展开收起表单
      // 初始化列表
      this.topForm.fieldList = [
        { label: this.$t('shipRecord.shipmentNo'), value: 'shipmentNo', type: 'input' },
        { label: this.$t('shipRecord.shipRecordNo'), value: 'shipRecordNo', type: 'input' },
        { label: this.$t('shipRecord.shipStatus'), value: 'shipStatus', type: 'select', list: 'shipStatusList' },
        { label: this.$t('shipRecord.shipTool'), value: 'shipTool', type: 'select', list: 'shipToolList' },
        { label: this.$t('shipRecord.carMark'), value: 'carMark', type: 'input' },
        { label: this.$t('shipRecord.transUser'), value: 'transUser', type: 'input' },
        { label: this.$t('shipRecord.signName'), value: 'signName', type: 'input' },
        { label: this.$t('shipRecord.boxNo'), value: 'boxNo', type: 'input' },
        { label: this.$t('shipRecord.shipTimeBegin'), value: 'shipTimeBegin', type: 'date' },
        { label: this.$t('shipRecord.shipTimeEnd'), value: 'shipTimeEnd', type: 'date' },
        { label: this.$t('shipRecord.createTimeBegin'), value: 'createTimeBegin', type: 'date' },
        { label: this.$t('shipRecord.createTimeEnd'), value: 'createTimeEnd', type: 'date' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('shipRecord.shipmentNo'), value: 'shipmentNo', type: 'input' },
        { label: this.$t('shipRecord.shipRecordNo'), value: 'shipRecordNo', type: 'input' },
        { label: this.$t('shipRecord.shipStatus'), value: 'shipStatus', type: 'select', list: 'shipStatusList' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    // 主页面初始化数据
    initTopFormColumns() {
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'selection', width: 50, fixed: 'left' }, // 选项框
        { prop: 'shipmentNo', label: this.$t('shipRecord.shipmentNo'), minWidth: 130 },
        { prop: 'shipRecordNo', label: this.$t('shipRecord.shipRecordNo'), minWidth: 130 },
        { prop: 'shipStatusName', label: this.$t('shipRecord.shipStatus'), minWidth: 100 },
        { prop: 'shipTime', label: this.$t('shipRecord.shipTime'), minWidth: 100 },
        { prop: 'loadAddr', label: this.$t('shipRecord.loadAddr'), minWidth: 150 },
        { prop: 'shipToolName', label: this.$t('shipRecord.shipTool'), minWidth: 100 },
        { prop: 'carMark', label: this.$t('shipRecord.carMark'), minWidth: 100 },
        { prop: 'loadPerature', label: this.$t('shipRecord.loadPerature'), minWidth: 100 },
        { prop: 'boxNo', label: this.$t('shipRecord.boxNo'), minWidth: 100 },
        { prop: 'transUser', label: this.$t('shipRecord.transUser'), minWidth: 100 },
        { prop: 'driverName', label: this.$t('shipRecord.driverName'), minWidth: 100 },
        { prop: 'signName', label: this.$t('shipRecord.signName'), minWidth: 100 },
        { prop: 'unloadPerature', label: this.$t('shipRecord.unloadPerature'), minWidth: 100 },
        { prop: 'partnerStoreName', label: this.$t('shipRecord.partnerStoreName'), minWidth: 100 },
        { prop: 'deliveryAddr', label: this.$t('shipRecord.deliveryAddr'), minWidth: 100 },
        { prop: 'goodsNum', label: this.$t('shipRecord.goodsNum'), minWidth: 100 },
        { prop: 'remark', label: this.$t('shipRecord.remark'), minWidth: 100 },
        { prop: 'creatorName', label: this.$t('shipRecord.creatorName'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('shipRecord.createTime'), minWidth: 100 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('shipRecord.shipmentNo'), value: 'shipmentId', type: 'slot' },
        { label: this.$t('shipRecord.shipTime'), value: 'shipTime', type: 'date', disabled: true },
        { label: this.$t('shipRecord.loadAddr'), value: 'loadAddr', type: 'input', disabled: true },
        { label: this.$t('shipRecord.shipTool'), value: 'shipTool', type: 'select', list: 'shipToolList', disabled: true },
        { label: this.$t('shipRecord.carMark'), value: 'carMark', type: 'input', disabled: true },
        { label: this.$t('shipRecord.loadPerature'), value: 'loadPerature', type: 'input', disabled: true },
        { label: this.$t('shipRecord.boxNo'), value: 'boxNo', type: 'input', disabled: true },
        { label: this.$t('shipRecord.transUser'), value: 'transUser', type: 'input', disabled: true },
        { label: this.$t('shipRecord.driverName'), value: 'driverName', type: 'input', disabled: true },
        { label: this.$t('shipRecord.signName'), value: 'signName', type: 'input', disabled: true },
        { label: this.$t('shipRecord.unloadPerature'), value: 'unloadPerature', type: 'input', disabled: true },
        { label: this.$t('shipRecord.shipStatus'), value: 'shipStatusName', type: 'input', disabled: true },
        { label: this.$t('shipRecord.partnerStoreName'), value: 'partnerStoreName', type: 'input', disabled: true },
        { label: this.$t('shipRecord.deliveryAddr'), value: 'deliveryAddr', type: 'input', disabled: true },
        { label: this.$t('shipRecord.goodsNum'), value: 'goodsNum', type: 'input', disabled: true },
        { label: this.$t('shipRecord.remark'), value: 'remark', type: 'input', disabled: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('shipRecord.shipmentNo'), value: 'shipmentId', type: 'slot' },
        { label: this.$t('shipRecord.shipTime'), value: 'shipTime', type: 'date' },
        { label: this.$t('shipRecord.loadAddr'), value: 'loadAddr', type: 'input', readonly: true },
        { label: this.$t('shipRecord.shipTool'), value: 'shipTool', type: 'select', list: 'shipToolList' },
        { label: this.$t('shipRecord.carMark'), value: 'carMark', type: 'input' },
        { label: this.$t('shipRecord.loadPerature'), value: 'loadPerature', type: 'input' },
        { label: this.$t('shipRecord.boxNo'), value: 'boxNo', type: 'input' },
        { label: this.$t('shipRecord.transUser'), value: 'transUser', type: 'input' },
        { label: this.$t('shipRecord.driverName'), value: 'driverName', type: 'input' },
        { label: this.$t('shipRecord.signName'), value: 'signName', type: 'input' },
        { label: this.$t('shipRecord.unloadPerature'), value: 'unloadPerature', type: 'input' },
        { label: this.$t('shipRecord.shipStatus'), value: 'shipStatusName', type: 'input' },
        { label: this.$t('shipRecord.partnerStoreName'), value: 'partnerStoreName', type: 'input', readonly: true },
        { label: this.$t('shipRecord.deliveryAddr'), value: 'deliveryAddr', type: 'input' },
        { label: this.$t('shipRecord.goodsNum'), value: 'goodsNum', type: 'input' },
        { label: this.$t('shipRecord.remark'), value: 'remark', type: 'input' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('shipRecord.shipmentNo'), value: 'shipmentNo', type: 'input' },
        { label: this.$t('shipRecord.shipTime'), value: 'shipTime', type: 'date' },
        { label: this.$t('shipRecord.loadAddr'), value: 'loadAddr', type: 'input', readonly: true },
        { label: this.$t('shipRecord.shipTool'), value: 'shipTool', type: 'select', list: 'shipToolList' },
        { label: this.$t('shipRecord.carMark'), value: 'carMark', type: 'input' },
        { label: this.$t('shipRecord.loadPerature'), value: 'loadPerature', type: 'input' },
        { label: this.$t('shipRecord.boxNo'), value: 'boxNo', type: 'input' },
        { label: this.$t('shipRecord.transUser'), value: 'transUser', type: 'input' },
        { label: this.$t('shipRecord.driverName'), value: 'driverName', type: 'input' },
        { label: this.$t('shipRecord.signName'), value: 'signName', type: 'input' },
        { label: this.$t('shipRecord.unloadPerature'), value: 'unloadPerature', type: 'input' },
        { label: this.$t('shipRecord.shipStatus'), value: 'shipStatus', type: 'input' },
        { label: this.$t('shipRecord.partnerStoreName'), value: 'partnerStoreName', type: 'input' },
        { label: this.$t('shipRecord.deliveryAddr'), value: 'deliveryAddr', type: 'input' },
        { label: this.$t('shipRecord.goodsNum'), value: 'goodsNum', type: 'input' },
        { label: this.$t('shipRecord.remark'), value: 'remark', type: 'input' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        shipTool: [{ required: true, message: this.$t('shipRecord.msg.shipTool'), trigger: 'blur' }],
        goodsNum: [{ required: false, validator: this.$valid.getIntegerValidatorGtZreoAllowNull(), message: this.$t('shipRecord.msg.goodsNum'), trigger: 'blur' }],
        shipTime: [{ required: true, message: this.$t('shipRecord.msg.shipTime'), trigger: 'blur' }],
        shipmentNo: [{ required: true, message: this.$t('shipRecord.msg.shipmentNo'), trigger: 'blur' }],
        updater: [{ required: true, message: this.$t('shipRecord.msg.updater'), trigger: 'blur' }],
        updateTime: [{ required: true, message: this.$t('shipRecord.msg.updateTime'), trigger: 'blur' }],
        companyCode: [{ required: true, message: this.$t('shipRecord.msg.companyCode'), trigger: 'blur' }],
        id: [{ required: true, message: this.$t('shipRecord.msg.id'), trigger: 'blur' }],
        loadAddr: [{ required: true, message: this.$t('shipRecord.msg.loadAddr'), trigger: 'blur' }],
        creator: [{ required: true, message: this.$t('shipRecord.msg.creator'), trigger: 'blur' }],
        createTime: [{ required: true, message: this.$t('shipRecord.msg.createTime'), trigger: 'blur' }],
        shipRecordNo: [{ required: true, message: this.$t('shipRecord.msg.shipRecordNo'), trigger: 'blur' }],
        shipmentId: [{ required: true, message: this.$t('shipRecord.msg.shipmentId'), trigger: 'blur' }],
        shipStatus: [{ required: true, message: this.$t('shipRecord.msg.shipStatus'), trigger: 'blur' }],
        updaterName: [{ required: true, message: this.$t('shipRecord.msg.updaterName'), trigger: 'blur' }],
        whId: [{ required: true, message: this.$t('shipRecord.msg.whId'), trigger: 'blur' }],
        creatorName: [{ required: true, message: this.$t('shipRecord.msg.creatorName'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        shipTool: null,
        shipTime: null,
        partnerStoreId: null,
        shipmentNo: null,
        remark: null,
        updater: null,
        optimistic: null,
        updateTime: null,
        signName: null,
        unloadPerature: null,
        companyCode: null,
        id: null,
        carMark: null,
        loadAddr: null,
        creator: null,
        createTime: null,
        loadPerature: null,
        shipRecordNo: null,
        shipmentId: null,
        transUser: null,
        driverName: null,
        shipStatus: null,
        updaterName: null,
        whId: null,
        deliveryAddr: null,
        partnerStoreName: null,
        goodsNum: null,
        boxNo: null,
        creatorName: null,
        shipTimeBegin: null,
        shipTimeEnd: null,
        createTimeBegin: null,
        createTimeEnd: null
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
