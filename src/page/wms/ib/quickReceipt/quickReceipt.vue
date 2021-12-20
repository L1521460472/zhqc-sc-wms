<template>
  <div class="sorting-wrap">
    <div class="sorting-wrap-left">
      <div class="sorting-form">
        <div class="sorting-form-left">
          <zhqc-top-form
            :ref-obj.sync="topForm.ref"
            :data="topForm.data"
            form-type="view"
            :field-list="topForm.fieldList"
            :list-type-info="listTypeInfo"
            :label-width="topForm.labelWidth"
            @handleClick="handleClick"
            @handleEvent="handleEvent"
          >
            <template v-slot:form-orderNo="">
              <el-input
                ref="orderNo"
                v-model="topForm.data.orderNo"
                type="text"
                clearable
                placeholder=""
                :disabled="orderNoDisabled"
                @keyup.enter.native="asnNoAndAsnSource"
              />
            </template>
            <template v-slot:form-skuCode="">
              <el-input
                ref="skuCode"
                v-model="topForm.data.skuCode"
                type="text"
                clearable
                placeholder=""
                @keyup.enter.native="scannSkuNoCopy"
              />
            </template>
            <template v-slot:form-skuNameItem="">
              <el-select
                ref="skuName"
                v-model="skuCodeOpt"
                clearable
                filterable
                placeholder=""
                :disabled="skuCodeDisabled"
                @change="handleChooseSku"
              >
                <el-option v-for="(item,index) in tableInfo1.data" :key="index" :label="item.skuName" :value="item.skuCode" />
              </el-select>
            </template>
          </zhqc-top-form>
        </div>
      </div>
      <div class="sorting-table">
        <div class="sorting-table-title">待收货列表【{{ total }}】</div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleTab">
          <div class="sorting-table-item">
            <div class="sorting-table-cont">
              <zhqc-rec-table
                :ref-obj.sync="tableInfo1.ref"
                :data.sync="tableInfo1.data"
                :field-list="tableInfo1.fieldList"
                :handle="null"
                :height="tableInfo1.height"
                :select-index="selectIndex"
                :show-summary="tableInfo1.showSummary"
                @handleClick="handleClick"
                @handleEvent="handleEvent"
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
          </div>
          <div class="sorting-table-title">已收货列表【{{ totalSkuRecord }}】</div>
          <div class="sorting-table-item">
            <div class="sorting-table-cont">
              <zhqc-rec-table
                :ref-obj.sync="tableInfo2.ref"
                :data.sync="tableInfo2.data"
                :field-list="tableInfo2.fieldList"
                :handle="null"
                :height="tableInfo2.height"
                :show-summary="tableInfo2.showSummary"
                @handleClick="handleClick"
              >
                <template v-slot:col-status="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="deleteFn(scope.row)"
                  >{{ $t("table.delete") }}
                  </el-button>
                </template>
              </zhqc-rec-table>
            </div>
            <div slot="bottom-page">
              <!--  分页组件   -->
              <zhqc-page
                :total="totalSkuRecord"
                :page-request="pageRequestDt"
                @pageChange="editPageChange"
              />
            </div>
          </div>
        </el-tabs>
      </div>
    </div>
    <div class="sorting-wrap-right">
      <div class="sorting-form-right">
        <el-form
          ref="form"
          :rules="diaFormInfoAttr.rules"
          :model="diaFormInfoAttr.data"
          label-position="top"
          size="mini"
          @keyup.enter.native="formEnter"
        >
          <div class="sorting-tit">收货</div>
          <div class="form-right-subcont">
            <div class="sorting-flex">
              <div class="sorting-right-col-1 sorting-mr-8">
                <el-form-item label="检验数">
                  <el-input
                    v-model.number="rightForm.qcDtReq.qcQty"
                    type="number"
                    min="0"
                    placeholder="请输入检验数"
                  />
                </el-form-item>
              </div>
              <div class="sorting-right-col-1 sorting-mr-8">
                <el-form-item label="合格数" prop="goodQty">
                  <el-input
                    v-model.number="rightForm.qcDtReq.goodQty"
                    type="number"
                    min="0"
                    placeholder="请输入合格数"
                  />
                </el-form-item>
              </div>
              <div class="sorting-flex-item sorting-mr-8">
                <el-form-item label="不合格数">
                  <el-input
                    id="recPkgQty"
                    v-model.number="rightForm.qcDtReq.badQty"
                    type="number"
                    min="0"
                    :disabled="true"
                    placeholder="请输入不合格数"
                  />
                </el-form-item>
              </div>
              <div class="sorting-flex-item sorting-mr-8">
                <el-form-item label="合格率">
                  <el-input
                    id="recPkgQty"
                    v-model.number="rightForm.qualifiedRate"
                    :disabled="true"
                    placeholder="请输入合格率"
                  />
                </el-form-item>
              </div>
            </div>
            <div class="sorting-flex no_focus">
              <div class="sorting-flex-item">
                <el-form-item label="质检结果" prop="checkResult">
                  <el-input
                    v-model.trim="rightForm.qcDtReq.checkResult"
                    type="text"
                    placeholder="请输入质检结果"
                  />
                </el-form-item>
              </div>
            </div>
            <div class="sorting-flex">
              <div class="sorting-flex-item sorting-mr-8">
                <el-form-item label="商品状态">
                  <el-select
                    ref="skuQuality"
                    v-model="rightForm.skuQuality"
                    placeholder="请选择"
                    @change="handleSkuQuality"
                  >
                    <el-option v-for="(item,index) in listTypeInfo.skuQualityList" :key="index" :label="item.key" :value="item.value" />
                  </el-select>
                </el-form-item>
              </div>
              <div class="sorting-flex-item sorting-mr-8">
                <el-form-item label="整箱数">
                  <el-input
                    id="recPkgQty"
                    v-model.number="rightForm.recPkgQty"
                    type="number"
                    min="0"
                    placeholder="请输入整箱数"
                  />
                </el-form-item>
              </div>
              <div class="sorting-flex-item sorting-mr-8">
                <el-form-item label="尾数">
                  <el-input
                    v-model.number="rightForm.scatteredQty"
                    type="number"
                    min="0"
                    placeholder="请输入尾数"
                  />
                </el-form-item>
              </div>
              <div class="sorting-flex-item sorting-mr-8">
                <el-form-item label="总数量">
                  <el-input
                    ref="scatteredQty"
                    v-model.number="rightForm.recQty"
                    type="number"
                    min="0"
                    disabled
                    placeholder="请输入总数量"
                  />
                </el-form-item>
              </div>
            </div>
            <div v-if="rightForm.skuQuality == 'BAD_PRODUCT'" class="sorting-flex no_focus">
              <div class="sorting-flex-item">
                <el-form-item label="不良原因" prop="badReason">
                  <el-input
                    v-model.trim="rightForm.badReason"
                    type="text"
                    placeholder="请输入不良原因"
                  />
                </el-form-item>
              </div>
            </div>
            <div class="sorting-flex no_focus">
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
            <div v-if="diaFormInfoAttr.fieldList.length > 0" style="margin-top:10px;margin-bottom:10px" class="sorting-tit">
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
            <!-- <div class="sorting-flex">
              <div class="sorting-flex-item sorting-mr-8">
                <el-form-item label="生产批次" prop="productionBatch">
                  <el-input
                    id="recPkgQty"
                    v-model.number="rightForm.productionBatch"
                    type="number"
                    min="0"
                    placeholder="请输入生产批次"
                  />
                </el-form-item>
              </div>
              <div class="sorting-flex-item sorting-mr-8">
                <el-form-item label="生产日期" prop="productionDate">
                  <el-date-picker
                    v-model="rightForm.productionDate"
                    type="date"
                    placeholder="请选择生产日期"
                  />
                </el-form-item>
              </div>
              <div class="sorting-flex-item sorting-mr-8">
                <el-form-item label="有效期至" prop="validUntil">
                  <el-date-picker
                    v-model="rightForm.validUntil"
                    type="date"
                    placeholder="请选择有效期至"
                  />
                </el-form-item>
              </div>
            </div> -->
          </div>
          <div class="sorting-tit">上架</div>
          <div class="sorting-flex no_focus">
            <div class="sorting-right-col-1 sorting-mr-8">
              <el-button type="primary" size="small" icon="el-icon-search" :disabled="searchDisabled" @click="handleSearch">查询</el-button>
            </div>
            <div id="sorting-flex-item" class="sorting-flex-item">
              <el-form-item label="推荐库位" prop="paLotCode">
                <el-input v-model.number="rightForm.paLotCode" :disabled="searchDisabled" placeholder="编码、名称、库位属性" />
                <!-- <el-select v-model="rightForm.paLotCode" placeholder="编码、名称、库位属性">
                  <el-option
                    v-for="item in recommendedLocationList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select> -->
              </el-form-item>
            </div>
          </div>
        </el-form>
        <div class="form-right-btn">
          <div />
          <el-button :disabled="isSaveBtnDisabled" type="success" size="small" @click="saveRecInfoFn">
            保存记录（F4）
          </el-button>
          <el-button
            type="warning"
            icon="el-icon-refresh-left"
            @click="resetDataInfo"
          >重置
          </el-button>
          <div style="margin-top:10px">
            <upload-file
              :export-url="upload.uploadUrl"
              :img-pre-src-list="upload.pictureList"
              :disabled="disabled"
              :accept="upload.accept"
              :show-tips="!disabled"
              @handleImgSuccess="handleImgSuccess"
              @handleRemove="handleRemove"
            />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import mixins from './mixins'
