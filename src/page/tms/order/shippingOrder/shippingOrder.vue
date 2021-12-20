<template>
  <layout-body>
    <div slot="top-form">
      <!--  主页面top表单   -->
      <zhqc-top-form
        :ref-obj.sync="topForm.ref"
        :data="topForm.data"
        :field-list="topForm.fieldList"
        :rules="topForm.rules"
        :list-type-info="listTypeInfo"
        :label-width="topForm.labelWidth"
        @handleClick="handleClick"
        @handleEvent="handleEvent"
      >

        <!--  货主名称 -->
        <template v-slot:form-ownerName>
          <remote-list
            :model="topForm.data"
            select-key="ownerName"
            lable="ownerName"
            parame-code="ownerCode"
            :list-url="ownerUrl"
          >
            <template v-slot="scope">
              <span style="float: left; color: #8492a6; font-size: 13px;">{{ scope.item.ownerName }}</span>
            </template>
          </remote-list>
        </template>

        <!-- 承运商名称 -->
        <template v-slot:form-carrierName>
          <list-carrierName
            :model="topForm.data"
            select-key="carrierName"
            lable="carrierName"
            parame-code="carrierCode"
          />
        </template>

        <!-- 发货方 -->
        <template v-slot:form-senderName>
          <list-sender-or-receiver

            :model="topForm.data"
            select-key="senderName"
            lable="senderName"
            parame-code="senderCode"
            :list-url="SRUrl"
            :param-type="true"
          />
        </template>

        <!-- 收货方 -->
        <template v-slot:form-receiverName>
          <list-sender-or-receiver

            :model="topForm.data"
            select-key="receiverName"
            lable="receiverName"
            parame-code="receiverCode"
            :list-url="SRUrl"
            :param-type="true"
          />
        </template>
        <!-- 展开收起表单 -->
        <template v-slot:form-sys="" class="el-icon-test">
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleClick('search')"
          >{{ $t("table.search") }}</el-button>
          <el-button
            type="warning"
            icon="el-icon-refresh-left"
            @click="handleClick('reboot')"
          >{{ $t("table.reboot") }}</el-button>
          <!-- <el-button
            type="warning"
            icon="el-icon-refresh-left"
            @click="handleClick('openPopFormList')"
          >自定义 </el-button> -->
          <div class="collapsable-item" @click="handleClick('openCollapsable')">
            {{ collapsable ? "收起" : "展开"
            }}<i
              :class="collapsable ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
            />
          </div>
        </template>
        <!-- 展开收起表单结束 -->
      </zhqc-top-form>

    </div>
    <div slot="left-btn">
      <el-button-group>
        <el-button
          type="primary"
          icon="el-icon-folder-add"
          :disabled="false"
          @click="handleClick('openAddPage')"
        >{{ $t("table.add") }}</el-button>
      </el-button-group>
      <!-- <export-vue
        template-name="shippingOrderService"
        export-url="base/shippingOrder/export"
        export-name="运输订单商品明细"
        @exportParam="exportData"
      />
      <upload-vue
        template-name="inOrderService"
        :upload-url="uploadUrl"
        @uploadQuery="uploadQueryFn"
      />
      <export-template-vue
        :template-url="templateUrl"
        export-name="导入模板"
      /> -->
      <el-button
        type="primary"
        icon="el-icon-folder-add"
        :disabled="false"
        @click="handleClick('matchLine')"
      >{{ $t("shippingOrder.matchLine") }}</el-button>
      <el-button
        type="success"
        icon="el-icon-folder-add"
        :disabled="false"
        @click="handleClick('preScheduling')"
      >{{ $t("shippingOrder.preScheduling") }}</el-button>

    </div>

    <div slot="tab-body" class="tab-body_auto">
      <!--  主页面的table表格  -->
      <zhqc-table
        :data.sync="resp"
        :field-list="tableInfo.fieldList"
        :handle="tableInfo.handle"
        @handleClick="handleClick"
        @handleEvent="handleEvent"
      >
        <template v-slot:bt-slotEvent="scope">
          <el-button size="mini" type="primary" :disabled="$hasPerm('view')" @click="openViewPage(scope.data.row)">{{ $t('table.view') }}</el-button>
          <el-button size="mini" type="success" :disabled="scope.data.row.status === 10" @click="openEditPage(scope.data.row)">{{ $t('table.edit') }}</el-button>
          <el-button size="mini" type="danger" :disabled="scope.data.row.status === 10" @click="nextData(scope.data.row)">下发</el-button>
          <el-button size="mini" type="danger" :disabled="scope.data.row.status === 10" @click="cancleData(scope.data.row)">取消</el-button>
        </template>
      </zhqc-table>
    </div>

    <div slot="bottom-page">
      <!--  分页组件   -->
      <zhqc-page
        :total="total"
        :page-request="pageRequest"
        :bt-list="batchBtnArray"
        @pageChange="pageChange"
        @handleClick="handleClick"
      />
    </div>
    <!--新增，编辑-->
    <full-pop
      :visible.sync="fullDialogInfo.visible"
      :top-title="fullDialogInfo.title"
      :close-btn="fullDialogInfo.closeBtn"
      :save-list="fullDialogInfo.btList"
      @handleClick="handleClick"
    >
      <template v-if="['add','edit'].includes(fullDialogInfo.type)">
        <full-pop-item full-pop-item-title="订单信息">
          <zhqc-link-form
            :ref-obj.sync="fullDiaFormInfo.ref"
            :data="fullDiaFormInfo.data"
            :field-list="fullDiaFormInfo.fieldList"
            :rules="fullDiaFormInfo.rules"
            :list-type-info="listTypeInfo"
            :form-type="formType"
            :class-name="viewFlag"
            :label-width="fullDiaFormInfo.labelWidth"
            @handleEvent="handleEvent"
          >
            <!--  货主名称 -->
            <template v-slot:form-ownerName>
              <remote-list
                :model="fullDiaFormInfo.data"
                select-key="ownerName"
                lable="ownerName"
                parame-code="ownerCode"
                :list-url="ownerUrl"
              >
                <template v-slot="scope">
                  <span style="float: left; color: #8492a6; font-size: 13px;">{{ scope.item.ownerName }}</span>
                </template>
              </remote-list>
            </template>

            <!-- 承运商名称 -->
            <template v-slot:form-carrierName>
              <list-carrierName
                :model="fullDiaFormInfo.data"
                select-key="carrierName"
                lable="carrierName"
                parame-code="carrierCode"
              />
            </template>
            <!-- 发货方 -->
            <template v-slot:form-senderName>
              <list-sender-or-receiver
                :model="fullDiaFormInfo.data"
                select-key="senderName"
                lable="senderName"
                parame-code="senderCode"
                :type="fullDiaFormInfo.data.businessType"
                @select="senderHandle"
                @clear="senderClear"
              />
            </template>

            <!-- 收货方 -->
            <template v-slot:form-receiverName>
              <list-sender-or-receiver
                :model="fullDiaFormInfo.data"
                select-key="receiverName"
                lable="receiverName"
                parame-code="receiverCode"
                :type="fullDiaFormInfo.data.businessType"
                @select="receiverHandle"
                @clear="receiverClear"
              />
            </template>

            <!-- 线路列表 -->
            <template v-slot:form-lineCode>
              <transport-line-match
                ref="lineMatch"
                :model="fullDiaFormInfo.data"
                select-key="lineCode"
                lable="lineRemark"
                parame-code="lineCode"
              />
            </template>

            <!-- 发货省份 -->
            <template v-slot:form-sendProvinceId="scope">
              <list-link
                :select-key="fullDiaFormInfo.data[scope.item.value]"
                :link-id="null"
                :list-url="ProviceUrl"
                :model="fullDiaFormInfo.data"
                :item="scope.item"
                :is-frist="true"
                placeholder="请选择省份"
              />
            </template>

            <!-- 发货城市 -->
            <template v-slot:form-sendCityId="scope">
              <list-link
                :select-key="fullDiaFormInfo.data[scope.item.value]"
                :link-id="fullDiaFormInfo.data[scope.item.linkId]"
                :list-url="CityUrl"
                :item="scope.item"
                :model="fullDiaFormInfo.data"
                placeholder="请选择城市"
              />
            </template>
            <!-- 发货区县 -->
            <template v-slot:form-sendAreaId="scope">
              <list-link
                :select-key="fullDiaFormInfo.data[scope.item.value]"
                :link-id="fullDiaFormInfo.data[scope.item.linkId]"
                :list-url="AreaUrl"
                :item="scope.item"
                :model="fullDiaFormInfo.data"
                placeholder="请选择区县"
              />
            </template>

            <!-- 收货省份 -->
            <template v-slot:form-receiveProvinceId="scope">
              <list-link
                :select-key="fullDiaFormInfo.data[scope.item.value]"
                :link-id="null"
                :list-url="ProviceUrl"
                :model="fullDiaFormInfo.data"
                :item="scope.item"
                :is-frist="true"
                placeholder="请选择省份"
                @select="receiveProvinceChange"
              />
            </template>

            <!-- 收货城市 -->
            <template v-slot:form-receiveCityId="scope">
              <list-link
                :select-key="fullDiaFormInfo.data[scope.item.value]"
                :link-id="fullDiaFormInfo.data[scope.item.linkId]"
                :list-url="CityUrl"
                :item="scope.item"
                :model="fullDiaFormInfo.data"
                placeholder="请选择城市"
                @select="receiveCityChange"
              />
            </template>
            <!-- 收货区县 -->
            <template v-slot:form-receiveAreaId="scope">
              <list-link
                :select-key="fullDiaFormInfo.data[scope.item.value]"
                :link-id="fullDiaFormInfo.data[scope.item.linkId]"
                :list-url="AreaUrl"
                :item="scope.item"
                :model="fullDiaFormInfo.data"
                placeholder="请选择区县"
                @select="receiveAreaChange"
              />
            </template>

          </zhqc-link-form>

        </full-pop-item>
        <full-pop-item full-pop-item-title="订单明细">
          <el-button

            type="primary"
            icon="el-icon-folder-add"
            :disabled="false"
            @click="handleClick('addItem')"
          >{{ $t("shippingOrder.addItem") }}</el-button>
          <div class="add_table_box">
            <zhqc-table
              :data.sync="popTableInfo.data"
              :field-list="popTableInfo.fieldList"
              :handle="popTableInfo.handle"
              @handleClick="handleClick"
            />
          </div>
        </full-pop-item>
        <!--添加商品内部弹窗-->
        <zhqc-dialog
          :title="dialogInfo.title"
          :visible.sync="dialogInfo.visible"
          :width="dialogInfo.width"
          :bt-list="dialogInfo.btList"
          @handleClick="handleClick"
        >
          <zhqc-form
            :ref-obj.sync="diaFormInfo.ref"
            :data="diaFormInfo.data"
            :field-list="diaFormInfo.fieldList"
            :rules="diaFormInfo.rules"
            :list-type-info="listTypeInfo"
            :label-width="diaFormInfo.labelWidth"
            @handleEvent="handleEvent"
          >

            <!--   -->
            <template v-slot:form-skuName>
              <list-order-sku ref="orderSku" @select="slectHandle" @clear="clearHandle" />
            </template>
          </zhqc-form>
        </zhqc-dialog>
      </template>
      <match-line v-if="fullDialogInfo.type === 'matchLine'" :list-type-info="listTypeInfo" />
      <pre-scheduling v-if="fullDialogInfo.type === 'preScheduling'" :list-type-info="listTypeInfo" />

    </full-pop>

    <!--审核，反审弹窗-->
    <zhqc-dialog
      :title="examineDialog.title"
      :visible.sync="examineDialog.visible"
      :width="examineDialog.width"
      :bt-list="examineDialog.btList"
      @handleClick="handleClick"
    >
      <zhqc-form
        :ref-obj.sync="examineDiaForm.ref"
        :data="examineDiaForm.data"
        :field-list="examineDiaForm.fieldList"
        :rules="examineDiaForm.rules"
        :list-type-info="listTypeInfo"
        :label-width="examineDiaForm.labelWidth"
      />
    </zhqc-dialog>

  </layout-body>
