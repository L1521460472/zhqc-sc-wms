<template>
  <div class="view_box">
    <full-pop
      :visible.sync="fullDialogInfo.visible"
      :top-title="fullDialogInfo.title"
      :close-btn="fullDialogInfo.closeBtn"
      :save-list="fullDialogInfo.btList"
      @handleClick="handleClick"
    >
      <full-pop-item :full-pop-item-title="$t('shippingPlan.shippingPlanInfo')">
        <!--  主页面top表单   -->
        <div>
          <zhqc-top-form-sc
            :ref-obj.sync="topForm.ref"
            :data="topForm.data"
            :field-list="topForm.fieldList"
            :rules="topForm.rules"
            :list-type-info="listTypeInfo"
            :label-width="topForm.labelWidth"
            :line-num="10"
            @handleClick="handleClick"
            @handleEvent="handleEvent"
          />
        </div>
        <!-- tab表格 -->
        <div>
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
                :handle="tableInfo1.handle"
                @handleClick="handleClick"
                @handleEvent="handleEvent"
              />
            </template>
            <template #2>
              <zhqc-table
                :data.sync="tableInfo2.data"
                :field-list="tableInfo2.fieldList"
                :handle="tableInfo2.handle"
                @handleClick="handleClick"
                @handleEvent="handleEvent"
              >
                <template v-slot:col-orderNo="scope">
                  <div :class="{'link': isLink(scope.row.orderNo) }" @click="orderNoClick(scope.row.orderNo)">{{ scope.row.orderNo }}</div>
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
            <template #3>
              <zhqc-table
                :data.sync="tableInfo3.data"
                :field-list="tableInfo3.fieldList"
                :handle="tableInfo3.handle"
                @handleClick="handleClick"
                @handleEvent="handleEvent"
              />
            </template>
          </zhqc-tabs>
        </div>
      </full-pop-item>
    </full-pop>
    <zhqc-pdf-view ref="pdfview" :url="pdfUrl" />
  </div>
</template>

<script>

