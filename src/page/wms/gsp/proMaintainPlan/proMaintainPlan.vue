<!--
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-02 15:18:19
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
            <template v-slot="s">
              <span style="float: left; color: #8492a6; font-size: 13px;">{{ s.item.ownerName }}</span>
            </template>
          </remote-list>
        </template>
        <!--<template v-slot:form-lotId="scope">-->
        <!--<list-wh-lot-cascade @select="selectWhLot" :selectKey="topForm.data.lotId" :zoneId="topZoneId"></list-wh-lot-cascade>-->
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
            <template v-slot="s">
              <span style="float: left; color: #8492a6; font-size: 13px">{{ s.item.lotCode }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px;margin-left:30px;">{{ scope.item.lotName }}</span>
            </template>
          </remote-list>
        </template>
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
            <template v-slot="s">
              <span style="float: left; color: #8492a6; font-size: 13px;">{{ s.item.zoneName }}</span>
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
      <el-button-group>
        <el-button type="primary" icon="el-icon-folder-add" :disabled="$hasPerm('add')" @click="handleClick('openAddPage')">{{ $t('table.add') }}</el-button>
      </el-button-group>
      <export-vue
        template-name="proMaintainPlanService"
        export-url="gsp/proMaintainPlan/export"
        export-name="表注释缺失,请按规范填写"
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
    <full-pop
      :visible.sync="dialogInfo.visible"
      :top-title="dialogInfo.title"
      :close-btn="dialogInfo.closeBtn"
      :save-list="dialogInfo.btList"
      @handleClick="handleClick"
    >
      <full-pop-item full-pop-item-title="产品养护计划">
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
            <list-owner :select-key="diaFormInfo.data.ownerId" @select="diaSelectOwner" />
          </template>
          <template v-slot:form-zoneId="scope">
            <list-wh-zone :select-key="diaFormInfo.data.zoneId" @select="diaSelectWhzone" />
          </template>
          <!--            <template v-slot:form-id="scope">-->
          <!--              <list-maintain-user @select="diaSelectmaintainUser" :selectKey="diaFormInfo.data.id" ></list-maintain-user>-->
          <!--            </template>-->
        </zhqc-form>
      </full-pop-item>
      <full-pop-item full-pop-item-title="养护明细">
        <vex-dia-table
          :ref-obj.sync="diaFormInfo.subTableInfo.ref"
          :data.sync="diaFormInfo.data.dtList"
          :field-list="diaFormInfo.subTableInfo.fieldList"
          :handle="diaFormInfo.subTableInfo.handle"
          :rules="diaFormInfo.subTableInfo.rules"
          :top-btn="diaFormInfo.subTableInfo.topBtn"
          :height="300"
          @handleClick="handleClick"
        />
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
        <template v-slot:form-lotId="scope">
          <list-wh-lot-cascade :zone-id="zoneId" @select="InvTopSelectLot" />
        </template>
        <template v-slot:form-skuId="scope">
          <list-sku :select-key="dialogInfoInv.topFormInv.data.skuId" @select="selectSkuInv" />
        </template>
      </zhqc-top-form>
      <div>
        <!--  主页面的table表格  -->
        <zhqc-table
          :data.sync="inStockPageResp"
          :field-list="dialogInfoInv.tableInfoInv.fieldList"
          :handle="dialogInfoInv.tableInfoInv.handle"
          :fixed-height="350"
          @handleClick="handleClick"
          @handleEvent="handleEvent"
        />
      </div>
      <div>
        <zhqc-page
          :total="inStocktotal"
          :page-request="pageInStockProRequest"
          @pageChange="pageInStockProChange"
        />
      </div>
    </full-pop>
  </layout-body>
</template>

<script>
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
import proMaintainPlanMixins from './mixins'
import listOwner from '@/Subassembly/ZhqcList/ListOwner'
import listWhLotCascade from '@/Subassembly/ZhqcList/ListWhLotCascade'
import listWhZone from '@/Subassembly/ZhqcList/ListWhZone'
import listSku from '@/Subassembly/ZhqcList/ListSku'

export default {
  name: 'ProMaintainPlan',
  components: {
    listOwner,
    listWhLotCascade,
    listWhZone,
    listSku
  },
  mixins: [proMaintainPlanMixins],
  data() {
    return {
      store: 'proMaintainPlan/',
      modName: 'proMaintainPlan',
      collapsable: false, // 展开收缩
      formType: null,
      viewFlag: null,
      lotUrl: VUE_APP_WMS_MODEL + '/base/wh/whLot/queryWhLotCbList',
      ownerUrl: VUE_APP_WMS_MODEL + '/base/partner/owner/queryOwnerCbList',
      zoneUrl: VUE_APP_WMS_MODEL + '/base/wh/whZone/queryWhZoneCbList',
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      pageInStockProRequest: { limit: this.$globalLimit, page: this.$globalPage },
      dialogInfo: {
        title: '',
        visible: false,
        type: '',
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', btLoading: false, show: true }]
      },
      topZoneId: null,
      zoneId: null
    }
  },
  computed: {
    resp() { return this.$store.state[this.modName].pageResp },
    total() { return this.$store.state[this.modName].total },
    inStockPageResp() { return this.$store.state[this.modName].inStockPageResp },
    inStocktotal() { return this.$store.state[this.modName].inStocktotal }
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
    selectOwner(data) {
      this.topForm.data.ownerId = data
    },
    selectWhzone(data) {
      this.topForm.data.zoneId = data
      this.topZoneId = data
      this.topForm.data.lotId = null
    },
    selectWhLot(data, obj) {
      this.topForm.data.lotId = data
      this.topForm.data.lotCode = obj.lotCode
    },

    // 货主
    diaSelectOwner(data, obj) {
      this.$set(this.diaFormInfo.data, 'dtList', [])
      this.inStockProList = []
      this.distinctList = []

      this.diaFormInfo.data.ownerId = data

      this.dialogInfoInv.topFormInv.data.ownerName = obj.ownerName
    },

    // 库区
    diaSelectWhzone(data, obj) {
      this.$set(this.diaFormInfo.data, 'dtList', [])
      this.inStockProList = []
      this.distinctList = []

      this.diaFormInfo.data.zoneId = data

      this.dialogInfoInv.topFormInv.data.zoneName = obj.zoneName
    },

    InvTopSelectLot(data) {
      this.dialogInfoInv.topFormInv.data.lotId = data
    },
    // 产品编码
    selectSkuInv(data) {
      this.dialogInfoInv.topFormInv.data.skuId = data
    }

  }
}
</script>
