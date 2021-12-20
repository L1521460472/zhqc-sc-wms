/* eslint-disable vue/no-template-shadow */
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
        <!-- 发货仓库 -->
        <template v-slot:form-shipper="scope">
          <remote-list-two
            :model="topForm.data"
            :item="scope.item"
            :list-url="consigneeUrl"
            :type="1"
          />
        </template>
        <!-- 收货仓库 -->
        <template v-slot:form-consignee="scope">
          <remote-list-two
            :model="topForm.data"
            :item="scope.item"
            :list-url="consigneeUrl"
          />
        </template>
        <!-- 客户 -->
        <template v-slot:form-customerId="scope">
          <list-customer :select-key="topForm.data.customerId" @select="selectCustomer" />
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
        <el-button icon="el-icon-folder-add" @click="handleClick('openPopZhqcDragList')">自定义列</el-button>
      </el-button-group>
      <export-vue
        template-name="outOrderService"
        :export-url="exportUrl"
        export-name="出库管理-出库订单"
        @exportParam="exportData"
      />
      <upload-vue
        template-name="outOrderService"
        :upload-url="uploadUrl"
        @uploadQuery="uploadQueryFn"
      />
      <export-template-vue
        :template-url="templateUrl"
        export-name="出库管理-出库订单导入模板"
      />

    </div>
    <!--  自定义弹窗组件  -->
    <zhqc-draggable
      :title="dialogDragInfo.title"
      :visible.sync="dialogDragInfo.visible"
      :width="dialogDragInfo.width"
      :bt-list="dialogDragInfo.btList"
      :list="draggableList"
      @handleClick="handleClick"
    />

    <div slot="tab-body" class="tab-body_auto">
      <zhqc-switch-tabs
        v-model="activeName"
        :tabs-list="tabsList"
        @change="tabsChange"
      />
      <!--  主页面的table表格  -->
      <div class="table-wrap">
        <zhqc-table
          :data.sync="resp"
          :field-list="tableInfo.fieldList"
          :handle="null"
          @handleClick="handleClick"
          @handleEvent="handleEvent"
        >
          <template v-slot:col-status="scope">
            <buttonList
              :row="scope.row"
              :bt-list="tableInfo.handle.btList"
              @handleClick="handleClick"
            />
          </template>
        </zhqc-table>
      </div>
    </div>

    <div slot="bottom-page">
      <!--  分页组件   -->
      <zhqc-page
        :total="total"
        :page-request="pageRequest"
        :bt-list="batchBtnArray"
        @pageChange="pageChange"
        @handleClick="handleClick"
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
      <full-pop-item full-pop-item-title="订单信息">
        <zhqc-form
          :ref-obj.sync="diaFormInfo.ref"
          :data="diaFormInfo.data"
          :field-list="diaFormInfo.fieldList"
          :rules="diaFormInfo.rules"
          :list-type-info="listTypeInfo"
          :label-width="diaFormInfo.labelWidth"
          :form-type="formType"
          :class-name="viewFlag"
          @handleEvent="handleEvent"
        >
          <!-- 货主名称 -->
          <template v-slot:form-ownerId="scope">
            <list-owner :select-key="diaFormInfo.data.ownerId" :disabled="dialogInfo.type=='view'" @select="selectOwnerDia" />
          </template>
          <!-- 发货方 -->
          <template v-slot:form-shipper="scope">
            <remote-list-two
              :model="diaFormInfo.data"
              :item="scope.item"
              :list-url="consigneeUrl"
              :type="1"
            />
          </template>
          <!-- <template v-slot:form-shipper="scope">
            <list-consigner :select-key="diaFormInfo.data.shipper" :disabled="dialogInfo.type=='view'" @select="selectConsignerDia" />
          </template> -->
          <!-- 收货省份 -->
          <template v-slot:form-receivingProvince="scope">
            <zhqc-list-province :select-key="diaFormInfo.data.receivingProvince" :disabled="dialogInfo.type=='view'" @select="selectProvince" />
          </template>
          <!--收货方 -->
          <template v-slot:form-consignee="scope">
            <remote-list-two
              :model="diaFormInfo.data"
              :item="scope.item"
              :list-url="consigneeUrl"
              :type="0"
              @select="selectReceivingPartyDia"
            />
          </template>
          <!-- <template v-slot:form-consignee="scope">
            <list-consigner-new :select-key="diaFormInfo.data.consignee" :disabled="dialogInfo.type=='view'" :order-req-url="outOrderUrl" @select="selectReceivingPartyDia" />
          </template> -->
          <!-- 承运商名称 -->
          <!-- <template v-slot:form-partnerId="scope">
            <list-carrierName :select-key="diaFormInfo.data.partnerId" :disabled="dialogInfo.type=='view'" @select="selectCarrierNameDia" />
          </template> -->
          <template v-slot:form-carrierName="scope">
            <list-carrierName
              :model="diaFormInfo.data"
              select-key="carrierName"
              lable="carrierName"
              parame-code="carrierCode"
              @select="selectCarrierNameDia"
            />

          </template>
          <!--客户-->
          <template v-slot:form-customerId="scope">
            <list-customer :select-key="diaFormInfo.data.customerId" :disabled="dialogInfo.type=='view'" @select="selectCustomerDia" />
          </template>
          <template v-slot:form-courierName="scope">
            <list-partner :select-key="diaFormInfo.data.courierName" :partner-type="carrierCode" :disabled="dialogInfo.type=='view'" @select="selectPartnerDia" />
          </template>
          <template v-slot:form-whId="scope">
            <list-wh-id :select-key="diaFormInfo.data.whId" :disabled="dialogInfo.type=='view'" @select="selectWhIdDia" />
          </template>
          <template v-slot:form-storeName="scope">
            <zhqc-list-store :select-key="diaFormInfo.data.storeName" :disabled="dialogInfo.type=='view'" @select="selectPartnerStoreDia" />
          </template>
          <!--  收货城市 -->
          <template v-slot:form-receivingCity="scope">
            <zhqc-list-city :select-key="diaFormInfo.data.receivingCity" :province-id="receivingProvince" :disabled="dialogInfo.type=='view'" @select="selectCity" />
          </template>
          <!-- 收货地区 -->
          <template v-slot:form-receivingArea="scope">
            <zhqc-list-area :select-key="diaFormInfo.data.receivingArea" :city-id="receivingCity" :disabled="dialogInfo.type=='view'" @select="selectArea" />
          </template>
          <template v-slot:form-skuCode="scope">
            <list-skuCode :select-key="diaFormInfo.data.skuCode" :sku-code="diaSkuCode" @select="selectSupplier" />
          </template>
        </zhqc-form>
      </full-pop-item>
      <full-pop-item full-pop-item-title="订单明细">
        <vex-dia-table
          :data.sync="diaFormInfo.dtTableInfo.data"
          :field-list="diaFormInfo.dtTableInfo.fieldList"
          :handle="diaFormInfo.dtTableInfo.handle"
          :ref-obj.sync="diaFormInfo.dtTableInfo.ref"
          :top-btn="diaFormInfo.dtTableInfo.topBtn"
          @handleClick="handleClick"
        />
      </full-pop-item>
    </full-pop>
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
        :form-type="dialogInfo.type"
        :rules="diaFormInfoDt.rules"
        :list-type-info="listTypeInfo"
        :label-width="diaFormInfoDt.labelWidth"
      >
        <template v-slot:form-skuName="scope">
          <list-sku-name :select-key="diaFormInfoDt.data.skuName" :owner-id="ownerId" @select="selectSku" />
        </template>
        <template v-slot:form-supplierId="scope">
          <list-supplier-sku :select-key="diaFormInfoDt.data.supplierId" :sku-code="diaSkuCode" @select="selectSupplier" />
        </template>
      </zhqc-form>
    </zhqc-dialog>

  </layout-body>
