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
              :data.sync="tableInfoTrip.data"
              :field-list="tableInfoTrip.fieldList"
              :handle="null"
              @handleClick="handleClick"
            />
          </template>
          <template #2>
            <zhqc-table
              :data.sync="tableInfoPlan.data"
              :field-list="tableInfoPlan.fieldList"
              :handle="null"
              @handleClick="handleClick"
            />
          </template>
          <template #3>
            <zhqc-table
              :data.sync="tableInfoOrder.data"
              :field-list="tableInfoOrder.fieldList"
              :handle="null"
              @handleClick="handleClick"
            />
          </template>
          <template #4>
            <zhqc-table
              :data.sync="tableInfoRoute.data"
              :field-list="tableInfoRoute.fieldList"
              :handle="null"
              @handleClick="handleClick"
            />
          </template>
          <template #5>
            <zhqc-table
              :data.sync="tableInfoOprt.data"
              :field-list="tableInfoOprt.fieldList"
              :handle="null"
              @handleClick="handleClick"
            >
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
    </full-pop>
    <zhqc-pdf-view ref="pdfview" :url="pdfUrl" />
  </div>
</template>

<script>
export default {
  name: 'WaybillView',
  data() {
    return {
      store: 'waybill/',
      modName: 'waybill',
      fullDialogInfo: {
        title: this.$t('查看'),
        visible: true,
        type: 'view',
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
      tabs: {
        activeName: '1',
        tabsList: [
          {
            label: '行程信息',
            value: '1'
          },
          {
            label: '计划信息',
            value: '2'
          },
          {
            label: '商品信息',
            value: '3'
          },
          {
            label: '路由信息',
            value: '4'
          },
          {
            label: '操作记录',
            value: '5'
          }
        ]
      },
      tableInfoTrip: {
        fieldList: null, // 表格列集合
        handle: null,
        data: []
      },
      tableInfoPlan: {
        fieldList: null, // 表格列集合
        handle: null,
        data: []
      },
      tableInfoOrder: {
        fieldList: null, // 表格列集合
        handle: null,
        data: []
      },
      tableInfoRoute: {
        fieldList: null, // 表格列集合
        handle: null,
        data: []
      },
      tableInfoOprt: {
        fieldList: null, // 表格列集合
        handle: null,
        data: []
      },
      listTypeInfo: {},
      pdfUrl: ''
    }
  },
  computed: {

  },
  activated() {
    const id = this.$route.params.id
    this.queryRowData(id)
  },
  // 页面初始化函数
  created() {
    this.initTopFormColumns()
  },

  methods: {
    initTopFormColumns() {
      this.fullDiaFormInfo.data = {}
      this.fullDiaFormInfo.fieldList = [
        { label: this.$t('waybill.transportNo'), value: 'transportNo', type: 'input', disabled: true },
        { label: this.$t('waybill.carrierName'), value: 'carrierName', type: 'select', disabled: true },
        { label: this.$t('waybill.deliverType'), value: 'deliverTypeName', type: 'select', disabled: true },
        { label: this.$t('waybill.transportType'), value: 'transportTypeName', type: 'select', disabled: true },
        { label: this.$t('waybill.orderSendType'), value: 'orderSendTypeName', type: 'select', disabled: true },
        { label: this.$t('waybill.orderPsType'), value: 'orderPsTypeName', type: 'select', disabled: true },
        { label: this.$t('waybill.unloadType'), value: 'unloadTypeName', type: 'select', disabled: true },
        { label: this.$t('waybill.ownerName'), value: 'ownerName', type: 'input', disabled: true },
        { label: this.$t('waybill.senderName'), value: 'senderName', type: 'input', disabled: true },
        { label: this.$t('waybill.sendProvinceName'), value: 'sendProvinceName', type: 'input', disabled: true },
        { label: this.$t('waybill.sendCityName'), value: 'sendCityName', type: 'input', disabled: true },
        { label: this.$t('waybill.sendAreaName'), value: 'sendAreaName', type: 'input', disabled: true },
        { label: this.$t('waybill.sendLocation'), value: 'sendLocation', type: 'input', disabled: true },
        { label: this.$t('waybill.sendContactor'), value: 'sendContactor', type: 'input', disabled: true },
        { label: this.$t('waybill.senderPhone'), value: 'senderPhone', type: 'input', disabled: true },
        { label: this.$t('waybill.taskNum'), value: 'taskNum', type: 'input', disabled: true },
        { label: this.$t('waybill.routeUpdateTime'), value: 'routeUpdateTime', type: 'input', disabled: true },
        { label: this.$t('waybill.creator'), value: 'creatorName', type: 'input', disabled: true },
        { label: this.$t('waybill.createTime'), value: 'createTime', type: 'input', disabled: true }
      ]
      // 行程信息
      this.tableInfoTrip.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'transportStatusName', label: this.$t('waybill.status'), minWidth: 100 },
        { prop: 'startName', label: this.$t('waybill.startCode'), minWidth: 100 },
        { prop: 'endName', label: this.$t('waybill.endCode'), minWidth: 100 },
        { prop: 'opTypeName', label: this.$t('waybill.subOpType'), minWidth: 100 },
        { prop: 'subTransportTypeName', label: this.$t('waybill.subTransportType'), minWidth: 100 },
        { prop: 'subTransportCompany', label: this.$t('waybill.transportCompany'), minWidth: 100 },
        { prop: 'vehicleModel', label: this.$t('waybill.vehicleModel'), minWidth: 100 },
        { prop: 'trainNumber', label: this.$t('waybill.trainNumber'), minWidth: 100 },
        { prop: 'plateNumber', label: this.$t('waybill.plateNumber'), minWidth: 100 },
        { prop: 'driver', label: this.$t('waybill.driver'), minWidth: 100 },
        { prop: 'driverPhone', label: this.$t('waybill.driverPhone'), minWidth: 100 },
        { prop: 'cntrNo', label: this.$t('waybill.cntrNo'), minWidth: 100 },
        { prop: 'wagon', label: this.$t('waybill.wagonNo'), minWidth: 100 },
        { prop: 'shippingSpace', label: this.$t('waybill.shippingSpace'), minWidth: 100 },
        { prop: 'facingSlip', label: this.$t('waybill.facingSlip'), minWidth: 100 },
        { prop: 'estimateSendTime', label: this.$t('waybill.estimateSendTime'), minWidth: 100 },
        { prop: 'estimateReceiveTime', label: this.$t('waybill.estimateReceiveTime'), minWidth: 100 }
      ]
      // 计划信息
      this.tableInfoPlan.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'transportStatusName', label: this.$t('waybill.status'), minWidth: 100 },
        { prop: 'receiptSignStatus', label: this.$t('waybill.receiptSignStatus'), minWidth: 100 },
        { prop: 'planOrderNo', label: this.$t('waybill.planOrderNo'), minWidth: 100 },
        { prop: 'receiveTime', label: this.$t('waybill.receiveTime'), minWidth: 100 },
        { prop: 'orderNo', label: this.$t('waybill.orderNo'), minWidth: 100 },
        { prop: 'sourceSystem', label: this.$t('waybill.sourceSystem'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('waybill.createTimeOrd'), minWidth: 100 },
        { prop: 'cOrderNo', label: this.$t('waybill.cOrderNo'), minWidth: 100 },
        { prop: 'businessTypeName', label: this.$t('waybill.businessType'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('waybill.ownerName'), minWidth: 100 },
        { prop: 'deliverTypeName', label: this.$t('waybill.deliverType'), minWidth: 100 },
        { prop: 'unloadTypeName', label: this.$t('waybill.unloadType'), minWidth: 100 },
        { prop: 'receiverName', label: this.$t('waybill.receiverName'), minWidth: 100 },
        { prop: 'receiveProvinceName', label: this.$t('waybill.receiveProvinceName'), minWidth: 100 },
        { prop: 'receiveCityName', label: this.$t('waybill.receiveCityName'), minWidth: 100 },
        { prop: 'receiveAreaName', label: this.$t('waybill.receiveAreaName'), minWidth: 100 },
        { prop: 'receiveLocation', label: this.$t('waybill.receiveLocation'), minWidth: 100 },
        { prop: 'receiveContactor', label: this.$t('waybill.receiveContactor'), minWidth: 100 },
        { prop: 'receiverPhone', label: this.$t('waybill.receiverPhone'), minWidth: 100 },
        { prop: 'remark', label: this.$t('waybill.remarkOrd'), minWidth: 100 },
        { prop: 'lineTypeName', label: this.$t('waybill.lineType'), minWidth: 100 },
        { prop: 'lineCode', label: this.$t('waybill.lineCode'), minWidth: 100 },
        { prop: 'lineRemark', label: this.$t('waybill.lineRemark'), minWidth: 100 },
        { prop: 'skuCount', label: this.$t('waybill.skuCount'), minWidth: 100 },
        { prop: 'numCount', label: this.$t('waybill.numCount'), minWidth: 100 },
        { prop: 'orderWeight', label: this.$t('waybill.orderWeight'), minWidth: 100 },
        { prop: 'orderVolume', label: this.$t('waybill.orderVolume'), minWidth: 100 }
      ]
      // 商品信息
      this.tableInfoOrder.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'planOrderNo', label: this.$t('waybill.planOrderNo'), minWidth: 100 },
        { prop: 'orderNo', label: this.$t('waybill.orderNo'), minWidth: 100 },
        { prop: 'rowNo', label: this.$t('waybill.rowNo'), minWidth: 100 },
        { prop: 'cOrderNo', label: this.$t('waybill.cOrderNo'), minWidth: 100 },
        { prop: 'receiptSignStatusName', label: this.$t('waybill.receiptSignStatus'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('waybill.skuName'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('waybill.skuCode'), minWidth: 100 },
        { prop: 'spec', label: this.$t('waybill.spec'), minWidth: 100 },
        { prop: 'unit', label: this.$t('waybill.unit'), minWidth: 100 },
        { prop: 'num', label: this.$t('waybill.num'), minWidth: 100 },
        { prop: 'numInt', label: this.$t('waybill.numInt'), minWidth: 100 },
        { prop: 'numEa', label: this.$t('waybill.numEa'), minWidth: 100 },
        { prop: 'weight', label: this.$t('waybill.weight'), minWidth: 100 },
        { prop: 'volume', label: this.$t('waybill.volume'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('waybill.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('waybill.productionDate'), minWidth: 100 },
        { prop: 'expirationDate', label: this.$t('waybill.expirationDate'), minWidth: 100 },
        { prop: 'signNum', label: this.$t('waybill.signNum'), minWidth: 100 },
        { prop: 'signLossNum', label: this.$t('waybill.signLossNum'), minWidth: 100 },
        { prop: 'signMissNum', label: this.$t('waybill.signMissNum'), minWidth: 100 },
        { prop: 'signRejectNum', label: this.$t('waybill.signRejectNum'), minWidth: 100 },
        { prop: 'causeRemark', label: this.$t('waybill.causeRemark'), minWidth: 100 }
      ]
      // 路由信息
      this.tableInfoRoute.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        // { prop: 'transportTypeName', label: this.$t('waybill.transportType'), minWidth: 100 },
        { prop: 'transportStatusName', label: this.$t('waybill.status'), minWidth: 100 },
        { prop: 'orderDateKeyName', label: this.$t('waybill.orderDateKey'), minWidth: 100 },
        { prop: 'orderDate', label: this.$t('waybill.orderDate'), minWidth: 100 },
        { prop: 'remark', label: this.$t('waybill.remark'), minWidth: 100 },
        { prop: 'creatorName', label: this.$t('waybill.updater'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('waybill.updateTime'), minWidth: 100 }
      ]
      // 操作
      this.tableInfoOprt.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'creatorName', label: this.$t('waybill.creatorOpr'), minWidth: 130 },
        { prop: 'createTime', label: this.$t('waybill.createTimeOpr'), minWidth: 130 },
        { prop: 'operationContent', label: this.$t('waybill.operationContent'), minWidth: 130 },
        { prop: 'operationDesc', label: this.$t('waybill.operationDesc'), minWidth: 130 },
        { value: 'certificate', label: this.$t('waybill.credential'), minWidth: 130, type: 'slot' }
      ]
    },
    close() {
      this.$router.push({ path: '/page_tms_transportation_waybill_waybill' })
    },
    /**
     * 查询行数据【查看/编辑数据从后台获取时用此方法】
     * @param data
     */
    queryRowData(data) {
      if (!data) { return }
      this.$store.dispatch(this.store + 'initUpdateByNo', data).then(() => {
        const result = this.$store.state[this.modName].initUpdateByNoObj

        if (result) {
          this.fullDiaFormInfo.data = result.entity
        }
      }).then(() => {
        this.queryTransportTripList(data)
      }).then(() => {
        this.queryPlanList(data)
      }).then(() => {
        this.queryTransportItemList(data)
      }).then(() => {
        this.queryTransportRouteList(data)
      }).then(() => {
        this.queryTransportLogList(data)
      })
    },
    // 查看运输单行程信息
    queryTransportTripList(data) {
      if (!data) { return }
      this.$store.dispatch(this.store + 'queryTransportTripList', data).then(() => {
        const result = this.$store.state[this.modName].transportTripResp
        this.tableInfoTrip.data = result.obj
      })
    },
    // 查看运输单计划信息
    queryPlanList(data) {
      if (!data) { return }
      this.$store.dispatch(this.store + 'queryPlanList', data).then(() => {
        const result = this.$store.state[this.modName].transportPlanResp
        this.tableInfoPlan.data = result.obj
      })
    },
    // 查看运输单商品信息
    queryTransportItemList(data) {
      if (!data) { return }
      this.$store.dispatch(this.store + 'queryTransportItemList', data).then(() => {
        const result = this.$store.state[this.modName].transportItemResp
        this.tableInfoOrder.data = result.obj
      })
    },
    // 查看运输单路由信息
    queryTransportRouteList(data) {
      if (!data) { return }
      this.$store.dispatch(this.store + 'queryTransportRouteList', data).then(() => {
        const result = this.$store.state[this.modName].transportRouteResp
        result.obj.forEach(item => {
          item.orderDate = this.timeSlice(item.orderDate)
        })
        this.tableInfoRoute.data = result.obj
      })
    },
    // 查看运输单操作信息
    queryTransportLogList(data) {
      if (!data) { return }
      this.$store.dispatch(this.store + 'queryTransportLogList', data).then(() => {
        const result = this.$store.state[this.modName].transportLogResp
        this.tableInfoOprt.data = result.obj
      })
    },
    getSrcList(row) {
      return row.evidenceImage.split(',')
    },
    timeSlice(str) {
      return str.slice(0, 10)
    },

    pdfview(data) {
      this.pdfUrl = data
      this.$refs.pdfview.show()
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
  height: 300px;
}

</style>
