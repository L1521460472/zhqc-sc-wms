<template>
  <el-dialog title="导入" :visible.sync="visible" class="demo-box" width="60%">
    <form id="upload" enctype="multipart/form-data" method="post">
      <el-upload
        ref="upload"
        class="upload-demo"
        action=""
        :multiple="false"
        :file-list="fileList"
        :before-upload="beforeUpload"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        :auto-upload="false"
      >
        <el-button slot="trigger" v-waves size="small" type="primary">选取文件</el-button>
        <el-button v-waves style="margin-left:10px;margin-top: -10px" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件，且不超过2MB</div>
      </el-upload>
    </form>
  </el-dialog>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      visible: false,
      fileList: [],
      submitObj: new FormData(),
      parmJson: null,
      doUpload: '#'
    }
  },
  created() {
    this.exchange.$on('showImportExcel', parmJson => {
      if (parmJson) {
        this.parmJson = Object.assign({}, parmJson)
      }
      this.visible = true
    })
  },
  methods: {
    addParmJson() {
      if (!this.parmJson) {
        return
      }
      for (var key in this.parmJson) {
        this.submitObj.append(key, this.parmJson[key])
      }
    },
    beforeUpload(file) {
      this.submitObj = new FormData()
      this.addParmJson()
      this.submitObj.append('uploadFileName', file.name)
      this.submitObj.append('uploadFile', file)
      return false
    },
    submitUpload() {
      this.$refs.upload.submit()
      const config = {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      const fileName = this.submitObj.get('uploadFileName')
      this.$httpwms.post('/inv/PODStatus/importPODStatus', this.submitObj).then((res) => {
        if (res.code === 200) {
          this.$message.success(res.msg)
        } else {
          this.$message.error('导入失败,具体原因请查看excel')
          this.$httpwms.post('/inv/PODStatus/importPODStatus', this.submitObj, config).then((res) => {
            const file = fileName
            const blob = new Blob([res], { type: 'application/x-xls' })
            if (window.navigator.msSaveOrOpenBlob) {
              navigator.msSaveBlob(blob, file)
            } else {
              var link = document.createElement('a')
              link.href = window.URL.createObjectURL(blob)
              link.download = file
              link.click()
              window.URL.revokeObjectURL(link.href)
            }
          }).catch(() => {
          })
        }
      })
        .catch(() => {

        })
    },
    handleRemove() {

    }
  }
}
</script>
