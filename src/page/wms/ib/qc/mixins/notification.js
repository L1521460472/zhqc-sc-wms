import { getLodop } from '../../../../../utils/LodopFuncs'

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
      this.topForm.data.qcNo = null
      this.topForm.data.asnNo = null
      this.topForm.data.qcStatus = null
      this.topForm.data.ownerId = null
      this.topForm.data.skuId = null
      this.topForm.data.origNo = null
      this.topForm.data.checkUserName = null
      this.topForm.data.auditUserName = null
      this.topForm.data.checkTimeBegin = null
      this.topForm.data.checkTimeEnd = null
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
      // 隐藏明细列表操作按钮
      this.diaFormInfo.subTableInfo.handle.fixed = 'none'
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
      // 展示明细列表操作按钮
      this.diaFormInfo.subTableInfo.handle.fixed = 'right'
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
        const resp = this.$store.state[this.modName].initPageResp
        if (resp.code === this.$store.state[this.modName].successCode) {
          this.listTypeInfo.qcStatusList = resp.obj.qcStatusList
          this.listTypeInfo.asnStatusList = resp.obj.asnStatusList
          this.listTypeInfo.qcDtResultList = resp.obj.qcDtResultList

          // 设置,列表可编辑,下拉框值
          this.setVxeData()
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
         * 一键验收
         * @param data
         */
    allAcceptance(data) {
      this.$confirm(this.$t('确认一键验收吗？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'allAcceptance', data).then(() => {
          const resp = this.$store.state[this.modName].allAcceptanceResp
          if (resp.code === this.$successCode) {
            this.queryTableData(this.topForm.data)
          }
        })
      })
    },

    /**
         * 审核
         * @param data
         */
    audit(data) {
      this.$confirm(this.$t('确认审核吗？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'audit', data).then(() => {
          const resp = this.$store.state[this.modName].auditResp
          if (resp.code === this.$successCode) {
            this.queryTableData(this.topForm.data)
          }
        })
      })
    },

    /**
         * 打开验收页面
         */
    openAcceptancePage() {
      this.$store.dispatch(this.store + 'setData', { page: 'acceptanceResp', visible: true })
    },

    /**
         * 设置,列表可编辑,下拉框值
         */
    setVxeData() {
      const qcDtResultList = this.listTypeInfo.qcDtResultList
      for (var i = 0; i < qcDtResultList.length; i++) {
        const item = {
          label: qcDtResultList[i].key,
          value: qcDtResultList[i].value
        }
        this.listTypeInfo.vxeQcDtResultList.push(item)
      }
    },

    /**
         * 明细取消验收
         * @param data
         */
    dtCancelQc(data) {
      this.$confirm(this.$t('确认取消验收选中记录么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'dtCancelQc', data).then(() => {
          const resp = this.$store.state[this.modName].dtCancelQcResp
          if (resp.code === this.$successCode) {
            this.queryRowData(this.diaFormInfo.data)
            // this.initData();
          }
        })
      })
    },

    /**
         * 取消
         * @param data
         */
    cancel(data) {
      this.$confirm(this.$t('确认取消选中记录么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'cancel', data).then(() => {
          const resp = this.$store.state[this.modName].cancelResp
          if (resp.code === this.$successCode) {
            this.queryTableData(this.topForm.data)
          }
        })
      })
    },

    /**
         * 打印print
         * @param data
         */
    print(data) {
      const paramList = []
      paramList.push(data.id)
      this.$store.dispatch(this.store + 'print', paramList).then(() => {
        const printResp = this.$store.state[this.modName].printResp
        if (printResp.code === this.$successCode) {
          const printList = printResp.obj
          for (let i = 0; i < printList.length; i++) {
            const res = printList[i]
            const LODOP = getLodop()
            LODOP.SET_PRINT_MODE('POS_BASEON_PAPER', true)
            LODOP.PRINT_INIT('打印验收单')
            LODOP.ADD_PRINT_HTM(10, 10, 'RightMargin:1mm', 'BottomMargin:1mm', res)
            LODOP.SET_PRINT_STYLEA(0, 'ShowBarText', 0)
            LODOP.SET_PRINT_PAGESIZE(1, 2410, 930)
            LODOP.PREVIEW()
          }
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
