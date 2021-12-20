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
      for (const key in this.topForm.data) {
        this.topForm.data[key] = null
      }
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
     * 打开查看页面
     * @param data
     */
    openViewPage(data) {
      this.$router.push({ path: `/stowageListView/${data.assignOrderNo}` })
    },
    /**
     * 打开新增页面
     */
    openAddPage() {
      // 弹窗的类型：add
      this.dialogInfo.type = 'add'
      // 默认弹窗的标题：新增
      this.dialogInfo.title = this.$t('新增')
      // 弹窗是否显示
      this.dialogInfo.visible = true
      // 弹窗的保存按钮是否显示
      this.dialogInfo.btList[1].show = true
      // 绑定弹窗保存事件：saveAdd
      this.dialogInfo.btList[1].event = 'saveData'
      // 封装的新增表单的数据化配置
      this.diaFormInfoAddFieldList()
    },
    /**
     * 打开编辑页面
     * @param data
     */
    openEditPage(data) {
      // 弹窗的类型：edit
      this.dialogInfo.type = 'edit'
      // 默认弹窗的标题：修改
      this.dialogInfo.title = this.$t('table.edit')
      // 弹窗是否显示
      this.dialogInfo.visible = true
      // 弹窗的保存按钮是否显示
      this.dialogInfo.btList[1].show = true
      // 绑定弹窗保存事件
      this.dialogInfo.btList[1].event = 'editData'
      // this.editID = data.id;
      // 封装的修改表单的数据化配置
      this.diaFormInfoEditFieldList()
      // 为弹窗表单对应的字段赋值
      // this.diaFormInfo.data = this.$deepClone(data);
      this.queryRowData(data)
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
        if (resp) {
          this.listTypeInfo.assignmentStatusList = resp.assignmentStatusList
          this.listTypeInfo.deliveryTypeList = resp.deliveryTypeList
          this.listTypeInfo.transportTypeList = resp.transportTypeList
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
    /**
     * 查询行数据【查看/编辑数据从后台获取时用此方法】
     * @param data
     */
    queryRowData(data) {
      this.$store.dispatch(this.store + 'initUpdate', data.id).then(() => {
        this.diaFormInfo.data = this.$store.state[this.modName].initUpdateObj.entity
      })
    },
    /**
     * 新增数据
     */
    saveData() {
      this.diaFormInfo.ref.validate(valid => {
        if (valid) {
          this.$store.dispatch(this.store + 'saveData', this.diaFormInfo.data).then(() => {
            const resp = this.$store.state[this.modName].addResp
            if (resp.code === this.$successCode) {
              this.dialogInfo.visible = false
              this.initData()
            }
          })
        }
      })
    },
    /**
     * 编辑数据
     */
    editData() {
      this.diaFormInfo.ref.validate(valid => {
        if (valid) {
          this.$store.dispatch(this.store + 'editData', this.diaFormInfo.data).then(() => {
            const resp = this.$store.state[this.modName].editResp
            if (resp.code === this.$successCode) {
              this.dialogInfo.visible = false
              this.initData()
            }
          })
        }
      })
    },
    /**
     * 删除数据
     * @param data
     */
    deleteData(data) {
      this.$confirm(this.$t('确认删除选中的记录么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'deleteData', { 'id': data.id }).then(() => {
          const resp = this.$store.state[this.modName].deleteResp
          if (resp.code === this.$successCode) {
            this.initData()
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
    cancelAssign(data) {
      this.dialogInfo.type = 'edit'
      // 默认弹窗的标题：修改
      this.dialogInfo.title = '取消配载'
      // 弹窗是否显示
      this.dialogInfo.visible = true
      // 弹窗的保存按钮是否显示
      this.dialogInfo.btList[1].show = true
      // 绑定弹窗保存事件
      this.dialogInfo.btList[1].event = 'saveCancelAssign'
      this.assignOrderNo = data.assignOrderNo
      this.diaFormCancelPZFieldList()
    },
    saveCancelAssign() {
      this.diaFormInfo.ref.validate(valid => {
        if (valid) {
          const req = this.$deepClone(this.diaFormInfo.data)
          req.assignOrderNo = this.assignOrderNo
          req.evidenceList = this.evidenceList
          this.$store.dispatch(this.store + 'cancel', req).then(() => {
            const resp = this.$store.state[this.modName].cancelResp
            if (resp.code === this.$successCode) {
              this.$message.success('取消成功')
              this.initData()
              this.dialogInfo.visible = false
              this.evidenceList = []
            }
          })
        }
      })
    },
    // 确认发运
    confirmAssign(data) {
      const assignOrderNo = data.assignOrderNo
      if (!assignOrderNo) { return }
      this.$confirm(this.$t('是否确认发送运输订单？'), {
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'affirmDepart', assignOrderNo).then(() => {
          const resp = this.$store.state[this.modName].affirmResp
          if (resp.code === this.$successCode) {
            this.$message.success('已发运')
            this.initData()
          }
        })
      })
    },
    // 一键装车
    quickIn() {
      const assignS = this.tableSelected.map(item => {
        return item.assignOrderNo
      })
      this.$store.dispatch(this.store + 'quickInCar', { orderNoList: assignS }).then(() => {
        const resp = this.$store.state[this.modName].quickInResp
        if (resp.code === this.$successCode) {
          this.$message.success(this.$t('comm.success'))
          this.initData()
        } else {
          this.$message.error(resp.msg || this.$t('comm.fail'))
        }
      })
    },
    // 一键卸货
    quickOut() {
      const assignS = this.tableSelected.map(item => {
        return item.assignOrderNo
      })
      this.$store.dispatch(this.store + 'quickOutCar', { orderNoList: assignS }).then(() => {
        const resp = this.$store.state[this.modName].quickOutResp
        if (resp.code === this.$successCode) {
          this.$message.success(this.$t('comm.success'))
          this.initData()
        } else {
          this.$message.error(resp.msg || this.$t('comm.fail'))
        }
      })
    },
    tableCheck(data) {
      this.tableSelected = data
      this.disabledQ = !data.length
    },
    selectOwner(data, obj) {
      this.topForm.data.ownerCode = obj.ownerCode
      this.topForm.data.ownerName = obj.ownerName
    },
    selectSender(data, obj) {
      this.topForm.data.senderName = obj.whName
      this.topForm.data.senderCode = data.whCode
    },
    selectReceiver(data, obj) {
      this.topForm.data.receiverName = obj.whName
      this.topForm.data.receiverCode = data.whCode
    },
    selectCarrier(data, obj) {
      this.topForm.data.carrierCode = obj.carrierCode
      this.topForm.data.carrierName = obj.carrierName
    }
  },
  // 页面初始化函数
  created() {
    this.initData()
    this.initPage()
  }
}