</template>

<script>
import { VUE_APP_OMS_MODEL } from '@/api/api.config.js'
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
import outOrderMixins from './mixins'
// import listConsigner from '@/Subassembly/ZhqcList/ListConsigner'
// import listCarrierName from '@/Subassembly/ZhqcList/ListCarrierName'
import listOwner from '@/Subassembly/ZhqcList/ListOwner'
import listWhId from '@/Subassembly/ZhqcList/ListWhId'
import listSkuCode from '@/Subassembly/ZhqcList/ListSkuCode'
import listSkuName from '@/Subassembly/ZhqcList/ListSkuName'
import listCustomer from '@/Subassembly/ZhqcList/ListCustomer'
import listPartner from '@/Subassembly/ZhqcList/ListPartner'
import listSupplierSku from '@/Subassembly/ZhqcList/ListSupplierSku'
import ZhqcListStore from '@/Subassembly/ZhqcList/ListStore'
import zhqcListProvince from '@/Subassembly/ZhqcList/ListProvince/ListProvince'
import zhqcListCity from '@/Subassembly/ZhqcList/ListCity/ListCity'
import zhqcListArea from '@/Subassembly/ZhqcList/ListArea/ListArea'
// import listConsignerNew from '@/Subassembly/ZhqcList/ListConsignerNew'
import serverColumns from '../../../../layout/Home/mixin/serverColumns'
import buttonList from './components/buttonList' // 更多按钮需要引入
export default {
  name: 'OutOrder',
  components: {
    listOwner,
    listCustomer,
    listPartner,
    // listConsignerNew,
    zhqcListProvince,
    zhqcListCity,
    zhqcListArea,
    ZhqcListStore,
    // listCarrierName,
    ListCarrierName: () => import('@/Subassembly/ZhqcList/ListCarrierNameSc'),
    listSupplierSku,
    listWhId,
    listSkuCode,
    listSkuName,
    buttonList
    // listConsigner
  },
  mixins: [outOrderMixins, serverColumns],
  data() {
    return {
      store: 'outOrder/',
      modName: 'outOrder',
      collapsable: false, // 展开收缩
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      outOrderUrl: null,
      dialogInfo: {
        title: '',
        visible: false,
        type: '',
        width: '1200px',
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
            loading: false,
            show: true
          }
        ]
      },
      dialogInfoDt: {
        title: '新增订单明细',
        visible: false,
        type: '',
        width: '800px',
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
      },
      provinceId: null,
      cityId: null,
      receivingProvince: null,
      receivingCity: null,
      partnerStoreId: null,
      carrierCode: null,
      diaSkuCode: null,
      checkedIds: [],
      ownerId: null,
      whId: null,
      tempGrossWeightKg: null,
      tempGrossWeight: null,
      tempVolDec: null,
      tempVol: null,
      formType: null,
      viewFlag: null,
      consigneeUrl: VUE_APP_WMS_MODEL + '/base/wh/whArea/queryVirtualwhList',
      whUrl: VUE_APP_WMS_MODEL + '/base/wh/wh/whName',
      ownerUrl: VUE_APP_WMS_MODEL + '/base/partner/owner/queryOwnerCbList',
      exportUrl: VUE_APP_OMS_MODEL + '/order/outOrder/export',
      uploadUrl: VUE_APP_OMS_MODEL + '/order/outOrder/upload',
      templateUrl: VUE_APP_OMS_MODEL + '/order/outOrder/template/outOrderTemplate',
      carrierUrl: VUE_APP_WMS_MODEL + '/carrier/carrier/selectCarrierInfo', // {process.env.VUE_APP_WMS_MODEL}/carrier/carrier/selectCarrierInfo
      type: 'element-ui',
      tabsList: [
        { label: '全部', value: 0 },
        { label: '异常', value: 1, num: 0 }
      ],
      activeName: 0,
      agGridGroupPrarms: { showAction: true, actionWidth: 220 },
      batchBtnArray: [
        {
          label: this.$t('批量下发'),
          type: 'success',
          icon: '',
          event: 'handleBatchCreateSo',
          btLoading: false,
          show: true,
          disabled: true
        }
      ]
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
    // 展开收缩
    collapsable(val) {
      //
      if (val) {
        this.collapsableFormMore()
      } else {
        this.collapsableForm()
      }
    },
    'diaFormInfoDt.data.skuCode'(val) {
      if (!val) {
        this.diaFormInfoDt.data.amountDec = 0
        this.diaFormInfoDt.data.grossWeightKg = 0
        this.diaFormInfoDt.data.volDec = 0
        this.$set(this.diaFormInfoDt.data, 'mainUnitName', '')
      }
    },
    'diaFormInfoDt.data.mainUnitName'(val) {
      if (val == 'PACKING_UNIT') {
        this.diaFormInfoDt.data.outOrderQty = (this.diaFormInfoDt.data.extOne || 0) * (this.diaFormInfoDt.data.perQty || 0)
      } else {
        this.diaFormInfoDt.data.outOrderQty = (this.diaFormInfoDt.data.extOne || 0)
      }
      this.diaFormInfoDt.data.grossWeightKg = this.tempGrossWeightKg
      this.diaFormInfoDt.data.volDec = this.tempVolDec

      this.diaFormInfoDt.data.amount = (this.diaFormInfoDt.data.costPrice || 0) * this.diaFormInfoDt.data.outOrderQty
      this.diaFormInfoDt.data.grossWeight = this.tempGrossWeight * this.diaFormInfoDt.data.outOrderQty
      this.diaFormInfoDt.data.vol = this.tempVol * this.diaFormInfoDt.data.outOrderQty

      this.diaFormInfoDt.data.amountDec = ((this.diaFormInfoDt.data.costPriceDec || 0) * (this.diaFormInfoDt.data.outOrderQty || 0)).toFixed(2)
      this.diaFormInfoDt.data.grossWeightKg = ((this.diaFormInfoDt.data.grossWeightKg || 0) * (this.diaFormInfoDt.data.outOrderQty || 0)).toFixed(2)
      this.diaFormInfoDt.data.volDec = ((this.diaFormInfoDt.data.volDec || 0) * (this.diaFormInfoDt.data.outOrderQty || 0)).toFixed(2)
      // this.diaFormInfoDt.data.outOrderQty = 0;
      // this.diaFormInfoDt.data.extOne = 0;
      this.diaFormInfoDt.data.mainUnit = val == 'PACKING_UNIT' ? this.diaFormInfoDt.data.recUnit : this.diaFormInfoDt.data.mainUnit
    },
    'diaFormInfoDt.data.extOne'(val) {
      if (this.diaFormInfoDt.data.mainUnitName == 'PACKING_UNIT') {
        this.diaFormInfoDt.data.outOrderQty = val * (this.diaFormInfoDt.data.perQty || 0)
      } else {
        this.diaFormInfoDt.data.outOrderQty = val
      }
      if (val) {
        this.diaFormInfoDt.data.grossWeightKg = this.tempGrossWeightKg
        this.diaFormInfoDt.data.volDec = this.tempVolDec
      }

      this.diaFormInfoDt.data.amount = (this.diaFormInfoDt.data.costPrice || 0) * this.diaFormInfoDt.data.outOrderQty
      this.diaFormInfoDt.data.grossWeight = this.tempGrossWeight * this.diaFormInfoDt.data.outOrderQty
      this.diaFormInfoDt.data.vol = this.tempVol * this.diaFormInfoDt.data.outOrderQty

      this.diaFormInfoDt.data.amountDec = ((this.diaFormInfoDt.data.costPriceDec || 0) * (this.diaFormInfoDt.data.outOrderQty || 0)).toFixed(2)
      this.diaFormInfoDt.data.grossWeightKg = ((this.diaFormInfoDt.data.grossWeightKg || 0) * (this.diaFormInfoDt.data.outOrderQty || 0)).toFixed(2)
      this.diaFormInfoDt.data.volDec = ((this.diaFormInfoDt.data.volDec || 0) * (this.diaFormInfoDt.data.outOrderQty || 0)).toFixed(2)
    }
  },
  mounted() {},
  methods: {
    uploadQueryFn() {
      this.initData()
    },
    selectOwner(data) {
      this.topForm.data.ownerId = data
    },
    selectWhId(data) {
      this.topForm.data.whId = data
    },
    selectCustomer(data) {
      this.topForm.data.customerId = data
    },
    // selectPartner(data) {
    //   this.topForm.data.partnerId = data
    // },
    selectPartnerStore(data) {
      this.topForm.data.partnerStoreId = data
    },
    selectOwnerDia(data, obj) {
      this.$set(this.diaFormInfo.data, 'ownerId', data)
      this.diaFormInfo.data.ownerName = obj.ownerName
      this.diaFormInfo.dtTableInfo.data = []
    },
    selectConsignerDia(data, obj) {
      this.diaFormInfo.data.whName = obj.whName
      this.$set(this.diaFormInfo.data, 'shipper', data)
      // 带出  发货联系人
      this.diaFormInfo.data.shippingContact = obj.contactName
      // 带出  发货联系方式
      this.diaFormInfo.data.shippingTel = obj.contactTel
    },
    selectReceivingPartyDia(data, obj) {
      this.diaFormInfo.data.shipperProvId = obj.provinceId
      this.diaFormInfo.data.shipperCityId = obj.cityId
      this.diaFormInfo.data.shipperAreaId = obj.areaId
      this.receivingProvince = obj.provinceId
      this.receivingCity = obj.cityId
      this.receivingArea = obj.areaId
      this.diaFormInfo.data.receivingProvince = obj.provinceId
      this.diaFormInfo.data.receivingCity = obj.cityId
      this.diaFormInfo.data.receivingArea = obj.areaId
      this.diaFormInfo.data.receivingAddr = obj.contactAddr
      this.$set(this.diaFormInfo.data, 'consignee', data)
      this.diaFormInfo.data.consigneeContact = obj.contactName
      this.diaFormInfo.data.consigneeTel = obj.contactTel
    },
    selectCarrierNameDia(data, obj) {
      this.$set(this.diaFormInfo.data, 'partnerId', obj.id)
      this.diaFormInfo.data.partnerName = obj.carrierName
    },
    selectCustomerDia(data, obj) {
      this.$set(this.diaFormInfo.data, 'customerId', data)
      this.diaFormInfo.data.customerName = obj.customerName
    },
    selectPartnerDia(data) {
      this.$set(this.diaFormInfo.data, 'courierName', data)
    },
    selectWhIdDia(data, obj) {
      this.$set(this.diaFormInfo.data, 'whId', data)
      this.diaFormInfo.data.whName = obj.whName
      this.diaFormInfo.dtTableInfo.data = []
      this.whId = null
    },
    selectPartnerStoreDia(data) {
      this.$set(this.diaFormInfo.data, 'storeName', data)
    },
    selectProvince(data) {
      this.$set(this.diaFormInfo.data, 'receivingProvince', data)
      this.receivingProvince = data
    },
    selectCity(data) {
      this.$set(this.diaFormInfo.data, 'receivingCity', data)
      this.receivingCity = data
    },
    selectArea(data) {
      this.$set(this.diaFormInfo.data, 'receivingArea', data)
    },
    selectSkuTop(data, obj) {
      this.topForm.data.skuCode = obj.skuCode
    },
    selectSku(data, obj) {
      this.diaFormInfoDt.data.skuCode = obj.skuCode
      this.diaFormInfoDt.data.skuName = obj.skuName
      this.diaFormInfoDt.data.spec = obj.spec
      this.diaFormInfoDt.data.drugForm = obj.drugForm
      // this.diaFormInfoDt.data.mainUnitName = obj.mainUnit;
      this.diaFormInfoDt.data.originCountry = obj.originCountry
      this.diaFormInfoDt.data.mfg = obj.mfgName
      this.diaFormInfoDt.data.approveNo = obj.approvalNumber
      this.diaFormInfoDt.data.tradeName = obj.tradeName
      this.diaFormInfoDt.data.brandName = obj.brandName
      this.diaFormInfoDt.data.tempControlName = obj.tempControlName
      this.diaFormInfoDt.data.barcode = obj.barcode
      this.diaFormInfoDt.data.mfgId = obj.mfgId
      this.diaFormInfoDt.data.perQty = obj.perQty
      // this.diaFormInfoDt.data.invalidDate = obj.invalidDate;
      // this.diaFormInfoDt.data.batchNo = obj.batchNo;
      // this.diaFormInfoDt.data.productionDate = obj.productionDate;
      this.diaFormInfoDt.data.costPrice = obj.costPrice
      this.diaFormInfoDt.data.amount = obj.costPrice * this.diaFormInfoDt.data.outOrderQty
      this.tempGrossWeightKg = obj.grossWeightKg
      this.tempVolDec = Number(obj.volDec) / 1000000
      this.tempGrossWeight = obj.grossWeight
      this.tempVol = obj.vol
      this.diaFormInfoDt.data.vol = this.tempVol * this.diaFormInfoDt.data.outOrderQty
      this.diaFormInfoDt.data.grossWeight = this.tempGrossWeight * this.diaFormInfoDt.data.outOrderQty
      this.diaFormInfoDt.data.mainUnit = obj.mainUnit
      this.diaFormInfoDt.data.recUnit = obj.recUnit
      if (obj.recUnit) {
        this.listTypeInfo.orderDtUnitTypeList = [
          {
            key: obj.mainUnit + '(主单位)',
            value: 'MAIN_UNIT'
          },
          {
            key: obj.recUnit + '(包装单位)',
            value: 'PACKING_UNIT'
          }
        ]
      } else {
        this.listTypeInfo.orderDtUnitTypeList = [
          {
            key: obj.mainUnit + '(主单位)',
            value: 'MAIN_UNIT'
          }
        ]
      }
      this.$set(this.diaFormInfoDt.data, 'mainUnitName', 'MAIN_UNIT')
      this.diaFormInfoDt.data.extOne = 1
      this.diaFormInfoDt.data.volDec = (this.tempVolDec * this.diaFormInfoDt.data.outOrderQty).toFixed(2)
      this.diaFormInfoDt.data.grossWeightKg = (this.tempGrossWeightKg * this.diaFormInfoDt.data.outOrderQty).toFixed(2)
      this.diaFormInfoDt.data.amountDec = (obj.costPriceDec * this.diaFormInfoDt.data.outOrderQty).toFixed(2)
      this.diaFormInfoDt.data.costPriceDec = obj.costPriceDec
      this.diaSkuCode = obj.skuCode
    },
    selectSupplier(data, obj) {
      this.diaFormInfoDt.data.supplierId = obj.id
      this.diaFormInfoDt.data.supplierName = obj.supplierName
    }
  }
}
</script>
<style lang="scss" scoped>

.tab-body_auto{
  .table-wrap{
    height: calc(100% - 50px);

  }
}

</style>
