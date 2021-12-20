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
        </template>
      </zhqc-top-form>
    </div>
    <div slot="left-btn">
      <el-button-group>
        <el-button icon="el-icon-folder-add" :disabled="false" @click="handleClick('openAddPage')">{{ $t('table.add') }}</el-button>
      </el-button-group>
      <export-vue
        template-name="customerAuthService"
        :export-url="exportUrl"
        export-name="电子签约授权"
        @exportParam="exportData"
      />
      <upload-vue
        template-name="customerAuthService"
        :upload-url="uploadUrl"
        @uploadQuery="uploadQueryFn"
      />
      <export-template-vue :template-url="templateUrl" export-name="authTemplate" />
    </div>

    <div slot="tab-body" class="tab-body_auto">
      <!--  主页面的table表格  -->
      <zhqc-table
        :data.sync="resp"
        :field-list="tableInfo.fieldList"
        :handle="tableInfo.handle"
        @handleClick="handleClick"
      >
        <template v-slot:bt-slotEvent="scope">
          <el-button size="mini" type="primary" :disabled="false" @click="openViewPage(scope.data.row)">{{ $t('table.view') }}</el-button>
          <el-button size="mini" type="success" :disabled="false" @click="openEditPage(scope.data.row)">{{ $t('table.edit') }}</el-button>
          <el-button v-if="scope.data.row.isEnable === 1" size="mini" type="success" :disabled="false" @click="stopData(scope.data.row)">停用</el-button>
          <el-button v-if="scope.data.row.isEnable === 0" size="mini" type="warning" :disabled="false" @click="beginData(scope.data.row)">启用</el-button>
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
    <zhqc-dialog
      :title="dialogInfo.title"
      :visible.sync="dialogInfo.visible"
      :width="dialogInfo.width"
      :bt-list="dialogInfo.btList"
      @handleClick="handleClick"
    >
      <zhqc-link-form
        :ref-obj.sync="diaFormInfo.ref"
        :data="diaFormInfo.data"
        :field-list="diaFormInfo.fieldList"
        :rules="diaFormInfo.rules"
        :list-type-info="listTypeInfo"
        :label-width="diaFormInfo.labelWidth"
      />
      <div class="img_box">
        <span class="img_txt">授权函：</span>
        <uploadImg
          ref="uploadImg"
          :show-tips="true"
          :export-url="exportImgUrl"
          :img-pre-src-list="pictureList"
          :disabled="disabled"
          @handleImgSuccess="handleImgSuccess"
        />

      </div>
      <!-- <UploadPdf /> -->

    </zhqc-dialog>
  </layout-body>
</template>

<script>
import electronicAuthorizationMixins from './mixins'

export default {
  name: 'ElectronicAuthorization',
  components: {
    uploadImg: () => import('@/Subassembly/upload/upload.vue')
    // UploadPdf: () => import('@/Subassembly/UploadPdf/index.vue')
  },
  mixins: [electronicAuthorizationMixins],
  data() {
    return {
      store: 'electronicAuthorization/',
      modName: 'electronicAuthorization',
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      dialogInfo: {
        title: '',
        visible: false,
        type: '',
        width: '220mm',
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', btLoading: false, show: true }]
      },
      disabled: false,
      exportUrl: process.env.VUE_APP_OMS_MODEL + '/transport/customerAuth/export',
      uploadUrl: process.env.VUE_APP_OMS_MODEL + '/transport/customerAuth/upload',
      templateUrl: process.env.VUE_APP_OMS_MODEL + '/transport/customerAuth/template/authTemplate',
      exportImgUrl: process.env.VUE_APP_BASE_URL + 'fileMgr/fileManager/upload2Path',
      pictureList: []
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
    }
  },
  mounted() {
    this.pictureIdList = [
    ]
  },
  methods: {
    uploadQueryFn() {
      this.initData()
    },
    handleImgSuccess(list) {
      this.pictureIdList = list
    }

  }
}
</script>

<style lang="scss" scoped>
.img_box{
   display: flex;
  width: 100%;
  .img_txt{
    display: inline-block;
    width: 120px;
    margin-right: 10px;
    text-align: right;
  }
}
</style>

