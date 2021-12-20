import { queryWhZoneList } from '../api/index'
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
      this.topForm.data.paRuleCode = null
      this.topForm.data.paRuleName = null
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
      // 默认弹窗的标题：修改
      this.dialogInfo.title = this.$t('查看')
      // 弹窗是否显示
      this.dialogInfo.visible = true
      // 弹窗的保存按钮是否显示
      this.dialogInfo.btList[1].show = false
      // 绑定弹窗保存事件：viewSave
      this.dialogInfo.btList[1].event = 'viewSave'
      this.diaFormInfo.dtTableInfo.topBtn.disabled = true
      this.diaFormInfo.dtTableInfo.handle.btList[0].disabled = true
      this.diaFormInfo.dtTableInfo.handle.btList[1].disabled = true
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
      // 绑定弹窗保存事件：saveAdd
      this.dialogInfo.btList[1].event = 'saveData'
      this.diaFormInfo.dtTableInfo.topBtn.disabled = false
      this.diaFormInfo.dtTableInfo.handle.btList[0].disabled = false
      this.diaFormInfo.dtTableInfo.handle.btList[1].disabled = false
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
      // 绑定弹窗保存事件
      this.dialogInfo.btList[1].event = 'editData'
      this.diaFormInfo.dtTableInfo.topBtn.disabled = false
      this.diaFormInfo.dtTableInfo.topBtn.disabled = false
      this.diaFormInfo.dtTableInfo.handle.btList[0].disabled = false
      this.diaFormInfo.dtTableInfo.handle.btList[1].disabled = false
      // this.editID = data.id;
      // 封装的修改表单的数据化配置
      this.diaFormInfoEditFieldList()
      // 为弹窗表单对应的字段赋值
      // this.diaFormInfo.data = this.$deepClone(data);
      this.queryRowData(data)
    },
    /**
     * 关闭页面
     */
    close() {
      this.dialogInfo.visible = false
    },

    /**
     * 页面初始化
     */
    initPage() {
      this.$store.dispatch(this.store + 'initPage', {}).then(() => {
        const obj = this.$store.state[this.modName].initPageObj
        this.listTypeInfo.asnTypeList = obj.asnTypeList
        this.listTypeInfo.whetherList = obj.whetherList
        this.listTypeInfo.enableList = obj.enableList
        this.listTypeInfo.paRuleTypeList = obj.paRuleTypeList
        this.listTypeInfo.turnoverLevelList = obj.turnoverLevelList
        this.listTypeInfo.goodsQualityList = obj.goodsQualityList
        this.listTypeInfo.lotTypeList = obj.lotTypeList
        this.listTypeInfo.packageAttrList = obj.packageAttrList.map(item => {
          item.key = item.dicName
          item.value = item.id
          return item
        })
        this.listTypeInfo.storageTypeList = obj.storageTypeList.map(item => {
          item.key = item.dicName
          item.value = item.id
          return item
        })
        // this.listTypeInfo.zoneList = obj.zoneList.map(item => {
        //   item.key = item.zoneName
        //   item.value = item.id + ''
        //   return item
        // })
        // this.listTypeInfo.lotList=obj.lotList.map(item=>{
        //   item.key = item.lotCode;
        //   item.value = item.id+"";
        //   return item;
        // });
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
        const objData = this.$store.state[this.modName].initUpdateObj
        this.diaFormInfo.data = objData.entity
        this.diaFormInfo.dtTableInfo.data = objData.dtList
        if (this.diaFormInfo.data.isMixBatch && this.dialogInfo.type == 'edit') {
          this.diaFormInfo.fieldList[10].disabled = false
        }
        if (this.diaFormInfo.data.isMixSku && this.dialogInfo.type == 'edit') {
          this.diaFormInfo.fieldList[8].disabled = false
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
          if (!this.diaFormInfo.dtTableInfo.data || this.diaFormInfo.dtTableInfo.data.length == 0) {
            this.$message.error('请添加策略明细')
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
          if (!this.diaFormInfo.dtTableInfo.data || this.diaFormInfo.dtTableInfo.data.length == 0) {
            this.$message.error('请添加策略明细')
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
    handleMixSku() {
      this.diaFormInfo.data.mixSkuMaxQty = null
      if (this.diaFormInfo.data.isMixSku) {
        this.diaFormInfo.fieldList[8].disabled = false
      } else {
        this.diaFormInfo.fieldList[8].disabled = true
      }
    },
    handleMixBatch() {
      this.diaFormInfo.data.mixBatchMaxQty = null
      if (this.diaFormInfo.data.isMixBatch) {
        this.diaFormInfo.fieldList[10].disabled = false
      } else {
        this.diaFormInfo.fieldList[10].disabled = true
      }
    },
    /**
     * 启用
     * @param data
     */
    handelEnabled(data) {
      this.$confirm(this.$t('确认启用选中的记录么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'enable', { 'id': data.id }).then(() => {
          const resp = this.$store.state[this.modName].enableResp
          if (resp.code === this.$successCode) {
            this.queryTableData(this.topForm.data)
          }
        })
      })
    },
    /**
     * 停用
     * @param data
     */
    handelDeactivate(data) {
      this.$confirm(this.$t('确认停用选中的记录么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'deactivate', { 'id': data.id }).then(() => {
          const resp = this.$store.state[this.modName].deactivateResp
          if (resp.code === this.$successCode) {
            this.queryTableData(this.topForm.data)
          }
        })
      })
    },
    // 明细新增弹窗
    openDiaLogDtAdd() {
      this.diaFormInfoDt.data = {
        id: 0,
        paRuleType: null,
        paZoneIdArray: null,
        paLotIdArray: null,
        asnTypeArray: null,
        goodsQuality: null,
        isEmptyFirst: 0,
        isMixSku: 0,
        isMixBatch: 0,
        lotTypeArray: null,
        storageType: null,
        isQtyLimit: 0,
        turnoverLevel: null,
        packageAttr: null,
        isVolLimit: 0,
        isWeightLimit: 0,
        isPalletLimit: 0,
        sortNum: 0,
        remark: null
      }
      this.diaFormInfoDt.canEditZone = false
      this.diaFormInfoDt.fieldList[2].disabled = true
      this.dialogInfoDt.visible = true
    },
    // 明细编辑弹窗
    openDiaLogDtEdit(data) {
      const editData = {
        id: data.id,
        paRuleType: data.paRuleType,
        paZoneIds: data.paZoneIds,
        paZoneIdArray: [],
        paLotIds: data.paLotIds,
        paLotIdArray: data.paLotIds,
        asnTypes: data.asnTypes,
        asnTypeArray: [],
        goodsQuality: data.goodsQuality,
        isEmptyFirst: data.isEmptyFirst,
        isMixSku: data.isMixSku,
        isMixBatch: data.isMixBatch,
        lotTypes: data.lotTypes,
        lotTypeArray: [],
        storageType: data.storageType,
        isQtyLimit: data.isQtyLimit,
        turnoverLevel: data.turnoverLevel,
        packageAttr: data.packageAttr,
        isVolLimit: data.isVolLimit,
        isWeightLimit: data.isWeightLimit,
        isPalletLimit: data.isPalletLimit,
        sortNum: data.sortNum,
        remark: data.remark
      }
      if (data.paZoneIds) {
        editData.paZoneIdArray = data.paZoneIds.split(',')
      }
      if (data.paLotIds) {
        editData.paLotIdArray = data.paLotIds
        // let paLotIdArray = data.paLotIds.split(",");
        // paLotIdArray.forEach(item=>{
        //   editData.paLotIdArray.push(item);
        // })
      }
      if (data.asnTypes) {
        editData.asnTypeArray = data.asnTypes.split(',')
      }
      if (data.lotTypes) {
        editData.lotTypeArray = data.lotTypes.split(',')
      }
      this.diaFormInfoDt.rowIndex = data.$rowIndex
      this.diaFormInfoDt.data = editData
      if (this.diaFormInfoDt.data.paRuleType == 'RULE_ZONE') {
        this.diaFormInfoDt.canEditZone = true
        this.diaFormInfoDt.fieldList[2].disabled = true
      } else if (this.diaFormInfoDt.data.paRuleType == 'RULE_LOT') {
        this.diaFormInfoDt.canEditZone = false
        this.diaFormInfoDt.fieldList[2].disabled = false
      } else {
        this.diaFormInfoDt.canEditZone = false
        this.diaFormInfoDt.fieldList[2].disabled = true
      }
      this.dialogInfoDt.visible = true
    },
    // 删除明细
    deleteDtData(data) {
      // data.$rowIndex
      if (data.id && data.id > 0) {
        this.diaFormInfo.dtTableInfo.deleteIds.push(data.id)
      }
      this.diaFormInfo.dtTableInfo.data.splice(data.$rowIndex, 1)
    },
    handlePaRuleType() {
      this.listTypeInfo.zoneList = []
      this.diaFormInfoDt.data.paZoneIdArray = []
      this.diaFormInfoDt.data.paLotIdArray = ''
      if (this.diaFormInfoDt.data.paRuleType == 'RULE_ZONE') {
        queryWhZoneList().then((res) => {
          this.listTypeInfo.zoneList = res.obj.map(item => {
            item.key = item.zoneName
            item.value = item.id + ''
            return item
          })
        })
        this.diaFormInfoDt.canEditZone = true
        this.diaFormInfoDt.fieldList[2].disabled = true
      } else if (this.diaFormInfoDt.data.paRuleType == 'RULE_LOT') {
        this.diaFormInfoDt.canEditZone = false
        this.diaFormInfoDt.fieldList[2].disabled = false
      } else {
        this.diaFormInfoDt.canEditZone = false
        this.diaFormInfoDt.fieldList[2].disabled = true
      }
    },
    saveDtData() {
      this.diaFormInfoDt.ref.validate(valid => {
        if (valid) {
          const reqVo = {
            id: this.diaFormInfoDt.data.id,
            paRuleType: this.diaFormInfoDt.data.paRuleType,
            goodsQuality: this.diaFormInfoDt.data.goodsQuality,
            isEmptyFirst: this.diaFormInfoDt.data.isEmptyFirst,
            isMixSku: this.diaFormInfoDt.data.isMixSku,
            isMixBatch: this.diaFormInfoDt.data.isMixBatch,
            storageType: this.diaFormInfoDt.data.storageType,
            isQtyLimit: this.diaFormInfoDt.data.isQtyLimit,
            turnoverLevel: this.diaFormInfoDt.data.turnoverLevel,
            packageAttr: this.diaFormInfoDt.data.packageAttr,
            isVolLimit: this.diaFormInfoDt.data.isVolLimit,
            isWeightLimit: this.diaFormInfoDt.data.isWeightLimit,
            isPalletLimit: this.diaFormInfoDt.data.isPalletLimit,
            sortNum: this.diaFormInfoDt.data.sortNum,
            remark: this.diaFormInfoDt.data.remark
          }
          if (this.diaFormInfoDt.data.paRuleType == 'RULE_ZONE') {
            if (!this.diaFormInfoDt.data.paZoneIdArray || this.diaFormInfoDt.data.paZoneIdArray.length == 0) {
              this.$message.error('请选择指定库区')
              return
            }
            let paZoneIds = ''
            let paZoneNames = ''
            this.diaFormInfoDt.data.paZoneIdArray.forEach(item => {
              paZoneIds += item + ','
              for (let i = 0; i < this.listTypeInfo.zoneList.length; i++) {
                if (item == this.listTypeInfo.zoneList[i].value) {
                  paZoneNames += this.listTypeInfo.zoneList[i].key + ','
                  break
                }
              }
            })
            reqVo.paZoneIds = paZoneIds.substring(0, paZoneIds.length - 1)
            reqVo.paZoneNames = paZoneNames.substring(0, paZoneNames.length - 1)
            reqVo.paLotIds = ''
            reqVo.paLotCodes = ''
          } else if (this.diaFormInfoDt.data.paRuleType == 'RULE_LOT') {
            if (!this.diaFormInfoDt.data.paLotIdArray || this.diaFormInfoDt.data.paLotIdArray.length == 0) {
              this.$message.error('请输入指定库位')
              return
            }
            reqVo.paZoneIds = ''
            reqVo.paZoneNames = ''
            reqVo.paLotIds = this.diaFormInfoDt.data.paLotIdArray
            reqVo.paLotCodes = this.diaFormInfoDt.data.paLotIdArray
            // let paLotIds = "";
            // let paLotCodes = "";
            // this.diaFormInfoDt.data.paLotIdArray.forEach(item=>{
            //   paLotIds+=item+",";
            //   for(let i=0;i<this.listTypeInfo.lotList.length;i++){
            //     if(item == this.listTypeInfo.lotList[i].value){
            //       paLotCodes+=this.listTypeInfo.lotList[i].key+",";
            //       break;
            //     }
            //   }
            // })
            // reqVo.paLotIds=paLotIds.substring(0,paLotIds.length-1);
            // reqVo.paLotCodes=paLotCodes.substring(0,paLotCodes.length-1);
          } else {
            reqVo.paZoneIds = ''
            reqVo.paZoneNames = ''
            reqVo.paLotIds = ''
            reqVo.paLotCodes = ''
          }
          if (this.diaFormInfoDt.data.asnTypeArray && this.diaFormInfoDt.data.asnTypeArray.length > 0) {
            let asnTypes = ''
            let asnTypeNames = ''
            this.diaFormInfoDt.data.asnTypeArray.forEach(item => {
              asnTypes += item + ','
              for (let i = 0; i < this.listTypeInfo.asnTypeList.length; i++) {
                if (item == this.listTypeInfo.asnTypeList[i].value) {
                  asnTypeNames += this.listTypeInfo.asnTypeList[i].key + ','
                  break
                }
              }
            })
            reqVo.asnTypes = asnTypes.substring(0, asnTypes.length - 1)
            reqVo.asnTypeNames = asnTypeNames.substring(0, asnTypeNames.length - 1)
          }
          if (this.diaFormInfoDt.data.lotTypeArray && this.diaFormInfoDt.data.lotTypeArray.length > 0) {
            let lotTypes = ''
            let lotTypeNames = ''
            this.diaFormInfoDt.data.lotTypeArray.forEach(item => {
              lotTypes += item + ','
              for (let i = 0; i < this.listTypeInfo.lotTypeList.length; i++) {
                if (item == this.listTypeInfo.lotTypeList[i].value) {
                  lotTypeNames += this.listTypeInfo.lotTypeList[i].key + ','
                  break
                }
              }
            })
            reqVo.lotTypes = lotTypes.substring(0, lotTypes.length - 1)
            reqVo.lotTypeNames = lotTypeNames.substring(0, lotTypeNames.length - 1)
          }

          if (this.diaFormInfoDt.data.paRuleType) {
            for (let i = 0; i < this.listTypeInfo.paRuleTypeList.length; i++) {
              if (this.diaFormInfoDt.data.paRuleType == this.listTypeInfo.paRuleTypeList[i].value) {
                reqVo.paRuleTypeName = this.listTypeInfo.paRuleTypeList[i].key
                break
              }
            }
          }
          if (this.diaFormInfoDt.data.storageType) {
            for (let i = 0; i < this.listTypeInfo.storageTypeList.length; i++) {
              if (this.diaFormInfoDt.data.storageType == this.listTypeInfo.storageTypeList[i].value) {
                reqVo.storageTypeName = this.listTypeInfo.storageTypeList[i].key
                break
              }
            }
          }
          if (this.diaFormInfoDt.data.goodsQuality) {
            for (let i = 0; i < this.listTypeInfo.goodsQualityList.length; i++) {
              if (this.diaFormInfoDt.data.goodsQuality == this.listTypeInfo.goodsQualityList[i].value) {
                reqVo.goodsQualityName = this.listTypeInfo.goodsQualityList[i].key
                break
              }
            }
          }
          if (this.diaFormInfoDt.rowIndex || this.diaFormInfoDt.rowIndex == 0) {
            this.$set(this.diaFormInfo.dtTableInfo.data, this.diaFormInfoDt.rowIndex, reqVo)
          } else {
            this.diaFormInfo.dtTableInfo.data.push(reqVo)
          }
          this.closeDtPage()
        }
      })
    },
    // 指定库区列表
    focusZone() {
      console.log('focusZone')
    },
    closeDtPage() {
      this.dialogInfoDt.visible = false
      this.diaFormInfoDt.rowIndex = null
    }
  },
  // 页面初始化函数
  created() {
    this.initData()
    this.initPage()
  }
}
