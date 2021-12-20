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
      this.topForm.data.proMaintainNo = null
      this.topForm.data.proMaintainStatus = null
      this.topForm.data.ownerId = null
      this.topForm.data.creator = null
      this.topForm.data.maintainUser = null
      this.topForm.data.maintainUserId = null
      this.topForm.data.auditUser = null
      this.topForm.data.maintainDateFrom = null
      this.topForm.data.maintainDateTo = null
      this.topForm.data.auditTimeFrom = null
      this.topForm.data.auditTimeTo = null
      this.topForm.data.createTimeFrom = null
      this.topForm.data.createTimeTo = null
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
      // 隐藏明细列表操作按钮
      this.diaFormInfo.subTableInfo.handle.btList[0].show = false
      // 隐藏明细头部按钮
      this.diaFormInfo.subTableInfo.topBtn.show = false
      // 绑定弹窗保存事件：viewSave
      this.dialogInfo.btList[1].event = 'viewSave'
      this.viewID = data.id
      // 封装的修改表单的数据化配置
      this.diaFormInfoViewFieldList()
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
      // 打开明细列表操作按钮
      this.diaFormInfo.subTableInfo.handle.btList[0].show = true
      // 打开明细头部按钮
      this.diaFormInfo.subTableInfo.topBtn.show = true
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
      if (data.proMaintainStatus == 'CJ') {
        // 打开明细列表操作按钮
        this.diaFormInfo.subTableInfo.handle.btList[0].show = true
        // 打开明细头部按钮
        this.diaFormInfo.subTableInfo.topBtn.show = true
      } else {
        // 隐藏明细列表操作按钮
        this.diaFormInfo.subTableInfo.handle.btList[0].show = false
        // 隐藏明细头部按钮
        this.diaFormInfo.subTableInfo.topBtn.show = false
      }

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
      this.queryRowData(data)
    },

    /**
     * 打开增加产品明细参照页面
     * @param data
     */
    openDiaInv() {
      const selectedOwnerId = this.diaFormInfo.data.ownerId
      const selectMaintainType = this.diaFormInfo.data.maintainType
      const selectMaintainDate = this.diaFormInfo.data.maintainDate
      if (this.$isEmpty(selectedOwnerId)) {
        this.$message.error('请选择货主')
        return
      }
      if (this.$isEmpty(selectMaintainType)) {
        this.$message.error('请选择养护员和养护类型')
        return
      }
      if (this.$isEmpty(selectMaintainDate)) {
        this.$message.error('请选择养护日期')
        return
      }

      this.dialogInfoInv.title = '养护产品参照'
      this.dialogInfoInv.type = 'add'
      this.dialogInfoInv.visible = true
      this.initTopFormInvColumns()

      this.dialogInfoInv.topFormInv.data.ownerId = selectedOwnerId
      this.dialogInfoInv.topFormInv.data.maintainType = selectMaintainType
      this.dialogInfoInv.topFormInv.data.maintainDate = selectMaintainDate
      this.dialogInfoInv.topFormInv.data.maintainUser = this.diaFormInfo.data.maintainUser
      this.initDataQueryInStockProTableData()
    },

    /**
     * 关闭页面
     */
    close() {
      this.cleanProList()// 清空存放商品集合,去重集合
      this.dialogInfo.visible = false
    },

    // 添加展开收起表单功能
    openCollapsable() {
      this.collapsable = !this.collapsable
    },
    /**
     * 清空存放商品集合,去重集合
     */
    cleanProList() {
      this.distinctList = []// 去重集合
      this.inStockProList = []// 在库商品集合
    },

    /**
     * 页面初始化
     */
    initPage() {
      this.$store.dispatch(this.store + 'initPage', {}).then(() => {
        const resp = this.$store.state[this.modName].initPageResp
        if (resp.code === this.$store.state[this.modName].successCode) {
          this.listTypeInfo.proMaintainStatusList = resp.obj.proMaintainStatusList
          this.listTypeInfo.maintainTypeList = resp.obj.maintainTypeList
          this.listTypeInfo.proQualityStatusList = resp.obj.proQualityStatusList
          this.listTypeInfo.proMaintainMeasureList = resp.obj.proMaintainMeasureList
          this.listTypeInfo.proMaintainConclusionList = resp.obj.proMaintainConclusionList

          // 设置,列表可编辑,下拉框值
          this.listTypeInfo.vxeProQualityStatusList = this.setVxeData(resp.obj.proQualityStatusList)
          this.listTypeInfo.vxeProMaintainMeasureList = this.setVxeData(resp.obj.proMaintainMeasureList)
          this.listTypeInfo.vxeProMaintainConclusionList = this.setVxeData(resp.obj.proMaintainConclusionList)
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

        const dtList = this.diaFormInfo.data.dtList
        for (let i = 0; i < dtList.length; i++) {
          this.distinctList.push(dtList[i].maintainVarietiesDtId)
        }
        this.inStockProList = this.diaFormInfo.data.dtList
        if (this.diaFormInfo.ref) {
          this.diaFormInfo.ref.clearValidate()
        }
      })
    },
    /**
     * 新增数据
     */
    async saveData() {
      let isValid = null
      this.diaFormInfo.ref.validate(valid => {
        isValid = valid
      })
      if (!isValid) return
      const errMap = await this.diaFormInfo.subTableInfo.ref.validate(this.diaFormInfo.data.dtList).catch(errMap => errMap)
      if (errMap) {
        this.$message.error('校验不通过！')
      } else {
        //
        this.$store.dispatch(this.store + 'saveData', this.diaFormInfo.data).then(() => {
          const resp = this.$store.state[this.modName].addResp
          if (resp.code === this.$successCode) {
            this.dialogInfo.visible = false
            this.cleanProList()// 清空存放商品集合,去重集合
            this.initData()
          }
        })
      }
    },
    /**
     * 编辑数据
     */
    async editData() {
      let isValid = null
      this.diaFormInfo.ref.validate(valid => {
        isValid = valid
      })
      if (!isValid) return
      const errMap = await this.diaFormInfo.subTableInfo.ref.validate(this.diaFormInfo.data.dtList).catch(errMap => errMap)
      if (errMap) {
        this.$message.error('校验不通过！')
      } else {
        this.$store.dispatch(this.store + 'editData', this.diaFormInfo.data).then(() => {
          const resp = this.$store.state[this.modName].editResp
          if (resp.code === this.$successCode) {
            this.dialogInfo.visible = false
            this.cleanProList()// 清空存放商品集合,去重集合
            this.queryTableData(this.topForm.data)
          }
        })
      }
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
        this.$store.dispatch(this.store + 'deleteData', data).then(() => {
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
      this.$confirm(this.$t('确认审核选中的记录么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'audit', data).then(() => {
          const resp = this.$store.state[this.modName].auditResp
          if (resp.code === this.$successCode) {
            this.queryTableData(this.topForm.data)
          }
        })
      })
    },
    /**
     * 审核
     * @param data
     */
    cancelAudit(data) {
      this.$confirm(this.$t('确认取消审核选中的记录么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'cancelAudit', data).then(() => {
          const resp = this.$store.state[this.modName].cancelAuditResp
          if (resp.code === this.$successCode) {
            this.queryTableData(this.topForm.data)
          }
        })
      })
    },
    /** *************************************查询在库重点品养护列表分页end*****************************************/
    /**
     * 初始化
     */
    initDataQueryInStockProTableData() {
      // 默认查询第一页
      this.$setPageLimit(this.pageInStockProRequest, this.dialogInfoInv.topFormInv.data)
      this.queryInStockProTableData(this.dialogInfoInv.topFormInv.data)
    },
    /**
     * 查询分页
     * @param val
     */
    pageInStockProChange(val) {
      this.$setPageChange(val, this.pageInStockProRequest, this.dialogInfoInv.topFormInv.data)
      this.queryInStockProTableData(this.dialogInfoInv.topFormInv.data)
    },
    /**
     * 查询在库重点品养护列表
     * @param data
     */
    queryInStockProTableData(data) {
      this.$showLoading()
      this.$store.dispatch(this.store + 'queryInStockPro', data).then(() => {
      }).finally(() => {
        this.$hideLoading()
      })
    },
    /** *************************************查询在库重点品养护列表分页end*****************************************/

    // 养护产品列表复选框,选中事件
    tableCheck(data) {
      const tempArr = []
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          tempArr.push(data[i].maintainVarietiesDtId)
        }
        this.tempInStockProList = data
        this.tempDistinctList = tempArr
      }
    },

    /**
     * 查询
     */
    searchQueryInStockPro() {
      this.dialogInfoInv.topFormInv.ref.validate(valid => {
        if (valid) { // 查询表单校验
          this.initDataQueryInStockProTableData()
        }
      })
    },

    /**
     * 关闭页面
     */
    closeInStockPro() {
      this.dialogInfoInv.topFormInv.data.skuId = null
      this.dialogInfoInv.topFormInv.data.zoneId = null
      this.dialogInfoInv.topFormInv.data.lotId = null
      this.dialogInfoInv.visible = false
    },

    /**
     * 确认
     */
    determine() {
      if (this.tempInStockProList.length === 0) {
        this.$message.error('请选中数据')
        return
      }

      if (this.inStockProList.length === 0) {
        const tempDisArr = this.tempDistinctList.concat()
        const tempInStockArr = this.tempInStockProList.concat()
        this.distinctList = tempDisArr
        this.inStockProList = tempInStockArr
      } else {
        const distinctList = this.distinctList
        const tempDistinctList = this.tempDistinctList
        const tempInStockProList = this.tempInStockProList
        for (let i = 0; i < tempDistinctList.length; i++) {
          if (distinctList.indexOf(tempDistinctList[i]) === -1) {
            this.distinctList.push(tempDistinctList[i])
            this.inStockProList.push(tempInStockProList[i])
          }
        }
      }

      const tempArr = this.inStockProList.concat()// 数组深拷贝
      this.$set(this.diaFormInfo.data, 'dtList', tempArr)
      this.ownerId = this.diaFormInfo.data.ownerId
      this.maintainType = this.diaFormInfo.data.maintainType

      this.tempInStockProList = []// 清空临时存放选中产品集合
      this.tempDistinctList = []// 清空临时存放去重集合

      this.closeInStockPro()
    },

    /**
     * 删除明细
     */
    deleteDt(data) {
      this.diaFormInfo.data.dtList.splice(data.$rowIndex, 1)
      this.inStockProList.splice(data.$rowIndex, 1)
      this.distinctList.splice(data.$rowIndex, 1)
      // 编辑页面,需要删除数据库明细
      if (this.dialogInfo.type == 'edit' && !this.$isEmpty(data.id)) {
        this.$store.dispatch(this.store + 'deleteDt', data.id).then(() => {

        })
      }
    },

    /**
     * 设置,列表可编辑,下拉框值
     * @param sourceArr 源数组
     * @return newArr 返回新数组
     */
    setVxeData(sourceArr) {
      const tempArr = []
      for (var i = 0; i < sourceArr.length; i++) {
        const item = {
          label: sourceArr[i].key,
          value: sourceArr[i].value
        }
        tempArr.push(item)
      }
      return tempArr
    },
    selectChange(row) {
      this.diaFormInfo.subTableInfo.ref.clearActived()// 清除单元格激活状态
      this.diaFormInfo.subTableInfo.ref.setActiveCell(row.row, row.column.qualityStatus)
    },
    selectChangeOther(row) {
      this.diaFormInfo.subTableInfo.ref.clearActived()// 清除单元格激活状态
      this.diaFormInfo.subTableInfo.ref.setActiveCell(row.row, row.column.maintainConclusion)
    },
    selectChangePath(row) {
      this.diaFormInfo.subTableInfo.ref.clearActived()// 清除单元格激活状态
      this.diaFormInfo.subTableInfo.ref.setActiveCell(row.row, row.column.maintainMeasureList)
    }
  },

  // 页面初始化函数
  created() {
    this.initData()
    this.initPage()
  }
}
