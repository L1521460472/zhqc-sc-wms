<template>
  <div style="display: inline-block">
    <!-- $hasPerm('export') -->
    <el-button v-waves icon="el-icon-picture-outline" :disabled="disabled" @click="exportExcel">{{ exportBtnName || btnName }}</el-button>
  </div>
</template>
<script>
import service from '@/utils/server'

service.interceptors.request.use(config => {
  const token1 = window.sessionStorage.getItem('token')
  config.headers.Authorization = token1
  return config
})
//
export default {
  components: {},
  props: {
    // eslint-disable-next-line vue/require-default-prop
    templateName: { type: String, require: true },
    // eslint-disable-next-line vue/require-default-prop
    exportName: { type: String, require: true },
    // eslint-disable-next-line vue/require-default-prop
    exportBtnName: { type: String, require: true },
    // checkParam: { type: Boolean, require: true },
    // eslint-disable-next-line vue/require-default-prop
    exportUrl: { type: String, require: true },
    exportId: { type: Number, require: true, default: null },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      paramMap: null,
      btnName: '导出'
    }
  },
  methods: {
    exportExcel() {
      //
      // if (this.checkParam === false) {
      //   return
      // }
      const callbacks = res => {
        this.paramMap = res
      }
      this.$emit('exportParam', { callback: callbacks })
      //
      if (this.paramMap == null) {
        return
      }
      this.$showLoading()
      const config = {
        responseType: 'blob',
        timeout: 50000, // 请求超时时间
        headers: {
          'Content-Type': 'application/json'
        }
      }
      var exportVO = {}
      exportVO.templateName = this.templateName
      exportVO.paramMap = this.paramMap
      exportVO.id = this.exportId
      service.post(this.exportUrl, exportVO, config).then((res) => {
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
              that.$message.error(resp.msg)
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
        this.$hideLoading()
        this.paramMap = null
      }).catch(e => {
        this.$hideLoading()
        this.$message.error('下载异常，请稍后重试')
        this.paramMap = null
      })
    }
  }
}
</script>
