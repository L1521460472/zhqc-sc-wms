<template>
  <div>
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
        </zhqc-top-form>
      </div>

      <div slot="left-btn">
        <el-button-group>
          <el-button type="primary" icon="el-icon-folder-add" @click="handleClick('addFees')">{{ $t('payableFees.addFees') }}</el-button>
          <el-button type="primary" @click="handleClick('calculate')">{{ $t('payableFees.calculate') }}</el-button>
          <el-button type="primary" @click="handleClick('batchCalculate')">{{ $t('payableFees.batchCalculate') }}</el-button>
          <el-button type="primary" @click="handleClick('payOut')">{{ $t('payableFees.payOut') }}</el-button>
          <el-button type="primary" @click="handleClick('batchPayOut')">{{ $t('payableFees.batchPayOut') }}</el-button>
          <export-vue :export-url="exportUrl" template-name="inOrderService" export-name="入库订单" @exportParam="exportData" />
        </el-button-group>
      </div>

      <div slot="tab-body" class="tab-body_auto">
        <zhqc-tabs
          v-model="tabs.activeName"
          :tabs-list="tabs.tabsList"
          :bg-gradient="tabs.bgDradient"
          :font-size="tabs.fontSize"
        >
          <template #1>
            <zhqc-table
              :data.sync="resp"
              :field-list="tableInfo1.fieldList"
              :handle="tableInfo1.handle"
              :selectable="selectable"
              @handleClick="handleClick"
              @handleEvent="handleEvent"
            >
              <template v-slot:bt-slotEvent="scope">
                <el-button type="success" @click="adjustmentFees(scope.data.row)">{{ $t('payableFees.adjustmentFees') }}</el-button>
              </template>
            </zhqc-table>
          </template>
          <template #2>
            <zhqc-table
              :data.sync="resp"
              :field-list="tableInfo2.fieldList"
              :handle="tableInfo2.handle"
              :selectable="selectable"
              @handleClick="handleClick"
              @handleEvent="handleEvent"
            >
              <template v-slot:bt-slotEvent="scope">
                <el-button type="success" @click="adjustmentFees(scope.data.row)">{{ $t('payableFees.adjustmentFees') }}</el-button>
              </template>
            </zhqc-table>
          </template>
          <template #3>
            <zhqc-table
              :data.sync="resp"
              :field-list="tableInfo3.fieldList"
              :handle="tableInfo3.handle"
              :selectable="selectable"
              @handleClick="handleClick"
              @handleEvent="handleEvent"
            >
              <template v-slot:bt-slotEvent="scope">
                <el-button type="success" @click="adjustmentFees(scope.data.row)">{{ $t('payableFees.adjustmentFees') }}</el-button>
              </template>
            </zhqc-table>
          </template>
          <template #4>
            <zhqc-table
              :data.sync="resp"
              :field-list="tableInfo4.fieldList"
              :handle="tableInfo4.handle"
              :selectable="selectable"
              @handleClick="handleClick"
              @handleEvent="handleEvent"
            >
              <template v-slot:bt-slotEvent="scope">
                <el-button type="success" @click="adjustmentFees(scope.data.row)">{{ $t('payableFees.adjustmentFees') }}</el-button>
              </template>
            </zhqc-table>
          </template>
          <template #5>
            <zhqc-table
              :data.sync="resp"
              :field-list="tableInfo5.fieldList"
              :handle="tableInfo5.handle"
              :selectable="selectable"
              @handleClick="handleClick"
              @handleEvent="handleEvent"
            >
              <template v-slot:bt-slotEvent="scope">
                <el-button type="success" @click="adjustmentFees(scope.data.row)">{{ $t('payableFees.adjustmentFees') }}</el-button>
              </template>
            </zhqc-table>
          </template>
        </zhqc-tabs>
      </div>

      <div slot="bottom-page">
        <!--  分页组件   -->
        <zhqc-page
          :total="total"
          :page-request="pageRequest"
          :bt-list="batchBtnArray"
          @handleClick="handleClick"
          @pageChange="pageChange"
        />
      </div>
    </layout-body>

    <payable-fees-detail :visible="detailVisible" :list-type-info="listTypeInfo" />
    <add-fees :visible="addFeesVisible" :list-type="listTypeInfo" />

    <!-- 弹框 -->
    <zhqc-dialog
      :title="dialogInfo.title"
      :visible.sync="dialogInfo.visible"
      :width="dialogInfo.width"
      :bt-list="dialogInfo.btList"
      @handleClick="handleClick"
    >
      <zhqc-form
        :ref-obj.sync="dialogInfo.ref"
        :data="dialogInfo.data"
        :field-list="dialogInfo.fieldList"
        :rules="dialogInfo.rules"
        :form-type="dialogInfo.type"
        :list-type-info="listTypeInfo"
        :label-width="dialogInfo.labelWidth"
        @handleEvent="handleEvent"
      >
        <template v-slot:form-certificate="">
          <upload-file
            :export-url="exportImgUrl"
            :img-pre-src-list="pictureList"
            :accept="accept"
            :show-tips="true"
            @handleImgSuccess="handleImgSuccess"
            @handleRemove="handleRemove"
          />
        </template>
      </zhqc-form>
    </zhqc-dialog>
  </div>
