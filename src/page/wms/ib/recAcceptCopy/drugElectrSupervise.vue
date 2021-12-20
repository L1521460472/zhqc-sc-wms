<template>
  <div class="scanning-cont">
    <div class="scanning-header">
      <div class="scanning-header-l">

        <el-form :inline="true" :model="drugFrom" size="mini" label-width="80px" class="demo-form-inline">
          <el-form-item label="单据编号">
            <el-input v-model="drugFrom.originNo" placeholder="单据编号" :disabled="disabled" />
          </el-form-item>
          <el-form-item label="采集类型">
            <el-input v-model="drugFrom.originTypeName" placeholder="采集类型" :disabled="disabled" />
          </el-form-item>
          <el-form-item label="药监码">
            <el-input
              ref="electrSuperviseCode"
              v-model="drugFrom.electrSuperviseCode"
              placeholder="药监码"
              @keyup.enter.native="scannElectrSuperviseCode"
            />
          </el-form-item>
        </el-form>

      </div>
      <div class="scanning-header-r">
        <div class="header-r-tit">条码类型</div>
        <div class="header-r-cont">
          <el-radio v-model="radio1" size="small" label="1" border>药监码</el-radio>
          <el-radio v-model="radio1" size="small" label="2" border disabled>防窜码</el-radio>
        </div>
      </div>
    </div>
    <div class="scanning-operation">
      <div class="operation-tab">
        <div class="tab-tit">正常采集</div>
      </div>
      <div class="operation-btn">
        <el-button size="small" type="primary" @click="saveData">保存(F1)</el-button>
      </div>
    </div>
    <div class="scanning-table">
      <div class="table-left">
        <vex-dia-table
          :ref-obj.sync="drugTable1.subTableInfo.ref"
          :data="drugTable1DtList"
          :field-list="drugTable1.subTableInfo.fieldList"
          :handle="drugTable1.subTableInfo.handle"
          :rules="drugTable1.subTableInfo.rules"
          :top-btn="drugTable1.subTableInfo.topBtn"
          :height="500"
        />
      </div>
      <div class="table-right">
        <vex-dia-table
          :ref-obj.sync="drugTable2.subTableInfo.ref"
          :data="drugTable2DtList"
          :field-list="drugTable2.subTableInfo.fieldList"
          :handle="drugTable2.subTableInfo.handle"
          :rules="drugTable2.subTableInfo.rules"
          :top-btn="drugTable2.subTableInfo.topBtn"
          :height="500"
          @handleClick="handleClick"
          @handleEvent="handleEvent"
        />
        <div style="font-size: 20px;color: red;display: inline-block">已扫描条数:{{ scannTotalNum }}条</div>
      </div>
    </div>
  </div>
</template>

