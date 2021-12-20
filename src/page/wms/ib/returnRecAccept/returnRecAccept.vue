<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
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
          <template v-slot:form-containerNo="">
            <el-input
              ref="containerNo"
              v-model="topForm.data.containerNo"
              type="text"
              clearable
              placeholder=""
              @keyup.enter.native="scannContainerNo"
            />
          </template>
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
        <el-form ref="form" :rules="diaFormInfoAttr.rules" :model="diaFormInfoAttr.data" label-position="top" size="mini" @keyup.enter.native="formEnter">
          <div class="sorting-tit">收货记录</div>
          <div class="form-right-subcont">
            <div class="sorting-flex">
              <div class="sorting-flex-item sorting-mr-8">
                <el-form-item label="产品状态">
                  <el-select
                    ref="skuQuality"
                    v-model="rightForm.skuQuality"
                    placeholder="请选择"
                  >
                    <el-option label="合格品" value="GOOD_PRODUCT" />
                    <el-option label="不合格品" value="BAD_PRODUCT" />
                  </el-select>
                </el-form-item>
              </div>
              <div class="sorting-flex-item sorting-mr-8">
                <el-form-item label="收货件数">
                  <el-input
                    id="recPkgQty"
                    v-model.number="rightForm.recPkgQty"
                    type="number"
                    min="0"
                    :disabled="topForm.data.perQty < 2"
                    placeholder="请输入收货件数"
                  />
                </el-form-item>
              </div>
              <div class="sorting-flex-item sorting-mr-8">
                <el-form-item label="零散数">
                  <el-input
                    v-model.number="rightForm.scatteredQty"
                    type="number"
                    min="0"
                    placeholder="请输入零散数"
                  />
                </el-form-item>
              </div>
              <div class="sorting-flex-item">
                <el-form-item label="收货数量">
                  <el-input v-model="rightForm.recQty" tabindex="3" type="text" disabled placeholder="收货数量" />
                </el-form-item>
              </div>
            </div>
            <div class="sorting-flex">
              <div class="sorting-right-col-1 sorting-mr-8">
                <el-form-item label="拒收数量">
                  <el-input
                    v-model.number="rightForm.rejectQty"
                    type="number"
                    min="0"
                    placeholder="请输入拒收数量"
                  />
                </el-form-item>
              </div>
              <div class="sorting-flex-item">
                <el-form-item label="拒收原因">
                  <el-input
                    v-model.trim="rightForm.rejectReason"
                    type="text"
                    placeholder="请输入拒收原因"
                  />
                </el-form-item>
              </div>
            </div>
          </div>
          <div v-if="diaFormInfoAttr.fieldList.length > 0" class="sorting-tit">批次属性</div>
          <div class="form-right-subcont">
            <div class="sorting-flex batchAttr-flex">
              <div
                v-for="(item, index) in diaFormInfoAttr.fieldList"
                :key="index"
                class="sorting-flex-item"
                :class="{'sorting-mr-8': (index+1)%3 !== 0}"
              >
                <el-form-item :label="item.label" :prop="item.value">
                  <el-input
                    v-if="item.type == 'input'"
                    v-model="diaFormInfoAttr.data[item.value]"
                    :type="item.type"
                    :disabled="item.disabled"
                    :clearable="item.clearable === false ? item.clearable : true"
                  />
                  <el-date-picker
                    v-if="item.type === 'date'"
                    v-model="diaFormInfoAttr.data[item.value]"
                    :type="item.dateType"
                    :disabled="item.disabled"
                    :clearable="item.clearable === false ? item.clearable : true"
                    :format="item.format || dateTime"
                    :value-format="item.valueFormat || dateTime"
                  />
                </el-form-item>
              </div>
            </div>

          </div>
        </el-form>
        <div class="form-right-btn">
          <!-- <el-button size="small">印章印模</el-button> -->
          <el-button type="primary" size="small" :disabled="!multipleBatches" @click="nextBatch">下一批次（F1）</el-button>
          <el-button :disabled="isSaveBtnDisabled" type="success" size="small" @click="saveRecInfoFn">保存记录（F4）</el-button>
        </div>
      </div>
    </div>
    <div class="sorting-table">
      <div class="sorting-table-item">
        <div class="sorting-tit">
          待收记录[<span class="tag-red">{{ tableInfo1.data.length }}</span>]
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
          收货记录[<span class="tag-green">{{ tableInfo2.data.length }}</span>]
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
                <el-button size="mini" type="danger" @click="deleteFn(scope.row)">{{
                  $t("table.delete")
                }}</el-button>
              </template>
            </zhqcTable>
          </template>
        </div>
      </div>
    </div>

    <zhqc-dialog
      :title="dialogInfo.title"
      :visible.sync="dialogInfo.visible"
      :width="dialogInfo.width"
      :bt-list="dialogInfo.btList"
      @handleClick="handleClick"
    >
      <zhqc-top-form
        :ref-obj.sync="dialogFormInfo.ref"
        :data="dialogFormInfo.data"
        :field-list="dialogFormInfo.fieldList"
        :rules="dialogFormInfo.rules"
        :list-type-info="listTypeInfo"
        :label-width="dialogFormInfo.labelWidth"
      />
    </zhqc-dialog>
  </div>
