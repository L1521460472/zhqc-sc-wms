<template>
  <div class="wrap_out">
    <div v-if="!isTransport" class="wrap_top">
      <title-box :fold="fold" :item-title="$t('transportationScheduling.toBeScheduled')">
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
        >
          <!--发货仓库 -->
          <template v-slot:form-consigneeId>
            <remote-list
              :model="topForm.data"
              select-key="consigneeId"
              lable="whName"
              parame-code="keyWord"
              :list-url="consigneeUrl"
            >
              <template v-slot="scope">
                <span style="float: left; color: #8492a6; font-size: 13px;">{{ scope.item.whName }}</span>
              </template>
            </remote-list>
          </template>
          <!--  货主名称 -->
          <template v-slot:form-ownerCode>
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
          <template v-slot:form-carrierCode="">
            <list-carrierName
              :model="topForm.data"
              select-key="carrierName"
              lable="carrierName"
              parame-code="carrierCode"
            />
          </template>
          <!-- 发货方 -->
          <template v-slot:form-senderCode="">
            <list-sender-or-receiver
              :model="topForm.data"
              select-key="senderName"
              lable="senderName"
              parame-code="senderCode"
              :list-url="SRUrl"
              :param-type="true"
            />
          </template>
          <!--收货方 -->
          <template v-slot:form-receiverCode="">
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
          </template>
        <!-- 展开收起表单结束 -->
        </zhqc-top-form-sc>
      </title-box>
      <div class="wrap_top_table">
        <vex-table-fh
          :data="resp"
          :ref-obj.sync="tableInfo.ref"
          :field-list="tableInfo.fieldList"
          :handle="null"
          :rules="tableInfo.rules"
          :top-btn="tableInfo.topBtn"
          @handleClick="handleClick"
          @handleEvent="handleEvent"
        />
      </div>
      <div class="wrap_top_totel">
        {{ $t('transportationScheduling.totalInfo', [respInfo.orderNum || 0, respInfo.totalNumCount || 0, respInfo.totalWeight || 0, respInfo.totalVolume || 0]) }}
      </div>
      <div class="wrap_top_bottom">
        <!--  分页组件   -->
        <zhqc-page
          :total="total"
          :page-request="pageRequest"
          :bt-list="batchBtnArray"
          @pageChange="pageChange"
          @handleClick="handleClick"
        />
      </div>
    </div>
    <div v-if="!isTransport" class="wrap_bottom">
      <div class="scheduling_list">
        <div class="wrap_bottom_table">
          <vex-table-fh
            :ref-obj.sync="vueTableInfo.ref"
            :data="resp2Data"
            :field-list="vueTableInfo.fieldList"
            :handle="vueTableInfo.handle"
            :rules="vueTableInfo.rules"
            :top-btn="vueTableInfo.topBtn"
            @handleClick="handleClick"
          >
            <template v-slot:col-dispatchNum="{ row }">
              <vxe-input
                v-model="row.dispatchNum"
                type="number"
                :min="0"
                :step="0.1"
                @focus="inputFocus(row)"
                @change="inputChange(row)"
                @blur="inputBlur(row)"
                @prev-number="numberRowClick(row)"
                @next-number="numberRowClick(row)"
              />
            </template>
          </vex-table-fh>
        </div>
        <div class="wrap_bottom_totel">
          {{ $t('transportationScheduling.totalInfo2', [totalInfo2.orderNum, totalInfo2.totalNumCount, totalInfo2.totalWeight, totalInfo2.totalVolume]) }}
        </div>
        <div class="wrap_bottom_bottom">
          <!--  分页组件   -->
          <zhqc-page
            :total="total2"
            :page-request="pageRequest2"
            :bt-list="batchBtnArray2"
            @pageChange="pageChange2"
            @handleClick="handleClick"
          />
        </div>
      </div>
    </div>
    <div v-else class="transport_means">
      <div class="wrap_bottom_table">
        <vex-table-fh
          :ref-obj.sync="vueTableInfo2.ref"
          :data="vueTableInfo2.data"
          :field-list="vueTableInfo2.fieldList"
          :handle="vueTableInfo2.handle"
          :rules="vueTableInfo2.rules"
          :top-btn="vueTableInfo2.topBtn"
          @handleClick="handleClick"
          @handleEvent="handleEvent"
        />
      </div>
      <div class="wrap_bottom_totel">
        {{ $t('transportationScheduling.totalInfo2', [totalInfo2.orderNum, totalInfo2.totalNumCount, totalInfo2.totalWeight, totalInfo2.totalVolume]) }}
      </div>
      <div slot="left-btn" style="margin-top: 12px;">
        <el-button-group>
          <template v-for="(item, index) in batchBtnArray3">
            <el-button
              v-show="item.show"
              :key="index"
              :icon="item.icon"
              :type="item.type"
              :disabled="item.disabled"
              :loading="item.btLoading"
              @click="handleClick(item.event)"
            >
              {{ item.label }}
            </el-button>
          </template>
        </el-button-group>
      </div>
    </div>
    <!--増、查、改的表单-->
    <zhqc-dialog
      :title="dialogInfo.title"
      :visible.sync="dialogInfo.visible"
      :width="dialogInfo.width"
      :bt-list="dialogInfo.btList"
      @handleClick="handleClick"
    >
      <zhqc-form
        :ref-obj.sync="diaFormInfo.ref"
        :form-type="formType"
        :class-name="viewFlag"
        :data="diaFormInfo.data"
        :field-list="diaFormInfo.fieldList"
        :rules="diaFormInfo.rules"
        :list-type-info="listTypeInfo"
        :label-width="diaFormInfo.labelWidth"
      />
    </zhqc-dialog>
  </div>
