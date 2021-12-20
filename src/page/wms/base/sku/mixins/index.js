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
          companyCode: null,
          ownerId: null,
          supplierId: null,
          skuCategoryId: null,
          skuCode: null,
          skuName: null,
          skuCategory: null,
          spec: null,
          barcode: null,
          isEnable: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '160px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        abcTypeList: [],
        categoryList: [],
        logisticsList: [],
        tempControlList: [],
        unitList: [],
        validityTypeList: [],
        enableList: [],
        scatteredPropertiesList: [],
        invTurnoverRuleList: [],
        recRuleList: [],
        qcRuleList: [],
        paRuleList: [],
        cpfrRuleList: [],
        batchRuleList: [],
        serialNumberRuleList: [],
        maintenanceTypeList: [],
        whetherList: [],
        taxFeeList: [],
        zoneList: [],
        lotList: [],
        invAssignRuleList: [],
        turnoverLevelList: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '280', // 默认操作按钮列宽度
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
            // 默认删除按钮
            {
              label: this.$t('table.delete'),
              type: 'danger',
              icon: '',
              event: 'deleteData',
              show: true,
              disabled: this.$hasPerm('delete')
            }, // event值为notification.js中定义的方法名
            // 自定义按钮
            { slot: true, icon: '', event: 'slotEvent' }// event值为notification.js中定义的方法名
          ]
        }
      },
      // 弹窗主页面
      diaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        labelWidth: '165px',
        diaFormInfoControl: {
          ref: null, // 对外提供的可操作配置表单的持有对象
          data: {}, // 绑定的数据Model对象
          fieldList: [], // 配置的表单字段集合
          rules: {}// 配置的表单字段校验规则集合
        },
        diaFormInfoGSP: {
          ref: null, // 对外提供的可操作配置表单的持有对象
          data: {}, // 绑定的数据Model对象
          fieldList: [], // 配置的表单字段集合
          rules: {}, // 配置的表单字段校验规则集合
          labelWidth: '160px'
        },
        diaTableCpfr: {
          topBtn: { label: '添加补货来源', show: true, type: 'primary', disabled: false, loading: false, event: 'openDiaCpfr' },
          ref: null,
          data: [],
          fieldList: [],
          handle: { // 表格自定义按钮
            fixed: 'right',
            label: this.$t('table.actions'), // 操作列名
            width: '100', // 默认操作按钮列宽度
            btList: [// 添加操作按钮
              // 默认删除按钮
              {
                label: this.$t('table.delete'),
                type: 'danger',
                icon: '',
                event: 'deleteDiaCpfr',
                show: true,
                disabled: false
              }// event值为notification.js中定义的方法名
            ]
          }
        },
        diaTableGrmp: {
          topBtn: { label: '添加GMP证书', show: true, type: 'primary', disabled: false, loading: false, event: 'openDiaGrmp' },
          ref: null,
          data: [],
          fieldList: [],
          handle: { // 表格自定义按钮
            fixed: 'right',
            label: this.$t('table.actions'), // 操作列名
            width: '100', // 默认操作按钮列宽度
            btList: [// 添加操作按钮
              // 默认删除按钮
              {
                label: this.$t('table.delete'),
                type: 'danger',
                icon: '',
                event: 'deleteDiaGrmp',
                show: true,
                disabled: false
              }// event值为notification.js中定义的方法名
            ]
          }
        },
        diaTableCert: {
          topBtn: { label: '添加批准文号', show: true, type: 'primary', disabled: false, loading: false, event: 'openDiaCert' },
          ref: null,
          data: [],
          fieldList: [],
          handle: { // 表格自定义按钮
            fixed: 'right',
            label: this.$t('table.actions'), // 操作列名
            width: '100', // 默认操作按钮列宽度
            btList: [// 添加操作按钮
              // 默认删除按钮
              {
                label: this.$t('table.delete'),
                type: 'danger',
                icon: '',
                event: 'deleteDiaCert',
                show: true,
                disabled: false
              }// event值为notification.js中定义的方法名
            ]
          }
        },
        diaTableConsumables: {
          topBtn: { label: '添加耗材', show: true, type: 'primary', disabled: false, loading: false, event: 'openDiaConsumables' },
          ref: null,
          data: [],
          fieldList: [],
          handle: { // 表格自定义按钮
            fixed: 'right',
            label: this.$t('table.actions'), // 操作列名
            width: '100', // 默认操作按钮列宽度
            btList: [// 添加操作按钮
              // 默认删除按钮
              {
                label: this.$t('table.delete'),
                type: 'danger',
                icon: '',
                event: 'deleteDiaConsumables',
                show: true,
                disabled: false
              }// event值为notification.js中定义的方法名
            ]
          }
        },
        diaTableBom: {
          topBtn: { label: '添加产品组合', show: true, type: 'primary', disabled: false, loading: false, event: 'openDiaBom' },
          ref: null,
          data: [],
          fieldList: [],
          handle: { // 表格自定义按钮
            fixed: 'right',
            label: this.$t('table.actions'), // 操作列名
            width: '100', // 默认操作按钮列宽度
            btList: [// 添加操作按钮
              // 默认删除按钮
              {
                label: this.$t('table.delete'),
                type: 'danger',
                icon: '',
                event: 'deleteDiaBom',
                show: true,
                disabled: false
              }// event值为notification.js中定义的方法名
            ]
          }
        },
        diaTableDim: {
          topBtn: { label: '添加供应商', show: true, type: 'primary', disabled: false, loading: false, event: 'openDiaDim' },
          ref: null,
          data: [],
          fieldList: [],
          handle: { // 表格自定义按钮
            fixed: 'right',
            label: this.$t('table.actions'), // 操作列名
            width: '100', // 默认操作按钮列宽度
            btList: [// 添加操作按钮
              // 默认删除按钮
              {
                label: this.$t('table.delete'),
                type: 'danger',
                icon: '',
                event: 'deleteDiaDim',
                show: true,
                disabled: false
              }// event值为notification.js中定义的方法名
            ]
          }
        }
      },
      // 弹窗表单
      dialogInfoCpfr: {
        title: '',
        visible: false,
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'closeDiaCpfr', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'saveDiaCpfr', btLoading: false, show: true }],
        formInfo: {
          ref: null, // 对外提供的可操作配置表单的持有对象
          data: {}, // 绑定的数据Model对象
          fieldList: [], // 配置的表单字段集合
          rules: {}// 配置的表单字段校验规则集合
        }
      },
      dialogInfoGrmp: {
        title: '',
        visible: false,
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'closeDiaGrmp', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'saveDiaGrmp', btLoading: false, show: true }],
        formInfo: {
          ref: null, // 对外提供的可操作配置表单的持有对象
          data: {}, // 绑定的数据Model对象
          fieldList: [], // 配置的表单字段集合
          rules: {}// 配置的表单字段校验规则集合
        }
      },
      dialogInfoCert: {
        title: '',
        visible: false,
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'closeDiaCert', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'saveDiaCert', btLoading: false, show: true }],
        formInfo: {
          ref: null, // 对外提供的可操作配置表单的持有对象
          data: {}, // 绑定的数据Model对象
          fieldList: [], // 配置的表单字段集合
          rules: {}// 配置的表单字段校验规则集合
        }
      },
      dialogInfoBom: {
        title: '',
        visible: false,
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'closeDiaBom', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'saveDiaBom', btLoading: false, show: true }],
        formInfo: {
          ref: null, // 对外提供的可操作配置表单的持有对象
          data: {}, // 绑定的数据Model对象
          fieldList: [], // 配置的表单字段集合
          rules: {}// 配置的表单字段校验规则集合
        }
      },
      dialogInfoDim: {
        title: '',
        visible: false,
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'closeDiaDim', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'saveDiaDim', btLoading: false, show: true }],
        formInfo: {
          ref: null, // 对外提供的可操作配置表单的持有对象
          data: {}, // 绑定的数据Model对象
          fieldList: [], // 配置的表单字段集合
          rules: {}// 配置的表单字段校验规则集合
        }
      }
    }
  },
  mounted() {
    this.collapsableForm()// 初始化表单-----------------展开收起
    this.initTopFormColumns()// 初始化查询界面配置数据
    this.rulesInit()// 初始化diaFormInfo表单字段校验规则
    this.resetFormData()
  },
  methods: {
    // 初始化补货信息表单
    initDiaFormCpfrColumns() {
      this.dialogInfoCpfr.formInfo.fieldList = [
        { label: this.$t('sku.control.cpfrLotId'), value: 'cpfrLotId', type: 'slot' },
        { label: this.$t('sku.control.cpfrMax'), value: 'cpfrMax', type: 'input' },
        { label: this.$t('sku.control.cpfrMin'), value: 'cpfrMin', type: 'input' },
        { label: this.$t('sku.control.minCpfrQty'), value: 'minCpfrQty', type: 'input' },
        { label: this.$t('sku.control.remark'), value: 'remark', type: 'input' }
      ]
    },
    // 初始化GRMP表单
    initDiaFormGrmpColumns() {
      this.dialogInfoGrmp.formInfo.fieldList = [
        { label: this.$t('sku.grmp.factoryId'), value: 'factoryId', type: 'slot' },
        { label: this.$t('sku.grmp.certificateNo'), value: 'certificateNo', type: 'input' },
        { label: this.$t('sku.grmp.effectiveDate'), value: 'effectiveDate', type: 'date', dateType: 'date' },
        { label: this.$t('sku.grmp.expirationDate'), value: 'expirationDate', type: 'date', dateType: 'date' },
        { label: this.$t('sku.grmp.isEnable'), value: 'isEnable', type: 'select', list: 'whetherList' },
        { label: this.$t('sku.grmp.remark'), value: 'remark', type: 'input' }
      ]
    },
    // 初始化批准文号表单
    initDiaFormCertColumns() {
      this.dialogInfoCert.formInfo.fieldList = [
        { label: this.$t('sku.cert.certificateNo'), value: 'certificateNo', type: 'input' },
        { label: this.$t('sku.cert.effectiveDate'), value: 'effectiveDate', type: 'date', dateType: 'date' },
        { label: this.$t('sku.cert.expirationDate'), value: 'expirationDate', type: 'date', dateType: 'date' },
        { label: this.$t('sku.cert.isEnable'), value: 'isEnable', type: 'select', list: 'whetherList' },
        { label: this.$t('sku.cert.remark'), value: 'remark', type: 'input' }
      ]
    },
    // 初始化组合产品表单
    initDiaFormBomColumns() {
      this.dialogInfoBom.formInfo.fieldList = [
        { label: this.$t('sku.bom.bomSkuId'), value: 'bomSkuId', type: 'slot' },
        { label: this.$t('sku.bom.bomNum'), value: 'bomNum', type: 'number', min: 1, precision: 0 },
        { label: this.$t('sku.bom.remark'), value: 'remark', type: 'input' }
      ]
    },
    // 初始化供应商表单
    initDiaFormDimColumns() {
      this.dialogInfoDim.formInfo.fieldList = [
        { label: this.$t('sku.dim.supplierId'), value: 'supplierId', type: 'slot' },
        { label: this.$t('sku.dim.isEnable'), value: 'isEnable', type: 'select', list: 'whetherList' },
        { label: this.$t('sku.dim.priorityLevel'), value: 'priorityLevel', type: 'number', min: 1, precision: 0 },
        { label: this.$t('sku.dim.remark'), value: 'remark', type: 'input' }
      ]
    },
    collapsableFormMore() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('sku.skuCode'), value: 'skuCode', type: 'input' },
        { label: this.$t('sku.skuName'), value: 'skuName', type: 'input' },
        { label: this.$t('sku.skuCategoryId'), value: 'skuCategoryId', type: 'slot' },
        { label: this.$t('sku.ownerName'), value: 'ownerId', type: 'slot' },
        { label: this.$t('sku.barcodeTwo'), value: 'barcodeTwo', type: 'input' },
        { label: this.$t('sku.barcodeThree'), value: 'barcodeThree', type: 'input' },
        { label: this.$t('sku.sourceId'), value: 'sourceId', type: 'input' },
        { label: this.$t('sku.isEnable'), value: 'isEnable', type: 'select', list: 'enableList' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('sku.skuCode'), value: 'skuCode', type: 'input' },
        { label: this.$t('sku.skuName'), value: 'skuName', type: 'input' },
        { label: this.$t('sku.skuCategoryId'), value: 'skuCategoryId', type: 'slot' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
      this.topForm.data.ownerId = null
    },
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'skuCode', label: this.$t('sku.skuCode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('sku.skuName'), minWidth: 100 },
        { prop: 'skuCategoryName', label: this.$t('sku.skuCategoryName'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('sku.ownerName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('sku.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('sku.mainUnit'), minWidth: 80 },
        { prop: 'recUnit', label: this.$t('sku.recUnit'), minWidth: 80 },
        { prop: 'perQty', label: this.$t('sku.perQty'), minWidth: 80 },
        { prop: 'barcode', label: this.$t('sku.barcode'), minWidth: 100 },
        { prop: 'barcodeTwo', label: this.$t('sku.barcodeTwo'), minWidth: 150 },
        { prop: 'barcodeThree', label: this.$t('sku.barcodeThree'), minWidth: 140 },
        { prop: 'sourceId', label: this.$t('sku.sourceId'), minWidth: 140 },
        { prop: 'sourceName', label: this.$t('sku.sourceName'), minWidth: 120 },
        { prop: 'sourceSpec', label: this.$t('sku.sourceSpec'), minWidth: 120 },
        { prop: 'mfgName', label: this.$t('sku.mfgName'), minWidth: 100 },
        { prop: 'originCountry', label: this.$t('sku.originCountry'), minWidth: 100 },
        { prop: 'brandName', label: this.$t('sku.brandName'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('sku.gsp.drugForm'), minWidth: 100 },
        { prop: 'drugFormSpec', label: this.$t('sku.gsp.drugFormSpec'), minWidth: 100 },
        { prop: 'approvalNumber', label: this.$t('sku.approvalNumber'), minWidth: 100 },
        { prop: 'turnoverLevelName', label: this.$t('sku.control.turnoverLevel'), minWidth: 100 },
        { prop: 'abc', label: this.$t('sku.abc'), minWidth: 100 },

        { prop: 'tempControlName', label: this.$t('sku.tempControl'), minWidth: 100 },
        { prop: 'scatteredPropertiesName', label: this.$t('sku.scatteredProperties'), minWidth: 100 },
        { prop: 'lengthDec', label: this.$t('sku.lengthDec'), minWidth: 100 },
        { prop: 'widthDec', label: this.$t('sku.widthDec'), minWidth: 100 },
        { prop: 'heightDec', label: this.$t('sku.heightDec'), minWidth: 100 },
        { prop: 'isBatchManageName', label: this.$t('sku.isBatchManage'), minWidth: 100 },
        { prop: 'isValidityName', label: this.$t('sku.isValidity'), minWidth: 100 },
        { prop: 'validityTypeName', label: this.$t('sku.validityType'), minWidth: 120 },
        { prop: 'validityDay', label: this.$t('sku.validityDay'), minWidth: 100 },
        { prop: 'warmValidityDay', label: this.$t('sku.warmValidityDay'), minWidth: 120 },
        { prop: 'maintenanceTypeName', label: this.$t('sku.gsp.maintenanceType'), minWidth: 100 },
        { prop: 'maintenanceCycle', label: this.$t('sku.gsp.maintenanceCycle'), minWidth: 100 },
        { prop: 'isDrugSuperCodeName', label: this.$t('sku.gsp.isDrugSuperCode'), minWidth: 100 },
        { prop: 'isDoubleCheckName', label: this.$t('sku.gsp.isDoubleCheck'), minWidth: 100 },
        { prop: 'isCombinationName', label: this.$t('sku.isCombination'), minWidth: 100 },
        { prop: 'isValuablesName', label: this.$t('sku.isValuables'), minWidth: 100 },
        { prop: 'isGiftName', label: this.$t('sku.isGift'), minWidth: 100 },
        { prop: 'isFreshName', label: this.$t('sku.isFresh'), minWidth: 100 },
        { prop: 'isConsumablesName', label: this.$t('sku.isConsumables'), minWidth: 100 },
        { prop: 'isEnableName', label: this.$t('sku.isEnable'), minWidth: 100 }

        // {prop:"remark", label:this.$t('sku.remark'), minWidth:100},
        // {prop:"creator", label:this.$t('sku.creator'), minWidth:100},
        // // {prop:"creatorName", label:this.$t('sku.creatorName'), minWidth:100},
        // {prop:"createTime", label:this.$t('sku.createTime'), minWidth:100},
        // {prop:"updater", label:this.$t('sku.updater'), minWidth:100},
        // // {prop:"updaterName", label:this.$t('sku.updaterName'), minWidth:100},
        // {prop:"updateTime", label:this.$t('sku.updateTime'), minWidth:100},

      ]
    },
    // 查看页面的数据配置
    diaFormInfoViewFieldList() {
      this.formType = 'view'
      this.viewFlag = 'viewFlag'
      this.diaFormInfo.fieldList = [
        { label: this.$t('sku.skuCode'), value: 'skuCode', type: 'input', readonly: true },
        { label: this.$t('sku.skuName'), value: 'skuName', type: 'input', readonly: true },
        // {label: this.$t('sku.tradeName'), value: "tradeName", type: "input",readonly:true},
        { label: this.$t('sku.skuCategoryId'), value: 'skuCategoryId', type: 'slot' },
        { label: this.$t('sku.ownerName'), value: 'ownerId', type: 'slot', disabled: true },
        { label: this.$t('sku.spec'), value: 'spec', type: 'input', readonly: true },
        { label: this.$t('sku.mainUnit'), value: 'mainUnit', type: 'select', list: 'unitList', disabled: true },
        { label: this.$t('sku.recUnit'), value: 'recUnit', type: 'select', list: 'unitList', disabled: true },
        { label: this.$t('sku.perQty'), value: 'perQty', type: 'input', readonly: true },
        { label: this.$t('sku.barcode'), value: 'barcode', type: 'input', readonly: true },
        { label: this.$t('sku.barcodeTwo'), value: 'barcodeTwo', type: 'input', readonly: true },
        { label: this.$t('sku.barcodeThree'), value: 'barcodeThree', type: 'input', readonly: true },
        { label: this.$t('sku.sourceId'), value: 'sourceId', type: 'input', readonly: true },
        { label: this.$t('sku.sourceName'), value: 'sourceName', type: 'input', readonly: true },
        { label: this.$t('sku.sourceSpec'), value: 'sourceSpec', type: 'input', readonly: true },
        // {label: this.$t('sku.obUnit'), value: "obUnit", type: "select",list:'unitList',disabled:true},
        // {label: this.$t('sku.invUnit'), value: "invUnit", type: "select",list:'unitList',disabled:true},
        { label: this.$t('sku.hgSkuCode'), value: 'hgSkuCode', type: 'input', readonly: true },
        { label: this.$t('sku.hgSkuName'), value: 'hgSkuName', type: 'input', readonly: true },
        { label: this.$t('sku.taxCode'), value: 'taxCode', type: 'input', readonly: true },
        { label: this.$t('sku.taxName'), value: 'taxName', type: 'input', readonly: true },
        { label: this.$t('sku.taxFee'), value: 'taxFee', type: 'select', list: 'taxFeeList', disabled: true },

        { label: this.$t('sku.lengthDec'), value: 'lengthDec', type: 'number', min: 0, precision: 1, disabled: true },
        { label: this.$t('sku.widthDec'), value: 'widthDec', type: 'number', min: 0, precision: 1, disabled: true },
        { label: this.$t('sku.heightDec'), value: 'heightDec', type: 'number', min: 0, precision: 1, disabled: true },
        { label: this.$t('sku.volDec'), value: 'volDec', type: 'number', min: 0, precision: 3, disabled: true },
        { label: this.$t('sku.grossWeightKg'), value: 'grossWeightKg', type: 'number', min: 0, precision: 3, disabled: true },
        { label: this.$t('sku.tareWeightKg'), value: 'tareWeightKg', type: 'number', min: 0, precision: 3, disabled: true },

        { label: this.$t('sku.netWeightKg'), value: 'netWeightKg', type: 'number', min: 0, precision: 3, disabled: true },
        { label: this.$t('sku.costPriceDec'), value: 'costPriceDec', type: 'number', min: 0, precision: 2, disabled: true },
        { label: this.$t('sku.tagPriceDec'), value: 'tagPriceDec', type: 'number', min: 0, precision: 2, disabled: true },
        { label: this.$t('sku.salePriceDec'), value: 'salePriceDec', type: 'number', min: 0, precision: 2, disabled: true },

        { label: this.$t('sku.abc'), value: 'abc', type: 'select', list: 'abcTypeList', disabled: true },
        { label: this.$t('sku.mfgId'), value: 'mfgId', type: 'slot', disabled: true },
        { label: this.$t('sku.outFactoryCode'), value: 'outFactoryCode', type: 'input', readonly: true },
        { label: this.$t('sku.brandName'), value: 'brandName', type: 'input', readonly: true },
        { label: this.$t('sku.model'), value: 'model', type: 'input', readonly: true },
        { label: this.$t('sku.originCountry'), value: 'originCountry', type: 'input', readonly: true },
        { label: this.$t('sku.typeNo'), value: 'typeNo', type: 'input', readonly: true },
        { label: this.$t('sku.colour'), value: 'colour', type: 'input', readonly: true },
        { label: this.$t('sku.size'), value: 'size', type: 'input', readonly: true },
        { label: this.$t('sku.logistics'), value: 'logistics', type: 'select', list: 'logisticsList', disabled: true },
        { label: this.$t('sku.midPackQty'), value: 'midPackQty', type: 'input', readonly: true },
        { label: this.$t('sku.tempControl'), value: 'tempControl', type: 'select', list: 'tempControlList', disabled: true },
        { label: this.$t('sku.scatteredProperties'), value: 'scatteredProperties', type: 'select', list: 'scatteredPropertiesList', disabled: true },
        { label: this.$t('sku.isBatchManage'), value: 'isBatchManage', type: 'select', list: 'whetherList', disabled: true, clearable: false },
        { label: this.$t('sku.isSerialNumber'), value: 'isSerialNumber', type: 'select', list: 'whetherList', disabled: true, clearable: false },
        { label: this.$t('sku.isValidity'), value: 'isValidity', type: 'select', list: 'whetherList', disabled: true, clearable: false },

        { label: this.$t('sku.validityType'), value: 'validityType', type: 'select', list: 'validityTypeList', disabled: true },
        { label: this.$t('sku.validityDay'), value: 'validityDay', type: 'input', readonly: true },
        { label: this.$t('sku.warmValidityDay'), value: 'warmValidityDay', type: 'input', readonly: true },
        { label: this.$t('sku.inWhValidity'), value: 'inWhValidity', type: 'input', readonly: true },
        { label: this.$t('sku.outWhValidity'), value: 'outWhValidity', type: 'input', readonly: true },

        { label: this.$t('sku.isValuables'), value: 'isValuables', type: 'select', list: 'whetherList', disabled: true, clearable: false },
        { label: this.$t('sku.isCombination'), value: 'isCombination', type: 'select', list: 'whetherList', disabled: true, clearable: false },
        { label: this.$t('sku.isGift'), value: 'isGift', type: 'select', list: 'whetherList', disabled: true, clearable: false },
        { label: this.$t('sku.isFresh'), value: 'isFresh', type: 'select', list: 'whetherList', disabled: true, clearable: false },
        { label: this.$t('sku.isConsumables'), value: 'isConsumables', type: 'select', list: 'whetherList', disabled: true, clearable: false },
        { label: this.$t('sku.isEnable'), value: 'isEnable', type: 'select', list: 'whetherList', disabled: true, clearable: false }

      ]
      this.diaFormInfo.diaFormInfoControl.fieldList = [
        { label: this.$t('sku.control.invTurnoverRuleId'), value: 'invTurnoverRuleId', type: 'select', list: 'invTurnoverRuleList', disabled: true },
        { label: this.$t('sku.control.recRuleId'), value: 'recRuleId', type: 'select', list: 'recRuleList', disabled: true },
        { label: this.$t('sku.control.qcRuleId'), value: 'qcRuleId', type: 'select', list: 'qcRuleList', disabled: true },
        { label: this.$t('sku.control.paRuleId'), value: 'paRuleId', type: 'select', list: 'paRuleList', disabled: true },
        { label: this.$t('sku.control.cpfrRuleId'), value: 'cpfrRuleId', type: 'select', list: 'cpfrRuleList', disabled: true },
        { label: this.$t('sku.control.batchRuleId'), value: 'batchRuleId', type: 'select', list: 'batchRuleList', disabled: true },
        { label: this.$t('sku.control.serialNumberRuleId'), value: 'serialNumberRuleId', type: 'select', list: 'serialNumberRuleList', disabled: true },

        { label: this.$t('sku.control.assignRuleId'), value: 'assignRuleId', type: 'select', list: 'invAssignRuleList', disabled: true },
        { label: this.$t('sku.control.paZoneIds'), value: 'paZoneIdArray', type: 'slot' },
        { label: this.$t('sku.control.paLotIds'), value: 'paLotIdArray', type: 'input', readonly: true },
        { label: this.$t('sku.control.turnoverLevel'), value: 'turnoverLevel', type: 'select', list: 'turnoverLevelList', disabled: true },

        { label: this.$t('sku.control.invMax'), value: 'invMax', type: 'input', readonly: true },
        { label: this.$t('sku.control.invMin'), value: 'invMin', type: 'input', readonly: true },
        { label: this.$t('sku.control.reorderQty'), value: 'reorderQty', type: 'input', readonly: true }

      ]
      this.diaFormInfo.diaFormInfoGSP.fieldList = [
        { label: this.$t('sku.gsp.drugForm'), value: 'drugForm', type: 'input', readonly: true },
        { label: this.$t('sku.gsp.drugFormSpec'), value: 'drugFormSpec', type: 'input', readonly: true },
        { label: this.$t('sku.gsp.maintenanceType'), value: 'maintenanceType', type: 'select', list: 'maintenanceTypeList', disabled: true },
        { label: this.$t('sku.gsp.maintenanceCycle'), value: 'maintenanceCycle', type: 'input', readonly: true },

        { label: this.$t('sku.gsp.isFirstCamp'), value: 'isFirstCamp', type: 'select', list: 'whetherList', disabled: true, clearable: false },
        { label: this.$t('sku.gsp.isTwoSpiritDrug'), value: 'isTwoSpiritDrug', type: 'select', list: 'whetherList', disabled: true, clearable: false },
        { label: this.$t('sku.gsp.isDoubleCheck'), value: 'isDoubleCheck', type: 'select', list: 'whetherList', disabled: true, clearable: false },
        { label: this.$t('sku.gsp.isDrugSuperCode'), value: 'isDrugSuperCode', type: 'select', list: 'whetherList', disabled: true, clearable: false },
        { label: this.$t('sku.gsp.isPrintDrugRep'), value: 'isPrintDrugRep', type: 'select', list: 'whetherList', disabled: true, clearable: false },
        { label: this.$t('sku.gsp.isScanTwoSeq'), value: 'isScanTwoSeq', type: 'select', list: 'whetherList', disabled: true, clearable: false },
        { label: this.$t('sku.gsp.isOneGoodsOneCode'), value: 'isOneGoodsOneCode', type: 'select', list: 'whetherList', disabled: true, clearable: false }
      ]
      this.diaFormInfo.diaTableGrmp.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'factoryName', label: this.$t('sku.grmp.factoryName'), minWidth: 200 },
        { prop: 'certificateNo', label: this.$t('sku.grmp.certificateNo'), minWidth: 200 },
        { prop: 'effectiveDate', label: this.$t('sku.grmp.effectiveDate'), minWidth: 150 },
        { prop: 'expirationDate', label: this.$t('sku.grmp.expirationDate'), minWidth: 150 },
        { prop: 'isEnable', label: this.$t('sku.grmp.isEnable'), minWidth: 100, edit: { name: 'ElSelect', options: this.listTypeInfo.whetherList, props: { clearable: false, disabled: true }}},
        { prop: 'remark', label: this.$t('sku.grmp.remark'), minWidth: 100 }
      ]
      this.diaFormInfo.diaTableCert.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'certificateNo', label: this.$t('sku.cert.certificateNo'), minWidth: 200 },
        { prop: 'effectiveDate', label: this.$t('sku.cert.effectiveDate'), minWidth: 200 },
        { prop: 'expirationDate', label: this.$t('sku.cert.expirationDate'), minWidth: 200 },
        { prop: 'isEnable', label: this.$t('sku.cert.isEnable'), minWidth: 100, edit: { name: 'ElSelect', options: this.listTypeInfo.whetherList, props: { clearable: false, disabled: true }}},
        { prop: 'remark', label: this.$t('sku.cert.remark'), minWidth: 100 }
      ]
      // 初始化耗材列表
      this.diaFormInfo.diaTableConsumables.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'consumablesSkuCode', label: this.$t('sku.consumables.consumablesSkuCode'), minWidth: 100 },
        { prop: 'consumablesSkuName', label: this.$t('sku.consumables.consumablesSkuName'), minWidth: 100 },
        { prop: 'consumablesSpec', label: this.$t('sku.consumables.consumablesSpec'), minWidth: 100 },
        { prop: 'consumablesSkuCategory', label: this.$t('sku.consumables.consumablesSkuCategory'), minWidth: 100 },
        { prop: 'consumablesBarcode', label: this.$t('sku.consumables.consumablesBarcode'), minWidth: 100 },
        { prop: 'consumablesNum', label: this.$t('sku.consumables.consumablesNum'), minWidth: 100 },
        { prop: 'remark', label: this.$t('sku.consumables.remark'), minWidth: 100 }
      ]
      // 初始化组合产品列表
      this.diaFormInfo.diaTableBom.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'bomSkuCode', label: this.$t('sku.bom.bomSkuCode'), minWidth: 100 },
        { prop: 'bomSkuName', label: this.$t('sku.bom.bomSkuName'), minWidth: 100 },
        { prop: 'bomSpec', label: this.$t('sku.bom.bomSpec'), minWidth: 100 },
        { prop: 'bomSkuCategory', label: this.$t('sku.bom.bomSkuCategory'), minWidth: 100 },
        { prop: 'bomBarcode', label: this.$t('sku.bom.bomBarcode'), minWidth: 100 },
        { prop: 'bomNum', label: this.$t('sku.bom.bomNum'), minWidth: 100 },
        { prop: 'remark', label: this.$t('sku.bom.remark'), minWidth: 100 }
      ]
      // 初始化供应商列表
      this.diaFormInfo.diaTableDim.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'supplierName', label: this.$t('sku.dim.supplierName'), minWidth: 100 },
        { prop: 'isEnableName', label: this.$t('sku.dim.isEnable'), minWidth: 100 },
        { prop: 'priorityLevel', label: this.$t('sku.dim.priorityLevel'), minWidth: 100 },
        { prop: 'remark', label: this.$t('sku.dim.remark'), minWidth: 100 }
      ]
    },
    // 新增页面的数据配置
    diaFormInfoAddFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('sku.skuCode'), value: 'skuCode', type: 'input' },
        { label: this.$t('sku.skuName'), value: 'skuName', type: 'input' },
        // {label: this.$t('sku.tradeName'), value: "tradeName", type: "input"},
        { label: this.$t('sku.skuCategoryId'), value: 'skuCategoryId', type: 'slot' },
        { label: this.$t('sku.ownerName'), value: 'ownerId', type: 'slot' },
        { label: this.$t('sku.spec'), value: 'spec', type: 'input' },
        { label: this.$t('sku.mainUnit'), value: 'mainUnit', type: 'select', list: 'unitList' },
        { label: this.$t('sku.recUnit'), value: 'recUnit', type: 'select', list: 'unitList' },
        { label: this.$t('sku.perQty'), value: 'perQty', type: 'number', min: 1, precision: 0 },
        { label: this.$t('sku.barcode'), value: 'barcode', type: 'input' },
        { label: this.$t('sku.barcodeTwo'), value: 'barcodeTwo', type: 'input' },
        { label: this.$t('sku.barcodeThree'), value: 'barcodeThree', type: 'input' },
        { label: this.$t('sku.sourceId'), value: 'sourceId', type: 'input' },
        { label: this.$t('sku.sourceName'), value: 'sourceName', type: 'input' },
        { label: this.$t('sku.sourceSpec'), value: 'sourceSpec', type: 'input' },
        // {label: this.$t('sku.obUnit'), value: "obUnit", type: "select",list:'unitList'},
        // {label: this.$t('sku.invUnit'), value: "invUnit", type: "select",list:'unitList'},
        { label: this.$t('sku.hgSkuCode'), value: 'hgSkuCode', type: 'input' },
        { label: this.$t('sku.hgSkuName'), value: 'hgSkuName', type: 'input' },
        { label: this.$t('sku.taxCode'), value: 'taxCode', type: 'input' },
        { label: this.$t('sku.taxName'), value: 'taxName', type: 'input' },
        { label: this.$t('sku.taxFee'), value: 'taxFee', type: 'select', list: 'taxFeeList', clearable: false },

        { label: this.$t('sku.lengthDec'), value: 'lengthDec', type: 'number', min: 0, precision: 1 },
        { label: this.$t('sku.widthDec'), value: 'widthDec', type: 'number', min: 0, precision: 1 },
        { label: this.$t('sku.heightDec'), value: 'heightDec', type: 'number', min: 0, precision: 1 },
        { label: this.$t('sku.volDec'), value: 'volDec', type: 'number', min: 0, precision: 3 },
        { label: this.$t('sku.grossWeightKg'), value: 'grossWeightKg', type: 'number', min: 0, precision: 3, event: 'changeWeightKg' },
        { label: this.$t('sku.tareWeightKg'), value: 'tareWeightKg', type: 'number', min: 0, precision: 3, disabled: true },
        { label: this.$t('sku.netWeightKg'), value: 'netWeightKg', type: 'number', min: 0, precision: 3, event: 'changeWeightKg' },
        { label: this.$t('sku.costPriceDec'), value: 'costPriceDec', type: 'number', min: 0, precision: 2 },
        { label: this.$t('sku.tagPriceDec'), value: 'tagPriceDec', type: 'number', min: 0, precision: 2 },
        { label: this.$t('sku.salePriceDec'), value: 'salePriceDec', type: 'number', min: 0, precision: 2 },

        { label: this.$t('sku.abc'), value: 'abc', type: 'select', list: 'abcTypeList' },
        { label: this.$t('sku.mfgId'), value: 'mfgId', type: 'slot' },
        { label: this.$t('sku.outFactoryCode'), value: 'outFactoryCode', type: 'input' },
        { label: this.$t('sku.brandName'), value: 'brandName', type: 'input' },
        { label: this.$t('sku.model'), value: 'model', type: 'input' },
        { label: this.$t('sku.originCountry'), value: 'originCountry', type: 'input' },
        { label: this.$t('sku.typeNo'), value: 'typeNo', type: 'input' },
        { label: this.$t('sku.colour'), value: 'colour', type: 'input' },
        { label: this.$t('sku.size'), value: 'size', type: 'input' },

        { label: this.$t('sku.logistics'), value: 'logistics', type: 'select', list: 'logisticsList' },
        { label: this.$t('sku.midPackQty'), value: 'midPackQty', type: 'number', min: 1, precision: 0 },
        { label: this.$t('sku.tempControl'), value: 'tempControl', type: 'select', list: 'tempControlList' },
        { label: this.$t('sku.scatteredProperties'), value: 'scatteredProperties', type: 'select', list: 'scatteredPropertiesList' },

        { label: this.$t('sku.isBatchManage'), value: 'isBatchManage', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('sku.isSerialNumber'), value: 'isSerialNumber', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('sku.isValidity'), value: 'isValidity', type: 'select', list: 'whetherList', event: 'handleValidity', clearable: false },

        { label: this.$t('sku.validityType'), value: 'validityType', type: 'select', list: 'validityTypeList', event: 'handleValidityType', disabled: true },
        { label: this.$t('sku.validityDay'), value: 'validityDay', type: 'number', min: 0, precision: 0, disabled: true },
        { label: this.$t('sku.warmValidityDay'), value: 'warmValidityDay', type: 'number', min: 0, precision: 0, disabled: true },
        { label: this.$t('sku.inWhValidity'), value: 'inWhValidity', type: 'number', min: 0, precision: 0, disabled: true },
        { label: this.$t('sku.outWhValidity'), value: 'outWhValidity', type: 'number', min: 0, precision: 0, disabled: true },

        { label: this.$t('sku.isValuables'), value: 'isValuables', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('sku.isCombination'), value: 'isCombination', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('sku.isGift'), value: 'isGift', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('sku.isFresh'), value: 'isFresh', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('sku.isConsumables'), value: 'isConsumables', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('sku.isEnable'), value: 'isEnable', type: 'select', list: 'whetherList', clearable: false }

      ]
      this.diaFormInfo.diaFormInfoControl.fieldList = [
        { label: this.$t('sku.control.invTurnoverRuleId'), value: 'invTurnoverRuleId', type: 'select', list: 'invTurnoverRuleList' },
        { label: this.$t('sku.control.recRuleId'), value: 'recRuleId', type: 'select', list: 'recRuleList' },
        { label: this.$t('sku.control.qcRuleId'), value: 'qcRuleId', type: 'select', list: 'qcRuleList' },
        { label: this.$t('sku.control.paRuleId'), value: 'paRuleId', type: 'select', list: 'paRuleList' },
        { label: this.$t('sku.control.cpfrRuleId'), value: 'cpfrRuleId', type: 'select', list: 'cpfrRuleList' },
        { label: this.$t('sku.control.batchRuleId'), value: 'batchRuleId', type: 'select', list: 'batchRuleList' },
        { label: this.$t('sku.control.serialNumberRuleId'), value: 'serialNumberRuleId', type: 'select', list: 'serialNumberRuleList' },

        { label: this.$t('sku.control.assignRuleId'), value: 'assignRuleId', type: 'select', list: 'invAssignRuleList' },
        { label: this.$t('sku.control.paZoneIds'), value: 'paZoneIdArray', type: 'slot' },
        { label: this.$t('sku.control.paLotIds'), value: 'paLotIdArray', type: 'input', event: 'changePaLotCode' },
        { label: this.$t('sku.control.turnoverLevel'), value: 'turnoverLevel', type: 'select', list: 'turnoverLevelList' },

        { label: this.$t('sku.control.invMax'), value: 'invMax', type: 'input' },
        { label: this.$t('sku.control.invMin'), value: 'invMin', type: 'input' },
        { label: this.$t('sku.control.reorderQty'), value: 'reorderQty', type: 'input' }

      ]
      this.diaFormInfo.diaFormInfoGSP.fieldList = [
        { label: this.$t('sku.gsp.drugForm'), value: 'drugForm', type: 'input' },
        { label: this.$t('sku.gsp.drugFormSpec'), value: 'drugFormSpec', type: 'input' },
        { label: this.$t('sku.gsp.maintenanceType'), value: 'maintenanceType', type: 'select', list: 'maintenanceTypeList' },
        { label: this.$t('sku.gsp.maintenanceCycle'), value: 'maintenanceCycle', type: 'input' },

        { label: this.$t('sku.gsp.isFirstCamp'), value: 'isFirstCamp', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('sku.gsp.isTwoSpiritDrug'), value: 'isTwoSpiritDrug', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('sku.gsp.isDoubleCheck'), value: 'isDoubleCheck', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('sku.gsp.isDrugSuperCode'), value: 'isDrugSuperCode', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('sku.gsp.isPrintDrugRep'), value: 'isPrintDrugRep', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('sku.gsp.isScanTwoSeq'), value: 'isScanTwoSeq', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('sku.gsp.isOneGoodsOneCode'), value: 'isOneGoodsOneCode', type: 'select', list: 'whetherList', clearable: false }

      ]
      this.diaFormInfo.diaTableGrmp.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'factoryName', label: this.$t('sku.grmp.factoryName'), minWidth: 200 },
        { prop: 'certificateNo', label: this.$t('sku.grmp.certificateNo'), minWidth: 200, edit: { name: '$input' }},
        { prop: 'effectiveDate', label: this.$t('sku.grmp.effectiveDate'), minWidth: 150, edit: { name: 'ElDatePicker', props: { type: 'date', format: 'yyyy-MM-dd', clearable: false }}},
        { prop: 'expirationDate', label: this.$t('sku.grmp.expirationDate'), minWidth: 150, edit: { name: 'ElDatePicker', props: { type: 'date', format: 'yyyy-MM-dd', clearable: false }}},
        { prop: 'isEnable', label: this.$t('sku.grmp.isEnable'), minWidth: 100, edit: { name: 'ElSelect', options: this.listTypeInfo.whetherList, props: { clearable: false }}},
        { prop: 'remark', label: this.$t('sku.grmp.remark'), minWidth: 100, edit: { name: '$input' }}
      ]
      this.diaFormInfo.diaTableCert.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'certificateNo', label: this.$t('sku.cert.certificateNo'), minWidth: 200, edit: { name: '$input' }},
        { prop: 'effectiveDate', label: this.$t('sku.cert.effectiveDate'), minWidth: 200, edit: { name: 'ElDatePicker', props: { type: 'date', format: 'yyyy-MM-dd', clearable: false }}},
        { prop: 'expirationDate', label: this.$t('sku.cert.expirationDate'), minWidth: 200, edit: { name: 'ElDatePicker', props: { type: 'date', format: 'yyyy-MM-dd', clearable: false }}},
        { prop: 'isEnable', label: this.$t('sku.cert.isEnable'), minWidth: 100, edit: { name: 'ElSelect', options: this.listTypeInfo.whetherList, props: { clearable: false }}},
        { prop: 'remark', label: this.$t('sku.cert.remark'), minWidth: 100, edit: { name: '$input' }}
      ]
      this.diaFormInfo.diaTableBom.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'bomSkuCode', label: this.$t('sku.bom.bomSkuCode'), minWidth: 100 },
        { prop: 'bomSkuName', label: this.$t('sku.bom.bomSkuName'), minWidth: 100 },
        { prop: 'bomSpec', label: this.$t('sku.bom.bomSpec'), minWidth: 100 },
        { prop: 'bomSkuCategory', label: this.$t('sku.bom.bomSkuCategory'), minWidth: 100 },
        { prop: 'bomBarcode', label: this.$t('sku.bom.bomBarcode'), minWidth: 100 },
        { prop: 'bomNum', label: this.$t('sku.bom.bomNum'), minWidth: 100, edit: { name: '$input', props: { type: 'number', min: 1, precision: 0 }}},
        { prop: 'remark', label: this.$t('sku.bom.remark'), minWidth: 100, edit: { name: '$input' }}
      ]
      this.diaFormInfo.diaTableCpfr.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        // {prop:"cpfrAreaName", label:this.$t('sku.cpfrAreaName'), minWidth:100},
        // {prop:"cpfrZoneName", label:this.$t('sku.cpfrZoneName'), minWidth:100},
        { prop: 'cpfrLotName', label: this.$t('sku.control.cpfrLotName'), minWidth: 100 },
        { prop: 'cpfrMax', label: this.$t('sku.control.cpfrMax'), minWidth: 150, edit: { name: '$input', props: { type: 'number' }}},
        { prop: 'cpfrMin', label: this.$t('sku.control.cpfrMin'), minWidth: 150, edit: { name: '$input', props: { type: 'number' }}},
        { prop: 'minCpfrQty', label: this.$t('sku.control.minCpfrQty'), minWidth: 150, edit: { name: '$input', props: { type: 'number' }}},
        { prop: 'remark', label: this.$t('sku.control.remark'), minWidth: 100, edit: { name: 'input' }}
      ]
      // 初始化耗材列表
      this.diaFormInfo.diaTableConsumables.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'consumablesSkuCode', label: this.$t('sku.consumables.consumablesSkuCode'), minWidth: 100 },
        { prop: 'consumablesSkuName', label: this.$t('sku.consumables.consumablesSkuName'), minWidth: 100 },
        { prop: 'consumablesSpec', label: this.$t('sku.consumables.consumablesSpec'), minWidth: 100 },
        { prop: 'consumablesSkuCategory', label: this.$t('sku.consumables.consumablesSkuCategory'), minWidth: 100 },
        { prop: 'consumablesBarcode', label: this.$t('sku.consumables.consumablesBarcode'), minWidth: 100 },
        { prop: 'consumablesNum', label: this.$t('sku.consumables.consumablesNum'), minWidth: 100, edit: { name: '$input', props: { type: 'number', min: 1, precision: 0 }}},
        { prop: 'remark', label: this.$t('sku.consumables.remark'), minWidth: 100, edit: { name: '$input' }}
      ]
      // 初始化供应商列表
      this.diaFormInfo.diaTableDim.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'supplierName', label: this.$t('sku.dim.supplierName'), minWidth: 100 },
        { prop: 'isEnableName', label: this.$t('sku.dim.isEnable'), minWidth: 100 },
        { prop: 'priorityLevel', label: this.$t('sku.dim.priorityLevel'), minWidth: 100, edit: { name: '$input', props: { type: 'number', min: 1, precision: 0 }}},
        { prop: 'remark', label: this.$t('sku.dim.remark'), minWidth: 100, edit: { name: '$input' }}
      ]
    },
    // 编辑页面的数据配置
    diaFormInfoEditFieldList() {
      this.formType = ''
      this.viewFlag = ''
      this.diaFormInfo.fieldList = [
        { label: this.$t('sku.skuCode'), value: 'skuCode', type: 'input', readonly: true },
        { label: this.$t('sku.skuName'), value: 'skuName', type: 'input' },
        // {label: this.$t('sku.tradeName'), value: "tradeName", type: "input"},
        { label: this.$t('sku.skuCategoryId'), value: 'skuCategoryId', type: 'slot' },
        { label: this.$t('sku.ownerName'), value: 'ownerId', type: 'slot' },
        { label: this.$t('sku.spec'), value: 'spec', type: 'input' },
        { label: this.$t('sku.mainUnit'), value: 'mainUnit', type: 'select', list: 'unitList' },
        { label: this.$t('sku.recUnit'), value: 'recUnit', type: 'select', list: 'unitList' },
        { label: this.$t('sku.perQty'), value: 'perQty', type: 'number', min: 1, precision: 0 },
        { label: this.$t('sku.barcode'), value: 'barcode', type: 'input' },
        { label: this.$t('sku.barcodeTwo'), value: 'barcodeTwo', type: 'input' },
        { label: this.$t('sku.barcodeThree'), value: 'barcodeThree', type: 'input' },
        { label: this.$t('sku.sourceId'), value: 'sourceId', type: 'input' },
        { label: this.$t('sku.sourceName'), value: 'sourceName', type: 'input' },
        { label: this.$t('sku.sourceSpec'), value: 'sourceSpec', type: 'input' },
        // {label: this.$t('sku.obUnit'), value: "obUnit", type: "select",list:'unitList'},
        // {label: this.$t('sku.invUnit'), value: "invUnit", type: "select",list:'unitList'},
        { label: this.$t('sku.hgSkuCode'), value: 'hgSkuCode', type: 'input' },
        { label: this.$t('sku.hgSkuName'), value: 'hgSkuName', type: 'input' },
        { label: this.$t('sku.taxCode'), value: 'taxCode', type: 'input' },
        { label: this.$t('sku.taxName'), value: 'taxName', type: 'input' },
        { label: this.$t('sku.taxFee'), value: 'taxFee', type: 'select', list: 'taxFeeList', clearable: false },

        { label: this.$t('sku.lengthDec'), value: 'lengthDec', type: 'number', min: 0, precision: 1 },
        { label: this.$t('sku.widthDec'), value: 'widthDec', type: 'number', min: 0, precision: 1 },
        { label: this.$t('sku.heightDec'), value: 'heightDec', type: 'number', min: 0, precision: 1 },
        { label: this.$t('sku.volDec'), value: 'volDec', type: 'number', min: 0, precision: 3 },
        { label: this.$t('sku.grossWeightKg'), value: 'grossWeightKg', type: 'number', min: 0, precision: 3, event: 'changeWeightKg' },
        { label: this.$t('sku.tareWeightKg'), value: 'tareWeightKg', type: 'number', min: 0, precision: 3, disabled: true },
        { label: this.$t('sku.netWeightKg'), value: 'netWeightKg', type: 'number', min: 0, precision: 3, event: 'changeWeightKg' },
        { label: this.$t('sku.costPriceDec'), value: 'costPriceDec', type: 'number', min: 0, precision: 2 },
        { label: this.$t('sku.tagPriceDec'), value: 'tagPriceDec', type: 'number', min: 0, precision: 2 },
        { label: this.$t('sku.salePriceDec'), value: 'salePriceDec', type: 'number', min: 0, precision: 2 },

        { label: this.$t('sku.abc'), value: 'abc', type: 'select', list: 'abcTypeList' },
        { label: this.$t('sku.mfgId'), value: 'mfgId', type: 'slot' },
        { label: this.$t('sku.outFactoryCode'), value: 'outFactoryCode', type: 'input' },
        { label: this.$t('sku.brandName'), value: 'brandName', type: 'input' },
        { label: this.$t('sku.model'), value: 'model', type: 'input' },
        { label: this.$t('sku.originCountry'), value: 'originCountry', type: 'input' },
        { label: this.$t('sku.typeNo'), value: 'typeNo', type: 'input' },
        { label: this.$t('sku.colour'), value: 'colour', type: 'input' },
        { label: this.$t('sku.size'), value: 'size', type: 'input' },

        { label: this.$t('sku.logistics'), value: 'logistics', type: 'select', list: 'logisticsList' },
        { label: this.$t('sku.midPackQty'), value: 'midPackQty', type: 'number', min: 1, precision: 0 },
        { label: this.$t('sku.tempControl'), value: 'tempControl', type: 'select', list: 'tempControlList' },
        { label: this.$t('sku.scatteredProperties'), value: 'scatteredProperties', type: 'select', list: 'scatteredPropertiesList' },
        { label: this.$t('sku.isBatchManage'), value: 'isBatchManage', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('sku.isSerialNumber'), value: 'isSerialNumber', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('sku.isValidity'), value: 'isValidity', type: 'select', list: 'whetherList', event: 'handleValidity', clearable: false },

        { label: this.$t('sku.validityType'), value: 'validityType', type: 'select', list: 'validityTypeList', event: 'handleValidityType', disabled: true },
        { label: this.$t('sku.validityDay'), value: 'validityDay', type: 'number', min: 0, precision: 0, disabled: true },
        { label: this.$t('sku.warmValidityDay'), value: 'warmValidityDay', type: 'number', min: 0, precision: 0, disabled: true },
        { label: this.$t('sku.inWhValidity'), value: 'inWhValidity', type: 'number', min: 0, precision: 0, disabled: true },
        { label: this.$t('sku.outWhValidity'), value: 'outWhValidity', type: 'number', min: 0, precision: 0, disabled: true },

        { label: this.$t('sku.isValuables'), value: 'isValuables', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('sku.isCombination'), value: 'isCombination', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('sku.isGift'), value: 'isGift', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('sku.isFresh'), value: 'isFresh', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('sku.isConsumables'), value: 'isConsumables', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('sku.isEnable'), value: 'isEnable', type: 'select', list: 'whetherList', clearable: false }

      ]
      this.diaFormInfo.diaFormInfoControl.fieldList = [
        { label: this.$t('sku.control.invTurnoverRuleId'), value: 'invTurnoverRuleId', type: 'select', list: 'invTurnoverRuleList' },
        { label: this.$t('sku.control.recRuleId'), value: 'recRuleId', type: 'select', list: 'recRuleList' },
        { label: this.$t('sku.control.qcRuleId'), value: 'qcRuleId', type: 'select', list: 'qcRuleList' },
        { label: this.$t('sku.control.paRuleId'), value: 'paRuleId', type: 'select', list: 'paRuleList' },
        { label: this.$t('sku.control.cpfrRuleId'), value: 'cpfrRuleId', type: 'select', list: 'cpfrRuleList' },
        { label: this.$t('sku.control.batchRuleId'), value: 'batchRuleId', type: 'select', list: 'batchRuleList' },
        { label: this.$t('sku.control.serialNumberRuleId'), value: 'serialNumberRuleId', type: 'select', list: 'serialNumberRuleList' },

        { label: this.$t('sku.control.assignRuleId'), value: 'assignRuleId', type: 'select', list: 'invAssignRuleList' },
        { label: this.$t('sku.control.paZoneIds'), value: 'paZoneIdArray', type: 'slot' },
        { label: this.$t('sku.control.paLotIds'), value: 'paLotIdArray', type: 'input', event: 'changePaLotCode' },
        { label: this.$t('sku.control.turnoverLevel'), value: 'turnoverLevel', type: 'select', list: 'turnoverLevelList' },

        { label: this.$t('sku.control.invMax'), value: 'invMax', type: 'input' },
        { label: this.$t('sku.control.invMin'), value: 'invMin', type: 'input' },
        { label: this.$t('sku.control.reorderQty'), value: 'reorderQty', type: 'input' }

      ]
      this.diaFormInfo.diaFormInfoGSP.fieldList = [
        { label: this.$t('sku.gsp.drugForm'), value: 'drugForm', type: 'input' },
        { label: this.$t('sku.gsp.drugFormSpec'), value: 'drugFormSpec', type: 'input' },
        { label: this.$t('sku.gsp.maintenanceType'), value: 'maintenanceType', type: 'select', list: 'maintenanceTypeList' },
        { label: this.$t('sku.gsp.maintenanceCycle'), value: 'maintenanceCycle', type: 'input' },

        { label: this.$t('sku.gsp.isFirstCamp'), value: 'isFirstCamp', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('sku.gsp.isTwoSpiritDrug'), value: 'isTwoSpiritDrug', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('sku.gsp.isDoubleCheck'), value: 'isDoubleCheck', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('sku.gsp.isDrugSuperCode'), value: 'isDrugSuperCode', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('sku.gsp.isPrintDrugRep'), value: 'isPrintDrugRep', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('sku.gsp.isScanTwoSeq'), value: 'isScanTwoSeq', type: 'select', list: 'whetherList', clearable: false },
        { label: this.$t('sku.gsp.isOneGoodsOneCode'), value: 'isOneGoodsOneCode', type: 'select', list: 'whetherList', clearable: false }
      ]
      this.diaFormInfo.diaTableGrmp.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'factoryName', label: this.$t('sku.grmp.factoryName'), minWidth: 200 },
        { prop: 'certificateNo', label: this.$t('sku.grmp.certificateNo'), minWidth: 200, edit: { name: '$input' }},
        { prop: 'effectiveDate', label: this.$t('sku.grmp.effectiveDate'), minWidth: 150, edit: { name: 'ElDatePicker', props: { type: 'date', format: 'yyyy-MM-dd', clearable: false }}},
        { prop: 'expirationDate', label: this.$t('sku.grmp.expirationDate'), minWidth: 150, edit: { name: 'ElDatePicker', props: { type: 'date', format: 'yyyy-MM-dd', clearable: false }}},
        { prop: 'isEnable', label: this.$t('sku.grmp.isEnable'), minWidth: 100, edit: { name: 'ElSelect', options: this.listTypeInfo.whetherList, props: { clearable: false }}},

        { prop: 'remark', label: this.$t('sku.grmp.remark'), minWidth: 100, edit: { name: '$input' }}
      ]
      this.diaFormInfo.diaTableCert.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'certificateNo', label: this.$t('sku.cert.certificateNo'), minWidth: 200, edit: { name: '$input' }},
        { prop: 'effectiveDate', label: this.$t('sku.cert.effectiveDate'), minWidth: 200, edit: { name: 'ElDatePicker', props: { type: 'date', format: 'yyyy-MM-dd', clearable: false }}},
        { prop: 'expirationDate', label: this.$t('sku.cert.expirationDate'), minWidth: 200, edit: { name: 'ElDatePicker', props: { type: 'date', format: 'yyyy-MM-dd', clearable: false }}},
        { prop: 'isEnable', label: this.$t('sku.cert.isEnable'), minWidth: 100, edit: { name: 'ElSelect', options: this.listTypeInfo.whetherList, props: { clearable: false }}},
        { prop: 'remark', label: this.$t('sku.cert.remark'), minWidth: 100, edit: { name: '$input' }}
      ]
      this.diaFormInfo.diaTableBom.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'bomSkuCode', label: this.$t('sku.bom.bomSkuCode'), minWidth: 100 },
        { prop: 'bomSkuName', label: this.$t('sku.bom.bomSkuName'), minWidth: 100 },
        { prop: 'bomSpec', label: this.$t('sku.bom.bomSpec'), minWidth: 100 },
        { prop: 'bomSkuCategory', label: this.$t('sku.bom.bomSkuCategory'), minWidth: 100 },
        { prop: 'bomBarcode', label: this.$t('sku.bom.bomBarcode'), minWidth: 100 },
        { prop: 'bomNum', label: this.$t('sku.bom.bomNum'), minWidth: 100, edit: { name: '$input', props: { type: 'number', min: 1, precision: 0 }}},
        { prop: 'remark', label: this.$t('sku.bom.remark'), minWidth: 100, edit: { name: '$input' }}
      ]
      this.diaFormInfo.diaTableCpfr.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        // {prop:"cpfrAreaName", label:this.$t('sku.cpfrAreaName'), minWidth:100},
        // {prop:"cpfrZoneName", label:this.$t('sku.cpfrZoneName'), minWidth:100},
        { prop: 'cpfrLotName', label: this.$t('sku.control.cpfrLotName'), minWidth: 100 },
        { prop: 'cpfrMax', label: this.$t('sku.control.cpfrMax'), minWidth: 150, edit: { name: '$input', props: { type: 'number' }}},
        { prop: 'cpfrMin', label: this.$t('sku.control.cpfrMin'), minWidth: 150, edit: { name: '$input', props: { type: 'number' }}},
        { prop: 'minCpfrQty', label: this.$t('sku.control.minCpfrQty'), minWidth: 150, edit: { name: '$input', props: { type: 'number' }}},
        { prop: 'remark', label: this.$t('sku.control.remark'), minWidth: 100, edit: { name: 'input' }}
      ]
      // 初始化耗材列表
      this.diaFormInfo.diaTableConsumables.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'consumablesSkuCode', label: this.$t('sku.consumables.consumablesSkuCode'), minWidth: 100 },
        { prop: 'consumablesSkuName', label: this.$t('sku.consumables.consumablesSkuName'), minWidth: 100 },
        { prop: 'consumablesSpec', label: this.$t('sku.consumables.consumablesSpec'), minWidth: 100 },
        { prop: 'consumablesSkuCategory', label: this.$t('sku.consumables.consumablesSkuCategory'), minWidth: 100 },
        { prop: 'consumablesBarcode', label: this.$t('sku.consumables.consumablesBarcode'), minWidth: 100 },
        { prop: 'consumablesNum', label: this.$t('sku.consumables.consumablesNum'), minWidth: 100, edit: { name: '$input', props: { type: 'number', min: 1, precision: 0 }}},
        { prop: 'remark', label: this.$t('sku.consumables.remark'), minWidth: 100, edit: { name: '$input' }}
      ]
      // 初始化供应商列表
      this.diaFormInfo.diaTableDim.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'supplierName', label: this.$t('sku.dim.supplierName'), minWidth: 100 },
        { prop: 'isEnableName', label: this.$t('sku.dim.isEnable'), minWidth: 100 },
        { prop: 'priorityLevel', label: this.$t('sku.dim.priorityLevel'), minWidth: 100, edit: { name: '$input', props: { type: 'number', min: 1, precision: 0 }}},
        { prop: 'remark', label: this.$t('sku.dim.remark'), minWidth: 100, edit: { name: '$input' }}
      ]
    },
    // diaFormInfo配置的表单全局校验规则的初始化方法，这里添加配置于该表单上的所有需要进行校验的字段
    rulesInit() {
      this.diaFormInfo.rules = {
        ownerId: [{ required: true, message: this.$t('sku.msg.ownerId'), trigger: 'change' }],
        skuName: [{ required: true, message: this.$t('sku.msg.skuName'), trigger: 'blur' }],
        barcode: [{ required: true, message: this.$t('sku.msg.barcode'), trigger: 'blur' }],
        skuCode: [{ required: true, message: this.$t('sku.msg.skuCode'), trigger: 'blur' }],
        spec: [{ required: true, message: this.$t('sku.msg.spec'), trigger: 'blur' }],
        skuCategoryId: [{ required: true, message: this.$t('sku.msg.skuCategoryId'), trigger: 'change' }],
        mainUnit: [{ required: true, message: this.$t('sku.msg.mainUnit'), trigger: 'blur' }],
        taxFeeDec: [{ required: false, validator: this.$valid.getNumberValidatorAllowNullMaxSix(), trigger: 'blur' }],

        perQty: [{ required: true, message: this.$t('sku.msg.perQty'), trigger: 'blur' }],
        // isValuables:[{required: true, message: this.$t('sku.msg.isValuables'), trigger: 'blur'}],
        // tagPrice:[{required: true, message: this.$t('sku.msg.tagPrice'), trigger: 'blur'}],
        //
        // model:[{required: true, message: this.$t('sku.msg.model'), trigger: 'blur'}],
        // id:[{required: true, message: this.$t('sku.msg.id'), trigger: 'blur'}],
        // grossWeight:[{required: true, message: this.$t('sku.msg.grossWeight'), trigger: 'blur'}],
        //
        // height:[{required: true, message: this.$t('sku.msg.height'), trigger: 'blur'}],
        // defaultZoneCode:[{required: true, message: this.$t('sku.msg.defaultZoneCode'), trigger: 'blur'}],
        // createTime:[{required: true, message: this.$t('sku.msg.createTime'), trigger: 'blur'}],
        // brandName:[{required: true, message: this.$t('sku.msg.brandName'), trigger: 'blur'}],
        // isCombination:[{required: true, message: this.$t('sku.msg.isCombination'), trigger: 'blur'}],
        recUnit: [{ required: true, message: this.$t('sku.msg.recUnit'), trigger: 'blur' }]
        // barcodeTwo:[{required: true, message: this.$t('sku.msg.barcodeTwo'), trigger: 'blur'}],
        // isGift:[{required: true, message: this.$t('sku.msg.isGift'), trigger: 'blur'}],
        // size:[{required: true, message: this.$t('sku.msg.size'), trigger: 'blur'}],
        // sysSkuCode:[{required: true, message: this.$t('sku.msg.sysSkuCode'), trigger: 'blur'}],
        // serialNumberId:[{required: true, message: this.$t('sku.msg.serialNumberId'), trigger: 'blur'}],
        //
        //
        // typeNo:[{required: true, message: this.$t('sku.msg.typeNo'), trigger: 'blur'}],
        // inWhValidity:[{required: true, message: this.$t('sku.msg.inWhValidity'), trigger: 'blur'}],
        // hgSkuCode:[{required: true, message: this.$t('sku.msg.hgSkuCode'), trigger: 'blur'}],
        // batchId:[{required: true, message: this.$t('sku.msg.batchId'), trigger: 'blur'}],
        // warmValidityDay:[{required: true, message: this.$t('sku.msg.warmValidityDay'), trigger: 'blur'}],
        // logistics:[{required: true, message: this.$t('sku.msg.logistics'), trigger: 'blur'}],
        // remark:[{required: true, message: this.$t('sku.msg.remark'), trigger: 'blur'}],
        // validityDay:[{required: true, message: this.$t('sku.msg.validityDay'), trigger: 'blur'}],
        // isSerialNumber:[{required: true, message: this.$t('sku.msg.isSerialNumber'), trigger: 'blur'}],
        // defaultLotCode:[{required: true, message: this.$t('sku.msg.defaultLotCode'), trigger: 'blur'}],
        // updater:[{required: true, message: this.$t('sku.msg.updater'), trigger: 'blur'}],
        // vol:[{required: true, message: this.$t('sku.msg.vol'), trigger: 'blur'}],
        // updateTime:[{required: true, message: this.$t('sku.msg.updateTime'), trigger: 'blur'}],
        // outFactoryCode:[{required: true, message: this.$t('sku.msg.outFactoryCode'), trigger: 'blur'}],
        // companyCode:[{required: true, message: this.$t('sku.msg.companyCode'), trigger: 'blur'}],
        // isValidity:[{required: true, message: this.$t('sku.msg.isValidity'), trigger: 'blur'}],
        // costPrice:[{required: true, message: this.$t('sku.msg.costPrice'), trigger: 'blur'}],
        // midPackQty:[{required: true, message: this.$t('sku.msg.midPackQty'), trigger: 'blur'}],
        // creator:[{required: true, message: this.$t('sku.msg.creator'), trigger: 'blur'}],
        // abc:[{required: true, message: this.$t('sku.msg.abc'), trigger: 'blur'}],
        // isBatchManage:[{required: true, message: this.$t('sku.msg.isBatchManage'), trigger: 'blur'}],
        // length:[{required: true, message: this.$t('sku.msg.length'), trigger: 'blur'}],
        // salePrice:[{required: true, message: this.$t('sku.msg.salePrice'), trigger: 'blur'}],
        // isFresh:[{required: true, message: this.$t('sku.msg.isFresh'), trigger: 'blur'}],
        // mfg:[{required: true, message: this.$t('sku.msg.mfg'), trigger: 'blur'}],
        // originCountry:[{required: true, message: this.$t('sku.msg.originCountry'), trigger: 'blur'}],
        // obUnit:[{required: true, message: this.$t('sku.msg.obUnit'), trigger: 'blur'}],
        // updaterName:[{required: true, message: this.$t('sku.msg.updaterName'), trigger: 'blur'}],
        // outWhValidity:[{required: true, message: this.$t('sku.msg.outWhValidity'), trigger: 'blur'}],
        // colour:[{required: true, message: this.$t('sku.msg.colour'), trigger: 'blur'}],
        // width:[{required: true, message: this.$t('sku.msg.width'), trigger: 'blur'}],
        // creatorName:[{required: true, message: this.$t('sku.msg.creatorName'), trigger: 'blur'}],
        // isConsumables:[{required: true, message: this.$t('sku.msg.isConsumables'), trigger: 'blur'}],
        // hgSkuName:[{required: true, message: this.$t('sku.msg.hgSkuName'), trigger: 'blur'}],
      }
      this.diaFormInfo.diaFormInfoControl.rules = {
        invTurnoverRuleId: [{ required: true, message: this.$t('sku.msg.control.invTurnoverRuleId'), trigger: 'change' }],
        recRuleId: [{ required: true, message: this.$t('sku.msg.control.recRuleId'), trigger: 'change' }],
        qcRuleId: [{ required: true, message: this.$t('sku.msg.control.qcRuleId'), trigger: 'change' }],
        paRuleId: [{ required: true, message: this.$t('sku.msg.control.paRuleId'), trigger: 'change' }],
        cpfrRuleId: [{ required: true, message: this.$t('sku.msg.control.cpfrRuleId'), trigger: 'change' }],
        assignRuleId: [{ required: true, message: this.$t('sku.msg.control.assignRuleId'), trigger: 'change' }]
        // batchRuleId:[{required: true, message: this.$t('sku.msg.control.batchRuleId'), trigger: 'change'}],
        // serialNumberRuleId:[{required: true, message: this.$t('sku.msg.control.serialNumberRuleId'), trigger: 'change'}],
      }
      this.dialogInfoCpfr.formInfo.rules = {
        cpfrLotId: [{ required: true, message: this.$t('sku.msg.control.cpfrLotId'), trigger: 'change' }],
        cpfrMax: [{ required: true, validator: this.$valid.getIntegerValidator(), trigger: 'blur' }],
        cpfrMin: [{ required: true, validator: this.$valid.getIntegerValidator(), trigger: 'blur' }],
        minCpfrQty: [{ required: true, validator: this.$valid.getIntegerValidator(), trigger: 'blur' }]
      }
      this.dialogInfoGrmp.formInfo.rules = {
        factoryId: [{ required: true, message: this.$t('sku.msg.grmp.factoryId'), trigger: 'change' }],
        certificateNo: [{ required: true, message: this.$t('sku.msg.grmp.certificateNo'), trigger: 'blur' }],
        // effectiveDate:[{required: true, message: this.$t('sku.msg.grmp.effectiveDate'), trigger: 'change'}],
        // expirationDate:[{required: true, message: this.$t('sku.msg.grmp.expirationDate'), trigger: 'change'}],
        isEnable: [{ required: true, message: this.$t('sku.msg.grmp.isEnable'), trigger: 'change' }]
      }
      this.dialogInfoCert.formInfo.rules = {
        certificateNo: [{ required: true, message: this.$t('sku.msg.cert.certificateNo'), trigger: 'blur' }],
        // effectiveDate:[{required: true, message: this.$t('sku.msg.cert.effectiveDate'), trigger: 'change'}],
        // expirationDate:[{required: true, message: this.$t('sku.msg.cert.expirationDate'), trigger: 'change'}],
        isEnable: [{ required: true, message: this.$t('sku.msg.cert.isEnable'), trigger: 'change' }]
      }
      this.dialogInfoBom.formInfo.rules = {
        bomSkuId: [{ required: true, message: this.$t('sku.msg.bom.bomSkuId'), trigger: 'blur' }],
        bomNum: [{ required: true, validator: this.$valid.getIntegerValidator(), trigger: 'change' }]
      }
      this.dialogInfoDim.formInfo.rules = {
        supplierId: [{ required: true, message: this.$t('sku.msg.dim.supplierId'), trigger: 'change' }]
      }
      this.diaFormInfo.diaTableCpfr.rules = {
        cpfrMax: [{ required: true, message: this.$t('sku.msg.cpfr.cpfrMax') }],
        cpfrMin: [{ required: true, message: this.$t('sku.msg.cpfr.cpfrMin') }],
        minCpfrQty: [{ required: true, message: this.$t('sku.msg.cpfr.minCpfrQty') }]
      }
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {
      this.diaFormInfo.data = {
        validityType: null,
        invUnit: null,
        isEnable: 1,
        ownerId: null,
        netWeight: null,
        spec: null,
        perQty: null,
        isValuables: 0,
        tagPrice: null,
        skuName: null,
        model: null,
        id: null,
        grossWeight: null,
        barcode: null,
        height: null,
        defaultZoneCode: null,
        createTime: null,
        brandName: null,
        isCombination: 0,
        sourceSpec: null,
        recUnit: null,
        barcodeTwo: null,
        isGift: 0,
        size: null,
        sysSkuCode: null,
        serialNumberId: null,
        skuCategory: null,
        supplierId: null,
        skuCode: null,
        mainUnit: null,
        typeNo: null,
        inWhValidity: null,
        barcodeThree: null,
        hgSkuCode: null,
        batchId: null,
        warmValidityDay: null,
        logistics: null,
        remark: null,
        validityDay: null,
        isSerialNumber: 0,
        defaultLotCode: null,
        updater: null,
        vol: null,
        updateTime: null,
        outFactoryCode: null,
        companyCode: null,
        isValidity: 0,
        sourceName: null,
        costPrice: null,
        midPackQty: null,
        creator: null,
        abc: null,
        isBatchManage: 1,
        length: null,
        salePrice: null,
        isFresh: 0,
        mfg: null,
        originCountry: null,
        obUnit: null,
        updaterName: null,
        outWhValidity: null,
        colour: null,
        width: null,
        creatorName: null,
        isConsumables: 0,
        sourceId: null,
        hgSkuName: null,
        tempControl: null,
        skuCategoryId: null,
        lengthDec: 0,
        widthDec: 0,
        heightDec: 0,
        volDec: 0,
        grossWeightKg: 0,
        tareWeightKg: 0,
        netWeightKg: 0,
        costPriceDec: 0,
        tagPriceDec: 0,
        salePriceDec: 0
      }
      this.diaFormInfo.diaFormInfoGSP.data = {
        drugForm: null,
        drugFormSpec: null,
        maintenanceType: null,
        maintenanceCycle: null,

        isFirstCamp: 0,
        isTwoSpiritDrug: 0,
        isDoubleCheck: 0,
        isDrugSuperCode: 0,
        isPrintDrugRep: 0,
        isScanTwoSeq: 0,
        isOneGoodsOneCode: 0
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
