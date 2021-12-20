<!--
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-02 16:48:04
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
        <!-- 产品编码 -->
        <template v-slot:form-skuCode="scope">
          <remote-list
            :model="topForm.data"
            select-key="skuCode"
            lable="skuCode"
            parame-code="queryText"
            :list-url="skuCodeUrl"
          >
            <template v-slot="scop">
              <span style="float: left; color: #8492a6; font-size: 13px">{{ scop.item.skuCode }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px;margin-left:30px;">{{ scop.item.skuName }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px;margin-left:30px;">{{ scop.item.ownerName }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px;margin-left:30px;">{{ scop.item.supplierName }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px;margin-left:30px;">{{ scop.item.spec }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px;margin-left:30px;">{{ scop.item.drugForm }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px;margin-left:30px;">{{ scop.item.drugFormSpec }}</span>
            </template>
          </remote-list>
        </template>
        <!--推荐库位-->
        <template v-slot:form-recommLotCode="scope">
          <remote-list
            :model="topForm.data"
            select-key="recommLotCode"
            lable="lotName"
            parame-code="queryText"
            :list-url="lotUrl"
          >
            <template v-slot="scop">
              <span style="float: left; color: #8492a6; font-size: 13px">{{ scop.item.lotCode }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px;margin-left:30px;">{{ scop.item.lotName }}</span>
            </template>
          </remote-list>
        </template>
        <!--推荐库区-->
        <template v-slot:form-recommZone="scope">
          <remote-list
            :model="topForm.data"
            select-key="recommZone"
            lable="zoneName"
            parame-code="queryText"
            :list-url="zoneUrl"
          >
            <template v-slot="scop">
              <span style="float: left; color: #8492a6; font-size: 13px;">{{ scop.item.zoneName }}</span>
            </template>
          </remote-list>
        </template>
        <!--实际库位-->
        <template v-slot:form-downLotCode="scope">
          <remote-list
            :model="topForm.data"
            select-key="downLotCode"
            lable="lotName"
            parame-code="queryText"
            :list-url="lotUrl"
          >
            <template v-slot="scop">
              <span style="float: left; color: #8492a6; font-size: 13px">{{ scop.item.lotCode }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px;margin-left:30px;">{{ scop.item.lotName }}</span>
            </template>
          </remote-list>
        </template>
        <!--实际库区-->
        <template v-slot:form-zoneCode="scope">
          <remote-list
            :model="topForm.data"
            select-key="zoneCode"
            lable="zoneName"
            parame-code="queryText"
            :list-url="zoneUrl"
          >
            <template v-slot="scop">
              <span style="float: left; color: #8492a6; font-size: 13px;">{{ scop.item.zoneName }}</span>
            </template>
          </remote-list>
        </template>
        <!-- <template v-slot:form-recommLotId="scope">
                  <list-wh-lot @select="selectRecommLotId" :selectKey="topForm.data.recommLotId" ></list-wh-lot>
                </template>
                <template v-slot:form-recommZoneId="scope">
                  <list-wh-zone @select="selectRecommZoneId" :selectKey="topForm.data.recommZoneId" ></list-wh-zone>
                </template> -->
        <!-- <template v-slot:form-lotId="scope">
                  <list-wh-lot @select="selectWhLot" :selectKey="topForm.data.downLotId" ></list-wh-lot>
                </template>
                <template v-slot:form-zoneId="scope">
                  <list-wh-zone @select="selectWhZone" :selectKey="topForm.data.zoneId" ></list-wh-zone>
                </template> -->

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
                <el-button type="primary" icon="el-icon-folder-add"  @click="handleClick('openAddPage')"  :disabled="$hasPerm('add')">{{$t('table.add')}}</el-button>
            </el-button-group> -->
      <export-vue
        template-name="invSoldReportService"
        :export-url="exportUrl"
        export-name="库内下架明细报表"
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
import invSoldReportMixins from './mixins'
export default {
  name: 'InvSoldReport',

  mixins: [invSoldReportMixins],
  data() {
    return {
      store: 'invSoldReport/',
      modName: 'invSoldReport',
      collapsable: false, // 展开收缩
      skuCodeUrl: VUE_APP_WMS_MODEL + '/base/sku/sku/querySkuCodeCbList',
      zoneUrl: VUE_APP_WMS_MODEL + '/base/wh/whZone/queryWhZoneCbList',
      lotUrl: VUE_APP_WMS_MODEL + '/base/wh/whLot/queryWhLotCbList',
      exportUrl: VUE_APP_WMS_MODEL + '/rpt/inv/invSoldReport/export',
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
    selectRecommLot(data, obj) {
      this.topForm.data.recommLotCode = obj.lotCode
      // this.topForm.data.recommLotId = obj.lotId;
    },
    selectRecommZone(data, obj) {
      this.topForm.data.recommZone = obj.zoneCode
      this.topForm.data.recommZoneId = obj.id
    },
    selectWhLot(data, obj) {
      this.topForm.data.downLotCode = obj.lotCode
    },
    selectWhZone(data, obj) {
      this.topForm.data.zoneCode = obj.zoneCode
      this.topForm.data.zoneId = obj.id
    }
    // selectSkuCode(data,obj){
    //   this.topForm.data.skuCode = obj.skuCode;
    // },
    // selectRecommLotId(data,obj){
    //   this.topForm.data.recommLotId = obj.lotId;
    // },
    // selectRecommZoneId(data,obj){
    //   this.topForm.data.recommZoneId = obj.zoneId;
    // },
    // selectWhLot(data,obj){
    //   this.topForm.data.downLotId = obj.lotId;
    // },
    // selectWhZone(data,obj){
    //   this.topForm.data.zoneId = obj.zoneId;
    // },
  }
}
</script>
