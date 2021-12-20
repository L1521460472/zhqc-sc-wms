<template>
  <div v-if="showCustomPopup" class="CustomPopup" :class="showCustomPopupCss ? 'dialog-in' : ''">
    <div class="back-btn">
      <div class="back-btn-cell" @click="goback"><i class="el-icon-back" style="font-size: 25px;color: #606266" /></div>
    </div>
    <!---->
    <div class="changePasswordForm">
      <el-form ref="ruleFormRef" :model="queryVo" :rules="rules" label-width="100px">
        <el-form-item label="旧密码" prop="oldPwd">
          <el-input v-model="queryVo.oldPwd" placeholder="请输入旧密码" show-password auto-complete="new-password" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input id="newpassword" v-model="queryVo.newPwd" placeholder="请输入新密码" show-password />
        </el-form-item>
        <el-form-item label="确认新密码" prop="checknewpass">
          <el-input id="checknewpass" v-model="queryVo.checknewpass" placeholder="请再次输入新密码" show-password />
        </el-form-item>
      </el-form>
      <div class="changePasswordForm-btn">
        <el-button v-waves type="primary" @click="submitForm('ruleFormRef')">保存</el-button>
        <el-button v-waves @click="resetForm('ruleFormRef')">清空</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZhqcPassword',
  inject: ['reload'],
  components: { },
  props: {
    showCustomPopup: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      queryVo: {},
      timer: null,
      cssName: 'slide-fade',
      successCode: 200,
      showCustomPopupCss: false,
      //
      ruleForm: {},
      rules: {
        oldPwd: [{ required: true, validator: this.$valid.getPassWordValidator(), trigger: 'blur' }],
        newPwd: [{ required: true, validator: this.$valid.getPassWordValidator(), trigger: 'blur' }],
        checknewpass: [{ required: true, validator: this.validatePass, trigger: 'blur' }]
      }
    }
  },
  computed: {
    checkedData() {
      return this.$store.state.login.checkedData
    }
  },
  created() {
    this.showCustomPopupCss = false
  },
  // beforeDestroy
  deactivated() {
    clearTimeout(this.timer)
    this.timer = null
  },
  methods: {
    //
    validatePass(rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.queryVo.newPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    },
    //
    goback() {
      this.showCustomPopupCss = true
      this.timer = setTimeout(() => {
        this.$emit('closePop', false)
        this.queryVo = {}
        this.showCustomPopupCss = false
      }, 800)
    },
    //
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$showLoading()
          this.queryVo.userNo = localStorage.getItem('ms_userno')
          this.$store.dispatch('login/fmUserChangeUserPwdRequest', this.queryVo).then(() => {
            if (this.checkedData.code === this.successCode) {
              this.goback()
              this.$message.success(this.checkedData.msg)
            }
            this.$hideLoading()
          })
        }
      })
    },
    //
    resetForm(formName) {
      this.$nextTick(function() {
        this.$refs[formName].resetFields()
      })
    }
  }
}
</script>

<style scoped>
  .CustomPopup {
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 2006 !important;
    top:0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: #fff;
    animation-name: slideInLeft;
    animation-duration: 1.2s;
  }
  @keyframes slideInRight {
    0% {
      transform: translateX(0px);
      opacity: 1;
    }

    to {
      transform: translateX(100%);
      opacity: 0.5;
    }
  }
  @keyframes slideInLeft {
    0% {
      transform: translateX(100%);
      opacity: 0.5;
    }

    to {
      transform: translateX(0px);
      opacity: 1;
    }
  }
  .dialog-in{
    animation-name: slideInRight;
    animation-duration: 1.2s;
  }
  .chart-container{
    position: relative;
    width: 100%;
    height: calc(100vh - 88px);
  }
  .back-btn{
    padding:2px 20px;
    border-bottom:1px solid #ddd;
  }
  .back-btn-cell{
    width: 50px;
  }
  .changePasswordForm{
    width: 35%;
    margin: 0 auto;
    margin-top: 60px;
  }
  .changePasswordForm-btn{
    width: 100%;
    text-align: center;
  }
</style>

