export default {
  created() {
    this.initData()
    this.initPage()
  },
  methods: {
    /* 初始化数据 */
    initData() {
      // 默认查询第一页
      this.$setPageLimit(this.pageRequest, this.topForm.data)
      this.queryTableData(this.topForm.data)
    },

    /*  查询 */
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

    /* 翻页 */
    pageChange(val) {
      // 设置页码值为val
      this.$setPageChange(val, this.pageRequest, this.topForm.data)
      this.queryTableData(this.topForm.data)
    },

    /* 打开查看页面 */
    openViewPage(data) {
      // 弹窗的类型：view
      this.fullDialogInfo.type = 'view'
      // 默认弹窗的标题：修改
      this.fullDialogInfo.title = this.$t('table.view')
      // 弹窗是否显示
      this.fullDialogInfo.visible = true
      // 弹窗的保存按钮是否显示
      this.fullDialogInfo.btList[1].show = false
      // 绑定弹窗保存事件：viewSave
      this.fullDialogInfo.btList[1].event = 'viewSave'
      this.viewID = data.id
      // 封装的修改表单的数据化配置
      this.diaFormInfoViewFieldList()
      this.queryRowData(data)
    },

    /* 打开新增页面 */
    openAddPage() {
      // 弹窗的类型：add
      this.fullDialogInfo.type = 'add'
      // 默认弹窗的标题：新增
      this.fullDialogInfo.title = this.$t('table.add')
      // 弹窗是否显示
      this.fullDialogInfo.visible = true
      // 弹窗的保存按钮是否显示
      this.fullDialogInfo.btList[1].show = true
      // 绑定弹窗保存事件：saveAdd
      this.fullDialogInfo.btList[1].event = 'saveData'
      // 封装的新增表单的数据化配置
      this.diaFormInfoAddFieldList()
    },

    /**
     * 打开编辑页面
     * @param data
     */
    openEditPage(data) {
      // 弹窗的类型：edit
      this.fullDialogInfo.type = 'edit'
      // 默认弹窗的标题：修改
      this.fullDialogInfo.title = this.$t('table.edit')
      // 弹窗是否显示
      this.fullDialogInfo.visible = true
      // 弹窗的保存按钮是否显示
      this.fullDialogInfo.btList[1].show = true
      // 绑定弹窗保存事件
      this.fullDialogInfo.btList[1].event = 'editData'
      // 封装的修改表单的数据化配置
      this.diaFormInfoEditFieldList()
      this.queryRowData(data)
    },

    /* 关闭页面 */
    close() {
      this.fullDialogInfo.visible = false
      this.dialogInfo.visible = false
    },

    /* 页面初始化 */
    initPage() {
      this.$store.dispatch(this.store + 'initPage', {}).then(() => {
        const resp = this.$store.state[this.modName].initPageObj
        if (resp) {
          this.listTypeInfo.deliveryTypeList = resp.deliveryType
          this.listTypeInfo.isDefaultList = resp.isDefault
          this.listTypeInfo.transportTypeList = resp.transportType
          this.listTypeInfo.businessTypeList = resp.businessType
          this.listTypeInfo.dispatchModelList = resp.dispatchModel
          this.listTypeInfo.enableList = resp.isEnable
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

    /* 查询行数据 */
    queryRowData(data) {
      this.$store.dispatch(this.store + 'initUpdate', data.id).then(() => {
        this.fullDialogInfo.diaFormInfo.data = this.$store.state[this.modName].initUpdateObj.entity
        this.fullDialogInfo.diaTableInfo.data = this.$store.state[this.modName].initUpdateObj.items
      })
    },

    /* 保存新增数据 */
    saveData() {
      this.fullDialogInfo.diaFormInfo.ref.validate(valid => {
        if (valid) {
          const params = {
            ...this.fullDialogInfo.diaFormInfo.data,
            itemReqs: this.fullDialogInfo.diaTableInfo.data
          }
          this.$store.dispatch(this.store + 'saveData', params).then(() => {
            const resp = this.$store.state[this.modName].addResp
            if (resp.code === this.$successCode) {
              this.fullDialogInfo.visible = false
              this.initData()
            }
          })
        }
      })
    },

    /* 保存编辑数据 */
    editData() {
      this.fullDialogInfo.diaFormInfo.ref.validate(valid => {
        if (valid) {
          const params = {
            ...this.fullDialogInfo.diaFormInfo.data,
            itemReqs: this.fullDialogInfo.diaTableInfo.data
          }
          this.$store.dispatch(this.store + 'editData', params).then(() => {
            const resp = this.$store.state[this.modName].editResp
            if (resp.code === this.$successCode) {
              this.fullDialogInfo.visible = false
              this.initData()
            }
          })
        }
      })
    },

    // 添加明细
    openAddDtPage() {
      this.dialogInfo.title = this.$t('preSchedulingStrategy.addDetail')
      this.dialogInfo.visible = true
      this.dialogInfo.type = 'add'
      // 绑定弹窗保存事件
      this.dialogInfo.btList[1].event = 'saveAddDetail'
      this.senderList = []
      this.receiverList = []
      for (const key in this.dialogInfo.data) {
        this.dialogInfo.data[key] = null
      }
      this.dialogInfo.data.senderCode = []
      this.dialogInfo.data.senderName = []
      this.dialogInfo.data.receiverCode = []
      this.dialogInfo.data.receiverName = []
    },

    // 编辑明细
    editDt(data) {
      this.dialogInfo.title = this.$t('preSchedulingStrategy.editDetail')
      this.dialogInfo.visible = true
      this.dialogInfo.type = 'edit'
      // 绑定弹窗保存事件
      this.dialogInfo.btList[1].event = 'saveEditDetail'

      // this.editDtRow = this.$deepClone(data)
      this.dialogInfo.data = this.$deepClone(data)
    },

    // 删除明细
    deleteDt(data) {
      const diaTableDt = this.$deepClone(this.fullDialogInfo.diaTableInfo.data)
      this.$confirm(this.$t('preSchedulingStrategy.msg.delete'), {
        type: 'warning',
        center: true
      }).then(() => {
        diaTableDt.forEach((item, index) => {
          if (item.rowId == data.rowId) {
            this.fullDialogInfo.diaTableInfo.data.splice(index, 1)
          }
        })
      })
    },

    closeDetail() {
      this.dialogInfo.visible = false
    },

    saveAddDetail() {
      this.dialogInfo.ref.validate(valid => {
        if (valid) {
          // eslint-disable-next-line no-unused-vars
          const { senderCode, senderName, receiverName, receiverCode, ...res } = this.dialogInfo.data
          let arr = []
          if (this.senderList.length) {
            this.senderList.forEach((sender) => {
              this.receiverList.forEach((receiver) => {
                arr.push({
                  ...res,
                  senderCode: sender.value,
                  senderName: sender.key,
                  receiverName: receiver.key,
                  receiverCode: receiver.value
                })
              })
            })
          } else {
            arr = [{ ...res }]
          }
          this.fullDialogInfo.diaTableInfo.data = this.fullDialogInfo.diaTableInfo.data.concat(arr)
          this.closeDialog()
        }
      })
    },
    saveEditDetail() {
      this.dialogInfo.ref.validate(valid => {
        if (valid) {
          const diaTableDt = this.$deepClone(this.fullDialogInfo.diaTableInfo.data)
          const dialogDt = JSON.parse(JSON.stringify(this.dialogInfo.data))
          const index = diaTableDt.findIndex(item => {
            return item.rowId === dialogDt.rowId
          })
          this.fullDialogInfo.diaTableInfo.data.splice(index, 1, dialogDt)
          this.closeDialog()
        }
      })
    },
    closeDialog() {
      this.dialogInfo.visible = false
      for (const key in this.dialogInfo.data) {
        this.dialogInfo.data[key] = null
      }
    }
  }
}
