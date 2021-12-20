<template>
  <div class="upload-div">
    <el-upload
      class="avatar-uploader"
      :action="uploadUrl"
      :data="uploadData"
      :show-file-list="false"
      accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      :headers="headers"
      :disabled="disabled"
    >
      <img v-if="image" :src="image" class="avatar" title="更换图片">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
  </div>
</template>

<script>
// import axios from 'axios'

// const service = axios.create({
//   baseURL: process.env.FILE_URL, // api的base_url
//   timeout: 5000 // 请求超时时间
// })
// service.interceptors.request.use(config => {
//   let token1 = localStorage.getItem("token");
//   config.headers.Authorization = token1;
//   return config;
// });
export default {
  components: {},
  props: {
    // eslint-disable-next-line vue/require-default-prop
    moduleName: { type: String, require: true },
    // eslint-disable-next-line vue/require-default-prop
    fileType: { type: String, require: true },
    // eslint-disable-next-line vue/require-default-prop
    imageUrl: { type: String, require: true },
    disabled: { type: Boolean, default: false }
  },
  data() {
    return {
      uploadUrl: process.env.BASE_URL + process.env.UPLOAD_MODEL + '/file/upload',
      uploadData: {
        'moduleName': this.moduleName,
        'fileType': this.fileType
      },
      dialogVisible: false,
      headers: {
        Authorization: window.sessionStorage.getItem('token')
      },
      image: null

    }
  },
  watch: {
    imageUrl(val) {
      if (this.image != val) {
        this.image = val
      }
    }
  },
  methods: {
    initData(data, disabled) {
      this.image = data
      this.disabled = disabled
    },
    beforeUpload(file) {
      if (!file) {
        return false
      }
    },
    handleSuccess(response) {
      if (response.code === this.$successCode) {
        this.image = response.obj
        this.$emit('uploadSuccess', this.image)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
