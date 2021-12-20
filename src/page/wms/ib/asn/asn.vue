<!--
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-18 11:12:00
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
        <!-- 货主 -->
        <template v-slot:form-ownerId="scope">
          <remote-list
            :model="topForm.data"
            select-key="ownerId"
            lable="ownerName"
            parame-code="ownerCode"
            :list-url="ownerUrl"
          >
            <template v-slot="scop">
              <span style="float: left; color: #8492a6; font-size: 13px;">{{ scop.item.ownerName }}</span>
            </template>
          </remote-list>
        </template>
        <template v-slot:form-supplierId="scope">
          <remote-list
            :model="topForm.data"
            select-key="supplierId"
            lable="supplierName"
            parame-code="queryText"
            :list-url="supplierUrl"
          >
            <template v-slot="scop">
              <span style="float: left; color: #8492a6; font-size: 13px;">{{ scop.item.supplierName }}</span>
            </template>
          </remote-list>
        </template>
        <template v-slot:form-shipper="scope">
          <remote-list-two
            ref="shipper"
            :model="topForm.data"
            :item="scope.item"
            :list-url="consigneeUrl"
          />
        </template>
        <template v-slot:form-consignee="scope">
          <remote-list-two
            ref="consignee"
            :model="topForm.data"
            :item="scope.item"
            :type="1"
            :list-url="consigneeUrl"
          />
        </template>
        <!-- 产品 -->
        <template v-slot:form-skuId="scope">
          <remote-list
            :model="topForm.data"
            select-key="skuId"
            lable="skuCode"
            parame-code="queryText"
            :list-url="skuUrl"
          >
            <template v-slot="scop">
              <span style="float: left; color: #8492a6; font-size: 13px">{{ scop.item.skuCode }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px;margin-left:30px;">{{ scop.item.skuName }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px;margin-left:30px;">{{ scop.item.ownerName }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px;margin-left:30px;">{{ scop.item.supplierName }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px;margin-left:30px;">{{ scop.item.spec }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px;margin-left:30px;">{{ scop.item.drugForm }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px;margin-left:30px;">{{ scop.item.drugFormSpec }}</span>
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
        <!-- <el-button type="primary" icon="el-icon-folder-add"  @click="handleClick('openAddPage')"  :disabled="$hasPerm('add')">{{$t('table.add')}}</el-button> -->
        <el-button type="primary" icon="el-icon-printer" :disabled="$hasPerm('print')" @click="handleClick('print')">打印</el-button>
      </el-button-group>
      <!-- <export-vue
        template-name="asnService"
        export-url="ib/asn/export"
        export-name="入库管理-ASN主表"
        @exportParam="exportData"
      /> -->
    </div>

    <div slot="tab-body" class="tab-body_auto">
      <!--  主页面的table表格  -->
      <zhqc-switch-tabs
        v-model="activeName"
        :tabs-list="tabsList"
        @change="tabsChange"
      />
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
      <full-pop-item full-pop-item-title="入库单信息">
        <zhqc-form
          :ref-obj.sync="diaFormInfo.ref"
          :data="diaFormInfo.data"
          :field-list="diaFormInfo.fieldList"
          :rules="diaFormInfo.rules"
          :list-type-info="listTypeInfo"
          :form-type="formType"
          :class-name="viewFlag"
          :label-width="diaFormInfo.labelWidth"
          style="padding: 1% 0%"
          @handleEvent="handleEvent"
        >
          <template v-slot:form-ownerId="scope">
            <list-owner :select-key="diaFormInfo.data.ownerId" @select="selectOwnerDia" />
          </template>
          <template v-slot:form-supplierId="scope">
            <list-supplier :select-key="diaFormInfo.data.supplierId" @select="selectSupplierDia" />
          </template>
        </zhqc-form>
      </full-pop-item>
      <!-- <full-pop-item full-pop-item-title="ASN明细">
        <el-button v-show="diaFormInfo.addDtBtnShow" icon="el-icon-folder-add" @click="handleClick('openAddDtPage')">添加明细</el-button>
        <vex-dia-table
          :data.sync="diaFormInfo.dtTableInfo.data"
          :field-list="diaFormInfo.dtTableInfo.fieldList"
          :handle="diaFormInfo.dtTableInfo.handle"
          :ref-obj.sync="diaFormInfo.dtTableInfo.ref"
          :top-btn="diaFormInfo.dtTableInfo.topBtn"
          @handleClick="handleClick"
        />
      </full-pop-item> -->
      <div v-show="dialogInfo.type=='view'" class="tabs-box">
        <zhqc-tabs
          v-model="tabs.activeName"
          :tabs-list="tabs.tabsList"
          :bg-gradient="tabs.bgDradient"
          :font-size="tabs.fontSize"
        >
          <template #1>
            <zhqc-table
              :data.sync="tableInfo1.data"
              :field-list="tableInfo1.fieldList"
              :handle="null"
              @handleClick="handleClick"
            />
          </template>
          <template #2>
            <zhqc-table
              :data.sync="tableInfo2.data"
              :field-list="tableInfo2.fieldList"
              :handle="null"
              @handleClick="handleClick"
            >

              <template v-slot:col-operationDesc="scope">
                <div :class="{'link': isLink(scope.row.operationDesc) }" @click="operationDescClick(scope.row.operationDesc)">{{ scope.row.operationDesc }}</div>
              </template>
              <template v-slot:col-certificate="scope">
                <span v-if="scope.row.evidenceImage">
                  <template v-for="(item, index) in getSrcList(scope.row)">
                    <el-image
                      :key="index"
                      :src="item"
                      :preview-src-list="getSrcList(scope.row)"
                      style="margin-right: 6px; width: 30px;"
                    />
                  </template>
                </span>
                <span v-if="scope.row.evidencePdf">
                  <template v-for="(item, index) in scope.row.evidencePdf.split(',')">
                    <i :key="index" class="el-icon-document" style="font-size:30px; cursor:pointer;" @click="pdfview(item)" />
                  </template>
                </span>
              </template>
            </zhqc-table>

          </template>
        </zhqc-tabs>
      </div>
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
        :form-type="dialogInfo.type"
        :data="diaFormInfoDt.data"
        :field-list="diaFormInfoDt.fieldList"
        :rules="diaFormInfoDt.rules"
        :list-type-info="listTypeInfo"
        :label-width="diaFormInfoDt.labelWidth"
      >
        <template v-slot:form-skuCode="scope">
          <list-sku :select-code="diaFormInfoDt.data.skuCode" @select="selectSkuDia" />
        </template>
      </zhqc-form>
    </zhqc-dialog>
  </layout-body>
</template>

<script>
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
import asnMixins from './mixins'
import buttonList from '@/components/buttonList'
import listOwner from '@/Subassembly/ZhqcList/ListOwner'
import listSupplier from '@/Subassembly/ZhqcList/ListSupplier'
import listSku from '@/Subassembly/ZhqcList/ListSku'
export default {
  name: 'Asn',
  components: {
    buttonList, listOwner, listSupplier, listSku
  },
  mixins: [asnMixins],
  data() {
    return {
      store: 'asn/',
      modName: 'asn',
      collapsable: false, // 展开收缩
      formType: null,
      viewFlag: null,
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      skuUrl: VUE_APP_WMS_MODEL + '/base/sku/sku/querySkuCbList',
      ownerUrl: VUE_APP_WMS_MODEL + '/base/partner/owner/queryOwnerCbList',
      supplierUrl: VUE_APP_WMS_MODEL + '/base/partner/supplier/querySupplierCbList',
      consigneeUrl: VUE_APP_WMS_MODEL + '/base/wh/whArea/queryVirtualwhList',
      dialogInfo: {
        title: '',
        visible: false,
        width: '1200px',
        type: '',
        // 返回按钮
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', btLoading: false, show: true }]
      },
      dialogInfoDt: {
        title: '新增ASN明细',
        visible: false,
        type: '',
        addDtBtnShow: false,
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'closeAddDtPage', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'saveDt', loading: false, show: true }]
      },
      tabsList: [
        { label: '全部', value: 0 },
        { label: '待收货', value: 1, num: 0, innerStatus: 0 },
        { label: '收货中', value: 2, num: 0, innerStatus: 0 },
        { label: '待上架', value: 3, num: 0, innerStatus: 0 },
        { label: '上架完成', value: 4, innerStatus: 0 },
        { label: '已取消', value: 5, innerStatus: 0 },
        { label: '异常', value: 6, num: 0 }
      ],
      activeName: 0,
      tabs: {
        activeName: '1',
        bgDradient: ['#00d4d8', '#009396'],
        fontSize: 14,
        tabsList: [{ label: '出库单明细', value: '1' },
          { label: '操作明细', value: '2' }]
      },
      tableInfo1: {
        fieldList: null, // 表格列集合
        handle: null,
        data: []

      },
      tableInfo2: {
        fieldList: null, // 表格列集合
        handle: null,
        data: []
      }
    }
  },
  computed: {
    resp() {
      if (this.$store.state[this.modName].pageResp !== null && this.$store.state[this.modName].pageResp.length > 0) {
        this.$store.state[this.modName].pageResp.map((item, index) => {
          if (typeof item.recOpetor === 'string') {
            this.$store.state[this.modName].pageResp[index].recOpetor = item.recOpetor ? JSON.parse(item.recOpetor) : null
          }
        })
      }
      return this.$store.state[this.modName].pageResp
    },
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
  mounted() {

  },
  methods: {
    selectOwner(data, obj) {
      this.topForm.data.ownerId = obj.id
    },
    selectSupplier(data, obj) {
      this.topForm.data.supplierId = obj.id
    },
    selectSku(data, obj) {
      this.topForm.data.skuId = obj.id
    },
    selectOwnerDia(data, obj) {
      this.diaFormInfo.data.ownerId = obj.id
      this.diaFormInfo.data.ownerName = obj.ownerName
    },
    selectSupplierDia(data, obj) {
      this.diaFormInfo.data.supplierId = obj.id
      this.diaFormInfo.data.supplierName = obj.supplierName
    },
    selectSkuDia(data, obj) {
      this.diaFormInfoDt.data.skuCode = obj.skuCode
      this.diaFormInfoDt.data.skuName = obj.skuName
      this.diaFormInfoDt.data.spec = obj.spec
      this.diaFormInfoDt.data.drugForm = obj.drugForm
      this.diaFormInfoDt.data.mainUnit = obj.mainUnit
      this.diaFormInfoDt.data.skuId = obj.id
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
