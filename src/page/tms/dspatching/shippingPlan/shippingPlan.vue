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
        <!--  货主 -->
        <template v-slot:form-ownerCode>
          <remote-list
            :model="topForm.data"
            select-key="ownerName"
            lable="ownerName"
            parame-code="ownerCode"
            :list-url="ownerUrl"
          >
            <template v-slot="scope">
              <span style="float: left; color: #8492a6; font-size: 13px;">{{ scope.item.ownerName }}</span>
            </template>
          </remote-list>
        </template>
        <!-- 发货方 -->
        <template v-slot:form-senderCode="">
          <list-sender-or-receiver
            :model="topForm.data"
            select-key="senderName"
            lable="senderName"
            parame-code="senderCode"
            :list-url="SRUrl"
            :param-type="true"
          />
        </template>
        <!--收货方 -->
        <template v-slot:form-receiverCode="">
          <list-sender-or-receiver
            :model="topForm.data"
            select-key="receiverName"
            lable="receiverName"
            parame-code="receiverCode"
            :list-url="SRUrl"
            :param-type="true"
          />
        </template>
        <!-- 承运商名称 -->
        <template v-slot:form-carrierCode="">
          <list-carrierName
            :model="topForm.data"
            select-key="carrierName"
            lable="carrierName"
            parame-code="carrierCode"
          />
        </template>
        <!-- 展开收起表单 -->
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
        <!-- 展开收起表单结束 -->
      </zhqc-top-form>
    </div>

    <div slot="left-btn">
      <el-button-group>
        <el-button icon="el-icon-s-operation" type="success" @click="handleClick('transportation')">{{ $t('shippingPlan.shipDispatch') }}</el-button>
      </el-button-group>
    </div>

    <div slot="tab-body" class="tab-body_auto">
      <!--  主页面的table表格  -->
      <zhqc-table
        :data.sync="resp"
        :field-list="tableInfo.fieldList"
        :handle="tableInfo.handle"
        :selectable="selectable"
        @handleClick="handleClick"
        @handleEvent="handleEvent"
      >
        <template v-slot:bt-slotEvent="scope">
          <el-button type="success" :disabled="scope.data.row.dispatchStatus === 4" @click="openRegDialog(scope.data.row)">{{ $t('shippingPlan.appointRegist') }}</el-button>
          <el-button type="danger" :disabled="scope.data.row.dispatchStatus === 4" @click="openRepDialog(scope.data.row)">{{ $t('shippingPlan.abnormalReport') }}</el-button>
        </template>
      </zhqc-table>
    </div>

    <div slot="bottom-page">
      <!--  分页组件   -->
      <zhqc-page
        :bt-list="batchBtnArray"
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
      >
        <template v-slot:form-evidence="">
          <upload-file
            :export-url="exportImgUrl"
            :img-pre-src-list="pictureList"
            :disabled="disabled"
            :accept="accept"
            :show-tips="true"
            @handleImgSuccess="handleImgSuccess"
            @handleRemove="handleRemove"
          />
        </template>
      </zhqc-form>
    </zhqc-dialog>
  </layout-body>
</template>

<script>
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
import { VUE_APP_BASE_URL } from '@/api/api.config.js'
import mixins from './mixins'
export default {
  name: 'ShippingPlan',
  components: {
    UploadFile: () => import('@/Subassembly/upload/upload.vue'),
    ListCarrierName: () => import('@/Subassembly/ZhqcList/ListCarrierNameSc'),
    ListSenderOrReceiver: () => import('@/Subassembly/ZhqcList/ListSenderOrReceiver')
  },
  mixins: [mixins],
  data() {
    return {
      store: 'shippingPlan/',
      modName: 'shippingPlan',
      formType: null,
      viewFlag: null,
      collapsable: false, // 展开收缩
      idsList: [],
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      batchBtnArray: [
        { label: this.$t('shippingPlan.cancelShip'), type: 'danger', icon: '', event: 'cancelShip', btLoading: false, show: true, disabled: true }
      ],
      disabled: false,
      ownerUrl: VUE_APP_WMS_MODEL + '/base/partner/owner/queryOwnerCbList',
      exportImgUrl: VUE_APP_BASE_URL + 'fileMgr/fileManager/upload2Path',
      inOrderUrl: '/base/wh/wh/queryShipperCbList',
      // 收获方 发货方 查询全部
      SRUrl: VUE_APP_WMS_MODEL + '/base/search/customerList',
      accept: null,
      pictureList: [],
      selections: [],
      curRowData: null,
      fileList: [],
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
        this.fileList = []
        this.pictureList = []
        this.evidenceList = []
      }
    }
  },
  methods: {
    selectable(row) {
      return row.dispatchStatus !== 4
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
    },
    selectSender(value, data) {
      this.topForm.data.senderCode = data.whCode
      this.topForm.data.senderName = data.whName
    },
    selectReceiver(value, data) {
      this.topForm.data.receiverCode = data.whCode
      this.topForm.data.receiverName = data.whName
    },
    selectCarrier(value, data) {
      this.topForm.data.carrierCode = data.carrierCode
      this.topForm.data.carrierName = data.carrierName
    }
  }
}
</script>

<style lang="scss">
.page-form .el-form-item.long-row {
  width: 100%;
}
</style>
