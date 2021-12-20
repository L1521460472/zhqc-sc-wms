<!--
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-02 16:03:14
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
        <!--<template v-slot:form-ownerId="scope">-->
        <!--<list-owner @select="selectOwner" :selectKey="topForm.data.ownerId"></list-owner>-->
        <!--</template>-->
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
        <!--<template v-slot:form-storeId="scope">-->
        <!--<list-store @select="selectStore" :selectKey="topForm.data.storeId"></list-store>-->
        <!--</template>-->
        <!--店铺-->
        <template v-slot:form-storeId="scope">
          <remote-list
            :model="topForm.data"
            select-key="storeId"
            lable="fullName"
            parame-code="queryText"
            :list-url="partnerStoreUrl"
          >
            <template v-slot="scop">
              <span style="float: left; color: #8492a6; font-size: 13px;">{{ scop.item.fullName }}</span>
            </template>
          </remote-list>
        </template>
        <template v-slot:form-sys="" class="el-icon-test">
          <el-button type="primary" icon="el-icon-search" :disabled="$hasPerm('search')" @click="handleClick('search')">{{ $t("table.search") }}</el-button>
          <el-button type="warning" icon="el-icon-refresh-left" :disabled="$hasPerm('search')" @click="handleClick('reboot')">{{ $t("table.reboot") }}</el-button>
        </template>
      </zhqc-top-form>
    </div>
    <div slot="left-btn">
      <el-button-group>
        <el-button type="primary" icon="el-icon-folder-add" :disabled="$hasPerm('add')" @click="handleClick('openAddPage')">{{ $t('table.add') }}</el-button>
      </el-button-group>
      <export-vue
        template-name="invoiceDrawerSetService"
        :export-url="exportUrl"
        export-name="发票开票信息设置"
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
      >
        <template v-slot:col-status="scope">
          <el-button size="mini" type="primary" :disabled="$hasPerm('view')" @click="openViewPage(scope.row)">查看</el-button>
          <el-button size="mini" type="success" :disabled="$hasPerm('edit')" @click="openEditPage(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" :disabled="$hasPerm('delete')" @click="deleteData(scope.row)">删除</el-button>
          <el-button
            v-if="scope.row.isEnable === 0"
            size="mini"
            type="primary"
            :disabled="$hasPerm('enable')"
            @click="enable(scope.row)"
          >启用
          </el-button>
          <el-button
            v-if="scope.row.isEnable === 1"
            size="mini"
            type="success"
            :disabled="$hasPerm('deactivate')"
            @click="deactivate(scope.row)"
          >停用
          </el-button>
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
      <zhqc-form
        :ref-obj.sync="diaFormInfo.ref"
        :form-type="formType"
        :class-name="viewFlag"
        :data="diaFormInfo.data"
        :field-list="diaFormInfo.fieldList"
        :rules="diaFormInfo.rules"
        :list-type-info="listTypeInfo"
        :label-width="diaFormInfo.labelWidth"
        @handleEvent="handleEvent"
      >
        <template v-slot:form-ownerId="scope">
          <list-owner :select-key="diaFormInfo.data.ownerId" :disabled="dialogInfo.type === 'view'" @select="selectOwnerDia" />
        </template>
        <template v-slot:form-storeId="scope">
          <list-store :select-key="diaFormInfo.data.storeId" :disabled="dialogInfo.type === 'view'" @select="selectStoreDia" />
        </template>
      </zhqc-form>
    </full-pop>

  </layout-body>
</template>

<script>
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
import invoiceOpenTicketSetMixins from './mixins'
import listOwner from '@/Subassembly/ZhqcList/ListOwner'
import listStore from '@/Subassembly/ZhqcList/ListStore'

export default {
  name: 'InvoiceDrawerSet',
  components: { listOwner, listStore },
  mixins: [invoiceOpenTicketSetMixins],
  data() {
    return {
      store: 'invoiceDrawerSet/',
      modName: 'invoiceDrawerSet',
      formType: null,
      viewFlag: null,
      ownerUrl: VUE_APP_WMS_MODEL + '/base/partner/owner/queryOwnerCbList',
      partnerStoreUrl: VUE_APP_WMS_MODEL + '/base/partner/store/queryStoreCbList',
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      dialogInfo: {
        title: '',
        visible: false,
        type: '',
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', btLoading: false, show: true }]
      },
      exportUrl: VUE_APP_WMS_MODEL + '/invoice/invoiceDrawerSet/export'
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
    }
  },
  mounted() {

  },
  methods: {
    selectOwner(data) {
      this.topForm.data.ownerId = data
    },
    selectStore(data) {
      this.topForm.data.storeId = data
    },

    selectOwnerDia(data) {
      this.diaFormInfo.data.ownerId = data
    },
    selectStoreDia(data) {
      this.diaFormInfo.data.storeId = data
    }
  }
}
</script>
