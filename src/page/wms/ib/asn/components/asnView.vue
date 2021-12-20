<!--
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-11-01 16:54:38
 * @LastEditors: chentianyu
 * @LastEditTime: 2021-11-11 15:00:47
-->
<template>
  <div class="view_box">
    <full-pop
      :visible.sync="fullDialogInfo.visible"
      :top-title="fullDialogInfo.title"
      :close-btn="fullDialogInfo.closeBtn"
      :save-list="fullDialogInfo.btList"
      @handleClick="handleClick"
    >
      <full-pop-item full-pop-item-title="入库单信息">
        <zhqc-form
          :ref-obj.sync="fullDiaFormInfo.ref"
          :data="fullDiaFormInfo.data"
          :field-list="fullDiaFormInfo.fieldList"
          :rules="fullDiaFormInfo.rules"
          :list-type-info="listTypeInfo"
          :form-type="formType"
          :class-name="viewFlag"
          :label-width="fullDiaFormInfo.labelWidth"
          style="padding: 1% 0%"
          @handleEvent="handleEvent"
        />
      </full-pop-item>
      <div class="tabs-box">
        <zhqc-tabs
          v-model="tabs.activeName"
          :tabs-list="tabs.tabsList"
          :bg-gradient="tabs.bgDradient"
          :font-size="tabs.fontSize"
        >
          <template #1>
            <zhqc-table
              :data.sync="tableInfo1.data"
              :field-list="tableInfo1.fieldList"
              :handle="null"
              @handleClick="handleClick"
            />
          </template>
          <template #2>
            <zhqc-table
              :data.sync="tableInfo2.data"
              :field-list="tableInfo2.fieldList"
              :handle="null"
              @handleClick="handleClick"
            >

              <template v-slot:col-operationDesc="scope">
                <div :class="{'link': isLink(scope.row.operationDesc) }" @click="operationDescClick(scope.row.operationDesc)">{{ scope.row.operationDesc }}</div>
              </template>
              <template v-slot:col-certificate="scope">
                <span v-if="scope.row.evidenceImage">
                  <template v-for="(item, index) in getSrcList(scope.row)">
                    <el-image
                      :key="index"
                      :src="item"
                      :preview-src-list="getSrcList(scope.row)"
                      style="margin-right: 6px; width: 30px;"
                    />
                  </template>
                </span>
                <span v-if="scope.row.evidencePdf">
                  <template v-for="(item, index) in scope.row.evidencePdf.split(',')">
                    <i :key="index" class="el-icon-document" style="font-size:30px; cursor:pointer;" @click="pdfview(item)" />
                  </template>
                </span>
              </template>
            </zhqc-table>

          </template>
        </zhqc-tabs>
      </div>
      <zhqc-pdf-view ref="pdfview" :url="pdfUrl" />
    </full-pop>
  </div>
</template>

<script>

