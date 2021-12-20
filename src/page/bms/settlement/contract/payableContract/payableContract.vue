<!--
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 11:19:48
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-01 10:15:04
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
      <el-button-group>
        <el-button icon="el-icon-folder-add" type="primary" @click="handleClick('add')">{{ $t('table.add') }}</el-button>
      </el-button-group>
    </div>

    <div slot="tab-body" class="tab-body_auto">
      <!--  主页面的table表格  -->
      <zhqc-table
        :data.sync="resp"
        :field-list="tableInfo.fieldList"
        :handle="tableInfo.handle"
        :top-btn="tableInfo.topBtn"
        @handleClick="handleClick"
        @handleEvent="handleEvent"
      >
        <template v-slot:bt-slotEvent="scope">
          <el-button type="success" @click="edit(scope.data.row)">{{ $t('payableContract.modify') }}</el-button>
        </template>
      </zhqc-table>
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

    <payable-contract-detail ref="contractDetail" :list-type-info="listTypeInfo" />
  </layout-body>
</template>

<script>
import mixins from './mixins'
import PayableContractDetail from './components/payableContractDetail.vue'
export default {
  name: 'PayableContract',
  components: {
    PayableContractDetail
  },
  mixins: [mixins],
  data() {
    return {
      store: 'payableContract/',
      modName: 'payableContract',
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      batchBtnArray: [
        { label: this.$t('payableContract.approve'), type: 'success', icon: '', event: 'approve', btLoading: false, show: true }
      ]
    }
  },
  computed: {
    resp() { return this.$store.state[this.modName].pageResp },
    total() { return this.$store.state[this.modName].total }
  }
}
</script>
