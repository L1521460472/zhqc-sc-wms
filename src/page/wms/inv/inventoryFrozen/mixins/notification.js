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
      this.diaFormInfo.subTableInfo.handle = null
      // 隐藏明细头部按钮
      this.diaFormInfo.subTableInfo.topBtn.show = false

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
      // 显示明细头部按钮
      this.diaFormInfo.subTableInfo.topBtn.show = true
      // 显示明细列表操作按钮
      this.ownerId = null
      this.diaFormInfo.data.dtList = null
      // 绑定弹窗保存事件：saveAdd
      this.dialogInfo.btList[1].event = 'saveData'
      // 封装的新增表单的数据化配置
      this.diaFormInfoAddFieldList()
      this.resetFormData()

      this.diaFormInfo.data.sourceType = this.listTypeInfo.frozenSourceTypeList.length === 0 ? null : this.listTypeInfo.frozenSourceTypeList[0].value
      this.diaFormInfo.data.frozenStatus = this.listTypeInfo.frozenStatusList.length === 0 ? null : this.listTypeInfo.frozenStatusList[0].value
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
      // 封装的修改表单的数据化配置
      this.diaFormInfoEditFieldList()
      if (data.frozenStatus === 'NEW') {
        // 显示明细列表操作按钮
        this.diaFormInfo.subTableInfo.handle.btList[0].show = true
        // 显示明细头部按钮
        this.diaFormInfo.subTableInfo.topBtn.show = true
      } else {
        // 隐藏明细列表操作按钮
        this.diaFormInfo.subTableInfo.handle = null
        // 隐藏明细头部按钮
        this.diaFormInfo.subTableInfo.topBtn.show = false
      }
      // 绑定弹窗保存事件
      this.dialogInfo.btList[1].event = 'editData'
      // this.editID = data.id;
      // 为弹窗表单对应的字段赋值
      // this.diaFormInfo.data = this.$deepClone(data);
      this.queryRowData(data)
    },

    /**
     * 打开增加产品明细参照页面
     * @param data
     */
    openDiaInv() {
      const selectedOwnerId = this.diaFormInfo.data.ownerId
      const ownerId = this.ownerId
      const whAreaId = this.diaFormInfo.data.whAreaId
      if (this.$isEmpty(selectedOwnerId)) {
        this.$message.error('请选择货主')
        return
      }
      if (this.$isEmpty(whAreaId)) {
        this.$message.error('请选择销售仓')
        return
      }
      if (!this.$isEmpty(ownerId) && selectedOwnerId !== ownerId) {
        this.$message.error('只能选择一个货主')
        return
      }
      this.dialogInfoInv.title = '库区产品参照'
      this.dialogInfoInv.type = 'add'
      this.dialogInfoInv.visible = true
      this.initTopFormInvColumns()

      this.dialogInfoInv.topFormInv.data.ownerId = selectedOwnerId
      this.dialogInfoInv.topFormInv.data.whAreaId = whAreaId
      this.initDataQueryInStockProTableData()
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
        this.listTypeInfo.frozenStatusList = this.$store.state[this.modName].initPageObj.frozenStatusList
        this.listTypeInfo.frozenSourceTypeList = this.$store.state[this.modName].initPageObj.frozenSourceTypeList
        this.listTypeInfo.frozenTypeList = this.$store.state[this.modName].initPageObj.frozenTypeList
        this.listTypeInfo.frozenTypeAddList = this.$store.state[this.modName].initPageObj.frozenTypeAddList
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
        if (this.dialogInfo.type === 'edit') {
          this.$store.state[this.modName].initUpdateObj.entity.dtList.forEach(item => {
            item.adjQty = 1
          })
          this.diaFormInfo.data = this.$store.state[this.modName].initUpdateObj.entity
        } else {
          this.diaFormInfo.data = this.$store.state[this.modName].initUpdateObj.entity
        }
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
        if (!valid) {
          return
        }
        this.validateSubTableInfo().then(valid => {
          if (!valid) {
            return
          }
          const arr = []
          this.diaFormInfo.data.dtList.forEach(item => {
            const temp = {
              batchNo: item.batchNo,
              frozenQty: item.frozenQty,
              lotCode: item.lotCode,
              planPdQty: item.planPdQty,
              skuCode: item.skuCode,
              skuId: item.skuId
            }
            arr.push(temp)
          })
          const obj = {
            frozenType: this.diaFormInfo.data.frozenType,
            ownerId: this.diaFormInfo.data.ownerId,
            remark: this.diaFormInfo.data.remark,
            sourceType: this.diaFormInfo.data.sourceType,
            whAreaId: this.diaFormInfo.data.whAreaId,
            dtList: arr
          }
          this.$store.dispatch(this.store + 'saveData', obj).then(() => {
            const resp = this.$store.state[this.modName].addResp
            if (resp.code === this.$successCode) {
              this.dialogInfo.visible = false
              this.initData()
            }
          })
        })
      })
    },
    /**
     * 编辑数据
     */
    editData() {
      this.diaFormInfo.ref.validate(valid => {
        if (!valid) {
          return
        }
        this.validateSubTableInfo().then(valid => {
          if (valid === undefined) {
            this.$store.dispatch(this.store + 'editData', this.diaFormInfo.data).then(() => {
              const resp = this.$store.state[this.modName].editResp
              if (resp.code === this.$successCode) {
                this.dialogInfo.visible = false
                this.queryTableData(this.topForm.data)
              }
            })
          }
          if (!valid) {
            return
          }
          this.$store.dispatch(this.store + 'editData', this.diaFormInfo.data).then(() => {
            const resp = this.$store.state[this.modName].editResp
            if (resp.code === this.$successCode) {
              this.dialogInfo.visible = false
              this.queryTableData(this.topForm.data)
            }
          })
        })
      })
    },
    /**
     * 编辑表格校验方法
     * @returns {Promise<boolean>}
     */
    async validateSubTableInfo() {
      if (!this.diaFormInfo.subTableInfo.ref) return
      const errMap = await this.diaFormInfo.subTableInfo.ref.validate(true).catch(errMap => errMap)
      return !errMap
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
     *审核
     * @param data
     */
    auditAdj(data) {
      const ids = []
      ids.push(data.id)
      this.$confirm(this.$t('确定要审核选中的记录么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'auditAdj', ids).then(() => {
          const resp = this.$store.state[this.modName].auditAdjResp
          if (resp.code === this.$successCode) {
            this.queryTableData(this.topForm.data)
          }
        })
      })
    },
    /**
     * 弃核
     * @param data
     */
    unAuditAdj(data) {
      const ids = []
      ids.push(data.id)
      this.$confirm(this.$t('确定要弃审当前调整单？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'unAuditAdj', ids).then(() => {
          const resp = this.$store.state[this.modName].unAuditAdjResp
          if (resp.code === this.$successCode) {
            this.queryTableData(this.topForm.data)
          }
        })
      })
    },

    // 主列表列表复选框,选中事件
    handleSelectionChange(event, data) {
      const ids = []
      if (data && data.length > 0) {
        data.forEach(item => {
          ids.push(item.id)
        })
      }
      this.idsList = ids
    },
    /**
     * 批量审核
     * @param data
     */
    batchAuditAdj() {
      let ids = []
      if (this.idsList.length === 0) {
        this.$message.error('请先选中需要审核的记录')
        return
      }
      ids = this.idsList
      this.$confirm(this.$t('确定要审核选中的记录么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'batchAudit', ids).then(() => {
          const resp = this.$store.state[this.modName].auditBatchResp
          if (resp.code === this.$successCode) {
            this.queryTableData(this.topForm.data)
          }
        })
      })
    },
    /**
     * 批量弃审
     * @param data
     */
    batchUnAuditAdj() {
      let ids = []
      if (this.idsList.length === 0) {
        this.$message.error('请先选中需要弃审的记录')
        return
      }
      ids = this.idsList
      this.$confirm(this.$t('确定要弃审当前库存调整单？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'unBatchAudit', ids).then(() => {
          const resp = this.$store.state[this.modName].unAuditBatchResp
          if (resp.code === this.$successCode) {
            this.queryTableData(this.topForm.data)
          }
        })
      })
    },
    batchDelete() {
      let ids = []
      if (this.idsList.length === 0) {
        this.$message.error('请先选中需要删除的记录')
        return
      }
      ids = this.idsList
      this.$confirm(this.$t('确定要删除当前记录？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'batchDelete', ids).then(() => {
          const resp = this.$store.state[this.modName].batchDeleteResp
          if (resp.code === this.$successCode) {
            this.queryTableData(this.topForm.data)
          }
        })
      })
    },
    /** *************************************查询在库产品列表分页end*****************************************/
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
     * 查询在库产品列表
     * @param data
     */
    queryInStockProTableData(data) {
      this.$showLoading()
      this.$store.dispatch(this.store + 'queryInStockPro', data).then(() => {
      }).finally(() => {
        this.$hideLoading()
      })
    },
    /** *************************************查询在库产品列表分页end*****************************************/

    // 在库重点养护产品列表复选框,选中事件
    tableCheck(data) {
      if (data.length === 0) {
        this.tempInStockProList = []
        this.tempDistinctList = []
      }
      if (data.length > 0) {
        const tempArr = []
        for (let i = 0; i < data.length; i++) {
          const unikey = data[i].lotCode + data[i].skuId + data[i].batchNo
          tempArr.push(unikey)
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
      this.dialogInfoInv.visible = false
    },
    /**
     * 确认
     */
    determine() {
      if (this.dialogInfo.type === 'edit') {
        this.determine_update()
      } else if (this.dialogInfo.type === 'add') {
        this.determine_add()
      }
    },
    /**
     * 确认(新增)
     */
    determine_add() {
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
      // this.diaFormInfo.data.dtList=tempArr;
      this.$set(this.diaFormInfo.data, 'dtList', tempArr)
      this.ownerId = this.diaFormInfo.data.ownerId
      this.tempInStockProList = []// 清空临时存放选中产品集合
      this.tempDistinctList = []// 清空临时存放去重集合
      this.closeInStockPro()
    },
    /**
     * 确认(修改)
     */
    determine_update() {
      if (this.tempInStockProList.length === 0) {
        this.$message.error('请选中数据')
        return
      }
      this.distinctList = []
      for (let i = 0; i < this.diaFormInfo.data.dtList.length; i++) {
        const letData = this.diaFormInfo.data.dtList[i]
        const unikey = letData.lotCode + letData.skuId + letData.batchNo
        this.distinctList.push(unikey)
      }

      if (this.diaFormInfo.data.dtList === 0) {
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
            this.diaFormInfo.data.dtList.push(tempInStockProList[i])
          }
        }
      }
      // let tempArr = this.inStockProList.concat();//数组深拷贝
      const tempArr = this.diaFormInfo.data.dtList.concat()// 数组深拷贝
      this.$set(this.diaFormInfo.data, 'dtList', tempArr)
      this.ownerId = this.diaFormInfo.data.ownerId
      this.tempInStockProList = []// 清空临时存放选中产品集合
      this.tempDistinctList = []// 清空临时存放去重集合
      this.closeInStockPro()
    },
    /**
     * 删除明细
     */
    deleteDt(data) {
      this.$confirm(this.$t('确认删除选中的记录么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.diaFormInfo.data.dtList.splice(data.$rowIndex, 1)
        this.inStockProList.splice(data.$rowIndex, 1)
        this.distinctList.splice(data.$rowIndex, 1)
      })
      if (this.distinctList.length === 0) {
        this.ownerId = null
      }
    }
  },
  // 页面初始化函数
  created() {
    this.initData()
    this.initPage()
  }
}
