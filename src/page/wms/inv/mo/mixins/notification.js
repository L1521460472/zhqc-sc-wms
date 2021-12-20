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
      this.topForm.data.moNo = null
      this.topForm.data.moType = null
      this.topForm.data.moStatus = null
      this.topForm.data.ownerId = null
      this.topForm.data.fpSkuId = null
      this.topForm.data.sourceType = null
      this.topForm.data.origNo = null
      this.topForm.data.creatorName = null
      this.topForm.data.planStartTimeBegin = null
      this.topForm.data.planStartTimeEnd = null
      this.topForm.data.planFinishTimeBegin = null
      this.topForm.data.planFinishTimeEnd = null
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
      this.openDialog('moDetailPage', data)
      // //弹窗的类型：view
      // this.dialogInfo.type = 'view';
      // //默认弹窗的标题：修改
      // this.dialogInfo.title = this.$t("查看");
      // //弹窗是否显示
      // this.dialogInfo.visible = true;
      // this.diaFormInfo.addDtBtnShow = false;
      // //弹窗的保存按钮是否显示
      // this.dialogInfo.btList[1].show = false;
      // //绑定弹窗保存事件：viewSave
      // this.dialogInfo.btList[1].event = 'viewSave';
      // this.viewID = data.id;
      // //封装的修改表单的数据化配置
      // this.diaFormInfoViewFieldList();
      // //为弹窗表单对应的字段赋值
      // //this.diaFormInfo.data = this.$deepClone(data);
      // this.queryRowData(data);
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
      this.diaFormInfo.addDtBtnShow = true
      // 弹窗的保存按钮是否显示
      this.dialogInfo.btList[1].show = true
      // 绑定弹窗保存事件：saveAdd
      this.dialogInfo.btList[1].event = 'saveData'
      // 封装的新增表单的数据化配置
      this.diaFormInfoAddFieldList()
      this.diaFormInfo.dtTableInfo.data = []
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
      this.diaFormInfo.addDtBtnShow = true
      // 弹窗的保存按钮是否显示
      this.dialogInfo.btList[1].show = true
      // 绑定弹窗保存事件
      this.dialogInfo.btList[1].event = 'editData'
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
        this.sourceTypeManual = obj.sourceTypeManual
        this.sourceTypeBom = obj.sourceTypeBom
        this.listTypeInfo.moTypeList = obj.moTypeList
        this.listTypeInfo.moStatusList = obj.moStatusList
        this.listTypeInfo.moSourceTypeList = obj.moSourceTypeList
        this.lotType = obj.moLotType
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
        this.diaFormInfo.dtTableInfo.data = this.$store.state[this.modName].initUpdateObj.dtList
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
          this.$showLoading()
          const req = this.diaFormInfo.data
          req.dtList = this.diaFormInfo.dtTableInfo.data
          this.$store.dispatch(this.store + 'saveData', req).then(() => {
            const resp = this.$store.state[this.modName].addResp
            if (resp.code === this.$successCode) {
              this.dialogInfo.visible = false
              this.initData()
            }
          }).finally(() => {
            this.$hideLoading()
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
          this.$showLoading()
          const req = this.diaFormInfo.data
          req.dtList = this.diaFormInfo.dtTableInfo.data
          req.deleteIds = this.deleteIds
          this.$store.dispatch(this.store + 'editData', req).then(() => {
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
    initSkuBom(data) {
      this.clearDtData()
      if (!data) {
        return
      }
      this.$store.dispatch(this.store + 'queryBomBySkuId', { 'skuId': data }).then(() => {
        const obj = this.$store.state[this.modName].skuBomObj
        const array = []
        obj.forEach(item => {
          const bom = {
            id: 0,
            bomSkuId: item.bomSkuId,
            bomSkuCode: item.bomSkuCode,
            bomSkuName: item.bomSkuName,
            bomSpec: item.bomSpec,
            bomMainUnit: item.bomMainUnit,
            bomQty: item.bomNum,
            normQty: 0,
            planPickQty: 0,
            planFinishQty: 0,
            sourceType: this.sourceTypeBom.value,
            sourceTypeName: this.sourceTypeBom.key
          }
          this.calcQty(bom)
          array.push(bom)
        })
        this.diaFormInfo.dtTableInfo.data = array
      })
    },
    openAddDtPage() {
      this.diaFormInfoDt.data = {
        bomSkuId: null,
        bomSkuCode: null,
        bomSkuName: null,
        bomSpec: null,
        bomMainUnit: null,
        bomQty: null
      }
      this.diaFormInfoDtFieldList()
      this.dialogInfoDt.title = '新增产品明细'
      this.dialogInfoDt.btList[1].event = 'saveDt'
      this.dialogInfoDt.visible = true
    },
    closeDtPage() {
      this.dialogInfoDt.visible = false
    },
    saveDt() {
      this.diaFormInfoDt.ref.validate(valid => {
        if (valid) {
          if (this.diaFormInfo.data.fpSkuId && this.diaFormInfoDt.data.bomSkuId == this.diaFormInfo.data.fpSkuId) {
            this.$message.error('不能选择成品SKU，保存失败')
            return
          }
          for (let i = 0; i < this.diaFormInfo.dtTableInfo.data.length; i++) {
            const exist = this.diaFormInfo.dtTableInfo.data[i]
            if (exist.bomSkuId == this.diaFormInfoDt.data.bomSkuId) {
              this.$message.error('产品已存在，保存失败')
              return
            }
          }
          const data = {
            id: 0,
            bomSkuId: this.diaFormInfoDt.data.bomSkuId,
            bomSkuCode: this.diaFormInfoDt.data.bomSkuCode,
            bomSkuName: this.diaFormInfoDt.data.bomSkuName,
            bomSpec: this.diaFormInfoDt.data.bomSpec,
            bomMainUnit: this.diaFormInfoDt.data.bomMainUnit,
            bomQty: this.diaFormInfoDt.data.bomQty,
            normQty: 0,
            planPickQty: 0,
            planFinishQty: 0,
            sourceType: this.sourceTypeManual.value,
            sourceTypeName: this.sourceTypeManual.key
          }
          this.calcQty(data)
          this.diaFormInfo.dtTableInfo.data.push(data)
          this.closeDtPage()
        }
      })
    },
    deleteDt(data) {
      for (let i = 0; i < this.diaFormInfo.dtTableInfo.data.length; i++) {
        const exist = this.diaFormInfo.dtTableInfo.data[i]
        if (exist.bomSkuId == data.bomSkuId) {
          if (data.id && data.id != 0) {
            this.deleteIds.push(data.id)
          }
          this.diaFormInfo.dtTableInfo.data.splice(i, 1)
          return
        }
      }
    },
    // 计算数量
    calcQty(data) {
      const planQty = this.diaFormInfo.data.moQty || 1
      data.normQty = data.bomQty * planQty
      if (!this.diaFormInfo.data.moType) {
        data.planPickQty = 0
        data.planFinishQty = 0
      } else {
        if (this.diaFormInfo.data.moType == 'COMB') {
          data.planPickQty = data.normQty
          data.planFinishQty = 0
        } else {
          data.planPickQty = 0
          data.planFinishQty = data.normQty
        }
      }
      return data
    },
    // 加工数量改变，更新定额数量
    updateDtQty() {
      const array = this.diaFormInfo.dtTableInfo.data
      if (array) {
        array.forEach(item => {
          this.calcQty(item)
        })
      }
    },
    // 情况加工明细数据
    clearDtData() {
      if (this.diaFormInfo.dtTableInfo.data) {
        this.diaFormInfo.dtTableInfo.data.forEach(item => {
          if (item.id && item.id != 0) {
            this.deleteIds.push(item.id)
          }
        })
        this.diaFormInfo.dtTableInfo.data = []
      }
    },
    audit(data) {
      this.$confirm(this.$t('确认审核选中的记录么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'audit', { 'id': data.id }).then(() => {
          const resp = this.$store.state[this.modName].auditResp
          if (resp.code === this.$successCode) {
            this.$message.success(resp.msg)
            this.queryTableData(this.topForm.data)
          }
        })
      })
    },
    unAudit(data) {
      this.$confirm(this.$t('确认弃审选中的记录么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'unAudit', { 'id': data.id }).then(() => {
          const resp = this.$store.state[this.modName].unAuditResp
          if (resp.code === this.$successCode) {
            this.$message.success(resp.msg)
            this.queryTableData(this.topForm.data)
          }
        })
      })
    },
    assign(data) {
      this.$showLoading()
      this.$store.dispatch(this.store + 'assign', { 'id': data.id }).then(() => {
        const resp = this.$store.state[this.modName].assignResp
        if (resp.code === this.$successCode || resp.code == this.$partSuccessCode) {
          this.$message.success(resp.msg)
          this.queryTableData(this.topForm.data)
        }
      }).finally(() => {
        this.$hideLoading()
      })
    },
    unAssign(data) {
      this.$showLoading()
      this.$store.dispatch(this.store + 'unAssign', { 'id': data.id }).then(() => {
        const resp = this.$store.state[this.modName].unAssignResp
        if (resp.code === this.$successCode) {
          this.$message.success(resp.msg)
          this.queryTableData(this.topForm.data)
        }
      }).finally(() => {
        this.$hideLoading()
      })
    },
    downShelf(data) {
      this.$showLoading()
      this.$store.dispatch(this.store + 'downShelf', { 'id': data.id }).then(() => {
        const resp = this.$store.state[this.modName].downShelfResp
        if (resp.code === this.$successCode) {
          this.$message.success(resp.msg)
          this.queryTableData(this.topForm.data)
        } else if (resp.code === 1043) {
          // 完善加工库位
          this.showUpdateLotCodeDia(data.id)
        }
      }).finally(() => {
        this.$hideLoading()
      })
    },
    closeMo(data) {
      this.$confirm(this.$t('确认关闭选中的加工单么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'close', data.id).then(() => {
          const resp = this.$store.state[this.modName].closeResp
          if (resp.code === this.$successCode) {
            this.$message.success(resp.msg)
            this.queryTableData(this.topForm.data)
          }
        })
      })
    },
    // 显示更新加工库位弹窗
    showUpdateLotCodeDia(id) {
      this.diaFormInfoDt.data = {
        id: id,
        moLotCode: null
      }
      this.diaFormInfoLotFieldList()
      this.dialogInfoDt.title = '录入加工库位'
      this.dialogInfoDt.btList[1].event = 'saveLotCode'
      this.dialogInfoDt.visible = true
    },
    saveLotCode() {
      this.diaFormInfoDt.ref.validate(valid => {
        if (valid) {
          const data = this.diaFormInfoDt.data
          this.$showLoading()
          this.$store.dispatch(this.store + 'updateMoLot', { 'id': data.id, 'moLotCode': data.moLotCode }).then(() => {
            const resp = this.$store.state[this.modName].updateMoLotResp
            if (resp.code === this.$successCode) {
              this.closeDtPage()
              // 自动触发领料事件
              this.downShelf(data)
            }
          }).finally(() => {
            this.$hideLoading()
          })
        }
      }).finally(() => {
        this.$hideLoading()
      })
    }
  },
  // 页面初始化函数
  created() {
    this.initData()
    this.initPage()
    this.resetFormData()
  }
}
