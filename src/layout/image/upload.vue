<template>
  <div style="z-index: 20110;" class="upload-image">
    <el-upload
      :disabled="disabled"
      action="auto"
      :http-request="uploadSectionFile"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :file-list="imgData.fileList"
      :limit="limit"
      :on-change="handleEditChange"
      :class="{hide:showUpload}"
      class="contentImgStyle"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <!--    -->
    <div v-if="dialogVisible" class="addLeft" style="z-index: 30120;position: fixed;top: 0;left: 0;width: 100%;height: 100%;background-color:rgba(0,0,0,0.6);display: flex;justify-content: center;align-items: center" @click="close">
      <div style="display: flex;flex-direction: row;justify-content: center;align-items: center;z-index: 32121;background-color: #fff;width: 650px;height: 650px;position: relative;border-radius: 10px">
        <div style="display: flex;flex-direction: row;justify-content: space-between;position: absolute;bottom: 10px">
          <el-button @click="close">关闭</el-button>
        </div>
        <div style="width: 570px;height: 560px;display: flex;justify-content: center;align-items: center;">
          <img :src="dialogImageUrl" alt="" style="z-index: 32120;width: 100%;height: 100%">
        </div>
      </div>
    </div>
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
  name: 'Upload',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    imgDataTest: {
      type: Object
    },
    disabled: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 9
    }
  },
  data() {
    return {
      showUpload: false,
      dialogImageUrl: '',
      dialogVisible: false,
      uploadFile: [],
      thisTitle: '',

      uploadUrl: process.env.BASE_URL + process.env.UPLOAD_MODEL + '/file/upload',
      imgData: {
        fileList: []
      }
    }
  },
  //
  created() {
    if (this.imgDataTest.fileList.length && this.imgDataTest.fileList.length > 0) {
      this.imgData.fileList = this.imgDataTest.fileList
    }

    this.imgData.fileList.splice(0, 1)
  },

  methods: {
    //
    uploadSectionFile(param) {
      const uploadFileLength = this.uploadFile.length

      const fileObj = param.file

      if (fileObj.type === 'image/jpeg') {
        const file = new File([fileObj], new Date().getTime() + '.jpg', {
          type: 'image/jpeg'
        })
        this.uploadFile[uploadFileLength] = { 'title': this.thisTitle, 'imgFile': file }
      } else if (fileObj.type === 'image/png') {
        const file = new File([fileObj], new Date().getTime() + '.png', {
          type: 'image/png'
        })
        this.uploadFile[uploadFileLength] = { 'title': this.thisTitle, 'imgFile': file }
      } else {
        this.$message.error('只能上传jpg/png文件')
        return
      }
    },
    //
    upload(data) {
      //
      var param = new FormData() // FormData 对象
      for (var int = 0; int < this.uploadFile.length; int++) {
        // var param = new FormData(); // FormData 对象
        var list = this.uploadFile[int]
        var imgFiles = list.imgFile
        var name = list.title
        param.append('imgFiles', imgFiles) // 文件对象
        param.append('ownerSkuCode', name) // 其他参数
      }
      //
      if (data.type === 'add') {
        param.append('addreq', JSON.stringify(data.data))
      } else {
        param.append('updateReq ', JSON.stringify(data.data))
      }
      const config = {
        timeout: 50000, // 请求超时时间
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      service.post(this.uploadUrl, param, config).then((res) => {
        this.$emit('handleRequest', res)
        // if(res.type === "multipart/form-data"){
        //   var blob = new Blob([res])
        //   var reader = new FileReader();
        //   reader.readAsText(blob, 'utf-8');
        //   var that = this;
        //   reader.onload = function (e) {
        //     var resp = JSON.parse(reader.result);
        //     if(resp.code === 200){
        //       that.$message.success(resp.msg);
        //     }else{
        //       that.$message.error(resp.msg);
        //     }
        //   }
        // }
      }).catch(e => {
        this.$message.error('下载异常，请稍后重试')
      })
    },
    handleRemove(file) {
      this.$emit('handleRemove', file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleEditChange(file, fileList) {
      if (fileList.length >= this.limit) {
        this.showUpload = true
        this.$message.error('最多只能上传9张！')
      }
    },
    close() {
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>
  .addLeft{
    animation-name: slideInLeft;
    animation-duration: .5s;
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
  .upload-image >>> .hide .el-upload--picture-card {
    display: none;
  }
</style>
