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
      this.topForm.data.jobName = null
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
        this.listTypeInfo.enableList = obj.enableList
        this.listTypeInfo.execIntervalList = obj.execIntervalList
        this.listTypeInfo.freqTypeList = obj.freqTypeList
        this.listTypeInfo.freqValueMonthList = obj.freqValueMonthList
        this.listTypeInfo.freqValueWeekList = obj.freqValueWeekList
        this.listTypeInfo.jobCategoryList = obj.jobCategoryList
        this.listTypeInfo.jobTypeList = obj.jobTypeList
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
        const paramList = this.$store.state[this.modName].initUpdateObj.paramList
        this.initParamForm(paramList, this.diaFormInfo.data.parameter)
        this.initfreqTypeList()
        if (this.dialogInfo.type == 'edit') {
          if (this.diaFormInfo.data.jobType == 'ONCE') {
            this.diaFormInfo.onceDisabled = false
            this.diaFormInfo.cycleDisabled = true
            this.diaFormInfo.fieldList[9].disabled = true
          } else {
            this.diaFormInfo.onceDisabled = true
            this.diaFormInfo.cycleDisabled = false
            this.diaFormInfo.fieldList[9].disabled = false
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
          if (this.diaFormInfo.diaParamFormInfo.ref) {
            this.diaFormInfo.diaParamFormInfo.ref.validate(valid => {
              if (valid) {
                this.$showLoading()
                let parameter = '{}'
                if (this.diaFormInfo.diaParamFormInfo.data) {
                  parameter = JSON.stringify(this.diaFormInfo.diaParamFormInfo.data)
                }
                this.diaFormInfo.data.parameter = parameter
                this.$store.dispatch(this.store + 'saveData', this.diaFormInfo.data).then(() => {
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
          } else {
            this.$showLoading()
            let parameter = '{}'
            if (this.diaFormInfo.diaParamFormInfo.data) {
              parameter = JSON.stringify(this.diaFormInfo.diaParamFormInfo.data)
            }
            this.diaFormInfo.data.parameter = parameter
            this.$store.dispatch(this.store + 'saveData', this.diaFormInfo.data).then(() => {
              const resp = this.$store.state[this.modName].addResp
              if (resp.code === this.$successCode) {
                this.dialogInfo.visible = false
                this.initData()
              }
            }).finally(() => {
              this.$hideLoading()
            })
          }
        }
      })
    },
    /**
     * 编辑数据
     */
    editData() {
      this.diaFormInfo.ref.validate(valid => {
        if (valid) {
          if (this.diaFormInfo.diaParamFormInfo.ref) {
            this.diaFormInfo.diaParamFormInfo.ref.validate(valid => {
              if (valid) {
                this.$showLoading()
                let parameter = '{}'
                if (this.diaFormInfo.diaParamFormInfo.data) {
                  parameter = JSON.stringify(this.diaFormInfo.diaParamFormInfo.data)
                }
                this.diaFormInfo.data.parameter = parameter
                this.$store.dispatch(this.store + 'editData', this.diaFormInfo.data).then(() => {
                  const resp = this.$store.state[this.modName].editResp
                  if (resp.code === this.$successCode) {
                    this.dialogInfo.visible = false
                    this.initData()
                  }
                }).finally(() => {
                  this.$hideLoading()
                })
              }
            })
          } else {
            this.$showLoading()
            let parameter = '{}'
            if (this.diaFormInfo.diaParamFormInfo.data) {
              parameter = JSON.stringify(this.diaFormInfo.diaParamFormInfo.data)
            }
            this.diaFormInfo.data.parameter = parameter
            this.$store.dispatch(this.store + 'editData', this.diaFormInfo.data).then(() => {
              const resp = this.$store.state[this.modName].editResp
              if (resp.code === this.$successCode) {
                this.dialogInfo.visible = false
                this.initData()
              }
            }).finally(() => {
              this.$hideLoading()
            })
          }
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
        this.$showLoading()
        this.$store.dispatch(this.store + 'deleteData', { 'id': data.id }).then(() => {
          const resp = this.$store.state[this.modName].deleteResp
          if (resp.code === this.$successCode) {
            this.initData()
          }
        }).finally(() => {
          this.$hideLoading()
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
     * 表格选中事件
     * @param data
     */
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
    /**
     * 改变频率值
     * @param value
     */
    changeFreqType() {
      this.diaFormInfo.data.freqValue = null
      if (this.diaFormInfo.data.freqType == 'DAY') {
        this.diaFormInfo.fieldList[6].disabled = true
      } else if (this.diaFormInfo.data.freqType == 'WEEK') {
        this.diaFormInfo.fieldList[6].disabled = false
        this.diaFormInfo.fieldList[6].list = 'freqValueWeekList'
      } else if (this.diaFormInfo.data.freqType == 'MONTH') {
        this.diaFormInfo.fieldList[6].disabled = false
        this.diaFormInfo.fieldList[6].list = 'freqValueMonthList'
      }
    },
    initfreqTypeList() {
      if (this.diaFormInfo.data.freqType == 'WEEK') {
        this.diaFormInfo.fieldList[6].list = 'freqValueWeekList'
      } else if (this.diaFormInfo.data.freqType == 'MONTH') {
        this.diaFormInfo.fieldList[6].list = 'freqValueMonthList'
      } else {
        this.diaFormInfo.fieldList[6].list = ''
      }
    },
    // 改变任务类型
    changeJobCategoryEvent() {
      if (!this.diaFormInfo.data.jobCategory) {
        this.clearParamForm()
        return
      }
      const req = {
        jobCategory: this.diaFormInfo.data.jobCategory
      }
      this.$store.dispatch(this.store + 'queryByCategory', req).then(() => {
        const obj = this.$store.state[this.modName].paramObj
        this.initParamForm(obj)
      })
    },
    // 初始化参数表单
    initParamForm(paramList, data) {
      const array = []
      const rules = {}
      const disabled = this.dialogInfo.type == 'view'
      if (paramList) {
        paramList.forEach(item => {
          const field = {
            label: item.paramLabel,
            value: item.paramValue,
            type: item.paramType,
            disabled: disabled
          }
          array.push(field)
          if (item.isRequired && item.isRequired == 1) {
            rules[item.paramValue] = [{ required: true, message: '请录入' + item.paramLabel, trigger: 'change' }]
          }
        })
      }
      this.diaFormInfo.diaParamFormInfo.fieldList = array
      this.diaFormInfo.diaParamFormInfo.rules = rules
      this.resetParamFormData()
      if (data) {
        const paramObj = JSON.parse(data)
        for (const key of Object.keys(paramObj)) {
          this.$set(this.diaFormInfo.diaParamFormInfo.data, key, paramObj[key])
        }
        const that = this
        setTimeout(function() {
          that.waveModelId = that.diaFormInfo.diaParamFormInfo.data.waveModelId
        }, 200)
      }
    },
    // 清空参数表单
    clearParamForm() {
      this.diaFormInfo.diaParamFormInfo.fieldList = []
      this.diaFormInfo.diaParamFormInfo.rules = {}
    },
    enableEvent(data) {
      this.$confirm('确认启用？', {
        type: 'warning',
        center: true
      }).then(() => {
        this.$showLoading()
        this.$store.dispatch(this.store + 'enable', { 'id': data.id }).then(() => {
          const resp = this.$store.state[this.modName].enableResp
          if (resp.code === this.$successCode) {
            this.initData()
          }
        })
      }).catch(() => {
      }).finally(() => {
        this.$hideLoading()
      })
    },
    deactivateEvent(data) {
      this.$confirm('确认停用？', {
        type: 'warning',
        center: true
      }).then(() => {
        this.$showLoading()
        this.$store.dispatch(this.store + 'deactivate', { 'id': data.id }).then(() => {
          const resp = this.$store.state[this.modName].deactivateResp
          if (resp.code === this.$successCode) {
            this.initData()
          }
        })
      }).catch(() => {
      }).finally(() => {
        this.$hideLoading()
      })
    },
    changeJobType() {
      this.diaFormInfo.data.onceTime = null
      this.diaFormInfo.data.execInterval = null
      this.diaFormInfo.data.cycleStartTime = null
      this.diaFormInfo.data.cycleEndTime = null
      if (!this.diaFormInfo.data.jobType) {
        this.diaFormInfo.onceDisabled = true
        this.diaFormInfo.cycleDisabled = true
        this.diaFormInfo.fieldList[9].disabled = true
      } else if (this.diaFormInfo.data.jobType == 'ONCE') {
        this.diaFormInfo.onceDisabled = false
        this.diaFormInfo.cycleDisabled = true
        this.diaFormInfo.fieldList[9].disabled = true
      } else {
        this.diaFormInfo.onceDisabled = true
        this.diaFormInfo.cycleDisabled = false
        this.diaFormInfo.fieldList[9].disabled = false
      }
    },
    openLogPage(data) {
      const req = {
        id: data.id,
        jobName: data.jobName,
        page: 'jobExecLogPage',
        visible: true
      }
      this.$store.dispatch(this.store + 'setData', req)
    }

  },
  // 页面初始化函数
  created() {
    this.initData()
    this.initPage()
    this.resetFormData()
    this.resetParamFormData()
  }
}