</template>

<script>
import { VUE_APP_TMS_MODEL } from '@/api/api.config.js'
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
import { message } from '@/utils/messageUtils.js'
import shippingOrderMixins from './mixins'
export default {
  name: 'ShippingOrder',
  components: {
    MatchLine: () => import('./components/matchLine.vue'),
    PreScheduling: () => import('./components/preScheduling.vue'),
    ListOrderSku: () => import('@/Subassembly/ZhqcList/ListOrderSku'),
    ListCarrierName: () => import('@/Subassembly/ZhqcList/ListCarrierNameSc'),
    TransportLineMatch: () => import('@/Subassembly/ZhqcList/TransportLineMatch'),
    ListLink: () => import('@/Subassembly/ZhqcList/ListLink'),
    ListSenderOrReceiver: () => import('@/Subassembly/ZhqcList/ListSenderOrReceiver')
  },
  mixins: [shippingOrderMixins],
  data() {
    return {
      store: 'shippingOrder/',
      modName: 'shippingOrder',
      collapsable: false, // 展开收缩
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      formType: null,
      viewFlag: null,
      // 货主
      ownerUrl: VUE_APP_WMS_MODEL + '/base/partner/owner/queryOwnerCbList',
      // 承运商
      carrierUrl: VUE_APP_TMS_MODEL + '/carrier/carrier/selectCarrierInfo',
      // 省份
      ProviceUrl: VUE_APP_WMS_MODEL + '/base/address/province/queryProvinceList',
      // 城市
      CityUrl: VUE_APP_WMS_MODEL + '/base/address/city/queryCityList/',
      // 区县
      AreaUrl: VUE_APP_WMS_MODEL + '/base/address/area/queryAreaList/',
      // 收获方 发货方 查询全部
      SRUrl: VUE_APP_WMS_MODEL + '/base/search/customerList',
      tableSelectList: [],
      compObj: null,
      url: ''
    }
  },
  computed: {
    resp() {
      const data = this.$store.state[this.modName].pageResp
      if (data && data.length > 0) {
        data.forEach(item => {
          item.skuCount = this.tw(item.skuCount)
          item.numCount = this.tw(item.numCount)
        })
      }
      return data
    },
    total() {
      return this.$store.state[this.modName].total
    },
    batchBtnArray() {
      return [
        { label: '批量下发', type: 'success', icon: '', event: 'batchDistribution', btLoading: false, show: true, disabled: this.tableSelectList.length === 0 },
        { label: '审核', type: 'danger', icon: '', event: 'examine', btLoading: false, show: true, disabled: this.tableSelectList.length === 0 },
        { label: '反审', type: 'danger', icon: '', event: 'counterTrial', btLoading: false, show: true, disabled: this.tableSelectList.length === 0 }
      ]
    }
  },
  watch: {
    // 展开收缩
    collapsable(val) {
      if (val) {
        this.collapsableFormMore()
      } else {
        this.collapsableForm()
      }
    }
  },
  methods: {
    sw(value) {
      const num = Math.round(value * 1000) / 1000
      return num && num.toFixed(3)
    },
    tw(value) {
      const num = Math.round(value * 100) / 100
      return num && num.toFixed(2)
    },
    NumberChange(val) {
      if (this.compObj === null) {
        message.error('请先选择商品')
      } else {
        this.diaFormInfo.data.numInt = parseInt(val)
        this.diaFormInfo.data.numEa = Math.ceil(Math.round(((val - this.diaFormInfo.data.numInt) * this.compObj.unitNum)))
        this.diaFormInfo.data.volume = (val * this.compObj.volume).toFixed(3)
        this.diaFormInfo.data.weight = (val * this.compObj.weight).toFixed(3)
      }
    },

    slectHandle(value, obj) {
      this.compObj = obj
      this.diaFormInfo.data.price = obj.price
      this.diaFormInfo.data.unitNum = obj.unitNum
      this.diaFormInfo.data.skuName = obj.skuName
      this.diaFormInfo.data.skuCode = obj.skuCode
      this.diaFormInfo.data.unit = obj.recUnit
      this.diaFormInfo.data.spec = obj.spec
      this.NumberChange(this.diaFormInfo.data.num)
    },
    clearHandle() {
      this.compObj = null
      this.diaFormInfo.data.num = 0
      this.diaFormInfo.data.numInt = 0
      this.diaFormInfo.data.numEa = 0
      this.diaFormInfo.data.volume = 0
      this.diaFormInfo.data.weight = 0
    },
    senderHandle(value, obj) {
      this.fullDiaFormInfo.data.sendProvinceId = obj.provinceId
      this.fullDiaFormInfo.data.sendProvinceName = obj.provinceName
      this.$nextTick(() => {
        this.fullDiaFormInfo.data.sendCityId = obj.cityId
        this.fullDiaFormInfo.data.sendCityName = obj.cityName
        this.$nextTick(() => {
          this.fullDiaFormInfo.data.sendAreaId = obj.areaId
          this.fullDiaFormInfo.data.sendAreaName = obj.areaName
        })
      })
      this.fullDiaFormInfo.data.sendLocation = obj.contactAddr
      this.fullDiaFormInfo.data.sendContactor = obj.contactName
      this.fullDiaFormInfo.data.senderPhone = obj.contactTel
      this.fullDiaFormInfo.data.lineCode = null
      this.fullDiaFormInfo.data.lineRemark = null
      this.$refs.lineMatch.clear()
    },
    senderClear() {
      this.fullDiaFormInfo.data.sendProvinceId = null
      this.fullDiaFormInfo.data.sendProvinceName = null
      this.$nextTick(() => {
        this.fullDiaFormInfo.data.sendCityId = null
        this.fullDiaFormInfo.data.sendCityName = null
        this.$nextTick(() => {
          this.fullDiaFormInfo.data.sendAreaId = null
          this.fullDiaFormInfo.data.sendAreaName = null
        })
      })
    },
    receiverHandle(value, obj) {
      this.fullDiaFormInfo.data.receiveProvinceId = obj.provinceId
      this.fullDiaFormInfo.data.receiveProvinceName = obj.provinceName
      this.$nextTick(() => {
        this.fullDiaFormInfo.data.receiveCityId = obj.cityId
        this.fullDiaFormInfo.data.receiveCityName = obj.cityName
        this.$nextTick(() => {
          this.fullDiaFormInfo.data.receiveAreaId = obj.areaId
          this.fullDiaFormInfo.data.receiveAreaName = obj.areaName
        })
      })
      this.fullDiaFormInfo.data.receiveLocation = obj.contactAddr
      this.fullDiaFormInfo.data.receiveContactor = obj.contactName
      this.fullDiaFormInfo.data.receiverPhone = obj.contactTel
      this.fullDiaFormInfo.data.lineCode = null
      this.fullDiaFormInfo.data.lineRemark = null
      this.$refs.lineMatch.clear()
    },
    receiverClear() {
      this.fullDiaFormInfo.data.receiveProvinceId = null
      this.fullDiaFormInfo.data.receiveProvinceName = null
      this.$nextTick(() => {
        this.fullDiaFormInfo.data.receiveCityId = null
        this.fullDiaFormInfo.data.receiveCityName = null
        this.$nextTick(() => {
          this.fullDiaFormInfo.data.receiveAreaId = null
          this.fullDiaFormInfo.data.receiveAreaName = null
        })
      })
    },
    businessTypeChange() {
      this.fullDiaFormInfo.data.senderName = null
      this.fullDiaFormInfo.data.senderCode = null
      this.fullDiaFormInfo.data.receiverCode = null
      this.fullDiaFormInfo.data.receiverName = null
    },
    receiveProvinceChange() {
      if (this.fullDiaFormInfo.data.lineCode !== null || this.fullDiaFormInfo.data.lineCode !== '') {
        this.fullDiaFormInfo.data.lineCode = null
        this.fullDiaFormInfo.data.lineRemark = null
        this.$refs.lineMatch.clear()
      }
    },
    receiveCityChange() {
      if (this.fullDiaFormInfo.data.lineCode !== null || this.fullDiaFormInfo.data.lineCode !== '') {
        this.fullDiaFormInfo.data.lineCode = null
        this.fullDiaFormInfo.data.lineRemark = null
        this.$refs.lineMatch.clear()
      }
    },
    receiveAreaChange() {
      if (this.fullDiaFormInfo.data.lineCode !== null || this.fullDiaFormInfo.data.lineCode !== '') {
        this.fullDiaFormInfo.data.lineCode = null
        this.fullDiaFormInfo.data.lineRemark = null
        this.$refs.lineMatch.clear()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs-box{
  // height: 400px;
  margin-bottom: 20px;
}

.add_table_box{
  height: 240px;
}

</style>

