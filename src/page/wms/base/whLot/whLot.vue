<!--
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-17 16:34:52
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
        <!--<template v-slot:form-zoneId="scope">-->
        <!--<list-wh-zone @select="selectWhzone" :selectKey="topForm.data.zoneId"></list-wh-zone>-->
        <!--</template>-->
        <!--库区-->
        <template v-slot:form-zoneId="scope">
          <remote-list
            :model="topForm.data"
            select-key="zoneId"
            lable="zoneName"
            parame-code="queryText"
            :list-url="zoneUrl"
          >
            <template v-slot="s">
              <span style="float: left; color: #8492a6; font-size: 13px;">{{ s.item.zoneName }}</span>
            </template>
          </remote-list>
        </template>
        <!--<template v-slot:form-roadwayId="scope">-->
        <!--<list-wh-roadway @select="selectWhRoadway" :selectKey="topForm.data.roadwayId" :zoneId="topZoneId"></list-wh-roadway>-->
        <!--</template>-->
        <!--巷道-->
        <template v-slot:form-roadwayId="scope">
          <remote-list
            :model="topForm.data"
            select-key="roadwayId"
            lable="roadwayName"
            parame-code="zoneId"
            :list-url="zoneUrl"
          >
            <template v-slot="s">
              <span style="float: left; color: #8492a6; font-size: 13px">{{ s.item.roadwayCode }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px;margin-left:30px;">{{ s.item.roadwayName }}</span>
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
    <div slot="left-btn">
      <el-button-group>
        <el-button type="primary" icon="el-icon-folder-add" :disabled="$hasPerm('add')" @click="handleClick('openAddPage')">{{ $t('table.add') }}</el-button>
      </el-button-group>
      <export-vue
        template-name="whLotService"
        :export-url="exportUrl"
        export-name="库位"
        @exportParam="exportData"
      />
    </div>

    <div slot="tab-body" class="tab-body_auto">
      <!--  主页面的table表格  -->
      <zhqc-table
        :data.sync="resp"
        :field-list="tableInfo.fieldList"
        :handle="tableInfo.handle"
        @handleClick="handleClick"
      >

        <template v-slot:col-status="scope">
          <el-button size="mini" type="primary" :disabled="$hasPerm('view')" @click="openViewPage(scope.row)">查看</el-button>
          <el-button size="mini" type="success" :disabled="$hasPerm('edit')" @click="openEditPage(scope.row)">编辑</el-button>
          <el-button
            v-if="scope.row.isEnable === 0"
            size="mini"
            type="success"
            :disabled="$hasPerm('enable')"
            @click="enable(scope.row)"
          >启用
          </el-button>
          <el-button
            v-if="scope.row.isEnable === 1"
            size="mini"
            type="warning"
            :disabled="$hasPerm('deactivate')"
            @click="deactivate(scope.row)"
          >停用
          </el-button>
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
      <zhqc-form
        :ref-obj.sync="diaFormInfo.ref"
        :form-type="formType"
        :class-name="viewFlag"
        :data="diaFormInfo.data"
        :field-list="diaFormInfo.fieldList"
        :rules="diaFormInfo.rules"
        :list-type-info="listTypeInfo"
        :label-width="diaFormInfo.labelWidth"
      >
        <template v-slot:form-areaId="scope">
          <list-wh-area :select-key="diaFormInfo.data.areaId" :disabled="dialogInfo.type=='view' || dialogInfo.type=='edit'" @select="selectWhAreaDia" />
        </template>
        <template v-slot:form-zoneId="scope">
          <list-wh-zone-cascade :select-key="diaFormInfo.data.zoneId" :area-id="areaId" :disabled="dialogInfo.type=='view'" @select="selectWhZoneDia" />
        </template>
        <template v-slot:form-roadwayId="scope">
          <list-wh-roadway :select-key="diaFormInfo.data.roadwayId" :zone-id="zoneId" :disabled="dialogInfo.type=='view'" @select="selectWhRoadwayDia" />
        </template>
      </zhqc-form>
    </full-pop>

  </layout-body>
</template>

<script>
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
import whLotMixins from './mixins'
import listWhArea from '@/Subassembly/ZhqcList/ListWhAreaCascade'
import listWhZoneCascade from '@/Subassembly/ZhqcList/ListWhZoneCascade'
import listWhRoadway from '@/Subassembly/ZhqcList/ListWhRoadway'

export default {
  name: 'WhLot',
  components: {
    listWhArea,
    listWhZoneCascade,
    listWhRoadway
  },
  mixins: [whLotMixins],
  data() {
    return {
      store: 'whLot/',
      modName: 'whLot',
      collapsable: false, // 展开收缩
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      formType: null,
      viewFlag: null,
      zoneUrl: VUE_APP_WMS_MODEL + '/base/wh/whZone/queryWhZoneCbList',
      dialogInfo: {
        width: '1200px',
        title: '',
        visible: false,
        type: '',
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', btLoading: false, show: true }]
      },
      exportUrl: VUE_APP_WMS_MODEL + '/base/wh/whLot/export',
      topZoneId: null,
      areaId: null,
      zoneId: null,
      dicTypeCode: null
    }
  },
  computed: {
    resp() { return this.$store.state[this.modName].pageResp },
    total() { return this.$store.state[this.modName].total }
  },
  watch: {
    // 监听弹窗的状态 清除校验与初始化字段
    'dialogInfo.visible'(val) {
      const diaFormInfo = this.diaFormInfo
      if (!val) {
        if (diaFormInfo.ref) {
          diaFormInfo.ref.resetFields()
        }
        this.areaId = null
        this.zoneId = null
        this.dicTypeCode = null
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
  mounted() {

  },
  methods: {
    // 查询库区
    selectWhzone(data) {
      this.topForm.data.zoneId = data
      this.topForm.data.roadwayId = null
      this.topZoneId = data
    },
    // 查询巷道
    selectWhRoadway(data) {
      this.topForm.data.roadwayId = data
    },

    // 查询区域
    selectWhAreaDia(data) {
      this.diaFormInfo.data.areaId = data
      this.diaFormInfo.data.zoneId = null
      this.diaFormInfo.data.roadwayId = null
      // this.diaFormInfo.data.lotType = null;
      this.areaId = data
      this.zoneId = null
      this.dicTypeCode = null
    },
    // 查询库区
    selectWhZoneDia(data, obj) {
      this.diaFormInfo.data.zoneId = data
      this.diaFormInfo.data.roadwayId = null
      // this.diaFormInfo.data.lotType = null;
      this.zoneId = data
      this.dicTypeCode = obj.zoneType

      this.$set(this.diaFormInfo.data, 'storageType', obj.storageType)
      this.$set(this.diaFormInfo.data, 'abcType', obj.abcType)
      this.$set(this.diaFormInfo.data, 'turnoverLevel', obj.turnoverLevel)
      this.$set(this.diaFormInfo.data, 'quality', obj.quality)
      this.$set(this.diaFormInfo.data, 'packageAttr', obj.packageAttr)
    },
    // 查询巷道
    selectWhRoadwayDia(data) {
      this.diaFormInfo.data.roadwayId = data
    }
    // 库位类型
    /*  selectDictionaryDia(data){
            this.$set(this.diaFormInfo.data, 'lotType', data);
          },*/

  }
}
</script>
