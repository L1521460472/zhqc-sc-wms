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
            <!-- <template v-slot="scope"> -->
            <span style="float: left; color: #8492a6; font-size: 13px;">{{ scope.item.ownerName }}</span>
            <!-- </template> -->
          </remote-list>
        </template>
        <!--产品-->
        <template v-slot:form-skuId="scope">
          <remote-list
            :model="topForm.data"
            select-key="skuId"
            lable="skuCode"
            parame-code="queryText"
            :list-url="skuUrl"
          >
            <!-- <template v-slot="scope"> -->
            <span style="float: left; color: #8492a6; font-size: 13px">{{ scope.item.skuCode }}</span>
            <span style="float: left; color: #8492a6; font-size: 13px;margin-left:30px;">{{ scope.item.skuName }}</span>
            <span style="float: left; color: #8492a6; font-size: 13px;margin-left:30px;">{{ scope.item.ownerName }}</span>
            <span style="float: left; color: #8492a6; font-size: 13px;margin-left:30px;">{{ scope.item.supplierName }}</span>
            <span style="float: left; color: #8492a6; font-size: 13px;margin-left:30px;">{{ scope.item.spec }}</span>
            <span style="float: left; color: #8492a6; font-size: 13px;margin-left:30px;">{{ scope.item.drugForm }}</span>
            <span style="float: left; color: #8492a6; font-size: 13px;margin-left:30px;">{{ scope.item.drugFormSpec }}</span>
            <!-- </template> -->
          </remote-list>
        </template>
        <template v-slot:form-supplierId>
          <list-supplier :select-key="topForm.data.supplierId" @select="selectSupplier" />
        </template>
        <!-- 展开收起表单 -->
        <template v-slot:form-sys class="el-icon-test">
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
      <!--  <el-button-group>
            <el-button icon="el-icon-folder-add"  @click="handleClick('openAcceptancePage')"  :disabled="$hasPerm('acceptance')">验收</el-button>
          </el-button-group>-->
      <export-vue
        template-name="qcService"
        export-url="ib/qc/export"
        export-name="验收单"
        @exportParam="exportData"
      />
    </div>

    <div slot="tab-body" class="tab-body_auto">
      <!--  主页面的table表格  -->
      <zhqc-table
        :data.sync="resp"
        :field-list="tableInfo.fieldList"
        :handle="null"
        @handleClick="handleClick"
      >

        <template v-slot:col-status="scope">
          <buttonList
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
      <full-pop-item full-pop-item-title="验收单">
        <zhqc-form
          :ref-obj.sync="diaFormInfo.ref"
          :data="diaFormInfo.data"
          :form-type="formType"
          :class-name="viewFlag"
          :field-list="diaFormInfo.fieldList"
          :rules="diaFormInfo.rules"
          :list-type-info="listTypeInfo"
          :label-width="diaFormInfo.labelWidth"
        />
      </full-pop-item>
      <full-pop-item full-pop-item-title="验收明细">
        <vex-dia-table
          :ref-obj.sync="diaFormInfo.subTableInfo.ref"
          :data="diaFormInfo.data.dtList"
          :field-list="diaFormInfo.subTableInfo.fieldList"
          :handle="diaFormInfo.subTableInfo.handle"
          :rules="diaFormInfo.subTableInfo.rules"
          :top-btn="diaFormInfo.subTableInfo.topBtn"
          @handleClick="handleClick"
        />
      </full-pop-item>
    </full-pop>

    <zhqc-acceptance />

  </layout-body>
</template>

<script>
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
import qcMixins from './mixins'
import buttonList from '@/components/buttonList'
import listSupplier from '@/Subassembly/ZhqcList/ListSupplier'
import zhqcAcceptance from './acceptance'
export default {
  name: 'Qc',
  components: {
    buttonList,
    listSupplier,
    zhqcAcceptance
  },
  mixins: [qcMixins],
  data() {
    return {
      store: 'qc/',
      modName: 'qc',
      collapsable: false, // 展开收缩
      formType: null,
      viewFlag: null,
      skuUrl: VUE_APP_WMS_MODEL + '/base/sku/sku/querySkuCbList',
      ownerUrl: VUE_APP_WMS_MODEL + '/base/partner/owner/queryOwnerCbList',
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      dialogInfo: {
        title: '',
        visible: false,
        type: '',
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', btLoading: false, show: true }]
      }
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
    selectSku(data) {
      this.topForm.data.skuId = data
    }
  }
}
</script>
