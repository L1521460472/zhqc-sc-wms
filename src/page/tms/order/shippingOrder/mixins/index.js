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

        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px' // 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        sourceSystemList: [],
        sourceSystemKeyList: [],
        deliveryTypeList: [],
        orderPsTypeList: [],
        orderSendTypeList: [],
        statusList: [],
        lineTypeList: [],
        businessTypeList: [],
        unloadTypeList: [],
        transportTypeList: [],
        provinceList: [],
        sendProvinceList: [],
        sendCityList: [],
        sendAreaList: [],
        receiveProvinceList: [],
        receiveCityList: [],
        receiveAreaList: [],
        lineCodeList: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '280', // 默认操作按钮列宽度
          btList: [// 添加操作按钮
            { slot: true, icon: '', event: 'slotEvent' }
            // 默认查看按钮

          ]
        }
      },
      // 全屏弹窗
      fullDialogInfo: {
        title: '',
        visible: false,
        width: '1200px',
        type: '',
        varSup: false,
        varCus: false,
        varStore: false,
        varProvince: true,
        varCity: true,
        varArea: true,
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
        dtTableInfo: {
          ref: null,
          data: [],
          deleteIds: [],
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
      // tabs
      tabs: {
        activeName: '1',
        bgDradient: ['#00d4d8', '#009396'],
        fontSize: '14',
        tabsList: [
          {
            label: '订单明细',
            value: '1'
          },
          {
            label: '操作记录',
            value: '2'
          }
        ]
      },
      // tabs 1
      tableInfo1: {
        fieldList: null, // 表格列集合
        handle: null,
        data: []
      },
      // tabs 2
      tableInfo2: {
        fieldList: null, // 表格列集合
        handle: null,
        data: []
      },
      // 模态框
      dialogInfo: {
        title: '',
        visible: false,
        width: '220mm',
        type: '',
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'bottomClose', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'bottomSave', btLoading: false, show: true }
        ]
      },
      // 模态框 列表信息
      popTableInfo: {
        fieldList: null, // 表格列集合
        handle: null,
        data: []
      },
      // 模态框表单
      diaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}// 配置的表单字段校验规则集合
      },
      // 审核，反审 模态框
      examineDialog: {
        title: '',
        visible: false,
        type: '',
        width: '120mm',
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'examineClose', show: true },
          { label: '确认', type: 'primary', icon: '', event: 'examineSave', btLoading: false, show: true }
        ]
      },
      // 审核，反审 模态框表单
      examineDiaForm: {
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
    // 展开收起表单
    collapsableFormMore() {
      this.topForm.fieldList = [
        { label: this.$t('shippingOrder.orderNo'), value: 'orderNo', type: 'input' },
        { label: this.$t('shippingOrder.sourceSystem'), value: 'sourceSystem', type: 'select', list: 'sourceSystemKeyList' },
        { label: this.$t('shippingOrder.cOrderNo'), value: 'cOrderNo', type: 'input' },
        { label: this.$t('shippingOrder.status'), value: 'status', type: 'select', list: 'statusList' },
        { label: this.$t('shippingOrder.orderSendType'), value: 'orderSendType', type: 'select', list: 'orderSendTypeList' },
        { label: this.$t('shippingOrder.ownerName'), value: 'ownerName', type: 'slot' },
        { label: this.$t('shippingOrder.deliveryType'), value: 'deliveryType', type: 'select', list: 'deliveryTypeList' },
        { label: this.$t('shippingOrder.orderPsType'), value: 'orderPsType', type: 'select', list: 'orderPsTypeList' },
        { label: this.$t('shippingOrder.senderName'), value: 'senderName', type: 'slot' },
        { label: this.$t('shippingOrder.receiverName'), value: 'receiverName', type: 'slot' },
        { label: this.$t('shippingOrder.lineCode'), value: 'lineCode', type: 'input' },
        { label: this.$t('shippingOrder.lineType'), value: 'lineType', type: 'select', list: 'lineTypeList' },
        { label: this.$t('shippingOrder.carrierName'), value: 'carrierName', type: 'slot' },
        { label: this.$t('shippingOrder.createTimeBegin'), value: 'createTimeBegin', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('shippingOrder.createTimeEnd'), value: 'createTimeEnd', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' } // 展开收起表单
      ]
    },
    // 展开收起表单
    collapsableForm() {
      this.topForm.fieldList = [
        { label: this.$t('shippingOrder.orderNo'), value: 'orderNo', type: 'input' },
        { label: this.$t('shippingOrder.sourceSystem'), value: 'sourceSystem', type: 'select', list: 'sourceSystemKeyList' },
        { label: this.$t('shippingOrder.cOrderNo'), value: 'cOrderNo', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化top表单
      this.collapsableForm()
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'selection', width: 50, fixed: 'left' }, // 选项框
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'orderNo', label: this.$t('shippingOrder.orderNo'), minWidth: 130 },
        { prop: 'sourceSystem', label: this.$t('shippingOrder.sourceSystem'), minWidth: 130 },
        { prop: 'createTime', label: this.$t('shippingOrder.createTimeBegin'), minWidth: 150 },
        { prop: 'statusName', label: this.$t('shippingOrder.statusName'), minWidth: 100 },
        { prop: 'cOrderNo', label: this.$t('shippingOrder.cOrderNo'), minWidth: 100 },
        { prop: 'businessTypeName', label: this.$t('shippingOrder.businessTypeName'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('shippingOrder.ownerName'), minWidth: 100 },
        { prop: 'deliveryTypeName', label: this.$t('shippingOrder.deliveryTypeName'), minWidth: 100 },
        { prop: 'unloadTypeName', label: this.$t('shippingOrder.unloadTypeName'), minWidth: 100 },
        { prop: 'senderName', label: this.$t('shippingOrder.senderName'), minWidth: 100 },
        { prop: 'sendProvinceName', label: this.$t('shippingOrder.sendProvinceName'), minWidth: 100 },
        { prop: 'sendCityName', label: this.$t('shippingOrder.sendCityName'), minWidth: 140 },
        { prop: 'sendAreaName', label: this.$t('shippingOrder.sendAreaName'), minWidth: 100 },
        { prop: 'sendLocation', label: this.$t('shippingOrder.sendLocation'), minWidth: 140 },
        { prop: 'sendContactor', label: this.$t('shippingOrder.sendContactor'), minWidth: 140 },
        { prop: 'senderPhone', label: this.$t('shippingOrder.senderPhone'), minWidth: 140 },
        { prop: 'palnSendDate', label: this.$t('shippingOrder.palnSendDate'), minWidth: 140 },
        { prop: 'palnDeliverDate', label: this.$t('shippingOrder.palnDeliverDate'), minWidth: 140 },
        { prop: 'remark', label: this.$t('shippingOrder.orderRemark'), minWidth: 140 },
        { prop: 'orderSendTypeName', label: this.$t('shippingOrder.orderPsType'), minWidth: 140 },
        { prop: 'orderPsTypeName', label: this.$t('shippingOrder.orderPsType'), minWidth: 140 },
        { prop: 'carrierName', label: this.$t('shippingOrder.carrierName'), minWidth: 140 },
        { prop: 'transportTypeName', label: this.$t('shippingOrder.transportType'), minWidth: 140 },
        { prop: 'lineTypeName', label: this.$t('shippingOrder.lineType'), minWidth: 140 },
        { prop: 'lineCode', label: this.$t('shippingOrder.lineCode'), minWidth: 140 },
        { prop: 'lineRemark', label: this.$t('shippingOrder.lineRemark'), minWidth: 140 },
        { prop: 'skuCount', label: this.$t('shippingOrder.skuCount'), minWidth: 140 },
        { prop: 'numCount', label: this.$t('shippingOrder.numCount'), minWidth: 140 },
        { prop: 'orderWeight', label: this.$t('shippingOrder.orderWeightt'), minWidth: 140 },
        { prop: 'orderVolume', label: this.$t('shippingOrder.orderVolumem'), minWidth: 140 },
        { prop: 'creator', label: this.$t('shippingOrder.creator'), minWidth: 140 },
        { prop: 'createTime', label: this.$t('shippingOrder.createTimeT'), minWidth: 140 },
        { prop: 'updater', label: this.$t('shippingOrder.updater'), minWidth: 140 },
        { prop: 'updateTime', label: this.$t('shippingOrder.updateTime'), minWidth: 140 }

      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.fullDiaFormInfo.data = {
        sendProvinceId: null,
        sendCityId: null,
        sendAreaId: null,
        receiveProvinceId: null,
        receiveCityId: null,
        receiveAreaId: null,
        cOrderNo: null,
        ownerName: null,
        businessType: null,
        deliveryType: null,
        senderName: null,
        senderCode: null,
        sendLocation: null,
        sendContactor: null,
        senderPhone: null,
        receiverName: null,
        receiveLocation: null,
        receiveContactor: null,
        receiverPhone: null,
        palnSendDate: null,
        palnDeliverDate: null,
        orderPsType: null,
        orderSendType: null,
        carrierName: null,
        transportType: null,
        lineType: null,
        lineCode: null,
        lineRemark: null,
        unloadType: null,
        ext1: null,
        ext2: null,
        ext3: null,
        ext4: null,
        ext5: null
      }

      this.fullDiaFormInfo.fieldList = [
        { label: this.$t('shippingOrder.cOrderNo'), value: 'cOrderNo', type: 'input' },
        { label: this.$t('shippingOrder.ownerName'), value: 'ownerName', type: 'slot' },
        { label: this.$t('shippingOrder.businessType'), value: 'businessType', link: 'businessTypeName', type: 'selectLink', list: 'businessTypeList', event: 'businessTypeChange' },
        { label: this.$t('shippingOrder.deliveryType'), value: 'deliveryType', type: 'select', list: 'deliveryTypeList' },
        { label: this.$t('shippingOrder.senderName'), value: 'senderName', type: 'slot' },
        { label: this.$t('shippingOrder.sendProvinceId'), value: 'sendProvinceId', linkId: '', link: 'sendProvinceName', type: 'slot', list: 'provinceList' },
        { label: this.$t('shippingOrder.sendCityId'), value: 'sendCityId', linkId: 'sendProvinceId', link: 'sendCityName', type: 'slot', list: 'sendCityList' },
        { label: this.$t('shippingOrder.sendAreaId'), value: 'sendAreaId', linkId: 'sendCityId', link: 'sendAreaName', type: 'slot', list: 'sendAreaList' },
        { label: this.$t('shippingOrder.sendLocation'), value: 'sendLocation', type: 'input' },
        { label: this.$t('shippingOrder.sendContactor'), value: 'sendContactor', type: 'input' },
        { label: this.$t('shippingOrder.senderPhone'), value: 'senderPhone', type: 'input' },
        { label: this.$t('shippingOrder.receiverName'), value: 'receiverName', type: 'slot' },
        { label: this.$t('shippingOrder.receiveProvinceId'), value: 'receiveProvinceId', linkId: '', link: 'receiveProvinceName', type: 'slot' },
        { label: this.$t('shippingOrder.receiveCityId'), value: 'receiveCityId', linkId: 'receiveProvinceId', link: 'receiveCityName', type: 'slot' },
        { label: this.$t('shippingOrder.receiveAreaId'), value: 'receiveAreaId', linkId: 'receiveCityId', link: 'receiveAreaName', type: 'slot' },
        { label: this.$t('shippingOrder.receiveLocation'), value: 'receiveLocation', type: 'input' },
        { label: this.$t('shippingOrder.receiveContactor'), value: 'receiveContactor', type: 'input' },
        { label: this.$t('shippingOrder.receiverPhone'), value: 'receiverPhone', type: 'input' },
        { label: this.$t('shippingOrder.palnSendDate'), value: 'palnSendDate', type: 'date', dateType: 'date' },
        { label: this.$t('shippingOrder.palnDeliverDate'), value: 'palnDeliverDate', type: 'date', dateType: 'date' },
        { label: this.$t('shippingOrder.orderSendType'), value: 'orderSendType', type: 'select', list: 'orderSendTypeList' },
        { label: this.$t('shippingOrder.orderPsType'), value: 'orderPsType', type: 'select', list: 'orderPsTypeList' },
        { label: this.$t('shippingOrder.carrierName'), value: 'carrierName', type: 'slot' },
        { label: this.$t('shippingOrder.transportType'), value: 'transportType', type: 'select', list: 'transportTypeList' },
        { label: this.$t('shippingOrder.lineType'), value: 'lineType', type: 'select', list: 'lineTypeList' },
        { label: this.$t('shippingOrder.lineCode'), value: 'lineCode', type: 'slot' },
        { label: this.$t('shippingOrder.lineRemark'), value: 'lineRemark', type: 'input' },
        { label: this.$t('shippingOrder.unloadType'), value: 'unloadType', type: 'select', list: 'unloadTypeList' },
        { label: this.$t('shippingOrder.remark'), value: 'remark', type: 'input' },
        { label: this.$t('shippingOrder.ext1'), value: 'ext1', type: 'input' },
        { label: this.$t('shippingOrder.ext2'), value: 'ext2', type: 'input' },
        { label: this.$t('shippingOrder.ext3'), value: 'ext3', type: 'input' },
        { label: this.$t('shippingOrder.ext4'), value: 'ext4', type: 'input' },
        { label: this.$t('shippingOrder.ext5'), value: 'ext5', type: 'input' }
      ]

      this.fullDiaFormInfo.rules = {
        ownerName: [{ required: true, message: this.$t('shippingOrder.msg.ownerName'), trigger: 'change' }],
        businessType: [{ required: true, message: this.$t('shippingOrder.msg.businessType'), trigger: 'change' }],
        deliveryType: [{ required: true, message: this.$t('shippingOrder.msg.deliveryType'), trigger: 'change' }],
        orderSendType: [{ required: true, message: this.$t('shippingOrder.msg.orderSendType'), trigger: 'change' }],
        senderName: [{ required: true, message: this.$t('shippingOrder.msg.senderName'), trigger: ['blur', 'change'] }],
        senderCode: [{ required: true, message: this.$t('shippingOrder.msg.senderCode'), trigger: 'blur' }],
        sendProvinceId: [{ required: true, message: this.$t('shippingOrder.msg.sendProvinceId'), trigger: ['blur', 'change'] }],
        sendCityId: [{ required: true, message: this.$t('shippingOrder.msg.sendCityId'), trigger: ['blur', 'change'] }],
        sendAreaId: [{ required: true, message: this.$t('shippingOrder.msg.sendAreaId'), trigger: ['blur', 'change'] }],
        sendLocation: [{ required: true, message: this.$t('shippingOrder.msg.sendLocation'), trigger: ['blur', 'change'] }],
        sendContactor: [{ required: true, message: this.$t('shippingOrder.msg.sendContactor'), trigger: ['blur', 'change'] }],
        senderPhone: [{ required: true, message: this.$t('shippingOrder.msg.senderPhone'), trigger: ['blur', 'change'] }],
        receiverName: [{ required: true, message: this.$t('shippingOrder.msg.receiverName'), trigger: ['blur', 'change'] }],
        receiverCode: [{ required: true, message: this.$t('shippingOrder.msg.receiverCode'), trigger: 'blur' }],
        receiveProvinceId: [{ required: true, message: this.$t('shippingOrder.msg.receiveProvinceId'), trigger: 'change' }],
        receiveCityId: [{ required: true, message: this.$t('shippingOrder.msg.receiveCityId'), trigger: 'change' }],
        receiveAreaId: [{ required: true, message: this.$t('shippingOrder.msg.receiveAreaId'), trigger: 'change' }],
        receiveLocation: [{ required: true, message: this.$t('shippingOrder.msg.receiveLocation'), trigger: 'blur' }],
        receiveContactor: [{ required: true, message: this.$t('shippingOrder.msg.receiveContactor'), trigger: 'blur' }],
        receiverPhone: [{ required: true, message: this.$t('shippingOrder.msg.receiverPhone'), trigger: 'blur' }],
        palnSendDate: [{ required: true, message: this.$t('shippingOrder.msg.palnSendDate'), trigger: 'change' }],
        palnDeliverDate: [{ required: true, message: this.$t('shippingOrder.msg.palnDeliverDate'), trigger: 'change' }],
        orderPsType: [{ required: true, message: this.$t('shippingOrder.msg.orderPsType'), trigger: 'change' }]
        // transportType: [{ required: true, message: this.$t('shippingOrder.msg.transportType'), trigger: 'change' }],
        // lineType: [{ required: true, message: this.$t('shippingOrder.msg.lineType'), trigger: 'change' }],
        // lineCode: [{ required: true, message: this.$t('shippingOrder.msg.lineCode'), trigger: ['change', 'blur'] }],
        // unloadType: [{ required: true, message: this.$t('shippingOrder.msg.unloadType'), trigger: 'blur' }],
        // carrierName: [{ required: true, message: this.$t('shippingOrder.msg.carrierName'), trigger: ['change', 'blur'] }]
      }

      this.popTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'rowNo', label: this.$t('shippingOrder.rowNo'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('shippingOrder.skuName'), minWidth: 130 },
        { prop: 'skuCode', label: this.$t('shippingOrder.skuCode'), minWidth: 130 },
        { prop: 'spec', label: this.$t('shippingOrder.spec'), minWidth: 130 },
        { prop: 'unit', label: this.$t('shippingOrder.unit'), minWidth: 130 },
        { prop: 'num', label: this.$t('shippingOrder.num'), minWidth: 130 },
        { prop: 'numInt', label: this.$t('shippingOrder.numInt'), minWidth: 130 },
        { prop: 'numEa', label: this.$t('shippingOrder.numEa'), minWidth: 130 },
        { prop: 'weight', label: this.$t('shippingOrder.weight'), minWidth: 130 },
        { prop: 'volume', label: this.$t('shippingOrder.volume'), minWidth: 130 },
        { prop: 'productionBatch', label: this.$t('shippingOrder.productionBatch'), minWidth: 130 },
        { prop: 'productionDate', label: this.$t('shippingOrder.productionDate'), minWidth: 130 },
        { prop: 'expirationDate', label: this.$t('shippingOrder.expirationDate'), minWidth: 130 }
      ]

      this.popTableInfo.handle = { // 表格自定义按钮
        fixed: 'right',
        label: this.$t('table.actions'), // 操作列名
        width: '100', // 默认操作按钮列宽度
        btList: [// 添加操作按钮
          { label: '移除', type: 'danger', icon: '', event: 'remove', show: true, disabled: false } // event值为notification.js中定义的方法名
        ]
      }
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.fullDiaFormInfo.data = {
        sendProvinceId: null,
        sendCityId: null,
        sendAreaId: null,
        receiveProvinceId: null,
        receiveCityId: null,
        receiveAreaId: null,
        cOrderNo: null,
        ownerName: null,
        businessType: null,
        deliveryType: null,
        senderName: null,
        senderCode: null,
        sendLocation: null,
        sendContactor: null,
        senderPhone: null,
        receiverName: null,
        receiveLocation: null,
        receiveContactor: null,
        receiverPhone: null,
        palnSendDate: null,
        palnDeliverDate: null,
        orderPsType: null,
        orderSendType: null,
        carrierName: null,
        transportType: null,
        lineType: null,
        lineCode: null,
        lineRemark: null,
        unloadType: null,
        ext1: null,
        ext2: null,
        ext3: null,
        ext4: null,
        ext5: null
      }
      this.fullDiaFormInfo.fieldList = [
        { label: this.$t('shippingOrder.orderNo'), value: 'orderNo', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.sourceSystem'), value: 'sourceSystem', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.status'), value: 'status', type: 'select', list: 'statusList', disabled: true },
        { label: this.$t('shippingOrder.cOrderNo'), value: 'cOrderNo', type: 'input' },
        { label: this.$t('shippingOrder.ownerName'), value: 'ownerName', type: 'slot' },
        { label: this.$t('shippingOrder.businessType'), value: 'businessType', link: 'businessTypeName', type: 'selectLink', list: 'businessTypeList', event: 'businessTypeChange' },
        { label: this.$t('shippingOrder.deliveryType'), value: 'deliveryType', type: 'select', list: 'deliveryTypeList' },
        { label: this.$t('shippingOrder.senderName'), value: 'senderName', type: 'slot' },
        { label: this.$t('shippingOrder.sendProvinceId'), value: 'sendProvinceId', linkId: '', link: 'sendProvinceName', type: 'slot', list: 'provinceList' },
        { label: this.$t('shippingOrder.sendCityId'), value: 'sendCityId', linkId: 'sendProvinceId', link: 'sendCityName', type: 'slot', list: 'sendCityList' },
        { label: this.$t('shippingOrder.sendAreaId'), value: 'sendAreaId', linkId: 'sendCityId', link: 'sendAreaName', type: 'slot', list: 'sendAreaList' },
        { label: this.$t('shippingOrder.sendLocation'), value: 'sendLocation', type: 'input' },
        { label: this.$t('shippingOrder.sendContactor'), value: 'sendContactor', type: 'input' },
        { label: this.$t('shippingOrder.senderPhone'), value: 'senderPhone', type: 'input' },
        { label: this.$t('shippingOrder.receiverName'), value: 'receiverName', type: 'slot' },
        { label: this.$t('shippingOrder.receiveProvinceId'), value: 'receiveProvinceId', linkId: '', link: 'receiveProvinceName', type: 'slot' },
        { label: this.$t('shippingOrder.receiveCityId'), value: 'receiveCityId', linkId: 'receiveProvinceId', link: 'receiveCityName', type: 'slot' },
        { label: this.$t('shippingOrder.receiveAreaId'), value: 'receiveAreaId', linkId: 'receiveCityId', link: 'receiveAreaName', type: 'slot' },
        { label: this.$t('shippingOrder.receiveLocation'), value: 'receiveLocation', type: 'input' },
        { label: this.$t('shippingOrder.receiveContactor'), value: 'receiveContactor', type: 'input' },
        { label: this.$t('shippingOrder.receiverPhone'), value: 'receiverPhone', type: 'input' },
        { label: this.$t('shippingOrder.palnSendDate'), value: 'palnSendDate', type: 'date', dateType: 'date' },
        { label: this.$t('shippingOrder.palnDeliverDate'), value: 'palnDeliverDate', type: 'date', dateType: 'date' },
        { label: this.$t('shippingOrder.orderSendType'), value: 'orderSendType', type: 'select', list: 'orderSendTypeList' },
        { label: this.$t('shippingOrder.orderPsType'), value: 'orderPsType', type: 'select', list: 'orderPsTypeList' },
        { label: this.$t('shippingOrder.carrierName'), value: 'carrierName', type: 'slot' },
        { label: this.$t('shippingOrder.transportType'), value: 'transportType', type: 'select', list: 'transportTypeList' },
        { label: this.$t('shippingOrder.lineType'), value: 'lineType', type: 'select', list: 'lineTypeList' },
        { label: this.$t('shippingOrder.lineCode'), value: 'lineCode', type: 'slot' },
        { label: this.$t('shippingOrder.lineRemark'), value: 'lineRemark', type: 'input' },
        { label: this.$t('shippingOrder.unloadType'), value: 'unloadType', type: 'select', list: 'unloadTypeList' },
        { label: this.$t('shippingOrder.skuCount'), value: 'skuCount', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.numCount'), value: 'numCount', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.orderWeightt'), value: 'orderWeight', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.orderVolumem'), value: 'orderVolume', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.orderMoney'), value: 'orderMoney', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.remark'), value: 'remark', type: 'input', disabled: false },
        { label: this.$t('shippingOrder.ext1'), value: 'ext1', type: 'input' },
        { label: this.$t('shippingOrder.ext2'), value: 'ext2', type: 'input' },
        { label: this.$t('shippingOrder.ext3'), value: 'ext3', type: 'input' },
        { label: this.$t('shippingOrder.ext4'), value: 'ext4', type: 'input' },
        { label: this.$t('shippingOrder.ext5'), value: 'ext5', type: 'input' }
      ]
      this.fullDiaFormInfo.rules = {
        ownerName: [{ required: true, message: this.$t('shippingOrder.msg.ownerName'), trigger: 'change' }],
        businessType: [{ required: true, message: this.$t('shippingOrder.msg.businessType'), trigger: 'change' }],
        deliveryType: [{ required: true, message: this.$t('shippingOrder.msg.deliveryType'), trigger: 'change' }],
        orderSendType: [{ required: true, message: this.$t('shippingOrder.msg.orderSendType'), trigger: 'change' }],
        senderName: [{ required: true, message: this.$t('shippingOrder.msg.senderName'), trigger: ['blur', 'change'] }],
        senderCode: [{ required: true, message: this.$t('shippingOrder.msg.senderCode'), trigger: 'blur' }],
        sendProvinceId: [{ required: true, message: this.$t('shippingOrder.msg.sendProvinceId'), trigger: ['blur', 'change'] }],
        sendCityId: [{ required: true, message: this.$t('shippingOrder.msg.sendCityId'), trigger: ['blur', 'change'] }],
        sendAreaId: [{ required: true, message: this.$t('shippingOrder.msg.sendAreaId'), trigger: ['blur', 'change'] }],
        sendLocation: [{ required: true, message: this.$t('shippingOrder.msg.sendLocation'), trigger: ['blur', 'change'] }],
        sendContactor: [{ required: true, message: this.$t('shippingOrder.msg.sendContactor'), trigger: ['blur', 'change'] }],
        senderPhone: [{ required: true, message: this.$t('shippingOrder.msg.senderPhone'), trigger: ['blur', 'change'] }],
        receiverName: [{ required: true, message: this.$t('shippingOrder.msg.receiverName'), trigger: ['blur', 'change'] }],
        receiverCode: [{ required: true, message: this.$t('shippingOrder.msg.receiverCode'), trigger: 'blur' }],
        receiveProvinceId: [{ required: true, message: this.$t('shippingOrder.msg.receiveProvinceId'), trigger: 'change' }],
        receiveCityId: [{ required: true, message: this.$t('shippingOrder.msg.receiveCityId'), trigger: 'change' }],
        receiveAreaId: [{ required: true, message: this.$t('shippingOrder.msg.receiveAreaId'), trigger: 'change' }],
        receiveLocation: [{ required: true, message: this.$t('shippingOrder.msg.receiveLocation'), trigger: 'blur' }],
        receiveContactor: [{ required: true, message: this.$t('shippingOrder.msg.receiveContactor'), trigger: 'blur' }],
        receiverPhone: [{ required: true, message: this.$t('shippingOrder.msg.receiverPhone'), trigger: 'blur' }],
        palnSendDate: [{ required: true, message: this.$t('shippingOrder.msg.palnSendDate'), trigger: 'change' }],
        palnDeliverDate: [{ required: true, message: this.$t('shippingOrder.msg.palnDeliverDate'), trigger: 'change' }],
        orderPsType: [{ required: true, message: this.$t('shippingOrder.msg.orderPsType'), trigger: 'change' }]
        // transportType: [{ required: true, message: this.$t('shippingOrder.msg.transportType'), trigger: 'change' }],
        // lineType: [{ required: true, message: this.$t('shippingOrder.msg.lineType'), trigger: 'change' }],
        // lineCode: [{ required: true, message: this.$t('shippingOrder.msg.lineCode'), trigger: ['change', 'blur'] }],
        // unloadType: [{ required: true, message: this.$t('shippingOrder.msg.unloadType'), trigger: 'blur' }],
        // carrierName: [{ required: true, message: this.$t('shippingOrder.msg.carrierName'), trigger: ['change', 'blur'] }]
      }

      this.popTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'rowNo', label: this.$t('shippingOrder.rowNo'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('shippingOrder.skuName'), minWidth: 130 },
        { prop: 'skuCode', label: this.$t('shippingOrder.skuCode'), minWidth: 130 },
        { prop: 'spec', label: this.$t('shippingOrder.spec'), minWidth: 130 },
        { prop: 'unit', label: this.$t('shippingOrder.unit'), minWidth: 130 },
        { prop: 'num', label: this.$t('shippingOrder.num'), minWidth: 130 },
        { prop: 'numInt', label: this.$t('shippingOrder.numInt'), minWidth: 130 },
        { prop: 'numEa', label: this.$t('shippingOrder.numEa'), minWidth: 130 },
        { prop: 'weight', label: this.$t('shippingOrder.weight'), minWidth: 130 },
        { prop: 'volume', label: this.$t('shippingOrder.volume'), minWidth: 130 },
        { prop: 'productionBatch', label: this.$t('shippingOrder.productionBatch'), minWidth: 130 },
        { prop: 'productionDate', label: this.$t('shippingOrder.productionDate'), minWidth: 130 },
        { prop: 'expirationDate', label: this.$t('shippingOrder.expirationDate'), minWidth: 130 }
      ]
      this.popTableInfo.handle = { // 表格自定义按钮
        fixed: 'right',
        label: this.$t('table.actions'), // 操作列名
        width: '100', // 默认操作按钮列宽度
        btList: [// 添加操作按钮
          { label: '移除', type: 'danger', icon: '', event: 'remove', show: true, disabled: false } // event值为notification.js中定义的方法名
        ]
      }
    },
    initAddItem() {
      this.compObj = null

      this.diaFormInfo.data = {
        skuName: null,
        skuCode: null,
        spec: null,
        unit: null,
        productionBatch: null,
        productionDate: null,
        expirationDate: null,
        num: 0,
        numInt: 0,
        numEa: 0,
        volume: 0,
        weight: 0
      }
      this.diaFormInfo.fieldList = [
        { label: this.$t('shippingOrder.skuName'), value: 'skuName', type: 'slot' },
        { label: this.$t('shippingOrder.skuCode'), value: 'skuCode', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.spec'), value: 'spec', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.unit'), value: 'unit', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.productionBatch'), value: 'productionBatch', type: 'input' },
        { label: this.$t('shippingOrder.productionDate'), value: 'productionDate', type: 'date' },
        { label: this.$t('shippingOrder.expirationDate'), value: 'expirationDate', type: 'date' },
        { label: this.$t('shippingOrder.num'), value: 'num', type: 'number', min: 0, precision: 2, event: 'NumberChange' },
        { label: this.$t('shippingOrder.numInt'), value: 'numInt', type: 'number', min: 0, precision: 3, disabled: true },
        { label: this.$t('shippingOrder.numEa'), value: 'numEa', type: 'number', min: 0, precision: 3, disabled: true },
        { label: this.$t('shippingOrder.volume'), value: 'volume', type: 'number', min: 0, precision: 3, disabled: true },
        { label: this.$t('shippingOrder.weight'), value: 'weight', type: 'number', min: 0, precision: 3, disabled: true }
      ]

      this.diaFormInfo.rules = {
        skuName: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        num: [{ required: true, message: '请输入商品数量', trigger: 'change' }]
        // numInt: [{ required: true, message: '请输入整箱数', trigger: 'blur' }],
        // numEa: [{ required: true, message: '请输入尾数', trigger: 'blur' }]
      }
    },
    examineFormInfo() {
      this.examineDiaForm.data = { value: null }
      this.examineDiaForm.fieldList = [
        { label: '审核意见', value: 'value', type: 'input' }
      ]
      this.examineDiaForm.rules = {}
    },
    trialFormInfo() {
      this.examineDiaForm.data = { value: null }
      this.examineDiaForm.fieldList = [
        { label: '反审原因', value: 'value', type: 'input' }
      ]
      this.examineDiaForm.rules = {
        value: [{ required: true, message: '请输入反审原因', trigger: 'blur' }]
      }
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.fullDiaFormInfo.rules = {
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.fullDiaFormInfo.data = {
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
