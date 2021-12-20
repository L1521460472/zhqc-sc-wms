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
          asnNo: null,
          ownerId: null,
          origNo: null,
          asnSource: null,
          scAsnType: null,
          scBusinessType: null,
          asnStatus: null,
          skuId: null,
          instoreDateStart: null,
          instoreDateEnd: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        asnStatusList: [],
        scAsnTypeList: [],
        scBusinessTypeList: [],
        asnSourceList: [],
        recModeTypeList: [],
        recInfoTypeList: [],
        skuQualityList: []
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
            {
              label: this.$t('table.view'),
              type: 'primary',
              icon: '',
              event: 'openViewPage',
              show: true,
              disabled: this.$hasPerm('view')
            }, // event值为notification.js中定义的方法名
            // 默认修改按钮
            {
              label: this.$t('table.edit'),
              type: 'success',
              icon: '',
              event: 'openEditPage',
              show: true,
              disabled: this.$hasPerm('edit')
            }, // event值为notification.js中定义的方法名
            {
              label: '更多', type: 'warning', icon: 'el-icon-more', event: '', btShow: true,
              moreList: [
                {
                  label: '完成收货',
                  type: 'success',
                  icon: '',
                  show: true,
                  event: 'completeAsn',
                  disabled: this.$hasPerm('completeAsn')
                },
                {
                  label: '取消',
                  type: 'danger',
                  icon: '',
                  show: true,
                  event: 'cancel',
                  disabled: this.$hasPerm('cancel')
                }
              ]
            }
          ]
        }
      },
      // 弹窗表单
      diaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        dtTableInfo: {
          ref: null,
          data: [],
          fieldList: [],
          topBtn: {},
          handle: { // 表格自定义按钮
            fixed: 'right',
            label: this.$t('table.actions'), // 操作列名
            width: '100', // 默认操作按钮列宽度
            btList: [// 添加操作按钮
              // 默认删除按钮
              { label: this.$t('table.delete'), type: 'danger', icon: '', event: 'deleteDt', show: true }// event值为notification.js中定义的方法名
            ]
          }
        }
      },
      // 明细表单
      diaFormInfoDt: {
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
        { label: this.$t('rec.asnNo'), value: 'asnNo', type: 'input' },
        { label: this.$t('rec.asnSource'), value: 'asnSource', type: 'select', list: 'asnSourceList' },
        { label: this.$t('rec.asnType'), value: 'scAsnType', type: 'select', list: 'scAsnTypeList' },
        { label: this.$t('rec.scBusinessType'), value: 'scBusinessType', type: 'select', list: 'scBusinessTypeList' },
        { label: this.$t('rec.asnStatus'), value: 'asnStatus', type: 'select', list: 'asnStatusList' },
        { label: this.$t('rec.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('rec.skuId'), value: 'skuId', type: 'slot' },
        { label: this.$t('rec.origNo'), value: 'origNo', type: 'input' },
        { label: this.$t('rec.recMode'), value: 'recMode', type: 'select', list: 'recModeTypeList' },
        { label: this.$t('rec.instoreDateStart'), value: 'instoreDateStart', type: 'date' },
        { label: this.$t('rec.instoreDateEnd'), value: 'instoreDateEnd', type: 'date' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('rec.asnNo'), value: 'asnNo', type: 'input' },
        { label: this.$t('rec.asnSource'), value: 'asnSource', type: 'select', list: 'asnSourceList' },
        { label: this.$t('rec.asnType'), value: 'scAsnType', type: 'select', list: 'scAsnTypeList' },
        { label: this.$t('rec.scBusinessType'), value: 'scBusinessType', type: 'select', list: 'scBusinessTypeList' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
      this.topForm.data.ownerId = null
      this.topForm.data.skuId = null
    },
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'asnNo', label: this.$t('rec.asnNo'), minWidth: 120 },
        { prop: 'ownerName', label: this.$t('rec.ownerName'), minWidth: 100 },
        { prop: 'origNo', label: this.$t('rec.origNo'), minWidth: 130 },
        { prop: 'asnSourceName', label: this.$t('rec.asnSource'), minWidth: 100 },
        { prop: 'scAsnTypeName', label: this.$t('asn.asnType'), minWidth: 100 },
        { prop: 'scBusinessTypeName', label: this.$t('asn.scBusinessType'), minWidth: 100 },
        { prop: 'asnStatusName', label: this.$t('rec.asnStatus'), minWidth: 100 },
        { prop: 'recModeName', label: this.$t('rec.recMode'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('rec.instoreDate'), minWidth: 100 },
        { prop: 'remark', label: this.$t('rec.remark'), minWidth: 100 },
        { prop: 'creator', label: this.$t('rec.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('rec.createTime'), minWidth: 100 },
        { prop: 'updater', label: this.$t('rec.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('rec.updateTime'), minWidth: 100 },
        { label: '操作', value: 'status', width: 200, type: 'slot', fixed: 'right', align: 'left' }
      ]
      // 初始化明细表格
      this.diaFormInfo.dtTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'recInfoTypeName', label: this.$t('rec.dt.recInfoType'), minWidth: 100 },
        { prop: 'recLotCode', label: this.$t('rec.dt.recLotCode'), minWidth: 100 },
        { prop: 'containerNo', label: this.$t('rec.dt.containerNo'), minWidth: 100 },
        /* {prop:"skuId", label:this.$t('rec.dt.skuId'), minWidth:100},*/
        /* {prop:"sysSkuCode", label:this.$t('rec.dt.sysSkuCode'), minWidth:100},*/
        { prop: 'skuCode', label: this.$t('rec.dt.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('rec.dt.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('rec.dt.skuName'), minWidth: 100 },
        { prop: 'tradeName', label: this.$t('rec.dt.tradeName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('rec.dt.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('rec.dt.mainUnit'), minWidth: 100 },
        { prop: 'mfg', label: this.$t('rec.dt.mfg'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('rec.dt.originCountry'), minWidth: 100 },
        { prop: 'brandName', label: this.$t('rec.dt.brandName'), minWidth: 100 },
        { prop: 'approveNo', label: this.$t('rec.dt.approveNo'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('rec.dt.drugForm'), minWidth: 100 },
        { prop: 'drugFormSpec', label: this.$t('rec.dt.drugFormSpec'), minWidth: 100 },
        { prop: 'commodityQty', label: this.$t('rec.dt.commodityQty'), minWidth: 100 },
        { prop: 'recQty', label: this.$t('rec.dt.recQty'), minWidth: 100 },
        { prop: 'recPkgQty', label: this.$t('rec.dt.recPkgQty'), minWidth: 100 },
        { prop: 'skuVolM', label: this.$t('asn.dt.vol'), minWidth: 100 },
        { prop: 'skuGrossWeightKg', label: this.$t('asn.dt.grossWeight'), minWidth: 100 },
        { prop: 'skuNetWeightKg', label: this.$t('asn.dt.netWeight'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('rec.dt.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('rec.dt.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('rec.dt.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('rec.dt.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('rec.dt.invalidDate'), minWidth: 100 },

        { prop: 'qcQty', label: this.$t('rec.dt.inspectionNumber'), minWidth: 100 },
        { prop: 'goodQty', label: this.$t('rec.dt.qualifiedNumber'), minWidth: 100 },
        { prop: 'badQty', label: this.$t('rec.dt.unqualifiedNumber'), minWidth: 100 },
        { prop: 'badPercent', label: this.$t('rec.dt.unqualifiedRate'), minWidth: 100 },
        { prop: 'checkResultStr', label: this.$t('rec.dt.inspectionResult'), minWidth: 100 },

        { prop: 'skuQualityName', label: this.$t('rec.dt.skuQuality'), minWidth: 100 },
        { prop: 'badReason', label: this.$t('rec.dt.skuQualityExplain'), minWidth: 100 },
        { prop: 'paLot', label: this.$t('rec.dt.paLotId'), minWidth: 100 },
        { prop: 'rejectQty', label: this.$t('rec.dt.rejectQty'), minWidth: 100 },
        { prop: 'rejectReason', label: this.$t('rec.dt.rejectReason'), minWidth: 100 },
        { prop: 'opUser', label: this.$t('rec.dt.opUser'), minWidth: 100 },
        { prop: 'opTime', label: this.$t('rec.dt.opTime'), minWidth: 100 }
      ]
      // 初始化新增明细表单
      this.diaFormInfoDt.fieldList = [
        { label: this.$t('rec.dt.recLotCode'), value: 'recLotCode', type: 'input' },
        { label: this.$t('rec.dt.containerNo'), value: 'containerNo', type: 'input' },
        { label: this.$t('rec.dt.skuId'), value: 'skuId', type: 'input' },
        { label: this.$t('rec.dt.skuCode'), value: 'skuCode', type: 'slot' },
        { label: this.$t('rec.dt.recQty'), value: 'recQty', type: 'input' },
        { label: this.$t('rec.dt.recPkgQty'), value: 'recPkgQty', type: 'input' },
        { label: this.$t('asn.dt.vol'), value: 'volM', type: 'input' },
        { label: this.$t('asn.dt.grossWeight'), value: 'grossWeightKg', type: 'input' },
        { label: this.$t('asn.dt.netWeight'), value: 'netWeightKg', type: 'input' },
        { label: this.$t('rec.dt.batchNo'), value: 'batchNo', type: 'input' },
        { label: this.$t('rec.dt.productionBatch'), value: 'productionBatch', type: 'input' },
        { label: this.$t('rec.dt.productionDate'), value: 'productionDate', type: 'input' },
        { label: this.$t('rec.dt.instoreDate'), value: 'instoreDate', type: 'input' },
        { label: this.$t('rec.dt.invalidDate'), value: 'invalidDate', type: 'input' },
        { label: this.$t('rec.dt.remark'), value: 'remark', type: 'input' },
        { label: this.$t('rec.dt.rejectQty'), value: 'rejectQty', type: 'input' },
        { label: this.$t('rec.dt.rejectReason'), value: 'rejectReason', type: 'input' },
        { label: this.$t('rec.dt.cmdPkgQty'), value: 'cmdPkgQty', type: 'input' },
        { label: this.$t('rec.dt.commodityQty'), value: 'commodityQty', type: 'input' }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.diaFormInfo.dtTableInfo.handle.width = '0'
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('rec.ownerId'), value: 'ownerId', type: 'slot', disabled: true },
        { label: this.$t('rec.origNo'), value: 'origNo', type: 'input', readonly: true },
        { label: this.$t('rec.asnSource'), value: 'asnSource', type: 'select', list: 'asnSourceList', disabled: true },
        { label: this.$t('rec.asnType'), value: 'scAsnType', type: 'select', list: 'scAsnTypeList', disabled: true },
        { label: this.$t('rec.scBusinessType'), value: 'scBusinessType', type: 'select', list: 'scBusinessTypeList', disabled: true },
        { label: this.$t('rec.recMode'), value: 'recMode', type: 'select', list: 'recModeTypeList', disabled: true },
        { label: this.$t('rec.instoreDate'), value: 'instoreDate', type: 'input', readonly: true },
        { label: this.$t('rec.remark'), value: 'remark', type: 'input', readonly: true }
      ]
      // this.$nextTick(() => {
      this.imgInfo.disabled = true
      // })
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.diaFormInfo.data = {
        asnSource: this.listTypeInfo.asnSourceList.length == 0 ? null : this.listTypeInfo.asnSourceList[0].value,
        scAsnType: this.listTypeInfo.scAsnTypeList.length == 0 ? null : this.listTypeInfo.scAsnTypeList[0].value,
        scBusinessType: this.listTypeInfo.scBusinessTypeList.length == 0 ? null : this.listTypeInfo.scBusinessTypeList[0].value,
        asnStatus: this.listTypeInfo.asnStatusList.length == 0 ? null : this.listTypeInfo.asnStatusList[0].value,
        recInfoType: this.listTypeInfo.recInfoTypeList.length == 0 ? null : this.listTypeInfo.recInfoTypeList[0].value,
        recMode: this.listTypeInfo.recModeTypeList.length == 0 ? null : this.listTypeInfo.recModeTypeList[0].value
      }
      this.diaFormInfo.dtTableInfo.handle.width = '100'
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('rec.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('rec.origNo'), value: 'origNo', type: 'input' },
        { label: this.$t('rec.asnSource'), value: 'asnSource', type: 'select', list: 'asnSourceList' },
        { label: this.$t('rec.asnType'), value: 'scAsnType', type: 'select', list: 'scAsnTypeList' },
        { label: this.$t('rec.scBusinessType'), value: 'scBusinessType', type: 'select', list: 'scBusinessTypeList' },
        { label: this.$t('rec.remark'), value: 'remark', type: 'input' },
        { label: this.$t('rec.recMode'), value: 'recMode', type: 'select', list: 'recModeTypeList' },
        { label: this.$t('rec.instoreDate'), value: 'instoreDate', type: 'date' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      // 权限控制
      // this.imgInfo.disabled = this.$hasPerm('voucher')
      // console.log(this.imgInfo.disabled)

      this.imgInfo.disabled = false

      this.diaFormInfo.dtTableInfo.handle.width = '100'
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('rec.asnNo'), value: 'asnNo', type: 'input', disabled: true },
        { label: this.$t('rec.ownerId'), value: 'ownerId', type: 'slot', disabled: true },
        { label: this.$t('rec.origNo'), value: 'origNo', type: 'input', disabled: true },
        { label: this.$t('rec.asnSource'), value: 'asnSource', type: 'select', list: 'asnSourceList', disabled: true },
        { label: this.$t('rec.asnType'), value: 'scAasnType', type: 'select', list: 'scAasnTypeList', disabled: true },
        { label: this.$t('rec.scBusinessType'), value: 'scBusinessType', type: 'select', list: 'scBusinessTypeList', disabled: true },
        { label: this.$t('rec.asnStatus'), value: 'asnStatus', type: 'select', list: 'asnStatusList', disabled: true },
        { label: this.$t('rec.remark'), value: 'remark', type: 'input', disabled: true }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        ownerId: [{ required: true, message: this.$t('rec.msg.ownerId'), trigger: 'blur' }],
        scAsnType: [{ required: true, message: this.$t('rec.msg.asnType'), trigger: 'blur' }],
        // scBusinessType: [{ required: true, message: this.$t('rec.msg.scBusinessType'), trigger: 'blur' }],
        asnSource: [{ required: true, message: this.$t('rec.msg.asnSource'), trigger: 'blur' }]
      }
      /*  this.diaFormInfo.subTableInfo.rules = {
                skuCode:[{required: true, message: this.$t('rec.dt.msg.skuCode'), trigger: 'blur'}],
              }*/
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        asnStatus: null,
        ownerId: null,
        scAsnType: null,
        scBusinessType: null,
        remark: null,
        asnNo: null,
        origNo: null,
        supplierId: null,
        asnSource: null
      }
      this.diaFormInfo.dtTableInfo.data = []
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
