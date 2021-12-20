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
        <template v-slot:form-sys="" class="el-icon-test">
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
        </template>
      </zhqc-top-form>
    </div>

    <div slot="left-btn">
      <el-button-group>
        <el-button type="primary" icon="el-icon-folder-add" :disabled="false" @click="handleClick('openAddPage')">{{ $t('table.add') }}</el-button>
      </el-button-group>
    </div>

    <div slot="tab-body" class="tab-body_auto">
      <!--  主页面的table表格  -->
      <zhqc-table
        :data.sync="resp"
        :field-list="tableInfo.fieldList"
        :handle="tableInfo.handle"
        :height="tabHeight"
        :content-height="contentHeight"
        @handleClick="handleClick"
      >
        <template v-slot:bt-slotEvent="scope">
          <el-button size="mini" type="primary" :disabled="false" @click="openViewPage(scope.data.row,scope)">{{ $t('table.view') }}</el-button>
          <el-button size="mini" type="success" :disabled="false" @click="openEditPage(scope.data.row)">{{ $t('table.edit') }}</el-button>
          <el-button size="mini" type="warning" :disabled="false" @click="isUnableBtn(scope.data.row)">{{ scope.data.row.isEnable === 1 ? '停用' : '启用' }}</el-button>
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
      :top-title="fullDialogInfo.title"
      :visible.sync="fullDialogInfo.visible"
      :close-btn="fullDialogInfo.closeBtn"
      :save-list="fullDialogInfo.btList"
      @handleClick="handleClick"
    >
      <full-pop-item :full-pop-item-title="$t('preSchedulingStrategy.diaFormInfoTitle')">
        <zhqc-form
          :ref-obj.sync="fullDialogInfo.diaFormInfo.ref"
          :data="fullDialogInfo.diaFormInfo.data"
          :field-list="fullDialogInfo.diaFormInfo.fieldList"
          :rules="fullDialogInfo.diaFormInfo.rules"
          :list-type-info="listTypeInfo"
          :label-width="fullDialogInfo.diaFormInfo.labelWidth"
          :class-name="fullDialogInfo.diaFormInfo.viewFlag"
        />
      </full-pop-item>
      <full-pop-item :full-pop-item-title="$t('preSchedulingStrategy.diaTableInfoTitle')">
        <el-button
          v-show="fullDialogInfo.diaFormInfo.addDtBtnShow"
          icon="el-icon-folder-add"
          class="add_btn"
          type="primary"
          @click="handleClick('openAddDtPage')"
        >{{ $t('preSchedulingStrategy.addDetail') }}</el-button>
        <vex-dia-table
          :data.sync="fullDialogInfo.diaTableInfo.data"
          :field-list="fullDialogInfo.diaTableInfo.fieldList"
          :handle="fullDialogInfo.diaTableInfo.handle"
          :ref-obj.sync="fullDialogInfo.diaTableInfo.ref"
          :top-btn="fullDialogInfo.diaTableInfo.topBtn"
          @handleClick="handleClick"
        >
          <template v-slot:col-operation="scope">
            <el-button type="success" @click="editDt(scope.row)">{{ $t('table.edit') }}</el-button>
            <el-button type="danger" @click="deleteDt(scope.row)">{{ $t('table.delete') }}</el-button>
          </template>
        </vex-dia-table>
      </full-pop-item>
    </full-pop>

    <!-- 弹框 -->
    <zhqc-dialog
      :title="dialogInfo.title"
      :visible.sync="dialogInfo.visible"
      :width="dialogInfo.width"
      :bt-list="dialogInfo.btList"
      @handleClick="handleClick"
    >
      <zhqc-form
        :ref-obj.sync="dialogInfo.ref"
        :data="dialogInfo.data"
        :field-list="dialogInfo.fieldList"
        :rules="dialogInfo.rules"
        :form-type="dialogInfo.type"
        :list-type-info="listTypeInfo"
        :label-width="dialogInfo.labelWidth"
        @handleEvent="handleEvent"
      >
        <!--  货主名称 -->
        <template v-slot:form-ownerName>
          <remote-list
            :model="dialogInfo.data"
            select-key="ownerName"
            lable="ownerName"
            parame-code="ownerCode"
            :list-url="ownerUrl"
          >
            <template v-slot="scope">
              <span style="float: left; color: #8492a6; font-size: 13px;">{{ scope.item.ownerName }}</span>
            </template>
          </remote-list>
        </template>
        <!-- 承运商 -->
        <template v-slot:form-carrierName>
          <list-carrierName
            :model="dialogInfo.data"
            select-key="carrierName"
            lable="carrierName"
            parame-code="carrierCode"
          />
        </template>
        <!-- 发货方 -->
        <template v-slot:form-senderName>
          <list-sender-or-receiver
            :model="dialogInfo.data"
            :disabled="!dialogInfo.data.businessType"
            :type="dialogInfo.data.businessType"
            :multiple="dialogInfo.type === 'add'"
            select-key="senderName"
            lable="senderName"
            parame-code="senderCode"
            @select="senderHandle"
          />
        </template>

        <!-- 收货方 -->
        <template v-slot:form-receiverName>
          <list-sender-or-receiver
            :disabled="!dialogInfo.data.businessType"
            :model="dialogInfo.data"
            select-key="receiverName"
            lable="receiverName"
            parame-code="receiverCode"
            :multiple="dialogInfo.type === 'add'"
            :type="dialogInfo.data.businessType"
            @select="receiverHandle"
          />
        </template>
      </zhqc-form>
    </zhqc-dialog>
  </layout-body>
