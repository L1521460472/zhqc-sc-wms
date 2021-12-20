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

        <!--发货仓 -->
        <template v-slot:form-shipperId="scope">
          <remote-list-two
            :model="topForm.data"
            :item="scope.item"
            :list-url="consigneeUrl"
          />
        </template>
        <!--收货仓 -->
        <template v-slot:form-consigneeId="scope">
          <remote-list-two
            :model="topForm.data"
            :item="scope.item"
            :type="1"
            :list-url="consigneeUrl"
          />
        </template>
        <!--  货主名称 -->
        <template v-slot:form-ownerId>
          <remote-list
            :model="topForm.data"
            select-key="ownerId"
            lable="ownerName"
            parame-code="ownerCode"
            :list-url="ownerUrl"
          >
            <template v-slot="scope">
              <span style="float: left; color: #8492a6; font-size: 13px;">{{ scope.item.ownerName }}</span>
            </template>
          </remote-list>
        </template>

        <!--  供应商 -->
        <template v-slot:form-supplierId="scope">
          <zhqc-list-supplier
            :select-key="topForm.data.supplierId"
            @select="selectTopSupplierId"
          />
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
        template-name="inOrderService"
        :export-url="exportUrl"
        export-name="入库订单"
        @exportParam="exportData"
      />
      <upload-vue
        template-name="inOrderService"
        :upload-url="uploadUrl"
        @uploadQuery="uploadQueryFn"
      />
      <export-template-vue
        :template-url="templateUrl"
        export-name="入库订单导入模板"
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
      <!--  主页面的table表格  -->
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
          :form-type="formType"
          :class-name="viewFlag"
          :label-width="diaFormInfo.labelWidth"
          @handleEvent="handleEvent"
        >
          <!-- 货主 -->
          <template v-slot:form-ownerId="scope">
            <list-owner
              :select-key="diaFormInfo.data.ownerId"
              :disabled="false"
              @select="selectOwnerDia"
            />
          </template>
          <!--供应商-->
          <template v-slot:form-supplierId="scope">
            <zhqc-list-supplier
              :select-key="diaFormInfo.data.supplierId"
              :disabled="dialogInfo.varSup || false"
              @select="selectSupplierDia"
            />
          </template>
          <!-- 发货仓 -->
          <template v-slot:form-shipperId="scope">
            <remote-list-two
              :model="diaFormInfo.data"
              :item="scope.item"
              :type="0"
              :list-url="consigneeUrl"
            />
          </template>
          <!--客户 -->
          <template v-slot:form-customerId="scope">
            <list-customer
              :select-key="diaFormInfo.data.customerId"
              :disabled="dialogInfo.varCus || false"
              @select="selectCustomerDia"
            />
          </template>
          <!--收货仓 -->
          <template v-slot:form-consigneeId="scope">
            <remote-list-two
              :model="diaFormInfo.data"
              :item="scope.item"
              :type="1"
              :list-url="consigneeUrl"
            />
          </template>
          <!-- 承运商名称 -->
          <template v-slot:form-carrierName="scope">
            <list-carrierName
              :model="diaFormInfo.data"
              select-key="carrierName"
              lable="carrierName"
              parame-code="carrierCode"
            />
          </template>
        </zhqc-form>
      </full-pop-item>
      <full-pop-item full-pop-item-title="订单明细">
        <el-button
          v-show="diaFormInfo.addDtBtnShow"
          icon="el-icon-folder-add"
          class="add_btn"
          type="primary"
          @click="handleClick('openAddDtPage')"
        >添加明细</el-button>
        <vex-dia-table
          :data.sync="diaFormInfo.dtTableInfo.data"
          :field-list="dialogInfo.type == 'view' ? diaFormInfo.dtTableInfoView.fieldList : diaFormInfo.dtTableInfo.fieldList"
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
        :rules="diaFormInfoDt.rules"
        :list-type-info="listTypeInfo"
        :label-width="diaFormInfoDt.labelWidth"
      >
        <template v-slot:form-skuCode="scope">
          <list-sku
            :select-key="diaFormInfoDt.data.skuId"
            :owner-id="diaOwnerId"
            @select="selectSkuDia"
          />
        </template>
        <template v-slot:form-rowSupplierId="scope">
          <list-supplier
            :select-key="diaFormInfoDt.data.rowSupplierId"
            @select="selectSupplierDt"
          />
        </template>
      </zhqc-form>
    </zhqc-dialog>

  </layout-body>
