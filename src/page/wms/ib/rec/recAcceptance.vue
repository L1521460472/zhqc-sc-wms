
<template>
  <full-by-pop
    :visible.sync="visible"
    top-title="PC收货"
    :close-btn="dialogInfo.closeBtn"
    :save-list="dialogInfo.btList"
    @handleClick="handleClick"
  >
    <!-- 入库 -->
    <div slot="left-wrap">
      <el-form ref="form" :model="form" :rules="rules" label-position="top" size="small ">

        <div class="warehousing-section l-warehousing-flex">
          <div class="warehousing-section-left section-left-large">
            <el-form-item label="ASN号/来源单号" prop="orderNo">
              <el-input ref="orderNo" v-model="orderNo" @keyup.enter.native="blurScannOrderNo" />
            </el-form-item>
          </div>
          <div class="warehousing-section-right l-warehousing-flex1 l-warehousing-flex">
            <div class="l-warehousing-flex1 l-warehousing-mr-10">
              <el-form-item label="应收数量">
                <el-input v-model="form.shouldRecQty" :disabled="true" />
              </el-form-item>
            </div>
            <div class="l-warehousing-flex1">
              <el-form-item label="已收数量">
                <el-input v-model="form.alreadyRecQty" :disabled="true" />
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="warehousing-section l-warehousing-flex">
          <div class="warehousing-section-left">
            <el-form-item label="库位">
              <el-input ref="areaNo" v-model="areaNo" />
            </el-form-item>
          </div>
          <div class="warehousing-section-right l-warehousing-flex1">
            <el-form-item label="容器">
              <el-input ref="containerNo" v-model="containerNo" />
            </el-form-item>
          </div>
          <div class="l-warehousing-flex1">
            <el-form-item label="良品/不合格品" prop="skuQuality">
              <el-select v-model="skuQuality" placeholder="请选择">
                <el-option
                  v-for="item in recDtResultList"
                  :key="item.value"
                  :label="item.key"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="warehousing-section l-warehousing-flex">
          <div class="warehousing-section-left">
            <el-form-item label="产品编码值(产品条码)" prop="skuNo">
              <el-input ref="skuNo" v-model="skuNo" :disabled="skuNoDis" @keyup.enter.native="scannSkuNo" />
            </el-form-item>
          </div>
          <div class="warehousing-section-right l-warehousing-flex1">
            <el-form-item label="产品名称">
              <el-input v-model="form.skuName" :disabled="true" />
            </el-form-item>
          </div>
        </div>
        <div class="warehousing-section l-warehousing-flex">
          <div class="warehousing-section-left l-warehousing-flex">
            <div class="l-warehousing-flex1 l-warehousing-mr-10">
              <el-form-item label="ASN数量">
                <el-input v-model="form.commodityQty" :disabled="true" />
              </el-form-item>
            </div>
            <div class="l-warehousing-flex1 l-warehousing-mr-10">
              <el-form-item label="收货件数">
                <el-input-number v-model="recPkgQty" :min="0" :max="999999999" />
              </el-form-item>
            </div>
          </div>
          <div class="warehousing-section-right l-warehousing-flex1 l-warehousing-flex">
            <div class="l-warehousing-flex1 l-warehousing-mr-10">
              <el-form-item label="收货数量">
                <el-input-number v-model="recQty" :min="0" :max="999999999" />
              </el-form-item>
            </div>
            <div class="l-warehousing-flex1 l-warehousing-mr-10">
              <el-form-item label="拒收数量">
                <el-input-number v-model="rejectQty" :min="0" :max="999999999" @change="handleRejectQty" />
              </el-form-item>
            </div>
            <div class="l-warehousing-flex1">
              <el-form-item label="拒收原因" prop="rejectReason">
                <el-input v-model="rejectReason" />
              </el-form-item>
            </div>
          </div>
        </div>

        <div class="warehousing-section l-warehousing-flex">
          <div class="warehousing-section-left l-warehousing-flex">
            <div class="l-warehousing-flex1 l-warehousing-mr-10">
              <el-form-item label="体积(cm³)">
                <el-input v-model="form.volM" />
              </el-form-item>
            </div>
            <div class="l-warehousing-flex1 l-warehousing-mr-10">
              <el-form-item label="毛重(kg)">
                <el-input v-model="form.grossWeightKg" />
              </el-form-item>
            </div>
            <div class="l-warehousing-flex1">
              <el-form-item label="净重(kg)">
                <el-input v-model="form.netWeightKg" />
              </el-form-item>
            </div>
          </div>
        </div>

      </el-form>
      <div class="date-block l-warehousing-flex" style="min-height: 110px">
        <zhqc-form
          :ref-obj.sync="diaFormInfoAttr.ref"
          :data="diaFormInfoAttr.data"
          :field-list="diaFormInfoAttr.fieldList"
          :rules="diaFormInfoAttr.rules"
          :label-width="diaFormInfoAttr.labelWidth"
        />
      </div>
      <h4 class="warehousing-tit">扫描记录</h4>
      <div style="margin-bottom: 100px">
        <el-table
          :data="tableData"
          :height="tableHeight"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="skuCode"
            label="产品编码"
            width="180"
          />
          <el-table-column
            prop="skuName"
            label="产品名称"
            width="180"
          />
          <el-table-column
            prop="containerNo"
            label="容器"
          />
          <el-table-column
            prop="recPkgQty"
            label="收货件数"
          />
          <el-table-column
            prop="recQty"
            label="收货数量"
          />
          <el-table-column
            prop="rejectQty"
            label="拒收数量"
          />

          <el-table-column
            prop="rejectReason"
            label="拒收原因"
          />
        </el-table>
      </div>
    </div>
    <div slot="msg">
      {{ msg }}
    </div>
    <div slot="ft-btn">
      <div class="ft-item-btn"><el-button type="primary" plain @click.native="nextSku">下一个SKU</el-button></div>
      <div class="ft-item-btn"><el-button type="primary" @click.native="saveRecord">保存记录</el-button></div>
      <div class="ft-item-btn"><el-button type="primary" plain @click.native="nextAsn">下一ASN</el-button></div>
    </div>
  </full-by-pop>
