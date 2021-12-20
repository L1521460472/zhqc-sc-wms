<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
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
        <template v-slot:form-ownerId="scope">
          <list-owner :select-key="topForm.data.ownerId" @select="selectOwner" />
        </template>
        <template v-slot:form-skuId="scope">
          <list-sku :select-key="topForm.data.skuId" @select="selectSku" />
        </template>
        <template v-slot:form-lotId="scope">
          <list-wh-lot :select-key="topForm.data.lotId" @select="selectWhLot" />
        </template>
        <template v-slot:form-zoneId="scope">
          <list-wh-zone :select-key="topForm.data.zoneId" @select="selectWhZone" />
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
      <export-vue
        template-name="abcRestrictRptService"
        :export-url="exportUrl"
        export-name="ABC限制报表"
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
        :form-type="dialogInfo.type"
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
import abcRestrictRptMixins from './mixins'
import listOwner from '@/Subassembly/ZhqcList/ListOwner'
import listSku from '@/Subassembly/ZhqcList/ListSku'
import listWhLot from '@/Subassembly/ZhqcList/ListWhLot'
import listWhZone from '@/Subassembly/ZhqcList/ListWhZone'
export default {
  name: 'AbcRestrictRpt',
  components: {
    listOwner, listSku, listWhLot, listWhZone
  },
  mixins: [abcRestrictRptMixins],
  data() {
    return {
      store: 'abcRestrictRpt/',
      modName: 'abcRestrictRpt',
      collapsable: false, // 展开收缩
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      dialogInfo: {
        title: '',
        visible: false,
        type: '',
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', btLoading: false, show: true }]
      },
      exportUrl: VUE_APP_WMS_MODEL + '/invCapacity/abcRestrictRpt/export'
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
    selectOwner(data, obj) {
      this.topForm.data.ownerId = obj.id
    },
    selectSku(data, obj) {
      this.topForm.data.skuId = obj.id
    },
    selectSkuCategory(data, obj) {
      this.topForm.data.skuCategoryId = obj.id
    },
    selectSupplier(data, obj) {
      this.topForm.data.supplierId = obj.id
    },

    selectWhLot(data, obj) {
      this.topForm.data.lotId = obj.id
    },
    selectWhZone(data, obj) {
      this.topForm.data.zoneId = obj.id
    }
  }
}
</script>
