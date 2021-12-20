<!--
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-02 16:14:44
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
          <zhqc-list-owner :select-key="topForm.data.ownerId" @select="selectOwnerDia" />
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
        <el-button icon="el-icon-folder-add" :disabled="$hasPerm('add')" type="primary" @click="handleClick('openAddPage')">
          {{ $t('table.add') }}
        </el-button>
      </el-button-group>
      <export-vue
        template-name="inventoryTaskService"
        export-url="pd/inventoryTask/export"
        export-name="库内管理-盘点任务单"
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
        :ref-obj.sync="diaFormInfo.ref"
        :form-type="dialogInfo.type"
        :data="diaFormInfo.data"
        :field-list="diaFormInfo.fieldList"
        :rules="diaFormInfo.rules"
        :list-type-info="listTypeInfo"
        :label-width="diaFormInfo.labelWidth"
      >
        <template v-slot:form-ownerId="scope">
          <zhqc-list-owner :select-key="topForm.data.ownerId" @select="selectOwnerDiaAdd" />
        </template>
        <template v-slot:form-skuIdStart="scope">
          <list-sku
            :select-key="diaFormInfo.data.skuIdStart"
            @select="selectSkuIdStartDiaAdd"
          />
        </template>
        <template v-slot:form-skuIdEnd="scope">
          <list-sku :select-key="diaFormInfo.data.skuIdEnd" @select="selectSkuIdEndDiaAdd" />
        </template>
        <template v-slot:form-zoneIdStart="scope">
          <list-wh-zone
            :select-key="diaFormInfo.data.zoneIdStart"
            @select="selectZoneIdStartDiaAdd"
          />
        </template>
        <template v-slot:form-zoneIdEnd="scope">
          <list-wh-zone
            :select-key="diaFormInfo.data.zoneIdEnd"
            @select="selectZoneIdEndDiaAdd"
          />
        </template>
        <template v-slot:form-lotIdStart="scope">
          <list-wh-lot
            :select-key="diaFormInfo.data.lotIdStart"
            @select="selectLotIdStartDiaAdd"
          />
        </template>
        <template v-slot:form-lotIdEnd="scope">
          <list-wh-lot :select-key="diaFormInfo.data.lotIdEnd" @select="selectLotIdEndDiaAdd" />
        </template>
      </zhqc-form>
    </zhqc-dialog>
  </layout-body>
</template>

<script>
import inventoryTaskMixins from './mixins'
import zhqcListOwner from '@/Subassembly/ZhqcList/ListOwner'
import listSku from '@/Subassembly/ZhqcList/ListSku'
import listWhLot from '@/Subassembly/ZhqcList/ListWhLot'
import listWhZone from '@/Subassembly/ZhqcList/ListWhZone'

export default {
  name: 'InventoryTask',
  components: {
    zhqcListOwner, listSku, listWhZone, listWhLot
  },
  mixins: [inventoryTaskMixins],
  data() {
    return {
      store: 'inventoryTask/',
      modName: 'inventoryTask',
      collapsable: false, // 展开收缩
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      dialogInfo: {
        title: '',
        visible: false,
        type: '',
        width: '230mm',
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          {
            label: this.$t('table.save'),
            type: 'primary',
            icon: '',
            event: 'save',
            btLoading: false,
            show: true
          }]
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
    },
    'diaFormInfo.data.inventoryMethod'(val) {
      if (val === 'RF') {
        this.diaFormInfo.fieldList[7].disabled = false
      } else {
        this.diaFormInfo.fieldList[7].disabled = true
        this.$set(this.diaFormInfo.data, 'priority', null)
      }
    },
    'diaFormInfo.data.inventoryType'(val) {
      if (val === 'NORMAL') { // 标准盘点
        this.diaFormInfo.fieldList[4].disabled = true
        this.diaFormInfo.fieldList[5].disabled = true
        this.diaFormInfo.fieldList[6].disabled = true
        this.$set(this.diaFormInfo.data, 'dynamicInventoryStartTime', null)
        this.$set(this.diaFormInfo.data, 'dynamicInventoryEndTime', null)
        this.$set(this.diaFormInfo.data, 'randomInventoryDtQty', null)
      } else if (val === 'DYNAMIC') { // 动态盘点
        this.diaFormInfo.fieldList[4].disabled = false
        this.diaFormInfo.fieldList[5].disabled = false
        this.diaFormInfo.fieldList[6].disabled = true
        this.$set(this.diaFormInfo.data, 'randomInventoryDtQty', null)
      } else if (val === 'RANDOM') { // 随机盘点
        this.diaFormInfo.fieldList[4].disabled = true
        this.diaFormInfo.fieldList[5].disabled = true
        this.diaFormInfo.fieldList[6].disabled = false
        this.$set(this.diaFormInfo.data, 'dynamicInventoryStartTime', null)
        this.$set(this.diaFormInfo.data, 'dynamicInventoryEndTime', null)
      } else {
        this.diaFormInfo.fieldList[4].disabled = true
        this.diaFormInfo.fieldList[5].disabled = true
        this.diaFormInfo.fieldList[6].disabled = true
        this.$set(this.diaFormInfo.data, 'dynamicInventoryStartTime', null)
        this.$set(this.diaFormInfo.data, 'dynamicInventoryEndTime', null)
        this.$set(this.diaFormInfo.data, 'randomInventoryDtQty', null)
      }
    }
  },
  mounted() {

  },
  methods: {
    selectOwnerDia(data) {
      this.topForm.data.ownerId = data
    },
    selectOwnerDiaAdd(data) {
      this.diaFormInfo.data.ownerId = data
    },
    selectSkuIdStartDiaAdd(data, obj) {
      this.diaFormInfo.data.skuIdStart = obj.id
    },
    selectSkuIdEndDiaAdd(data, obj) {
      this.diaFormInfo.data.skuIdEnd = obj.id
    },
    selectZoneIdStartDiaAdd(data, obj) {
      this.diaFormInfo.data.zoneIdStart = obj.id
    },
    selectZoneIdEndDiaAdd(data, obj) {
      this.diaFormInfo.data.zoneIdEnd = obj.id
    },
    selectLotIdStartDiaAdd(data, obj) {
      this.diaFormInfo.data.lotIdStart = obj.id
    },
    selectLotIdEndDiaAdd(data, obj) {
      this.diaFormInfo.data.lotIdEnd = obj.id
    }
  }
}
</script>
