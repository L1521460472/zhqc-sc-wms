<!--
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-02 14:25:48
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
        <template v-slot:form-areaId="scope">
          <list-wh-area-cascade :select-key="topForm.data.areaId" @select="selectWhArea" />
        </template>
        <template v-slot:form-zoneId="scope">
          <list-wh-zone-cascade :select-key="topForm.data.zoneId" :area-id="areaId" @select="selectWhZone" />
        </template>
        <template v-slot:form-lotId="scope">
          <list-wh-lot-cascade :select-key="topForm.data.lotId" :zone-id="zoneId" @select="selectWhLot" />
        </template>
      </zhqc-top-form>
    </div>
    <div slot="left-btn">
      <el-button-group>
        <el-button type="primary" icon="el-icon-folder-add" :disabled="$hasPerm('add')" @click="handleClick('openAddPage')">{{ $t('table.add') }}</el-button>
      </el-button-group>
      <export-vue
        template-name="deviceWorkCfgService"
        :export-url="exportUrl"
        export-name="设备作业区域"
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
        :form-type="dialogInfo.type"
        :data="diaFormInfo.data"
        :field-list="diaFormInfo.fieldList"
        :rules="diaFormInfo.rules"
        :list-type-info="listTypeInfo"
        :label-width="diaFormInfo.labelWidth"
      >

        <template v-slot:form-deviceId="scope">
          <list-device :select-key="diaFormInfo.data.deviceId" :disabled="dialogInfo.type=='view'" @select="selectDevice" />
        </template>
        <template v-slot:form-areaId="scope">
          <list-wh-area-cascade :select-key="diaFormInfo.data.areaId" :disabled="dialogInfo.type=='view'" @select="selectWhAreaDia" />
        </template>
        <template v-slot:form-zoneId="scope">
          <list-wh-zone-cascade :select-key="diaFormInfo.data.zoneId" :area-id="areaId" :disabled="dialogInfo.type=='view'" @select="selectWhZoneDia" />
        </template>
        <template v-slot:form-lotId="scope">
          <list-wh-lot-cascade :select-key="diaFormInfo.data.lotId" :zone-id="zoneId" :disabled="dialogInfo.type=='view'" @select="selectWhLotDia" />
        </template>
      </zhqc-form>
    </zhqc-dialog>
  </layout-body>
</template>

<script>
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
import deviceWorkCfgMixins from './mixins'
import listWhLotCascade from '@/Subassembly/ZhqcList/ListWhLotCascade'
import listWhAreaCascade from '@/Subassembly/ZhqcList/ListWhAreaCascade'
import listWhZoneCascade from '@/Subassembly/ZhqcList/ListWhZoneCascade'
import listDevice from '@/Subassembly/ZhqcList/ListDevice'
export default {
  name: 'DeviceWorkCfg',
  components: { listWhLotCascade, listWhAreaCascade, listWhZoneCascade, listDevice },
  mixins: [deviceWorkCfgMixins],
  data() {
    return {
      store: 'deviceWorkCfg/',
      modName: 'deviceWorkCfg',
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      dialogInfo: {
        title: '',
        visible: false,
        type: '',
        width: '200mm',
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', btLoading: false, show: true }]
      },
      exportUrl: VUE_APP_WMS_MODEL + '/device/deviceWorkCfg/export',
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
    selectWhArea(data) {
      this.topForm.data.areaId = data
      this.topForm.data.zoneId = null
      this.topForm.data.lotId = null
      this.areaId = data
      this.zoneId = null
    },
    // 查询库区
    selectWhZone(data) {
      this.topForm.data.zoneId = data
      this.topForm.data.lotId = null
      this.zoneId = data
    },
    // 查询库位
    selectWhLot(data) {
      this.topForm.data.lotId = data
    },

    // 查询区域
    selectWhAreaDia(data) {
      this.diaFormInfo.data.areaId = data
      this.diaFormInfo.data.zoneId = null
      this.diaFormInfo.data.lotId = null
      this.areaId = data
      this.zoneId = null
    },
    // 查询库区
    selectWhZoneDia(data) {
      this.diaFormInfo.data.zoneId = data
      this.diaFormInfo.data.lotId = null
      this.zoneId = data
    },
    // 查询库位
    selectWhLotDia(data) {
      this.diaFormInfo.data.lotId = data
    },

    // 查询设备
    selectDevice(data, obj) {
      this.diaFormInfo.data.deviceId = data

      this.$set(this.diaFormInfo.data, 'deviceName', obj.deviceName)
      this.$set(this.diaFormInfo.data, 'deviceTypeName', obj.deviceTypeName)
    }

  }
}
</script>
