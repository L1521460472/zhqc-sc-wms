<template>
  <div class="sorting-wrap">

    <div class="sorting-form-right">
      <el-form ref="form" label-position="top" size="mini">
        <div class="form-right-subcont">

          <div class="sorting-flex">
            <div class="sorting-flex-item sorting-mr-8">
              <el-form-item label="来源库位：">
                <el-input
                  ref="fmLotCode"
                  v-model="form.fmLotCode"
                  type="text"
                  :disabled="disabledFmLotCode"
                  placeholder="请输入来源库位"
                  @keyup.enter.native="scannFmLotCode"
                />
              </el-form-item>
            </div>
            <div class="sorting-flex-item sorting-mr-8">
              <el-form-item label="产品编码/条码：">
                <el-input
                  ref="barcode"
                  v-model="form.barcode"
                  type="text"
                  :disabled="disabledBarcode"
                  placeholder="请输入产品编码/条码"
                  @keyup.enter.native="scannProBarcode"
                />
              </el-form-item>
            </div>
            <div class="sorting-flex-item sorting-mr-8">
              <el-form-item label="移位数量：">
                <el-input
                  ref="moveQty"
                  v-model="form.moveQty"
                  type="text"
                  :disabled="disabledMoveQty"
                  placeholder="请输入移位数量"
                  @keyup.enter.native="scannmoveQty"
                />
              </el-form-item>
            </div>
            <div class="sorting-flex-item sorting-mr-8">
              <el-form-item label="目标库位：">
                <el-input
                  ref="toLotCode"
                  v-model="form.toLotCode"
                  type="text"
                  :disabled="disabledToLotCode"
                  placeholder="请输入目标库位"
                  @keyup.enter.native="scannToLotCode"
                />
              </el-form-item>
            </div>
          </div>

          <div class="sorting-flex">
            <el-form-item label="批次号">
              <el-select v-model="form.batchNo" :disabled="disabledBatchNo" @change="batchNoChange">
                <el-option v-for="item in batchNoList" :key="item.value" :label="item.key" :value="item.value" />
              </el-select>
            </el-form-item>
          </div>

          <div class="operation-btn">
            <el-button size="small" type="primary" @click="saveData">保存(F1)</el-button>
            <el-button size="small" type="warning" icon="el-icon-refresh-left" @click="reboot">重置(F2)</el-button>
          </div>

        </div>
        <div class="form-right-subcont">
          <div class="sorting-flex batchAttr-flex" />
        </div>
      </el-form>
      <div class="form-right-btn" style="margin-top: -12px" />
      <div class="review-data">
        <div class="review-data-item">
          <div class="data-label">{{ this.$t('moveLocation.recommLot') }}：</div>
          <div class="data-value">{{ skuInfo.recommLot }}</div>
        </div>
        <div class="review-data-item">
          <div class="data-label">{{ this.$t('moveLocation.productionBatch') }}：</div>
          <div class="data-value">{{ skuInfo.productionBatch }}</div>
        </div>

        <div class="review-data-item">
          <div class="data-label">{{ this.$t('moveLocation.skuCode') }}：</div>
          <div class="data-value">{{ skuInfo.skuCode }}</div>
        </div>
        <div class="review-data-item">
          <div class="data-label">{{ this.$t('moveLocation.productionDate') }}：</div>
          <div class="data-value">{{ skuInfo.productionDate }}</div>
        </div>

        <div class="review-data-item">
          <div class="data-label">{{ this.$t('moveLocation.skuName') }}：</div>
          <div class="data-value">{{ skuInfo.skuName }}</div>
        </div>
        <div class="review-data-item">
          <div class="data-label">{{ this.$t('moveLocation.instoreDate') }}：</div>
          <div class="data-value">{{ skuInfo.instoreDate }}</div>
        </div>

        <div class="review-data-item">
          <div class="data-label">{{ this.$t('moveLocation.barcode') }}：</div>
          <div class="data-value">{{ skuInfo.barcode }}</div>
        </div>
        <div class="review-data-item">
          <div class="data-label">{{ this.$t('moveLocation.invalidDate') }}：</div>
          <div class="data-value">{{ skuInfo.invalidDate }}</div>
        </div>

        <div class="review-data-item">
          <div class="data-label">{{ this.$t('moveLocation.spec') }}：</div>
          <div class="data-value">{{ skuInfo.spec }}</div>
        </div>
        <div class="review-data-item">
          <div class="data-label">{{ this.$t('moveLocation.qty') }}：</div>
          <div class="data-value">{{ skuInfo.qty }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from './mixins'
// import listPartner from '@/Subassembly/ZhqcList/ListPartner'

export default {
  name: 'MoveLocation',
  // components: { listPartner },
  mixins: [mixins],
  data() {
    return {
      store: 'moveLocation/',
      modName: 'moveLocation',
      disabledFmLotCode: false,
      disabledBatchNo: false,
      disabledBarcode: true,
      disabledMoveQty: true,
      disabledToLotCode: true
    }
  },

  methods: {
    selectCarrier(data) {
      this.form.carrierId = data
    }

  }
}
</script>

<style lang="scss" scoped>
  .soDataDiv {
    /deep/ .el-form-item--mini {
      .el-form-item__content,
      .el-form-item__label {
        line-height: 26px;
        font-size: 12px;
      }

      .el-date-editor.el-input,
      .el-date-editor.el-input__inner {
        width: auto;
        max-width: 100px;
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
  }

  .pack-section {
    padding: 6px 20px;
    background: #EBEEF5;

    .sorting-flex-item {
      p {
        height: 26px;
        line-height: 26px;
      }

      p:first-child {
        font-size: 20px;
      }
    }
  }

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

        .el-input.is-disabled .el-input__inner {
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

  .sorting-wrap .sorting-form {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    flex-direction: row;
    /*border-bottom: 1px solid #eaeaea;*/
  }

  @media screen and (max-height: 600px) {
    .sorting-wrap .sorting-form {
      overflow-y: auto;
      height: 150px;
    }
  }

  .sorting-wrap .sorting-form-right {
    /*width: 36%;*/
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

  .tag-gainsboro{
    background-color: gainsboro;
  }

  .sorting-tit .tag-green {
    color: #50cb1b;
  }

  .form-right-subcont {
    margin-bottom: 7px;
    line-height: 0;
  }

  .form-right-subcont .sorting-flex-item .el-select.el-select--mini {
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
    border-top: 1px solid #eaeaea;
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

  /deep/ .no_label {
    display: flex;

    .el-form-item--mini:last-child {
      flex: 1;

      .el-form-item__label {
        color: transparent;
      }

      .el-checkbox {
        margin-left: 8px;

        .el-checkbox__label {
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

  /deep/ .sorting-wrap {
    button.is-disabled {

    }
  }

  .review-data {
    /*max-height: 300px;*/
    /*overflow:auto;*/
    border-top: 1px solid #eaeaea;
  }

  .review-data .review-data-item {
    width: 45%;
    font-size: 12px;
    display: inline-block;
  }

  .review-data .review-data-item-line {
    width: 90%;
    font-size: 12px;
    display: inline-block;
  }

  .review-data .review-data-item .data-label {
    width: 70px;
    line-height: 14px;
    padding-bottom: 2px;
    font-size: 12px;
    display: inline;
  }

  .review-data .review-data-item .data-value {
    width: 180px;
    font-size: 12px;
    display: inline;
  }

  .review-data .review-data-item-line .data-label {
    width: 70px;
    line-height: 14px;
    padding-bottom: 2px;
    font-size: 12px;
    display: inline;
  }

  .review-data .review-data-item-line .data-value {
    /*width: 300px;*/
    font-size: 12px;
    display: inline;
  }
</style>
