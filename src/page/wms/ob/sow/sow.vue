<!--
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-02 16:10:55
-->
<template>
  <div class="sow-wrap">
    <div class="sow-wrap-hd">
      <el-form ref="form" :inline="true" size="mini" label-width="100px">
        <div class="hd-form hd-form-dd">
          <div class="form-item">
            <div class="form-input-section">
              <el-form-item label="容器/拣货单">
                <el-input
                  ref="containerCodeOrPickCode"
                  v-model="containerCodeOrPickOrderNo"
                  clearable
                  :disabled="disabledStr2"
                  @keyup.enter.native="scanPickOrderNo"
                />
              </el-form-item>
              <el-form-item label="产品编码">
                <el-input
                  ref="scanSkuRefCode"
                  v-model="skuCode"
                  clearable
                  :disabled="disabledStr3"
                  @keyup.enter.native="scanSkuCode"
                />
              </el-form-item>
              <el-form-item label="待分拣数量">
                <el-input ref="scanSowQty" v-model.number="sowQty" :disabled="disabledStr4" type="number" min="0" @keyup.enter.native="saveSowScanRecord" />
              </el-form-item>
            </div>
            <div class="form-btn-section">
              <el-button
                type="primary"
                size="mini"
                :disabled="disabledprintPSD"
                @click.native="printPSD"
              >波次打印(F1)</el-button>
              <el-button type="primary" size="mini" @click="forcePick">强制分拣(F2)</el-button>
            </div>
          </div>

          <div class="form-text">
            <p class="tit">应播数</p>
            <strong class="txt-yellow">{{ totalPickQty || 0 }}</strong>
          </div>
          <div class="form-text">
            <p class="tit">已播数</p>
            <strong class="txt-green">{{ totalSowQty || 0 }}</strong>
          </div>
        </div>
      </el-form>
    </div>
    <div class="sow-wrap-bd">
      <div class="cont-left" :style="'width:'+lyWith+'px'">
        <el-form ref="form" :inline="true" label-width="100px" size="mini" class="sow-wrap-form sow-wrap-form-dd">
          <div class="wrap-bd-form">
            <div class="wrap-bd-form-left">
              <el-form-item label="拣货单号">
                <el-input v-model="pickOrderNo" disabled />
              </el-form-item>
              <el-form-item label="产品名称" class="skuNameClass">
                <el-input v-model="skuName" disabled />
              </el-form-item>
              <!--<el-form-item label="规格型号">-->
              <!--<el-input v-model="spec" disabled type="text"></el-input>-->
              <!--</el-form-item>-->
            </div>
            <div class="wrap-bd-form-right">
              <el-button
                type="primary"
                size="mini"
                @click="showPickOrderInfo"
              >拣货容器</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="showSowInfo"
              >分拣信息</el-button>
              <el-button type="primary" @click.native="resetBtn">重置(F3)</el-button>
            </div>
          </div>
        </el-form>
        <div class="sow-section">
          <div
            class="sow-mini-block"
            :style="'height:' + sowSectionHeight + 'px'"
          >
            <!-- <div
              class="mini-block-item"
              v-for="i in 20"
              :key="i"
            >
              <div
                :style="'height:'+sowItemHeight+'px;line-height:'+sowItemHeight+'px;font-size:'+sowItemHeight/2+'px'"
                class="state-disabled"
              >
                {{ i }}
              </div>
            </div> -->
            <div
              v-for="(item, index) in lstSowCodesList"
              :key="index"
              class="mini-block-item"
            >
              <div
                class="state-disabled"
                :style="'height:'+sowItemHeight+'px;line-height:'+sowItemHeight+'px;font-size:'+sowItemHeight/2+'px'"
                :class="[
                  {
                    'block-state': item.sowFlat === 0,
                    'state-green': item.sowFlat === 2,
                    'state-yellow': item.sowFlat === 1,
                    'select-state': item.sowLotCode === sowCode && item.sowFlat != 2,
                  },
                ]"
              >
                {{ item.sowLotCode }}
              </div>
            </div>
          </div>
          <zhqcTable
            :data.sync="tableInfo.data"
            :field-list="tableInfo.fieldList"
            :handle="null"
            :height="sectionHeight - sowSectionHeight"
            @handleEvent="handleEvent"
          />
        </div>
      </div>
      <div class="cont-right">
        <div class="cont-right-bd">
          <div id="divSowCode" class="sow-large-block">
            {{ sowCode }}
          </div>
          <ul class="sow-tips">
            <li><span class="tips-green" />完成播种</li>
            <li><span class="tips-yellow" />播种中</li>
            <li><span class="tips-gray" />未播种</li>
            <li><span class="tips-disable" />不播种</li>
          </ul>
        </div>
      </div>
    </div>

    <zhqc-dialog
      :title="dialogInfo.title"
      :visible.sync="dialogInfo.visible"
      :width="dialogInfo.width"
      :bt-list="dialogInfo.btList"
    >
      <zhqcTable
        :data.sync="dialogTableInfo.data"
        :field-list="dialogTableInfo.fieldList"
        :handle="null"
        :height="350"
      />
    </zhqc-dialog>
  </div>
