<template>
  <div>
    <full-pop
      :visible.sync="fullDialogInfo.visible"
      :top-title="fullDialogInfo.title"
      :close-btn="fullDialogInfo.closeBtn"
      :save-list="fullDialogInfo.btList"
      @handleClick="handleClick"
    >
      <el-tabs v-model="activeName" type="card">
        <!-- 基本信息 -->
        <el-tab-pane :label="$t('receivableContract.baseInfo')" name="1">
          <full-pop-item :full-pop-item-title="$t('receivableContract.baseInfo')">
            <zhqc-top-form-sc
              :ref-obj.sync="baseInfo.topForm.ref"
              :data="baseInfo.topForm.data"
              :field-list="baseInfo.topForm.fieldList"
              :rules="baseInfo.topForm.rules"
              :list-type-info="listTypeInfo"
              :label-width="baseInfo.topForm.labelWidth"
              :default-collapsable="true"
            />
          </full-pop-item>
          <full-pop-item :full-pop-item-title="$t('receivableContract.attachment')">
            <div>
              <upload-file
                :export-url="baseInfo.upload.exportImgUrl"
                :img-pre-src-list="baseInfo.upload.pictureList"
                :disabled="disabled"
                :accept="baseInfo.upload.accept"
                :show-tips="!disabled"
                @handleImgSuccess="handleImgSuccess"
                @handleRemove="handleRemove"
              />
            </div>
          </full-pop-item>
          <full-pop-item v-if="disabled" :full-pop-item-title="$t('receivableContract.operationRecord')">
            <zhqc-table
              :data.sync="baseInfo.tableInfo.data"
              :field-list="baseInfo.tableInfo.fieldList"
              :handle="baseInfo.tableInfo.handle"
              @handleClick="handleClick"
              @handleEvent="handleEvent"
            />
          </full-pop-item>
        </el-tab-pane>
        <!-- 结算信息 -->
        <el-tab-pane :label="$t('receivableContract.settlementInfo')" name="2">
          <full-pop-item :full-pop-item-title="$t('receivableContract.billSuject')">
            <div>
              <div v-if="!disabled" style="margin-bottom: 10px;">
                <el-button-group>
                  <el-button icon="el-icon-folder-add" type="primary" @click="handleClick('addSuject')">{{ $t('receivableContract.addSuject') }}</el-button>
                </el-button-group>
              </div>
              <zhqc-table
                :data.sync="settlementInfo.tableInfo1.data"
                :field-list="settlementInfo.tableInfo1.fieldList"
                :handle="settlementInfo.tableInfo1.handle"
                @handleClick="handleClick"
                @handleEvent="handleEvent"
              />
            </div>
          </full-pop-item>
          <full-pop-item :full-pop-item-title="$t('receivableContract.offerDetails')">
            <div>
              <div style="margin-bottom: 10px;">
                <el-button-group v-if="!disabled">
                  <el-button icon="el-icon-folder-add" type="primary" @click="handleClick('addOffer')">{{ $t('receivableContract.addOffer') }}</el-button>
                </el-button-group>
                <export-template-vue
                  v-if="!disabled"
                  :template-url="templateUrl"
                  :export-btn-name="'下载模板'"
                  export-name="入库订单导入模板"
                />
                <upload-vue
                  v-if="!disabled"
                  template-name="inOrderService"
                  :upload-btn-name="'导入报价'"
                  :upload-url="uploadUrl"
                  @uploadQuery="uploadQueryFn"
                />
                <export-vue
                  v-if="disabled"
                  template-name="inOrderService"
                  :export-url="exportUrl"
                  :export-btn-name="'导出报价'"
                  export-name="入库订单"
                  @exportParam="exportData"
                />
              </div>
              <zhqc-table
                :data.sync="settlementInfo.tableInfo2.data"
                :field-list="settlementInfo.tableInfo2.fieldList"
                :handle="settlementInfo.tableInfo2.handle"
                @handleClick="handleClick"
                @handleEvent="handleEvent"
              />
            </div>
          </full-pop-item>
        </el-tab-pane>
        <!-- 保证金 -->
        <el-tab-pane :label="$t('receivableContract.deposit')" name="3">
          <full-pop-item :full-pop-item-title="$t('receivableContract.deposit')">
            <zhqc-top-form-sc
              :ref-obj.sync="depositInfo.topForm.ref"
              :data="depositInfo.topForm.data"
              :field-list="depositInfo.topForm.fieldList"
              :rules="depositInfo.topForm.rules"
              :list-type-info="listTypeInfo"
              :label-width="depositInfo.topForm.labelWidth"
            />
          </full-pop-item>
          <full-pop-item v-if="disabled" :full-pop-item-title="$t('receivableContract.depositRecord')">
            <zhqc-table
              :data.sync="depositInfo.tableInfo.data"
              :field-list="depositInfo.tableInfo.fieldList"
              :handle="depositInfo.tableInfo.handle"
            />
          </full-pop-item>
        </el-tab-pane>
      </el-tabs>
    </full-pop>

    <!-- 弹框 -->
    <zhqc-dialog
      :title="settlementDiaInfo.title"
      :visible.sync="settlementDiaInfo.visible"
      :width="'720px'"
      :bt-list="settlementDiaInfo.btList"
      @handleClick="handleClick"
    >
      <zhqc-form
        :ref-obj.sync="settlementDiaInfo.ref"
        :data="settlementDiaInfo.data"
        :field-list="settlementDiaInfo.fieldList"
        :rules="settlementDiaInfo.rules"
        :form-type="settlementDiaInfo.type"
        :list-type-info="listTypeInfo"
        :label-width="settlementDiaInfo.labelWidth"
      />
    </zhqc-dialog>

    <zhqc-pdf-view ref="pdfview" :url="pdfUrl" />
  </div>
