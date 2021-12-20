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

        <template slot="form-skuCode" :slot-scope="scope">
          <list-skuCode :select-key="topForm.data.skuCode" @select="selectSkuCode" />
        </template>
        <template v-slot:form-ownerId="scope">
          <list-owner :select-key="topForm.data.ownerId" @select="selectOwnerCode" />
        </template>

        <template v-slot:form-fmZoneCode="scope">
          <list-fm-zone-code :select-key="topForm.data.fmZoneId" @select="selectFmZoneCode" />
        </template>
        <template v-slot:form-fmLotCode="scope">
          <list-fm-lot-code :select-key="topForm.data.fmLotCode" @select="selectFmLotCode" />
        </template>

        <template v-slot:form-toZoneCode="scope">
          <list-to-zone-code :select-key="topForm.data.toZoneId" @select="selectToZoneCode" />
        </template>
        <template v-slot:form-toLotCode="scope">
          <list-to-lot-code :select-key="topForm.data.toLotCode" @select="selectToLotCode" />
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
      <!-- <el-button-group>
                <el-button icon="el-icon-folder-add"  @click="handleClick('openAddPage')"  :disabled="$hasPerm('add')">{{$t('table.add')}}</el-button>
            </el-button-group> -->
      <export-vue
        template-name="invMoveReportService"
        :export-url="exportUrl"
        export-name="移库记录报表"
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
    <!--増、查、改的表单-->
    <zhqc-dialog
      :title="dialogInfo.title"
      :visible.sync="dialogInfo.visible"
      :width="dialogInfo.width"
      :bt-list="dialogInfo.btList"
      @handleClick="handleClick"
    >
      <zhqc-form
        :ref-obj.sync="diaFormInfo.ref"
        :data="diaFormInfo.data"
        :field-list="diaFormInfo.fieldList"
        :rules="diaFormInfo.rules"
        :list-type-info="listTypeInfo"
        :label-width="diaFormInfo.labelWidth"
      />
    </zhqc-dialog>
  </layout-body>
</template>

<script>
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
import invMoveReportMixins from './mixins'

import listSkuCode from '@/Subassembly/ZhqcList/ListSkuCode'
import listOwner from '@/Subassembly/ZhqcList/ListOwner'
import listFmZoneCode from '@/Subassembly/ZhqcList/ListWhZone'
import listFmLotCode from '@/Subassembly/ZhqcList/ListWhLotCode'

import listToZoneCode from '@/Subassembly/ZhqcList/ListWhZone'
import listToLotCode from '@/Subassembly/ZhqcList/ListWhLotCode'

export default {
  name: 'InvMoveReport',
  components: {
    listSkuCode, listOwner, listFmZoneCode, listFmLotCode, listToZoneCode, listToLotCode
  },
  mixins: [invMoveReportMixins],
  data() {
    return {
      store: 'invMoveReport/',
      modName: 'invMoveReport',
      collapsable: false, // 展开收缩
      exportUrl: VUE_APP_WMS_MODEL + '/rpt/inv/invMoveReport/export',
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      dialogInfo: {
        title: '',
        visible: false,
        type: '',
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', btLoading: false, show: true }]
      }
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
    selectSkuCode(data, obj) {
      this.topForm.data.skuCode = obj.skuCode
    },
    selectOwnerCode(data, obj) {
      this.topForm.data.ownerCode = obj.ownerCode
      this.topForm.data.ownerId = obj.id
    },
    selectFmZoneCode(data, obj) {
      this.topForm.data.fmZoneCode = obj.zoneCode
      this.topForm.data.fmZoneId = obj.id
    },
    selectFmLotCode(data, obj) {
      this.topForm.data.fmLotCode = obj.lotCode
    },
    selectToZoneCode(data, obj) {
      this.topForm.data.toZoneCode = obj.zoneCode
      this.topForm.data.toZoneId = obj.id
    },
    selectToLotCode(data, obj) {
      this.topForm.data.toLotCode = obj.lotCode
    }

  }
}
</script>
