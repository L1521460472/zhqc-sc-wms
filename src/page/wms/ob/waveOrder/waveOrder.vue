<!--
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-02 16:12:35
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
        <template v-slot:form-skuId="scope">
          <list-sku :select-key="topForm.data.skuId" @select="selectSku" />
        </template>
        <template v-slot:form-sys="" class="el-icon-test">
          <el-button type="primary" icon="el-icon-search" :disabled="$hasPerm('search')" @click="handleClick('search')">{{ $t("table.search") }}</el-button>
          <el-button type="warning" icon="el-icon-refresh-left" :disabled="$hasPerm('search')" @click="handleClick('reboot')">{{ $t("table.reboot") }}</el-button>
        </template>
      </zhqc-top-form>
    </div>
    <div slot="left-btn">
      <el-button-group>
        <el-button icon="el-icon-folder-add" :disabled="$hasPerm('release')" type="primary" @click="handleClick('release')">发布</el-button>
      </el-button-group>
      <!--<el-button-group>-->
      <!--<el-button icon="el-icon-folder-add"  @click="handleClick('cancelRelease')"  :disabled="$hasPerm('cancelRelease')">取消发布</el-button>-->
      <!--</el-button-group>-->
      <!--<export-vue templateName="waveOrderService"-->
      <!--exportUrl="ob/waveOrder/export"-->
      <!--exportName="出库管理-波次表"-->
      <!--@exportParam="exportData">-->
      <!--</export-vue>-->
    </div>

    <div slot="tab-body" class="tab-body_auto">
      <!--  主页面的table表格  -->
      <zhqc-table
        :data.sync="resp"
        :field-list="tableInfo.fieldList"
        :handle="tableInfo.handle"
        @handleClick="handleClick"
        @handleEvent="handleEvent"
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
      <full-pop-item full-pop-item-title="波次计划信息">
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
        />
      </full-pop-item>
      <full-pop-item full-pop-item-title="波次计划明细">
        <el-button v-show="diaFormInfo.addDtBtnShow" icon="el-icon-folder-add" @click="handleClick('openAddDtPage')">添加明细</el-button>
        <vex-dia-table
          :ref-obj.sync="diaFormInfo.dtTableInfo.ref"
          :data="diaFormInfo.dtTableInfo.data"
          :field-list="diaFormInfo.dtTableInfo.fieldList"
          :handle="diaFormInfo.dtTableInfo.handle"
          :rules="diaFormInfo.dtTableInfo.rules"
          :top-btn="diaFormInfo.dtTableInfo.topBtn"
          @handleClick="handleClick"
        />
      </full-pop-item>
    </full-pop>
    <zhqc-dialog
      :title="dialogInfoDt.title"
      :visible.sync="dialogInfoDt.visible"
      :width="dialogInfoDt.width"
      :bt-list="dialogInfoDt.btList"
      @handleClick="handleClick"
    >
      <zhqc-form
        :ref-obj.sync="diaFormInfoDt.ref"
        :form-type="dialogInfo.type"
        :data="diaFormInfoDt.data"
        :field-list="diaFormInfoDt.fieldList"
        :rules="diaFormInfoDt.rules"
        :list-type-info="listTypeInfo"
        :label-width="diaFormInfoDt.labelWidth"
      />
    </zhqc-dialog>
  </layout-body>
</template>

<script>
import waveOrderMixins from './mixins'
import listSku from '@/Subassembly/ZhqcList/ListSku'
export default {
  name: 'WaveOrder',
  components: {
    listSku
  },
  mixins: [waveOrderMixins],
  data() {
    return {
      store: 'waveOrder/',
      modName: 'waveOrder',
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      formType: null,
      viewFlag: null,
      idsList: [],
      dialogInfo: {
        title: '',
        visible: false,
        type: '',
        // 返回按钮
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', btLoading: false, show: true }]
      },
      dialogInfoDt: {
        title: '波次计划明细',
        visible: false,
        type: '',
        addDtBtnShow: false,
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'closeAddDtPage', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'saveDt', loading: false, show: true }]
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

  }
}
</script>
