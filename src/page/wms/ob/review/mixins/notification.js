// 自定义事件处理
import { JSEncrypt } from 'jsencrypt'
import { getLodop } from '../../../../../utils/LodopFuncs'

// 备注：webSocket 是全局对象，不要每次发送请求丢去创建一个，做到webSocket对象重用，和打印组件保持长连接。
let socket

export default {
  methods: {
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
    },

    /**
         * 页面初始化
         */
    initPage() {
      this.$store.dispatch(this.store + 'initPage', {}).then(() => {
        const obj = this.$store.state[this.modName].initPageObj
        this.listTypeInfo.reviewAbnormalReasonList = obj.reviewAbnormalReasonList
        this.listTypeInfo.reviewPlatformList = obj.reviewPlatformList.map(item => {
          item.value = item.id
          item.key = item.checkPlatformName
          return item
        })
      })
    },

    /**
         * 删除数据
         */
    deleteData() {
      if (!this.reviewData.id) {
        this.$message.error('未加载SO单')
        return
      }
      this.$confirm(this.$t('确认清空复核信息么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        const resp = {
          id: this.reviewData.id
        }
        this.$store.dispatch(this.store + 'deleteData', resp).then(() => {
          const resp = this.$store.state[this.modName].deleteResp
          if (resp.code === this.$successCode) {
            this.$message.success(resp.msg)
            this.clearData()
          }
        })
      })
    },
    /**
         * 快速复核
         */
    fastReview() {
      if (!this.reviewData.id) {
        this.$message.error('未扫描SO单')
        return
      }
      const req = {
        id: this.reviewData.id
      }
      this.$showLoading()
      this.$store.dispatch(this.store + 'fastReview', req).then(() => {
        const resp = this.$store.state[this.modName].fastReviewResp
        if (resp.code === this.$successCode) {
          this.$message.success(resp.msg)
          const obj = resp.obj
          this.tableInfo1.data = obj.dtList
          this.tableInfo2.data = obj.dtBoxList || []
          this.topForm.data.batchNoList = []
          this.topForm.data.batchNo = null
          this.topForm.data.barcode = null
          this.leftForm.data = {}
          this.calcSkuQty(false)
        }
      }).finally(() => {
        this.$hideLoading()
      })
    },
    /**
         * 完成复核
         */
    reviewDone() {
      if (!this.reviewData.id) {
        this.$message.error('未扫描SO单')
        return
      }
      const req = {
        id: this.reviewData.id,
        reviewPersonTwo: this.topForm.data.reviewPersonTwo
      }
      this.$showLoading()
      this.$store.dispatch(this.store + 'reviewDone', req).then(() => {
        const resp = this.$store.state[this.modName].reviewDoneResp
        if (resp.code === this.$successCode) {
          this.$message.success(resp.msg)
          this.clearData()
          this.$refs.soNo.focus()
        } else if (resp.code === 1039) {
          this.shouDoubleReviewDia()
        }
      }).finally(() => {
        this.$hideLoading()
      })
    },
    /**
        *单据挂起
        */
    clearPage() {
      this.$confirm(this.$t('确认挂起当前单据？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.clearData()
      })
    },
    /**
         * 清空数据
         */
    clearData() {
      this.resetFormData()
      this.tableInfo1.data = []
      this.tableInfo2.data = []
      this.reviewData = {
        id: null
      }

      this.leftSoForm.data = { }

      this.msg = null
      this.soDisable = false
      this.skuDisable = true
    },
    /**
         * 扫描so单号
         */
    scanSoNo() {
      if (this.soDisable) {
        return
      }
      if (!this.reviewPlatform) {
        this.$message.error('请选择复核台')
        return
      }
      if (!this.topForm.data.soNo) {
        this.$message.error('请扫描/输入SO单号')
        return
      }
      this.soDisable = true
      const req = {
        checkPlatformId: this.reviewPlatform,
        soNo: this.topForm.data.soNo
      }
      this.$showLoading()
      this.$store.dispatch(this.store + 'initReviewData', req).then(() => {
        const resp = this.$store.state[this.modName].initReviewDataResp
        if (resp.code == this.$successCode) {
          const obj = resp.obj
          this.reviewData = obj
          this.topForm.data.reviewPersonOne = obj.reviewPersonOne
          this.topForm.data.reviewPersonTwo = obj.reviewPersonTwo
          this.topForm.data.skuKind = obj.skuKind
          this.topForm.data.skuTotal = obj.skuTotal
          this.topForm.data.partnerName = obj.partnerName
          this.topForm.data.isHasInvoiceName = obj.isHasInvoiceName
          this.$set(this.leftSoForm, 'data', obj)
          this.leftSoForm.date = obj
          this.tableInfo1.data = obj.dtList
          this.tableInfo2.data = obj.dtBoxList || []
          if (!this.tableInfo2.data || this.tableInfo2.data.length == 0) {
            this.$set(this.topForm.data, 'boxNo', 1)
          } else {
            let boxNo = 1
            this.tableInfo2.data.forEach(item => {
              if (item.boxNo > boxNo) {
                boxNo = item.boxNo
              }
            })
            this.$set(this.topForm.data, 'boxNo', boxNo)
          }
          this.skuDisable = false
          this.calcSkuQty(false)
          if (obj.isHasInvoice == 1) {
            this.speakMsg('有发票')
          }
          this.msg = '复核中'
          this.$message.success(resp.msg)
        } else {
          this.soDisable = false
        }
      }).finally(() => {
        this.$hideLoading()
        if (!this.soDisable) {
          this.$refs.soNo.focus()
        } else {
          this.$refs.barcode.focus()
        }
      })
    },
    /**
         * 扫描SKU/产品条码
         */
    scanSku() {
      if (!this.reviewData.id) {
        this.$message.error('请先扫描/输入SO单号')
        return
      }
      if (!this.topForm.data.boxNo) {
        this.$message.error('请先扫描/输入运单号/箱号')
        return
      }
      if (!this.topForm.data.barcode) {
        this.$message.error('请扫描/输入产品条码')
        return
      }
      const req = {
        barcode: this.topForm.data.barcode,
        id: this.reviewData.id,
        boxNo: this.topForm.data.boxNo
      }

      this.$showLoading()
      this.$store.dispatch(this.store + 'scanSku', req).then(() => {
        const resp = this.$store.state[this.modName].scanSkuResp
        if (resp.code == this.$successCode) {
          const skuObj = resp.obj.baseSku
          skuObj.ownerName = this.reviewData.ownerName
          skuObj.cusOrderNo = this.reviewData.cusOrderNo
          skuObj.partnerStoreName = this.reviewData.partnerStoreName
          this.leftForm.data = skuObj
          this.topForm.data.reviewingNum = null
          if (resp.obj.batchNoList) {
            this.topForm.data.batchNoList = resp.obj.batchNoList
            this.topForm.data.batchNo = resp.obj.batchNoList[0]
          }
          if (this.isReview) {
            const req = {
              id: this.reviewData.id,
              reviewQty: 1,
              boxNo: this.topForm.data.boxNo,
              barcode: this.topForm.data.barcode,
              batchNo: this.topForm.data.batchNo
            }
            this.saveReviewDtData(req)
          }
          // this.speakMsg('完成');
          // this.$message.success(resp.msg);
        } else {
          this.speakMsg('错误')
          this.$set(this.topForm.data, 'barcode', null)
          if (resp.code === 1048 || resp.code === 1049) {
            this.openAbnormal(req)
          }
        }
      }).finally(() => {
        this.$hideLoading()
      })
    },
    speakMsg(text) {
      this.$speechSynMsg.text = text
      this.$speechSynMsg.lang = 'zh-CN'
      this.$speechSynMsg.volume = 1
      this.$speechSynMsg.rate = 1
      this.$speechSynMsg.pitch = 1
      this.$speechSynthesis.speak(this.$speechSynMsg)
    },
    /**
       * 保存复核结果
       */
    saveReviewData() {
      if (!this.reviewData.id) {
        this.$message.error('请先扫描/输入SO单号')
        return
      }
      if (!this.topForm.data.boxNo) {
        this.$message.error('请先扫描/输入运单号/箱号')
        return
      }
      if (!this.topForm.data.barcode) {
        this.$message.error('请扫描/输入产品条码')
        return
      }
      if (!this.topForm.data.batchNo) {
        this.$message.error('请选择批次号')
        return
      }
      if (!this.topForm.data.reviewingNum) {
        this.$message.error('请输入数量')
        return
      }

      const req = {
        id: this.reviewData.id,
        reviewQty: this.topForm.data.reviewingNum,
        boxNo: this.topForm.data.boxNo,
        barcode: this.topForm.data.barcode,
        batchNo: this.topForm.data.batchNo

      }
      this.saveReviewDtData(req)
    },
    /**
       * 保存事件
       * @param req
       */
    saveReviewDtData(req) {
      this.$showLoading()
      this.$store.dispatch(this.store + 'saveReviewData', req).then(() => {
        const resp = this.$store.state[this.modName].saveReviewDataResp
        if (resp.code == this.$successCode) {
          const obj = resp.obj
          // this.topForm.data = obj;
          this.tableInfo1.data = obj.dtList
          this.tableInfo2.data = obj.dtBoxList || []
          this.topForm.data.batchNoList = []
          this.topForm.data.batchNo = null
          this.topForm.data.barcode = null
          this.$message.success(resp.msg)
          this.calcSkuQty(true)
          this.speakMsg('完成')
          this.$refs.barcode.focus()
          // this.$focus();
        } else {
          this.speakMsg('错误')
          if (resp.code === 1049 || resp.code === 1048) {
            this.openAbnormal(req)
          }
        }
      }).finally(() => {
        this.$hideLoading()
      })
    },

    /**
         * 显示差异复核弹窗
         */
    showDiffDia() {
      // 弹窗的类型：edit
      this.dialogInfo.type = 'view'
      // 默认弹窗的标题：修改
      this.dialogInfo.title = '复核差异'
      // 弹窗是否显示
      this.dialogInfo.visible = true
      this.dialogInfo.isShowForm = false
      // 弹窗的保存按钮是否显示
      this.dialogInfo.btList[1].event = 'handelSaveReviewLess'

      // this.editID = data.id;
      // 封装的修改表单的数据化配置
      this.initDiaDiffColumns()
      const array = []
      this.tableInfo1.data.forEach((item) => {
        if (item.waitReviewQty > 0) {
          array.push(item)
        }
      })
      this.diaFormInfo.dtTableInfo.data = array
    },
    /**
         *   显示双人复核弹窗
         */
    shouDoubleReviewDia() {
      // 弹窗的类型：edit
      this.dialogInfo.type = 'view'
      // 默认弹窗的标题：修改
      this.dialogInfo.title = '双人复核'
      // 弹窗是否显示
      this.dialogInfo.visible = true
      this.diaFormInfo.isShowForm = true
      // 弹窗的保存按钮是否显示
      this.dialogInfo.btList[1].event = 'saveReviewPersonTwo'

      // this.editID = data.id;
      // 封装的修改表单的数据化配置
      this.initDiaDoubleReviewColumns()
      const array = []
      this.tableInfo1.data.forEach(item => {
        array.push(item)
      })
      this.diaFormInfo.dtTableInfo.data = array
    },
    /**
         * 保存
         */
    saveReviewDt() {
      if (!this.checkDtId) {
        this.$message.error('请扫描/输入产品条码')
        return
      }
      const req = {
        id: this.checkDtId,
        boxNo: this.topForm.data.boxNo,
        reviewWtKg: this.topForm.data.reviewWtKg
      }
      this.$showLoading()
      this.$store.dispatch(this.store + 'updateReviewDt', req).then(() => {
        const resp = this.$store.state[this.modName].updateReviewDtResp
        if (resp.code == this.$successCode) {
          this.$message.success(resp.msg)
          this.tableInfo2.data.forEach((item, index) => {
            if (item.id == this.checkDtId) {
              item.boxNo = this.topForm.data.boxNo
              this.$set(this.tableInfo2.data, index, item)
            }
          })
        }
      }).finally(() => {
        this.$hideLoading()
      })
    },
    /**
         * 关闭页面
         */
    close() {
      this.dialogInfo.visible = false
    },
    // 保存双人复核信息
    saveReviewPersonTwo() {
      this.diaFormInfo.ref.validate((valid) => {
        if (valid) {
          // this.topForm.data.reviewPersonTwo=this.topForm.data.reviewPersonOne;
          // this.close();
          // this.reviewDone();
          this.$showLoading()
          this.$store.dispatch(this.store + 'getPubicKey', { 'userNo': this.diaFormInfo.data.reviewPersonTwoUserNo }).then(() => {
            const resp = this.$store.state[this.modName].getPubicKeyResp
            if (resp.code === this.$successCode) {
              const encryptor = new JSEncrypt()
              encryptor.setPublicKey(resp.obj)
              const submitData = {}
              submitData.userNo = this.diaFormInfo.data.reviewPersonTwoUserNo
              submitData.pwd = encryptor.encrypt(this.diaFormInfo.data.reviewPersonTwoUserPassword)
              this.$store.dispatch(this.store + 'checkUser', submitData).then(() => {
                const checkResp = this.$store.state[this.modName].checkUserResp
                if (checkResp.code === this.$successCode) {
                  if (this.topForm.data.reviewPersonOne == checkResp.obj.userName) {
                    this.$message.error('复核人不能相同')
                  } else {
                    this.topForm.data.reviewPersonTwo = checkResp.obj.userName
                    this.reviewDone()
                    this.close()
                  }
                }
              })
            } else {
              this.loading = false
              this.ruleForm.pwd = null
            }
          }).finally(() => {
            this.$hideLoading()
          })
        }
      })
    },
    openAbnormal(data) {
      this.$store.dispatch(this.store + 'initAbnormal', data).then(() => {
        const obj = this.$store.state[this.modName].initAbnormalObj
        this.diaFormInfoAbnormal.data = obj
        if (obj.skuList) {
          this.listTypeInfo.skuList = obj.skuList
          this.initDiaAbnormalMoreColumns()
        } else {
          this.initDiaAbnormalOneColumns()
        }
        this.dialogInfoAbnormal.visible = true
      })
    },
    handelCloseAbnormal() {
      this.dialogInfoAbnormal.visible = false
    },
    handelSaveAbnormal() {
      this.diaFormInfoAbnormal.ref.validate((valid) => {
        if (valid) {
          this.$showLoading()
          const req = this.diaFormInfoAbnormal.data
          this.$store.dispatch(this.store + 'addAbnormal', req).then(() => {
            const resp = this.$store.state[this.modName].addAbnormalResp
            if (resp.code == this.$successCode) {
              this.$message.success(resp.msg)
              this.handelCloseAbnormal()
            }
          }).finally(() => {
            this.$hideLoading()
          })
        }
      })
    },
    handelSaveReviewLess() {
      if (!this.reviewData.id) {
        this.$message.error('未扫描SO单')
        return
      }
      if (!this.diaFormInfo.dtTableInfo.data) {
        this.$message.error('无复核差异数据')
        return
      }
      this.$showLoading()
      this.$store.dispatch(this.store + 'saveReviewLess', this.reviewData.id).then(() => {
        const resp = this.$store.state[this.modName].saveReviewLessResp
        if (resp.code == this.$successCode) {
          this.$message.success(resp.msg)
          this.close()
        }
      }).finally(() => {
        this.$hideLoading()
      })
    },
    // 打开包材页面
    openConsumablesPage() {
      this.dialogInfoCons.visible = true
      this.initReviewConsumables()
    },

    // 打印面单
    printFaceSheet() {
      if (!this.reviewData.id) {
        this.$message.error('请先扫描/输入SO单号')
        return
      }
      this.$showLoading()
      this.$store.dispatch(this.store + 'printFaceSheet', this.reviewData.id).then(() => {
        const resp = this.$store.state[this.modName].printFaceSheetResp
        if (resp.code === this.$successCode) {
          const resList = resp.obj.expressList
          if (resList.length <= 0) {
            this.$message.error('获取面单失败')
          }
          for (let i = 0; i < resList.length; i++) {
            const express = resList[i]

            const faceSheetRes = express.faceSheetRes// 面单信息对象
            const printList = faceSheetRes.printData// 面单打印信息
            this.topForm.data.boxNo = faceSheetRes.waybillNo// 设置快递单号

            for (let i = 0; i < printList.length; i++) {
              const printData = printList[i]
              // 淘宝插件打印
              if (express.printMode == 'TBCJ') {
                this.tbcjSendSocket(printData)
                // HTML文件打印
              } else {
                this.htmlPrint(printData)
              }
            }

            const code = express.code
            if (code === this.$successCode) {
              this.reviewDone()
            } else {
              this.$message.error('快递下单成功,打印面单失败,请去补打页面补打面单' + express.msg)
            }
          }
          const dtBoxList = resp.obj.dtBoxList
          this.tableInfo2.data = dtBoxList
        }
      }).finally(() => {
        this.$hideLoading()
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

    closeConsumablesPage() {
      this.dialogInfoCons.visible = false
      this.diaFormInfoCons.tableInfo.data = []
      this.reqConsumables.skuCode = null
    },
    initReviewConsumables() {
      if (!this.reviewData.id) {
        this.$message.error('请先扫描/输入SO单号')
        return
      }
      this.$store.dispatch(this.store + 'queryReviewConsumables', this.reviewData.id).then(() => {
        this.diaFormInfoCons.tableInfo.data = this.$store.state[this.modName].queryReviewConsumablesObj
      })
    },
    /**
         * 扫描包材产品条码
         */
    scanSkuConsumables() {
      if (!this.reviewData.id) {
        this.$message.error('请先扫描/输入SO单号')
        return
      }
      if (!this.reqConsumables.skuCode) {
        this.$message.error('请扫描/输入产品条码')
        return
      }
      const req = {
        reviewId: this.reviewData.id,
        skuCode: this.reqConsumables.skuCode
      }

      this.$showLoading()
      this.$store.dispatch(this.store + 'scanSkuConsumables', req).then(() => {
        const resp = this.$store.state[this.modName].scanSkuConsumablesResp
        if (resp.code == this.$successCode) {
          this.initReviewConsumables()
          this.reqConsumables.skuCode = null
        }
      }).finally(() => {
        this.$hideLoading()
      })
    },
    handleDeleteConsumable(data) {
      this.$confirm(this.$t('确认删除选中的记录么？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'deleteSkuConsumables', data.id).then(() => {
          const resp = this.$store.state[this.modName].deleteSkuConsumablesResp
          if (resp.code === this.$successCode) {
            this.initReviewConsumables()
          }
        })
      })
    },
    /**
       * 计算商品数量
       */
    calcSkuQty(autoPrint) {
      const total = this.topForm.data.skuTotal
      let reviewQty = 0
      this.tableInfo2.data.forEach(item => {
        reviewQty += item.reviewedQty
      })
      this.topForm.data.hasBoxNum = reviewQty
      this.topForm.data.noBoxNum = total - reviewQty
      /**
         * 自动完成复核
         */
      if (reviewQty > 0 && total == reviewQty) {
        if (autoPrint) {
          if (this.reviewData.isPrintExpress) {
            this.printFaceSheet()
          } else {
            this.reviewDone()
          }
        }
      }
    },
    /**
       * 删除复核装箱明细
       * @param data
       */
    deleteReviewDtBox(data) {
      this.$confirm(this.$t('确认删除已复核记录？'), {
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch(this.store + 'deleteReviewDtBox', data.id).then(() => {
          const resp = this.$store.state[this.modName].deleteReviewDtBoxResp
          if (resp.code === this.$successCode) {
            this.$message.success(resp.msg)
            this.tableInfo1.data = resp.obj.dtList
            this.tableInfo2.data = resp.obj.dtBoxList || []
            this.calcSkuQty()
            this.$message.success(resp.msg)
          }
        })
      })
    }
  },
  mounted() {
    this.initTopFormColumns()// 初始化查询界面配置数据
    this.initPageData()
    // this.clearData();
    this.rulesInit()
  },
  // 页面初始化函数
  created() {
    this.initPage()
    this.webSocket()
  }
}
