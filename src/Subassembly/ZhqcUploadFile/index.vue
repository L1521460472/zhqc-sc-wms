<template>
  <el-upload
    ref="upload"
    :multiple="multiple"
    :name="name"
    :accept="accept"
    :auto-upload="autoUpload"
    :file-list="fileList"
    :action="action"
    :on-success="onSuccess"
    :on-remove="onRemove"
  >
    <el-button slot="trigger" size="small" type="primary">{{ btnText }}</el-button>
    <el-button v-if="!autoUpload" style="margin-left: 10px;" size="small" type="success" @click="submitUpload">{{ uploadBtnText }}</el-button>
  </el-upload>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'uploadFile'
    },
    accept: {
      type: String,
      default: '.jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP'
    },
    action: {
      type: String,
      default: process.env.VUE_APP_BASE_URL + 'fileMgr/fileManager/upload2Path'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    fileList: {
      type: Array,
      default() {
        return []
      }
    },
    btnText: {
      type: String,
      default: '选取文件'
    },
    uploadBtnText: {
      type: String,
      default: '上传'
    }
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
    },
    onSuccess(response, file, fileList) {
      this.$emit('onSuccess', { response, file, fileList })
    },
    onRemove(file, fileList) {
      this.$emit('onRemove', { file, fileList })
    }
  }
}
</script>
