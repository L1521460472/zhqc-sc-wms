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
        <template v-slot:form-zoneId="scope">
          <list-wh-zone :select-key="topForm.data.zoneId" @select="selectZone" />
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
        <!--库位-->
        <!--<template v-slot:form-lotId="scope">-->
        <!--<list-wh-lot @select="selectLot" :selectKey="topForm.data.lotId" ></list-wh-lot>-->
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

      <el-button-group>
        <el-button icon="el-icon-s-order" type="primary" :disabled="$hasPerm('batch_check')" @click="handleClick('batchAuditAdj')">批量审核</el-button>
      </el-button-group>
      <el-button-group>
        <el-button icon="el-icon-delete-solid" type="danger" :disabled="$hasPerm('batchDelete')" @click="handleClick('batchDelete')">批量删除</el-button>
      </el-button-group>

      <export-vue
        template-name="inventoryFrozenService"
        :export-url="exportUrl"
        export-name="导出库内管理-库存冻结单"
        @exportParam="exportData"
      />
    </div>

    <div slot="tab-body" class="tab-body_auto">
      <!--  主页面的table表格  -->
      <zhqc-table
        :data.sync="resp"
        :field-list="tableInfo.fieldList"
        :handle="null"
        @handleClick="handleClick"
        @handleEvent="handleSelectionChange"
      >>
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
      <full-pop-item full-pop-item-title="库存冻结单">
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
          <template v-slot:form-ownerId="scope">
            <zhqc-list-owner :select-key="diaFormInfo.data.ownerId" :disabled="dialogInfo.type === 'view'" @select="selectOwnerDiaAdd" />
          </template>
          <!-- 销售仓 -->
          <template v-slot:form-whAreaId="scope">
            <remote-list-three
              :model="diaFormInfo.data"
              :item="scope.item"
              :list-url="salesStorehouseUrl"
              :type="1"
              :owner="diaFormInfo.data.ownerCode"
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
          :fixed-height="350"
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
  </layout-body>
</template>

<script>
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
import inventoryFrozenMixins from './mixins'
import buttonList from './components/buttonList'
import zhqcListOwner from '@/Subassembly/ZhqcList/ListOwner'
import listWhZone from '@/Subassembly/ZhqcList/ListWhZone'
import listWhLot from '@/Subassembly/ZhqcList/ListWhLot'
export default {
  name: 'InventoryFrozen',
  components: {
    zhqcListOwner, buttonList, listWhZone, listWhLot
  },
  mixins: [inventoryFrozenMixins],
  data() {
    return {
      store: 'inventoryFrozen/',
      modName: 'inventoryFrozen',
      collapsable: false, // 展开收缩
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      pageInStockProRequest: { limit: this.$globalLimit, page: this.$globalPage },
      formType: null,
      viewFlag: null,
      ownerUrl: VUE_APP_WMS_MODEL + '/base/partner/owner/queryOwnerCbList',
      lotUrl: VUE_APP_WMS_MODEL + '/base/wh/whLot/queryWhLotCbList',
      exportUrl: VUE_APP_WMS_MODEL + '/inv/inventoryFrozen/export',
      salesStorehouseUrl: VUE_APP_WMS_MODEL + '/base/wh/whArea/queryVirtualwhList',
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
    'diaFormInfo.data.ownerId'(val) {
      if (!val) {
        this.diaFormInfo.data.whAreaId = null
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
    selectOwnerDia(data) {
      this.topForm.data.ownerId = data
    },
    selectOwnerDiaAdd(data, row) {
      this.diaFormInfo.data.ownerId = data
      this.diaFormInfo.data.ownerCode = row.ownerCode
    },
    selectZone(data) {
      this.topForm.data.zoneId = data
    },
    selectLot(data) {
      this.topForm.data.lotId = data
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
