<script>
export default {
  components: {},
  data() {
    return {
      reqVo: {
        limit: 10,
        page: 1
      },
      reqAxios: null,
      loading: true,
      btLoading: false,
      successCode: 200,
      page: {
        page: 1,
        limit: 10,
        total: 0
      },
      power: { init: false, call: null }, // 界面按钮字段等权限控制 界面如果有初始化方法 建议写作回调方法里面
      bt: { add: false, search: false, delete: false, update: false, edit: false, view: false, edit_save: false }, // 通用按钮 disabled属性
      buttonObj: 'bt',
      ruleForm: {}
    }
  },
  created() {
    if (this.power.init) {
      this.controlPower()
    }
  },
  methods: {
    /**
       * 界面按钮字段等权限控制
       * @param call 成功之后的回调方法
       * 回调方法回传参数1、后台对应的obj 2、响应对象
       *
       */
    controlPower: function() {
      const pageOpList = this.$route.meta.pageOpList
      pageOpList.forEach(pageOp => {
        this[this.buttonObj][pageOp.opNo] = true
      })
    },
    resetPage() {
      this.exchange.$emit('resetPage', 1)
    },
    /**
       * 锁屏
       */
    lockLoading() {
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    /**
       * 关闭锁屏
       */
    closeLoading() {
      this.loading.close()
    },
    /**
       * 翻页页码切换
       */
    pageChange(item, call, reqObj) {
      if (reqObj) {
        reqObj.page = item.page
        reqObj.limit = item.limit
      }
      if (call) {
        call()
      }
    },

    validateForm(formName) {
      let validateResult = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          validateResult = true
        } else {
          validateResult = false
        }
      })
      return validateResult
    },
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields()
      }
    }
  }
}
</script>
