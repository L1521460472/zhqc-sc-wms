// 自定义事件处理
// import { formatDate } from '@/utils/date'
export default {
  methods: {

    /**
     * 扫描来源库位
     */
    scannFmLotCode() {
      if (this.$isEmpty(this.form.fmLotCode)) {
        this.$message.error('请扫描来源库位')
        return
      }

      this.$showLoading()
      this.$store.dispatch(this.store + 'scannFmLotCode', this.form).then(() => {
        const resp = this.$store.state[this.modName].scannFmLotCodeResp
        if (resp.code == this.$successCode) {
          this.disabledFmLotCode = true
          this.disabledBarcode = false

          this.$nextTick(() => {
            this.$refs.barcode.focus()
          })

          this.$message.success(resp.msg)
        }
      }).finally(() => {
        this.$hideLoading()
      })
    },

    /**
     * 扫描产品条码
     */
    scannProBarcode() {
      if (this.$isEmpty(this.form.barcode)) {
        this.$message.error('请扫描产品编码/条码')
        return
      }

      this.$showLoading()
      this.$store.dispatch(this.store + 'scannProBarcode', this.form).then(() => {
        const resp = this.$store.state[this.modName].scannProBarcodeResp
        if (resp.code == this.$successCode) {
          this.skuInfo = resp.obj
          this.batchNoList = this.setBatchNo(resp.obj.batchInfoList) // 设置批次号下拉框

          this.form.skuId = resp.obj.skuId
          this.form.batchNo = this.batchNoList[0].key

          this.batchNoChange()// 批次属性
          this.disabledBarcode = true
          this.disabledMoveQty = false

          this.$nextTick(() => {
            this.$refs.moveQty.focus()
          })

          this.$message.success(resp.msg)
        }
      }).finally(() => {
        this.$hideLoading()
      })
    },

    /**
     * 扫描移位数量
     */
    scannmoveQty() {
      if (this.$isEmpty(this.form.moveQty)) {
        this.$message.error('请扫描移位数量')
        return
      }

      this.$showLoading()
      this.$store.dispatch(this.store + 'scannMoveQty', this.form).then(() => {
        const resp = this.$store.state[this.modName].scannMoveQtyResp
        if (resp.code == this.$successCode) {
          this.skuInfo.recommLot = resp.obj

          this.disabledMoveQty = true
          this.disabledBatchNo = true
          this.disabledToLotCode = false

          this.$nextTick(() => {
            this.$refs.toLotCode.focus()
          })

          this.$message.success(resp.msg)
        }
      }).finally(() => {
        this.$hideLoading()
      })
    },

    /**
     * 扫描目标库位
     */
    scannToLotCode() {
      if (this.$isEmpty(this.form.toLotCode)) {
        this.$message.error('请扫描目标库位')
        return
      }

      this.$showLoading()
      this.$store.dispatch(this.store + 'scannToLotCode', this.form).then(() => {
        const resp = this.$store.state[this.modName].scannToLotCodeResp
        if (resp.code == this.$successCode) {
          this.$message.success(resp.msg)
        }
      }).finally(() => {
        this.$hideLoading()
      })
    },

    // 保存
    saveData() {
      if (this.$isEmpty(this.form.fmLotCode)) {
        this.$message.error('请扫描来源库位')
        return
      }
      if (this.$isEmpty(this.form.barcode)) {
        this.$message.error('请扫描产品编码/条码')
        return
      }
      if (this.$isEmpty(this.form.moveQty)) {
        this.$message.error('请扫描移位数量')
        return
      }
      if (this.$isEmpty(this.form.toLotCode)) {
        this.$message.error('请扫描目标库位')
        return
      }

      this.$showLoading()
      this.$store.dispatch(this.store + 'save', this.form).then(() => {
        const resp = this.$store.state[this.modName].saveResp
        if (resp.code == this.$successCode) {
          this.reboot()
          this.$refs.fmLotCode.focus()
          this.$message.success(resp.msg)
        }
      }).finally(() => {
        this.$hideLoading()
      })
    },

    // 设置批次号
    setBatchNo(batchList) {
      const arr = []
      for (let i = 0; i < batchList.length; i++) {
        const temp = { key: batchList[i].batchNo, value: batchList[i].batchNo }
        arr.push(temp)
      }
      return arr
    },

    batchNoChange() {
      const tempArr = this.skuInfo.batchInfoList
      for (let i = 0; i < tempArr.length; i++) {
        if (this.form.batchNo === tempArr[i].batchNo) {
          this.skuInfo.productionBatch = tempArr[i].productionBatch
          this.skuInfo.productionDate = tempArr[i].productionDate
          this.skuInfo.instoreDate = tempArr[i].instoreDate
          this.skuInfo.invalidDate = tempArr[i].invalidDate
          this.skuInfo.qty = tempArr[i].qty

          this.form.asnNo = tempArr[i].asnNo
          return
        }
      }
    },

    reboot() {
      this.form = {
        fmLotCode: null,
        barcode: null,
        toLotCode: null,
        skuId: null,
        batchNo: null,
        moveQty: null,
        asnNo: null
      }

      this.skuInfo = {
        recommLot: null,
        skuName: null,
        spec: null,
        barcode: null,
        skuCode: null,
        productionBatch: null,
        productionDate: null,
        instoreDate: null,
        invalidDate: null,
        qty: null,
        batchInfoList: []
      }

      this.batchNoList = []

      this.disabledFmLotCode = false
      this.disabledBatchNo = false
      this.disabledBarcode = true
      this.disabledMoveQty = true
      this.disabledToLotCode = true

      this.$refs.fmLotCode.focus()
    },

    // 按键盘 F1和F2 会执行的方法
    handleKeyDone(key) {
      if (key < 112 || key > 113) {
        return
      }
      if (key == 112) {
        this.saveData()
      } else if (key == 113) {
        this.reboot()
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

  mounted() {
  },
  // 页面初始化函数
  created() {
  }
}
