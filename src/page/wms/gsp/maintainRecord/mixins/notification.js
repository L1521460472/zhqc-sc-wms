// 自定义事件处理
export default {
  methods: {
    /**
     * 初始化数据
     */
    initData() {
      // 默认查询第一页
      // this.$setPageLimit(this.pageRequest, this.topForm.data);
      // this.queryTableData(this.topForm.data);

      this.$setPageLimitDt(this.pageRequestDt, this.topForm.data)
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
      this.topForm.data.skuCode = null
      this.topForm.data.barcode = null
      this.topForm.data.skuName = null
      this.topForm.data.spec = null
      this.topForm.data.maintenanceType = null
      this.topForm.data.maintainDateFrom = null
      this.topForm.data.maintainDateTo = null
      this.topForm.data.skuCategoryId = null
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
    editPageChange(data) {
      this.$setEditPageChange(data, this.pageRequestDt, this.maintain)
      this.maintainTableData(this.topForm.data)
    },
    /**
     * 页面初始化
     */
    initPage() {
      this.$store.dispatch(this.store + 'initPage', {}).then(() => {
        const resp = this.$store.state[this.modName].initPageResp
        if (resp.code === this.$store.state[this.modName].successCode) {
          this.listTypeInfo.maintenanceTypeList = resp.obj.maintenanceTypeList
        }
      })
    },

    // 添加展开收起表单功能
    openCollapsable() {
      this.collapsable = !this.collapsable
    },

    /**
     * 查询表格数据
     * @param data
     */
    queryTableData(data) {
      this.$showLoading()
      this.$store.dispatch(this.store + 'querySkuInfo', data).then(() => {

      }).finally(() => {
        this.$hideLoading()
      })
    },
    //
    maintainTableData(data) {
      this.$showLoading()
      this.$store.dispatch(this.store + 'querySkuMaintainRecord', data).then(() => {

      }).finally(() => {
        this.$hideLoading()
      })
    },
    //
    cellClickEvent(data) {
      const obj = {
        companyCode: data.row.companyCode,
        limit: 10,
        maintainDateFrom: this.topForm.data.maintainDateFrom,
        maintainDateTo: this.topForm.data.maintainDateTo,
        page: 1,
        skuId: data.row.skuId,
        skuCode: data.row.skuCode
      }
      this.maintain = obj
      this.$setEditPageChange(data.row, this.pageRequestDt, obj)
      this.maintainTableData(obj)
    }

  },
  // 页面初始化函数
  created() {
    this.initData()
    this.initPage()
  }
}
