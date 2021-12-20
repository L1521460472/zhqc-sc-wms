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
      this.$confirm(this.$t('billing.msg.enable'), this.$t('billing.tips'), {
        confirmButtonText: this.$t('table.confirm'),
        cancelButtonText: this.$t('table.cancel')
      }).then(() => {
        console.log('enable')
      }).catch(() => {})
    },

    /* 启用 */
    disenable() {
      this.$confirm(this.$t('billing.msg.disenable'), this.$t('billing.tips'), {
        confirmButtonText: this.$t('table.confirm'),
        cancelButtonText: this.$t('table.cancel')
      }).then(() => {
        console.log('disenable')
      }).catch(() => {})
    },

    view() {
      this.fullDialogInfo.type = 'view'
      this.fullDialogInfo.title = this.$t('billing.view')
      this.fullDialogInfo.btList[1].show = false
      this.initDiaForm()
      this.fullDialogInfo.visible = true
    },

    /* 新建 */
    create() {
      this.fullDialogInfo.type = 'add'
      this.fullDialogInfo.title = this.$t('billing.add')
      this.fullDialogInfo.btList[1].show = true
      this.initDiaForm()
      this.fullDialogInfo.visible = true
    },

    /* 编辑 */
    edit() {
      this.fullDialogInfo.type = 'edit'
      this.fullDialogInfo.title = this.$t('billing.edit')
      this.fullDialogInfo.btList[1].show = true
      this.initDiaForm()
      this.fullDialogInfo.visible = true
    },

    addDataRource() {
      const row = {}
      for (const key in this.fullDialogInfo.tableInfo.fieldList) {
        row[key] = null
      }
      this.fullDialogInfo.tableInfo.data.push(row)
    },

    deleteDt(row) {
      this.fullDialogInfo.tableInfo.data.splice(row.$rowIndex, 1)
    },

    /* 关闭弹框页面 */
    close() {
      this.fullDialogInfo.visible = false
    },

    save() {
      this.fullDialogInfo.topForm1.ref.validate(valid => {
        if (valid) {
          console.log('save')
        }
      })
      this.fullDialogInfo.topForm2.ref.validate(valid => {
        if (valid) {
          console.log('save')
        }
      })
    }
  }
}
