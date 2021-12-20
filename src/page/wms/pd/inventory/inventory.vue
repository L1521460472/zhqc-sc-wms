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
        <!-- 货主-->
        <!--<template v-slot:form-ownerId="scope">-->
        <!--<zhqc-list-owner @select="selectOwnerDia" :selectKey="topForm.data.ownerId" ></zhqc-list-owner>-->
        <!--</template>-->
        <!-- 货主 -->
        <template v-slot:form-ownerId="scope">
          <remote-list
            :model="topForm.data"
            select-key="ownerId"
            lable="ownerName"
            parame-code="ownerId"
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

      <el-button-group>
        <el-button icon="el-icon-success" type="warning" :disabled="$hasPerm('batchConfirm')" @click="handleClick('batchConfirmInventory')">批量确认</el-button>
      </el-button-group>
      <el-button-group>
        <el-button icon="el-icon-error" type="danger" :disabled="$hasPerm('batchCancelConfirm')" @click="handleClick('batchCancelConfirmInventory')">批量取消确认</el-button>
      </el-button-group>

      <!-- <export-vue
        template-name="inventoryService"
        :export-url="exportUrl"
        :export-id="exportId"
        export-name="库内管理-盘点单"
        @exportParam="exportData"
      /> -->

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
      <full-pop-item full-pop-item-title="盘点单">
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
          <template v-slot:form-ownerId="scope">
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
          <!-- 附件 -->
          <template v-slot:form-imgInfo="scope">
            <uploadImg
              ref="uploadImg"
              :export-url="exportImgUrl"
              :accept="diaFormInfo.imgInfo.accept"
              :size="diaFormInfo.imgInfo.size"
              :img-pre-src-list="diaFormInfo.imgInfo.pictureList"
              :show-tips="!diaFormInfo.imgInfo.disabled"
              :disabled="diaFormInfo.imgInfo.disabled"
              @handleImgSuccess="handleImgSuccess"
              @handleRemove="handleRemove"
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
        <el-form-item label="审核：" prop="isPass">
          <el-radio-group v-model="auditFormInfo.data.isPass" @change="auditChange">
            <el-radio :label="1">审核通过</el-radio>
            <el-radio :label="0">审核不通过</el-radio>
          </el-radio-group>

        </el-form-item>
        <el-form-item label="原因：" prop="content">
          <el-input
            v-model="auditFormInfo.data.content"
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
import uploadImg from '@/Subassembly/uploadStyleTwo/upload.vue'
export default {
  name: 'Inventory',
  components: {
    buttonList, listWhZone, listWhLot, uploadImg
  },
  mixins: [inventoryMixins],
  data() {
    return {
      store: 'inventory/',
      modName: 'inventory',
      collapsable: false, // 展开收缩
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      pageInStockProRequest: { limit: this.$globalLimit, page: this.$globalPage },
      formType: null,
      viewFlag: null,
      exportId: null,
      salesStorehouseUrl: VUE_APP_WMS_MODEL + '/base/wh/whArea/queryVirtualwhList',
      exportImgUrl: VUE_APP_BASE_URL + 'fileMgr/fileManager/upload2Path',
      exportUrl: VUE_APP_WMS_MODEL + '/pd/inventory/export',
      ownerUrl: VUE_APP_WMS_MODEL + '/base/partner/owner/queryOwnerCbList',
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
      },
      tabs: {
        activeName: '1',
        bgDradient: ['#00d4d8', '#009396'],
        fontSize: 14,
        tabsList: [{ label: '盘点明细', value: '1' },
          { label: '操作明细', value: '2' }]
      },
      tableInfo1: {
        fieldList: null, // 表格列集合
        handle: null,
        data: []

      },
      tableInfo2: {
        fieldList: null, // 表格列集合
        handle: null,
        data: []
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
    auditChange(value) {
      this.auditRlus(value)
    },
    auditRlus(value) {
      const temp = (value === 1)

      this.auditFormInfo.rules = {
        content: [{ required: !temp, message: this.$t('batchAdjustment.msg.auditReason'), trigger: 'blur' }]
      }
    },
    selectOwnerDia(data) {
      this.topForm.data.ownerId = data
    },
    selectOwnerDiaAdd(data) {
      this.$set(this.diaFormInfo.data, 'ownerId', data)
      // this.diaFormInfo.data.ownerId = data;
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
