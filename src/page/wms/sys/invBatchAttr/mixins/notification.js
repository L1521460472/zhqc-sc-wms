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
      this.topForm.data.batchAttrName = null
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
      this.$store.dispatch(this.store + 'initAdd', 0).then(() => {
        const resp = this.$store.state[this.modName].initAddResp
        if (resp.code != this.$successCode) {
          this.close()
          return
        }
        this.listTypeInfo.invBatchAttrList = resp.obj.invBatchAttrList.map(item => {
          item.key = item.msg
          item.value = item.code
          return item
        })
        this.diaFormInfo.data.batchAttrName = resp.obj.batchAttrName
      })
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
        this.listTypeInfo.invBatchAttrFormatList = obj.invBatchAttrFormatList
        this.listTypeInfo.invBatchAttrShowFormatList = obj.invBatchAttrShowFormatList
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
        if (this.diaFormInfo.data.batchAttrFormat == 'DATE') {
          this.diaFormInfo.fieldList.data[4].disabled = false
        }
      })
    },
    /**
     * 新增数据
     */
    saveData() {
      this.diaFormInfo.ref.validate(valid => {
        if (valid) {
          if (this.diaFormInfo.data.batchAttrFormat == 'DATE' && !this.diaFormInfo.data.showFormat) {
            this.$message.error('请选择显示格式')
            return
          }
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
          if (this.diaFormInfo.data.batchAttrFormat == 'DATE' && !this.diaFormInfo.data.showFormat) {
            this.$message.error('请选择显示格式')
            return
          }
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
     * 更改批次属性
     */
    handleChangeBatchAttr() {
      if (!this.diaFormInfo.data.batchAttr) {
        this.diaFormInfo.data.batchAttrKey = null
        this.diaFormInfo.data.isSystem = null
        this.diaFormInfo.fieldList[2].disabled = true
        this.diaFormInfo.fieldList[3].disabled = true
        this.diaFormInfo.data.isRequired = null
        this.diaFormInfo.data.batchAttrFormat = null
        this.diaFormInfo.data.showFormat = null
        this.$forceUpdate()
        return
      }
      this.listTypeInfo.invBatchAttrList.forEach(item => {
        if (item.value == this.diaFormInfo.data.batchAttr) {
          this.diaFormInfo.data.batchAttrKey = item.key
          if (item.isSystem && item.isSystem == 1) {
            this.diaFormInfo.data.isSystem = 1
            this.diaFormInfo.fieldList[2].disabled = true
            this.diaFormInfo.fieldList[3].disabled = true
            this.diaFormInfo.data.isRequired = item.isRequired
            this.diaFormInfo.data.batchAttrFormat = item.batchAttrFormat
            this.diaFormInfo.data.showFormat = item.showFormat
          } else {
            this.diaFormInfo.data.isSystem = 0
            this.diaFormInfo.data.isRequired = null
            this.diaFormInfo.data.batchAttrFormat = null
            this.diaFormInfo.data.showFormat = null
            this.diaFormInfo.fieldList[2].disabled = false
            this.diaFormInfo.fieldList[3].disabled = false
          }
        }
      })
    },
    /**
     * 更改属性格式
     */
    handleChangeBatchAttrFormat() {
      this.diaFormInfo.data.showFormat = null
      if (!this.diaFormInfo.data.batchAttrFormat || this.diaFormInfo.data.batchAttrFormat != 'DATE') {
        this.diaFormInfo.fieldList[4].disabled = true
      } else {
        this.diaFormInfo.fieldList[4].disabled = false
      }
    }
  },
  // 页面初始化函数
  created() {
    this.initData()
    this.initPage()
  }
}
