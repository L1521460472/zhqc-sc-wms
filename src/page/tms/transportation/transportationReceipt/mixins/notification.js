// 自定义事件处理
export default {
  // 页面初始化函数
  created() {
    this.initData()
    this.initPage()
  },
  methods: {
    /* 页面初始化 */
    initPage() {
      this.$store.dispatch(this.store + 'initPage', {}).then(() => {
        const resData = this.$store.state[this.modName].initPageObj
        if (resData) {
          this.listTypeInfo.deliveryTypeList = resData.deliveryTypeList
          this.listTypeInfo.receiptStatusList = resData.receiptStatusList
          this.listTypeInfo.signTypeList = resData.signTypeList
        }
      })
    },

    /* 初始化数据 */
    initData() {
      if (this.validateTime()) {
        // 默认查询第一页
        this.$setPageLimit(this.pageRequest, this.topForm.data)
        this.queryTableData(this.topForm.data)
      }
    },

    /**
     * 查询表格数据
     * @param data
     */
    queryTableData(data) {
      this.$showLoading()
      this.$store.dispatch(this.store + 'pageInfo', data).then(() => {}).finally(() => {
        this.$hideLoading()
      })
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

    /* 查询 */
    search() {
      this.topForm.ref.validate(valid => {
        if (valid) { // 查询表单校验
          this.initData()
        }
      })
    },

    validateTime() {
      if (
        (this.topForm.data.signTimeBegin && !this.topForm.data.signTimeEnd) ||
        (!this.topForm.data.signTimeBegin && this.topForm.data.signTimeEnd)
      ) {
        this.$message.error('请输入时间区间')
        return false
      }
      return true
    },

    /* 重置 */
    reboot() {
      for (const key in this.topForm.data) {
        this.topForm.data[key] = null
      }
    },

    /* 添加展开收起表单功能 */
    openCollapsable() {
      this.collapsable = !this.collapsable
    },

    /* 导出数据 */
    exportData(data) {
      this.topForm.ref.validate(valid => {
        if (valid) {
          this.$showLoading()
          data.callback(this.topForm.data)
          this.$hideLoading()
        }
      })
    },

    /**
     * 打开查看页面
     * @param data
     */
    openViewPage(data) {
      this.$router.push({ path: `/transportationReceiptView/${data.receiptNo}` })
    },

    /**
     * 打开签收页面
     * @param data
     */
    openSignPage(data) {
      // 弹窗的类型：sign
      this.fullDialogInfo.type = 'sign'
      // 默认弹窗的标题：修改
      this.fullDialogInfo.title = '签收'
      // 弹窗是否显示
      this.fullDialogInfo.visible = true
      // 弹窗的保存按钮是否显示
      this.fullDialogInfo.btList[1].show = true
      // 绑定弹窗保存事件
      this.fullDialogInfo.btList[1].event = 'signData'
      // 封装的修改表单的数据化配置
      this.diaFormInfoSignFieldList()
      this.selectId = data.id
      this.queryRowData(data)
    },

    /* 关闭页面 */
    close() {
      this.fullDialogInfo.visible = false
    },

    /**
     * 查询行数据【查看/编辑数据从后台获取时用此方法】
     * @param data
     */
    queryRowData(data) {
      return this.$store.dispatch(this.store + 'initUpdate', data.id).then(() => {
        const resData = this.$store.state[this.modName].initUpdateObj
        if (resData) {
          this.fullDiaFormInfo.data = resData.entity.receiptOrder
          this.fullDiaFormInfo.dtTableInfo.data = resData.entity.transportItemList.map(item => {
            !item.signNum && (item.signNum = 0)
            !item.signLossNum && (item.signLossNum = 0)
            !item.signMissNum && (item.signMissNum = 0)
            !item.signRejectNum && (item.signRejectNum = 0)
            return item
          })
        }
      })
    },
    signUpdataData() {
      const params = {
        receiptOrder: this.fullDiaFormInfo.data,
        transportItemList: this.fullDiaFormInfo.dtTableInfo.data
      }
      this.$showLoading()
      this.$store.dispatch(this.store + 'signData', params).then(() => {
        if (this.$store.state[this.modName].signResp.code === 200) {
          this.fullDialogInfo.visible = false
          this.initData()
        }
      }).finally(() => {
        this.$hideLoading()
      })
    },
    signData() {
      this.fullDiaFormInfo.ref.validate(valid => {
        if (valid) {
          this.fullDiaFormInfo.dtTableInfo.ref.validate(true).then((err) => {
            if (!err) {
              this.signUpdataData()
            }
          })
        }
      })
    }
  }
}
