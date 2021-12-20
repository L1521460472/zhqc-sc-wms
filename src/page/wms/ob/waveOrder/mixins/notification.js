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
      this.topForm.data.waveOrderNo = null
      this.topForm.data.waveOrderStatus = null
      this.topForm.data.waveOrderType = null
      this.topForm.data.pickMode = null
      this.topForm.data.createTimeStart = null
      this.topForm.data.createTimeEnd = null
      this.topForm.data.expOutTimeStart = null
      this.topForm.data.expOutTimeEnd = null
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
      this.diaFormInfo.addDtBtnShow = false
      // 封装的修改表单的数据化配置
      this.diaFormInfoViewFieldList()
      this.diaFormInfo.dtTableInfo.handle.btList[0].disabled = true
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

      this.diaFormInfo.addDtBtnShow = true
      // 绑定弹窗保存事件：saveAdd
      this.dialogInfo.btList[1].event = 'saveData'
      this.diaFormInfo.dtTableInfo.handle.btList[0].disabled = false
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
      this.diaFormInfo.dtTableInfo.handle.btList[0].disabled = false
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
        if (resp.code === this.$store.state[this.modName].successCode) {
          this.listTypeInfo.waveOrderStatusList = resp.obj.waveOrderStatusList
          this.listTypeInfo.waveOrderTypeList = resp.obj.waveOrderTypeList
          this.listTypeInfo.pickModeList = resp.obj.pickModeList
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
        this.diaFormInfo.dtTableInfo.data = this.$store.state[this.modName].initUpdateObj.dtList
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
     * 发布
     */
    release() {
      if (this.idsList.length == 0) {
        this.$message.error('请先选中需要审核的记录')
        return
      }
      this.$confirm(this.$t('确认审核选中的记录么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'release', this.idsList).then(() => {
          const resp = this.$store.state[this.modName].releaseResp
          if (resp.code === this.$successCode) {
            this.idsList.length = 0
            this.queryTableData(this.topForm.data)
          }
        })
      })
    },

    tableCheck(data) {
      const ids = []
      if (data && data.length > 0) {
        data.forEach(item => {
          ids.push(item.id)
        })
      }
      this.idsList = ids
    },
    /**
     * 取消发布
     */
    cancelRelease() {
      if (this.idsList.length == 0) {
        this.$message.error('请先选中需要审核的记录')
        return
      }
      this.$confirm(this.$t('确认审核选中的记录么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'cancelRelease', this.idsList).then(() => {
          const resp = this.$store.state[this.modName].cancelReleaseResp
          if (resp.code === this.$successCode) {
            this.idsList.length = 0
            this.queryTableData(this.topForm.data)
          }
        })
      })
    },
    /**
     * 删除收货明细
     * @param data
     */
    deleteDt(data) {
      this.$confirm(this.$t('确认删除选中的记录么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'deleteDt', { 'id': data.id }).then(() => {
          const resp = this.$store.state[this.modName].deleteDtResp
          if (resp.code === this.$successCode) {
            for (let i = 0; i < this.diaFormInfo.dtTableInfo.data.length; i++) {
              const exist = this.diaFormInfo.dtTableInfo.data[i]
              if (exist.id == data.id) {
                // this.diaFormInfo.dtTableInfo.data.splice(i, 1)
                this.diaFormInfo.dtTableInfo.data.splice(data.$rowIndex, 1)
                return
              }
            }
          }
        })
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
    openAddDtPage() {
      this.dialogInfoDt.visible = true
      this.diaFormInfoDt.data = {
        skuCode: null,
        skuName: null,
        spec: null,
        unit: null,
        inOrderQty: null,
        drugForm: null
      }
    },
    closeAddDtPage() {
      this.dialogInfoDt.visible = false
      this.diaFormInfoDt.data = {}
    },

    saveDt() {
      this.diaFormInfoDt.ref.validate(valid => {
        if (valid) {
          for (let i = 0; i < this.diaFormInfo.dtTableInfo.data.length; i++) {
            const exist = this.diaFormInfo.dtTableInfo.data[i]
            if (exist.soDtId == this.diaFormInfoDt.data.soDtId) {
              this.$message.error('SO明细已存在，保存失败')
              return
            }
          }
          const data = {
            skuCode: this.diaFormInfoDt.data.skuCode
          }
          this.diaFormInfo.dtTableInfo.data.push(data)
          this.closeAddDtPage()
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
