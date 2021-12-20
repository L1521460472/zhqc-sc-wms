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
        <!--        货主-->
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
        <!-- 发货仓库 -->
        <template v-slot:form-whAreaId="scope">
          <remote-list-two
            :model="topForm.data"
            :item="scope.item"
            :list-url="consigneeUrl"
          />
        </template>
        <template v-slot:form-consignee="scope">
          <remote-list-two
            :model="topForm.data"
            :item="scope.item"
            :type="1"
            :list-url="consigneeUrl"
          />
        </template>
        <!--客户-->
        <template v-slot:form-customerId="scope">
          <remote-list
            :model="topForm.data"
            select-key="customerId"
            lable="customerName"
            parame-code="customerCode"
            :list-url="customerUrl"
            @select="test"
          >
            <template v-slot="scop">
              <span style="float: left; color: #8492a6; font-size: 13px;">{{ scop.item.customerName }}</span>
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
        <el-button type="primary" icon="el-icon-printer" :disabled="$hasPerm('print')" @click="handleClick('print')">打印</el-button>
      </el-button-group>
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
          <el-button size="mini" type="primary" :show="false" :disabled="false" @click="deliveryConfirmation(scope.data.row)">出库确认</el-button>
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
      <full-pop-item full-pop-item-title="出库单信息">
        <zhqc-form
          :ref-obj.sync="diaFormInfo.ref"
          :data="diaFormInfo.data"
          :form-type="formType"
          :class-name="viewFlag"
          :field-list="diaFormInfo.fieldList"
          :rules="diaFormInfo.rules"
          :list-type-info="listTypeInfo"
          :label-width="diaFormInfo.labelWidth"
          style="padding: 1% 0%"
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

      <div v-show="dialogInfo.type=='view'" class="tabs-box">
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
              :handle="null"
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
    </full-pop>
    <zhqc-dialog
      :title="dialogInfoFrozen.title"
      :visible.sync="dialogInfoFrozen.visible"
      :width="dialogInfoFrozen.width"
      :bt-list="dialogInfoFrozen.btList"
      @handleClick="handleClick"
    >
      <zhqc-form
        :ref-obj.sync="diaFormInfoFrozen.ref"
        :form-type="dialogInfo.type"
        :data="diaFormInfoFrozen.data"
        :field-list="diaFormInfoFrozen.fieldList"
        :rules="diaFormInfoFrozen.rules"
        :list-type-info="listTypeInfo"
        :label-width="diaFormInfoFrozen.labelWidth"
      />
    </zhqc-dialog>
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
  name: 'So',
  components: {
    zhqcListOwner, zhqcListCustomer, zhqcListPartner,
    zhqcListProvince, zhqcListCity, zhqcListArea, listStore
  },
  mixins: [soMixins],
  data() {
    return {
      store: 'so/',
      modName: 'so',
      collapsable: false, // 展开收缩
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      formType: null,
      viewFlag: null,
      ownerUrl: VUE_APP_WMS_MODEL + '/base/partner/owner/queryOwnerCbList',
      customerUrl: VUE_APP_WMS_MODEL + '/base/partner/customer/queryCustomerCbList',
      partnerUrl: VUE_APP_WMS_MODEL + '/base/partner/factory/queryFactoryDropDownList',
      partnerStoreUrl: VUE_APP_WMS_MODEL + '/base/partner/store/queryStoreCbList',
      consigneeUrl: VUE_APP_WMS_MODEL + '/base/wh/whArea/queryVirtualwhList',
      checkedIds: [],
      batchBtnArray: [
        { label: this.$t('so.redistribution'), type: 'primary', icon: '', event: 'handleRedistribution', btLoading: false, show: true, disabled: false }
        // { label: this.$t('so.frozen'), type: 'primary', icon: '', event: 'handleFrozen', btLoading: false, show: !this.$hasPerm('frozen'), disabled: true },
        // { label: this.$t('so.unfrozen'), type: 'warning', icon: '', event: 'handleUnfrozen', btLoading: false, show: !this.$hasPerm('unfrozen'), disabled: true },
        // { label: this.$t('so.crossDocking'), type: 'success', icon: '', event: 'handleCrossDocking', btLoading: false, show: !this.$hasPerm('crossDocking'), disabled: true },
        // { label: this.$t('so.cancelCrossDocking'), type: 'danger', icon: '', event: 'handleCancelCrossDocking', btLoading: false, show: !this.$hasPerm('cancelCrossDocking'), disabled: true }
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
      dialogInfoFrozen: {
        title: '冻结原因',
        visible: false,
        type: '',
        addDtBtnShow: false,
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'closeFrozenPage', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'saveFrozen', loading: false, show: true }]
      },
      provinceId: null,
      cityId: null,
      carrierCode: null,
      tabs: {
        activeName: '1',
        bgDradient: ['#00d4d8', '#009396'],
        fontSize: 14,
        tabsList: [{ label: '出库单明细', value: '1' },
          { label: '操作明细', value: '2' }]
      },
      tableInfo1: {
        fieldList: null, // 表格列集合
        handle: null,
        data: []

      },
      tableInfo2: {
        fieldList: null, // 表格列集合
        handle: null,
        data: []
      }
    }
  },
  computed: {
    resp() {
      return this.$store.state[this.modName].pageResp
    },
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
    test(data) {
      console.log('sfsf', data)
    }
  }
}
</script>

<style lang="scss" scoped>

.tabs-box{
  // height: 400px;
  margin-bottom: 20px;
}

</style>
