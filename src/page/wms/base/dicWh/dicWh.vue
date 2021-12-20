<!--
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-02 14:31:44
-->
<template>
  <layout-body-auto>
    <div slot="top-form">
      <!--  主页面top表单 layout-body-auto  -->
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
      </zhqc-top-form>
    </div>
    <div slot="left-btn">
      <el-button-group>
        <el-button
          type="primary"
          icon="el-icon-folder-add"
          :disabled="$hasPerm('add')"
          @click="handleClick('openAddPage')"
        >{{ $t("table.add") }}</el-button>
      </el-button-group>
    </div>

    <div slot="tab-body" class="tab-body_auto">
      <!--  主页面的table表格  -->
      <zhqc-table
        :data.sync="resp"
        :field-list="tableInfo.fieldList"
        :handle="tableInfo.handle"
        @handleClick="handleClick"
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
      <full-pop-item full-pop-item-title="字典类型">
        <zhqc-form
          :form-type="dialogInfo.type"
          :ref-obj.sync="diaFormInfo.ref"
          :data="diaFormInfo.data"
          :field-list="diaFormInfo.fieldList"
          :rules="diaFormInfo.rules"
          :list-type-info="listTypeInfo"
          :label-width="diaFormInfo.labelWidth"
        />
      </full-pop-item>
      <full-pop-item full-pop-item-title="字典类型明细">
        <el-button
          v-show="diaFormInfo.addDtBtnShow"
          icon="el-icon-folder-add"
          @click="handleClick('openAddDtPage')"
        >添加明细</el-button>
        <zhqc-table
          :data.sync="diaFormInfo.dtTableInfo.dtList"
          :field-list="diaFormInfo.dtTableInfo.fieldList"
          :handle="diaFormInfo.dtTableInfo.handle"
          @handleClick="handleClick"
        />
      </full-pop-item>
    </full-pop>
    <!--増、查、改的表单-->
    <zhqc-dialog
      :title="dialogInfoDt.title"
      :visible.sync="dialogInfoDt.visible"
      :width="dialogInfoDt.width"
      :bt-list="dialogInfoDt.btList"
      @handleClick="handleClick"
    >
      <zhqc-form
        :ref-obj.sync="diaFormInfoDt.ref"
        :data="diaFormInfoDt.data"
        :field-list="diaFormInfoDt.fieldList"
        :rules="diaFormInfoDt.rules"
        :list-type-info="listTypeInfo"
        :label-width="diaFormInfoDt.labelWidth"
      />
    </zhqc-dialog>
  </layout-body-auto>
</template>

<script>
import dicWhMixins from './mixins'
export default {
  name: 'DicWh',
  mixins: [dicWhMixins],
  data() {
    return {
      isOpen: false,
      store: 'dicWh/',
      modName: 'dicWh',
      collapsable: false,
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      dialogInfo: {
        title: '',
        visible: false,
        type: '',
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
        btList: [
          {
            label: this.$t('table.close'),
            type: '',
            icon: '',
            event: 'close',
            show: true
          },
          {
            label: this.$t('table.save'),
            type: 'primary',
            icon: '',
            event: 'save',
            btLoading: false,
            show: true
          }
        ]
      },
      dialogInfoDt: {
        title: '新增字典明细',
        visible: false,
        type: '',
        addDtBtnShow: false,
        btList: [
          {
            label: this.$t('table.close'),
            type: '',
            icon: '',
            event: 'closeAddDtPage',
            show: true
          },
          {
            label: this.$t('table.save'),
            type: 'primary',
            icon: '',
            event: 'saveDt',
            loading: false,
            show: true
          }
        ]
      }
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
    collapsable(val) {
      //
      if (val) {
        this.collapsableFormMore()
      } else {
        this.collapsableForm()
      }
    }
  },
  mounted() {},
  methods: {}
}
</script>