</template>

<script>
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
import { VUE_APP_TMS_MODEL } from '@/api/api.config.js'
import preSchedulingStrategyMixins from './mixins'
import listCarrierName from '@/Subassembly/ZhqcList/ListCarrierNameSc'
export default {
  name: 'PreSchedulingStrategy',
  components: {
    listCarrierName,
    ListSenderOrReceiver: () => import('@/Subassembly/ZhqcList/ListSenderOrReceiver')
  },
  mixins: [preSchedulingStrategyMixins],
  data() {
    return {
      store: 'preSchedulingStrategy/',
      modName: 'preSchedulingStrategy',
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      // 货主
      ownerUrl: VUE_APP_WMS_MODEL + '/base/partner/owner/queryOwnerCbList',
      // 承运商
      carrierUrl: VUE_APP_TMS_MODEL + '/carrier/carrier/selectCarrierInfo',
      senderList: [],
      receiverList: []

    }
  },
  computed: {
    resp() {
      return this.$store.state[this.modName].pageResp
    },
    total() {
      return this.$store.state[this.modName].total
    }
  },
  methods: {
    senderHandle(value, arr) {
      if (this.dialogInfo.type === 'add') {
        this.senderList = arr
      } else {
        this.senderList = []
      }
    },
    receiverHandle(value, arr) {
      if (this.dialogInfo.type === 'add') {
        this.receiverList = arr
      } else {
        this.receiverList = []
      }
    },
    businessTypeChange() {
      if (this.dialogInfo.type === 'add') {
        this.dialogInfo.data.senderName = []
        this.dialogInfo.data.senderCode = []
        this.dialogInfo.data.receiverCode = []
        this.dialogInfo.data.receiverName = []
      } else {
        this.dialogInfo.data.senderName = null
        this.dialogInfo.data.senderCode = null
        this.dialogInfo.data.receiverCode = null
        this.dialogInfo.data.receiverName = null
      }
    },
    isUnableBtn(data) {
      if (!data.id) {
        return
      }
      if (data.isEnable) {
        this.$confirm(this.$t('确认停用选中的策略么？'), {
          type: 'warning',
          center: true
        }).then(() => {
          this.$store.dispatch(this.store + 'unableData', data.id).then(() => {
            const resp = this.$store.state[this.modName].unableResp
            if (resp.code === this.$successCode) {
              this.initData()
            }
          })
        })
      } else {
        this.$confirm(this.$t('确认启用选中的策略么？'), {
          type: 'warning',
          center: true
        }).then(() => {
          this.$store.dispatch(this.store + 'enableData', data.id).then(() => {
            const resp = this.$store.state[this.modName].enableResp
            if (resp.code === this.$successCode) {
              this.initData()
            }
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.add_btn {
  margin-bottom: 10px;
}
</style>