</template>

<script>
import { VUE_APP_BASE_URL } from '@/api/api.config.js'
export default {
  name: 'ReceivableContractDetail',
  components: {
    UploadFile: () => import('@/Subassembly/upload/upload.vue')
  },
  props: {
    listTypeInfo: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      store: 'receivableContract/',
      modName: 'receivableContract',
      activeName: '1',
      pdfUrl: '',
      evidenceList: [],
      fullDialogInfo: {
        title: '',
        visible: false,
        type: '',
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', show: true }
        ]
      },
      baseInfo: {
        upload: {
          exportImgUrl: VUE_APP_BASE_URL + 'fileMgr/fileManager/upload2Path',
          disabled: false,
          accept: null,
          pictureList: []
        },
        topForm: {
          ref: null, // 对外提供的可操作表单的持有对象
          fieldList: null, // 配置的表单字段集合
          data: {}, // 表单绑定的数据Model
          rules: {}, // 配置表单字段的校验规则集合
          labelWidth: '110px' // 默认表单字段label宽度
        },
        tableInfo: {
          fieldList: null, // 表格列集合
          data: [],
          handle: {}
        }
      },
      settlementInfo: {
        tableInfo1: {
          row: null,
          fieldList: null, // 表格列集合
          data: [],
          handle: { // 表格自定义按钮
            fixed: 'right',
            label: this.$t('table.actions'), // 操作列名
            width: '200', // 默认操作按钮列宽度
            btList: [
              { label: this.$t('table.edit'), type: 'success', icon: '', event: 'editSuject', show: true, disabled: this.$hasPerm('edit') },
              { label: this.$t('table.delete'), type: 'danger', icon: '', event: 'deleteSuject', show: true, disabled: this.$hasPerm('delete') },
              { slot: true, icon: '', event: 'slotEvent' }
            ]
          }
        },
        tableInfo2: {
          fieldList: null, // 表格列集合
          data: [],
          handle: { // 表格自定义按钮
            fixed: 'right',
            label: this.$t('table.actions'), // 操作列名
            width: '200', // 默认操作按钮列宽度
            btList: [
              { label: this.$t('table.delete'), type: 'danger', icon: '', event: 'deleteOffer', show: true, disabled: this.$hasPerm('delete') },
              { slot: true, icon: '', event: 'slotEvent' }
            ]
          }
        }
      },
      depositInfo: {
        topForm: {
          ref: null, // 对外提供的可操作表单的持有对象
          fieldList: null, // 配置的表单字段集合
          data: {}, // 表单绑定的数据Model
          rules: {}, // 配置表单字段的校验规则集合
          labelWidth: '140px' // 默认表单字段label宽度
        },
        tableInfo: {
          fieldList: null, // 表格列集合
          data: [],
          handle: {}
        }
      },
      settlementDiaInfo: {
        ref: null,
        visible: false,
        flag: '',
        title: '',
        type: '',
        width: '',
        data: {},
        rules: {},
        fieldList: [],
        closeBtn: { label: '', type: '', icon: '', event: 'closeDialog', show: true },
        btList: [
          { label: this.$t('table.cancel'), type: '', icon: '', event: 'closeDialog', show: true },
          { label: this.$t('table.confirm'), type: 'primary', icon: '', event: 'confirmDialog', btLoading: false, show: true }
        ]
      },
      templateUrl: process.env.VUE_APP_OMS_MODEL + '/order/inOrder/template/inOrderTemplate',
      uploadUrl: process.env.VUE_APP_OMS_MODEL + '/order/inOrder/upload',
      exportUrl: process.env.VUE_APP_OMS_MODEL + '/order/inOrder/export'
    }
  },

  computed: {
    disabled() {
      return this.fullDialogInfo.type === 'view'
    }
  },

  watch: {
    'fullDialogInfo.type'(val) {
      if (val === 'view') {
        this.fullDialogInfo.title = this.$t('table.view')
        this.fullDialogInfo.btList[1].show = false
      }
      if (val === 'add') {
        this.fullDialogInfo.title = this.$t('table.add')
        this.fullDialogInfo.btList[1].show = true
      }
      if (val === 'edit') {
        this.fullDialogInfo.title = this.$t('table.edit')
        this.fullDialogInfo.btList[1].show = true
      }
    },
    'fullDialogInfo.visible'(val) {
      if (val) {
        this.activeName = '1'
        this.initBaseInfo()
        this.initSettlementInfo()
        this.initDepositInfo()
      }
    }
  },

  methods: {
    /* 初始化基本信息 */
    initBaseInfo() {
      this.baseInfo.topForm.fieldList = [
        { label: this.$t('receivableContract.contractNo'), value: 'contractNo', type: 'input', disabled: this.disabled || this.fullDialogInfo.type === 'edit' },
        { label: this.$t('receivableContract.contractName'), value: 'contractName', type: 'input', disabled: this.disabled },
        { label: this.$t('receivableContract.contractType'), value: 'contractType', type: 'select', list: 'standardCurrencyList', disabled: this.disabled },
        { label: this.$t('receivableContract.fundsType'), value: 'fundsType', type: 'input', disabled: this.disabled || this.fullDialogInfo.type === 'edit' },
        { label: this.$t('receivableContract.attributionDept'), value: 'attributionDept', type: 'select', list: 'standardCurrencyList', disabled: this.disabled },
        { label: this.$t('receivableContract.partyA'), value: 'partyA', type: 'input', disabled: this.disabled || this.fullDialogInfo.type === 'edit' },
        { label: this.$t('receivableContract.partyAContactor'), value: 'partyAContactor', type: 'input', disabled: this.disabled },
        { label: this.$t('receivableContract.partyAContact'), value: 'partyAContact', type: 'input', disabled: this.disabled },
        { label: this.$t('receivableContract.partyAEmail'), value: 'partyAEmail', type: 'input', disabled: this.disabled },
        { label: this.$t('receivableContract.partyAAddress'), value: 'partyAAddress', type: 'input', disabled: this.disabled },
        { label: this.$t('receivableContract.partyB'), value: 'partyB', type: 'input', disabled: this.disabled || this.fullDialogInfo.type === 'edit' },
        { label: this.$t('receivableContract.partyBContactor'), value: 'partyBContactor', type: 'input', disabled: this.disabled },
        { label: this.$t('receivableContract.partyBContact'), value: 'partyBContact', type: 'input', disabled: this.disabled },
        { label: this.$t('receivableContract.partyBEmail'), value: 'partyBEmail', type: 'input', disabled: this.disabled },
        { label: this.$t('receivableContract.partyBAddress'), value: 'partyBAddress', type: 'input', disabled: this.disabled },
        { label: this.$t('receivableContract.settlementUnit'), value: 'settlementUnit', type: 'input', disabled: this.disabled },
        { label: this.$t('receivableContract.settlementCurrency'), value: 'settlementCurrency', type: 'select', list: 'standardCurrencyList', disabled: this.disabled },
        { label: this.$t('receivableContract.exchangeRate'), value: 'exchangeRate', type: 'input', disabled: this.disabled },
        { label: this.$t('receivableContract.settlementType'), value: 'settlementType', type: 'select', list: 'standardCurrencyList', disabled: this.disabled },
        { label: this.$t('receivableContract.accountPeriod'), value: 'accountPeriod', type: 'input', disabled: this.disabled },
        { label: this.$t('receivableContract.excludingHolidays'), value: 'excludingHolidays', type: 'select', list: 'standardCurrencyList', disabled: this.disabled },
        { label: this.$t('receivableContract.signTime'), value: 'signTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss', disabled: this.disabled },
        { label: this.$t('receivableContract.effectiveTime'), value: 'effectiveTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss', disabled: this.disabled },
        { label: this.$t('receivableContract.expirationTime'), value: 'expirationTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss', disabled: this.disabled },
        { label: this.$t('receivableContract.failureWarning'), value: 'failureWarning', type: 'input', disabled: this.disabled },
        { label: this.$t('receivableContract.remark'), value: 'remark', type: 'textarea', maxlength: 200, disabled: this.disabled }
      ]
      this.baseInfo.topForm.rules = {
        contractNo: [{ required: true, message: this.$t('receivableContract.msg.contractNo'), trigger: 'blur' }],
        contractName: [{ required: true, message: this.$t('receivableContract.msg.contractName'), trigger: 'blur' }],
        contractType: [{ required: true, message: this.$t('receivableContract.msg.contractType'), trigger: 'blur' }],
        attributionDept: [{ required: true, message: this.$t('receivableContract.msg.attributionDept'), trigger: 'blur' }],
        partyA: [{ required: true, message: this.$t('receivableContract.msg.partyA'), trigger: 'blur' }],
        partyB: [{ required: true, message: this.$t('receivableContract.msg.partyB'), trigger: 'blur' }],
        settlementUnit: [{ required: true, message: this.$t('receivableContract.msg.settlementUnit'), trigger: 'blur' }],
        effectiveTime: [{ required: true, message: this.$t('receivableContract.msg.effectiveTime'), trigger: 'blur' }],
        expirationTime: [{ required: true, message: this.$t('receivableContract.msg.expirationTime'), trigger: 'blur' }]
      }

      this.baseInfo.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 },
        { prop: 'operationTime', label: this.$t('receivableContract.operationTime'), minWidth: 120 },
        { prop: 'operator', label: this.$t('receivableContract.operator'), minWidth: 100 },
        { prop: 'operationType', label: this.$t('receivableContract.operationType'), minWidth: 100 },
        { prop: 'operationDesc', label: this.$t('receivableContract.operationDesc'), minWidth: 100 }
      ]
    },

    /* 初始化结算信息 */
    initSettlementInfo() {
      this.settlementInfo.tableInfo1.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 },
        { prop: 'sujectType', label: this.$t('receivableContract.sujectType'), minWidth: 120 },
        { prop: 'billSuject', label: this.$t('receivableContract.billSuject'), minWidth: 100 },
        { prop: 'taxRate', label: this.$t('receivableContract.taxRateUnit'), minWidth: 100 },
        { prop: 'billingStrategy', label: this.$t('receivableContract.billingStrategy'), minWidth: 100 },
        { prop: 'billingType', label: this.$t('receivableContract.billingType'), minWidth: 100 },
        { prop: 'billingPeriod', label: this.$t('receivableContract.billingPeriod'), minWidth: 100 },
        { prop: 'billingTime', label: this.$t('receivableContract.billingTime'), minWidth: 100 },
        { prop: 'valueRules', label: this.$t('receivableContract.valueRules'), minWidth: 100 },
        { prop: 'remark', label: this.$t('receivableContract.remark'), minWidth: 100 }
      ]
      this.settlementInfo.tableInfo2.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 },
        { prop: 'sujectType', label: this.$t('receivableContract.sujectType'), minWidth: 120 },
        { prop: 'billSuject', label: this.$t('receivableContract.billSuject'), minWidth: 100 },
        { prop: 'taxRate', label: this.$t('receivableContract.taxRateUnit'), minWidth: 100 },
        { prop: 'billingStrategy', label: this.$t('receivableContract.billingStrategy'), minWidth: 100 },
        { prop: 'billingType', label: this.$t('receivableContract.billingType'), minWidth: 100 },
        { prop: 'billingPeriod', label: this.$t('receivableContract.billingPeriod'), minWidth: 100 },
        { prop: 'billingTime', label: this.$t('receivableContract.billingTime'), minWidth: 100 },
        { prop: 'valueRules', label: this.$t('receivableContract.valueRules'), minWidth: 100 },
        { prop: 'remark', label: this.$t('receivableContract.remark'), minWidth: 100 }
      ]
    },

    /* 初始化保证金 */
    initDepositInfo() {
      this.depositInfo.topForm.fieldList = [
        { label: this.$t('receivableContract.isPay'), value: 'isPay', type: 'select', list: 'standardCurrencyList', disabled: this.disabled },
        { label: this.$t('receivableContract.marginAmount'), value: 'marginAmount', type: 'input', disabled: this.disabled },
        { label: this.$t('receivableContract.payOut'), value: 'payOut', type: 'select', list: 'standardCurrencyList', disabled: this.disabled },
        { label: this.$t('receivableContract.remark'), value: 'remark', type: 'input', maxlength: 200, disabled: this.disabled }
      ]
      this.depositInfo.topForm.rules = {
        isPay: [{ required: true, message: this.$t('receivableContract.msg.isPay'), trigger: 'blur' }],
        marginAmount: [{ required: true, message: this.$t('receivableContract.msg.marginAmount'), trigger: 'blur' }],
        payOut: [{ required: true, message: this.$t('receivableContract.msg.payOut'), trigger: 'blur' }]
      }

      this.depositInfo.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 },
        { prop: 'operationTime', label: this.$t('receivableContract.operationTime'), minWidth: 120 },
        { prop: 'operator', label: this.$t('receivableContract.operator'), minWidth: 100 },
        { prop: 'operationType', label: this.$t('receivableContract.operationType'), minWidth: 100 },
        { prop: 'amount', label: this.$t('receivableContract.amount'), minWidth: 100 },
        { prop: 'marginAmount', label: this.$t('receivableContract.marginAmount'), minWidth: 100 },
        { prop: 'associatedBillNo', label: this.$t('receivableContract.associatedBillNo'), minWidth: 100 },
        { prop: 'operationDesc', label: this.$t('receivableContract.operationDesc'), minWidth: 100 },
        { prop: 'certificate', label: this.$t('receivableContract.certificate'), minWidth: 100 }
      ]
    },

    /* 初始化添加科目弹框 */
    initAddSuject() {
      this.settlementDiaInfo.fieldList = [
        { label: this.$t('receivableContract.sujectType'), value: 'sujectType', type: 'input', disabled: this.settlementDiaInfo.type === 'editSuject' },
        { label: this.$t('receivableContract.billSuject'), value: 'billSuject', type: 'select', list: 'standardCurrencyList', disabled: this.settlementDiaInfo.type === 'editSuject' },
        { label: this.$t('receivableContract.taxRateUnit'), value: 'taxRate', type: 'input' },
        { label: this.$t('receivableContract.billingStrategy'), value: 'billingStrategy', type: 'select', list: 'standardCurrencyList' },
        { label: this.$t('receivableContract.billingType'), value: 'billingType', type: 'input' },
        { label: this.$t('receivableContract.billingPeriod'), value: 'billingPeriod', type: 'input' },
        { label: this.$t('receivableContract.billingTime'), value: 'billingTime', type: 'input' },
        { label: this.$t('receivableContract.valueRules'), value: 'valueRules', type: 'input' },
        { label: this.$t('receivableContract.remark'), value: 'remark', type: 'input' }
      ]
      this.settlementDiaInfo.rules = {
        billSuject: [{ required: true, message: this.$t('receivableContract.msg.billSuject'), trigger: 'blur' }],
        taxRate: [{ required: true, message: this.$t('receivableContract.msg.taxRate'), trigger: 'blur' }],
        billingStrategy: [{ required: true, message: this.$t('receivableContract.msg.billingStrategy'), trigger: 'blur' }],
        billingType: [{ required: true, message: this.$t('receivableContract.msg.billingType'), trigger: 'blur' }],
        billingPeriod: [{ required: true, message: this.$t('receivableContract.msg.billingPeriod'), trigger: 'blur' }],
        billingTime: [{ required: true, message: this.$t('receivableContract.msg.billingTime'), trigger: 'blur' }],
        valueRules: [{ required: true, message: this.$t('receivableContract.msg.valueRules'), trigger: 'blur' }]
      }
      this.settlementDiaInfo.fieldList.forEach(item => {
        this.$set(this.settlementDiaInfo.data, item.value, null)
      })
    },

    /* 初始化添加报价弹框 */
    initAddOffer() {
      this.settlementDiaInfo.fieldList = [
        { label: this.$t('receivableContract.sujectType'), value: 'sujectType', type: 'input' },
        { label: this.$t('receivableContract.billSuject'), value: 'billSuject', type: 'select', list: 'standardCurrencyList' },
        { label: this.$t('receivableContract.taxRateUnit'), value: 'taxRate', type: 'input' },
        { label: this.$t('receivableContract.billingStrategy'), value: 'billingStrategy', type: 'select', list: 'standardCurrencyList' },
        { label: this.$t('receivableContract.billingType'), value: 'billingType', type: 'input' },
        { label: this.$t('receivableContract.billingPeriod'), value: 'billingPeriod', type: 'input' },
        { label: this.$t('receivableContract.billingTime'), value: 'billingTime', type: 'input' },
        { label: this.$t('receivableContract.valueRules'), value: 'valueRules', type: 'input' },
        { label: this.$t('receivableContract.remark'), value: 'remark', type: 'input' }
      ]
      this.settlementDiaInfo.rules = {
        billSuject: [{ required: true, message: this.$t('receivableContract.msg.billSuject'), trigger: 'blur' }],
        taxRate: [{ required: true, message: this.$t('receivableContract.msg.taxRate'), trigger: 'blur' }],
        billingStrategy: [{ required: true, message: this.$t('receivableContract.msg.billingStrategy'), trigger: 'blur' }],
        billingType: [{ required: true, message: this.$t('receivableContract.msg.billingType'), trigger: 'blur' }],
        billingPeriod: [{ required: true, message: this.$t('receivableContract.msg.billingPeriod'), trigger: 'blur' }],
        billingTime: [{ required: true, message: this.$t('receivableContract.msg.billingTime'), trigger: 'blur' }],
        valueRules: [{ required: true, message: this.$t('receivableContract.msg.valueRules'), trigger: 'blur' }]
      }
      this.settlementDiaInfo.fieldList.forEach(item => {
        this.$set(this.settlementDiaInfo.data, item.value, null)
      })
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

    /* PDF预览 */
    pdfview(data) {
      this.pdfUrl = data
      this.$refs.pdfview.show()
    },

    /* 导入 */
    uploadQueryFn() {
      this.initData()
    },

    /* 导出 */
    exportData(data) {
      this.topForm.ref.validate(valid => {
        if (valid) {
          this.$showLoading()
          data.callback(this.topForm.data)
          this.$hideLoading()
        }
      })
    },

    /* 添加科目 */
    addSuject() {
      this.settlementDiaInfo.type = 'addSuject'
      this.settlementDiaInfo.title = this.$t('receivableContract.addSuject')
      this.initAddSuject()
      this.settlementDiaInfo.visible = true
      this.$nextTick(() => {
        this.settlementDiaInfo.ref.resetFields()
      })
    },

    /* 编辑科目 */
    editSuject(row) {
      this.settlementInfo.tableInfo1.row = row
      this.settlementDiaInfo.type = 'editSuject'
      this.settlementDiaInfo.title = this.$t('receivableContract.editSuject')
      this.initAddSuject()
      this.settlementDiaInfo.visible = true
      this.$nextTick(() => {
        this.settlementDiaInfo.ref.resetFields()
        this.settlementDiaInfo.fieldList.forEach(item => {
          this.settlementDiaInfo.data[item.value] = this.settlementInfo.tableInfo1.row[item.value]
        })
      })
    },

    /* 删除科目 */
    deleteSuject(row) {
      this.$confirm(this.$t('receivableContract.msg.deleteSuject'), {
        type: 'warning'
      }).then(() => {
        this.settlementInfo.tableInfo1.data.splice(row.$rowIndex, 1)
      })
    },

    /* 添加报价 */
    addOffer() {
      this.settlementDiaInfo.type = 'addOffer'
      this.settlementDiaInfo.title = this.$t('receivableContract.addOffer')
      this.initAddOffer()
      this.settlementDiaInfo.visible = true
      this.$nextTick(() => {
        this.settlementDiaInfo.ref.resetFields()
      })
    },

    /* 删除报价 */
    deleteOffer(row) {
      this.$confirm(this.$t('receivableContract.msg.deleteOffer'), {
        type: 'warning'
      }).then(() => {
        this.settlementInfo.tableInfo2.data.splice(row.$rowIndex, 1)
      })
    },

    closeDialog() {
      this.settlementDiaInfo.visible = false
    },

    confirmDialog() {
      this.settlementDiaInfo.ref.validate(valid => {
        if (valid) {
          if (this.settlementDiaInfo.type === 'addSuject') {
            const obj = {}
            for (const key in this.settlementDiaInfo.data) {
              obj[key] = this.settlementDiaInfo.data[key]
            }
            this.settlementInfo.tableInfo1.data.push(obj)
            this.settlementDiaInfo.visible = false
          } else if (this.settlementDiaInfo.type === 'editSuject') {
            this.$confirm(this.$t('receivableContract.msg.editSuject'), {
              type: 'warning'
            }).then(() => {
              for (const key in this.settlementDiaInfo.data) {
                this.settlementInfo.tableInfo1.data[this.settlementInfo.tableInfo1.row.rowIndex][key] = this.settlementDiaInfo.data[key]
              }
              this.settlementDiaInfo.visible = false
            })
          } else if (this.settlementDiaInfo.type === 'addOffer') {
            const obj = {}
            for (const key in this.settlementDiaInfo.data) {
              obj[key] = this.settlementDiaInfo.data[key]
            }
            this.settlementInfo.tableInfo2.data.push(obj)
            this.settlementDiaInfo.visible = false
          }
        }
      })
    },

    /* 关闭弹框页面 */
    close() {
      this.fullDialogInfo.visible = false
    },

    save() {
      this.baseInfo.topForm.ref.validate(valid => {
        if (valid) {
          this.depositInfo.topForm.ref.validate(valid => {
            if (valid) {
              console.log('save')
            }
          })
        }
      })
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
</script>

<style lang="scss" scoped>
.view_box{
  width: 100%;
  height: 100%;
}
.tabs-box{
  margin-bottom: 20px;
}
.add_table_box{
  height: 300px;
}
.link {
  cursor: pointer;
  color: #409EFF;
  &:hover {
    text-decoration: underline;
  }
}
</style>