import zhqcRecTable from './components/zhqcTable.vue'
import Vue from 'vue'
// 时间选择器-多种输入格式
Vue.directive('dateFormat', {
  inserted: function(el, binding, vnode) {
    const { value: _obj } = binding
    const { context: that, data } = vnode
    const { expression: key } = data.model
    const refKey = data.ref
    if (that && that._isVue) {
      const $this = el.getElementsByTagName('input')[0]
      $this.addEventListener('change', function() {
        let value = $this.value
        value = value.replace(
          /^(\d{4})\D*(\d{1,2})\D*(\d{1,2})\D*/,
          '$1-$2-$3'
        )// 格式化输入格式
        const time = value // 转换时间格式
        // const time = value && value.constructor == String ? new Date(value) : value;
        // 转换时间格式
        let keys = key.split('.') // 自定义赋值
        if (_obj) {
          const { keys: keyList } = _obj
          keys = keyList
        }
        if (key.includes('diaFormInfoAttr')) {
          that.diaFormInfoAttr.data[refKey] = time
        } else {
          if (keys && keys.length >= 2) {
            const [key1, key2, key3, key4] = keys
            if (key4) {
              that[key1][key2][key3][key4] = time
            } else if (key3) {
              that[key1][key2][key3] = time
            } else {
              that[key1][key2] = time
            }
          } else {
            that[key] = time
          }
        }
      })
      const inputs = that.$refs.form.$el.querySelectorAll('.el-input:not(.is-disabled) input')
      $this.addEventListener('keydown', function(event) {
        if (event.keyCode == '13') {
          that.$refs[refKey][0].blur()
          that.$refs[refKey][0].hidePicker()
          setTimeout(() => {
            inputs.forEach((v, i) => {
              if (v === $this) {
                if (inputs.length > i + 1) {
                  inputs[i + 1].focus()
                } else {
                  that.saveRecInfoFn()
                }
              }
            })
          }, 100)
        }
      })
    }
  }
})

