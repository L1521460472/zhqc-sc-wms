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
      this.topForm.data.ownerId = null
      this.topForm.data.replenishNo = null
      this.topForm.data.replenishStatus = null
      this.topForm.data.replenishOrigin = null
      this.topForm.data.zoneId = null
      this.topForm.data.lotId = null
      this.topForm.data.skuId = null
      this.topForm.data.createTimeBegin = null
      this.topForm.data.createTimeEnd = null
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
      // 弹窗的类型：view
      this.dialogInfo.type = 'view'
      // 默认弹窗的标题：修改
      this.dialogInfo.title = this.$t('查看')
      // 弹窗是否显示
      this.dialogInfo.visible = true
      // 弹窗的保存按钮是否显示
      this.dialogInfo.btList[1].show = false
      // 绑定弹窗保存事件：viewSave
      this.dialogInfo.btList[1].event = 'viewSave'
      this.viewID = data.id
      // 封装的修改表单的数据化配置
      this.diaFormInfoViewFieldList()
      // 为弹窗表单对应的字段赋值
      // this.diaFormInfo.data = this.$deepClone(data);
      this.queryRowData(data)
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
          this.listTypeInfo.replenishStatusList = resp.obj.replenishStatusList
          this.listTypeInfo.replenishTypeList = resp.obj.replenishTypeList
          this.listTypeInfo.replenishOriginList = resp.obj.replenishOriginList
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
        if (this.diaFormInfo.ref) {
          this.diaFormInfo.ref.clearValidate()
        }
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
              this.queryTableData(this.topForm.data)
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

    /**
     * 审核
     * @param data
     */
    audit(data) {
      const param = [data.id]
      this.$confirm(this.$t('确认审核选中记录么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'audit', param).then(() => {
          const resp = this.$store.state[this.modName].auditResp
          if (resp.code === this.$successCode) {
            this.queryTableData(this.topForm.data)
          }
        })
      })
    },

    /**
     * 取消审核
     * @param data
     */
    cancelAudit(data) {
      const param = [data.id]
      this.$confirm(this.$t('确认取消审核选中记录么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'cancelAudit', param).then(() => {
          const resp = this.$store.state[this.modName].cancelAuditResp
          if (resp.code === this.$successCode) {
            this.queryTableData(this.topForm.data)
          }
        })
      })
    },

    /**
     * 取消
     * @param data
     */
    cancel(data) {
      const param = [data.id]
      this.$confirm(this.$t('确认取消选中记录么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'cancel', param).then(() => {
          const resp = this.$store.state[this.modName].cancelResp
          if (resp.code === this.$successCode) {
            this.queryTableData(this.topForm.data)
          }
        })
      })
    },
    closeReplenish(data) {
      const param = [data.id]
      this.$confirm(this.$t('确认关闭选中记录么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'close', param).then(() => {
          const resp = this.$store.state[this.modName].closeResp
          if (resp.code === this.$successCode) {
            this.queryTableData(this.topForm.data)
          }
        })
      })
    },

    /**
     * 解除取消
     * @param data
     */
    freedCancel(data) {
      const param = [data.id]
      this.$confirm(this.$t('确认解除取消选中记录么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'freedCancel', param).then(() => {
          const resp = this.$store.state[this.modName].freedCancelResp
          if (resp.code === this.$successCode) {
            this.queryTableData(this.topForm.data)
          }
        })
      })
    },

    /**
     * 批量审核
     * @param data
     */
    batchAudit() {
      if (this.idsList.length == 0) {
        this.$message.error('请先选中需要审核的记录')
        return
      }
      this.$confirm(this.$t('确认审核选中的记录么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'audit', this.idsList).then(() => {
          const resp = this.$store.state[this.modName].auditResp
          if (resp.code === this.$successCode) {
            this.idsList.length = 0
            this.queryTableData(this.topForm.data)
          }
        })
      })
    },

    /**
     * 批量取消审核
     * @param data
     */
    batchCancelAudit() {
      if (this.idsList.length == 0) {
        this.$message.error('请先选中需要取消审核的记录')
        return
      }
      this.$confirm(this.$t('确认取消审核选中的记录么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'cancelAudit', this.idsList).then(() => {
          const resp = this.$store.state[this.modName].cancelAuditResp
          if (resp.code === this.$successCode) {
            this.idsList.length = 0
            this.queryTableData(this.topForm.data)
          }
        })
      })
    },

    /**
     * 批量取消
     * @param data
     */
    batchCancel() {
      if (this.idsList.length == 0) {
        this.$message.error('请先选中需要取消的记录')
        return
      }
      this.$confirm(this.$t('确认取消选中的记录么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'cancel', this.idsList).then(() => {
          const resp = this.$store.state[this.modName].cancelResp
          if (resp.code === this.$successCode) {
            this.idsList.length = 0
            this.queryTableData(this.topForm.data)
          }
        })
      })
    },

    /**
     * 批量解除取消
     * @param data
     */
    batchFreedCancel() {
      if (this.idsList.length == 0) {
        this.$message.error('请先选中需要解除取消的记录')
        return
      }
      this.$confirm(this.$t('确认解除取消的记录么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'freedCancel', this.idsList).then(() => {
          const resp = this.$store.state[this.modName].freedCancelResp
          if (resp.code === this.$successCode) {
            this.idsList.length = 0
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
