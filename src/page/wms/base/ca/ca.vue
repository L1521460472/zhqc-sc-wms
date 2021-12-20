<template>
  <layout-body>
    <div slot="top-form">
      <!--  主页面top表单 layout-body-auto  -->
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
      </zhqc-top-form>
    </div>
    <div slot="left-btn">
      <el-button-group>
        <el-button
          type="primary"
          icon="el-icon-folder-add"
          @click="handleClick('openAddPage')"
        >{{ $t("table.add") }}</el-button>
      </el-button-group>
    </div>

    <div slot="tab-body" class="tab-body_auto">
      <!--  主页面的table表格  -->
      <zhqc-table
        :data.sync="resp"
        :field-list="tableInfo.fieldList"
        :handle="tableInfo.handle"
        @handleClick="handleClick"
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
    <!--増、查、改的表单-->
    <full-pop
      :visible.sync="dialogInfo.visible"
      :top-title="dialogInfo.title"
      :close-btn="dialogInfo.closeBtn"
      :save-list="dialogInfo.btList"
      @handleClick="handleClick"
    >
      <full-pop-item full-pop-item-title="CA">
        <zhqc-form
          :form-type="dialogInfo.type"
          :ref-obj.sync="diaFormInfo.ref"
          :data="diaFormInfo.data"
          :field-list="diaFormInfo.fieldList"
          :rules="diaFormInfo.rules"
          :list-type-info="listTypeInfo"
          :label-width="diaFormInfo.labelWidth"
        >
          <!--仓库 -->
          <!-- <template v-slot:form-whName="scope">
            <list-consigner :select-key="diaFormInfo.data.whName" :disabled="dialogInfo.type=='view'" @select="selectWhDia" />
          </template> -->
          <!--销售仓CA -->
          <template v-slot:form-whAreaId="scope">
            <remote-list-two
              :model="diaFormInfo.data"
              :item="scope.item"
              :list-url="VirtualwhURL"
              :disabled="scope.item.disabled"
              :type="1"
            />
          </template>

          <!-- 承运商名称 -->
          <template v-slot:form-carrierId="scope">
            <list-carrierName :select-key="diaFormInfo.data.carrierId" :disabled="dialogInfo.type=='view'" @select="selectCarrierDia" />
          </template>
        </zhqc-form>
      </full-pop-item>
      <!-- <full-pop-item full-pop-item-title="下发配置">
        <zhqc-form
          :ref-obj.sync="diaFormInfo.pushConfig.ref"
          :form-type="dialogInfo.type"
          :data="diaFormInfo.pushConfig.data"
          :field-list="diaFormInfo.pushConfig.fieldList"
          :list-type-info="listTypeInfo"
          :label-width="diaFormInfo.pushConfig.labelWidth"
        />
      </full-pop-item> -->
      <full-pop-item full-pop-item-title="CA明细">
        <el-button
          v-show="diaFormInfo.addDtBtnShow"
          icon="el-icon-folder-add"
          @click="handleClick('openAddDtPage')"
        >添加明细</el-button>
        <zhqc-table
          :data.sync="diaFormInfo.dtTableInfo.dtList"
          :field-list="diaFormInfo.dtTableInfo.fieldList"
          :handle="diaFormInfo.dtTableInfo.handle"
          :height="tabHeight"
          :content-height="contentHeight"
          @handleClick="handleClick"
        />
      </full-pop-item>
    </full-pop>
    <!--増、查、改的表单-->
    <zhqc-dialog
      :title="dialogInfoDt.title"
      :visible.sync="dialogInfoDt.visible"
      :width="dialogInfoDt.width"
      :bt-list="dialogInfoDt.btList"
      @handleClick="handleClick"
    >
      <zhqc-form
        :ref-obj.sync="diaFormInfoDt.ref"
        :data="diaFormInfoDt.data"
        :field-list="diaFormInfoDt.fieldList"
        :rules="diaFormInfoDt.rules"
        :list-type-info="listTypeInfo"
        :label-width="diaFormInfoDt.labelWidth"
      />
    </zhqc-dialog>
  </layout-body>
</template>

<script>
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
import caMixins from './mixins'
// import listConsigner from '@/Subassembly/ZhqcList/ListConsigner'
import listCarrierName from '@/Subassembly/ZhqcList/ListCarrierName'
export default {
  name: 'Ca',
  components: {
    // listConsigner,
    listCarrierName
  },
  mixins: [caMixins],
  data() {
    return {
      isOpen: false,
      store: 'ca/',
      modName: 'ca',
      collapsable: false,
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      VirtualwhURL: VUE_APP_WMS_MODEL + '/base/wh/whArea/queryVirtualwhList',
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
            event: 'save',
            btLoading: false,
            show: true
          }
        ]
      },
      dialogInfoDt: {
        title: '新增明细',
        visible: false,
        type: '',
        addDtBtnShow: false,
        btList: [
          {
            label: this.$t('table.close'),
            type: '',
            icon: '',
            event: 'closeAddDtPage',
            show: true
          },
          {
            label: this.$t('table.save'),
            type: 'primary',
            icon: '',
            event: 'saveDt',
            loading: false,
            show: true
          }
        ]
      }
    }
  },
  computed: {
    resp() {
      return this.$store.state[this.modName].pageResp
    },
    total() {
      return this.$store.state[this.modName].total
    }
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
    collapsable(val) {
      //
      if (val) {
        this.collapsableFormMore()
      } else {
        this.collapsableForm()
      }
    }
  },
  mounted() {},
  methods: {
    selectWhDia(data, obj) {
      this.diaFormInfo.data.whId = obj.id
      this.diaFormInfo.data.whName = obj.whName
      console.log('selectWhDia')
      console.log(obj)
    },
    selectCarrierDia(data, obj) {
      this.diaFormInfo.data.carrierId = obj.id
      this.diaFormInfo.data.carrierName = obj.carrierName
    }
  }
}
</script>
