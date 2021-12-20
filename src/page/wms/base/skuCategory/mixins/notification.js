// 自定义事件处理
export default {
  methods: {

    /**
     * 重置
     */
    reboot() {
      this.topForm.data.companyCode = null
      this.topForm.data.partnerId = null
      this.topForm.data.hasChild = null
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
        this.listTypeInfo.origSysList = obj.origSysList
        this.rootId = obj.rootId
        if (obj.origSysList) {
          this.reqVo.origSys = obj.origSysList[0].value
          this.initTree()
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
          this.$store.dispatch(this.store + 'saveData', this.diaFormInfo.data).then(() => {
            const resp = this.$store.state[this.modName].addResp
            if (resp.code === this.$successCode) {
              this.initTree()
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
          this.$store.dispatch(this.store + 'editData', this.diaFormInfo.data).then(() => {
            const resp = this.$store.state[this.modName].editResp
            if (resp.code === this.$successCode) {
              this.initTree()
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
    deleteData() {
      if (!this.chooseNode) {
        this.$message.error('请选择要删除的产品分类')
        return
      }
      this.$confirm(this.$t('确认删除【' + this.chooseNode.categoryName + '】？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'deleteData', { 'id': this.chooseNode.id }).then(() => {
          const resp = this.$store.state[this.modName].deleteResp
          if (resp.code === this.$successCode) {
            this.initTree()
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
    addOneNode() {
      this.resetFormData()
      this.diaFormInfo.data.parentId = this.rootId
      this.diaFormInfo.data = {
        parentId: this.rootId,
        parentName: null,
        categoryCode: null,
        categoryName: null,
        origSys: this.reqVo.origSys,
        origCode: null,
        remark: null,
        id: null
      }
      this.diaFormInfo.fieldList[1].disabled = false
    },
    addNextNode() {
      if (!this.chooseNode) {
        this.$message.error('请先选中一个产品分类')
        return
      }
      this.diaFormInfo.data = {
        parentId: this.chooseNode.id,
        parentName: this.chooseNode.categoryName,
        categoryCode: null,
        categoryName: null,
        origSys: this.chooseNode.origSys,
        origCode: null,
        remark: null,
        id: null
      }
      this.diaFormInfo.fieldList[1].disabled = false
    },
    deleteNode() {

    },
    nodeClickEvent(data) {
      this.chooseNode = data
      this.diaFormInfo.data = {
        parentId: data.parentId,
        parentName: data.parentName,
        categoryCode: data.categoryCode,
        categoryName: data.categoryName,
        origSys: data.origSys,
        origCode: data.origCode,
        remark: data.remark,
        id: data.id
      }
      this.diaFormInfo.fieldList[1].disabled = true
    },
    initTree() {
      const req = {
        // origSys:this.reqVo.origSys,
      }
      // if(!req.origSys){
      //   this.$message.error("请先选择来源系统");
      //   return;
      // }
      this.$store.dispatch(this.store + 'queryTree', req).then(() => {
        this.treeData = this.$store.state[this.modName].treeObj
      })
      this.resetFormData()
      if (this.diaFormInfo.ref) {
        this.diaFormInfo.ref.resetFields()
      }
      this.chooseNode = null
    },
    saveEvent() {
      if (this.diaFormInfo.data.id) {
        this.editData()
      } else {
        this.saveData()
      }
    }
  },
  // 页面初始化函数
  created() {

  }
}
