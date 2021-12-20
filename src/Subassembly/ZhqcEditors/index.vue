<template>
  <div id="wangeditor">
    <div ref="editorElem" style="text-align:left" @input="handleChange" />
  </div>
</template>
<script>
import E from 'wangeditor'
// import { XJL_AddImgApi } from '../api/requset'
export default {
  name: 'EditorElem',
  // eslint-disable-next-line vue/require-prop-types
  props: ['editChange', 'htmlVal', 'clearEditVal'],
  data() {
    return {
      editor: null,
      editorContent: ''
    }
  }, // 接收父组件的方法
  mounted() {
    this.seteditor()
    if (this.htmlVal) {
      setTimeout(() => {
        this.editor.txt.html(this.htmlVal)
      }, 500)
    }
    if (this.clearEditVal) {
      this.editor.txt.html('')
    } else {
      setTimeout(() => {
        this.editor.txt.html(this.htmlVal)
      }, 500)
    }
  },
  methods: {
    seteditor() {
      this.editor = new E(this.$refs.editorElem)
      this.editor.config.uploadImgShowBase64 = false // base 64 存储图片，如果这个参数设置为true的话，就不用配置服务器端上传地址
      this.editor.config.showLinkImg = false //   禁止上传网络图片
      this.editor.config.uploadImgShowBase64 = true
      // this.editor.config.uploadImgServer = '/api/app/common/imgAdd' // 这是服务器端上传图片的接口路径
      // this.editor.config.uploadImgHeaders = {
      //   'Content-Type': 'multipart/form-data'
      // } // 自定义 header  上传文件格式为file文件，用form-data格式
      // this.editor.config.uploadFileName = 'imgFile' // 后端接受上传文件的参数名
      // this.editor.config.uploadImgMaxSize = 2 * 1024 * 1024 // 将图片大小限制为 2M
      // this.editor.config.uploadImgMaxLength = 6 // 限制一次最多上传 6张图片
      // this.editor.config.uploadImgTimeout = 3 * 60 * 1000 // 设置超时时间

      // 配置菜单
      this.editor.config.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'emoticon', // 表情
        'image', // 插入图片
        'table', // 表格
        'code', // 插入代码
        'undo', // 撤销
        'redo', // 重复
        'fullscreen' // 全屏
      ]

      this.editor.config.uploadImgHooks = {
        // eslint-disable-next-line no-unused-vars
        fail: (xhr, editor, result) => {
          // 插入图片失败回调
        },
        // eslint-disable-next-line no-unused-vars
        success: (xhr, editor, result) => {
          // 图片上传成功回调
        },
        // eslint-disable-next-line no-unused-vars
        timeout: (xhr, editor) => {
          // 网络超时的回调
        },
        // eslint-disable-next-line no-unused-vars
        error: (xhr, editor) => {
          // 图片上传错误的回调
        }
      }
      // =======================================重点如下：
      // this.editor.config.uploadImgShowBase64 = false 如果这个参数设置true，也就不用下面这些了，
      // this.editor.config.customUploadImg = (files, insert) => {
      //   var formData = new FormData()
      //   for (var i = 0; i < files.length; i++) {
      //     formData.append('imgFile', files[i], files[i].name) //  多张图片文件都放进一个form-data，有些小伙伴说这里应该这样写：formData.append("file[" + i + "]", files[i], files[i].name)，后端才能拿到完整的图片数组，其实不然，用这个formData.getAll("file")方法恰好拿到数组，或者也可以forEach获取，有很多种办法。
      //   }
      // XJL_AddImgApi(formData).then((da) => {
      //   if (da.code == 200) {
      //     insert(da.data)
      //   } else {
      //     return
      //   }
      // })
      // }
      this.editor.config.onchange = (html) => {
        this.$emit('editChange', html) // 将内容同步到父组件中
      }
      // 创建富文本编辑器
      this.editor.create() // 创建富文本实例
    },
    handleChange() {
      this.editor.config.onchange = (newHtml) => {
        this.$emit('editChange', newHtml)
      }
    }
  }
}
</script>
<style>
</style>
