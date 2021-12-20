<template>
  <div style="width: 100%;">
    <div class="upload-image" style="z-index: 20110;width:100%;display: flex;flex-wrap: wrap">
      <div v-if="imageView.previewSrcList.length > 0" class="upload-image-viewer">
        <div
          v-for="(item, index) in imageView.previewSrcList"
          :key="index"
          class="upload-image-viewer-hover"
          @mouseover="hoverIndex = index"
          @mouseout="hoverIndex = -1"
        >
          <div :class="[index == hoverIndex ? 'image-item' : 'image-item-none']">
            <div class="icon-ju-wei">
              <div style="width: 100%">
                <span class="el-icon-zoom-in icon-margin" @click="openViewer(item)" />
                <span v-if="!disabled" class="el-icon-delete icon-margin" @click="deleteItem(item)" />
              </div>
            </div>
          </div>
          <img v-if="item.endsWith('.pdf')" class="image-item-img" alt="" src="data:image/jpeg;base64,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">
          <img v-else :src="item" alt="" class="image-item-img">
        </div>
      </div>
      <el-upload
        v-loading="loading"
        :accept="uploadOp.accept"
        :headers="headers"
        :action="exportUrl"
        :file-list="fileList"
        :show-file-list="false"
        :class="{hide:showUpload}"
        :on-remove="handleRemove"
        :on-success="handleImgSuccess"
        :on-error="handleImgError"
        :on-progress="handleProgress"
        :on-change="handleEditChange"
        :on-preview="handlePictureCardPreview"
        :before-upload="beforeAvatarUpload"
        :auto-upload="autoUpload"
        :disabled="disabled"
        list-type="picture-card"
        name="uploadFile"
        multiple
      >
        <i slot="default" class="el-icon-plus" />
      </el-upload>
      <image-viewer
        v-show="imageView.showViewer"
        :z-index="imageView.zIndex"
        :initial-index="imageView.imageIndex"
        :on-close="closeViewer"
        :url-list="imageView.previewSrcList"
      />
      <pdf-view ref="pdfview" :url="url" />
    </div>
    <div v-if="showTips && uploadTips" style="color: #606266;">{{ uploadTips }}</div>
  </div>
</template>

<script>
import ImageViewer from '@/Subassembly/ImageView/image-viewer'
import PdfView from '@/Subassembly/ZhqcPdfView/index.vue'

