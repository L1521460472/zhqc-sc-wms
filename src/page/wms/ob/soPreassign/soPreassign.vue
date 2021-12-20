<!--
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-02 16:10:20
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
        <!--货主-->
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
        <!--客户-->
        <template v-slot:form-customerId="scope">
          <zhqc-list-customer :select-key="topForm.data.customerId" @select="selectCustomer" />
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
            <template v-slot="scop">
              <span style="float: left; color: #8492a6; font-size: 13px;">{{ scop.item.customerName }}</span>
            </template>
          </remote-list>
        </template>
        <!--承运商-->
        <!--<template v-slot:form-partnerId="scope">-->
        <!--<zhqc-list-partner @select="selectPartner" :selectKey="topForm.data.partnerId" :partnerType="carrierCode" ></zhqc-list-partner>-->
        <!--</template>-->
        <!--承运商-->
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
        <!--店铺-->
        <!--<template v-slot:form-partnerStoreId="scope">-->
        <!--<list-store @select="selectPartnerStore" :selectKey="topForm.data.partnerStoreId"></list-store>-->
        <!--</template>-->
        <!--店铺-->
        <template v-slot:form-partnerStoreId="scope">
          <remote-list
            :model="topForm.data"
            select-key="partnerStoreId"
            lable="fullName"
            parame-code="queryText"
            :list-url="partnerStoreUrl"
          >
            <template v-slot="scop">
              <span style="float: left; color: #8492a6; font-size: 13px;">{{ scop.item.fullName }}</span>
            </template>
          </remote-list>
        </template>
        <template v-slot:form-provinceId="scope">
          <zhqc-list-province :select-key="topForm.data.provinceId" @select="selectProvinceTop" />
        </template>
        <template v-slot:form-cityId="scope">
          <zhqc-list-city :select-key="topForm.data.cityId" :province-id="provinceIdTop" @select="selectCityTop" />
        </template>
        <template v-slot:form-areaId="scope">
          <zhqc-list-area :select-key="topForm.data.areaId" :city-id="cityIdTop" @select="selectAreaTop" />
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
    <div slot="left-btn" />

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
          <el-button v-if="scope.data.row.soStatus =='NEW_CREATE' || scope.data.row.soStatus == 'PREASSIGN_PART'" size="mini" type="success" :disabled="$hasPerm('preassign')" @click="preassignEvent(scope.data.row)">预分配</el-button>
          <el-button v-if="scope.data.row.soStatus =='PREASSIGN_PART' || scope.data.row.soStatus == 'PREASSIGN_ALL'" size="mini" type="danger" :disabled="$hasPerm('cancelPreassign')" @click="cancelPreassignEvent(scope.data.row)">取消预分配</el-button>
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
    <!--増、查、改的表单-->
    <full-pop
      :visible.sync="dialogInfo.visible"
      :top-title="dialogInfo.title"
      :close-btn="dialogInfo.closeBtn"
      :save-list="dialogInfo.btList"
      @handleClick="handleClick"
    >
      <full-pop-item full-pop-item-title="SO单信息">
        <zhqc-form
          :ref-obj.sync="diaFormInfo.ref"
          :form-type="formType"
          :class-name="viewFlag"
          :data="diaFormInfo.data"
          :field-list="diaFormInfo.fieldList"
          :rules="diaFormInfo.rules"
          :list-type-info="listTypeInfo"
          :label-width="diaFormInfo.labelWidth"
          style="padding: 1% 5%"
          @handleEvent="handleEvent"
        >
          <template v-slot:form-ownerId="scope">
            <zhqc-list-owner :select-key="diaFormInfo.data.ownerId" :disabled="dialogInfo.type=='view'" @select="selectOwnerDia" />
          </template>
          <template v-slot:form-customerId="scope">
            <zhqc-list-customer :select-key="diaFormInfo.data.customerId" :disabled="dialogInfo.type=='view'" @select="selectCustomerDia" />
          </template>
          <template v-slot:form-partnerId="scope">
            <zhqc-list-partner :select-key="diaFormInfo.data.partnerId" :partner-type="carrierCode" :disabled="dialogInfo.type=='view'" @select="selectPartnerDia" />
          </template>
          <template v-slot:form-partnerStoreId="scope">
            <list-store :select-key="diaFormInfo.data.partnerStoreId" :disabled="dialogInfo.type=='view'" @select="selectPartnerStoreDia" />
          </template>
          <template v-slot:form-provinceId="scope">
            <zhqc-list-province :select-key="diaFormInfo.data.provinceId" :disabled="dialogInfo.type=='view'" @select="selectProvince" />
          </template>
          <template v-slot:form-cityId="scope">
            <zhqc-list-city :select-key="diaFormInfo.data.cityId" :province-id="provinceId" :disabled="dialogInfo.type=='view'" @select="selectCity" />
          </template>
          <template v-slot:form-areaId="scope">
            <zhqc-list-area :select-key="diaFormInfo.data.areaId" :city-id="cityId" :disabled="dialogInfo.type=='view'" @select="selectArea" />
          </template>
        </zhqc-form>
      </full-pop-item>
      <full-pop-item full-pop-item-title="SO单明细">
        <el-button v-show="diaFormInfo.addDtBtnShow" icon="el-icon-folder-add" @click="handleClick('openAddDtPage')">添加明细</el-button>
        <zhqc-table
          :data.sync="diaFormInfo.dtTableInfo.data"
          :field-list="diaFormInfo.dtTableInfo.fieldList"
          :handle="diaFormInfo.dtTableInfo.handle"
          @handleClick="handleClick"
        />
      </full-pop-item>
    </full-pop>
  </layout-body>
