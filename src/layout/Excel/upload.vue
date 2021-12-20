<template>
  <div style="display: inline-block">
    <el-button v-waves icon="el-icon-upload2" :disabled="$hasPerm('add')" @click="showUpload">{{ uploadBtnName || this.$t('table.import') }}</el-button>
    <el-dialog title="导入" :visible="visible" :append-to-body="true" class="demo-box" width="40%">
      <el-upload
        ref="upload"
        class="upload-demo"
        action=""
        :multiple="false"
        :file-list="fileList"
        :before-upload="beforeUpload"
        :limit="parseInt('1')"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        :auto-upload="false"
      >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left:10px;margin-top: -10px" size="small" type="success" @click="submitUpload">上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传xlsx文件，且不超过2MB</div>
      </el-upload>
      <button class="uploadCloseDialog" @click="closeDialogup">
        <i class="el-dialog__close el-icon el-icon-close" />
      </button>
    </el-dialog>
    <transition name="fade">
      <div
        v-if="showloadView"
        v-loading="showloadView"
        class="zh-load-view"
        element-loading-text="拼命加载中"
      />
    </transition>
  </div>
</template>

<script>
import service from '@/utils/server'
import { message } from '../../utils/messageUtils.js'

service.interceptors.request.use(config => {
  const token1 = window.sessionStorage.getItem('token')
  config.headers.Authorization = token1
  return config
})
export default {
  components: {},
  // eslint-disable-next-line vue/require-default-prop
  props: { templateName: { type: String, require: true }, uploadUrl: { type: String, require: true }, uploadBtnName: { type: String, require: true }},
  data() {
    return {
      fileList: [],
      submitObj: null,
      parmJson: null,
      doUpload: '#',
      visible: false,
      showloadView: false
    }
  },
  methods: {
    showUpload() {
      this.visible = true
    },
    showDialog() {
      this.visible = true
    },
    closeDialogup() {
      this.visible = false
    },
    beforeUpload(file) {
      this.submitObj = new FormData()
      this.submitObj.append('uploadFileName', file.name)
      this.submitObj.append('uploadFile', file)
      this.submitObj.append('templateName', this.templateName)
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('文件大小不能超过 2MB!')
        return
      }
      return false
    },
    submitUpload() {
      this.$refs.upload.submit()
      const config = {
        responseType: 'blob',
        timeout: 500000, // 请求超时时间
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      if (this.submitObj == null) {
        this.$message.error('请选择文件！')
        return
      }
      const fileName = this.submitObj.get('uploadFileName')
      this.showloadView = true
      service.post(this.uploadUrl + '/' + this.templateName, this.submitObj, config).then((res) => {
        if (res.type === 'application/json') {
          var blob = new Blob([res])
          var reader = new FileReader()
          reader.readAsText(blob, 'utf-8')
          var that = this
          reader.onload = function() {
            var resp = JSON.parse(reader.result)
            if (resp.code === 200) {
              message.success(resp.msg)
              that.showloadView = false
              that.closeDialogup()
              // that.$parent.queryListData(that.$parent.queryVo,false);
              // that.$parent.queryList();
              that.$emit('uploadQuery')
            } else {
              message.error(resp.msg)
              that.showloadView = false
            }
          }
        } else if (res.type === 'application/vnd.ms-excel') {
          message.error('导入失败,具体原因请查看excel')
          // eslint-disable-next-line no-redeclare
          var blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' }) // application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
          var downloadElement = document.createElement('a')
          var href = window.URL.createObjectURL(blob) // 创建下载的链接
          downloadElement.href = href
          downloadElement.download = fileName + '_error.xlsx' // 下载后文件名
          document.body.appendChild(downloadElement)
          downloadElement.click() // 点击下载
          document.body.removeChild(downloadElement) // 下载完成移除元素
          window.URL.revokeObjectURL(href) // 释放掉blob对象
          this.showloadView = false
          this.closeDialogup()
        }
      }).catch(e => {
        message.error('导入异常，请稍后重试')
        this.showloadView = false
        console.log(e)
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .el-dialog {
    margin-top: 10% !important;
    /*.el-dialog__header {
      .el-dialog__headerbtn {
        display: none;
      }
    }*/

    .el-dialog__body {
      .uploadCloseDialog {
        color: #909399;
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 0;
        background: 0 0;
        border: none;
        outline: 0;
        cursor: pointer;
        font-size: 16px;
        z-index: 3000;
      }
    }
  }
  .zh-load-view{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: 0;
    z-index: 3000;
    .el-loading-mask{
      background: rgba(255, 255, 255, 0.2);
      .el-loading-spinner{
        z-index: 4000;
      }
    }
  }
</style>
