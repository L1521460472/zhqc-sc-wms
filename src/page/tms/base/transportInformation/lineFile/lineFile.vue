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

        <!-- 起始地 -->
        <template v-slot:form-startName>
          <list-start
            :model="topForm.data"
            select-key="startName"
            lable="startName"
            parame-code="startCode"
          />
        </template>
        <!-- 展开收起表单 -->
        <template v-slot:form-sys="" class="el-icon-test">
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
        </template>
      </zhqc-top-form>
    </div>
    <div slot="left-btn">
      <el-button-group>
        <el-button icon="el-icon-folder-add" :disabled="false" @click="handleClick('openAddPage')">{{ $t('table.add') }}</el-button>
      </el-button-group>
      <!-- <export-vue
        template-name="lineFileService"
        export-url="base/lineFile/export"
        export-name="运输线路表"
        @exportParam="exportData"
      /> -->
    </div>

    <div slot="tab-body" class="tab-body_auto">
      <!--  主页面的table表格  -->
      <zhqc-table
        :data.sync="resp"
        :field-list="tableInfo.fieldList"
        :handle="tableInfo.handle"
        @handleClick="handleClick"
      >
        <template v-slot:bt-slotEvent="scope">
          <el-button size="mini" type="primary" :disabled="false" @click="openViewPage(scope.data.row)">{{ $t('table.view') }}</el-button>
          <el-button size="mini" type="success" :disabled="false" @click="openEditPage(scope.data.row)">{{ $t('table.edit') }}</el-button>
          <el-button v-if="scope.data.row.isEnable === 1" size="mini" type="danger" :disabled="false" @click="stopData(scope.data.row)">停用</el-button>
          <el-button v-if="scope.data.row.isEnable === 0" size="mini" type="danger" :disabled="false" @click="beginData(scope.data.row)">启用</el-button>
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
      :top-title="dialogInfo.title"
      :visible.sync="dialogInfo.visible"
      :close-btn="dialogInfo.closeBtn"
      :save-list="dialogInfo.btList"
      @handleClick="handleClick"
    >
      <full-pop-item full-pop-item-title="线路信息">
        <zhqc-link-form
          :ref-obj.sync="diaFormInfo.ref"
          :data="diaFormInfo.data"
          :field-list="diaFormInfo.fieldList"
          :rules="diaFormInfo.rules"
          :list-type-info="listTypeInfo"
          :label-width="diaFormInfo.labelWidth"
          @handleEvent="handleEvent"
        >

          <!-- 起始地 -->
          <template v-slot:form-startName>
            <list-start
              :model="diaFormInfo.data"
              select-key="startName"
              lable="startName"
              parame-code="startCode"
              @select="startNameChange"
            />
          </template>

          <!-- 目的省份 -->
          <template v-slot:form-receiveProviceId="scope">
            <list-link
              :disabled="dialogInfo.type == 'view'"
              :select-key="diaFormInfo.data[scope.item.value]"
              :link-id="null"
              :list-url="ProviceUrl"
              :model="diaFormInfo.data"
              :item="scope.item"
              :is-frist="true"
              @select="receiveProviceChange"
            />
          </template>

          <!-- 目的城市 -->
          <template v-slot:form-receiveCityId="scope">
            <list-link
              :disabled="dialogInfo.type == 'view'"
              :select-key="diaFormInfo.data[scope.item.value]"
              :link-id="diaFormInfo.data[scope.item.linkId]"
              :list-url="CityUrl"
              :item="scope.item"
              :model="diaFormInfo.data"
              @select="receiveCityChange"
            />
          </template>
          <!-- 目的区县 -->
          <template v-slot:form-receiveAreaId="scope">
            <list-link
              :disabled="dialogInfo.type == 'view'"
              :select-key="diaFormInfo.data[scope.item.value]"
              :link-id="diaFormInfo.data[scope.item.linkId]"
              :list-url="AreaUrl"
              :item="scope.item"
              :model="diaFormInfo.data"
              @select="receiveAreaChange"
            />
          </template>

          <!--  线路明细 -->
          <template v-slot:form-lineRemark>
            <el-input
              v-model="diaFormInfo.data.lineRemark"
              :type="['view'].includes(dialogInfo.type) ? 'textarea':'input'"
              :rows="1"
              :disabled="['view'].includes(dialogInfo.type)"
              :placeholder="'线路描述'"
            />
          </template>
        </zhqc-link-form>
      </full-pop-item>
      <full-pop-item full-pop-item-title="线路明细">
        <el-button
          v-show="['add','edit'].includes(dialogInfo.type)"
          icon="el-icon-folder-add"
          class="add_btn"
          type="primary"
          @click="handleClick('addItem')"
        >添加明细</el-button>
        <div class="add_table_box">
          <zhqc-table
            :data.sync="popTableInfo.data"
            :field-list="popTableInfo.fieldList"
            :handle="popTableInfo.handle"
            @handleClick="handleClick"
          />
        </div>
      </full-pop-item>

      <zhqc-dialog
        :title="nestingDialogInfo.title"
        :visible.sync="nestingDialogInfo.visible"
        :width="nestingDialogInfo.width"
        :bt-list="nestingDialogInfo.btList"
        @handleClick="handleClick"
      >
        <zhqc-link-form
          :ref-obj.sync="nestDiaFormInfo.ref"
          :data="nestDiaFormInfo.data"
          :field-list="nestDiaFormInfo.fieldList"
          :rules="nestDiaFormInfo.rules"
          :list-type-info="listTypeInfo"
          :label-width="nestDiaFormInfo.labelWidth"
        >
          <!-- 起始地 -->
          <template v-slot:form-startName>
            <list-start
              :model="nestDiaFormInfo.data"
              select-key="startName"
              lable="startName"
              parame-code="startCode"
            />
          </template>
          <!-- 目的地 -->
          <template v-slot:form-endName>
            <list-start
              :model="nestDiaFormInfo.data"
              select-key="endName"
              lable="endName"
              parame-code="endCode"
            />
          </template>

        </zhqc-link-form>

      </zhqc-dialog>
    </full-pop>
  </layout-body>
