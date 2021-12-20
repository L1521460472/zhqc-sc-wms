<!--
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-02 15:54:20
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
        <!--来源库区-->
        <!--<template v-slot:form-fmZoneId="scope">-->
        <!--<list-wh-zone @select="selectFmZone" :selectKey="topForm.data.fmZoneId" ></list-wh-zone>-->
        <!--</template>-->
        <!--来源库区-->
        <template v-slot:form-fmZoneId="scope">
          <remote-list
            :model="topForm.data"
            select-key="fmZoneId"
            lable="zoneName"
            parame-code="queryText"
            :list-url="zoneUrl"
          >
            <template v-slot="scop">
              <span style="float: left; color: #8492a6; font-size: 13px;">{{ scop.item.zoneName }}</span>
            </template>
          </remote-list>
        </template>
        <!--目标库区-->
        <!--<template v-slot:form-toZoneId="scope">-->
        <!--<list-wh-zone @select="selectToZone" :selectKey="topForm.data.toZoneId" ></list-wh-zone>-->
        <!--</template>-->
        <!--目标库区-->
        <template v-slot:form-toZoneId="scope">
          <remote-list
            :model="topForm.data"
            select-key="toZoneId"
            lable="zoneName"
            parame-code="queryText"
            :list-url="zoneUrl"
          >
            <template v-slot="scop">
              <span style="float: left; color: #8492a6; font-size: 13px;">{{ scop.item.zoneName }}</span>
            </template>
          </remote-list>
        </template>
        <!--来源库位-->
        <!--<template v-slot:form-fmLotId="scope">-->
        <!--<list-wh-lot-cascade @select="selectFmWhLot" :selectKey="topForm.data.fmLotId" :zoneId="queryFmZoneId"></list-wh-lot-cascade>-->
        <!--</template>-->
        <!--来源库位-->
        <template v-slot:form-fmLotId="scope">
          <remote-list
            :model="topForm.data"
            select-key="fmLotId"
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
        <!--目标库位-->
        <!--<template v-slot:form-toLotId="scope">-->
        <!--<list-wh-lot-cascade @select="selectToWhLot" :selectKey="topForm.data.toLotId" :zoneId="queryToZoneId"></list-wh-lot-cascade>-->
        <!--</template>-->
        <!--目标库位-->
        <template v-slot:form-toLotId="scope">
          <remote-list
            :model="topForm.data"
            select-key="toLotId"
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
      <export-vue
        template-name="moveLotOrderService"
        :export-url="exportUrl"
        export-name="移位单"
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
          <el-button size="mini" type="primary" :disabled="$hasPerm('view')" @click="openViewPage(scope.row)">查看</el-button>
          <el-button size="mini" type="success" :disabled="$hasPerm('edit')" @click="openEditPage(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" :disabled="$hasPerm('delete')" @click="deleteData(scope.row)">删除</el-button>
          <el-button
            v-if="scope.row.isEnable === 0"
            size="mini"
            type="primary"
            :disabled="$hasPerm('enable')"
            @click="enable(scope.row)"
          >启用
          </el-button>
          <el-button
            v-if="scope.row.isEnable === 1"
            size="mini"
            type="success"
            :disabled="$hasPerm('deactivate')"
            @click="deactivate(scope.row)"
          >停用
          </el-button>
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
      <full-pop-item full-pop-item-title="移位单">
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
            <list-owner :select-key="diaFormInfo.data.ownerId" @select="selectOwnerDia" />
          </template>
          <template v-slot:form-fmZoneId="scope">
            <list-wh-zone :select-key="diaFormInfo.data.fmZoneId" @select="selectFmZoneDia" />
          </template>
          <template v-slot:form-toZoneId="scope">
            <list-wh-zone :select-key="diaFormInfo.data.toZoneId" @select="selectToZoneDia" />
          </template>
        </zhqc-form>
      </full-pop-item>
      <full-pop-item full-pop-item-title="移位单明细">
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

    <!--在库可移产品-->
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
        <template v-slot:form-skuId="scope">
          <list-sku :select-key="dialogInfoInv.topFormInv.data.skuId" @select="selectSkuDia" />
        </template>
        <template v-slot:form-fmLotId="scope">
          <list-wh-lot-cascade :zone-id="fmZoneId" @select="selectFmWhLotDia" />
        </template>
        <template v-slot:form-toLotId="scope">
          <list-wh-lot-cascade :zone-id="toZoneId" @select="selectToWhLotDia" />
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
import moveMixins from './mixins'
import listOwner from '@/Subassembly/ZhqcList/ListOwner'
import listWhZone from '@/Subassembly/ZhqcList/ListWhZone'
import listWhLotCascade from '@/Subassembly/ZhqcList/ListWhLotCascade'
import listSku from '@/Subassembly/ZhqcList/ListSku'

