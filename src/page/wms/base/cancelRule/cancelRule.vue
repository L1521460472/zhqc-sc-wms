<!--
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 11:19:48
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-02 14:20:58
-->
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
        </template>
      </zhqc-top-form>
    </div>

    <div slot="left-btn">
      <export-vue
        template-name="customerAuthService"
        :export-url="exportUrl"
        export-name="电子签约授权"
        :disabled="true"
        @exportParam="exportData"
      />
    </div>
    <div slot="tab-body" class="tab-body_auto">
      <!--  主页面的table表格  -->
      <vex-table-fh
        :data.sync="resp"
        :field-list="tableInfo.fieldList"
        :handle="tableInfo.handle"
        :top-btn="tableInfo.topBtn"
        @handleClick="handleClick"
        @handleEvent="handleEvent"
      />
    </div>
    <div slot="bottom-page">
      <!--  分页组件   -->
      <zhqc-page
        :total="total"
        :page-request="pageRequest"
        @handleClick="handleClick"
        @pageChange="pageChange"
      />
    </div>

    <!-- 查看 -->
    <full-pop
      :visible.sync="fullDialogInfo.visible"
      :top-title="fullDialogInfo.title"
      :close-btn="fullDialogInfo.closeBtn"
      :save-list="fullDialogInfo.btList"
      @handleClick="handleClick"
    >
      <full-pop-item :full-pop-item-title="$t('cancelRule.info')">
        <zhqc-form
          :ref-obj.sync="fullDialogInfo.topForm.ref"
          :data="fullDialogInfo.topForm.data"
          :field-list="fullDialogInfo.topForm.fieldList"
          :rules="fullDialogInfo.topForm.rules"
          :list-type-info="listTypeInfo"
          :default-collapsable="true"
          :label-width="fullDialogInfo.topForm.labelWidth"
        />
      </full-pop-item>
      <full-pop-item :full-pop-item-title="$t('cancelRule.detailed')">
        <div class="table-height">
          <zhqc-table
            :data.sync="fullDialogInfo.tableInfo.data"
            :field-list="fullDialogInfo.tableInfo.fieldList"
            :handle="null"
            @handleClick="handleClick"
          />
        </div>
      </full-pop-item>
    </full-pop>
  </layout-body>
</template>

<script>
import { VUE_APP_OMS_MODEL } from '@/api/api.config.js'
import mixins from './mixins'
export default {
  name: 'PushOrderRule',
  mixins: [mixins],
  data() {
    return {
      store: 'cancelRule/',
      modName: 'cancelRule',
      exportUrl: VUE_APP_OMS_MODEL + '/transport/customerAuth/export',
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage }
    }
  },
  computed: {
    resp() { return this.$store.state[this.modName].pageResp },
    total() { return this.$store.state[this.modName].total }
  },
  watch: {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.table-height {
  height:400px;
  }
</style>
