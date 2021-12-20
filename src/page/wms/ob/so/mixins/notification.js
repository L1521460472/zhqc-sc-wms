// 自定义事件处理
import { getLodop } from '../../../../../utils/LodopFuncs'

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
      const { orderCreateTimeFrom, orderCreateTimeTo, realOutTimeBegin, realOutTimeEnd } = this.topForm.data

      if (orderCreateTimeFrom && orderCreateTimeTo) {
        const start = new Date(orderCreateTimeFrom).getTime()
        const end = new Date(orderCreateTimeTo).getTime()
        if (start > end) {
          this.$message.warning('出库订单创建时间要大于截至时间')
          return
        }
      }
      if (realOutTimeBegin && realOutTimeEnd) {
        const start = new Date(realOutTimeBegin).getTime()
        const end = new Date(realOutTimeEnd).getTime()
        if (start > end) {
          this.$message.warning('出库日期起始时间要大于截至时间')
          return
        }
      }

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
        this.topForm.data[key] = null
      }
      this.topForm.data.soStatusList = []

      // this.topForm.data.ownerId = null
      // this.topForm.data.soNo = null
      // this.topForm.data.cardNo = null
      // this.topForm.data.scBusinessType = null
      // this.topForm.data.scSoType = null
      // this.topForm.data.soStatus = null
      // this.topForm.data.waveOrderNo = null
      // this.topForm.data.soStatusList = []
      // this.topForm.data.isFrozen = null
      // this.topForm.data.outOrderNo = null
      // this.topForm.data.cusOrderNo = null
      // this.topForm.data.customerId = null
      // this.topForm.data.partnerId = null
      // this.topForm.data.receiver = null
      // this.topForm.data.isHasInvoice = null
      // this.topForm.data.partnerStoreId = null
      // this.topForm.data.expOutTimeBegin = null
      // this.topForm.data.expOutTimeEnd = null
      // this.topForm.data.whAreaId = null
      // this.topForm.data.consignee = null
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
      this.viewID = data.id
      this.diaFormInfo.dtTableInfo.addDtBtnShow = false
      this.diaFormInfo.dtTableInfo.handle.btList[0].disabled = true
      // 封装的修改表单的数据化配置
      this.diaFormInfoViewFieldList()
      // 为弹窗表单对应的字段赋值
      // this.diaFormInfo.data = this.$deepClone(data);
      this.queryRowData(data)
    },
    /**
     * 关闭页面
     */
    close() {
      this.dialogInfo.visible = false
      this.provinceId = null
      this.cityId = null
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
        // this.listTypeInfo.scBusinessTypeList = obj.scBusinessTypeList
        this.listTypeInfo.orderOrigList = obj.orderOrigList
        this.listTypeInfo.soStatusList = obj.soStatusList
        this.listTypeInfo.whetherList = obj.whetherList
        this.listTypeInfo.countryList = obj.countryList
        this.listTypeInfo.takeDeliveryMethodList = obj.takeDeliveryMethodList
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
        this.tableInfo1.data = this.$store.state[this.modName].initUpdateObj.dtList
        this.tableInfo2.data = this.$store.state[this.modName].initUpdateObj.operationList
        this.provinceId = obj.provinceId
        this.cityId = obj.cityId
        if (this.diaFormInfo.ref) {
          this.diaFormInfo.ref.clearValidate()
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
     * 冻结
     */
    handleFrozen() {
      if (!this.checkedIds || this.checkedIds.length == 0) {
        this.$message.warning('请先勾选SO单')
        return
      }
      this.diaFormInfoFrozen.data = {
        ids: this.checkedIds,
        frozenRemark: null
      }
      this.dialogInfoFrozen.title = '冻结原因'
      this.diaFormInfoFrozenFieldList()
      this.dialogInfoFrozen.btList[1].event = 'saveFrozen'
      this.dialogInfoFrozen.visible = true
    },
    // 关闭冻结弹窗
    closeFrozenPage() {
      this.dialogInfoFrozen.visible = false
      this.diaFormInfoFrozen.data = {}
    },
    // 保存冻结弹窗
    saveFrozen() {
      this.diaFormInfoFrozen.ref.validate(valid => {
        if (valid) {
          this.$showLoading()
          this.$store.dispatch(this.store + 'frozen', this.diaFormInfoFrozen.data).then(() => {
            const resp = this.$store.state[this.modName].frozenResp
            if (resp.code === this.$successCode) {
              this.$message.success(resp.msg)
              this.closeFrozenPage()
              this.queryTableData(this.topForm.data)
            }
          }).finally(() => {
            this.$hideLoading()
          })
        }
      })
    },
    /**
     * 释放
     */
    handleUnfrozen() {
      if (!this.checkedIds || this.checkedIds.length == 0) {
        this.$message.warning('请先勾选SO单')
        return
      }
      this.diaFormInfoFrozen.data = {
        ids: this.checkedIds,
        unfrozenRemark: null
      }
      this.dialogInfoFrozen.title = '释放原因'
      this.diaFormInfoUnfrozenFieldList()
      this.dialogInfoFrozen.btList[1].event = 'saveUnFrozen'
      this.dialogInfoFrozen.visible = true
    },
    // 保存冻结弹窗
    saveUnFrozen() {
      this.diaFormInfoFrozen.ref.validate(valid => {
        if (valid) {
          this.$showLoading()
          this.$store.dispatch(this.store + 'unfrozen', this.diaFormInfoFrozen.data).then(() => {
            const resp = this.$store.state[this.modName].unfrozenResp
            if (resp.code === this.$successCode) {
              this.$message.success(resp.msg)
              this.closeFrozenPage()
              this.queryTableData(this.topForm.data)
            }
          }).finally(() => {
            this.$hideLoading()
          })
        }
      })
    },
    /**
     * 越库标记
     */
    handleCrossDocking() {
      if (!this.checkedIds || this.checkedIds.length == 0) {
        this.$message.warning('请先勾选SO单')
        return
      }
      this.$store.dispatch(this.store + 'crossDocking', this.checkedIds).then(() => {
        const resp = this.$store.state[this.modName].crossDockingResp
        if (resp.code === this.$successCode) {
          this.$message.success(resp.msg)
          this.queryTableData(this.topForm.data)
        }
      })
    },
    /**
     * 取消越库
     */
    handleCancelCrossDocking() {
      if (!this.checkedIds || this.checkedIds.length == 0) {
        this.$message.warning('请先勾选SO单')
        return
      }
      this.$store.dispatch(this.store + 'cancelCrossDocking', this.checkedIds).then(() => {
        const resp = this.$store.state[this.modName].cancelCrossDockingResp
        if (resp.code === this.$successCode) {
          this.$message.success(resp.msg)
          this.queryTableData(this.topForm.data)
        }
      })
    },
    /**
     * 快速拣货
     * @param data
     */
    handelFastPick(data) {
      this.$showLoading()
      this.$store.dispatch(this.store + 'fastPick', data.id).then(() => {
        const resp = this.$store.state[this.modName].fastPickResp
        if (resp.code === this.$successCode) {
          this.$message.success(resp.msg)
          this.queryTableData(this.topForm.data)
        }
      }).finally(() => {
        this.$hideLoading()
      })
    },
    handleSendMessageErp(data) {
      this.$showLoading()
      this.$store.dispatch(this.store + 'sendMessageErp', data.id).then(() => {
        const resp = this.$store.state[this.modName].sendMessageErpResp
        if (resp.code === this.$successCode) {
          this.$message.success(resp.msg)
          this.queryTableData(this.topForm.data)
        }
      }).finally(() => {
        this.$hideLoading()
      })
    },
    print() {
      const checkedIds = this.checkedIds
      const paramList = []

      if (checkedIds.length == 0) {
        this.$message.error('请选中需要打印的出货单')
        return
      }

      for (let i = 0; i < checkedIds.length; i++) {
        paramList.push(checkedIds[i])
      }
      const soPrintReq = {
        soIdList: paramList,
        num: 1
      }
      this.$store.dispatch(this.store + 'print', soPrintReq).then(() => {
        const printResp = this.$store.state[this.modName].printResp
        if (printResp.code === this.$successCode) {
          const printList = printResp.obj.templates
          const printObjs = printResp.obj.printObjs
          console.log('print', printList)
          for (let i = 0; i < printList.length; i++) {
            const template = printList[i]
            const printObj = printObjs[i]
            const LODOP = getLodop()
            LODOP.SET_PRINT_MODE('POS_BASEON_PAPER', true)
            LODOP.PRINT_INIT('打印出货单' + printObj.soNo)
            LODOP.ADD_PRINT_HTM(5, 5, 'RightMargin:1mm', 'BottomMargin:1mm', template)
            // 设置条码位置、宽高、字体、值
            // LODOP.ADD_PRINT_BARCODE(22, 660, 100, 100, 'QRCode', printObj.cardNo)
            LODOP.SET_PRINT_STYLEA(0, 'ShowBarText', 0)
            // LODOP.SET_PRINT_PAGESIZE(1,0,0,"A4");//选择A4纸，相当于设置宽210mm，高297mm
            LODOP.SET_PRINT_PAGESIZE(1, 0, 0, 'A4')
            // LODOP.PREVIEW()
            LODOP.PRINT()
          }
        }
      })
    },
    // 确认出库
    deliveryConfirmation(data) {
      this.$showLoading()
      const parm = []
      parm.push(data.id)
      this.$store.dispatch(this.store + 'oneKeyOutWh', { soIds: parm }).then(() => {
        const resp = this.$store.state[this.modName].oneKeyOutResp
        if (resp.code === this.$successCode) {
          this.$message.success(resp.msg)
          this.queryTableData(this.topForm.data)
        }
      }).finally(() => {
        this.$hideLoading()
      })
    },
    // 直配重分配
    handleRedistribution() {
      console.log('into 直接重分配')
      if (!this.checkedIds || this.checkedIds.length == 0) {
        this.$message.warning('请先勾选SO单')
        return
      }
      this.$store.dispatch(this.store + 'autoAssignZp', this.checkedIds).then(() => {
        const resp = this.$store.state[this.modName].autoAssignResp
        if (resp.code === this.$successCode) {
          this.$message.success(resp.msg)
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
