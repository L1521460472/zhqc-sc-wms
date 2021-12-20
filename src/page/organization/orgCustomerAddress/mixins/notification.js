
// 自定义事件处理
export default {
  methods: {
    showTableString(record, col) {
      if (record[col.property]) {
        return '' + record[col.property]
      } else {
        return record[col.property]
      }
    },
    // 跳转首页事件
    findPageList() {
      // 设置页面为首页
      this.$setPageLimit(this.pageRequest, this.topForm.data)
      this.queryListData(this.topForm.data)
    },

    // /////////////////
    // 底层查询方法
    queryListData(data) {
      this.$showLoading()
      this.$store.dispatch(this.store + 'pageInfo', data).then(() => {
      }).finally(() => {
        this.$hideLoading()
      })
    },
    // 翻页事件处理
    pageChange(val) {
      // 设置页码值为val
      this.$setPageChange(val, this.pageRequest, this.topForm.data)
      this.queryListData(this.topForm.data)
    },
    // 页面查询按钮事件
    search() {
      this.topForm.ref.validate(valid => {
        if (valid) { // 查询表单校验
          this.findPageList()
        }
      })
    },
    // 窗口关闭事件
    close() {
      this.dialogInfo.visible = false
    },
    // 新增按钮点击页面
    add() {
      // 弹窗的类型：add
      this.dialogInfo.type = 'add'
      // 默认弹窗的标题：新增
      this.dialogInfo.title = this.$t('table.add')
      // 弹窗是否显示
      this.dialogInfo.visible = true
      // 弹窗的保存按钮是否显示
      this.dialogInfo.btList[1].show = true
      // 绑定弹窗保存事件：saveAdd
      this.dialogInfo.btList[1].event = 'saveAdd'
      // 封装的新增表单的数据化配置
      this.diaFormInfoAddFieldList()
      // 清空数据
      this.resetFormData()
    },
    // 编辑按钮点击事件
    update(data) {
      // 弹窗的类型：edit
      this.dialogInfo.type = 'edit'
      // 默认弹窗的标题：修改
      this.dialogInfo.title = this.$t('table.edit')
      // 弹窗是否显示
      this.dialogInfo.visible = true
      // 弹窗的保存按钮是否显示
      this.dialogInfo.btList[1].show = true
      // 绑定弹窗保存事件：editSave
      this.dialogInfo.btList[1].event = 'editSave'
      this.editID = data.id
      // 封装的修改表单的数据化配置
      this.diaFormInfoEditFieldList()
      // 为弹窗表单对应的字段赋值
      this.diaFormInfo.data = this.$deepClone(data)
    },
    // 查看按钮点击事件
    view(data) {
      // 弹窗的类型：edit
      this.dialogInfo.type = 'view'
      // 默认弹窗的标题：修改
      this.dialogInfo.title = this.$t('table.view')
      // 弹窗是否显示
      this.dialogInfo.visible = true
      // 弹窗的保存按钮是否显示
      this.dialogInfo.btList[1].show = false
      // 绑定弹窗保存事件：editSave
      // this.dialogInfo.btList[1].event = 'editSave';
      this.viewID = data.id
      // 封装的修改表单的数据化配置
      this.diaFormInfoViewFieldList()
      // 为弹窗表单对应的字段赋值
      this.diaFormInfo.data = this.$deepClone(data)
    },
    // 删除按钮点击事件
    delete(data) {
      this.$confirm(this.$t('comm.deleteMsg'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'deleteData', { 'id': data.id }).then(() => {
          const resp = this.$store.state[this.modName].deleteResp
          if (resp.code === this.$store.state[this.modName].successCode) {
            this.findPageList()
          }
        })
      })
    },
    // 新增保存事件
    saveAdd() {
      this.diaFormInfo.ref.validate(valid => {
        if (valid) {
          this.$store.dispatch(this.store + 'saveData', this.diaFormInfo.data).then(() => {
            const resp = this.$store.state[this.modName].addResp
            if (resp.code === this.$store.state[this.modName].successCode) {
              this.dialogInfo.visible = false
              this.findPageList()
            }
          })
        }
      })
    },
    // 编辑保存事件
    editSave() {
      this.diaFormInfo.ref.validate(valid => {
        if (valid) {
          this.$store.dispatch(this.store + 'editData', this.diaFormInfo.data).then(() => {
            const resp = this.$store.state[this.modName].editResp
            if (resp.code === this.$store.state[this.modName].successCode) {
              this.dialogInfo.visible = false
              this.findPageList()
            }
          })
        }
      })
    },
    // 导出
    exportParam(data) {
      // let time = new Date();
      // let month = time.getMonth() + 1;
      // let fullYear = time.getFullYear().toString().substring(2, 4);
      // this.exportName = '收衣订单' + fullYear + month + time.getHours() + time.getMinutes() + time.getMilliseconds();
      // this.exportName = '收衣订单';
      this.topForm.ref.validate(valid => {
        if (valid) {
          data.callback(this.topForm.data)
        }
      })
    }
  },

  // 页面初始化函数
  created() {
    this.findPageList()
  }
}
