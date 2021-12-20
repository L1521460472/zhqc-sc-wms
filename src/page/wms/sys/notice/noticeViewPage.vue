<!--
 * @Descripttion:
 * @version:
 * @Author: chentianyu
 * @Date: 2021-07-08 09:40:25
 * @LastEditors: chentianyu
 * @LastEditTime: 2021-10-27 15:24:49
-->
<template>
  <div>
    <full-pop
      :visible="visible"
      :top-title="dialogInfo.title"
      :close-btn="dialogInfo.closeBtn"
      :save-list="dialogInfo.btList"
      @handleClick="handleClick"
    >
      <div class="notice-title"><span>{{ respData.topic }}</span></div>
      <div class="notice-content" v-html="respData.htmlContent" />
      <div class="notice-foot">
        <p><span>发布人：</span><span>{{ respData.publisherName }}</span></p>
        <p><span>发布时间：</span><span>{{ respData.publishTime }}</span></p>
      </div>

      <div class="upload-box">
        <uploadfile
          ref="uploadImg"
          :export-url="uploadInfo.exportImgUrl"
          :accept="uploadInfo.accept"
          :upload-file="uploadInfo.fileList"
          :show-tips="false"
          :disabled="true"
          @handleSuccess="changeFileList"
        />
        <!-- <ul class="file-ul">
          <li v-for="(v,i) in uploadInfo.fileList" :key="i" class="file-li">
            <a :href="v.url">{{ v.name }}</a>
          </li>
        </ul> -->
      </div>

    </full-pop>

  </div>
</template>

<script>
import uploadfile from './components/OnlyShowUploadfile.vue'
export default {
  name: 'NoticeViewPage',
  components: { uploadfile },
  data() {
    return {
      store: 'notice/',
      modName: 'notice',
      respData: {},
      dialogInfo: {
        title: '公告详情',
        addDtBtnShow: false,
        closeBtn: { label: '', type: '', icon: '', event: 'closeDialog', show: true },
        btList: []
      },
      uploadInfo: {
        exportImgUrl: process.env.VUE_APP_BASE_URL + 'fileMgr/fileManager/upload2Path',
        fileList: [],
        disabled: true,
        accept: [{ type: 'img', limit: 6 }]
      }
    }
  },
  computed: {
    visible() {
      if (this.$store.state[this.modName].noticeViewPage.visible) {
        this.openPage()
      }
      return this.$store.state[this.modName].noticeViewPage.visible
    }
  },
  watch: {
  },
  mounted() {

  },
  methods: {
    openPage() {
      const id = this.$store.state[this.modName].noticeViewPage.id
      this.$store.dispatch(this.store + 'initUpdate', id).then(() => {
        this.respData = this.$store.state[this.modName].initUpdateObj.entity
        this.uploadInfo.fileList = this.respData.resources
        console.log(this.uploadInfo.fileList)
      })
    },
    closeDialog() {
      this.$store.dispatch(this.store + 'setData', { visible: false, page: 'noticeViewPage' })
    },
    // 统一按钮点击事件方法入口，event:自定义方法名称（notification.js中定义的方法名），data:方法参数
    handleClick(event, data) {
      if (event) {
        this[event](data)
      }
    }
  }
}
</script>
<style>
  .notice-title{
    text-align: center;
    margin: 15px;
    font-size: 30px;
  }
  .notice-content{
    width:100%;
    padding: 0px 10px;
  }
  .notice-content img{
    max-width:90%;
  }
</style>