</template>

<script>
import { VUE_APP_OMS_MODEL } from '@/api/api.config.js'
import { VUE_APP_BASE_URL } from '@/api/api.config.js'
import mixins from './mixins'
import PayableFeesDetail from './components/payableFeesDetail.vue'
import AddFees from './components/addFees.vue'
export default {
  name: 'PayableFees',
  components: {
    PayableFeesDetail,
    AddFees,
    UploadFile: () => import('@/Subassembly/upload/upload.vue')
  },
  mixins: [mixins],
  data() {
    return {
      store: 'payableFees/',
      modName: 'payableFees',
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      batchBtnArray: [
        { label: this.$t('payableFees.review'), type: 'success', icon: '', event: 'review', btLoading: false, show: true },
        { label: this.$t('payableFees.reviewAll'), type: 'success', icon: '', event: 'reviewAll', btLoading: false, show: true },
        { label: this.$t('payableFees.reverseReview'), type: 'warning', icon: '', event: 'reverseReview', btLoading: false, show: true },
        { label: this.$t('payableFees.reverseReviewAll'), type: 'warning', icon: '', event: 'reverseReviewAll', btLoading: false, show: true }
      ],
      tabs: {
        activeName: '1',
        bgDradient: ['#00d4d8', '#009396'],
        fontSize: 14,
        tabsList: [
          { label: this.$t('payableFees.all'), value: '1' },
          { label: this.$t('payableFees.failCalculated'), value: '2' },
          { label: this.$t('payableFees.reviewing'), value: '3' },
          { label: this.$t('payableFees.reviewed'), value: '4' },
          { label: this.$t('payableFees.billed'), value: '5' }
        ]
      },
      exportUrl: VUE_APP_OMS_MODEL + '/order/inOrder/export',
      exportImgUrl: VUE_APP_BASE_URL + 'fileMgr/fileManager/upload2Path',
      accept: null,
      collapsable: false,
      detailVisible: false,
      addFeesVisible: false,
      selections: [],
      pictureList: [],
      evidenceList: []
    }
  },
  computed: {
    resp() { return this.$store.state[this.modName].pageResp },
    total() { return this.$store.state[this.modName].total }
  },
  watch: {
    // 展开收缩
    collapsable: {
      handler(val) {
        if (val) {
          this.collapsableFormMore()
        } else {
          this.collapsableForm()
        }
      },
      immediate: true
    },
    'dialogInfo.visible'(val) {
      if (!val) {
        // this.fileList = []
      }
    }
  },
  methods: {
    /* 添加展开收起表单功能 */
    openCollapsable() {
      this.collapsable = !this.collapsable
    },
    selectable() {
      return true
    },
    // 表格里的勾选框
    tableCheck(data) {
      this.selections = data
    },
    handleImgSuccess(list) {
      this.evidenceList = list.map(item => ({
        type: item.endsWith('.pdf') ? 2 : 1,
        path: item
      }))
    },
    handleRemove(list) {
      this.evidenceList = list.map(item => ({
        type: item.endsWith('.pdf') ? 2 : 1,
        path: item
      }))
    }
  }
}
</script>

<style lang="scss">
.page-form .el-form-item.long-row {
  width: 100%;
}
</style>
