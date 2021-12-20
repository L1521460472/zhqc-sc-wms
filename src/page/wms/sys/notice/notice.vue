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
        <template v-slot:form-sys="" class="el-icon-test">
          <el-button type="primary" icon="el-icon-search" :disabled="$hasPerm('search')" @click="handleClick('search')">{{ $t("table.search") }}</el-button>
          <el-button type="warning" icon="el-icon-refresh-left" :disabled="$hasPerm('search')" @click="handleClick('reboot')">{{ $t("table.reboot") }}</el-button>
        </template>
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
        :handle="tableInfo.handle"
        @handleClick="handleClick"
      >
        <template v-slot:bt-slotEvent="scope">
          <el-button v-show="scope.data.row.noticeStatus == 'NEW_CREATE'" size="mini" type="success" :disabled="$hasPerm('edit')" @click="openEditPage(scope.data.row)">{{ $t('table.edit') }}</el-button>
          <el-button v-show="scope.data.row.noticeStatus == 'NEW_CREATE'" size="mini" type="primary" :disabled="$hasPerm('publish')" @click="handelPublish(scope.data.row)">发布</el-button>
          <el-button v-show="scope.data.row.noticeStatus == 'PUBLISHED'" size="mini" type="warming" :disabled="$hasPerm('cancelPublish')" @click="handelCancelPublish(scope.data.row)">取消发布</el-button>
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
      <full-pop-item full-pop-item-title="公告信息">
        <zhqc-form
          :ref-obj.sync="diaFormInfo.ref"
          :form-type="formType"
          :class-name="viewFlag"
          :data="diaFormInfo.data"
          :field-list="diaFormInfo.fieldList"
          :rules="diaFormInfo.rules"
          :list-type-info="listTypeInfo"
          :label-width="diaFormInfo.labelWidth"
          style="padding: 1% 5%"
        />
      </full-pop-item>
      <full-pop-item full-pop-item-title="公告内容*">
        <!-- <vue-ueditor-wrap v-model="diaFormInfo.data.htmlContent" :config="ueditorConfig" /> -->
        <zhqc-editors :html-val="diaFormInfo.data.htmlContent" @editChange="editChange" />
      </full-pop-item>
      <div class="upload-box">
        <uploadfile
          ref="uploadImg"
          :export-url="uploadInfo.exportImgUrl"
          :accept="uploadInfo.accept"
          :upload-file="uploadInfo.fileList"
          :show-tips="!uploadInfo.disabled"
          :disabled="uploadInfo.disabled"
          @handleSuccess="changeFileList"
        />
      </div>

    </full-pop>
    <zhqc-notice-view-page />
  </layout-body>
</template>

<script>
import { VUE_APP_BASE_URL } from '@/api/api.config.js'
import noticeMixins from './mixins'
import zhqcNoticeViewPage from './noticeViewPage'
import uploadfile from './components/uploadfile.vue'

export default {
  name: 'Notice',
  components: { zhqcNoticeViewPage, uploadfile },
  mixins: [noticeMixins],
  data() {
    return {
      store: 'notice/',
      modName: 'notice',
      formType: null,
      viewFlag: null,
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      dialogInfo: {
        title: '',
        visible: false,
        type: '',
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', btLoading: false, show: true }]
      },
      ueditorConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: true,
        // 初始容器高度
        initialFrameHeight: 400,
        // 初始容器宽度
        initialFrameWidth: '100%',
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！部署在国外的服务器，如果无法访问，请自备梯子）
        serverUrl: VUE_APP_BASE_URL + 'fms/ueditor/doAction',
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        UEDITOR_HOME_URL: VUE_APP_BASE_URL + 'page-scwl/static/ueditor/'
        // UEDITOR_HOME_URL: 'http://localhost:8230/page-scwl/static/ueditor/'
        // UEDITOR_HOME_URL: '/static/ueditor/',
        // UEDITOR_HOME_URL: VUE_APP_ROOT_MODEL + '/static/',
        // UEDITOR_HOME_URL: 'http://192.168.10.252:8098/page-scwl/static/'
        // UEDITOR_HOME_URL: 'http://192.168.10.252:8098/page-yywl/static/ueditor/'
      },
      uploadInfo: {
        exportImgUrl: VUE_APP_BASE_URL + 'fileMgr/fileManager/upload2Path',
        fileList: [],
        disabled: false,
        accept: [{ type: 'img', limit: 6 }]
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
    }
  },
  mounted() {

  },
  methods: {
    editChange(html) {
      this.diaFormInfo.data.htmlContent = html
    }
  }
}
</script>
<style lang="scss" scoped>
.upload-box {
  padding: 1% 1%;
  width: 100%;
  min-height: 150px;
  // border: 1px solid red;
}
</style>
