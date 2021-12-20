<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
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
        <!-- 货主 -->
        <template v-slot:form-ownerId="scope">
          <remote-list
            :model="topForm.data"
            select-key="ownerId"
            lable="ownerName"
            parame-code="ownerCode"
            :list-url="ownerUrl"
          >
            <template v-slot="s">
              <span style="float: left; color: #8492a6; font-size: 13px;">{{ s.item.ownerName }}</span>
            </template>
          </remote-list>
        </template>
        <!-- 产品编码 -->
        <template v-slot:form-skuCode="scope">
          <remote-list
            :model="topForm.data"
            select-key="skuCode"
            lable="skuCode"
            parame-code="queryText"
            :list-url="skuCodeUrl"
          >
            <template v-slot="s">
              <span style="float: left; color: #8492a6; font-size: 13px">{{ s.item.skuCode }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px;margin-left:30px;">{{ scope.item.skuName }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px;margin-left:30px;">{{ scope.item.ownerName }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px;margin-left:30px;">{{ scope.item.supplierName }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px;margin-left:30px;">{{ scope.item.spec }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px;margin-left:30px;">{{ scope.item.drugForm }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px;margin-left:30px;">{{ scope.item.drugFormSpec }}</span>
            </template>
          </remote-list>
        </template>
        <template v-slot:form-storeId="scope">
          <list-store :select-key="topForm.data.storeId" @select="selectStore" />
        </template>
        <template v-slot:form-partnerId="scope">
          <list-partner :select-key="topForm.data.partnerId" :partner-type="carrierCode" @select="selectCarrier" />
        </template>
        <!--客户-->
        <template v-slot:form-customerId="scope">
          <remote-list
            :model="topForm.data"
            select-key="customerId"
            lable="customerName"
            parame-code="customerCode"
            :list-url="customerUrl"
          >
            <template v-slot="s">
              <span style="float: left; color: #8492a6; font-size: 13px;">{{ s.item.customerName }}</span>
            </template>
          </remote-list>
        </template>
        <!-- 展开收起表单 -->
        <template v-slot:form-sys="scope" class="el-icon-test">
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
      <export-vue
        template-name="outOrderReportService"
        :export-url="exportUrl"
        export-name="出库订单报表"
        @exportParam="exportData"
      />
    </div>

    <div slot="tab-body" class="tab-body_auto">
      <!--  主页面的table表格  -->
      <zhqc-table
        :data.sync="resp"
        :field-list="tableInfo.fieldList"
        :handle="tableInfo.handle"
        @handleClick="handleClick"
      />
    </div>

    <div slot="bottom-page">
      <!--  分页组件   -->
      <zhqc-page
        :total="total"
        :page-request="pageRequest"
        @pageChange="pageChange"
      />
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
        :data="diaFormInfo.data"
        :field-list="diaFormInfo.fieldList"
        :rules="diaFormInfo.rules"
        :list-type-info="listTypeInfo"
        :label-width="diaFormInfo.labelWidth"
      />
    </zhqc-dialog>
  </layout-body>
</template>

<script>
import { VUE_APP_OMS_MODEL } from '@/api/api.config.js'
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
import outOrderReportMixins from './mixins'
export default {
  name: 'OutOrderReport',
  mixins: [outOrderReportMixins],
  data() {
    return {
      store: 'outOrderReport/',
      modName: 'outOrderReport',
      collapsable: false, // 展开收缩
      ownerUrl: VUE_APP_WMS_MODEL + '/base/partner/owner/queryOwnerCbList',
      customerUrl: VUE_APP_WMS_MODEL + '/base/partner/customer/queryCustomerCbList',
      skuCodeUrl: VUE_APP_WMS_MODEL + '/base/sku/sku/querySkuCodeCbList',
      exportUrl: VUE_APP_OMS_MODEL + '/rpt/order/outOrderReport/export',
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      dialogInfo: {
        title: '',
        visible: false,
        type: '',
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', btLoading: false, show: true }]
      },
      carrierCode: null
    }
  },
  computed: {
    resp() { return this.$store.state[this.modName].pageResp },
    total() { return this.$store.state[this.modName].total }
  },
  watch: {
    // 监听弹窗的状态 清除校验与初始化字段
    'dialogInfo.visible'(val) {
      const diaFormInfo = this.diaFormInfo
      if (!val) {
        if (diaFormInfo.ref) {
          diaFormInfo.ref.resetFields()
        }
        this.resetFormData()
      }
    },
    // 展开收缩
    collapsable(val) {
      //
      if (val) {
        this.collapsableFormMore()
      } else {
        this.collapsableForm()
      }
    }
  },
  mounted() {

  },
  methods: {
    selectOwner(data, obj) {
      this.topForm.data.ownerId = obj.id
    },
    selectSupplier(data, obj) {
      this.topForm.data.rowSupplierId = obj.id
    },
    selectSkuCode(data, obj) {
      this.topForm.data.skuCode = obj.skuCode
    },
    selectStore(data, obj) {
      this.topForm.data.storeId = obj.id
    },
    selectCarrier(data) {
      this.topForm.data.partnerId = data
    },
    selectCustomer(data, obj) {
      this.topForm.data.customerId = obj.id
    }
  }
}
</script>