<script>
import { saveDrugElectrSupervise, deleteDrugElectrSupervise } from './api'
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    drugFrom: {
      type: Object
    },
    // eslint-disable-next-line vue/require-default-prop
    drugTable1DtList: {
      type: Array
    },
    // eslint-disable-next-line vue/require-default-prop
    drugTable2DtList: {
      type: Array
    }
  },
  data() {
    return {
      scannTotalNum: 0,
      disabled: true,
      distinctList: [], // 去重药监码
      originTypeList: [{ key: '入库', value: 'IN' }],
      originType: 'IN',
      radio1: '1',
      abc: false,
      activeName: 'first',
      // 左边表格
      drugTable1: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {
          drugTable1DtList: []
        }, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        subTableInfo: {
          title: '列表详情',
          ref: null,
          type: null,
          fieldList: [],
          rules: {},
          labelWidth: '120px',
          handle: null,
          saveList: [
            { label: '关闭', type: '', icon: '', event: 'close', show: true },
            { label: '保存', type: 'primary', icon: '', event: 'save', saveLoading: false, show: true }
          ],
          topBtn: {}
        }
      },
      // 右边表格
      drugTable2: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {
          drugTable2DtList: []
        }, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        subTableInfo: {
          title: '列表详情',
          ref: null,
          type: null,
          fieldList: [],
          rules: {},
          labelWidth: '120px',
          handle: { // 表格自定义按钮
            fixed: 'right',
            label: this.$t('table.actions'), // 操作列名
            width: '100', // 默认操作按钮列宽度
            btList: [// 添加操作按钮
              // 默认删除按钮
              {
                label: this.$t('table.delete'),
                type: 'danger',
                icon: '',
                event: 'deleteDt',
                show: true,
                disabled: false
              }
            ]
          },
          topBtn: {}
        }
      }
    }
  },
  mounted() {
    // 自动获取焦点
    this.$nextTick(() => {
      this.$refs.electrSuperviseCode.$refs.input.focus()
    })

    this.drugTable1.subTableInfo.fieldList = [
      { label: this.$t('table.id'), type: 'seq', width: 50 }, // 序列
      { prop: 'skuCode', label: this.$t('recAcceptCopy.skuCode'), minWidth: 100 },
      { prop: 'productionBatch', label: this.$t('recAcceptCopy.productionBatch'), minWidth: 100 },
      { prop: 'skuName', label: this.$t('recAcceptCopy.skuName'), minWidth: 140 },
      { prop: 'barcode', label: this.$t('recAcceptCopy.barcode'), minWidth: 120 },
      { prop: 'spec', label: this.$t('recAcceptCopy.spec'), minWidth: 100 },
      { prop: 'mainUnit', label: this.$t('recAcceptCopy.mainUnit'), minWidth: 100 },
      { prop: 'tradeName', label: this.$t('recAcceptCopy.tradeName'), minWidth: 100 }
    ]

    this.drugTable2.subTableInfo.fieldList = [
      { label: '序号', type: 'seq', width: 50 },
      { prop: 'electrSuperviseCode', label: '监管码', minWidth: 150 },
      { prop: 'skuName', label: this.$t('recAcceptCopy.skuName'), minWidth: 130 },
      { prop: 'operator', label: '操作员', minWidth: 100 }
    ]
  },
  //
  methods: {
    // 扫描药监码
    scannElectrSuperviseCode() {
      if (this.distinctList.indexOf(this.drugFrom.electrSuperviseCode) == -1 && !this.$isEmpty(this.drugFrom.electrSuperviseCode)) {
        const tempObj = this.$deepClone(this.drugFrom)// 深拷贝
        const tempElectrSuperviseCode = this.drugFrom.electrSuperviseCode
        this.drugTable2DtList.push(tempObj)
        this.distinctList.push(tempElectrSuperviseCode)
        this.scannTotalNum = this.drugTable2DtList.length
      }
      this.$set(this.drugFrom, 'electrSuperviseCode', '')
    },

    /**
       * 保存药监码
       */
    saveData() {
      const params = this.drugFrom
      params.dtList = this.drugTable2DtList
      saveDrugElectrSupervise(params).then(res => {
        if (res.code === 200) {
          this.distinctList = []
          this.$message.success(res.msg)
          this.$emit('saveSuccessfulCallback', false)// 保存药监码成功关闭采集页面
        }
      })
    },

    /**
       * 删除扫描药监码明细
       */
    deleteDt(data) {
      this.drugTable2DtList.splice(data.$rowIndex, 1)
      this.distinctList.splice(data.$rowIndex, 1)

      // 已经存入数据库,需要删除数据库明细
      if (!this.$isEmpty(data.id)) {
        deleteDrugElectrSupervise(data.id)
        // .then(res => {
        // })
      }
      this.scannTotalNum = this.drugTable2DtList.length
    },

    // 按键盘 F1 会执行的方法
    handleKeyDone(key) {
      if (key < 112) {
        return
      }
      if (key === 112) {
        this.saveData()
      }
      window.event.preventDefault()
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
  },

  beforeRouteEnter(to, form, next) {
    next((vm) => {
      document.onkeydown = function() {
        const key = window.event.keyCode
        vm.handleKeyDone(key)
      }
    })
  },
  beforeRouteLeave(to, from, next) {
    document.onkeydown = null
    next()
  }

}
</script>
<style>
  input::-ms-clear,input::-ms-reveal {
    display: none
  }

  *,:after,:before {
    -webkit-box-sizing: border-box;
    -o-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    outline: none;
  }
  .warehousing-layout-page{
    position: fixed;
    top: 0;
    left: 0;
    background-color: #fff;
    width: 100%;
    height: 100%;
    overflow: auto;
    z-index: 1000;
  }
  .warehousing-layout-wrapper{
    width: 100%;
    height: 100%;
    padding-top: 60px;
    position: relative;
  }
  .warehousing-layout-header{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    width: 100%;
    padding: 0 20px;
    height: 60px;
    font-size: 20px;
    border-bottom: 1px solid #e6e8eb;
    position: absolute;
    top: 0;
    left: 0;
  }
  .warehousing-layout-body{
    height: 100%;
    overflow: auto;
    background-color: #f9f9f9;
  }
  .warehousing-layout-body-content{
    width: 100%;
    background-color: #fff;
    min-height: calc(100% - 60px);
    position: relative;
  }

  /*入库*/
  .warehousing-wrap{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  .warehousing-left{
    width: 100%;
    padding-right: 300px;
  }
  .warehousing-left-cont{
    padding: 15px;
    overflow-y:auto;
    height: calc(100vh - 60px);
  }
  .warehousing-right{
    position: fixed;
    right: 0;
    top:60px;
    height: calc(100% - 80px);
    width: 300px;
    background-color: #f6f6f6;
  }

  .warehousing-right-bd{
    overflow-y:auto;
    height: calc(100% - 160px);
    box-shadow: -4px 0 6px rgba(0,0,0,0.02);
  }
  .warehousing-right-ft{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
  }
  .warehousing-right-ft .ft-item-btn{
    text-align: center;
    padding: 12px 12px 0 12px;
  }
  .warehousing-right-ft .ft-item-btn:last-child{
    padding-bottom: 12px;
  }
  .warehousing-right-ft .ft-item-btn .el-button--primary{
    width: 100%;
  }
  .check-finish{
    text-align: center;
    color: #50C064;
    font-size: 26px;
    font-weight: 700;
    padding: 40px 0;
  }
  .l-warehousing-flex{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  .l-warehousing-flex1{
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
  }
  .l-warehousing-mr-10{
    margin-right: 10px;
  }
  .warehousing-left-cont .el-form-item__label{
    line-height: 20px;
    padding-bottom: 2px;
  }

  .warehousing-section{
    margin-bottom: 15px;
  }
  .warehousing-section .warehousing-section-left{
    width: 40%;
    margin-right: 30px;
  }
  .warehousing-section .warehousing-section-left.section-left-large{
    width: 64%;
  }
  .warehousing-left-cont .date-block{
    border:1px dashed #ddd;
    padding: 10px 20px 0 20px;
    background-color: #f9f9f9;
  }
  .warehousing-left-cont .date-block > div{
    margin-right: 20px;
  }
  .warehousing-left-cont .date-block > div:last-child{
    margin-right: 0;
  }
  .warehousing-tit{
    font-size: 18px;
    margin: 20px 0 10px 0;
    color: #222;
  }
  /*end 入库*/

  .scanning-cont{
    height: calc(100vh - 77px);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    flex-direction: column;
  }
  .scanning-cont .scanning-header{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #ddd;
  }
  .scanning-cont .scanning-header .scanning-header-l{
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    border-right: 1px solid #ddd;
    padding-top: 10px;
  }
  .scanning-cont .scanning-header .scanning-header-r{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    flex-direction: column;
    width: 240px;
    text-align: center;
  }
  .scanning-cont .scanning-header .scanning-header-r .header-r-cont{
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    -webkit-box-pack:center;
    -ms-flex-pack:center;
    justify-content:center;
  }
  .scanning-cont .scanning-header .scanning-header-r .header-r-cont .el-radio{
    margin-right: 0;
  }
  .scanning-header-r .header-r-tit{
    line-height: 32px;
    background-color: #0368B9;
    color: #fff;
  }
  .scanning-cont .scanning-operation{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    flex-direction: row;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    -webkit-box-pack:center;
    -ms-flex-pack:center;
    justify-content:center;
    -webkit-box-pack:center;
    -ms-flex-pack:center;
    justify-content : space-between!important;
    border-bottom: 1px solid #ddd;
    padding: 8px 12px;
  }
  .scanning-cont .scanning-operation .tab-tit{
    font-weight: 700;
    color: #0368B9;
  }
  .scanning-cont .scanning-table{
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    flex-direction: row;
  }
  .scanning-cont .scanning-table .table-left{
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    border-right: 1px solid #ddd;
    overflow-x: auto;
  }
  .scanning-cont .scanning-table .table-right{
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    border-right: 1px solid #ddd;
    overflow-x: auto;
  }
</style>
