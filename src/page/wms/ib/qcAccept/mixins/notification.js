// 自定义事件处理
import { deleteDt, scannOrderNo, scannSkuNo, saveRecord, getPubicKey, checkUser } from '../api'
import { formatDate } from '@/utils/date'
import { JSEncrypt } from 'jsencrypt'
export default {
  methods: {
    /**
         * 初始化数据
         */
    initData() {

    },
    /**
         * 输入ASN号/源单号 查入库单等信息 回车回调方法
         */
    asnNoAndAsnSource() {
      scannOrderNo(this.topForm.data.asnNo).then(res => {
        if (res.code === 200) {
          this.asnNoForm = {
            isDoubleCheck: res.obj.isDoubleCheck,
            showDoubleCheck: res.obj.showDoubleCheck,
            asnNo: res.obj.asnNo,
            origNo: res.obj.origNo,
            cusOrderNo: res.obj.cusOrderNo,
            supplierName: res.obj.supplierName,
            buyer: res.obj.buyer,
            asnTypeName: res.obj.asnTypeName,
            remark: res.obj.remark,
            qcId: res.obj.qcId
          }
          this.topForm.data = JSON.parse(JSON.stringify(this.asnNoForm))
          this.selectIndex = ''
          this.tableInfo1.data = res.obj.dtList
          this.$refs.skuCode.focus()
          // 多批次
          if (this.duplicate(res.obj.dtList).length > 0) {
            this.doubleBatchArr = this.duplicate(res.obj.dtList)
          }
          this.$message.success(res.msg)
        }
      })
    },
    // 同一产品多条数据，即为多个批次
    duplicate(arr) {
      var tmp = []
      arr.concat().sort().sort(function(a, b) {
        if (a.skuCode == b.skuCode && tmp.indexOf(a) === -1) tmp.push(a)
      })
      return tmp
    },
    /**
         * 输入产品条码 回车回调方法
         */
    scannSkuNo() {
      if (this.isEmpty(this.topForm.data.asnNo)) {
        this.$message.error('请先输入ASN号/来源单号')
        return
      }
      const params = {
        asnNo: this.topForm.data.asnNo,
        skuCode: this.topForm.data.skuCode,
        qcDtId: this.topForm.data.qcDtId
      }
      scannSkuNo(params).then(res => {
        if (res.code === 200) {
          this.isSaveBtnDisabled = false
          this.topForm.data = {
            ...res.obj,
            ...this.asnNoForm
          }
          // 多批次标记(1-多批次;0-单批次)
          if (res.obj.doubleBatchFlag && res.obj.doubleBatchFlag == 1) {
            this.multipleBatches = true
            this.selectIndex = this.tableInfo1.data.indexOf(res.obj)
          } else {
            this.multipleBatches = false
          }
          this.topForm.data.id = res.obj.id
          // this.tableInfo1.data[0] = this.topForm.data;
          this.initInvBatchAttr(res.obj)
          this.rightForm = {
            checkResult: 'PASS',
            qcQty: '',
            goodQty: '',
            badQty: '',
            badReason: ''
          }
          this.$message.success(res.msg)
        }
      })
    },

    // 批次属性 动态字段处理方法
    initInvBatchAttr(entity) {
      const invBatchRule = entity.invBatchRule
      if (!invBatchRule) {
        this.$set(this.diaFormInfoAttr, 'data', {})
        this.diaFormInfoAttr.fieldList = []
        return false
      }
      const invBatchPO = entity.invBatchVO
      const fieldList = []
      const attrData = {}
      const fieldDisabled = invBatchPO != null
      this.diaFormInfoAttr.data = {}
      const rules = {}
      invBatchRule.dtList.forEach(item => {
        let field = {}
        if (item.batchAttrFormat == 'DATE') {
          field = { value: item.batchAttr, label: item.batchAttrKey, type: 'date', format: item.showFormat, valueFormat: item.showFormat, disabled: fieldDisabled }
        } else {
          field = { value: item.batchAttr, label: item.batchAttrKey, type: 'input', disabled: fieldDisabled }
        }
        if (item.isRequired && item.isRequired == 1) {
          const ruleData = [{ required: true, message: '请录入' + item.batchAttrKey, trigger: 'blur' }]
          rules[item.batchAttr] = ruleData
        }
        fieldList.push(field)
        if (invBatchPO) {
          attrData[item.batchAttr] = invBatchPO[item.batchAttrColumn]
        } else {
          if (item.batchAttrColumn == 'instoreDate') {
            attrData[item.batchAttr] = formatDate(new Date(), item.showFormat)
            field.disabled = true
          } else if (item.batchAttrColumn == 'asnNo') {
            attrData[item.batchAttr] = entity.asnNo
            field.disabled = true
          } else {
            attrData[item.batchAttr] = null
          }
        }
      })
      this.$set(this.diaFormInfoAttr, 'data', attrData)
      this.diaFormInfoAttr.fieldList = fieldList
      if (!invBatchPO) {
        this.diaFormInfoAttr.rules = rules
      }
      if (this.diaFormInfoAttr.ref) {
        this.diaFormInfoAttr.ref.resetFields()
      }
    },

    /**
         * 保存收货记录
         */
    saveRecInfoFn() {
      if (!this.topForm.data.shouldQcQty) {
        this.$message.error('应检数量不能为空')
        return
      }
      if (!this.rightForm.qcQty) {
        this.$message.error('检验数量不能为空')
        return
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          const obj = this.tableInfo1.data.filter(v => {
            return (v.batchNo == this.topForm.data.batchNo && v.skuId == this.topForm.data.skuId)
          })[0]

          // 将二次验收数据加入数组中
          if (obj && obj.isDoubleCheck == 1) {
            this.doubleCheckList.push(obj)
          }
          // 需要双人验收
          if (this.showDoubleCheck) {
            // 如果已经打开过二次验收页面,需要将数组最后一个元素删除,防止重复添加
            if (this.openshouDoublepage == true) {
              this.doubleCheckList.pop()
            }
            this.shouDoubleQcDia()
          } else {
            // 无需双人验收
            this.sendSaveQc()
          }
        }
      })
    },
    sendSaveQc() {
      const params = {
        ...this.topForm.data,
        ...this.rightForm
      }
      params.qcId = this.asnNoForm.qcId
      this.$showLoading()
      saveRecord(params).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.isSaveBtnDisabled = true
          this.topForm.data.skuCode = ''
          this.showDoubleCheck = res.obj.showDoubleCheck
          this.$refs.skuCode.focus()
          this.tableInfo2.data.push(res.obj)
          this.tableInfo1.data.forEach((v, i) => {
            if (v.skuCode == res.obj.skuCode) {
              this.selectIndex = i
            }
          })
        }
        if (res.code === 201) {
          this.topForm.data.asnNo = ''
          this.$message.success(res.msg)
          this.doubleCheckList = []// 清空二次验收集合数据
          this.openshouDoublepage = false
          this.showDoubleCheck = false
          this.isSaveBtnDisabled = true
        }
      }).finally(() => {
        this.$hideLoading()
      })
    },

    /** ******************************************双人验收*******************************************/
    /**
         * 显示双人复核弹窗
         */
    shouDoubleQcDia() {
      this.openshouDoublepage = true
      // 弹窗的类型：view
      this.dialogInfo.type = 'view'
      // 默认弹窗的标题：修改
      this.dialogInfo.title = '双人验收'
      // 弹窗是否显示
      this.dialogInfo.visible = true
      this.diaFormInfo.isShowForm = true
      // 弹窗的保存按钮是否显示
      this.dialogInfo.btList[1].show = true

      // 封装的修改表单的数据化配置
      this.initDiaDoubleQcColumns()
      this.diaFormInfo.dtTableInfo.data = this.doubleCheckList
    },

    // 初始化双人验收界面
    initDiaDoubleQcColumns() {
      this.diaFormInfo.fieldList = [
        { label: '第二验收人用户名', value: 'checkUserTwo', type: 'input' },
        { label: '密码', value: 'checkTwoPassword', type: 'password' }
      ]
      this.diaFormInfo.dtTableInfo.fieldList = this.tableInfo1.fieldList
      // this.diaFormInfo.dtTableInfo.fieldList = [
      //     { prop: "barcode", label: '产品条码', minWidth: 120 },
      //     { prop: "skuCode", label: '产品编码', minWidth: 120 },
      //     { prop: "skuName", label: '产品名称', minWidth: 100 },
      //     { prop: "spec", label: '规格', minWidth: 70 },
      //     { prop: "boxNo", label: '生产厂家', minWidth: 100 },
      //     { prop: "mainUnit", label: '单位', minWidth: 60 },
      //     { prop: "batchNo", label: '批次号', minWidth: 100 },
      //     { prop: "commodityQty", label: 'ASN数量', minWidth: 80 },
      //     { prop: "recQty", label: '收货数量', minWidth: 80 },
      //     { prop: "qcQty", label: '检验数量', minWidth: 80 },
      //     { prop: "goodQty", label: '合格数量', minWidth: 80 },
      //     { prop: "badQty", label: '不合格数量', minWidth: 90 },
      //     { prop: "checkResultName", label: '检验结果', minWidth: 100 },
      // ]
    },

    // 保存双人验收信息
    saveQcPersonTwo() {
      this.diaFormInfo.ref.validate((valid) => {
        if (valid) {
          this.$showLoading()
          getPubicKey({ 'userNo': this.diaFormInfo.data.checkUserTwo }).then((resp) => {
            if (resp.code === this.$successCode) {
              const encryptor = new JSEncrypt()
              encryptor.setPublicKey(resp.obj)
              const submitData = {}
              submitData.userNo = this.diaFormInfo.data.checkUserTwo
              submitData.pwd = encryptor.encrypt(this.diaFormInfo.data.checkTwoPassword)
              checkUser(submitData).then((checkResp) => {
                if (checkResp.code === this.$successCode) {
                  if (this.topForm.data.checkUserName == checkResp.obj.userName) {
                    this.$message.error('二次验收人不能为当前登录用户')
                  } else {
                    // 发送保存质检记录
                    this.topForm.data.checkUserTwoName = checkResp.obj.userName
                    this.sendSaveQc()
                    // 关闭二次验收页面
                    this.closeTwo()
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

    // 关闭二次验收页面
    closeTwo() {
      this.dialogInfo.visible = false
    },

    // 必填校验
    rulesInit() {
      this.diaFormInfo.rules = {
        checkUserTwo: [{ required: true, message: '请输入验收人账号', trigger: 'blur' }],
        checkTwoPassword: [{ required: true, message: '请输入验收人密码', trigger: 'blur' }]
      }
    },

    /** ******************************************双人验收*******************************************/

    // 删除收货记录
    deleteFn(data) {
      this.$confirm(this.$t('确认删除该条验收记录吗？'), {
        type: 'warning',
        center: true
      }).then(() => {
        deleteDt(data).then(res => {
          if (res.code == 200) {
            this.tableInfo2.data = this.tableInfo2.data.map(v => {
              return v.qcDtId != data.qcDtId
            })
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    /**
       * 判断是否为空
       * @param text
       * @returns true:空
       */
    isEmpty(text) {
      if (typeof (text) === 'undefined' || !text) {
        return true
      } else {
        return false
      }
    },
    // 按键盘 F1和F4 会执行的方法
    handleKeyDone(key) {
      if (key < 112 || key > 115) {
        return
      }
      if (key == 112) {
        if (!this.multipleBatches) return
        this.nextBatch()
      } else if (key == 115) {
        this.saveRecInfoFn()
      }
      window.event.preventDefault()
    }
  },
  beforeRouteEnter(to, form, next) {
    next((vm) => {
      document.onkeydown = function() {
        const key = window.event.keyCode
        vm.handleKeyDone(key)
      }
    })
  },
  beforeRouteLeave(to, from, next) {
    document.onkeydown = null
    next()
  },
  // 页面初始化函数
  created() {
    this.initData()
    // this.initPage();
  }
}
