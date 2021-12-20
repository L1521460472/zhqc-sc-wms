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
      //
      this.topForm.data.planNo = null
      this.topForm.data.maintainType = null
      this.topForm.data.planOrigin = null
      this.topForm.data.ownerId = null
      this.topForm.data.zoneId = null
      this.topForm.data.lotId = null
      this.topForm.data.lotCode = null
      this.topForm.data.creator = null
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
      this.dialogInfo.title = this.$t('新增养护计划')
      // 弹窗是否显示
      this.dialogInfo.visible = true
      // 弹窗的保存按钮是否显示
      this.dialogInfo.btList[1].show = true
      // 打开明细头部按钮
      this.diaFormInfo.subTableInfo.topBtn.show = true
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
      if (data.status == 'CJ') {
        if (data.planOrigin == 'SD') {
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
      // 封装的修改表单的数据化配置
      this.diaFormInfoEditFieldList()
      this.queryRowData(data)
    },

    /**
     * 打开增加养护明细参照页面
     * @param data
     */
    openDiaInv() {
      const selectedOwnerId = this.diaFormInfo.data.ownerId
      const selectZoneId = this.diaFormInfo.data.zoneId
      const selectMaintainType = this.diaFormInfo.data.maintainType
      if (this.$isEmpty(selectedOwnerId)) {
        this.$message.error('请选择货主')
        return
      }
      if (this.$isEmpty(selectZoneId)) {
        this.$message.error('请选择库区')
        return
      }
      if (this.$isEmpty(selectMaintainType)) {
        this.$message.error('请选择养护类型')
        return
      }

      this.dialogInfoInv.topFormInv.data.ownerId = selectedOwnerId
      this.dialogInfoInv.topFormInv.data.zoneId = selectZoneId
      this.dialogInfoInv.topFormInv.data.maintainType = selectMaintainType

      this.dialogInfoInv.title = '养护品种产品参照'
      this.dialogInfoInv.type = 'add'
      this.dialogInfoInv.visible = true

      this.initDataQueryInStockProTableData()
      const that = this
      setTimeout(function() {
        that.zoneId = selectZoneId
      }, 500)
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
     * 页面初始化
     */
    initPage() {
      this.$store.dispatch(this.store + 'initPage', {}).then(() => {
        this.listTypeInfo.maintainTypeList = this.$store.state[this.modName].initPageObj.maintainTypeList
        this.listTypeInfo.maintainPlanOriginList = this.$store.state[this.modName].initPageObj.maintainPlanOriginList
        this.listTypeInfo.maintainStatusList = this.$store.state[this.modName].initPageObj.maintainStatusList
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
          this.distinctList.push(dtList[i].maintainDetermineDtId)
        }
        this.inStockProList = this.diaFormInfo.data.dtList

        this.dialogInfoInv.topFormInv.data.ownerName = this.diaFormInfo.data.ownerName
        this.dialogInfoInv.topFormInv.data.zoneName = this.diaFormInfo.data.zoneName

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
              this.cleanProList()// 清空存放商品集合,去重集合
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
              this.cleanProList()// 清空存放商品集合,去重集合
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
     * 清空存放商品集合,去重集合
     */
    cleanProList() {
      this.distinctList = []// 去重集合
      this.inStockProList = []// 在库商品集合
    },

    /**
     * 养护类型下拉框改变事件
     */
    maintainTypeChange() {
      this.$set(this.diaFormInfo.data, 'dtList', [])
      this.inStockProList = []
      this.distinctList = []
    },

    /** *************************************查询养护确定表在库商品分页begin*****************************************/
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
     * 查询养护确定表在库商品
     * @param data
     */
    queryInStockProTableData(data) {
      this.$showLoading()
      this.$store.dispatch(this.store + 'queryMaintainDetermineInStock', data).then(() => {
      }).finally(() => {
        this.$hideLoading()
      })
    },

    /**
     * 查询养护确定表在库商品
     */
    searchQueryInStockPro() {
      this.dialogInfoInv.topFormInv.ref.validate(valid => {
        if (valid) { // 查询表单校验
          this.initDataQueryInStockProTableData()
        }
      })
    },
    /** *************************************查询养护确定表在库商品分页end*****************************************/

    /** *************************************养护确定表在库商品参照页面begin*****************************************/
    /**
     * 关闭养护确定表在库商品参照页面
     */
    closeInStockPro() {
      this.dialogInfoInv.topFormInv.data.ownerId = null
      this.dialogInfoInv.topFormInv.data.zoneId = null
      this.dialogInfoInv.topFormInv.data.lotId = null
      this.dialogInfoInv.topFormInv.data.skuId = null
      this.dialogInfoInv.topFormInv.data.maintainType = null
      this.dialogInfoInv.visible = false
    },

    // 养护商品列表复选框,选中事件
    tableCheck(data) {
      const tempArr = []
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          tempArr.push(data[i].maintainDetermineDtId)
        }
        this.tempInStockProList = data
        this.tempDistinctList = tempArr
      }
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
      this.$set(this.diaFormInfo.data, 'skuNum', this.countVarietiesNum(tempArr).length)// 品种数
      this.$set(this.diaFormInfo.data, 'totalQty', this.sumProQty(tempArr))// 商品数量
      this.ownerId = this.diaFormInfo.data.ownerId
      this.maintainType = this.diaFormInfo.data.maintainType

      this.tempInStockProList = []// 清空临时存放选中商品集合
      this.tempDistinctList = []// 清空临时存放去重集合

      this.closeInStockPro()
    },

    /**
     * 统计品种数
     * @param arr
     * @return newArry
     */
    countVarietiesNum(arr) {
      const newArry = []
      for (let i = 0; i < arr.length; i++) {
        if (newArry.indexOf(arr[i].skuCode) == -1) {
          newArry.push(arr[i].skuCode)
        }
      }
      return newArry
    },

    /**
     * 计算商品数量
     */
    sumProQty(arr) {
      let totalQty = 0
      for (let i = 0; i < arr.length; i++) {
        totalQty = totalQty + arr[i].qty
      }
      return totalQty
    }
    /** *************************************养护确定表在库商品参照页面end*****************************************/

  },
  // 页面初始化函数
  created() {
    this.initData()
    this.initPage()
  }
}