</template>

<script>
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
import lineFileMixins from './mixins'
export default {
  name: 'LineFile',
  components: {
    ListLink: () => import('@/Subassembly/ZhqcList/ListLink'),
    ListStart: () => import('@/Subassembly/ZhqcList/ListStart')

  },
  mixins: [lineFileMixins],
  data() {
    return {
      store: 'lineFile/',
      modName: 'lineFile',
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      dialogInfo: {
        title: '',
        visible: false,
        type: '',
        // 返回按钮
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', btLoading: false, show: true }]
      },
      nestingDialogInfo: {
        title: '',
        visible: false,
        type: '',
        width: '200mm',
        // 返回按钮
        closeBtn: { label: '', type: '', icon: '', event: 'nestClose', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'nestClose', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'nestSave', btLoading: false, show: true }]
      },
      // 省份
      ProviceUrl: VUE_APP_WMS_MODEL + '/base/address/province/queryProvinceList',
      // 城市
      CityUrl: VUE_APP_WMS_MODEL + '/base/address/city/queryCityList/',
      // 区县
      AreaUrl: VUE_APP_WMS_MODEL + '/base/address/area/queryAreaList/'
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
    }

  },
  mounted() {

  },
  methods: {
    startNameChange() {
      this.diaFormInfo.data.lineRemark = this.getStr()
    },
    lineTypeChange() {
      this.diaFormInfo.data.lineRemark = this.getStr()
    },
    receiveAreaChange() {
      this.diaFormInfo.data.lineRemark = this.getStr()
    },
    receiveCityChange() {
      this.diaFormInfo.data.lineRemark = this.getStr()
    },
    receiveProviceChange() {
      this.diaFormInfo.data.lineRemark = this.getStr()
    },
    getStr() {
      return this.dealStr(this.diaFormInfo.data.startName, '-') + this.dealStr(this.diaFormInfo.data.receiveProviceName, '-') + this.dealStr(this.diaFormInfo.data.receiveCityName, '-') + this.dealStr(this.diaFormInfo.data.receiveAreaName, '-') + this.dealStr(this.diaFormInfo.data.lineTypeName)
    },
    dealStr(value, unit) {
      return value ? value + (unit || '') : ''
    }
  }
}
</script>
<style lang="scss" scoped>

.add_table_box{
 height: 260px;
}

</style>
