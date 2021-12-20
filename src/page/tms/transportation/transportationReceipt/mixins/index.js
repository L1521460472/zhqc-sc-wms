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
          receiptNo: null,
          orderNo: null,
          cOrderNo: null,
          transportNo: null,
          carrierCode: null,
          carrierName: null,
          deliveryType: null,
          signType: null,
          receiptStatus: null,
          senderCode: null,
          senderName: null,
          receiverCode: null,
          receiverName: null,
          ownerCode: null,
          ownerName: null,
          signTimeBegin: null,
          signTimeEnd: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px' // 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        deliveryTypeList: [],
        receiptStatusList: [],
        signTypeList: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '150' // 默认操作按钮列宽度
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
        dtTableInfo: {
          ref: null,
          data: [],
          deleteIds: [],
          fieldList: [],
          topBtn: {},
          handle: null
        }
      },
      selectId: '',
      midValue: []
    }
  },
  mounted() {
    this.initTopFormColumns()// 初始化查询界面配置数据
    this.rulesInit()// 初始化diaFormInfo表单字段校验规则
  },
  methods: {
    // 展开收起表单
    collapsableFormMore() {
      this.topForm.fieldList = [
        { label: this.$t('transportationReceipt.receiptNo'), value: 'receiptNo', type: 'input' },
        { label: this.$t('transportationReceipt.orderNo'), value: 'orderNo', type: 'input' },
        { label: this.$t('transportationReceipt.cOrderNo'), value: 'cOrderNo', type: 'input' },
        { label: this.$t('transportationReceipt.transportNo'), value: 'transportNo', type: 'input' },
        { label: this.$t('transportationReceipt.carrierCode'), value: 'carrierCode', type: 'slot' },
        { label: this.$t('transportationReceipt.deliveryType'), value: 'deliveryType', type: 'select', list: 'deliveryTypeList' },
        { label: this.$t('transportationReceipt.signType'), value: 'signType', type: 'select', list: 'signTypeList' },
        { label: this.$t('transportationReceipt.receiptStatus'), value: 'receiptStatus', type: 'select', list: 'receiptStatusList' },
        { label: this.$t('transportationReceipt.senderCode'), value: 'senderCode', type: 'slot' },
        { label: this.$t('transportationReceipt.receiverName'), value: 'receiverCode', type: 'slot' },
        { label: this.$t('transportationReceipt.ownerCode'), value: 'ownerCode', type: 'slot' },
        { label: this.$t('transportationReceipt.signTime'), value: 'signTimeBegin', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('transportationReceipt.signTimeEnd'), value: 'signTimeEnd', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' } // 展开收起表单
      ]
    },

    // 展开收起表单
    collapsableForm() {
      this.topForm.fieldList = [
        { label: this.$t('transportationReceipt.receiptNo'), value: 'receiptNo', type: 'input' },
        { label: this.$t('transportationReceipt.orderNo'), value: 'orderNo', type: 'input' },
        { label: this.$t('transportationReceipt.cOrderNo'), value: 'cOrderNo', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },

    // 主页面初始化数据
    initTopFormColumns() {
      this.collapsableForm()
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'receiptNo', label: this.$t('transportationReceipt.receiptNo'), minWidth: 100 },
        { prop: 'receiptStatusName', label: this.$t('transportationReceipt.receiptStatus'), minWidth: 100 },
        { prop: 'receiptTypeName', label: this.$t('transportationReceipt.receiptType'), minWidth: 100 },
        { prop: 'signTypeName', label: this.$t('transportationReceipt.signType'), minWidth: 100 },
        { prop: 'signer', label: this.$t('transportationReceipt.signer'), minWidth: 100 },
        { prop: 'signTime', label: this.$t('transportationReceipt.signTime'), minWidth: 140 },
        { prop: 'planOrderNo', label: this.$t('transportationReceipt.planOrderNo'), minWidth: 100 },
        { prop: 'transportNo', label: this.$t('transportationReceipt.transportNo'), minWidth: 100 },
        { prop: 'orderNo', label: this.$t('transportationReceipt.orderNo'), minWidth: 100 },
        { prop: 'cOrderNo', label: this.$t('transportationReceipt.cOrderNo'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('transportationReceipt.ownerCode'), minWidth: 100 },
        { prop: 'deliverTypeName', label: this.$t('transportationReceipt.deliveryType'), minWidth: 100 },
        { prop: 'unloadTypeName', label: this.$t('transportationReceipt.unloadType'), minWidth: 100 },
        { prop: 'senderName', label: this.$t('transportationReceipt.senderCode'), minWidth: 100 },
        { prop: 'receiverName', label: this.$t('transportationReceipt.receiverName'), minWidth: 100 },
        { prop: 'skuCount', label: this.$t('transportationReceipt.skuCount'), minWidth: 100 },
        { prop: 'numCount', label: this.$t('transportationReceipt.numCount'), minWidth: 100 },
        { prop: 'orderWeight', label: this.$t('transportationReceipt.orderWeight'), minWidth: 100 },
        { prop: 'orderVolume', label: this.$t('transportationReceipt.orderVolume'), minWidth: 100 },
        { prop: 'creator', label: this.$t('transportationReceipt.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('transportationReceipt.createTime'), minWidth: 140 },
        { prop: 'updater', label: this.$t('transportationReceipt.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('transportationReceipt.updateTime'), minWidth: 140 },
        { value: 'status', label: this.$t('table.actions'), minWidth: 140, fixed: 'right', type: 'slot' }
      ]
    },

    // 签收页面的数据配置
    diaFormInfoSignFieldList() {
      this.fullDiaFormInfo.fieldList = [
        { label: this.$t('transportationReceipt.receiptNo'), value: 'receiptNo', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.orderNo'), value: 'orderNo', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.cOrderNo'), value: 'cOrderNo', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.transportNo'), value: 'transportNo', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.planOrderNo'), value: 'planOrderNo', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.ownerCode'), value: 'ownerName', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.deliveryType'), value: 'deliveryTypeName', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.unloadType'), value: 'unloadTypeName', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.senderName'), value: 'senderName', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.receiverName'), value: 'receiverName', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.skuCount'), value: 'skuCount', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.numCount'), value: 'numCount', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.orderWeight'), value: 'orderWeight', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.orderVolume'), value: 'orderVolume', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.receiptType'), value: 'receiptTypeName', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.creator'), value: 'creator', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.skuCount'), value: 'skuCount', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.updater'), value: 'updater', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.updateTime'), value: 'updateTime', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.signType'), value: 'signType', type: 'select', list: 'signTypeList' },
        { label: this.$t('transportationReceipt.signStatus'), value: 'receiptStatus', type: 'select', list: 'receiptStatusList', require },
        { label: this.$t('transportationReceipt.signer'), value: 'signer', type: 'input', require },
        { label: this.$t('transportationReceipt.signTime'), value: 'signTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd HH:mm:ss', require }
      ]
      this.fullDiaFormInfo.dtTableInfo.rules = {
        signNum: [
          { required: true, message: '完美签收数量必须填写' },
          { type: 'number', message: '必须是数量字' },
          { message: '数量', validator: this.validnum },
          { message: '相等', validator: this.validnumEquation }
        ],
        signLossNum: [{ required: true, message: '破损数量必须填写' },
          { type: 'number', message: '必须是数量字' },
          { message: '数量', validator: this.validnum },
          { message: '相等', validator: this.validnumEquation }],
        signMissNum: [{ required: true, message: '短少数量必须填写' },
          { type: 'number', message: '必须是数量字' },
          { message: '数量', validator: this.validnum },
          { message: '相等', validator: this.validnumEquation }],
        signRejectNum: [{ required: true, message: '拒收数量必须填写' },
          { type: 'number', message: '必须是数量字' },
          { message: '数量', validator: this.validnum },
          { message: '相等', validator: this.validnumEquation }]
      }
      this.fullDiaFormInfo.dtTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'rowNo', label: this.$t('transportationReceipt.rowNo'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('transportationReceipt.skuName'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('transportationReceipt.skuCode'), minWidth: 100 },
        { prop: 'spec', label: this.$t('transportationReceipt.spec'), minWidth: 100 },
        { prop: 'unit', label: this.$t('transportationReceipt.unit'), minWidth: 100 },
        { prop: 'num', label: this.$t('transportationReceipt.num'), minWidth: 100 },
        { prop: 'numInt', label: this.$t('transportationReceipt.numInt'), minWidth: 100 },
        { prop: 'numEa', label: this.$t('transportationReceipt.numEa'), minWidth: 100 },
        { prop: 'weight', label: this.$t('transportationReceipt.weight'), minWidth: 100 },
        { prop: 'volume', label: this.$t('transportationReceipt.volumec'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('transportationReceipt.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('transportationReceipt.productionDate'), minWidth: 100 },
        { prop: 'expirationDate', label: this.$t('transportationReceipt.expirationDate'), minWidth: 100 },
        { prop: 'signNum', label: this.$t('transportationReceipt.signNum'), minWidth: 120, edit: { name: 'input' }},
        { prop: 'signLossNum', label: this.$t('transportationReceipt.signLossNum'), minWidth: 100, edit: { name: 'input' }},
        { prop: 'signMissNum', label: this.$t('transportationReceipt.signMissNum'), minWidth: 100, edit: { name: 'input' }},
        { prop: 'signRejectNum', label: this.$t('transportationReceipt.signRejectNum'), minWidth: 100, edit: { name: 'input' }},
        { prop: 'causeRemark', label: this.$t('transportationReceipt.causeRemark'), minWidth: 100, edit: { name: 'input' }}
      ]
    },
    signStaus(value) {
      switch (value) {
        case 1:
          // 完美签收
          this.perfectSign()
          break
        case 2:
          // 破损签收
          this.defaultSign()
          break
        case 3:
          // 短少签收
          this.defaultSign()
          break
        case 4:
          // 据收
          this.rejectSign()
          break
        default:
          this.defaultSign()
      }
    },
    activeCellMethod({ columnIndex }) {
      const value = this.fullDiaFormInfo.data.receiptStatus
      if (value === 1 && [15, 16, 17].includes(columnIndex)) {
        return false
      }
      if (value === 4 && [14, 15, 16].includes(columnIndex)) {
        return false
      }
      return true
    },
    perfectSign() {
      this.fullDiaFormInfo.dtTableInfo.rules = {
        signNum: [
          { required: true, message: '完美签收数量必须填写' },
          { type: 'number', message: '必须是数量字' },
          { message: '数量', validator: this.validnum },
          { message: '相等', validator: this.validnumEquation }
        ],
        signLossNum: [
          { type: 'number', message: '必须是数量字' },
          { message: '数量', validator: this.validnum },
          { message: '相等', validator: this.validnumEquation }],
        signMissNum: [
          { type: 'number', message: '必须是数量字' },
          { message: '数量', validator: this.validnum },
          { message: '相等', validator: this.validnumEquation }],
        signRejectNum: [
          { type: 'number', message: '必须是数量字' },
          { message: '数量', validator: this.validnum },
          { message: '相等', validator: this.validnumEquation }]
      }
      this.midValue = this.$deepClone(this.fullDiaFormInfo.dtTableInfo.data)
      this.fullDiaFormInfo.dtTableInfo.data = []
      this.fullDiaFormInfo.dtTableInfo.data = this.midValue
      this.fullDiaFormInfo.dtTableInfo.data.forEach((item) => {
        item.signNum = item.num
        item.signLossNum = 0
        item.signMissNum = 0
        item.signRejectNum = 0
      })
    },
    rejectSign() {
      this.fullDiaFormInfo.dtTableInfo.rules = {
        signNum: [
          { type: 'number', message: '必须是数量字' },
          { message: '数量', validator: this.validnum },
          { message: '相等', validator: this.validnumEquation }
        ],
        signLossNum: [
          { type: 'number', message: '必须是数量字' },
          { message: '数量', validator: this.validnum },
          { message: '相等', validator: this.validnumEquation }],
        signMissNum: [
          { type: 'number', message: '必须是数量字' },
          { message: '数量', validator: this.validnum },
          { message: '相等', validator: this.validnumEquation }],
        signRejectNum: [{ required: true, message: '拒收数量必须填写' },
          { type: 'number', message: '必须是数量字' },
          { message: '数量', validator: this.validnum },
          { message: '相等', validator: this.validnumEquation }]
      }
      this.midValue = this.$deepClone(this.fullDiaFormInfo.dtTableInfo.data)
      this.fullDiaFormInfo.dtTableInfo.data = []
      this.fullDiaFormInfo.dtTableInfo.data = this.midValue
      this.fullDiaFormInfo.dtTableInfo.data.forEach((item) => {
        item.signNum = 0
        item.signLossNum = 0
        item.signMissNum = 0
        item.signRejectNum = item.num
      })
    },
    // 默认签收
    defaultSign() {
      this.fullDiaFormInfo.dtTableInfo.rules = {
        signNum: [
          { required: true, message: '完美签收数量必须填写' },
          { type: 'number', message: '必须是数量字' },
          { message: '数量', validator: this.validnum },
          { message: '相等', validator: this.validnumEquation }
        ],
        signLossNum: [{ required: true, message: '破损数量必须填写' },
          { type: 'number', message: '必须是数量字' },
          { message: '数量', validator: this.validnum },
          { message: '相等', validator: this.validnumEquation }],
        signMissNum: [{ required: true, message: '短少数量必须填写' },
          { type: 'number', message: '必须是数量字' },
          { message: '数量', validator: this.validnum },
          { message: '相等', validator: this.validnumEquation }],
        signRejectNum: [{ required: true, message: '拒收数量必须填写' },
          { type: 'number', message: '必须是数量字' },
          { message: '数量', validator: this.validnum },
          { message: '相等', validator: this.validnumEquation }]
      }
      this.midValue = this.$deepClone(this.fullDiaFormInfo.dtTableInfo.data)
      this.fullDiaFormInfo.dtTableInfo.data = []
      this.fullDiaFormInfo.dtTableInfo.data = this.midValue
    },
    validnum({ cellValue, row }) {
      if (cellValue < 0 || cellValue > row.num) {
        return Promise.reject(new Error(`输入的数值要大于0小于${row.num}`))
      }
    },
    validnumEquation({ row }) {
      const isError = row.num !== row.signNum * 1 + row.signLossNum * 1 + row.signMissNum * 1 + row.signRejectNum * 1
      if (isError) {
        return Promise.reject(new Error(`完美签收数量，破损数量，短少数量，拒收数量之和应等于数量`))
      }
    },

    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.fullDiaFormInfo.rules = {
        receiptStatus: [{ required: true, message: this.$t('transportationReceipt.msg.signStatus'), trigger: 'blur' }],
        signer: [{ required: true, message: this.$t('transportationReceipt.msg.signer'), trigger: 'blur' }],
        signTime: [{ required: true, message: this.$t('transportationReceipt.msg.signTime'), trigger: 'blur' }]
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
