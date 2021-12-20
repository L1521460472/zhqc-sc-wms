// 自定义事件处理
import { getDateString } from '@/utils'
export default {
  methods: {
    /**
     * 初始化数据
     */
    initData() {
      // 默认查询第一页
      this.$setPageLimit(this.pageRequest, this.topForm.data)
      this.queryTableData(this.topForm.data)
      this.queryCountInfo(this.topForm.data)
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
      for (const key in this.topForm.data) {
        if (!['limit', 'page'].includes(key)) {
          this.topForm.data[key] = null
        }
      }
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
      this.diaFormInfo.addDtBtnShow = false
      // 封装的修改表单的数据化配置
      this.diaFormInfoViewFieldList()
      this.diaFormInfo.dtTableInfo.handle.btList[0].disabled = true
      // 为弹窗表单对应的字段赋值
      this.queryRowData(data)
      this.diaFormInfo.rules = {}
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
      this.diaFormInfo.addDtBtnShow = true
      // 绑定弹窗保存事件：saveAdd
      this.dialogInfo.btList[1].event = 'saveData'

      this.diaFormInfo.dtTableInfo.handle.btList[0].disabled = false
      this.rulesInit()
      // 封装的新增表单的数据化配置
      this.diaFormInfoAddFieldList()
      this.diaFormInfo.data.scOrderType = 'PRO_WAREHOUSING'
      this.diaFormInfo.data.isSelf = 2000
      this.$nextTick(() => {
        this.diaFormInfo.data.operationDate = getDateString(0)
      })
    },
    /**
     * 打开编辑页面
     * @param data
     */
    openEditPage(data) {
      // 弹窗的类型：edit
      this.dialogInfo.type = 'view'
      // 默认弹窗的标题：修改
      this.dialogInfo.title = this.$t('table.edit')
      // 弹窗是否显示
      this.dialogInfo.visible = true
      // 弹窗的保存按钮是否显示
      this.dialogInfo.btList[1].show = true
      // 绑定弹窗保存事件
      this.dialogInfo.btList[1].event = 'editData'
      this.dialogInfo.canEdit = true
      this.diaFormInfo.addDtBtnShow = true
      this.viewID = data.id
      this.editID = data.id
      // this.diaFormInfoViewFieldList()
      this.diaFormInfoEditFieldList()
      this.diaFormInfo.dtTableInfo.handle.btList[0].disabled = false
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
        const resp = this.$store.state[this.modName].initPageObj
        if (resp.code === this.$store.state[this.modName].successCode) {
          this.listTypeInfo.scBusinessTypeList = resp.obj.scBusinessTypeList
          this.listTypeInfo.orderTypeList = resp.obj.orderTypeList
          this.listTypeInfo.scOrderTypeList = resp.obj.scOrderTypeList
          this.listTypeInfo.isSelfList = resp.obj.isSelfList
          this.listTypeInfo.addOrderTypeList = resp.obj.addOrderTypeList
          this.listTypeInfo.orderStatusList = resp.obj.orderStatusList
          this.listTypeInfo.orderOrigList = resp.obj.orderOrigList
          this.listTypeInfo.isCrossDockingList = resp.obj.isCrossDockingList
        }
      })
    },
    /**
     * 查询表格数据
     * @param data
     */
    queryTableData(data) {
      const params = { ...data, isError: this.activeName }
      this.$showLoading()
      this.$store.dispatch(this.store + 'pageInfo', params).then(() => {

      }).finally(() => {
        this.$hideLoading()
      })
    },
    // 异常信息统计
    queryCountInfo(data) {
      const param = { ...data, isError: this.activeName }
      this.$showLoading()
      this.$store.dispatch(this.store + 'queryCountInfo', param).then(() => {
        const result = this.$store.state[this.modName].countInfoResp
        if (result.code === this.$successCode) {
          this.tabsList[1].num = result.obj.errorNum || 0
        } else {
          this.tabsList[1].num = 0
        }
      }).finally(() => {
        this.$hideLoading()
      })
    },
    /**
     * 查询行数据【查看/编辑数据从后台获取时用此方法】
     * @param data
     */
    queryRowData(data) {
      this.provinceId = null
      this.cityId = null
      this.$store.dispatch(this.store + 'initUpdate', data.id).then(() => {
        const obj = this.$store.state[this.modName].initUpdateObj.entity
        const objExt = this.$store.state[this.modName].initUpdateObj.inOrderExtend
        if (objExt) {
          obj.provinceId = objExt.provinceId
          obj.provinceName = objExt.provinceName
          obj.cityName = objExt.cityName
          obj.cityId = objExt.cityId
          obj.areaId = objExt.areaId
          obj.areaName = objExt.areaName
          obj.storeId = objExt.storeId
          obj.storeName = objExt.storeName
        }

        this.diaFormInfo.data = obj
        this.diaFormInfo.data.isSelf = Number(obj.isSelf)
        this.diaFormInfo.data.shipperProvId = Number(obj.shipperProvId)
        // this.diaFormInfo.data.supplierId = 0
        // this.diaFormInfo.data.supplierName = 'TEST'
        // this.diaFormInfo.data.shipperCityId = obj.shipperCityName
        // this.diaFormInfo.data.shipperAreaId = obj.shipperAreaName
        // this.diaFormInfo.data.shipper = obj.shipper
        // this.$set(this.diaFormInfo.data, 'consignee', obj.consignee)
        this.diaFormInfo.dtTableInfo.data = this.$store.state[this.modName].initUpdateObj.dtList
        if (this.dialogInfo.type == 'edit') {
          // const orderType = this.diaFormInfo.data.orderType
          this.dialogInfo.varSup = true
          this.dialogInfo.varCus = false
          this.dialogInfo.varStore = false
          this.dialogInfo.varProvince = false
          this.dialogInfo.varCity = false
          this.dialogInfo.varArea = false
        }
        if (this.diaFormInfo.ref) {
          this.diaFormInfo.ref.clearValidate()
        }
      })
    },

    onchange() {
      const orderType = this.diaFormInfo.data.orderType
      if (orderType == 'CGDD' || orderType == 'ZPCGDD' || orderType == 'CGDDZP') {
        this.dialogInfo.varSup = false
        this.dialogInfo.varCus = true
        this.dialogInfo.varStore = true
        this.diaFormInfo.data.customerId = null
        this.diaFormInfo.data.storeId = null
        this.diaFormInfo.fieldList[6].readonly = true// 设置成不可编辑
        this.diaFormInfo.fieldList[7].readonly = true// 设置成不可编辑
        this.diaFormInfo.fieldList[8].readonly = true// 设置成不可编辑
        this.diaFormInfo.fieldList[9].readonly = true// 设置成不可编辑
        this.diaFormInfo.fieldList[10].readonly = true// 设置成不可编辑
        this.diaFormInfo.rules.supplierId[0].required = true
        this.diaFormInfo.rules.provinceId[0].required = false
        this.diaFormInfo.rules.cityId[0].required = false
        this.diaFormInfo.rules.buyer[0].required = true
        this.dialogInfo.varProvince = true
        this.dialogInfo.varCity = true
        this.dialogInfo.varArea = true
      } else {
        this.dialogInfo.varSup = true
        this.dialogInfo.varCus = false
        this.dialogInfo.varStore = false
        this.diaFormInfo.data.supplierId = null
        this.diaFormInfo.fieldList[6].readonly = false// 设置成不可编辑
        this.diaFormInfo.fieldList[7].readonly = false// 设置成不可编辑
        this.diaFormInfo.fieldList[8].readonly = false// 设置成不可编辑
        this.diaFormInfo.fieldList[9].readonly = false// 设置成不可编辑
        this.diaFormInfo.fieldList[10].readonly = false// 设置成不可编辑
        this.diaFormInfo.rules.supplierId[0].required = false
        this.diaFormInfo.rules.provinceId[0].required = true
        this.diaFormInfo.rules.cityId[0].required = true
        this.diaFormInfo.rules.buyer[0].required = false
        this.dialogInfo.varProvince = false
        this.dialogInfo.varCity = false
        this.dialogInfo.varArea = false
      }
    },
    /**
     * 新增数据
     */
    saveData() {
      console.log(this.diaFormInfo.data)
      this.diaFormInfo.ref.validate(valid => {
        this.$showLoading()
        if (valid) {
          if (!this.diaFormInfo.dtTableInfo.data || this.diaFormInfo.dtTableInfo.data.length == 0) {
            this.$message.error('请添加订单明细')
            this.$hideLoading()
            return
          }
          this.diaFormInfo.data.dtList = this.diaFormInfo.dtTableInfo.data
          this.$store.dispatch(this.store + 'saveData', this.diaFormInfo.data).then(() => {
            const resp = this.$store.state[this.modName].addResp
            if (resp.code === this.$successCode) {
              this.dialogInfo.visible = false
              this.initData()
            }
          }).finally(() => {
            this.$hideLoading()
          })
        } else {
          this.$hideLoading()
        }
      })
    },
    /**
     * 编辑数据
     */
    editData() {
      this.diaFormInfo.ref.validate(valid => {
        if (valid) {
          if (!this.diaFormInfo.dtTableInfo.data || this.diaFormInfo.dtTableInfo.data.length == 0) {
            this.$message.error('请添加明细')
            return
          }
          this.diaFormInfo.data.dtList = this.diaFormInfo.dtTableInfo.data
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

    // 新增界面 选择 订单类型
    selectInOrderType(data) {
      if (data === 'RETURN_WAREHOUSING') {
        //  '订单类型'为“退货入库”时,   '原客户订单号' + '退货快递商' + '退货快递单号' 字段为必填
        this.diaFormInfo.rules.oldNum[0].required = true
        this.diaFormInfo.rules.origOrderCode[0].required = false
        this.diaFormInfo.rules.returnCourierNum[0].required = true

        this.diaFormInfo.rules.shipper[0].required = false
      } else if (data === 'PRO_WAREHOUSING') {
        // “订单类型”字段为“采购入库”时,   '发货方'字段为必填
        this.diaFormInfo.rules.shipper[0].required = true

        this.diaFormInfo.rules.returnCourierNum[0].required = false
        this.diaFormInfo.rules.origOrderCode[0].required = false
        this.diaFormInfo.rules.oldNum[0].required = false
      } else if (data === 'TRANSFERS_WAREHOUSING') {
        //  订单类型为 调拨出库时，，发货方为必填
        this.diaFormInfo.rules.shipper[0].required = true

        this.diaFormInfo.rules.oldNum[0].required = false
        this.diaFormInfo.rules.origOrderCode[0].required = false
        this.diaFormInfo.rules.returnCourierNum[0].required = false
      } else {
        this.diaFormInfo.rules.shipper[0].required = false
        this.diaFormInfo.rules.oldNum[0].required = false
        this.diaFormInfo.rules.origOrderCode[0].required = false
        this.diaFormInfo.rules.returnCourierNum[0].required = false
      }
    },
    // 生成so
    handleCreateAsn(data) {
      this.$confirm(this.$t('确认下发？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$showLoading()
        this.$store.dispatch(this.store + 'createAsn', { 'id': data.id }).then(() => {
          const resp = this.$store.state[this.modName].createAsnResp
          if (resp.code === this.$successCode) {
            this.queryTableData(this.topForm.data)
          }
        }).finally(() => {
          this.$hideLoading()
        })
      })
    },
    // 表格里的勾选框
    tableCheck(data) {
      const ids = []
      const idsFilter = []
      if (data && data.length > 0) {
        data.forEach(item => {
          ids.push(item.id)
          if (item.orderStatus === 'ORDER_CREATE' || item.orderStatus === 'PART_REC') {
            idsFilter.push(item.id)
          }
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
      this.checkedIdsFilter = idsFilter
    },
    // 批量下发
    handleBatchCreateSo() {
      if (!this.checkedIds || this.checkedIds.length == 0) {
        this.$message.warning('请先勾选入库订单')
        return
      }
      if (this.checkedIds.length !== this.checkedIdsFilter.length) {
        this.$message.error('您勾选的订单包含已下发或已取消的订单，请选择订单创建状态的订单进行下发')
        return
      } else {
        this.$confirm(this.$t('确认下发？'), {
          type: 'warning',
          center: true
        }).then(() => {
          this.$showLoading()
          this.$store.dispatch(this.store + 'batchSend', this.checkedIds).then(() => {
            const resp = this.$store.state[this.modName].batchSendResp
            if (resp.code === this.$successCode) {
              this.queryTableData(this.topForm.data)
            }
          }).finally(() => {
            this.$hideLoading()
          })
        })
      }
    },
    // 取消单个订单
    handleCancel(data) {
      this.$confirm(this.$t('确认取消该订单么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'cancel', data).then(() => {
          const resp = this.$store.state[this.modName].cancelResp
          if (resp.code === this.$successCode) {
            this.$message.success(resp.msg)
            this.queryTableData(this.topForm.data)
          }
        })
      })
    },
    openAddDtPage() {
      if (!this.diaFormInfo.data.ownerId) {
        this.$message.error('请先选择货主')
        return
      }
      this.dialogInfoDt.visible = true
      this.diaFormInfoDt.data = {
        skuCode: null,
        skuName: null,
        barcode: null,
        spec: null,
        mainUnit: null,
        extOne: null,
        inOrderQty: null,
        vol: null,
        grossWeight: null,
        amountDec: null,
        productionBatch: null,
        remark: null
      }
      this.tempGrossWeightKg = null
      this.tempVolDec = null
      const that = this
      setTimeout(function() {
        that.diaOwnerId = that.diaFormInfo.data.ownerId
      }, 200)
    },
    closeAddDtPage() {
      this.dialogInfoDt.visible = false
      this.diaFormInfoDt.data = {}
    },
    saveDt() {
      this.diaFormInfoDt.ref.validate(valid => {
        if (valid) {
          if (this.isEmpty(this.diaFormInfoDt.data.amountY)) {
            this.diaFormInfoDt.data.amountY = 0
          }
          const data = JSON.parse(JSON.stringify(this.diaFormInfoDt.data))
          if (this.dialogInfo.btList[1].event == 'editData') {
            data.id = 0
          }
          this.diaFormInfo.dtTableInfo.data.push(data)
          this.closeAddDtPage()
        }
      })
      let orderPriceY = 0.0
      for (let i = 0; i < this.diaFormInfo.dtTableInfo.data.length; i++) {
        const exist = this.diaFormInfo.dtTableInfo.data[i]
        orderPriceY = orderPriceY + Number((exist.sumAmountY ? exist.sumAmountY : 0.0))
      }
      this.$set(this.diaFormInfo.data, 'orderPriceY', orderPriceY)
    },
    tabsChange() {
      this.initData()
    },
    /**
     * 判断是否为空
     * @param text
     * @returns true:空
     */
    isEmpty(text) {
      if (typeof (text) === 'undefined' || !text) {
        return true
      } else {
        return false
      }
    },
    /**
     * 删除收货明细
     * @param data
     */
    // 删除明细
    deleteDt(data) {
      if (data.id && data.id > 0) {
        this.diaFormInfo.dtTableInfo.deleteIds.push(data.id)
      }
      this.$confirm('确定要删除该条数据吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.diaFormInfo.dtTableInfo.data.splice(data.$rowIndex, 1)
        this.$message.success('删除成功')
      }).catch(() => {
        console.log('fail')
      })
    },
    createASN(data) {
      this.$store.dispatch(this.store + 'createAsn', { 'id': data.id }).then(() => {
        const resp = this.$store.state[this.modName].createAsnResp
        if (resp.code === this.$successCode) {
          this.queryTableData(this.topForm.data)
        }
      })
    }
  },
  // 页面初始化函数
  created() {
    this.initData()
    this.initPage()
  }
}
