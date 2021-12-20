
<template>

  <full-pop
    :visible.sync="visible"
    top-title="PC验收"
    :close-btn="dialogInfoOne.closeBtn"
    :save-list="dialogInfoOne.btList"
    @handleClick="handleClick"
  >
    <!-- 入库 -->
    <div slot="left-wrap">
      <el-form ref="form" :model="form" :rules="rules" label-position="top" size="small ">

        <div class="warehousing-section l-warehousing-flex">
          <div class="warehousing-section-left section-left-large">
            <el-form-item label="ASN号/来源单号">
              <el-input ref="orderNo" v-model="orderNo" @keyup.enter.native="scannOrderNo" @blur="blurScannOrderNo" />
            </el-form-item>
          </div>
          <div class="warehousing-section-right l-warehousing-flex1 l-warehousing-flex">
            <div class="l-warehousing-flex1 l-warehousing-mr-10">
              <el-form-item label="应检数量">
                <el-input v-model="form.shouldQcQty" :disabled="true" />
              </el-form-item>
            </div>
            <div class="l-warehousing-flex1">
              <el-form-item label="已检数量">
                <el-input v-model="form.alreadyQcQty" :disabled="true" />
              </el-form-item>
            </div>
          </div>
        </div>

        <div class="warehousing-section l-warehousing-flex">
          <div class="warehousing-section-left">
            <el-form-item label="来源单号">
              <el-input v-model="form.origNo" :disabled="true" />
            </el-form-item>
          </div>
          <div class="warehousing-section-right l-warehousing-flex1">
            <el-form-item label="检验方式">
              <el-input v-model="form.qcModeName" :disabled="true" />
            </el-form-item>
          </div>
        </div>

        <div class="warehousing-section l-warehousing-flex">
          <div class="warehousing-section-left">
            <el-form-item label="产品编码">
              <el-input v-model="form.skuCode" :disabled="true" />
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
              <el-form-item label="收货数量">
                <el-input v-model="form.recQty" :disabled="true" />
              </el-form-item>
            </div>
            <div class="l-warehousing-flex1">
              <el-form-item label="应检数量">
                <el-input v-model="form.shouldQcQty" :disabled="true" />
              </el-form-item>
            </div>
          </div>
          <div class="warehousing-section-right l-warehousing-flex1 l-warehousing-flex">
            <div class="l-warehousing-flex1 l-warehousing-mr-10">
              <el-form-item label="检验数量" prop="qcQty">
                <el-input-number v-model="form.qcQty" :min="0" :max="999999999" />
              </el-form-item>
            </div>
            <div class="l-warehousing-flex1 l-warehousing-mr-10">
              <el-form-item label="不合格数量">
                <el-input-number v-model="form.badQty" :min="0" :max="999999999" @keyup.enter.native="scannBadQty" @blur="blurScannBadQty" />
              </el-form-item>
            </div>
            <div class="l-warehousing-flex1 l-warehousing-mr-10">
              <el-form-item label="合格数量">
                <el-input-number v-model="form.goodQty" :min="0" :max="999999999" :disabled="true" />
              </el-form-item>
            </div>
            <div class="l-warehousing-flex1">
              <el-form-item label="不合格原因">
                <el-input v-model="form.badReason" />
              </el-form-item>
            </div>
          </div>
        </div>

        <div class="warehousing-section l-warehousing-flex">
          <div class="warehousing-section-left l-warehousing-flex">
            <div class="l-warehousing-flex1 l-warehousing-mr-10">
              <el-form-item label="体积">
                <el-input v-model="form.vol" :disabled="true" />
              </el-form-item>
            </div>
            <div class="l-warehousing-flex1 l-warehousing-mr-10">
              <el-form-item label="毛重">
                <el-input v-model="form.grossWeight" :disabled="true" />
              </el-form-item>
            </div>
            <div class="l-warehousing-flex1">
              <el-form-item label="净重">
                <el-input v-model="form.netWeight" :disabled="true" />
              </el-form-item>
            </div>
          </div>
          <div class="warehousing-section-right l-warehousing-flex1">
            <el-form-item label="检验结果" prop="checkResult">
              <el-select v-model="form.checkResult" placeholder="请选择检验结果">
                <el-option
                  v-for="item in qcDtResultList"
                  :key="item.value"
                  :label="item.key"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </div>
        </div>

        <div class="date-block l-warehousing-flex">
          <div class="l-warehousing-flex1">
            <el-form-item label="批次号">
              <el-input v-model="form.batchNo" :disabled="true" />
            </el-form-item>
          </div>
          <div class="l-warehousing-flex1">
            <el-form-item label="生产批号">
              <el-input v-model="form.productionBatch" :disabled="true" />
            </el-form-item>
          </div>
          <div class="l-warehousing-flex1">
            <el-form-item label="生产日期">
              <el-input v-model="form.productionDate" :disabled="true" />
            </el-form-item>
          </div>
          <div class="l-warehousing-flex1">
            <el-form-item label="入库日期">
              <el-input v-model="form.instoreDate" :disabled="true" />
            </el-form-item>
          </div>
          <div class="l-warehousing-flex1">
            <el-form-item label="有效期至">
              <el-input v-model="form.invalidDate" :disabled="true" />
            </el-form-item>
          </div>
        </div>
      </el-form>

      <h4 class="warehousing-tit">扫描记录</h4>
      <div style="margin-bottom: 100px">
        <el-table
          :data="tableData"
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
            prop="commodityQty"
            label="ASN数量"
          />
          <el-table-column
            prop="recQty"
            label="收货数量"
          />
          <el-table-column
            prop="shouldQcQty"
            label="应检数量"
          />
          <el-table-column
            prop="qcQty"
            label="检验数量"
          />
          <el-table-column
            prop="goodQty"
            label="合格数量"
          />
          <el-table-column
            prop="badQty"
            label="不合格数量"
          />
          <el-table-column
            prop="checkResultName"
            label="检验结果"
          />
        </el-table>
      </div>
    </div>
    <div slot="msg">
      {{ msg }}
    </div>
    <div slot="ft-btn">
      <div class="ft-item-btn"><el-button type="primary" :disabled="disabledSave" @click.native="submitSaveRecord('form')">保存记录</el-button></div>
      <div class="ft-item-btn"><el-button type="primary" plain @click.native="nextQc">下一验收单</el-button></div>
    </div>

    <!--増、查、改的表单-->
    <full-pop
      :visible.sync="dialogInfo.visible"
      :top-title="dialogInfo.title"
      :close-btn="dialogInfo.closeBtn"
      :save-list="dialogInfo.btList"
      @handleClick="handleClick"
    >
      <full-pop-item v-show="diaFormInfo.isShowForm" full-pop-item-title="复核人">
        <zhqc-form
          :ref-obj.sync="diaFormInfo.ref"
          :data="diaFormInfo.data"
          :form-type="dialogInfo.type"
          :field-list="diaFormInfo.fieldList"
          :rules="diaFormInfo.rules"
          :label-width="diaFormInfo.labelWidth"
        />
      </full-pop-item>
      <full-pop-item full-pop-item-title="双人验收">
        <zhqc-table
          :data.sync="diaFormInfo.dtTableInfo.data"
          :field-list="diaFormInfo.dtTableInfo.fieldList"
          :handle="diaFormInfo.dtTableInfo.handle"
          @handleClick="handleClick"
        />
      </full-pop-item>
    </full-pop>

  </full-pop>
