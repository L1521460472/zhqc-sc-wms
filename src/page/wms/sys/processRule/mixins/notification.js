const qs = require('qs')
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

    initPage() {
      this.$store.dispatch(this.store + 'initPage', {}).then(() => {
        const resp = this.$store.state[this.modName].initPageObj
        if (resp.code === this.$store.state[this.modName].successCode) {
          const { businessTypeList, isDefaultList, isVirtualList, processTypeList, runTypeList, sourceSystemList, isEnableList } = resp.obj
          this.listTypeInfo.businessTypeList = businessTypeList
          this.listTypeInfo.isDefaultList = isDefaultList
          this.listTypeInfo.isVirtualList = isVirtualList
          this.listTypeInfo.processTypeList = processTypeList
          this.listTypeInfo.runTypeList = runTypeList
          this.listTypeInfo.sourceSystemList = sourceSystemList
          this.listTypeInfo.isEnableList = isEnableList
        }
      })
    },
    /* 重置 */
    reboot() {
      for (const key in this.topForm.data) {
        this.topForm.data[key] = null
      }
    },
    /** *
       * 获取仓库名称，仓库id
       */
    queryId() {
      this.$nextTick(() => {
        const storehouseName = window.sessionStorage.getItem('warehouseName')
        const whId = window.sessionStorage.getItem('warehouseId')
        if (storehouseName) {
          this.fullDialogInfo.topForm1.data.storehouseName = storehouseName
          this.fullDialogInfo.topForm1.data.whId = whId
        }
      })
    },
    /**
     * 查询行数据【查看/编辑数据从后台获取时用此方法】
     * @param data
     */
    queryRowData(data) {
      this.$store.dispatch(this.store + 'initUpdate', data.id).then(() => {
        const objData = this.$store.state[this.modName].initUpdateObj
        if (objData.code === this.$successCode) {
          this.queryId()
          this.fullDialogInfo.topForm1.data = objData.obj.entity
          this.fullDialogInfo.tableInfo.data = objData.obj.items
        }
      })
    },
    /** *
     * 查看页面
     */
    view(data) {
      this.fullDialogInfo.type = 'view'
      this.fullDialogInfo.title = this.$t('processRule.view')
      this.fullDialogInfo.btList[1].show = false
      this.dialogInfo.btList[1].event = 'viewSave'
      this.initDiaFormView()
      this.fullDialogInfo.visible = true
      this.queryRowData(data)
    },
    /**
     * 选择销售仓时，带出销售仓关联货主，不可修改
     * @param a
     * @param b
     */
    handleWhArea(a, b) {
      const { ownerName, ownerCode } = b
      this.$nextTick(() => {
        this.fullDialogInfo.topForm1.data.ownerName = ownerName
        this.fullDialogInfo.topForm1.data.ownerCode = ownerCode
        // if (b.length > 0) {
        //   this.fullDialogInfo.topForm1.data.ownerName = ownerName
        //   this.fullDialogInfo.topForm1.data.ownerCode = ownerCode
        // } else {
        //   this.fullDialogInfo.topForm1.data.ownerName = ''
        //   this.fullDialogInfo.topForm1.data.ownerCode = ''
        //   // this.fullDialogInfo.topForm1.data.whAreaId = ''
        //   console.log(b)
        // }
      })
    },
    /* 打开新增页面 */
    create() {
      this.fullDialogInfo.type = 'add'
      this.queryId()
      this.fullDialogInfo.title = this.$t('processRule.add')
      // 绑定弹窗保存事件：saveAdd
      this.fullDialogInfo.btList[1].event = 'saveData'
      this.fullDialogInfo.btList[1].show = true
      this.initDiaFormAdd()
      this.fullDialogInfo.visible = true
    },
    /**
     * 保存新增页面
     * */
    saveData() {
      this.fullDialogInfo.topForm1.ref.validate(valid => {
        if (valid) {
          const obj = {
            ...this.fullDialogInfo.topForm1.data,
            dtReqList: this.fullDialogInfo.tableInfo.data
          }
          this.$store.dispatch(this.store + 'add', obj).then(() => {
            const resp = this.$store.state[this.modName].addResp
            if (resp.code === this.$successCode) {
              this.fullDialogInfo.visible = false
              this.initData()
            }
          })
        }
      })
    },
    /* 打开编辑页面 */
    edit(data) {
      this.fullDialogInfo.type = 'edit'
      this.fullDialogInfo.title = this.$t('processRule.edit')
      this.fullDialogInfo.btList[1].show = true
      this.initDiaFormEdit()
      this.fullDialogInfo.visible = true
      this.queryRowData(data)
      this.fullDialogInfo.btList[1].event = 'editData'
    },
    /** *
     * 保存编辑页面
     */
    editData() {
      this.fullDialogInfo.topForm1.ref.validate(valid => {
        if (valid) {
          const obj = {
            ...this.fullDialogInfo.topForm1.data,
            dtReqList: this.fullDialogInfo.tableInfo.data
          }
          this.$store.dispatch(this.store + 'editData', obj).then(() => {
            const resp = this.$store.state[this.modName].editResp
            if (resp.code === this.$successCode) {
              this.fullDialogInfo.visible = false
              this.initData()
            }
          })
        }
      })
    },
    /* 关闭弹框页面 */
    close() {
      this.fullDialogInfo.visible = false
    },
    /* 启用 */
    enable(data) {
      this.$confirm(this.$t('processRule.msg.enable'), this.$t('processRule.tips'), {
        confirmButtonText: this.$t('table.confirm'),
        cancelButtonText: this.$t('table.cancel')
      }).then(() => {
        this.$store.dispatch(this.store + 'enable', { 'id': data.id }).then(() => {
          const resp = this.$store.state[this.modName].enableResp
          if (resp.code === this.$successCode) {
            this.queryTableData(this.topForm.data)
          }
        })
      }).catch(() => {})
    },

    /* 停用 */
    disenable(data) {
      this.$confirm(this.$t('processRule.msg.disenable'), this.$t('processRule.tips'), {
        confirmButtonText: this.$t('table.confirm'),
        cancelButtonText: this.$t('table.cancel')
      }).then(() => {
        this.$store.dispatch(this.store + 'deactivate', { 'id': data.id }).then(() => {
          const resp = this.$store.state[this.modName].deactivateResp
          if (resp.code === this.$successCode) {
            this.queryTableData(this.topForm.data)
          }
        })
      }).catch(() => {})
    },
    // 添加明细
    openAddDtPage() {
      this.dialogInfo.title = this.$t('processRule.addDetail')
      this.dialogInfo.visible = true
      this.dialogInfo.type = 'add'
      this.dialogInfo.btList[1].event = 'saveDetail'
      for (const key in this.dialogInfo.data) {
        this.dialogInfo.data[key] = null
      }
    },
    /** *
     * 保存明细
     */
    saveDetail() {
      this.dialogInfo.ref.validate(valid => {
        if (valid) {
          const obj = JSON.parse(JSON.stringify(this.dialogInfo.data))
          this.fullDialogInfo.tableInfo.data.push(obj)
          this.closeDetail()
        }
      })
    },
    // 打开编辑明细
    editDt(data) {
      this.dialogInfo.title = this.$t('processRule.editDetail')
      this.dialogInfo.visible = true
      this.dialogInfo.type = 'edit'
      this.businessTypeChange(data.businessType)
      // 绑定弹窗保存事件
      this.dialogInfo.btList[1].event = 'saveEditDetail'
      this.dialogInfo.data = this.$deepClone(data)
      // if (data.sourceSystem) { this.dialogInfo.data.sourceSystem = Number(data.sourceSystem) }
    },
    closeDetail() {
      this.dialogInfo.visible = false
    },
    saveEditDetail() {
      this.dialogInfo.ref.validate(valid => {
        if (valid) {
          const diaTableDt = this.$deepClone(this.fullDialogInfo.tableInfo.data)
          const dialogDt = JSON.parse(JSON.stringify(this.dialogInfo.data))
          const index = diaTableDt.findIndex(item => {
            return item.id === dialogDt.id
          })
          this.fullDialogInfo.tableInfo.data.splice(index, 1, dialogDt)
          this.closeDetail()
        }
      })
    },
    // 删除明细
    deleteDt(data) {
      // const diaTableDt = this.$deepClone(this.fullDialogInfo.tableInfo.data)
      this.$confirm(this.$t('processRule.msg.delete'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.fullDialogInfo.tableInfo.data.splice(data.rowIndex, 1)
        // diaTableDt.forEach((item, index) => {
        //   if (item.id === data.id) {
        //     this.fullDialogInfo.tableInfo.data.splice(index, 1)
        //   }
        // })
        this.$message.success('删除成功')
      })
    },
    // 弹窗业务类型change事件
    businessTypeChange(val) {
      this.dialogInfo.data.orderType = null
      this.dialogInfo.data.processType = null
      this.dialogInfo.data.runType = null
      /**
       * businessType:业务类型
       * 1：流程类型 2订单类型 3 执行类型
       */
      this.doSomeType(val, 3, 'executionTypeList')
      this.doSomeType(val, 2, 'orderTypeList')
      this.doSomeType(val, 1, 'processTypeList')
    },
    /**
     * 根据业务类型获取不同的枚举
     * */
    doSomeType(val, type, listName) {
      const params = {
        businessType: val,
        type: type
      }
      this.$store.dispatch(this.store + 'queryEnumList', qs.stringify(params)).then(() => {
        const resp = this.$store.state[this.modName].enumListResp
        if (resp.code === this.$successCode) {
          this.listTypeInfo[listName] = resp.obj
        }
      })
    }
  }
}
