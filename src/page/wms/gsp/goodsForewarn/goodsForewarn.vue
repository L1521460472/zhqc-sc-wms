<!--
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-02 15:13:58
-->
<template>
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
        <template v-slot:form-ownerId="scope">
          <list-owner
            :select-key="topForm.data.ownerId"
            @select="selectOwner"
          />
        </template>
        <template v-slot:form-lotId="scope">
          <list-wh-lot
            :select-key="topForm.data.lotId"
            @select="selectWhLot"
          />
        </template>
        <template v-slot:form-areaId="scope">
          <list-wh-area
            :select-key="topForm.data.areaId"
            :disabled="dialogInfo.type == 'view'"
            @select="selectWhAreaDia"
          />
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
      <export-vue
        template-name="goodsForewarnService"
        export-url="gsp/goodsForewarn/export"
        export-name="产品近效期预警表"
        @exportParam="exportData"
      />
    </div>

    <div slot="tab-body" class="tab-body_auto">
      <!--  主页面的table表格  -->
      <zhqc-table
        :data.sync="resp"
        :field-list="tableInfo.fieldList"
        :handle="tableInfo.handle"
        :callback="callBack"
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
    <zhqc-dialog
      :title="dialogInfo.title"
      :visible.sync="dialogInfo.visible"
      :width="dialogInfo.width"
      :bt-list="dialogInfo.btList"
      @handleClick="handleClick"
    >
      <zhqc-form
        :form-type="dialogInfo.type"
        :ref-obj.sync="diaFormInfo.ref"
        :data="diaFormInfo.data"
        :field-list="diaFormInfo.fieldList"
        :rules="diaFormInfo.rules"
        :list-type-info="listTypeInfo"
        :label-width="diaFormInfo.labelWidth"
      />
    </zhqc-dialog>
  </layout-body>
</template>

<script>
import goodsForewarnMixins from './mixins'
import listOwner from '@/Subassembly/ZhqcList/ListOwner'
import listWhLot from '@/Subassembly/ZhqcList/ListWhLot'
import listWhArea from '@/Subassembly/ZhqcList/ListWhAreaCascade'
export default {
  name: 'GoodsForewarn',
  components: {
    listOwner,
    listWhLot,
    listWhArea
  },
  mixins: [goodsForewarnMixins],
  data() {
    return {
      store: 'goodsForewarn/',
      modName: 'goodsForewarn',
      collapsable: false, // 展开收缩
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      dialogInfo: {
        title: '',
        visible: false,
        type: '',
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
  mounted() {},
  methods: {
    selectOwner(data) {
      this.topForm.data.ownerId = data
    },
    selectWhLot(data) {
      this.topForm.data.lotId = data
    },
    // 查询区域
    selectWhAreaDia(data) {
      // this.topForm.data.areaId = data;
      this.topForm.data.areaId = data
      this.topForm.data.zoneId = null
      this.topForm.data.roadwayId = null
      this.areaId = data
      this.zoneId = null
    },
    // 预警行颜色回调
    callBack(args) {
      if (args.row.validityDay <= 10) {
        return 'warning-row'
      } else if (args.row.validityDay > 11 && args.row.validityDay < 30) {
        return 'success-row'
      }
      return ''
    }
  }
}
</script>
