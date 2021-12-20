<!--
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-02 15:13:13
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
        <!--<template v-slot:form-maintainUserId="scope">-->
        <!--<list-maintain-user @select="selectmaintainUser" :selectKey="topForm.data.maintainUserId"></list-maintain-user>-->
        <!--</template>-->
        <!--养护员-->
        <template v-slot:form-maintainUserId="scope">
          <remote-list
            :model="topForm.data"
            select-key="maintainUserId"
            lable="ownerName"
            parame-code="queryText"
            :list-url="maintainUserUrl"
          >
            <template v-slot="scop">
              <span style="float: left; color: #8492a6; font-size: 13px;width:120px">{{ scop.item.maintainUser }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px;width:120px">{{ scop.item.maintainUserName }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px;width:50px;">{{ scop.item.maintainTypeName }}</span>
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
        template-name="emphMaintainService"
        export-url="gsp/emphMaintain/export"
        export-name="养护品种确定"
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
      >

        <template v-slot:col-status="scope">
          <buttonList
            :row="scope.row"
            :bt-list="tableInfo.handle.btList"
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
      <full-pop-item full-pop-item-title="养护品种确定">
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
            <list-owner :select-key="diaFormInfo.data.ownerId" @select="diaSelectOwner" />
          </template>
          <template v-slot:form-maintainUserId="scope">
            <list-maintain-user :select-key="diaFormInfo.data.maintainUserId" @select="diaSelectmaintainUser" />
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
          <list-wh-zone :select-key="dialogInfoInv.topFormInv.data.zoneId" @select="selectZoneInv" />
        </template>
        <template v-slot:form-lotId="scope">
          <list-wh-lot-cascade :select-key="dialogInfoInv.topFormInv.data.lotId" :zone-id="invZoneId" @select="selectLotInv" />
        </template>
        <template v-slot:form-skuId="scope">
          <list-sku :select-key="dialogInfoInv.topFormInv.data.skuId" @select="selectSkuInv" />
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

  </layout-body>
</template>

<script>
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
import emphMaintainMixins from './mixins'
import buttonList from '@/components/buttonList'
import listOwner from '@/Subassembly/ZhqcList/ListOwner'
import listWhZone from '@/Subassembly/ZhqcList/ListWhZone'
import listWhLotCascade from '@/Subassembly/ZhqcList/ListWhLotCascade'
import listMaintainUser from '@/Subassembly/ZhqcList/ListMaintainUser'
import listSku from '@/Subassembly/ZhqcList/ListSku'

export default {
  name: 'EmphMaintain',
  components: { buttonList, listOwner, listWhZone, listWhLotCascade, listMaintainUser, listSku },
  mixins: [emphMaintainMixins],
  data() {
    return {
      store: 'emphMaintain/',
      modName: 'emphMaintain',
      collapsable: false, // 展开收缩
      formType: null,
      viewFlag: null,
      ownerUrl: VUE_APP_WMS_MODEL + '/base/partner/owner/queryOwnerCbList',
      maintainUserUrl: VUE_APP_WMS_MODEL + '/gsp/pro/maintainUser/queryMaintainUserCbList',
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
      invZoneId: null
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
    selectmaintainUser(data, obj) {
      this.topForm.data.maintainUser = obj.maintainUser
      this.topForm.data.maintainUserId = data
    },
    diaSelectOwner(data) {
      this.$set(this.diaFormInfo.data, 'dtList', [])
      this.inStockProList = []
      this.distinctList = []

      this.diaFormInfo.data.ownerId = data
    },
    diaSelectmaintainUser(data, obj) {
      this.$set(this.diaFormInfo.data, 'dtList', [])
      this.inStockProList = []
      this.distinctList = []

      this.$set(this.diaFormInfo.data, 'emphMaintainType', obj.maintainType)
      this.diaFormInfo.data.maintainUser = obj.maintainUser
      this.diaFormInfo.data.maintainUserName = obj.maintainUserName
      this.diaFormInfo.data.maintainUserId = obj.id
    },

    // 库区
    selectZoneInv(data) {
      this.dialogInfoInv.topFormInv.data.zoneId = data
      this.dialogInfoInv.topFormInv.data.lotId = null
      this.invZoneId = data
    },
    // 库位
    selectLotInv(data) {
      this.dialogInfoInv.topFormInv.data.lotId = data
    },
    // 产品编码
    selectSkuInv(data) {
      this.dialogInfoInv.topFormInv.data.skuId = data
    }

  }
}
</script>
