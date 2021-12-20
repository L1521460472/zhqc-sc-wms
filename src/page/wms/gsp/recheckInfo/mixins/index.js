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
          no: null,
          recheckInfoStatus: null,
          ownerId: null,
          recheckUserName: null,
          qcUserName: null,
          recheckInfoDateBegin: null,
          recheckInfoDateEnd: null,
          auditorName: null,
          createTimeBegin: null,
          createTimeEnd: null,
          auditTimeBegin: null,
          auditTimeEnd: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        recheckInfoStatusList: null,
        recheckInfoCheckResultEnumList: null,
        recheckInfoModeEnumList: null,
        recheckStatusList: null
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '360', // 默认操作按钮列宽度
          btList: [// 添加操作按钮
            // 默认查看按钮
            { label: this.$t('table.view'), type: 'primary', icon: '', event: 'openViewPage', show: true, disabled: this.$hasPerm('view') }, // event值为notification.js中定义的方法名
            // 默认修改按钮
            { label: this.$t('table.edit'), type: 'success', icon: '', event: 'openEditPage', show: true, disabled: this.$hasPerm('edit') }, // event值为notification.js中定义的方法名
            { label: '审核', type: 'info', icon: '', event: 'audit', show: true, disabled: this.$hasPerm('edit') }, // event值为notification.js中定义的方法名
            { label: '取消审核', type: 'warning', icon: '', event: 'cancelAudit', show: true, disabled: this.$hasPerm('edit') }, // event值为notification.js中定义的方法名
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
        rules: {}, // 配置的表单字段校验规则集合
        subTableInfo: {
          topBtn: { label: '增加产品明细', show: false, type: 'primary', disabled: false, loading: false, event: 'addSub' },
          ref: null,
          fieldList: [],
          handle: null
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
        { label: this.$t('recheckInfo.recheckInfoNo'), value: 'recheckInfoNo', type: 'input' },
        { label: this.$t('recheckInfo.recheckInfoStatus'), value: 'recheckInfoStatus', type: 'select', list: 'recheckStatusList' },
        { label: this.$t('recheckInfo.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('recheckInfo.recheckUserName'), value: 'recheckUserName', type: 'input' },
        { label: this.$t('recheckInfo.qcUserName'), value: 'qcUserName', type: 'input' },
        { label: this.$t('recheckInfo.recheckInfoDateBegin'), value: 'recheckInfoDateBegin', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('recheckInfo.recheckInfoDateEnd'), value: 'recheckInfoDateEnd', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('recheckInfo.auditorName'), value: 'auditorName', type: 'input' },
        { label: this.$t('recheckInfo.createTimeBegin'), value: 'createTimeBegin', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('recheckInfo.createTimeEnd'), value: 'createTimeEnd', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('recheckInfo.auditTimeBegin'), value: 'auditTimeBegin', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('recheckInfo.auditTimeEnd'), value: 'auditTimeEnd', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('recheckInfo.recheckInfoNo'), value: 'recheckInfoNo', type: 'input' },
        { label: this.$t('recheckInfo.recheckInfoStatus'), value: 'recheckInfoStatus', type: 'select', list: 'recheckStatusList' },
        { label: this.$t('recheckInfo.ownerId'), value: 'ownerId', type: 'slot' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },

    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'recheckInfoNo', label: this.$t('recheckInfo.recheckInfoNo'), minWidth: 140 },
        { prop: 'recheckInfoStatusName', label: this.$t('recheckInfo.recheckInfoStatus'), minWidth: 80 },
        { prop: 'recheckInfoDate', label: this.$t('recheckInfo.date'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('recheckInfo.ownerId'), minWidth: 100 },
        { prop: 'recheckUserName', label: this.$t('recheckInfo.recheckUserName'), minWidth: 100 },
        { prop: 'qcUserName', label: this.$t('recheckInfo.qcUserName'), minWidth: 100 },
        { prop: 'recheckNo', label: this.$t('recheckInfo.recheckNo'), minWidth: 130 },
        { prop: 'auditorName', label: this.$t('recheckInfo.auditorName'), minWidth: 100 },
        { prop: 'auditTime', label: this.$t('recheckInfo.auditTime'), minWidth: 100 },
        { prop: 'createName', label: this.$t('recheckInfo.createName'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('recheckInfo.createTime'), minWidth: 100 },
        { prop: 'remark', label: this.$t('recheckInfo.remark'), minWidth: 100 },
        { label: '操作', value: 'status', width: 280, type: 'slot', fixed: 'right' }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('recheckInfo.recheckInfoNo'), value: 'recheckInfoNo', type: 'input', readonly: true },
        { label: this.$t('recheckInfo.ownerId'), value: 'ownerName', type: 'input', readonly: true },
        { label: this.$t('recheckInfo.date'), value: 'recheckInfoDate', type: 'input', readonly: true },
        { label: this.$t('recheckInfo.maintainUserName'), value: 'maintainUserName', type: 'input', readonly: true },
        { label: this.$t('recheckInfo.qcUserName'), value: 'qcUserName', type: 'input', readonly: true },
        { label: this.$t('recheckInfo.recheckNo'), value: 'recheckNo', type: 'input', readonly: true },
        { label: this.$t('recheckInfo.recheckStatus'), value: 'recheckInfoStatusName', type: 'input', readonly: true },
        { label: this.$t('recheckInfo.createName'), value: 'createName', type: 'input', readonly: true },
        { label: this.$t('recheckInfo.createTime'), value: 'createTime', type: 'input', readonly: true },
        { label: this.$t('recheckInfo.auditorName'), value: 'auditorName', type: 'input', readonly: true },
        { label: this.$t('recheckInfo.auditTime'), value: 'auditTime', type: 'input', readonly: true },
        { label: this.$t('recheckInfo.remark'), value: 'remark', type: 'textarea', disabled: true }
      ]
      // 明细数据
      this.diaFormInfo.subTableInfo.fieldList = [
        { label: '序号', type: 'seq', width: 50 },
        { prop: 'zoneName', label: this.$t('recheckInfo.dt.zoneId'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('recheckInfo.dt.lotCode'), minWidth: 100 },
        { prop: 'baseSku.skuCode', label: this.$t('recheckInfo.dt.skuCode'), minWidth: 100 },
        { prop: 'baseSku.barcode', label: this.$t('recheckInfo.dt.barcode'), minWidth: 100 },
        { prop: 'baseSku.skuName', label: this.$t('recheckInfo.dt.skuName'), minWidth: 100 },
        { prop: 'baseSku.tradeName', label: this.$t('recheckInfo.dt.tradeName'), minWidth: 100 },
        { prop: 'baseSku.spec', label: this.$t('recheckInfo.dt.spec'), minWidth: 100 },
        { prop: 'baseSku.mainUnit', label: this.$t('recheckInfo.dt.mainUnit'), minWidth: 100 },
        { prop: 'baseSku.perQty', label: this.$t('recheckInfo.dt.perQty'), minWidth: 100 },
        { prop: 'baseSku.drugForm', label: this.$t('recheckInfo.dt.drugForm'), minWidth: 100 },
        { prop: 'baseSku.mfgName', label: this.$t('recheckInfo.dt.mfgName'), minWidth: 100 },
        { prop: 'baseSku.originCountry', label: this.$t('recheckInfo.dt.originCountry'), minWidth: 100 },
        { prop: 'baseSku.approvalNumber', label: this.$t('recheckInfo.dt.approvalNumber'), minWidth: 100 },
        { prop: 'baseSku.brandName', label: this.$t('recheckInfo.dt.brandName'), minWidth: 100 },
        { prop: 'baseSku.tempControlName', label: this.$t('recheckInfo.dt.tempControlName'), minWidth: 100 },
        { prop: 'baseSku.validityDay', label: this.$t('recheckInfo.dt.validityDay'), minWidth: 100 },
        { prop: 'baseInvBatch.batchNo', label: this.$t('recheckInfo.dt.batchNo'), minWidth: 100 },
        { prop: 'baseInvBatch.productionBatch', label: this.$t('recheckInfo.dt.productionBatch'), minWidth: 100 },
        { prop: 'baseInvBatch.productionDate', label: this.$t('recheckInfo.dt.productionDate'), minWidth: 100 },
        { prop: 'baseInvBatch.instoreDate', label: this.$t('recheckInfo.dt.instoreDate'), minWidth: 100 },
        { prop: 'baseInvBatch.invalidDate', label: this.$t('recheckInfo.dt.invalidDate'), minWidth: 100 },
        { prop: 'baseInvBatch.sterileNo', label: this.$t('recheckInfo.dt.sterileNo'), minWidth: 100 },
        { prop: 'baseInvBatch.sterileInvaliDate', label: this.$t('recheckInfo.dt.sterileInvaliDate'), minWidth: 100 },
        { prop: 'recheckQty', label: this.$t('recheckInfo.dt.recheckQty'), minWidth: 100 },
        { prop: 'recheckModeName', label: this.$t('recheckInfo.dt.recheckMode'), minWidth: 100 },
        { prop: 'actualRecheckQty', label: this.$t('recheckInfo.dt.actualRecheckQty'), minWidth: 100 },
        { prop: 'goodQty', label: this.$t('recheckInfo.dt.goodQty'), minWidth: 100 },
        { prop: 'badQty', label: this.$t('recheckInfo.dt.badQty'), minWidth: 100 },
        { prop: 'checkResultName', label: this.$t('recheckInfo.dt.checkResult'), minWidth: 100 },
        { prop: 'dealMsg', label: this.$t('recheckInfo.dt.dealMsg'), minWidth: 100 },
        { prop: 'badReason', label: this.$t('recheckInfo.dt.badReason'), minWidth: 100 },
        { prop: 'remark', label: this.$t('recheckInfo.remark'), minWidth: 100 }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('recheckInfo.recheckInfoNo'), value: 'recheckInfoNo', type: 'input' },
        { label: this.$t('recheckInfo.ownerId'), value: 'ownerId', type: 'input' },
        { label: this.$t('recheckInfo.recheckInfoStatus'), value: 'recheckInfoStatus', type: 'input' },
        { label: this.$t('recheckInfo.recheckInfoDate'), value: 'recheckInfoDate', type: 'input' },
        { label: this.$t('recheckInfo.recheckId'), value: 'recheckId', type: 'input' },
        { label: this.$t('recheckInfo.recheckNo'), value: 'recheckNo', type: 'input' },
        { label: this.$t('recheckInfo.recheckUserNo'), value: 'recheckUserNo', type: 'input' },
        { label: this.$t('recheckInfo.recheckUserName'), value: 'recheckUserName', type: 'input' },
        { label: this.$t('recheckInfo.qcUserNo'), value: 'qcUserNo', type: 'input' },
        { label: this.$t('recheckInfo.qcUserName'), value: 'qcUserName', type: 'input' },
        { label: this.$t('recheckInfo.auditor'), value: 'auditor', type: 'input' },
        { label: this.$t('recheckInfo.auditorName'), value: 'auditorName', type: 'input' },
        { label: this.$t('recheckInfo.auditTime'), value: 'auditTime', type: 'input' },
        { label: this.$t('recheckInfo.unauditor'), value: 'unauditor', type: 'input' },
        { label: this.$t('recheckInfo.unauditorName'), value: 'unauditorName', type: 'input' },
        { label: this.$t('recheckInfo.unauditTime'), value: 'unauditTime', type: 'input' },
        { label: this.$t('recheckInfo.remark'), value: 'remark', type: 'input' },
        { label: this.$t('recheckInfo.creator'), value: 'creator', type: 'input' },
        { label: this.$t('recheckInfo.createName'), value: 'createName', type: 'input' },
        { label: this.$t('recheckInfo.createTime'), value: 'createTime', type: 'input' },
        { label: this.$t('recheckInfo.updater'), value: 'updater', type: 'input' },
        { label: this.$t('recheckInfo.updateName'), value: 'updateName', type: 'input' },
        { label: this.$t('recheckInfo.updateTime'), value: 'updateTime', type: 'input' },
        { label: this.$t('recheckInfo.optimistic'), value: 'optimistic', type: 'input' }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('recheckInfo.recheckInfoNo'), value: 'recheckInfoNo', type: 'input', readonly: true },
        { label: this.$t('recheckInfo.ownerId'), value: 'ownerName', type: 'input', readonly: true },
        { label: this.$t('recheckInfo.date'), value: 'recheckInfoDate', type: 'input', readonly: true },
        { label: this.$t('recheckInfo.maintainUserName'), value: 'recheckUserName', type: 'input', readonly: true },
        { label: this.$t('recheckInfo.qcUserName'), value: 'qcUserName', type: 'input', readonly: true },
        { label: this.$t('recheckInfo.recheckNo'), value: 'recheckNo', type: 'input', readonly: true },
        { label: this.$t('recheckInfo.recheckStatus'), value: 'recheckInfoStatusName', type: 'input', readonly: true },
        { label: this.$t('recheckInfo.createName'), value: 'createName', type: 'input', readonly: true },
        { label: this.$t('recheckInfo.createTime'), value: 'createTime', type: 'input', readonly: true },
        { label: this.$t('recheckInfo.auditorName'), value: 'auditorName', type: 'input', readonly: true },
        { label: this.$t('recheckInfo.auditTime'), value: 'auditTime', type: 'input', readonly: true },
        { label: this.$t('recheckInfo.remark'), value: 'remark', type: 'textarea' }
      ]
      // 明细数据
      this.diaFormInfo.subTableInfo.fieldList = [
        { label: '序号', type: 'index', width: 50 },
        { prop: 'zoneId', label: this.$t('recheckInfo.dt.zoneName'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('recheckInfo.dt.lotCode'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('recheckInfo.dt.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('recheckInfo.dt.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('recheckInfo.dt.skuName'), minWidth: 100 },
        { prop: 'tradeName', label: this.$t('recheckInfo.dt.tradeName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('recheckInfo.dt.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('recheckInfo.dt.mainUnit'), minWidth: 100 },
        { prop: 'perQty', label: this.$t('recheckInfo.dt.perQty'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('recheckInfo.dt.drugForm'), minWidth: 100 },
        { prop: 'mfgName', label: this.$t('recheckInfo.dt.mfgName'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('recheckInfo.dt.originCountry'), minWidth: 100 },
        { prop: 'approvalNumber', label: this.$t('recheckInfo.dt.approvalNumber'), minWidth: 100 },
        { prop: 'brandName', label: this.$t('recheckInfo.dt.brandName'), minWidth: 100 },
        { prop: 'tempControlName', label: this.$t('recheckInfo.dt.tempControlName'), minWidth: 100 },
        { prop: 'validityDay', label: this.$t('recheckInfo.dt.validityDay'), minWidth: 100 },
        { prop: 'recheckQty', label: this.$t('recheckInfo.dt.recheckQty'), minWidth: 100 },
        { prop: 'badReason', label: this.$t('recheckInfo.dt.badReason'), minWidth: 100 },
        { prop: 'remark', label: this.$t('recheckInfo.remark'), minWidth: 100 }
      ]
      // this.diaFormInfo.fieldList = [
      //   {label: this.$t('recheckInfo.companyCode'), value: "companyCode", type: "input"},
      //   {label: this.$t('recheckInfo.whId'), value: "whId", type: "input"},
      //   {label: this.$t('recheckInfo.recheckInfoNo'), value: "recheckInfoNo", type: "input"},
      //   {label: this.$t('recheckInfo.ownerId'), value: "ownerId", type: "input"},
      //   {label: this.$t('recheckInfo.recheckInfoStatus'), value: "recheckInfoStatus", type: "input"},
      //   {label: this.$t('recheckInfo.recheckInfoDate'), value: "recheckInfoDate", type: "input"},
      //   {label: this.$t('recheckInfo.recheckId'), value: "recheckId", type: "input"},
      //   {label: this.$t('recheckInfo.recheckNo'), value: "recheckNo", type: "input"},
      //   {label: this.$t('recheckInfo.recheckUserNo'), value: "recheckUserNo", type: "input"},
      //   {label: this.$t('recheckInfo.recheckUserName'), value: "recheckUserName", type: "input"},
      //   {label: this.$t('recheckInfo.qcUserNo'), value: "qcUserNo", type: "input"},
      //   {label: this.$t('recheckInfo.qcUserName'), value: "qcUserName", type: "input"},
      //   {label: this.$t('recheckInfo.auditor'), value: "auditor", type: "input"},
      //   {label: this.$t('recheckInfo.auditorName'), value: "auditorName", type: "input"},
      //   {label: this.$t('recheckInfo.auditTime'), value: "auditTime", type: "input"},
      //   {label: this.$t('recheckInfo.unauditor'), value: "unauditor", type: "input"},
      //   {label: this.$t('recheckInfo.unauditorName'), value: "unauditorName", type: "input"},
      //   {label: this.$t('recheckInfo.unauditTime'), value: "unauditTime", type: "input"},
      //   {label: this.$t('recheckInfo.remark'), value: "remark", type: "input"},
      //   {label: this.$t('recheckInfo.creator'), value: "creator", type: "input"},
      //   {label: this.$t('recheckInfo.createName'), value: "createName", type: "input"},
      //   {label: this.$t('recheckInfo.createTime'), value: "createTime", type: "input"},
      //   {label: this.$t('recheckInfo.updater'), value: "updater", type: "input"},
      //   {label: this.$t('recheckInfo.updateName'), value: "updateName", type: "input"},
      //   {label: this.$t('recheckInfo.updateTime'), value: "updateTime", type: "input"},
      //   {label: this.$t('recheckInfo.optimistic'), value: "optimistic", type: "input"},
      // ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        recheckNo: null,
        qcUserName: null,
        auditorName: null,
        ownerId: null,
        remark: null,
        updateName: null,
        updater: null,
        auditTime: null,
        optimistic: null,
        updateTime: null,
        recheckInfoDate: null,
        unauditorName: null,
        companyCode: null,
        id: null,
        unauditor: null,
        unauditTime: null,
        creator: null,
        recheckInfoNo: null,
        qcUserNo: null,
        createTime: null,
        auditor: null,
        recheckId: null,
        recheckUserName: null,
        whId: null,
        recheckUserNo: null,
        recheckInfoStatus: null,
        createName: null
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
