<template>
  <div>
    <full-pop
      :visible.sync="fullDialogInfo.visible"
      :top-title="fullDialogInfo.title"
      :close-btn="fullDialogInfo.closeBtn"
      :save-list="fullDialogInfo.btList"
      @handleClick="handleClick"
    >
      <full-pop-item :full-pop-item-title="$t('receivableFees.receivableFeesInfo')">
        <zhqc-top-form-sc
          :ref-obj.sync="topForm.ref"
          :data="topForm.data"
          :field-list="topForm.fieldList"
          :rules="topForm.rules"
          :list-type-info="listTypeInfo"
          :label-width="topForm.labelWidth"
          :default-collapsable="true"
        />
      </full-pop-item>
      <full-pop-item :full-pop-item-title="$t('receivableFees.sources')">
        <zhqc-table
          :data.sync="sourcesTableInfo.data"
          :field-list="sourcesTableInfo.fieldList"
          :handle="sourcesTableInfo.handle"
          @handleClick="handleClick"
          @handleEvent="handleEvent"
        />
      </full-pop-item>
      <full-pop-item :full-pop-item-title="$t('receivableFees.adjustmentRecord')">
        <zhqc-table
          :data.sync="adjustmentTableInfo.data"
          :field-list="adjustmentTableInfo.fieldList"
          :handle="adjustmentTableInfo.handle"
          @handleClick="handleClick"
          @handleEvent="handleEvent"
        />
      </full-pop-item>
      <full-pop-item :full-pop-item-title="$t('receivableFees.operationRecord')">
        <zhqc-table
          :data.sync="operationTableInfo.data"
          :field-list="operationTableInfo.fieldList"
          :handle="operationTableInfo.handle"
          @handleClick="handleClick"
          @handleEvent="handleEvent"
        />
      </full-pop-item>
    </full-pop>

    <!-- 弹框 -->
    <zhqc-dialog
      :title="dialogInfo.title"
      :visible.sync="dialogInfo.visible"
      :width="'400px'"
      :bt-list="dialogInfo.btList"
      @handleClick="handleClick"
    >
      <zhqc-form
        :ref-obj.sync="dialogInfo.ref"
        :data="dialogInfo.data"
        :field-list="dialogInfo.fieldList"
        :rules="dialogInfo.rules"
        :form-type="dialogInfo.type"
        :list-type-info="listTypeInfo"
        :label-width="dialogInfo.labelWidth"
        @handleEvent="handleEvent"
      >
        <template v-slot:form-certificate="">
          <upload-file
            :export-url="exportImgUrl"
            :img-pre-src-list="pictureList"
            :accept="accept"
            :show-tips="true"
            @handleImgSuccess="handleImgSuccess"
            @handleRemove="handleRemove"
          />
        </template>
      </zhqc-form>
    </zhqc-dialog>
  </div>
</template>