</template>

<script>
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
import soMixins from './mixins'
import zhqcListOwner from '@/Subassembly/ZhqcList/ListOwner'
import zhqcListCustomer from '@/Subassembly/ZhqcList/ListCustomer'
import zhqcListPartner from '@/Subassembly/ZhqcList/ListPartner'
import zhqcListProvince from '@/Subassembly/ZhqcList/ListProvince/ListProvince'
import zhqcListCity from '@/Subassembly/ZhqcList/ListCity/ListCity'
import zhqcListArea from '@/Subassembly/ZhqcList/ListArea/ListArea'
import listStore from '@/Subassembly/ZhqcList/ListStore'

export default {
  name: 'SoPreassign',
  components: {
    zhqcListOwner, zhqcListCustomer, zhqcListPartner,
    zhqcListProvince, zhqcListCity, zhqcListArea, listStore
  },
  mixins: [soMixins],
  data() {
    return {
      store: 'soPreassign/',
      modName: 'soPreassign',
      collapsable: false, // 展开收缩
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      formType: null,
      viewFlag: null,
      ownerUrl: VUE_APP_WMS_MODEL + '/base/partner/owner/queryOwnerCbList',
      customerUrl: VUE_APP_WMS_MODEL + '/base/partner/customer/queryCustomerCbList',
      partnerUrl: VUE_APP_WMS_MODEL + '/base/partner/factory/queryFactoryDropDownList',
      partnerStoreUrl: VUE_APP_WMS_MODEL + '/base/partner/store/queryStoreCbList',
      checkedIds: [],
      batchBtnArray: [
        { label: this.$t('soPreassign.preassign'), type: 'success', icon: '', event: 'handlePreassign', btLoading: false, show: !this.$hasPerm('preassign'), disabled: true },
        { label: this.$t('soPreassign.cancelPreassign'), type: 'danger', icon: '', event: 'handleCancelPreassign', btLoading: false, show: !this.$hasPerm('cancelPreassign'), disabled: true }
      ],
      dialogInfo: {
        title: '',
        visible: false,
        type: '',
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', btLoading: false, show: true }]
      },
      provinceId: null,
      cityId: null,
      provinceIdTop: null,
      cityIdTop: null,
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
        this.provinceId = null
        this.cityId = null
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
    selectCustomer(data) {
      this.topForm.data.customerId = data
    },
    selectPartner(data) {
      this.topForm.data.partnerId = data
    },
    selectPartnerStore(data) {
      this.topForm.data.partnerStoreId = data
    },
    selectOwnerDia(data) {
      this.diaFormInfo.data.ownerId = data
    },
    selectCustomerDia(data) {
      this.diaFormInfo.data.customerId = data
    },
    selectPartnerDia(data) {
      this.diaFormInfo.data.partnerId = data
    },
    selectPartnerStoreDia(data) {
      this.diaFormInfo.data.partnerStoreId = data
    },
    selectProvince(data) {
      this.diaFormInfo.data.provinceId = data
      this.diaFormInfo.data.cityId = null
      this.diaFormInfo.data.areaId = null
      this.provinceId = data
      this.cityId = null
    },
    selectCity(data) {
      this.diaFormInfo.data.cityId = data
      this.diaFormInfo.data.areaId = null
      this.cityId = data
    },
    selectArea(data) {
      this.diaFormInfo.data.areaId = data
    },
    selectProvinceTop(data) {
      this.topForm.data.provinceId = data
      this.topForm.data.cityId = null
      this.topForm.data.areaId = null
      this.provinceIdTop = data
      this.cityIdTop = null
    },
    selectCityTop(data) {
      this.topForm.data.cityId = data
      this.topForm.data.areaId = null
      this.cityIdTop = data
    },
    selectAreaTop(data) {
      this.topForm.data.areaId = data
    }
  }
}
</script>