</template>

<script>
// import asnMixins from './mixins';
import { formatDate } from '@/utils/date'
export default {
  // mixins:[ asnMixins ],
  name: 'RecAcceptance',
  data() {
    return {
      store: 'rec/',
      modName: 'rec',
      searchFormField: {},
      tableHeight: null,
      form: {
        shouldRecQty: null,
        commodityQty: null,
        alreadyRecQty: 0,
        skuCode: null,
        skuName: null,
        volM: null,
        grossWeightKg: null,
        netWeightKg: null
      },
      skuData: {
        skuCode: null,
        asnNo: null
      },
      skuInvalidData: {
        skuCode: null,
        asnNo: null,
        productionBatch: null,
        productionDate: null,
        instoreDate: null
      },
      areaNo: null,
      containerNo: null,
      skuQuality: 'GOOD_PRODUCT',
      skuNoDis: true,
      rejectQty: null,
      rejectReason: null,
      recPkgQty: null,
      recQty: null,
      batchNo: null,
      productionBatch: null,
      productionDate: null,
      instoreDate: null,
      invalidDate: null,
      badReason: null,
      goodQty: null,
      orderNo: null,
      skuNo: null,
      asnNo: null,
      containerCode: null,
      areaCode: null,
      isRecOver: null,
      // midPackQty:null,
      perQty: null,
      recDtResultList: [],
      tableData: [],
      tableDataDt: null,
      saveRecordObj: null,
      msg: null,
      isScan: false,
      dialogInfo: {
        title: '',
        visible: false,
        type: '',
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: '', btLoading: false, show: false }]
      },

      // 校验
      rules: {
        /* skuQuality: [{ required: true, message: '请选择良品/不合格品', trigger: 'blur'}],
          orderNo: [{ required: true, message: '请先扫描ASN号/来源单号', trigger: 'blur'}],
          skuNo: [{ required: true, message: '请先扫描SKU', trigger: 'blur'}],
          productionBatch: [{ required: true, message: '请先输入生产批号', trigger: 'blur'}],
          productionDate: [{ required: true, message: '请先输入生产日期', trigger: 'blur'}],*/
        rejectReason: [{ required: false, message: '请输入拒收原因', trigger: 'blur' }]
      },
      diaFormInfoAttr: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        labelWidth: '120px'
      }
    }
  },

  computed: {
    visible() {
      if (this.$store.state[this.modName].recAcceptanceResp.visible) {
        // 初始化数据
        this.recAcceptanceInitPage()
      }
      return this.$store.state[this.modName].recAcceptanceResp.visible
    }
  },

  watch: {
    visible(val) {
      if (val) {
        //
        this.$nextTick(() => {
          const aa = this.getNodeHeight('.warehousing-left-cont') - this.getNodeHeight('.el-form--label-top')
          this.tableHeight = aa - 60
        })
      }
    }
  },
  methods: {

    recAcceptanceInitPage() {
      const resp = this.$store.state[this.modName].initPageObj
      this.recDtResultList = resp.obj.skuQualityList
    },

    /**
       * 关闭页面
       */
    close() {
      // 清空数据
      this.tableData = []
      this.tableDataDt = null
      this.saveRecordObj = null
      // 清空原有数据
      this.clearAsn()
      this.clearSku()
      this.msg = null
      this.$store.dispatch(this.store + 'setData', { page: 'recAcceptanceResp', visible: false })
    },

    blurScannOrderNo() {
      this.scannOrderNo()
    },

    /**
       * 扫描ASN号/来源单号
       */
    scannOrderNo() {
      if (this.isScan) {
        return
      }
      this.isScan = true
      this.$store.dispatch(this.store + 'scannOrderNo', this.orderNo).then(() => {
        const resp = this.$store.state[this.modName].scannOrderNoResp
        if (resp.code === this.$store.state[this.modName].successCode) {
          this.asnNo = resp.obj.asnNo
          this.instoreDate = resp.obj.instoreDate.substr(0, 10)
          this.msg = resp.obj.asnNo // 提示信息
          this.skuNoDis = false
        } else {
          this.$refs.orderNo.focus()
        }
      }).finally(() => {
        this.isScan = false
      })
    },

    blurScannAreaNo() {
      this.scannAreaNo()
    },
    /**
       * 扫描库区/库位
       */
    scannAreaNo() {
      this.$store.dispatch(this.store + 'scannAreaNo', this.areaNo).then(() => {
        const resp = this.$store.state[this.modName].scannAreaNoResp
        if (resp.code === this.$store.state[this.modName].successCode) {
          this.areaCode = resp.obj.recLotCode
          this.msg = resp.obj.recLotCode // 提示信息
        } else {
          this.$refs.areaNo.focus()
        }
      })
    },

    blurScannContainerNo() {
      this.scannContainerNo()
    },
    /**
       * 扫描容器
       */
    scannContainerNo() {
      this.$store.dispatch(this.store + 'scannContainerNo', this.containerNo).then(() => {
        const resp = this.$store.state[this.modName].scannContainerNoResp
        if (resp.code === this.$store.state[this.modName].successCode) {
          this.containerCode = resp.obj.containerNo
          this.msg = resp.obj.containerNo // 提示信息
        } else {
          this.$refs.containerNo.focus()
        }
      })
    },

    blurScannSkuNo() {
      this.scannSkuNo()
    },
    /**
       * 扫描SKU
       */
    scannSkuNo() {
      this.skuData.skuCode = this.skuNo
      this.skuData.asnNo = this.asnNo

      if (this.isEmpty(this.asnNo)) {
        this.$message.error('请先扫描ASN号/来源单号')
        return
      }
      this.$store.dispatch(this.store + 'scannSkuNo', this.skuData).then(() => {
        const resp = this.$store.state[this.modName].scannSkuNoResp
        if (resp.code === this.$store.state[this.modName].successCode) {
          this.form = resp.obj // 表单展示数据
          this.form.shouldRecQty = resp.obj.commodityQty
          this.form.alreadyRecQty = resp.obj.recQty
          this.form.skuCode = resp.obj.skuCode
          this.isRecOver = resp.obj.isRecOver
          // this.midPackQty = resp.obj.midPackQty;
          this.perQty = resp.obj.perQty
          if (this.isEmpty(this.isRecOver)) {
            this.isRecOver = 0
          }
          this.$set(this.form, 'skuQuality', 'GOOD_PRODUCT')
          this.saveRecordObj = resp.obj// 发送给后台的数据
          this.msg = resp.obj.skuCode // 提示信息
          this.initInvBatchAttr(resp.obj)
        } else {
          this.$refs.skuNo.focus()
        }
      })
    },
    initInvBatchAttr(entity) {
      const invBatchRule = entity.invBatchRule
      const fieldList = []
      const attrData = {}
      this.diaFormInfoAttr.data = {}
      const rules = {}
      invBatchRule.dtList.forEach(item => {
        let field = {}
        if (item.batchAttrFormat == 'DATE') {
          field = { value: item.batchAttr, label: item.batchAttrKey, type: 'date', format: item.showFormat, valueFormat: item.showFormat }
        } else {
          field = { value: item.batchAttr, label: item.batchAttrKey, type: 'input' }
        }
        if (item.isRequired && item.isRequired == 1) {
          const ruleData = [{ required: true, message: '请录入' + item.batchAttrKey, trigger: 'blur' }]
          rules[item.batchAttr] = ruleData
        }
        fieldList.push(field)
        if (item.batchAttrColumn == 'instoreDate') {
          attrData[item.batchAttr] = formatDate(new Date(), item.showFormat)
          field.disabled = true
        } else if (item.batchAttrColumn == 'po') {
          if (entity.batchAttrPo) {
            attrData[item.batchAttr] = entity.batchAttrPo
            field.disabled = true
          } else {
            attrData[item.batchAttr] = ''
          }
        } else if (item.batchAttrColumn == 'asnNo') {
          attrData[item.batchAttr] = entity.asnNo
          field.disabled = true
        } else {
          attrData[item.batchAttr] = ''
        }
      })
      this.$set(this.diaFormInfoAttr, 'data', attrData)
      this.diaFormInfoAttr.fieldList = fieldList
      this.diaFormInfoAttr.rules = rules
      if (this.diaFormInfoAttr.ref) {
        this.diaFormInfoAttr.ref.resetFields()
      }
    },
    clearInvBatchAttr() {
      this.diaFormInfoAttr.data = {}
      this.diaFormInfoAttr.fieldList = []
      this.diaFormInfoAttr.rules = {}
    },
    /**
       * 查询产品有效期至
       */
    querySkuInvalidDate() {
      this.skuInvalidData.productionBatch = this.productionBatch
      this.skuInvalidData.productionDate = this.productionDate
      var now = new Date()
      if (this.skuInvalidData.productionDate > now) {
        this.$message.error('生产日期不能大于当前时间!')
        this.skuInvalidData.productionDate = null
        this.productionDate = null
        return
      }
      this.skuInvalidData.instoreDate = this.instoreDate
      this.skuInvalidData.skuCode = this.skuData.skuCode
      this.skuInvalidData.asnNo = this.skuData.asnNo
      this.$store.dispatch(this.store + 'querySkuInvalidDate', this.skuInvalidData).then(() => {
        const resp = this.$store.state[this.modName].querySkuInvalidDateResp
        if (resp.code === this.$store.state[this.modName].successCode) {
          this.invalidDate = resp.obj.invalidDate
        } else {
          this.productionDate = null
          this.$refs.productionDate.focus()
        }
      })
    },

    /**
       * 保存记录
       */
    saveRecord() {
      if (this.isEmpty(this.asnNo)) {
        this.$message.error('请先扫描ASN号/来源单号')
        return
      }

      if (this.isEmpty(this.form.skuCode)) {
        this.$message.error('请先扫描SKU')
        return
      }

      /*    if(this.isEmpty(this.areaNo)) {
          this.$message.error("请先扫描库区/库位");
          return ;
        }*/

      // if(this.isEmpty(this.productionBatch)) {
      //   this.$message.error("请输入生产批号");
      //   return ;
      // }
      // if(this.isEmpty(this.productionDate)) {
      //   this.$message.error("请输入生产日期");
      //   return ;
      // }
      /*

        if(this.isEmpty(this.containerNo)) {
          this.$message.error("请先扫描容器");
          return ;
        }*/

      // let midPackQty = this.midPackQty;
      const perQty = this.perQty
      const commodityQty = this.form.commodityQty
      const recPkgQty = this.recPkgQty
      const recQty = this.recQty + perQty * recPkgQty

      if (recQty > commodityQty && this.isRecOver < 1) {
        this.$message.error('收货数量不能大于产品数量')
        return
      }

      if (recQty == 0) {
        this.$message.error('收货数量不能为空')
        return
      }

      let rejectQty = this.rejectQty// 拒收数量
      if (this.isEmpty(rejectQty)) {
        rejectQty = 0
      }
      /* if(rejectQty> recQty){
          this.$message.error("拒收数量不能大于收货数量!");
          return ;
        }*/

      if (rejectQty > 0) {
        const rejectReason = this.rejectReason// 拒收原因
        if (this.isEmpty(rejectReason)) {
          this.$message.error('拒收原因不能为空!')
          return
        }
      }

      const skuQuality = this.skuQuality
      if (this.isEmpty(skuQuality)) {
        this.$message.error('良品/不合格品不能为空!')
        return
      }

      if (this.isEmpty(recPkgQty)) {
        this.recPkgQty = 0
      }
      this.saveRecordObj.containerNo = this.containerNo
      this.saveRecordObj.skuCode = this.form.skuCode
      this.saveRecordObj.skuName = this.form.skuName
      this.saveRecordObj.commodityQty = this.form.commodityQty
      this.saveRecordObj.recPkgQty = this.recPkgQty
      this.saveRecordObj.recQty = this.recQty
      this.saveRecordObj.rejectQty = this.rejectQty
      this.saveRecordObj.rejectReason = this.rejectReason
      this.saveRecordObj.productionBatch = this.productionBatch
      this.saveRecordObj.productionDate = this.productionDate
      this.saveRecordObj.instoreDate = this.instoreDate
      this.saveRecordObj.invalidDate = this.invalidDate
      this.saveRecordObj.volM = this.form.volM
      this.saveRecordObj.grossWeightKg = this.form.grossWeightKg
      this.saveRecordObj.netWeightKg = this.form.netWeightKg
      this.saveRecordObj.skuQuality = this.skuQuality
      this.saveRecordObj.recLotCode = this.areaNo
      this.saveRecordObj.recMode = 'PC_MODE'
      this.saveRecordObj.asnNo = this.asnNo

      this.diaFormInfoAttr.ref.validate(valid => {
        if (valid) {
          this.saveRecordObj.batchAttrMap = this.diaFormInfoAttr.data
          this.$store.dispatch(this.store + 'saveRecInfo', this.saveRecordObj).then(() => {
            const resp = this.$store.state[this.modName].saveRecordResp
            if (resp.code === this.$store.state[this.modName].successCode) {
              // 清空原有数据
              this.clearSku()
              this.msg = resp.obj.msg // 提示信息
              if (this.msg == 'ASN全部收货完毕!') {
                this.clearAsn()
                // 清空数据
                this.tableData = []
                this.tableDataDt = null
                this.saveRecordObj = null
              } else {
                // this.saveRecordObj = resp.obj;
                // this.tableDataDt = this.saveRecordObj;//扫描记录
                this.tableData.push(resp.obj)// 添加到扫描记录数组
              }
            }
          })
        }
      })
    },
    /**
       * 下一个SKU
       */
    nextSku() {
      // 清空原有数据
      if (!this.isEmpty(this.form.skuCode)) {
        this.$confirm(this.$t('当前产品还未收货，确认取消当前产品收货，进行下一个产品收货吗？'), {
          type: 'warning',
          center: true
        }).then(() => {
          this.clearSku()
          this.msg = null
        })
      } else {
        this.clearSku()
        this.msg = null
      }
    },

    /**
       * 下一ASN
       */
    nextAsn() {
      // 清空原有数据
      if (!this.isEmpty(this.form.skuCode)) {
        this.$confirm(this.$t('当前产品还未收货，确认取消当前产品收货，进行下一个ASN收货吗？'), {
          type: 'warning',
          center: true
        }).then(() => {
          // 清空数据
          this.tableData = []
          this.tableDataDt = null
          this.saveRecordObj = null
          // 清空原有数据
          this.clearAsn()
          this.clearSku()
          this.msg = null
        })
      } else {
        // 清空数据
        this.tableData = []
        this.tableDataDt = null
        this.saveRecordObj = null
        // 清空原有数据
        this.clearAsn()
        this.clearSku()
        this.msg = null
      }
    },
    /**
       * 清空SKU数据
       */
    clearSku() {
      this.form.shouldRecQty = null
      this.form.alreadyRecQty = null
      this.form.skuCode = null
      this.form.skuNo = null
      this.skuNo = null
      this.form.skuName = null
      this.form.cmdPkgQty = null
      this.form.commodityQty = null
      this.recPkgQty = null
      this.recQty = null
      this.rejectQty = null
      this.rejectReason = null
      this.form.volM = null
      this.form.grossWeightKg = null
      this.form.netWeightKg = null
      this.productionBatch = null
      this.productionDate = null
      this.invalidDate = null
      this.clearInvBatchAttr()
    },

    /**
       * 清空ASN数据
       */
    clearAsn() {
      this.orderNo = null
      this.asnNo = null
      this.containerNo = null
      this.containerCode = null
      this.areaNo = null
      this.areaCode = null
      this.instoreDate = null
    },

    /**
       * 判断是否为空
       * @param text
       * @returns true:空
       */
    isEmpty(text) {
      if (typeof (text) === 'undefined' || !text) {
        return true
      } else {
        return false
      }
    },
    handleClick(event, data) {
      if (event) {
        this[event](data)
      }
    },
    // 拒收数量改变事件
    handleRejectQty() {
      if (this.rejectQty) {
        this.rules.rejectReason[0].required = true
      } else {
        this.rules.rejectReason[0].required = false
      }
    },
    //
    getNodeHeight(el) {
      return document.querySelector(el).offsetHeight
    }

  }
}
</script>

<style scoped>
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

  [class*=icon-],[class^=icon-] {
    font-family: iconfont;
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: -1px;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale
  }
  .icon-return:after {
    content: "\E91F"
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
    height: 100vh;
  }
  .warehousing-right{
    position: absolute;
    right: 0;
    top:0;
    height: 100%;
    width: 300px;
    background-color: #f6f6f6;
  }

  .warehousing-right-bd{
    padding-bottom: 130px;
    overflow-y:auto;
    height: 100vh;
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
    margin-bottom: 0;
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
</style>
<style>
  .warehousing-left-cont .el-form-item__label{
    line-height: 20px;
    padding-bottom: 2px;
  }
</style>