</template>
<script>
import mixins from './mixins'
import zhqcTable from './components/zhqcTable.vue'
export default {
  name: 'ReturnRecAccept',
  components: {
    zhqcTable
  },
  mixins: [mixins],
  data() {
    return {
      abc: false,
      isSaveBtnDisabled: true,
      multipleBatches: false,
      selectIndex: '',
      activeName: 'first',
      asnInOrderId: null
    }
  },
  watch: {
    // 收货记录-收货件数
    'rightForm.recPkgQty': function(val) {
      if (this.topForm.data.perQty && this.topForm.data.perQty > 0) {
        const scatteredQty = this.rightForm.scatteredQty || 0
        this.rightForm.recQty = (this.topForm.data.perQty * val) + Number(scatteredQty)
      } else {
        this.rightForm.recQty = this.rightForm.scatteredQty || 0
      }
    },
    // 收货记录-零散数
    'rightForm.scatteredQty': function(val) {
      if (this.topForm.data.perQty && this.topForm.data.perQty > 0) {
        const recPkgQty = this.rightForm.recPkgQty || 0
        this.rightForm.recQty = (this.topForm.data.perQty * recPkgQty) + Number(val)
      } else {
        this.rightForm.recQty = this.rightForm.scatteredQty || 0
      }
    },
    'topForm.data.asnNo'(val) {
      if (!val) {
        this.topForm.data = {}
        this.asnNoForm = {}
        this.rightForm = {
          skuQuality: 'GOOD_PRODUCT',
          recPkgQty: '',
          scatteredQty: '',
          recQty: '',
          rejectQty: '',
          rejectReason: '',
          recMode: 'PC_MODE'
        }
        this.tableInfo1.data = []
        this.tableInfo2.data = []
        this.diaFormInfoAttr.fieldList = []
      }
    },
    'topForm.data.skuCode'(val) {
      if (!val) {
        this.topForm.data = {}
        this.topForm.data = JSON.parse(JSON.stringify(this.asnNoForm))
        this.rightForm = {
          skuQuality: 'GOOD_PRODUCT',
          recPkgQty: '',
          scatteredQty: '',
          recQty: '',
          rejectQty: '',
          rejectReason: '',
          recMode: 'PC_MODE'
        }
        this.diaFormInfoAttr.fieldList = []
      }
    },
    // 冷链信息-启运时间
    'dialogFormInfo.data.shipTime'(val) {
      if (new Date(this.dialogFormInfo.data.arriveTime) < new Date(val)) {
        this.dialogFormInfo.data.arriveTime = ''
      }
    },
    // 冷链信息-到货时间
    // "dialogFormInfo.data.arriveTime"(val){
    //   if(new Date(val) <= new Date(this.dialogFormInfo.data.shipTime)){
    //     this.dialogFormInfo.data.arriveTime = "";
    //   }
    // },
    // 批次属性-生产日期
    'diaFormInfoAttr.data.productionDate'(val) {
      if (this.diaFormInfoAttr.data.instoreDate) {
        if (new Date(this.diaFormInfoAttr.data.instoreDate) < new Date(val)) {
          this.diaFormInfoAttr.data.productionDate = this.diaFormInfoAttr.data.instoreDate
        }
      }
      if (new Date(this.diaFormInfoAttr.data.invalidDate) < new Date(val)) {
        this.diaFormInfoAttr.data.invalidDate = ''
      }
    },
    // 批次属性-失效日期
    'diaFormInfoAttr.data.invalidDate'(val) {
      if (new Date(val) < new Date(this.diaFormInfoAttr.data.productionDate)) {
        this.diaFormInfoAttr.data.invalidDate = ''
      }
    }
  },
  methods: {
    rowClick(row) {
      this.selectIndex = row.rowIndex
      this.topForm.data.skuCode = row.skuCode
      this.topForm.data.batchNo = row.batchNo
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
      this.$refs.skuQuality.focus()
      this.topForm.data.batchNo = this.doubleBatchArr.filter(v => {
        return v.batchNo != this.topForm.data.batchNo
      })[0].batchNo
      this.selectIndex += 1
    }
  }
}
</script>
<style lang="scss" scoped>
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
.batchAttr-flex{
  flex-wrap: wrap;
  .sorting-flex-item{
    width: 31%;
    flex: none;
  }
}
/deep/.sorting-form {
  .el-form-item--mini {
    .el-input.is-disabled .el-input__inner{
      color: #333;
    }
  }
}
</style>
