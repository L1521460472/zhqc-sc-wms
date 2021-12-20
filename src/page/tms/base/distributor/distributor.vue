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
        template-name="distributorService"
        export-url="base/distributor/export"
        export-name="客户基础表"
        @exportParam="exportData"
      />
    </div>

    <div slot="tab-body">
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
          <el-button size="mini" type="primary" :disabled="false" @click="openViewPage(scope.data.row)">{{ $t('table.view') }}</el-button>
          <el-button size="mini" type="success" :disabled="false" @click="openEditPage(scope.data.row)">{{ $t('table.edit') }}</el-button>
          <el-button size="mini" type="danger" :disabled="false" @click="stopData(scope.data.row)">停用</el-button>
          <el-button size="mini" type="danger" :disabled="false" @click="beginData(scope.data.row)">起用</el-button>
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
      :top-title="dialogInfo.title"
      :visible.sync="dialogInfo.visible"
      :close-btn="dialogInfo.closeBtn"
      :save-list="dialogInfo.btList"
      @handleClick="handleClick"
    >
      <full-pop-item full-pop-item-title="基本信息">
        <zhqc-form
          :ref-obj.sync="diaFormInfo.ref"
          :data="diaFormInfo.data"
          :field-list="diaFormInfo.fieldList"
          :rules="diaFormInfo.rules"
          :list-type-info="listTypeInfo"
          :label-width="diaFormInfo.labelWidth"
        />

      </full-pop-item>
      <full-pop-item full-pop-item-title="经销区域">
        <el-button
          v-show="['add','edit'].includes(dialogInfo.type)"
          icon="el-icon-folder-add"
          class="add_btn"
          type="primary"
          @click="handleClick('addItem')"
        >添加</el-button>
        <div class="add_table_box">
          <zhqc-table
            :data.sync="popTableInfo.data"
            :field-list="popTableInfo.fieldList"
            :handle="popTableInfo.handle"
            @handleClick="handleClick"
          />
        </div>

      </full-pop-item>
      <zhqc-dialog
        :title="nestingDialogInfo.title"
        :visible.sync="nestingDialogInfo.visible"
        :width="nestingDialogInfo.width"
        :bt-list="nestingDialogInfo.btList"
        @handleClick="handleClick"
      >
        <zhqc-form
          :ref-obj.sync="nestDiaFormInfo.ref"
          :data="nestDiaFormInfo.data"
          :field-list="nestDiaFormInfo.fieldList"
          :rules="nestDiaFormInfo.rules"
          :list-type-info="listTypeInfo"
          :label-width="nestDiaFormInfo.labelWidth"
        />
      </zhqc-dialog>

    </full-pop>
  </layout-body>
</template>

<script>
import distributorMixins from './mixins'
export default {
  name: 'Distributor',
  mixins: [distributorMixins],
  data() {
    return {
      store: 'distributor/',
      modName: 'distributor',
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      dialogInfo: {
        title: '',
        visible: false,
        type: '',
        // 返回按钮
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', btLoading: false, show: true }]
      }
    }
  },
  computed: {

    resp() {
      // return this.$store.state[this.modName].pageResp
      return [{ companyCode: '3434' }]
    },
    total() {
      // return this.$store.state[this.modName].total
      return 100
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

  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>

.add_table_box{
  height: 300px;
}

</style>
