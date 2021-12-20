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
      this.topForm.data.orderCode = null
      this.topForm.data.fmSystem = null
      this.topForm.data.recSystem = null
      this.topForm.data.orderType = null
      this.topForm.data.interfaceType = null
      this.topForm.data.mqStatus = null
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
    /**
     * 关闭页面
     */
    close() {
      this.dialogInfo.visible = false
    },

    /**
     * 页面初始化
     */
    initPage() {
      this.$store.dispatch(this.store + 'initPage', {}).then(() => {
        const resp = this.$store.state[this.modName].initPageObj
        this.listTypeInfo.mqStatus = resp.mqStatus
      })
    },
    /**
     * 查询表格数据
     * @param data
     */
    queryTableData(data) {
      this.$showLoading()
      this.$store.dispatch(this.store + 'pageInfo', data).then(() => {

      }).finally(() => {
        this.$hideLoading()
      })
    },
    /**
     * 查询行数据【查看/编辑数据从后台获取时用此方法】
     * @param data
     */
    queryRowData(data) {
      this.$store.dispatch(this.store + 'initUpdate', data.id).then(() => {
        this.diaFormInfo.data = this.$store.state[this.modName].initUpdateObj.entity
        this.listTypeInfo.valueList = this.$store.state[this.modName].initUpdateObj.valueList
        if (this.diaFormInfo.ref) {
          this.diaFormInfo.ref.clearValidate()
        }
      })
    },
    /**
     * 推送
     * @param data
     */
    pushFn(data) {
      this.$confirm(this.$t('确认推送么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'rePush', data.mqId).then(() => {
          const resp = this.$store.state[this.modName].rePushObj
          if (resp.code === this.$successCode) {
            this.queryTableData(this.topForm.data)
          }
        })
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
    handleChangeValue() {
      if (!this.diaFormInfo.data.globalValueCode) {
        this.diaFormInfo.data.globalValueName = null
        return
      }
      for (let i = 0; i < this.listTypeInfo.valueList.length; i++) {
        const item = this.listTypeInfo.valueList[i]
        if (item.value == this.diaFormInfo.data.globalValueCode) {
          this.diaFormInfo.data.globalValueName = item.key
          return
        }
      }
    }
  },
  // 页面初始化函数
  created() {
    this.initData()
    this.initPage()
  }
}
