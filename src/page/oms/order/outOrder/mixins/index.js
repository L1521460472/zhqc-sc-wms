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
          outOrderNo: null,
          cusOrderNo: null,
          cardNo: null,
          returnCourierNum: null,
          scOrderType: null,
          scBusinessType: null,
          whetherToReissue: null,
          origOrderCode: null,
          orderOrig: null,
          orderOrigName: null,
          orderStatus: null,
          ownerId: null,
          ownerName: null,
          shipper: null,
          shipperName: null,
          consignee: null,
          consigneeName: null,
          customerId: null,
          creator: null,
          confirmTimeBegin: null,
          confirmTimeEnd: null,
          createTimeFrom: null,
          createTimeTo: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        reissue: [],
        scorderTypeList: [],
        dischargeTypeList: [],
        companyList: [],
        scbusinessTypeList: [],
        dutyPartitionList: '',
        whetherToReissueList: [],
        orderOrigList: [],
        deliveryTypeList: [],
        methodOfPaymentList: [],
        orderStatusList: [],
        whetherList: [],
        countryList: [],
        provinceIdList: [],
        cityIdList: [],
        areaIdList: [],
        isHasInvoiceList: [],
        isPrescriptionList: [],
        responsibility: [],
        ordersType: [],
        orderDtUnitTypeList: []
      },
      // 主页面表格
      tableInfo: {
        ref: null,
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '240', // 默认操作按钮列宽度
          btList: [// 添加操作按钮
            // 默认查看按钮
            // { label: this.$t('table.view'), type: 'primary', icon: '', event: 'openViewPage', show: true, disabled: this.$hasPerm('view') }, // event值为notification.js中定义的方法名
            // { label: this.$t('table.edit'), type: 'success', icon: '', event: 'openEditPage', show: true, disabled: this.$hasPerm('edit') }, // event值为notification.js中定义的方法名
            // { label: '下发', type: 'success', icon: '', event: 'handleCreateSo', show: true }, // event值为notification.js中定义的方法名, disabled: this.$hasPerm('create_so')
            // { label: this.$t('table.cancel'), type: 'danger', icon: '', event: 'handleCancel', show: true, disabled: this.$hasPerm('cancel') }, // event值为notification.js中定义的方法名
            // { label: this.$t('table.delete'), type: 'danger', icon: '', event: 'handleDelete', show: true } // event值为notification.js中定义的方法名, disabled: this.$hasPerm('delete')
            // 自定义按钮
            { slot: true, icon: '', event: 'slotEvent' } // event值为notification.js中定义的方法名
            // { label: '生成SO', type: 'warning', icon: '', event: 'createSO', show: true, disabled: this.$hasPerm('create_so') } // event值为notification.js中定义的方法名
          ]
        }
      },
      // 弹窗表单
      diaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {
          partnerId: null,
          partnerName: null,
          carrierName: null,
          createTime: null,
          cusOrderNo: null,
          operationDate: null,
          consigneeId: null,
          isSelf: null,
          payWay: null,
          returnCourierNum: null,
          scOrderType: null,
          scBusinessType: null,
          reissue: null,
          responsibility: null,
          oldNum: null,
          ownerId: null,
          storeName: null,
          shipper: null,
          shippingContact: null,
          shippingTel: null,
          receivingProvince: null,
          receivingCity: null,
          receivingArea: null,
          receivingAddr: null,
          consignee: null,
          consigneeContact: null,
          consigneeTel: null,
          courierName: null,
          shippingDate: null,
          receivingDate: null,
          remark: null

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
        { label: this.$t('outOrder.outOrderNo'), value: 'outOrderNo', type: 'input' },
        { label: this.$t('outOrder.cusOrderNo'), value: 'cusOrderNo', type: 'input' },
        { label: this.$t('outOrder.cardNo'), value: 'cardNo', type: 'input' },
        { label: this.$t('outOrder.scOrderTypeName'), value: 'scOrderType', type: 'select', list: 'scorderTypeList' },
        // { label: this.$t('outOrder.orderType'), value: 'scBusinessType', type: 'select', list: 'scbusinessTypeList', filterable: true },
        // { label: this.$t('outOrder.whetherToReissue'), value: 'isReissue', type: 'select', list: 'reissue' },
        // { label: this.$t('outOrder.origOrderCode'), value: 'origOrderCode', type: 'input' },
        { label: this.$t('outOrder.orderOrigName'), value: 'orderOrig', type: 'select', list: 'orderOrigList' },
        { label: this.$t('outOrder.orderStatus'), value: 'orderStatus', type: 'select', list: 'orderStatusList' },
        { label: this.$t('outOrder.owner'), value: 'ownerId', type: 'slot' },
        { label: this.$t('outOrder.whId'), value: 'shipper', type: 'slot' },
        { label: this.$t('outOrder.reWhId'), value: 'consignee', link: 'consigneeName', type: 'slot' },
        { label: this.$t('outOrder.customerId'), value: 'customerId', type: 'slot' },
        { label: this.$t('outOrder.creator'), value: 'creator', type: 'input' },
        { label: this.$t('outOrder.createTimeFrom'), value: 'createTimeFrom', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('outOrder.createTimeTo'), value: 'createTimeTo', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('outOrder.operationDateBegin'), value: 'confirmTimeBegin', type: 'date' },
        { label: this.$t('outOrder.operationDateEnd'), value: 'confirmTimeEnd', type: 'date' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    // 展开收起表单
    collapsableForm() {
      this.topForm.fieldList = [
        { label: this.$t('outOrder.outOrderNo'), value: 'outOrderNo', type: 'input' },
        { label: this.$t('outOrder.cusOrderNo'), value: 'cusOrderNo', type: 'input' },
        { label: this.$t('outOrder.cardNo'), value: 'cardNo', type: 'input' },
        // { label: this.$t('outOrder.scorderType'), value: 'scOrderType', type: 'select', list: 'scorderTypeList' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
      this.topForm.data.ownerId = null
      this.topForm.data.shipper = null
      this.topForm.data.consignee = null
    },
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      // this.tableInfo.fieldList = [
      //   { label: this.$t('table.id'), type: 'selection', width: 50, fixed: 'left' }, // 选项框
      //   { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
      //   // { prop: 'operationDate', label: this.$t('outOrder.operationDate'), minWidth: 140 },
      //   { prop: 'outOrderNo', label: this.$t('outOrder.outOrderNo'), minWidth: 140 },
      //   { prop: 'cusOrderNo', label: this.$t('outOrder.cusOrderNo'), minWidth: 140 },
      //   { prop: 'cardNo', label: this.$t('outOrder.DeliveryOrderNo'), minWidth: 140 },
      //   { prop: 'scOrderTypeName', label: this.$t('outOrder.scorderType'), minWidth: 140 },
      //   { prop: 'orderStatusName', label: this.$t('outOrder.orderStatusName'), minWidth: 100 },
      //   { prop: 'orderOrigName', label: this.$t('outOrder.orderOrig'), minWidth: 100 },
      //   // { prop: 'scBusinessTypeName', label: this.$t('outOrder.orderTypeName'), minWidth: 100 },
      //   // { prop: 'isReissueName', label: this.$t('outOrder.whetherToReissue'), minWidth: 100 },
      //   // { prop: 'origOrderCode', label: this.$t('outOrder.origOrderCode'), minWidth: 120 },
      //   { prop: 'ownerName', label: this.$t('outOrder.ownerName'), minWidth: 100 },
      //   { prop: 'shipper', label: this.$t('outOrder.whName'), minWidth: 100 },
      //   { prop: 'consignee', label: this.$t('outOrder.reWhName'), minWidth: 100 },
      //   { prop: 'customerName', label: this.$t('outOrder.customerName'), minWidth: 100 },
      //   { prop: 'remark', label: this.$t('outOrder.remark'), minWidth: 100 },
      //   { prop: 'isVirtureAllotStr', label: this.$t('outOrder.virtualAllocation'), minWidth: 100 },
      //   { prop: 'errorInfo', label: this.$t('outOrder.exceptionDescription'), minWidth: 100 },
      //   { prop: 'interfaceStatus', label: this.$t('outOrder.interfaceStatus'), minWidth: 100 },
      //   { prop: 'creator', label: this.$t('outOrder.creator'), minWidth: 100 }
      //   // { prop: 'createTime', label: this.$t('outOrder.createTime'), minWidth: 140 },
      //   // { prop: 'updater', label: this.$t('outOrder.updater'), minWidth: 100 },
      //   // { prop: 'updateTime', label: this.$t('outOrder.updateTime'), minWidth: 140 }
      // ]

      // 初始化新增产品表单
      this.diaFormInfoDt.fieldList = [
        { label: this.$t('sku.skuName'), value: 'skuName', type: 'slot' },
        { label: this.$t('sku.skuCode'), value: 'skuCode', type: 'input', disabled: true },
        { label: this.$t('sku.barcode'), value: 'barcode', type: 'input', disabled: true },
        { label: this.$t('sku.spec'), value: 'spec', type: 'input', disabled: true },
        { label: this.$t('outOrder.dt.mainUnit'), value: 'mainUnitName', type: 'select', list: 'orderDtUnitTypeList' },
        { label: this.$t('outOrder.dt.extOne'), value: 'extOne', type: 'number', min: 1, precision: 0 },
        { label: this.$t('outOrder.dt.outOrderQty'), value: 'outOrderQty', type: 'input', disabled: true },
        { label: this.$t('outOrder.dt.vol'), value: 'volDec', type: 'input' },
        { label: this.$t('outOrder.dt.grossWeight'), value: 'grossWeightKg', type: 'input' },
        { label: this.$t('outOrder.dt.amountDec'), value: 'amountDec', type: 'input' },
        { label: this.$t('outOrder.dt.batchNo'), value: 'batchNo', type: 'input' },
        { label: this.$t('outOrder.dt.batchNumber'), value: 'productionBatch', type: 'input' },
        { label: this.$t('outOrder.dt.productionDate'), value: 'productionDate', type: 'date', dateType: 'date' },
        { label: this.$t('outOrder.dt.invalidDate'), value: 'invalidDate', type: 'date', dateType: 'date' },
        { label: this.$t('outOrder.dt.remark'), value: 'remark', type: 'input' }
      ]
    },
    initTableInfo() {
      const list = [

        { label: this.$t('table.selection'), type: 'selection', prop: 'selection', width: 50, fixed: 'left' }, // 选项框
        { label: this.$t('table.id'), type: 'index', prop: 'id', width: 50 }, // 序列
        { prop: 'outOrderNo', label: this.$t('outOrder.outOrderNo'), minWidth: 130 },
        { prop: 'cusOrderNo', label: this.$t('outOrder.cusOrderNo'), minWidth: 100 },
        { prop: 'cardNo', label: this.$t('outOrder.cardNo'), minWidth: 100 },
        { prop: 'scOrderTypeName', label: this.$t('outOrder.scOrderTypeName'), minWidth: 100 },
        { prop: 'orderStatusName', label: this.$t('outOrder.orderStatusName'), minWidth: 100 },
        { prop: 'orderOrigName', label: this.$t('outOrder.orderOrigName'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('outOrder.ownerName'), minWidth: 100 },
        { prop: 'shipperName', label: this.$t('outOrder.shipper'), minWidth: 100 },
        { prop: 'consigneeName', label: this.$t('outOrder.consignee'), minWidth: 100 },
        { prop: 'customerName', label: this.$t('outOrder.customerName'), minWidth: 100 },
        { prop: 'remark', label: this.$t('outOrder.remark'), minWidth: 100 },
        { prop: 'isVirtureAllotStr', label: this.$t('outOrder.isVirtureAllotStr'), minWidth: 100 },
        { prop: 'errorInfo', label: this.$t('outOrder.errorInfo'), minWidth: 100 },
        { prop: 'outStatusStr', label: this.$t('outOrder.interfaceStatus'), minWidth: 100 },
        { prop: 'creator', label: this.$t('outOrder.creator'), minWidth: 100 },
        // { prop: 'createTime', label: this.$t('outOrder.createTime'), minWidth: 140 },
        // { prop: 'updater', label: this.$t('outOrder.updater'), minWidth: 100 },
        // { prop: 'updateTime', label: this.$t('outOrder.updateTime'), minWidth: 140 },
        { label: '操作', value: 'status', width: 200, type: 'slot', fixed: 'right', align: 'left' }
      ]
      return this.iniTableConfig(list)
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('outOrder.operationDate'), value: 'operationDate', type: 'date', disabled: true }, // 操作日期
        { label: this.$t('outOrder.owner'), value: 'ownerName', type: 'input', disabled: true },
        { label: this.$t('outOrder.scOrderTypeName'), value: 'scOrderType', type: 'select', list: 'scorderTypeList', disabled: true },
        // { label: this.$t('outOrder.orderType'), value: 'scBusinessType', type: 'select', list: 'scbusinessTypeList' },
        { label: this.$t('outOrder.cusOrderNo'), value: 'cusOrderNo', type: 'input', disabled: true },
        { label: this.$t('outOrder.cardNo'), value: 'cardNo', type: 'input', disabled: true },
        { label: this.$t('outOrder.origOrderCode'), value: 'origOrderCode', type: 'input', disabled: true },
        // { label: this.$t('outOrder.whetherToReissue'), value: 'isReissue', type: 'select', list: 'reissue', event: 'selectWhetherToReissue' }, // 是否补发
        // { label: this.$t('outOrder.originalNumber'), value: 'oldNum', type: 'input' },
        // { label: this.$t('outOrder.dutyPartition'), value: 'responsibility', type: 'select', list: 'responsibility' },
        { label: this.$t('outOrder.isSelf'), value: 'isSelf', type: 'select', list: 'deliveryTypeList', disabled: true },
        // { label: this.$t('outOrder.methodOfPayment'), value: 'payWay', type: 'select', list: 'methodOfPaymentList' }, // 支付方式
        { label: this.$t('outOrder.whId'), value: 'shipperName', type: 'input', disabled: true }, // 发货方
        // { label: this.$t('outOrder.partnerStoreId'), value: 'storeName', type: 'slot' },
        // { label: this.$t('outOrder.shippingContact'), value: 'shippingContact', type: 'input' }, // 发货联系人
        // { label: this.$t('outOrder.deliveryContactInformation'), value: 'shippingTel', type: 'input' },
        { label: this.$t('outOrder.reWhId'), value: 'consigneeName', type: 'input', disabled: true },
        { label: this.$t('outOrder.customerId'), value: 'customerId', type: 'slot', disabled: true },
        // { label: this.$t('outOrder.receivingParty'), value: 'consignee', type: 'input', disabled: true },
        { label: this.$t('outOrder.receivingContact'), value: 'consigneeContact', type: 'input', disabled: true },
        { label: this.$t('outOrder.receivingContactWay'), value: 'consigneeTel', type: 'input', disabled: true },

        { label: this.$t('outOrder.receivingProvinces'), value: 'receivingProvince', type: 'slot', disabled: true },
        { label: this.$t('outOrder.receivingCity'), value: 'receivingCity', type: 'slot', disabled: true },
        { label: this.$t('outOrder.receivingArea'), value: 'receivingArea', type: 'slot', disabled: true },
        // { label: this.$t('outOrder.receivingAddress'), value: 'receivingAddr', type: 'input', disabled: true, className: 'outOrderView_recAddrShowAll' },
        { label: this.$t('outOrder.receivingAddress'), value: 'receivingAddr', type: 'input', disabled: true },
        { label: this.$t('outOrder.carrierName'), value: 'carrierName', type: 'input', disabled: true },
        // { label: this.$t('outOrder.carrierName'), value: 'partnerId', type: 'input', disabled: true },
        // { label: this.$t('outOrder.carrierName'), value: 'partnerId', type: 'slot', disabled: true },
        // { label: this.$t('outOrder.partnerId'), value: 'courierName', type: 'input', disabled: true },
        { label: this.$t('outOrder.plannedDeliveryDate'), value: 'shippingDate', type: 'date', disabled: true },
        { label: this.$t('outOrder.planTheDeliveryDate'), value: 'receivingDate', type: 'date', disabled: true },
        { label: this.$t('outOrder.dischargeType'), value: 'dischargeType', type: 'select', list: 'dischargeTypeList', disabled: true },
        { label: this.$t('outOrder.preparer'), value: 'preparer', type: 'input', disabled: true },
        { label: this.$t('outOrder.salesDepartment'), value: 'salesDepartment', type: 'input', disabled: true },
        { label: this.$t('outOrder.remark'), value: 'remark', type: 'input', disabled: true }
      ]
      // 初始化明细表格
      this.diaFormInfo.dtTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'rowNo', label: this.$t('outOrder.dt.rowNo'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('sku.skuCode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('sku.skuName'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('sku.barcode'), minWidth: 100 },
        { prop: 'spec', label: this.$t('sku.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('outOrder.dt.mainUnit'), minWidth: 100 },
        { prop: 'extOne', label: this.$t('outOrder.dt.extOne'), minWidth: 100 },
        { prop: 'outOrderQty', label: this.$t('outOrder.dt.outOrderQty'), minWidth: 100 },
        { prop: 'volDec', label: this.$t('outOrder.dt.vol'), minWidth: 100 },
        { prop: 'grossWeightKg', label: this.$t('outOrder.dt.grossWeight'), minWidth: 100 },
        // { prop: 'amountDec', label: this.$t('outOrder.dt.amountDec'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('outOrder.dt.batchNumber'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('outOrder.dt.productionDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('outOrder.dt.invalidDate'), minWidth: 100 },
        { prop: 'remark', label: this.$t('outOrder.dt.remark'), minWidth: 100 }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('outOrder.operationDate'), value: 'operationDate', type: 'date', dateType: 'date', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd' }, // 操作日期
        { label: this.$t('outOrder.owner'), value: 'ownerId', type: 'slot' },
        { label: this.$t('outOrder.scOrderTypeName'), value: 'scOrderType', type: 'select', list: 'scorderTypeList' },
        // { label: this.$t('outOrder.orderType'), value: 'scBusinessType', type: 'select', list: 'scbusinessTypeList' },
        { label: this.$t('outOrder.cusOrderNo'), value: 'cusOrderNo', type: 'input' },
        { label: this.$t('outOrder.cardNo'), value: 'cardNo', type: 'input' },
        { label: this.$t('outOrder.origOrderCode'), value: 'origOrderCode', type: 'input' },
        // { label: this.$t('outOrder.whetherToReissue'), value: 'isReissue', type: 'select', list: 'reissue', event: 'selectWhetherToReissue' }, // 是否补发
        // { label: this.$t('outOrder.originalNumber'), value: 'oldNum', type: 'input' },
        // { label: this.$t('outOrder.dutyPartition'), value: 'responsibility', type: 'select', list: 'responsibility' },
        { label: this.$t('outOrder.isSelf'), value: 'isSelf', type: 'select', list: 'deliveryTypeList' },
        // { label: this.$t('outOrder.methodOfPayment'), value: 'payWay', type: 'select', list: 'methodOfPaymentList' }, // 支付方式
        { label: this.$t('outOrder.shipper'), value: 'shipper', link: 'shipperName', type: 'slot' }, // 发货方
        { label: this.$t('outOrder.consignee'), value: 'consignee', link: 'consigneeName', type: 'slot' },
        { label: this.$t('outOrder.customerId'), value: 'customerId', type: 'slot' },
        { label: this.$t('outOrder.receivingContact'), value: 'consigneeContact', type: 'input' },
        { label: this.$t('outOrder.receivingContactWay'), value: 'consigneeTel', type: 'input' },
        { label: this.$t('outOrder.receivingProvinces'), value: 'receivingProvince', type: 'slot' },
        { label: this.$t('outOrder.receivingCity'), value: 'receivingCity', type: 'slot' },
        { label: this.$t('outOrder.receivingArea'), value: 'receivingArea', type: 'slot' },
        { label: this.$t('outOrder.receivingAddress'), value: 'receivingAddr', type: 'input' },
        { label: this.$t('outOrder.carrierName'), value: 'carrierName', type: 'slot' },
        // { label: this.$t('outOrder.partnerId'), value: 'courierName', type: 'slot' },
        { label: this.$t('outOrder.plannedDeliveryDate'), value: 'shippingDate', type: 'date' },
        { label: this.$t('outOrder.planTheDeliveryDate'), value: 'receivingDate', type: 'date' },
        { label: this.$t('outOrder.dischargeType'), value: 'dischargeType', type: 'select', list: 'dischargeTypeList' },
        { label: this.$t('outOrder.preparer'), value: 'preparer', type: 'input' },
        { label: this.$t('outOrder.salesDepartment'), value: 'salesDepartment', type: 'input' },
        { label: this.$t('outOrder.remark'), value: 'remark', type: 'input' }
        // { label: this.$t('outOrder.skuCode'), value: 'skuCode', type: 'slot' },
        // { label: this.$t('outOrder.company'), value: 'company', type: 'select', list: 'companyList' },
        // { label: this.$t('outOrder.quantity'), value: 'quantity', type: 'number' },
        // { label: this.$t('outOrder.batchNumber'), value: 'batchNumber', type: 'input' },
        // { label: this.$t('outOrder.manufactureDate'), value: 'manufactureDate', type: 'date' },
        // { label: this.$t('outOrder.validityDate'), value: 'validityDate', type: 'date' }
      ]
      // 初始化明细表格
      this.diaFormInfo.dtTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'rowNo', label: this.$t('outOrder.dt.rowNo'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('sku.skuCode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('sku.skuName'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('sku.barcode'), minWidth: 100 },
        { prop: 'spec', label: this.$t('sku.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('outOrder.dt.mainUnit'), minWidth: 100 },
        { prop: 'extOne', label: this.$t('outOrder.dt.extOne'), minWidth: 100 },
        { prop: 'outOrderQty', label: this.$t('outOrder.dt.outOrderQty'), minWidth: 100 },
        { prop: 'volDec', label: this.$t('outOrder.dt.vol'), minWidth: 100 },
        { prop: 'grossWeightKg', label: this.$t('outOrder.dt.grossWeight'), minWidth: 100 },
        // { prop: 'amountDec', label: this.$t('outOrder.dt.amountDec'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('outOrder.dt.batchNumber'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('outOrder.dt.productionDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('outOrder.dt.invalidDate'), minWidth: 100 },
        { prop: 'remark', label: this.$t('outOrder.dt.remark'), minWidth: 100 }
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('outOrder.operationDate'), value: 'operationDate', type: 'date', dateType: 'date', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd' }, // 操作日期
        { label: this.$t('outOrder.owner'), value: 'ownerId', type: 'slot' },
        { label: this.$t('outOrder.scOrderTypeName'), value: 'scOrderType', type: 'select', list: 'scorderTypeList' },
        // { label: this.$t('outOrder.orderType'), value: 'scBusinessType', type: 'select', list: 'scbusinessTypeList' },
        { label: this.$t('outOrder.cusOrderNo'), value: 'cusOrderNo', type: 'input' },
        { label: this.$t('outOrder.cardNo'), value: 'cardNo', type: 'input' },
        { label: this.$t('outOrder.origOrderCode'), value: 'origOrderCode', type: 'input' },
        // { label: this.$t('outOrder.whetherToReissue'), value: 'isReissue', type: 'select', list: 'reissue', event: 'selectWhetherToReissue' }, // 是否补发
        // { label: this.$t('outOrder.originalNumber'), value: 'oldNum', type: 'input' },
        // { label: this.$t('outOrder.dutyPartition'), value: 'responsibility', type: 'select', list: 'responsibility' },
        { label: this.$t('outOrder.isSelf'), value: 'isSelf', type: 'select', list: 'deliveryTypeList' },
        // { label: this.$t('outOrder.methodOfPayment'), value: 'payWay', type: 'select', list: 'methodOfPaymentList' }, // 支付方式
        { label: this.$t('outOrder.shipper'), value: 'shipper', link: 'shipperName', type: 'slot' }, // 发货方
        { label: this.$t('outOrder.consignee'), value: 'consignee', link: 'consigneeName', type: 'slot' },
        { label: this.$t('outOrder.customerId'), value: 'customerId', type: 'slot' },
        { label: this.$t('outOrder.receivingContact'), value: 'consigneeContact', type: 'input' },
        { label: this.$t('outOrder.receivingContactWay'), value: 'consigneeTel', type: 'input' },
        { label: this.$t('outOrder.receivingProvinces'), value: 'receivingProvince', type: 'slot' },
        { label: this.$t('outOrder.receivingCity'), value: 'receivingCity', type: 'slot' },
        { label: this.$t('outOrder.receivingArea'), value: 'receivingArea', type: 'slot' },
        { label: this.$t('outOrder.receivingAddress'), value: 'receivingAddr', type: 'input' },
        { label: this.$t('outOrder.carrierName'), value: 'carrierName', type: 'slot' },
        // { label: this.$t('outOrder.carrierName'), value: 'partnerName', type: 'slot' },
        { label: this.$t('outOrder.plannedDeliveryDate'), value: 'shippingDate', type: 'date' },
        { label: this.$t('outOrder.planTheDeliveryDate'), value: 'receivingDate', type: 'date' },
        { label: this.$t('outOrder.dischargeType'), value: 'dischargeType', type: 'select', list: 'dischargeTypeList' },
        { label: this.$t('outOrder.preparer'), value: 'preparer', type: 'input' },
        { label: this.$t('outOrder.salesDepartment'), value: 'salesDepartment', type: 'input' },
        { label: this.$t('outOrder.remark'), value: 'remark', type: 'input' }
      ]
      // 初始化明细表格
      this.diaFormInfo.dtTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'rowNo', label: this.$t('outOrder.dt.rowNo'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('sku.skuCode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('sku.skuName'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('sku.barcode'), minWidth: 100 },
        { prop: 'spec', label: this.$t('sku.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('outOrder.dt.mainUnit'), minWidth: 100 },
        { prop: 'extOne', label: this.$t('outOrder.dt.extOne'), minWidth: 100 },
        { prop: 'outOrderQty', label: this.$t('outOrder.dt.outOrderQty'), minWidth: 100 },
        { prop: 'volDec', label: this.$t('outOrder.dt.vol'), minWidth: 100 },
        { prop: 'grossWeightKg', label: this.$t('outOrder.dt.grossWeight'), minWidth: 100 },
        // { prop: 'amountDec', label: this.$t('outOrder.dt.amountDec'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('outOrder.dt.batchNumber'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('outOrder.dt.productionDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('outOrder.dt.invalidDate'), minWidth: 100 },
        { prop: 'remark', label: this.$t('outOrder.dt.remark'), minWidth: 100 }
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        partnerName: [{ required: true, message: this.$t('outOrder.msg.partnerName'), trigger: 'blur' }],
        origOrderCode: [{ required: false, message: this.$t('outOrder.msg.origOrderCode'), trigger: 'blur' }],
        // cusOrderNo: [{ required: true, message: this.$t('outOrder.msg.cusOrderNo'), trigger: 'blur' }],
        storeName: [{ required: false, message: this.$t('outOrder.msg.partnerStoreId'), trigger: 'blur' }],
        consignee: [{ required: false, message: this.$t('outOrder.msg.receivingParty'), trigger: 'blur' }],
        responsibility: [{ required: false, message: this.$t('outOrder.msg.dutyPartition'), trigger: 'blur' }],
        oldNum: [{ required: false, message: this.$t('outOrder.msg.originalNumber'), trigger: 'blur' }],
        consigneeTel: [{ required: true, message: this.$t('outOrder.msg.receivingContactWay'), trigger: 'blur' }],
        consigneeContact: [{ required: true, message: this.$t('outOrder.msg.receivingContact'), trigger: 'blur' }],
        receivingAddr: [{ required: true, message: this.$t('outOrder.msg.receivingAddress'), trigger: 'blur' }],
        receivingArea: [{ required: true, message: this.$t('outOrder.msg.receivingArea'), trigger: 'blur' }],
        receivingCity: [{ required: true, message: this.$t('outOrder.msg.receivingCity'), trigger: 'blur' }],
        receivingProvince: [{ required: true, message: this.$t('outOrder.msg.receivingProvinces'), trigger: 'blur' }],
        shipper: [{ required: true, message: this.$t('outOrder.msg.consigner'), trigger: 'blur' }],
        isSelf: [{ required: true, message: this.$t('outOrder.msg.isSelf'), trigger: 'blur' }],
        isReissue: [{ required: true, message: this.$t('outOrder.msg.whetherToReissue'), trigger: 'change' }],
        reissue: [{ required: true, message: this.$t('outOrder.msg.whetherToReissue'), trigger: 'blur' }],
        operationDate: [{ required: true, message: this.$t('outOrder.msg.operationDate'), trigger: 'blur' }],
        scOrderType: [{ required: true, message: this.$t('outOrder.msg.scOrderType'), trigger: 'blur' }],
        // scBusinessType:[{required: true, message: this.$t('outOrder.msg.orderType'), trigger: 'blur'}],
        deliveryType: [{ required: true, message: this.$t('outOrder.msg.deliveryType'), trigger: 'blur' }],
        payWay: [{ required: false, message: this.$t('outOrder.msg.methodOfPayment'), trigger: 'blur' }],
        whId: [{ required: true, message: this.$t('outOrder.msg.whId'), trigger: 'blur' }],
        reWhId: [{ required: true, message: this.$t('outOrder.msg.reWhId'), trigger: 'blur' }],
        ownerId: [{ required: true, message: this.$t('outOrder.msg.ownerId'), trigger: 'blur' }],
        confirmTime: [{ required: true, message: this.$t('outOrder.msg.confirmTime'), trigger: 'blur' }],
        country: [{ required: true, message: this.$t('outOrder.msg.country'), trigger: 'blur' }],
        provinceId: [{ required: true, message: this.$t('outOrder.msg.provinceId'), trigger: 'blur' }],
        cityId: [{ required: true, message: this.$t('outOrder.msg.cityId'), trigger: 'blur' }],
        areaId: [{ required: true, message: this.$t('outOrder.msg.areaId'), trigger: 'blur' }],
        addr: [{ required: true, message: this.$t('outOrder.msg.addr'), trigger: 'blur' }],
        receiver: [{ required: true, message: this.$t('outOrder.msg.receiver'), trigger: 'blur' }],
        receiverTel: [{ required: true, message: this.$t('outOrder.msg.receiverTel'), trigger: 'blur' }]
      }
      this.diaFormInfoDt.rules = {
        mainUnitName: [{ required: true, message: this.$t('inOrder.msg.mainUnit'), trigger: 'change' }],
        extOne: [{ required: true, message: this.$t('inOrder.msg.extOne'), trigger: 'blur' }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        operationDate: null,
        partnerName: null,
        carrierName: null,
        createTime: null,
        cusOrderNo: null,
        isSelf: null,
        payWay: null,
        cardNo: null,
        returnCourierNum: null,
        scOrderType: null,
        scBusinessType: null,
        reissue: null,
        responsibility: null,
        oldNum: null,
        ownerId: null,
        storeName: null,
        shipper: null,
        shippingContact: null,
        shippingTel: null,
        receivingProvince: null,
        receivingCity: null,
        receivingArea: null,
        receivingAddr: null,
        consignee: null,
        consigneeContact: null,
        consigneeTel: null,
        courierName: null,
        shippingDate: null,
        receivingDate: null,
        remark: null

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
