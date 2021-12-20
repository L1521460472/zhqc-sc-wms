// 自定义事件处理
export default {
  methods: {
    /**
     * 初始化数据
     */
    initData() {
      if (this.validateTime()) {
        // 默认查询第一页
        this.$setPageLimit(this.pageRequest, this.topForm.data)
        this.queryTableData(this.topForm.data)
      }
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

    validateTime() {
      if (
        (this.topForm.data.actualSendDateBegin && !this.topForm.data.actualSendDateEnd) ||
        (!this.topForm.data.actualSendDateBegin && this.topForm.data.actualSendDateEnd)
      ) {
        this.$message.error('请输入时间区间')
        return false
      }
      return true
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
      this.$router.push({ path: `/waybillView/${data.transportNo}` })
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
      this.fullDialogInfo.type = 'edit'
      // 默认弹窗的标题：修改
      this.fullDialogInfo.title = '改派'
      // 弹窗是否显示
      this.fullDialogInfo.visible = true
      // 弹窗的保存按钮是否显示
      this.fullDialogInfo.btList[1].show = false
      // 绑定弹窗保存事件
      this.fullDialogInfo.btList[1].event = 'editData'
      this.editID = data.transportNo
      // 封装的修改表单的数据化配置
      this.diaFormInfoEditFieldList()
      // 为弹窗表单对应的字段赋值
      // this.diaFormInfo.data = this.$deepClone(data);
      this.queryRowData(data).then(() => {
        this.queryTransportTripList()
      })
    },
    openEditRoutePage(data) {
      // 弹窗的类型：edit
      this.fullDialogInfo.type = 'editRout'
      // 默认弹窗的标题：修改
      this.fullDialogInfo.title = '路由维护'
      // 弹窗是否显示
      this.fullDialogInfo.visible = true
      // 弹窗的保存按钮是否显示
      this.fullDialogInfo.btList[1].show = true
      // 绑定弹窗保存事件
      this.fullDialogInfo.btList[1].event = 'editRouteData'
      // this.editID = data.id;
      // 封装的修改表单的数据化配置
      this.diaFormInfoEditFieldList()
      // 为弹窗表单对应的字段赋值
      // this.diaFormInfo.data = this.$deepClone(data);
      // 路由维护配置
      this.RtouteFormInfoFieldList()
      this.queryRowData(data)
      this.queryTransportRouteList(data.transportNo)
    },

    editRouteData() {
      const arr = this.fullDiaFormInfo.dtTableInfoRoute.data
      const arr2 = this.listTypeInfo.transportStatusList
      arr.forEach((item) => {
        if (!item.id) {
          arr2.forEach((e) => {
            if (item.transportStatusName === e.key) {
              item.transportStatus = e.value
            }
          })
        }
      })
      const params = {
        transportRouteList: arr
      }
      this.fullDiaFormInfo.dtTableInfoRoute.ref.validate(true).then((err) => {
        if (!err) {
          this.$store.dispatch(this.store + 'updateTransportRoute', params).then(() => {
            const resp = this.$store.state[this.modName].updataTransportRouteResp
            if (resp.code === this.$successCode) {
              this.fullDialogInfo.visible = false
              this.initData()
            }
          })
        }
      })
    },
    /**
     * 关闭页面
     */
    close() {
      this.fullDialogInfo.visible = false
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
        const resp = this.$store.state[this.modName].initPageObj
        if (resp) {
          this.listTypeInfo.orderDateNameList = resp.orderDateNameList
          this.listTypeInfo.orderPsTypeList = resp.orderPsTypeList
          this.listTypeInfo.errorReportList = resp.errorReportList
          this.listTypeInfo.deliveryTypeList = resp.deliveryTypeList
          this.listTypeInfo.transportStatusList = resp.transportStatusList
          this.listTypeInfo.transportTypeList = resp.transportTypeList

          this.listTypeInfo.VexTransportStatusList = []
          resp.transportStatusList.forEach((item) => {
            this.listTypeInfo.VexTransportStatusList.push({ label: item.key, value: item.value, code: item.value })
          })
          this.listTypeInfo.vxeOrderDateNameList = []
          resp.orderDateNameList.forEach((item) => {
            this.listTypeInfo.vxeOrderDateNameList.push({ label: item.key, value: item.value, code: item.value })
          })
        }
      })

      this.$store.dispatch(this.store + 'queryTransportStatusByRoute').then(() => {
        const result = this.$store.state[this.modName].transportStatusByRouteResp
        if (result) {
          this.listTypeInfo.transportStatusByRouteList = []
          result?.obj?.transportStatusList.forEach((item) => {
            this.listTypeInfo.transportStatusByRouteList.push({ label: item.key, value: item.key, code: item.key })
          })
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
      return this.$store.dispatch(this.store + 'initUpdate', data.id).then(() => {
        this.fullDiaFormInfo.data = this.$store.state[this.modName].initUpdateObj.entity
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
      this.fullDiaFormInfo.ref.validate(valid => {
        if (valid) {
          this.close()
          // this.$store.dispatch(this.store + 'editData', this.diaFormInfo.data).then(() => {
          //   const resp = this.$store.state[this.modName].editResp
          //   if (resp.code === this.$successCode) {
          //     this.dialogInfo.visible = false
          //     this.initData()
          //   }
          // })
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
    // 查看运输单行程信息
    queryTransportTripList() {
      const data = this.editID
      if (!data) { return }
      this.$store.dispatch(this.store + 'queryTransportTripList', data).then(() => {
        const result = this.$store.state[this.modName].transportTripResp
        this.fullDiaFormInfo.dtTableInfo.data = result.obj
      })
    },

    // 查看运输单路由信息
    queryTransportRouteList(data) {
      if (!data) { return }
      this.$store.dispatch(this.store + 'queryTransportRouteList', data).then(() => {
        const result = this.$store.state[this.modName].transportRouteResp
        if (result.code === this.$successCode) {
          // this.fullDiaFormInfo.dtTableInfo.data = result.obj
          this.fullDiaFormInfo.dtTableInfoRoute.data = result.obj
        }
      })
    },

    // 编辑改派
    editTransportDt(data) {
      this.dialogInfo.title = '编辑改派'
      this.dialogInfo.visible = true
      this.dialogInfo.type = 'edit'
      // 绑定弹窗保存事件
      this.dialogInfo.btList[1].event = 'saveTransportDt'
      this.diaFormInfoFieldList()
      this.getTransportTripInfo(data)
    },
    // 改派详情
    getTransportTripInfo(data) {
      this.$store.dispatch(this.store + 'getTransportTripInfo', data.id).then(() => {
        const resp = this.$store.state[this.modName].transportTripInfoResp
        if (resp.code === this.$successCode) {
          this.diaFormInfo.data = resp.obj
        }
      })
    },
    // 保存改派
    saveTransportDt() {
      this.diaFormInfo.ref.validate(valid => {
        if (valid) {
          const reqData = this.$deepClone(this.diaFormInfo.data)
          this.$store.dispatch(this.store + 'updateTransportTripInfo', reqData).then(() => {
            const resp = this.$store.state[this.modName].updateTripInfoResp
            if (resp.code === this.$successCode) {
              this.queryTransportTripList()
              this.dialogInfo.visible = false
            }
          })
        }
      })
    },
    //  异常报备
    openAbnormalPage(data) {
      this.dialogInfoAbnormal.type = 'add'
      // 默认弹窗的标题：新增
      this.dialogInfoAbnormal.title = this.$t('waybill.abnormal')
      // 弹窗是否显示
      this.dialogInfoAbnormal.visible = true
      // 弹窗的保存按钮是否显示
      this.dialogInfoAbnormal.btList[1].show = true
      // 绑定弹窗保存事件：saveAdd
      this.dialogInfoAbnormal.btList[1].event = 'saveAbnormalData'
      this.transportNo = data.transportNo
      this.diaFormInfoAbnormalFieldList()
    },
    saveAbnormalData() {
      this.diaFormInfoAbnormal.ref.validate(valid => {
        if (valid) {
          const reqAbnormal = this.$deepClone(this.diaFormInfoAbnormal.data)
          reqAbnormal.evidenceList = this.evidenceList
          reqAbnormal.transportNo = this.transportNo
          this.$store.dispatch(this.store + 'errReportTransportOrder', reqAbnormal).then(() => {
            const resp = this.$store.state[this.modName].errorTripInfoResp
            if (resp.code === this.$successCode) {
              this.$message.success('报备成功！')
              this.initData()
              this.dialogInfoAbnormal.visible = false
              this.evidenceList = []
            }
          })
        }
      })
    },
    closeAbnormal() {
      this.dialogInfoAbnormal.visible = false
    },
    //  取消
    openCancelPage(data) {
      this.dialogInfoAbnormal.type = 'add'
      // 默认弹窗的标题：新增
      this.dialogInfoAbnormal.title = this.$t('waybill.cancel')
      // 弹窗是否显示
      this.dialogInfoAbnormal.visible = true
      // 弹窗的保存按钮是否显示
      this.dialogInfoAbnormal.btList[1].show = true
      // 绑定弹窗保存事件：saveAdd
      this.dialogInfoAbnormal.btList[1].event = 'saveCancelData'
      this.transportNo = data.transportNo
      this.diaFormInfoCancelFieldList()
    },
    saveCancelData() {
      this.diaFormInfoAbnormal.ref.validate(valid => {
        if (valid) {
          const cancelData = this.$deepClone(this.diaFormInfoAbnormal.data)
          cancelData.evidenceList = this.evidenceList
          cancelData.transportNo = this.transportNo
          this.$store.dispatch(this.store + 'cancelTransportOrder', cancelData).then(() => {
            const resp = this.$store.state[this.modName].cancelTripInfoResp
            if (resp.code === this.$successCode) {
              this.$message.success('取消成功！')
              this.initData()
              this.dialogInfoAbnormal.visible = false
              this.evidenceList = []
            }
          })
        }
      })
    },
    closeDiaLog() {
      this.dialogInfo.visible = false
    },
    // 路由添加
    addDt() {
      const obj = this.fullDiaFormInfo.data
      if (!obj.transportNo) {
        return
      }
      const data = {
        transportNo: obj.transportNo,
        transportStatus: null,
        transportStatusName: null,
        location: null,
        orderDateKey: null,
        orderDate: null,
        remark: null,
        creatorName: null,
        createTime: null
      }
      this.fullDiaFormInfo.dtTableInfoRoute.data.unshift(data)
    },
    // 路由删除
    deleteDt(data) {
      if (data.id) {
        this.$store.dispatch(this.store + 'delTransportRouteInfo', { id: data.id }).then(() => {
          const resp = this.$store.state[this.modName].delTransportRouteInfoResp
          if (resp.code === this.$successCode) {
            this.fullDiaFormInfo.dtTableInfoRoute.data.splice(data.$rowIndex, 1)
          }
        })
      } else {
        this.fullDiaFormInfo.dtTableInfoRoute.data.splice(data.$rowIndex, 1)
      }
    }
  },
  // 页面初始化函数
  created() {
    this.initData()
    this.initPage()
  }
}
