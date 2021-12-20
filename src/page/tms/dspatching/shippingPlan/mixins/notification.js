const DIALOG_TYPE_ADD = 'add' // 预约登记
const DIALOG_TYPE_REPORT = 'report' // 异常报备
const DIALOG_TYPE_CANCEL = 'cancel' // 取消发运

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

    /* 页面初始化 */
    initPage() {
      this.$store.dispatch(this.store + 'initPage', {}).then(() => {
        const res = this.$store.state[this.modName].initPageObj
        if (res.code === this.$store.state[this.modName].successCode && res.obj) {
          this.listTypeInfo.dispatchStatusList = res.obj.dispatchStatusList
          this.listTypeInfo.appointStatusList = res.obj.appointStatusList
          this.listTypeInfo.deliveryTypeList = res.obj.deliveryTypeList
          this.listTypeInfo.transportTypeList = res.obj.transportTypeList
          this.listTypeInfo.errorTypeList = res.obj.errorTypeList
          this.listTypeInfo.controlTypeList = res.obj.controlTypeList
          this.listTypeInfo.appointTypeList = res.obj.appointTypeList
        }
      })
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

    validateTime() {
      if (
        (this.topForm.data.createTimeBegin && !this.topForm.data.createTimeEnd) ||
        (!this.topForm.data.createTimeBegin && this.topForm.data.createTimeEnd) ||
        (this.topForm.data.receiveTimeBegin && !this.topForm.data.receiveTimeEnd) ||
        (!this.topForm.data.receiveTimeBegin && this.topForm.data.receiveTimeEnd)
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

    // 表格里的勾选框
    tableCheck(data) {
      this.selections = data
      this.batchBtnArray[0].disabled = !data.length
    },

    /* 运输调度 */
    transportation() {
      this.$router.push({ path: '/page_tms_dspatching_transportationScheduling_transportationScheduling' })
    },

    /* 打开查看页面 */
    openViewPage(data) {
      this.$router.push({ path: `/shippingPlanView/${data.planOrderNo}` })
    },

    /* 打开预约登记 */
    openRegDialog(data) {
      this.accept = [{ type: 'img', limit: 3 }]
      this.initDialogReport()
      this.curRowData = JSON.parse(JSON.stringify(data))
      for (const key in this.dialogInfo.data) {
        this.dialogInfo.data[key] = this.curRowData[key]
      }
      this.dialogInfo.flag = DIALOG_TYPE_ADD
      this.dialogInfo.visible = true
    },

    appointTypeChange() {
      this.initDialogReport(this.dialogInfo.data.appointType)
      this.rulesInit(this.dialogInfo.data.appointType)
    },

    /* 打开异常报备 */
    openRepDialog(data) {
      this.accept = [{ type: 'pdf', limit: 1 }, { type: 'img', limit: 3 }]
      this.initDialogRegister()
      this.curRowData = JSON.parse(JSON.stringify(data))
      this.dialogInfo.flag = DIALOG_TYPE_REPORT
      this.dialogInfo.visible = true
    },

    /* 取消发运 */
    cancelShip() {
      this.accept = [{ type: 'img', limit: 3 }]
      this.initDialogCancelShip()
      this.dialogInfo.flag = DIALOG_TYPE_CANCEL
      this.dialogInfo.visible = true
    },

    /* 关闭弹框页面 */
    close() {
      this.dialogInfo.ref && this.dialogInfo.ref.resetFields()
      this.dialogInfo.visible = false
    },

    save() {
      this.dialogInfo.ref.validate(valid => {
        if (valid) {
          const params = {
            evidenceList: this.evidenceList
          }
          if (this.dialogInfo.flag === DIALOG_TYPE_ADD) { // 预约登记
            for (const key in this.dialogInfo.data) {
              params[key] = this.dialogInfo.data[key]
            }
            params.remark = this.dialogInfo.data.appointRemark
          } else if (this.dialogInfo.flag === DIALOG_TYPE_REPORT) { // 异常报备
            params.orderNo = this.curRowData.orderNo
            params.planOrderNo = this.curRowData.planOrderNo
            params.remark = this.dialogInfo.data.abnormalDesc
            params.operationType = this.dialogInfo.data.abnormalType
          } else if (this.dialogInfo.flag === DIALOG_TYPE_CANCEL) { // 取消发运
            params.remark = this.dialogInfo.data.remark
            params.ids = this.selections.map(item => item.id)
          }
          this.$showLoading()
          this.$store.dispatch(this.store + this.dialogInfo.flag, params).then(() => {
            const res = this.$store.state[this.modName][`${this.dialogInfo.flag}Resp`]
            if (res.code === 200) {
              this.initData()
              this.dialogInfo.visible = false
            }
          }).finally(() => {
            this.$hideLoading()
          })
        }
      })
    }
  }
}
