<template>
  <vxe-table
    ref="xTable"
    border
    size="small"
    align="center"
    keep-source
    show-overflow-tooltip
    show-overflow
    :edit-rules="rules"
    :data="tableData"
    :edit-config="{trigger: 'click', mode: 'cell'}"
  >
    <vxe-table-column type="index" width="80" title="序号" />
    <vxe-table-column field="zoneName" :title="$t('recheckInfo.dt.zoneId')" min-width="130" />
    <vxe-table-column field="lotCode" :title="$t('recheckInfo.dt.lotCode')" min-width="100" />
    <vxe-table-column field="baseSku.skuCode" :title="$t('recheckInfo.dt.skuCode')" min-width="130" />
    <vxe-table-column field="baseSku.barcode" :title="$t('recheckInfo.dt.barcode')" min-width="100" />
    <vxe-table-column field="baseSku.skuName" :title="$t('recheckInfo.dt.skuName')" min-width="100" />
    <vxe-table-column field="baseSku.tradeName" :title="$t('recheckInfo.dt.tradeName')" min-width="100" />
    <vxe-table-column field="baseSku.spec" :title="$t('recheckInfo.dt.spec')" min-width="100" />
    <vxe-table-column field="baseSku.mainUnit" :title="$t('recheckInfo.dt.mainUnit')" min-width="100" />
    <vxe-table-column field="baseSku.perQty" :title="$t('recheckInfo.dt.perQty')" min-width="100" />
    <vxe-table-column field="baseSku.drugForm" :title="$t('recheckInfo.dt.drugForm')" min-width="100" />
    <vxe-table-column field="baseSku.mfgName" :title="$t('recheckInfo.dt.mfgName')" min-width="100" />
    <vxe-table-column field="baseSku.originCountry" :title="$t('recheckInfo.dt.originCountry')" min-width="100" />
    <vxe-table-column field="baseSku.approvalNumber" :title="$t('recheckInfo.dt.approvalNumber')" min-width="100" />
    <vxe-table-column field="baseSku.brandName" :title="$t('recheckInfo.dt.brandName')" min-width="100" />
    <vxe-table-column field="baseSku.tempControlName" :title="$t('recheckInfo.dt.tempControlName')" min-width="100" />
    <vxe-table-column field="baseSku.validityDay" :title="$t('recheckInfo.dt.validityDay')" min-width="100" />
    <vxe-table-column field="baseInvBatch.batchNo" :title="$t('recheckInfo.dt.batchNo')" min-width="100" />
    <vxe-table-column field="baseInvBatch.productionBatch" :title="$t('recheckInfo.dt.productionBatch')" min-width="100" />
    <vxe-table-column field="baseInvBatch.productionDate" :title="$t('recheckInfo.dt.productionDate')" min-width="100" />
    <vxe-table-column field="baseInvBatch.instoreDate" :title="$t('recheckInfo.dt.instoreDate')" min-width="100" />
    <vxe-table-column field="baseInvBatch.invalidDate" :title="$t('recheckInfo.dt.invalidDate')" min-width="100" />
    <vxe-table-column field="baseInvBatch.sterileNo" :title="$t('recheckInfo.dt.sterileNo')" min-width="100" />
    <vxe-table-column field="baseInvBatch.sterileInvaliDate" :title="$t('recheckInfo.dt.sterileInvaliDate')" min-width="100" />
    <vxe-table-column field="recheckQty" :title="$t('recheckInfo.dt.recheckQty')" min-width="100" />
    <vxe-table-column field="recheckMode" :title="$t('recheckInfo.dt.recheckMode')" min-width="100" :edit-render="{}">

      <template v-slot:edit="scope">
        <el-select v-model="scope.row.recheckMode" @change="test(scope)">
          <el-option v-for="item in recheckInfoModeEnumList" :key="item.value" :label="item.key" :value="item.value" />
        </el-select>
      </template>
      <template v-slot="{ row }">{{ getSelectLabel(row.recheckMode, recheckInfoModeEnumList) }}</template>
    </vxe-table-column>
    <vxe-table-column field="actualRecheckQty" :title="$t('recheckInfo.dt.actualRecheckQty')" min-width="100" :edit-render="{}">
      <template v-slot:edit="scope">
        <el-input
          v-model="scope.row.actualRecheckQty"
          type="number"
          min="1"
          precision="0"
          :readonly="isValidity"
          @input="$refs.xTable.updateStatus(scope)"
        />
      </template>
      <!--      <template v-slot="{ row }">{{ row.actualRecheckQty }}</template>-->
    </vxe-table-column>
    <vxe-table-column field="goodQty" :title="$t('recheckInfo.dt.goodQty')" min-width="100">
      <template v-slot:edit="scope">
        <el-input
          v-model="scope.row.goodQty"
          @input="$refs.xTable.updateStatus(scope)"
        />
      </template>
    </vxe-table-column>
    <vxe-table-column field="badQty" :title="$t('recheckInfo.dt.badQty')" min-width="120" :edit-render="{}">
      <template v-slot:edit="scope">
        <el-input
          v-model="scope.row.badQty"
          type="number"
          min="1"
          precision="0"
          @input="$refs.xTable.updateStatus(scope)"
          @change="badQtyChangeEvent(scope)"
        />
      </template>
    </vxe-table-column>
    <vxe-table-column field="checkResult" :title="$t('recheckInfo.dt.checkResult')" min-width="100" :edit-render="{}">
      <template v-slot:edit="scope">
        <el-select v-model="scope.row.checkResult" @change="checkResultChange(scope)">
          <el-option v-for="item in recheckInfoCheckResultEnumList" :key="item.value" :label="item.key" :value="item.value" />
        </el-select>
      </template>
      <template v-slot="{ row }">{{ getSelectLabel(row.checkResult, recheckInfoCheckResultEnumList) }}</template>
    </vxe-table-column>
    <!--    <vxe-table-column field="badReason" title="不合格原因" min-width="100"></vxe-table-column>-->
    <vxe-table-column field="dealMsg" :title="$t('recheckInfo.dt.dealMsg')" min-width="100" :edit-render="{}">
      <template v-slot:edit="scope">
        <el-input
          v-model="scope.row.dealMsg"
          @input="$refs.xTable.updateStatus(scope)"
        />
      </template>
    </vxe-table-column>
    <vxe-table-column field="badReason" :title="$t('recheckInfo.dt.badReason')" min-width="110" :edit-render="{}">
      <template v-slot:edit="scope">
        <el-input
          v-model="scope.row.badReason"
          @input="$refs.xTable.updateStatus(scope)"
        />
      </template>
    </vxe-table-column>
    <vxe-table-column field="remark" :title="$t('recheckInfo.dt.remark')" min-width="100" :edit-render="{}">
      <template v-slot:edit="scope">
        <el-input
          v-model="scope.row.remark"
          @input="$refs.xTable.updateStatus(scope)"
        />
      </template>
    </vxe-table-column>
  </vxe-table>
