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
        <template v-slot:form-carrierName>
          <list-carrierName
            :model="topForm.data"
            select-key="carrierName"
            lable="carrierName"
            parame-code="carrierCode"
          />
        </template>
        <!-- 发货方 -->
        <template v-slot:form-senderName>
          <list-sender-or-receiver
            :model="topForm.data"
            select-key="senderName"
            lable="senderName"
            parame-code="senderCode"
            :list-url="SRUrl"
            :param-type="true"
          />
        </template>
        <!--  货主名称 -->
        <template v-slot:form-ownerName>
          <remote-list
            :model="topForm.data"
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
        <!-- 展开收起表单 -->
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
        template-name="transportOrderService"
        :export-url="exporttUrl"
        export-name="运输单主要信息"
        @exportParam="exportData"
      />
      <upload-vue template-name="transportOrderService" :upload-url="uploadUrl" />
      <export-template-vue :template-url="exportTemplateUrl" export-name="运输单主要信息导入模板" />
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
          <btn-list
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
    <!--编辑-->
    <full-pop
      :visible.sync="fullDialogInfo.visible"
      :top-title="fullDialogInfo.title"
      :close-btn="fullDialogInfo.closeBtn"
      :save-list="fullDialogInfo.btList"
      @handleClick="handleClick"
    >
      <full-pop-item full-pop-item-title="运输单信息">
        <zhqc-form
          :ref-obj.sync="fullDiaFormInfo.ref"
          :data="fullDiaFormInfo.data"
          :field-list="fullDiaFormInfo.fieldList"
          :rules="fullDiaFormInfo.rules"
          :list-type-info="listTypeInfo"
          :label-width="fullDiaFormInfo.labelWidth"
          @handleEvent="handleEvent"
        />
      </full-pop-item>
      <!--      改派-->
      <full-pop-item v-if="fullDialogInfo.type === 'edit'" full-pop-item-title="行程信息">
        <vex-dia-table
          :ref-obj.sync="fullDiaFormInfo.dtTableInfo.ref"
          :data="fullDiaFormInfo.dtTableInfo.data"
          :field-list="fullDiaFormInfo.dtTableInfo.fieldList"
          :handle="fullDiaFormInfo.dtTableInfo.handle"
          :top-btn="fullDiaFormInfo.dtTableInfo.topBtn"
          :rules="fullDiaFormInfo.dtTableInfo.rules"
          @handleClick="handleClick"
        >
          <template v-slot:col-operation="scope">
            <el-button type="success" icon="" @click="editTransportDt(scope.row)">{{ $t('table.edit') }}</el-button>
          </template>
        </vex-dia-table>
      </full-pop-item>
      <!--      路由维护-->
      <full-pop-item v-if="fullDialogInfo.type === 'editRout'" full-pop-item-title="路由维护">
        <vex-dia-table
          :ref-obj.sync="fullDiaFormInfo.dtTableInfoRoute.ref"
          :data="fullDiaFormInfo.dtTableInfoRoute.data"
          :field-list="fullDiaFormInfo.dtTableInfoRoute.fieldList"
          :handle="fullDiaFormInfo.dtTableInfoRoute.handle"
          :top-btn="fullDiaFormInfo.dtTableInfoRoute.topBtn"
          :rules="fullDiaFormInfo.dtTableInfoRoute.rules"
          :config="fullDiaFormInfo.config"
          @handleClick="handleClick"
        />
      </full-pop-item>
    </full-pop>
    <!--    编辑改派-->
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
        :form-type="diaFormInfo.type"
        :list-type-info="listTypeInfo"
        :label-width="diaFormInfo.labelWidth"
        @handleClick="handleClick"
      />
    </zhqc-dialog>
    <!--    异常报备-->
    <zhqc-dialog
      :title="dialogInfoAbnormal.title"
      :visible.sync="dialogInfoAbnormal.visible"
      :width="dialogInfoAbnormal.width"
      :bt-list="dialogInfoAbnormal.btList"
      @handleClick="handleClick"
    >
      <zhqc-form
        :ref-obj.sync="diaFormInfoAbnormal.ref"
        :data="diaFormInfoAbnormal.data"
        :field-list="diaFormInfoAbnormal.fieldList"
        :rules="diaFormInfoAbnormal.rules"
        :list-type-info="listTypeInfo"
        :label-width="diaFormInfoAbnormal.labelWidth"
      >
        <template v-slot:form-abnormalEvidence>
          <upload-file
            ref="uploadImg"
            :show-tips="true"
            :export-url="exportImgUrl"
            :img-pre-src-list="fileList"
            @handleImgSuccess="handleImgFn"
            @handleRemove="handleImgFn"
          />
        </template>
      </zhqc-form>
    </zhqc-dialog>
  </layout-body>
</template>

<script>
import { VUE_APP_BASE_URL } from '@/api/api.config.js'
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
import { VUE_APP_TMS_MODEL } from '@/api/api.config.js'
import waybillMixins from './mixins'
export default {
  name: 'Waybill',
  components: {
    btnList: () => import('./components/btnList.vue'),
    listCarrierName: () => import('@/Subassembly/ZhqcList/ListCarrierNameSc'),
    ListSenderOrReceiver: () => import('@/Subassembly/ZhqcList/ListSenderOrReceiver'),
    UploadFile: () => import('@/Subassembly/upload/upload')
  },
  mixins: [waybillMixins],
  data() {
    return {
      store: 'waybill/',
      modName: 'waybill',
      collapsable: false, // 展开收缩
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      dialogInfo: {
        title: '',
        visible: false,
        type: '',
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'closeDiaLog', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', btLoading: false, show: true }]
      },
      dialogInfoAbnormal: {
        width: '420px',
        title: this.$t('waybill.abnormal'),
        visible: false,
        type: '',
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'closeAbnormal', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', btLoading: false, show: true }]
      },
      fileList: [],
      evidenceList: [],
      exportImgUrl: VUE_APP_BASE_URL + 'fileMgr/fileManager/upload2Path',
      ownerUrl: VUE_APP_WMS_MODEL + '/base/partner/owner/queryOwnerCbList',
      exporttUrl: VUE_APP_TMS_MODEL + '/transport/transportOrder/export',
      exportTemplateUrl: VUE_APP_TMS_MODEL + '/transport/transportOrder/template/transportOrderTemplate',
      uploadUrl: VUE_APP_TMS_MODEL + '/transport/transportOrder/upload',
      // 收获方 发货方 查询全部
      SRUrl: VUE_APP_WMS_MODEL + '/base/search/customerList'
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
    'dialogInfoAbnormal.visible'(val) {
      const diaFormInfo = this.diaFormInfoAbnormal
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
    handleImgFn(fileList) {
      this.evidenceList = fileList.map(item => ({
        type: item.endsWith('.pdf') ? 2 : 1,
        path: item
      }))
    }
  }
}
</script>
