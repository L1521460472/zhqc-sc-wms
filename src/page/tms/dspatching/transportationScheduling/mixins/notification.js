// 自定义事件处理
export default {
  created() {
    this.initPage()
    this.initData()
    this.initDispatchData()
  },
  methods: {
    /* 页面初始化 */
    initPage() {
      this.$store.dispatch(this.store + 'initPage', {}).then(() => {
        const res = this.$store.state[this.modName].initPageObj
        if (res.code === this.$store.state[this.modName].successCode && res.obj) {
          this.listTypeInfo.transportType = res.obj.transportType.map(item => {
            item.label = item.key
            return item
          })
          this.listTypeInfo.transportWorkType = res.obj.transportWorkType.map(item => {
            item.label = item.key
            return item
          })
        }
      })
    },

    /* 初始化待调度列表 */
    initData() {
      return new Promise((resolve) => {
        if (this.validateTime()) {
          // 默认查询第一页
          this.$setPageLimit(this.pageRequest, this.topForm.data)
          this.queryTableData(this.topForm.data).then(() => {
            resolve()
          })
        }
      })
    },

    /**
     * 查询表格数据
     * @param data
     */
    queryTableData(data) {
      return new Promise((resolve) => {
        this.$showLoading()
        this.$store.dispatch(this.store + 'pageInfo', data).finally(() => {
          this.$hideLoading()
          resolve()
        })
      })
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

    /* 初始化调度列表 */
    initDispatchData() {
      return new Promise((resolve) => {
        // 默认查询第一页
        const params = {}
        this.$setPageLimit(this.pageRequest2, params)
        this.findDispatchData(params).then(() => {
          resolve()
        })
      })
    },

    /* 初始化调度列表 */
    findDispatchData(data) {
      return new Promise((resolve) => {
        this.$store.dispatch(this.store + 'findDispatch', data).then(() => {
          resolve()
        })
      })
    },

    /**
     * 翻页
     * @param val
     */
    async pageChange2(val) {
      if (await this.updateDispatch(this.resp2Data)) {
        // 设置页码值为val
        const params = {}
        this.$setPageChange(val, this.pageRequest2, params)
        this.findDispatchData(params)
      }
    },

    /* 查询 */
    search() {
      this.topForm.ref.validate(valid => {
        if (valid) { // 查询表单校验
          this.fold = true
          this.$nextTick(() => {
            this.fold = false
          })
          this.initData()
        }
      })
    },

    validateTime() {
      if (
        (this.topForm.data.createTimeBegin && !this.topForm.data.createTimeEnd) ||
        (!this.topForm.data.createTimeBegin && this.topForm.data.createTimeEnd) ||
        (this.topForm.data.receiveTimeBegin && !this.topForm.data.receiveTimeEnd) ||
        (!this.topForm.data.receiveTimeBegin && this.topForm.data.receiveTimeEnd)
      ) {
        this.$message.error('请输入时间区间')
        return false
      }
      return true
    },

    /* 重置 */
    reboot() {
      for (const key in this.topForm.data) {
        this.topForm.data[key] = null
      }
    },

    /* 加入调度 */
    async addDispatch() {
      // 发货方、货主、承运商和运输方式需一致
      let valid = true
      const list = [...JSON.parse(JSON.stringify(this.resp2Data)), ...JSON.parse(JSON.stringify(this.selections))]
      for (let i = 0; i < list.length; i++) {
        if (!list.some(item => list[i].senderCode === item.senderCode && list[i].ownerCode === item.ownerCode && list[i].carrierCode === item.carrierCode && list[i].transportType === item.transportType)) {
          valid = false
          break
        }
      }
      if (valid) {
        const params = {
          planOrderNoList: this.selections.map(item => item.planOrderNo)
        }
        if (this.tempAssignmentNo) {
          params.tempAssignmentNo = this.tempAssignmentNo
        }
        await this.updateDispatch(this.resp2Data)
        this.$store.dispatch(this.store + 'addDispatch', params).then(() => {
          if (this.$store.state[this.modName].addDispatchResp.code === 200) {
            this.selections = []
            this.initData()
            this.initDispatchData()
          }
        })
      } else {
        this.$message.error(this.$t('transportationScheduling.msg.rule'))
      }
    },

    /* 取消调度 */
    cancelDispatch() {
      if (this.tempAssignmentNo) {
        this.$confirm(this.$t('transportationScheduling.msg.cancelDispatch'), {
          type: 'warning',
          center: true
        }).then(() => {
          this.$showLoading()
          this.$store.dispatch(this.store + 'cancelDispatch', this.tempAssignmentNo).then(() => {
            Promise.all([this.initData(), this.initDispatchData()]).finally(() => {
              this.isTransport = false
              this.$hideLoading()
            })
          }).finally(() => {
            this.$hideLoading()
          })
        })
      }
    },

    /* 移除 */
    remove(row) {
      if (row.id) {
        this.$confirm(this.$t('transportationScheduling.msg.removeDispatch'), {
          type: 'warning',
          center: true
        }).then(async() => {
          this.$showLoading()
          await this.$store.dispatch(this.store + 'removeDispatch', row.id)
          await this.updateDispatch(this.resp2Data.filter(item => item.id !== row.id)).then(() => {
            this.initData()
            this.findDispatchData({ limit: this.pageRequest2.limit, page: this.pageRequest2.page })
          }).finally(() => {
            this.$hideLoading()
          })
        })
      }
    },

    /* 更新临时调度列表 */
    updateDispatch(tempItemList) {
      return new Promise((resolve) => {
        if (tempItemList.length) {
          const params = {
            tempItemList: tempItemList.map(item => {
              return {
                id: item.id,
                dispatchNum: item.dispatchNum,
                numInt: item.numInt,
                numEa: item.numEa,
                weight: item.weight,
                volume: item.volume
              }
            })
          }
          this.$store.dispatch(this.store + 'updateDispatch', params).then(() => {
            if (this.$store.state[this.modName].updateDispatchResp.code === 200) {
              resolve(true)
            } else {
              resolve(false)
            }
          })
        } else {
          resolve(true)
        }
      })
    },

    /* 查询商品信息 */
    getSkuInfo(row) {
      row.dispatchNumBackup = row.dispatchNumBackup + ''
      row.dispatchNum = row.dispatchNum + ''
      if (
        !row.skuCode ||
        row.dispatchNum === row.canDispatchNum ||
        row.dispatchNumBackup === row.dispatchNum
      ) {
        return
      }
      this.$store.dispatch(this.store + 'getSkuInfo', row.skuCode).then(() => {
        const skuInfo = this.$store.state[this.modName].skuInfo[0]
        if (skuInfo) {
          row.numInt = row.dispatchNum.split('.')[0] || 0
          const decimal = +`0.${row.dispatchNum.split('.')[1] || 0}`
          row.numEa = Math.ceil(Math.round(decimal * skuInfo.unitNum))
          row.weight = (row.dispatchNum * skuInfo.weight).toFixed(2) || 0
          row.volume = (row.dispatchNum * skuInfo.volume).toFixed(2) || 0

          this.totalInfo2.totalNumCount = (this.totalInfo2.totalNumCount - (row.dispatchNumBackup - row.dispatchNum)).toFixed(2) || 0
          this.totalInfo2.totalWeight = (this.totalInfo2.totalWeight - (row.weightBackup - row.weight)).toFixed(2) || 0
          this.totalInfo2.totalVolume = (this.totalInfo2.totalVolume - (row.volumeBackup - row.volume)).toFixed(2) || 0

          row.dispatchNumBackup = row.dispatchNum
          row.weightBackup = row.weight
          row.volumeBackup = row.volume
        }
      })
    },

    /* 打开追加配置弹框 */
    async addStowage() {
      if (await this.updateDispatch(this.resp2Data)) {
        // 弹窗的类型：view
        this.dialogInfo.type = 'addStowage'
        // 默认弹窗的标题：修改
        this.dialogInfo.title = this.$t('transportationScheduling.addStowage')
        // 弹窗是否显示
        this.dialogInfo.visible = true
        // 弹窗的保存按钮是否显示
        this.dialogInfo.btList[1].show = true
        // 绑定弹窗保存事件：viewSave
        this.dialogInfo.btList[1].event = 'addAssignment'
        // 封装的修改表单的数据化配置
        this.diaFormInfoStowage()
        this.$nextTick(() => {
          this.diaFormInfo.ref.resetFields()
        })
      }
    },

    /* 保存追加配置 */
    addAssignment() {
      this.diaFormInfo.ref.validate(valid => {
        if (valid) {
          const params = {
            assignmentNo: this.diaFormInfo.data.assignmentNo,
            tempAssignmentNo: this.respInfo2.tempAssignmentNo,
            assignmentItemList: this.resp2Data
          }
          this.$store.dispatch(this.store + 'addAssignment', params).then(() => {
            if (this.$store.state[this.modName].assignmentResp.code === 200) {
              this.dialogInfo.visible = false
              this.initData()
              this.initDispatchData()
            }
          })
        }
      })
    },

    /* 添加运输工具 */
    async addTransport() {
      if (await this.updateDispatch(this.resp2Data)) {
        this.$store.dispatch(this.store + 'getTransportTool', this.tempAssignmentNo).then(() => {
          if (this.$store.state[this.modName].transportTool) {
            this.vueTableInfo2.data = this.$store.state[this.modName].transportTool
            let sessionData = localStorage.getItem('transport_tool')
            if (sessionData) {
              sessionData = JSON.parse(sessionData)
              this.vueTableInfo2.data = this.vueTableInfo2.data.map(item => {
                const row = sessionData.find(el => el.key === item.key)
                row && (item = row)
                return item
              })
            }
            this.vueTableInfo2FieldList()
            this.isTransport = true
          }
        })
      }
    },

    /* 打开添加中转弹框 */
    addTransit() {
      // 弹窗的类型：view
      this.dialogInfo.type = 'addTransit'
      // 默认弹窗的标题：修改
      this.dialogInfo.title = this.$t('transportationScheduling.addTransit')
      // 弹窗是否显示
      this.dialogInfo.visible = true
      // 弹窗的保存按钮是否显示
      this.dialogInfo.btList[1].show = true
      // 绑定弹窗保存事件：viewSave
      this.dialogInfo.btList[1].event = 'addTransitSave'
      // 封装的修改表单的数据化配置
      this.diaFormInfoTransit()
      this.$nextTick(() => {
        this.diaFormInfo.ref.resetFields()
      })
      this.getProvinceList()
      this.diaFormInfo.data.carrierName = this.vueTableInfo2.data[this.radioIndex].carrierName
      this.diaFormInfo.data.subOpType = this.vueTableInfo2.data[this.radioIndex].subOpType
    },

    /* 保存添加中转 */
    addTransitSave() {
      this.diaFormInfo.ref.validate(valid => {
        if (valid) {
          const formData = JSON.parse(JSON.stringify(this.diaFormInfo.data))
          const data = {
            startName: formData.intrm,
            endName: this.radioData.endName,
            carrierCode: this.radioData.carrierCode,
            carrierName: this.radioData.carrierName,
            subOpType: 4,
            subOpTypeName: this.listTypeInfo.transportWorkType.find(item => item.value === 4).key,
            subTransportType: formData.subTransportType,
            subTransportTypeName: this.listTypeInfo.transportType.find(item => +item.value === +formData.subTransportType).key
          }
          this.vueTableInfo2.data[this.radioIndex].endName = formData.intrm
          this.vueTableInfo2.data.splice(this.radioIndex + 1, 0, Object.assign(formData, data))
          this.vueTableInfo2FieldList()
          this.dialogInfo.visible = false
        }
      })
    },

    /* 获取省份 */
    getProvinceList() {
      this.$store.dispatch(this.store + 'getProvinceList', {}).then(() => {
        this.listTypeInfo.provinceList = this.$store.state[this.modName].provinceList
      })
    },

    /* 获取城市 */
    getCityList(data) {
      this.$store.dispatch(this.store + 'getCityList', data).then(() => {
        this.listTypeInfo.cityList = this.$store.state[this.modName].cityList
      })
    },

    /* 获取区县 */
    getAreaList(data) {
      this.$store.dispatch(this.store + 'getAreaList', data).then(() => {
        this.listTypeInfo.areaList = this.$store.state[this.modName].areaList
      })
    },

    /* 上一步 */
    preStep() {
      this.radioData = null
      this.isTransport = false
      localStorage.setItem('transport_tool', JSON.stringify(this.vueTableInfo2.data))
    },

    /* 保存 */
    saveAssignment() {
      this.radioData = null
      const params = {
        tempAssignmentNo: this.tempAssignmentNo,
        assignmentTripList: this.vueTableInfo2.data.map(item => {
          item.estimateArriveTime = item.estimateArriveTime ? `${item.estimateArriveTime} 00:00:00` : ''
          item.estimateReceiveTime = item.estimateReceiveTime ? `${item.estimateReceiveTime} 00:00:00` : ''
          item.estimateSendTime = item.estimateSendTime ? `${item.estimateSendTime} 00:00:00` : ''
          return item
        })
      }
      this.$showLoading()
      this.$store.dispatch(this.store + 'saveAssignment', params).then(() => {
        if (this.$store.state[this.modName].saveAssignmentResp.code === 200) {
          this.isTransport = false
          this.initData()
          this.initDispatchData()
          localStorage.removeItem('transport_tool')
        }
      }).finally(() => {
        this.$hideLoading()
      })
    },

    /* 关闭弹窗 */
    close() {
      this.dialogInfo.visible = false
    }
  }
}