export default {
  name: 'AsnView',
  data() {
    return {
      store: 'asn/',
      modName: 'asn',
      formType: null,
      viewFlag: null,
      fullDialogInfo: {
        title: '查看',
        visible: true,
        type: '',
        // 返回按钮
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
        btList: [
          {
            label: this.$t('table.close'),
            type: '',
            icon: '',
            event: 'close',
            show: true
          },
          {
            label: this.$t('table.save'),
            type: 'primary',
            icon: '',
            event: 'save',
            btLoading: false,
            show: false
          }
        ]
      },
      // 弹窗表单
      fullDiaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {} // 配置的表单字段校验规则集合
      },
      // 下拉选项列表
      listTypeInfo: {
        sourceSystemList: [],
        deliveryTypeList: [],
        orderPsTypeList: [],
        orderSendTypeList: [],
        statusList: [],
        lineTypeList: []
      },
      tabs: {
        activeName: '1',
        bgDradient: ['#00d4d8', '#009396'],
        fontSize: 14,
        tabsList: [
          {
            label: '订单明细',
            value: '1'
          },
          {
            label: '操作记录',
            value: '2'
          }
        ]
      },
      tableInfo1: {
        fieldList: null, // 表格列集合
        handle: null,
        data: []

      },
      tableInfo2: {
        fieldList: null, // 表格列集合
        handle: null,
        data: []
      },
      pdfUrl: ''

    }
  },
  computed: {

  },
  mounted() {
    // this.queryRowData({ id: this.$route.params.id })
  },
  // 页面初始化函数
  created() {
    // this.initPage()
    this.initTopFormColumns()
  },
  activated() {
    this.tabs.activeName = '1'
    this.queryRowData({ id: this.$route.params.id })
  },
  methods: {
    /**
     * 页面初始化
     */
    initPage() {
      this.$store.dispatch(this.store + 'initPage', {}).then(() => {
        const result = this.$store.state[this.modName].initPageObj
        this.listTypeInfo.sourceSystemList = result.sourceSystemList
        this.listTypeInfo.deliveryTypeList = result.deliveryTypeList
        this.listTypeInfo.orderPsTypeList = result.orderPsTypeList
        this.listTypeInfo.orderSendTypeList = result.orderSendTypeList
        this.listTypeInfo.statusList = result.statusList
        this.listTypeInfo.lineTypeList = result.lineTypeList
      })
    },
    initTopFormColumns() {
      this.fullDiaFormInfo.data = {}
      this.fullDiaFormInfo.fieldList = [
        { label: this.$t('asn.operationDate'), value: 'updateTime', type: 'input', readonly: true, disabled: true },
        { label: this.$t('asn.ownerId'), value: 'ownerName', type: 'input', disabled: true },
        { label: this.$t('asn.asnType'), value: 'scAsnType', type: 'input', disabled: true },
        { label: this.$t('asn.cusOrderNo'), value: 'origNo', type: 'input', disabled: true },
        { label: this.$t('asn.deliveryOrderNo'), value: 'returnCourierNum', type: 'input', disabled: true },
        { label: this.$t('asn.supplierId'), value: 'supplierName', type: 'input', disabled: true },
        { label: this.$t('asn.deliveryWH'), value: 'shipper', type: 'input', disabled: true },
        { label: this.$t('asn.customer'), value: 'buyer', type: 'input', disabled: true },
        { label: this.$t('asn.primaryCusOrderNo'), value: 'cusOrderNo', type: 'input', disabled: true },
        // { label: this.$t('asn.deliverType'), value: 'deliverType', type: 'input', disabled: true },
        { label: this.$t('asn.isSelf'), value: 'isSelfName', type: 'input', disabled: true },
        { label: this.$t('asn.ReceivingWH'), value: 'consignee', type: 'input', readonly: true, disabled: true },
        { label: this.$t('asn.PSDepartment'), value: 'buyDepartment', type: 'input', readonly: true, disabled: true },
        { label: this.$t('asn.asnSource'), value: 'asnSource', type: 'input', disabled: true },
        { label: this.$t('asn.carrier'), value: 'carrierName', type: 'input', readonly: true, disabled: true },
        { label: this.$t('asn.plannedDeliveryDate'), value: 'shippingDate', type: 'input', readonly: true, disabled: true },
        { label: this.$t('asn.planDeliveryDate'), value: 'receivingDate', type: 'input', readonly: true, disabled: true },
        { label: this.$t('asn.remark'), value: 'remark', type: 'input', readonly: true, disabled: true }
      ]

      this.tableInfo1.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'asnDtStatusName', label: this.$t('asn.dt.asnDtStatus'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('asn.dt.skuCode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('asn.dt.skuName'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('asn.dt.barcode'), minWidth: 100 },
        { prop: 'spec', label: this.$t('asn.dt.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('asn.dt.mainUnit'), minWidth: 100 },
        { prop: 'commodityQty', label: this.$t('asn.dt.commodityQty'), minWidth: 100 },
        { prop: 'recQty', label: this.$t('asn.dt.recQty'), minWidth: 100 },
        { prop: 'rejectQty', label: this.$t('asn.dt.rejectQty'), minWidth: 100 },
        { prop: 'skuVolM', label: this.$t('asn.dt.vol'), minWidth: 100 },
        { prop: 'skuGrossWeightKG', label: this.$t('asn.dt.WeightKg'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('asn.dt.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('asn.dt.productionDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('asn.dt.invalidDate'), minWidth: 100 },
        { prop: 'remark', label: this.$t('asn.dt.remark'), minWidth: 100 }
      ]
      this.tableInfo2.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'orderNo', label: this.$t('asn.operationOrderNo'), minWidth: 100 },
        { prop: 'recordTypeName', label: this.$t('asn.operationType'), minWidth: 100 },
        { prop: 'remark', label: this.$t('asn.operationDesc'), minWidth: 100 },
        { prop: 'updater', label: this.$t('asn.operator'), minWidth: 100 },
        { prop: 'updaterName', label: this.$t('asn.operatorName'), minWidth: 100 },
        { prop: 'updateTime', label: this.$t('asn.operationTime'), minWidth: 100 }

      ]
    },
    close() {
      this.$router.push({ path: '/page_wms_ib_asn_asn' })
    },
    /**
     * 查询行数据【查看/编辑数据从后台获取时用此方法】
     * @param data
     */
    queryRowData(data) {
      this.$store.dispatch(this.store + 'initUpdate', data.id).then(() => {
        this.fullDiaFormInfo.data = this.$store.state[this.modName].initUpdateObj.entity
        this.tableInfo1.data = this.$store.state[this.modName].initUpdateObj?.dtList ?? []
        this.tableInfo2.data = this.$store.state[this.modName].initUpdateObj.logList
        if (this.fullDiaFormInfo.ref) {
          this.fullDiaFormInfo.ref.clearValidate()
        }
      })
    },
    sw(value) {
      const num = Math.round(value * 1000) / 1000
      return num && num.toFixed(3)
    },
    tw(value) {
      const num = Math.round(value * 100) / 100
      return num && num.toFixed(2)
    },
    getSrcList(row) {
      return row.evidenceImage.split(',')
    },
    pdfview(data) {
      this.pdfUrl = data
      this.$refs.pdfview.show()
    },
    isLink(data) {
      return data && (data.startsWith('YS') || data.startsWith('TO') || data.startsWith('PZ') || data.startsWith('HD') || data.startsWith('FY'))
    },
    operationDescClick(data) {
      // 运输订单号-YS；运输单号-TO；发运单号-FY；预约登记单号-YY；配载单号-PZ；运输回单号-HD；临时配载单号-LS
      let path = ''
      if (data.startsWith('YS')) {
        path = `/shippingOrderView/${data}`
      }
      if (data.startsWith('TO')) {
        path = `/waybillView/${data}`
      }
      if (data.startsWith('PZ')) {
        path = `/stowageListView/${data}`
      }
      if (data.startsWith('HD')) {
        path = `/transportationReceiptView/${data}`
      }
      if (data.startsWith('FY')) {
        path = `/shippingPlanView/${data}`
      }
      if (path !== '') {
        this.$router.push({ path })
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

<style lang="scss" scoped>
.view_box{
  width: 100%;
  height: 100%;
}
.tabs-box{
  // height: 400px;
  margin-bottom: 20px;
}

.add_table_box{
 min-height: 240px;
}

.link {
  cursor: pointer;
  color: #409EFF;
  &:hover {
    text-decoration: underline;
  }
}

</style>
