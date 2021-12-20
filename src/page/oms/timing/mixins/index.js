import notification from './notification'
export default {
  mixins: [notification],
  data() {
    return {
      // 主页面的top表单
      topForm: { //  yuan
        ref: null, // 对外提供的可操作表单的持有对象
        fieldList: null, // 配置的表单字段集合
        data: { // 表单绑定的数据Model
          carrierOrderNo: null,
          carrierSysCode: null,
          customerOrderNo: null,
          orderType: null,
          scOrderNo: null,
          orderStatus: null,
          executionStatus: null,
          confirmTimeBegin: null,
          confirmTimeEnd: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        carrierCode: [],
        executionStatus: [],
        orderType: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '150', // 默认操作按钮列宽度
          btList: [// 添加操作按钮
            // 默认查看按钮
            { label: this.$t('table.view'), type: 'primary', icon: '', event: 'openViewPage', show: false, disabled: this.$hasPerm('view') }, // event值为notification.js中定义的方法名
            // 自定义按钮
            { slot: true, icon: '', event: 'slotEvent' }// event值为notification.js中定义的方法名
            // {label:'生成SO', type: 'success', icon: '', event: 'createSO', show: true,disabled:this.$hasPerm('create_so')},//event值为notification.js中定义的方法名
          ]
        }
      },
      // 弹窗表单
      diaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {

        }, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        dtTableInfo: {
          ref: null,
          data: [],
          deleteIds: [],
          fieldList: [],
          topBtn: { label: '添加订单明细', show: true, type: 'primary', disabled: false, loading: false, event: 'openAddDtPage' },
          handle: { // 表格自定义按钮
            fixed: 'right',
            label: this.$t('table.actions'), // 操作列名
            width: '100', // 默认操作按钮列宽度
            show: true,
            btList: [// 添加操作按钮
              // 默认删除按钮
              { label: this.$t('table.delete'), type: 'danger', icon: '', event: 'deleteDt', show: true, disabled: false }// event值为notification.js中定义的方法名
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
    this.collapsableForm()// 初始化表单
    this.initTopFormColumns()// 初始化查询界面配置数据
    // this.rulesInit();//初始化diaFormInfo表单字段校验规则
  },
  methods: {
    // 展开收起表单
    collapsableFormMore() {
      this.topForm.fieldList = [
        { label: this.$t('timing.carrierOrderNo'), value: 'carrierOrderNo', type: 'input' },
        { label: this.$t('timing.carrierSysCode'), value: 'carrierSysCode', type: 'select', list: 'carrierCode' },
        { label: this.$t('timing.customerOrderNo'), value: 'customerOrderNo', type: 'input', list: 'scorderTypeList' },
        { label: this.$t('timing.orderType'), value: 'orderType', type: 'select', list: 'orderType' },
        { label: this.$t('timing.scOrderNo'), value: 'scOrderNo', type: 'input', list: 'reissue' },
        { label: this.$t('timing.executionStatus'), value: 'executionStatus', type: 'select', list: 'executionStatus' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    // 展开收起表单
    collapsableForm() {
      this.topForm.fieldList = [
        { label: this.$t('timing.carrierOrderNo'), value: 'carrierOrderNo', type: 'input' },
        { label: this.$t('timing.customerOrderNo'), value: 'customerOrderNo', type: 'input' },
        { label: this.$t('timing.scOrderNo'), value: 'scOrderNo', type: 'input' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'selection', width: 50, fixed: 'left' }, // 选项框
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'carrierOrderNo', label: this.$t('timing.carrierOrderNo'), minWidth: 140 },
        { prop: 'carrierSysCode', label: this.$t('timing.carrierSysCode'), minWidth: 100 },
        { prop: 'carrierWhCode', label: this.$t('timing.carrierWhCode'), minWidth: 100 },
        { prop: 'customerOrderNo', label: this.$t('timing.customerOrderNo'), minWidth: 140 },
        { prop: 'scOrderNo', label: this.$t('timing.scOrderNo'), minWidth: 140 },
        { prop: 'orderType', type: 'slot', label: this.$t('timing.orderType'), value: 'orderType', minWidth: 90 },
        { prop: 'status', type: 'slot', label: this.$t('timing.status'), value: 'status', minWidth: 100 },
        { prop: 'executionCount', label: this.$t('timing.executionCount'), minWidth: 60 },
        { prop: 'executionErrorCount', label: this.$t('timing.executionErrorCount'), minWidth: 60 },
        { prop: 'executionStatus', type: 'slot', label: this.$t('timing.executionStatus'), value: 'executionStatus', minWidth: 100 },
        { prop: 'executionMsg', label: this.$t('timing.executionMsg'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('timing.createTime'), minWidth: 100 },
        { prop: 'executionDate', label: this.$t('timing.executionDate'), minWidth: 100 }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {

    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      // this.diaFormInfo.data = {
      //   partnerName: null,
      //   carrierName: null,
      //   createTime:null,
      //   cusOrderNo: null,
      //   isSelf: null,
      //   payWay: null,
      //   cardNo: null,
      //   scOrderType: null,
      //   scBusinessType: null,
      //   reissue: null,
      //   responsibility: null,
      //   oldNum: null,
      //   ownerId: null,
      //   storeName: null,
      //   shipper: null,
      //   shippingContact: null,
      //   shippingTel: null,
      //   receivingProvince: null,
      //   receivingCity: null,
      //   receivingArea: null,
      //   receivingAddr: null,
      //   consignee: null,
      //   consigneeContact: null,
      //   consigneeTel: null,
      //   courierName: null,
      //   shippingDate: null,
      //   receivingDate: null,
      //   remark: null,
      // }
      // this.diaFormInfo.dtTableInfo.data=[];
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
