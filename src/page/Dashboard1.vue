<template>
  <div id="app">
    <!-- 首页布局 -->
    <div v-loading="loading" class="index-wrap">
      <!-- <iframe src="http://192.168.20.87:8231/index" frameborder="0" width="100%" height="100%"></iframe> -->
      <iframe ref="iframe" src="http://14.23.63.203:8230/dataView" frameborder="0" width="100%" height="100%" />
    </div>
  </div>
</template>

<script>
import path from 'path'
require('echarts/theme/macarons')

export default {
  name: 'Dashboard',
  inject: ['reload'],
  data() {
    return {
      loading: true,
      reqForm: {},
      asnData: {},
      soData: {},
      noticeList: [],
      homeRep: [],
      dialogInfo: {
        title: '公告详情',
        addDtBtnShow: false,
        closeBtn: {
          label: '',
          type: '',
          icon: '',
          event: 'closeDialog',
          show: true
        },
        btList: [],
        noticeData: {}
      },
      searchPool: window.sessionStorage.getItem('sideMenus')
    }
  },
  mounted() {
    const { iframe } = this.$refs
    // IE和非IE浏览器，监听iframe加载事件不一样，需要兼容
    const that = this
    if (iframe.attachEvent) {
      // IE
      iframe.attachEvent('onload', () => {
        that.loading = false
      })
    } else {
      // 非IE
      iframe.onload = function() {
        that.loading = false
      }
    }
    this.initPage() // 初始化界面数据
  },
  methods: {
    initPage() {
      this.$store.dispatch('login/initPageHome').then(() => {
        const resp = this.$store.state.login.homeResp
        if (this.$store.state.login.homeResp.code === 200) {
          //
          this.asnData = resp.obj.asnHomePO
          this.soData = resp.obj.soHomePO
          if (resp.obj.noticeList && resp.obj.noticeList.list) {
            this.noticeList = resp.obj.noticeList.list
          }
          this.homeRep = resp.obj.homeRepList
          this.reqForm.startDate = resp.obj.startDate
          this.reqForm.endDate = resp.obj.endDate
          // this.initChart(resp.obj.homeRepList);
        } else {
          this.$message.error(resp.msg)
        }
        this.searchPool = this.generateRoutes(this.routes)
      })
    },
    generateRoutes(routes, basePath = '/', prefixTitle = []) {
      let res = []
      for (const router of routes) {
        const data = {
          path: path.resolve(basePath, router.index),
          title: [...prefixTitle]
        }
        if (router.title) {
          data.title = [...data.title, router.title]
        }
        if (router.subs) {
          const tempRoutes = this.generateRoutes(router.subs, data.index, data.title)
          if (tempRoutes.length >= 1) {
            res = [...res, ...tempRoutes]
          }
        } else {
          res.push(data)
        }
      }
      return res
    }
  }
}
</script>
<!--首页css-->
<style rel="stylesheet/scss" lang="scss">
/*滚动条*/
::-webkit-scrollbar {
  width: 7px;
  height: 10px;
  background-color: #f5f5f5;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
}
::-webkit-scrollbar-thumb {
  background-color: #acacac;
  border-radius: 8px;
}

table {
  border-spacing: 0;
  border-collapse: collapse;
}

/*公共布局*/
#app {
  height: 100%;
}

/*首页*/
* {
  padding: 0;
  margin: 0;
}

body,
html {
  width: 100%;
  height: 100%;
}
*,
:after,
:before {
  -webkit-box-sizing: border-box;
  -o-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  outline: none;
}
.index-wrap {
  min-height: calc(100vh - 88px);
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #edf3f8;
}

.index-wrap iframe{
  width: 100%;
  height: calc(100vh - 88px);
}

</style>
