import { getLodop } from '../../../../../utils/LodopFuncs'

// 备注：webSocket 是全局对象，不要每次发送请求丢去创建一个，做到webSocket对象重用，和打印组件保持长连接。
let socket
// 自定义事件处理
export default {
  methods: {
    /**
     * 初始化数据
     */
    initData() {
      // 默认查询第一页
      this.$setPageLimit(this.pageRequest, this.topForm.data)
      this.topForm.data.cusOrderNos = this.cusOrderNos
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

    // 添加展开收起表单功能
    openCollapsable() {
      this.collapsable = !this.collapsable
    },

    /**
     * 重置
     */
    reboot() {
      this.topForm.data.waveOrderNo = null
      this.topForm.data.pickOrderNo = null
      this.topForm.data.soNo = null
      this.topForm.data.waybillNo = null
      this.topForm.data.ownerId = null
      this.topForm.data.partnerStoreId = null
      this.topForm.data.partnerId = null
      this.topForm.data.skuCode = null
      this.topForm.data.receiver = null
      this.topForm.data.receiverTel = null
      this.topForm.data.checkPlatformId = null
      this.topForm.data.erpCreateTimeFrom = null
      this.topForm.data.erpCreateTimeTo = null
      this.topForm.data.cusOrderNo = null
      this.cusOrderNos = []
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
        const resp = this.$store.state[this.modName].initPageResp
        if (resp.code === this.$store.state[this.modName].successCode) {
          this.listTypeInfo.printStatus = resp.obj.printStatus
          this.listTypeInfo.reviewPlatformList = resp.obj.reviewPlatformList
          this.carrierCode = resp.obj.carrierCode
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
    queryRowData() {
      // this.$store.dispatch(this.store + 'initUpdate', data.id).then(() => {
      //   this.diaFormInfo.data = this.$store.state[this.modName].initUpdateObj.entity
      //   if (this.diaFormInfo.ref) {
      //     this.diaFormInfo.ref.clearValidate()
      //   }
      // })
    },
    // 取消
    cancelOrder() {
      this.$confirm(this.$t('确认取消选中的运单？'), {
        type: 'warning',
        center: true
      }).then(() => {
        const arr = []
        this.printList.forEach(item => {
          arr.push({ waybillNo: item.waybillNo, cusOrderNo: item.cusOrderNo })
        })
        this.$store.dispatch(this.store + 'cancel', arr).then(() => {
          const resp = this.$store.state[this.modName].cancelResp
          if (resp.code === this.$successCode) {
            this.$message.success('取消成功！')
          }
        })
      })
    },
    // 打印面单
    print() {
      const printList = this.printList
      // const paramerList = []

      if (printList.length == 0) {
        this.$message.error('请选中需要打印的面单')
        return
      }
      // for (let i = 0; i < printList.length; i++) {
      //   paramerList.push(printList[i].logisticsOrderNo)
      // }
      // this.$store.dispatch(this.store + 'print', paramerList).then(() => {
      //   const printResp = this.$store.state[this.modName].printResp
      //   if (printResp.code === this.$successCode) {
      //     const resList = printResp.obj
      //     for (let i = 0; i < resList.length; i++) {
      //       const faceSheetRes = resList[i].faceSheetRes
      //       const printList = faceSheetRes.printData
      //       for (let i = 0; i < printList.length; i++) {
      //         const printData = printList[i]
      //         // 淘宝插件打印
      //         if (resList[i].printMode == 'TBCJ') {
      //           this.tbcjSendSocket(printData)
      //           // HTML文件打印
      //         } else {
      //           this.htmlPrint(printData)
      //         }
      //       }
      //     }
      //   }
      // })

      // 弹窗的类型：add
      this.dialogInfo.type = 'print'
      // 默认弹窗的标题：新增
      this.dialogInfo.title = '打印面单'
      // 弹窗是否显示
      this.dialogInfo.visible = true
      // 弹窗的保存按钮是否显示
      this.dialogInfo.btList[1].show = true
      // 绑定弹窗保存事件：saveAdd
      this.dialogInfo.btList[1].event = 'printsure'
      this.initPrintDialogField()
    },
    // 打印确认
    printsure() {
      this.diaFormInfo.ref.validate(valid => {
        if (valid) {
          const printList = this.printList
          const paramerList = []
          for (let i = 0; i < printList.length; i++) {
            // paramerList.push(printList[i].logisticsOrderNo)
            paramerList.push(i)
          }
          this.printIdList = paramerList
          this.printLength = this.printIdList.length
          this.printNumber = 0
          this.printStepByStep()
        }
      })
    },

    // 打印分步
    printStepByStep() {
      const startIndex = this.printNumber * this.printStep
      const endIndex = (this.printNumber + 1) * this.printStep
      const arr = this.printIdList.slice(startIndex, endIndex)
      const params = {
        logisticsOrderNoList: arr,
        num: this.diaFormInfo.data.num
      }
      this.$showLoading()

      this.$store.dispatch(this.store + 'print', params).then(() => {
        const printResp = this.$store.state[this.modName].printResp
        if (printResp.code === this.$successCode) {
          const resp = printResp.obj
          if (!resp) {
            this.$message.error('未找到可打印的订单!')
            return
          }
          if (resp.code !== this.$successCode) {
            this.$message.error(resp.msg)
            this.$hideLoading()
            this.dialogInfo.visible = false
            return
          }
          if (resp.errorList != null && resp.errorList.length > 0) {
            this.$hideLoading()
            this.$message.warning('批量下单：有部分订单下单失败，请稍后重试')
          }
          if (resp.errorPrintList != null && resp.errorPrintList.length > 0) {
            this.$hideLoading()
            this.$message.warning('批量打单：有部分订单获取面单失败，请稍后重试')
          }
          if (resp.successList != null && resp.successList.length > 0) {
            this.printWaybill(resp.successList)
            this.$hideLoading()
            this.dialogInfo.visible = false
            this.printNumber++
            if (this.printNumber * this.printStep >= this.printLength) {
              // this.$message.success(`当前打印进度${this.printLength}/${this.printLength}`)
              console.log(`当前打印进度${this.printLength}/${this.printLength}`)
              this.initData()
            } else {
              // this.$message.success(`当前打印进度${this.printNumber * this.printStep}/${this.printLength}`)
              console.log(`当前打印进度${this.printNumber * this.printStep}/${this.printLength}`)
              this.printStepByStep()
            }
          }
          this.dialogInfo.visible = false
        } else {
          this.$hideLoading()
          this.dialogInfo.visible = false
          this.$message.error(printResp.msg)
          this.printNumber++
          if (this.printNumber * this.printStep >= this.printLength) {
            // this.$message.success(`当前打印进度${this.printLength}/${this.printLength}`)
            console.log(`当前打印进度${this.printLength}/${this.printLength}`)
            this.initData()
          } else {
            // this.$message.success(`当前打印进度${this.printNumber * this.printStep}/${this.printLength}`)
            console.log(`当前打印进度${this.printNumber * this.printStep}/${this.printLength}`)
            this.printStepByStep()
          }
        }
        this.$hideLoading()
      })
    },

    /**
     * 下单打印
     */
    expressOrder() {
      const printList = this.printList
      const paramerList = []

      if (printList.length == 0) {
        this.$message.error('请选中需要下单打印的数据')
        return
      }

      for (let i = 0; i < printList.length; i++) {
        paramerList.push({ soNo: printList[i].soNo, logisticsOrderNo: printList[i].logisticsOrderNo })
      }

      let msg = '确认下单打印?'
      let content = ''
      for (let i = 0; i < printList.length; i++) {
        const temp = printList[i]
        if (!this.$isEmpty(temp.logisticsOrderNo)) {
          content = content + ',' + temp.soNo
        }
      }
      if (!this.$isEmpty(content)) {
        msg = content + ',已有面单号,确定要重新获取新面单号?'
      }

      this.$confirm(this.$t(msg), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'expressOrder', paramerList).then(() => {
          const printResp = this.$store.state[this.modName].expressOrderResp
          if (printResp.code === this.$successCode) {
            const resList = printResp.obj
            for (let i = 0; i < resList.length; i++) {
              const faceSheetRes = resList[i].faceSheetRes
              const printList = faceSheetRes.printData
              for (let i = 0; i < printList.length; i++) {
                const printData = printList[i]
                // 淘宝插件打印
                if (resList[i].printMode == 'TBCJ') {
                  this.tbcjSendSocket(printData)
                  // HTML文件打印
                } else {
                  this.htmlPrint(printData)
                }
              }
            }
          }
        })
      })
    },

    // 淘宝插件发送打印请求
    tbcjSendSocket(data) {
      socket.send(data)
    },

    // html打印
    htmlPrint(data) {
      const LODOP = getLodop()
      LODOP.SET_PRINT_MODE('POS_BASEON_PAPER', true)
      LODOP.PRINT_INIT('打印面单')
      LODOP.ADD_PRINT_HTM(10, 10, 'RightMargin:1mm', 'BottomMargin:1mm', data)
      LODOP.SET_PRINT_STYLEA(0, 'ShowBarText', 0)
      LODOP.PRINT()
    },

    /**
     * WebSocket处理方法
     */
    webSocket() {
      // 如果是https的话，端口是13529
      // socket = new WebSocket('wss://localhost:13529');
      socket = new WebSocket('ws://127.0.0.1:13528')
      // 打开WebSocket
      socket.onopen = function() {
        // 当WebSocket创建成功时，触发onopen事件
        console.log('Socket已打开！')

        // 当客户端收到服务端发来的消息时，触发onmessage事件，参数e.data包含server传递过来的数据
        socket.onmessage = function(event) {
          console.log('Socket收到消息！', event)
          const response = JSON.parse(event.data)
          if (response.cmd === 'print') {
            // 打印
          }
        }
        // 监听Socket的关闭
        // 当客户端收到服务端发送的关闭连接请求时，触发onclose事件
        socket.onclose = function(event) {
          console.log('Socket已关闭！', event)
        }
        // 如果出现连接、处理、接收、发送数据失败的时候触发onerror事件
        socket.onerror = function(error) {
          console.log('Socket异常！', error)
        }
      }
    }

  },
  // 页面初始化函数
  created() {
    this.initData()
    this.initPage()
    this.webSocket()
  }
}
