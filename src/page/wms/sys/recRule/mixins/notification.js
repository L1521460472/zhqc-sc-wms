import { Set } from 'core-js'

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
      this.topForm.data.recRuleCode = null
      this.topForm.data.recRuleName = null
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
        this.listTypeInfo.matchModeList = obj.matchModeList
        this.listTypeInfo.saveQcOrderList = obj.saveQcOrderList
        this.listTypeInfo.enableList = obj.enableList
        this.listTypeInfo.defaultList = obj.defaultList
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
      this.diaFormInfoDt.type = 'add'
      this.diaFormInfoDt.data = {
        id: 0,
        asnType: null,
        asnTypeName: null,
        matchMode: null,
        matchModeName: null,
        fastRec: null,
        fastRecName: null,
        isSaveQcOrder: 0,
        isSaveQcOrderName: '否',
        overRatio: 0,
        overQty: 0
      }
      if (this.diaFormInfoDt.ref) {
        this.diaFormInfoDt.ref.clearValidate()
      }
      this.diaFormInfoDtAddFieldList()
      this.dialogInfoDt.visible = true
    },
    // 明细编辑弹窗
    openDiaLogDtEdit(data) {
      this.diaFormInfoDt.type = 'edit'
      this.diaFormInfoDtEditFieldList()
      // const editData = {
      //   id: data.id,
      //   asnType: data.asnType,
      //   matchMode: data.matchMode,
      //   isSaveQcOrder: data.isSaveQcOrder,
      //   overRatio: data.overRatio,
      //   overQty: data.overQty
      // }
      this.diaFormInfoDt.rowIndex = data.$rowIndex
      this.diaFormInfoDt.data = data
      this.dialogInfoDt.visible = true
      if (this.diaFormInfoDt.data.fastRec === 1) {
        this.diaFormInfoDt.fieldList[3].disabled = true
      }
      if (this.diaFormInfoDt.data.matchMode == 'CS') {
        this.diaFormInfoDt.fieldList[4].disabled = false
        this.diaFormInfoDt.fieldList[5].disabled = false
      }
      // if (this.diaFormInfoDt.ref) {
      //   this.diaFormInfoDt.ref.clearValidate()
      // }
    },
    // 删除明细
    deleteDtData(data) {
      // data.$rowIndex
      if (data.id && data.id > 0) {
        this.diaFormInfo.dtTableInfo.deleteIds.push(data.id)
      }
      this.diaFormInfo.dtTableInfo.data.splice(data.$rowIndex, 1)
    },

    saveDtData() {
      this.diaFormInfoDt.ref.validate(valid => {
        if (valid) {
          if (this.diaFormInfoDt.data.matchMode == 'CS' && this.diaFormInfoDt.data.overRatio && this.diaFormInfoDt.data.overQty) {
            this.$message.error('超收比例和超收数量只能填一个，请校验')
            return
          }
          const reqVo = JSON.parse(JSON.stringify(this.diaFormInfoDt.data))

          if (this.diaFormInfoDt.type === 'edit') {
            this.$set(this.diaFormInfo.dtTableInfo.data, this.diaFormInfoDt.rowIndex, reqVo)
          } else {
            const set = new Set()
            const arr = this.diaFormInfo.dtTableInfo.data ?? []
            arr.forEach(item => {
              set.add(item.asnType)
            })
            if (set.has(reqVo.asnType)) {
              this.$message.warning('已存在该ASN类型，不可重复新增！')
            } else {
              this.diaFormInfo.dtTableInfo.data.push(reqVo)
            }
          }
          this.closeDtPage()
        }
      })
    },
    closeDtPage() {
      this.dialogInfoDt.visible = false
      this.diaFormInfoDt.rowIndex = null
      // this.diaFormInfoDt.data = {
      //   id: 0,
      //   asnType: null,
      //   asnTypeName: null,
      //   matchMode: null,
      //   matchModeName: null,
      //   fastRec: null,
      //   fastRecName: null,
      //   isSaveQcOrder: 0,
      //   isSaveQcOrderName: '否',
      //   overRatio: 0,
      //   overQty: 0
      // }
      // if(this.diaFormInfoDt.ref){
      //   this.diaFormInfoDt.ref.resetFields();
      // }
      // this.diaFormInfoDt.data={};
    },
    handleMatchMode() {
      if (!this.diaFormInfoDt.data.matchMode || this.diaFormInfoDt.data.matchMode == 'WQPP') {
        this.diaFormInfoDt.fieldList[4].disabled = true
        this.diaFormInfoDt.fieldList[5].disabled = true
      } else {
        this.diaFormInfoDt.fieldList[4].disabled = false
        this.diaFormInfoDt.fieldList[5].disabled = false
      }
      this.diaFormInfoDt.data.overRatio = 0
      this.diaFormInfoDt.data.overQty = 0
    },
    handleQuickReceipt(value) {
      this.diaFormInfoDt.fieldList[3].disabled = !!value
      this.changeRules(value)
    },
    changeRules(value) {
      this.diaFormInfoDt.rules = {
        asnType: [{ required: true, message: this.$t('recRule.dt.msg.asnType'), trigger: 'change' }],
        matchMode: [{ required: true, message: this.$t('recRule.dt.msg.matchMode'), trigger: 'change' }],
        isSaveQcOrder: [{ required: !value, message: this.$t('recRule.dt.msg.isSaveQcOrder'), trigger: 'change' }]
      }
      if (value) {
        this.diaFormInfoDt.data.isSaveQcOrder = 0
        this.diaFormInfoDt.data.isSaveQcOrderName = '否'
      }
      this.diaFormInfoDt.ref && this.diaFormInfoDt.ref.clearValidate()
    }

  },
  // 页面初始化函数
  created() {
    this.initData()
    this.initPage()
  }
}