</template>

<script>
// import qcMixins from './mixins'
import { JSEncrypt } from 'jsencrypt'
export default {
  name: 'Acceptance',
  data() {
    return {
      store: 'qc/',
      modName: 'qc',
      form: {
        shouldQcQty: null,
        alreadyQcQty: 0,
        origNo: null,
        qcModeName: null,
        skuCode: null,
        skuName: null,
        commodityQty: null,
        recQty: null,
        qcQty: null,
        vol: null,
        grossWeight: null,
        netWeight: null,
        batchNo: null,
        productionBatch: null,
        productionDate: null,
        instoreDate: null,
        invalidDate: null,
        badReason: null,
        goodQty: null,
        checkResult: 'PASS'
      },
      qcDtResultList: [],
      orderNo: null,
      asnNo: null,
      tableData: [],
      tableDataDt: null,
      saveRecordObj: null,
      msg: null,

      dialogInfoOne: {
        visible: false,
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true }]
      },

      // 二次验收弹窗
      dialogInfo: {
        title: '',
        visible: false,
        type: '',
        closeBtn: { label: '', type: '', icon: '', event: 'closeTwo', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'closeTwo', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'saveQcPersonTwo', btLoading: false, show: false }]
      },
      // 二次验收弹窗表单
      diaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        fieldList: [], // 配置的表单字段集合
        rules: {}, // 配置的表单字段校验规则集合
        isShowForm: false,
        labelWidth: '200px',
        dtTableInfo: {
          ref: null,
          data: [],
          fieldList: [],
          handle: null
        }
      },

      // 校验
      rules: {
        checkResult: [{ required: true, message: '请选择检验结果', trigger: 'blur' }],
        qcQty: [{ required: true, message: '请输入检验数量', trigger: 'blur' }]
      },

      doubleCheckList: [], // 存放二次验收产品信息
      disabledSave: true// 保存按钮是否点击
    }
  },

  computed: {
    visible() {
      if (this.$store.state[this.modName].acceptanceResp.visible) {
        // 初始化数据
        this.acceptanceInitPage()
      }
      return this.$store.state[this.modName].acceptanceResp.visible
    }
  },

  mounted() {
    this.rulesInit()// 初始化diaFormInfo表单字段校验规则
  },

  methods: {
    acceptanceInitPage() {
      this.$store.dispatch(this.store + 'initPage', {}).then(() => {
        const resp = this.$store.state[this.modName].initPageResp
        this.qcDtResultList = resp.obj.qcDtResultList
      })
    },

    /**
       * 关闭页面
       */
    close() {
      // 清空数据
      this.clearData()
      this.$store.dispatch(this.store + 'setData', { page: 'acceptanceResp', visible: false })
    },

    /**
       * 扫描ASN号/来源单号,失去焦点事件
       */
    blurScannOrderNo() {
      this.scannOrderNo()
    },

    /**
       * 扫描ASN号/来源单号,回车事件
       */
    scannOrderNo() {
      this.$store.dispatch(this.store + 'scannOrderNo', this.orderNo).then(() => {
        const resp = this.$store.state[this.modName].scannOrderNoResp
        if (resp.code === this.$store.state[this.modName].successCode) {
          this.asnNo = resp.obj.asnNo
          this.form = resp.obj // 表单展示数据
          this.$set(this.form, 'alreadyQcQty', 0)
          this.$set(this.form, 'checkResult', 'PASS')
          this.saveRecordObj = resp.obj// 发送给后台的数据
          this.disabledSave = false// 设置保存按钮可点击
        } else {
          this.$refs.orderNo.focus()
        }
      })
    },

    /**
       * 输入不合格数量,回车事件
       */
    scannBadQty() {
      // 合格数量 = 检验数量-不合格数量
      const qcQty = this.form.qcQty
      const badQty = this.form.badQty

      if (badQty > qcQty) {
        this.$message.error('不合格数量不能大于检验数量')
        return
      }
      const goodQty = qcQty - badQty
      this.$set(this.form, 'goodQty', goodQty)
    },

    /**
       * 输入不合格数量,失去焦点事件
       */
    blurScannBadQty() {
      this.scannBadQty()
    },

    submitSaveRecord(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveRecord()
        }
      })
    },

    /**
       * 保存记录
       */
    saveRecord() {
      if (this.isEmpty(this.orderNo)) {
        this.$message.error('请先扫描ASN号/来源单号')
        return
      }
      if (this.isEmpty(this.asnNo)) {
        this.$message.error('ASN号/来源单号,不正确')
        return
      }

      // 设置扫描记录值
      const checkResult = this.form.checkResult// 检验结果
      let badQty = this.form.badQty// 不良品数量
      if (this.isEmpty(badQty)) {
        badQty = 0
      }

      this.saveRecordObj.qcQty = this.form.qcQty
      this.saveRecordObj.badQty = badQty
      this.saveRecordObj.goodQty = this.form.qcQty - badQty
      this.saveRecordObj.badReason = this.form.badReason
      this.saveRecordObj.checkResult = checkResult
      this.saveRecordObj.checkResultName = checkResult == 'PASS' ? '合格' : '不合格'

      // 将二次验收数据加入数组中
      if (this.saveRecordObj.isDoubleCheck == 1) {
        this.doubleCheckList.push(this.saveRecordObj)
      }

      // 需要双人验收
      if (this.saveRecordObj.showDoubleCheck == true) {
        this.shouDoubleQcDia()
        // 无需双人验收
      } else {
        this.sendSaveQc()
      }
    },

    /**
       * 下一验收单
       */
    nextQc() {
      this.$store.dispatch(this.store + 'nextQc', this.asnNo).then(() => {
        const resp = this.$store.state[this.modName].nextQcResp
        if (resp.code === this.$store.state[this.modName].successCode) {
          // 清空数据
          this.clearData()
          this.$refs.orderNo.focus()
        }
      })
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

    /**
       * 清空数据
       */
    clearData() {
      // 清空数据
      this.form = {
        shouldQcQty: null,
        alreadyQcQty: null,
        origNo: null,
        qcModeName: null,
        skuCode: null,
        skuName: null,
        commodityQty: null,
        recQty: null,
        qcQty: null,
        vol: null,
        grossWeight: null,
        netWeight: null,
        batchNo: null,
        productionBatch: null,
        productionDate: null,
        instoreDate: null,
        invalidDate: null,
        badReason: null,
        goodQty: null,
        checkResult: 'PASS'
      }
      this.tableData = []
      this.tableDataDt = null
      this.saveRecordObj = null
      this.asnNo = null
      this.orderNo = null
      this.msg = null
      this.doubleCheckList = []
      this.disabledSave = true
    },

    // 发送保存质检记录
    sendSaveQc() {
      this.$store.dispatch(this.store + 'saveRecord', this.saveRecordObj).then(() => {
        const resp = this.$store.state[this.modName].saveRecordResp
        if (resp.code === this.$store.state[this.modName].successCode) {
          this.tableDataDt = this.saveRecordObj// 扫描记录
          this.form = resp.obj// 表单展示数据
          this.$set(this.form, 'alreadyQcQty', 0)
          this.$set(this.form, 'checkResult', 'PASS')
          this.saveRecordObj = resp.obj// 发送给后台的数据
          this.msg = resp.obj.msg // 提示信息
          this.tableData.push(this.tableDataDt)// 添加到扫描记录数组
          // 质检单全部质检完成,清空页面数据
          if (resp.obj.qcFinish == true) {
            this.clearData()
            this.disabledSave = true
          }
        }
      })
    },

    /** ******************************************双人验收*******************************************/
    /**
       * 显示双人复核弹窗
       */
    shouDoubleQcDia() {
      // 弹窗的类型：view
      this.dialogInfo.type = 'view'
      // 默认弹窗的标题：修改
      this.dialogInfo.title = '双人验收'
      // 弹窗是否显示
      this.dialogInfo.visible = true
      this.diaFormInfo.isShowForm = true
      // 弹窗的保存按钮是否显示
      this.dialogInfo.btList[1].show = true

      // 封装的修改表单的数据化配置
      this.initDiaDoubleQcColumns()
      this.diaFormInfo.dtTableInfo.data = this.doubleCheckList
    },

    // 初始化双人验收界面
    initDiaDoubleQcColumns() {
      this.diaFormInfo.fieldList = [
        { label: '第二验收人用户名', value: 'checkUserTwo', type: 'input' },
        { label: '密码', value: 'checkTwoPassword', type: 'password' }
      ]
      this.diaFormInfo.dtTableInfo.fieldList = [
        { prop: 'barcode', label: '产品条码', minWidth: 100 },
        { prop: 'skuCode', label: '产品编码', minWidth: 100 },
        { prop: 'skuName', label: '产品名称', minWidth: 100 },
        { prop: 'spec', label: '规格', minWidth: 100 },
        { prop: 'boxNo', label: '生产厂家', minWidth: 100 },
        { prop: 'mainUnit', label: '单位', minWidth: 100 },
        { prop: 'batchNo', label: '批次号', minWidth: 100 },
        { prop: 'commodityQty', label: 'ASN数量', minWidth: 100 },
        { prop: 'recQty', label: '收货数量', minWidth: 100 },
        { prop: 'qcQty', label: '检验数量', minWidth: 100 },
        { prop: 'goodQty', label: '合格数量', minWidth: 100 },
        { prop: 'badQty', label: '不合格数量', minWidth: 100 },
        { prop: 'checkResultName', label: '检验结果', minWidth: 100 }
      ]
    },

    // 保存双人验收信息
    saveQcPersonTwo() {
      this.diaFormInfo.ref.validate((valid) => {
        if (valid) {
          this.$showLoading()
          this.$store.dispatch(this.store + 'getPubicKey', { 'userNo': this.diaFormInfo.data.checkUserTwo }).then(() => {
            const resp = this.$store.state[this.modName].getPubicKeyResp
            if (resp.code === this.$successCode) {
              const encryptor = new JSEncrypt()
              encryptor.setPublicKey(resp.obj)
              const submitData = {}
              submitData.userNo = this.diaFormInfo.data.checkUserTwo
              submitData.pwd = encryptor.encrypt(this.diaFormInfo.data.checkTwoPassword)
              this.$store.dispatch(this.store + 'checkUser', submitData).then(() => {
                const checkResp = this.$store.state[this.modName].checkUserResp
                if (checkResp.code === this.$successCode) {
                  if (this.saveRecordObj.checkUserName == checkResp.obj.userName) {
                    this.$message.error('二次验收人不能为当前登录用户')
                  } else {
                    // 发送保存质检记录
                    this.saveRecordObj.checkUserTwoName = checkResp.obj.userName
                    this.sendSaveQc()
                    // 关闭二次验收页面
                    this.closeTwo()
                  }
                }
              })
            } else {
              this.loading = false
              this.ruleForm.pwd = null
            }
          }).finally(() => {
            this.$hideLoading()
          })
        }
      })
    },

    // 关闭二次验收页面
    closeTwo() {
      this.dialogInfo.visible = false
    },

    // 必填校验
    rulesInit() {
      this.diaFormInfo.rules = {
        checkUserTwo: [{ required: true, message: '请输入验收人账号', trigger: 'blur' }],
        checkTwoPassword: [{ required: true, message: '请输入验收人密码', trigger: 'blur' }]
      }
    },

    /** ******************************************双人验收*******************************************/

    handleClick(event, data) {
      if (event) {
        this[event](data)
      }
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
  .warehousing-left-cont .el-form-item__label {
    line-height: 20px;
    padding-bottom: 2px;
  }
  /*@font-face {*/
  /*  font-family:Chinese Quote;src:local("PingFang SC"),local("SimSun");unicode-range:U+2018,U+2019,U+201c,U+201d*/
  /*}*/

  /*字体图标*/
  /*@font-face {*/
  /*  font-family:iconfont;src:url(../fonts/icomoon.77b79a1a.eot);src:url(../fonts/icomoon.77b79a1a.eot#iefix) format("embedded-opentype"),url(../fonts/icomoon.f4e9638d.ttf) format("truetype"),url(../fonts/icomoon.266c467a.woff) format("woff"),url(../img/icomoon.bbea6e73.svg#icomoon) format("svg");font-weight:400;font-style:normal*/
  /*}*/
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
