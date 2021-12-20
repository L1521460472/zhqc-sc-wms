<template>
  <layout-body>
    <div slot="top-form">
      <!-- 主页面top表单 -->
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
        <!-- 收货方 -->
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
        <!-- 承运商名称 -->
        <template v-slot:form-carrierCode="">
          <list-carrierName
            :model="topForm.data"
            select-key="carrierName"
            lable="carrierName"
            parame-code="carrierCode"
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
          <div class="collapsable-item" @click="handleClick('openCollapsable')">
            {{ collapsable ? "收起" : "展开" }}
            <i :class="collapsable ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" />
          </div>
        </template>
        <!-- 展开收起表单结束 -->
      </zhqc-top-form>
    </div>
    <div slot="left-btn">
      <export-vue
        template-name="receiptOrderService"
        :export-url="exportUrl"
        export-name="运输回单信息"
        @exportParam="exportData"
      />
    </div>

    <div slot="tab-body" class="tab-body_auto">
      <!-- 主页面的table表格 -->
      <zhqc-table
        :data.sync="resp"
        :field-list="tableInfo.fieldList"
        :handle="null"
        @handleClick="handleClick"
      >
        <template v-slot:col-status="{ row }">
          <el-button type="primary" @click="openViewPage(row)">{{ $t("table.view") }}</el-button>
          <el-button type="success" :disabled="row.receiptStatus !== 0" @click="openSignPage(row)">{{ $t("transportationReceipt.sign") }}</el-button>
        </template>
      </zhqc-table>
    </div>
    <div slot="bottom-page">
      <!-- 分页组件 -->
      <zhqc-page
        :total="total"
        :page-request="pageRequest"
        @pageChange="pageChange"
      />
    </div>
    <!-- 新增，编辑 -->
    <full-pop
      :visible.sync="fullDialogInfo.visible"
      :top-title="fullDialogInfo.title"
      :close-btn="fullDialogInfo.closeBtn"
      :save-list="fullDialogInfo.btList"
      @handleClick="handleClick"
    >
      <template v-if="['add','sign'].includes(fullDialogInfo.type)">
        <full-pop-item full-pop-item-title="回单信息">
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
        <full-pop-item full-pop-item-title="签收明细">
          <vex-dia-table
            :ref-obj.sync="fullDiaFormInfo.dtTableInfo.ref"
            :data="fullDiaFormInfo.dtTableInfo.data"
            :field-list="fullDiaFormInfo.dtTableInfo.fieldList"
            :handle="fullDiaFormInfo.dtTableInfo.handle"
            :top-btn="fullDiaFormInfo.dtTableInfo.topBtn"
            :rules="fullDiaFormInfo.dtTableInfo.rules"
            :footer-method="footerMethod"
            :config="fullDiaFormInfo.config"
            @handleClick="handleClick"
          />
        </full-pop-item>
      </template>
    </full-pop>
  </layout-body>
</template>

<script>
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
import { VUE_APP_TMS_MODEL } from '@/api/api.config.js'
import transportationReceiptMixins from './mixins'
export default {
  name: 'TransportationReceipt',
  components: {
    ListCarrierName: () => import('@/Subassembly/ZhqcList/ListCarrierNameSc'),
    ListSenderOrReceiver: () => import('@/Subassembly/ZhqcList/ListSenderOrReceiver')
  },
  mixins: [transportationReceiptMixins],
  data() {
    return {
      store: 'transportationReceipt/',
      modName: 'transportationReceipt',
      collapsable: false, // 展开收缩
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      ownerUrl: VUE_APP_WMS_MODEL + '/base/partner/owner/queryOwnerCbList',
      inOrderUrl: '/base/wh/wh/queryShipperCbList',
      exportUrl: VUE_APP_TMS_MODEL + '/transport/receiptOrder/export',
      // 收获方 发货方 查询全部
      SRUrl: VUE_APP_WMS_MODEL + '/base/search/customerList'

    }
  },
  computed: {
    resp() {
      return this.$store.state[this.modName].pageResp
    },
    total() {
      return this.$store.state[this.modName].total
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
    },
    'fullDiaFormInfo.data.receiptStatus'(value) {
      if (this.fullDialogInfo.type === 'sign') {
        this.signStaus(value)
      }
    }
  },

  methods: {
    selectSender(value, data) {
      this.topForm.data.senderCode = data.whCode
    },
    selectReceiver(value, data) {
      this.topForm.data.receiverCode = data.whCode
    },
    selectCarrier(value, data) {
      this.topForm.data.carrierCode = data.carrierCode
    },
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
    }
  }
}
</script>