</template>

<script>
import { VUE_APP_OMS_MODEL } from '@/api/api.config.js'
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
// import listPartner from '@/Subassembly/ZhqcList/ListPartner'
import inOrderMixins from './mixins'
import buttonList from './components/buttonList' // 更多按钮需要引入
import listOwner from '@/Subassembly/ZhqcList/ListOwner'
import listSupplier from '@/Subassembly/ZhqcList/ListSupplier'
import listSku from '@/Subassembly/ZhqcList/ListSku'
// import listStore from '@/Subassembly/ZhqcList/ListStore'
import listCustomer from '@/Subassembly/ZhqcList/ListCustomer'
import zhqcListSupplier from '@/Subassembly/ZhqcList/ListSupplier'

// import zhqcListProvince from '@/Subassembly/ZhqcList/ListProvince/ListProvince'
// import zhqcListCity from '@/Subassembly/ZhqcList/ListCity/ListCity'
// import zhqcListArea from '@/Subassembly/ZhqcList/ListArea/ListArea'
// import listConsignerNew from '@/Subassembly/ZhqcList/ListConsignerNew'
// import listConsigner from '@/Subassembly/ZhqcList/ListConsigner'
// import listCarrierName from '@/Subassembly/ZhqcList/ListCarrierName'
import serverColumns from '../../../../layout/Home/mixin/serverColumns'

