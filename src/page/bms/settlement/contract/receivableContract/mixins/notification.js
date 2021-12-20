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
      this.$refs.contractDetail.fullDialogInfo.type = 'view'
      this.$refs.contractDetail.fullDialogInfo.visible = true
    },

    /* 变更 */
    add() {
      this.$refs.contractDetail.fullDialogInfo.type = 'add'
      this.$refs.contractDetail.fullDialogInfo.visible = true
    },

    /* 变更 */
    edit() {
      this.$refs.contractDetail.fullDialogInfo.type = 'edit'
      this.$refs.contractDetail.fullDialogInfo.visible = true
    },

    /* 审核 */
    approve() {
      this.$confirm(this.$t('receivableContract.msg.approve'), this.$t('receivableContract.tips'), {
        type: 'warning'
      }).then(() => {
        console.log('approve')
      }).catch(() => {})
    }
  }
}
