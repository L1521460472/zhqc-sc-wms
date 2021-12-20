<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="sorting-wrap">
    <div class="sorting-header">
      <div class="sorting-header-left">
        <el-form
          ref="form"
          label-position="right"
          size="mini"
          label-width="96px"
        >
          <div class="sorting-flex">
            <div class="sorting-flex-item">
              <el-form-item label="复核台">
                <el-select
                  v-model="reviewPlatform"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item, index) in listTypeInfo.reviewPlatformList"
                    :key="index"
                    :label="item.key"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </div>
            <div class="sorting-flex-item">
              <el-form-item label="发货单号">
                <el-input
                  ref="soNo"
                  v-model="topForm.data.soNo"
                  type="text"
                  clearable
                  placeholder="请输入发货单号"
                  @keyup.enter.native="scanSoNo"
                />
              </el-form-item>
            </div>
            <div class="sorting-flex-item header-btn">
              <el-button
                type="primary"
                size="small"
                :disabled="!reviewData.id"
                @click="fastReview"
              >快速复核</el-button>
              <el-button
                type="primary"
                icon="el-icon-printer"
                size="small"
                :disabled="!reviewData.id"
                @click="printFaceSheet"
              >面单打印</el-button>
            </div>
          </div>
        </el-form>
      </div>
      <div class="sorting-header-right">
        <div class="sorting-flex">
          <div class="sorting-flex-item">
            <p>复核人</p>
            <p>{{ topForm.data.reviewPersonOne || "-" }}</p>
          </div>
          <div class="sorting-flex-item">
            <p>复核人2</p>
            <p>{{ topForm.data.reviewPersonTwo || "-" }}</p>
          </div>
          <div class="sorting-flex-item">
            <p>品种数</p>
            <p>{{ topForm.data.skuKind || 0 }}</p>
          </div>
          <div class="sorting-flex-item">
            <p>商品总数</p>
            <p>{{ topForm.data.skuTotal || 0 }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="sorting-form" style="height:292px">
      <div class="sorting-form-left">
        <zhqc-top-form
          :ref-obj.sync="leftSoForm.ref"
          class-name="viewFlag"
          :data="leftSoForm.data"
          form-type="view"
          :field-list="leftSoForm.fieldList"
          :list-type-info="listTypeInfo"
          :label-width="leftSoForm.labelWidth"
          @handleClick="handleClick"
          @handleEvent="handleEvent"
        />
        <zhqc-top-form
          :ref-obj.sync="leftForm.ref"
          class-name="viewFlag"
          :data="leftForm.data"
          form-type="view"
          :field-list="leftForm.fieldList"
          :list-type-info="listTypeInfo"
          :label-width="leftForm.labelWidth"
          @handleClick="handleClick"
          @handleEvent="handleEvent"
        />
        <div class="sorting-flex pack-section">
          <div class="sorting-flex-item">
            <p>{{ topForm.data.skuTotal || "-" }}</p>
            <p>发货单商品数</p>
          </div>
          <div class="sorting-flex-item">
            <p>{{ topForm.data.hasBoxNum || "-" }}</p>
            <p>已装箱商品数</p>
          </div>
          <div class="sorting-flex-item">
            <p>{{ topForm.data.noBoxNum || '0' }}</p>
            <p>未装箱商品数</p>
          </div>
        </div>
      </div>
      <div class="sorting-form-right">
        <el-form ref="form" label-position="top" size="mini">
          <div class="form-right-subcont">
            <div class="sorting-flex">
              <div class="sorting-flex-item sorting-mr-8">
                <el-form-item label="运单号/箱号">
                  <el-input
                    ref="boxNo"
                    v-model.number="topForm.data.boxNo"
                    type="text"
                    placeholder="请输入运单号/箱号"
                  />
                </el-form-item>
              </div>
              <div class="sorting-flex-item no_label">
                <el-form-item label="&nbsp;">
                  <el-button type="primary" size="small" @click="resetBoxNo">装箱</el-button>
                  <el-button
                    type="danger"
                    size="small"
                    :disabled="!reviewData.id"
                    @click="deleteData"
                  >清空</el-button>
                </el-form-item>
              </div>
            </div>
            <div class="sorting-flex">
              <div class="sorting-flex-item sorting-mr-8">
                <el-form-item label="产品条码">
                  <el-input
                    ref="barcode"
                    v-model="topForm.data.barcode"
                    type="text"
                    placeholder="请输入产品条码"
                    @keyup.enter.native="scanSku"
                  />
                </el-form-item>
              </div>
              <div class="sorting-flex-item">
                <el-form-item label="批次号">
                  <el-select
                    ref="batchNo"
                    v-model="topForm.data.batchNo"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, index) in topForm.data.batchNoList"
                      :key="index"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
              </div>
            </div>

            <div class="sorting-flex">
              <div class="sorting-flex-item sorting-mr-8">
                <el-form-item label="复核数量">
                  <el-input
                    id="recPkgQty"
                    v-model.number="topForm.data.reviewingNum"
                    type="number"
                    min="0"
                    :disabled="isReview"
                    placeholder="请输入复核数量"
                    @keyup.enter.native="saveReviewData"
                  />
                </el-form-item>
              </div>
              <div class="sorting-flex-item no_label">
                <el-form-item label="&nbsp;">
                  <el-checkbox v-model="isReview">逐件复核</el-checkbox>
                </el-form-item>
              </div>
            </div>
            <div class="sorting-flex">
              <div class="sorting-flex-item sorting-mr-8">
                <el-form-item label="承运商">
                  <el-input
                    v-model="topForm.data.partnerName"
                    type="text"
                    readonly
                  />
                </el-form-item>
              </div>
              <div class="sorting-flex-item">
                <el-form-item label="有无发票">
                  <el-input
                    v-model="topForm.data.isHasInvoiceName"
                    type="text"
                    readonly
                  />
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="form-right-subcont">
            <div class="sorting-flex batchAttr-flex" />
          </div>
        </el-form>
        <div class="form-right-btn" style="margin-top: -12px">
          <el-button
            type="success"
            size="small"
            :disabled="!reviewData.id"
            @click="reviewDone"
          >完成复核</el-button>
          <el-button
            type="warning"
            size="small"
            :disabled="!reviewData.id"
            @click="showDiffDia"
          >复核差异</el-button>
          <el-button
            type="danger"
            size="small"
            :disabled="!reviewData.id"
            @click="clearPage"
          >挂起</el-button>
          <el-button
            size="small"
            type="primary"
            :disabled="!reviewData.id"
            @click="openConsumablesPage"
          >采集包材</el-button>
        </div>
      </div>
    </div>
    <div class="sorting-table">
      <div class="sorting-table-item">
        <div class="sorting-tit">
          待核列表[<span class="tag-red">{{ tableInfo1.data.length }}</span>]
        </div>
        <div class="sorting-table-cont">
          <template>
            <zhqcTable
              :data.sync="tableInfo1.data"
              :field-list="tableInfo1.fieldList"
              :handle="null"
              :height="tableHeight"
              :select-index="selectIndex"
              @handleClick="handleClick"
              @handleEvent="handleEvent"
            />
          </template>
        </div>
      </div>
      <div class="sorting-table-item">
        <div class="sorting-tit">
          已核列表[<span class="tag-green">{{ tableInfo2.data.length }}</span>]
        </div>
        <div class="sorting-table-cont">
          <template>
            <zhqcTable
              :data.sync="tableInfo2.data"
              :field-list="tableInfo2.fieldList"
              :handle="null"
              :height="tableHeight"
              @handleClick="handleClick"
            >
              <template v-slot:col-status="scope">
                <el-button size="mini" type="danger" @click="deleteReviewDtBox(scope.row)">{{
                  $t("table.delete")
                }}</el-button>
              </template>
            </zhqcTable>
          </template>
        </div>
      </div>
    </div>

    <!--増、查、改的表单-->
    <full-pop
      :visible.sync="dialogInfo.visible"
      :top-title="dialogInfo.title"
      :close-btn="dialogInfo.closeBtn"
      :save-list="dialogInfo.btList"
      @handleClick="handleClick"
    >
      <full-pop-item v-show="diaFormInfo.isShowForm" full-pop-item-title="复核人">
        <zhqc-form
          :ref-obj.sync="diaFormInfo.ref"
          :form-type="dialogInfo.type"
          :data="diaFormInfo.data"
          :field-list="diaFormInfo.fieldList"
          :rules="diaFormInfo.rules"
          :label-width="diaFormInfo.labelWidth"
          style="padding: 1% 5%"
          @handleEvent="handleEvent"
        />
      </full-pop-item>
      <full-pop-item full-pop-item-title="复核明细">
        <el-table
          :data.sync="diaFormInfo.dtTableInfo.data"
          border
          style="width: 100%"
          :cell-style="tableCellStyle"
        >
          <el-table-column
            v-for="(item, index) in diaFormInfo.dtTableInfo.fieldList"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :fixed="item.fixed"
            :type="item.type"
            align="center"
            :width="item.width"
            :min-width="item.minWidth || '100px'"
            :formatter="item.formatter"
            show-overflow-tooltip
          />
        </el-table>
        <!--<zhqc-table :data.sync="diaFormInfo.dtTableInfo.data"-->
        <!--:field-list="diaFormInfo.dtTableInfo.fieldList"-->
        <!--:handle="diaFormInfo.dtTableInfo.handle"-->
        <!--:height="tabHeight" :contentHeight="contentHeight"-->
        <!--:cell-style="tableCellStyle"-->
        <!--@handleClick="handleClick">-->
        <!--</zhqc-table>-->
      </full-pop-item>
    </full-pop>
    <!--复核异常弹窗-->
    <zhqc-dialog
      :title="dialogInfoAbnormal.title"
      :visible.sync="dialogInfoAbnormal.visible"
      :width="dialogInfoAbnormal.width"
      :bt-list="dialogInfoAbnormal.btList"
      @handleClick="handleClick"
    >
      <zhqc-form
        :ref-obj.sync="diaFormInfoAbnormal.ref"
        :form-type="dialogInfo.type"
        :data="diaFormInfoAbnormal.data"
        :field-list="diaFormInfoAbnormal.fieldList"
        :rules="diaFormInfoAbnormal.rules"
        :list-type-info="listTypeInfo"
        :label-width="diaFormInfoAbnormal.labelWidth"
      >
        <template v-slot:form-skuId="">
          <el-select
            ref="refSelect"
            v-model="diaFormInfoAbnormal.data.skuId"
            placeholder="请选择"
            :loading="loading"
            filterable
            clearable
            @change="selectSkuItem"
            @clear="clearSkuItem"
          >
            <el-option
              v-for="item in listTypeInfo.skuList"
              :key="item.id"
              :label="item.skuCode"
              :value="item.id"
            >
              <slot>
                <span style="float: left; color: #8492a6; font-size: 13px">{{
                  item.skuCode
                }}</span>
                <span
                  style="
                    float: left;
                    color: #8492a6;
                    font-size: 13px;
                    margin-left: 30px;
                  "
                >{{ item.barcode }}</span>
                <span
                  style="
                    float: left;
                    color: #8492a6;
                    font-size: 13px;
                    margin-left: 30px;
                  "
                >{{ item.skuName }}</span>
                <span
                  style="
                    float: left;
                    color: #8492a6;
                    font-size: 13px;
                    margin-left: 30px;
                  "
                >{{ item.spec }}</span>
                <span
                  style="
                    float: left;
                    color: #8492a6;
                    font-size: 13px;
                    margin-left: 30px;
                  "
                >{{ item.mainUnit }}</span>
              </slot>
            </el-option>
          </el-select>
        </template>
      </zhqc-form>
    </zhqc-dialog>
    <!--复核包材-->
    <full-pop
      :visible.sync="dialogInfoCons.visible"
      :top-title="dialogInfoCons.title"
      :close-btn="dialogInfoCons.closeBtn"
      :save-list="dialogInfoCons.btList"
      @handleClick="handleClick"
    >
      <full-pop-item full-pop-item-title="扫描条码">
        <el-form
          ref="formConsumables"
          :model="reqConsumables"
          label-position="top"
          size="mini"
          @submit.native.prevent
        >
          <div class="warehousing-section l-warehousing-flex">
            <div class="warehousing-section-left">
              <el-form-item label="产品条码">
                <el-input
                  v-model="reqConsumables.skuCode"
                  @keyup.enter.native="scanSkuConsumables"
                />
              </el-form-item>
            </div>
          </div>
        </el-form>
      </full-pop-item>
      <full-pop-item full-pop-item-title="已采集包材">
        <zhqc-table
          :data.sync="diaFormInfoCons.tableInfo.data"
          :field-list="diaFormInfoCons.tableInfo.fieldList"
          :handle="diaFormInfoCons.tableInfo.handle"
          @handleClick="handleClick"
        />
      </full-pop-item>
    </full-pop>
  </div>
