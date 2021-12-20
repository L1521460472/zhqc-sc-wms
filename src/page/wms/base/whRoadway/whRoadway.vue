<!--
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-02 14:51:43
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
        <!--<list-wh-zone @select="selectWhZone" :selectKey="topForm.data.zoneId"></list-wh-zone>-->
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
            <template v-slot="scop">
              <span style="float: left; color: #8492a6; font-size: 13px;">{{ scop.item.zoneName }}</span>
            </template>
          </remote-list>
        </template>
        <template v-slot:form-sys="" class="el-icon-test">
          <el-button type="primary" icon="el-icon-search" :disabled="$hasPerm('search')" @click="handleClick('search')">{{ $t("table.search") }}</el-button>
          <el-button type="warning" icon="el-icon-refresh-left" :disabled="$hasPerm('search')" @click="handleClick('reboot')">{{ $t("table.reboot") }}</el-button>
        </template>
      </zhqc-top-form>
    </div>
    <div slot="left-btn">
      <el-button-group>
        <el-button type="primary" icon="el-icon-folder-add" :disabled="$hasPerm('add')" @click="handleClick('openAddPage')">{{ $t('table.add') }}</el-button>
      </el-button-group>
      <export-vue
        template-name="whRoadwayService"
        export-url="wms/base/wh/whRoadway/export"
        export-name="巷道"
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
          <el-button size="mini" type="danger" :disabled="$hasPerm('delete')" @click="deleteData(scope.row)">删除</el-button>
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
    <zhqc-dialog
      :title="dialogInfo.title"
      :visible.sync="dialogInfo.visible"
      :width="dialogInfo.width"
      :bt-list="dialogInfo.btList"
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
          <list-wh-area-cascade :select-key="diaFormInfo.data.areaId" :disabled="dialogInfo.type=='view'" @select="selectWhAreaDia" />
        </template>
        <template v-slot:form-zoneId="scope">
          <list-wh-zone-cascade :select-key="diaFormInfo.data.zoneId" :area-id="areaId" :disabled="dialogInfo.type=='view'" @select="selectWhZoneDia" />
        </template>
      </zhqc-form>
    </zhqc-dialog>
  </layout-body>
</template>

<script>
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
import whRoadwayMixins from './mixins'
import listWhAreaCascade from '@/Subassembly/ZhqcList/ListWhAreaCascade'
import listWhZoneCascade from '@/Subassembly/ZhqcList/ListWhZoneCascade'

export default {
  name: 'WhRoadway',
  components: { listWhAreaCascade, listWhZoneCascade },
  mixins: [whRoadwayMixins],
  data() {
    return {
      store: 'whRoadway/',
      modName: 'whRoadway',
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      formType: null,
      viewFlag: null,
      zoneUrl: VUE_APP_WMS_MODEL + '/base/wh/whZone/queryWhZoneCbList',
      dialogInfo: {
        title: '',
        visible: false,
        width: '200mm',
        type: '',
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', btLoading: false, show: true }]
      },
      areaId: null,
      zoneId: null
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
        this.resetFormData()
      }
    }

  },

  mounted() {

  },
  methods: {
    // 查询区域
    selectWhAreaDia(data) {
      this.diaFormInfo.data.areaId = data
      this.diaFormInfo.data.zoneId = null
      this.diaFormInfo.data.roadwayId = null
      this.areaId = data
      this.zoneId = null
    },
    // 查询库区
    selectWhZoneDia(data) {
      this.diaFormInfo.data.zoneId = data
      this.diaFormInfo.data.roadwayId = null
      this.zoneId = data
    },

    selectWhZone(data) {
      this.$set(this.topForm.data, 'zoneId', data)
    }

  }
}
</script>
