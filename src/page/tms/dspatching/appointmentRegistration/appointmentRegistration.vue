<!--
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-02 10:43:11
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
      </zhqc-top-form>
    </div>

    <div slot="left-btn">
      <el-button-group>
        <el-button type="primary" icon="el-icon-folder-add" :disabled="false" @click="handleClick('openAddPage')">{{ $t('table.add') }}</el-button>
      </el-button-group>
    </div>

    <div slot="tab-body" class="tab-body_auto">
      <!--  主页面的table表格  -->
      <zhqc-table
        :data.sync="resp"
        :field-list="tableInfo.fieldList"
        :handle="tableInfo.handle"
        :height="tabHeight"
        :content-height="contentHeight"
        @handleClick="handleClick"
      >
        <template v-slot:bt-slotEvent="scope">
          <el-button size="mini" type="primary" :disabled="false" @click="openViewPage(scope.data.row)">{{ $t('table.view') }}</el-button>
          <el-button size="mini" type="success" :disabled="false" @click="openEditPage(scope.data.row)">{{ $t('table.edit') }}</el-button>
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
        :class-name="dialogInfo.viewFlag"
        @handleEvent="handleEvent"
      >
        <template v-slot:form-img="">
          <div v-if="dialogInfo.type === 'view'" style="width:100%;">
            <template v-for="(item, index) in getSrcList">
              <el-image
                :key="index"
                :src="item"
                :z-index="3000"
                :preview-src-list="getSrcList"
                style="margin-right: 6px; height: 100px;"
              />
            </template>
          </div>
          <upload-file
            v-else
            :export-url="exportImgUrl"
            :img-pre-src-list="pictureList"
            :disabled="disabled"
            :show-tips="true"
            :accept="[{ type: 'img', limit: 3 }]"
            @handleImgSuccess="handleImg"
            @handleRemove="handleImg"
          />
        </template>
      </zhqc-form>
    </zhqc-dialog>
  </layout-body>
</template>

<script>
import { VUE_APP_BASE_URL } from '@/api/api.config.js'
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
import preSchedulingStrategyMixins from './mixins'
export default {
  name: 'AppointmentRegistration',
  components: {
    UploadFile: () => import('@/Subassembly/upload/upload.vue'),
    ListCarrierName: () => import('@/Subassembly/ZhqcList/ListCarrierNameSc'),
    ListSenderOrReceiver: () => import('@/Subassembly/ZhqcList/ListSenderOrReceiver')
  },
  mixins: [preSchedulingStrategyMixins],
  data() {
    return {
      store: 'appointmentRegistration/',
      modName: 'appointmentRegistration',
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      collapsable: false, // 展开收缩
      disabled: false,
      onlyImg: true,
      exportImgUrl: VUE_APP_BASE_URL + 'fileMgr/fileManager/upload2Path',
      ownerUrl: VUE_APP_WMS_MODEL + '/base/partner/owner/queryOwnerCbList',
      // 收获方 发货方 查询全部
      SRUrl: VUE_APP_WMS_MODEL + '/base/search/customerList',
      inOrderUrl: '/base/wh/wh/queryShipperCbList',
      rowData: {},
      pictureList: [],
      evidenceList: []
    }
  },
  computed: {
    resp() {
      return this.$store.state[this.modName].pageResp
    },
    total() {
      return this.$store.state[this.modName].total
    },
    getSrcList() {
      return this.rowData.evidenceImage && this.rowData.evidenceImage.split(',') || []
    }
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
        this.pictureList = []
        this.evidenceList = []
      }
    }
  },
  methods: {
    handleImg(list) {
      this.evidenceList = list.map(item => ({ type: 1, path: item }))
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
.el-form-item.long-row {
  width: 100%;
}
</style>
