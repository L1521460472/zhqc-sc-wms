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
        <!--成品sku-->
        <!--<template v-slot:form-fpSkuId="scope">-->
        <!--<zhqc-list-sku-bom @select="selectFpSkuId" :selectKey="topForm.data.fpSkuId" ></zhqc-list-sku-bom>-->
        <!--</template>-->
        <!--成品sku-->
        <template v-slot:form-fpSkuId="scope">
          <remote-list
            :model="topForm.data"
            select-key="fpSkuId"
            lable="skuCode"
            parame-code="queryText"
            :list-url="fpSkuUrl"
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
        <el-button type="primary" icon="el-icon-folder-add" :disabled="$hasPerm('add')" @click="handleClick('openAddPage')">{{ $t('table.add') }}</el-button>
      </el-button-group>
      <!--<export-vue templateName="moService"-->
      <!--exportUrl="inv/mo/export"-->
      <!--exportName="加工管理-加工单"-->
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
          <div style="display: inline-block;margin-left: 5px">
            <el-popover v-if="scope.data.row.moStatus != 'CLOSED'" placement="bottom" trigger="click">
              <el-button slot="reference" size="mini" icon="el-icon-more" type="warning">更多</el-button>

              <el-button v-show="scope.data.row.sourceType == 'MANUAL' && scope.data.row.moStatus == 'NEW'" size="mini" type="success" :disabled="$hasPerm('edit')" @click="openEditPage(scope.data.row)">{{ $t('table.edit') }}</el-button>
              <el-button v-show="scope.data.row.moStatus == 'NEW'" size="mini" type="danger" :disabled="$hasPerm('delete')" @click="deleteData(scope.data.row)">{{ $t('table.delete') }}</el-button>
              <el-button v-show="scope.data.row.moStatus == 'NEW'" size="mini" type="primary" :disabled="$hasPerm('audit')" @click="audit(scope.data.row)">审核</el-button>
              <el-button v-show="scope.data.row.moStatus == 'AUDIT'" size="mini" type="warning" :disabled="$hasPerm('unAudit')" @click="unAudit(scope.data.row)">弃审</el-button>
              <el-button v-show="scope.data.row.moStatus == 'AUDIT' || scope.data.row.moStatus == 'PART_ASSIGN'" size="mini" type="primary" :disabled="$hasPerm('assign')" @click="assign(scope.data.row)">分配</el-button>
              <el-button v-show="scope.data.row.moStatus == 'PART_ASSIGN' || scope.data.row.moStatus == 'ALL_ASSIGN'" size="mini" type="warning" :disabled="$hasPerm('unAssign')" @click="unAssign(scope.data.row)">取消分配</el-button>
              <el-button v-show="scope.data.row.moStatus == 'PART_ASSIGN' || scope.data.row.moStatus == 'ALL_ASSIGN'" size="mini" type="" :disabled="$hasPerm('down_shelf')" @click="downShelf(scope.data.row)">领料</el-button>
              <el-button v-show="scope.data.row.moStatus == 'PART_ASSIGN' || scope.data.row.moStatus == 'ALL_ASSIGN'|| scope.data.row.moStatus == 'DOWN_SHELF' || scope.data.row.moStatus == 'PROCESSING' " size="mini" type="" :disabled="$hasPerm('finishMo')" @click="openFinishPage(scope.data.row)">完工</el-button>
              <el-button v-show="scope.data.row.moStatus == 'DOWN_SHELF' || scope.data.row.moStatus == 'PROCESSING' " size="mini" type="warning" :disabled="$hasPerm('closeMo')" @click="closeMo(scope.data.row)">关闭</el-button>

            </el-popover>
          </div>
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
      <full-pop-item full-pop-item-title="加工单">
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
            <zhqc-list-owner :select-key="diaFormInfo.data.ownerId" @select="selectOwnerDia" />
          </template>
          <template v-slot:form-fpSkuId="scope">
            <zhqc-list-sku-bom :select-key="diaFormInfo.data.fpSkuId" :owner-id="diaFormInfo.data.ownerId" @select="selectFpSkuIdDia" />
          </template>
          <template v-slot:form-moLotCode="scope">
            <zhqc-list-wh-lot-code :select-key="diaFormInfo.data.moLotCode" :lot-type="lotType" @select="selectMoLotCodeDia" />
          </template>
        </zhqc-form>
      </full-pop-item>
      <full-pop-item full-pop-item-title="加工明细">
        <el-button v-show="diaFormInfo.addDtBtnShow" icon="el-icon-folder-add" @click="handleClick('openAddDtPage')">添加产品明细</el-button>
        <zhqc-summary-table
          :ref-obj.sync="diaFormInfo.dtTableInfo.ref"
          :data="diaFormInfo.dtTableInfo.data"
          :field-list="diaFormInfo.dtTableInfo.fieldList"
          :handle="diaFormInfo.dtTableInfo.handle"
          @handleGetSummaries="handleGetSummaries"
          @handleClick="handleClick"
        >
          <template v-slot:bt-slotEvent="scope">
            <el-button v-show="scope.data.row.sourceType === sourceTypeManual.value && diaFormInfo.addDtBtnShow" size="mini" type="warning" @click="deleteDt(scope.data.row)">删除</el-button>
          </template>
        </zhqc-summary-table>
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
        :form-type="dialogInfo.type"
        :data="diaFormInfoDt.data"
        :field-list="diaFormInfoDt.fieldList"
        :rules="diaFormInfoDt.rules"
        :list-type-info="listTypeInfo"
        :label-width="diaFormInfoDt.labelWidth"
      >
        <template v-slot:form-bomSkuId="scope">
          <zhqc-list-sku :select-key="diaFormInfoDt.data.bomSkuId" @select="selectSkuIdDiaLog" />
        </template>
        <template v-slot:form-moLotCode="scope">
          <zhqc-list-wh-lot-code :select-key="diaFormInfoDt.data.moLotCode" :lot-type="lotType" @select="selectMoLotCodeDiaDt" />
        </template>
      </zhqc-form>
    </zhqc-dialog>
    <zhqc-mo-finish-comb @on-success="initData" />
    <zhqc-mo-finish-split @on-success="initData" />
    <zhqc-mo-detail />
  </layout-body>
