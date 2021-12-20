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
      this.topForm.data.batchRuleCode = null
      this.topForm.data.batchRuleName = null
      this.topForm.data.isEnable = null
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
      this.resetFormData()
      const batchAttrList = this.$deepClone(this.listTypeInfo.invBatchAttrList)
      this.diaFormInfo.dtTableInfo.data = batchAttrList
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
        const obj = this.$store.state[this.modName].initPageObj
        this.listTypeInfo.invBatchAttrList = obj.invBatchAttrList
        this.listTypeInfo.isEnableList = obj.isEnableList
        this.listTypeInfo.whetherList = obj.whetherList
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
        const dtList = this.$store.state[this.modName].initUpdateObj.dtList
        const batchAttrList = this.$deepClone(this.listTypeInfo.invBatchAttrList)
        dtList.forEach(item => {
          for (let i = 0; i < batchAttrList.length; i++) {
            if (item.invBatchAttrId == batchAttrList[i].id) {
              batchAttrList[i].selected = true
              break
            }
          }
        })
        this.diaFormInfo.dtTableInfo.data = batchAttrList
        this.$refs.dtTable.checkBox()
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
          const checkIds = this.diaFormInfo.dtTableInfo.ref.getCheckboxRecords()
          if (!checkIds || checkIds.length == 0) {
            this.$message.error('请选择批次属性')
            return
          }
          const batchAttrIds = []
          checkIds.forEach(item => {
            batchAttrIds.push(item.id)
          })
          this.diaFormInfo.data.batchAttrIds = batchAttrIds
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
          const checkIds = this.diaFormInfo.dtTableInfo.ref.getCheckboxRecords()
          if (!checkIds || checkIds.length == 0) {
            this.$message.error('请选择批次属性')
            return
          }
          const batchAttrIds = []
          checkIds.forEach(item => {
            batchAttrIds.push(item.id)
          })
          this.diaFormInfo.data.batchAttrIds = batchAttrIds
          this.diaFormInfo.data.deleteIds = this.diaFormInfo.dtTableInfo.deleteIds
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
    openAddDtPage() {
      this.dialogInfoDt.visible = true
      this.diaFormInfoDt.data = {
        id: 0,
        batchAttr: null,
        batchAttrName: null,
        isRequired: null,
        isRequiredName: null,
        batchAttrFormat: null,
        batchAttrFormatName: null,
        showFormat: null,
        showFormatName: null,
        isSystem: null,
        isSystemName: null,
        remark: null,
        sortNo: 1
      }
      let array = []
      if (this.diaFormInfo.dtTableInfo.data && this.diaFormInfo.dtTableInfo.data.length > 0) {
        this.listTypeInfo.invBatchAttrList.forEach(item => {
          let isChoose = false
          this.diaFormInfo.dtTableInfo.data.forEach(dtData => {
            if (item.value == dtData.batchAttr) {
              isChoose = true
            }
          })
          if (!isChoose) {
            array.push(item)
          }
        })
      } else {
        array = this.listTypeInfo.invBatchAttrList
      }
      this.listTypeInfo.batchAttrList = array
      this.diaFormInfoDtAddFieldList()
      this.dialogInfoDt.type = 'add'
    },
    openEditDtPage(data) {
      this.dialogInfoDt.visible = true
      const req = {
        id: data.id,
        batchAttr: data.batchAttr,
        batchAttrName: data.batchAttrName,
        isRequired: data.isRequired,
        batchAttrFormat: data.batchAttrFormat,
        showFormat: data.showFormat,
        isSystem: data.isSystem,
        remark: data.remark,
        sortNo: data.sortNo
      }
      this.diaFormInfoDt.data = req
      this.diaFormInfoDtEditFieldList()
      if (data.isSystem != 1) {
        this.diaFormInfoDt.fieldList[1].disabled = false
        this.diaFormInfoDt.fieldList[2].disabled = false
      }
      this.listTypeInfo.batchAttrList = this.listTypeInfo.invBatchAttrList
      this.dialogInfoDt.type = 'edit'
    },
    handleChangeBatchAttr() {
      this.listTypeInfo.batchAttrList.forEach(item => {
        if (item.value == this.diaFormInfoDt.data.batchAttr) {
          this.diaFormInfoDt.data.batchAttrName = item.key
          if (item.isSystem && item.isSystem == 1) {
            this.diaFormInfoDt.data.isSystem = 1
            this.diaFormInfoDt.fieldList[1].disabled = true
            this.diaFormInfoDt.fieldList[2].disabled = true
            this.diaFormInfoDt.data.isRequired = item.isRequired
            this.diaFormInfoDt.data.batchAttrFormat = item.batchAttrFormat
            this.diaFormInfoDt.data.showFormat = item.showFormat
          } else {
            this.diaFormInfoDt.data.isSystem = 0
            this.diaFormInfoDt.data.isRequired = null
            this.diaFormInfoDt.data.batchAttrFormat = null
            this.diaFormInfoDt.data.showFormat = null
            this.diaFormInfoDt.fieldList[1].disabled = false
            this.diaFormInfoDt.fieldList[2].disabled = false
          }
        }
      })
    },
    handleChangeBatchAttrFormat(data) {
      this.diaFormInfoDt.data.showFormat = null
      if (!data || data != 'DATE') {
        this.diaFormInfoDt.fieldList[3].disabled = true
      } else {
        this.diaFormInfoDt.fieldList[3].disabled = false
      }
    },
    closeDtPage() {
      this.dialogInfoDt.visible = false
    },
    saveDtData() {
      this.diaFormInfoDt.ref.validate(valid => {
        if (valid) {
          if (this.diaFormInfoDt.data.batchAttrFormat == 'DATE' && !this.diaFormInfoDt.data.showFormat) {
            this.$message.error('请选择显示格式')
            return
          }
          const req = {
            id: this.diaFormInfoDt.data.id,
            batchAttr: this.diaFormInfoDt.data.batchAttr,
            batchAttrName: null,
            isRequired: this.diaFormInfoDt.data.isRequired,
            isRequiredName: null,
            batchAttrFormat: this.diaFormInfoDt.data.batchAttrFormat,
            batchAttrFormatName: null,
            showFormat: this.diaFormInfoDt.data.showFormat,
            showFormatName: null,
            isSystem: this.diaFormInfoDt.data.isSystem,
            isSystemName: null,
            remark: this.diaFormInfoDt.data.remark,
            sortNo: this.diaFormInfoDt.data.sortNo
          }
          for (let i = 0; i < this.listTypeInfo.batchAttrList.length; i++) {
            const item = this.listTypeInfo.batchAttrList[i]
            if (item.value == req.batchAttr) {
              req.batchAttrName = item.key
              break
            }
          }
          for (let i = 0; i < this.listTypeInfo.invBatchAttrFormatList.length; i++) {
            const item = this.listTypeInfo.invBatchAttrFormatList[i]
            if (item.value == req.batchAttrFormat) {
              req.batchAttrFormatName = item.key
              break
            }
          }
          if (req.showFormat) {
            for (let i = 0; i < this.listTypeInfo.invBatchAttrShowFormatList.length; i++) {
              const item = this.listTypeInfo.invBatchAttrShowFormatList[i]
              if (item.value == req.showFormat) {
                req.showFormatName = item.key
                break
              }
            }
          }
          if (req.isRequired == 1) {
            req.isRequiredName = '是'
          } else {
            req.isRequiredName = '否'
          }
          if (req.isSystem == 1) {
            req.isSystemName = '是'
          } else {
            req.isSystemName = '否'
            req.isSystem = 0
          }
          if (this.dialogInfoDt.type == 'add') {
            this.diaFormInfo.dtTableInfo.data.push(req)
          } else {
            for (let i = 0; i < this.diaFormInfo.dtTableInfo.data.length; i++) {
              if (this.diaFormInfo.dtTableInfo.data[i].batchAttr == req.batchAttr) {
                this.$set(this.diaFormInfo.dtTableInfo.data, i, req)
                // this.diaFormInfo.dtTableInfo.data[i]=req;
                break
              }
            }
          }
          this.closeDtPage()
        }
      })
    },
    deleteDtData(data) {
      if (data.id && data.id != 0) {
        this.diaFormInfo.dtTableInfo.deleteIds.push(data.id)
      }
      for (let i = 0; i < this.diaFormInfo.dtTableInfo.data.length; i++) {
        const item = this.diaFormInfo.dtTableInfo.data[i]
        if (item.batchAttr == data.batchAttr) {
          this.diaFormInfo.dtTableInfo.data.splice(i, 1)
          return
        }
      }
    },
    /**
     * 启用
     * @param data
     */
    handelEnabled(data) {
      this.$confirm(this.$t('确认启用选中的记录么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'enable', { 'id': data.id }).then(() => {
          const resp = this.$store.state[this.modName].enableResp
          if (resp.code === this.$successCode) {
            this.queryTableData(this.topForm.data)
          }
        })
      })
    },
    /**
     * 停用
     * @param data
     */
    handelDeactivate(data) {
      this.$confirm(this.$t('确认停用选中的记录么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'deactivate', { 'id': data.id }).then(() => {
          const resp = this.$store.state[this.modName].deactivateResp
          if (resp.code === this.$successCode) {
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
