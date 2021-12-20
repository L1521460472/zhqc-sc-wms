<!--
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-02 17:06:02
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

        <template v-slot:form-ownerId="scope">
          <list-owner :select-key="topForm.data.ownerId" @select="selectOwnerCode" />
        </template>

        <template v-slot:form-customerId="scope">
          <list-customer :select-key="topForm.data.customerId" @select="selectCustomerCode" />
        </template>

        <template v-slot:form-partnerId="scope">
          <list-partner :select-key="topForm.data.partnerId" :partner-type="carrierCode" @select="selectCarrier" />
        </template>

        <template v-slot:form-checkPlatformId="scope">
          <list-check-platform :select-key="topForm.data.checkPlatformCode" @select="selectCheckPlatformCode" />
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
      <!-- <el-button-group>
                <el-button icon="el-icon-folder-add"  @click="handleClick('openAddPage')"  :disabled="$hasPerm('add')">{{$t('table.add')}}</el-button>
            </el-button-group> -->
      <export-vue
        template-name="obWeighRecordReportService"
        :export-url="exportUrl"
        export-name="称重明细表导出"
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
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
import ListCheckPlatform from './../../../../../Subassembly/ZhqcList/ListCheckPlatform'
import obWeighRecordReportMixins from './mixins'
import listOwner from '@/Subassembly/ZhqcList/ListOwner'
import listCustomer from '@/Subassembly/ZhqcList/ListCustomer'
import listPartner from '@/Subassembly/ZhqcList/ListPartner'
export default {
  name: 'ObWeighRecordReport',
  components: {
    listOwner, listCustomer, listPartner, ListCheckPlatform
  },
  mixins: [obWeighRecordReportMixins],
  data() {
    return {
      store: 'obWeighRecordReport/',
      modName: 'obWeighRecordReport',
      collapsable: false, // 展开收缩
      exportUrl: VUE_APP_WMS_MODEL + '/rpt/ob/obWeighRecordReport/export',
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
    selectCheckPlatformCode(data, obj) {
      this.topForm.data.checkPlatformCode = obj.checkPlatformCode
      this.topForm.data.checkPlatformId = obj.id
    },
    selectOwnerCode(data, obj) {
      this.topForm.data.ownerCode = obj.ownerCode
      this.topForm.data.ownerId = obj.id
    },
    selectCustomerCode(data, obj) {
      this.topForm.data.customerName = obj.customerName
      this.topForm.data.customerId = obj.id
    },
    selectCarrier(data, obj) {
      this.topForm.data.fullName = obj.fullName
      this.topForm.data.partnerId = obj.id
    }
  }
}
</script>
