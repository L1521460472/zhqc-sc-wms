<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <!--増、查、改的表单-->
    <full-pop
      :visible.sync="visible"
      :top-title="dialogInfo.title"
      :close-btn="dialogInfo.closeBtn"
      :save-list="dialogInfo.btList"
      @handleClick="handleClick"
    >
      <full-pop-item full-pop-item-title="加工单">
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
      <full-pop-item full-pop-item-title="完工明细">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="成品" name="first">
            <vex-dia-table
              :ref-obj.sync="diaFormInfo.cpTableInfo.ref"
              :data.sync="diaFormInfo.cpTableInfo.data"
              :field-list="diaFormInfo.cpTableInfo.fieldList"
              :handle="diaFormInfo.cpTableInfo.handle"
              :rules="diaFormInfo.cpTableInfo.rules"
              :top-btn="diaFormInfo.cpTableInfo.topBtn"
              @handleClick="handleClick"
            />
          </el-tab-pane>
          <el-tab-pane label="材料" name="second">
            <vex-dia-table
              :ref-obj.sync="diaFormInfo.clTableInfo.ref"
              :data.sync="diaFormInfo.clTableInfo.data"
              :field-list="diaFormInfo.clTableInfo.fieldList"
              :handle="diaFormInfo.clTableInfo.handle"
              :rules="diaFormInfo.clTableInfo.rules"
              :top-btn="diaFormInfo.clTableInfo.topBtn"
              @handleClick="handleClick"
            />
          </el-tab-pane>
        </el-tabs>
      </full-pop-item>
    </full-pop>
  </div>
</template>

