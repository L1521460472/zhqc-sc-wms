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
      this.topForm.data.dicTypeCode = null
      this.topForm.data.dicTypeName = null
      this.topForm.data.isSystem = null
      this.topForm.data.isEnable = null
      this.topForm.data.dicTypeSeq = null
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

      // 明细添加按钮显示
      this.diaFormInfo.addDtBtnShow = false
      this.diaFormInfo.dtTableInfo.handle.btList[0].show = false
      this.diaFormInfo.dtTableInfo.handle.btList[1].show = false

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
      // 明细添加按钮显示
      this.diaFormInfo.addDtBtnShow = true

      this.diaFormInfo.dtTableInfo.handle.btList[0].show = true
      this.diaFormInfo.dtTableInfo.handle.btList[1].show = true

      // 绑定弹窗保存事件：saveAdd
      this.dialogInfo.btList[1].event = 'saveData'
      // 封装的新增表单的数据化配置
      this.diaFormInfoAddFieldList()

      this.diaFormInfo.dtTableInfo.dtList = []
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

      // 明细添加按钮显示
      this.diaFormInfo.addDtBtnShow = true
      this.diaFormInfo.dtTableInfo.handle.btList[0].show = true
      this.diaFormInfo.dtTableInfo.handle.btList[1].show = true

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
     * 打开明细添加页面
     */
    openAddDtPage() {
      // 弹窗的类型：add
      this.dialogInfoDt.type = 'add'
      // 默认弹窗的标题：修改
      this.dialogInfoDt.title = this.$t('table.add')
      this.dialogInfoDt.visible = true
      // 绑定弹窗保存事件
      this.dialogInfoDt.btList[1].event = 'saveDt'

      this.diaFormInfoAddFieldDtList()

      this.diaFormInfoDt.data = {
        dicCode: null,
        dicName: null,
        dicSeq: null,
        dicDesc: null
      }
      this.$set(this.diaFormInfoDt.data, 'isSystem', 1)
      this.$set(this.diaFormInfoDt.data, 'isEnable', 1)
    },

    /**
     * 打开明细编辑页面
     */
    openEditPageDt(data) {
      // 弹窗的类型：edit
      this.dialogInfoDt.type = 'edit'
      // 默认弹窗的标题：修改
      this.dialogInfoDt.title = this.$t('table.edit')
      // 弹窗是否显示
      this.dialogInfoDt.visible = true
      // 弹窗的保存按钮是否显示
      this.dialogInfoDt.btList[1].show = true

      // 绑定弹窗保存事件
      this.dialogInfoDt.btList[1].event = 'editDataDt'

      this.diaFormInfoEditFieldDtList()
      // 为弹窗表单对应的字段赋值
      this.diaFormInfoDt.data = this.$deepClone(data)
    },

    /**
     * 关闭添加明细
     */
    closeAddDtPage() {
      this.dialogInfoDt.visible = false
      this.diaFormInfoDt.data = {}
    },

    saveDt() {
      this.diaFormInfoDt.ref.validate(valid => {
        if (valid) {
          for (let i = 0; i < this.diaFormInfo.dtTableInfo.dtList.length; i++) {
            const exist = this.diaFormInfo.dtTableInfo.dtList[i]
            if (exist.dicCode == this.diaFormInfoDt.data.dicCode) {
              this.$message.error('字典编码已存在,保存失败')
              return
            }
          }
          const data = {
            dicCode: this.diaFormInfoDt.data.dicCode,
            dicName: this.diaFormInfoDt.data.dicName,
            isSystem: this.diaFormInfoDt.data.isSystem,
            isEnable: this.diaFormInfoDt.data.isEnable,
            dicSeq: this.diaFormInfoDt.data.dicSeq,
            dicDesc: this.diaFormInfoDt.data.dicDesc,
            remark: this.diaFormInfoDt.data.remark,

            isSystemName: this.convWhether(this.diaFormInfoDt.data.isSystem),
            isEnableName: this.convEnable(this.diaFormInfoDt.data.isEnable)
          }
          this.diaFormInfo.dtTableInfo.dtList.push(data)
          this.closeAddDtPage()
        }
      })
    },

    // 删除明细
    deleteDt(data) {
      this.diaFormInfo.dtTableInfo.dtList.splice(data.$rowIndex, 1)
      // 编辑页面,需要删除数据库明细
      if (this.dialogInfo.type == 'edit' && !this.$isEmpty(data.id)) {
        this.$store.dispatch(this.store + 'deleteDt', data.id).then(() => {
        })
      }
    },

    /**
     * 明细编辑数据
     */
    editDataDt() {
      this.diaFormInfo.ref.validate(valid => {
        if (valid) {
          const data = this.diaFormInfo.data

          this.$store.dispatch(this.store + 'updateDt', this.diaFormInfoDt.data).then(() => {
            const resp = this.$store.state[this.modName].updateDtResp
            if (resp.code === this.$successCode) {
              this.dialogInfoDt.visible = false
              this.queryRowData(data)
            }
          })
        }
      })
    },

    /**
     * 关闭页面
     */
    close() {
      this.dialogInfo.visible = false
    },
    //
    openCollapsable() {
      this.collapsable = !this.collapsable
    },

    /**
     * 页面初始化
     */
    initPage() {
      this.$store.dispatch(this.store + 'initPage', {}).then(() => {
        const resp = this.$store.state[this.modName].initPageResp
        if (resp.code === this.$store.state[this.modName].successCode) {
          this.listTypeInfo.enableList = resp.obj.enableList
          this.listTypeInfo.whetherList = resp.obj.whetherList
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
        const obj = this.$store.state[this.modName].initUpdateObj.entity
        this.diaFormInfo.data = obj
        this.diaFormInfo.dtTableInfo.dtList = obj.dtList
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
          this.diaFormInfo.data.dtList = this.diaFormInfo.dtTableInfo.dtList
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
          this.diaFormInfo.data.dtList = this.diaFormInfo.dtTableInfo.dtList
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
     * 转换是否
     * @param data
     * @return {string}
     */
    convWhether(data) {
      if (data == 0) {
        return '否'
      } else {
        return '是'
      }
    },

    /**
     * 转换启用,禁用
     * @param data
     * @return {string}
     */
    convEnable(data) {
      if (data == 0) {
        return '禁用'
      } else {
        return '启用'
      }
    }

  },
  // 页面初始化函数
  created() {
    this.initData()
    this.initPage()
  }
}
