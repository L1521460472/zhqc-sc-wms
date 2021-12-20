// 自定义事件处理
import { getLodop } from '../../../../../utils/LodopFuncs'

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
      this.topForm.data.pickOrderNo = null
      this.topForm.data.pickOrderStatus = null
      this.topForm.data.pickType = null
      this.topForm.data.pickWay = null
      this.topForm.data.waveNo = null
      this.topForm.data.createTimeBegin = null
      this.topForm.data.createTimeEnd = null
      this.topForm.data.pickStartTime = null
      this.topForm.data.pickEndTime = null
      this.topForm.data.ownerId = null
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

      this.pickDtQuery.pickOrderId = data.id
      this.pickSoAssignQuery.pickOrderId = data.id
      this.pickInfoQuery.pickOrderId = data.id
      this.pickSowQuery.pickOrderId = data.id
      this.queryRowData(data)
      this.initDataDt(this.pickDtQuery)
      this.initDataPickSoAssign(this.pickSoAssignQuery)
      this.initDataPickInfo(this.pickInfoQuery)
      this.initDataPickSow(this.pickSowQuery)
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
          this.listTypeInfo.pickOrderStatusList = resp.obj.pickOrderStatusList
          this.listTypeInfo.pickTypeList = resp.obj.pickTypeList
          this.listTypeInfo.pickWayList = resp.obj.pickWayList
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

    /** *************************************拣货单明细分页begin*****************************************/
    /**
     * 初始化查询拣货单明细
     */
    initDataDt(data) {
      // 默认查询第一页
      this.$setPageLimitDt(this.pageRequestDt, data)
      this.queryPickDtTableData(data)
    },
    /**
     * 查询拣货单明细分页
     * @param val
     */
    pageDtChange(val) {
      this.$setPageChangeDt(val, this.pageRequestDt, this.pickDtQuery)
      this.queryPickDtTableData(this.pickDtQuery)
    },
    /**
     * 查询明细
     * @param data
     */
    queryPickDtTableData(data) {
      this.$showLoading()
      this.$store.dispatch(this.store + 'queryPickDt', data).then(() => {
      }).finally(() => {
        this.$hideLoading()
      })
    },
    /** *************************************拣货单明细分页end*****************************************/

    /** *************************************拣货单SO分配明细begin*****************************************/
    /**
     * 初始化查询拣货单SO分配明细
     */
    initDataPickSoAssign(data) {
      // 默认查询第一页
      this.$setPageLimitDt(this.pageRequestPickSoAssign, data)
      this.queryPickSoAssignTableData(data)
    },
    /**
     * 查询拣货单SO分配明细分页
     * @param val
     */
    pagePickSoAssignChange(val) {
      this.$setPageChangeDt(val, this.pageRequestPickSoAssign, this.pickSoAssignQuery)
      this.queryPickSoAssignTableData(this.pickSoAssignQuery)
    },
    /**
     * 查询拣货单SO分配明细
     * @param data
     */
    queryPickSoAssignTableData(data) {
      this.$showLoading()
      this.$store.dispatch(this.store + 'queryPickSoAssign', data).then(() => {
      }).finally(() => {
        this.$hideLoading()
      })
    },
    /** *************************************拣货单SO分配明细end*****************************************/

    /** *************************************拣货记录分页begin*****************************************/

    /**
     * 初始化查询拣货记录数据
     */
    initDataPickInfo(data) {
      // 默认查询第一页
      this.$setPageLimitDt(this.pageRequestPickInfo, data)
      this.queryPickInfoTableData(data)
    },
    /**
     * 查询拣货记录分页
     * @param val
     */
    pagePickInfoChange(val) {
      this.$setPageChangeDt(val, this.pageRequestPickInfo, this.pickInfoQuery)
      this.queryPickInfoTableData(this.pickInfoQuery)
    },
    /**
     * 查询拣货记录
     * @param data
     */
    queryPickInfoTableData(data) {
      this.$showLoading()
      this.$store.dispatch(this.store + 'queryPickInfo', data).then(() => {
      }).finally(() => {
        this.$hideLoading()
      })
    },
    /** *************************************拣货记录分页end*****************************************/

    /** *************************************拣货播种分页begin*****************************************/
    /**
     * 初始化查询拣货播种数据
     */
    initDataPickSow(data) {
      // 默认查询第一页
      this.$setPageLimitDt(this.pageRequestPickSow, data)
      this.queryPickSowTableData(data)
    },
    /**
     * 查询拣货播种分页
     * @param val
     */
    pagePickSowChange(val) {
      this.$setPageChangeDt(val, this.pageRequestPickSow, this.pickSowQuery)
      this.queryPickSowTableData(this.pickSowQuery)
    },
    /**
     * 查询拣货播种
     * @param data
     */
    queryPickSowTableData(data) {
      this.$showLoading()
      this.$store.dispatch(this.store + 'queryPickSow', data).then(() => {
      }).finally(() => {
        this.$hideLoading()
      })
    },
    /** *************************************拣货播种分页end*****************************************/

    /**
     * 打印print
     * @param data
     */
    print() {
      const printList = this.printList
      const paramList = []

      if (printList.length == 0) {
        this.$message.error('请选中需要打印的拣货单')
        return
      }

      for (let i = 0; i < printList.length; i++) {
        paramList.push(printList[i].id)
      }
      this.$store.dispatch(this.store + 'print', paramList).then(() => {
        const printResp = this.$store.state[this.modName].printResp
        if (printResp.code === this.$successCode) {
          const printList = printResp.obj
          for (let i = 0; i < printList.length; i++) {
            const res = printList[i]
            const LODOP = getLodop()
            LODOP.SET_PRINT_MODE('POS_BASEON_PAPER', true)
            LODOP.PRINT_INIT('打印快递面单')
            LODOP.ADD_PRINT_HTM(10, 10, 'RightMargin:1mm', 'BottomMargin:1mm', res)
            LODOP.SET_PRINT_STYLEA(0, 'ShowBarText', 0)
            LODOP.SET_PRINT_PAGESIZE(1, 2100, 2970)
            LODOP.PRINT()
          }
        }
      })
    },
    // 打印快递面单   yuan
    printTheExpressWaybill() {
      const printList = this.printList
      const paramList = []

      if (printList.length == 0) {
        this.$message.error('请选中需要打印快递面单的拣货单')
        return
      }
      for (let i = 0; i < printList.length; i++) {
        paramList.push(printList[i].id)
      }
      this.$store.dispatch(this.store + 'printTheExpressWaybill', paramList).then(() => {

      })
    }

  },
  // 页面初始化函数
  created() {
    this.initData()
    this.initPage()
  }
}
