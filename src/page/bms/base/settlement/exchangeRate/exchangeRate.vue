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
      <el-button-group>
        <el-button icon="el-icon-folder-add" type="primary" @click="handleClick('create')">{{ $t('table.add') }}</el-button>
      </el-button-group>
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
      >
        <template v-slot:bt-slotEvent="scope">
          <el-button type="success" @click="edit(scope.data.row)">{{ $t('table.edit') }}</el-button>
          <el-button v-if="scope.data.row.dispatchStatus === 4" type="danger" @click="disenable(scope.data.row)">{{ $t('exchangeRate.disenable') }}</el-button>
          <el-button v-else type="primary" @click="enable(scope.data.row)">{{ $t('exchangeRate.enable') }}</el-button>
        </template>
      </vex-table-fh>
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

    <!-- 新增、编辑、查看 -->
    <full-pop
      :visible.sync="fullDialogInfo.visible"
      :top-title="fullDialogInfo.title"
      :close-btn="fullDialogInfo.closeBtn"
      :save-list="fullDialogInfo.btList"
      @handleClick="handleClick"
    >
      <full-pop-item :full-pop-item-title="$t('exchangeRate.exchangeRateInfo')">
        <!-- 主页面top表单 -->
        <zhqc-top-form-sc
          :ref-obj.sync="fullDialogInfo.topForm.ref"
          :data="fullDialogInfo.topForm.data"
          :field-list="fullDialogInfo.topForm.fieldList"
          :rules="fullDialogInfo.topForm.rules"
          :list-type-info="listTypeInfo"
          :label-width="fullDialogInfo.topForm.labelWidth"
        />
      </full-pop-item>
      <full-pop-item :full-pop-item-title="$t('exchangeRate.exchangeRateDetail')">
        <el-button v-if="fullDialogInfo.type !== 'view'" icon="el-icon-folder-add" type="primary" style="margin-bottom: 10px;" @click="handleClick('addRow')">{{ $t('exchangeRate.newAdd') }}</el-button>
        <vex-table-fh
          :ref-obj.sync="fullDialogInfo.tableInfo.ref"
          :data="fullDialogInfo.tableInfo.data"
          :field-list="fullDialogInfo.tableInfo.fieldList"
          :handle="fullDialogInfo.tableInfo.handle"
          :top-btn="fullDialogInfo.tableInfo.topBtn"
          :edit-config="false"
          @handleClick="handleClick"
          @handleEvent="handleEvent"
        />
      </full-pop-item>
    </full-pop>
  </layout-body>
</template>

<script>
import mixins from './mixins'
export default {
  name: 'ExchangeRate',
  mixins: [mixins],
  data() {
    return {
      store: 'exchangeRate/',
      modName: 'exchangeRate',
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage }
    }
  },
  computed: {
    resp() { return this.$store.state[this.modName].pageResp },
    total() { return this.$store.state[this.modName].total }
  }
}
</script>
