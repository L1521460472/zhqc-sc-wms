<!--
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-02 15:33:29
-->
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
        <!--<template v-slot:form-ownerId="scope">-->
        <!--<zhqc-list-owner @select="selectOwner" :selectKey="topForm.data.ownerId" ></zhqc-list-owner>-->
        <!--</template>-->
        <!-- 货主 -->
        <template v-slot:form-ownerId="scope">
          <remote-list
            :model="topForm.data"
            select-key="ownerId"
            lable="ownerName"
            parame-code="ownerCode"
            :list-url="ownerUrl"
          >
            <template v-slot="scop">
              <span style="float: left; color: #8492a6; font-size: 13px;">{{ scop.item.ownerName }}</span>
            </template>
          </remote-list>
        </template>
        <!--供应商 -->
        <!--<template v-slot:form-supplierId="scope">-->
        <!--<zhqc-list-supplier @select="selectSupplier" :selectKey="topForm.data.supplierId" ></zhqc-list-supplier>-->
        <!--</template>-->
        <!--供应商-->
        <template v-slot:form-supplierId="scope">
          <remote-list
            :model="topForm.data"
            select-key="supplierId"
            lable="supplierName"
            parame-code="queryText"
            :list-url="supplierUrl"
          >
            <template v-slot="scop">
              <span style="float: left; color: #8492a6; font-size: 13px;">{{ scop.item.supplierName }}</span>
            </template>
          </remote-list>
        </template>
        <!-- 承运商 -->
        <!--<template v-slot:form-partnerId="scope">-->
        <!--<zhqc-list-partner @select="selectPartner" :selectKey="topForm.data.partnerId" :partnerType="carrierCode" ></zhqc-list-partner>-->
        <!--</template>-->
        <!-- 承运商 -->
        <template v-slot:form-partnerId="scope">
          <remote-list
            :model="topForm.data"
            select-key="partnerId"
            lable="fullName"
            :partner-type="carrierCode"
            parame-code="partnerCode"
            :list-url="partnerUrl"
          >
            <template v-slot="scop">
              <span style="float: left; color: #8492a6; font-size: 13px;">{{ scop.item.fullName }}</span>
            </template>
          </remote-list>
        </template>
        <!-- 月台 -->
        <!--<template v-slot:form-platformId="scope">-->
        <!--<zhqc-list-platform @select="selectPlatform" :selectKey="topForm.data.platformId" :platformType="platformCode" ></zhqc-list-platform>-->
        <!--</template>-->
        <!-- 月台 -->
        <template v-slot:form-platformId="scope">
          <remote-list
            :model="topForm.data"
            select-key="platformId"
            lable="platformName"
            :platform-type="platformCode"
            parame-code="queryText"
            :list-url="platformUrl"
          >
            <template v-slot="scop">
              <span style="float: left; color: #8492a6; font-size: 13px;">{{ scop.item.platformName }}</span>
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
      <el-button-group>
        <el-button type="primary" icon="el-icon-folder-add" :disabled="$hasPerm('add')" @click="handleClick('openAddPage')">{{ $t('table.add') }}</el-button>
      </el-button-group>
      <export-vue
        template-name="arriveAppointmentService"
        export-url="ib/arriveAppointment/export"
        export-name="到货预约"
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
        :form-type="formType"
        :class-name="viewFlag"
        :data="diaFormInfo.data"
        :field-list="diaFormInfo.fieldList"
        :rules="diaFormInfo.rules"
        :list-type-info="listTypeInfo"
        :label-width="diaFormInfo.labelWidth"
      >
        <template v-slot:form-ownerId="scope">
          <zhqc-list-owner :select-key="diaFormInfo.data.ownerId" :disabled="dialogInfo.type=='view'" @select="selectOwnerDia" />
        </template>
        <template v-slot:form-supplierId="scope">
          <zhqc-list-supplier :select-key="diaFormInfo.data.supplierId" :disabled="dialogInfo.type=='view'" @select="selectSupplierDia" />
        </template>
        <!--客户-->
        <template v-slot:form-customerId="scope">
          <list-customer :select-key="diaFormInfo.data.customerId" :disabled="dialogInfo.type=='view'" @select="selectCustomerDia" />
        </template>
        <!--收货仓 -->
        <template v-slot:form-whAreaId="scope">
          <remote-list-two
            ref="consignee"
            :model="diaFormInfo.data"
            :item="scope.item"
            :list-url="consigneeUrl"
          />
        </template>
        <template v-slot:form-partnerId="scope">
          <zhqc-list-partner :select-key="diaFormInfo.data.partnerId" :partner-type="carrierCode" :disabled="dialogInfo.type=='view'" @select="selectPartnerDia" />
        </template>
        <template v-slot:form-platformId="scope">
          <zhqc-list-platform :select-key="diaFormInfo.data.platformId" :platform-type="platformCode" :disabled="dialogInfo.type=='view'" @select="selectPlatformDia" />
        </template>
      </zhqc-form>
    </zhqc-dialog>
  </layout-body>
</template>

<script>
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
import arriveAppointmentMixins from './mixins'
import zhqcListOwner from '@/Subassembly/ZhqcList/ListOwner'
import zhqcListSupplier from '@/Subassembly/ZhqcList/ListSupplier'
import zhqcListPartner from '@/Subassembly/ZhqcList/ListPartner'
import zhqcListPlatform from '@/Subassembly/ZhqcList/ListPlatform'
import listCustomer from '@/Subassembly/ZhqcList/ListCustomer'
export default {
  name: 'ArriveAppointment',
  components: {
    zhqcListOwner, zhqcListSupplier, zhqcListPartner, zhqcListPlatform, listCustomer
  },
  mixins: [arriveAppointmentMixins],
  data() {
    return {
      store: 'arriveAppointment/',
      modName: 'arriveAppointment',
      collapsable: false, // 展开收缩
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      formType: null,
      viewFlag: null,
      platformUrl: VUE_APP_WMS_MODEL + '/base/tm/platform/queryPlatformCbList',
      partnerUrl: VUE_APP_WMS_MODEL + '/base/partner/factory/queryFactoryDropDownList',
      supplierUrl: VUE_APP_WMS_MODEL + '/base/partner/supplier/querySupplierCbList',
      ownerUrl: VUE_APP_WMS_MODEL + '/base/partner/owner/queryOwnerCbList',
      consigneeUrl: VUE_APP_WMS_MODEL + '/base/wh/whArea/queryVirtualwhList',
      dialogInfo: {
        title: '',
        visible: false,
        width: '200mm',
        type: '',
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', btLoading: false, show: true }]
      },
      carrierCode: null,
      platformCode: null
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
    selectOwner(data) {
      this.topForm.data.ownerId = data
    },
    selectSupplier(data) {
      this.topForm.data.supplierId = data
    },
    selectPartner(data) {
      this.topForm.data.partnerId = data
    },
    selectOwnerDia(data) {
      this.diaFormInfo.data.ownerId = data
    },
    selectSupplierDia(data) {
      this.diaFormInfo.data.supplierId = data
    },
    selectPartnerDia(data) {
      this.diaFormInfo.data.partnerId = data
    },
    selectPlatform(data) {
      this.topForm.data.platformId = data
    },
    selectPlatformDia(data) {
      this.diaFormInfo.data.platformId = data
    },
    selectCustomerDia(data, obj) {
      this.$set(this.diaFormInfo.data, 'customerId', data)
      this.diaFormInfo.data.customerName = obj.customerName
    }
  }
}
</script>
