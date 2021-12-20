<template>
  <div class="view">
    <full-pop
      :visible.sync="dialogInfo.visible"
      :top-title="dialogInfo.title"
      :close-btn="dialogInfo.closeBtn"
      :save-list="dialogInfo.btList"
      @handleClick="handleClick"
    >
      <full-pop-item full-pop-item-title="配载信息">
        <zhqc-form
          :ref-obj.sync="diaFormInfo.ref"
          :data="diaFormInfo.data"
          :field-list="diaFormInfo.fieldList"
          :rules="diaFormInfo.rules"
          :list-type-info="listTypeInfo"
          :label-width="diaFormInfo.labelWidth"
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
              :data.sync="tableInfoPlan.data"
              :field-list="tableInfoPlan.fieldList"
              :handle="null"
              @handleClick="handleClick"
            />
          </template>
          <template #2>
            <zhqc-table
              :data.sync="tableInfoOrder.data"
              :field-list="tableInfoOrder.fieldList"
              :handle="null"
              @handleClick="handleClick"
            />
          </template>
          <template #3>
            <zhqc-table
              :data.sync="tableInfoTrip.data"
              :field-list="tableInfoTrip.fieldList"
              :handle="null"
              @handleClick="handleClick"
            />
          </template>
          <template #4>
            <zhqc-table
              :data.sync="tableInfoOprt.data"
              :field-list="tableInfoOprt.fieldList"
              :handle="null"
              @handleClick="handleClick"
            >
              <template v-slot:col-operationDesc="scope">
                <div>{{ scope.row.operationDesc }}</div>
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
        </zhqc-tabs>
      </div>
    </full-pop>
    <zhqc-pdf-view ref="pdfview" :url="pdfUrl" />
  </div>
</template>

