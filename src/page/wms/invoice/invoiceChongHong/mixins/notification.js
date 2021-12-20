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
      this.topForm.data.asnNo = null
      this.topForm.data.soNo = null
      this.topForm.data.asnType = null
      this.topForm.data.asnStatus = null
      this.topForm.data.ownerId = null
      this.topForm.data.customerId = null
      this.topForm.data.storeId = null
      this.topForm.data.partnerId = null
      this.topForm.data.receiver = null
      this.topForm.data.receiverTel = null
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
    // 添加展开收起表单功能
    openCollapsable() {
      this.collapsable = !this.collapsable
    },

    /**
     * 页面初始化
     */
    initPage() {
      this.$store.dispatch(this.store + 'initPage', {}).then(() => {
        const resp = this.$store.state[this.modName].initPageResp
        if (resp.code === this.$store.state[this.modName].successCode) {
          this.carrierCode = resp.obj.carrierCode
          this.listTypeInfo.asnTypeList = resp.obj.asnTypeList
          this.listTypeInfo.asnStatusList = resp.obj.asnStatusList
          this.carrierCode = resp.obj.carrierCode
        }
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

    // 批量开票
    batchChongHong() {
      const kaiPiaoList = this.kaiPiaoList

      if (kaiPiaoList.length <= 0) {
        this.$message.error('没有选中数据')
        return
      }

      this.$confirm(this.$t('确认批量冲红?'), {
        type: 'warning',
        center: true
      }).then(() => {
        const idList = []
        for (let i = 0; i < kaiPiaoList.length; i++) {
          idList.push(kaiPiaoList[i].asnId)
        }
        this.$store.dispatch(this.store + 'chongHong', idList).then(() => {
          const resp = this.$store.state[this.modName].chongHongResp
          if (resp.code === this.$successCode) {
            this.queryTableData(this.topForm.data)
          }
        })
      })
    },

    // 冲红
    chongHong(data) {
      this.$confirm(this.$t('确认冲红?'), {
        type: 'warning',
        center: true
      }).then(() => {
        const idList = []
        idList.push(data.asnId)
        this.$store.dispatch(this.store + 'chongHong', idList).then(() => {
          const resp = this.$store.state[this.modName].chongHongResp
          if (resp.code === this.$successCode) {
            this.queryTableData(this.topForm.data)
          }
        })
      })
    }

  },

  // 页面初始化函数
  created() {
    this.initData()
    this.initPage()
  }
}
