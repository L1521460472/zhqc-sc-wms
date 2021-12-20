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
      this.topForm.data.lineCode = null
      this.topForm.data.lineType = null
      this.topForm.data.transportType = null
      this.topForm.data.sourceSystem = null
      this.topForm.data.sourceCode = null
      this.topForm.data.ownerCode = null
      this.topForm.data.ownerName = null
      this.topForm.data.startName = null
      this.topForm.data.startCode = null
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
      // 封装的新增表单的数据化配置
      this.diaFormInfoAddFieldList()
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
     * 打开嵌套页面
     */
    addItem() {
      // 弹窗的类型：add
      this.nestingDialogInfo.type = 'add'
      // 默认弹窗的标题：新增
      this.nestingDialogInfo.title = this.$t('添加明细')
      // 弹窗是否显示
      this.nestingDialogInfo.visible = true
      // 弹窗的保存按钮是否显示
      this.nestingDialogInfo.btList[1].show = true
      // 绑定弹窗保存事件：saveAdd
      this.nestingDialogInfo.btList[1].event = 'nestSave'
      // 封装的新增表单的数据化配置
      this.nestFormInfoAddFieldList()
      this.nestDiaFormInfo.data = {}
      this.$nextTick(() => {
        this.nestDiaFormInfo.ref.clearValidate()
      })
    },
    editItem(data) {
      this.nestingDialogInfo.type = 'edit'
      // 默认弹窗的标题：新增
      this.nestingDialogInfo.title = this.$t('编辑明细')
      // 弹窗是否显示
      this.nestingDialogInfo.visible = true
      // 弹窗的保存按钮是否显示
      this.nestingDialogInfo.btList[1].show = true
      // 绑定弹窗保存事件：saveAdd
      this.nestingDialogInfo.btList[1].event = 'nestEdit'
      // 封装的新增表单的数据化配置
      this.nestFormInfoEditFieldList()
      this.nestDiaFormInfo.data = this.$deepClone(data)
    },
    deleteItem(data) {
      this.$confirm(this.$t('确认删除选中的明细么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        const { rowIndex } = data
        this.popTableInfo.data.splice(rowIndex, 1)
      })
    },

    nestClose() {
      this.nestingDialogInfo.visible = false
    },
    nestSave() {
      this.nestDiaFormInfo.ref.validate(valid => {
        if (valid) { // 查询表单校验
          this.popTableInfo.data.push(this.nestDiaFormInfo.data)
          this.nestClose()
        }
      })
    },
    nestEdit() {
      this.nestDiaFormInfo.ref.validate(valid => {
        if (valid) { // 查询表单校验
          const { rowIndex } = this.nestDiaFormInfo.data
          this.popTableInfo.data.splice(rowIndex, 1, this.nestDiaFormInfo.data)
          this.nestClose()
        }
      })
    },

    /**
     * 页面初始化
     */
    initPage() {
      this.$store.dispatch(this.store + 'initPage', {}).then(() => {
        const result = this.$store.state[this.modName].initPageObj
        this.listTypeInfo.lineTypeList = result.lineTypeList
        this.listTypeInfo.sourceSystemList = result.sourceSystemList.map((item) => {
          item.value = item.key
          return item
        })
        this.listTypeInfo.transportTypeList = result.transportTypeList
        this.listTypeInfo.isEnableList = result.enableList
        this.listTypeInfo.workTypeList = result.transportWorkTypeList
      })

      // this.$store.dispatch(this.store + 'factorylistData', {}).then(() => {
      //   const result = this.$store.state[this.modName].factoryObj.obj
      //   const arr = []
      //   result.forEach(item => {
      //     arr.push({ key: item.whFactoryName, value: item.whFactoryCode })
      //   })
      //   this.listTypeInfo.targetList = arr
      // })
      this.queryOwnerList()
    },
    queryOwnerList() {
      this.$store.dispatch(this.store + 'queryOwnerList', {}).then(() => {
        const resp = this.$store.state[this.modName].ownerListResp
        // if (resp.code === this.$store.state[this.modName].successCode) {
        const arr = []
        resp.obj.forEach((item) => {
          arr.push({ key: item.ownerName, value: item.ownerCode })
        })
        this.listTypeInfo.ownerList = arr
        // }
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
        const reslut = this.$store.state[this.modName].initUpdateObj
        this.diaFormInfo.data = reslut.entity
        this.popTableInfo.data = reslut.itemList
      })
    },
    /**
     * 新增数据
     */
    saveData() {
      const params = {
        ...this.diaFormInfo.data,
        // lineRemark: this.lineRemarkValue,
        items: this.popTableInfo.data
      }

      this.diaFormInfo.ref.validate(valid => {
        if (valid) {
          this.$store.dispatch(this.store + 'saveData', params).then(() => {
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
      const params = {
        ...this.diaFormInfo.data,
        // lineRemark: this.lineRemarkValue,
        items: this.popTableInfo.data
      }

      this.diaFormInfo.ref.validate(valid => {
        if (valid) {
          this.$store.dispatch(this.store + 'editData', params).then(() => {
            const resp = this.$store.state[this.modName].editResp
            if (resp.code === this.$successCode) {
              this.dialogInfo.visible = false
              this.initData()
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
            this.initData()
          }
        })
      })
    },
    stopData(data) {
      this.$confirm(this.$t('确认停用选中的记录么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'dispathDeactivate', { 'id': data.id }).then(() => {
          const resp = this.$store.state[this.modName].deactivateResp
          if (resp.code === this.$successCode) {
            this.initData()
          }
        })
      })
    },
    beginData(data) {
      this.$confirm(this.$t('确认启用选中的记录么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'dispathEnable', { 'id': data.id }).then(() => {
          const resp = this.$store.state[this.modName].enableResp
          if (resp.code === this.$successCode) {
            this.initData()
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
    }
  },
  // 页面初始化函数
  created() {
    this.initData()
    this.initPage()
  }
}
