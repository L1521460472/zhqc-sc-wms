<!--
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-02 14:44:33
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
      <export-vue
        template-name="whService"
        export-url="/wms/base/wh/wh/export"
        export-name="仓库"
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
    <zhqc-dialog
      :title="dialogInfo.title"
      :visible.sync="dialogInfo.visible"
      :width="dialogInfo.width"
      :bt-list="dialogInfo.btList"
      @handleClick="handleClick"
    >
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
        <!-- 承运商名称 -->
        <template v-slot:form-carrierName>
          <list-carrierName
            :model="diaFormInfo.data"
            select-key="carrierName"
            lable="carrierName"
            parame-code="carrierCode"
          />
        </template>
      </zhqc-form>
    </zhqc-dialog>
  </layout-body>
</template>

<script>
import whMixins from './mixins'
export default {
  name: 'Wh',
  components: {
    ListCarrierName: () => import('@/Subassembly/ZhqcList/ListCarrierNameSc')
  },
  mixins: [whMixins],
  data() {
    return {
      store: 'wh/',
      modName: 'wh',
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      formType: null,
      viewFlag: null,
      dialogInfo: {
        title: '',
        visible: false,
        type: '',
        width: '200mm',
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', btLoading: false, show: true }]
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

      if (this.dialogInfo.visible && this.dialogInfo.type === 'edit') {
        this.$set(this.diaFormInfo, 'provinceEx', 0)
        this.$set(this.diaFormInfo, 'cityEx', 0)
        this.$set(this.diaFormInfo, 'areaEx', 0)
      }
    },

    'diaFormInfo.data.provinceId'(val) {
      const dialogInfo = this.dialogInfo
      if (!val) {
        this.$set(this.diaFormInfo.data, 'cityId', null)
        this.listTypeInfo.cityList = null
        return
      }
      if (dialogInfo.type === 'edit') {
        this.$set(this.diaFormInfo, 'provinceEx', this.diaFormInfo.provinceEx + 1)
      }
      if ((dialogInfo.type === 'edit' || dialogInfo.type === 'add') && this.diaFormInfo.provinceEx !== 1) {
        this.$set(this.diaFormInfo.data, 'cityId', null)
      }
      this.$store.dispatch(this.store + 'cityList', val).then(() => {
        const resp = this.$store.state[this.modName].cityListResp
        if (resp.code === this.$successCode) {
          this.listTypeInfo.cityList = resp.obj
        }
      })
    },

    'diaFormInfo.data.cityId'(val) {
      const dialogInfo = this.dialogInfo
      if (!val) {
        this.$set(this.diaFormInfo.data, 'areaId', null)
        this.listTypeInfo.areaList = null
        return
      }
      if (dialogInfo.type === 'edit') {
        this.$set(this.diaFormInfo, 'cityEx', this.diaFormInfo.cityEx + 1)
      }
      if ((dialogInfo.type === 'edit' || dialogInfo.type === 'add') && this.diaFormInfo.cityEx !== 1) {
        this.$set(this.diaFormInfo.data, 'areaId', null)
      }
      this.$store.dispatch(this.store + 'areaList', val).then(() => {
        const resp = this.$store.state[this.modName].areaListResp

        if (resp.code === this.$successCode) {
          this.listTypeInfo.areaList = resp.obj
        }
      })
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>
