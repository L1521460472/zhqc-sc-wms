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
      <!--  表格上面的功能按钮
			<el-button-group>
				<el-button icon="el-icon-folder-add" @click="handleClick('add')" :disabled="hasPerm('add')">{{$t('table.add')}}</el-button>
			</el-button-group>-->
    </div>
    <div slot="right-btn">
      <!--  表格上面的导入导出按钮   -->
      <upload-vue style="display: inline-block" template-name="productCategorySkuPropertyExcelImport" :disabled="hasPerm('import_excel')" />
      <export-vue
        style="display: inline-block"
        template-name="productCategorySkuPropertyExcelExport"
        :export-name="exportName"
        export-url="/product/productCategorySkuProperty/export"
        :check-param="true"
        :disabled="hasPerm('export_excel')"
        @exportParam="exportParam"
      />
      <export-template-vue style="display: inline-block" template-url="productCategorySkuPropertyExcelTemplate" :export-name="templateExportName" :disabled="hasPerm('download_excel_template')" />
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

    <!--増、改 子项的表单-->
    <zhqc-dialog
      :title="diaFormInfo.subTableInfo.formInfo.title"
      :visible.sync="diaFormInfo.subTableInfo.formInfo.visible"
      :width="diaFormInfo.subTableInfo.formInfo.width"
      :bt-list="diaFormInfo.subTableInfo.formInfo.btList"
      @handleClick="handleClick"
    >
      <zhqc-form
        :form-type="dialogInfo.type"
        :ref-obj.sync="diaFormInfo.subTableInfo.formInfo.ref"
        :data="diaFormInfo.subTableInfo.formInfo.data"
        :field-list="diaFormInfo.subTableInfo.formList"
        :rules="diaFormInfo.subTableInfo.rules"
        :list-type-info="listTypeInfo"
        :label-width="diaFormInfo.labelWidth"
      />
    </zhqc-dialog>

    <!--増、查、改的表单-->
    <full-pop
      :top-title="dialogInfo.title"
      :visible.sync="dialogInfo.visible"
      :width="dialogInfo.width"
      :close-btn="dialogInfo.closeBtn"
      :save-list="dialogInfo.btList"
      @handleClick="handleClick"
    >
      <full-pop-item :full-pop-item-title="diaFormInfo.title">
        <zhqc-form
          :ref-obj.sync="diaFormInfo.ref"
          :form-type="dialogInfo.type"
          :data="diaFormInfo.data"
          :field-list="diaFormInfo.fieldList"
          :rules="diaFormInfo.rules"
          :list-type-info="listTypeInfo"
          :label-width="diaFormInfo.labelWidth"
        />
      </full-pop-item>
      <full-pop-item :full-pop-item-title="diaFormInfo.subTableInfo.title">
        <el-button-group v-if="diaFormInfo.subTableInfo.addShow">
          <el-button icon="el-icon-folder-add" :disabled="hasPerm('add')" @click="handleClick('addSub')">{{ $t('table.add') }}</el-button>
        </el-button-group>
        <zhqc-table
          :data.sync="diaFormInfo.data.subRecords"
          :field-list="diaFormInfo.subTableInfo.fieldList"
          :handle="diaFormInfo.subTableInfo.handle"
          @handleClick="handleClick"
        />
      </full-pop-item>
    </full-pop>
  </layout-body>
</template>

<script>
import productCategorySkuPropertyMixins from './mixins'
export default {
  name: 'ProductCategorySkuProperty',
  mixins: [productCategorySkuPropertyMixins],
  data() {
    return {
      store: 'productCategorySkuProperty/',
      modName: 'productCategorySkuProperty',
      exportName: this.$t('productCategorySkuProperty.modelName'),
      templateExportName: this.$t('productCategorySkuProperty.modelName') + this.$t('table.template'),
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      dialogInfo: {
        title: '',
        visible: false,
        type: '',
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', btLoading: false, show: true }
        ]
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
