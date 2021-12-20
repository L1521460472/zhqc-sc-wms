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
      this.topForm.data.supplierCode = null
      this.topForm.data.supplierName = null
      this.topForm.data.origCode = null
      this.topForm.data.shortName = null
      this.topForm.data.origSys = null
      this.topForm.data.mnemonicCode = null
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
      this.activeName = 'first'
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
      this.activeName = 'first'
      this.diaFormInfo.sealTable.deleteIds = []
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
          this.listTypeInfo.countryList = resp.obj.countryList
          this.listTypeInfo.origSysList = resp.obj.origSysList
          this.listTypeInfo.paymentPeriodList = resp.obj.paymentPeriodList
          this.listTypeInfo.paymentMethodList = resp.obj.paymentMethodList
          this.listTypeInfo.taxTypeList = resp.obj.taxTypeList
          this.listTypeInfo.invoiceTypeList = resp.obj.invoiceTypeList
          this.listTypeInfo.isEnableList = resp.obj.isEnableList
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
        this.diaFormInfo.sealTable.data = this.$store.state[this.modName].initUpdateObj.sealList
        this.provinceId = this.diaFormInfo.data.provinceId
        this.cityId = this.diaFormInfo.data.cityId
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
          this.diaFormInfo.data.sealList = this.diaFormInfo.sealTable.data
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
          this.diaFormInfo.data.deleteSeals = this.diaFormInfo.sealTable.deleteIds
          this.diaFormInfo.data.sealList = this.diaFormInfo.sealTable.data
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
     * 启用
     * @param data
     */
    enable(data) {
      this.$confirm(this.$t('确认启用选中的记录?'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'enable', data).then(() => {
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
    deactivate(data) {
      this.$confirm(this.$t('确认停用选中的记录?'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'deactivate', data).then(() => {
          const resp = this.$store.state[this.modName].deactivateResp
          if (resp.code === this.$successCode) {
            this.queryTableData(this.topForm.data)
          }
        })
      })
    },

    openSealAddPage() {
      this.diaFormInfoSeal.data = {
        id: 0,
        sealName: null,
        remark: ''
      }
      this.diaFormInfoSeal.imageUrl = null
      this.dialogInfoSeal.visible = true
    },
    openSealEditPage(data, index) {
      this.diaFormInfoSeal.data = {
        id: data.id,
        sealName: data.sealName,
        remark: data.remark,
        $index: index
      }
      this.diaFormInfoSeal.imageUrl = data.sealImpression
      this.dialogInfoSeal.visible = true
    },
    saveSeal() {
      this.diaFormInfoSeal.ref.validate(valid => {
        if (valid) {
          if (!this.diaFormInfoSeal.imageUrl) {
            this.$message.error('请上传印章图片')
            return
          }
          const reqData = {
            id: this.diaFormInfoSeal.data.id,
            sealName: this.diaFormInfoSeal.data.sealName,
            remark: this.diaFormInfoSeal.data.remark,
            sealImpression: this.diaFormInfoSeal.imageUrl
          }
          if (this.diaFormInfoSeal.data.$index || this.diaFormInfoSeal.data.$index == 0) {
            const item = this.diaFormInfo.sealTable.data[this.diaFormInfoSeal.data.$index]
            item.sealName = reqData.sealName
            item.remark = reqData.remark
            item.sealImpression = reqData.sealImpression
          } else {
            this.diaFormInfo.sealTable.data.push(reqData)
          }
          this.closeSealPage()
        }
      })
    },
    closeSealPage() {
      this.dialogInfoSeal.visible = false
    },
    deleteSeal(data, index) {
      this.$confirm('确认删除？', {
        type: 'warning',
        center: true
      }).then(() => {
        if (data.id && data.id != 0) {
          this.diaFormInfo.sealTable.deleteIds.push(data.id)
        }
        this.diaFormInfo.sealTable.data.splice(index, 1)
      }).catch(() => {
      })
    },
    closeViewer() {
      this.imageView.showViewer = false
      this.imageView.previewSrcList = []
    },
    openViewer(data) {
      const array = []
      array.push(data.sealImpression)
      this.imageView.showViewer = true
      this.imageView.previewSrcList = array
    }

  },
  // 页面初始化函数
  created() {
    this.initData()
    this.initPage()
  }
}
