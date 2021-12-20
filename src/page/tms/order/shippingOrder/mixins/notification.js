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
      this.topForm.data = {
        orderNo: null,
        sourceSystem: null,
        cOrderNo: null,
        status: null,
        ownerId: null,
        ownerName: null,
        deliveryType: null,
        orderPsType: null,
        senderName: null,
        receiverName: null,
        lineCode: null,
        lineType: null,
        carrierName: null,
        carrierCode: null,
        createTimeBegin: null,
        createTimeEnd: null
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
      this.$router.push({ path: `/shippingOrderView/${data.orderNo}` })
    },
    /**
     * 打开新增页面
     */
    openAddPage() {
      // 弹窗的类型：add
      this.fullDialogInfo.type = 'add'
      // 默认弹窗的标题：新增
      this.fullDialogInfo.title = this.$t('新增')
      // 弹窗是否显示
      this.fullDialogInfo.visible = true
      // 弹窗的保存按钮是否显示
      this.fullDialogInfo.btList[1].show = true
      // 绑定弹窗保存事件：saveAdd
      this.fullDialogInfo.btList[1].event = 'fullSaveData'
      // 初始化计数
      // this.receiveNum = 3
      // this.sendNum = 3
      // 封装的新增表单的数据化配置

      this.popTableInfo.data = []
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
      // this.editID = data.id;
      // 封装的修改表单的数据化配置
      // 初始化计数
      this.receiveNum = 0
      this.sendNum = 0
      this.diaFormInfoEditFieldList()
      // 为弹窗表单对应的字段赋值
      // this.fullDiaFormInfo.data = this.$deepClone(data);
      this.queryRowData(data)
    },
    matchLine() {
      // 线路匹配

      this.fullDialogInfo.type = 'matchLine'

      this.fullDialogInfo.title = '线路匹配'

      this.fullDialogInfo.visible = true

      this.fullDialogInfo.btList[1].show = false
    },
    preScheduling() {
      this.$store.dispatch(this.store + 'preDispatchAll', {}).then(() => {
        const result = this.$store.state[this.modName].preDispatchAllResp
        if (result.code === this.$successCode) {
          // 预调度

          this.fullDialogInfo.type = 'preScheduling'

          this.fullDialogInfo.title = '预调度'

          this.fullDialogInfo.visible = true

          this.fullDialogInfo.btList[1].show = false
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
    bottomClose() {
      this.dialogInfo.visible = false
    },
    remove(data) {
      this.$confirm(this.$t('确认移除选中的记录么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        const { rowIndex } = data

        this.popTableInfo.data.splice(rowIndex, 1)
      })
    },

    /**
     * 页面初始化
     */
    initPage() {
      this.$store.dispatch(this.store + 'initPage', {}).then(() => {
        const result = this.$store.state[this.modName].initPageObj
        this.listTypeInfo.deliveryTypeList = result.deliveryTypeList
        this.listTypeInfo.orderPsTypeList = result.orderPsTypeList
        this.listTypeInfo.orderSendTypeList = result.orderSendTypeList
        this.listTypeInfo.statusList = result.statusList
        this.listTypeInfo.lineTypeList = result.lineTypeList
        this.listTypeInfo.businessTypeList = result.businessTypeList
        this.listTypeInfo.unloadTypeList = result.unloadTypeEnumList
        this.listTypeInfo.transportTypeList = result.transportTypeEnumList
        this.listTypeInfo.sourceSystemList = result.sourceSystemList
        this.listTypeInfo.sourceSystemKeyList = []
        result.sourceSystemList.forEach((item) => {
          this.listTypeInfo.sourceSystemKeyList.push({ key: item.key, value: item.key })
        })
      })
    },
    /**
     * 查询表格数据
     * @param data
     */
    queryTableData(data) {
      this.$showLoading()
      this.$store.dispatch(this.store + 'pageInfo', data).then(() => {
        const result = this.$store.state[this.modName].pageResp
        if (result.code === this.$successCode) {
          this.tableSelectList = []
        }
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
        const result = this.$store.state[this.modName].initUpdateObj
        this.fullDiaFormInfo.data = result.entity
        this.popTableInfo.data = result.itemList
      })
    },

    /**
     * 新增数据
     */
    fullSaveData() {
      this.fullDiaFormInfo.ref.validate(valid => {
        if (valid) {
          const { palnSendDate, palnDeliverDate } = this.fullDiaFormInfo.data
          var start = new Date(palnSendDate)
          var end = new Date(palnDeliverDate)
          if (end.getTime() >= start.getTime()) {
            const parmas = {
              ...this.fullDiaFormInfo.data,
              items: this.popTableInfo.data || []
            }
            if (parmas.items.length <= 0) {
              this.$message.error('至少添加一组商品')
            } else {
              this.$store.dispatch(this.store + 'saveData', parmas).then(() => {
                const resp = this.$store.state[this.modName].addResp
                if (resp.code === this.$successCode) {
                  this.fullDialogInfo.visible = false
                  this.initData()
                }
              })
            }
          } else {
            this.$message.error('发运时间要在到达时间之前')
            return
          }
        }
      })
    },
    /**
     * 编辑数据
     */
    editData() {
      this.fullDiaFormInfo.ref.validate(valid => {
        if (valid) {
          const { palnSendDate, palnDeliverDate } = this.fullDiaFormInfo.data
          var start = new Date(palnSendDate)
          var end = new Date(palnDeliverDate)
          if (end.getTime() >= start.getTime()) {
            const parmas = {
              ...this.fullDiaFormInfo.data,
              items: this.popTableInfo.data
            }
            if (parmas.items.length <= 0) {
              this.$message.error('至少添加一组商品')
            } else {
              this.$store.dispatch(this.store + 'editData', parmas).then(() => {
                const resp = this.$store.state[this.modName].editResp
                if (resp.code === this.$successCode) {
                  this.fullDialogInfo.visible = false
                  this.initData()
                }
              })
            }
          } else {
            this.$message.error('发运时间要在到达时间之前')
            return
          }
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
    // 表格里的勾选框
    tableCheck(list) {
      this.tableSelectList = list
    },
    // 批量下发
    batchDistribution() {
      this.$confirm(this.$t('确认下发运输订单么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        const array = []
        this.tableSelectList.forEach(item => {
          array.push(item.id)
        })
        this.$store.dispatch(this.store + 'batchSend', array).then(() => {
          const resp = this.$store.state[this.modName].batchSendResp
          if (resp.code === this.$successCode) {
            this.$message.success(resp.msg)
            this.initData()
          }
        })
      })
    },
    // 审核
    examine() {
      // 弹窗的类型：edit
      this.examineDialog.type = 'examine'
      // 默认弹窗的标题：修改
      this.examineDialog.title = '订单审核'
      // 弹窗是否显示
      this.examineDialog.visible = true
      // 弹窗的保存按钮是否显示
      this.examineDialog.btList[1].show = true
      // 绑定弹窗保存事件
      this.examineDialog.btList[1].event = 'examineSure'
      // this.editID = data.id;
      // 封装的修改表单的数据化配置
      this.examineFormInfo()
    },
    // 反审
    counterTrial() {
      // 弹窗的类型：edit
      this.examineDialog.type = 'counterTrial'
      // 默认弹窗的标题：修改
      this.examineDialog.title = '订单反审'
      // 弹窗是否显示
      this.examineDialog.visible = true
      // 弹窗的保存按钮是否显示
      this.examineDialog.btList[1].show = true
      // 绑定弹窗保存事件
      this.examineDialog.btList[1].event = 'trialSure'
      // this.editID = data.id;
      // 封装的修改表单的数据化配置
      this.trialFormInfo()
    },
    examineClose() {
      this.examineDialog.visible = false
    },
    // 审核确认
    examineSure() {
      this.examineDiaForm.ref.validate(valid => {
        if (valid) {
          const array = []
          this.tableSelectList.forEach(item => {
            array.push(item.id)
          })
          const params = {
            ids: array,
            remark: this.examineDiaForm.data.value
          }
          this.$store.dispatch(this.store + 'batchConfirm', params).then(() => {
            const resp = this.$store.state[this.modName].batchConfirmResp
            if (resp.code === this.$successCode) {
              this.$message.success(resp.msg)
              this.initData()
              this.examineClose()
            }
          })
        }
      })
    },
    // 反审确认
    trialSure() {
      this.examineDiaForm.ref.validate(valid => {
        if (valid) {
          const array = []
          this.tableSelectList.forEach(item => {
            array.push(item.id)
          })
          const params = {
            ids: array,
            remark: this.examineDiaForm.data.value
          }
          this.$store.dispatch(this.store + 'batchUnConfirm', params).then(() => {
            const resp = this.$store.state[this.modName].batchUnConfirmResp
            if (resp.code === this.$successCode) {
              this.$message.success(resp.msg)
              this.initData()
              this.examineClose()
            }
          })
        }
      })
    },

    nextData(data) {
      // 下发
      this.$confirm(this.$t('确认下发运输订单么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        const array = [data.id]
        this.$store.dispatch(this.store + 'batchSend', array).then(() => {
          const resp = this.$store.state[this.modName].batchSendResp

          if (resp.code === this.$successCode) {
            this.$message.success(resp.msg)
            this.initData()
          }
        })
      })
    },
    cancleData(data) {
      // 取消
      this.$confirm(this.$t('确认取消运输订单么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'batchCancel', [data.id]).then(() => {
          const resp = this.$store.state[this.modName].batchCancelResp
          if (resp.code === this.$successCode) {
            this.$message.success(resp.msg)
            this.initData()
          }
        })
      })
    },
    addItem() {
      // 添加商品
      this.dialogInfo.type = 'addItem'
      // 默认弹窗的标题：新增
      this.dialogInfo.title = this.$t('添加商品')
      // 弹窗是否显示
      this.dialogInfo.visible = true
      // 弹窗的保存按钮是否显示
      this.dialogInfo.btList[1].show = true
      // 绑定弹窗保存事件：saveAdd
      this.dialogInfo.btList[1].event = 'saveItem'
      this.initAddItem()
      this.$nextTick(() => {
        this.$refs.orderSku.clear()
      })
    },
    saveItem() {
      this.diaFormInfo.ref.validate(valid => {
        if (valid) { // 查询表单校验
          const item = {
            ...this.diaFormInfo.data,
            money: this.diaFormInfo.data.price * this.diaFormInfo.data.num
          }
          this.popTableInfo.data.push(item)
          this.bottomClose()
        }
      })
    }
  },
  // 页面初始化函数
  created() {
    this.initData()
    this.initPage()
  }
}
