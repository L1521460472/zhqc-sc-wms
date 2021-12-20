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

        <!-- 货主 -->
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
        <!-- 销售仓 -->
        <template v-slot:form-whAreaId="scope">
          <remote-list-two
            :model="topForm.data"
            :item="scope.item"
            :type="1"
            :list-url="salesStorehouseUrl"
          />
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
      <el-button-group>
        <el-button type="primary" icon="el-icon-folder-add" :disabled="$hasPerm('add')" @click="handleClick('openAddPage')">{{ $t('table.add') }}</el-button>
      </el-button-group>
    </div>

    <div slot="tab-body" class="tab-body_auto">
      <!--  主页面的table表格  -->
      <zhqc-table
        :data.sync="resp"
        :field-list="tableInfo.fieldList"
        :handle="null"
        @handleClick="handleClick"
        @handleEvent="handleSelectionChange"
      >
        <template v-slot:col-status="scope">
          <buttonList
            :row="scope.row"
            @handleClick="handleClick"
          />
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
      <full-pop-item full-pop-item-title="状态调整单">
        <zhqc-form
          :ref-obj.sync="diaFormInfo.ref"
          :form-type="formType"
          :class-name="viewFlag"
          :data="diaFormInfo.data"
          :field-list="diaFormInfo.fieldList"
          :rules="diaFormInfo.rules"
          :list-type-info="listTypeInfo"
          :label-width="diaFormInfo.labelWidth"
        >

          <!-- 货主 -->
          <template v-slot:form-ownerCode="scope">
            <remote-list
              :model="diaFormInfo.data"
              select-key="ownerName"
              lable="ownerName"
              parame-code="ownerCode"
              :list-url="ownerUrl"
              @select="selectOwnerDiaAdd"
            >
              <template v-slot="scop">
                <span style="float: left; color: #8492a6; font-size: 13px;">{{ scop.item.ownerName }}</span>
              </template>
            </remote-list>
          </template>
          <!-- 销售仓 -->
          <template v-slot:form-whAreaId="scope">
            <remote-list-two
              :model="diaFormInfo.data"
              :item="scope.item"
              :type="1"
              :list-url="salesStorehouseUrl"
            />
          </template>
        </zhqc-form>
      </full-pop-item>
      <full-pop-item full-pop-item-title="明细">
        <vex-dia-table
          :ref-obj.sync="diaFormInfo.subTableInfo.ref"
          :data.sync="diaFormInfo.data.dtList"
          :field-list="diaFormInfo.subTableInfo.fieldList"
          :handle="diaFormInfo.subTableInfo.handle"
          :rules="diaFormInfo.subTableInfo.rules"
          :top-btn="diaFormInfo.subTableInfo.topBtn"
          @handleClick="handleClick"
        >
          <!-- 目标状态 -->
          <template v-slot:col-tSkuStatus="scope">
            <remote-list-two
              :model="scope.row"
              :item="scope.item"
              :type="1"
              :list-url="salesStorehouseUrl"
            />
          </template>
          <!-- 耗材货主 -->
          <template v-slot:col-consumeOwnerName="scope">

            <list-remote
              :model="scope.row"
              :item="{value: 'consumeOwnerName',link: 'consumeOwnerId',label:$t('stateAdjustment.dt.consumablesOwner')}"
              :options-props="{value: 'ownerName',label: 'ownerName',link:'id'}"
              :list-url="ownerUrl"
              @select="selectconsumeOwnerDiaAdd"
            >
              <template v-slot="scop">
                <span style="float: left; color: #8492a6; font-size: 13px;">{{ scop.option.ownerName }}</span>
              </template>
            </list-remote>
          </template>
          <!-- 耗材名称 -->
          <template v-slot:col-consumeSkuName="scope">
            <list-remote
              :model="scope.row"
              :item="{value:'consumeSkuName',label:$t('stateAdjustment.dt.consumablesName')}"
              :options-props="{value: 'skuName',label: 'skuName'}"
              :request-style="2"
              :owner-id="scope.row.consumeOwnerId"
              :list-url="consumeUrl"
              @select="selectconsumeSkuDiaAdd"
            >
              <template v-slot="scop">
                <span style="float: left; color: #8492a6; font-size: 13px;">{{ scop.option.skuCode }}</span>
                <span style="float: left; color: #8492a6; font-size: 13px;margin-left: 20px;">{{ scop.option.skuName }}</span>
              </template>
            </list-remote>
          </template>

          <!-- 目标库位 -->
          <template v-slot:col-tLotCode="scope">
            <ListAutocomplete
              :type="'stateAdjustment'"
              :item="{label:$t('stateAdjustment.dt.targetLotCode')}"
              :model="scope.row"
            />
          </template>
        </vex-dia-table>
      </full-pop-item>
    </full-pop>

    <!--在库产品-->
    <full-pop
      :visible.sync="dialogInfoInv.visible"
      :top-title="dialogInfoInv.title"
      :close-btn="dialogInfoInv.closeBtn"
      :save-list="dialogInfoInv.btList"
      @handleClick="handleClick"
    >
      <zhqc-top-form
        :ref-obj.sync="dialogInfoInv.topFormInv.ref"
        :data="dialogInfoInv.topFormInv.data"
        :field-list="dialogInfoInv.topFormInv.fieldList"
        :rules="dialogInfoInv.topFormInv.rules"
        :list-type-info="listTypeInfo"
        :label-width="dialogInfoInv.topFormInv.labelWidth"
        @handleClick="handleClick"
        @handleEvent="handleEvent"
      >
        <template v-slot:form-zoneId="scope">
          <list-wh-zone :select-key="dialogInfoInv.topFormInv.data.zoneId" @select="InvTopSelectZone" />
        </template>
        <template v-slot:form-lotId="scope">
          <list-wh-lot :select-key="dialogInfoInv.topFormInv.data.lotId" @select="InvTopSelectLot" />
        </template>
      </zhqc-top-form>

      <div>
        <!--  主页面的table表格  -->
        <zhqc-table
          :data.sync="InStockProPageResp"
          :field-list="dialogInfoInv.tableInfoInv.fieldList"
          :handle="dialogInfoInv.tableInfoInv.handle"
          @handleClick="handleClick"
          @handleEvent="handleEvent"
        />
      </div>
      <div>
        <zhqc-page
          :total="InStockProTotal"
          :page-request="pageInStockProRequest"
          @pageChange="pageInStockProChange"
        />
      </div>
    </full-pop>
    <zhqc-dialog
      :title="dialogAudit.title"
      :visible.sync="dialogAudit.visible"
      :close-btn="dialogAudit.closeBtn"
      :bt-list="dialogAudit.btList"
      width="40%"
      @handleClick="handleClick"
    >
      <el-form ref="auditForm" :model="auditFormInfo.data" :rules="auditFormInfo.rules" class="audit-form" label-width="70px">
        <el-form-item label="审核：" prop="adjStatus">
          <el-radio-group v-model="auditFormInfo.data.adjStatus" @change="auditChange">
            <el-radio label="SUCCESS">审核通过</el-radio>
            <el-radio label="FAIL">审核不通过</el-radio>
          </el-radio-group>

        </el-form-item>
        <el-form-item label="原因：" prop="auditReason">
          <el-input
            v-model="auditFormInfo.data.auditReason"
            type="textarea"
            :rows="2"
            placeholder="请输入原因"
          />
        </el-form-item>
      </el-form>

    </zhqc-dialog>
  </layout-body>
