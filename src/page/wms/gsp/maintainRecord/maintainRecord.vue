<!--
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-02 15:14:31
-->
<template>
  <div class="sorting-wrap">
    <div class="sorting-form">
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
        <!--<template v-slot:form-skuCategoryId="scope">-->
        <!--<zhqc-list-sku-category @select="selectSkuCategory" :selectKey="topForm.data.skuCategoryId" ></zhqc-list-sku-category>-->
        <!--</template>-->
        <!--产品分类-->
        <template v-slot:form-skuCategoryId="scope">
          <remote-list
            :model="topForm.data"
            select-key="skuCategoryId"
            lable="categoryName"
            parame-code="queryText"
            :list-url="skuCategoryUrl"
          >
            <template v-slot="scop">
              <span style="float: left; color: #8492a6; font-size: 13px">{{ scop.item.categoryCode }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px;margin-left:30px;">{{ scop.item.categoryName }}</span>
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
    <div class="sorting-table">
      <div class="sorting-table-item">
        <div class="sorting-table-cont">
          <template>
            <yut
              :data.sync="resp"
              :field-list="tableInfo.fieldList"
              :handle="null"
              :height="tableHeight"
              :top-btn="{}"
              show-summary
              @handleClick="handleClick"
              @handleEvent="handleEvent"
            />
            <zhqc-page
              :total="total"
              :page-request="pageRequest"
              @pageChange="pageChange"
            />
          </template>
        </div>
      </div>
      <div class="sorting-table-item">
        <div class="sorting-table-cont">
          <template>
            <vex-dia-table
              :data.sync="pageSkuRecordResp"
              :field-list="tableInfoOther.fieldList"
              :handle="null"
              :height="tableHeight"
              :top-btn="{}"
              show-summary
              @handleClick="handleClick"
              @handleEvent="handleEvent"
            />
            <zhqc-page
              :total="totalSkuRecord"
              :page-request="pageRequestDt"
              @pageChange="editPageChange"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
import maintainRecordMixins from './mixins'
import yut from './../../../../Subassembly/yutr'

export default {
  name: 'MaintainRecord',
  components: { yut },
  mixins: [maintainRecordMixins],
  data() {
    return {
      store: 'maintainRecord/',
      modName: 'maintainRecord',
      collapsable: false, // 展开收缩
      skuCategoryUrl: VUE_APP_WMS_MODEL + '/base/sku/skuCategory/queryCbList',
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      //  ----------------------------------------------------------
      pageRequestDt: { limit: this.$globalLimit, page: this.$globalPage },
      diaPickFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        subTableInfo: {
          title: '列表详情',
          ref: null,
          type: null,
          fieldList: [],
          rules: {},
          labelWidth: '120px',
          // handle:null,
          handle: null,
          saveList: [
            { label: '关闭', type: '', icon: '', event: 'close', show: true },
            { label: '保存', type: 'primary', icon: '', event: 'save', saveLoading: false, show: true }
          ],
          topBtn: { label: '添加明细', type: '', icon: 'el-ali-icon-quanxuan', event: 'addSub', show: false }
        }
      }
    }
  },
  computed: {
    resp() { return this.$store.state[this.modName].pageResp },
    total() { return this.$store.state[this.modName].total },
    pageSkuRecordResp() { return this.$store.state[this.modName].pageSkuRecordResp || [] },
    totalSkuRecord() { return this.$store.state[this.modName].totalSkuRecord }
  },
  watch: {
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
    selectSkuCategory(data) {
      this.topForm.data.skuCategoryId = data
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
    .el-date-editor.el-input, .el-date-editor.el-input__inner{
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
      background: #f0f9eb;
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
    /*height: 300px;*/
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #eaeaea;
  }
  @media screen and (max-height: 650px) {
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
</style>

