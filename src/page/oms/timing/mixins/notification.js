// 自定义事件处理
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
      // if(this.topForm.data.expOutTimeBegin){
      //   this.topForm.data.expOutTimeBegin=formatDate(new Date(Date.parse(this.topForm.data.expOutTimeBegin)), 'yyyy-MM-dd');
      // }
      // if(this.topForm.data.expOutTimeEnd){
      //   this.topForm.data.expOutTimeEnd=formatDate(new Date(Date.parse(this.topForm.data.expOutTimeEnd)), 'yyyy-MM-dd');
      // }
    },
    /**
     * 查询
     */
    search() {
      this.topForm.ref.validate(valid => {
        if (valid) { // 查询表单校验
          if (this.topForm.data.confirmTimeBegin) {
            this.topForm.data.confirmTimeBegin = this.topForm.data.confirmTimeBegin + ' 00:00:00'
          }
          if (this.topForm.data.confirmTimeEnd) {
            this.topForm.data.confirmTimeEnd = this.topForm.data.confirmTimeEnd + ' 00:00:00'
          }
          this.initData()
        }
      })
    },
    /**
     * 重置
     */
    reboot() {
      this.topForm.data.carrierOrderNo = null
      this.topForm.data.carrierSysCode = null
      this.topForm.data.customerOrderNo = null
      this.topForm.data.orderType = null
      this.topForm.data.scOrderNo = null
      this.topForm.data.orderStatus = null
      this.topForm.data.executionStatus = null
      this.topForm.data.whId = null
      this.topForm.data.confirmTimeBegin = null
      this.topForm.data.confirmTimeEnd = null
    },
    // 添加展开收起表单功能
    openCollapsable() {
      this.collapsable = !this.collapsable
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
      this.queryRowData(data)
      this.diaFormInfo.dtTableInfo.topBtn.show = false
      this.diaFormInfo.dtTableInfo.handle.btList[0].disabled = true
      // 为弹窗表单对应的字段赋值
      // this.diaFormInfo.data = this.$deepClone(data);
      this.diaFormInfo.rules = {}
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
      this.diaFormInfo.dtTableInfo.handle.btList[0].disabled = false
      this.diaFormInfo.dtTableInfo.topBtn.show = true
      this.rulesInit()
      // 封装的新增表单的数据化配置
      this.diaFormInfoAddFieldList()
      // 新增页面的下拉列表的数据
      // this.diaFormInfoAddFieldListData();
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
      this.rulesInit()
      // 为弹窗表单对应的字
      // 段赋值
      // this.diaFormInfo.data = this.$deepClone(data);
      this.queryRowData(data)
      this.diaFormInfo.dtTableInfo.topBtn.show = true
      this.diaFormInfo.dtTableInfo.handle.btList[0].disabled = false
      this.diaFormInfo.dtTableInfo.deleteIds = []
    },
    /**
     * 关闭页面
     */
    close() {
      this.provinceId = null
      this.cityId = null
      this.dialogInfo.visible = false
    },

    /**
     * 点击新增  获取列表数据
     */
    // diaFormInfoAddFieldListData() {
    //
    // },

    /**
     * 页面初始化
     */
    initPage() {
      this.$store.dispatch(this.store + 'initPage', {}).then(() => {
        const obj = this.$store.state[this.modName].initPageObj
        this.listTypeInfo.carrierCode = obj.carrier_code
        this.listTypeInfo.executionStatus = obj.execution_status
        this.listTypeInfo.orderType = obj.order_type
      })
    },

    /**
     * 重置非正常结束的任务
     *
     * @param {*} taskId
     */
    resetUnusualStop(taskId) {
      this.$showLoading()
      this.$store.dispatch(this.store + 'resetUnusualStop', taskId).then(() => {
        const resp = this.$store.state[this.modName].resetUnusualStop
        if (resp.code === this.$successCode) {
          this.initData()
        }
      }).finally(() => {
        this.$hideLoading()
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
      this.receivingProvince = null
      this.receivingCity = null

      this.$store.dispatch(this.store + 'initUpdate', data.id).then(() => {
        const resp = this.$store.state[this.modName].initUpdateObj
        const obj = this.$store.state[this.modName].initUpdateObj.entity
        this.receivingProvince = Number(obj.receivingProvince)
        this.receivingCity = Number(obj.receivingCity)
        this.diaFormInfo.data = obj
        this.diaFormInfo.data.reissue = Number(obj.reissue)
        this.diaFormInfo.data.responsibility = Number(obj.responsibility)
        this.diaFormInfo.data.payWay = Number(obj.payWay)
        this.diaFormInfo.data.receivingProvince = Number(obj.receivingProvince)
        this.diaFormInfo.data.receivingCity = Number(obj.receivingCity)
        this.diaFormInfo.data.receivingArea = Number(obj.receivingArea)
        this.diaFormInfo.data.carrierName = resp.carrierName
        this.diaFormInfo.dtTableInfo.data = this.$store.state[this.modName].initUpdateObj.dtList
        // 店铺名称 id 转为 value 来显示
        if (obj.storeName) {
          this.$store.dispatch(this.store + 'viewStoreName', obj.storeName).then(() => {
            const obj = this.$store.state[this.modName].viewStoreNameResp.entity
            this.diaFormInfo.data.storeName = obj.shortName
          })
        }
        // 收货方 id 转为 value 来显示  consignee
        if (obj.consignee) {
          this.$store.dispatch(this.store + 'viewConsignee', obj.consignee).then(() => {
            const vieConsigneeObj = this.$store.state[this.modName].vieConsigneeResp
            this.diaFormInfo.data.consignee = vieConsigneeObj.whName
          })
        }
        // 发货方 id 转为 value 来显示  shipper
        if (obj.shipper) {
          this.$store.dispatch(this.store + 'viewConsignee', obj.shipper).then(() => {
            const vieConsigneeObj = this.$store.state[this.modName].vieConsigneeResp
            this.diaFormInfo.data.shipper = vieConsigneeObj.whName
          })
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
      // this.diaFormInfo.ref.validate(valid => {
      //     this.$showLoading();
      //   if (valid) {
      //     if(!this.diaFormInfo.dtTableInfo.data || this.diaFormInfo.dtTableInfo.data.length==0){
      //       this.$message.error("请添加订单明细");
      //         this.$hideLoading();
      //       return;
      //     }
      //     this.diaFormInfo.data.dtList=this.diaFormInfo.dtTableInfo.data;
      //     this.$store.dispatch(this.store + 'saveData', this.diaFormInfo.data).then(() => {
      //       let resp = this.$store.state[this.modName].addResp;
      //       if (resp.code === this.$successCode) {
      //         this.dialogInfo.visible = false;
      //         this.initData();
      //       }
      //     }).finally(()=>{
      //       this.$hideLoading();
      //     });
      //   } else {
      //       this.$hideLoading();
      //   }
      // });
    },
    /**
     * 编辑数据
     */
    editData() {
    },
    /**
     * 删除数据
     * @param data
     */
    deleteData() {
      // this.$confirm(this.$t('确认删除选中的记录么？'), {
      //   type: 'warning',
      //   center: true
      // }).then(() => {
      //   this.$store.dispatch(this.store + 'deleteData', {'id': data.id}).then(() => {
      //     let resp = this.$store.state[this.modName].deleteResp;
      //     if (resp.code === this.$successCode) {
      //         this.queryTableData(this.topForm.data);
      //     }
      //   });
      // });
    },
    /**
     * 导出数据
     */
    exportData() {
    //  this.topForm.ref.validate(valid => {
    //     if (valid) {
    //       this.$showLoading();
    //       data.callback(this.topForm.data);
    //       this.$hideLoading()
    //     }
    //   })
    },
    // 打开明细弹窗
    openAddDtPage() {

    },
    // 关闭添加明细弹窗
    closeAddDtPage() {
      this.dialogInfoDt.visible = false
      this.diaFormInfoDt.data = {}
    },
    // 保存明细
    saveDt() {

    },

    // 生成so
    handleCreateSo() {

    },
    // 表格里的勾选框
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
    }

  },
  // 页面初始化函数
  created() {
    this.initData()
    this.initPage()
  }
}
