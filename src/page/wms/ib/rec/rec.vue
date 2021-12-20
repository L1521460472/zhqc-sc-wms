<script src="mixins/index.js"></script>
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
          <list-supplier :select-key="topForm.data.supplierId" @select="selectSupplier" />
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
        <template v-slot:form-sys class="el-icon-test">
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

    <div slot="tab-body" class="tab-body_auto">
      <!--  主页面的table表格  -->
      <zhqc-table
        :data.sync="resp"
        :field-list="tableInfo.fieldList"
        :handle="null"
        @handleClick="handleClick"
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
      <full-pop-item full-pop-item-title="ASN信息">
        <zhqc-form
          :ref-obj.sync="diaFormInfo.ref"
          :form-type="formType"
          :class-name="viewFlag"
          :data="diaFormInfo.data"
          :field-list="diaFormInfo.fieldList"
          :rules="diaFormInfo.rules"
          :list-type-info="listTypeInfo"
          :label-width="diaFormInfo.labelWidth"
          style="padding: 1% 5%"
          @handleEvent="handleEvent"
        >
          <template v-slot:form-ownerId="scope">
            <list-owner :disabled="true" :select-key="diaFormInfo.data.ownerId" @select="selectOwnerDia" />
          </template>
          <template v-slot:form-supplierId="scope">
            <list-supplier :select-key="diaFormInfo.data.supplierId" @select="selectSupplierDia" />
          </template>
        </zhqc-form>
      </full-pop-item>
      <full-pop-item full-pop-item-title="单据凭证">
        <uploadImg
          ref="uploadImg"
          :export-url="exportImgUrl"
          :accept="imgInfo.accept"
          :img-pre-src-list="imgInfo.pictureList"
          :show-tips="!imgInfo.disabled"
          :disabled="imgInfo.disabled"
          @handleImgSuccess="handleImgSuccess"
          @handleRemove="handleRemove"
        />

      </full-pop-item>

      <full-pop-item full-pop-item-title="收货记录">
        <!-- <el-button v-show="diaFormInfo.addDtBtnShow" icon="el-icon-folder-add" @click="handleClick('openAddDtPage')">添加明细</el-button> -->

        <vex-dia-table
          :data.sync="diaFormInfo.dtTableInfo.data"
          :field-list="diaFormInfo.dtTableInfo.fieldList"
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
import { VUE_APP_BASE_URL } from '@/api/api.config.js'
    import asnMixins from './mixins';
    import buttonList from "@/components/buttonList";
    import listOwner from '@/Subassembly/ZhqcList/ListOwner';
    import listSupplier from '@/Subassembly/ZhqcList/ListSupplier';
    import listSku from '@/Subassembly/ZhqcList/ListSku';
    import zhqcRecAcceptance from './recAcceptance';
    import zhqcReturnRecAcceptance from './returnRecAcceptance';

    export default {
        name: "rec",
        mixins:[ asnMixins ],
        components: {
          buttonList,listOwner,listSupplier,listSku,
          uploadImg: () => import('@/Subassembly/uploadStyleTwo/upload.vue')
        },
        computed:{
            resp(){return this.$store.state[this.modName].pageResp},
            total(){return this.$store.state[this.modName].total}
        },
        data(){
            return{
                store:'rec/',
                modName:'rec',
                collapsable: false,//展开收缩
                pageRequest: {limit:this.$globalLimit,page:this.$globalPage},
              formType:null,
              viewFlag:null,
              ownerUrl: VUE_APP_WMS_MODEL + '/base/partner/owner/queryOwnerCbList',
              skuUrl: VUE_APP_WMS_MODEL+'/base/sku/sku/querySkuCbList',
                dialogInfo: {
                    title: "",
                    visible: false,
                    type: '',
                    //返回按钮
                    closeBtn: {label: '', type: '', icon: '', event: 'close', show: true},
                    btList: [
                        {label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true},
                        {label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', btLoading: false, show: true}]
                },
              dialogInfoDt: {
                title: "新增ASN明细",
                visible: false,
                type: '',
                addDtBtnShow: false,
                btList: [
                  {label: this.$t('table.close'), type: '', icon: '', event: 'closeAddDtPage', show: true},
                  {label: this.$t('table.save'), type: 'primary', icon: '', event: 'saveDt', loading: false, show: true}],
              },
              exportImgUrl: VUE_APP_BASE_URL + 'fileMgr/fileManager/upload2Path',
              imgInfo:{
               pictureList: [],
               disabled: false,
                accept: [{ type: 'img', limit: 6 }],
              }
            }
        },
        watch:{
            //监听弹窗的状态 清除校验与初始化字段
            'dialogInfo.visible' (val) {
                const diaFormInfo = this.diaFormInfo
                if (!val) {
                    if (diaFormInfo.ref) {
                        diaFormInfo.ref.resetFields()
                    }
                    this.resetFormData()
                }
            },
          //展开收缩
          collapsable(val) {
            //
            if (val) {
              this.collapsableFormMore();
            } else {
              this.collapsableForm();
            }
          },
        },
        methods: {
          selectOwner(data,obj){
            this.topForm.data.ownerId = obj.id;
          },
          selectSupplier(data,obj){
            this.topForm.data.supplierId = obj.id;
          },
          selectSku(data,obj){
            this.topForm.data.skuId = obj.id;
          },
          selectOwnerDia(data,obj){
            this.diaFormInfo.data.ownerId = obj.id;
            this.diaFormInfo.data.ownerName = obj.ownerName;
          },
          selectSupplierDia(data,obj){
            this.diaFormInfo.data.supplierId = obj.id;
            this.diaFormInfo.data.supplierName = obj.supplierName;
          },
          selectSkuDia(data,obj){
            this.diaFormInfoDt.data.skuCode=obj.skuCode;
            this.diaFormInfoDt.data.skuName=obj.skuName;
            this.diaFormInfoDt.data.spec=obj.spec;
            this.diaFormInfoDt.data.drugForm=obj.drugForm;
            this.diaFormInfoDt.data.mainUnit=obj.mainUnit;
            this.diaFormInfoDt.data.skuId=obj.id;
          }
        },
        mounted() {

        }
    }
</script>
