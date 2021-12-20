<script src="mixins/notification.js"></script>
<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="sorting-wrap">
    <div class="sorting-header">
      <div class="sorting-header-left">
        <el-form
          ref="form"
          label-position="right"
          size="mini"
          label-width="96px"
          @submit.native.prevent
        >
          <div class="sorting-flex">
            <div class="sorting-flex-item">
              <el-form-item label="入库/客户单号：" label-width="100px">
                <el-input
                  ref="orderNo"
                  v-model="orderForm.orderNo"
                  type="text"
                  clearable
                  placeholder="请输入入库/客户单号"
                  @keyup.enter.native="scannOrderNo"
                />
              </el-form-item>
            </div>
            <div class="sorting-flex-item" />
            <div class="sorting-flex-item header-btn">
              <!-- <el-button
                type="warning"
                icon="el-icon-refresh-left"
                @click="resetDataInfo"
              >重置
              </el-button> -->
            </div>
          </div>
        </el-form>
      </div>
      <div class="sorting-header-right">
        <div class="sorting-flex">
          <div class="sorting-flex-item" />
          <div class="sorting-flex-item" />
          <div class="sorting-flex-item">
            <p>总品种数</p>
            <p>{{ topForm.totalQty || 0 }}</p>
          </div>
          <div class="sorting-flex-item">
            <p>商品总数量</p>
            <p>{{ topForm.totalSkuNum || 0 }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="sorting-form">
      <div class="sorting-form-left" style="width: 60%">
        <div class="sorting-flex pack-section">
          <div class="sorting-flex-item">
            <p>{{ topForm.waitPaQty || "0" }}</p>
            <p>待上架数量</p>
          </div>
          <div class="sorting-flex-item">
            <p>{{ topForm.waitPaSkuNum || "0" }}</p>
            <p>待上架品种数</p>
          </div>
          <div class="sorting-flex-item">
            <p>{{ topForm.alreadyPaQty || "0" }}</p>
            <p>已上架数量</p>
          </div>
          <div class="sorting-flex-item">
            <p>{{ topForm.alreadyPaSkuNum || '0' }}</p>
            <p>已上架品种数</p>
          </div>
        </div>
        <div class="sorting-table">
          <div class="sorting-table-item">
            <div class="sorting-tit">
              待上架列表[<span class="tag-red">{{ tableInfo1.data.length }}</span>]
            </div>
            <div class="sorting-table-cont">
              <template>
                <zhqcTable
                  :data.sync="tableInfo1.data"
                  :field-list="tableInfo1.fieldList"
                  :handle="null"
                  :height="reviewTableHeight"
                  :select-index="selectIndex"
                  @handleClick="handleClick"
                  @handleEvent="handleEvent"
                />
              </template>
            </div>
          </div>
          <div class="sorting-table-item">
            <div class="sorting-tit">
              已上架列表[<span class="tag-green">{{ tableInfo2.data.length }}</span>]
            </div>
            <div class="sorting-table-cont">
              <template>
                <zhqcTable
                  :data.sync="tableInfo2.data"
                  :field-list="tableInfo2.fieldList"
                  :handle="null"
                  :height="reviewTableHeight"
                  @handleClick="handleClick"
                />
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="sorting-form-right" style="width: 40%">
        <el-form ref="form" label-position="top" size="mini">
          <div class="form-right-subcont">

            <div class="sorting-flex">
              <div class="sorting-flex-item sorting-mr-8">
                <el-form-item label="产品条码：">
                  <el-input
                    ref="barcode"
                    v-model="productFrom.barcode"
                    type="text"
                    placeholder="请输入产品条码"
                    @keyup.enter.native="scanSku"
                  />
                </el-form-item>
              </div>
            </div>

            <div class="sorting-flex">
              <div class="sorting-flex-item sorting-mr-8">
                <el-form-item label="上架库位">
                  <el-input
                    ref="paLotCode"
                    v-model="productFrom.paLotCode"
                    type="text"
                    placeholder="请输入上架库位"
                    @keyup.enter.native="scanlotCode"
                  />
                </el-form-item>
              </div>
              <div class="sorting-flex-item">
                <el-form-item label="上架数量">
                  <el-input
                    ref="paQty"
                    v-model.number="productFrom.paQty"
                    type="number"
                    min="1"
                    placeholder="请输入上架数量"
                    @keyup.enter.native="scanPaQty"
                  />
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="form-right-subcont">
            <div class="sorting-flex batchAttr-flex" />
          </div>
        </el-form>
        <div class="form-right-btn" style="margin-top: -12px" />
        <div class="review-data">
          <div class="review-data-item">
            <div class="data-label">{{ this.$t('paAccept.asnNo') }}：</div>
            <div class="data-value">{{ mainTable.originNo }}</div>
          </div>
          <div class="review-data-item">
            <div class="data-label">{{ this.$t('paAccept.cusOrderNo') }}：</div>
            <div class="data-value">{{ mainTable.cusOrderNo }}</div>
          </div>
          <div class="review-data-item">
            <div class="data-label">{{ this.$t('paAccept.paTypeName') }}：</div>
            <div class="data-value">{{ mainTable.paTypeName }}</div>
          </div>
          <div class="review-data-item">
            <div class="data-label">{{ this.$t('paAccept.recommLot') }}：</div>
            <div class="data-value">{{ skuDtInfo.recommLot }}</div>
          </div>
          <div class="review-data-item">
            <div class="data-label">{{ this.$t('paAccept.skuCode') }}：</div>
            <div class="data-value">{{ skuDtInfo.baseSku.skuCode }}</div>
          </div>
          <div class="review-data-item">
            <div class="data-label">{{ this.$t('paAccept.barcode') }}：</div>
            <div class="data-value">{{ skuDtInfo.baseSku.barcode }}</div>
          </div>
          <div class="review-data-item-line">
            <div class="data-label">{{ this.$t('paAccept.skuName') }}：</div>
            <div class="data-value">{{ skuDtInfo.baseSku.skuName }}</div>
          </div>
          <div class="review-data-item">
            <div class="data-label">{{ this.$t('paAccept.tradeName') }}：</div>
            <div class="data-value">{{ skuDtInfo.baseSku.tradeName }}</div>
          </div>
          <div class="review-data-item">
            <div class="data-label">{{ this.$t('paAccept.spec') }}：</div>
            <div class="data-value">{{ skuDtInfo.baseSku.spec }}</div>
          </div>
          <div class="review-data-item">
            <div class="data-label">{{ this.$t('paAccept.mainUnit') }}：</div>
            <div class="data-value">{{ skuDtInfo.baseSku.mainUnit }}</div>
          </div>
          <div class="review-data-item">
            <div class="data-label">{{ this.$t('paAccept.drugForm') }}：</div>
            <div class="data-value">{{ skuDtInfo.baseSku.drugForm }}</div>
          </div>
          <div class="review-data-item">
            <div class="data-label">{{ this.$t('paAccept.mfgName') }}：</div>
            <div class="data-value">{{ skuDtInfo.baseSku.mfgName }}</div>
          </div>
          <div class="review-data-item">
            <div class="data-label">{{ this.$t('paAccept.originCountry') }}：</div>
            <div class="data-value">{{ skuDtInfo.baseSku.originCountry }}</div>
          </div>
          <div class="review-data-item">
            <div class="data-label">{{ this.$t('paAccept.approvalNumber') }}：</div>
            <div class="data-value">{{ skuDtInfo.baseSku.approvalNumber }}</div>
          </div>
          <div class="review-data-item">
            <div class="data-label">{{ this.$t('paAccept.brandName') }}：</div>
            <div class="data-value">{{ skuDtInfo.baseSku.brandName }}</div>
          </div>
          <div class="review-data-item" style="color: red">
            <div class="data-label"><span class="tag-red">{{ this.$t('paAccept.waitPaQty') }}：</span></div>
            <div class="data-value"><span class="tag-red">{{ skuDtInfo.waitPaQty }}</span></div>
          </div>
          <div class="review-data-item" style="color: green">
            <div class="data-label">{{ this.$t('paAccept.paQty') }}：</div>
            <div class="data-value">{{ skuDtInfo.paQty }}</div>
          </div>
          <div class="sorting-tit tag-gainsboro">批次属性</div>
          <div class="review-data-item">
            <div class="data-label">{{ this.$t('paAccept.batchNo') }}：</div>
            <div class="data-value">{{ skuDtInfo.baseInvBatch.batchNo }}</div>
          </div>
          <div class="review-data-item">
            <div class="data-label">{{ this.$t('paAccept.productionBatch') }}：</div>
            <div class="data-value">{{ skuDtInfo.baseInvBatch.productionBatch }}</div>
          </div>
          <div class="review-data-item">
            <div class="data-label">{{ this.$t('paAccept.productionDate') }}：</div>
            <div class="data-value">{{ skuDtInfo.baseInvBatch.productionDate }}</div>
          </div>
          <div class="review-data-item">
            <div class="data-label">{{ this.$t('paAccept.invalidDate') }}：</div>
            <div class="data-value">{{ skuDtInfo.baseInvBatch.invalidDate }}</div>
          </div>
          <div class="review-data-item">
            <div class="data-label">{{ this.$t('paAccept.instoreDate') }}：</div>
            <div class="data-value">{{ skuDtInfo.baseInvBatch.instoreDate }}</div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import paAcceptMixins from "./mixins";
    import zhqcTable from "@/Subassembly/ZhqcRowClassTable";

    export default {
        name: 'paAccept',
        mixins: [paAcceptMixins],
        components: {
            zhqcTable,
        },
        data() {
            return {
                store: "paAccept/",
                modName: "paAccept",
                isReview: true,
                abc: false,
                selectIndex: "",
                activeName: "first",
                reviewTableHeight: 0,
                dialogInfo: {
                    title: "",
                    visible: false,
                    type: "",
                    closeBtn: {label: "", type: "", icon: "", event: "close", show: true},
                    btList: [
                        {
                            label: this.$t("table.close"),
                            type: "",
                            icon: "",
                            event: "close",
                            show: true,
                        },
                        {
                            label: this.$t("table.save"),
                            type: "primary",
                            icon: "",
                            event: "saveReviewPersonTwo",
                            btLoading: false,
                            show: true,
                        },
                    ],
                },

                reviewData: {id: null},
                reviewPlatform: null,
            };
        },
        methods: {
            calcTableHeight() {
                const navH = document.getElementsByClassName('navbar')[0] ? document.getElementsByClassName('navbar')[0].clientHeight : 0
                const tagH = document.getElementsByClassName('tags-view-container')[0] ? document.getElementsByClassName('tags-view-container')[0].clientHeight : 0
                const reviewH = document.getElementsByClassName('sorting-header')[0] ? document.getElementsByClassName('sorting-header')[0].clientHeight : 0
                const packH = document.getElementsByClassName('pack-section')[0] ? document.getElementsByClassName('pack-section')[0].clientHeight : 0
                const titleH = document.getElementsByClassName('sorting-tit')[0] ? document.getElementsByClassName('sorting-tit')[0].clientHeight : 0

                let height = (window.innerHeight) - (navH + tagH + reviewH + packH + titleH * 2) - 10;
                this.reviewTableHeight = height / 2;

            },
            rowClick(row) {
                this.selectIndex = row.rowIndex;
                this.mainTable.paType = row.paType;
                this.productFrom.barcode = row.skuCode;
                this.productFrom.containerNo = row.containerNo;
                this.productFrom.id = row.id;
                this.scanSku();
            },
        },
    };
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

    /deep/ .sorting-header {
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

    .sorting-wrap .sorting-form .sorting-form-left {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        border-right: 1px solid #eaeaea;
        /*border-bottom: 1px solid #eaeaea;*/
        /*padding: 10px 0;*/
    }

    .sorting-wrap .sorting-form .sorting-form-right {
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
