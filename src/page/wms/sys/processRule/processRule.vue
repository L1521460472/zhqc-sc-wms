<!--
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 11:19:48
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-16 18:35:30
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
        <!--  货主名称 -->
        <template v-slot:form-ownerCode>
          <remote-list
            :model="topForm.data"
            select-key="ownerId"
            lable="ownerName"
            parame-code="ownerCode"
            :list-url="ownerUrl"
          >
            <template v-slot="scope">
              <span style="float: left; color: #8492a6; font-size: 13px;">{{ scope.item.ownerName }}</span>
            </template>
          </remote-list>
        </template>
        <!-- 销售仓 -->
        <template v-slot:form-whAreaId="scope">
          <remote-list-two
            :model="topForm.data"
            :item="scope.item"
            :type="1"
            :list-url="salesStorehouseUrl"
            @select="handleWhArea"
          />
        </template>
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
        </template>
      </zhqc-top-form>
    </div>

    <div slot="left-btn">
      <el-button-group>
        <el-button
          icon="el-icon-folder-add"
          type="primary"
          @click="handleClick('create')"
        >{{ $t('table.add') }}</el-button>
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
          <el-button
            v-if="scope.data.row.isEnable === 1"
            type="danger"
            @click="disenable(scope.data.row)"
          >{{ $t('processRule.disenable') }}</el-button>
          <el-button
            v-else
            type="primary"
            @click="enable(scope.data.row)"
          >{{ $t('billing.enable') }}</el-button>
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
      <full-pop-item :full-pop-item-title="$t('processRule.processInfo')">
        <zhqc-form
          :ref-obj.sync="fullDialogInfo.topForm1.ref"
          :data="fullDialogInfo.topForm1.data"
          :field-list="fullDialogInfo.topForm1.fieldList"
          :rules="fullDialogInfo.topForm1.rules"
          :list-type-info="listTypeInfo"
          :default-collapsable="true"
          :label-width="fullDialogInfo.topForm1.labelWidth"
        >
          <!-- 销售仓 -->
          <template v-slot:form-whAreaId="scope">
            <remote-list-two
              :model="fullDialogInfo.topForm1.data"
              :item="scope.item"
              :type="1"
              :list-url="salesStorehouseUrl"
              @select="handleWhArea"
            />
          </template>
        </zhqc-form>
      </full-pop-item>
      <full-pop-item :full-pop-item-title="$t('processRule.processDetails')">
        <el-button
          v-if="fullDialogInfo.tableInfo.topBtn.show"
          type="primary"
          icon="el-icon-folder-add"
          :disabled="false"
          @click="handleClick('openAddDtPage')"
        >{{ $t("processRule.addButtom") }}</el-button>
        <div class="add_table_box">
          <zhqc-table
            :data.sync="fullDialogInfo.tableInfo.data"
            :field-list="fullDialogInfo.tableInfo.fieldList"
            :handle="fullDialogInfo.tableInfo.handle"
            @handleClick="handleClick"
          />
        </div>
      </full-pop-item>
    </full-pop>
    <!-- 弹框明细 -->
    <zhqc-dialog
      :title="dialogInfo.title"
      :visible.sync="dialogInfo.visible"
      :width="dialogInfo.width"
      :bt-list="dialogInfo.btList"
      @handleEvent="handleEvent"
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
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
import mixins from './mixins'
export default {
  name: 'ProcessRule',
  mixins: [mixins],
  data() {
    return {
      store: 'processRule/',
      modName: 'processRule',
      ownerUrl: VUE_APP_WMS_MODEL + '/base/partner/owner/queryOwnerCbList',
      salesStorehouseUrl: VUE_APP_WMS_MODEL + '/base/wh/whArea/queryVirtualwhList',
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage }
    }
  },
  computed: {
    resp() {
      return this.$store.state[this.modName].pageResp
    },
    total() { return this.$store.state[this.modName].total }
  },
  watch: {
    'fullDialogInfo.visible'(val) {
      if (val) {
        this.$nextTick(() => {
          this.fullDialogInfo.topForm1.ref.resetFields()
        })
      }
    },
    'dialogInfo.visible'(val) {
      const dialogInfo = this.dialogInfo
      if (!val) {
        if (dialogInfo.ref) {
          dialogInfo.ref.resetFields()
        }
        this.resetFormData()
      }
    }
  },
  methods: {
    footerMethod() { }
  }
}
</script>
<style lang="scss" scoped>
// .tabs-box{
//   // height: 400px;
//   margin-bottom: 20px;
// }

.add_table_box {
  height: 240px;
}
</style>
