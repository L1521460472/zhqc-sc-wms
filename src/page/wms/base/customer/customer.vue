<!--
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-02 14:23:45
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
        <!--  货主名称 -->
        <template v-slot:form-ownerName>
          <remote-list
            :model="topForm.data"
            select-key="ownerName"
            lable="ownerName"
            parame-code="ownerCode"
            :list-url="ownerUrl"
          >
            <template v-slot="scope">
              <span style="float: left; color: #8492a6; font-size: 13px;">{{ scope.item.ownerName }}</span>
            </template>
          </remote-list>
        </template>
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
        template-name="customerService"
        export-url="scwl-wms/base/partner/customer/export"
        export-name="客户基础表"
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
      <el-tabs v-model="activeName" type="card" @tab-click="handleTab">

        <el-tab-pane label="基本信息" name="first">
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
            <!--  货主名称 -->
            <template v-slot:form-ownerName>
              <remote-list
                :model="diaFormInfo.data"
                select-key="ownerName"
                lable="ownerName"
                parame-code="ownerCode"
                :list-url="ownerUrl"
              >
                <template v-slot="scope">
                  <span style="float: left; color: #8492a6; font-size: 13px;">{{ scope.item.ownerName }}</span>
                </template>
              </remote-list>
            </template>
          </zhqc-form>
        </el-tab-pane>

        <!-- <el-tab-pane label="控制信息" name="second">
          <full-pop-item full-pop-item-title="控制信息">
            <zhqc-form
              :ref-obj.sync="diaFormInfo.diaFormInfoControl.ref"
              :form-type="dialogInfo.type"
              :data="diaFormInfo.diaFormInfoControl.data"
              :field-list="diaFormInfo.diaFormInfoControl.fieldList"
              :rules="diaFormInfo.diaFormInfoControl.rules"
              :list-type-info="listTypeInfo"
              :label-width="diaFormInfo.diaFormInfoControl.labelWidth"
              style="padding: 1% 5%"
              @handleEvent="handleEvent"
            >
              <template v-slot:form-checkBoxGroup1="scope">
                <el-checkbox v-model="diaFormInfo.diaFormInfoControl.data.isPrintDrugTestReport" border :true-label="1" :false-label="0" :disabled="!dialogInfo.canEdit">{{ $t('customer.control.isPrintDrugTestReport') }}</el-checkbox>
                <el-checkbox v-model="diaFormInfo.diaFormInfoControl.data.isWholeOrderBatch" border :true-label="1" :false-label="0" :disabled="!dialogInfo.canEdit">{{ $t('customer.control.isWholeOrderBatch') }}</el-checkbox>
                <el-checkbox v-model="diaFormInfo.diaFormInfoControl.data.isWholeBoxBatch" border :true-label="1" :false-label="0" :disabled="!dialogInfo.canEdit">{{ $t('customer.control.isWholeBoxBatch') }}</el-checkbox>
              </template>
            </zhqc-form>
          </full-pop-item>
        </el-tab-pane> -->

      </el-tabs>
    </full-pop>

  </layout-body>
</template>

<script>
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
import customerMixins from './mixins'
import zhqcListProvince from '@/Subassembly/ZhqcList/ListProvince/ListProvince'
import zhqcListCity from '@/Subassembly/ZhqcList/ListCity/ListCity'
import zhqcListArea from '@/Subassembly/ZhqcList/ListArea/ListArea'

export default {
  name: 'Customer',
  components: {
    zhqcListProvince, zhqcListCity, zhqcListArea
  },
  mixins: [customerMixins],
  data() {
    return {
      store: 'customer/',
      modName: 'customer',
      activeName: 'first',
      formType: null,
      viewFlag: null,
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      dialogInfo: {
        title: '',
        visible: false,
        type: '',
        canEdit: false,
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', btLoading: false, show: true }]
      },
      provinceId: null,
      cityId: null,
      ownerUrl: VUE_APP_WMS_MODEL + '/base/partner/owner/queryOwnerCbList'
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

    handleTab() {
    }

  }
}
</script>
