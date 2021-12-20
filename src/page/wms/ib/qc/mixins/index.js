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
          qcNo: null,
          asnNo: null,
          qcStatus: null,
          ownerId: null,
          skuId: null,
          origNo: null,
          checkUserName: null,
          auditUserName: null,
          checkTimeBegin: null,
          checkTimeEnd: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        qcStatusList: [],
        asnStatusList: [],
        qcDtResultList: [],
        vxeQcDtResultList: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '200', // 默认操作按钮列宽度
          btList: [
            {
              label: '查看',
              type: 'primary',
              icon: '',
              event: 'openViewPage',
              show: true,
              disabled: this.$hasPerm('view')
            },
            {
              label: '编辑',
              type: 'success',
              icon: '',
              event: 'openEditPage',
              show: true,
              disabled: this.$hasPerm('edit')
            },
            {
              label: '更多', type: 'warning', icon: 'el-icon-more', event: '', btShow: true,
              moreList: [
                {
                  label: '打印',
                  type: 'success',
                  icon: '',
                  event: 'print',
                  show: true,
                  disabled: this.$hasPerm('print')
                },
                {
                  label: '一键验收',
                  type: 'primary',
                  icon: '',
                  event: 'allAcceptance',
                  show: true,
                  disabled: this.$hasPerm('allAcceptance')
                },
                // {label:'审核', type: 'success', icon: '',show:true, event: 'audit',disabled:this.$hasPerm('audit')},
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
        data: {
          dtList: []
        }, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        subTableInfo: {
          title: '列表详情',
          ref: null,
          type: null,
          fieldList: [],
          rules: {},
          labelWidth: '120px',
          handle: {
            fixed: 'right',
            label: this.$t('table.actions'),
            width: '100',
            btList: [
              { label: '取消验收', type: 'danger', icon: '', event: 'dtCancelQc', show: true }
            ]
          },
          saveList: [
            { label: '关闭', type: '', icon: '', event: 'close', show: true },
            { label: '保存', type: 'primary', icon: '', event: 'save', saveLoading: false, show: true }
          ],
          topBtn: {}
        }
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
        { label: this.$t('qc.qcNo'), value: 'qcNo', type: 'input' },
        { label: this.$t('qc.asnNo'), value: 'asnNo', type: 'input' },
        { label: this.$t('qc.qcStatus'), value: 'qcStatus', type: 'select', list: 'qcStatusList' },
        { label: this.$t('qc.ownerName'), value: 'ownerId', type: 'slot' },
        { label: this.$t('qc.skuId'), value: 'skuId', type: 'slot' },
        { label: this.$t('qc.origNo'), value: 'origNo', type: 'input' },
        { label: this.$t('qc.checkUser'), value: 'checkUserName', type: 'input' },
        { label: this.$t('qc.auditUserName'), value: 'auditUserName', type: 'input' },
        {
          label: this.$t('qc.checkTimeBegin'),
          value: 'checkTimeBegin',
          type: 'date',
          dateType: 'datetime',
          format: 'yyyy-MM-dd HH:mm:ss',
          valueFormat: 'yyyy-MM-dd HH:mm:ss'
        },
        {
          label: this.$t('qc.checkTimeEnd'),
          value: 'checkTimeEnd',
          type: 'date',
          dateType: 'datetime',
          format: 'yyyy-MM-dd HH:mm:ss',
          valueFormat: 'yyyy-MM-dd HH:mm:ss'
        },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('qc.qcNo'), value: 'qcNo', type: 'input' },
        { label: this.$t('qc.asnNo'), value: 'asnNo', type: 'input' },
        { label: this.$t('qc.qcStatus'), value: 'qcStatus', type: 'select', list: 'qcStatusList' },
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
        { prop: 'qcNo', label: this.$t('qc.qcNo'), minWidth: 100 },
        { prop: 'qcStatusName', label: this.$t('qc.qcStatus'), minWidth: 100 },
        { prop: 'asnNo', label: this.$t('qc.asnNo'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('qc.ownerName'), minWidth: 100 },
        { prop: 'createName', label: this.$t('qc.createName'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('qc.createTime'), minWidth: 100 },
        { label: '操作', value: 'status', width: 200, type: 'slot', fixed: 'right', align: 'left' }
      ]
      // this.$set(this.diaFormInfo.data, 'dtList', []);
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.diaFormInfo.subTableInfo.handle.width = '0'
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('qc.qcNo'), value: 'qcNo', type: 'input', readonly: true },
        { label: this.$t('qc.ownerName'), value: 'ownerName', type: 'input', readonly: true },
        { label: this.$t('qc.asnNo'), value: 'asnNo', type: 'input', readonly: true },
        { label: this.$t('qc.qcStatus'), value: 'qcStatusName', type: 'input', readonly: true },
        { label: this.$t('qc.createName'), value: 'createName', type: 'input', readonly: true },
        { label: this.$t('qc.createTime'), value: 'createTime', type: 'input', readonly: true },
        { label: this.$t('qc.auditUserName'), value: 'auditUserName', type: 'input', readonly: true },
        { label: this.$t('qc.auditTime'), value: 'auditTime', type: 'input', readonly: true },
        { label: this.$t('qc.remark'), value: 'remark', type: 'textarea', disabled: true }
      ]
      // 明细数据
      this.diaFormInfo.subTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'seq', width: 50 }, // 序列
        { prop: 'skuCode', label: this.$t('qc.dt.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('qc.dt.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('qc.dt.skuName'), minWidth: 100 },
        { prop: 'tradeName', label: this.$t('qc.dt.tradeName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('qc.dt.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('qc.dt.mainUnit'), minWidth: 100 },
        { prop: 'perQty', label: this.$t('qc.dt.perQty'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('qc.dt.drugForm'), minWidth: 100 },
        { prop: 'mfgName', label: this.$t('qc.dt.mfgName'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('qc.dt.originCountry'), minWidth: 100 },
        { prop: 'approvalNumber', label: this.$t('qc.dt.approvalNumber'), minWidth: 100 },
        { prop: 'brandName', label: this.$t('qc.dt.brandName'), minWidth: 100 },
        { prop: 'tempControlName', label: this.$t('qc.dt.tempControlName'), minWidth: 100 },
        { prop: 'validityDay', label: this.$t('qc.dt.validityDay'), minWidth: 100 },
        { prop: 'cmdPkgQty', label: this.$t('qc.dt.cmdPkgQty'), minWidth: 60 },
        { prop: 'commodityQty', label: this.$t('qc.dt.commodityQty'), minWidth: 80 },
        { prop: 'recQty', label: this.$t('qc.dt.recQty'), minWidth: 80 },
        { prop: 'qcModeName', label: this.$t('qc.dt.qcModeName'), minWidth: 80 },
        { prop: 'checkUserName', label: this.$t('qc.dt.checkUserName'), minWidth: 80 },
        { prop: 'checkTime', label: this.$t('qc.dt.checkTime'), minWidth: 100 },
        { prop: 'checkUserTwoName', label: this.$t('qc.dt.checkUserTwoName'), minWidth: 100 },
        { prop: 'checkTimeTwo', label: this.$t('qc.dt.checkTimeTwo'), minWidth: 100 },
        { prop: 'shouldQcQty', label: this.$t('qc.dt.shouldQcQty'), minWidth: 100 },
        { prop: 'qcQty', label: this.$t('qc.dt.qcQty'), minWidth: 100 },
        { prop: 'badQty', label: this.$t('qc.dt.badQty'), minWidth: 100 },
        { prop: 'goodQty', label: this.$t('qc.dt.goodQty'), minWidth: 100 },
        { prop: 'badReason', label: this.$t('qc.dt.badReason'), minWidth: 100 },
        { prop: 'checkResultName', label: this.$t('qc.dt.checkResult'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('qc.dt.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('qc.dt.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('qc.dt.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('qc.dt.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('qc.dt.invalidDate'), minWidth: 100 }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('qc.qcNo'), value: 'qcNo', type: 'input', readonly: true },
        { label: this.$t('qc.ownerName'), value: 'ownerName', type: 'input', readonly: true },
        { label: this.$t('qc.asnNo'), value: 'asnNo', type: 'input', readonly: true },
        { label: this.$t('qc.qcStatus'), value: 'qcStatusName', type: 'input', readonly: true },
        { label: this.$t('qc.createName'), value: 'createName', type: 'input', readonly: true },
        { label: this.$t('qc.createTime'), value: 'createTime', type: 'input', readonly: true },
        { label: this.$t('qc.auditUserName'), value: 'auditUserName', type: 'input', readonly: true },
        { label: this.$t('qc.auditTime'), value: 'auditTime', type: 'input', readonly: true },
        { label: this.$t('qc.remark'), value: 'remark', type: 'textarea' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.diaFormInfo.subTableInfo.handle.width = '100'
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('qc.qcNo'), value: 'qcNo', type: 'input', readonly: true },
        { label: this.$t('qc.ownerName'), value: 'ownerName', type: 'input', readonly: true },
        { label: this.$t('qc.asnNo'), value: 'asnNo', type: 'input', readonly: true },
        { label: this.$t('qc.qcStatus'), value: 'qcStatusName', type: 'input', readonly: true },
        { label: this.$t('qc.createName'), value: 'createName', type: 'input', readonly: true },
        { label: this.$t('qc.createTime'), value: 'createTime', type: 'input', readonly: true },
        { label: this.$t('qc.auditUserName'), value: 'auditUserName', type: 'input', readonly: true },
        { label: this.$t('qc.auditTime'), value: 'auditTime', type: 'input', readonly: true },
        { label: this.$t('qc.remark'), value: 'remark', type: 'textarea' }
      ]

      // 明细数据listTypeInfo
      this.diaFormInfo.subTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'seq', width: 50 }, // 序列
        { prop: 'skuCode', label: this.$t('qc.dt.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('qc.dt.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('qc.dt.skuName'), minWidth: 100 },
        { prop: 'tradeName', label: this.$t('qc.dt.tradeName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('qc.dt.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('qc.dt.mainUnit'), minWidth: 100 },
        { prop: 'perQty', label: this.$t('qc.dt.perQty'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('qc.dt.drugForm'), minWidth: 100 },
        { prop: 'mfgName', label: this.$t('qc.dt.mfgName'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('qc.dt.originCountry'), minWidth: 100 },
        { prop: 'approvalNumber', label: this.$t('qc.dt.approvalNumber'), minWidth: 100 },
        { prop: 'brandName', label: this.$t('qc.dt.brandName'), minWidth: 100 },
        { prop: 'tempControlName', label: this.$t('qc.dt.tempControlName'), minWidth: 100 },
        { prop: 'validityDay', label: this.$t('qc.dt.validityDay'), minWidth: 100 },
        { prop: 'cmdPkgQty', label: this.$t('qc.dt.cmdPkgQty'), minWidth: 60 },
        { prop: 'commodityQty', label: this.$t('qc.dt.commodityQty'), minWidth: 80 },
        { prop: 'recQty', label: this.$t('qc.dt.recQty'), minWidth: 80 },
        { prop: 'qcModeName', label: this.$t('qc.dt.qcModeName'), minWidth: 80 },
        { prop: 'checkUserName', label: this.$t('qc.dt.checkUserName'), minWidth: 80 },
        { prop: 'checkTime', label: this.$t('qc.dt.checkTime'), minWidth: 100 },
        { prop: 'checkUserTwoName', label: this.$t('qc.dt.checkUserTwoName'), minWidth: 100 },
        { prop: 'checkTimeTwo', label: this.$t('qc.dt.checkTimeTwo'), minWidth: 100 },
        { prop: 'shouldQcQty', label: this.$t('qc.dt.shouldQcQty'), minWidth: 100 },
        { prop: 'qcQty', label: this.$t('qc.dt.qcQty'), minWidth: 100 },
        { prop: 'badQty', label: this.$t('qc.dt.badQty'), minWidth: 100 },
        { prop: 'goodQty', label: this.$t('qc.dt.goodQty'), minWidth: 100 },
        { prop: 'badReason', label: this.$t('qc.dt.badReason'), minWidth: 100 },
        { prop: 'checkResultName', label: this.$t('qc.dt.checkResult'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('qc.dt.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('qc.dt.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('qc.dt.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('qc.dt.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('qc.dt.invalidDate'), minWidth: 100 }
      ]
    },

    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {}

      this.diaFormInfo.subTableInfo.rules = {
        qcQty: [{
          required: true,
          message: this.$t('qc.msg.qcQty'),
          trigger: 'blur'
        },
        { max: 10, message: '最大长度10个字符' },
        { pattern: /(^[1-9][0-9]*$)|(^0$)/, message: '只能输入正整数' }],

        goodQty: [{
          required: true,
          message: this.$t('qc.msg.goodQty'),
          trigger: 'blur'
        },
        { max: 10, message: '最大长度10个字符' },
        { pattern: /(^[1-9][0-9]*$)|(^0$)/, message: '只能输入正整数' }],

        badQty: [{
          required: true,
          message: this.$t('qc.msg.badQty'),
          trigger: 'blur'
        },
        { max: 10, message: '最大长度10个字符' },
        { pattern: /(^[1-9][0-9]*$)|(^0$)/, message: '只能输入正整数' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        asnId: null,
        whId: null,
        qcNo: null,
        qcStatus: null,
        asnNo: null,
        remark: null,
        id: null,
        dtList: []
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