<script>
export default {
  name: 'StowageListView',
  mixins: [],
  data() {
    return {
      store: 'stowageList/',
      modName: 'stowageList',
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      dialogInfo: {
        title: '',
        visible: false,
        type: '',
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', btLoading: false, show: false }]
      },
      diaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}// 配置的表单字段校验规则集合
      },
      listTypeInfo: {},
      tabs: {
        activeName: '1',
        tabsList: [
          {
            label: '计划信息',
            value: '1'
          },
          {
            label: '商品信息',
            value: '2'
          },
          {
            label: '行程明细',
            value: '3'
          },
          {
            label: '操作记录',
            value: '4'
          }
        ]
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
      tableInfoTrip: {
        fieldList: null, // 表格列集合
        handle: null,
        data: []
      },
      tableInfoOprt: {
        fieldList: null, // 表格列集合
        handle: null,
        data: []
      },
      pdfUrl: ''
    }
  },
  computed: {
  },
  watch: {
  },
  activated() {
    const assginOrderNo = this.$route.params.id
    this.openViewPage(assginOrderNo)
  },
  methods: {
    isLink(data) {
      return data && (data.startsWith('YS') || data.startsWith('TO') || data.startsWith('FY') || data.startsWith('HD'))
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
      if (data.startsWith('HD')) {
        path = `/transportationReceiptView/${data}`
      }
      if (data.startsWith('FY')) {
        path = `/shippingPlanView/${data}`
      }
      path && this.$router.push({ path })
    },
    openViewPage(data) {
      // 弹窗的类型：view
      this.dialogInfo.type = 'view'
      // 默认弹窗的标题：修改
      this.dialogInfo.title = this.$t('查看')
      // 弹窗是否显示
      this.dialogInfo.visible = true
      // 弹窗的保存按钮是否显示
      this.dialogInfo.btList[1].show = false
      // 绑定弹窗保存事件：viewSave
      this.dialogInfo.btList[1].event = 'viewSave'
      // this.viewID = data.id;
      // 封装的修改表单的数据化配置
      this.diaFormInfoViewFieldList()
      // 为弹窗表单对应的字段赋值
      // this.diaFormInfo.data = this.$deepClone(data);
      this.queryRowData(data)
    },
    diaFormInfoViewFieldList() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('stowageList.assignOrderNo'), value: 'assignOrderNo', type: 'input', disabled: true },
        { label: this.$t('stowageList.assignStatus'), value: 'assignStatusName', type: 'select', disabled: true },
        { label: this.$t('stowageList.estimateArriveTime'), value: 'estimateArriveTime', type: 'input', disabled: true },
        { label: this.$t('stowageList.actualArriveTime'), value: 'actualArriveTime', type: 'input', disabled: true },
        { label: this.$t('stowageList.assignStartTime'), value: 'assignStartTime', type: 'input', disabled: true },
        { label: this.$t('stowageList.assignEndTime'), value: 'assignEndTime', type: 'input', disabled: true },
        { label: this.$t('stowageList.affirmDepartTime'), value: 'affirmDepartTime', type: 'input', disabled: true },
        { label: this.$t('stowageList.ownerName'), value: 'ownerName', type: 'input', disabled: true },
        { label: this.$t('stowageList.deliverType'), value: 'deliverTypeName', type: 'select', disabled: true },
        { label: this.$t('stowageList.unloadType'), value: 'unloadTypeName', type: 'select', disabled: true },
        { label: this.$t('stowageList.senderName'), value: 'senderName', type: 'input', disabled: true },
        { label: this.$t('stowageList.sendProvinceName'), value: 'sendProvinceName', type: 'input', disabled: true },
        { label: this.$t('stowageList.sendCityName'), value: 'sendCityName', type: 'input', disabled: true },
        { label: this.$t('stowageList.sendAreaName'), value: 'sendAreaName', type: 'input', disabled: true },
        { label: this.$t('stowageList.sendLocation'), value: 'sendLocation', type: 'input', disabled: true },
        { label: this.$t('stowageList.sendContactor'), value: 'sendContactor', type: 'input', disabled: true },
        { label: this.$t('stowageList.senderPhone'), value: 'senderPhone', type: 'input', disabled: true },
        { label: this.$t('stowageList.orderSendType'), value: 'orderSendTypeName', type: 'select', disabled: true },
        { label: this.$t('stowageList.orderPsType'), value: 'orderPsTypeName', type: 'select', disabled: true },
        { label: this.$t('stowageList.carrierName'), value: 'carrierName', type: 'input', disabled: true },
        { label: this.$t('stowageList.transportType'), value: 'transportTypeName', type: 'select', disabled: true },
        { label: this.$t('stowageList.orderWeight'), value: 'orderWeight', type: 'input', disabled: true },
        { label: this.$t('stowageList.orderVolume'), value: 'orderVolume', type: 'input', disabled: true },
        { label: this.$t('stowageList.orderNum'), value: 'orderNum', type: 'input', disabled: true },
        { label: this.$t('stowageList.skuCount'), value: 'skuCount', type: 'input', disabled: true },
        { label: this.$t('stowageList.numCount'), value: 'numCount', type: 'input', disabled: true }
      ]
      this.tableInfoOrder.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'planOrderNo', label: this.$t('stowageList.orderNo'), minWidth: 100 },
        { prop: 'rowNo', label: this.$t('stowageList.rowNo'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('stowageList.skuName'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('stowageList.skuCode'), minWidth: 100 },
        { prop: 'spec', label: this.$t('stowageList.spec'), minWidth: 100 },
        { prop: 'unit', label: this.$t('stowageList.unit'), minWidth: 100 },
        { prop: 'num', label: this.$t('stowageList.num'), minWidth: 100 },
        { prop: 'numInt', label: this.$t('stowageList.numInt'), minWidth: 100 },
        { prop: 'numEa', label: this.$t('stowageList.numEa'), minWidth: 100 },
        { prop: 'weight', label: this.$t('stowageList.weight'), minWidth: 100 },
        { prop: 'volume', label: this.$t('stowageList.volume'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('stowageList.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('stowageList.productionDate'), minWidth: 100 },
        { prop: 'expirationDate', label: this.$t('stowageList.expirationDate'), minWidth: 100 },
        { prop: 'loadNum', label: this.$t('stowageList.loadNum'), minWidth: 100 },
        { prop: 'sendNum', label: this.$t('stowageList.sendNum'), minWidth: 100 }
      ]
      this.tableInfoTrip.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'subOpTypeName', label: this.$t('stowageList.subOpType'), minWidth: 100 },
        { prop: 'startName', label: this.$t('stowageList.startCode'), minWidth: 100 },
        { prop: 'endName', label: this.$t('stowageList.endCode'), minWidth: 100 },
        { prop: 'subTransportTypeName', label: this.$t('stowageList.subTransportType'), minWidth: 100 },
        { prop: 'transportCompany', label: this.$t('stowageList.transportCompany'), minWidth: 100 },
        { prop: 'vehicleModel', label: this.$t('stowageList.vehicleModel'), minWidth: 100 },
        { prop: 'trainNumber', label: this.$t('stowageList.trainNumber'), minWidth: 100 },
        { prop: 'plateNumber', label: this.$t('stowageList.plateNumber'), minWidth: 100 },
        { prop: 'driver', label: this.$t('stowageList.driver'), minWidth: 100 },
        { prop: 'driverPhone', label: this.$t('stowageList.driverPhone'), minWidth: 100 },
        { prop: 'cntrNo', label: this.$t('stowageList.cntrNo'), minWidth: 100 },
        { prop: 'wagonNo', label: this.$t('stowageList.wagonNo'), minWidth: 100 },
        { prop: 'shippingSpace', label: this.$t('stowageList.shippingSpace'), minWidth: 100 },
        { prop: 'facingSlip', label: this.$t('stowageList.facingSlip'), minWidth: 100 },
        { prop: 'estimateSendTime', label: this.$t('stowageList.estimateSendTime'), minWidth: 100 },
        { prop: 'actualSendTime', label: this.$t('stowageList.actualSendTime'), minWidth: 100 },
        { prop: 'estimateReceiveTime', label: this.$t('stowageList.estimateReceiveTime'), minWidth: 100 },
        { prop: 'actualReceiveTime', label: this.$t('stowageList.actualReceiveTime'), minWidth: 100 }
      ]
      this.tableInfoPlan.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'planOrderNo', label: this.$t('stowageList.planOrderNo'), minWidth: 100 },
        { prop: 'receiveTime', label: this.$t('stowageList.receiveTime'), minWidth: 100 },
        { prop: 'orderNo', label: this.$t('stowageList.orderNoP'), minWidth: 100 }, //
        { prop: 'sourceSystem', label: this.$t('stowageList.sourceSystem'), minWidth: 100 },
        { prop: 'createTime', label: this.$t('stowageList.createTimeOrd'), minWidth: 100 },
        { prop: 'cOrderNo', label: this.$t('stowageList.cOrderNo'), minWidth: 100 },
        { prop: 'businessTypeName', label: this.$t('stowageList.businessType'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('stowageList.ownerName'), minWidth: 100 },
        { prop: 'deliverTypeName', label: this.$t('stowageList.deliverType'), minWidth: 100 },
        { prop: 'unloadTypeName', label: this.$t('stowageList.unloadType'), minWidth: 100 },
        { prop: 'receiverName', label: this.$t('stowageList.receiverName'), minWidth: 100 },
        { prop: 'receiveProvinceName', label: this.$t('stowageList.receiveProvinceName'), minWidth: 100 },
        { prop: 'receiveCityName', label: this.$t('stowageList.receiveCityName'), minWidth: 100 },
        { prop: 'receiveAreaName', label: this.$t('stowageList.receiveAreaName'), minWidth: 100 },
        { prop: 'receiveLocation', label: this.$t('stowageList.receiveLocation'), minWidth: 100 },
        { prop: 'receiveContactor', label: this.$t('stowageList.receiveContactor'), minWidth: 100 },
        { prop: 'receiverPhone', label: this.$t('stowageList.receiverPhone'), minWidth: 100 },
        { prop: 'remark', label: this.$t('stowageList.remarkOrd'), minWidth: 100 },
        { prop: 'lineTypeName', label: this.$t('stowageList.lineType'), minWidth: 100 },
        { prop: 'lineCode', label: this.$t('stowageList.lineCode'), minWidth: 100 },
        { prop: 'lineRemark', label: this.$t('stowageList.lineRemark'), minWidth: 100 },
        { prop: 'skuCount', label: this.$t('stowageList.skuCount'), minWidth: 100 },
        { prop: 'numCount', label: this.$t('stowageList.numCount'), minWidth: 100 },
        { prop: 'orderWeight', label: this.$t('stowageList.orderWeightk'), minWidth: 100 },
        { prop: 'orderVolume', label: this.$t('stowageList.orderVolumec'), minWidth: 100 }
      ]
      this.tableInfoOprt.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'createTime', label: this.$t('stowageList.createTimeOpr'), minWidth: 130 },
        { prop: 'creatorName', label: this.$t('stowageList.creatorOpr'), minWidth: 130 },
        { prop: 'operationContent', label: this.$t('stowageList.operationContent'), minWidth: 130 },
        { value: 'operationDesc', label: this.$t('stowageList.operationDesc'), minWidth: 130, type: 'slot' },
        { value: 'certificate', label: this.$t('stowageList.credential'), minWidth: 130, type: 'slot' }
      ]
    },
    // 查看
    queryRowData(data) {
      this.$store.dispatch(this.store + 'initUpdate', data).then(() => {
        const resp = this.$store.state[this.modName].initUpdateObj
        if (resp) {
          this.diaFormInfo.data = resp
          this.tableInfoOrder.data = resp.assignmentItemList
          this.tableInfoPlan.data = resp.planAssignmentList
          this.tableInfoTrip.data = resp.assignmentTripList
          this.tableInfoOprt.data = resp.assignmentLogList
        }
      })
    },
    close() {
      this.$router.push({ path: '/page_tms_transportation_stowageList_stowageList' })
    },
    getSrcList(row) {
      return row.evidenceImage.split(',')
    },

    pdfview(data) {
      this.pdfUrl = data
      this.$refs.pdfview.show()
    },

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
.link {
  cursor: pointer;
  color: #409EFF;
  &:hover {
    text-decoration: underline;
  }
}
</style>