</template>
<script>
import reviewMixins from './mixins'
import zhqcTable from '@/Subassembly/ZhqcRowClassTable'
export default {
  name: 'Review',
  components: {
    zhqcTable
  },
  mixins: [reviewMixins],
  data() {
    return {
      store: 'review/',
      modName: 'review',
      isReview: true,
      abc: false,
      selectIndex: '',
      activeName: 'first',
      dialogInfo: {
        title: '',
        visible: false,
        type: '',
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
            event: 'saveReviewPersonTwo',
            btLoading: false,
            show: true
          }
        ]
      },
      dialogInfoAbnormal: {
        title: '复核异常上报',
        visible: false,
        type: '',
        addDtBtnShow: false,
        btList: [
          {
            label: this.$t('table.close'),
            type: '',
            icon: '',
            event: 'handelCloseAbnormal',
            show: true
          },
          {
            label: this.$t('table.save'),
            type: 'primary',
            icon: '',
            event: 'handelSaveAbnormal',
            loading: false,
            show: true
          }
        ]
      },
      dialogInfoCons: {
        title: '采集包材',
        visible: false,
        type: '',
        closeBtn: {
          label: '',
          type: '',
          icon: '',
          event: 'closeConsumablesPage',
          show: true
        },
        btList: [
          {
            label: this.$t('table.close'),
            type: '',
            icon: '',
            event: 'closeConsumablesPage',
            show: true
          }
        ]
      },
      reqConsumables: {
        skuCode: null
      },
      reviewData: { id: null },
      reviewPlatform: null
    }
  },
  methods: {
    rowClick(row) {
      this.selectIndex = row.rowIndex
      this.topForm.data.barcode = row.barcode
      this.scanSku()
    },
    // 行设置样式，{行数据，行号}
    tableRowStyle({ row }) {
      const styleObj = {}
      if (this.checkDtId && row.id == this.checkDtId) {
        styleObj.backgroundColor = '#32e20e'
      }
      return styleObj
    },
    // 单元格设置样式，{行数据，列数据，行号，列号}
    tableCellStyle({ row, column }) {
      if (column.property == 'waitReviewQty' && row.waitReviewQty > 0) {
        return {
          color: 'red'
        }
      }
      `     //background`
      return {}
    },

    // 装箱
    resetBoxNo() {
      let boxNo = 1
      if (this.tableInfo2.data) {
        boxNo = this.tableInfo2.data.length + 1
      }
      this.$set(this.topForm.data, 'boxNo', boxNo)
    }
  }
}
</script>
<style lang="scss" scoped>
.pack-section{
  padding: 6px 20px;
  background: #EBEEF5;
  .sorting-flex-item{
    p{
      height: 26px;
      line-height: 26px;
    }
    p:first-child{
      font-size: 20px;
    }
  }
}
/deep/.el-form-item--mini {
  .el-form-item__content,
  .el-form-item__label {
    line-height: 26px;
    font-size: 12px;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: auto;
  }
  .el-input--mini .el-input__icon {
    line-height: 26px;
  }
  .el-input--mini .el-input__inner {
    height: 26px;
    line-height: 26px;
    padding-right: 0;
  }
}
/deep/.el-button--small {
  padding: 6px 12px;
}
/deep/ .el-table {
  .select-row {
    background: #83e2d1;
  }
}
.sorting-form-left {
  /deep/ .pageTopForm {
    margin: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 10px;

    .el-form-item .el-form-item__content div {
      width: 100% !important;
    }
    .el-form-item--mini {
      width: 33.33%;
      margin-bottom: 5px;
      .el-form-item__content,
      .el-form-item__label {
        line-height: 26px;
        font-size: 12px;
      }
      .el-input--mini .el-input__inner {
        height: 26px;
        line-height: 26px;
      }
      .el-input.is-disabled .el-input__inner{
        background-color: #fff;
        border-color: #fff;
        color: #222;
        padding-left: 5px;
      }
    }
  }
}

