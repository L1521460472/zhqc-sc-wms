
// 自定义事件处理
import {
  updateEvidence
} from '../api'
export default {
  methods: {
    /**
         * 初始化数据
         */
    initData() {
      // 默认查询第一页
      this.$setPageLimit(this.pageRequest, this.topForm.data)
      this.setCustomerQuery()
      this.queryTableData(this.topForm.data)
    },
    /**
         * 自定义查询条件
         */
    setCustomerQuery() {

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
      this.topForm.data.asnNo = null
      this.topForm.data.ownerId = null
      this.topForm.data.origNo = null
      this.topForm.data.asnSource = null
      this.topForm.data.scAsnType = null
      this.topForm.data.scBusinessType = null
      this.topForm.data.asnStatus = null
      // this.topForm.data.ownerId = null
      this.topForm.data.supplierId = null
      this.topForm.data.skuId = null
      this.topForm.data.expArrivalTimeStart = null
      this.topForm.data.expArrivalTimeEnd = null
      this.topForm.data.instoreDateStart = null
      this.topForm.data.instoreDateEnd = null
      this.topForm.data.recMode = null
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
      this.diaFormInfo.addDtBtnShow = false

      // 封装的修改表单的数据化配置
      this.diaFormInfoViewFieldList()
      // this.diaFormInfo.dtTableInfo.handle.fixed = 'none'
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

      this.diaFormInfo.addDtBtnShow = true
      // 绑定弹窗保存事件：saveAdd
      this.dialogInfo.btList[1].event = 'saveData'
      this.diaFormInfo.dtTableInfo.handle.fixed = 'right'
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
      this.diaFormInfo.dtTableInfo.handle.fixed = 'right'
      this.diaFormInfo.dtTableInfo.handle.btList[0].disabled = false
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
        const resp = this.$store.state[this.modName].initPageObj
        if (resp.code === this.$store.state[this.modName].successCode) {
          this.listTypeInfo.asnSourceList = resp.obj.asnSourceList
          this.listTypeInfo.scAsnTypeList = resp.obj.scAsnTypeList
          this.listTypeInfo.scBusinessTypeList = resp.obj.scBusinessTypeList
          this.listTypeInfo.asnStatusList = resp.obj.asnStatusList
          this.listTypeInfo.recInfoTypeList = resp.obj.recInfoTypeList
          this.listTypeInfo.recModeTypeList = resp.obj.recModeTypeList
          this.listTypeInfo.skuQualityList = resp.obj.skuQualityList
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
        const result = this.$store.state[this.modName].initUpdateObj
        this.diaFormInfo.data = result?.entity ?? {}
        this.diaFormInfo.dtTableInfo.data = result?.dtList ?? []
        result?.dtList.map((item, index) => {
          if (item.goodPercent === 0) {
            this.diaFormInfo.dtTableInfo.data[index].badPercent = null
          } else {
            this.diaFormInfo.dtTableInfo.data[index].badPercent = (1 - item.goodPercent).toFixed(4) * 100 + '%'
          }
        })
        this.imgInfo.pictureList = JSON.parse(result.entity.evidence)
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
            this.$message.error('请添加订单明细')
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
      console.log(this.diaFormInfo.data)
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
         * 删除收货明细
         * @param data
         */
    deleteDt(data) {
      this.$confirm(this.$t('确认删除选中的记录么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'deleteDt', { 'id': data.id }).then(() => {
          const resp = this.$store.state[this.modName].deleteDtResp
          if (resp.code === this.$successCode) {
            this.diaFormInfo.dtTableInfo.data.splice(data.$rowIndex, 1)
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
    openAddDtPage() {
      this.dialogInfoDt.visible = true
      this.diaFormInfoDt.data = {
        skuCode: null,
        skuName: null,
        spec: null,
        unit: null,
        drugForm: null
      }
    },
    closeAddDtPage() {
      this.dialogInfoDt.visible = false
      this.diaFormInfoDt.data = {}
    },

    saveDt() {
      this.diaFormInfoDt.ref.validate(valid => {
        if (valid) {
          for (let i = 0; i < this.diaFormInfo.dtTableInfo.data.length; i++) {
            const exist = this.diaFormInfo.dtTableInfo.data[i]
            if (exist.skuCode == this.diaFormInfoDt.data.skuCode) {
              this.$message.error('产品编码已存在，保存失败')
              return
            }
          }
          const data = {
            skuId: this.diaFormInfoDt.data.skuId,
            skuCode: this.diaFormInfoDt.data.skuCode,
            skuName: this.diaFormInfoDt.data.skuName,
            spec: this.diaFormInfoDt.data.spec,
            drugForm: this.diaFormInfoDt.data.drugForm,
            mainUnit: this.diaFormInfoDt.data.mainUnit
          }
          this.diaFormInfo.dtTableInfo.data.push(data)
          this.closeAddDtPage()
        }
      })
    },
    /**
         * 打开PC扫描收货页面
         */
    openRecAcceptancePage() {
      this.$store.dispatch(this.store + 'setData', { page: 'recAcceptanceResp', visible: true })
    },
    /**
         * 打开PC退货收货页面
         */
    openReturnRecAcceptancePage() {
      this.$store.dispatch(this.store + 'setData', { page: 'returnRecAcceptanceResp', visible: true })
    },

    /**
         * 完成收货
         * @param data
         */
    completeAsn(data) {
      this.$confirm(this.$t('确认该ASN已完成收货么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'completeAsn', data.id).then(() => {
          const resp = this.$store.state[this.modName].completeAsnResp
          if (resp.code === this.$successCode) {
            this.queryTableData(this.topForm.data)
          }
        })
      })
    },
    /**
         * 取消
         * @param data
         */
    cancel(data) {
      this.$confirm(this.$t('确认该ASN取消么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'cancel', data.id).then(() => {
          const resp = this.$store.state[this.modName].cancelResp
          if (resp.code === this.$successCode) {
            this.queryTableData(this.topForm.data)
          }
        })
      })
    },
    handleImgSuccess(list) {
      // this.pictureIdList = list
      console.log(this.diaFormInfo.data.asnNo)
      this.imgInfo.pictureList = list
      this.diaFormInfo.data.evidence = list
      const params = {
        'asnNo': this.diaFormInfo.data.asnNo,
        'evidenceList': list
      }
      updateEvidence(params)
    },
    handleRemove(list) {
      console.log(list)
      this.imgInfo.pictureList = list
      this.diaFormInfo.data.evidence = list
      const params = {
        'asnNo': this.diaFormInfo.data.asnNo,
        'evidenceList': list
      }
      updateEvidence(params)
    }
  },
  // 页面初始化函数
  created() {
    this.initData()
    this.initPage()
  }
}
