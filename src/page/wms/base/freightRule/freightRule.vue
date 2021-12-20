<!--
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-02 14:32:51
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

        <template v-slot:form-partnerId="scope">
          <list-partner
            :select-key="topForm.data.partnerId"
            :partner-type="carrierCode"
            @select="selectCarrier"
          />
        </template>
      </zhqc-top-form>
    </div>
    <div slot="left-btn">
      <el-button-group>
        <el-button icon="el-icon-folder-add" :disabled="$hasPerm('add')" type="primary" @click="handleClick('openAddPage')">
          {{ $t('table.add') }}
        </el-button>
      </el-button-group>
      <export-vue
        template-name="freightRuleService"
        export-url="partner/freightRule/export"
        export-name="运费规则表"
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
    <!--<zhqc-dialog :title="dialogInfo.title"
                     :visible.sync="dialogInfo.visible"
                     :width="dialogInfo.width"
                     :bt-list="dialogInfo.btList"
                     @handleClick="handleClick">
            <zhqc-form :ref-obj.sync="diaFormInfo.ref"
                       :data="diaFormInfo.data"
                       :field-list="diaFormInfo.fieldList"
                       :rules="diaFormInfo.rules"
                       :list-type-info="listTypeInfo"
                       :label-width="diaFormInfo.labelWidth"
                       @handleClick="handleClick"
                       @handleEvent="handleEvent">
                <template v-slot:form-cpCode="scope">
                    <list-partner @select="selectCarrierForAddOrEdit" :selectKey="diaFormInfo.data.cpCode"
                                  :partnerType="carrierCode"></list-partner>
                </template>
            </zhqc-form>
        </zhqc-dialog>-->
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
          :data="diaFormInfo.data"
          :field-list="diaFormInfo.fieldList"
          :rules="diaFormInfo.rules"
          :list-type-info="listTypeInfo"
          :label-width="diaFormInfo.labelWidth"
        >
          <template v-slot:form-partnerId="scope">
            <list-partner
              :select-key="diaFormInfo.data.partnerId"
              :partner-type="carrierCode"
              @select="selectCarrierForAddOrEdit"
            />
          </template>
          <template v-slot:form-provinceId="scope">
            <zhqc-list-province
              :select-key="diaFormInfo.data.provinceId"
              :disabled="dialogInfo.type=='view'"
              @select="selectProvince"
            />
          </template>
          <template v-slot:form-cityId="scope">
            <zhqc-list-city
              :select-key="diaFormInfo.data.cityId"
              :province-id="provinceId"
              :disabled="dialogInfo.type=='view'"
              @select="selectCity"
            />
          </template>
          <template v-slot:form-areaId="scope">
            <zhqc-list-area
              :select-key="diaFormInfo.data.areaId"
              :city-id="cityId"
              :disabled="dialogInfo.type=='view'"
              @select="selectArea"
            />
          </template>
        </zhqc-form>
      </full-pop-item>
      <full-pop-item full-pop-item-title="运费规则明细">
        <vex-dia-table
          :ref-obj.sync="diaFormInfo.subTableInfo.ref"
          :data="diaFormInfo.data.dtList"
          :field-list="diaFormInfo.subTableInfo.fieldList"
          :handle="diaFormInfo.subTableInfo.handle"
          :rules="diaFormInfo.subTableInfo.rules"
          :top-btn="diaFormInfo.subTableInfo.topBtn"
          @handleClick="handleClick"
        />
      </full-pop-item>

    </full-pop>
  </layout-body>
</template>

<script>
import freightRuleMixins from './mixins'
import listPartner from '@/Subassembly/ZhqcList/ListPartner'
import zhqcListProvince from '@/Subassembly/ZhqcList/ListProvince/ListProvince'
import zhqcListCity from '@/Subassembly/ZhqcList/ListCity/ListCity'
import zhqcListArea from '@/Subassembly/ZhqcList/ListArea/ListArea'

export default {
  name: 'FreightRule',
  components: { zhqcListProvince, zhqcListCity, zhqcListArea, listPartner },
  mixins: [freightRuleMixins],
  data() {
    return {
      store: 'freightRule/',
      modName: 'freightRule',
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      dialogInfo: {
        title: '',
        visible: false,
        type: '',
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          {
            label: this.$t('table.save'),
            type: 'primary',
            icon: '',
            event: 'save',
            btLoading: false,
            show: true
          }]
      },
      carrierCode: 'CARRIER',
      provinceId: null,
      cityId: null
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
        this.provinceId = null
        this.cityId = null
        this.resetFormData()
      }
    }
  },
  mounted() {

  },
  methods: {
    selectCarrier(data) {
      this.topForm.data.partnerId = data
    },
    selectCarrierForAddOrEdit(data) {
      this.diaFormInfo.data.partnerId = data
    },
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
    }
  }
}
</script>
