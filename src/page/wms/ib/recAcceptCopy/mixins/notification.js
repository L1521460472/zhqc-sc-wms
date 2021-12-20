// 自定义事件处理
import {
  deleteRec,
  initRecPage,
  saveRecInfo,
  saveSkuPackageInfo,
  scannOrderNo,
  scannProductionBatch,
  scannSku,
  querySkuElectrSuperviseCode
} from '../api'
import { formatDate } from '@/utils/date'

export default {
  methods: {
    /**
     * 初始化数据
     */
    initData() {
      initRecPage().then(res => {
        if (res.code === 200) {
          this.listTypeInfo.deliveryMethodList = res.obj.arriveTypeList
          this.listTypeInfo.transportList = res.obj.shipToolList
          this.listTypeInfo.skuQualityList = res.obj.skuQualityList
        }
      })
    },
    /**
     * 查询
     */
    search() {
      this.topForm.ref.validate(valid => {
        if (valid) { // 查询表单校验
          this.initData()
        }
      })
    },
    /**
     * 输入ASN号/源单号 查入库单等信息 回车回调方法
     */
    asnNoAndAsnSource() {
      if (this.isEmpty(this.topForm.data.orderNo)) {
        this.$message.error('请先输入ASN号/来源单号!')
        return
      }
      this.topForm.data.orderNo = this.topForm.data.orderNo.trim()
      scannOrderNo(this.topForm.data.orderNo).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.orderNoDisabled = true
          this.skuCodeDisabled = false
          this.asnNoForm = {
            orderNo: this.topForm.data.orderNo,
            inOrderNo: res.obj.inOrderNo,
            cusOrderNo: res.obj.cusOrderNo,
            orderType: res.obj.orderType,
            orderTypeName: res.obj.orderTypeName,
            asnSource: res.obj.asnSource,
            asnSourceName: res.obj.asnSourceName,
            remark: res.obj.remark,
            origPlatform: res.obj.origPlatform,
            buyer: res.obj.buyer
          }
          this.topForm.data = JSON.parse(JSON.stringify(this.asnNoForm))
          this.tableInfo1.data = res.obj.dshSkuInfoList
          this.tableInfo2.data = res.obj.recSkuInfoList
          this.$refs.containerNo.focus()
          if (res.obj.supList && res.obj.supList.length > 0) { // 是否显示印章印模
            this.isShowSeal = true
            this.sealList = res.obj.supList
          }
          setTimeout(() => {
            this.handleTab()
          }, 100)
        } else {
          const orderNo = this.topForm.data.orderNo
          this.topForm.data.orderNo = ''
          setTimeout(() => {
            this.$set(this.topForm.data, 'orderNo', orderNo)
          }, 0)
        }
      })
    },

    /**
     * 输入容器（托盘） 验证容器信息 回车回调方法
     */
    scannContainerNo() {
      this.$refs.skuCode.focus()
      this.asnNoForm.containerNo = this.topForm.data.containerNo
    },
    /**
     * 输入产品条码 回车回调方法
     */
    scannSkuNo() {
      if (this.isEmpty(this.topForm.data.orderNo)) {
        this.$message.error('请先输入ASN号/来源单号!')
        return
      }
      if (this.isEmpty(this.topForm.data.skuCode)) {
        this.$message.error('请先输入商品条码/商品编码!')
        return
      }
      this.topForm.data.skuCode = this.topForm.data.skuCode.trim()
      const params = {
        orderNo: this.topForm.data.orderNo,
        skuCodeOrBarcode: this.topForm.data.skuCode
      }
      scannSku(params).then(res => {
        const containerNo = this.topForm.data.containerNo
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.initInvBatchAttr(res.obj)
          this.topForm.data = {
            containerNo: this.topForm.data.containerNo,
            ...this.asnNoForm,
            ...res.obj
          }
          if (res.obj.supList && res.obj.supList.length > 0) { // 是否显示印章印模
            this.isShowSeal = true
            this.sealList = res.obj.supList
          }
          this.isSaveBtnDisabled = false
          if (res.obj.perFlag === 0) { // 商品没有维护大包装
            this.setGoodsPackageInfo(res.obj)
            return
          }
          if (res.obj.coldFlag === 1) { // 商品为冷链产品
            this.setColdChainInfo(res.obj)
          }
          this.$set(this.rightForm, 'purchasePrice', res.obj.amountY)
          this.$refs.scatteredQty.focus()
        } else {
          const skuCode = this.topForm.data.skuCode
          this.topForm.data.skuCode = ''
          setTimeout(() => {
            this.$set(this.topForm.data, 'skuCode', skuCode)
          }, 0)
        }
        setTimeout(() => {
          this.$set(this.topForm.data, 'containerNo', containerNo)
        }, 0)
      })
    },

    /**
     * 保存收货记录,如果需要采集药监码,打开药监码采集页面
     */
    saveRecInfoFn() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 打开监管码采集页面
          if (this.topForm.data.isDrugSuperCode == 1) {
            this.openGatherDrugSupervisionCode()
            // 保存收货记录
          } else {
            this.saveRecInfo()
          }
        }
      })
    },
    /**
     * 保存收货记录
     */
    saveRecInfo() {
      if (this.isEmpty(this.rightForm.rejectQty)) {
        this.rightForm.rejectQty = 0
      }
      if (this.isEmpty(this.rightForm.recPkgQty)) {
        this.rightForm.recPkgQty = 0
      }
      if (this.isEmpty(this.rightForm.recPkgQty)) {
        this.rightForm.recPkgQty = 0
      }
      const params = {
        ...this.topForm.data,
        ...this.rightForm,
        batchAttrMap: this.diaFormInfoAttr.data
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$showLoading()
          saveRecInfo(params).then(res => {
            const containerNo = this.topForm.data.containerNo
            if (res.code === 200) {
              this.$message.success(res.msg)
              if (!this.isEmpty(res.obj.msg)) {
                this.$message.success(res.obj.msg)
                this.resetDataInfo()
              } else {
                this.$message.success(res.msg)
                this.topForm.data.skuCode = ''
                this.skuCodeOpt = null
                this.tableInfo1.data = res.obj.dshSkuInfoList
                this.tableInfo2.data = res.obj.recSkuInfoList
                setTimeout(() => {
                  this.$set(this.topForm.data, 'containerNo', containerNo)
                }, 0)
                this.$refs.skuCode.focus()
              }
            } else {
              setTimeout(() => {
                this.$set(this.topForm.data, 'containerNo', containerNo)
              }, 0)
            }
          }).finally(() => {
            this.$hideLoading()
          })
        }
      })
    },

    // 删除收货记录
    deleteFn(data) {
      this.$confirm(this.$t('确认删除该条收货记录吗？'), {
        type: 'warning',
        center: true
      }).then(() => {
        const param = {
          recInfoId: data.recInfoId,
          orderNo: this.topForm.data.orderNo
        }
        deleteRec(param).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg)
            this.tableInfo1.data = res.obj.dshSkuInfoList
            this.tableInfo2.data = res.obj.recSkuInfoList
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },

    // 批次属性 动态字段处理方法
    initInvBatchAttr(entity) {
      const invBatchRule = entity.invBatchRule
      if (!invBatchRule) {
        this.$set(this.diaFormInfoAttr, 'data', {})
        this.diaFormInfoAttr.fieldList = []
        return false
      }
      const invBatchPO = entity.invBatchPO
      const fieldList = []
      const attrData = {}
      const fieldDisabled = invBatchPO != null
      this.diaFormInfoAttr.data = {}
      const rules = {}
      invBatchRule.dtList.forEach(item => {
        let field = {}
        if (item.batchAttrFormat === 'DATE') {
          field = { value: item.batchAttr, label: item.batchAttrKey, type: 'date', format: item.showFormat, valueFormat: item.showFormat, disabled: fieldDisabled }
        } else {
          field = { value: item.batchAttr, label: item.batchAttrKey, type: 'input', disabled: fieldDisabled }
        }
        if (item.isRequired && item.isRequired === 1) {
          // let ruleData = [{ required: true, message: "请录入" + item.batchAttrKey, trigger: 'blur' }];
          rules[item.batchAttr] = [{ required: true, message: '请录入' + item.batchAttrKey, trigger: 'blur' }]
        }
        fieldList.push(field)
        if (invBatchPO) {
          attrData[item.batchAttr] = invBatchPO[item.batchAttrColumn]
        } else {
          if (item.batchAttrColumn === 'instoreDate') {
            attrData[item.batchAttr] = formatDate(new Date(), item.showFormat)
            field.disabled = true
          } else if (item.batchAttrColumn === 'asnNo') {
            attrData[item.batchAttr] = entity.asnNo
            field.disabled = true
          } else {
            attrData[item.batchAttr] = null
          }
        }
      })
      this.$set(this.diaFormInfoAttr, 'data', attrData)
      this.diaFormInfoAttr.fieldList = fieldList
      if (!invBatchPO) {
        this.diaFormInfoAttr.rules = rules
      }
      if (this.diaFormInfoAttr.ref) {
        this.diaFormInfoAttr.ref.resetFields()
      }
    },

    /**
     * 输入生产批号 查生产日期、有效期至等信息 回车回调方法
     */
    scannProductionBatch() {
      if (this.isEmpty(this.diaFormInfoAttr.data.productionBatch)) {
        return
      }
      const params = {
        skuId: this.topForm.data.skuId,
        productionBatch: this.diaFormInfoAttr.data.productionBatch
      }
      scannProductionBatch(params).then(res => {
        if (res.code === 200) {
          if (!this.diaFormInfoAttr.data.productionDate) {
            this.$set(this.diaFormInfoAttr.data, 'productionDate', res.obj.productDate)
          }
          if (!this.diaFormInfoAttr.data.invalidDate) {
            this.$set(this.diaFormInfoAttr.data, 'invalidDate', res.obj.invaliDate)
          }
        }
      })
    },

    /**
     * 判断是否为空
     * @param text
     * @returns boolean
     */
    isEmpty(text) {
      return typeof (text) == 'undefined' || !text || !text.toString().trim()
    },

    /**
     * 取消
     */
    close() {
      this.dialogInfo.visible = false
    },
    // 商品包装信息
    setGoodsPackageInfo() {
      this.dialogInfo.title = this.$t('returnRecAccept.goodsPackage')
      this.dialogInfo.width = '1000px'
      this.dialogInfo.visible = true
      this.dialogInfo.btList = [
        {
          label: this.$t('table.save'),
          type: 'primary',
          icon: '',
          event: 'saveGoodsPackageInfo',
          btLoading: false,
          show: true
        },
        { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true }
      ]
      this.dialogFormInfo.data = {}
      this.goodsPackageFormRules()
      this.goodsPackageFormInfo()
    },
    // 保存商品包装信息
    saveGoodsPackageInfo() {
      const params = {
        ...this.dialogFormInfo.data,
        asnNo: this.topForm.data.asnNo,
        skuId: this.topForm.data.skuId,
        skuCode: this.topForm.data.skuCode,
        companyCode: this.topForm.data.companyCode,
        creator: this.topForm.data.creator

      }
      this.dialogFormInfo.ref.validate(valid => {
        if (valid) {
          saveSkuPackageInfo(params).then(res => {
            if (res.code === 200) {
              this.$refs.skuCode.focus()
              this.topForm.data.perQty = this.dialogFormInfo.data.perQty
              this.dialogInfo.visible = false
              // 找到对应行数
              this.tableInfo1.data.forEach((value) => {
                if (value.skuId === this.topForm.data.skuId) {
                  value.perQty = this.topForm.data.perQty
                }
              })
              this.scannSkuNo()
            }
          })
        }
      })
    },

    // 冷链信息
    setColdChainInfo() {
      this.dialogInfo.title = this.$t('returnRecAccept.coldChain')
      this.dialogInfo.width = '1000px'
      this.dialogInfo.visible = true
      this.dialogInfo.btList = [
        // { label: this.$t('returnRecAccept.saveInput'), type: 'primary', icon: '', event: 'saveInputFn', btLoading: false, show: true },
        {
          label: this.$t('returnRecAccept.save'),
          type: 'primary',
          icon: '',
          event: 'saveFn',
          btLoading: false,
          show: true
        },
        { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true }
      ]
      this.dialogFormInfo.data = {}
      this.coldChainFormRules()
      this.coldChainFormInfo()
    },
    // 保存后继续录入
    saveInputFn() {
      this.dialogFormInfo.ref.validate(valid => {
        if (valid) {
          if (!this.topForm.data.coolReqList) {
            this.topForm.data.coolReqList = []
          }
          this.topForm.data.coolReqList.push(this.dialogFormInfo.data)
          this.dialogFormInfo.data.arriveTemp = ''
        }
      })
    },
    // 保存关闭
    saveFn() {
      this.dialogFormInfo.ref.validate(valid => {
        if (valid) {
          if (new Date(this.dialogFormInfo.data.shipTime) > new Date(this.dialogFormInfo.data.arriveTime)) {
            this.$message.error('到货时间不能小于启用时间')
            return
          }
          if (!this.topForm.data.coolReqList) {
            this.topForm.data.coolReqList = []
          }
          this.topForm.data.coolReqList.push(this.dialogFormInfo.data)
          this.dialogInfo.visible = false
          this.$refs.skuCode.focus()
        }
      })
    },
    // 印章印模
    showSeal() {
      this.dialogInfo.title = '印章印模'
      this.dialogInfo.width = '600px'
      this.dialogInfo.visible = true
      this.dialogInfo.btList = [
        { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true }
      ]
      this.dialogFormInfo.data = {}
      this.dialogFormInfo.fieldList = []
    },
    /**
     * 重置事件
     */
    resetDataInfo() {
      this.topForm.data.orderNo = ''
      this.skuCodeOpt = null
      this.orderNoDisabled = false
      this.skuCodeDisabled = true
      setTimeout(() => {
        this.$refs.orderNo.focus()
      }, 0)
    },
    // 按键盘 F1和F4 会执行的方法
    handleKeyDone(key) {
      if (key < 112 || key > 115) {
        return
      }
      if (key === 112) {
        console.log('F1')
        if (!this.multipleBatches) return
        this.nextBatch()
      } else if (key === 115) {
        console.log('F4')
        this.saveRecInfoFn()
      }
      window.event.preventDefault()
    },

    /**
     * 打开药监码采集页面
     */
    openGatherDrugSupervisionCode() {
      this.dialogInfoDrugSupervisionCode.visible = true
      const productionBatch = this.diaFormInfoAttr.data.productionBatch

      // 先清空之前的数据
      this.drugFrom = {}
      this.drugTable1DtList = []
      this.querySkuElectrSuperviseCode(productionBatch)

      this.drugFrom.originId = this.topForm.data.asnId
      this.drugFrom.originNo = this.topForm.data.asnNo
      this.drugFrom.ownerId = this.topForm.data.ownerId
      this.drugFrom.orderType = this.topForm.data.orderType
      this.drugFrom.skuName = this.topForm.data.skuName
      this.drugFrom.skuCode = this.topForm.data.skuCode
      this.drugFrom.skuId = this.topForm.data.skuId
      this.drugFrom.operator = this.topForm.data.operator
      this.drugFrom.originTypeName = '入库'
      this.drugFrom.originType = 'IN'
      this.drugFrom.productionBatch = productionBatch

      const tempObj = this.topForm.data
      tempObj.productionBatch = productionBatch
      this.drugTable1DtList.push(tempObj)
    },

    /**
     * 关闭药监码采集页面
     */
    closeGatherDrugSupervisionCode() {
      this.drugFrom = {}
      this.drugTable1DtList = []
      this.drugTable2DtList = []
      this.dialogInfoDrugSupervisionCode.visible = false
    },

    /**
     * 保存药监码成功,再调用保存收货记录方法
     * @param data
     */
    saveDrugSupervisionCodeSuccess(data) {
      this.dialogInfoDrugSupervisionCode.visible = data
      this.saveRecInfo()
    },

    /**
     * 查询商品批号电子监管码
     */
    querySkuElectrSuperviseCode(productionBatch) {
      const params = {
        originNo: this.topForm.data.asnNo,
        skuId: this.topForm.data.skuId,
        productionBatch: productionBatch
      }
      querySkuElectrSuperviseCode(params).then(res => {
        this.drugTable2DtList = res.obj
      })
    },
    initTable() {
      this.activeName = 'first'
      this.tableInfo1.height = 300 * Math.random()
      this.tableInfo2.height = 300 * Math.random()
    },
    handleChooseSku() {
      this.topForm.data.skuCode = this.skuCodeOpt
      this.scannSkuNo()
    }
  },

  beforeRouteEnter(to, form, next) {
    next((vm) => {
      document.onkeydown = function() {
        const key = window.event.keyCode
        vm.handleKeyDone(key)
      }
      vm.initTable()
    })
  },
  beforeRouteLeave(to, from, next) {
    document.onkeydown = null
    next()
  },
  // 页面初始化函数
  created() {
    this.initData()
    this.initTable()
    // this.initPage();
  }
}
