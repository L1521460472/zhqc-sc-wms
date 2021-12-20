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
      this.topForm.data.modelName = null
      this.topForm.data.isEnable = null
      this.topForm.data.createTimeBegin = null
      this.topForm.data.createTimeEnd = null
      this.topForm.data.enableTimeBegin = null
      this.topForm.data.enableTimeEnd = null
      this.topForm.data.deactivateTimeBegin = null
      this.topForm.data.deactivateTimeEnd = null
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
      this.diaFormInfo.tableInfoSku.handle.btList[0].disabled = true
      this.diaFormInfo.tableInfoSku.topBtn.disabled = true
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
      this.diaFormInfo.tableInfoSku.handle.btList[0].disabled = false
      this.diaFormInfo.tableInfoSku.topBtn.disabled = false
      // 绑定弹窗保存事件：saveAdd
      this.dialogInfo.btList[1].event = 'saveData'
      // 封装的新增表单的数据化配置
      this.diaFormInfoAddFieldList()
    },
    /**
     * 打开复制页面
     */
    openCopyPage(data) {
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
      this.diaFormInfo.tableInfoSku.handle.btList[0].disabled = false
      this.diaFormInfo.tableInfoSku.topBtn.disabled = false
      // 封装的新增表单的数据化配置
      this.diaFormInfoAddFieldList()
      this.$store.dispatch(this.store + 'initUpdate', data.id).then(() => {
        const obj = this.$store.state[this.modName].initUpdateObj.entity
        obj.id = null
        obj.modelName = null
        this.diaFormInfo.data = obj
        this.diaFormInfo.tableInfoSku.data = this.$store.state[this.modName].initUpdateObj.dtList
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
      this.diaFormInfo.tableInfoSku.handle.btList[0].disabled = false
      this.diaFormInfo.tableInfoSku.topBtn.disabled = false
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
        this.listTypeInfo.payMethodList = obj.payMethodList
        this.listTypeInfo.waveMethodList = obj.waveMethodList
        this.listTypeInfo.enableList = obj.enableList
        this.listTypeInfo.whetherList = obj.whetherList
        this.listTypeInfo.soTypeList = obj.soTypeList
        this.listTypeInfo.soStatusList = obj.soStatusList
        this.listTypeInfo.pickModeList = obj.pickModeList
        this.carrierCode = obj.carrierCode
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
        this.diaFormInfo.tableInfoSku.data = this.$store.state[this.modName].initUpdateObj.dtList
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
          this.diaFormInfo.data.dtList = this.diaFormInfo.tableInfoSku.data
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
          this.diaFormInfo.data.dtList = this.diaFormInfo.tableInfoSku.data
          this.diaFormInfo.data.deleteIds = this.diaFormInfo.tableInfoSku.deleteIds
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
    enableEvent(data) {
      this.$confirm('确认启用？', {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'enable', { 'id': data.id }).then(() => {
          const resp = this.$store.state[this.modName].enableResp
          if (resp.code === this.$successCode) {
            this.queryTableData(this.topForm.data)
          }
        })
      }).catch(() => {
      })
    },
    deactivateEvent(data) {
      this.$confirm('确认停用？', {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'deactivate', { 'id': data.id }).then(() => {
          const resp = this.$store.state[this.modName].deactivateResp
          if (resp.code === this.$successCode) {
            this.queryTableData(this.topForm.data)
          }
        })
      }).catch(() => {
      })
    },
    // 删除波次模板商品
    deleteSku(data) {
      if (data.id) {
        this.diaFormInfo.tableInfoSku.deleteIds.push(data.id)
      }
      this.diaFormInfo.tableInfoSku.data.splice(data.$rowIndex, 1)
    },
    // 打开波次模板商品页面
    openSkuPage() {
      this.dialogInfoSku.visible = true
      this.diaFormInfoSku.data = {
        id: 0,
        skuId: null,
        barcode: null,
        skuName: null,
        tradeName: null,
        spec: null,
        mainUnit: null,
        drugForm: null,
        mfgName: null,
        originCountry: null,
        approvalNumber: null,
        brandName: null,
        tempControlName: null,
        validityDay: null
      }
    },
    // 关闭波次模板商品
    closeSkuPage() {
      this.dialogInfoSku.visible = false
      this.diaFormInfoSku.data = { sku: null }
    },
    // 保存波次模板商品
    saveSkuPage() {
      this.diaFormInfoSku.ref.validate(valid => {
        if (valid) {
          const formObj = this.diaFormInfoSku.data
          for (let i = 0; i < this.diaFormInfo.tableInfoSku.data.length; i++) {
            if (this.diaFormInfo.tableInfoSku.data[i].skuId == formObj.skuId) {
              this.$message.error('产品已存在')
              this.$hideLoading()
              return
            }
          }
          this.$showLoading()
          const skuData = {
            id: formObj.id,
            skuId: formObj.skuId,
            baseSku: {
              skuCode: formObj.skuCode,
              barcode: formObj.barcode,
              skuName: formObj.skuName,
              tradeName: formObj.tradeName,
              spec: formObj.spec,
              mainUnit: formObj.mainUnit,
              drugForm: formObj.drugForm,
              mfgName: formObj.mfgName,
              originCountry: formObj.originCountry,
              approvalNumber: formObj.approvalNumber,
              brandName: formObj.brandName,
              tempControlName: formObj.tempControlName,
              validityDay: formObj.validityDay

            }
          }
          this.diaFormInfo.tableInfoSku.data.push(skuData)
          this.closeSkuPage()
          this.$hideLoading()
        }
      })
    }
  },
  // 页面初始化函数
  created() {
    this.initData()
    this.initPage()
    this.resetFormData()
  }
}
