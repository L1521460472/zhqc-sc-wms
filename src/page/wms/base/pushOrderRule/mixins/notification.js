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
    /**
     * 查询行数据【查看/编辑数据从后台获取时用此方法】
     * @param data
     */
    queryRowData(data) {
      this.$store.dispatch(this.store + 'pageView', data.id).then(() => {
        const result = this.$store.state[this.modName].initViewResp
        if (result.code === this.$successCode) {
          this.fullDialogInfo.topForm.data = result?.obj?.entity ?? {}
          this.fullDialogInfo.tableInfo.data = result?.obj?.dtList ?? []
          console.log(this.fullDialogInfo.tableInfo.data)
        } else {
          this.fullDialogInfo.topForm.data = {}
          this.fullDialogInfo.tableInfo.data = []
        }
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
    },
    view(data) {
      this.initDiaForm()
      this.queryRowData(data)
      this.fullDialogInfo.visible = true
    },
    /* 关闭弹框页面 */
    close() {
      this.fullDialogInfo.visible = false
    }
  }
}
