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
          ncrNo: null,
          ncrStatus: null,
          ownerId: null,
          qcUserName: null,
          ncrDateBegin: null,
          ncrDateEnd: null,
          auditorName: null,
          createName: null,
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
        recheckStatusList: null
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '350', // 默认操作按钮列宽度
          btList: [// 添加操作按钮
            // 默认查看按钮
            { label: this.$t('table.view'), type: 'primary', icon: '', event: 'openViewPage', show: true, disabled: this.$hasPerm('view') }, // event值为notification.js中定义的方法名
            // 默认修改按钮
            { label: this.$t('table.edit'), type: 'success', icon: '', event: 'openEditPage', show: true, disabled: this.$hasPerm('edit') }, // event值为notification.js中定义的方法名
            { label: this.$t('recheck.audit'), type: 'info', icon: '', event: 'audit', show: true, disabled: this.$hasPerm('edit') }, // event值为notification.js中定义的方法名
            { label: this.$t('recheck.cancelAudit'), type: 'warning', icon: '', event: 'cancelAudit', show: true, disabled: this.$hasPerm('edit') }, // event值为notification.js中定义的方法名
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
        { label: this.$t('ncr.ncrNo'), value: 'ncrNo', type: 'input' },
        { label: this.$t('ncr.ncrStatus'), value: 'ncrStatus', type: 'select', list: 'recheckStatusList' },
        { label: this.$t('ncr.ownerId'), value: 'ownerId', type: 'slot' },
        { label: this.$t('ncr.qcUserName'), value: 'qcUserName', type: 'input' },
        { label: this.$t('ncr.ncrDateBegin'), value: 'ncrDateBegin', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('ncr.ncrDateEnd'), value: 'ncrDateEnd', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('ncr.auditorName'), value: 'auditorName', type: 'input' },
        { label: this.$t('ncr.createName'), value: 'createName', type: 'input' },
        { label: this.$t('ncr.createTimeBegin'), value: 'createTimeBegin', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('ncr.createTimeEnd'), value: 'createTimeEnd', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('ncr.auditTimeBegin'), value: 'auditTimeBegin', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('ncr.auditTimeEnd'), value: 'auditTimeEnd', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('ncr.ncrNo'), value: 'ncrNo', type: 'input' },
        { label: this.$t('ncr.ncrStatus'), value: 'ncrStatus', type: 'select', list: 'recheckStatusList' },
        { label: this.$t('ncr.ownerId'), value: 'ownerId', type: 'slot' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },

    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'ncrNo', label: this.$t('ncr.ncrNo'), minWidth: 160 },
        { prop: 'ncrStatusName', label: this.$t('ncr.ncrStatus'), minWidth: 100 },
        { prop: 'ncrDate', label: this.$t('ncr.ncrDate'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('ncr.ownerId'), minWidth: 150 },
        { prop: 'qcUserName', label: this.$t('ncr.qcUserName'), minWidth: 100 },
        { prop: 'recheckInfoNo', label: this.$t('ncr.recheckInfoNo'), minWidth: 150 },
        { prop: 'createName', label: this.$t('ncr.createName'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('ncr.createTime'), minWidth: 100 },
        { prop: 'auditorName', label: this.$t('ncr.auditorName'), minWidth: 100 },
        { prop: 'auditTime', label: this.$t('ncr.auditTime'), minWidth: 100 },
        { prop: 'unauditorName', label: this.$t('ncr.unauditorName'), minWidth: 100 },
        { prop: 'unauditTime', label: this.$t('ncr.unauditTime'), minWidth: 100 },
        { prop: 'replyUser', label: this.$t('ncr.replyUser'), minWidth: 100 },
        { prop: 'replyDept', label: this.$t('ncr.replyDept'), minWidth: 100 },
        { prop: 'replyNotes', label: this.$t('ncr.replyNotes'), minWidth: 100 },
        { prop: 'remark', label: this.$t('ncr.remark'), minWidth: 100 },
        { label: '操作', value: 'status', width: 270, type: 'slot', fixed: 'right' }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('ncr.ncrNo'), value: 'ncrNo', type: 'input', readonly: true },
        { label: this.$t('ncr.ownerId'), value: 'ownerName', type: 'input', readonly: true },
        { label: this.$t('ncr.ncrDate'), value: 'ncrDate', type: 'input', readonly: true },
        { label: this.$t('ncr.qcUserName'), value: 'qcUserName', type: 'input', readonly: true },
        { label: this.$t('ncr.recheckInfoNo'), value: 'recheckInfoNo', type: 'input', readonly: true },
        { label: this.$t('ncr.ncrStatus'), value: 'ncrStatusName', type: 'input', readonly: true },
        { label: this.$t('ncr.createName'), value: 'createName', type: 'input', readonly: true },
        { label: this.$t('ncr.createTime'), value: 'createTime', type: 'input', readonly: true },
        { label: this.$t('ncr.auditorName'), value: 'auditorName', type: 'input', readonly: true },
        { label: this.$t('ncr.auditTime'), value: 'auditTime', type: 'input', readonly: true },
        { label: this.$t('ncr.remark'), value: 'remark', type: 'textarea', disabled: true }
      ]
      // 明细数据
      this.diaFormInfo.subTableInfo.fieldList = [
        { label: '序号', type: 'index', width: 50 },
        { prop: 'zoneName', label: this.$t('recheck.dt.zoneId'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('recheck.dt.lotCode'), minWidth: 100 },
        { prop: 'baseSku.skuCode', label: this.$t('recheck.dt.skuCode'), minWidth: 100 },
        { prop: 'baseSku.barcode', label: this.$t('recheck.dt.barcode'), minWidth: 100 },
        { prop: 'baseSku.skuName', label: this.$t('recheck.dt.skuName'), minWidth: 100 },
        { prop: 'baseSku.tradeName', label: this.$t('recheck.dt.tradeName'), minWidth: 100 },
        { prop: 'baseSku.spec', label: this.$t('recheck.dt.spec'), minWidth: 100 },
        { prop: 'baseSku.mainUnit', label: this.$t('recheck.dt.mainUnit'), minWidth: 100 },
        { prop: 'baseSku.drugForm', label: this.$t('recheck.dt.drugForm'), minWidth: 100 },
        { prop: 'baseSku.mfgName', label: this.$t('recheck.dt.mfgName'), minWidth: 100 },
        { prop: 'baseSku.originCountry', label: this.$t('recheck.dt.originCountry'), minWidth: 100 },
        { prop: 'baseSku.approvalNumber', label: this.$t('recheck.dt.approvalNumber'), minWidth: 100 },
        { prop: 'baseSku.brandName', label: this.$t('recheck.dt.brandName'), minWidth: 100 },
        { prop: 'baseSku.tempControlName', label: this.$t('recheck.dt.tempControlName'), minWidth: 100 },
        { prop: 'baseSku.validityDay', label: this.$t('recheck.dt.validityDay'), minWidth: 100 },
        { prop: 'baseInvBatch.batchNo', label: this.$t('recheck.dt.batchNo'), minWidth: 100 },
        { prop: 'baseInvBatch.productionBatch', label: this.$t('recheck.dt.productionBatch'), minWidth: 100 },
        { prop: 'baseInvBatch.productionDate', label: this.$t('recheck.dt.productionDate'), minWidth: 100 },
        { prop: 'baseInvBatch.instoreDate', label: this.$t('recheck.dt.instoreDate'), minWidth: 100 },
        { prop: 'baseInvBatch.invalidDate', label: this.$t('recheck.dt.invalidDate'), minWidth: 100 },
        { prop: 'baseInvBatch.sterileNo', label: this.$t('recheck.dt.sterileNo'), minWidth: 100 },
        { prop: 'baseInvBatch.sterileInvaliDate', label: this.$t('recheck.dt.sterileInvaliDate'), minWidth: 100 },
        { prop: 'recheckQty', label: this.$t('ncr.dt.recheckQty'), minWidth: 100 },
        { prop: 'badQty', label: this.$t('ncr.dt.badQty'), minWidth: 100 },
        { prop: 'badReason', label: this.$t('ncr.dt.badReason'), minWidth: 100 },
        { prop: 'dealMsg', label: this.$t('ncr.dt.dealMsg'), minWidth: 100 },
        { prop: 'dealUserName', label: this.$t('ncr.dt.dealUserName'), minWidth: 100 },
        { prop: 'dealReslut', label: this.$t('ncr.dt.dealReslut'), minWidth: 100 }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('ncr.ncrNo'), value: 'ncrNo', type: 'input', readonly: true },
        { label: this.$t('ncr.ownerId'), value: 'ownerName', type: 'input', readonly: true },
        { label: this.$t('ncr.ncrDate'), value: 'ncrDate', type: 'input', readonly: true },
        { label: this.$t('ncr.qcUserName'), value: 'qcUserName', type: 'input', readonly: true },
        { label: this.$t('ncr.recheckInfoNo'), value: 'recheckInfoNo', type: 'input', readonly: true },
        { label: this.$t('ncr.ncrStatus'), value: 'ncrStatusName', type: 'input', readonly: true },
        { label: this.$t('ncr.createName'), value: 'createName', type: 'input', readonly: true },
        { label: this.$t('ncr.createTime'), value: 'createTime', type: 'input', readonly: true },
        { label: this.$t('ncr.auditorName'), value: 'auditorName', type: 'input', readonly: true },
        { label: this.$t('ncr.auditTime'), value: 'auditTime', type: 'input', readonly: true },
        { label: this.$t('ncr.remark'), value: 'remark', type: 'textarea' }
      ]
      // 明细数据
      this.diaFormInfo.subTableInfo.fieldList = [
        { label: '序号', type: 'seq', width: 50 },
        { prop: 'zoneName', label: this.$t('recheck.dt.zoneId'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('recheck.dt.lotCode'), minWidth: 100 },
        { prop: 'baseSku.skuCode', label: this.$t('recheck.dt.skuCode'), minWidth: 100 },
        { prop: 'baseSku.barcode', label: this.$t('recheck.dt.barcode'), minWidth: 100 },
        { prop: 'baseSku.skuName', label: this.$t('recheck.dt.skuName'), minWidth: 100 },
        { prop: 'baseSku.tradeName', label: this.$t('recheck.dt.tradeName'), minWidth: 100 },
        { prop: 'baseSku.spec', label: this.$t('recheck.dt.spec'), minWidth: 100 },
        { prop: 'baseSku.mainUnit', label: this.$t('recheck.dt.mainUnit'), minWidth: 100 },
        { prop: 'baseSku.drugForm', label: this.$t('recheck.dt.drugForm'), minWidth: 100 },
        { prop: 'baseSku.mfgName', label: this.$t('recheck.dt.mfgName'), minWidth: 100 },
        { prop: 'baseSku.originCountry', label: this.$t('recheck.dt.originCountry'), minWidth: 100 },
        { prop: 'baseSku.approvalNumber', label: this.$t('recheck.dt.approvalNumber'), minWidth: 100 },
        { prop: 'baseSku.brandName', label: this.$t('recheck.dt.brandName'), minWidth: 100 },
        { prop: 'baseSku.tempControlName', label: this.$t('recheck.dt.tempControlName'), minWidth: 100 },
        { prop: 'baseSku.validityDay', label: this.$t('recheck.dt.validityDay'), minWidth: 100 },
        { prop: 'baseInvBatch.batchNo', label: this.$t('recheck.dt.batchNo'), minWidth: 100 },
        { prop: 'baseInvBatch.productionBatch', label: this.$t('recheck.dt.productionBatch'), minWidth: 100 },
        { prop: 'baseInvBatch.productionDate', label: this.$t('recheck.dt.productionDate'), minWidth: 100 },
        { prop: 'baseInvBatch.instoreDate', label: this.$t('recheck.dt.instoreDate'), minWidth: 100 },
        { prop: 'baseInvBatch.invalidDate', label: this.$t('recheck.dt.invalidDate'), minWidth: 100 },
        { prop: 'baseInvBatch.sterileNo', label: this.$t('recheck.dt.sterileNo'), minWidth: 100 },
        { prop: 'baseInvBatch.sterileInvaliDate', label: this.$t('recheck.dt.sterileInvaliDate'), minWidth: 100 },
        { prop: 'recheckQty', label: this.$t('ncr.dt.recheckQty'), minWidth: 100 },
        { prop: 'badQty', label: this.$t('ncr.dt.badQty'), minWidth: 100 },
        { prop: 'badReason', label: this.$t('ncr.dt.badReason'), minWidth: 100 },
        { prop: 'dealMsg', label: this.$t('ncr.dt.dealMsg'), minWidth: 100 },
        { prop: 'dealUserName', label: this.$t('ncr.dt.dealUserName'), minWidth: 100, edit: { 'name': 'input' }},
        { prop: 'dealReslut', label: this.$t('ncr.dt.dealReslut'), minWidth: 100, edit: { 'name': 'input' }}
      ]
      //
    /*  this.diaFormInfo.subTableInfo.handle = {//表格自定义按钮
        fixed: 'right',
        label: this.$t('table.actions'),//操作列名
        width: '100',//默认操作按钮列宽度
        btList: [//添加操作按钮
          //默认删除按钮
          {
            label: this.$t('table.delete'),
            type: 'danger',
            icon: '',
            event: 'deleteDt',
            show: true,
            disabled: false,
          },//event值为notification.js中定义的方法名
        ]
      };*/
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        // ownerId:[{required: true, message: this.$t('recheck.msg.ownerId'), trigger: 'blur'}],
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        recheckNo: null,
        ownerId: null,
        recheckDate: null,
        maintainUserName: null,
        qcUserName: null,
        remark: null,
        frozenNo: null,
        recheckStatus: null,
        createName: null,
        createTime: null,
        unauditorName: null,
        unauditTime: null
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
