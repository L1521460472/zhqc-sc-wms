<template>
  <layout-body :key="freshKey">
    <div slot="top-form">
      <!--  主页面top表单   -->
      <zhqc-top-form
        :ref-obj.sync="topForm.ref"
        :data="topForm.data"
        :field-list="topForm.fieldList"
        :rules="topForm.rules"
        :label-width="topForm.labelWidth"
        :list-type-info="listTypeInfo"
        @handleClick="handleClick"
        @handleEvent="handleEvent"
      />
    </div>
    <div slot="left-btn">
      <!--  表格上面的功能按钮   -->
      <el-button-group>
        <el-button icon="el-icon-folder-add" :disabled="hasPerm('add')" @click="handleClick('add')">{{ $t('table.add') }}</el-button>
      </el-button-group>
    </div>
    <div slot="right-btn">
      <!--  表格上面的导入导出按钮   -->
      <upload-vue style="display: inline-block" template-name="orgCustomerExcelImport" :disabled="hasPerm('import_excel')" />
      <export-vue
        style="display: inline-block"
        template-name="orgCustomerExcelExport"
        :export-name="exportName"
        export-url="/organization/orgCustomer/export"
        :check-param="true"
        :disabled="hasPerm('export_excel')"
        @exportParam="exportParam"
      />
      <export-template-vue style="display: inline-block" template-url="orgCustomerExcelTemplate" :export-name="templateExportName" :disabled="hasPerm('download_excel_template')" />
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
      <zhqc-page :total="total" :page-request="pageRequest" @pageChange="pageChange" />
    </div>

    <!--増、查、改的表单-->
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
        :list-type-info="listTypeInfo"
        :label-width="diaFormInfo.labelWidth"
      />
    </zhqc-dialog>
  </layout-body>
</template>

<script>
import orgCustomerMixins from './mixins'
export default {
  name: 'OrgCustomer',
  mixins: [orgCustomerMixins],
  data() {
    return {
      store: 'orgCustomer/',
      modName: 'orgCustomer',
      exportName: this.$t('orgCustomer.modelName'),
      templateExportName: this.$t('orgCustomer.modelName') + this.$t('table.template'),
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      dialogInfo: {
        title: '',
        visible: false,
        type: '',
        btList: [
          { label: this.$t('关闭'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('保存'), type: 'primary', icon: '', event: 'save', btLoading: false, show: true }]
      },
      freshKey: 1
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
  }
}
</script>