export default {
  name: 'InOrder',
  components: {
    // listConsigner,
    // listPartner,
    // listCarrierName,
    ListCarrierName: () => import('@/Subassembly/ZhqcList/ListCarrierNameSc'),
    // listConsignerNew,
    listOwner,
    listSupplier,
    zhqcListSupplier,
    listSku,
    buttonList,
    // listStore,
    listCustomer
    // zhqcListProvince,
    // zhqcListCity,
    // zhqcListArea
  },
  mixins: [inOrderMixins, serverColumns],
  data() {
    return {
      store: 'inOrder/',
      modName: 'inOrder',
      collapsable: false, // 展开收缩
      inOrderUrl: null,
      tempGrossWeightKg: null,
      tempGrossWeight: null,
      tempVolDec: null,
      tempVol: null,
      formType: null,
      viewFlag: null,
      agGridGroup: {
        value: {
          isDrag: false
        }
      },
      type: 'element-ui',
      tabsList: [
        { label: '全部', value: 0 },
        { label: '异常', value: 1, num: 0 }
      ],
      activeName: 0,
      agGridGroupPrarms: { showAction: true, actionWidth: 220 },
      ownerUrl: VUE_APP_WMS_MODEL + '/base/partner/owner/queryOwnerCbList',
      // consigneeUrl: VUE_APP_WMS_MODEL + '/base/wh/wh/whName',
      consigneeUrl: VUE_APP_WMS_MODEL + '/base/wh/whArea/queryVirtualwhList',
      exportUrl: VUE_APP_OMS_MODEL + '/order/inOrder/export',
      uploadUrl: VUE_APP_OMS_MODEL + '/order/inOrder/upload',
      templateUrl: VUE_APP_OMS_MODEL + '/order/inOrder/template/inOrderTemplate',
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      carrierCode: null,
      dialogInfo: {
        title: '',
        visible: false,
        width: '1200px',
        type: '',
        varSup: false,
        varCus: false,
        varStore: false,
        varProvince: true,
        varCity: true,
        varArea: true,
        // 返回按钮
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
        title: '新增订单明细',
        visible: false,
        type: '',
        width: '800px',
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
      },
      provinceId: null,
      cityId: null,
      diaOwnerId: null,
      checkedIds: [],
      checkedIdsFilter: [],
      batchBtnArray: [
        { label: this.$t('批量下发'), type: 'success', icon: '', event: 'handleBatchCreateSo', btLoading: false, show: true, disabled: true }
      ]
    }
  }, // buttonList 更多按钮需要增加
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
        this.resetNewFormData()
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
    //
    'diaFormInfo.data.scOrderType'(val) {
      // 查看时 不做订单类型联动处理
      if (this.dialogInfo.type == 'view') {
        return
      }
      this.diaFormInfo.data.shipper = ''
      if (val === 'PRO_WAREHOUSING') {
        // “订单类型”字段为“采购入库”时,   '发货方'字段为必填
        // this.diaFormInfo.rules.shipper[0].required = true
        this.inOrderUrl = '/base/wh/wh/queryShipperCbList'
        this.diaFormInfo.rules.returnCourierNum[0].required = false
        this.diaFormInfo.rules.origOrderCode[0].required = false
        this.diaFormInfo.rules.oldNum[0].required = false
      } else if (val === 'TRANSFERS_WAREHOUSING') {
        //  订单类型为 调拨出库时，，发货方为必填
        // this.diaFormInfo.rules.shipper[0].required = true
        this.inOrderUrl = '/base/wh/wh/whName'
        this.diaFormInfo.rules.oldNum[0].required = false
        this.diaFormInfo.rules.origOrderCode[0].required = false
        this.diaFormInfo.rules.returnCourierNum[0].required = false
      } else if (val === 'RETURN_WAREHOUSING') {
        // 如果选择不是以上类型的  暂时写为 仓库的
        this.inOrderUrl = '/base/wh/wh/whName'
        //  订单类型为 退货入库 时，，原客户订单号oldNum + 退货快递商returnCourier + 退货快递单号returnCourierNum 为必填
        this.diaFormInfo.rules.oldNum[0].required = true
        this.diaFormInfo.rules.origOrderCode[0].required = false
        this.diaFormInfo.rules.returnCourierNum[0].required = false
        // this.diaFormInfo.rules.shipper[0].required = false
      } else {
        // 如果选择不是以上类型的  暂时写为 仓库的
        this.inOrderUrl = '/base/wh/wh/whName'
        this.diaFormInfo.rules.shipper[0].required = false
        this.diaFormInfo.rules.oldNum[0].required = false
        this.diaFormInfo.rules.origOrderCode[0].required = false
        this.diaFormInfo.rules.returnCourierNum[0].required = false
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
        this.diaFormInfoDt.data.inOrderQty = (this.diaFormInfoDt.data.extOne || 0) * (this.diaFormInfoDt.data.perQty || 0)
      } else {
        this.diaFormInfoDt.data.inOrderQty = (this.diaFormInfoDt.data.extOne || 0)
      }

      this.diaFormInfoDt.data.grossWeightKg = this.tempGrossWeightKg
      this.diaFormInfoDt.data.volDec = this.tempVolDec

      this.diaFormInfoDt.data.amount = (this.diaFormInfoDt.data.costPrice || 0) * this.diaFormInfoDt.data.inOrderQty
      this.diaFormInfoDt.data.grossWeight = this.tempGrossWeigh * this.diaFormInfoDt.data.inOrderQty
      this.diaFormInfoDt.data.vol = this.tempVol * this.diaFormInfoDt.data.inOrderQty

      this.diaFormInfoDt.data.amountDec = ((this.diaFormInfoDt.data.costPriceDec || 0) * (this.diaFormInfoDt.data.inOrderQty || 0)).toFixed(2)
      this.diaFormInfoDt.data.grossWeightKg = ((this.diaFormInfoDt.data.grossWeightKg || 0) * (this.diaFormInfoDt.data.inOrderQty || 0)).toFixed(2)
      this.diaFormInfoDt.data.volDec = ((this.diaFormInfoDt.data.volDec || 0) * (this.diaFormInfoDt.data.inOrderQty || 0)).toFixed(2)
      this.diaFormInfoDt.data.mainUnit = val == 'PACKING_UNIT' ? this.diaFormInfoDt.data.recUnit : this.diaFormInfoDt.data.mainUnit
    },
    'diaFormInfoDt.data.extOne'(val) { // 数量
      if (this.diaFormInfoDt.data.mainUnitName == 'PACKING_UNIT') {
        this.diaFormInfoDt.data.inOrderQty = val * (this.diaFormInfoDt.data.perQty || 0)
      } else {
        this.diaFormInfoDt.data.inOrderQty = val
      }
      if (val === 0) {
        this.diaFormInfoDt.data.grossWeightKg = '0.00'
        this.diaFormInfoDt.data.volDec = '0.00'
      } else {
        this.diaFormInfoDt.data.grossWeightKg = this.tempGrossWeightKg
        this.diaFormInfoDt.data.volDec = this.tempVolDec
      }
      this.diaFormInfoDt.data.amount = (this.diaFormInfoDt.data.costPrice || 0) * this.diaFormInfoDt.data.inOrderQty
      this.diaFormInfoDt.data.grossWeight = this.tempGrossWeight * this.diaFormInfoDt.data.inOrderQty
      this.diaFormInfoDt.data.vol = this.tempVol * this.diaFormInfoDt.data.inOrderQty

      this.diaFormInfoDt.data.amountDec = ((this.diaFormInfoDt.data.costPriceDec || 0) * (this.diaFormInfoDt.data.inOrderQty || 0)).toFixed(2)
      this.diaFormInfoDt.data.grossWeightKg = ((this.diaFormInfoDt.data.grossWeightKg || 0) * (this.diaFormInfoDt.data.inOrderQty || 0)).toFixed(2)
      this.diaFormInfoDt.data.volDec = ((this.diaFormInfoDt.data.volDec || 0) * (this.diaFormInfoDt.data.inOrderQty || 0)).toFixed(2)
    }
  },
  mounted() {

  },
  methods: {
    uploadQueryFn() {
      this.initData()
    },
    selectConsigneeDia(data, obj) {
      this.$set(this.diaFormInfo.data, 'consigneeId', data)
      this.$set(this.diaFormInfo.data, 'consignee', obj.whName)
      //  带出  收货联系人
      this.diaFormInfo.data.consigneeContact = obj.contactName
      //   带出  收货联系方式
      this.diaFormInfo.data.consigneeTel = obj.contactTel
    },
    selectConsignerDia(data, obj) {
      this.diaFormInfo.data.shipper = obj.whName
      this.diaFormInfo.data.shipperAddr = obj.contactAddr
      this.diaFormInfo.data.shipperProvId = obj.provinceId
      this.diaFormInfo.data.shipperCityId = obj.cityId
      this.diaFormInfo.data.shipperAreaId = obj.areaId
      this.diaFormInfo.data.shipperProvName = obj.provinceName
      this.diaFormInfo.data.shipperCityName = obj.cityName
      this.diaFormInfo.data.shipperAreaName = obj.areaName
      this.provinceId = obj.provinceId
      this.cityId = obj.cityId
      this.areaId = obj.areaId
      this.$set(this.diaFormInfo.data, 'shipperId', data)
      // 带出  发货联系人
      this.diaFormInfo.data.shipperContact = obj.contactName
      // 带出  发货联系方式
      this.diaFormInfo.data.shipperTel = obj.contactTel
    },
    selectReturnCourierDia(data) {
      this.$set(this.diaFormInfo.data, 'oldNum', data)
      // this.diaFormInfo.data.carrierName = obj.carrierName;
    },
    selectOwner(data, obj) {
      this.topForm.data.ownerId = obj.id
    },
    selectConsigner(data, obj) {
      this.topForm.data.consigneeId = obj.id
    },
    selectSupplier(data, obj) {
      this.topForm.data.supplierId = obj.id
    },
    selectSku(data, obj) {
      this.topForm.data.skuId = obj.id
    },
    selectOwnerDia(data, obj) {
      this.$set(this.diaFormInfo.data, 'ownerId', obj.id)
      this.$set(this.diaFormInfo.data, 'ownerName', obj.ownerName)
      this.diaFormInfo.dtTableInfo.data = []
      this.diaOwnerId = null
    },
    selectTopSupplierId(data, obj) {
      this.topForm.data.supplierId = obj.id
      this.topForm.data.supplierName = obj.supplierName
    },
    selectSupplierDia(data, obj) {
      this.$set(this.diaFormInfo.data, 'supplierId', obj.id)
      this.$set(this.diaFormInfo.data, 'supplierName', obj.supplierName)
    },
    selectStoreDia(data, obj) {
      this.$set(this.diaFormInfo.data, 'storeId', obj.id)
      this.$set(this.diaFormInfo.data, 'storeName', obj.fullName)
    },
    selectCustomerDia(data, obj) {
      this.$set(this.diaFormInfo.data, 'customerId', obj.id)
      this.$set(this.diaFormInfo.data, 'customerName', obj.customerName)
    },
    selectProvince(data, obj) {
      this.$set(this.diaFormInfo.data, 'shipperProvId', data)
      this.$set(this.diaFormInfo.data, 'shipperProvName', obj.key)
      // this.diaFormInfo.data.shipperCityId = null;
      // this.diaFormInfo.data.shipperAreaId = null;
      this.provinceId = data
      // this.cityId = null;
    },
    selectCity(data, obj) {
      this.$set(this.diaFormInfo.data, 'shipperCityId', data)
      this.$set(this.diaFormInfo.data, 'shipperCityName', obj.key)
      // this.diaFormInfo.data.shipperAreaId = null;
      this.cityId = data
    },
    selectArea(data, obj) {
      this.$set(this.diaFormInfo.data, 'shipperAreaId', data)
      this.$set(this.diaFormInfo.data, 'shipperAreaName', obj.key)
    },
    selectStore(data) {
      this.topForm.data.storeId = data
    },
    selectCustomer(data, obj) {
      this.topForm.data.customerId = obj.id
    },

    selectSkuDia(data, obj) {
      this.diaFormInfoDt.data.skuCode = obj.skuCode
      this.diaFormInfoDt.data.skuName = obj.skuName
      this.diaFormInfoDt.data.spec = obj.spec
      this.diaFormInfoDt.data.barcode = obj.barcode
      this.diaFormInfoDt.data.perQty = obj.perQty
      this.diaFormInfoDt.data.netWeightKg = obj.netWeightKg
      this.tempVol = obj.vol
      this.tempGrossWeight = obj.grossWeight
      this.diaFormInfoDt.data.vol = this.tempVol * this.diaFormInfoDt.data.inOrderQty
      this.diaFormInfoDt.data.grossWeight = this.tempGrossWeight * this.diaFormInfoDt.data.inOrderQty
      this.diaFormInfoDt.data.amount = obj.costPrice * this.diaFormInfoDt.data.inOrderQty

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
      this.tempGrossWeightKg = obj.grossWeightKg
      this.tempVolDec = (Number(obj.volDec) / 1000000)
      this.diaFormInfoDt.data.volDec = (this.tempVolDec * this.diaFormInfoDt.data.inOrderQty).toFixed(2)
      this.diaFormInfoDt.data.grossWeightKg = (this.tempGrossWeightKg * this.diaFormInfoDt.data.inOrderQty).toFixed(2)
      this.diaFormInfoDt.data.amountDec = (obj.costPriceDec * this.diaFormInfoDt.data.inOrderQty).toFixed(2)
      this.diaFormInfoDt.data.costPriceDec = obj.costPriceDec
      this.diaFormInfoDt.data.sysSkuCode = obj.sysSkuCode
      this.diaFormInfoDt.data.costPrice = obj.costPrice
      this.diaFormInfoDt.data.skuId = obj.id
    },
    selectSupplierDt(data, obj) {
      this.$set(this.diaFormInfoDt.data, 'rowSupplierId', obj.id)
      this.$set(this.diaFormInfoDt.data, 'rowSupplierName', obj.supplierName)
    }
  }
}
</script>
<style lang="scss" scoped>
.add_btn{
  margin-bottom: 10px;
}

.tab-body_auto{
  .table-wrap{
    height: calc(100% - 50px);

  }
}

</style>
