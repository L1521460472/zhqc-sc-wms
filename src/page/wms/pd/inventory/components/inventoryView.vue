<!--
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-11-15 16:25:33
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-23 17:14:30
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
      <full-pop-item full-pop-item-title="盘点单">
        <zhqc-form
          :ref-obj.sync="fullDiaFormInfo.ref"
          :form-type="formType"
          :class-name="viewFlag"
          :data="fullDiaFormInfo.data"
          :field-list="fullDiaFormInfo.fieldList"
          :rules="fullDiaFormInfo.rules"
          :list-type-info="listTypeInfo"
          :label-width="fullDiaFormInfo.labelWidth"
        >
          <!-- 附件 -->
          <template v-slot:form-imgInfo="scope">
            <uploadImg
              ref="uploadImg"
              :export-url="exportImgUrl"
              :accept="fullDiaFormInfo.imgInfo.accept"
              :img-pre-src-list="fullDiaFormInfo.imgInfo.pictureList"
              :show-tips="!fullDiaFormInfo.imgInfo.disabled"
              :disabled="fullDiaFormInfo.imgInfo.disabled"
              @handleImgSuccess="handleImgSuccess"
              @handleRemove="handleRemove"
            />
          </template>
        </zhqc-form>
      </full-pop-item>
      <div class="tabs-box">
        <zhqc-tabs
          v-model="tabs.activeName"
          :tabs-list="tabs.tabsList"
          :bg-gradient="tabs.bgDradient"
          :font-size="tabs.fontSize"
        >
          <template #1>
            <vex-dia-table
              :ref-obj.sync="tableInfo1.ref"
              :data.sync="tableInfo1.data"
              :field-list="tableInfo1.fieldList"
              :handle="tableInfo1.handle"
              :rules="tableInfo1.rules"
              :top-btn="tableInfo1.topBtn"
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
import uploadImg from '@/Subassembly/uploadStyleTwo/upload.vue'
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
import { VUE_APP_BASE_URL } from '@/api/api.config.js'
export default {
  name: 'InventoryView',
  components: {
    uploadImg
  },
  data() {
    return {
      store: 'inventory/',
      modName: 'inventory',
      formType: null,
      viewFlag: null,
      salesStorehouseUrl: VUE_APP_WMS_MODEL + '/base/wh/whArea/queryVirtualwhList',
      exportImgUrl: VUE_APP_BASE_URL + 'fileMgr/fileManager/upload2Path',
      exportUrl: VUE_APP_WMS_MODEL + '/pd/inventory/export',
      ownerUrl: VUE_APP_WMS_MODEL + '/base/partner/owner/queryOwnerCbList',
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
        imgInfo: {
          pictureList: [],
          disabled: false,
          accept: [{ type: 'img', limit: 6 }]
        },
        fieldList: [], // 配置的表单字段集合
        rules: {} // 配置的表单字段校验规则集合
      },
      // 下拉选项列表
      listTypeInfo: {
        inventoryTypeList: [],
        inventoryStatusList: [],
        sourceTypeList: [],
        inventoryMethodList: [],
        rangeList: [],
        goodStatusList: [],
        isVisibleList: []
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
        ref: null,
        topBtn: { label: '增加产品明细', show: false, type: 'primary', disabled: false, loading: false, event: 'openDiaInv' },
        fieldList: [], // 表格列集合
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
        this.listTypeInfo.inventoryTypeList = this.$store.state[this.modName].initPageObj.inventoryTypeList
        this.listTypeInfo.inventoryStatusList = this.$store.state[this.modName].initPageObj.inventoryStatusList
        this.listTypeInfo.sourceTypeList = this.$store.state[this.modName].initPageObj.sourceTypeList
        this.listTypeInfo.inventoryMethodList = this.$store.state[this.modName].initPageObj.inventoryMethodList
        this.listTypeInfo.isVisibleList = this.$store.state[this.modName].initPageObj.isVisibleList
        this.listTypeInfo.rangeList = this.$store.state[this.modName].initPageObj.rangeList
        this.listTypeInfo.goodStatusList = this.$store.state[this.modName].initPageObj.goodStatusList
      })
    },
    initTopFormColumns() {
      this.fullDiaFormInfo.data = {}
      this.fullDiaFormInfo.fieldList = [
        { label: this.$t('inventory.ownerName'), value: 'ownerName', type: 'input', disabled: true },
        { label: this.$t('inventory.consignee'), value: 'areaName', type: 'input', disabled: true },
        { label: this.$t('inventory.inventoryTypeName'), value: 'inventoryTypeName', type: 'input', disabled: true },
        { label: this.$t('inventory.inventoryMethodName'), value: 'inventoryMethodName', type: 'input', disabled: true },
        { label: this.$t('inventory.inventoryRange'), value: 'inventoryRangeNameList', type: 'input', disabled: true },
        { label: this.$t('inventory.inventoryStatusName'), value: 'inventoryGoodStatusName', type: 'input', disabled: true },
        { label: this.$t('inventory.isVisibleName'), value: 'isVisibleName', type: 'input', disabled: true },
        { label: this.$t('inventory.inventoryDate'), value: 'inventoryDate', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd', disabled: true },
        { label: this.$t('inventory.stockist'), value: 'inventoryOperator', type: 'input', disabled: true },
        { label: this.$t('inventory.supervisor'), value: 'supervisionOperator', type: 'input', disabled: true },
        { label: this.$t('inventory.planStartTime'), value: 'planStartTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd', disabled: true },
        { label: this.$t('inventory.sourceTypeName'), value: 'sourceTypeName', type: 'input', disabled: true },
        { label: this.$t('inventory.inventoryNoStatus'), value: 'inventoryStatusName', type: 'input', disabled: true },
        { label: this.$t('inventory.remark'), value: 'remark', type: 'input', disabled: true },
        // { label: this.$t('inventory.createName'), value: 'createName', type: 'input', readonly: true },
        // { label: this.$t('inventory.createTime'), value: 'createTime', type: 'input', readonly: true },
        { label: this.$t('inventory.updateName'), value: 'updateName', type: 'input', disabled: true },
        { label: this.$t('inventory.confirmName'), value: 'confirmUserName', type: 'input', disabled: true },
        { label: this.$t('inventory.confirmTime'), value: 'confirmTime', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd', disabled: true },
        { label: this.$t('inventory.supervisionTime'), value: 'supervisionDate', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd', disabled: true },
        { value: 'imgInfo', type: 'slot', className: 'item-image' }
      ]

      this.tableInfo1.fieldList = [
        { label: '序号', type: 'seq', width: 50 },
        { prop: 'areaName', label: this.$t('inventory.dt.consignee'), minWidth: 100 },
        { prop: 'zoneName', label: this.$t('inventory.dt.zoneName'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('inventory.dt.lotCode'), minWidth: 100 },
        { prop: 'inventoryCategory', label: this.$t('inventory.dt.InventoryCategory'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('inventory.dt.skuCode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('inventory.dt.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('inventory.dt.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('inventory.dt.mainUnit'), minWidth: 100 },
        { prop: 'goodQty', label: this.$t('inventory.dt.unInventory'), minWidth: 100 },
        { prop: 'badQty', label: this.$t('inventory.dt.frozenInventory'), minWidth: 100 },
        { prop: 'sumPdQty', label: this.$t('inventory.dt.firstPdQty'), minWidth: 100 },
        { prop: 'inventoryStatus', label: this.$t('inventory.dt.inventoryStatus'), children: [
          { prop: 'goodPdQty', label: this.$t('inventory.dt.goodProduct'), minWidth: 130 },
          { prop: 'brokenPdQty', label: this.$t('inventory.dt.damagedProduct'), minWidth: 130 },
          { prop: 'expiredPdQty', label: this.$t('inventory.dt.expiredProduct'), minWidth: 130 },
          { prop: 'badPdQty', label: this.$t('inventory.dt.badProduct'), minWidth: 130 }
        ] },
        { prop: 'diffQty', label: this.$t('inventory.dt.varianceQty'), minWidth: 130 },
        { prop: 'remark', label: this.$t('inventory.dt.remark'), minWidth: 150 },
        { prop: 'batchNo', label: this.$t('inventory.dt.batchNo'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('inventory.dt.instoreDate'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('inventory.dt.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('inventory.dt.productionDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('inventory.dt.invalidDate'), minWidth: 100 }
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
      this.fullDiaFormInfo.imgInfo.disabled = true
    },
    close() {
      this.$router.push({ path: '/page_wms_pd_inventory_inventory' })
    },
    /**
     * 查询行数据【查看/编辑数据从后台获取时用此方法】
     * @param data
     */
    queryRowData(data) {
      this.$store.dispatch(this.store + 'initUpdate', data.id).then(() => {
        this.fullDiaFormInfo.data = this.$store.state[this.modName].initUpdateObj.entity
        this.tableInfo1.data = this.$store.state[this.modName].initUpdateObj?.entity?.dtList ?? []
        this.tableInfo2.data = this.$store.state[this.modName].initUpdateObj.logList
        console.log(this.tableInfo1.data, this.$store.state[this.modName].initUpdateObj.dtList)
        this.fullDiaFormInfo.imgInfo.pictureList = JSON.parse(this.$store.state[this.modName].initUpdateObj.entity.attachment)
        if (this.fullDiaFormInfo.ref) {
          this.fullDiaFormInfo.ref.clearValidate()
        }
      })
    },
    // 上传成功
    handleImgSuccess(list) {
      console.log(list, this.fullDiaFormInfo.data.inventoryNo)
      // this.fullDiaFormInfo.imgInfo.pictureList = list
      // // this.diaFormInfo.data.evidence = list
      // const params = {
      //   'inventoryNo': this.fullDiaFormInfo.data.inventoryNo,
      //   'attachmentList': list
      // }
      // upload(params)
    },
    // 移除
    handleRemove(list) {
      console.log(list)
      // this.fullDiaFormInfo.imgInfo.pictureList = list
      // // this.fullDiaFormInfo.data.evidence = list
      // const params = {
      //   'inventoryNo': this.fullDiaFormInfo.data.inventoryNo,
      //   'attachmentList': list
      // }
      // upload(params)
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
      console.log(data)
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
.page-form /deep/ .item-image{
  display: block;
}
</style>