export default {
  name: 'Move',
  components: { listOwner, listWhZone, listWhLotCascade, listSku },
  mixins: [moveMixins],
  data() {
    return {
      store: 'move/',
      modName: 'move',
      collapsable: false, // 展开收缩
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      pageInStockProRequest: { limit: this.$globalLimit, page: this.$globalPage },
      formType: null,
      viewFlag: null,
      ownerUrl: VUE_APP_WMS_MODEL + '/base/partner/owner/queryOwnerCbList',
      zoneUrl: VUE_APP_WMS_MODEL + '/base/wh/whZone/queryWhZoneCbList',
      lotUrl: VUE_APP_WMS_MODEL + '/base/wh/whLot/queryWhLotCbList',
      dialogInfo: {
        title: '',
        visible: false,
        type: '',
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', btLoading: false, show: true }]
      },
      exportUrl: VUE_APP_WMS_MODEL + '/inv/moveLotOrder/export',
      queryFmZoneId: null,
      queryToZoneId: null,
      fmZoneId: null,
      toZoneId: null
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
          this.fmZoneId = null
          this.toZoneId = null
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
    // 来源库区
    selectFmZone(data) {
      this.topForm.data.fmZoneId = data
      this.topForm.data.fmLotId = null
      this.topForm.data.fmLotCode = null
      this.queryFmZoneId = data
    },
    // 目标库区
    selectToZone(data) {
      this.topForm.data.toZoneId = data
      this.topForm.data.toLotId = null
      this.topForm.data.toLotCode = null
      this.queryToZoneId = data
    },
    // 来源库位
    selectFmWhLot(data, obj) {
      this.topForm.data.fmLotId = data
      this.topForm.data.fmLotCode = obj.lotCode
    },
    // 目标库位
    selectToWhLot(data, obj) {
      this.topForm.data.toLotId = data
      this.topForm.data.toLotCode = obj.lotCode
    },

    selectOwnerDia(data) {
      this.$set(this.diaFormInfo.data, 'dtList', [])
      this.inStockProList = []
      this.distinctList = []

      this.$set(this.diaFormInfo.data, 'ownerId', data)
    },
    // 来源库区
    selectFmZoneDia(data) {
      this.$set(this.diaFormInfo.data, 'dtList', [])
      this.inStockProList = []
      this.distinctList = []

      this.$set(this.diaFormInfo.data, 'fmZoneId', data)
    },
    // 目标库区
    selectToZoneDia(data) {
      this.$set(this.diaFormInfo.data, 'toZoneId', data)
    },

    // 产品编码
    selectSkuDia(data) {
      this.dialogInfoInv.topFormInv.data.skuId = data
    },

    // 来源库位
    selectFmWhLotDia(data, obj) {
      this.dialogInfoInv.topFormInv.data.fmLotCode = obj.lotCode
    },
    // 目标库位
    selectToWhLotDia(data, obj) {
      this.dialogInfoInv.topFormInv.data.toLotCode = obj.lotCode
    }

  }
}
</script>
