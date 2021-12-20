// 自定义事件处理
export default {
  methods: {
    /**
     * 页面初始化
     */
    initPage() {
      this.$store.dispatch(this.store + 'initPage', {}).then(() => {
        const obj = this.$store.state[this.modName].initPageObj
        this.listTypeInfo.checkPlatformList = obj.checkPlatformList.map(item => {
          item.value = item.id
          item.key = item.checkPlatformName
          return item
        })
      })
      this.reqVo.doneNum = 0
    },
    /**
     * 扫描箱号/运单号
     */
    scanBox() {
      const req = {
        checkPlatformId: this.reqVo.checkPlatformId,
        transOrderNo: this.reqVo.transOrderNo
      }
      if (!req.checkPlatformId) {
        this.$message.error('请先选择作业台')
        return
      }
      this.weightDisabled = true
      this.$showLoading()
      this.$store.dispatch(this.store + 'scanTransOrderNo', req).then(() => {
        const resp = this.$store.state[this.modName].scanTransOrderNoResp
        if (this.$successCode == resp.code) {
          if (resp.obj.isWeigh) {
            this.$hideLoading()
            this.$refs.transOrderNo.blur()
            this.$confirm(this.$t('快递单已称重完成，是否重新称重？'), {
              type: 'warning',
              center: true
            }).then(() => {
              this.$showLoading()
              this.reqVo.id = resp.obj.id
              this.$store.dispatch(this.store + 'reWeight', this.reqVo.id).then(() => {
                const resp = this.$store.state[this.modName].reWeightResp
                if (this.$successCode == resp.code) {
                  this.checkWeight(0)
                } else {
                  this.$hideLoading()
                }
              }).finally(() => {

              })
            }).catch(() => {
              this.reqVo.transOrderNo = null
              this.$refs.transOrderNo.focus()
            })
          } else {
            this.reqVo.id = resp.obj.id
            this.checkWeight(0)
          }
        } else {
          this.speakMsg('错误')
          this.reqVo.transOrderNo = null
          this.$hideLoading()
        }
      })
    },
    checkWeight(index) {
      if (index < 20) {
        this.$store.dispatch(this.store + 'checkWeight', this.reqVo.id).then(() => {
          const resp = this.$store.state[this.modName].checkWeightResp
          if (this.$successCode == resp.code) {
            if (resp.obj) {
              const weight = resp.obj.weight / 1000.00
              this.reqVo.weightKg = weight
              this.$hideLoading()
              this.reqVo.doneNum = this.reqVo.doneNum + 1
              this.weightDisabled = false
              this.speakMsg('成功')
              this.sleep(1000).then(() => {
                this.cleanWeight()
              })
            } else {
              this.sleep(400).then(() => {
                this.checkWeight(++index)
              })
            }
          } else {
            this.checkWeightFail()
          }
        })
      } else {
        this.checkWeightFail()
      }
    },
    checkWeightFail() {
      this.$hideLoading()
      this.speakMsg('失败')
      this.$message.error('获取重量失败，请手动录入')
      this.weightDisabled = false
    },
    sleep(duration) {
      return new Promise(resolve => {
        setTimeout(resolve, duration)
      })
    },
    speakMsg(text) {
      this.$speechSynMsg.text = text
      this.$speechSynMsg.lang = 'zh-CN'
      this.$speechSynMsg.volume = 2
      this.$speechSynMsg.rate = 1
      this.$speechSynMsg.pitch = 1
      this.$speechSynthesis.speak(this.$speechSynMsg)
    },
    cleanWeight() {
      this.reqVo.weightKg = null
      this.reqVo.transOrderNo = null
      this.weightDisabled = true
    },
    /**
     * 更新重量
     */
    updateWeight() {
      if (!this.reqVo.weightKg) {
        this.$message.error('请输入重量')
        return
      }
      const weight = parseInt(this.reqVo.weightKg * 1000)
      const req = {
        id: this.reqVo.id,
        weight: weight
      }
      this.$showLoading()
      this.$store.dispatch(this.store + 'updateWeight', req).then(() => {
        const resp = this.$store.state[this.modName].updateWeightResp
        if (this.$successCode == resp.code) {
          this.reqVo.doneNum = this.reqVo.doneNum + 1
          this.speakMsg('成功')
          this.cleanWeight()
        }
      }).finally(() => {
        this.$hideLoading()
      })
    },
    // 关闭页面
    closePage() {

    }
  },
  mounted() {
  },
  // 页面初始化函数
  created() {
    this.initPage()
  }
}
