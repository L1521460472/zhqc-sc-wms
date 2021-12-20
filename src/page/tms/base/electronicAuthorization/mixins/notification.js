import { message } from '@/utils/messageUtils.js'
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
      this.topForm.data.ownerName = null
      this.topForm.data.ownerCode = null
      this.topForm.data.customerCode = null
      this.topForm.data.customerName = null
      this.topForm.data.authorizedPerson = null
      this.topForm.data.contactDetails = null
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
      this.pictureList = []

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
        const result = this.$store.state[this.modName].initPageObj
        this.listTypeInfo.isEnableList = result.isEnable
      })
      this.queryOwnerList()
      this.queryCustomList()
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
        this.pictureList = this.diaFormInfo.data.authorizationLetterList || []
      })
    },
    /**
     * 新增数据
     */
    saveData() {
      const params = {
        ...this.diaFormInfo.data,
        authorizationLetterList: this.pictureList
      }

      this.diaFormInfo.ref.validate(valid => {
        if (valid) {
          const { startDate, endDate } = this.diaFormInfo.data
          var start = new Date(startDate)
          var end = new Date(endDate)
          if (end.getTime() >= start.getTime()) {
            this.$store.dispatch(this.store + 'saveData', params).then(() => {
              const resp = this.$store.state[this.modName].addResp
              if (resp.code === this.$successCode) {
                this.dialogInfo.visible = false
                this.initData()
              }
            })
          } else {
            message.error('结束日期不得小于起始日期')
            return
          }
        }
      })
    },
    /**
     * 编辑数据
     */
    editData() {
      const params = {
        ...this.diaFormInfo.data,
        authorizationLetterList: this.pictureList
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
     * 停用数据
     * @param data
     */
    stopData(data) {
      this.$confirm(this.$t('确认停用选中的记录么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'deactivate', { 'id': data.id }).then(() => {
          const resp = this.$store.state[this.modName].deactivateResp
          if (resp.code === this.$successCode) {
            this.initData()
          }
        })
      })
    },
    /**
     * 起用数据
     * @param data
     */

    beginData(data) {
      this.$confirm(this.$t('确认启用选中的记录么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'enable', { 'id': data.id }).then(() => {
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
    },
    // 货主列表
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
    // 收获方列表
    queryCustomList() {
      this.$store.dispatch(this.store + 'queryCustomWh', {}).then(() => {
        const resp = this.$store.state[this.modName].customListResp
        // if (resp.code === this.$store.state[this.modName].successCode) {
        const arr = []
        resp.obj.forEach((item) => {
          arr.push({ key: item.customerName, value: item.customerCode })
        })
        this.listTypeInfo.customList = arr

        // }
      })
    }
  },
  // 页面初始化函数
  created() {
    this.initData()
    this.initPage()
  }
}
