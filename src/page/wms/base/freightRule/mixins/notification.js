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
      this.topForm.data.name = null
      this.topForm.data.partnerId = null
      this.topForm.data.province = null
      this.topForm.data.city = null
      this.topForm.data.area = null
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

      this.diaFormInfo.title = '查看运费规则'
      this.diaFormInfo.subTableInfo.topBtn.show = false
      this.diaFormInfo.subTableInfo.handle = null
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
      // this.diaFormInfo.subTableInfo.handle.fixed = 'right';
      this.diaFormInfo.title = '新增运费规则'
      // 封装的新增表单的数据化配置
      this.diaFormInfoAddFieldList()
      // 明细添加、删除按钮
      this.handleCollocation()
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
      this.diaFormInfo.subTableInfo.topBtn.show = true
      this.diaFormInfo.subTableInfo.handle = null
      this.diaFormInfo.title = '编辑运费规则'
      // this.editID = data.id;
      // 封装的修改表单的数据化配置
      this.diaFormInfoEditFieldList()
      // 为弹窗表单对应的字段赋值
      // this.diaFormInfo.data = this.$deepClone(data);
      this.queryRowData(data)
      // 明细添加、删除按钮
      this.handleCollocation()
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
        const resp = this.$store.state[this.modName].initPageObj
        if (resp.code === this.$store.state[this.modName].successCode) {
          this.listTypeInfo.provinceList = resp.obj.provinceList
          this.initData()
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
        this.provinceId = this.diaFormInfo.data.provinceId
        this.cityId = this.diaFormInfo.data.cityId
        if (this.diaFormInfo.ref) {
          this.diaFormInfo.ref.clearValidate()
        }
      })
    },
    /**
         * 新增数据
         */
    saveData() {
      this.validateFun('saveData')
    },
    /**
         * 编辑数据
         */
    editData() {
      this.validateFun('editData')
    },
    /**
         * 删除数据
         * @param data
         */
    deleteData(data) {
      this.$confirm(this.$t('确定要删除当前运费档案吗？'), {
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
    // 明细添加、删除按钮
    handleCollocation() {
      this.diaFormInfo.subTableInfo.handle = {
        fixed: 'right',
        label: '操作',
        width: '100',
        btList: [
          // 默认修改按钮
          { label: this.$t('table.delete'), icon: '', event: 'subDelete', show: true }// event值为notification.js中定义的方法名
        ]
      }
      this.diaFormInfo.subTableInfo.topBtn.show = true
    },
    // 明细数据校验
    async validateFun(url) {
      this.$showLoading()
      const that = this
      let isValid = null
      this.diaFormInfo.ref.validate(valid => {
        isValid = valid
      })
      if (!isValid) {
        this.$hideLoading()
        return
      }
      const errMap = await that.diaFormInfo.subTableInfo.ref.validate().catch(errMap => errMap)
      if (errMap) {
        this.$message.error('校验不通过！')
        this.$hideLoading()
      } else {
        if (url === 'editData') {
          this.$confirm(this.$t('确认修改运费规则【' + this.diaFormInfo.data.name + '】么？'), {
            type: 'warning',
            center: true
          }).then(() => {
            this.$store.dispatch(this.store + url, this.diaFormInfo.data).then(() => {
              const resp = this.$store.state[this.modName].editResp
              if (resp.code === this.$successCode) {
                this.dialogInfo.visible = false
                this.queryTableData(this.topForm.data)
              }
            }).finally(() => {
              this.$hideLoading()
            })
          })
        } else {
          this.$confirm(this.$t('确认新增运费规则【' + this.diaFormInfo.data.name + '】么？'), {
            type: 'warning',
            center: true
          }).then(() => {
            this.$store.dispatch(this.store + url, this.diaFormInfo.data).then(() => {
              const resp = this.$store.state[this.modName].addResp
              if (resp.code === this.$successCode) {
                this.dialogInfo.visible = false
                this.initData()
              }
            })
          }).finally(() => {
            this.$hideLoading()
          })
        }
      }
    },
    // 新增行
    addSub() {
      const subRecord = {}
      this.diaFormInfo.data.dtList.push(subRecord)
    },
    // 删除行
    subDelete(val) {
      this.diaFormInfo.data.dtList.splice(val.$rowIndex, 1)
    }
  },
  // 页面初始化函数
  created() {
    this.initData()
    this.initPage()
  }
}
