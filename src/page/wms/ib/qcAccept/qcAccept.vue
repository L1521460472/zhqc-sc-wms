
<template>
  <div class="sorting-wrap">
    <div class="sorting-form">
      <div class="sorting-form-left">
        <zhqc-top-form
          :ref-obj.sync="topForm.ref"
          :data="topForm.data"
          class-name="viewFlag"
          form-type="view"
          :field-list="topForm.fieldList"
          :list-type-info="listTypeInfo"
          :label-width="topForm.labelWidth"
          @handleClick="handleClick"
          @handleEvent="handleEvent"
        >
          <template v-slot:form-skuCode="">
            <el-input
              ref="skuCode"
              v-model="topForm.data.skuCode"
              type="text"
              clearable
              placeholder=""
              @keyup.enter.native="scannSkuNo"
            />
          </template>
        </zhqc-top-form>
      </div>
      <div class="sorting-form-right">
        <el-form
          ref="form"
          label-position="top"
          :rules="diaFormInfoAttr.rules"
          :model="diaFormInfoAttr.data"
          size="mini"
          @keyup.enter.native="formEnter"
        >
          <div class="sorting-tit">验收记录</div>
          <div class="form-right-subcont">
            <div class="sorting-flex">
              <div class="sorting-flex-item sorting-mr-8">
                <el-form-item label="应检数量" required>
                  <el-input
                    ref="shouldQcQty"
                    v-model.number="topForm.data.shouldQcQty"
                    type="number"
                    min="0"
                    placeholder="请输入数量"
                  />
                </el-form-item>
              </div>
              <div class="sorting-flex-item sorting-mr-8">
                <el-form-item label="检验数量" required>
                  <el-input
                    v-model.number="rightForm.qcQty"
                    type="number"
                    min="0"
                    placeholder="请输入数量"
                  />
                </el-form-item>
              </div>
              <div class="sorting-flex-item sorting-mr-8">
                <el-form-item label="不合格数量">
                  <el-input
                    v-model.number="rightForm.badQty"
                    type="number"
                    min="0"
                    placeholder="请输入数量"
                  />
                </el-form-item>
              </div>
              <div class="sorting-flex-item">
                <el-form-item label="合格数量">
                  <el-input
                    v-model.number="rightForm.goodQty"
                    type="number"
                    min="0"
                    disabled
                    placeholder="请输入数量"
                  />
                </el-form-item>
              </div>
            </div>
            <div class="sorting-flex">
              <!--  <div class="sorting-right-col-1 sorting-mr-8">
                  <el-form-item label="检验结果">
                    <el-select
                      placeholder="请选择"
                      v-model="rightForm.checkResult"
                    >
                      <el-option label="合格" value="PASS"></el-option>
                      <el-option label="不合格" value="NG"></el-option>
                    </el-select>
                  </el-form-item>
                </div>-->
              <div class="sorting-flex-item">
                <el-form-item label="不合格原因">
                  <el-input
                    v-model.trim="rightForm.badReason"
                    type="text"
                    placeholder="请输入原因"
                  />
                </el-form-item>
              </div>
            </div>
          </div>
          <div v-if="diaFormInfoAttr.fieldList.length > 0" class="sorting-tit">
            批次属性
          </div>
          <div class="form-right-subcont">
            <div class="sorting-flex batchAttr-flex">
              <div
                v-for="(item, index) in diaFormInfoAttr.fieldList"
                :key="index"
                class="sorting-flex-item"
                :class="{ 'sorting-mr-8': (index + 1) % 3 !== 0 }"
              >
                <el-form-item :label="item.label" :prop="item.value">
                  <el-input
                    v-if="item.type == 'input'"
                    v-model="diaFormInfoAttr.data[item.value]"
                    :type="item.type"
                    :disabled="item.disabled"
                    :clearable="
                      item.clearable === false ? item.clearable : true
                    "
                  />
                  <el-date-picker
                    v-if="item.type === 'date'"
                    v-model="diaFormInfoAttr.data[item.value]"
                    :type="item.dateType"
                    :disabled="item.disabled"
                    :clearable="
                      item.clearable === false ? item.clearable : true
                    "
                    :format="item.format || dateTime"
                    :value-format="item.valueFormat || dateTime"
                  />
                </el-form-item>
              </div>
            </div>
          </div>
        </el-form>
        <div class="form-right-btn">
          <el-button
            type="primary"
            size="small"
            :disabled="!multipleBatches"
            @click="nextBatch"
          >下一批次（F1）</el-button>
          <el-button
            :disabled="isSaveBtnDisabled"
            type="success"
            size="small"
            @click="saveRecInfoFn"
          >保存记录（F4）</el-button>
        </div>
      </div>
    </div>
    <div class="sorting-table">
      <div class="sorting-table-item">
        <div class="sorting-tit">
          待验记录[<span class="tag-red">{{ tableInfo1.data.length }}</span>]
        </div>
        <div class="sorting-table-cont">
          <template>
            <zhqcTable
              :data.sync="tableInfo1.data"
              :field-list="tableInfo1.fieldList"
              :handle="null"
              :height="tableHeight"
              :select-index="selectIndex"
              show-summary
              @handleClick="handleClick"
              @handleEvent="handleEvent"
            />
          </template>
        </div>
      </div>
      <div class="sorting-table-item">
        <div class="sorting-tit">
          验收记录[<span class="tag-green">{{ tableInfo2.data.length }}</span>]
        </div>
        <div class="sorting-table-cont">
          <template>
            <zhqcTable
              :data.sync="tableInfo2.data"
              :field-list="tableInfo2.fieldList"
              :handle="null"
              :height="tableHeight"
              show-summary
              @handleClick="handleClick"
            >
              <template v-slot:col-status="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="deleteFn(scope.row)"
                >{{ $t("table.delete") }}</el-button>
              </template>
            </zhqcTable>
          </template>
        </div>
      </div>
    </div>

    <!--増、查、改的表单-->
    <zhqc-dialog
      :visible.sync="dialogInfo.visible"
      :title="dialogInfo.title"
      :width="dialogInfo.width"
      :bt-list="dialogInfo.btList"
      @handleClick="handleClick"
    >
      <full-pop-item v-show="diaFormInfo.isShowForm" full-pop-item-title="验收人">
        <zhqc-form
          :ref-obj.sync="diaFormInfo.ref"
          :data="diaFormInfo.data"
          :form-type="dialogInfo.type"
          :field-list="diaFormInfo.fieldList"
          :rules="diaFormInfo.rules"
          :label-width="diaFormInfo.labelWidth"
        />
      </full-pop-item>
      <full-pop-item full-pop-item-title="双人验收">
        <zhqc-table
          :data.sync="diaFormInfo.dtTableInfo.data"
          :field-list="diaFormInfo.dtTableInfo.fieldList"
          :handle="diaFormInfo.dtTableInfo.handle"
          :height="300"
          @handleClick="handleClick"
        />
      </full-pop-item>
    </zhqc-dialog>
  </div>
