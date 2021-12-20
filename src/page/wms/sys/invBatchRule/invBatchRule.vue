<!--
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-02 17:13:49
-->
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
          <el-button v-if="scope.data.row.isEnable==0 " size="mini" type="success" :disabled="$hasPerm('enable')" @click="handelEnabled(scope.data.row)">启用</el-button>
          <el-button v-if="scope.data.row.isEnable==1 " size="mini" type="warning" :disabled="$hasPerm('deactivate')" @click="handelDeactivate(scope.data.row)">停用</el-button>
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
      <full-pop-item full-pop-item-title="批次规则信息">
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
          @handleEvent="handleEvent"
        />
      </full-pop-item>
      <full-pop-item full-pop-item-title="批次属性">
        <!--<el-button icon="el-icon-folder-add"  @click="handleClick('openAddDtPage')" v-show="dialogInfo.type !='view' " >添加批次属性</el-button>-->
        <vex-dia-table
          ref="dtTable"
          :ref-obj.sync="diaFormInfo.dtTableInfo.ref"
          :data.sync="diaFormInfo.dtTableInfo.data"
          :field-list="diaFormInfo.dtTableInfo.fieldList"
          :handle="diaFormInfo.dtTableInfo.handle"
          :top-btn="diaFormInfo.dtTableInfo.topBtn"
          @handleClick="handleClick"
        />
      </full-pop-item>
    </full-pop>
    <!--<zhqc-dialog :title="dialogInfoDt.title"-->
    <!--:visible.sync="dialogInfoDt.visible"-->
    <!--:width="dialogInfoDt.width"-->
    <!--:bt-list="dialogInfoDt.btList"-->
    <!--@handleClick="handleClick"-->
    <!--&gt;-->
    <!--<zhqc-form :ref-obj.sync="diaFormInfoDt.ref"-->
    <!--:data="diaFormInfoDt.data"-->
    <!--:field-list="diaFormInfoDt.fieldList"-->
    <!--:rules="diaFormInfoDt.rules"-->
    <!--:list-type-info="listTypeInfo"-->
    <!--:label-width="diaFormInfoDt.labelWidth"-->
    <!--@handleEvent="handleEvent">-->

    <!--</zhqc-form>-->
    <!--</zhqc-dialog>-->
  </layout-body>
</template>

<script>
import invBatchRuleMixins from './mixins'
export default {
  name: 'InvBatchRule',
  mixins: [invBatchRuleMixins],
  data() {
    return {
      store: 'invBatchRule/',
      modName: 'invBatchRule',
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
      dialogInfoDt: {
        title: '新增批次属性',
        visible: false,
        type: '',
        addDtBtnShow: false,
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'closeDtPage', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'saveDtData', loading: false, show: true }]
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
