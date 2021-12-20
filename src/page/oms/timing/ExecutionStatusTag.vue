<template>
  <el-tag v-bind="parseExecutionStatus(scope.row.executionStatus)" :type="type" effect="plain">
    {{ statusContent.text }}
  </el-tag>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    task: Object
  },
  data() {
    return {

    }
  },
  // mounted(){

  // }
  methods: {
    parseExecutionStatus(executionStatus) {
      const statusMsg = { text: '', type: '', effect: 'plain' }
      switch (executionStatus) {
        case 0:
          statusMsg.text = '可执行'
          statusMsg.type = ''
          break
        case 10:
          statusMsg.text = '完成'
          statusMsg.type = 'success'
          statusMsg.effect = 'dark'
          break
        case 20:
          statusMsg.text = '已删除'
          statusMsg.type = 'warning'
          statusMsg.effect = 'dark'
          break
        case 21:
          statusMsg.text = '停用'
          statusMsg.type = 'warning'
          statusMsg.effect = 'dark'
          break
        case 30:
          statusMsg.text = '超出执行次数'
          statusMsg.type = 'danger'
          statusMsg.effect = 'dark'
          break
        case 31:
          statusMsg.text = '超出错误执行次数'
          statusMsg.type = 'danger'
          statusMsg.effect = 'dark'
          break
        default:
          statusMsg.text = '未知状态' + executionStatus
          statusMsg.type = 'danger'
          statusMsg.effect = 'dark'
      }
      return statusMsg
    }
  }
}
</script>
