<!--
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-02 16:12:08
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
      <!--<export-vue templateName="waveModelService"-->
      <!--exportUrl="ob/waveModel/export"-->
      <!--exportName="出库-波次模板"-->
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
      >
        <template v-slot:bt-slotEvent="scope">
          <el-button v-if="scope.data.row.isEnable != 1" size="mini" type="success" :disabled="$hasPerm('edit')" @click="openEditPage(scope.data.row)">编辑</el-button>
          <el-button v-if="scope.data.row.isEnable != 1" size="mini" type="warning" :disabled="$hasPerm('enable')" @click="enableEvent(scope.data.row)">启用</el-button>
          <el-button v-if=" scope.data.row.isEnable==1" size="mini" type="danger" :disabled="$hasPerm('deactivate')" @click="deactivateEvent(scope.data.row)">停用</el-button>
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
      <full-pop-item full-pop-item-title="波次模板信息">
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
          <template v-slot:form-soTypeList="scope">
            <el-select v-model="diaFormInfo.data.soTypeList" :multiple="true" :disabled="dialogInfo.type=='view'">
              <el-option
                v-for="(childItem, childIndex) in listTypeInfo.soTypeList"
                :key="childIndex"
                :label="childItem.key"
                :value="childItem.value"
              />
            </el-select>
          </template>
          <template v-slot:form-soStatusList="scope">
            <el-select v-model="diaFormInfo.data.soStatusList" :multiple="true" :disabled="dialogInfo.type=='view'">
              <el-option
                v-for="(childItem, childIndex) in listTypeInfo.soStatusList"
                :key="childIndex"
                :label="childItem.key"
                :value="childItem.value"
              />
            </el-select>
          </template>
          <template v-slot:form-ownerId="scope">
            <zhqc-list-owner :select-key="diaFormInfo.data.ownerId" :disabled="dialogInfo.type=='view'" @select="selectOwnerDia" />
          </template>
          <template v-slot:form-partnerId="scope">
            <zhqc-list-partner :select-key="diaFormInfo.data.partnerId" :partner-type="carrierCode" :disabled="dialogInfo.type=='view'" @select="selectPartnerDia" />
          </template>
          <template v-slot:form-partnerStoreId="scope">
            <list-store :select-key="diaFormInfo.data.partnerStoreId" :disabled="dialogInfo.type=='view'" @select="selectPartnerStoreDia" />
          </template>
          <template v-slot:form-provinceId="scope">
            <zhqc-list-province :select-key="diaFormInfo.data.provinceId" :disabled="dialogInfo.type=='view'" @select="selectProvinceDia" />
          </template>
          <template v-slot:form-cityId="scope">
            <zhqc-list-city :select-key="diaFormInfo.data.cityId" :province-id="provinceId" :disabled="dialogInfo.type=='view'" @select="selectCityDia" />
          </template>
        </zhqc-form>
      </full-pop-item>
      <full-pop-item full-pop-item-title="波次模板产品">
        <vex-dia-table
          :ref-obj.sync="diaFormInfo.tableInfoSku.ref"
          :data.sync="diaFormInfo.tableInfoSku.data"
          :field-list="diaFormInfo.tableInfoSku.fieldList"
          :handle="diaFormInfo.tableInfoSku.handle"
          :top-btn="diaFormInfo.tableInfoSku.topBtn"
          @handleClick="handleClick"
        />
      </full-pop-item>
    </full-pop>
    <!--増、查、改的表单-->
    <zhqc-dialog
      :title="dialogInfoSku.title"
      :visible.sync="dialogInfoSku.visible"
      :width="dialogInfoSku.width"
      :bt-list="dialogInfoSku.btList"
      @handleClick="handleClick"
    >
      <zhqc-form
        :ref-obj.sync="diaFormInfoSku.ref"
        :form-type="diaFormInfoSku.type"
        :data="diaFormInfoSku.data"
        :field-list="diaFormInfoSku.fieldList"
        :rules="diaFormInfoSku.rules"
        :list-type-info="listTypeInfo"
        :label-width="diaFormInfoSku.labelWidth"
      >
        <template v-slot:form-skuId="scope">
          <zhqc-list-sku :select-key="diaFormInfoSku.data.skuId" @select="selectSkuDia" />
        </template>
      </zhqc-form>
    </zhqc-dialog>
  </layout-body>
</template>

<script>
import waveModelMixins from './mixins'
import zhqcListOwner from '@/Subassembly/ZhqcList/ListOwner'
import zhqcListPartner from '@/Subassembly/ZhqcList/ListPartner'
import zhqcListProvince from '@/Subassembly/ZhqcList/ListProvince/ListProvince'
import zhqcListCity from '@/Subassembly/ZhqcList/ListCity/ListCity'
import listStore from '@/Subassembly/ZhqcList/ListStore'
import zhqcListSku from '@/Subassembly/ZhqcList/ListSku'

export default {
  name: 'WaveModel',
  components: {
    zhqcListOwner, zhqcListPartner,
    zhqcListProvince, zhqcListCity,
    listStore, zhqcListSku
  },
  mixins: [waveModelMixins],
  data() {
    return {
      store: 'waveModel/',
      modName: 'waveModel',
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      formType: null,
      viewFlag: null,
      dialogInfo: {
        title: '',
        visible: false,
        type: '',
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', btLoading: false, show: true }]
      },
      dialogInfoSku: {
        title: '添加产品',
        visible: false,
        type: '',
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'closeSkuPage', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'saveSkuPage', btLoading: false, show: true }]
      },
      provinceId: null,
      carrierCode: null
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
    selectOwnerDia(data, obj) {
      this.diaFormInfo.data.ownerId = data
      this.diaFormInfo.data.ownerName = obj.ownerName
    },
    selectPartnerDia(data, obj) {
      this.diaFormInfo.data.partnerId = data
      this.diaFormInfo.data.partnerName = obj.fullName
    },
    selectPartnerStoreDia(data, obj) {
      this.diaFormInfo.data.partnerStoreId = data
      this.diaFormInfo.data.partnerStoreName = obj.fullName
    },
    selectProvinceDia(data) {
      this.diaFormInfo.data.provinceId = data
      this.diaFormInfo.data.cityId = null
      this.provinceId = data
    },
    selectCityDia(data) {
      this.diaFormInfo.data.cityId = data
    },
    selectSkuDia(data, obj) {
      this.diaFormInfoSku.data.skuId = data
      this.diaFormInfoSku.data.skuCode = obj.skuCode
      this.diaFormInfoSku.data.barcode = obj.barcode
      this.diaFormInfoSku.data.skuName = obj.skuName
      this.diaFormInfoSku.data.tradeName = obj.tradeName
      this.diaFormInfoSku.data.spec = obj.spec
      this.diaFormInfoSku.data.mainUnit = obj.mainUnit
      this.diaFormInfoSku.data.drugForm = obj.drugForm
      this.diaFormInfoSku.data.mfgName = obj.mfgName
      this.diaFormInfoSku.data.originCountry = obj.originCountry
      this.diaFormInfoSku.data.approvalNumber = obj.approvalNumber
      this.diaFormInfoSku.data.brandName = obj.brandName
      this.diaFormInfoSku.data.tempControlName = obj.tempControlName
      this.diaFormInfoSku.data.validityDay = obj.validityDay
    }
  }
}
</script>
