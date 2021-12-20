<!--
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-02 14:43:38
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
      <export-vue
        template-name="supplierService"
        export-url="base/partner/supplier/export"
        export-name="供应商基础表"
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
      >
        <template v-slot:col-status="scope">
          <el-button size="mini" type="primary" :disabled="$hasPerm('view')" @click="openViewPage(scope.row)">查看</el-button>
          <el-button size="mini" type="success" :disabled="$hasPerm('edit')" @click="openEditPage(scope.row)">编辑</el-button>
          <el-button
            v-if="scope.row.isEnable === 0"
            size="mini"
            type="success"
            :disabled="$hasPerm('enable')"
            @click="enable(scope.row)"
          >启用
          </el-button>
          <el-button
            v-if="scope.row.isEnable === 1"
            size="mini"
            type="warning"
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
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="基本信息" name="first">
          <div style="padding: 15px;border-bottom: 1px solid rgb(230, 232, 235);">
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
              <template v-slot:form-provinceId="scope">
                <zhqc-list-province :select-key="diaFormInfo.data.provinceId" :disabled="dialogInfo.type=='view'" @select="selectProvince" />
              </template>
              <template v-slot:form-cityId="scope">
                <zhqc-list-city :select-key="diaFormInfo.data.cityId" :province-id="provinceId" :disabled="dialogInfo.type=='view'" @select="selectCity" />
              </template>
              <template v-slot:form-areaId="scope">
                <zhqc-list-area :select-key="diaFormInfo.data.areaId" :city-id="cityId" :disabled="dialogInfo.type=='view'" @select="selectArea" />
              </template>
            </zhqc-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="控制信息" name="second">
          <div style="padding: 15px;border-bottom: 1px solid rgb(230, 232, 235);">
            <el-button v-show="dialogInfo.type!='view'" icon="el-icon-folder-add" size="mini" type="primary" @click="handleClick('openSealAddPage')">添加印章印模</el-button>
            <zhqc-slot-table
              :ref="diaFormInfo.sealTable.ref"
              :data.sync="diaFormInfo.sealTable.data"
              :field-list="diaFormInfo.sealTable.fieldList"
              :handle="diaFormInfo.sealTable.handle"
              @handleClick="handleClick"
            >
              <template v-slot:col-sealImpression="scope">
                <zhqc-image v-if="scope.row.sealImpression" :image-url="scope.row.sealImpression" />
              </template>
              <template v-slot:bt-slotEvent="scope">
                <el-button size="mini" type="primary" @click="openViewer(scope.data.row)">预览</el-button>
                <el-button size="mini" type="success" :disabled="dialogInfo.type == 'view'" @click="openSealEditPage(scope.data.row,scope.data.index)">编辑</el-button>
                <el-button size="mini" type="danger" :disabled="dialogInfo.type == 'view'" @click="deleteSeal(scope.data.row,scope.data.index)">删除</el-button>
              </template>
            </zhqc-slot-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </full-pop>
    <zhqc-dialog
      :title="dialogInfoSeal.title"
      :visible.sync="dialogInfoSeal.visible"
      :width="dialogInfoSeal.width"
      :bt-list="dialogInfoSeal.btList"
      @handleClick="handleClick"
    >
      <zhqc-form
        :ref-obj.sync="diaFormInfoSeal.ref"
        :form-type="formType"
        :class-name="viewFlag"
        :data="diaFormInfoSeal.data"
        :field-list="diaFormInfoSeal.fieldList"
        :rules="diaFormInfoSeal.rules"
        :list-type-info="listTypeInfo"
        :label-width="diaFormInfoSeal.labelWidth"
      />
      <div style="padding-left: 10%">
        <p>上传印章印模图片</p>
        <zhqc-image-upload-one
          ref="uploadImage"
          module-name="seal-picture"
          file-type="img"
          :image-url="diaFormInfoSeal.imageUrl"
          @uploadSuccess="uploadSuccess"
        />
      </div>
    </zhqc-dialog>
    <zhqc-image-viewer v-show="imageView.showViewer" :z-index="imageView.zIndex" :initial-index="imageView.imageIndex" :on-close="closeViewer" :url-list="imageView.previewSrcList" />
  </layout-body>
</template>

<script>
import supplierMixins from './mixins'
import zhqcListProvince from '@/Subassembly/ZhqcList/ListProvince/ListProvince'
import zhqcListCity from '@/Subassembly/ZhqcList/ListCity/ListCity'
import zhqcListArea from '@/Subassembly/ZhqcList/ListArea/ListArea'
import ZhqcSlotTable from '@/Subassembly/ZhqcSlotTable'
import zhqcImageUploadOne from '@/layout/image/uploadOne'
import ZhqcImageViewer from '@/layout/image/image-viewer'

export default {
  name: 'Supplier',
  components: { zhqcListProvince, zhqcListCity, zhqcListArea, zhqcImageUploadOne, ZhqcSlotTable, ZhqcImageViewer },
  mixins: [supplierMixins],
  data() {
    return {
      store: 'supplier/',
      modName: 'supplier',
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
      dialogInfoSeal: {
        title: '',
        visible: false,
        width: '800px',
        type: '',
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'closeSealPage', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'saveSeal', btLoading: false, show: true }]
      },
      provinceId: null,
      cityId: null,
      activeName: 'first',
      imageView: {
        zIndex: 49999,
        imageIndex: 0,
        showViewer: false,
        previewSrcList: []
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
        this.provinceId = null
        this.cityId = null
        this.resetFormData()
        this.diaFormInfo.sealTable.data = []
      }
    }

  },
  mounted() {

  },
  methods: {
    selectProvince(data) {
      this.diaFormInfo.data.provinceId = data
      this.diaFormInfo.data.cityId = null
      this.diaFormInfo.data.areaId = null
      this.provinceId = data
      this.cityId = null
    },
    selectCity(data) {
      this.diaFormInfo.data.cityId = data
      this.diaFormInfo.data.areaId = null
      this.cityId = data
    },
    selectArea(data) {
      this.diaFormInfo.data.areaId = data
    },
    uploadSuccess(data) {
      this.diaFormInfoSeal.imageUrl = data
    }
  }
}
</script>
