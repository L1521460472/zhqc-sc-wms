// 自定义事件处理
export default {
  methods: {
    /**
     * 初始化数据
     */
    initData() {
      // 默认查询第一页
      this.$setPageLimit(this.pageRequest, this.topForm.data)
      this.setCustomerQuery()
      this.queryTableData(this.topForm.data)
    },
    /**
     * 自定义查询条件
     */
    setCustomerQuery() {
      // if(this.topForm.data.expOutTimeBegin){
      //   this.topForm.data.expOutTimeBegin=formatDate(new Date(Date.parse(this.topForm.data.expOutTimeBegin)), 'yyyy-MM-dd');
      // }
      // if(this.topForm.data.expOutTimeEnd){
      //   this.topForm.data.expOutTimeEnd=formatDate(new Date(Date.parse(this.topForm.data.expOutTimeEnd)), 'yyyy-MM-dd');
      // }
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
      this.topForm.data.soNo = null
      this.topForm.data.scSoType = null
      this.topForm.data.scBusinessType = null
      this.topForm.data.soStatus = null
      this.topForm.data.isFrozen = null
      this.topForm.data.outOrderNo = null
      this.topForm.data.customerId = null
      this.topForm.data.partnerId = null
      this.topForm.data.receiver = null
      this.topForm.data.isHasInvoice = null
      this.topForm.data.partnerStoreId = null
      this.topForm.data.expOutTimeBegin = null
      this.topForm.data.expOutTimeEnd = null
      this.topForm.data.skuCode = null
      this.topForm.data.createTimeBegin = null
      this.topForm.data.createTimeEnd = null
      this.topForm.data.country = null
      this.topForm.data.provinceId = null
      this.topForm.data.cityId = null
      this.topForm.data.areaId = null
      this.topForm.data.cusOrderNo = null
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
      this.diaFormInfo.dtTableInfo.addDtBtnShow = false
      // this.diaFormInfo.dtTableInfo.handle.btList[0].disabled=true;
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
        const obj = this.$store.state[this.modName].initPageObj
        this.carrierCode = obj.carrierCode
        this.listTypeInfo.scSoTypeList = obj.scSoTypeList
        this.listTypeInfo.scBusinessTypeList = obj.scBusinessTypeList
        this.listTypeInfo.soStatusList = obj.soStatusList
        this.listTypeInfo.whetherList = obj.whetherList
        this.listTypeInfo.countryList = obj.countryList
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
        const obj = this.$store.state[this.modName].initUpdateObj.entity
        this.diaFormInfo.data = obj
        this.diaFormInfo.dtTableInfo.data = this.$store.state[this.modName].initUpdateObj.dtList
        this.provinceId = obj.provinceId
        this.cityId = obj.cityId
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
    tableCheck(data) {
      const ids = []
      if (data && data.length > 0) {
        data.forEach(item => {
          ids.push(item.id)
        })
        this.batchBtnArray.forEach(item => {
          item.disabled = false
        })
      } else {
        this.batchBtnArray.forEach(item => {
          item.disabled = true
        })
      }
      this.checkedIds = ids
    },
    /**
     * 分配
     */
    handleAssign() {
      if (!this.checkedIds || this.checkedIds.length == 0) {
        this.$message.warning('请先勾选SO单')
        return
      }
      this.$showLoading()
      this.$store.dispatch(this.store + 'doAssign', this.checkedIds).then(() => {
        const resp = this.$store.state[this.modName].doAssignResp
        if (resp.code === this.$successCode || resp.code === this.$partSuccessCode) {
          this.$message.success(resp.msg)
          this.queryTableData(this.topForm.data)
        }
      }).finally(() => {
        this.$hideLoading()
      })
    },
    /**
     * 取消分配
     */
    handleCancelAssign() {
      if (!this.checkedIds || this.checkedIds.length == 0) {
        this.$message.warning('请先勾选SO单')
        return
      }
      this.$showLoading()
      this.$store.dispatch(this.store + 'cancelAssign', this.checkedIds).then(() => {
        const resp = this.$store.state[this.modName].cancelAssignResp
        if (resp.code === this.$successCode || resp.code === this.$partSuccessCode) {
          this.$message.success(resp.msg)
          this.queryTableData(this.topForm.data)
        }
      }).finally(() => {
        this.$hideLoading()
      })
    },
    assignEvent(data) {
      const req = [data.id]
      this.$showLoading()
      this.$store.dispatch(this.store + 'doAssign', req).then(() => {
        const resp = this.$store.state[this.modName].doAssignResp
        if (resp.code === this.$successCode || resp.code === this.$partSuccessCode) {
          this.$message.success(resp.msg)
          this.queryTableData(this.topForm.data)
        }
      }).finally(() => {
        this.$hideLoading()
      })
    },
    cancelAssignEvent(data) {
      const req = [data.id]
      this.$showLoading()
      this.$store.dispatch(this.store + 'cancelAssign', req).then(() => {
        const resp = this.$store.state[this.modName].cancelAssignResp
        if (resp.code === this.$successCode || resp.code === this.$partSuccessCode) {
          this.$message.success(resp.msg)
          this.queryTableData(this.topForm.data)
        }
      }).finally(() => {
        this.$hideLoading()
      })
    }
  },
  // 页面初始化函数
  created() {
    this.initData()
    this.initPage()
  }
}
