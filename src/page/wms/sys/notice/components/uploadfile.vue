<template>
  <div style="display: inline-block">
    <div>
      <el-upload
        ref="upload"
        v-loading="loading"
        class="upload-demo"
        :action="exportUrl"
        :headers="headers"
        :multiple="false"
        :file-list="fileList"
        :before-upload="beforeUpload"
        :on-exceed="handleExceed"
        :limit="5"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,.pdf,.doc,.docx"
        :auto-upload="true"
        :on-success="onSuccess"
        :on-remove="onRemove"
        name="uploadFile"
        :on-progress="handleProgress"
        :on-error="handleImgError"
      >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <!-- <el-button style="margin-left:10px;margin-top: -10px" size="small" type="success" @click="submitUpload">上传</el-button> -->
        <div slot="tip" class="el-upload__tip">只能上传xlsx,pdf,word文件，且单个附件不超过20MB</div>
      </el-upload>
    </div>
  </div>
</template>

<script>
import { VUE_APP_BASE_URL } from '@/api/api.config.js'
export default {
  components: {},
  props: {
    exportUrl: {
      type: String,
      default: VUE_APP_BASE_URL + 'fileMgr/fileManager/upload2Path'
    },
    size: {
      type: Number,
      default: 20
    },
    disabled: {
      type: Boolean,
      default: false
    },
    uploadFile: {
      type: Array,
      default: () => []
    }

  },
  data() {
    return {
      headers: {
        Authorization: sessionStorage.token
      },
      loading: false,
      fileList: []
      //  uploadFile: [],
    }
  },
  watch: {
    uploadFile(val) {
      if (val) {
        this.fileList = val
      }
    }
  },
  methods: {
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    handleProgress() {
      this.loading = true
    },
    handleImgError() {
      this.loading = false
    },
    onSuccess(response, file, fileList) {
      this.loading = false
      if (response.code === 200) {
        this.removal(file, fileList)
      } else {
        this.$message.warning('上传失败！')
      }
    },
    onRemove(file, fileList) {
      this.fileList = fileList
      this.$emit('handleSuccess', this.fileList)
    },
    removal(file, fileList) {
      if (this.fileList.length === 0) {
        this.fileList = fileList.map((item) => {
          return {
            ...item,
            url: item?.url ?? item?.response?.obj
          }
        })
      } else {
        const fileListUrl = fileList.map((item) => {
          return {
            ...item,
            url: item?.url ?? item?.response?.obj
          }
        })
        const arr = this.$deepClone(this.fileList)
        const set = new Set()
        arr.forEach((item) => {
          set.add(item.name)
        })
        if (set.has(file.name)) {
          const obj = { ...file, url: file?.response?.obj }
          this.fileList = arr.map((item) => {
            if (item.name === file.name) {
              return obj
            } else {
              return item
            }
          })
        } else {
          this.fileList = fileListUrl
        }
      }
      this.$emit('handleSuccess', this.fileList)
    },
    beforeUpload(file) {
      const isPdf = file.type === 'application/pdf'
      const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      const isDoc = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      const isType = (isExcel || isPdf || isDoc) // 限制图片类型
      const isLimit = file.size / 1024 / 1024 < this.size // 限制图片大小
      if (!isType) {
        this.$message.error(`（只允许上传pdf、word、excel文件格式）`)
      }
      if (!isLimit) {
        this.$message.error(`上传文件大小不能超过 ${this.size}MB!`)
      }
      return isType && isLimit
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
