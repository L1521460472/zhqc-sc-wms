// 自定义事件处理
export default {
  methods: {

    /**
       * 重置事件
       */
    resetDataInfo() {
      alert('已重置')
    },

    /**
       * 关闭页面
       */
    close() {
      this.dialogInfo.visible = false
    },

    /**
         * 扫描ASN单号/客户订单号
         */
    scannOrderNo() {
      if (!this.orderForm.orderNo) {
        this.$message.error('请输入ASN/客户单号')
        return
      }
      this.$showLoading()
      this.$store.dispatch(this.store + 'pcScannOrderNo', this.orderForm.orderNo).then(() => {
        const resp = this.$store.state[this.modName].pcScannOrderNoResp

        if (resp.code == this.$successCode) {
          this.tableInfo1.data = resp.obj.dsjList
          this.tableInfo2.data = resp.obj.ysjList || []
          this.topForm = resp.obj
          this.mainTable = resp.obj

          this.$refs.barcode.focus()
        }
      }).finally(() => {
        this.$hideLoading()
      })
    },

    /**
         * 扫描SKU/产品条码
         */
    scanSku() {
      if (!this.orderForm.orderNo) {
        this.$message.error('请先扫描ASN/客户单号')
        return
      }
      if (!this.productFrom.barcode) {
        this.$message.error('请输入产品条码')
        return
      }
      const req = {
        originNo: this.mainTable.originNo,
        paType: this.mainTable.paType,
        barcode: this.productFrom.barcode,
        containerNo: this.productFrom.containerNo,
        id: this.productFrom.id
      }

      this.$showLoading()
      this.$store.dispatch(this.store + 'pcScannProductBarcode', req).then(() => {
        const resp = this.$store.state[this.modName].pcScannProductBarcodeResp
        if (resp.code == this.$successCode) {
          this.skuDtInfo = resp.obj
          this.$refs.paLotCode.focus()
        }
      }).finally(() => {
        this.$hideLoading()
      })
    },

    /**
         * 扫描库位条码
         */
    scanlotCode() {
      if (!this.orderForm.orderNo) {
        this.$message.error('请先扫描ASN/客户单号')
        return
      }
      if (!this.productFrom.barcode) {
        this.$message.error('请先扫描产品条码')
        return
      }
      if (!this.productFrom.paLotCode) {
        this.$message.error('请输入库位编码')
        return
      }
      const req = {
        originNo: this.mainTable.originNo,
        paType: this.mainTable.paType,
        containerNo: this.skuDtInfo.containerNo,
        skuId: this.skuDtInfo.skuId,
        batchNo: this.skuDtInfo.batchNo,
        id: this.skuDtInfo.id,
        paLotCode: this.productFrom.paLotCode
      }

      this.$showLoading()
      this.$store.dispatch(this.store + 'pcScannPalot', req).then(() => {
        const resp = this.$store.state[this.modName].pcScannPalotResp
        if (resp.code == this.$successCode) {
          this.$refs.paQty.focus()
        }
      }).finally(() => {
        this.$hideLoading()
      })
    },

    /**
         * 扫描上架数量
         */
    scanPaQty() {
      if (!this.orderForm.orderNo) {
        this.$message.error('请先扫描ASN/客户单号')
        return
      }
      if (!this.productFrom.barcode) {
        this.$message.error('请先扫描产品条码')
        return
      }
      if (!this.productFrom.paLotCode) {
        this.$message.error('请先扫描库位编码')
        return
      }
      if (!this.productFrom.paQty) {
        this.$message.error('请输入上架数量')
        return
      }
      const req = {
        originNo: this.mainTable.originNo,
        paType: this.mainTable.paType,
        containerNo: this.skuDtInfo.containerNo,
        skuId: this.skuDtInfo.skuId,
        batchNo: this.skuDtInfo.batchNo,
        id: this.skuDtInfo.id,
        recommLot: this.skuDtInfo.recommLot,
        paLotCode: this.productFrom.paLotCode,
        paQty: this.productFrom.paQty
      }

      this.$showLoading()
      this.$store.dispatch(this.store + 'pcScannPaQty', req).then(() => {
        const resp = this.$store.state[this.modName].pcScannPaQtyResp
        if (resp.code == this.$successCode) {
          // 整单上架完成，清空页面所有数据
          if (resp.obj.paTaskFinish) {
            this.cleanPageData()
            this.$refs.orderNo.focus()
          } else {
            this.cleanProductData()
            this.tableInfo1.data = resp.obj.dsjList
            this.tableInfo2.data = resp.obj.ysjList || []
            this.topForm = resp.obj
            this.$refs.barcode.focus()
          }
        }
      }).finally(() => {
        this.$hideLoading()
      })
    },

    /**
       * 清空页面数据
       */
    cleanPageData() {
      this.tableInfo1.data = []
      this.tableInfo2.data = []
      this.orderForm = {
        orderNo: null
      }

      this.productFrom = {
        barcode: null,
        paLotCode: null,
        paQty: null,
        containerNo: null,
        id: null
      }

      this.topForm = {
        waitPaQty: null,
        waitPaSkuNum: null,
        alreadyPaQty: null,
        alreadyPaSkuNum: null,
        totalQty: null,
        totalSkuNum: null
      }

      this.mainTable = {
        originNo: null,
        cusOrderNo: null,
        paType: null
      }

      this.skuDtInfo = {
        id: null,
        skuId: null,
        batchNo: null,
        waitPaQty: null,
        paQty: null,
        recommLot: null,
        containerNo: null,
        baseSku: {
          skuCode: null,
          barcode: null,
          skuName: null,
          tradeName: null,
          spec: null,
          mainUnit: null,
          perQty: null,
          drugForm: null,
          mfgName: null,
          originCountry: null,
          approvalNumber: null,
          brandName: null,
          tempControlName: null
        },
        baseInvBatch: {
          batchNo: null,
          productionBatch: null,
          productionDate: null,
          instoreDate: null,
          invalidDate: null
        }
      }
    },

    /**
       * 清空商品数据
       */
    cleanProductData() {
      this.productFrom = {
        barcode: null,
        paLotCode: null,
        paQty: null,
        containerNo: null,
        id: null
      }

      this.skuDtInfo = {
        id: null,
        skuId: null,
        batchNo: null,
        waitPaQty: null,
        paQty: null,
        recommLot: null,
        containerNo: null,
        baseSku: {
          skuCode: null,
          barcode: null,
          skuName: null,
          tradeName: null,
          spec: null,
          mainUnit: null,
          perQty: null,
          drugForm: null,
          mfgName: null,
          originCountry: null,
          approvalNumber: null,
          brandName: null,
          tempControlName: null
        },
        baseInvBatch: {
          batchNo: null,
          productionBatch: null,
          productionDate: null,
          instoreDate: null,
          invalidDate: null
        }
      }
    }

  },

  mounted() {
    this.initPageData()
    this.rulesInit()
    this.calcTableHeight()
  },
  // 页面初始化函数
  created() {
  }
}
