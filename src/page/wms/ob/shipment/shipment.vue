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
        <template v-slot:form-partnerStoreId="scope">
          <list-store :select-key="topForm.data.partnerStoreId" @select="selectPartnerStore" />
        </template>
        <template v-slot:form-supplierId="scope">
          <zhqc-list-supplier :select-key="topForm.data.supplierId" @select="selectSupplier" />
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
      <!--<export-vue templateName="shipmentService"
                      exportUrl="ob/shipment/export"
                      exportName="出库管理-发运交接"
                      @exportParam="exportData">
          </export-vue>-->
    </div>

    <div slot="tab-body" class="tab-body_auto">
      <!--  主页面的table表格  -->
      <zhqc-table
        :data.sync="resp"
        :field-list="tableInfo.fieldList"
        :handle="null"
        @handleClick="handleClick"
        @handleEvent="handleSelectionChange"
      >>
        <template v-slot:col-status="scope">
          <button-list
            :row="scope.row"
            :bt-list="tableInfo.handle.btList"
            @handleClick="handleClick"
          />
        </template>
      </zhqc-table>
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
    <full-pop
      :visible.sync="dialogInfo.visible"
      :top-title="dialogInfo.title"
      :close-btn="dialogInfo.closeBtn"
      :save-list="dialogInfo.btList"
      @handleClick="handleClick"
    >
      <full-pop-item full-pop-item-title="发运交接单">
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
          <template v-slot:form-partnerId="scope">
            <zhqc-list-partner :select-key="diaFormInfo.data.partnerId" :partner-type="carrierCode" @select="selectPartnerDiaAdd" />
          </template>
          <template v-slot:form-partnerStoreId="scope">
            <list-store :select-key="diaFormInfo.data.partnerStoreId" @select="selectPartnerStoreDiaAdd" />
          </template>
          <template v-slot:form-supplierId="scope">
            <zhqc-list-supplier :select-key="diaFormInfo.data.supplierId" @select="selectSupplierDiaAdd" />
          </template>
        </zhqc-form>
      </full-pop-item>
      <full-pop-item full-pop-item-title="明细">

        <zhqc-form
          :ref-obj.sync="diaFormInfo.subTop.ref"
          :form-type="dialogInfo.type"
          :data="diaFormInfo.data"
          :field-list="diaFormInfo.subTop.fieldList"
          :rules="diaFormInfo.rules"
          :list-type-info="listTypeInfo"
          :label-width="diaFormInfo.labelWidth"
        >

          <template v-slot:form-boxNo="scope">
            <el-input
              v-model="diaFormInfo.data.boxNo"
              type="input"
              :clearable="true"
              @keyup.enter.native="scanBoxNo"
            />
          </template>

          <template v-slot:form-cusOrderNo="scope">
            <el-input
              v-model="diaFormInfo.data.cusOrderNo"
              type="input"
              :clearable="true"
              @keyup.enter.native="scanBoxNo"
            />
          </template>

        </zhqc-form>
        <vex-dia-table
          :ref-obj.sync="diaFormInfo.subTableInfo.ref"
          :data.sync="diaFormInfo.data.dtList"
          :field-list="diaFormInfo.subTableInfo.fieldList"
          :handle="diaFormInfo.subTableInfo.handle"
          :rules="diaFormInfo.subTableInfo.rules"
          :top-btn="diaFormInfo.subTableInfo.topBtn"
          @handleClick="handleClick"
        />
      </full-pop-item>
    </full-pop>

  </layout-body>
</template>

<script>
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
import shipmentMixins from './mixins'
import buttonList from './components/buttonList'
import zhqcListPartner from '@/Subassembly/ZhqcList/ListPartner'
import zhqcListSupplier from '@/Subassembly/ZhqcList/ListSupplier'
import listStore from '@/Subassembly/ZhqcList/ListStore'
export default {
  name: 'Shipment',
  components: {
    buttonList, zhqcListPartner, listStore, zhqcListSupplier
  },
  mixins: [shipmentMixins],
  data() {
    return {
      store: 'shipment/',
      modName: 'shipment',
      collapsable: false, // 展开收缩
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      formType: null,
      viewFlag: null,
      partnerUrl: VUE_APP_WMS_MODEL + '/base/partner/factory/queryFactoryDropDownList',
      dialogInfo: {
        title: '',
        visible: false,
        type: '',
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', btLoading: false, show: true }]
      },

      carrierCode: 'CARRIER'
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
    selectPartner(data) {
      this.topForm.data.partnerId = data
    },
    selectPartnerDiaAdd(data) {
      this.diaFormInfo.data.partnerId = data
    },
    selectSupplier(data) {
      this.topForm.data.supplierId = data
    },
    selectSupplierDiaAdd(data) {
      this.diaFormInfo.data.supplierId = data
    },
    selectPartnerStoreDiaAdd(data) {
      this.diaFormInfo.data.partnerStoreId = data
    }

  }
}
</script>
