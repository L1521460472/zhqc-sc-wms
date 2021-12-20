<template>
  <div class="view_box">
    <full-pop
      :visible.sync="fullDialogInfo.visible"
      :top-title="fullDialogInfo.title"
      :close-btn="fullDialogInfo.closeBtn"
      :save-list="fullDialogInfo.btList"
      @handleClick="handleClick"
    >
      <full-pop-item full-pop-item-title="回单信息">
        <zhqc-form
          :ref-obj.sync="fullDiaFormInfo.ref"
          :data="fullDiaFormInfo.data"
          :field-list="fullDiaFormInfo.fieldList"
          :rules="fullDiaFormInfo.rules"
          :label-width="fullDiaFormInfo.labelWidth"
        />
      </full-pop-item>
      <full-pop-item full-pop-item-title="签收明细">
        <vex-dia-table
          :ref-obj.sync="fullDiaTableInfo.ref"
          :data="fullDiaTableInfo.data"
          :field-list="fullDiaTableInfo.fieldList"
          :handle="fullDiaTableInfo.handle"
          :top-btn="fullDiaTableInfo.topBtn"
          :rules="fullDiaTableInfo.rules"
          :footer-method="footerMethod"
        />
      </full-pop-item>
    </full-pop>
  </div>
</template>

<script>
export default {
  name: 'TransportationReceiptView',
  data() {
    return {
      store: 'transportationReceipt/',
      modName: 'transportationReceipt',
      fullDialogInfo: {
        type: '',
        title: '',
        visible: true,
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true }
        ]
      },
      // 弹窗表单
      fullDiaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {} // 配置的表单字段校验规则集合
      },
      fullDiaTableInfo: {
        ref: null,
        data: [],
        fieldList: [],
        topBtn: {},
        handle: null
      }
    }
  },

  // 页面初始化函数
  activated() {
    this.queryRowData(this.$route.params.id)
  },

  mounted() {
    this.initFullDiaFormInfo()
    this.initFullDiaTableInfo()
  },

  methods: {
    queryRowData(id) {
      if (id) {
        this.$store.dispatch(this.store + 'initUpdateByNo', id).then(() => {
          const resData = this.$store.state[this.modName].initUpdateByNoObj
          if (resData) {
            this.fullDiaFormInfo.data = resData.entity.receiptOrder
            this.fullDiaTableInfo.data = resData.entity.transportItemList
          }
        })
      }
    },

    initFullDiaFormInfo() {
      this.fullDiaFormInfo.data = {}
      this.fullDiaFormInfo.fieldList = [
        { label: this.$t('transportationReceipt.receiptNo'), value: 'receiptNo', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.orderNo'), value: 'orderNo', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.cOrderNo'), value: 'cOrderNo', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.transportNo'), value: 'transportNo', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.planOrderNo'), value: 'planOrderNo', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.ownerCode'), value: 'ownerName', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.deliveryType'), value: 'deliverTypeName', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.unloadType'), value: 'unloadTypeName', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.senderName'), value: 'senderName', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.receiverName'), value: 'receiverName', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.skuCount'), value: 'skuCount', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.numCount'), value: 'numCount', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.orderWeight'), value: 'orderWeight', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.orderVolume'), value: 'orderVolume', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.receiptType'), value: 'receiptTypeName', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.creator'), value: 'creator', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.createTime'), value: 'createTime', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.updater'), value: 'updater', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.updateTime'), value: 'updateTime', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.signType'), value: 'signTypeName', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.signStatus'), value: 'receiptStatusName', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.signer'), value: 'signer', type: 'input', disabled: true },
        { label: this.$t('transportationReceipt.signTime'), value: 'signTime', type: 'input', disabled: true }
      ]
    },

    initFullDiaTableInfo() {
      this.fullDiaTableInfo.data = []
      this.fullDiaTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 },
        { prop: 'rowNo', label: this.$t('transportationReceipt.rowNo'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('transportationReceipt.skuName'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('transportationReceipt.skuCode'), minWidth: 100 },
        { prop: 'spec', label: this.$t('transportationReceipt.spec'), minWidth: 100 },
        { prop: 'unit', label: this.$t('transportationReceipt.unit'), minWidth: 100 },
        { prop: 'num', label: this.$t('transportationReceipt.num'), minWidth: 100 },
        { prop: 'numInt', label: this.$t('transportationReceipt.numInt'), minWidth: 100 },
        { prop: 'numEa', label: this.$t('transportationReceipt.numEa'), minWidth: 100 },
        { prop: 'weight', label: this.$t('transportationReceipt.weight'), minWidth: 100 },
        { prop: 'volume', label: this.$t('transportationReceipt.volumec'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('transportationReceipt.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('transportationReceipt.productionDate'), minWidth: 100 },
        { prop: 'expirationDate', label: this.$t('transportationReceipt.expirationDate'), minWidth: 100 },
        { prop: 'signNum', label: this.$t('transportationReceipt.signNum'), minWidth: 100 },
        { prop: 'signLossNum', label: this.$t('transportationReceipt.signLossNum'), minWidth: 100 },
        { prop: 'signMissNum', label: this.$t('transportationReceipt.signMissNum'), minWidth: 100 },
        { prop: 'signRejectNum', label: this.$t('transportationReceipt.signRejectNum'), minWidth: 100 },
        { prop: 'causeRemark', label: this.$t('transportationReceipt.causeRemark'), minWidth: 100 }
      ]
    },

    /* 表尾 */
    footerMethod({ columns, data }) {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '合计'
          }
          if (columnIndex === 6) {
            return `${this.sumNum(data, 'num')} `
          }
          if (columnIndex === 7 || columnIndex === 8 || columnIndex === 9 || columnIndex === 10) {
            return '-'
          }
        })
      ]
    },

    sumNum(list, field) {
      let count = 0
      list.forEach(item => {
        count += Number(item[field])
      })
      return count
    },

    close() {
      this.$router.push({ path: '/page_tms_transportation_transportationReceipt_transportationReceipt' })
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
