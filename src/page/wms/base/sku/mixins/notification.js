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
      this.topForm.data.skuCode = null
      this.topForm.data.skuName = null
      this.topForm.data.skuCategoryId = null
      this.topForm.data.ownerId = null
      this.topForm.data.barcodeTwo = null
      this.topForm.data.barcodeThree = null
      this.topForm.data.sourceId = null
      this.topForm.data.isEnable = null
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
      this.activeName = 'first'
      // 默认弹窗的标题：修改
      this.dialogInfo.title = this.$t('table.view')
      // 弹窗是否显示
      this.dialogInfo.visible = true
      // 弹窗的保存按钮是否显示
      this.dialogInfo.btList[1].show = false
      // 绑定弹窗保存事件：viewSave
      this.dialogInfo.btList[1].event = 'viewSave'
      this.viewID = data.id
      this.dialogInfo.canEdit = false
      this.tableBtnUpdate(true)
      // 封装的修改表单的数据化配置
      this.diaFormInfoViewFieldList()
      // 为弹窗表单对应的字段赋值
      this.queryRowData(data)
    },
    tableBtnUpdate(val) {
      this.diaFormInfo.diaTableCpfr.topBtn.disabled = val
      this.diaFormInfo.diaTableGrmp.topBtn.disabled = val
      this.diaFormInfo.diaTableCert.topBtn.disabled = val
      this.diaFormInfo.diaTableBom.topBtn.disabled = val
      this.diaFormInfo.diaTableConsumables.topBtn.disabled = val
      this.diaFormInfo.diaTableDim.topBtn.disabled = val
      this.diaFormInfo.diaTableCpfr.handle.btList[0].disabled = val
      this.diaFormInfo.diaTableGrmp.handle.btList[0].disabled = val
      this.diaFormInfo.diaTableCert.handle.btList[0].disabled = val
      this.diaFormInfo.diaTableBom.handle.btList[0].disabled = val
      this.diaFormInfo.diaTableBom.handle.btList[0].disabled = val
      this.diaFormInfo.diaTableConsumables.handle.btList[0].disabled = val
      this.diaFormInfo.diaTableDim.handle.btList[0].disabled = val
    },
    /**
     * 打开新增页面
     */
    openAddPage() {
      // 弹窗的类型：add
      this.dialogInfo.type = 'add'
      // 默认弹窗的标题：新增
      this.dialogInfo.title = this.$t('table.add')
      // 弹窗是否显示
      this.dialogInfo.visible = true
      // 弹窗的保存按钮是否显示
      this.dialogInfo.btList[1].show = true
      // 绑定弹窗保存事件：saveAdd
      this.dialogInfo.btList[1].event = 'saveData'
      this.dialogInfo.canEdit = true
      this.activeName = 'first'
      this.tableBtnUpdate(false)
      this.diaFormInfoAddFieldList()
      // 封装的新增表单的数据化配置
      const controlData = {
        invTurnoverRuleId: this.defaultRule.invTurnoverRuleId,
        recRuleId: this.defaultRule.recRuleId,
        qcRuleId: this.defaultRule.qcRuleId,
        paRuleId: this.defaultRule.paRuleId,
        cpfrRuleId: this.defaultRule.cpfrRuleId,
        batchRuleId: this.defaultRule.batchRuleId,
        serialNumberRuleId: this.defaultRule.serialNumberRuleId,
        assignRuleId: this.defaultRule.assignRuleId,
        tempControl: null,
        paLotId: null,
        invMax: null,
        invMin: null,
        reorderQty: null
      }
      this.diaFormInfo.diaFormInfoControl.data = controlData
      this.diaFormInfo.diaTableGrmp.data = []
      this.diaFormInfo.diaTableCert.data = []
      this.diaFormInfo.diaTableBom.data = []
      this.diaFormInfo.diaTableConsumables.data = []
      this.diaFormInfo.diaTableCpfr.data = []
    },
    /**
     * 打开编辑页面
     * @param data
     */
    openEditPage(data) {
      // 弹窗的类型：edit
      this.dialogInfo.type = 'edit'
      this.activeName = 'first'
      // 默认弹窗的标题：修改
      this.dialogInfo.title = this.$t('table.edit')
      // 弹窗是否显示
      this.dialogInfo.visible = true
      // 弹窗的保存按钮是否显示
      this.dialogInfo.btList[1].show = true
      // 绑定弹窗保存事件
      this.dialogInfo.btList[1].event = 'editData'
      this.dialogInfo.canEdit = true
      this.tableBtnUpdate(false)
      // this.editID = data.id;
      // 封装的修改表单的数据化配置
      this.diaFormInfoEditFieldList()
      // 为弹窗表单对应的字段赋值
      this.queryRowData(data)
    },
    /**
     * 关闭页面
     */
    close() {
      this.dialogInfo.visible = false
      this.clearRefList()
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
        this.listTypeInfo.abcTypeList = this.$store.state[this.modName].initPageObj.abcTypeList
        this.listTypeInfo.categoryList = this.$store.state[this.modName].initPageObj.categoryList
        this.listTypeInfo.logisticsList = this.$store.state[this.modName].initPageObj.logisticsList
        this.listTypeInfo.tempControlList = this.$store.state[this.modName].initPageObj.tempControlList
        this.listTypeInfo.unitList = this.$store.state[this.modName].initPageObj.unitList
        this.listTypeInfo.validityTypeList = this.$store.state[this.modName].initPageObj.validityTypeList
        this.listTypeInfo.taxFeeList = this.$store.state[this.modName].initPageObj.taxFeeList
        this.listTypeInfo.enableList = this.$store.state[this.modName].initPageObj.enableList
        this.listTypeInfo.maintenanceTypeList = this.$store.state[this.modName].initPageObj.maintenanceTypeList
        this.listTypeInfo.scatteredPropertiesList = this.$store.state[this.modName].initPageObj.scatteredPropertiesList
        this.listTypeInfo.turnoverLevelList = this.$store.state[this.modName].initPageObj.turnoverLevelList
        // this.listTypeInfo.lotList=this.$store.state[this.modName].initPageObj.lotList;
        this.listTypeInfo.zoneList = this.$store.state[this.modName].initPageObj.zoneList
        this.mfgCode = this.$store.state[this.modName].initPageObj.mfgCode
        this.listTypeInfo.whetherList = this.$store.state[this.modName].initPageObj.whetherList.map(item => {
          item.label = item.key
          return item
        })

        this.listTypeInfo.invTurnoverRuleList = this.$store.state[this.modName].initPageObj.invTurnoverRuleList.map(item => {
          item.key = item.turnoverRuleName
          item.value = item.id
          if (item.isDefault == 1) {
            this.defaultRule.invTurnoverRuleId = item.id
          }
          return item
        })
        if (this.listTypeInfo.invTurnoverRuleList && this.listTypeInfo.invTurnoverRuleList.length > 0 && !this.defaultRule.invTurnoverRuleId) {
          this.defaultRule.invTurnoverRuleId = this.listTypeInfo.invTurnoverRuleList[0].id
        }
        this.listTypeInfo.recRuleList = this.$store.state[this.modName].initPageObj.recRuleList.map(item => {
          item.key = item.recRuleName
          item.value = item.id
          if (item.isDefault == 1) {
            this.defaultRule.recRuleId = item.id
          }
          return item
        })
        if (this.listTypeInfo.recRuleList && this.listTypeInfo.recRuleList.length > 0 && !this.defaultRule.recRuleId) {
          this.defaultRule.recRuleId = this.listTypeInfo.recRuleList[0].id
        }
        this.listTypeInfo.qcRuleList = this.$store.state[this.modName].initPageObj.qcRuleList.map(item => {
          item.key = item.qcRuleName
          item.value = item.id
          if (item.isDefault == 1) {
            this.defaultRule.qcRuleId = item.id
          }
          return item
        })
        if (this.listTypeInfo.qcRuleList && this.listTypeInfo.qcRuleList.length > 0 && !this.defaultRule.qcRuleId) {
          this.defaultRule.qcRuleId = this.listTypeInfo.qcRuleList[0].id
        }
        this.listTypeInfo.paRuleList = this.$store.state[this.modName].initPageObj.paRuleList.map(item => {
          item.key = item.paRuleName
          item.value = item.id
          if (item.isDefault == 1) {
            this.defaultRule.paRuleId = item.id
          }
          return item
        })
        if (this.listTypeInfo.paRuleList && this.listTypeInfo.paRuleList.length > 0 && !this.defaultRule.paRuleId) {
          this.defaultRule.paRuleId = this.listTypeInfo.paRuleList[0].id
        }
        this.listTypeInfo.cpfrRuleList = this.$store.state[this.modName].initPageObj.cpfrRuleList.map(item => {
          item.key = item.cpfrRuleName
          item.value = item.id
          if (item.isDefault == 1) {
            this.defaultRule.cpfrRuleId = item.id
          }
          return item
        })
        if (this.listTypeInfo.cpfrRuleList && this.listTypeInfo.cpfrRuleList.length > 0 && !this.defaultRule.cpfrRuleId) {
          this.defaultRule.cpfrRuleId = this.listTypeInfo.cpfrRuleList[0].id
        }
        this.listTypeInfo.batchRuleList = this.$store.state[this.modName].initPageObj.batchRuleList.map(item => {
          item.key = item.batchRuleName
          item.value = item.id
          if (item.isDefault == 1) {
            this.defaultRule.batchRuleId = item.id
          }
          return item
        })
        if (this.listTypeInfo.batchRuleList && this.listTypeInfo.batchRuleList.length > 0 && !this.defaultRule.batchRuleId) {
          this.defaultRule.batchRuleId = this.listTypeInfo.batchRuleList[0].id
        }
        this.listTypeInfo.serialNumberRuleList = this.$store.state[this.modName].initPageObj.serialNumberRuleList.map(item => {
          item.key = item.snRuleName
          item.value = item.id
          if (item.isDefault == 1) {
            this.defaultRule.serialNumberRuleId = item.id
          }
          return item
        })
        if (this.listTypeInfo.serialNumberRuleList && this.listTypeInfo.serialNumberRuleList.length > 0 && !this.defaultRule.serialNumberRuleId) {
          this.defaultRule.serialNumberRuleId = this.listTypeInfo.serialNumberRuleList[0].id
        }
        this.listTypeInfo.invAssignRuleList = this.$store.state[this.modName].initPageObj.invAssignRuleList.map(item => {
          item.key = item.ruleName
          item.value = item.id
          if (item.isDefault == 1) {
            this.defaultRule.assignRuleId = item.id
          }
          return item
        })
        if (this.listTypeInfo.invAssignRuleList && this.listTypeInfo.invAssignRuleList.length > 0 && !this.defaultRule.assignRuleId) {
          this.defaultRule.assignRuleId = this.listTypeInfo.invAssignRuleList[0].id
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
        this.diaFormInfo.diaFormInfoControl.data = this.$store.state[this.modName].initUpdateObj.control || { id: 0 }
        this.diaFormInfo.diaFormInfoGSP.data = this.$store.state[this.modName].initUpdateObj.gsp || {}
        this.diaFormInfo.diaTableGrmp.data = this.$store.state[this.modName].initUpdateObj.grmpList || []
        this.diaFormInfo.diaTableCert.data = this.$store.state[this.modName].initUpdateObj.certList || []
        this.diaFormInfo.diaTableBom.data = this.$store.state[this.modName].initUpdateObj.bomList || []
        this.diaFormInfo.diaTableCpfr.data = this.$store.state[this.modName].initUpdateObj.cpfrList || []
        this.diaFormInfo.diaTableDim.data = this.$store.state[this.modName].initUpdateObj.skuDimensionList || []
        this.diaFormInfo.diaTableConsumables.data = this.$store.state[this.modName].initUpdateObj.consumablesList || []
        this.$set(this.diaFormInfo.diaFormInfoControl.data, 'paZoneIdArray', [])
        this.$set(this.diaFormInfo.diaFormInfoControl.data, 'paLotIdArray', '')
        if (this.diaFormInfo.diaFormInfoControl.data.paZoneIds) {
          const zoneArray = this.diaFormInfo.diaFormInfoControl.data.paZoneIds.split(',')
          zoneArray.forEach(item => {
            this.diaFormInfo.diaFormInfoControl.data.paZoneIdArray.push(Number.parseInt(item))
          })
        } else if (this.diaFormInfo.diaFormInfoControl.data.paLotIds) {
          this.diaFormInfo.diaFormInfoControl.data.paLotIdArray = this.diaFormInfo.diaFormInfoControl.data.paLotIds
        }
        // else if(this.diaFormInfo.diaFormInfoControl.data.paLotIds){
        //   let lotArray = this.diaFormInfo.diaFormInfoControl.data.paLotIds.split(",");
        //   lotArray.forEach(item=>{
        //     this.diaFormInfo.diaFormInfoControl.data.paLotIdArray.push(Number.parseInt(item));
        //   })
        // }

        if (this.dialogInfo.type == 'edit') {
          if (this.diaFormInfo.data.isValidity) {
            this.diaFormInfo.fieldList[48].disabled = false
            this.handleValidityType()
          } else {
            this.diaFormInfo.fieldList[48].disabled = true
            this.diaFormInfo.fieldList[49].disabled = true
            this.diaFormInfo.fieldList[50].disabled = true
            this.diaFormInfo.fieldList[51].disabled = true
            this.diaFormInfo.fieldList[52].disabled = true
          }
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
        if (valid) {
          this.diaFormInfo.diaFormInfoControl.ref.validate(valid => {
            if (valid) {
              if (this.diaFormInfo.data.isBatchManage) {
                if (!this.diaFormInfo.diaFormInfoControl.data.batchRuleId) {
                  this.$message.error('请选择批次策略')
                  return
                }
              } else {
                this.diaFormInfo.diaFormInfoControl.data.batchRuleId = 0
              }
              if (this.diaFormInfo.data.isSerialNumber) {
                if (!this.diaFormInfo.diaFormInfoControl.data.serialNumberRuleId) {
                  this.$message.error('请选择序列号策略')
                  return
                }
              } else {
                this.diaFormInfo.diaFormInfoControl.data.serialNumberRuleId = 0
              }
              if (this.diaFormInfo.data.isValidity) {
                if (!this.diaFormInfo.data.validityType) {
                  this.$message.error('请选择有效期周期类型')
                  return
                }
              }
              this.validateDiaTableCpfr().then(valid => {
                if (valid) {
                  this.$showLoading()
                  this.savePaArray()
                  const skuObj = this.diaFormInfo.data
                  skuObj.skuControlReq = this.diaFormInfo.diaFormInfoControl.data
                  const gspObj = this.diaFormInfo.diaFormInfoGSP.data
                  gspObj.isStressCur = gspObj.isStressCur ? 1 : 0
                  gspObj.isFirstCamp = gspObj.isFirstCamp ? 1 : 0
                  gspObj.isTwoSpiritDrug = gspObj.isTwoSpiritDrug ? 1 : 0
                  gspObj.isDoubleCheck = gspObj.isDoubleCheck ? 1 : 0
                  gspObj.isDrugSuperCode = gspObj.isDrugSuperCode ? 1 : 0
                  gspObj.isPrintDrugRep = gspObj.isPrintDrugRep ? 1 : 0
                  gspObj.isScanTwoSeq = gspObj.isScanTwoSeq ? 1 : 0
                  gspObj.isOneGoodsOneCode = gspObj.isOneGoodsOneCode ? 1 : 0
                  skuObj.skuGspReq = gspObj
                  skuObj.cpfrReqList = this.diaFormInfo.diaTableCpfr.data
                  skuObj.skuDimensionList = this.diaFormInfo.diaTableDim.data
                  const certArray = []
                  if (this.diaFormInfo.diaTableGrmp.data && this.diaFormInfo.diaTableGrmp.data.length > 0) {
                    this.diaFormInfo.diaTableGrmp.data.forEach(item => {
                      item.certificateType = 'GRMP'
                      if (item.effectiveDate) {
                        item.effectiveDate = formatDate(new Date(Date.parse(item.effectiveDate)), 'yyyy-MM-dd')
                      }
                      if (item.expirationDate) {
                        item.expirationDate = formatDate(new Date(Date.parse(item.expirationDate)), 'yyyy-MM-dd')
                      }
                      certArray.push(item)
                    })
                  }
                  if (this.diaFormInfo.diaTableCert.data && this.diaFormInfo.diaTableCert.data.length > 0) {
                    this.diaFormInfo.diaTableCert.data.forEach(item => {
                      item.certificateType = 'PZWH'
                      if (item.effectiveDate) {
                        item.effectiveDate = formatDate(new Date(Date.parse(item.effectiveDate)), 'yyyy-MM-dd')
                      }
                      if (item.expirationDate) {
                        item.expirationDate = formatDate(new Date(Date.parse(item.expirationDate)), 'yyyy-MM-dd')
                      }
                      certArray.push(item)
                    })
                  }
                  skuObj.certReqList = certArray
                  skuObj.bomList = this.diaFormInfo.diaTableBom.data
                  skuObj.consumablesList = this.diaFormInfo.diaTableConsumables.data
                  this.$store.dispatch(this.store + 'saveData', skuObj).then(() => {
                    const resp = this.$store.state[this.modName].addResp
                    if (resp.code === this.$successCode) {
                      this.dialogInfo.visible = false
                      this.initData()
                      this.clearRefList()
                    }
                  }).finally(() => {
                    this.$hideLoading()
                  })
                }
              })
            } else {
              this.activeName = 'second'
              this.$message.error('请完善控制信息')
            }
          })
        } else {
          this.activeName = 'first'
          this.$message.error('请完善基础信息')
        }
      })
    },
    /**
     * 编辑数据
     */
    editData() {
      this.diaFormInfo.ref.validate(valid => {
        if (valid) {
          this.diaFormInfo.diaFormInfoControl.ref.validate(valid => {
            if (valid) {
              if (this.diaFormInfo.data.isBatchManage) {
                if (!this.diaFormInfo.diaFormInfoControl.data.batchRuleId) {
                  this.$message.error('请选择批次策略')
                  return
                }
              } else {
                if (this.diaFormInfo.diaFormInfoControl.data.batchRuleId) {
                  this.$message.error('产品【基本信息】未启用批次管理，请确认')
                  return
                }
                this.diaFormInfo.diaFormInfoControl.data.batchRuleId = 0
              }
              if (this.diaFormInfo.data.isSerialNumber) {
                if (!this.diaFormInfo.diaFormInfoControl.data.serialNumberRuleId) {
                  this.$message.error('请选择序列号策略')
                  return
                }
              } else {
                if (this.diaFormInfo.diaFormInfoControl.data.serialNumberRuleId) {
                  this.$message.error('产品【基本信息】未启用序列号管理，请确认')
                  return
                }
                this.diaFormInfo.diaFormInfoControl.data.serialNumberRuleId = 0
              }
              this.validateDiaTableCpfr().then(valid => {
                if (valid) {
                  this.$showLoading()
                  this.savePaArray()
                  const skuObj = this.diaFormInfo.data
                  skuObj.skuControlReq = this.diaFormInfo.diaFormInfoControl.data
                  const gspObj = this.diaFormInfo.diaFormInfoGSP.data
                  gspObj.isStressCur = gspObj.isStressCur ? 1 : 0
                  gspObj.isFirstCamp = gspObj.isFirstCamp ? 1 : 0
                  gspObj.isTwoSpiritDrug = gspObj.isTwoSpiritDrug ? 1 : 0
                  gspObj.isDoubleCheck = gspObj.isDoubleCheck ? 1 : 0
                  gspObj.isDrugSuperCode = gspObj.isDrugSuperCode ? 1 : 0
                  gspObj.isPrintDrugRep = gspObj.isPrintDrugRep ? 1 : 0
                  gspObj.isScanTwoSeq = gspObj.isScanTwoSeq ? 1 : 0
                  gspObj.isOneGoodsOneCode = gspObj.isOneGoodsOneCode ? 1 : 0
                  skuObj.skuGspReq = gspObj
                  skuObj.cpfrReqList = this.diaFormInfo.diaTableCpfr.data
                  skuObj.skuDimensionList = this.diaFormInfo.diaTableDim.data
                  const certArray = []
                  if (this.diaFormInfo.diaTableGrmp.data && this.diaFormInfo.diaTableGrmp.data.length > 0) {
                    this.diaFormInfo.diaTableGrmp.data.forEach(item => {
                      item.certificateType = 'GRMP'
                      if (item.effectiveDate) {
                        item.effectiveDate = formatDate(new Date(Date.parse(item.effectiveDate)), 'yyyy-MM-dd')
                      }
                      if (item.expirationDate) {
                        item.expirationDate = formatDate(new Date(Date.parse(item.expirationDate)), 'yyyy-MM-dd')
                      }
                      certArray.push(item)
                    })
                  }
                  if (this.diaFormInfo.diaTableCert.data && this.diaFormInfo.diaTableCert.data.length > 0) {
                    this.diaFormInfo.diaTableCert.data.forEach(item => {
                      item.certificateType = 'PZWH'
                      if (item.effectiveDate) {
                        item.effectiveDate = formatDate(new Date(Date.parse(item.effectiveDate)), 'yyyy-MM-dd')
                      }
                      if (item.expirationDate) {
                        item.expirationDate = formatDate(new Date(Date.parse(item.expirationDate)), 'yyyy-MM-dd')
                      }
                      certArray.push(item)
                    })
                  }
                  skuObj.certReqList = certArray
                  skuObj.bomList = this.diaFormInfo.diaTableBom.data
                  skuObj.consumablesList = this.diaFormInfo.diaTableConsumables.data
                  skuObj.deleteBomIds = this.delBomList
                  skuObj.deleteCertIds = this.delCertList
                  skuObj.deleteCpfrIds = this.delCpfrList
                  skuObj.deleteConsumablesIds = this.delConsumablesList
                  skuObj.deleteDimensionIds = this.delDimensionList
                  this.$store.dispatch(this.store + 'editData', skuObj).then(() => {
                    const resp = this.$store.state[this.modName].editResp
                    if (resp.code === this.$successCode) {
                      this.dialogInfo.visible = false
                      this.queryTableData(this.topForm.data)
                      this.clearRefList()
                    }
                  }).finally(() => {
                    this.$hideLoading()
                  })
                }
              })
            } else {
              this.activeName = 'second'
              this.$message.error('请完善控制信息')
            }
          })
        } else {
          this.activeName = 'first'
          this.$message.error('请完善基础信息')
        }
      })
    },
    /**
     * 保存上架配置：上架库区/上架库位
     */
    savePaArray() {
      if (this.diaFormInfo.diaFormInfoControl.data.paZoneIdArray && this.diaFormInfo.diaFormInfoControl.data.paZoneIdArray.length > 0) {
        let paZoneIds = ''
        this.diaFormInfo.diaFormInfoControl.data.paZoneIdArray.forEach(item => {
          paZoneIds += item + ','
        })
        this.diaFormInfo.diaFormInfoControl.data.paZoneIds = paZoneIds.substring(0, paZoneIds.length - 1)
        this.diaFormInfo.diaFormInfoControl.data.paLotIds = ''
      } else if (this.diaFormInfo.diaFormInfoControl.data.paLotIdArray && this.diaFormInfo.diaFormInfoControl.data.paLotIdArray.length > 0) {
        this.diaFormInfo.diaFormInfoControl.data.paZoneIds = ''
        this.diaFormInfo.diaFormInfoControl.data.paLotIds = this.diaFormInfo.diaFormInfoControl.data.paLotIdArray
      } else {
        this.diaFormInfo.diaFormInfoControl.data.paZoneIds = ''
        this.diaFormInfo.diaFormInfoControl.data.paLotIds = ''
      }
    },
    /**
     * 校验补货明细数据
     * @returns {Promise<boolean>}
     */
    async validateDiaTableCpfr() {
      const errMap = await this.diaFormInfo.diaTableCpfr.ref.validate(true).catch(errMap => errMap)
      if (errMap) {
        this.activeName = 'second'
        this.$message.error('请完善补货来源信息！')
        return false
      } else {
        return true
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
    // 打开补货信息弹窗
    openDiaCpfr() {
      this.dialogInfoCpfr.title = '新增补货信息'
      this.dialogInfoCpfr.type = 'add'
      this.dialogInfoCpfr.visible = true
      this.initDiaFormCpfrColumns()
      this.dialogInfoCpfr.formInfo.data = {
        id: 0,
        cpfrLotId: null,
        cpfrMax: null,
        cpfrMin: null,
        minCpfrQty: null,
        remark: null
      }
    },
    // 保存补货信息
    saveDiaCpfr() {
      this.dialogInfoCpfr.btList[1].btLoading = true
      this.dialogInfoCpfr.formInfo.ref.validate(valid => {
        if (valid) {
          const obj = {
            id: this.dialogInfoCpfr.formInfo.data.id,
            cpfrLotId: this.dialogInfoCpfr.formInfo.data.cpfrLotId,
            cpfrLotName: this.dialogInfoCpfr.formInfo.data.cpfrLotName,
            cpfrMax: this.dialogInfoCpfr.formInfo.data.cpfrMax,
            cpfrMin: this.dialogInfoCpfr.formInfo.data.cpfrMin,
            minCpfrQty: this.dialogInfoCpfr.formInfo.data.minCpfrQty,
            remark: this.dialogInfoCpfr.formInfo.data.remark
          }
          this.diaFormInfo.diaTableCpfr.data.push(obj)
          this.closeDiaCpfr()
        }
        this.dialogInfoCpfr.btList[1].btLoading = false
      })
    },
    // 删除补货信息
    deleteDiaCpfr(data) {
      this.$confirm('确认删除？', {
        type: 'warning',
        center: true
      }).then(() => {
        if (data.id && data.id != 0) {
          this.delCpfrList.push(data.id)
        }
        this.diaFormInfo.diaTableCpfr.data.splice(data.$rowIndex, 1)
      }).catch(() => {
      })
    },
    // 关闭补货信息弹窗
    closeDiaCpfr() {
      this.dialogInfoCpfr.visible = false
      if (this.dialogInfoCpfr.formInfo.ref) {
        this.dialogInfoCpfr.formInfo.ref.resetFields()
      }
    },
    // 打开GMP信息弹窗
    openDiaGrmp() {
      this.dialogInfoGrmp.title = '新增GMP证书'
      this.dialogInfoGrmp.type = 'add'
      this.initDiaFormGrmpColumns()
      this.dialogInfoGrmp.formInfo.data = {
        id: 0,
        factoryId: null,
        certificateNo: null,
        effectiveDate: null,
        expirationDate: null,
        isEnable: 1,
        remark: null
      }
      this.dialogInfoGrmp.visible = true
    },
    // 保存GRMP信息
    saveDiaGrmp() {
      this.dialogInfoGrmp.btList[1].btLoading = true
      this.dialogInfoGrmp.formInfo.ref.validate(valid => {
        if (valid) {
          const obj = {
            id: this.dialogInfoGrmp.formInfo.data.id,
            factoryId: this.dialogInfoGrmp.formInfo.data.factoryId,
            factoryName: this.dialogInfoGrmp.formInfo.data.factoryName,
            certificateNo: this.dialogInfoGrmp.formInfo.data.certificateNo,
            effectiveDate: this.dialogInfoGrmp.formInfo.data.effectiveDate,
            expirationDate: this.dialogInfoGrmp.formInfo.data.expirationDate,
            isEnable: this.dialogInfoGrmp.formInfo.data.isEnable,
            remark: this.dialogInfoGrmp.formInfo.data.remark
          }
          this.diaFormInfo.diaTableGrmp.data.push(obj)
          this.closeDiaGrmp()
        }
        this.dialogInfoGrmp.btList[1].btLoading = false
      })
    },
    // 删除GRMP信息
    deleteDiaGrmp(data) {
      this.$confirm('确认删除？', {
        type: 'warning',
        center: true
      }).then(() => {
        if (data.id && data.id != 0) {
          this.delCertList.push(data.id)
        }
        this.diaFormInfo.diaTableGrmp.data.splice(data.$rowIndex, 1)
      }).catch(() => {
      })
    },
    // 关闭GRMP信息弹窗
    closeDiaGrmp() {
      this.dialogInfoGrmp.visible = false
      if (this.dialogInfoGrmp.formInfo.ref) {
        this.dialogInfoGrmp.formInfo.ref.resetFields()
      }
    },
    // 打开批准文号信息弹窗
    openDiaCert() {
      this.dialogInfoCert.title = '新增批准文号'
      this.dialogInfoCert.type = 'add'
      this.initDiaFormCertColumns()
      this.dialogInfoCert.formInfo.data = {
        id: 0,
        certificateNo: null,
        effectiveDate: null,
        expirationDate: null,
        isEnable: 1,
        remark: null
      }
      this.dialogInfoCert.visible = true
    },
    // 保存批准文号信息
    saveDiaCert() {
      this.dialogInfoCert.btList[1].btLoading = true
      this.dialogInfoCert.formInfo.ref.validate(valid => {
        if (valid) {
          const obj = {
            id: this.dialogInfoCert.formInfo.data.id,
            certificateNo: this.dialogInfoCert.formInfo.data.certificateNo,
            effectiveDate: this.dialogInfoCert.formInfo.data.effectiveDate,
            expirationDate: this.dialogInfoCert.formInfo.data.expirationDate,
            isEnable: this.dialogInfoCert.formInfo.data.isEnable,
            remark: this.dialogInfoCert.formInfo.data.remark
          }
          this.diaFormInfo.diaTableCert.data.push(obj)
          this.closeDiaCert()
        }
        this.dialogInfoCert.btList[1].btLoading = false
      })
    },
    // 删除批准文号信息
    deleteDiaCert(data) {
      this.$confirm('确认删除？', {
        type: 'warning',
        center: true
      }).then(() => {
        if (data.id && data.id != 0) {
          this.delCertList.push(data.id)
        }
        this.diaFormInfo.diaTableCert.data.splice(data.$rowIndex, 1)
      }).catch(() => {
      })
    },
    // 关闭批准文号信息弹窗
    closeDiaCert() {
      this.dialogInfoCert.visible = false
      if (this.dialogInfoCert.formInfo.ref) {
        this.dialogInfoCert.formInfo.ref.resetFields()
      }
    },
    // 打开组合产品信息弹窗
    openDiaBom() {
      this.dialogInfoBom.title = '新增产品组合'
      this.dialogInfoBom.type = 'add'
      this.dialogInfoBom.btList[1].event = 'saveDiaBom'
      this.isConsumables = null
      this.initDiaFormBomColumns()
      this.dialogInfoBom.formInfo.data = {
        id: 0,
        bomSkuId: null,
        remark: null,
        bomNum: 1
      }
      this.dialogInfoBom.visible = true
    },
    // 保存组合产品信息
    saveDiaBom() {
      this.dialogInfoBom.btList[1].btLoading = true
      this.dialogInfoBom.formInfo.ref.validate(valid => {
        if (valid) {
          for (let i = 0; i < this.diaFormInfo.diaTableConsumables.data.length; i++) {
            const item = this.diaFormInfo.diaTableConsumables.data[i]
            if (item.bomSkuId == this.dialogInfoBom.formInfo.data.bomSkuId) {
              this.$message.error('产品已存在')
              this.dialogInfoBom.btList[1].btLoading = false
              return
            }
          }
          const obj = {
            id: this.dialogInfoBom.formInfo.data.id,
            bomSkuId: this.dialogInfoBom.formInfo.data.bomSkuId,
            bomSkuCode: this.dialogInfoBom.formInfo.data.bomSkuCode,
            bomSkuName: this.dialogInfoBom.formInfo.data.bomSkuName,
            bomSpec: this.dialogInfoBom.formInfo.data.bomSpec,
            bomSkuCategory: this.dialogInfoBom.formInfo.data.bomSkuCategory,
            bomBarcode: this.dialogInfoBom.formInfo.data.bomBarcode,
            bomNum: this.dialogInfoBom.formInfo.data.bomNum,
            remark: this.dialogInfoBom.formInfo.data.remark
          }
          this.diaFormInfo.diaTableBom.data.push(obj)
          this.closeDiaBom()
        }
        this.dialogInfoBom.btList[1].btLoading = false
      })
    },
    // 打开耗材信息弹窗
    openDiaConsumables() {
      this.dialogInfoBom.title = '新增耗材'
      this.dialogInfoBom.type = 'add'
      this.dialogInfoBom.btList[1].event = 'saveDiaConsumables'
      this.isConsumables = true
      this.initDiaFormBomColumns()
      this.dialogInfoBom.formInfo.data = {
        id: 0,
        bomSkuId: null,
        bomNum: 1,
        remark: null
      }
      this.dialogInfoBom.visible = true
    },
    // 保存耗材信息
    saveDiaConsumables() {
      this.dialogInfoBom.btList[1].btLoading = true
      this.dialogInfoBom.formInfo.ref.validate(valid => {
        if (valid) {
          for (let i = 0; i < this.diaFormInfo.diaTableConsumables.data.length; i++) {
            const item = this.diaFormInfo.diaTableConsumables.data[i]
            if (item.consumablesSkuId == this.dialogInfoBom.formInfo.data.bomSkuId) {
              this.$message.error('产品已存在')
              this.dialogInfoBom.btList[1].btLoading = false
              return
            }
          }
          const obj = {
            id: this.dialogInfoBom.formInfo.data.id,
            consumablesSkuId: this.dialogInfoBom.formInfo.data.bomSkuId,
            consumablesSkuCode: this.dialogInfoBom.formInfo.data.bomSkuCode,
            consumablesSkuName: this.dialogInfoBom.formInfo.data.bomSkuName,
            consumablesSpec: this.dialogInfoBom.formInfo.data.bomSpec,
            consumablesSkuCategory: this.dialogInfoBom.formInfo.data.bomSkuCategory,
            consumablesBarcode: this.dialogInfoBom.formInfo.data.bomBarcode,
            consumablesNum: this.dialogInfoBom.formInfo.data.bomNum,
            remark: this.dialogInfoBom.formInfo.data.remark
          }
          this.diaFormInfo.diaTableConsumables.data.push(obj)
          this.closeDiaBom()
        }
        this.dialogInfoBom.btList[1].btLoading = false
      })
    },
    // 删除耗材
    deleteDiaConsumables(data) {
      this.$confirm('确认删除？', {
        type: 'warning',
        center: true
      }).then(() => {
        if (data.id) {
          this.delConsumablesList.push(data.id)
        }
        this.diaFormInfo.diaTableConsumables.data.splice(data.$rowIndex, 1)
      }).catch(() => {
      })
    },
    // 删除组合产品信息
    deleteDiaBom(data) {
      this.$confirm('确认删除？', {
        type: 'warning',
        center: true
      }).then(() => {
        if (data.id && data.id != 0) {
          this.delBomList.push(data.id)
        }
        this.diaFormInfo.diaTableBom.data.splice(data.$rowIndex, 1)
      }).catch(() => {
      })
    },
    // 关闭组合产品信息弹窗
    closeDiaBom() {
      this.dialogInfoBom.visible = false
      if (this.dialogInfoBom.formInfo.ref) {
        this.dialogInfoBom.formInfo.ref.resetFields()
      }
    },
    // 打开供应商信息弹窗
    openDiaDim() {
      this.dialogInfoDim.title = '新增供应商'
      this.dialogInfoDim.type = 'add'
      this.dialogInfoDim.btList[1].event = 'saveDiaDim'
      this.initDiaFormDimColumns()
      this.dialogInfoDim.formInfo.data = {
        id: 0,
        supplierId: null,
        supplierName: null,
        isEnable: 1,
        isEnableName: 1,
        priorityLevel: 1,
        remark: null
      }
      this.dialogInfoDim.visible = true
    },
    // 保存供应商信息
    saveDiaDim() {
      this.dialogInfoDim.btList[1].btLoading = true
      this.dialogInfoDim.formInfo.ref.validate(valid => {
        if (valid) {
          for (let i = 0; i < this.diaFormInfo.diaTableDim.data.length; i++) {
            const item = this.diaFormInfo.diaTableDim.data[i]
            if (item.supplierId == this.dialogInfoDim.formInfo.data.supplierId) {
              this.$message.error('供应商已存在')
              this.dialogInfoDim.btList[1].btLoading = false
              return
            }
          }
          const obj = {
            id: this.dialogInfoDim.formInfo.data.id,
            supplierId: this.dialogInfoDim.formInfo.data.supplierId,
            supplierName: this.dialogInfoDim.formInfo.data.supplierName,
            isEnable: this.dialogInfoDim.formInfo.data.isEnable,
            priorityLevel: this.dialogInfoDim.formInfo.data.priorityLevel,
            remark: this.dialogInfoDim.formInfo.data.remark
          }
          if (obj.isEnable == 1) {
            obj.isEnableName = '是'
          } else {
            obj.isEnableName = '否'
          }
          this.diaFormInfo.diaTableDim.data.push(obj)
          this.closeDiaDim()
        }
        this.dialogInfoDim.btList[1].btLoading = false
      })
    },
    // 删除供应商信息
    deleteDiaDim(data) {
      this.$confirm('确认删除？', {
        type: 'warning',
        center: true
      }).then(() => {
        if (data.id) {
          this.delDimensionList.push(data.id)
        }
        this.diaFormInfo.diaTableDim.data.splice(data.$rowIndex, 1)
      }).catch(() => {
      })
    },
    closeDiaDim() {
      this.dialogInfoDim.visible = false
      if (this.dialogInfoDim.formInfo.ref) {
        this.dialogInfoDim.formInfo.ref.resetFields()
      }
    },
    enableEvent(data) {
      if (data.isEnable == 0) {
        this.$confirm('确认启用？', {
          type: 'warning',
          center: true
        }).then(() => {
          this.$store.dispatch(this.store + 'enable', { 'id': data.id }).then(() => {
            const resp = this.$store.state[this.modName].enableResp
            if (resp.code === this.$successCode) {
              this.queryTableData(this.topForm.data)
            }
          })
        }).catch(() => {
        })
      } else {
        this.$confirm('确认停用？', {
          type: 'warning',
          center: true
        }).then(() => {
          this.$store.dispatch(this.store + 'deactivate', { 'id': data.id }).then(() => {
            const resp = this.$store.state[this.modName].deactivateResp
            if (resp.code === this.$successCode) {
              this.queryTableData(this.topForm.data)
            }
          })
        }).catch(() => {
        })
      }
    },
    changeWeightKg() {
      let val = 0
      if (this.diaFormInfo.data.grossWeightKg && this.diaFormInfo.data.netWeightKg) {
        val = this.diaFormInfo.data.grossWeightKg - this.diaFormInfo.data.netWeightKg
      }
      if (val < 0) {
        this.$message.error('净重不能大于毛重，请重新输入')
        this.diaFormInfo.data.netWeightKg = 0
        this.diaFormInfo.data.tareWeightKg = 0
        return
      }
      this.$set(this.diaFormInfo.data, 'tareWeightKg', val)
    },
    handleValidity() {
      if (this.diaFormInfo.data.isValidity) {
        this.diaFormInfo.fieldList[48].disabled = false
      } else {
        this.diaFormInfo.fieldList[48].disabled = true
        this.diaFormInfo.fieldList[49].disabled = true
        this.diaFormInfo.fieldList[50].disabled = true
        this.diaFormInfo.fieldList[51].disabled = true
        this.diaFormInfo.fieldList[52].disabled = true
        this.diaFormInfo.data.validityType = null
        this.diaFormInfo.data.validityDay = null
        this.diaFormInfo.data.warmValidityDay = null
        this.diaFormInfo.data.inWhValidity = null
        this.diaFormInfo.data.outWhValidity = null
      }
    },
    handleValidityType() {
      if (!this.diaFormInfo.data.validityType) {
        this.diaFormInfo.fieldList[49].disabled = true
        this.diaFormInfo.fieldList[50].disabled = true
        this.diaFormInfo.fieldList[51].disabled = true
        this.diaFormInfo.fieldList[52].disabled = true
      }
      if (this.diaFormInfo.data.validityType == 'SXRQ') {
        this.diaFormInfo.data.validityDay = null
        this.diaFormInfo.fieldList[49].disabled = true
        this.diaFormInfo.fieldList[50].disabled = false
        this.diaFormInfo.fieldList[51].disabled = false
        this.diaFormInfo.fieldList[52].disabled = false
      } else {
        this.diaFormInfo.fieldList[49].disabled = false
        this.diaFormInfo.fieldList[50].disabled = false
        this.diaFormInfo.fieldList[51].disabled = false
        this.diaFormInfo.fieldList[52].disabled = false
      }
    }
  },
  // 页面初始化函数
  created() {
    this.initData()
    this.initPage()
  }
}
