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
      const obj = this.topForm.data
      Reflect.ownKeys(obj).forEach((key) => {
        obj[key] = null
      })
      obj.adjType = 'STATUS'
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

      this.diaFormInfo.subTableInfo.title = '盘点明细'

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

      // 显示明细列表操作按钮
      this.diaFormInfo.subTableInfo.handle.btList[0].show = true
      // 显示明细头部按钮
      this.diaFormInfo.subTableInfo.topBtn.show = true

      this.ownerId = null
      // this.diaFormInfo.data.dtList = null;
      this.$set(this.diaFormInfo.data, 'dtList', null)

      // 绑定弹窗保存事件：saveAdd
      this.dialogInfo.btList[1].event = 'saveData'
      // 封装的新增表单的数据化配置
      this.diaFormInfoAddFieldList()
      this.resetFormData()
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

      if (data.inventoryStatus === 'NEW') {
        // 显示明细列表操作按钮
        this.diaFormInfo.subTableInfo.handle.btList[0].show = true
        // 显示明细头部按钮
        this.diaFormInfo.subTableInfo.topBtn.show = true
      } else {
        // 隐藏明细列表操作按钮
        this.diaFormInfo.subTableInfo.handle.btList[0].show = true
        // 隐藏明细头部按钮
        this.diaFormInfo.subTableInfo.topBtn.show = true
      }

      // 绑定弹窗保存事件
      this.dialogInfo.btList[1].event = 'editData'
      // this.editID = data.id;
      // 封装的修改表单的数据化配置
      this.diaFormInfoEditFieldList()
      // 为弹窗表单对应的字段赋值
      // this.diaFormInfo.data = this.$deepClone(data);
      setTimeout(() => {
        this.queryRowData(data)
      }, 100)
      // this.queryRowData(data)
    },

    /**
     * 打开增加产品明细参照页面
     * @param data
     */
    openDiaInv() {
      const selectedOwnerId = this.diaFormInfo.data.ownerId
      const selectedWhAreaId = this.diaFormInfo.data.whAreaId
      const ownerId = this.ownerId
      if (this.$isEmpty(selectedOwnerId)) {
        this.$message.error('请选择货主')
        return
      }
      if (this.$isEmpty(selectedWhAreaId)) {
        this.$message.error('请选择销售仓')
        return
      }
      if (!this.$isEmpty(ownerId) && selectedOwnerId != ownerId) {
        this.$message.error('只能选择一个货主')
        return
      }

      this.dialogInfoInv.title = '在库产品参照'
      this.dialogInfoInv.type = 'add'
      this.dialogInfoInv.visible = true
      this.initTopFormInvColumns()

      this.dialogInfoInv.topFormInv.data.ownerId = selectedOwnerId
      this.dialogInfoInv.topFormInv.data.whAreaId = selectedWhAreaId
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
        const result = this.$store.state[this.modName].initPageObj
        this.listTypeInfo.statusList = result?.statusList ?? []
        this.listTypeInfo.typeList = result?.typeList ?? []
        this.listTypeInfo.sourceList = result?.sourceList ?? []
        const obj = {}
        this.listTypeInfo.skuStatusList = result?.skuStatusList.map(item => {
          obj[item.value] = item.key
          return { ...item, label: item.key }
        }) ?? []
        this.skuStatusEum = obj
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
        const result = this.$store.state[this.modName].initUpdateObj
        this.diaFormInfo.data = result.entity
        result.dtList.forEach(item => {
          item.ownerId = item.consumeOwnerId
          item.ownerCode = item.consumeOwnerCode
          item.ownerName = item.consumeOwnerName
        })
        this.diaFormInfo.data.dtList = result.dtList

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
          this.diaFormInfo.subTableInfo.ref.validate(true).then((err) => {
            if (!err) {
              this.$store.dispatch(this.store + 'saveData', this.diaFormInfo.data).then(() => {
                const resp = this.$store.state[this.modName].addResp
                if (resp.code === this.$successCode) {
                  this.dialogInfo.visible = false
                  this.initData()
                  // 清空集合
                  this.distinctList = []
                  this.inStockProList = []
                  this.ownerId = null
                }
              })
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
              // 清空集合
              this.distinctList = []
              this.inStockProList = []
              this.ownerId = null
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
      this.auditFormInfo.data.id = data.id
      this.auditFormInfo.data.adjStatus = 'SUCCESS'
      this.auditFormInfo.data.auditReason = null
      this.auditRlus(this.auditFormInfo.data.adjStatus)
      this.dialogAudit.title = '审核'
      this.dialogAudit.visible = true
      this.dialogAudit.btList[0].event = 'closeAudit'
      this.dialogAudit.btList[1].event = 'saveAudit'
    },

    // 关闭审核
    closeAudit() {
      this.dialogAudit.visible = false
    },

    // 保存审核
    saveAudit() {
      this.$refs.auditForm.validate(valid => {
        if (valid) {
          this.$store.dispatch(this.store + 'audit', this.auditFormInfo.data).then(() => {
            const resp = this.$store.state[this.modName].auditResp
            if (resp.code === this.$successCode) {
              this.initData()
              this.dialogAudit.visible = false
            }
          })
        }
      })
    },

    /**
     * 盘点确认
     * @param data
     */
    confirmInventory(data) {
      const ids = []
      ids.push(data.id)
      this.$confirm(this.$t('确定要盘点确认选中的记录么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'confirmInventory', ids).then(() => {
          const resp = this.$store.state[this.modName].confirmResp
          if (resp.code === this.$successCode) {
            this.queryTableData(this.topForm.data)
          }
        })
      })
    },
    /**
     * 取消确认
     * @param data
     */
    cancelConfirmInventory(data) {
      const ids = []
      ids.push(data.id)
      this.$confirm(this.$t('确定要取消确认当前盘点单？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'cancelConfirmInventory', ids).then(() => {
          const resp = this.$store.state[this.modName].cancelConfirmResp
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
     * 批量盘点确认
     * @param data
     */
    batchConfirmInventory() {
      let ids = []
      if (this.idsList.length == 0) {
        this.$message.error('请先选中需要盘点确认的记录')
        return
      }
      ids = this.idsList
      this.$confirm(this.$t('确定要盘点确认选中的记录么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'confirmInventory', ids).then(() => {
          const resp = this.$store.state[this.modName].confirmResp
          if (resp.code === this.$successCode) {
            this.queryTableData(this.topForm.data)
          }
        })
      })
    },
    /**
     * 批量取消确认
     * @param data
     */
    batchCancelConfirmInventory() {
      let ids = []
      if (this.idsList.length == 0) {
        this.$message.error('请先选中需要取消确认的记录')
        return
      }
      ids = this.idsList
      this.$confirm(this.$t('确定要取消确认当前盘点单？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'cancelConfirmInventory', ids).then(() => {
          const resp = this.$store.state[this.modName].cancelConfirmResp
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
      if (data.length == 0) {
        this.tempInStockProList = []
        this.tempDistinctList = []
      }
      if (data.length > 0) {
        const tempArr = []
        for (let i = 0; i < data.length; i++) {
          const unikey = data[i].lotCode + data[i].skuCode + data[i].batchNo
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
        // this.determine_add();
        this.determine_update()
      }
    },
    /**
     * 确认(新增)
     */
    determine_add() {
      if (this.tempInStockProList.length == 0) {
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
          if (distinctList.indexOf(tempDistinctList[i]) == -1) {
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
      if (this.tempInStockProList.length == 0) {
        this.$message.error('请选中数据')
        return
      }
      this.distinctList = []
      if (this.diaFormInfo.data.dtList == null) {
        this.diaFormInfo.data.dtList = []
      }
      for (let i = 0; i < this.diaFormInfo.data.dtList.length; i++) {
        const letData = this.diaFormInfo.data.dtList[i]
        const unikey = letData.lotCode + letData.skuCode + letData.batchNo
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

        this.tempInStockProList.forEach((item) => {
          item.quality = item.lotQuality
          item.qualityName = item.lotQualityName
          item.tSkuStatus = ''
          item.adjQty = ''
          item.consumeOwnerId = ''
          item.consumeOwnerName = ''
          item.consumeSkuName = ''
          item.consumeQty = ''
          item.tLotCode = ''
        })
        const tempInStockProList = this.tempInStockProList
        for (let i = 0; i < tempDistinctList.length; i++) {
          if (distinctList.indexOf(tempDistinctList[i]) == -1) {
            this.distinctList.push(tempDistinctList[i])
            this.diaFormInfo.data.dtList.push(JSON.parse(JSON.stringify(tempInStockProList[i])))
          }
        }
      }
      // let tempArr = this.inStockProList.concat();//数组深拷贝
      // const tempArr = this.diaFormInfo.data.dtList.concat()// 数组深拷贝
      // console.log(tempArr, this.diaFormInfo.data.dtList)
      // tempArr.forEach((item) => {
      //   item.quality = item.lotQuality
      //   item.qualityName = item.lotQualityName
      // })
      // this.$set(this.diaFormInfo.data, 'dtList', this.diaFormInfo.data.dtList)
      // console.log(this.diaFormInfo.data.dtList)

      // this.diaFormInfo.data.dtList = this.diaFormInfo.data.dtList.map(item => {
      //   return { ...item, tSkuStatus: null, adjQty: null, consumeOwnerName: null, consumeSkuName: null, consumeQty: null, tLotCode: null }
      // })
      this.ownerId = this.diaFormInfo.data.ownerId

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

      if (this.distinctList.length == 0) {
        this.ownerId = null
        this.maintainType = null
      }
    },
    // 库位
    focusEvent(data) {
      console.log(data.row.lotQuality)
      if (this.$isEmpty(data.row.adjQty)) {
        this.$message.error('请先填写调整数量')
        return
      }
      const params = {
        'originNo': data.row.asnNo,
        'containerNo': 'XNRQ_REC',
        'skuId': data.row.skuId,
        'batchNo': 'str',
        'paType': data.row.tSkuStatus == 'BHGP' ? 'SHBLPSJ' : 'SHLPSJ',
        'waitPaQty': data.row.adjQty,
        'recommLot': 'lot_rec'
      }
      this.$store.dispatch(this.store + 'getRecommLot', params).then(() => {
        const result = this.$store.state[this.modName].lotCodeResp
        console.log(result)
        // this.$set(this.listTypeInfo, 'tLotCodeList', [])
        this.listTypeInfo.tLotCodeList.push({
          label: result.obj,
          value: result.obj
        })
        if (this.listTypeInfo.tLotCodeList.length > 1) {
          this.listTypeInfo.tLotCodeList.splice(0, 1)
        }
      })
    },

    // // 调整状态
    // tskuStatusFocusEvent(data) {
    //   console.log(data.row)

    //   this.listTypeInfo.skuStatusListCopy.map((e, index) => {
    //     if (data.row.lotQuality === e.value) {
    //       this.listTypeInfo.skuStatusList.push({ ...e, disabled: true })
    //     } else {
    //       this.listTypeInfo.skuStatusList.push({ ...e })
    //     }
    //   })
    //   console.log(this.listTypeInfo.skuStatusList, '============', this.listTypeInfo.skuStatusListCopy)
    // },
    // tskuStatusBlurEvent() {
    //   this.listTypeInfo.skuStatusList = []
    //   console.log(this.listTypeInfo.skuStatusList)
    // },
    tskuStatusChangeEvent(data) {
      // console.log(data)
      // this.listTypeInfo.skuStatusList.map()
      data.row.tSkuStatusName = this.skuStatusEum[ data.row.tSkuStatus]

      // console.log(data, this.listTypeInfo.skuStatusList)
    },
    // tskuStatuschangeEvent() {
    //   this.listTypeInfo.skuStatusList = []
    //   console.log(this.listTypeInfo.skuStatusList)
    // },
    // 耗材
    querySkuCbListFocusEvent(data) {
      console.log(data)
      if (this.$isEmpty(data.row.ownerId)) {
        this.$message.error('请先选择货主')
        return
      }
      const params = {
        'ownerId': data.row.ownerId,
        'page': 1,
        'limit': 50,
        'queryText': '',
        'isConsumables': 1
      }
      this.$store.dispatch(this.store + 'querySkuCbList', params).then(() => {
        const result = this.$store.state[this.modName].querySkuCbListResp
        result.obj.map((item) => {
          this.listTypeInfo.querySkuCbList.push({ label: item.skuName, value: item.skuCode })
        })
        console.log(result, this.listTypeInfo.querySkuCbList)
      })
    },
    querySkuCbListBlurEvent() {
      this.listTypeInfo.querySkuCbList = []
    },
    // 调整数量
    changeEvent(data) {
      if (data.row.adjQty > data.row.stockQty) {
        data.row.adjQty = data.row.stockQty
      }
    },

    handleImgSuccess(list) {
      // this.pictureIdList = list
      console.log(list)
      // this.imgInfo.pictureList = list
      // this.diaFormInfo.data.evidence = list
      // const params = {
      //   'asnNo': this.diaFormInfo.data.asnNo,
      //   'evidenceList': list
      // }
      // updateEvidence(params)
    },
    handleRemove(list) {
      console.log(list)
      // this.imgInfo.pictureList = list
      // this.diaFormInfo.data.evidence = list
      // const params = {
      //   'asnNo': this.diaFormInfo.data.asnNo,
      //   'evidenceList': list
      // }
      // updateEvidence(params)
    }

  },
  // 页面初始化函数
  created() {
    this.initData()
    this.initPage()
  }
}