export default {
  name: 'Upload',
  components: {
    ImageViewer,
    PdfView
  },

  props: {
    imgPreSrcList: {
      type: Array,
      default: () => []
    },
    exportUrl: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    show: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 3
    },
    showTips: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      default: 2
    },
    // eslint-disable-next-line vue/require-default-prop
    accept: {
      type: [String, Array, Object]
    }
  },

  data() {
    return {
      headers: {
        Authorization: sessionStorage.token
      },
      loading: false,
      hoverIndex: -1, // 菜单hover索引
      activeLinkId: 0, // 当前激活的菜单id
      uploadUrl: null,
      showUpload: false,
      dialogImageUrl: '',
      dialogVisible: false,
      uploadFile: [],
      fileList: [],
      upimageList: [],
      imageViewShow: false,
      thisTitle: '',
      imgData: {
        fileList: []
      },
      imageView: {
        zIndex: 333,
        imageIndex: undefined,
        showViewer: false,
        previewSrcList: []
      },
      url: '',
      uploadOp: {
        limit: 0,
        limitPdf: 0,
        limitDoc: 0,
        limitImg: 0,
        accept: ''
      },
      uploadTips: ''
    }
  },

  watch: {
    imgPreSrcList(val) {
      if (val) {
        this.imageView.previewSrcList = val
        if (this.imageView.previewSrcList.length >= this.uploadOp.limit) {
          this.showUpload = true
        } else {
          this.showUpload = false
        }
      }
    }
  },

  created() {
    this.imageView.previewSrcList = []
    this.initOptions()
  },

  mounted() {
    this.$nextTick(() => {
      this.showUpload = this.disabled
    })
  },

  methods: {
    initOptions() {
      if (Object.prototype.toString.call(this.accept) === '[object String]') {
        this.uploadOp.limit = this.limit
        this.uploadOp.accept = this.accept
      } else {
        const accept = this.accept || [{ type: 'pdf', limit: 1 }, { type: 'img', limit: 3 }]
        this.uploadOp.accept = accept.map(item => {
          if (item.type === 'pdf') {
            this.uploadOp.limitPdf = item.limit
            this.uploadOp.limit += item.limit
            return '.pdf'
          }
          if (item.type === 'doc') {
            this.uploadOp.limitDoc = item.limit
            this.uploadOp.limit += item.limit
            return '.doc,.docx'
          }
          if (item.type === 'img') {
            this.uploadOp.limitImg = item.limit
            this.uploadOp.limit += item.limit
            return '.jpg,.png,.JPG,.PNG'
          }
        }).toString()
        this.uploadTips = `（支持上传${this.uploadOp.limitPdf ? 'PDF' + this.uploadOp.limitPdf + '份，' : ''}${this.uploadOp.limitDoc ? '文档' + this.uploadOp.limitDoc + '份，' : ''}${this.uploadOp.limitImg ? '图片' + this.uploadOp.limitImg + '张' : ''}，单个不超过${this.size}M，总共不能超过${this.uploadOp.limit * this.size}M）`
      }
    },
    // 上传前 校验图片格式
    beforeAvatarUpload(file) {
      if (!this.validate(file)) {
        return false
      }
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isPdf = file.type === 'application/pdf'
      const isDoc = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      const isType = (isJPG || isPNG || isPdf || isDoc) // 限制图片类型
      const isLimit = file.size / 1024 / 1024 < this.size // 限制图片大小
      if (!isType) {
        this.$message.error(`（只允许上传${this.uploadOp.limitPdf ? 'PDF，' : ''}${this.uploadOp.limitDoc ? '文档，' : ''}JPG 或 PNG 格式图片！`)
      }
      if (!isLimit) {
        this.$message.error(`上传图片大小不能超过 ${this.size}MB!`)
      }
      return isType && isLimit
    },
    // 组件自身删除监听事件
    handleRemove() {},
    // 删除列表中图片
    deleteItem(url) {
      this.imageView.previewSrcList.reduce((prev, cur, index) => {
        if (url == cur) {
          this.imageView.previewSrcList.splice(index, 1)
        }
        return cur
      }, 0)
      if (this.imageView.previewSrcList.length < this.uploadOp.limit) {
        this.showUpload = false
      }
      this.$emit('handleRemove', this.imageView.previewSrcList)
    },
    downloadItem(url) {
      console.log(url)
    },
    // 监听列表中图片改变
    handleEditChange() {
      if (this.imageView.previewSrcList.length >= this.uploadOp.limit) {
        this.showUpload = true
      }
    },
    // 图片上传时的回调
    handleProgress() {
      this.loading = true
    },
    // 预览的关闭
    closeViewer() {
      this.imageView.showViewer = false
    },
    //
    handlePictureCardPreview() {
    },
    openViewer(url) {
      if (url.endsWith('.pdf')) {
        this.showPdfView(url)
      } else {
        this.imageView.previewSrcList.reduce((prev, cur, index) => {
          if (url == cur) {
            this.imageView.imageIndex = index
            this.imageView.showViewer = true
          }
          return cur
        }, 0)
      }
    },
    showPdfView(url) {
      this.url = url
      this.$refs.pdfview.show()
    },
    handleImgSuccess(response, file) {
      if (!this.validate(file)) {
        this.loading = false
        return false
      }
      this.loading = false
      if (response.code == 200) {
        if (this.imageView.previewSrcList.length < this.uploadOp.limit) {
          this.imageView.previewSrcList.push(response.obj)
        }
        this.$emit('handleImgSuccess', this.imageView.previewSrcList)
      }
    },
    // 上传错误的回调方法
    handleImgError() { },

    /* 文件上传前校验 */
    validate(file) {
      if (/.pdf/g.test(file.name) && this.imageView.previewSrcList.filter(item => item.endsWith('.pdf') || item.endsWith('.PDF')).length) {
        this.$message.error(`只允许上传${this.uploadOp.limitPdf}份PDF文件！`)
        return false
      }
      if (/.doc|docx/g.test(file.name) && this.imageView.previewSrcList.filter(item => item.endsWith('.doc') || item.endsWith('.docx')).length) {
        this.$message.error(`只允许上传${this.uploadOp.limitDoc}份文档！`)
        return false
      }
      if (/.jpg|.png|.JPG|.PNG/g.test(file.name) && this.imageView.previewSrcList.filter(item => item.endsWith('.jpg') || item.endsWith('.JPG') || item.endsWith('.png') || item.endsWith('.PNG')).length === this.uploadOp.limitImg) {
        this.$message.error(`只允许上传${this.uploadOp.limitImg}张图片！`)
        return false
      }
      return true
    }
  }
}
</script>

<style>
.el-upload--picture-card{
  background-color:#fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  box-sizing:border-box;;
  width: 100px;
  height: 100px;
  line-height: 100px;
  vertical-align: top;
}
</style>

<style scoped>
  .addLeft {
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
  .upload-image{
    width: 100%;
  }
  .image-item {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    cursor: default;
    text-align: center;
    color: #fff;
    opacity: 1;
    font-size: 20px;
    background-color: rgba(0, 0, 0, .5);
    transition: opacity .3s;
    border-radius: 10px;
  }

  .icon-ju-wei {
    display: flex;
    align-items: center;
    justify-items: center;
    width: 100%;
    height: 100%;
    flex-direction: row
  }

  .image-item-none {
    display: none;
  }

  .upload-image-viewer {
    display: flex;
    flex-wrap: wrap;
  }
  .upload-image-viewer-hover {
    width: 100px;
    height: 100px;
    margin-right: 10px;
    margin-bottom: 10px;
    position: relative
  }

  .icon-margin {
    margin-right: 6px;
    margin-left: 6px
  }

  .image-item-img {
    width: 100px;
    height: 100px;
    border-radius: 10px
  }
</style>