export default {
  name: 'ReturnRecAcceptCopy',
  components: {
    zhqcRecTable,
    UploadFile: () => import('@/Subassembly/uploadStyleTwo/upload.vue')
  },
  mixins: [mixins],
  data() {
    return {
      store: 'quickReceipt/',
      modName: 'quickReceipt',
      abc: false,
      searchDisabled: true,
      disabled: false,
      isSaveBtnDisabled: true,
      multipleBatches: false,
      selectIndex: '',
      activeName: 'first',
      asnInOrderId: null,
      orderNoDisabled: false,
      skuCodeDisabled: true,
      skuCodeOpt: null,
      total: 0,
      totalSkuRecord: 0,
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      //  ----------------------------------------------------------
      pageRequestDt: { limit: this.$globalLimit, page: this.$globalPage }
    }
  },
  computed: {
    resp() { return this.$store.state[this.modName].pageResp }
    // total() { return this.$store.state[this.modName].total },
    // totalSkuRecord() { return this.$store.state[this.modName].totalSkuRecord }
  },
  watch: {
    // 收货记录-质检数
    'rightForm.qcDtReq.qcQty': function() {
      if (this.rightForm.qcDtReq.qcQty > 0 && this.rightForm.qcDtReq.goodQty >= 0) {
        if (this.rightForm.qcDtReq.goodQty > this.rightForm.qcDtReq.qcQty) {
          this.rightForm.qcDtReq.goodQty = this.rightForm.qcDtReq.qcQty
        }
        this.rightForm.qcDtReq.badQty = this.rightForm.qcDtReq.qcQty - this.rightForm.qcDtReq.goodQty
        this.rightForm.qualifiedRate = (this.rightForm.qcDtReq.goodQty / this.rightForm.qcDtReq.qcQty * 100).toFixed(2) + '%'
      } else {
        this.rightForm.qcDtReq.badQty = null
        this.rightForm.qualifiedRate = null
      }
    },
    // 收货记录-合格数
    'rightForm.qcDtReq.goodQty': function() {
      if (this.rightForm.qcDtReq.qcQty > 0 && this.rightForm.qcDtReq.goodQty >= 0) {
        if (this.rightForm.qcDtReq.goodQty > this.rightForm.qcDtReq.qcQty) {
          this.rightForm.qcDtReq.goodQty = this.rightForm.qcDtReq.qcQty
        }
        this.rightForm.qcDtReq.badQty = this.rightForm.qcDtReq.qcQty - this.rightForm.qcDtReq.goodQty
        this.rightForm.qualifiedRate = (this.rightForm.qcDtReq.goodQty / this.rightForm.qcDtReq.qcQty * 100).toFixed(2) + '%'
      } else {
        this.rightForm.qcDtReq.badQty = null
        this.rightForm.qualifiedRate = null
      }
    },
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
    'topForm.data.orderNo'(val) {
      if (!val) {
        this.topForm.data = {}
        this.asnNoForm = {}
        this.rightForm = {
          qcDtReq: {
            qcId: '',
            qcQty: '',
            recQty: '',
            qcNo: '',
            goodQty: '',
            checkResult: '',
            badQty: '',
            badReason: ''
          },
          qualifiedRate: '',
          skuQuality: 'GOOD_PRODUCT',
          recPkgQty: '',
          scatteredQty: '',
          recQty: '',
          adverseCauses: '',
          rejectQty: '',
          rejectReason: '',
          productionBatch: '',
          productionDate: '',
          validUntil: '',
          paLotCode: '',
          recMode: 'PC_MODE'
        }
        this.tableInfo1.data = []
        this.tableInfo2.data = []
        this.total = 0
        this.totalSkuRecord = 0
        this.diaFormInfoAttr.fieldList = []
        this.upload.pictureList = []
      }
    },

    'topForm.data.skuCode'(val) {
      if (!val) {
        this.topForm.data = {}
        this.topForm.data = JSON.parse(JSON.stringify(this.asnNoForm))
        this.rightForm = {
          qcDtReq: {
            qcId: '',
            qcQty: '',
            recQty: '',
            qcNo: '',
            goodQty: '',
            checkResult: '',
            badQty: '',
            badReason: ''
          },
          qualifiedRate: '',
          skuQuality: 'GOOD_PRODUCT',
          recPkgQty: '',
          scatteredQty: '',
          recQty: '',
          adverseCauses: '',
          rejectQty: '',
          rejectReason: '',
          productionBatch: '',
          productionDate: '',
          validUntil: '',
          paLotCode: '',
          recMode: 'PC_MODE'
        }
        this.diaFormInfoAttr.fieldList = []
      }
    },
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
  activated() {
    const asnNo = this.$store.state.asn.asnNo
    // const origNo = this.$store.state.asn.origNo
    if (asnNo) {
      this.topForm.data.orderNo = asnNo
      this.asnNoAndAsnSource()
    }
  },
  deactivated() {
    this.$store.dispatch('asn/setAsnNo', null)
  },
  methods: {
    rowClick(row) {
      this.selectIndex = row.rowIndex
      this.topForm.data.skuCode = row.skuCode
      this.topForm.data.batchNo = row.batchNo
      this.topForm.data.origRowNo = row.origRowNo
      this.scannSkuNo()
    },
    // 在 form 里 按 enter 键切换焦点
    formEnter(e) {
      const inputs = this.$refs.form.$el.querySelectorAll('.sorting-flex:not(.no_focus) .el-input:not(.is-disabled) input')
      inputs.forEach((v, i) => {
        if (v === e.target && e.target.nodeName == 'INPUT') {
          if (inputs.length > i + 1) {
            inputs[i + 1].focus()
          } else {
            this.saveRecInfoFn()
          }
        }
      })
    },
    handleTab() {
      console.log(this.activeName)
      if (this.activeName == 'first') {
        this.tableInfo1.height = 300 * Math.random()
      } else if (this.activeName == 'second') {
        this.tableInfo2.height = 300 * Math.random()
      }
    }
    /*   nextBatch() {
             this.$refs.scatteredQty.focus();
             this.topForm.data.batchNo = this.doubleBatchArr.filter(v => {
                 return v.batchNo != this.topForm.data.batchNo
             })[0].batchNo;
             this.selectIndex += 1;
         }*/
  }
}
</script>
<style lang="scss" scoped>
  /deep/ .el-form-item--mini {
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

  /deep/ .el-button--small {
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
        margin-bottom: 3px;

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
    // flex-direction: column;
  }

  .sorting-wrap-left{
    width: calc(100% - 386px);
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    border-right: 1px solid #eaeaea;
    padding: 12px 10px;
  }

  .sorting-wrap-right{
    width: 386px;
    padding: 10px;
    padding-bottom: 0;
  }

  .sorting-wrap .sorting-form {
    // height: 300px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #eaeaea;
  }

  @media screen and (max-height: 620px) {
    .sorting-wrap {
      overflow-y: auto;
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
    // padding: 0 10px;
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

  /deep/ .sorting-form-right {
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

  .sorting-table-title{
    font-weight: 600;
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

  /deep/ .sorting-form {
    .el-form-item--mini {
      .el-input.is-disabled .el-input__inner {
        color: #333;
      }
    }
  }
  #sorting-flex-item{
    /deep/ .el-form-item__label{
      vertical-align: middle;
      float: left;
      font-size: 14px;
      color: #606266;
      line-height: 26px;
      padding: 0 12px 0 0;
      box-sizing: border-box;
    }
    .el-input{
      width: auto;
    }
  }
</style>