</template>

<script>
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
import Mixins from './mixins'
export default {
  name: 'TransportationScheduling',
  components: {
    ListCarrierName: () => import('@/Subassembly/ZhqcList/ListCarrierNameSc'),
    ListSenderOrReceiver: () => import('@/Subassembly/ZhqcList/ListSenderOrReceiver')
  },
  mixins: [Mixins],
  data() {
    return {
      store: 'transportationScheduling/',
      modName: 'transportationScheduling',
      fold: false,
      isTransport: false,
      formType: '',
      viewFlag: '',
      selections: [],
      radioData: null,
      radioIndex: 0,
      inOrderUrl: '/base/wh/wh/queryShipperCbList',
      ownerUrl: VUE_APP_WMS_MODEL + '/base/partner/owner/queryOwnerCbList',
      // 收获方 发货方 查询全部
      SRUrl: VUE_APP_WMS_MODEL + '/base/search/customerList',
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      pageRequest2: { limit: this.$globalLimit, page: this.$globalPage },
      batchBtnArray: [
        { label: this.$t('transportationScheduling.addScheduled'), type: 'success', icon: '', event: 'addDispatch', btLoading: false, show: true, disabled: false }
      ],
      batchBtnArray2: [
        { label: this.$t('transportationScheduling.cancelScheduled'), type: 'danger', icon: '', event: 'cancelDispatch', btLoading: false, show: true, disabled: false },
        { label: this.$t('transportationScheduling.addStowage'), type: 'primary', icon: '', event: 'addStowage', btLoading: false, show: true, disabled: false },
        { label: this.$t('transportationScheduling.addTransport'), type: 'success', icon: '', event: 'addTransport', btLoading: false, show: true, disabled: false }
      ],
      batchBtnArray3: [
        { label: this.$t('transportationScheduling.cancelScheduled'), type: 'danger', icon: '', event: 'cancelDispatch', btLoading: false, show: true, disabled: false },
        { label: this.$t('transportationScheduling.addTransit'), type: 'success', icon: '', event: 'addTransit', btLoading: false, show: true, disabled: true },
        { label: this.$t('transportationScheduling.preStep'), type: 'success', icon: '', event: 'preStep', btLoading: false, show: true, disabled: false },
        { label: this.$t('table.save'), type: 'primary', icon: '', event: 'saveAssignment', btLoading: false, show: true, disabled: false }
      ],
      resp2Data: [],
      totalInfo2: {
        orderNum: 0,
        totalNumCount: 0,
        totalWeight: 0,
        totalVolume: 0
      }
    }
  },
  computed: {
    resp() { return this.$store.state[this.modName].resp },
    total() { return this.$store.state[this.modName].total },
    respInfo() { return this.$store.state[this.modName].respInfo },
    resp2() {
      const list = this.$store.state[this.modName].resp2.map(item => {
        item.dispatchNumBackup = item.dispatchNum
        item.weightBackup = item.weight
        item.volumeBackup = item.volume
        return item
      })
      return list
    },
    respInfo2() { return this.$store.state[this.modName].respInfo2 },
    total2() {
      this.batchBtnArray2.forEach(item => {
        this.$set(item, 'disabled', !this.$store.state[this.modName].total2)
      })
      this.batchBtnArray3.forEach(item => {
        if (item.event === 'cancelDispatch') {
          this.$set(item, 'disabled', !this.$store.state[this.modName].total2)
        }
      })
      return this.$store.state[this.modName].total2
    },
    tempAssignmentNo() { return this.$store.state[this.modName].tempAssignmentNo }
  },
  watch: {
    selections: {
      handler(val) {
        this.batchBtnArray[0].disabled = !val.length
      },
      immediate: true
    },
    radioData: {
      handler(val) {
        this.batchBtnArray3[1].disabled = !val
      },
      immediate: true
    },
    resp2: {
      handler(val) {
        this.resp2Data = JSON.parse(JSON.stringify(val))
      },
      immediate: true,
      deep: true
    },
    respInfo2: {
      handler(val) {
        for (const key in this.totalInfo2) {
          this.totalInfo2[key] = val[key]
        }
      },
      immediate: true
    },
    'diaFormInfo.data.intrmProvinceId'(val) {
      this.diaFormInfo.data.intrmCityId = ''
      this.diaFormInfo.data.intrmAreaId = ''
      this.listTypeInfo.cityList = []
      this.listTypeInfo.areaList = []
      if (val) {
        this.getCityList(val)
      }
    },
    'diaFormInfo.data.intrmCityId'(val) {
      this.diaFormInfo.data.intrmAreaId = ''
      this.listTypeInfo.areaList = []
      if (val) {
        this.getAreaList(val)
      }
    }
  },
  methods: {
    inputFocus(row) {
      row.dispatchNumBackup = row.dispatchNum
      row.weightBackup = row.weight
      row.volumeBackup = row.volume
    },
    inputChange(row) {
      row.dispatchNum = row.dispatchNum.replace(/[^\d^\.]/g, '')
      if (row.dispatchNum > row.canDispatchNum) {
        row.dispatchNum = row.canDispatchNum
      } else {
        const integer = row.dispatchNum.split('.')[0]
        const decimal = row.dispatchNum.split('.')[1]
        if (decimal && decimal.length > 2) {
          row.dispatchNum = `${integer}.${decimal.slice(0, 2)}`
        }
      }
    },
    inputBlur(row) {
      !row.dispatchNum && (row.dispatchNum = '0')
      this.getSkuInfo(row)
    },
    numberRowClick(row) {
      if (row.dispatchNum > row.canDispatchNum) {
        row.dispatchNum = row.canDispatchNum
      }
      this.getSkuInfo(row)
    },
    selectCarrier(value, data) {
      this.topForm.data.carrierCode = data.carrierCode
    },
    selectSender(value, data) {
      this.topForm.data.senderCode = data.whCode
    },
    selectReceiver(value, data) {
      this.topForm.data.receiverCode = data.whCode
    },
    selectionChange(data) {
      this.selections = data.selection
    },
    selectAll(data) {
      this.selections = data.selection
    },
    radioChange(data) {
      this.radioData = data
      this.radioIndex = this.vueTableInfo2.data.findIndex(item => item.startName === data.startName && item.endName === data.endName)
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
.wrap_out{
  width: 100%;
  height: 100%;

  .wrap_top{
    width: 100%;
    height: 50%;

    .wrap_top_table{
      width: 100%;
      height:calc(100% - 116px);
    }
    .wrap_top_totel{
      color: red;
    }
  }

  .wrap_bottom{
    width: 100%;
    height: 50%;

    .scheduling_list{
      width: 100%;
      height: 100%;
      .wrap_bottom_table{
        width: 100%;
        height:calc(100% - 80px);
      }
    }
  }
  .wrap_bottom_totel {
    color: red;
  }
  .transport_means{
    width: 100%;
    height: 100%;
    .wrap_bottom_table{
      width: 100%;
      height:calc(100% - 81px);
    }
  }
}
</style>

<style lang="scss">
.el-form-item__label {
  &[for="trainNumber"],
  &[for="estimateSendTime"],
  &[for="estimateReceiveTime"] {
    line-height: 16px;
  }
}
</style>