export default {
  name: 'ShippingPlanView',
  data() {
    return {
      store: 'shippingPlan/',
      modName: 'shippingPlan',
      // 全屏弹框配置
      fullDialogInfo: {
        title: '',
        visible: true,
        type: '',
        varSup: false,
        varCus: false,
        varStore: false,
        varProvince: true,
        varCity: true,
        varArea: true,
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true }
        ]
      },
      listTypeInfo: {},
      // 主页面的top表单
      topForm: {
        ref: null, // 对外提供的可操作表单的持有对象
        fieldList: null, // 配置的表单字段集合
        data: {}, // 表单绑定的数据Model
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px' // 默认表单字段label宽度
      },
      tabs: {
        activeName: '1',
        bgDradient: ['#00d4d8', '#009396'],
        fontSize: 14,
        tabsList: [
          { label: this.$t('shippingPlan.shippingPlanDetail'), value: '1' },
          { label: this.$t('shippingPlan.operationRecord'), value: '2' },
          { label: this.$t('shippingPlan.routingInfo'), value: '3' }
        ]
      },
      // 主页面表格
      tableInfo1: {
        data: [],
        fieldList: null // 表格列集合
      },
      // 主页面表格
      tableInfo2: {
        data: [],
        fieldList: null // 表格列集合
      },
      // 主页面表格
      tableInfo3: {
        data: [],
        fieldList: null, // 表格列集合
        handle: null
      },
      selectRow: null,
      pdfUrl: ''
    }
  },

  activated() {
    this.tabs.activeName = '1'
    this.queryRowData(this.$route.params.planOrderNo)
  },

  created() {
    this.initTopFormColumns() // 初始化查询界面配置数据
  },

  methods: {
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化top表单
      this.topForm.fieldList = [
        { label: this.$t('shippingPlan.planOrderNo'), value: 'planOrderNo', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.dispatchStatus'), value: 'dispatchStatusName', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.receiveTimeBegin'), value: 'receiveTime', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.appointStatus'), value: 'appointStatusName', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.appointPickupTime'), value: 'appointPickupTime', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.appointSendTime'), value: 'appointSendTime', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.orderNo'), value: 'orderNo', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.sourceSystem'), value: 'sourceSystem', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.createTimeBegin'), value: 'createTime', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.cOrderNo'), value: 'cOrderNo', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.businessType'), value: 'businessTypeName', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.owner'), value: 'ownerName', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.deliverType'), value: 'deliverTypeName', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.unloadType'), value: 'unloadTypeName', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.sender'), value: 'senderName', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.sendProvince'), value: 'sendProvinceName', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.sendCity'), value: 'sendCityName', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.sendArea'), value: 'sendAreaName', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.sendLocation'), value: 'sendLocation', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.sendContactor'), value: 'sendContactor', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.senderPhone'), value: 'senderPhone', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.receiver'), value: 'receiverName', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.receiveProvince'), value: 'receiveProvinceName', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.receiveCity'), value: 'receiveCityName', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.receiveArea'), value: 'receiveAreaName', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.receiveLocation'), value: 'receiveLocation', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.receiveContactor'), value: 'receiveContactor', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.receiverPhone'), value: 'receiverPhone', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.planSendTime'), value: 'planSendTime', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.planDeliveryTime'), value: 'planDeliveryTime', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.orderRemark'), value: 'remark', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.orderSendType'), value: 'orderSendTypeName', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.orderPsType'), value: 'orderPsTypeName', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.carrier'), value: 'carrierName', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.transportType'), value: 'transportTypeName', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.lineType'), value: 'lineTypeName', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.lineCode'), value: 'lineCode', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.lineRemark'), value: 'lineRemark', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.skuCount'), value: 'skuCount', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.numCount'), value: 'numCount', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.orderWeight'), value: 'orderWeight', type: 'input', disabled: true },
        { label: this.$t('shippingPlan.orderVolume'), value: 'orderVolume', type: 'input', disabled: true }
      ]

      this.topForm.fieldList.forEach(item => {
        this.$set(this.topForm.data, item.value, '')
      })

      // 初始化列表
      this.tableInfo1.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'rowNo', label: this.$t('shippingPlan.rowNo'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('shippingPlan.skuName'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('shippingPlan.skuCode'), minWidth: 100 },
        { prop: 'spec', label: this.$t('shippingPlan.spec'), minWidth: 100 },
        { prop: 'unit', label: this.$t('shippingPlan.unit'), minWidth: 100 },
        { prop: 'num', label: this.$t('shippingPlan.num'), minWidth: 100 },
        { prop: 'numInt', label: this.$t('shippingPlan.numInt'), minWidth: 100 },
        { prop: 'numEa', label: this.$t('shippingPlan.numEa'), minWidth: 100 },
        { prop: 'weight', label: this.$t('shippingPlan.weightKG'), minWidth: 100 },
        { prop: 'volume', label: this.$t('shippingPlan.volumeCM'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('shippingPlan.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('shippingPlan.productionDate'), minWidth: 100 },
        { prop: 'expirationDate', label: this.$t('shippingPlan.expirationDate'), minWidth: 100 },
        { prop: 'dispatchNum', label: this.$t('shippingPlan.dispatchNum'), minWidth: 100 },
        { prop: 'sendNum', label: this.$t('shippingPlan.sendNum'), minWidth: 100 },
        { prop: 'signNum', label: this.$t('shippingPlan.signNum'), minWidth: 100 }
      ]

      this.tableInfo2.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'createTime', label: this.$t('shippingPlan.opTime'), minWidth: 100 },
        { prop: 'creator', label: this.$t('shippingPlan.opUser'), minWidth: 100 },
        { prop: 'context', label: this.$t('shippingPlan.opContent'), minWidth: 100 },
        { value: 'orderNo', label: this.$t('shippingPlan.associatedNo'), type: 'slot', minWidth: 100 },
        { prop: 'remark', label: this.$t('shippingPlan.opDesc'), minWidth: 100 },
        { value: 'certificate', label: this.$t('shippingPlan.certificate'), type: 'slot', minWidth: 100 }
      ]

      this.tableInfo3.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'transportNo', label: this.$t('shippingPlan.waybillNo'), minWidth: 100 },
        { prop: 'transportStatusName', label: this.$t('shippingPlan.curShipStatus'), minWidth: 100 },
        { prop: 'startName', label: this.$t('shippingPlan.origin'), minWidth: 100 },
        { prop: 'endName', label: this.$t('shippingPlan.destination'), minWidth: 100 },
        { prop: 'transportTypeName', label: this.$t('shippingPlan.transportType'), minWidth: 100 },
        { prop: 'transportCompany', label: this.$t('shippingPlan.shipCompany'), minWidth: 100 }
      ]
    },

    queryRowData(planOrderNo) {
      this.$store.dispatch(this.store + 'pageView', planOrderNo).then(() => {
        const rowData = this.$store.state[this.modName].rowData
        if (rowData) {
          for (const key in this.topForm.data) {
            // 体积为0 也要展示
            this.topForm.data[key] = rowData[key]
          }
          this.topForm.data.skuCount = this.tw(rowData.skuCount)
          this.tableInfo1.data = rowData.planOrderItemList || []
          this.tableInfo2.data = rowData.logList || []
          this.tableInfo3.data = rowData.routeList || []
        }
      })
    },

    isLink(data) {
      return data && (data.startsWith('YS') || data.startsWith('TO') || data.startsWith('PZ') || data.startsWith('HD'))
    },

    orderNoClick(data) {
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
      path && this.$router.push({ path })
    },

    getSrcList(row) {
      return row.evidenceImage.split(',')
    },

    pdfview(data) {
      this.pdfUrl = data
      this.$refs.pdfview.show()
    },

    close() {
      this.$router.push({ path: '/page_tms_dspatching_shippingPlan_shippingPlan' })
    },
    tw(value) {
      const num = Math.round(value * 100) / 100
      return num && num.toFixed(2)
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
