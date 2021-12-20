import { getLodop } from '../../../../../utils/LodopFuncs'

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
      this.queryCountInfo(this.topForm.data)
    },
    /**
         * 自定义查询条件
         */
    setCustomerQuery() {

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
      this.topForm.data.asnNo = null
      this.topForm.data.returnCourierNum = null
      this.topForm.data.asnType = null
      this.topForm.data.ownerId = null
      this.topForm.data.supplierId = null
      this.topForm.data.shipper = null
      this.topForm.data.consignee = null
      this.topForm.data.creator = null
      this.topForm.data.createTimeFrom = null
      this.topForm.data.createTimeTo = null
      this.topForm.data.contactName = null
      this.topForm.data.instoreDateFrom = null
      this.topForm.data.instoreDateTo = null
      this.topForm.data.skuName = null
      this.topForm.data.origNo = null
      this.topForm.data.asnSource = null
      this.topForm.data.scAsnType = null
      this.topForm.data.scBusinessType = null
      this.topForm.data.asnStatus = null
      this.topForm.data.skuId = null
      this.topForm.data.recOpetor = null
      this.topForm.data.expArrivalTimeStart = null
      this.topForm.data.expArrivalTimeEnd = null
      this.topForm.data.sourceCode = null
    },
    tabsChange() {
      this.initData()
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
      this.$router.push({ path: `/asnView/${data.id}` })
      // 弹窗的类型：view
      // this.dialogInfo.type = 'view'
      // // 默认弹窗的标题：修改
      // this.dialogInfo.title = this.$t('查看')
      // // 弹窗是否显示
      // this.dialogInfo.visible = true
      // // 弹窗的保存按钮是否显示
      // this.dialogInfo.btList[1].show = false
      // // 绑定弹窗保存事件：viewSave
      // this.dialogInfo.btList[1].event = 'viewSave'
      // this.viewID = data.id
      // this.diaFormInfo.addDtBtnShow = false
      // // 封装的修改表单的数据化配置
      // this.diaFormInfoViewFieldList()
      // // 为弹窗表单对应的字段赋值
      // this.diaFormInfo.data = this.$deepClone(data)
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

      this.diaFormInfo.addDtBtnShow = true
      // 绑定弹窗保存事件：saveAdd
      this.dialogInfo.btList[1].event = 'saveData'
      this.diaFormInfo.dtTableInfo.handle.btList[0].disabled = false
      this.diaFormInfo.dtTableInfo.handle.fixed = 'right'
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
      this.diaFormInfo.dtTableInfo.handle.btList[0].disabled = false
      this.diaFormInfo.dtTableInfo.handle.fixed = 'right'
      // 为弹窗表单对应的字段赋值
      this.diaFormInfo.data = this.$deepClone(data)
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
          this.listTypeInfo.asnSourceList = resp.obj.asnSourceList
          this.listTypeInfo.scAsnTypeList = resp.obj.scAsnTypeList
          this.listTypeInfo.scBusinessTypeList = resp.obj.scBusinessTypeList
          this.listTypeInfo.asnStatusList = resp.obj.asnStatusList
          this.listTypeInfo.asnDtStatusList = resp.obj.asnDtStatusList
        }
      })
    },
    /**
         * 查询表格数据
         * @param data
         */
    queryTableData(data) {
      var params
      if (this.activeName === 0) {
        params = data
      } else if (this.activeName === 6) {
        params = { ...data, isError: 1 }
      } else {
        params = { ...data, innerStatus: this.tabsList[this.activeName].innerStatus }
      }
      console.log(this.activeName)
      // if()
      this.$showLoading()
      this.$store.dispatch(this.store + 'pageInfo', params).then(() => {
      }).finally(() => {
        this.$hideLoading()
      })
    },
    // 异常信息统计
    queryCountInfo(data) {
      const param = { ...data }
      this.$showLoading()
      this.$store.dispatch(this.store + 'queryCountInfo', param).then(() => {
        const result = this.$store.state[this.modName].countInfoResp
        if (result.code === this.$successCode) {
          this.tabsList[1].num = result.obj?.recWaitNum?.num ?? 0
          this.tabsList[1].innerStatus = result.obj?.recWaitNum?.innerStatus ?? 0
          this.tabsList[2].num = result.obj?.recingNum?.num ?? 0
          this.tabsList[2].innerStatus = result.obj?.recingNum?.innerStatus ?? 0
          this.tabsList[3].num = result.obj?.paIngNum?.num ?? 0
          this.tabsList[3].innerStatus = result.obj?.paIngNum?.innerStatus ?? 0
          this.tabsList[4].num = result.obj?.doneNum?.num ?? 0
          this.tabsList[4].innerStatus = result.obj?.doneNum?.innerStatus ?? 0
          this.tabsList[5].num = result.obj?.cancelNum?.num ?? 0
          this.tabsList[5].innerStatus = result.obj?.cancelNum?.innerStatus ?? 0
          this.tabsList[6].num = result.obj?.errorNum ?? 0
        } else {
          this.tabsList[1].num = 0
          this.tabsList[2].num = 0
          this.tabsList[3].num = 0
          this.tabsList[4].num = 0
          this.tabsList[5].num = 0
          this.tabsList[6].num = 0
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
      this.$store.dispatch(this.store + 'initUpdate', data.id).then(() => {
        this.diaFormInfo.data = this.$store.state[this.modName].initUpdateObj.entity
        this.tableInfo1.data = this.$store.state[this.modName].initUpdateObj.dtList
        this.tableInfo2.data = this.$store.state[this.modName].initUpdateObj.logList
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
          if (!this.diaFormInfo.dtTableInfo.data || this.diaFormInfo.dtTableInfo.data.length == 0) {
            this.$message.error('请添加订单明细')
            return
          }
          this.diaFormInfo.data.dtList = this.diaFormInfo.dtTableInfo.data
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
         * 删除收货明细
         * @param data
         */
    deleteDt(data) {
      this.$confirm(this.$t('确认删除选中的记录么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'deleteDt', { 'id': data.id }).then(() => {
          const resp = this.$store.state[this.modName].deleteDtResp
          if (resp.code === this.$successCode) {
            for (let i = 0; i < this.diaFormInfo.dtTableInfo.data.length; i++) {
              const exist = this.diaFormInfo.dtTableInfo.data[i]
              if (exist.skuCode == data.skuCode) {
                this.diaFormInfo.dtTableInfo.data.splice(i, 1)
                return
              }
            }
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
    openAddDtPage() {
      this.dialogInfoDt.visible = true
      this.diaFormInfoDt.data = {
        skuCode: null,
        skuName: null,
        spec: null,
        unit: null,
        inOrderQty: null,
        drugForm: null
      }
    },
    closeAddDtPage() {
      this.dialogInfoDt.visible = false
      this.diaFormInfoDt.data = {}
    },

    saveDt() {
      this.diaFormInfoDt.ref.validate(valid => {
        if (valid) {
          for (let i = 0; i < this.diaFormInfo.dtTableInfo.data.length; i++) {
            const exist = this.diaFormInfo.dtTableInfo.data[i]
            if (exist.skuCode == this.diaFormInfoDt.data.skuCode) {
              this.$message.error('产品编码已存在，保存失败')
              return
            }
          }
          const data = {
            skuId: this.diaFormInfoDt.data.skuId,
            skuCode: this.diaFormInfoDt.data.skuCode,
            skuName: this.diaFormInfoDt.data.skuName,
            spec: this.diaFormInfoDt.data.spec,
            drugForm: this.diaFormInfoDt.data.drugForm,
            mainUnit: this.diaFormInfoDt.data.mainUnit,
            inOrderQty: this.diaFormInfoDt.data.inOrderQty,
            vol: this.diaFormInfoDt.data.vol,
            grossWeight: this.diaFormInfoDt.data.grossWeight,
            netWeight: this.diaFormInfoDt.data.netWeight,
            amount: this.diaFormInfoDt.data.amount
          }
          this.diaFormInfo.dtTableInfo.data.push(data)
          this.closeAddDtPage()
        }
      })
    },
    // 表格里的勾选框
    tableCheck(list) {
      this.tableSelectList = list
    },

    /**
         * 打印print
         * @param data
         */
    print(data) {
      console.log(data)
      const checkedIds = this.tableSelectList
      const paramList = []

      if (checkedIds.length == 0) {
        this.$message.error('请选中需要打印的收货单')
        return
      }

      for (let i = 0; i < checkedIds.length; i++) {
        paramList.push(checkedIds[i].id)
      }
      const asnPrintReq = {
        asnIdList: paramList,
        num: 1
      }
      // const asnNo = data?.asnNo || ''
      this.$store.dispatch(this.store + 'print', asnPrintReq).then(() => {
        const printResp = this.$store.state[this.modName].printResp
        if (printResp.code === this.$successCode) {
          const printList = printResp.obj.templates
          const printObjs = printResp.obj.printObjs
          const LODOP = getLodop()
          for (let i = 0; i < printList.length; i++) {
            const template = printList[i]
            const printObj = printObjs[i]
            LODOP.SET_PRINT_MODE('POS_BASEON_PAPER', true)
            LODOP.PRINT_INIT('打印ASN收货通知单' + printObj.asnNo)
            LODOP.ADD_PRINT_HTM(5, 5, 'RightMargin:1mm', 'BottomMargin:1mm', template)
            // LODOP.ADD_PRINT_BARCODE(22, 660, 100, 100, 'QRCode', printObj.returnCourierNum)
            LODOP.SET_PRINT_STYLEA(0, 'ShowBarText', 0)
            LODOP.SET_PRINT_PAGESIZE(1, 0, 0, 'A4')
            // LODOP.PREVIEW()
            LODOP.PRINT()
          }
        }
      })
    },
    quickReceipt(data) {
      const asnNo = data.asnNo
      const origNo = data.origNo
      this.$store.dispatch(this.store + 'setAsnNo', asnNo ?? origNo)
      this.$router.push({ path: 'page_wms_ib_quickReceipt_quickReceipt' })
    }

  },
  // 页面初始化函数
  created() {
    this.initData()
    this.initPage()
  }
}
