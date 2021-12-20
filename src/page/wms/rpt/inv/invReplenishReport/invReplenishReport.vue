<!--
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-02 16:47:36
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
            <template v-slot="s">
              <span style="float: left; color: #8492a6; font-size: 13px">{{ s.item.skuCode }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px;margin-left:30px;">{{ s.item.skuName }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px;margin-left:30px;">{{ s.item.ownerName }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px;margin-left:30px;">{{ s.item.supplierName }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px;margin-left:30px;">{{ s.item.spec }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px;margin-left:30px;">{{ s.item.drugForm }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px;margin-left:30px;">{{ s.item.drugFormSpec }}</span>
            </template>
          </remote-list>
        </template>
        <!-- 货主 -->
        <template v-slot:form-ownerId="scope">
          <remote-list
            :model="topForm.data"
            select-key="ownerId"
            lable="ownerName"
            parame-code="ownerCode"
            :list-url="ownerUrl"
          >
            <template v-slot="s">
              <span style="float: left; color: #8492a6; font-size: 13px;">{{ s.item.ownerName }}</span>
            </template>
          </remote-list>
        </template>
        <!--来源库位-->
        <template v-slot:form-fmLotCode="scope">
          <remote-list
            :model="topForm.data"
            select-key="fmLotCode"
            lable="lotName"
            parame-code="queryText"
            :list-url="lotUrl"
          >
            <template v-slot="s">
              <span style="float: left; color: #8492a6; font-size: 13px">{{ s.item.lotCode }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px;margin-left:30px;">{{ s.item.lotName }}</span>
            </template>
          </remote-list>
        </template>
        <!--来源库区-->
        <template v-slot:form-recommZone="scope">
          <remote-list
            :model="topForm.data"
            select-key="recommZone"
            lable="zoneName"
            parame-code="queryText"
            :list-url="zoneUrl"
          >
            <template v-slot="s">
              <span style="float: left; color: #8492a6; font-size: 13px;">{{ s.item.zoneName }}</span>
            </template>
          </remote-list>
        </template>
        <!--目的库位-->
        <template v-slot:form-toLotCode="scope">
          <remote-list
            :model="topForm.data"
            select-key="toLotCode"
            lable="lotName"
            parame-code="queryText"
            :list-url="lotUrl"
          >
            <template v-slot="s">
              <span style="float: left; color: #8492a6; font-size: 13px">{{ s.item.lotCode }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px;margin-left:30px;">{{ s.item.lotName }}</span>
            </template>
          </remote-list>
        </template>
        <!--目的库区-->
        <template v-slot:form-zoneCode="scope">
          <remote-list
            :model="topForm.data"
            select-key="zoneCode"
            lable="zoneName"
            parame-code="queryText"
            :list-url="zoneUrl"
          >
            <template v-slot="s">
              <span style="float: left; color: #8492a6; font-size: 13px;">{{ s.item.zoneName }}</span>
            </template>
          </remote-list>
        </template>

        <!-- <template v-slot:form-fmLotId="scope">
                    <list-wh-lot @select="selectRecommLotId" :selectKey="topForm.data.fmLotId" ></list-wh-lot>
                  </template> -->
        <!-- <template v-slot:form-recommZoneId="scope">
                    <list-wh-zone @select="selectRecommZoneId" :selectKey="topForm.data.recommZoneId" ></list-wh-zone>
                  </template>
                  <template v-slot:form-toLotId="scope">
                    <list-wh-lot @select="selectWhLot" :selectKey="topForm.data.toLotId" ></list-wh-lot>
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
        template-name="invReplenishReportService"
        :export-url="exportUrl"
        export-name="补货明细报表"
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
import invReplenishReportMixins from './mixins'

export default {
  name: 'InvReplenishReport',
  mixins: [invReplenishReportMixins],
  data() {
    return {
      store: 'invReplenishReport/',
      modName: 'invReplenishReport',
      collapsable: false, // 展开收缩
      ownerUrl: VUE_APP_WMS_MODEL + '/base/partner/owner/queryOwnerCbList',
      skuCodeUrl: VUE_APP_WMS_MODEL + '/base/sku/sku/querySkuCodeCbList',
      zoneUrl: VUE_APP_WMS_MODEL + '/base/wh/whZone/queryWhZoneCbList',
      lotUrl: VUE_APP_WMS_MODEL + '/base/wh/whLot/queryWhLotCbList',
      exportUrl: VUE_APP_WMS_MODEL + '/rpt/inv/invReplenishReport/export',
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
      // this.topForm.data.ownerCode = obj.ownerCode;
      this.topForm.data.ownerId = obj.id
    },
    selectRecommLot(data, obj) {
      this.topForm.data.fmLotCode = obj.lotCode
      // this.topForm.data.recommLotId = obj.lotId;
    },
    selectRecommZone(data, obj) {
      this.topForm.data.recommZone = obj.zoneCode
      this.topForm.data.recommZoneId = obj.id
    },
    selectWhLot(data, obj) {
      this.topForm.data.toLotCode = obj.lotCode
    },
    selectWhZone(data, obj) {
      this.topForm.data.zoneCode = obj.zoneCode
      this.topForm.data.zoneId = obj.id
    }
    // selectRecommLot(data,obj){
    //   this.topForm.data.fmLotId = obj.lotId;
    // },
    // selectRecommZoneId(data,obj){
    //   this.topForm.data.recommZoneId = obj.zoneId;
    // },
    // selectWhLot(data,obj){
    //   this.topForm.data.toLotId = obj.lotId;
    // },
    // selectWhZone(data,obj){
    //   this.topForm.data.zoneId = obj.zoneId;
    // },
  }
}
</script>
