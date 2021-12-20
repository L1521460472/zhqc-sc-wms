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

    /* 新建 */
    create() {
      this.dialogInfo.flag = 'add'
      this.dialogInfo.title = this.$t('currency.add')
      this.initDiaForm()
      this.dialogInfo.visible = true
      this.$nextTick(() => {
        this.dialogInfo.ref.resetFields()
      })
    },

    /* 编辑 */
    edit() {
      this.dialogInfo.flag = 'edit'
      this.dialogInfo.title = this.$t('currency.edit')
      this.initDiaForm()
      this.dialogInfo.visible = true
      this.$nextTick(() => {
        this.dialogInfo.ref.resetFields()
      })
    },

    /* 启用 */
    enable() {
      this.$confirm(this.$t('currency.msg.enable'), this.$t('currency.tips'), {
        confirmButtonText: this.$t('table.confirm'),
        cancelButtonText: this.$t('table.cancel')
      }).then(() => {
        console.log('enable')
      }).catch(() => {})
    },

    /* 启用 */
    disenable() {
      this.$confirm(this.$t('currency.msg.disenable'), this.$t('currency.tips'), {
        confirmButtonText: this.$t('table.confirm'),
        cancelButtonText: this.$t('table.cancel')
      }).then(() => {
        console.log('disenable')
      }).catch(() => {})
    },

    /* 关闭弹框页面 */
    close() {
      this.dialogInfo.visible = false
    },

    save() {
      this.dialogInfo.ref.validate(valid => {
        if (valid) {
          console.log('save')
        }
      })
    }
  }
}
