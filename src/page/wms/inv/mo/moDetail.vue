<template>
  <div>
    <!--増、查、改的表单-->
    <full-pop
      :visible.sync="visible"
      :top-title="dialogInfo.title"
      :close-btn="dialogInfo.closeBtn"
      :save-list="dialogInfo.btList"
      @handleClick="handleClick"
    >
      <full-pop-item full-pop-item-title="加工单详情">
        <zhqc-form
          :ref-obj.sync="diaFormInfo.ref"
          :form-type="dialogInfo.type"
          :data="diaFormInfo.data"
          :field-list="diaFormInfo.fieldList"
          :rules="diaFormInfo.rules"
          :label-width="diaFormInfo.labelWidth"
          @handleEvent="handleEvent"
        />
      </full-pop-item>
      <full-pop-item full-pop-item-title="明细">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="加工单明细" name="first">
            <zhqc-summary-table
              :ref-obj.sync="diaFormInfo.dtTableInfo.ref"
              :data="diaFormInfo.dtTableInfo.data"
              :field-list="diaFormInfo.dtTableInfo.fieldList"
              :handle="diaFormInfo.dtTableInfo.handle"
              @handleGetSummaries="handleDtSummaries"
              @handleClick="handleClick"
            />
          </el-tab-pane>
          <el-tab-pane label="分配记录" name="second">
            <zhqc-summary-table
              :ref-obj.sync="diaFormInfo.dtAssignTableInfo.ref"
              :data="diaFormInfo.dtAssignTableInfo.data"
              :field-list="diaFormInfo.dtAssignTableInfo.fieldList"
              :handle="diaFormInfo.dtAssignTableInfo.handle"
              @handleGetSummaries="handleDtAssignSummaries"
              @handleClick="handleClick"
            />
          </el-tab-pane>
          <el-tab-pane label="领料记录" name="third">
            <zhqc-summary-table
              :ref-obj.sync="diaFormInfo.downShelfTableInfo.ref"
              :data="diaFormInfo.downShelfTableInfo.data"
              :field-list="diaFormInfo.downShelfTableInfo.fieldList"
              :handle="diaFormInfo.downShelfTableInfo.handle"
              @handleGetSummaries="handleDownShelfSummaries"
              @handleClick="handleClick"
            />
          </el-tab-pane>
          <el-tab-pane label="完工记录" name="fourth">
            <zhqc-table
              :ref-obj.sync="diaFormInfo.finishTableInfo.ref"
              :data="diaFormInfo.finishTableInfo.data"
              :field-list="diaFormInfo.finishTableInfo.fieldList"
              :handle="diaFormInfo.finishTableInfo.handle"
              @handleClick="handleClick"
            />
          </el-tab-pane>
        </el-tabs>
      </full-pop-item>
    </full-pop>
  </div>
</template>

