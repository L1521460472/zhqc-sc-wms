<template>
  <div>
    <full-pop
      :visible.sync="fullDialogInfo.visible"
      :top-title="fullDialogInfo.title"
      :close-btn="fullDialogInfo.closeBtn"
      :save-list="fullDialogInfo.btList"
      @handleClick="handleClick"
    >
      <full-pop-item :full-pop-item-title="$t('receivableFees.addFees')">
        <zhqc-top-form-sc
          :ref-obj.sync="topForm1.ref"
          :data="topForm1.data"
          :field-list="topForm1.fieldList"
          :rules="topForm1.rules"
          :list-type-info="listTypeInfo"
          :label-width="topForm1.labelWidth"
          :default-collapsable="true"
        />
      </full-pop-item>
      <full-pop-item :full-pop-item-title="$t('receivableFees.receivableFees')">
        <zhqc-top-form-sc
          :ref-obj.sync="topForm2.ref"
          :data="topForm2.data"
          :field-list="topForm2.fieldList"
          :rules="topForm2.rules"
          :list-type-info="listTypeInfo"
          :label-width="topForm2.labelWidth"
          :default-collapsable="true"
        />
      </full-pop-item>
      <full-pop-item :full-pop-item-title="$t('receivableFees.feesCertificate')">
        <upload-file
          :export-url="exportImgUrl"
          :img-pre-src-list="pictureList"
          :accept="accept"
          :show-tips="true"
          @handleImgSuccess="handleImgSuccess"
          @handleRemove="handleRemove"
        />
      </full-pop-item>
    </full-pop>
  </div>
</template>

<script>
import { VUE_APP_BASE_URL } from '@/api/api.config.js'
export default {
  name: 'AddFees',
  components: {
    UploadFile: () => import('@/Subassembly/upload/upload.vue')
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    listType: {
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
      topForm1: {
        ref: null, // 对外提供的可操作表单的持有对象
        fieldList: null, // 配置的表单字段集合
        data: {},
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      topForm2: {
        ref: null, // 对外提供的可操作表单的持有对象
        fieldList: null, // 配置的表单字段集合
        data: {},
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      exportImgUrl: VUE_APP_BASE_URL + 'fileMgr/fileManager/upload2Path',
      accept: null,
      pictureList: [],
      evidenceList: []
    }
  },

  computed: {
    listTypeInfo() {
      return {
        appointTypeList: [
          { value: 0, key: '应收' },
          { value: 1, key: '应付' }
        ],
        operationType: [
          { value: 0, key: '应收' },
          { value: 1, key: '应付' },
          { value: 2, key: '背靠背' }
        ]
      }
    }
  },

  watch: {
    visible(val) {
      if (val) {
        this.initBaseInfo()
        this.initRules()
        this.fullDialogInfo.visible = true
      }
    }
  },

  methods: {
    /* 初始化基本信息 */
    initBaseInfo() {
      this.topForm1.fieldList = [
        { label: this.$t('receivableFees.operationType'), value: 'operationType', type: 'radio', list: 'operationType', className: 'long-row', require },
        { label: this.$t('receivableFees.feesTime'), value: 'feesTime', type: 'date', dateType: 'datetime', span: 12, format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss', require },
        { label: this.$t('receivableFees.owner'), value: 'owner', type: 'select', list: 'appointTypeList', require },
        { label: this.$t('receivableFees.storehouse'), value: 'storehouse', type: 'select', list: 'appointTypeList', event: 'appointTypeChange' },
        { label: this.$t('receivableFees.salesWarehouse'), value: 'salesWarehouse', type: 'select', list: 'appointTypeList', event: 'appointTypeChange' },
        { label: this.$t('receivableFees.carrier'), value: 'carrier', type: 'select', list: 'appointTypeList', require },
        { label: this.$t('receivableFees.supplier'), value: 'supplier', type: 'select', list: 'appointTypeList', event: 'appointTypeChange' },
        { label: this.$t('receivableFees.customer'), value: 'customer', type: 'select', list: 'appointTypeList', event: 'appointTypeChange' },
        { label: this.$t('receivableFees.associatedBusinessOrderNo'), value: 'associatedBusinessOrderNo', type: 'input' },
        { label: this.$t('receivableFees.remark'), value: 'remark', type: 'input' }
      ]
      this.topForm2.fieldList = [
        { label: this.$t('receivableFees.attributionDept'), value: 'attributionDept', type: 'select', list: 'appointTypeList', className: 'long-row', require },
        { label: this.$t('receivableFees.receivableSettlementUnit'), value: 'receivableSettlementUnit', type: 'input', require },
        { label: this.$t('receivableFees.receivableBillSuject'), value: 'receivableBillSuject', type: 'select', list: 'appointTypeList', require },
        { label: this.$t('receivableFees.receivableFees'), value: 'receivableFees', type: 'input', require },
        { label: this.$t('receivableFees.receivableCurrency'), value: 'receivableCurrency', type: 'select', list: 'appointTypeList', require },
        { label: this.$t('receivableFees.payableSettlementUnit'), value: 'payableSettlementUnit', type: 'input', require },
        { label: this.$t('receivableFees.payableBillSuject'), value: 'payableBillSuject', type: 'select', list: 'appointTypeList', require },
        { label: this.$t('receivableFees.payableFees'), value: 'payableFees', type: 'input', require },
        { label: this.$t('receivableFees.payableCurrency'), value: 'payableCurrency', type: 'select', list: 'appointTypeList', require }
      ]
    },

    initRules() {
      this.topForm1.rules = {
        operationType: [{ required: true, message: this.$t('receivableFees.msg.operationType'), trigger: 'blur' }],
        feesTime: [{ required: true, message: this.$t('receivableFees.msg.feesTime'), trigger: 'blur' }],
        owner: [{ required: true, message: this.$t('receivableFees.msg.owner'), trigger: 'blur' }],
        carrier: [{ required: true, message: this.$t('receivableFees.msg.carrier'), trigger: 'blur' }]
      }
      this.topForm2.rules = {
        attributionDept: [{ required: true, message: this.$t('receivableFees.msg.attributionDept'), trigger: 'blur' }],
        receivableSettlementUnit: [{ required: true, message: this.$t('receivableFees.msg.receivableSettlementUnit'), trigger: 'blur' }],
        receivableBillSuject: [{ required: true, message: this.$t('receivableFees.msg.receivableBillSuject'), trigger: 'blur' }],
        receivableFees: [{ required: true, message: this.$t('receivableFees.msg.receivableFees'), trigger: 'blur' }],
        receivableCurrency: [{ required: true, message: this.$t('receivableFees.msg.receivableCurrency'), trigger: 'blur' }],
        payableSettlementUnit: [{ required: true, message: this.$t('receivableFees.msg.payableSettlementUnit'), trigger: 'blur' }],
        payableBillSuject: [{ required: true, message: this.$t('receivableFees.msg.payableBillSuject'), trigger: 'blur' }],
        payableFees: [{ required: true, message: this.$t('receivableFees.msg.payableFees'), trigger: 'blur' }],
        payableCurrency: [{ required: true, message: this.$t('receivableFees.msg.payableCurrency'), trigger: 'blur' }]
      }
    },

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

    close() {
      this.fullDialogInfo.visible = false
    },

    save() {
      let valid1, valid2
      this.topForm1.ref.validate(valid => { valid1 = valid })
      this.topForm2.ref.validate(valid => { valid2 = valid })
      if (valid1 && valid2) {
        this.fullDialogInfo.visible = false
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
</script>

<style lang="scss">
.long-row {
  width: 100%;
}
</style>
