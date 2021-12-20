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
        template-name="pickOrderService"
        :export-url="exportUrl"
        export-name="出库管理-拣货单"
        @exportParam="exportData"
      />

      <el-button-group>
        <el-button type="primary" icon="el-icon-printer" :disabled="$hasPerm('print')" @click="handleClick('print')">打印</el-button>
      </el-button-group>

      <el-button-group>
        <el-button type="primary" icon="el-icon-printer" @click="handleClick('printTheExpressWaybill')">打印快递面单</el-button>
      </el-button-group>
    </div>

    <div slot="tab-body" class="tab-body_auto">
      <!--  主页面的table表格  -->
      <zhqc-table
        :data.sync="resp"
        :field-list="tableInfo.fieldList"
        :handle="tableInfo.handle"
        @handleClick="handleClick"
        @handleEvent="handleSelectionChange"
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

    <full-pop
      :visible.sync="dialogInfo.visible"
      :top-title="dialogInfo.title"
      :close-btn="dialogInfo.closeBtn"
      :save-list="dialogInfo.btList"
      @handleClick="handleClick"
    >
      <el-tabs v-model="activeName" type="card" @tab-click="handleTab">

        <el-tab-pane label="拣货单明细" name="first">
          <full-pop-item full-pop-item-title="拣货单">
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
          </full-pop-item>
          <full-pop-item full-pop-item-title="拣货单明细">
            <vex-dia-table
              :ref-obj.sync="diaFormInfo.diaTablePickOrderDt.ref"
              :data.sync="pagePickDtResp"
              :field-list="diaFormInfo.diaTablePickOrderDt.fieldList"
              :handle="diaFormInfo.diaTablePickOrderDt.handle"
              :top-btn="diaFormInfo.diaTablePickOrderDt.topBtn"
              @handleClick="handleClick"
            />
            <div>
              <zhqc-page
                :total="pickDtTotal"
                :page-request="pageRequestDt"
                @pageChange="pageDtChange"
              />
            </div>
          </full-pop-item>
        </el-tab-pane>

        <el-tab-pane label="拣货单SO分配明细" name="second">
          <full-pop-item full-pop-item-title="拣货单">
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
          </full-pop-item>
          <full-pop-item full-pop-item-title="拣货单SO分配明细">
            <vex-dia-table
              :ref-obj.sync="diaFormInfo.diaTablePickSoAssign.ref"
              :data.sync="pagePickSoAssignResp"
              :field-list="diaFormInfo.diaTablePickSoAssign.fieldList"
              :handle="diaFormInfo.diaTablePickSoAssign.handle"
              :top-btn="diaFormInfo.diaTablePickSoAssign.topBtn"
              @handleClick="handleClick"
            />
            <div>
              <zhqc-page
                :total="pickSoAssignTotal"
                :page-request="pageRequestPickSoAssign"
                @pageChange="pagePickSoAssignChange"
              />
            </div>
          </full-pop-item>
        </el-tab-pane>

        <el-tab-pane label="拣货记录" name="third">
          <full-pop-item full-pop-item-title="拣货单">
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
          </full-pop-item>
          <full-pop-item full-pop-item-title="拣货记录">
            <vex-dia-table
              :ref-obj.sync="diaFormInfo.diaTablePickInfo.ref"
              :data.sync="pagePickInfoResp"
              :field-list="diaFormInfo.diaTablePickInfo.fieldList"
              :handle="diaFormInfo.diaTablePickInfo.handle"
              :top-btn="diaFormInfo.diaTablePickInfo.topBtn"
              @handleClick="handleClick"
            />
            <div>
              <zhqc-page
                :total="pickInfoTotal"
                :page-request="pageRequestPickInfo"
                @pageChange="pagePickInfoChange"
              />
            </div>
          </full-pop-item>
        </el-tab-pane>

        <el-tab-pane label="播种信息" name="fourth">
          <full-pop-item full-pop-item-title="拣货单">
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
          </full-pop-item>
          <full-pop-item full-pop-item-title="播种信息">
            <vex-dia-table
              :ref-obj.sync="diaFormInfo.diaTableSow.ref"
              :data.sync="pagePickSowResp"
              :field-list="diaFormInfo.diaTableSow.fieldList"
              :handle="diaFormInfo.diaTableSow.handle"
              :top-btn="diaFormInfo.diaTableSow.topBtn"
              @handleClick="handleClick"
            />
            <div>
              <zhqc-page
                :total="pickSowTotal"
                :page-request="pageRequestPickSow"
                @pageChange="pagePickSowChange"
              />
            </div>
          </full-pop-item>
        </el-tab-pane>

      </el-tabs>
    </full-pop>
  </layout-body>
</template>

<script>
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
import pickOrderMixins from './mixins'

export default {
  name: 'PickOrder',
  mixins: [pickOrderMixins],
  data() {
    return {
      store: 'pickOrder/',
      modName: 'pickOrder',
      collapsable: false, // 展开收缩
      activeName: 'first',
      formType: null,
      viewFlag: null,
      exportUrl: VUE_APP_WMS_MODEL + '/ob/pickOrder/export',
      ownerUrl: VUE_APP_WMS_MODEL + '/base/partner/owner/queryOwnerCbList',
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      pageRequestDt: { limit: this.$globalLimitDt, page: this.$globalPageDt },
      pageRequestPickSoAssign: { limit: this.$globalLimitDt, page: this.$globalPageDt },
      pageRequestPickInfo: { limit: this.$globalLimitDt, page: this.$globalPageDt },
      pageRequestPickSow: { limit: this.$globalLimitDt, page: this.$globalPageDt },
      pageRequestPickBox: { limit: this.$globalLimitDt, page: this.$globalPageDt },
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
    total() { return this.$store.state[this.modName].total },
    pickDtTotal() {
      return this.$store.state[this.modName].pickDtTotal
    },
    pickSoAssignTotal() {
      return this.$store.state[this.modName].pickSoAssignTotal
    },
    pickInfoTotal() {
      return this.$store.state[this.modName].pickInfoTotal
    },
    pickSowTotal() {
      return this.$store.state[this.modName].pickSowTotal
    },
    pagePickDtResp() {
      return this.$store.state[this.modName].pagePickDtResp
    },
    pagePickSoAssignResp() {
      return this.$store.state[this.modName].pagePickSoAssignResp
    },
    pagePickInfoResp() {
      return this.$store.state[this.modName].pagePickInfoResp
    },
    pagePickSowResp() {
      return this.$store.state[this.modName].pagePickSowResp
    }
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
    handleTab() {
      if (this.activeName === 'first') {
        if (this.diaFormInfo.diaTablePickOrderDt.ref) {
          this.diaFormInfo.diaTablePickOrderDt.ref.recalculate(true)
        }
      } else if (this.activeName === 'second') {
        if (this.diaFormInfo.diaTablePickSoAssign.ref) {
          this.diaFormInfo.diaTablePickSoAssign.ref.recalculate(true)
        }
      } else if (this.activeName === 'third') {
        if (this.diaFormInfo.diaTablePickInfo.ref) {
          this.diaFormInfo.diaTablePickInfo.ref.recalculate(true)
        }
      } else if (this.activeName === 'fourth') {
        if (this.diaFormInfo.diaTableSow.ref) {
          this.diaFormInfo.diaTableSow.ref.recalculate(true)
        }
      }
    },

    selectOwner(data) {
      this.topForm.data.ownerId = data
    }
  }
}
</script>
