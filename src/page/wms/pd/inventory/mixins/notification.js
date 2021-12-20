import {
  upload
} from '../api'
import service from '@/utils/server'

service.interceptors.request.use(config => {
  const token1 = window.sessionStorage.getItem('token')
  config.headers.Authorization = token1
  return config
})
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
      this.topForm.data.companyCode = null
      this.topForm.data.whId = null
      this.topForm.data.ownerId = null
      this.topForm.data.inventoryNo = null
      this.topForm.data.inventoryType = null
      this.topForm.data.inventoryStatus = null
      this.topForm.data.sourceType = null
      this.topForm.data.origId = null
      this.topForm.data.origNo = null
      this.topForm.data.inventoryMethod = null
      this.topForm.data.planStartTime = null
      this.topForm.data.isVisible = null
      this.topForm.data.confirmUser = null
      this.topForm.data.confirmTime = null
      this.topForm.data.pdFinishTime = null
      this.topForm.data.remark = null
      this.topForm.data.creator = null
      this.topForm.data.createName = null
      this.topForm.data.createTime = null
      this.topForm.data.updater = null
      this.topForm.data.updateName = null
      this.topForm.data.updateTime = null
      this.topForm.data.optimistic = null
      this.topForm.data.whAreaId = null
      this.topForm.data.inventoryOperator = null
      this.topForm.data.supervisionOperator = null
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
      this.$router.push({ path: `/inventoryView/${data.id}` })
      // // 弹窗的类型：view
      // this.dialogInfo.type = 'view'
      // // 默认弹窗的标题：修改
      // this.dialogInfo.title = this.$t('查看')
      // // 弹窗是否显示
      // this.dialogInfo.visible = true
      // // 弹窗的保存按钮是否显示
      // this.dialogInfo.btList[1].show = false

      // // 隐藏明细列表操作按钮
      // this.diaFormInfo.subTableInfo.handle.btList[0].show = false
      // // 隐藏明细头部按钮
      // this.diaFormInfo.subTableInfo.topBtn.show = false

      // this.diaFormInfo.subTableInfo.title = '盘点明细'

      // // 绑定弹窗保存事件：viewSave
      // this.dialogInfo.btList[1].event = 'viewSave'
      // this.viewID = data.id
      // // 封装的修改表单的数据化配置
      // this.diaFormInfoViewFieldList()
      // // 为弹窗表单对应的字段赋值
      // // this.diaFormInfo.data = this.$deepClone(data);
      // this.queryRowData(data)
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

      this.diaFormInfo.subTableInfo.topBtn.disabled = false
      this.diaFormInfo.subTableInfo.handle.btList[0].disabled = false

      this.ownerId = null
      // this.diaFormInfo.data.dtList = null;
      this.$set(this.diaFormInfo.data, 'dtList', null)

      // 绑定弹窗保存事件：saveAdd
      this.dialogInfo.btList[1].event = 'saveData'
      // 封装的新增表单的数据化配置
      this.diaFormInfoAddFieldList()
      this.resetFormData()

      this.diaFormInfo.imgInfo.disabled = true

      this.diaFormInfo.data.inventoryMethod = this.listTypeInfo.inventoryMethodList.length == 0 ? null : this.listTypeInfo.inventoryMethodList[1].value
      this.diaFormInfo.data.isVisible = this.listTypeInfo.isVisibleList.length == 0 ? null : this.listTypeInfo.isVisibleList[1].value
      this.diaFormInfo.data.inventoryType = this.listTypeInfo.inventoryTypeList.length == 0 ? null : this.listTypeInfo.inventoryTypeList[0].value
      this.diaFormInfo.data.inventoryStatus = this.listTypeInfo.inventoryStatusList.length == 0 ? null : this.listTypeInfo.inventoryStatusList[0].value
      this.diaFormInfo.data.sourceType = this.listTypeInfo.sourceTypeList.length == 0 ? null : this.listTypeInfo.sourceTypeList[0].value
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
        // this.diaFormInfo.subTableInfo.handle.btList[0].show = false
        // 隐藏明细头部按钮
        this.diaFormInfo.subTableInfo.topBtn.show = false
      }

      // 绑定弹窗保存事件
      this.dialogInfo.btList[1].event = 'editData'
      // this.editID = data.id;
      // 封装的修改表单的数据化配置
      this.diaFormInfoEditFieldList()
      // 为弹窗表单对应的字段赋值
      // this.diaFormInfo.data = this.$deepClone(data);
      this.queryRowData(data)

      this.diaFormInfo.imgInfo.disabled = false
    },

    /**
     * 打开增加产品明细参照页面
     * @param data
     */
    openDiaInv() {
      const selectedOwnerId = this.diaFormInfo.data.ownerId
      const ownerId = this.ownerId
      if (this.$isEmpty(selectedOwnerId)) {
        this.$message.error('请选择货主')
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
      this.dialogInfoInv.topFormInv.data.whAreaId = this.diaFormInfo.data.whAreaId
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
        this.listTypeInfo.inventoryTypeList = this.$store.state[this.modName].initPageObj.inventoryTypeList
        this.listTypeInfo.inventoryStatusList = this.$store.state[this.modName].initPageObj.inventoryStatusList
        this.listTypeInfo.sourceTypeList = this.$store.state[this.modName].initPageObj.sourceTypeList
        this.listTypeInfo.inventoryMethodList = this.$store.state[this.modName].initPageObj.inventoryMethodList
        this.listTypeInfo.isVisibleList = this.$store.state[this.modName].initPageObj.isVisibleList
        this.listTypeInfo.rangeList = this.$store.state[this.modName].initPageObj.rangeList
        this.listTypeInfo.goodStatusList = this.$store.state[this.modName].initPageObj.goodStatusList
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
        const res = this.$store.state[this.modName].initUpdateObj.entity
        this.diaFormInfo.data = res

        this.diaFormInfo.subTableInfo.topBtn.disabled = !res.addDtFlag
        this.diaFormInfo.subTableInfo.handle.btList[0].disabled = !res.addDtFlag
        // this.diaFormInfo.data.dtList = this.diaFormInfo.data.dtList.map(item => {
        //   return { ...item, goodProduct: null, damagedProduct: null, expiredProduct: null, badProduct: null }
        // })
        this.diaFormInfo.imgInfo.pictureList = JSON.parse(this.$store.state[this.modName].initUpdateObj.entity.attachment)
        console.log(this.diaFormInfo.data.dtList)
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
          const config = {
            responseType: 'blob',
            timeout: 50000, // 请求超时时间
            headers: {
              'Content-Type': 'application/json'
            }
          }
          var exportVO = {}
          exportVO.templateName = 'inventoryService'
          exportVO.paramMap = { id: data.id }
          service.post(this.exportUrl, exportVO, config).then((res) => {
            if (res.type === 'application/json') {
              var blob = new Blob([res])
              var reader = new FileReader()
              reader.readAsText(blob, 'utf-8')
              var that = this
              reader.onload = function() {
                var resp = JSON.parse(reader.result)
                if (resp.code === 200) {
                  that.$message.success(resp.msg)
                } else {
                  that.$message.error(resp.msg)
                }
              }
            } else if (res.type === 'application/vnd.ms-excel') {
              // eslint-disable-next-line no-redeclare
              var blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' }) // application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
              var downloadElement = document.createElement('a')
              var href = window.URL.createObjectURL(blob) // 创建下载的链接
              downloadElement.href = href
              downloadElement.download = '库内管理-盘点单' + '.xlsx' // 下载后文件名
              document.body.appendChild(downloadElement)
              downloadElement.click() // 点击下载
              document.body.removeChild(downloadElement) // 下载完成移除元素
              window.URL.revokeObjectURL(href) // 释放掉blob对象
              this.$message.success('成功')
            }
            this.$hideLoading()
            this.paramMap = null
          }).catch(e => {
            this.$hideLoading()
            this.$message.error('下载异常，请稍后重试')
            this.paramMap = null
            console.log(e)
          })
        }
      })
    },

    /**
     * 审核
     * @param data
     */
    audit(data) {
      this.auditFormInfo.data.id = data.id
      this.auditFormInfo.data.isPass = 1
      this.auditFormInfo.data.content = null
      this.auditRlus(this.auditFormInfo.data.isPass)
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
          this.$store.dispatch(this.store + 'auditData', this.auditFormInfo.data).then(() => {
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
      console.log(data)
      this.exportId = data[0].id
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
          item.goodQty = item.planPdQtyB
          item.sumPdQty = ''
          item.goodPdQty = ''
          item.brokenPdQty = ''
          item.expiredPdQty = ''
          item.badPdQty = ''
          item.diffQty = ''
        })
        const tempInStockProList = this.tempInStockProList
        for (let i = 0; i < tempDistinctList.length; i++) {
          if (distinctList.indexOf(tempDistinctList[i]) == -1) {
            this.distinctList.push(tempDistinctList[i])
            this.diaFormInfo.data.dtList.push(tempInStockProList[i])
          }
        }
      }
      // let tempArr = this.inStockProList.concat();//数组深拷贝
      // const tempArr = this.diaFormInfo.data.dtList.concat()// 数组深拷贝
      // this.$set(this.diaFormInfo.data, 'dtList', tempArr)
      // this.diaFormInfo.data.dtList = this.diaFormInfo.data.dtList.map(item => {
      //   return { ...item, goodQty: item.planPdQtyB, sumPdQty: null, goodPdQty: null, brokenPdQty: null, expiredPdQty: null, badPdQty: null, diffQty: null }
      // })
      // console.log(this.diaFormInfo.data.dtList)
      this.ownerId = this.diaFormInfo.data.ownerId

      this.tempInStockProList = []// 清空临时存放选中产品集合
      this.tempDistinctList = []// 清空临时存放去重集合

      this.closeInStockPro()
    },
    // 合格品数
    goodProductFocusEvent(data) {
      if (data.row.goodPdQty === 0 && data.row.brokenPdQty !== 0 && data.row.expiredPdQty !== 0 && data.row.badPdQty !== 0) {
        data.row.sumPdQty = 0
        data.row.diffQty = 0 - data.row.goodQty - data.row.badQty
      }
    },
    goodProductChangeEvent(data) {
      if (data.row.goodPdQty) {
        data.row.sumPdQty = (data.row.goodPdQty + data.row.brokenPdQty + data.row.expiredPdQty + data.row.badPdQty).toFixed(3)
        data.row.diffQty = (data.row.sumPdQty - data.row.goodQty - data.row.badQty).toFixed(3)
      } else {
        data.row.goodPdQty = null
        data.row.sumPdQty = (data.row.goodPdQty + data.row.brokenPdQty + data.row.expiredPdQty + data.row.badPdQty).toFixed(3)
        data.row.diffQty = (data.row.sumPdQty - data.row.goodQty - data.row.badQty).toFixed(3)
      }
    },
    // 破损品数
    damagedProductFocusEvent(data) {
      if (data.row.goodPdQty !== 0 && data.row.brokenPdQty === 0 && data.row.expiredPdQty !== 0 && data.row.badPdQty !== 0) {
        data.row.sumPdQty = 0
        data.row.diffQty = 0 - data.row.goodQty - data.row.badQty
      }
    },
    damagedProductChangeEvent(data) {
      if (data.row.brokenPdQty) {
        data.row.sumPdQty = (data.row.goodPdQty + data.row.brokenPdQty + data.row.expiredPdQty + data.row.badPdQty).toFixed(3)
        data.row.diffQty = (data.row.sumPdQty - data.row.goodQty - data.row.badQty).toFixed(3)
      } else {
        data.row.brokenPdQty = null
        data.row.sumPdQty = (data.row.goodPdQty + data.row.brokenPdQty + data.row.expiredPdQty + data.row.badPdQty).toFixed(3)
        data.row.diffQty = (data.row.sumPdQty - data.row.goodQty - data.row.badQty).toFixed(3)
      }
    },
    // 过期品数
    expiredProductFocusEvent(data) {
      if (data.row.goodPdQty !== 0 && data.row.brokenPdQty !== 0 && data.row.expiredPdQty === 0 && data.row.badPdQty !== 0) {
        data.row.sumPdQty = 0
        data.row.diffQty = 0 - data.row.goodQty - data.row.badQty
      }
    },
    expiredProductChangeEvent(data) {
      if (data.row.expiredPdQty) {
        data.row.sumPdQty = (data.row.goodPdQty + data.row.brokenPdQty + data.row.expiredPdQty + data.row.badPdQty).toFixed(3)
        data.row.diffQty = (data.row.sumPdQty - data.row.goodQty - data.row.badQty).toFixed(3)
      } else {
        data.row.expiredPdQty = null
        data.row.sumPdQty = (data.row.goodPdQty + data.row.brokenPdQty + data.row.expiredPdQty + data.row.badPdQty).toFixed(3)
        data.row.diffQty = (data.row.sumPdQty - data.row.goodQty - data.row.badQty).toFixed(3)
      }
    },
    // 不合格品数
    badProductFocusEvent(data) {
      if (data.row.goodPdQty !== 0 && data.row.brokenPdQty !== 0 && data.row.expiredPdQty !== 0 && data.row.badPdQty === 0) {
        data.row.sumPdQty = 0
        data.row.diffQty = 0 - data.row.goodQty - data.row.badQty
      }
    },
    badProductChangeEvent(data) {
      if (data.row.badPdQty) {
        data.row.sumPdQty = (data.row.goodPdQty + data.row.brokenPdQty + data.row.expiredPdQty + data.row.badPdQty).toFixed(3)
        data.row.diffQty = (data.row.sumPdQty - data.row.goodQty - data.row.badQty).toFixed(3)
      } else {
        data.row.badPdQty = null
        data.row.sumPdQty = (data.row.goodPdQty + data.row.brokenPdQty + data.row.expiredPdQty + data.row.badPdQty).toFixed(3)
        data.row.diffQty = (data.row.sumPdQty - data.row.goodQty - data.row.badQty).toFixed(3)
      }
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
    // 上传成功
    handleImgSuccess(list) {
      this.diaFormInfo.imgInfo.pictureList = list
      this.diaFormInfo.data.attachment = JSON.stringify(list)
      // this.diaFormInfo.data.evidence = list
      const params = {
        'inventoryNo': this.diaFormInfo.data.inventoryNo,
        'attachmentList': list
      }
      upload(params)
    },
    // 移除
    handleRemove(list) {
      console.log(list)
      this.diaFormInfo.imgInfo.pictureList = list
      this.diaFormInfo.data.attachment = JSON.stringify(list)
      // this.diaFormInfo.data.evidence = list
      const params = {
        'inventoryNo': this.diaFormInfo.data.inventoryNo,
        'attachmentList': list
      }
      upload(params)
    }

  },
  // 页面初始化函数
  created() {
    this.initData()
    this.initPage()
  }
}