</template>

<script>
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
import { VUE_APP_BASE_URL } from '@/api/api.config.js'
import inventoryMixins from './mixins'
import buttonList from './components/buttonList'

import listWhZone from '@/Subassembly/ZhqcList/ListWhZone'
import listWhLot from '@/Subassembly/ZhqcList/ListWhLot'
import ListAutocomplete from '@/Subassembly/ZhqcList/ListAutocomplete'
export default {
  name: 'BatchAdjustment',
  components: {
    buttonList, listWhZone, listWhLot, ListAutocomplete
  },
  mixins: [inventoryMixins],
  data() {
    return {
      store: 'stateAdjustment/',
      modName: 'stateAdjustment',
      collapsable: false, // 展开收缩
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      pageInStockProRequest: { limit: this.$globalLimit, page: this.$globalPage },
      formType: null,
      viewFlag: null,
      exportUrl: VUE_APP_WMS_MODEL + '/pd/stateAdjustment/export',
      ownerUrl: VUE_APP_WMS_MODEL + '/base/partner/owner/queryOwnerCbList',
      salesStorehouseUrl: VUE_APP_WMS_MODEL + '/base/wh/whArea/queryVirtualwhList',
      exportImgUrl: VUE_APP_BASE_URL + 'fileMgr/fileManager/upload2Path',
      consumeUrl: VUE_APP_WMS_MODEL + '/base/sku/sku/querySkuCbList',
      dialogInfo: {
        title: '',
        visible: false,
        type: '',
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', btLoading: false, show: true }]
      },
      dialogAudit: {
        title: '',
        visible: false,
        type: '',
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', btLoading: false, show: true }]
      }
    }
  },
  computed: {
    resp() {
      return this.$store.state[this.modName].pageResp
    },
    total() { return this.$store.state[this.modName].total },
    InStockProPageResp() { return this.$store.state[this.modName].InStockProPageResp },
    InStockProTotal() { return this.$store.state[this.modName].InStockProTotal }

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
    // selectOwnerDia(data) {
    //   this.topForm.data.ownerId = data
    // },
    auditChange(value) {
      this.auditRlus(value)
    },
    auditRlus(value) {
      const temp = (value === 'SUCCESS')
      this.auditFormInfo.rules = {
        auditReason: [{ required: !temp, message: this.$t('batchAdjustment.msg.auditReason'), trigger: 'blur' }]
      }
    },
    selectOwnerDiaAdd(data, { id, ownerCode, ownerName }) {
      this.$set(this.diaFormInfo.data, 'ownerId', id)
      this.$set(this.diaFormInfo.data, 'ownerCode', ownerCode)
      this.$set(this.diaFormInfo.data, 'ownerName', ownerName)
    },
    selectconsumeOwnerDiaAdd(data, row, val) {
      val.consumeOwnerCode = row.ownerCode
      // val.consumeOwnerName = row.ownerName
    },
    selectconsumeSkuDiaAdd(data, row, val) {
      // val.consumeSkuName = data
      val.consumeSkuCode = row.skuCode
    },

    InvTopSelectZone(data) {
      this.dialogInfoInv.topFormInv.data.zoneId = data
    },
    InvTopSelectLot(data) {
      this.dialogInfoInv.topFormInv.data.lotId = data
    }
  }
}
</script>
<style lang="scss" scoped>
.page-form /deep/ .item-image{
  display: block;
}
</style>
