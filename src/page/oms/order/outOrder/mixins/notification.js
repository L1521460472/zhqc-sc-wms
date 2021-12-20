import { getDateString } from '@/utils'
// 自定义事件处理
import { formatDate } from '@/utils/date'
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
          if (this.topForm.data.confirmTimeBegin) {
            this.topForm.data.confirmTimeBegin = this.topForm.data.confirmTimeBegin + ' 00:00:00'
          }
          if (this.topForm.data.confirmTimeEnd) {
            this.topForm.data.confirmTimeEnd = this.topForm.data.confirmTimeEnd + ' 00:00:00'
          }
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
    },

    // 添加展开收起表单功能
    openCollapsable() {
      this.collapsable = !this.collapsable
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
      // 封装的修改表单的数据化配置
      this.diaFormInfoViewFieldList()
      this.queryRowData(data)
      this.diaFormInfo.dtTableInfo.topBtn.show = false
      this.diaFormInfo.dtTableInfo.handle.btList[0].disabled = true
      // 为弹窗表单对应的字段赋值
      // this.diaFormInfo.data = this.$deepClone(data);
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
      this.diaFormInfo.dtTableInfo.topBtn.show = true
      this.rulesInit()
      // 封装的新增表单的数据化配置
      this.diaFormInfoAddFieldList()
      // 新增页面的下拉列表的数据
      // this.diaFormInfoAddFieldListData();
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
      this.rulesInit()
      // 为弹窗表单对应的字
      // 段赋值
      // this.diaFormInfo.data = this.$deepClone(data);
      this.queryRowData(data)
      this.diaFormInfo.dtTableInfo.topBtn.show = true
      this.diaFormInfo.dtTableInfo.handle.btList[0].disabled = false
      this.diaFormInfo.dtTableInfo.deleteIds = []
    },
    /**
     * 关闭页面
     */
    close() {
      this.provinceId = null
      this.cityId = null
      this.dialogInfo.visible = false
    },

    /**
     * 点击新增  获取列表数据
     */
    // diaFormInfoAddFieldListData() {
    //
    // },

    /**
     * 页面初始化
     */
    initPage() {
      this.$store.dispatch(this.store + 'initPage', {}).then(() => {
        const obj = this.$store.state[this.modName].initPageObj
        this.listTypeInfo.ordersType = obj.ordersType
        this.listTypeInfo.responsibility = obj.responsibility
        // this.listTypeInfo.reissue = obj.reissue;
        this.listTypeInfo.reissue = [
          { value: 1, key: '是' },
          { value: 0, key: '否' }
        ]
        this.listTypeInfo.scorderTypeList = obj.scorderTypeList
        this.listTypeInfo.scbusinessTypeList = obj.scbusinessTypeList
        this.listTypeInfo.deliveryTypeList = obj.DeliveryWayEnum
        this.listTypeInfo.orderTypeList = obj.OrderTypeEnum
        this.listTypeInfo.methodOfPaymentList = obj.PayTypeEnum
        this.listTypeInfo.orderOrigList = obj.orderOrigList
        this.listTypeInfo.orderStatusList = obj.orderStatusList
        this.listTypeInfo.whetherList = obj.whetherList
        this.listTypeInfo.countryList = obj.countryList
        this.listTypeInfo.dischargeTypeList = obj.dischargeTypeList
        // this.listTypeInfo.orderDtUnitTypeList = obj.orderDtUnitTypeList;
        this.carrierCode = obj.carrierCode
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
      this.receivingProvince = null
      this.receivingCity = null
      this.$store.dispatch(this.store + 'initUpdate', data.id).then(() => {
        const resp = this.$store.state[this.modName].initUpdateObj
        console.log(resp)
        const obj = this.$store.state[this.modName].initUpdateObj.entity
        this.receivingProvince = Number(obj.receivingProvince)
        this.receivingCity = Number(obj.receivingCity)
        this.diaFormInfo.data = obj
        this.diaFormInfo.data.shipper = Number(obj.shipper)
        this.diaFormInfo.data.consignee = Number(obj.consignee)
        // this.diaFormInfo.data.reissue = Number(obj.reissue)
        // this.diaFormInfo.data.responsibility = Number(obj.responsibility)
        // this.diaFormInfo.data.payWay = Number(obj.payWay)
        this.diaFormInfo.data.receivingProvince = Number(obj.receivingProvince)
        this.diaFormInfo.data.receivingCity = Number(obj.receivingCity)
        this.diaFormInfo.data.receivingArea = Number(obj.receivingArea)
        // this.diaFormInfo.data.carrierName = resp.carrierName
        this.diaFormInfo.dtTableInfo.data = this.$store.state[this.modName].initUpdateObj.dtList

        // 店铺名称 id 转为 value 来显示
        // if (obj.storeName) {
        //   this.$store.dispatch(this.store + 'viewStoreName', obj.storeName).then(() => {
        //     const obj = this.$store.state[this.modName].viewStoreNameResp.entity
        //     this.diaFormInfo.data.storeName = obj.shortName
        //   })
        // }
        // 收货方 id 转为 value 来显示  consignee
        // if (obj.consignee) {
        //   this.$store.dispatch(this.store + 'viewConsignee', obj.consignee).then(() => {
        //     const vieConsigneeObj = this.$store.state[this.modName].vieConsigneeResp
        //     this.diaFormInfo.data.consignee = vieConsigneeObj.whName
        //   })
        // }
        // 发货方 id 转为 value 来显示  shipper
        // if (obj.shipper) {
        //   this.$store.dispatch(this.store + 'viewConsignee', obj.shipper).then(() => {
        //     const vieConsigneeObj = this.$store.state[this.modName].vieConsigneeResp
        //     this.diaFormInfo.data.shipper = vieConsigneeObj.whName
        //   })
        // }
        // 承运商名称 id 转为 value 显示
        // if (obj.partnerId) {
        //   this.$store.dispatch(this.store + 'viewPartnerName', { carrierId: obj.partnerId }).then(() => {
        //     const viewPartnerNameObj = this.$store.state[this.modName].viewPartnerNameResp
        //     const result = viewPartnerNameObj.filter((value, index) => {
        //       return value.id == obj.partnerId
        //     })
        //     console.log(result)
        //     if (result) {
        //       // this.diaFormInfo.data.partnerId = result[0].id
        //       this.diaFormInfo.data.partnerName = result[0].carrierName
        //     }
        //   })
        // }
        // 快递商名称 id 转为 value 显示  courierName
        // if (obj.courierName) {
        //   this.$store.dispatch(this.store + 'viewCourierName', { keyWord: obj.courierName }).then(() => {
        //     const viewCourierNameObj = this.$store.state[this.modName].viewCourierNameResp
        //     const result = viewCourierNameObj.filter((value) => {
        //       return value.id == obj.courierName
        //     })
        //     this.diaFormInfo.data.courierName = result[0].shortName
        //   })
        // }
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
        this.$showLoading()
        if (valid) {
          if (!this.diaFormInfo.dtTableInfo.data || this.diaFormInfo.dtTableInfo.data.length == 0) {
            this.$message.error('请添加订单明细')
            this.$hideLoading()
            return
          }
          // 解决方案：
          // if (JSON.stringify(this.listTypeInfo.deliveryTypeList).indexOf(this.diaFormInfo.data.isSelf) != -1){
          //   this.listTypeInfo.deliveryTypeList.map((item,index) =>{
          //     if (this.diaFormInfo.data.isSelf  === item.value){
          //       this.diaFormInfo.data.isSelf = item;
          //     }
          //   })
          // }
          // this.diaFormInfo.data.isSelf = this.diaFormInfo.data.isSelf.code;
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
            this.$message.error('请添加订单明细')
            this.$hideLoading()
            return
          }
          this.diaFormInfo.data.dtList = this.diaFormInfo.dtTableInfo.data
          this.diaFormInfo.data.deleteIds = this.diaFormInfo.dtTableInfo.deleteIds
          this.$showLoading()
          this.$store.dispatch(this.store + 'editData', this.diaFormInfo.data).then(() => {
            const resp = this.$store.state[this.modName].editResp
            if (resp.code === this.$successCode) {
              this.dialogInfo.visible = false
              this.queryTableData(this.topForm.data)
            }
          }).finally(() => {
            this.$hideLoading()
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
    // 打开明细弹窗
    openAddDtPage() {
      if (!this.diaFormInfo.data.ownerId) {
        this.$message.error('请先选择货主')
        return
      }
      this.dialogInfoDt.visible = true
      this.diaFormInfoDt.data = {
        id: 0,
        skuCode: null,
        skuName: null,
        spec: null,
        drugForm: null,
        originCountry: null,
        mfg: null,
        approveNo: null,
        drugFormSpec: null,
        barcode: null,
        mfgId: null,
        outOrderQty: null,
        productionBatch: null,
        invalidDate: null,
        mainUnit: null,
        productionDate: null,
        batchNo: null,
        supplierId: null,
        supplierName: null,
        tradeName: null,
        brandName: null,
        vol: null,
        grossWeight: null,
        amount: null,
        volDec: null,
        grossWeightKg: null,
        amountDec: null,
        extOne: null,
        perQty: 0
      }
      this.tempGrossWeightKg = null
      this.tempVolDec = null
      const that = this
      setTimeout(function() {
        that.ownerId = that.diaFormInfo.data.ownerId
      }, 200)
    },
    // 关闭添加明细弹窗
    closeAddDtPage() {
      this.dialogInfoDt.visible = false
      this.diaFormInfoDt.data = {}
    },
    // 保存明细
    saveDt() {
      this.diaFormInfoDt.ref.validate(valid => {
        if (valid) {
          // for(let i=0;i<this.diaFormInfo.dtTableInfo.data.length;i++){
          //   let exist = this.diaFormInfo.dtTableInfo.data[i];
          //   if(exist.skuCode == this.diaFormInfoDt.data.skuCode){
          //     this.$message.error("产品已存在，保存失败");
          //     return;
          //   }
          // }
          const data = {
            id: this.diaFormInfoDt.data.id,
            skuCode: this.diaFormInfoDt.data.skuCode,
            skuName: this.diaFormInfoDt.data.skuName,
            spec: this.diaFormInfoDt.data.spec,
            drugForm: this.diaFormInfoDt.data.drugForm,
            originCountry: this.diaFormInfoDt.data.originCountry,
            mfg: this.diaFormInfoDt.data.mfg,
            approveNo: this.diaFormInfoDt.data.approveNo,
            drugFormSpec: this.diaFormInfoDt.data.drugFormSpec,
            barcode: this.diaFormInfoDt.data.barcode,
            mfgId: this.diaFormInfoDt.data.mfgId,
            mainUnit: this.diaFormInfoDt.data.mainUnit,
            tradeName: this.diaFormInfoDt.data.tradeName,
            brandName: this.diaFormInfoDt.data.brandName,
            tempControlName: this.diaFormInfoDt.data.tempControlName,
            validityDay: this.diaFormInfoDt.data.validityDay,
            outOrderQty: this.diaFormInfoDt.data.outOrderQty,
            productionBatch: this.diaFormInfoDt.data.productionBatch,
            batchNo: this.diaFormInfoDt.data.batchNo,
            supplierId: this.diaFormInfoDt.data.supplierId,
            supplierName: this.diaFormInfoDt.data.supplierName,
            extOne: this.diaFormInfoDt.data.extOne,
            costPrice: this.diaFormInfoDt.data.costPrice,
            mainUnitName: this.diaFormInfoDt.data.mainUnitName,
            volDec: this.diaFormInfoDt.data.volDec,
            grossWeightKg: this.diaFormInfoDt.data.grossWeightKg,
            amountDec: this.diaFormInfoDt.data.amountDec,
            vol: this.diaFormInfoDt.data.vol,
            grossWeight: this.diaFormInfoDt.data.grossWeight,
            amount: this.diaFormInfoDt.data.amount,
            remark: this.diaFormInfoDt.data.remark
          }
          if (this.diaFormInfoDt.data.productionDate) {
            data.productionDate = formatDate(new Date(Date.parse(this.diaFormInfoDt.data.productionDate)), 'yyyy-MM-dd')
          }
          if (this.diaFormInfoDt.data.invalidDate) {
            data.invalidDate = formatDate(new Date(Date.parse(this.diaFormInfoDt.data.invalidDate)), 'yyyy-MM-dd')
          }

          this.diaFormInfo.dtTableInfo.data.push(data)
          this.closeAddDtPage()
        }
      })
    },
    tabsChange() {
      this.initData()
    },
    // 删除明细
    deleteDt(data) {
      if (data.id) {
        this.diaFormInfo.dtTableInfo.deleteIds.push(data.id)
      }
      // this.diaFormInfo.dtTableInfo.data.splice(data.$rowIndex,1);
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
    // 生成so
    handleCreateSo(data) {
      this.$confirm(this.$t('确认下发？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$showLoading()
        this.$store.dispatch(this.store + 'createSo', { 'id': data.id }).then(() => {
          const resp = this.$store.state[this.modName].createSoResp
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
    // 批量下发
    handleBatchCreateSo() {
      if (!this.checkedIds || this.checkedIds.length == 0) {
        this.$message.warning('请先勾选出库订单')
        return
      }
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
    },

    // 新增界面 选择   是否补发
    selectWhetherToReissue(data) {
      if (data === 1) {
        // “是否补发”字段为“是”时,   原单号字段为必填
        this.diaFormInfo.rules.oldNum[0].required = true
        this.diaFormInfo.rules.origOrderCode[0].required = true
        this.diaFormInfo.rules.responsibility[0].required = true
      } else {
        this.diaFormInfo.rules.oldNum[0].required = false
        this.diaFormInfo.rules.origOrderCode[0].required = false
        this.diaFormInfo.rules.responsibility[0].required = false
      }
    },

    // 取消单个订单
    handleCancel(data) {
      this.$confirm(this.$t('确认取消该出库订单么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        const array = [data.id]
        this.$store.dispatch(this.store + 'cancel', array).then(() => {
          const resp = this.$store.state[this.modName].cancelResp
          if (resp.code === this.$successCode) {
            this.$message.success(resp.msg)
            this.queryTableData(this.topForm.data)
          }
        })
      })
    },
    // 取消多个订单
    handleCancelBatch() {
      if (!this.checkedIds || this.checkedIds.length == 0) {
        this.$message.warning('请先勾选出库订单')
        return
      }
      this.$confirm(this.$t('确认取消选中的出库订单么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'cancel', this.checkedIds).then(() => {
          const resp = this.$store.state[this.modName].cancelResp
          if (resp.code === this.$successCode) {
            this.$message.success(resp.msg)
            this.queryTableData(this.topForm.data)
          }
        })
      })
    },
    /**
     * 删除数据
     * @param data
     */
    handleDelete(data) {
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
    }
  },
  // 页面初始化函数
  created() {
    this.initData()
    this.initPage()
  }
}
