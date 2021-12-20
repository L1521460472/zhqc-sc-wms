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
          soNo: null,
          outOrderNo: null,
          cusOrderNo: null,
          scSoType: null,
          scBusinessType: null,
          soStatus: null,
          ownerId: null,
          customerId: null,
          partnerId: null,
          partnerStoreId: null,
          isFrozen: null,
          expOutTimeBegin: null,
          expOutTimeEnd: null,
          isHasInvoice: null,
          skuCode: null,
          createTimeBegin: null,
          createTimeEnd: null,
          country: null,
          provinceId: null,
          cityId: null,
          areaId: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        scSoType: [],
        scBusinessType: [],
        soStatusList: [],
        whetherList: [],
        countryList: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '260', // 默认操作按钮列宽度
          btList: [// 添加操作按钮
            // 默认查看按钮
            { label: this.$t('table.view'), type: 'primary', icon: '', event: 'openViewPage', show: true, disabled: this.$hasPerm('view') }, // event值为notification.js中定义的方法名
            // 自定义按钮
            { slot: true, icon: '', event: 'slotEvent' }// event值为notification.js中定义的方法名
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
          addDtBtnShow: false, // 是否显示按钮
          ref: null,
          data: [],
          fieldList: [],
          handle: { // 表格自定义按钮
            fixed: 'right',
            label: this.$t('table.actions'), // 操作列名
            width: '210', // 默认操作按钮列宽度
            btList: [// 添加操作按钮
              // 默认删除按钮
              // {label:this.$t('table.delete'), type: 'danger', icon: '', event: 'deleteDt', show: true,disabled:false},//event值为notification.js中定义的方法名
            ]
          }
        }
      }
    }
  },
  mounted() {
    this.collapsableForm()// 初始化表单-----------------展开收起
    this.initTopFormColumns()// 初始化查询界面配置数据
    this.rulesInit()// 初始化diaFormInfo表单字段校验规则
  },
  methods: {
    collapsableFormMore() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('soPreassign.soNo'), value: 'soNo', type: 'input' },
        { label: this.$t('soPreassign.scSoType'), value: 'scSoType', type: 'select', list: 'scSoTypeList' },
        { label: this.$t('soPreassign.scBusinessType'), value: 'scBusinessType', type: 'select', list: 'scBusinessTypeList' },
        { label: this.$t('soPreassign.soStatus'), value: 'soStatus', type: 'select', list: 'soStatusList' },
        { label: this.$t('soPreassign.cusOrderNo'), value: 'cusOrderNo', type: 'input' },
        { label: this.$t('soPreassign.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('soPreassign.customerId'), value: 'customerId', type: 'slot' },
        { label: this.$t('soPreassign.partnerId'), value: 'partnerId', type: 'slot' },
        { label: this.$t('soPreassign.skuCode'), value: 'skuCode', type: 'input' },
        { label: this.$t('soPreassign.outOrderNo'), value: 'outOrderNo', type: 'input' },
        { label: this.$t('soPreassign.expOutTimeBegin'), value: 'expOutTimeBegin', type: 'date', dateType: 'date' },
        { label: this.$t('soPreassign.expOutTimeEnd'), value: 'expOutTimeEnd', type: 'date', dateType: 'date' },
        { label: this.$t('soPreassign.createTimeBegin'), value: 'createTimeBegin', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('soPreassign.createTimeEnd'), value: 'createTimeEnd', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('soPreassign.country'), value: 'country', type: 'select', list: 'countryList' },
        { label: this.$t('soPreassign.provinceId'), value: 'provinceId', type: 'slot' },
        { label: this.$t('soPreassign.cityId'), value: 'cityId', type: 'slot' },
        { label: this.$t('soPreassign.areaId'), value: 'areaId', type: 'slot' },
        { label: this.$t('soPreassign.partnerStoreId'), value: 'partnerStoreId', type: 'slot' },
        { label: this.$t('soPreassign.receiver'), value: 'receiver', type: 'input' },
        { label: this.$t('soPreassign.isFrozen'), value: 'isFrozen', type: 'select', list: 'whetherList' },
        { label: this.$t('soPreassign.isHasInvoice'), value: 'isHasInvoice', type: 'select', list: 'whetherList' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('soPreassign.soNo'), value: 'soNo', type: 'input' },
        { label: this.$t('soPreassign.scSoType'), value: 'scSoType', type: 'select', list: 'scSoTypeList' },
        { label: this.$t('soPreassign.soStatus'), value: 'soStatus', type: 'select', list: 'soStatusList' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
      this.topForm.data.ownerId = null
      this.topForm.data.customerId = null
      this.topForm.data.partnerId = null
      this.topForm.data.partnerStoreId = null
    },
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'selection', width: 50, fixed: 'left' }, // 选项框
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'soNo', label: this.$t('soPreassign.soNo'), minWidth: 150 },
        { prop: 'scSoTypeName', label: this.$t('soPreassign.scSoType'), minWidth: 100 },
        { prop: 'soTypeName', label: this.$t('soPreassign.soType'), minWidth: 100 },
        { prop: 'soStatusName', label: this.$t('soPreassign.soStatus'), minWidth: 100 },
        { prop: 'outOrderNo', label: this.$t('soPreassign.outOrderNo'), minWidth: 150 },
        { prop: 'cusOrderNo', label: this.$t('soPreassign.cusOrderNo'), minWidth: 120 },
        { prop: 'customerName', label: this.$t('soPreassign.customerId'), minWidth: 100 },
        // {prop:"whName", label:this.$t('soPreassign.whId'), minWidth:100},
        { prop: 'partnerName', label: this.$t('soPreassign.partnerId'), minWidth: 100 },
        // {prop:"ownerName", label:this.$t('soPreassign.ownerId'), minWidth:100},
        { prop: 'receiver', label: this.$t('soPreassign.receiver'), minWidth: 100 },
        // {prop:"receiverTel", label:this.$t('soPreassign.receiverTel'), minWidth:100},
        { prop: 'expOutTime', label: this.$t('soPreassign.expOutTime'), minWidth: 100 },
        // {prop:"cusOrderNo", label:this.$t('soPreassign.cusOrderNo'), minWidth:100},
        { prop: 'isFrozenName', label: this.$t('soPreassign.isFrozen'), minWidth: 100 },
        // {prop:"urgentLevel", label:this.$t('soPreassign.urgentLevel'), minWidth:100},
        { prop: 'remark', label: this.$t('soPreassign.remark'), minWidth: 100 },
        { prop: 'creator', label: this.$t('soPreassign.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('soPreassign.createTime'), minWidth: 100 },
        { prop: 'updater', label: this.$t('soPreassign.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('soPreassign.updateTime'), minWidth: 100 }

      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('soPreassign.soNo'), value: 'soNo', type: 'input', disabled: true },
        { label: this.$t('soPreassign.ownerId'), value: 'ownerId', type: 'slot', disabled: true },
        { label: this.$t('soPreassign.customerId'), value: 'customerId', type: 'slot', disabled: true },
        { label: this.$t('soPreassign.expOutTime'), value: 'expOutTime', type: 'date', dateType: 'date', disabled: true },
        { label: this.$t('soPreassign.partnerId'), value: 'partnerId', type: 'slot', disabled: true },
        { label: this.$t('soPreassign.partnerStoreId'), value: 'partnerStoreId', type: 'slot', disabled: true },
        { label: this.$t('soPreassign.cusOrderNo'), value: 'cusOrderNo', type: 'input', disabled: true },
        { label: this.$t('soPreassign.isSelf'), value: 'isSelf', type: 'select', list: 'whetherList', disabled: true },
        { label: this.$t('soPreassign.receiver'), value: 'receiver', type: 'input', disabled: true },
        { label: this.$t('soPreassign.receiverTel'), value: 'receiverTel', type: 'input', disabled: true },
        { label: this.$t('soPreassign.country'), value: 'country', type: 'select', list: 'countryList', disabled: true },
        { label: this.$t('soPreassign.provinceId'), value: 'provinceId', type: 'slot', disabled: true },
        { label: this.$t('soPreassign.cityId'), value: 'cityId', type: 'slot', disabled: true },
        { label: this.$t('soPreassign.areaId'), value: 'areaId', type: 'slot', disabled: true },
        { label: this.$t('soPreassign.addr'), value: 'addr', type: 'input', disabled: true },
        { label: this.$t('soPreassign.isHasInvoice'), value: 'isHasInvoice', type: 'select', list: 'whetherList', disabled: true },
        { label: this.$t('soPreassign.remark'), value: 'remark', type: 'input', disabled: true },
        { label: this.$t('soPreassign.outOrderNo'), value: 'outOrderNo', type: 'input', disabled: true },
        { label: this.$t('soPreassign.scSoType'), value: 'scSoType', type: 'select', list: 'scSoTypeList', disabled: true },
        { label: this.$t('soPreassign.scBusinessType'), value: 'scBusinessType', type: 'select', list: 'scBusinessTypeList', disabled: true },
        { label: this.$t('soPreassign.soStatus'), value: 'soStatus', type: 'select', list: 'soStatusList', disabled: true },
        { label: this.$t('soPreassign.creator'), value: 'creator', type: 'input', disabled: true },
        { label: this.$t('soPreassign.createTime'), value: 'createTime', type: 'input', disabled: true }
      ]
      this.diaFormInfo.dtTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'rowNo', label: this.$t('soPreassign.dt.rowNo'), minWidth: 100 },

        { prop: 'skuCode', label: this.$t('sku.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('sku.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('sku.skuName'), minWidth: 100 },
        { prop: 'tradeName', label: this.$t('sku.tradeName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('sku.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('sku.mainUnit'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('sku.drugForm'), minWidth: 100 },
        { prop: 'mfgName', label: this.$t('sku.mfgName'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('sku.originCountry'), minWidth: 100 },
        { prop: 'approvalNumber', label: this.$t('sku.approvalNumber'), minWidth: 100 },
        { prop: 'brandName', label: this.$t('sku.brandName'), minWidth: 100 },
        { prop: 'tempControlName', label: this.$t('sku.tempControlName'), minWidth: 100 },
        { prop: 'validityDay', label: this.$t('sku.validityDay'), minWidth: 100 },

        { prop: 'soQty', label: this.$t('soPreassign.dt.soQty'), minWidth: 100 },
        { prop: 'perAllotQty', label: this.$t('soPreassign.dt.perAllotQty'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('soPreassign.dt.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('soPreassign.dt.productionDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('soPreassign.dt.invalidDate'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('soPreassign.dt.batchNo'), minWidth: 100 },
        { prop: 'supplierName', label: this.$t('soPreassign.dt.supplierName'), minWidth: 100 }

      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('soPreassign.id'), value: 'id', type: 'input' },
        { label: this.$t('soPreassign.companyCode'), value: 'companyCode', type: 'input' },
        { label: this.$t('soPreassign.whId'), value: 'whId', type: 'input' },
        { label: this.$t('soPreassign.ownerId'), value: 'ownerId', type: 'input' },
        { label: this.$t('soPreassign.soNo'), value: 'soNo', type: 'input' },
        { label: this.$t('soPreassign.scSoType'), value: 'scSoType', type: 'input' },
        { label: this.$t('soPreassign.scBusinessType'), value: 'scBusinessType', type: 'input' },
        { label: this.$t('soPreassign.soStatus'), value: 'soStatus', type: 'input' },
        { label: this.$t('soPreassign.assignStatus'), value: 'assignStatus', type: 'input' },
        { label: this.$t('soPreassign.isCanInWave'), value: 'isCanInWave', type: 'input' },
        { label: this.$t('soPreassign.isFrozen'), value: 'isFrozen', type: 'input' },
        { label: this.$t('soPreassign.urgentLevel'), value: 'urgentLevel', type: 'input' },
        { label: this.$t('soPreassign.cusOrderNo'), value: 'cusOrderNo', type: 'input' },
        { label: this.$t('soPreassign.outOrderNo'), value: 'outOrderNo', type: 'input' },
        { label: this.$t('soPreassign.customerId'), value: 'customerId', type: 'input' },
        { label: this.$t('soPreassign.sowGroup'), value: 'sowGroup', type: 'input' },
        { label: this.$t('soPreassign.expOutTime'), value: 'expOutTime', type: 'input' },
        { label: this.$t('soPreassign.partnerId'), value: 'partnerId', type: 'input' },
        { label: this.$t('soPreassign.isSelf'), value: 'isSelf', type: 'input' },
        { label: this.$t('soPreassign.receiver'), value: 'receiver', type: 'input' },
        { label: this.$t('soPreassign.receiverTel'), value: 'receiverTel', type: 'input' },
        { label: this.$t('soPreassign.areaId'), value: 'areaId', type: 'input' },
        { label: this.$t('soPreassign.addr'), value: 'addr', type: 'input' },
        { label: this.$t('soPreassign.isHasInvoice'), value: 'isHasInvoice', type: 'input' },
        { label: this.$t('soPreassign.isPrescription'), value: 'isPrescription', type: 'input' },
        { label: this.$t('soPreassign.provinceId'), value: 'provinceId', type: 'input' },
        { label: this.$t('soPreassign.cityId'), value: 'cityId', type: 'input' },
        { label: this.$t('soPreassign.remark'), value: 'remark', type: 'input' },
        { label: this.$t('soPreassign.creatorName'), value: 'creatorName', type: 'input' },
        { label: this.$t('soPreassign.updaterName'), value: 'updaterName', type: 'input' },
        { label: this.$t('soPreassign.partnerStoreId'), value: 'partnerStoreId', type: 'input' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('soPreassign.companyCode'), value: 'companyCode', type: 'input' },
        { label: this.$t('soPreassign.whId'), value: 'whId', type: 'input' },
        { label: this.$t('soPreassign.ownerId'), value: 'ownerId', type: 'input' },
        { label: this.$t('soPreassign.soNo'), value: 'soNo', type: 'input' },
        { label: this.$t('soPreassign.scSoType'), value: 'scSoType', type: 'input' },
        { label: this.$t('soPreassign.scBusinessType'), value: 'scBusinessType', type: 'input' },
        { label: this.$t('soPreassign.soStatus'), value: 'soStatus', type: 'input' },
        { label: this.$t('soPreassign.assignStatus'), value: 'assignStatus', type: 'input' },
        { label: this.$t('soPreassign.isCanInWave'), value: 'isCanInWave', type: 'input' },
        { label: this.$t('soPreassign.isFrozen'), value: 'isFrozen', type: 'input' },
        { label: this.$t('soPreassign.urgentLevel'), value: 'urgentLevel', type: 'input' },
        { label: this.$t('soPreassign.cusOrderNo'), value: 'cusOrderNo', type: 'input' },
        { label: this.$t('soPreassign.outOrderNo'), value: 'outOrderNo', type: 'input' },
        { label: this.$t('soPreassign.customerId'), value: 'customerId', type: 'input' },
        { label: this.$t('soPreassign.sowGroup'), value: 'sowGroup', type: 'input' },
        { label: this.$t('soPreassign.expOutTime'), value: 'expOutTime', type: 'input' },
        { label: this.$t('soPreassign.partnerId'), value: 'partnerId', type: 'input' },
        { label: this.$t('soPreassign.isSelf'), value: 'isSelf', type: 'input' },
        { label: this.$t('soPreassign.receiver'), value: 'receiver', type: 'input' },
        { label: this.$t('soPreassign.receiverTel'), value: 'receiverTel', type: 'input' },
        { label: this.$t('soPreassign.areaId'), value: 'areaId', type: 'input' },
        { label: this.$t('soPreassign.addr'), value: 'addr', type: 'input' },
        { label: this.$t('soPreassign.isHasInvoice'), value: 'isHasInvoice', type: 'input' },
        { label: this.$t('soPreassign.isPrescription'), value: 'isPrescription', type: 'input' },
        { label: this.$t('soPreassign.provinceId'), value: 'provinceId', type: 'input' },
        { label: this.$t('soPreassign.cityId'), value: 'cityId', type: 'input' },
        { label: this.$t('soPreassign.remark'), value: 'remark', type: 'input' },
        { label: this.$t('soPreassign.updaterName'), value: 'updaterName', type: 'input' },
        { label: this.$t('soPreassign.partnerStoreId'), value: 'partnerStoreId', type: 'input' }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        ownerId: [{ required: true, message: this.$t('soPreassign.msg.ownerId'), trigger: 'blur' }],
        partnerStoreId: [{ required: true, message: this.$t('soPreassign.msg.partnerStoreId'), trigger: 'blur' }],
        soNo: [{ required: true, message: this.$t('soPreassign.msg.soNo'), trigger: 'blur' }],
        areaId: [{ required: true, message: this.$t('soPreassign.msg.areaId'), trigger: 'blur' }],
        receiverTel: [{ required: true, message: this.$t('soPreassign.msg.receiverTel'), trigger: 'blur' }],
        partnerId: [{ required: true, message: this.$t('soPreassign.msg.partnerId'), trigger: 'blur' }],
        isHasInvoice: [{ required: true, message: this.$t('soPreassign.msg.isHasInvoice'), trigger: 'blur' }],
        assignStatus: [{ required: true, message: this.$t('soPreassign.msg.assignStatus'), trigger: 'blur' }],
        companyCode: [{ required: true, message: this.$t('soPreassign.msg.companyCode'), trigger: 'blur' }],
        id: [{ required: true, message: this.$t('soPreassign.msg.id'), trigger: 'blur' }],
        addr: [{ required: true, message: this.$t('soPreassign.msg.addr'), trigger: 'blur' }],
        isCanInWave: [{ required: true, message: this.$t('soPreassign.msg.isCanInWave'), trigger: 'blur' }],
        isSelf: [{ required: true, message: this.$t('soPreassign.msg.isSelf'), trigger: 'blur' }],
        urgentLevel: [{ required: true, message: this.$t('soPreassign.msg.urgentLevel'), trigger: 'blur' }],
        isPrescription: [{ required: true, message: this.$t('soPreassign.msg.isPrescription'), trigger: 'blur' }],
        isFrozen: [{ required: true, message: this.$t('soPreassign.msg.isFrozen'), trigger: 'blur' }],
        receiver: [{ required: true, message: this.$t('soPreassign.msg.receiver'), trigger: 'blur' }],
        outOrderNo: [{ required: true, message: this.$t('soPreassign.msg.outOrderNo'), trigger: 'blur' }],
        soStatus: [{ required: true, message: this.$t('soPreassign.msg.soStatus'), trigger: 'blur' }],
        updaterName: [{ required: true, message: this.$t('soPreassign.msg.updaterName'), trigger: 'blur' }],
        whId: [{ required: true, message: this.$t('soPreassign.msg.whId'), trigger: 'blur' }],
        provinceId: [{ required: true, message: this.$t('soPreassign.msg.provinceId'), trigger: 'blur' }],
        sowGroup: [{ required: true, message: this.$t('soPreassign.msg.sowGroup'), trigger: 'blur' }],
        scSoType: [{ required: true, message: this.$t('soPreassign.msg.scSoType'), trigger: 'blur' }],
        scBusinessType: [{ required: true, message: this.$t('soPreassign.msg.scBusinessType'), trigger: 'blur' }],
        creatorName: [{ required: true, message: this.$t('soPreassign.msg.creatorName'), trigger: 'blur' }],
        customerId: [{ required: true, message: this.$t('soPreassign.msg.customerId'), trigger: 'blur' }],
        cityId: [{ required: true, message: this.$t('soPreassign.msg.cityId'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        ownerId: null,
        partnerStoreId: null,
        remark: null,
        soNo: null,
        areaId: null,
        expOutTime: null,
        receiverTel: null,
        partnerId: null,
        isHasInvoice: null,
        assignStatus: null,
        companyCode: null,
        id: null,
        addr: null,
        isCanInWave: null,
        isSelf: null,
        urgentLevel: null,
        isPrescription: null,
        isFrozen: null,
        receiver: null,
        outOrderNo: null,
        soStatus: null,
        updaterName: null,
        whId: null,
        provinceId: null,
        sowGroup: null,
        soType: null,
        creatorName: null,
        customerId: null,
        cusOrderNo: null,
        cityId: null
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
