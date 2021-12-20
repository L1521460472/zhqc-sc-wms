// 自定义事件处理
export default {
  methods: {
    /**
     * 初始化数据
     */
    initData() {
      // 默认查询第一页
      this.$setPageLimit(this.pageRequest, this.topForm.data)
      this.queryTableData(this.topForm.data)
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
     * 重置
     */
    reboot() {
      this.topForm.data.ownerId = null
      this.topForm.data.skuCategoryId = null
      this.topForm.data.skuId = null
      this.topForm.data.whAreaId = null
    },
    /**
     * 翻页
     * @param val
     */
    pageChange(val) {
      // 设置页码值为val
      this.$setPageChange(val, this.pageRequest, this.topForm.data)
      this.queryTableData(this.topForm.data)
    },
    // 添加展开收起表单功能
    openCollapsable() {
      this.collapsable = !this.collapsable
    },

    /**
     * 页面初始化
     */
    initPage() {
      this.$store.dispatch(this.store + 'initPage', {}).then(() => {

      })
    },
    /**
     * 查询表格数据
     * @param data
     */
    queryTableData(data) {
      this.$showLoading()
      this.$store.dispatch(this.store + 'pageInfo', data).then(() => {
        const resp = this.$store.state[this.modName].pageResp
        if (resp) {
          this.summary()
        }
      }).finally(() => {
        this.$hideLoading()
      })
    },
    /**
     * 合计
     */
    summary() {
      this.$store.dispatch(this.store + 'summary', this.topForm.data).then(() => {
        const resp = this.$store.state[this.modName].summaryResp
        if (resp.code === this.$successCode && resp.obj) {
          this.sumsData.grossWeightTon = resp.obj.totalGrossWeightTon // 总重量totalGrossWeight g, totalGrossWeightTon ton
          this.sumsData.usableQty = resp.obj.totalUsableQty // 总 可以库存
          this.sumsData.allotQty = resp.obj.totalAllotQty // 总 已分配库存
          this.sumsData.frozenQty = resp.obj.totalFrozenQty // 总 冻结库存
          this.sumsData.badQty = resp.obj.totalBadQty // 总 不良品
          this.sumsData.stockQty = resp.obj.totalStockQty// 总库存
          this.sumsData.stockPerQty = resp.obj.totalPerQty // 总包装库存
        }
      }).finally(() => {
        this.$hideLoading()
      })
    },
    /**
     * 导出数据
     */
    exportData(data) {
      this.topForm.ref.validate(valid => {
        if (valid) {
          this.$showLoading()
          data.callback(this.topForm.data)
          this.$hideLoading()
        }
      })
    }
  },
  // 页面初始化函数
  created() {
    this.initData()
    this.initPage()
  }
}