</template>

<script>
import { getLodop } from '../../../../utils/LodopFuncs'
import zhqcTable from '@/Subassembly/ZhqcRowClassTable'

export default {
  name: 'Sow',
  components: {
    zhqcTable
  },
  data() {
    return {
      selectIndex: '',
      lyWith: '',
      sowItemHeight: '',
      sectionHeight: '100%',
      store: 'sow/',
      modName: 'sow',
      containerCodeOrPickOrderNo: null,
      sowContainerCode: null,
      pickOrderNo: null,
      skuCode: null,
      spec: null,
      skuCodeKey: null,
      skuName: null,
      sowCode: null,
      sowQty: null,
      totalPickQty: null,
      totalSowQty: null,
      disabledStr1: true,
      disabledStr2: false,
      disabledStr3: true,
      disabledStr4: true,
      lstSowCodesList: [],
      disabledprintPSD: false,
      tableInfo: {
        data: [],
        fieldList: null, // 表格列集合
        handle: {
          // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '100', // 默认操作按钮列宽度
          btList: [
            // 添加操作按钮
            // 默认查看按钮
            {
              label: this.$t('table.delete'),
              type: 'danger',
              icon: '',
              show: true,
              event: 'deleteData'
            }
          ]
        }
      },
      dialogTableInfo: {
        data: [],
        fieldList: null // 表格列集合
      },
      dialogInfo: {
        title: '',
        width: '1300px',
        visible: false,
        type: '',
        btList: []
      }
    }
  },
  computed: {
    getSidebarOpenStatus() {
      return this.$store.state.tagsView.sidebar.opened
    },
    sowSectionHeight() {
      if (this.sowItemHeight) {
        return (this.sowItemHeight + 20) * 2
      } else {
        return this.sectionHeight - this.sectionHeight / 3
      }
    }
  },
  watch: {
    getSidebarOpenStatus() {
      setTimeout(() => {
        this.layoutWith(this)
      }, 350)
    }
  },
  mounted() {
    this.setTableField()
    this.layoutHeight(this)
    this.layoutWith(this)
    this.sowCode = '*'
    this.$refs.containerCodeOrPickCode.focus()

    const that = this
    window.onresize = () => {
      that.layoutHeight(that)
      that.layoutWith(that)
    }
  },
  destroyed() {
    window.onresize = null
  },
  methods: {
    rowClick(row) {
      this.selectIndex = row.rowIndex
      if (row.unSowQty < 1) return
      this.skuCode = row.skuCode
      this.scanSkuCode()
    },
    setTableField() {
      this.tableInfo.fieldList = [
        {
          prop: 'unSowQty',
          label: this.$t('sow.waitPickQty'),
          minWidth: 100
        },
        { prop: 'sowQty', label: this.$t('sow.pickQty'), minWidth: 100 },
        {
          prop: 'pickQty',
          label: this.$t('sow.totelPickQty'),
          minWidth: 100
        },
        { prop: 'barcode', label: this.$t('sow.barcode'), minWidth: 120 },
        { prop: 'skuCode', label: this.$t('sow.skuCode'), minWidth: 120 },
        { prop: 'skuName', label: this.$t('sow.skuName'), minWidth: 100 },
        { prop: 'tradeName', label: this.$t('sow.tradeName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('sow.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('sow.mainUnit'), minWidth: 100 },
        { prop: 'perQty', label: this.$t('sow.perQty'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('sow.drugForm'), minWidth: 100 },
        { prop: 'mfg', label: this.$t('sow.mfg'), minWidth: 100 },
        {
          prop: 'originCountry',
          label: this.$t('sow.originCountry'),
          minWidth: 100
        },
        {
          prop: 'approvalNumber',
          label: this.$t('sow.approvalNumber'),
          minWidth: 100
        }
      ]
    },
    // 强制分拣
    forcePick() {
      if (this.$isEmpty(this.pickOrderNo)) {
        this.$message.error('请先扫描拣货单号')
        return
      }
      this.$confirm(this.$t('确定要强制分拣吗？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.forceSow()
      })
    },
    // 查看拣货容器
    showPickOrderInfo() {
      if (this.$isEmpty(this.pickOrderNo)) {
        this.$message.error('请先扫描拣货单号')
        return
      }

      this.dialogInfo.title = '查看拣货容器'
      this.dialogInfo.visible = true
      this.dialogTableInfo.fieldList = [
        {
          prop: 'index',
          label: this.$t('table.id'),
          type: 'index',
          minWidth: 50
        },
        { prop: 'containerNo', label: this.$t('拣货容器'), minWidth: 100 },
        { prop: 'pickOrderNo', label: this.$t('拣货单号'), minWidth: 120 },
        { prop: 'waveNo', label: this.$t('波次单号'), minWidth: 120 },
        { prop: 'soNo', label: this.$t('SO单号'), minWidth: 130 },
        { prop: 'pickQty', label: this.$t('sow.totelPickQty'), minWidth: 100 },
        { prop: 'sowQty', label: this.$t('sow.pickQty'), minWidth: 100 },
        { prop: 'unSowQty', label: this.$t('sow.waitPickQty'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('sow.barcode'), minWidth: 120 },
        { prop: 'skuCode', label: this.$t('sow.skuCode'), minWidth: 120 },
        { prop: 'skuName', label: this.$t('sow.skuName'), minWidth: 100 },
        { prop: 'tradeName', label: this.$t('sow.tradeName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('sow.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('sow.mainUnit'), minWidth: 100 },
        { prop: 'perQty', label: this.$t('sow.perQty'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('sow.drugForm'), minWidth: 100 },
        { prop: 'mfg', label: this.$t('sow.mfg'), minWidth: 100 },
        {
          prop: 'originCountry',
          label: this.$t('sow.originCountry'),
          minWidth: 100
        },
        {
          prop: 'approvalNumber',
          label: this.$t('sow.approvalNumber'),
          minWidth: 100
        },
        { prop: 'opUser', label: this.$t('拣货员'), minWidth: 100 },
        { prop: 'opTime', label: this.$t('拣货时间'), minWidth: 120 }
      ]

      this.$store.dispatch(this.store + 'queryPickContainerInfo', this.pickOrderNo).then(() => {
        const queryPickContainerInfoResp = this.$store.state[this.modName].queryPickContainerInfoResp
        if (queryPickContainerInfoResp.code === this.$successCode) {
          this.dialogTableInfo.data = queryPickContainerInfoResp.obj
        }
      })
    },
    // 查看分拣信息
    showSowInfo() {
      if (this.$isEmpty(this.pickOrderNo)) {
        this.$message.error('请先扫描拣货单号')
        return
      }
      this.dialogInfo.title = '查看分拣信息'
      this.dialogInfo.visible = true
      this.dialogTableInfo.fieldList = [
        {
          prop: 'index',
          label: this.$t('table.id'),
          type: 'index',
          minWidth: 50
        },
        { prop: 'pickOrderNo', label: this.$t('拣货单号'), minWidth: 120 },
        { prop: 'waveNo', label: this.$t('波次单号'), minWidth: 120 },
        { prop: 'soNo', label: this.$t('SO单号'), minWidth: 130 },
        { prop: 'pickQty', label: this.$t('sow.totelPickQty'), minWidth: 100 },
        { prop: 'sowCode', label: this.$t('格子号'), minWidth: 100 },
        { prop: 'sowQty', label: this.$t('sow.pickQty'), minWidth: 100 },
        { prop: 'unSowQty', label: this.$t('sow.waitPickQty'), minWidth: 100 },
        { prop: 'barcode', label: this.$t('sow.barcode'), minWidth: 120 },
        { prop: 'skuCode', label: this.$t('sow.skuCode'), minWidth: 120 },
        { prop: 'skuName', label: this.$t('sow.skuName'), minWidth: 100 },
        { prop: 'tradeName', label: this.$t('sow.tradeName'), minWidth: 100 },
        { prop: 'spec', label: this.$t('sow.spec'), minWidth: 100 },
        { prop: 'mainUnit', label: this.$t('sow.mainUnit'), minWidth: 100 },
        { prop: 'perQty', label: this.$t('sow.perQty'), minWidth: 100 },
        { prop: 'drugForm', label: this.$t('sow.drugForm'), minWidth: 100 },
        { prop: 'mfg', label: this.$t('sow.mfg'), minWidth: 100 },
        {
          prop: 'originCountry',
          label: this.$t('sow.originCountry'),
          minWidth: 100
        },
        {
          prop: 'approvalNumber',
          label: this.$t('sow.approvalNumber'),
          minWidth: 100
        },
        { prop: 'opUser', label: this.$t('操作员'), minWidth: 100 },
        { prop: 'opTime', label: this.$t('操作时间'), minWidth: 120 }
      ]

      this.$store
        .dispatch(this.store + 'querySowInfo', this.pickOrderNo)
        .then(() => {
          const querySowInfoResp = this.$store.state[this.modName].querySowInfoResp
          if (querySowInfoResp.code === this.$successCode) {
            this.dialogTableInfo.data = querySowInfoResp.obj
          }
        })
    },
    /**
     * 扫描/输入播种墙,回车事件
     */
    scanSowContainerCode() {
      this.$store
        .dispatch(this.store + 'scanSowContainerCode', this.sowContainerCode)
        .then(() => {
          const resp = this.$store.state[this.modName].scanSowContainerCodeResp
          if (resp.code === this.$store.state[this.modName].successCode) {
            this.disabledStr1 = true
            this.disabledStr2 = false
            //
            this.$nextTick(() => {
              this.$refs.containerCodeOrPickCode.focus()
            })
          } else {
            this.sowContainerCode = null
          }
        })
    },

    /**
     * 扫描/输入拣货单号,回车事件
     */
    scanPickOrderNo() {
      const data = { pickOrderNo: this.containerCodeOrPickOrderNo }
      this.$store.dispatch(this.store + 'scanPickOrderNo', data).then(() => {
        const resp = this.$store.state[this.modName].scanPickOrderNoResp
        if (resp.code === this.$store.state[this.modName].successCode) {
          this.disabledStr2 = true
          this.disabledStr3 = false
          this.pickOrderNo = resp.obj.pickOrderNo
          this.totalPickQty = resp.obj.totalPickQty
          this.totalSowQty = resp.obj.totalSowQty
          this.sowContainerCode = resp.obj.containerCode
          this.lstSowCodesList = resp.obj.lstSowCodes
          this.tableInfo.data = resp.obj.lstSowPickInfo
          this.$nextTick(() => {
            this.layoutWith(this)
            this.$refs.scanSkuRefCode.focus()
          })
        } else {
          this.containerCodeOrPickOrderNo = null
        }
      })
    },

    /**
     * 扫描/输入产品编码,回车事件
     */
    scanSkuCode() {
      if (!this.sowContainerCode) {
        this.$message.error('请先扫描或输入容器/拣货单')
        return
      }

      if (!this.skuCode) {
        this.$message.error('产品编码不能为空')
        return
      }

      const data = {
        sowContainerCode: this.sowContainerCode,
        pickOrderNo: this.pickOrderNo,
        skuCode: this.skuCode
      }
      this.$store.dispatch(this.store + 'scanSkuCode', data).then(() => {
        const resp = this.$store.state[this.modName].scanSkuCodeResp
        if (resp.code === this.$store.state[this.modName].successCode) {
          this.skuName = resp.obj.skuName
          this.sowCode = resp.obj.sowCode
          this.sowQty = resp.obj.sowQty
          this.skuCodeKey = resp.obj.skuCode

          this.totalPickQty = resp.obj.totalPickQty
          this.totalSowQty = resp.obj.totalSowQty
          this.lstSowCodesList = resp.obj.lstSowCodes
          this.tableInfo.data = resp.obj.lstSowPickInfo
          if (this.totalPickQty === this.totalSowQty) {
            this.resetBtn()
          }
          this.$nextTick(() => {
            this.layoutWith(this)
          })
          // 语音配置
          // this.$speechSynMsg.text = `请放入第 ${ resp.obj.sowCode } 个格子`;
          // this.$speechSynMsg.text = `${resp.obj.sowCode}号`;
          if (resp.obj.jumpScanQty) {
            this.$speechSynMsg.text = `请输入数量`
            this.$nextTick(() => {
              this.disabledStr3 = true
              this.disabledStr4 = false
              // this.$refs.scanSowQty.focus();
              const that = this
              setTimeout(function() {
                that.$refs.scanSowQty.focus()
              }, 100)
            })
          } else {
            this.skuCode = null
            this.disabledStr3 = false
            this.$nextTick(() => {
              this.$refs.scanSkuRefCode.focus()
            })
          }
          this.$speechSynMsg.lang = 'zh-CN'
          this.$speechSynMsg.volume = 1
          this.$speechSynMsg.rate = 1
          this.$speechSynMsg.pitch = 1
          // this.$speechSynthesis.speak(this.$speechSynMsg);
          // let signSucc = new Audio();
          // signSucc.src = require("../../../../../static/skin/default/sound/"+ resp.obj.sowCode+"号.wav");
          // signSucc.play();

          const signSucc = new Audio()
          signSucc.src = require('../../../../assets/sound/' + resp.obj.sowCode + '号.wav')
          signSucc.play()
          signSucc.loop = false
          signSucc.addEventListener('ended', function() {
            // 监听到播放结束后，在此处可调用自己的接口
            if (resp.obj.jumpScanQty) {
              const signSucc1 = new Audio()
              signSucc1.src = require('../../../../assets/sound/inputQty.wav')
              signSucc1.play()
            }
          }, false)
        } else {
          this.skuCode = null
        }
      })
    },

    /**
     * 待分拣数量,回车事件
     */
    saveSowScanRecord() {
      if (!this.sowContainerCode) {
        this.$message.error('请先扫描或输入容器/拣货单')
        return
      }
      if (!this.skuCode) {
        this.$message.error('请先扫描或输入产品编码')
        return
      }
      const data = {
        sowContainerCode: this.sowContainerCode,
        pickOrderNo: this.pickOrderNo,
        skuCode: this.skuCodeKey,
        sowCode: this.sowCode,
        sowQty: this.sowQty
      }
      this.$store.dispatch(this.store + 'saveSowScanRecord', data).then(() => {
        const resp = this.$store.state[this.modName].saveSowScanRecordResp
        if (resp.code === this.$store.state[this.modName].successCode) {
          this.disabledStr3 = false
          this.disabledStr4 = true
          // this.totalSowQty =  parseInt(this.totalSowQty) + parseInt(this.sowQty);
          this.totalPickQty = resp.obj.totalPickQty
          this.totalSowQty = resp.obj.totalSowQty
          this.skuCode = null
          this.skuName = null
          this.sowQty = null
          this.lstSowCodesList = resp.obj.lstSowCodes
          this.tableInfo.data = resp.obj.lstSowPickInfo
          if (this.totalPickQty === this.totalSowQty) {
            this.resetBtn()
          }
          this.$nextTick(() => {
            this.layoutWith(this)
            this.$refs.scanSkuRefCode.focus()
          })
        }
      })
    },

    /**
     * 重置
     */
    resetBtn() {
      this.containerCodeOrPickOrderNo = null
      this.sowContainerCode = null
      this.pickOrderNo = null
      this.skuCode = null
      this.skuCodeKey = null
      this.skuName = null
      this.sowQty = null
      this.totalPickQty = null
      this.totalSowQty = null
      this.disabledStr1 = true
      this.disabledStr2 = false
      this.disabledStr3 = true
      this.disabledStr4 = true
      this.disabledprintPSD = false
      this.sowCode = '*'
      this.$refs.containerCodeOrPickCode.focus()
      this.lstSowCodesList = []
      this.tableInfo.data = []
    },

    // 打印送货单
    printPSD() {
      if (this.$isEmpty(this.pickOrderNo)) {
        this.$message.error('请先扫描拣货单号')
        return
      }
      this.disabledprintPSD = true // 页面校验通过后,马上禁用打印按钮
      this.$showLoading()
      this.$store
        .dispatch(this.store + 'printDeliveryNote', this.pickOrderNo)
        .then(() => {
          const printResp = this.$store.state[this.modName].printDeliveryNoteResp
          if (printResp.code === this.$successCode) {
            const printList = printResp.obj

            const LODOP = getLodop()
            for (let i = 0; i < printList.length; i++) {
              const res = printList[i]
              const soNo = res.soNo// so单号
              const printData = res.printData// 打印数据
              LODOP.SET_PRINT_MODE('POS_BASEON_PAPER', true)
              LODOP.PRINT_INIT('送货单')
              LODOP.ADD_PRINT_BARCODE(15, 30, '90mm', '15mm', '128Auto', soNo)
              LODOP.ADD_PRINT_HTM(10, 10, 'RightMargin:1mm', 'BottomMargin:1mm', printData)
              LODOP.SET_PRINT_STYLEA(0, 'ShowBarText', 0)
              LODOP.PRINT()
              // LODOP.PREVIEW();//打印预览
            }
          } else {
            this.disabledprintPSD = false // 请求后台失败,将打印按钮放开
          }
        }).finally(() => {
          this.$hideLoading()
        })
    },

    // 强制播种
    forceSow() {
      if (this.$isEmpty(this.pickOrderNo)) {
        this.$message.error('请先扫描拣货单号')
        return
      }
      this.$store
        .dispatch(this.store + 'forceSow', this.pickOrderNo)
        .then(() => {
          const forceSowResp = this.$store.state[this.modName].forceSowResp
          if (forceSowResp.code === this.$successCode) {
            this.$message.success(forceSowResp.msg)
            this.totalPickQty = forceSowResp.obj.totalPickQty
            this.totalSowQty = forceSowResp.obj.totalSowQty
            if (this.totalPickQty === this.totalSowQty) {
              this.resetBtn()
            }
            this.lstSowCodesList = forceSowResp.obj.lstSowCodes
            this.tableInfo.data = forceSowResp.obj.lstSowPickInfo
          }
        })
    },

    handleKeyDone(key) {
      if (key < 112 || key > 114) {
        return
      }
      if (key == 112) {
        // F1
        this.printPSD()
      } else if (key == 113) {
        // F2
        this.forceSow()
      } else if (key == 114) {
        // F3
        this.resetBtn()
      }
      window.event.preventDefault()
    },

    // 计算 表格高度
    layoutHeight(that) {
      that.sectionHeight =
        that.getNodeHeight('.cont-left') - that.getNodeHeight('.sow-wrap-form')
    },
    getNodeHeight(el) {
      return document.querySelector(el).offsetHeight
    },

    layoutWith(that) {
      // that.lyWith = that.getNodeWidth('.sow-wrap-bd') - that.getNodeWidth('.cont-right');
      that.lyWith = that.getNodeWidth('.sow-wrap-bd') - 300
      that.sowItemHeight = that.getNodeWidth('.state-disabled')
    },
    getNodeWidth(el) {
      if (document.querySelector(el)) {
        return document.querySelector(el).offsetWidth
      } else {
        return ''
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
  .skuNameClass input{
    min-width: 422px;
  }
  .hd-form-dd .el-input__inner,
  .sow-wrap-form-dd .el-input__inner{
    width: 158px !important;
  }
  /* .sow-wrap-form-dd .el-input__inner  {
    width: 250px !important;
  } */
</style>
<style lang="scss" scoped>
/deep/.el-input.is-disabled .el-input__inner{
  color: #222;
  font-size: 15px;
}
.el-form--inline .el-form-item{
  margin-right: 5px;
}
.form-input-section{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

/deep/.sow-wrap{
  .el-form-item__label{
    font-size: 16px;
  }
}
/*播种*/
.sow-wrap {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.sow-wrap-bd {
  display: flex;
  flex: 1;
  height: calc(100vh - 168px);
}
.sow-wrap-bd .cont-left {
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}
.sow-wrap-bd .cont-right {
  width: 250px;
  height: 100%;
  border-left: 1px solid #ddd;
  position: relative;
}
.cont-right-bd {
  padding-bottom: 130px;
  overflow-y: auto;
  height: 100%;
  box-shadow: -4px 0 6px rgba(0, 0, 0, 0.02);
}
.cont-right-ft {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #fff;
  width: 100%;
  padding: 20px;
  border-top: 1px solid #ddd;
}
.right-ft-btn .el-button--primary {
  width: 100%;
}
.right-ft-btn .el-button--success {
  width: 100%;
}
.hd-form {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  padding: 5px 15px;
  background-color: #f5f5f5;
}
.form-item,
.form-text {
  margin-right: 15px;
}
.form-text:last-child {
  margin-right: 0;
}
.form-item {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.txt-size {
  font-size: 20px;
  font-weight: 700;
}
.form-text {
  width: 110px;
  text-align: center;
}
.form-text strong {
  display: inline-block;
  line-height: 26px;
  font-size: 26px;
}
.form-text strong.txt-yellow {
  color: #ff9501;
}
.form-text strong.txt-green {
  color: #34c85a;
}
.form-item .el-form-item--mini.el-form-item,
.form-item .el-form-item--small.el-form-item {
  margin-bottom: 0 !important;
}
.sow-large-block {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 250px;
  font-size: 100px;
  font-weight: 900;
}
.sow-tips {
  margin: 15px 0 0 15px;
  list-style: none;
}
.sow-tips li {
  margin-bottom: 10px;
  font-weight: 700;
}
.sow-tips li span {
  display: inline-block;
  width: 40px;
  height: 14px;
  background-color: #f5f5f5;
  margin-right: 4px;
  vertical-align: middle;
}
.sow-tips li span.tips-green {
  background-color: #34c85a;
}
.sow-tips li span.tips-yellow {
  background-color: #ff9501;
}
.sow-tips li span.tips-gray {
  background-color: #f3f5fb;
}
.sow-tips li span.tips-disable {
  background-color: #d7d7d7;
}
.wrap-bd-form {
  display: flex;
  padding: 5px 15px;
  align-items: center;
  justify-content: space-between;
}
/deep/.wrap-bd-form .wrap-bd-form-left {
  // flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .el-form-item {
    // flex: 1;
    // margin-right: 5px;
    margin-bottom: 0;
    .el-form-item__label {
      // padding: 0;
    }
  }
}
.wrap-bd-form .wrap-bd-form-right {
  // flex: 1;
  // margin-top: 10px;
}
.wrap-bd-form .wrap-bd-form-right .txt-big {
  font-size: 28px;
  font-weight: 700;
}
.sow-section {
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}
.sow-mini-block {
  flex: 1;
  padding: 5px 0 5px 15px;
  width: 100%;
  height: auto;
  overflow-y: auto;
}
.sow-mini-block:after {
  content: " ";
  display: table;
  clear: both;
}
.sow-mini-block .mini-block-item {
  width: 10%;
  float: left;
  padding-right: 15px;
  margin-bottom: 15px;
}
.sow-mini-block .mini-block-item:nth-child(10n + 10) {
  // padding-right: 0;
}
.mini-block-item .state-disabled.block-state {
  cursor: pointer;
  background-color: #f3f5fb;
  color: #333;
}
.mini-block-item .state-disabled.state-green {
  cursor: pointer;
  color: #fff;
  background-color: #34c85a;
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
}
.mini-block-item .state-disabled.state-yellow {
  cursor: pointer;
  color: #fff;
  background-color: #ff9501;
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
}
.mini-block-item .state-disabled.select-state {
  cursor: pointer;
  color: #fff;
  background: #00c6ff;
  background-image: -webkit-linear-gradient(45deg,#00c6ff,#0072ff);
  background-image: linear-gradient(45deg,#00c6ff,#0072ff);
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
}
.mini-block-item .state-disabled {
  color: #a9a9a9;
  cursor: not-allowed;
  background-color: #d7d7d7;
  text-align: center;
  font-size: 62px;
  font-weight: 700;
  // padding: 10px 0;
}
.tit{
  font-size: 15px;
}
/*播种 END*/

@media screen and (max-width: 1366px) {
  /deep/.el-form--inline .el-form-item{
    width: 160px;
    .el-form-item__label{
      text-align: left;
    }
  }
}
</style>
