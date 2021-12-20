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

    /* 启用 */
    enable() {
      this.$confirm(this.$t('exchangeRate.msg.enable'), this.$t('exchangeRate.tips'), {
        confirmButtonText: this.$t('table.confirm'),
        cancelButtonText: this.$t('table.cancel')
      }).then(() => {
        console.log('enable')
      })
    },

    /* 启用 */
    disenable() {
      this.$confirm(this.$t('exchangeRate.msg.disenable'), this.$t('exchangeRate.tips'), {
        confirmButtonText: this.$t('table.confirm'),
        cancelButtonText: this.$t('table.cancel')
      }).then(() => {
        console.log('disenable')
      })
    },

    /* 查看 */
    view() {
      this.fullDialogInfo.type = 'view'
      this.fullDialogInfo.title = this.$t('table.view')
      this.fullDialogInfo.btList[1].show = false
      this.initFullDiaInfo()
      this.fullDialogInfo.tableInfo.data = []
      this.fullDialogInfo.visible = true
    },

    /* 新建 */
    create() {
      this.fullDialogInfo.type = 'add'
      this.fullDialogInfo.title = this.$t('table.add')
      this.fullDialogInfo.btList[1].show = true
      this.initFullDiaInfo()
      this.fullDialogInfo.tableInfo.data = []
      this.fullDialogInfo.visible = true
    },

    /* 编辑 */
    edit() {
      this.fullDialogInfo.type = 'edit'
      this.fullDialogInfo.title = this.$t('table.edit')
      this.fullDialogInfo.btList[1].show = true
      this.initFullDiaInfo()
      this.fullDialogInfo.tableInfo.data = []
      this.fullDialogInfo.visible = true
    },

    addRow() {
      this.fullDialogInfo.tableInfo.data.push({
        currency: '',
        standardCurrency: '',
        exchangeRate: '',
        exchangeRateChangeTime: '',
        remark: ''
      })
    },

    deleteRow(row) {
      this.fullDialogInfo.tableInfo.data.splice(row.rowIndex, 1)
    },

    /* 关闭弹框页面 */
    close() {
      this.fullDialogInfo.visible = false
    },

    save() {
      this.fullDialogInfo.topForm.ref.validate(valid => {
        if (valid) {
          console.log('save')
        }
      })
    }
  }
}
