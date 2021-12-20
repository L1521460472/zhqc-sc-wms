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
          <el-button v-if="scope.data.row.dispatchStatus === 4" type="danger" @click="disenable(scope.data.row)">{{ $t('currency.disenable') }}</el-button>
          <el-button v-else type="primary" @click="enable(scope.data.row)">{{ $t('currency.enable') }}</el-button>
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
      />
    </zhqc-dialog>
  </layout-body>
</template>

<script>
import mixins from './mixins'
export default {
  name: 'Currency',
  mixins: [mixins],
  data() {
    return {
      store: 'currency/',
      modName: 'currency',
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage }
    }
  },
  computed: {
    resp() { return this.$store.state[this.modName].pageResp },
    total() { return this.$store.state[this.modName].total }
  }
}
</script>
