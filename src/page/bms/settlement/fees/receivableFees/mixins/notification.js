export default {
  created() {
    this.initData()
  },
  methods: {
    /* 初始化数据 */
    initData() {
      // 默认查询第一页
      this.$setPageLimit(this.pageRequest, this.topForm.data)
      this.queryTableData(this.topForm.data)
    },

    /* 查询表格数据 */
    queryTableData(data) {
      this.$showLoading()
      this.$store.dispatch(this.store + 'pageInfo', data).finally(() => {
        this.$hideLoading()
      })
    },

    /* 翻页 */
    pageChange(val) {
      // 设置页码值为val
      this.$setPageChange(val, this.pageRequest, this.topForm.data)
      this.queryTableData(this.topForm.data)
    },

    /* 查询 */
    search() {
      this.topForm.ref.validate(valid => {
        if (valid) { // 查询表单校验
          this.initData()
        }
      })
    },

    /* 重置 */
    reboot() {
      for (const key in this.topForm.data) {
        this.topForm.data[key] = null
      }
    },

    /* 查看 */
    view() {
      this.detailVisible = true
      this.$nextTick(() => {
        this.detailVisible = false
      })
    },

    /* 费用调整 */
    adjustmentFees() {
      this.initAdjustmentFees()
      this.dialogInfo.type = 'adjustmentFees'
      this.dialogInfo.visible = true
    },

    /* 添加费用 */
    addFees() {
      this.addFeesVisible = true
      this.$nextTick(() => {
        this.addFeesVisible = false
      })
    },

    /* 计算 */
    calculate() {
      if (this.selections.length) {
        this.$alert(this.$t('receivableFees.msg.calculate2'), this.$t('receivableFees.tips'), {
          type: 'success',
          confirmButtonText: this.$t('table.close')
        })
      } else {
        this.$alert(this.$t('receivableFees.msg.calculate1'), this.$t('receivableFees.tips'), {
          type: 'error',
          confirmButtonText: this.$t('table.close')
        })
      }
    },

    /* 批量计算 */
    batchCalculate() {
      this.initBatch()
      this.dialogInfo.type = 'batchCalculate'
      this.dialogInfo.visible = true
    },

    /* 出账 */
    payOut() {
      if (this.selections.length) {
        this.$alert(this.$t('receivableFees.msg.payOut2'), this.$t('receivableFees.tips'), {
          type: 'success',
          confirmButtonText: this.$t('table.close')
        })
      } else {
        this.$alert(this.$t('receivableFees.msg.payOut1'), this.$t('receivableFees.tips'), {
          type: 'error',
          confirmButtonText: this.$t('table.close')
        })
      }
    },

    /* 批量出账 */
    batchPayOut() {
      this.initBatch()
      this.dialogInfo.type = 'batchPayOut'
      this.dialogInfo.visible = true
    },

    /* 导出 */
    exportData(data) {
      this.topForm.ref.validate(valid => {
        if (valid) {
          this.$showLoading()
          data.callback(this.topForm.data)
          this.$hideLoading()
        }
      })
    },

    /* 审核 */
    review() {
      if (this.selections.length) {
        this.$alert(this.$t('receivableFees.msg.review2'), this.$t('receivableFees.tips'), {
          type: 'error',
          confirmButtonText: this.$t('table.close')
        })
      } else {
        this.$confirm(this.$t('receivableFees.msg.review1'), this.$t('receivableFees.tips'), {
          type: 'warning'
        }).then(() => {
          console.log('review')
        }).catch(() => {})
      }
    },

    /* 全部审核 */
    reviewAll() {
      this.$confirm(this.$t('receivableFees.msg.reviewAll'), this.$t('receivableFees.tips'), {
        type: 'warning'
      }).then(() => {
        console.log('reverseReview')
      }).catch(() => {})
    },

    /* 反审 */
    reverseReview() {
      if (this.selections.length) {
        this.$alert(this.$t('receivableFees.msg.reverseReview2'), this.$t('receivableFees.tips'), {
          type: 'error',
          confirmButtonText: this.$t('table.close')
        })
      } else {
        this.$confirm(this.$t('receivableFees.msg.reverseReview1'), this.$t('receivableFees.tips'), {
          type: 'warning'
        }).then(() => {
          console.log('reverseReview')
        }).catch(() => {})
      }
    },

    /* 全部反审 */
    reverseReviewAll() {
      this.$confirm(this.$t('receivableFees.msg.reverseReviewAll'), this.$t('receivableFees.tips'), {
        type: 'warning'
      }).then(() => {
        console.log('reverseReviewAll')
      }).catch(() => {})
    },

    /* 关闭添加应付费用 */
    close() {
      this.dialogInfo.visible = false
    },

    /* 保存添加应付费用 */
    save() {
      this.dialogInfo.ref.validate(valid => {
        if (valid) {
          this.dialogInfo.visible = false
        }
      })
    }
  }
}
