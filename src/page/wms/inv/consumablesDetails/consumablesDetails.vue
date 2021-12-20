<!--
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-12 20:44:32
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
        <!--销售仓 -->
        <template v-slot:form-whAreaId="scope">
          <remote-list-two
            :model="topForm.data"
            :item="scope.item"
            :list-url="whAreaUrl"
            :type="1"
          />
        </template>
        <!-- 使用货主 -->
        <template v-slot:form-ownerCode="scope">
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

        <!-- 耗材货主 -->
        <template v-slot:form-consumeOwnerCode="scope">
          <list-remote
            :model="topForm.data"
            :item="scope.item"
            :options-props="{
              value: 'ownerCode',
              label: 'ownerName'
            }"
            :list-url="ownerUrl"
          >
            <template v-slot="scop">
              <span style="float: left; color: #8492a6; font-size: 13px;">{{ scop.option.ownerName }}</span>
            </template>
          </list-remote>
        </template>

        <!-- 耗材名称 -->
        <template v-slot:form-consumeSkuName="scope">
          <list-remote
            :model="topForm.data"
            :item="scope.item"
            :options-props="{
              value: 'skuName',
              label: 'skuName'
            }"
            :request-style="2"
            :owner-id="topForm.data.ownerId"
            :list-url="consumeUrl"
          >
            <template v-slot="scop">
              <span style="float: left; color: #8492a6; font-size: 13px;">{{ scop.option.skuCode }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px;margin-left: 20px;">{{ scop.option.skuName }}</span>
            </template>
          </list-remote>
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
        template-name="inventoryConsumeLogService"
        :export-url="exportUrl"
        export-name="库存明细"
        @exportParam="exportData"
      />
      <span class="consum-total">
        合计： {{ consumeSkuTotalQty }}
      </span>
    </div>

    <div slot="tab-body" class="tab-body_auto">
      <!--  主页面的table表格  -->
      <zhqc-table
        :data.sync="resp"
        :field-list="tableInfo.fieldList"
        :handle="tableInfo.handle"
        :show-summary="true"
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

  </layout-body>
</template>

<script>
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
import consumablesDetailsMixins from './mixins'
export default {
  name: 'ConsumablesDetails',
  components: {
  },
  mixins: [consumablesDetailsMixins],
  data() {
    return {
      store: 'consumablesDetails/',
      modName: 'consumablesDetails',
      collapsable: false, // 展开收缩
      consumeSkuTotalQty: '',
      zoneUrl: VUE_APP_WMS_MODEL + '/base/wh/whZone/queryWhZoneCbList',
      lotUrl: VUE_APP_WMS_MODEL + '/base/wh/whLot/queryWhLotCbList',
      ownerUrl: VUE_APP_WMS_MODEL + '/base/partner/owner/queryOwnerCbList',
      skuCategoryUrl: VUE_APP_WMS_MODEL + '/base/sku/skuCategory/queryCbList',
      skuUrl: VUE_APP_WMS_MODEL + '/base/sku/sku/querySkuCbList',
      whAreaUrl: VUE_APP_WMS_MODEL + '/base/wh/whArea/queryVirtualwhList',
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      exportUrl: VUE_APP_WMS_MODEL + '/inv/inventoryConsumeLog/export',
      consumeUrl: VUE_APP_WMS_MODEL + '/base/sku/sku/querySkuCbList'
    }
  },
  computed: {
    resp() {
      return this.$store.state[this.modName].pageResp
    },
    total() { return this.$store.state[this.modName].total }
  },
  watch: {
    // 展开收缩
    collapsable(val) {
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
<style lang="scss" scoped>

.link {
  cursor: pointer;
  color: #409EFF;
  &:hover {
    text-decoration: underline;
  }
}
.consum-total{
  font-size:14px;
  margin-left:10px;
  color:red;
}

</style>
