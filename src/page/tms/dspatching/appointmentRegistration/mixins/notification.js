export default {
  created() {
    this.initData()
    this.initPage()
  },
  methods: {
    /* 初始化数据 */
    initData() {
      if (this.validateTime()) {
        // 默认查询第一页
        this.$setPageLimit(this.pageRequest, this.topForm.data)
        this.queryTableData(this.topForm.data)
      }
    },

    /* 查询 */
    search() {
      this.topForm.ref.validate(valid => {
        if (valid) { // 查询表单校验
          this.initData()
        }
      })
    },

    // 解决框架时间区间只填一个报错问题
    validateTime() {
      if (
        (this.topForm.data.appointPickupTimeBegin && !this.topForm.data.appointPickupTimeEnd) ||
        (!this.topForm.data.appointPickupTimeBegin && this.topForm.data.appointPickupTimeEnd) ||
        (this.topForm.data.appointSendTimeBegin && !this.topForm.data.appointSendTimeEnd) ||
        (!this.topForm.data.appointSendTimeBegin && this.topForm.data.appointSendTimeEnd)
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

    /* 翻页 */
    pageChange(val) {
      // 设置页码值为val
      this.$setPageChange(val, this.pageRequest, this.topForm.data)
      this.queryTableData(this.topForm.data)
    },

    /* 添加展开收起表单功能 */
    openCollapsable() {
      this.collapsable = !this.collapsable
    },

    /* 页面初始化 */
    initPage() {
      this.$store.dispatch(this.store + 'initPage', {}).then(() => {
        const res = this.$store.state[this.modName].initPageObj
        if (res.code === 200 && res.obj) {
          this.listTypeInfo.controlTypeList = res.obj.controlTypeList
          this.listTypeInfo.appointTypeList = res.obj.appointTypeList
        }
      })
    },

    /* 查询表格数据 */
    queryTableData(data) {
      this.$showLoading()
      this.$store.dispatch(this.store + 'pageInfo', data).then(() => {
      }).finally(() => {
        this.$hideLoading()
      })
    },

    /* 查看 */
    openViewPage(row) {
      this.dialogInfo.title = this.$t('appointmentRegistration.view')
      this.dialogInfo.type = 'view'
      this.dialogInfo.btList[1].show = false
      this.initViewDialogField()
      this.dialogInfo.visible = true
      this.$nextTick(() => {
        this.dialogInfo.ref.resetFields()
      })
      this.$store.dispatch(this.store + 'pageView', row.appointOrderNo).then(() => {
        this.rowData = this.$store.state[this.modName].rowResp
        if (this.rowData) {
          this.dialogInfo.fieldList.forEach(item => {
            this.$set(this.dialogInfo.data, item.value, this.rowData[item.value])
          })
        }
      })
    },

    /* 新增 */
    openAddPage() {
      this.dialogInfo.title = this.$t('appointmentRegistration.add')
      this.dialogInfo.type = 'add'
      this.dialogInfo.btList[1].show = true
      this.initAddDialogField()
      this.rulesInit()
      this.planOrderNoBackup = ''
      this.dialogInfo.visible = true
      this.$nextTick(() => {
        this.dialogInfo.ref.resetFields()
      })
    },

    appointTypeChange() {
      this.initAddDialogField(this.dialogInfo.data.appointType)
      this.rulesInit(this.dialogInfo.data.appointType)
    },

    planOrderNoBlur() {
      if (this.dialogInfo.data.planOrderNo && this.planOrderNoBackup !== this.dialogInfo.data.planOrderNo) {
        this.$store.dispatch(this.store + 'getOrderInfo', this.dialogInfo.data.planOrderNo).then(() => {
          this.planOrderNoBackup = this.dialogInfo.data.planOrderNo
          const orderInfo = this.$store.state[this.modName].orderInfo
          this.dialogInfo.data.cOrderNo = orderInfo.cOrderNo
          this.dialogInfo.data.orderNo = orderInfo.orderNo
        })
      }
    },

    /* 编辑 */
    openEditPage(row) {
      this.dialogInfo.title = this.$t('appointmentRegistration.edit')
      this.dialogInfo.type = 'edit'
      this.dialogInfo.btList[1].show = true
      this.initEditDialogField()
      this.dialogInfo.visible = true
      this.$nextTick(() => {
        this.dialogInfo.ref.resetFields()
      })
      this.$store.dispatch(this.store + 'pageView', row.appointOrderNo).then(() => {
        this.rowData = this.$store.state[this.modName].rowResp
        if (this.rowData) {
          this.pictureList = this.rowData.evidenceImage && this.rowData.evidenceImage.split(',') || []
          this.evidenceList = this.pictureList.map(item => ({ type: 1, path: item }))
          this.dialogInfo.fieldList.forEach(item => {
            this.$set(this.dialogInfo.data, item.value, this.rowData[item.value])
          })
          this.rulesInit(this.dialogInfo.data.appointType)
        }
      })
    },

    /* 关闭 */
    close() {
      this.dialogInfo.visible = false
    },

    /* 保存 */
    save() {
      this.dialogInfo.ref.validate(valid => {
        if (valid) {
          this.dialogInfo.data.evidenceList = this.evidenceList
          if (this.dialogInfo.type === 'add') {
            this.$store.dispatch(this.store + 'saveData', this.dialogInfo.data).then(() => {
              if (this.$store.state[this.modName].addResp.code === 200) {
                this.initData()
              }
            }).finally(() => {
              this.dialogInfo.visible = false
            })
          }
          if (this.dialogInfo.type === 'edit') {
            this.$store.dispatch(this.store + 'editData', Object.assign({}, this.rowData, this.dialogInfo.data)).then(() => {
              if (this.$store.state[this.modName].editResp.code === 200) {
                this.initData()
              }
            }).finally(() => {
              this.dialogInfo.visible = false
            })
          }
        }
      })
    }
  }
}
