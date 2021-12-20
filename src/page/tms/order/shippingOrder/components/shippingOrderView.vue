<template>
  <div class="view_box">
    <full-pop
      :visible.sync="fullDialogInfo.visible"
      :top-title="fullDialogInfo.title"
      :close-btn="fullDialogInfo.closeBtn"
      :save-list="fullDialogInfo.btList"
      @handleClick="handleClick"
    >
      <full-pop-item full-pop-item-title="订单信息">
        <zhqc-form
          :ref-obj.sync="fullDiaFormInfo.ref"
          :data="fullDiaFormInfo.data"
          :field-list="fullDiaFormInfo.fieldList"
          :rules="fullDiaFormInfo.rules"
          :list-type-info="listTypeInfo"
          :form-type="formType"
          :class-name="viewFlag"
          :label-width="fullDiaFormInfo.labelWidth"
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
  name: 'ShippingOrderView',
  data() {
    return {
      store: 'shippingOrder/',
      modName: 'shippingOrder',
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
    this.initPage()
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
        { label: this.$t('shippingOrder.orderNo'), value: 'orderNo', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.sourceSystem'), value: 'sourceSystem', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.status'), value: 'status', type: 'select', list: 'statusList', disabled: true },
        { label: this.$t('shippingOrder.cOrderNo'), value: 'cOrderNo', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.ownerName'), value: 'ownerName', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.businessType'), value: 'businessTypeName', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.deliveryType'), value: 'deliveryTypeName', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.senderName'), value: 'senderName', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.sendProvinceName'), value: 'sendProvinceName', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.sendCityName'), value: 'sendCityName', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.sendAreaName'), value: 'sendAreaName', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.sendLocation'), value: 'sendLocation', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.sendContactor'), value: 'sendContactor', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.senderPhone'), value: 'senderPhone', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.receiverName'), value: 'receiverName', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.receiveProvinceName'), value: 'receiveProvinceName', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.receiveCityName'), value: 'receiveCityName', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.receiveAreaName'), value: 'receiveAreaName', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.receiveLocation'), value: 'receiveLocation', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.receiveContactor'), value: 'receiveContactor', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.receiverPhone'), value: 'receiverPhone', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.palnSendDate'), value: 'palnSendDate', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.orderSendType'), value: 'orderSendTypeName', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.orderPsType'), value: 'orderPsTypeName', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.carrierName'), value: 'carrierName', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.transportType'), value: 'transportTypeName', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.lineType'), value: 'lineTypeName', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.lineCode'), value: 'lineCode', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.lineRemark'), value: 'lineRemark', type: 'textarea', rows: 1, autosize: false, disabled: true },
        { label: this.$t('shippingOrder.unloadType'), value: 'unloadTypeName', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.skuCount'), value: 'skuCount', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.numCount'), value: 'numCount', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.orderWeightt'), value: 'orderWeight', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.orderVolumem'), value: 'orderVolume', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.orderMoney'), value: 'orderMoney', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.orderRemark'), value: 'remark', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.ext1'), value: 'ext1', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.ext2'), value: 'ext2', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.ext3'), value: 'ext3', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.ext4'), value: 'ext4', type: 'input', disabled: true },
        { label: this.$t('shippingOrder.ext5'), value: 'ext5', type: 'input', disabled: true }
      ]

      this.tableInfo1.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'rowNo', label: this.$t('shippingOrder.rowNo'), minWidth: 130 },
        { prop: 'skuName', label: this.$t('shippingOrder.skuName'), minWidth: 130 },
        { prop: 'skuCode', label: this.$t('shippingOrder.skuCode'), minWidth: 130 },
        { prop: 'spec', label: this.$t('shippingOrder.spec'), minWidth: 130 },
        { prop: 'unit', label: this.$t('shippingOrder.unit'), minWidth: 130 },
        { prop: 'num', label: this.$t('shippingOrder.num'), minWidth: 130 },
        { prop: 'numInt', label: this.$t('shippingOrder.numInt'), minWidth: 130 },
        { prop: 'numEa', label: this.$t('shippingOrder.numEa'), minWidth: 130 },
        { prop: 'weight', label: this.$t('shippingOrder.weight'), minWidth: 130 },
        { prop: 'volume', label: this.$t('shippingOrder.volume'), minWidth: 130 },
        { prop: 'productionBatch', label: this.$t('shippingOrder.productionBatch'), minWidth: 130 },
        { prop: 'productionDate', label: this.$t('shippingOrder.productionDate'), minWidth: 130 },
        { prop: 'expirationDate', label: this.$t('shippingOrder.expirationDate'), minWidth: 130 }
      ]
      this.tableInfo2.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'createTime', label: this.$t('shippingOrder.createTime'), minWidth: 130 },
        { prop: 'creatorName', label: this.$t('shippingOrder.creatorName'), minWidth: 130 },
        { prop: 'operationContent', label: this.$t('shippingOrder.operationContent'), minWidth: 130 },
        // { value: 'operationDesc', label: this.$t('shippingOrder.operationDesc'), minWidth: 130 },
        { value: 'operationDesc', label: this.$t('shippingOrder.operationDesc'), type: 'slot', minWidth: 130 },
        { value: 'certificate', label: this.$t('shippingOrder.certificate'), type: 'slot', minWidth: 100 }

      ]
    },
    close() {
      this.$router.push({ path: '/page_tms_order_shippingOrder_shippingOrder' })
    },
    /**
     * 查询行数据【查看/编辑数据从后台获取时用此方法】
     * @param data
     */
    queryRowData(data) {
      this.$store.dispatch(this.store + 'initView', data.id).then(() => {
        const result = this.$store.state[this.modName].initViewResp
        if (result.code === this.$successCode) {
          this.fullDiaFormInfo.data = result.obj.entity
          this.fullDiaFormInfo.data.skuCount = this.tw(this.fullDiaFormInfo.data.skuCount)
          this.fullDiaFormInfo.data.numCount = this.tw(this.fullDiaFormInfo.data.numCount)
          this.fullDiaFormInfo.data.orderVolume = this.sw(this.fullDiaFormInfo.data.orderVolume)
          this.fullDiaFormInfo.data.orderWeight = this.sw(this.fullDiaFormInfo.data.orderWeight)
          this.fullDiaFormInfo.data.orderMoney = this.tw(this.fullDiaFormInfo.data.orderMoney)
          result.obj.itemList.forEach(item => {
            item.volume = this.sw(item.volume)
            item.weight = this.sw(item.weight)
          })
          this.tableInfo1.data = result.obj.itemList
          this.tableInfo2.data = result.obj.logList
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