</template>

<script>
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
import moMixins from './mixins'
import zhqcListSku from '@/Subassembly/ZhqcList/ListSku'
import zhqcListSkuBom from '@/Subassembly/ZhqcList/ListSkuBom'
import zhqcListOwner from '@/Subassembly/ZhqcList/ListOwner'
import zhqcListWhLotCode from '@/Subassembly/ZhqcList/ListWhLotCode'
import zhqcSummaryTable from '@/Subassembly/ZhqcSummaryTable'
import zhqcMoFinishComb from './moFinishComb'
import zhqcMoFinishSplit from './moFinishSplit'
import zhqcMoDetail from './moDetail'
export default {
  name: 'Mo',
  components: {
    zhqcListSku, zhqcListSkuBom, zhqcListOwner, zhqcSummaryTable,
    zhqcMoFinishComb, zhqcListWhLotCode, zhqcMoFinishSplit, zhqcMoDetail
  },
  mixins: [moMixins],
  data() {
    return {
      store: 'mo/',
      modName: 'mo',
      collapsable: false, // 展开收缩
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      formType: null,
      viewFlag: null,
      ownerUrl: VUE_APP_WMS_MODEL + '/base/partner/owner/queryOwnerCbList',
      fpSkuUrl: VUE_APP_WMS_MODEL + '/base/sku/sku/querySkuBomCbList',
      dialogInfo: {
        title: '',
        visible: false,
        type: '',
        addDtBtnShow: false,
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', btLoading: false, show: true }]
      },
      dialogInfoDt: {
        title: '',
        visible: false,
        type: '',
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'closeDtPage', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'saveDt', loading: false, show: true }]
      },
      sourceTypeManual: {},
      sourceTypeBom: {},
      deleteIds: [],
      lotType: null
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
        this.deleteIds = []
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
    selectOwner(data) {
      this.topForm.data.ownerId = data
    },
    selectFpSkuId(data) {
      this.topForm.data.fpSkuId = data
    },
    selectOwnerDia(data) {
      this.diaFormInfo.data.ownerId = data
      this.diaFormInfo.data.fpSkuId = null
      this.diaFormInfo.data.fpSkuName = null
      this.diaFormInfo.data.fpSpec = null
      this.diaFormInfo.data.fpMainUnit = null
      this.clearDtData()
    },
    selectMoLotCodeDia(data) {
      this.diaFormInfo.data.moLotCode = data
    },
    selectFpSkuIdDia(data, obj) {
      this.diaFormInfo.data.fpSkuId = data
      this.diaFormInfo.data.fpSkuName = obj.skuName
      this.diaFormInfo.data.fpSpec = obj.spec
      this.diaFormInfo.data.fpMainUnit = obj.mainUnit
      this.initSkuBom(data)
    },
    selectSkuIdDiaLog(data, obj) {
      this.diaFormInfoDt.data.bomSkuId = data
      this.diaFormInfoDt.data.bomSkuCode = obj.skuCode
      this.diaFormInfoDt.data.bomSkuName = obj.skuName
      this.diaFormInfoDt.data.bomSpec = obj.spec
      this.diaFormInfoDt.data.bomMainUnit = obj.mainUnit
    },
    selectMoLotCodeDiaDt(data) {
      this.diaFormInfoDt.data.moLotCode = data
    },
    // 尾行统计
    handleGetSummaries(param, callback) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
        } else if (index == 6 || index == 7 || index == 8) {
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
          } else {
            sums[index] = ''
          }
        } else {
          sums[index] = ''
        }
      })
      callback(sums) // 执行作为参数的函数
    },
    openDialog(page, data) {
      let jsonData = {}
      if (data) jsonData = data
      jsonData.page = page
      jsonData.visible = true
      this.$store.dispatch(this.store + 'setData', jsonData)
    },
    openFinishPage(data) {
      if (data.moType == 'COMB') {
        this.openDialog('moFinishCombPage', data)
      } else {
        this.openDialog('moFinishSplitPage', data)
      }
    }
  }
}
</script>
