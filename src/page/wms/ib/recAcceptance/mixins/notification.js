// 自定义事件处理
import { initPage, scannOrderNo, scannSkuNo, saveRecInfo, deleteDt, saveSkuInfo } from '../api'
import { formatDate } from '@/utils/date'
export default {
  methods: {
    /**
         * 初始化数据
         */
    initData() {
      initPage().then(res => {
        if (res.code == 200) {
          this.listTypeInfo.deliveryMethodList = res.obj.arriveTypeList
          this.listTypeInfo.transportList = res.obj.shipToolList
        }
      })
    },
    /**
         * 输入ASN号/源单号 查入库单等信息 回车回调方法
         */
    asnNoAndAsnSource() {
      scannOrderNo(this.topForm.data.asnNo).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.asnNoForm = {
            asnNo: res.obj.asnNo,
            origNo: res.obj.origNo,
            cusOrderNo: res.obj.cusOrderNo,
            supplierName: res.obj.supplierName,
            buyer: res.obj.buyer,
            asnTypeName: res.obj.asnTypeName,
            remark: res.obj.remark,
            sourceCode: res.obj.sourceCode,
            origPlatform: res.obj.origPlatform
          }
          this.topForm.data = JSON.parse(JSON.stringify(this.asnNoForm))
          if (this.tableInfo1.data.length > 0) {
            this.tableInfo1.data.forEach(v => {
              if (v.asnNo != this.topForm.data.asnNo) {
                this.tableInfo1.data = res.obj.dtList
              }
            })
          } else {
            this.tableInfo1.data = res.obj.dtList
          }
          if (res.obj.supList && res.obj.supList.length > 0) { // 是否显示印章印模
            this.isShowSeal = true
            this.sealList = res.obj.supList
          }
          this.$refs.containerNo.focus()
          this.selectIndex = ''
          // 多批次
          if (this.duplicate(res.obj.dtList).length > 0) {
            this.doubleBatchArr = this.duplicate(res.obj.dtList)
          }
        }
      })
    },
    // 同一产品多条数据，即为多个批次
    duplicate(arr) {
      var tmp = []
      arr.concat().sort().sort(function(a, b) {
        if (a.skuCode == b.skuCode && tmp.indexOf(a) === -1) tmp.push(a)
      })
      return tmp
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
      if (this.isEmpty(this.topForm.data.asnNo)) {
        this.$message.error('请先输入ASN号/来源单号')
        return
      }
      const params = {
        asnNo: this.topForm.data.asnNo,
        skuCode: this.topForm.data.skuCode
      }
      scannSkuNo(params).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.topForm.data = {
            containerNo: this.topForm.data.containerNo,
            ...res.obj,
            ...this.asnNoForm
          }
          // 多批次标记(1-多批次;0-单批次)
          if (res.obj.doubleBatchFlag && res.obj.doubleBatchFlag == 1) {
            this.multipleBatches = true
            this.selectIndex = this.tableInfo1.data.indexOf(res.obj)
          } else {
            this.multipleBatches = false
          }
          this.isSaveBtnDisabled = false
          this.initInvBatchAttr(res.obj)
          setTimeout(() => {
            this.$refs.form.clearValidate()
          }, 0)
          if (res.obj.perFlag == 0) { // 商品没有维护大包装
            this.setGoodsPackageInfo(res.obj)
          }
          if (res.obj.coldFlag == 1) { // 商品为冷链产品
            this.setColdChainInfo(res.obj)
          }

          this.rightForm = {
            skuQuality: 'GOOD_PRODUCT',
            recPkgQty: '',
            scatteredQty: '',
            recQty: '',
            rejectQty: '',
            rejectReason: '',
            recMode: 'PC_MODE'
          }
        }
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
        if (item.batchAttrFormat == 'DATE') {
          field = { value: item.batchAttr, label: item.batchAttrKey, type: 'date', format: item.showFormat, valueFormat: item.showFormat, disabled: fieldDisabled }
        } else {
          field = { value: item.batchAttr, label: item.batchAttrKey, type: 'input', disabled: fieldDisabled }
        }
        if (item.isRequired && item.isRequired == 1) {
          const ruleData = [{ required: true, message: '请录入' + item.batchAttrKey, trigger: 'blur' }]
          rules[item.batchAttr] = ruleData
        }
        fieldList.push(field)
        if (invBatchPO) {
          attrData[item.batchAttr] = invBatchPO[item.batchAttrColumn]
        } else {
          if (item.batchAttrColumn == 'instoreDate') {
            attrData[item.batchAttr] = formatDate(new Date(), item.showFormat)
            field.disabled = true
          } else if (item.batchAttrColumn == 'asnNo') {
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
         * 保存收货记录
         */
    saveRecInfoFn() {
      const params = {
        ...this.topForm.data,
        ...this.rightForm,
        batchAttrMap: this.diaFormInfoAttr.data
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          saveRecInfo(params).then(res => {
            if (res.code === 200) {
              this.$message.success(res.msg)
              if (res.obj.completeFlag == 1) {
                this.topForm.data.asnNo = ''
              } else {
                this.isSaveBtnDisabled = true
                this.topForm.data.skuCode = ''
                this.$refs.skuCode.focus()
                this.tableInfo2.data.push(res.obj)
                this.tableInfo1.data.forEach((v, i) => {
                  if (v.skuCode == res.obj.skuCode) {
                    this.selectIndex = i
                  }
                })
              }
            }
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
        deleteDt(data).then(res => {
          if (res.code == 200) {
            this.$message.success(res.msg)
            this.tableInfo2.data = this.tableInfo2.data.filter(v => {
              return v.recInfoId != data.recInfoId
            })
          } else {
            this.$message.error(res.msg)
          }
        })
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
         * 取消
         * @param data
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
        { label: this.$t('table.save'), type: 'primary', icon: '', event: 'saveGoodsPackageInfo', btLoading: false, show: true },
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
        skuCode: this.topForm.data.skuCode,
        companyCode: this.topForm.data.companyCode,
        creator: this.topForm.data.creator
      }
      this.dialogFormInfo.ref.validate(valid => {
        if (valid) {
          saveSkuInfo(params).then(res => {
            if (res.code == 200) {
              this.topForm.data.perQty = this.dialogFormInfo.data.perQty
              this.dialogInfo.visible = false
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
        { label: this.$t('returnRecAccept.save'), type: 'primary', icon: '', event: 'saveFn', btLoading: false, show: true },
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
          if (!this.topForm.data.coolReqList) {
            this.topForm.data.coolReqList = []
          }
          this.topForm.data.coolReqList.push(this.dialogFormInfo.data)
          this.dialogInfo.visible = false
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
    // 按键盘 F1和F4 会执行的方法
    handleKeyDone(key) {
      if (key < 112 || key > 115) {
        return
      }
      if (key == 112) {
        if (!this.multipleBatches) return
        this.nextBatch()
      } else if (key == 115) {
        this.saveRecInfoFn()
      }
      window.event.preventDefault()
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
  },
  // 页面初始化函数
  created() {
    this.initData()
    // this.initPage();
  }
}
