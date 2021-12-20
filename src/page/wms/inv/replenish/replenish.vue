<!--
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-02 15:55:07
-->
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
        <!--货主-->
        <!--<template v-slot:form-ownerId="scope">-->
        <!--<list-owner @select="selectOwner" :selectKey="topForm.data.ownerId" ></list-owner>-->
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
        <!--库区-->
        <!--<template v-slot:form-zoneId="scope">-->
        <!--<list-wh-zone @select="selectWhzone" :selectKey="topForm.data.zoneId" ></list-wh-zone>-->
        <!--</template>-->
        <!--库区-->
        <template v-slot:form-zoneId="scope">
          <remote-list
            :model="topForm.data"
            select-key="zoneId"
            lable="zoneName"
            parame-code="queryText"
            :list-url="zoneUrl"
          >
            <template v-slot="scop">
              <span style="float: left; color: #8492a6; font-size: 13px;">{{ scop.item.zoneName }}</span>
            </template>
          </remote-list>
        </template>

        <!-- 库位 -->
        <!--<template v-slot:form-lotId="scope">-->
        <!--<list-wh-lot @select="selectWhLot" :selectKey="topForm.data.lotId" ></list-wh-lot>-->
        <!--</template>-->
        <!--库位-->
        <template v-slot:form-lotId="scope">
          <remote-list
            :model="topForm.data"
            select-key="lotId"
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
        <!-- 产品编码-->
        <!--<template v-slot:form-skuId="scope">-->
        <!--<list-sku @select="selectSku" :selectKey="topForm.data.skuId" ></list-sku>-->
        <!--</template>-->
        <!-- 产品编码 -->
        <template v-slot:form-skuId="scope">
          <remote-list
            :model="topForm.data"
            select-key="skuId"
            lable="skuCode"
            parame-code="queryText"
            :list-url="skuUrl"
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
        template-name="replenishService"
        export-url="inv/replenish/export"
        export-name="补货单"
        @exportParam="exportData"
      />

      <el-button-group>
        <el-button type="primary" icon="el-icon-s-order" :disabled="$hasPerm('audit')" @click="handleClick('batchAudit')">批量审核</el-button>
      </el-button-group>
          &nbsp;&nbsp;
      <el-button-group>
        <el-button type="danger" icon="el-icon-s-release" :disabled="$hasPerm('cancelAudit')" @click="handleClick('batchCancelAudit')">批量取消审核</el-button>
      </el-button-group>
          &nbsp;&nbsp;
      <el-button-group>
        <el-button type="primary" icon="el-icon-delete-solid" :disabled="$hasPerm('cancel')" @click="handleClick('batchCancel')">批量取消</el-button>
      </el-button-group>
          &nbsp;&nbsp;
      <!--<el-button-group>-->
      <!--<el-button type="danger"  @click="handleClick('batchFreedCancel')"  :disabled="$hasPerm('freedCancel')">批量解除取消</el-button>-->
      <!--</el-button-group>-->

    </div>

    <div slot="tab-body" class="tab-body_auto">
      <!--  主页面的table表格  -->
      <zhqc-table
        :data.sync="resp"
        :field-list="tableInfo.fieldList"
        :handle="tableInfo.handle"
        @handleClick="handleClick"
        @handleEvent="handleSelectionChange"
      >
        <template v-slot:bt-slotEvent="scope">
          <el-button v-show="scope.data.row.replenishStatus == 'NEW'" size="mini" type="success" :disabled="$hasPerm('audit')" @click="audit(scope.data.row)">审核</el-button>
          <el-button v-show="scope.data.row.replenishStatus == 'NEW'" size="mini" type="danger" :disabled="$hasPerm('cancel')" @click="cancel(scope.data.row)">取消</el-button>
          <el-button v-show="scope.data.row.replenishStatus == 'EXECUTING'" size="mini" type="danger" :disabled="$hasPerm('close')" @click="closeReplenish(scope.data.row)">关闭</el-button>
          <el-button v-show="scope.data.row.replenishStatus == 'AUDIT'" size="mini" type="warning" :disabled="$hasPerm('cancelAudit')" @click="cancelAudit(scope.data.row)">取消审核</el-button>
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
      <full-pop-item full-pop-item-title="补货单">
        <zhqc-form
          :ref-obj.sync="diaFormInfo.ref"
          :form-type="formType"
          :class-name="viewFlag"
          :data="diaFormInfo.data"
          :field-list="diaFormInfo.fieldList"
          :rules="diaFormInfo.rules"
          :list-type-info="listTypeInfo"
          :label-width="diaFormInfo.labelWidth"
        />
      </full-pop-item>
      <full-pop-item full-pop-item-title="补货明细">
        <vex-dia-table
          :ref-obj.sync="diaFormInfo.subTableInfo.ref"
          :data="diaFormInfo.data.dtList"
          :field-list="diaFormInfo.subTableInfo.fieldList"
          :handle="diaFormInfo.subTableInfo.handle"
          :rules="diaFormInfo.subTableInfo.rules"
          :top-btn="diaFormInfo.subTableInfo.topBtn"
          @handleClick="handleClick"
        />
      </full-pop-item>
    </full-pop>

  </layout-body>
</template>

<script>
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
import replenishMixins from './mixins'

export default {
  name: 'Replenish',
  mixins: [replenishMixins],
  data() {
    return {
      store: 'replenish/',
      modName: 'replenish',
      collapsable: false,
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      formType: null,
      viewFlag: null,
      lotUrl: VUE_APP_WMS_MODEL + '/base/wh/whLot/queryWhLotCbList',
      ownerUrl: VUE_APP_WMS_MODEL + '/base/partner/owner/queryOwnerCbList',
      zoneUrl: VUE_APP_WMS_MODEL + '/base/wh/whZone/queryWhZoneCbList',
      skuUrl: VUE_APP_WMS_MODEL + '/base/sku/sku/querySkuCbList',
      dialogInfo: {
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
    selectOwner(data) {
      this.topForm.data.ownerId = data
    },
    selectWhzone(data) {
      this.topForm.data.zoneId = data
    },
    selectWhLot(data) {
      this.topForm.data.lotId = data
    },
    selectSku(data) {
      this.topForm.data.skuId = data
    }
  }
}
</script>
