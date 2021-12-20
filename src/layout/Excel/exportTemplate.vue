<!--
 * @Descripttion:
 * @version:
 * @Author: chentianyu
 * @Date: 2021-10-15 10:43:48
 * @LastEditors: chentianyu
 * @LastEditTime: 2021-11-29 15:55:34
-->
<template>
  <div style="display: inline-block">
    <el-button v-waves icon="el-icon-download" :disabled="$hasPerm('add')" @click="exportTemplateExcel">{{ exportBtnName || this.$t('table.download') }}</el-button>
  </div>
</template>
<script>
import service from '@/utils/server'

service.interceptors.request.use(config => {
  const token1 = window.sessionStorage.getItem('token')
  config.headers.Authorization = token1
  return config
})
export default {
  components: {},
  props: {
    // eslint-disable-next-line vue/require-default-prop
    templateUrl: { type: String, require: true },
    // eslint-disable-next-line vue/require-default-prop
    exportName: { type: String, require: true },
    // eslint-disable-next-line vue/require-default-prop
    exportBtnName: { type: String, require: true }
  },
  data() {
    return {}
  },
  methods: {
    exportTemplateExcel() {
      const config = {
        responseType: 'blob',
        timeout: 50000, // 请求超时时间
        headers: {
          'Content-Type': 'application/json'
        }
      }
      var exportVO = {}
      // exportVO.templateName = this.templateUrl;
      exportVO.exportName = this.exportName
      service.post(this.templateUrl, exportVO, config).then((res) => {
        if (res.type === 'application/json') {
          var blob = new Blob([res])
          var reader = new FileReader()
          reader.readAsText(blob, 'utf-8')
          var that = this
          reader.onload = function() {
            var resp = JSON.parse(reader.result)
            if (resp.code === 200) {
              that.$message.success(resp.msg)
            } else {
              this.$message.error('下载异常，请稍后重试')
            }
          }
        } else if (res.type === 'application/vnd.ms-excel') {
          // eslint-disable-next-line no-redeclare
          var blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' }) // application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
          var downloadElement = document.createElement('a')
          var href = window.URL.createObjectURL(blob) // 创建下载的链接
          downloadElement.href = href
          downloadElement.download = this.exportName + '.xlsx' // 下载后文件名
          document.body.appendChild(downloadElement)
          downloadElement.click() // 点击下载
          document.body.removeChild(downloadElement) // 下载完成移除元素
          window.URL.revokeObjectURL(href) // 释放掉blob对象
          this.$message.success('成功')
        }
      }).catch(e => {
        this.$message.error('下载异常，请稍后重试')
      })
    }
  }
}
</script>
