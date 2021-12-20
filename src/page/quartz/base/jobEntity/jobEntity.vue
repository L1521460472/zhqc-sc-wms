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
          <el-button v-if="scope.data.row.isEnable === 0" size="mini" type="success" :disabled="$hasPerm('enable')" @click="enableEvent(scope.data.row)">启用</el-button>
          <el-button v-if=" scope.data.row.isEnable==1" size="mini" type="warning" :disabled="$hasPerm('deactivate')" @click="deactivateEvent(scope.data.row)">停用</el-button>
        </template>
      </zhqc-table>
    </div>

    <div slot="bottom-page">
      <!--  分页组件   -->
      <zhqc-page
        :total="total"
        :page-request="pageRequest"
        :bt-list="batchBtnArray"
        @pageChange="pageChange"
        @handleClick="handleClick"
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
      <full-pop-item full-pop-item-title="任务信息">
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
          <template v-slot:form-onceTime="scope">
            <el-time-picker v-model="diaFormInfo.data.onceTime" format="HH:mm" value-format="HH:mm" placeholder="选择时间" :disabled="diaFormInfo.onceDisabled" />
          </template>
          <template v-slot:form-cycleStartTime="scope">
            <el-time-picker v-model="diaFormInfo.data.cycleStartTime" format="HH:mm" value-format="HH:mm" placeholder="选择时间" :disabled="diaFormInfo.cycleDisabled" />
          </template>
          <template v-slot:form-cycleEndTime="scope">
            <el-time-picker v-model="diaFormInfo.data.cycleEndTime" format="HH:mm" value-format="HH:mm" placeholder="选择时间" :disabled="diaFormInfo.cycleDisabled" />
          </template>
        </zhqc-form>
      </full-pop-item>
      <full-pop-item full-pop-item-title="任务参数">
        <zhqc-form
          :ref-obj.sync="diaFormInfo.diaParamFormInfo.ref"
          :form-type="formType"
          :class-name="viewFlag"
          :data="diaFormInfo.diaParamFormInfo.data"
          :field-list="diaFormInfo.diaParamFormInfo.fieldList"
          :rules="diaFormInfo.diaParamFormInfo.rules"
          :list-type-info="listTypeInfo"
          :label-width="diaFormInfo.labelWidth"
          style="padding: 1% 5%"
          @handleEvent="handleEvent"
        >
          <template v-slot:form-waveModelId="scope">
            <zhqc-list-wave-model :select-key="waveModelId" :disabled="dialogInfo.type=='view'" @select="selectWaveModelDia" />
          </template>
        </zhqc-form>
      </full-pop-item>
    </full-pop>
    <zhqc-job-exec-log />
  </layout-body>
</template>

<script>
import jobEntityMixins from './mixins'
import zhqcListWaveModel from '@/Subassembly/ZhqcList/ListWaveModel'
import zhqcJobExecLog from './jobExecLog'
export default {
  name: 'JobEntity',
  components: {
    zhqcListWaveModel, zhqcJobExecLog
  },
  mixins: [jobEntityMixins],
  data() {
    return {
      store: 'jobEntity/',
      modName: 'jobEntity',
      formType: null,
      viewFlag: null,
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },

      checkedIds: [],
      batchBtnArray: [
        { label: this.$t('so.batchEnable'), type: 'primary', icon: '', event: 'handleBatchEnable', btLoading: false, show: !this.$hasPerm('batchEnable'), disabled: true },
        { label: this.$t('so.batchDeactivate'), type: 'primary', icon: '', event: 'handleBatchDeactivate', btLoading: false, show: !this.$hasPerm('batchDeactivate'), disabled: true }
      ],
      dialogInfo: {
        title: '',
        visible: false,
        type: '',
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', btLoading: false, show: true }]
      },
      waveModelId: null
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
        this.resetParamFormData()
        this.clearParamForm()
      }
    }
  },
  mounted() {

  },
  methods: {
    selectWaveModelDia(data) {
      this.waveModelId = data
      this.diaFormInfo.diaParamFormInfo.data.waveModelId = data
    }
  }
}
</script>