<script>
export default {
  name: 'MoFinishComb',
  data() {
    return {
      store: 'mo/',
      modName: 'mo',
      dialogInfo: {
        title: '加工单完工登记',
        type: '',
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', btLoading: false, show: true }]
      },
      diaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        addDtBtnShow: false,
        labelWidth: '150px',
        cpTableInfo: {
          ref: null, // 对外提供的可操作配置表单的持有对象
          data: [],
          fieldList: [],
          rules: {},
          topBtn: { show: false },
          handle: null
        },
        clTableInfo: {
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
      if (this.$store.state[this.modName].moFinishCombPage.visible) {
        this.openPage()
      }
      return this.$store.state[this.modName].moFinishCombPage.visible
    }
  },
  watch: {

  },
  mounted() {
    this.initPage()
  },
  methods: {
    openPage() {
      this.initCpTable()
      this.initRules()
      const id = this.$store.state[this.modName].moFinishCombPage.id
      this.$store.dispatch(this.store + 'initFinish', { id: id }).then(() => {
        const resp = this.$store.state[this.modName].initFinishResp
        if (resp.code != this.$successCode) {
          this.close()
        }
        const obj = resp.obj
        this.diaFormInfo.data = obj.entity
        const cpData = {
          skuId: obj.entity.fpSkuId,
          skuCode: obj.entity.fpSkuCode,
          skuName: obj.entity.fpSkuName,
          spec: obj.entity.fpSpec,
          mainUnit: obj.entity.fpMainUnit,
          finishQty: null,
          containerNo: null,
          invBatchRule: obj.entity.invBatchRule
        }
        // 增加批次属性列  obj.entity.invBatchRule.dtList
        if (obj.entity.invBatchRule) {
          obj.entity.invBatchRule.dtList.forEach(item => {
            let field = {}
            if (item.batchAttrFormat == 'DATE') {
              field = { prop: item.batchAttr, label: item.batchAttrKey, minWidth: 100, edit: { name: 'ElDatePicker', props: { type: 'date', format: item.showFormat, valueFormat: item.showFormat, clearable: false }}}
            } else {
              field = { prop: item.batchAttr, label: item.batchAttrKey, minWidth: 100, edit: { name: '$input' }}
            }
            if (item.isRequired && item.isRequired == 1) {
              const ruleData = [{ required: true, message: '请录入' + item.batchAttrKey, trigger: 'blur' }]
              this.$set(this.diaFormInfo.cpTableInfo.rules, item.batchAttr, ruleData)
            }
            this.diaFormInfo.cpTableInfo.fieldList.push(field)
            this.$set(cpData, item.batchAttr, '')
          })
        }
        this.diaFormInfo.cpTableInfo.data = []
        this.diaFormInfo.cpTableInfo.data.push(cpData)
        this.diaFormInfo.clTableInfo.data = obj.dtAssignList.map(item => {
          item.surplusQty = item.movedQty - item.moUsedQty
          this.$set(item, 'useQty', null)
          item.moDtAssignId = item.id
          if (item.productionDate == '/') {
            item.productionDate = null
          }
          if (item.instoreDate == '/') {
            item.instoreDate = null
          }
          if (item.invalidDate == '/') {
            item.invalidDate = null
          }
          return item
        })
      })
      this.activeName = 'first'
    },
    close() {
      this.$store.dispatch(this.store + 'setData', { visible: false, page: 'moFinishCombPage' })
    },
    save() {
      this.validateTable().then(valid => {
        if (valid) {
          this.diaFormInfo.cpTableInfo.data.forEach(item => {
            if (item.invBatchRule) {
              const batchAttrMap = {}
              item.invBatchRule.dtList.forEach(batchRule => {
                batchAttrMap[batchRule.batchAttr] = item[batchRule.batchAttr]
              })
              item.batchAttrMap = batchAttrMap
            }
          })

          const req = {
            id: this.diaFormInfo.data.id,
            cpList: this.diaFormInfo.cpTableInfo.data,
            clList: this.diaFormInfo.clTableInfo.data
          }
          this.$showLoading()
          this.$store.dispatch(this.store + 'addFinishRegister', req).then(() => {
            const resp = this.$store.state[this.modName].addFinishRegisterResp
            if (resp.code == this.$successCode) {
              this.$message.success(resp.msg)
              this.close()
              this.$emit('on-success')
            }
          }).finally(() => {
            this.$hideLoading()
          })
        }
      })
    },
    /**
           * 校验触发表格校验事件
           * @returns {Promise<boolean>}
           */
    async validateTable() {
      const errMap = await this.diaFormInfo.cpTableInfo.ref.validate(true).catch(errMap => errMap)
      if (errMap) {
        this.activeName = 'first'
        this.$message.error('请完善成品完工信息！')
        return false
      } else {
        return true
      }
    },
    initCpTable() {
      this.diaFormInfo.cpTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'skuCode', label: this.$t('mo.fr.skuCode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('mo.fr.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('mo.fr.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('mo.fr.mainUnit'), minWidth: 100 },
        { prop: 'containerNo', label: this.$t('mo.fr.containerNo'), minWidth: 100, edit: { name: '$input' }},
        { prop: 'finishQty', label: this.$t('mo.fr.finishQty'), minWidth: 100, edit: { name: 'ElInputNumber', props: { min: 0, precision: 0 }}}
        // {prop:"batchNo", label:this.$t('mo.fr.batchNo'), minWidth:100},
        // {prop:"productionBatch", label:this.$t('mo.fr.productionBatch'), minWidth:100,edit:{name: '$input'}},
        // {prop:"productionDate", label:this.$t('mo.fr.productionDate'), minWidth:100,edit:{name: 'ElDatePicker', props: {type: 'date',format:'yyyy-MM-dd',valueFormat:"yyyy-MM-dd",clearable: false}}},
        // {prop:"instoreDate", label:this.$t('mo.fr.instoreDate'), minWidth:100,edit:{name: 'ElDatePicker', props: {type: 'date',format:'yyyy-MM-dd',valueFormat:"yyyy-MM-dd",clearable: false}}},
        // {prop:"invalidDate", label:this.$t('mo.fr.invalidDate'), minWidth:100,edit:{name: 'ElDatePicker', props: {type: 'date',format:'yyyy-MM-dd',valueFormat:"yyyy-MM-dd",clearable: false}}},
      ]
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
        { label: this.$t('mo.actualStartTime'), value: 'actualStartTime', type: 'date', dateType: 'datetime', disabled: true },
        { label: this.$t('mo.actualFinishTime'), value: 'actualFinishTime', type: 'date', dateType: 'datetime', disabled: true },
        { label: this.$t('mo.creatorName'), value: 'creatorName', type: 'input', disabled: true },
        { label: this.$t('mo.createTime'), value: 'createTime', type: 'input', disabled: true }
      ]
      this.diaFormInfo.clTableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'skuCode', label: this.$t('mo.fr.skuCode'), minWidth: 100 },
        { prop: 'skuName', label: this.$t('mo.fr.skuName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('mo.fr.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('mo.fr.mainUnit'), minWidth: 100 },
        { prop: 'bomQty', label: this.$t('mo.fr.bomQty'), minWidth: 100 },
        { prop: 'normQty', label: this.$t('mo.fr.normQty'), minWidth: 100 },
        { prop: 'allotQty', label: this.$t('mo.fr.allotQty'), minWidth: 100 },
        { prop: 'movedQty', label: this.$t('mo.fr.movedQty'), minWidth: 100 },
        { prop: 'moUsedQty', label: this.$t('mo.fr.moUsedQty'), minWidth: 100 },
        { prop: 'surplusQty', label: this.$t('mo.fr.surplusQty'), minWidth: 100 },
        { prop: 'useQty', label: this.$t('mo.fr.useQty'), minWidth: 120, edit: { name: 'ElInputNumber', props: { min: 0, precision: 0 }}},
        { prop: 'batchNo', label: this.$t('mo.fr.batchNo'), minWidth: 100 },
        { prop: 'productionBatch', label: this.$t('mo.fr.productionBatch'), minWidth: 100 },
        { prop: 'productionDate', label: this.$t('mo.fr.productionDate'), minWidth: 100 },
        { prop: 'instoreDate', label: this.$t('mo.fr.instoreDate'), minWidth: 100 },
        { prop: 'invalidDate', label: this.$t('mo.fr.invalidDate'), minWidth: 100 }
      ]
    },
    initRules() {
      this.diaFormInfo.cpTableInfo.rules = {
        finishQty: [{ required: true, message: this.$t('mo.msg.finishQty') }]
      }
      this.diaFormInfo.clTableInfo.rules = {
        useQty: [{ required: true, message: this.$t('mo.msg.useQty'), trigger: 'blur' }]
      }
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