input::-ms-clear,
input::-ms-reveal {
  display: none;
}
*,
:after,
:before {
  -webkit-box-sizing: border-box;
  -o-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  outline: none;
}

/*布局*/
.sorting-wrap {
  height: calc(100vh - 80px);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
}
/deep/.sorting-header {
  width: 100%;
  padding: 5px 20px;
  background: #f5f5f5;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
  .sorting-header-left {
    flex: 1;
  }
  .sorting-header-right {
    width: 386px;
  }
  .header-btn {
    display: flex;
    align-items: center;
    button:first-child {
      margin-left: 50px;
    }
  }
  .el-form-item--mini {
    margin-bottom: 0;
    .el-select--mini {
      width: 100%;
    }
  }
}
.sorting-wrap .sorting-form {
  height: 230px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #eaeaea;
}
@media screen and (max-height: 600px) {
  .sorting-wrap .sorting-form {
    overflow-y: auto;
    height: 150px;
  }
}
.sorting-wrap .sorting-form .sorting-form-left {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  border-right: 1px solid #eaeaea;
  padding: 10px 0;
}
.sorting-wrap .sorting-form .sorting-form-right {
  width: 36%;
  padding: 10px;
  padding-bottom: 0;
}
.sorting-tit {
  font-size: 15px;
  font-weight: 700;
  color: #222;
  margin-bottom: 4px;
}
.sorting-table-item {
  .sorting-tit {
    height: 40px;
    line-height: 40px;
    margin-bottom: 0;
  }
}
.sorting-tit .tag-red {
  color: #fe4c32;
}
.sorting-tit .tag-green {
  color: #50cb1b;
}
.form-right-subcont {
  margin-bottom: 7px;
  line-height: 0;
}
.form-right-subcont .sorting-flex-item .el-select.el-select--mini{
  width: 100%;
}
.form-right-btn {
  text-align: left;
  button {
    margin: 0 10px 5px 0;
  }
}
.sorting-wrap .sorting-table {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
}
.sorting-wrap .sorting-table .sorting-table-item {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  padding: 0 10px;
}
.sorting-flex {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.sorting-flex-item {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
}
.sorting-mr-8 {
  margin-right: 8px;
}

.sorting-right-col-1 {
  width: 84px;
}

/*重置element样式*/
.sorting-wrap .el-form-item--mini .el-form-item__content {
  line-height: 26px;
}
.sorting-wrap .el-input--mini .el-input__inner {
  height: 26px;
  line-height: 26px;
}
.sorting-form-left .el-form-item__label {
  line-height: 24px;
  padding-top: 2px;
  font-size: 12px;
}
.sorting-form-left .el-form-item--mini.el-form-item,
.sorting-form-left .el-form-item--mini.el-form-item {
  margin-bottom: 9px;
}
/deep/.sorting-form-right {
  .el-form-item--mini {
    .el-form-item__label {
      line-height: 14px;
      padding-bottom: 2px;
      font-size: 12px;
    }
  }
}

.sorting-form-right .el-form-item--mini.el-form-item,
.sorting-form-right .el-form-item--mini.el-form-item {
  margin-bottom: 4px;
}
.sorting-table .el-table--mini td,
.sorting-table .el-table--mini th {
  padding: 1px 0;
}
.sorting-wrap .el-input--mini .el-input__icon {
  line-height: 26px;
}
.sorting-wrap .el-input--suffix .el-input__inner {
  padding-right: 20px;
}
.sorting-wrap .el-input__suffix {
  right: 0;
}
.batchAttr-flex {
  flex-wrap: wrap;
  .sorting-flex-item {
    width: 31%;
    flex: none;
  }
}
/deep/.no_label {
  display: flex;
  .el-form-item--mini:last-child {
    flex: 1;
    .el-form-item__label {
      color: transparent;
    }
    .el-checkbox{
      margin-left: 8px;
      .el-checkbox__label{
        padding-left: 4px;
      }
    }
  }
}

.sorting-flex-item {
  p {
    display: block;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 15px;
  }
}

/deep/ .sorting-wrap{
  button.is-disabled{

  }
}

</style>
