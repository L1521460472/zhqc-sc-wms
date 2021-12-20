// 自定义事件处理
import {
  deleteReturnRec,
  initRecPage,
  saveReturnRecInfo,
  saveReturnSkuPackageInfo,
  scannReturnOrderNo,
  scannReturnSku
} from '../api'
import { formatDate } from '@/utils/date'

export default {
  methods: {
    /**
         * 初始化数据
         */
    initData() {
      // 默认查询第一页
      initRecPage().then(res => {
        if (res.code == 200) {
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
      scannReturnOrderNo(this.topForm.data.orderNo).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.orderNoDisabled = true
          this.skuCodeDisabled = false
          this.asnNoForm = {
            orderNo: this.topForm.data.orderNo,
            inOrderNo: res.obj.inOrderNo,
            cusOrderNo: res.obj.cusOrderNo,
            sourceCode: res.obj.sourceCode,
            orderType: res.obj.orderType,
            orderTypeName: res.obj.orderTypeName,
            refundType: res.obj.refundType,
            refundReason: res.obj.refundReason,
            asnSource: res.obj.asnSource,
            asnSourceName: res.obj.asnSourceName,
            shopCode: res.obj.shopCode,
            shopName: res.obj.shopName,
            origPlatform: res.obj.origPlatform,
            origPlatformName: res.obj.origPlatformName,
            origRowNo: res.obj.origRowNo
          }
          this.topForm.data = JSON.parse(JSON.stringify(this.asnNoForm))
          this.tableInfo1.data = res.obj.dshSkuInfoList
          this.tableInfo2.data = res.obj.recSkuInfoList
          this.$refs.containerNo.focus()
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
      if (this.isEmpty(this.topForm.data.batchNo)) {
        this.topForm.data.batchNo = ''
      }
      if (this.isEmpty(this.topForm.data.origRowNo)) {
        this.topForm.data.origRowNo = null
      }
      this.topForm.data.skuCode = this.topForm.data.skuCode.trim()
      const params = {
        orderNo: this.topForm.data.orderNo,
        skuCodeOrBarcode: this.topForm.data.skuCode,
        batchNo: this.topForm.data.batchNo,
        origRowNo: this.topForm.data.origRowNo
      }
      scannReturnSku(params).then(res => {
        const containerNo = this.topForm.data.containerNo
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.initInvBatchAttr(res.obj)
          this.topForm.data = {
            containerNo: this.topForm.data.containerNo,
            ...this.asnNoForm,
            ...res.obj
          }
          this.isSaveBtnDisabled = false
          // 找到对应行数
          this.tableInfo1.data.forEach((value, index) => {
            if (value.asnInOrderId === res.obj.asnInOrderId) {
              this.selectIndex = index
            }
          })

          if (res.obj.perFlag === 0) { // 商品没有维护大包装
            this.setGoodsPackageInfo(res.obj)
            return
          }
          if (res.obj.coldFlag === 1) { // 商品为冷链产品
            this.setColdChainInfo(res.obj)
          }
          this.$refs.scatteredQty.focus()
        } else {
          const skuCode = this.topForm.data.skuCode
          this.topForm.data.skuCode = ''
          this.skuCodeOpt = ''
          setTimeout(() => {
            this.$set(this.topForm.data, 'skuCode', skuCode)
          }, 0)
        }
        setTimeout(() => {
          this.$set(this.topForm.data, 'containerNo', containerNo)
        }, 0)
      })
    },

    scannSkuNoCopy() {
      this.topForm.data.batchNo = ''
      this.topForm.data.origRowNo = null
      this.scannSkuNo()
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
          field = {
            value: item.batchAttr,
            label: item.batchAttrKey,
            type: 'date',
            format: item.showFormat,
            valueFormat: item.showFormat,
            disabled: fieldDisabled
          }
        } else {
          field = { value: item.batchAttr, label: item.batchAttrKey, type: 'input', disabled: fieldDisabled }
        }
        if (item.isRequired && item.isRequired === 1) {
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
         * 保存收货记录
         */
    saveRecInfoFn() {
      if (this.isEmpty(this.rightForm.rejectQty)) {
        this.rightForm.rejectQty = 0
      }
      if (this.isEmpty(this.rightForm.recPkgQty)) {
        this.rightForm.recPkgQty = 0
      }
      if (this.isEmpty(this.rightForm.recPkgQty)) {
        this.rightForm.recPkgQty = 0
      }
      const batchNo = this.topForm.data.batchNo
      const params = {
        ...this.topForm.data,
        ...this.rightForm,
        batchAttrMap: this.diaFormInfoAttr.data,
        batchNo: batchNo
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$showLoading()
          saveReturnRecInfo(params).then(res => {
            const containerNo = this.topForm.data.containerNo
            if (res.code === 200) {
              if (!this.isEmpty(res.obj.msg)) {
                this.$message.success(res.obj.msg)
                this.resetDataInfo()
              } else {
                this.$message.success(res.msg)
                this.tableInfo1.data = res.obj.dshSkuInfoList
                this.tableInfo2.data = res.obj.recSkuInfoList
                this.topForm.data.skuCode = ''
                this.skuCodeOpt = ''
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
          orderNo: this.topForm.data.orderNo,
          origRowNo: data.origRowNo
        }
        deleteReturnRec(param).then(res => {
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
          saveReturnSkuPackageInfo(params).then(res => {
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
    /**
         * 判断是否为空
         * @param text
         * @returns boolean
         */
    isEmpty(text) {
      return typeof (text) === 'undefined' || !text || !text.toString().trim()
    },

    /**
         * 取消
         * @param data
         */
    close() {
      this.dialogInfo.visible = false
    },

    setElementFocus(el) {
      // this.$refs.orderNo.focus();
      document.querySelector(el).focus()
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
    // 按键盘 F1和F4 会执行的方法
    handleKeyDone(key) {
      /* if (key < 112 || key > 115) {
                return;
            }
            if (key == 112) {
                console.log("F1");
                if (!this.multipleBatches) return;
                this.nextBatch();
            } else*/ if (key == 115) {
        console.log('F4')
        this.saveRecInfoFn()
      } else {
        return
      }
      window.event.preventDefault()
    },
    /**
         * 重置事件
         */
    resetDataInfo() {
      this.topForm.data.orderNo = ''
      this.skuCodeOpt = ''
      this.orderNoDisabled = false
      this.skuCodeDisabled = true
      setTimeout(() => {
        this.$refs.orderNo.focus()
      }, 0)
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
  }
}