<script>
import zhqcSummaryTable from '@/Subassembly/ZhqcSummaryTable'
export default {
  name: 'MoFinishComb',
  components: {
    zhqcSummaryTable
  },
  data() {
    return {
      store: 'mo/',
      modName: 'mo',
      dialogInfo: {
        title: '加工单详情',
        type: '',
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true }
        ]
      },
      diaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        addDtBtnShow: false,
        labelWidth: '150px',
        dtTableInfo: {
          ref: null, // 对外提供的可操作配置表单的持有对象
          data: [],
          fieldList: [],
          rules: {},
          topBtn: { show: false },
          handle: null
        },
        dtAssignTableInfo: {
          ref: null, // 对外提供的可操作配置表单的持有对象
          data: [],
          fieldList: [],
          rules: {},
          topBtn: { show: false },
          handle: null
        },
        downShelfTableInfo: {
          ref: null, // 对外提供的可操作配置表单的持有对象
          data: [],
          fieldList: [],
          handle: null,
          rules: {},
          topBtn: { show: false }
        },
        finishTableInfo: {
          ref: null, // 对外提供的可操作配置表单的持有对象
          data: [],
          fieldList: [],
          rules: {},
          topBtn: { show: false },
          handle: null
        }
      },
      activeName: 'first'
    }
  },
  computed: {
    visible() {
      if (this.$store.state[this.modName].moDetailPage.visible) {
        this.openPage()
      }
      return this.$store.state[this.modName].moDetailPage.visible
    }
  },
  watch: {

  },
  mounted() {
    this.initPage()
  },
  methods: {
    openPage() {
      const id = this.$store.state[this.modName].moDetailPage.id
      this.$store.dispatch(this.store + 'initUpdate', id).then(() => {
        const obj = this.$store.state[this.modName].initUpdateObj
        this.diaFormInfo.data = obj.entity
        this.diaFormInfo.dtTableInfo.data = obj.dtList
        this.diaFormInfo.dtAssignTableInfo.data = obj.dtAssignList
        this.diaFormInfo.finishTableInfo.data = obj.finishRegisterList
        const downShelfArray = []
        if (obj.dtAssignList) {
          obj.dtAssignList.forEach(item => {
            if (item.waitMoveQty > 0) {
              downShelfArray.push(item)
            }
          })
        }
        this.diaFormInfo.downShelfTableInfo.data = downShelfArray
      })
      this.activeName = 'first'
    },
    close() {
      this.$store.dispatch(this.store + 'setData', { visible: false, page: 'moDetailPage' })
    },
    initPage() {
      this.diaFormInfo.fieldList = [
        { label: this.$t('mo.moNo'), value: 'moNo', type: 'input', disabled: true },
        { label: this.$t('mo.ownerName'), value: 'ownerName', type: 'input', disabled: true },
        { label: this.$t('mo.fpSkuCode'), value: 'fpSkuCode', type: 'input', disabled: true },
        { label: this.$t('mo.fpSkuName'), value: 'fpSkuName', type: 'input', disabled: true },
        { label: this.$t('mo.fpSpec'), value: 'fpSpec', type: 'input', disabled: true },
        { label: this.$t('mo.fpMainUnit'), value: 'fpMainUnit', type: 'input', disabled: true },
        { label: this.$t('mo.moQty'), value: 'moQty', type: 'number', min: 1, disabled: true },
        { label: this.$t('mo.totalFinishQty'), value: 'totalFinishQty', type: 'number', disabled: true },
        { label: this.$t('mo.moTypeName'), value: 'moTypeName', type: 'input', disabled: true },
        { label: this.$t('mo.moLotCode'), value: 'moLotCode', type: 'input', disabled: true },
        { label: this.$t('mo.planStartTime'), value: 'planStartTime', type: 'date', disabled: true },
        { label: this.$t('mo.planFinishTime'), value: 'planFinishTime', type: 'date', disabled: true },
        { label: this.$t('mo.remark'), value: 'remark', type: 'input', disabled: true },
        { label: this.$t('mo.sourceTypeName'), value: 'sourceTypeName', type: 'input', disabled: true },
        { label: this.$t('mo.origNo'), value: 'origNo', type: 'input', disabled: true },
        { label: this.$t('mo.actualStartTime'), value: 'actualStartTime', type: 'input', disabled: true },
        { label: this.$t('mo.actualFinishTime'), value: 'actualFinishTime', type: 'input', disabled: true },
        { label: this.$t('mo.creatorName'), value: 'creatorName', type: 'input', disabled: true },
        { label: this.$t('mo.createTime'), value: 'createTime', type: 'input', disabled: true }
      ]
      this.diaFormInfo.dtTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'bomSkuCode', label: this.$t('mo.dt.bomSkuCode'), minWidth: 100 },
        { prop: 'bomSkuName', label: this.$t('mo.dt.bomSkuName'), minWidth: 100 },
        { prop: 'bomSpec', label: this.$t('mo.dt.bomSpec'), minWidth: 100 },
        { prop: 'bomMainUnit', label: this.$t('mo.dt.bomMainUnit'), minWidth: 100 },
        { prop: 'bomQty', label: this.$t('mo.dt.bomQty'), minWidth: 100 },
        { prop: 'normQty', label: this.$t('mo.dt.normQty'), minWidth: 100 },
        { prop: 'planPickQty', label: this.$t('mo.dt.planPickQty'), minWidth: 100 },
        { prop: 'planFinishQty', label: this.$t('mo.dt.planFinishQty'), minWidth: 100 },
        { prop: 'sourceTypeName', label: this.$t('mo.dt.sourceTypeName'), minWidth: 100 }
      ]
      this.diaFormInfo.dtAssignTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'skuCode', label: this.$t('mo.dtAssign.skuCode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('mo.dtAssign.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('mo.dtAssign.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('mo.dtAssign.mainUnit'), minWidth: 100 },
        { prop: 'bomQty', label: this.$t('mo.dtAssign.bomQty'), minWidth: 100 },
        { prop: 'normQty', label: this.$t('mo.dtAssign.normQty'), minWidth: 100 },
        { prop: 'allotQty', label: this.$t('mo.dtAssign.allotQty'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('mo.dtAssign.lotCode'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('mo.dtAssign.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('mo.dtAssign.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('mo.dtAssign.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('mo.dtAssign.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('mo.dtAssign.invalidDate'), minWidth: 100 }
      ]
      this.diaFormInfo.downShelfTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'skuCode', label: this.$t('mo.dtAssign.skuCode'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('mo.dtAssign.barcode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('mo.dtAssign.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('mo.dtAssign.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('mo.dtAssign.mainUnit'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('mo.dtAssign.lotCode'), minWidth: 100 },
        { prop: 'waitMoveQty', label: this.$t('mo.dtAssign.waitMoveQty'), minWidth: 100 },
        { prop: 'movedQty', label: this.$t('mo.dtAssign.movedQty'), minWidth: 100 },
        { prop: 'moUsedQty', label: this.$t('mo.dtAssign.moUsedQty'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('mo.dtAssign.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('mo.dtAssign.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('mo.dtAssign.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('mo.dtAssign.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('mo.dtAssign.invalidDate'), minWidth: 100 }
      ]
      this.diaFormInfo.finishTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'pageTypeName', label: this.$t('mo.fr.pageTypeName'), minWidth: 100 },
        { prop: 'skuCode', label: this.$t('mo.fr.skuCode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('mo.fr.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('mo.fr.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('mo.fr.mainUnit'), minWidth: 100 },
        { prop: 'lotCode', label: this.$t('mo.fr.lotCode'), minWidth: 100 },
        { prop: 'containerNo', label: this.$t('mo.fr.containerNo'), minWidth: 100 },
        { prop: 'finishQty', label: this.$t('mo.fr.finishQty'), minWidth: 100 },
        { prop: 'useQty', label: this.$t('mo.fr.useQty'), minWidth: 100 },
        { prop: 'batchNo', label: this.$t('mo.fr.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('mo.fr.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('mo.fr.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('mo.fr.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('mo.fr.invalidDate'), minWidth: 100 }
      ]
    },
    handleDtSummaries(param, callback) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
        } else if (index == 6 || index == 7 || index == 8) {
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
          } else {
            sums[index] = ''
          }
        } else {
          sums[index] = ''
        }
      })
      callback(sums) // 执行作为参数的函数
    },
    handleDtAssignSummaries(param, callback) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
        } else if (index == 6 || index == 7) {
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
          } else {
            sums[index] = ''
          }
        } else {
          sums[index] = ''
        }
      })
      callback(sums) // 执行作为参数的函数
    },
    handleDownShelfSummaries(param, callback) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
        } else if (index == 7 || index == 8 || index == 9) {
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
          } else {
            sums[index] = ''
          }
        } else {
          sums[index] = ''
        }
      })
      callback(sums) // 执行作为参数的函数
    },

    // 统一按钮点击事件方法入口，event:自定义方法名称（notification.js中定义的方法名），data:方法参数
    handleClick(event, data) {
      if (event) {
        this[event](data)
      }
    },
    // 统一处理下拉列表change事件入口，event:自定义方法名称（notification.js中定义的方法名）
    handleEvent(event, data) {
      if (event) {
        this[event](data)
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
  /*编辑表格-验证提示*/
  .vxe-table--valid-error{
    z-index: 1200 !important;
  }
</style>