</template>
<script>
import mixins from './mixins'
import zhqcTable from '@/Subassembly/ZhqcRowClassTable'
export default {
  name: 'QcAccept',
  components: {
    zhqcTable
  },
  mixins: [mixins],
  data() {
    return {
      abc: false,
      multipleBatches: false,
      selectIndex: '',
      activeName: 'first',
      isSaveBtnDisabled: true
    }
  },
  watch: {
    'topForm.data.asnNo'(val) {
      if (!val) {
        this.topForm.data = {}
        this.asnNoForm = {}
        this.rightForm = {
          checkResult: 'PASS',
          qcQty: '',
          goodQty: '',
          badQty: '',
          badReason: ''
        }
        this.tableInfo1.data = []
        this.tableInfo2.data = []
        this.diaFormInfoAttr.fieldList = []
      }
    },
    'topForm.data.shouldQcQty'(val) {
      if (val > this.topForm.data.recQty) {
        this.topForm.data.shouldQcQty = ''
      }
    },
    'rightForm.qcQty'(val) {
      if (val > this.topForm.data.recQty) {
        this.rightForm.qcQty = ''
      }
    },
    'rightForm.badQty'(val) {
      this.rightForm.goodQty = Number(this.topForm.data.recQty) - Number(val)
      if (val > this.topForm.data.recQty) {
        this.rightForm.badQty = ''
      }
    },
    'topForm.data.skuCode'(val) {
      if (!val) {
        this.topForm.data = {}
        this.topForm.data = JSON.parse(JSON.stringify(this.asnNoForm))
        this.rightForm = {
          checkResult: 'PASS',
          qcQty: '',
          goodQty: '',
          badQty: '',
          badReason: ''
        }
        this.diaFormInfoAttr.fieldList = []
      }
    }
  },
  methods: {
    rowClick(row) {
      this.selectIndex = row.rowIndex
      this.topForm.data.skuCode = row.skuCode
      this.topForm.data.qcDtId = row.qcDtId
      this.scannSkuNo()
    },
    // 在 form 里 按 enter 键切换焦点
    formEnter(e) {
      const inputs = this.$refs.form.$el.querySelectorAll('.el-input:not(.is-disabled) input')
      inputs.forEach((v, i) => {
        if (v === e.target && e.target.nodeName == 'INPUT' && inputs.length > i + 1) {
          inputs[i + 1].focus()
        }
      })
    },
    nextBatch() {
      this.$refs.shouldQcQty.focus()
      this.topForm.data.batchNo = this.doubleBatchArr.filter(v => {
        return v.batchNo != this.topForm.data.batchNo
      })[0].batchNo
      this.selectIndex += 1
    }
  }
}
</script>
<style lang="scss" scoped>
  /deep/.page-dialog{
    .el-dialog__body{
      padding: 0 15px;
      .page-form{
        padding-top: 13px;
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

      .el-form-item .el-form-item__content div {
        width: 100% !important;
      }
      .el-form-item--mini {
        width: 33.33%;
        margin-bottom: 9px;
        .el-form-item__content,
        .el-form-item__label {
          line-height: 26px;
          font-size: 12px;
        }
        .el-input--mini .el-input__inner {
          height: 26px;
          line-height: 26px;
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
  .sorting-wrap .sorting-form {
    height: 300px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #eaeaea;
  }
  @media screen and (max-height: 620px) {
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
    padding: 12px 10px;
  }
  .sorting-wrap .sorting-form .sorting-form-right {
    width: 386px;
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
  .form-right-btn {
    text-align: left;
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
  /deep/.sorting-form {
    .el-form-item--mini {
      .el-input.is-disabled .el-input__inner {
        color: #333;
      }
    }
  }
</style>
