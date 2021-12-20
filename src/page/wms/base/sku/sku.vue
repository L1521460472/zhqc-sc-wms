<!--
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-02 14:40:14
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
        <!--<template v-slot:form-ownerId="scope">-->
        <!--<zhqc-list-owner-->
        <!--@select="selectOwner"-->
        <!--:selectKey="topForm.data.ownerId"-->
        <!--&gt;</zhqc-list-owner>-->
        <!--</template>-->
        <!-- 货主 -->
        <template v-slot:form-ownerId="scope">
          <remote-list
            :model="topForm.data"
            select-key="ownerId"
            lable="ownerName"
            parame-code="ownerCode"
            :list-url="ownerUrl"
          >
            <template v-slot="s">
              <span style="float: left; color: #8492a6; font-size: 13px;">{{ s.item.ownerName }}</span>
            </template>
          </remote-list>
        </template>
        <!-- <template v-slot:form-supplierId="scope">
                <zhqc-list-supplier @select="selectSupplier" :selectKey="topForm.data.supplierId" ></zhqc-list-supplier>
              </template> -->
        <!--<template v-slot:form-skuCategoryId="scope">-->
        <!--<zhqc-list-sku-category-->
        <!--@select="selectSkuCategory"-->
        <!--:selectKey="topForm.data.skuCategoryId"-->
        <!--&gt;</zhqc-list-sku-category>-->
        <!--</template>-->
        <!--商品分类-->
        <template v-slot:form-skuCategoryId="scope">
          <remote-list
            :model="topForm.data"
            select-key="skuCategoryId"
            lable="categoryName"
            parame-code="queryText"
            :list-url="skuCategoryUrl"
          >
            <template v-slot="s">
              <span style="float: left; color: #8492a6; font-size: 13px">{{ s.item.categoryCode }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px;margin-left:30px;">{{ scope.item.categoryName }}</span>
            </template>
          </remote-list>
        </template>
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
          <div class="collapsable-item" @click="handleClick('openCollapsable')">
            {{ collapsable ? "收起" : "展开"
            }}<i
              :class="collapsable ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
            />
          </div>
        </template>
        <!-- 展开收起表单结束 -->
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
      <upload-vue
        template-name="skuService"
        :upload-url="uploadUrl"
        @uploadQuery="initData"
      />
      <export-template-vue
        :template-url="templateUrl"
        export-name="商品档案导入模板"
      />
      <export-vue
        template-name="skuService"
        :export-url="exportUrl"
        export-name="商品档案"
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
        <template v-slot:bt-slotEvent="scope">
          <el-button
            v-if="scope.data.row.isEnable === 0"
            size="mini"
            type="success"
            :disabled="$hasPerm('enable')"
            @click="enableEvent(scope.data.row)"
          >启用</el-button>
          <el-button
            v-if="scope.data.row.isEnable == 1"
            size="mini"
            type="warning"
            :disabled="$hasPerm('deactivate')"
            @click="enableEvent(scope.data.row)"
          >停用</el-button>
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
            @handleEvent="handleEvent"
          >
            <template v-slot:form-ownerId="scope">
              <zhqc-list-owner
                :select-key="diaFormInfo.data.ownerId"
                :disabled="!dialogInfo.canEdit"
                @select="selectOwnerDia"
              />
            </template>
            <template v-slot:form-mfgId="scope">
              <zhqc-list-partner
                :select-key="diaFormInfo.data.mfgId"
                :partner-type="mfgCode"
                :disabled="!dialogInfo.canEdit"
                @select="selectMfgDia"
              />
            </template>
            <template v-slot:form-skuCategoryId="scope">
              <zhqc-list-sku-category
                :select-key="diaFormInfo.data.skuCategoryId"
                :disabled="!dialogInfo.canEdit"
                @select="selectSkuCategoryDia"
              />
            </template>
          </zhqc-form>
        </el-tab-pane>
        <el-tab-pane label="控制信息" name="second">
          <full-pop-item full-pop-item-title="控制信息">
            <zhqc-form
              :ref-obj.sync="diaFormInfo.diaFormInfoControl.ref"
              :form-type="formType"
              :class-name="viewFlag"
              :data="diaFormInfo.diaFormInfoControl.data"
              :field-list="diaFormInfo.diaFormInfoControl.fieldList"
              :rules="diaFormInfo.diaFormInfoControl.rules"
              :list-type-info="listTypeInfo"
              :label-width="diaFormInfo.diaFormInfoControl.labelWidth"
              style="padding: 1% 5%"
              @handleEvent="handleEvent"
            >
              <template v-slot:form-paZoneIdArray="scope">
                <el-select
                  v-model="diaFormInfo.diaFormInfoControl.data.paZoneIdArray"
                  filterable
                  multiple
                  clearable
                  :disabled="!dialogInfo.canEdit"
                  :collapse-tags="dialogInfo.canEdit"
                  @change="changePaZoneId"
                >
                  <el-option
                    v-for="item in listTypeInfo.zoneList"
                    :key="item.id"
                    :label="item.zoneName"
                    :value="item.id"
                  />
                </el-select>
              </template>
              <!--<template v-slot:form-paLotIdArray="scope">-->
              <!--<el-select v-model="diaFormInfo.diaFormInfoControl.data.paLotIdArray" filterable multiple clearable :disabled="!dialogInfo.canEdit" @change="changePaLotId"-->
              <!--:collapse-tags="dialogInfo.canEdit">-->
              <!--<el-option-->
              <!--v-for="item in listTypeInfo.lotList"-->
              <!--:label="item.lotCode"-->
              <!--:value="item.id"-->
              <!--:key="item.id"-->
              <!--/>-->
              <!--</el-select>-->
              <!--</template>-->
            </zhqc-form>
          </full-pop-item>
          <full-pop-item full-pop-item-title="补货来源">
            <vex-dia-table
              :data.sync="diaFormInfo.diaTableCpfr.data"
              :field-list="diaFormInfo.diaTableCpfr.fieldList"
              :handle="diaFormInfo.diaTableCpfr.handle"
              :ref-obj.sync="diaFormInfo.diaTableCpfr.ref"
              :rules="diaFormInfo.diaTableCpfr.rules"
              :top-btn="diaFormInfo.diaTableCpfr.topBtn"
              @handleClick="handleClick"
            />
          </full-pop-item>
        </el-tab-pane>
        <el-tab-pane label="GSP信息" name="third">
          <full-pop-item full-pop-item-title="GSP信息">
            <zhqc-form
              :ref-obj.sync="diaFormInfo.diaFormInfoGSP.ref"
              :form-type="formType"
              :class-name="viewFlag"
              :data="diaFormInfo.diaFormInfoGSP.data"
              :field-list="diaFormInfo.diaFormInfoGSP.fieldList"
              :rules="diaFormInfo.diaFormInfoGSP.rules"
              :list-type-info="listTypeInfo"
              :label-width="diaFormInfo.diaFormInfoGSP.labelWidth"
              style="padding: 1% 5%"
              @handleEvent="handleEvent"
            />
          </full-pop-item>
          <full-pop-item full-pop-item-title="GMP证书">
            <vex-dia-table
              :data.sync="diaFormInfo.diaTableGrmp.data"
              :field-list="diaFormInfo.diaTableGrmp.fieldList"
              :handle="diaFormInfo.diaTableGrmp.handle"
              :ref-obj.sync="diaFormInfo.diaTableGrmp.ref"
              :top-btn="diaFormInfo.diaTableGrmp.topBtn"
              @handleClick="handleClick"
            />
          </full-pop-item>
          <full-pop-item full-pop-item-title="批准文号">
            <vex-dia-table
              :data.sync="diaFormInfo.diaTableCert.data"
              :field-list="diaFormInfo.diaTableCert.fieldList"
              :handle="diaFormInfo.diaTableCert.handle"
              :ref-obj.sync="diaFormInfo.diaTableCert.ref"
              :top-btn="diaFormInfo.diaTableCert.topBtn"
              @handleClick="handleClick"
            />
          </full-pop-item>
        </el-tab-pane>
        <el-tab-pane label="耗材" name="fourth">
          <vex-dia-table
            :data.sync="diaFormInfo.diaTableConsumables.data"
            :field-list="diaFormInfo.diaTableConsumables.fieldList"
            :handle="diaFormInfo.diaTableConsumables.handle"
            :ref-obj.sync="diaFormInfo.diaTableConsumables.ref"
            :top-btn="diaFormInfo.diaTableConsumables.topBtn"
            @handleClick="handleClick"
          />
        </el-tab-pane>
        <el-tab-pane label="产品组合" name="five">
          <vex-dia-table
            :data.sync="diaFormInfo.diaTableBom.data"
            :field-list="diaFormInfo.diaTableBom.fieldList"
            :handle="diaFormInfo.diaTableBom.handle"
            :ref-obj.sync="diaFormInfo.diaTableBom.ref"
            :top-btn="diaFormInfo.diaTableBom.topBtn"
            @handleClick="handleClick"
          />
        </el-tab-pane>
        <el-tab-pane label="多供应商" name="six">
          <vex-dia-table
            :data.sync="diaFormInfo.diaTableDim.data"
            :field-list="diaFormInfo.diaTableDim.fieldList"
            :handle="diaFormInfo.diaTableDim.handle"
            :ref-obj.sync="diaFormInfo.diaTableDim.ref"
            :top-btn="diaFormInfo.diaTableDim.topBtn"
            @handleClick="handleClick"
          />
        </el-tab-pane>
      </el-tabs>
    </full-pop>

    <zhqc-dialog
      :title="dialogInfoCpfr.title"
      :visible.sync="dialogInfoCpfr.visible"
      :width="dialogInfoCpfr.width"
      :bt-list="dialogInfoCpfr.btList"
      @handleClick="handleClick"
    >
      <zhqc-form
        :ref-obj.sync="dialogInfoCpfr.formInfo.ref"
        :form-type="dialogInfo.type"
        :data="dialogInfoCpfr.formInfo.data"
        :field-list="dialogInfoCpfr.formInfo.fieldList"
        :rules="dialogInfoCpfr.formInfo.rules"
        :list-type-info="listTypeInfo"
        :label-width="dialogInfoCpfr.formInfo.labelWidth"
      >
        <template v-slot:form-cpfrLotId="scope">
          <zhqc-list-wh-lot
            :select-key="dialogInfoCpfr.formInfo.data.cpfrLotId"
            :is-pick="true"
            @select="selectCpfrLotId"
          />
        </template>
      </zhqc-form>
    </zhqc-dialog>
    <zhqc-dialog
      :title="dialogInfoGrmp.title"
      :visible.sync="dialogInfoGrmp.visible"
      :width="dialogInfoGrmp.width"
      :bt-list="dialogInfoGrmp.btList"
      @handleClick="handleClick"
    >
      <zhqc-form
        :ref-obj.sync="dialogInfoGrmp.formInfo.ref"
        :form-type="dialogInfo.type"
        :data="dialogInfoGrmp.formInfo.data"
        :field-list="dialogInfoGrmp.formInfo.fieldList"
        :rules="dialogInfoGrmp.formInfo.rules"
        :list-type-info="listTypeInfo"
        :label-width="dialogInfoGrmp.formInfo.labelWidth"
      >
        <template v-slot:form-factoryId="scope">
          <zhqc-list-partner
            :select-key="dialogInfoGrmp.formInfo.data.factoryId"
            :partner-type="mfgCode"
            @select="selectFactoryId"
          />
        </template>
      </zhqc-form>
    </zhqc-dialog>
    <zhqc-dialog
      :title="dialogInfoCert.title"
      :visible.sync="dialogInfoCert.visible"
      :width="dialogInfoCert.width"
      :bt-list="dialogInfoCert.btList"
      @handleClick="handleClick"
    >
      <zhqc-form
        :ref-obj.sync="dialogInfoCert.formInfo.ref"
        :form-type="dialogInfo.type"
        :data="dialogInfoCert.formInfo.data"
        :field-list="dialogInfoCert.formInfo.fieldList"
        :rules="dialogInfoCert.formInfo.rules"
        :list-type-info="listTypeInfo"
        :label-width="dialogInfoCert.formInfo.labelWidth"
      />
    </zhqc-dialog>
    <zhqc-dialog
      :title="dialogInfoBom.title"
      :visible.sync="dialogInfoBom.visible"
      :width="dialogInfoBom.width"
      :bt-list="dialogInfoBom.btList"
      @handleClick="handleClick"
    >
      <zhqc-form
        :ref-obj.sync="dialogInfoBom.formInfo.ref"
        :form-type="dialogInfo.type"
        :data="dialogInfoBom.formInfo.data"
        :field-list="dialogInfoBom.formInfo.fieldList"
        :rules="dialogInfoBom.formInfo.rules"
        :list-type-info="listTypeInfo"
        :label-width="dialogInfoBom.formInfo.labelWidth"
      >
        <template v-slot:form-bomSkuId="scope">
          <zhqc-list-sku
            :select-key="dialogInfoBom.formInfo.data.bomSkuId"
            :is-consumables="isConsumables"
            @select="selectBomSkuId"
          />
        </template>
      </zhqc-form>
    </zhqc-dialog>
    <zhqc-dialog
      :title="dialogInfoDim.title"
      :visible.sync="dialogInfoDim.visible"
      :width="dialogInfoDim.width"
      :bt-list="dialogInfoDim.btList"
      @handleClick="handleClick"
    >
      <zhqc-form
        :ref-obj.sync="dialogInfoDim.formInfo.ref"
        :form-type="dialogInfo.type"
        :data="dialogInfoDim.formInfo.data"
        :field-list="dialogInfoDim.formInfo.fieldList"
        :rules="dialogInfoDim.formInfo.rules"
        :list-type-info="listTypeInfo"
        :label-width="dialogInfoDim.formInfo.labelWidth"
      >
        <template v-slot:form-supplierId="scope">
          <zhqc-list-supplier
            :select-key="dialogInfoDim.formInfo.data.supplierId"
            @select="selectDimSupplierId"
          />
        </template>
      </zhqc-form>
    </zhqc-dialog>
  </layout-body>
</template>

<script>
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
import skuMixins from './mixins'
import zhqcListOwner from '@/Subassembly/ZhqcList/ListOwner'
import zhqcListSupplier from '@/Subassembly/ZhqcList/ListSupplier'
import zhqcListPartner from '@/Subassembly/ZhqcList/ListPartner'
import zhqcListWhLot from '@/Subassembly/ZhqcList/ListWhLot'
import zhqcListSku from '@/Subassembly/ZhqcList/ListSku'
import zhqcListSkuCategory from '@/Subassembly/ZhqcList/ListSkuCategory'
export default {
  name: 'Sku',
  components: {
    zhqcListOwner,
    zhqcListSupplier,
    zhqcListPartner,
    zhqcListWhLot,
    zhqcListSku,
    zhqcListSkuCategory
  },
  mixins: [skuMixins],
  data() {
    return {
      store: 'sku/',
      modName: 'sku',
      collapsable: false, // 展开收缩
      formType: null,
      viewFlag: null,
      skuCategoryUrl: VUE_APP_WMS_MODEL + '/base/sku/skuCategory/queryCbList',
      ownerUrl: VUE_APP_WMS_MODEL + '/base/partner/owner/queryOwnerCbList',
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      activeName: 'first',
      exportUrl: VUE_APP_WMS_MODEL + '/base/sku/sku/export',
      defaultRule: {
        invTurnoverRuleId: null,
        recRuleId: null,
        qcRuleId: null,
        paRuleId: null,
        cpfrRuleId: null,
        batchRuleId: null,
        serialNumberRuleId: null,
        assignRuleId: null
      },
      diaEdit: false,
      dialogInfo: {
        title: '',
        visible: false,
        type: '',
        canEdit: false,
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
      delBomList: [],
      delCertList: [],
      delCpfrList: [],
      delConsumablesList: [],
      delDimensionList: [],
      tableData: [],
      isConsumables: null,
      mfgCode: null,
      uploadUrl: VUE_APP_WMS_MODEL + '/base/sku/sku/upload',
      templateUrl: VUE_APP_WMS_MODEL + '/base/sku/sku/template/skuTemplate'
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
        this.delBomList = []
        this.delCertList = []
        this.delCpfrList = []
        this.delConsumablesList = []
        this.delDimensionList = []
      }
    },
    // 展开收缩
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
  methods: {
    selectOwner(data) {
      this.topForm.data.ownerId = data
    },
    selectSupplier(data) {
      this.topForm.data.supplierId = data
    },
    selectSkuCategory(data) {
      this.topForm.data.skuCategoryId = data
    },
    selectSkuCategoryDia(data) {
      this.diaFormInfo.data.skuCategoryId = data
    },
    selectOwnerDia(data) {
      this.diaFormInfo.data.ownerId = data
    },
    selectMfgDia(data) {
      this.diaFormInfo.data.mfgId = data
    },
    selectCpfrLotId(data, obj) {
      this.dialogInfoCpfr.formInfo.data.cpfrLotId = data
      this.dialogInfoCpfr.formInfo.data.cpfrLotName = obj.lotName
    },
    selectFactoryId(data, obj) {
      this.dialogInfoGrmp.formInfo.data.factoryId = data
      this.dialogInfoGrmp.formInfo.data.factoryName = obj.fullName
    },
    selectBomSkuId(data, obj) {
      this.dialogInfoBom.formInfo.data.bomSkuId = data
      this.dialogInfoBom.formInfo.data.bomSkuCode = obj.skuCode
      this.dialogInfoBom.formInfo.data.bomSkuName = obj.skuName
      this.dialogInfoBom.formInfo.data.bomSpec = obj.spec
      this.dialogInfoBom.formInfo.data.bomSkuCategory = obj.skuCategoryName
      this.dialogInfoBom.formInfo.data.bomBarcode = obj.barcode
    },
    selectDimSupplierId(data, obj) {
      this.dialogInfoDim.formInfo.data.supplierId = obj.id
      this.dialogInfoDim.formInfo.data.supplierName = obj.supplierName
    },
    changePaZoneId() {
      this.diaFormInfo.diaFormInfoControl.data.paLotCodeArray = null
    },
    changePaLotCode() {
      this.diaFormInfo.diaFormInfoControl.data.paZoneIdArray = null
    },
    handleTab() {
      if (this.activeName === 'second') {
        this.diaFormInfo.diaTableCpfr.ref.recalculate(true)
      } else if (this.activeName === 'third') {
        this.diaFormInfo.diaTableGrmp.ref.recalculate(true)
        this.diaFormInfo.diaTableCert.ref.recalculate(true)
      } else if (this.activeName === 'fourth') {
        this.diaFormInfo.diaTableConsumables.ref.recalculate(true)
      } else if (this.activeName === 'five') {
        this.diaFormInfo.diaTableBom.ref.recalculate(true)
      } else if (this.activeName === 'six') {
        this.diaFormInfo.diaTableDim.ref.recalculate(true)
      }
    },
    // 清空参照下拉框
    clearRefList() {
      this.diaFormInfo.data.skuCategoryId = null
      this.diaFormInfo.data.ownerId = null
      this.diaFormInfo.data.supplierId = null
      this.diaFormInfo.data.mfgId = null
      this.diaFormInfo.diaFormInfoControl.data.defaultZoneId = null
      this.diaFormInfo.diaFormInfoControl.data.defaultLotId = null
      this.diaFormInfo.diaFormInfoControl.data.paLotId = null
      this.dialogInfoCpfr.formInfo.data.cpfrLotId = null
      this.dialogInfoGrmp.formInfo.data.factoryId = null
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
/*编辑表格-验证提示*/
.vxe-table--valid-error {
  z-index: 1200 !important;
}
</style>