</template>

<script>
import XEUtils from 'xe-utils'
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    tableData: {
      type: Array
    },
    // eslint-disable-next-line vue/require-default-prop
    listTypeInfo: {
      type: Object
    }
  },
  data() {
    return {
      store: 'recheckInfo/',
      modName: 'recheckInfo',
      rules: {},
      tableDataTest: [
        {
          id: 100,
          name: 'test',
          age: 26,
          sex: '1',
          region: ['shenzhen'],
          date: null,
          date1: null,
          date2: null,
          rate: 2,
          flag: true
        },
        {
          id: 200,
          name: 'test1',
          age: 26,
          sex: '1',
          region: ['shenzhen'],
          date: null,
          date1: null,
          date2: null,
          rate: 2,
          flag: true
        }
      ],

      val: 0,
      recheckInfoCheckResultEnumList: [],
      recheckInfoModeEnumList: [],
      isValidity: false
    }
  },
  mounted() {
    this.recheckInfoCheckResultEnumList = this.listTypeInfo.recheckInfoCheckResultEnumList
    this.recheckInfoModeEnumList = this.listTypeInfo.recheckInfoModeEnumList

    this.recheckInfoModeEnumList.forEach(item => {
      if (item.value === 'QJ') {
        this.isValidity = true
      }
    })
    //
    this.tableData.forEach(item => {
      item.goodQty = item.actualRecheckQty - item.badQty
    })
    this.rulesInit()
  },
  methods: {
    rulesInit() {
      this.rules = {
        actualRecheckQty: [{
          required: true,
          message: this.$t('inventoryAdj.msg.dt.adjQty'),
          trigger: 'blur' }],

        checkResult: [{
          required: true,
          message: this.$t('recheckInfo.msg.dt.checkResult'),
          trigger: 'blur' }]
      }
    },

    async save(data) {
      const errMap = await this.$refs.xTable.validate(this.foreignCurrency).catch(errMap => errMap)
      if (errMap) {
        this.$message.error('校验不通过！')
      }

      data.dtList = this.tableData

      this.$store.dispatch(this.store + 'editData', data).then(() => {
        const resp = this.$store.state[this.modName].editResp
        if (resp.code === this.$successCode) {
          // // this.$parent.close();
          // this.$parent.initData();
          this.$emit('callBackSuccess')
          this.$message.success(resp.msg)
        }
      })
    },

    add(e) {
      this.val = e
    },
    test(e) {
      // e.data[e.$rowIndex].age = 35;        validityDay  badQty
      if (e.data[e.$rowIndex].recheckMode === 'QJ') {
        // e.data[e.$rowIndex].goodQty = 35;
        // e.data[e.$rowIndex].goodQty = e.data[e.$rowIndex].validityDay - e.data[e.$rowIndex].badQty ;
        e.data[e.$rowIndex].recheckQty = e.data[e.$rowIndex].actualRecheckQty
        this.isValidity = true
      } else {
        this.isValidity = false
      }
    },
    getSelectLabel(value, list, valueProp = 'value', labelField = 'key') {
      const item = XEUtils.find(list, item => item[valueProp] === value)
      // return item ? item[labelField] : list[0].label
      return item ? item[labelField] : null
    },
    getSelectMultipleLabel(value, list, valueProp = 'value', labelField = 'label') {
      return value.map(val => {
        const item = XEUtils.find(list, item => item[valueProp] === val)
        return item ? item[labelField] : null
      }).join(', ')
    },

    /**
       * 不合格数量改变事件
       * @param data
       */
    badQtyChangeEvent(data) {
      if (data.row.badQty > data.row.actualRecheckQty) {
        this.$message.error('不合格数量不能大于实检数量')
        data.row.badQty = 0
        return
      }
      // 合格数量=实检数量-不合格数量
      data.row.goodQty = data.row.actualRecheckQty - data.row.badQty
    },

    /**
       * 检验结果改变事件
       * @param data
       */
    checkResultChange(data) {
      const temp = data.row
      // 如果验收结果选择不合格,不合格数量必须大于0
      if (temp.checkResult == 'NG' && (this.$isEmpty(temp.badQty) || temp.badQty <= 0)) {
        this.$message.error('验收结果为不合格,不合格数量必须大于0')
      }
    }
  }
}
</script>

<style scoped>

</style>