<script>
import { VUE_APP_BASE_URL } from '@/api/api.config.js'
export default {
  name: 'ReceivableFeesDetail',
  components: {
    UploadFile: () => import('@/Subassembly/upload/upload.vue')
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'view'
    },
    listTypeInfo: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      store: 'receivableFees/',
      modName: 'receivableFees',
      // 弹框配置
      fullDialogInfo: {
        title: '',
        visible: false,
        type: '',
        varSup: false,
        varCus: false,
        varStore: false,
        varProvince: true,
        varCity: true,
        varArea: true,
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', show: true }
        ]
      },
      topForm: {
        ref: null, // 对外提供的可操作表单的持有对象
        fieldList: null, // 配置的表单字段集合
        data: {},
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      sourcesTableInfo: {
        fieldList: null,
        data: []
      },
      adjustmentTableInfo: {
        fieldList: null,
        data: []
      },
      operationTableInfo: {
        fieldList: null,
        data: []
      },
      dialogInfo: {
        ref: null,
        visible: false,
        flag: '',
        title: this.$t('receivableFees.adjustmentFees'),
        type: '',
        width: '',
        data: {},
        rules: {},
        fieldList: [],
        closeBtn: { label: '', type: '', icon: '', event: 'closeDialog', show: true },
        btList: [
          { label: this.$t('table.cancel'), type: '', icon: '', event: 'closeDialog', show: true },
          { label: this.$t('table.confirm'), type: 'primary', icon: '', event: 'comfirn', btLoading: false, show: true }
        ]
      },
      exportImgUrl: VUE_APP_BASE_URL + 'fileMgr/fileManager/upload2Path',
      accept: null,
      pictureList: [],
      evidenceList: []
    }
  },

  watch: {
    visible(val) {
      if (val) {
        this.initBaseInfo()
        this.fullDialogInfo.visible = true
      }
    }
  },

  created() {
    this.initSourcesTableInfo()
    this.initAdjustmentTableInfo()
    this.initOperationTableInfo()
    this.initDiaForm()
  },

  methods: {
    /* 初始化基本信息 */
    initBaseInfo() {
      this.topForm.fieldList = [
        { label: this.$t('receivableFees.receivableFeesNo'), value: 'receivableFeesNo', type: 'input', disabled: true },
        { label: this.$t('receivableFees.status'), value: 'status', type: 'input', disabled: true },
        { label: this.$t('receivableFees.reason'), value: 'reason', type: 'input', disabled: true },
        { label: this.$t('receivableFees.feesTime'), value: 'feesTime', type: 'input', disabled: true },
        { label: this.$t('receivableFees.sysBusinessNo'), value: 'sysBusinessNo', type: 'input', disabled: true },
        { label: this.$t('receivableFees.businessType'), value: 'businessType', type: 'input', disabled: true },
        { label: this.$t('receivableFees.associatedContract'), value: 'associatedContract', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss', disabled: true },
        { label: this.$t('receivableFees.attributionDept'), value: 'attributionDept', type: 'input', disabled: true },
        { label: this.$t('receivableFees.settlementUnit'), value: 'settlementUnit', type: 'input', disabled: true },
        { label: this.$t('receivableFees.billSuject'), value: 'billSuject', type: 'input', disabled: true },
        { label: this.$t('receivableFees.settlementQty'), value: 'settlementQty', type: 'input', disabled: true },
        { label: this.$t('receivableFees.settlementUnitPrice'), value: 'settlementUnitPrice', type: 'input', disabled: true },
        { label: this.$t('receivableFees.orderReceivableFees'), value: 'orderReceivableFees', type: 'input', disabled: true },
        { label: this.$t('receivableFees.orderReceivableAttachFees'), value: 'orderReceivableAttachFees', type: 'input', disabled: true, className: 'single-line' },
        { label: this.$t('receivableFees.orderReceivableReduceFees'), value: 'orderReceivableReduceFees', type: 'input', disabled: true, className: 'single-line' },
        { label: this.$t('receivableFees.orderReceivableSubtotal'), value: 'orderReceivableSubtotal', type: 'input', disabled: true, className: 'single-line' },
        { label: this.$t('receivableFees.currency'), value: 'currency', type: 'input', disabled: true },
        { label: this.$t('receivableFees.relatedBill'), value: 'relatedBill', type: 'input', disabled: true },
        { label: this.$t('receivableFees.associatedOrderNo'), value: 'associatedOrderNo', type: 'input', disabled: true },
        { label: this.$t('receivableFees.billingCycle'), value: 'billingCycle', type: 'input', disabled: true }
      ]
    },

    // 初始化数据源
    initSourcesTableInfo() {
      this.sourcesTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 },
        { prop: 'customerNo1', label: this.$t('receivableFees.customerNo1'), minWidth: 100 },
        { prop: 'customerNo2', label: this.$t('receivableFees.customerNo2'), minWidth: 100 },
        { prop: 'owner', label: this.$t('receivableFees.owner'), minWidth: 100 },
        { prop: 'supplier', label: this.$t('receivableFees.supplier'), minWidth: 100 },
        { prop: 'storehouse', label: this.$t('receivableFees.storehouse'), minWidth: 100 },
        { prop: 'salesWarehouse', label: this.$t('receivableFees.salesWarehouse'), minWidth: 100 },
        { prop: 'carrier', label: this.$t('receivableFees.carrier'), minWidth: 100 },
        { prop: 'customer', label: this.$t('receivableFees.customer'), minWidth: 100 },
        { prop: 'sender', label: this.$t('receivableFees.sender'), minWidth: 100 },
        { prop: 'sendContactor', label: this.$t('receivableFees.sendContactor'), minWidth: 100 },
        { prop: 'sendPhone', label: this.$t('receivableFees.sendPhone'), minWidth: 100 },
        { prop: 'sendLocation', label: this.$t('receivableFees.sendLocation'), minWidth: 100 },
        { prop: 'receiver', label: this.$t('receivableFees.receiver'), minWidth: 100 },
        { prop: 'receiveContactor', label: this.$t('receivableFees.receiveContactor'), minWidth: 100 },
        { prop: 'receivePhone', label: this.$t('receivableFees.receivePhone'), minWidth: 100 },
        { prop: 'receiveLocation', label: this.$t('receivableFees.receiveLocation'), minWidth: 100 },
        { prop: 'lineCode', label: this.$t('receivableFees.lineCode'), minWidth: 100 },
        { prop: 'lineDesc', label: this.$t('receivableFees.lineDesc'), minWidth: 100 },
        { prop: 'deliverType', label: this.$t('receivableFees.deliverType'), minWidth: 100 },
        { prop: 'unloadType', label: this.$t('receivableFees.unloadType'), minWidth: 100 },
        { prop: 'transportType', label: this.$t('receivableFees.transportType'), minWidth: 100 },
        { prop: 'transportTools', label: this.$t('receivableFees.transportTools'), minWidth: 100 },
        { prop: 'mileage', label: this.$t('receivableFees.mileage'), minWidth: 100 },
        { prop: 'skuNo', label: this.$t('receivableFees.skuNo'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('receivableFees.skuName'), minWidth: 100 },
        { prop: 'skuCategory', label: this.$t('receivableFees.skuCategory'), minWidth: 100 },
        { prop: 'skuSpec', label: this.$t('receivableFees.skuSpec'), minWidth: 100 },
        { prop: 'skuUnit', label: this.$t('receivableFees.skuUnit'), minWidth: 100 },
        { prop: 'orderQty', label: this.$t('receivableFees.orderQty'), minWidth: 100 },
        { prop: 'orderPallets', label: this.$t('receivableFees.orderPallets'), minWidth: 100 },
        { prop: 'orderGrossWeight', label: this.$t('receivableFees.orderGrossWeight'), minWidth: 100 },
        { prop: 'orderNetWeight', label: this.$t('receivableFees.orderNetWeight'), minWidth: 100 },
        { prop: 'orderVolume', label: this.$t('receivableFees.orderVolume'), minWidth: 100 },
        { prop: 'orderValue', label: this.$t('receivableFees.orderValue'), minWidth: 100 },
        { prop: 'actualQty', label: this.$t('receivableFees.actualQty'), minWidth: 100 },
        { prop: 'actualPallets', label: this.$t('receivableFees.actualPallets'), minWidth: 100 },
        { prop: 'actualGrossWeight', label: this.$t('receivableFees.actualGrossWeight'), minWidth: 100 },
        { prop: 'actualNetWeight', label: this.$t('receivableFees.actualNetWeight'), minWidth: 100 },
        { prop: 'actualVolume', label: this.$t('receivableFees.actualVolume'), minWidth: 100 },
        { prop: 'actualValue', label: this.$t('receivableFees.actualValue'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('receivableFees.productionBatch'), minWidth: 100 },
        { prop: 'sysBatch', label: this.$t('receivableFees.sysBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('receivableFees.productionDate'), minWidth: 100 },
        { prop: 'validPeriod', label: this.$t('receivableFees.validPeriod'), minWidth: 100 },
        { prop: 'remark', label: this.$t('receivableFees.remark'), minWidth: 100 },
        { prop: 'settlementQty', label: this.$t('receivableFees.settlementQty'), minWidth: 100 },
        { prop: 'settlementUnitPrice', label: this.$t('receivableFees.settlementUnitPrice'), minWidth: 100 },
        { prop: 'receivableFees', label: this.$t('receivableFees.receivableFees'), minWidth: 100 },
        { prop: 'receivableAttachFees', label: this.$t('receivableFees.receivableAttachFees'), minWidth: 130 },
        { prop: 'receivableReduceFees', label: this.$t('receivableFees.receivableReduceFees'), minWidth: 130 },
        { prop: 'receivableSubtotal', label: this.$t('receivableFees.receivableSubtotal'), minWidth: 100 }
      ]
    },

    // 初始化调整记录
    initAdjustmentTableInfo() {
      this.adjustmentTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 },
        { prop: 'operationTime', label: this.$t('receivableFees.operationTime'), minWidth: 100 },
        { prop: 'operator', label: this.$t('receivableFees.operator'), minWidth: 100 },
        { prop: 'adjustmentType', label: this.$t('receivableFees.adjustmentType'), minWidth: 100 },
        { prop: 'adjustmentAmount', label: this.$t('receivableFees.adjustmentAmount'), minWidth: 100 },
        { prop: 'adjustmentRemark', label: this.$t('receivableFees.adjustmentRemark'), minWidth: 100 },
        { prop: 'certificate', label: this.$t('receivableFees.certificate'), minWidth: 100 }
      ]
    },

    // 初始化操作记录
    initOperationTableInfo() {
      this.operationTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 },
        { prop: 'operationTime', label: this.$t('receivableFees.operationTime'), minWidth: 100 },
        { prop: 'operator', label: this.$t('receivableFees.operator'), minWidth: 100 },
        { prop: 'operateContent', label: this.$t('receivableFees.operateContent'), minWidth: 100 },
        { prop: 'operateRemark', label: this.$t('receivableFees.operateRemark'), minWidth: 100 },
        { prop: 'certificate', label: this.$t('receivableFees.certificate'), minWidth: 100 }
      ]
    },

    initDiaForm() {
      this.dialogInfo.fieldList = [
        { label: this.$t('receivableFees.adjustmentType'), value: 'adjustmentType', type: 'select', list: 'adjustmentTypeList' },
        { label: this.$t('receivableFees.adjustmentAmount'), value: 'adjustmentAmount', type: 'input' },
        { label: this.$t('receivableFees.adjustmentRemark'), value: 'adjustmentRemark', type: 'input' },
        { label: this.$t('receivableFees.certificate'), value: 'certificate', type: 'slot' }
      ]

      this.dialogInfo.rules = {
        adjustmentType: [{ required: true, message: this.$t('receivableFees.msg.adjustmentType'), trigger: 'blur' }],
        adjustmentAmount: [{ required: true, message: this.$t('receivableFees.msg.adjustmentAmount'), trigger: 'blur' }]
      }
    },

    initData() {},

    handleImgSuccess(list) {
      this.evidenceList = list.map(item => ({
        type: item.endsWith('.pdf') ? 2 : 1,
        path: item
      }))
    },

    handleRemove(list) {
      this.evidenceList = list.map(item => ({
        type: item.endsWith('.pdf') ? 2 : 1,
        path: item
      }))
    },

    addAdjustmentRecord() {
      this.dialogInfo.visible = true
      this.$nextTick(() => {
        this.dialogInfo.ref.resetFields()
      })
    },

    closeDialog() {
      this.dialogInfo.visible = false
    },

    comfirn() {
      this.dialogInfo.ref.validate(valid => {
        if (valid) {
          this.dialogInfo.visible = false
        }
      })
    },

    /* PDF预览 */
    pdfview(data) {
      this.pdfUrl = data
      this.$refs.pdfview.show()
    },

    close() {
      this.fullDialogInfo.visible = false
    },

    save() {},

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
</script>

<style lang="scss">
.single-line .el-form-item__label {
  line-height: 14px;
}
</style>
