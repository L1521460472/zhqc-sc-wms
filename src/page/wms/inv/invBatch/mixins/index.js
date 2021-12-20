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
          batchNo: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px' // 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
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
            { label: this.$t('table.edit'), type: 'success', icon: '', event: 'openEditPage', show: true, disabled: this.$hasPerm('edit') } // event值为notification.js中定义的方法名
            // 默认删除按钮
            // {label:this.$t('table.delete'), type: 'danger', icon: '', event: 'deleteData', show: true,disabled:this.$hasPerm('delete')},//event值为notification.js中定义的方法名
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
    this.initTopFormColumns()// 初始化查询界面配置数据
    this.rulesInit()// 初始化diaFormInfo表单字段校验规则
  },
  methods: {
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化top表单
      this.topForm.fieldList = [
        { label: this.$t('invBatch.batchNo'), value: 'batchNo', type: 'input' },
        {
          type: 'button',
          label: '',
          btnlabel: this.$t('table.search'), // 查询按钮
          btType: 'primary',
          icon: 'el-icon-search',
          event: 'search', // event值为notification.js中定义的方法名
          show: true,
          disabled: this.$hasPerm('search')
        },
        {
          type: 'button',
          label: '',
          btnlabel: this.$t('table.reboot'), // 重置按钮
          btType: 'warning',
          icon: 'el-icon-refresh-left',
          event: 'reboot', // event值为notification.js中定义的方法名
          show: true,
          disabled: this.$hasPerm('search')
        }
      ]
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'batchNo', label: this.$t('invBatch.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('invBatch.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('invBatch.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('invBatch.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('invBatch.invalidDate'), minWidth: 100 },
        { prop: 'remark', label: this.$t('invBatch.remark'), minWidth: 100 },
        { prop: 'creator', label: this.$t('invBatch.creator'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('invBatch.createTime'), minWidth: 150 },
        { prop: 'updater', label: this.$t('invBatch.updater'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('invBatch.updateTime'), minWidth: 150 }
      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('invBatch.batchNo'), value: 'batchNo', type: 'input', readonly: true },
        { label: this.$t('invBatch.productionBatch'), value: 'productionBatch', type: 'input', readonly: true },
        { label: this.$t('invBatch.productionDate'), value: 'productionDate', type: 'input', readonly: true },
        { label: this.$t('invBatch.instoreDate'), value: 'instoreDate', type: 'input', readonly: true },
        { label: this.$t('invBatch.invalidDate'), value: 'invalidDate', type: 'input', readonly: true },
        { label: this.$t('invBatch.remark'), value: 'remark', type: 'input', readonly: true },
        { label: this.$t('invBatch.creator'), value: 'creator', type: 'input', readonly: true },
        { label: this.$t('invBatch.createTime'), value: 'createTime', type: 'input', readonly: true },
        { label: this.$t('invBatch.updater'), value: 'updater', type: 'input', readonly: true },
        { label: this.$t('invBatch.updateTime'), value: 'updateTime', type: 'input', readonly: true }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.diaFormInfo.fieldList = [
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('invBatch.batchNo'), value: 'batchNo', type: 'input', readonly: true },
        { label: this.$t('invBatch.productionBatch'), value: 'productionBatch', type: 'input' },
        { label: this.$t('invBatch.productionDate'), value: 'productionDate', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd' },
        { label: this.$t('invBatch.instoreDate'), value: 'instoreDate', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd' },
        { label: this.$t('invBatch.invalidDate'), value: 'invalidDate', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd' },
        { label: '调整原因', value: 'remark', type: 'input' },
        { label: this.$t('invBatch.creator'), value: 'creator', type: 'input', readonly: true },
        { label: this.$t('invBatch.createTime'), value: 'createTime', type: 'input', readonly: true },
        { label: this.$t('invBatch.updater'), value: 'updater', type: 'input', readonly: true },
        { label: this.$t('invBatch.updateTime'), value: 'updateTime', type: 'input', readonly: true }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {

        productionDate: [{ required: true, message: this.$t('invBatch.msg.productionDate'), trigger: 'blur' }],
        remark: [{ required: true, message: this.$t('invBatch.msg.remark'), trigger: 'blur' }],
        invalidDate: [{ required: true, message: this.$t('invBatch.msg.invalidDate'), trigger: 'blur' }],
        batchNo: [{ required: true, message: this.$t('invBatch.msg.batchNo'), trigger: 'blur' }],
        productionBatch: [{ required: true, message: this.$t('invBatch.msg.productionBatch'), trigger: 'blur' }],
        instoreDate: [{ required: true, message: this.$t('invBatch.msg.instoreDate'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        lotTwo: null,
        productionDate: null,
        batchNoKey: null,
        remark: null,
        sterileInvaliDate: null,
        updater: null,
        lotFive: null,
        optimistic: null,
        lotEight: null,
        updateTime: null,
        invalidDate: null,
        lotNine: null,
        companyCode: null,
        id: null,
        invBatchRuleId: null,
        creator: null,
        lotOne: null,
        batchNo: null,
        createTime: null,
        sterileNo: null,
        asnNo: null,
        lotSeven: null,
        productionBatch: null,
        lotSix: null,
        whId: null,
        lotThree: null,
        lotTen: null,
        lotFour: null,
        instoreDate: null,
        po: null
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
