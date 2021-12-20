<template>
  <div id="app">
    <!-- 首页布局 -->
    <div class="index-wrap">
      <div
        class="index-wrap-cont"
        style="float: left; width: calc(100% - 250px); min-height: 900px"
      >
        <div class="index-section-top">
          <div class="section-reveal">
            <div class="reveal-item reveal-item-left">
              <div class="reveal-item-block index-flex-center color-block-left">
                <div class="reveal-text">
                  <img class="reveal-text-img" src="../assets/left-ruku.png" alt="">
                  <div class="strong">
                    <strong>{{ asnData.asnQty }}</strong><span>|</span><strong>{{ asnData.asnDtQty }}</strong>
                  </div>
                  <p>入库单</p>
                </div>
              </div>
              <div class="reveal-item-block">
                <div class="sub-item1-block index-flex-center sub-item1-block-color-1">
                  <div class="sub-reveal-cont">
                    <img class="sub-reveal-img" src="../assets/ruku-icon-1.png" alt="">
                    <div class="sub-reveal-text">
                      <div class="strong">
                        <strong>{{ asnData.asnWaitArriveQty }}</strong><span>|</span><strong>{{ asnData.asnDtWaitArriveQty }}</strong>
                      </div>
                      <p>待收货</p>
                    </div>
                  </div>
                </div>
                <div class="sub-item1-block index-flex-center sub-item1-block-color-2">
                  <div class="sub-reveal-cont">
                    <img class="sub-reveal-img" src="../assets/ruku-icon-2.png" alt="">
                    <div class="sub-reveal-text">
                      <div class="strong">
                        <strong>{{ asnData.asnInstoreQty }}</strong><span>|</span><strong>{{ asnData.asnDtInstoreQty }}</strong>
                      </div>
                      <p>已入库</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="reveal-item-block">
                <div class="sub-item1-block index-flex-center sub-item1-block-color-3">
                  <div class="sub-reveal-cont">
                    <img class="sub-reveal-img" src="../assets/ruku-icon-3.png" alt="">
                    <div class="sub-reveal-text">
                      <div class="strong">
                        <strong>{{ asnData.asnWaitInstoreQty }}</strong><span>|</span><strong>{{ asnData.asnDtWaitInstoreQty }}</strong>
                      </div>
                      <p>待入库</p>
                    </div>
                  </div>
                </div>
                <div class="sub-item1-block index-flex-center sub-item1-block-color-4">
                  <div class="sub-reveal-cont">
                    <img class="sub-reveal-img" src="../assets/ruku-icon-4.png" alt="">
                    <div class="sub-reveal-text">
                      <div class="strong">
                        <strong>{{ asnData.asnCancelQty }}</strong><span>|</span><strong>{{ asnData.asnDtCancelQty }}</strong>
                      </div>
                      <p>已取消</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="reveal-item reveal-item-right">
              <div
                class="reveal-item-block index-flex-center color-block-right"
              >
                <div class="reveal-text">
                  <img class="reveal-text-img" src="../assets/right-chuku.png" alt="">
                  <div class="strong">
                    <strong>{{ soData.soQty }}</strong><span>|</span><strong>{{ soData.soDtQty }}</strong>
                  </div>
                  <p>出库单</p>
                </div>
              </div>
              <div class="reveal-item-block">
                <div class="sub-item1-block index-flex-center sub-item1-block-color-5">
                  <div class="sub-reveal-cont">
                    <img class="sub-reveal-img" src="../assets/chuku-icon-1.png" alt="">
                    <div class="sub-reveal-text">
                      <div class="strong">
                        <strong>{{ soData.soWaitAssignQty }}</strong><span>|</span><strong>{{ soData.soDtWaitAssignQty }}</strong>
                      </div>
                      <p>待分配</p>
                    </div>
                  </div>
                </div>
                <div class="sub-item1-block index-flex-center sub-item1-block-color-6">
                  <div class="sub-reveal-cont">
                    <img class="sub-reveal-img" src="../assets/chuku-icon-2.png" alt="">
                    <div class="sub-reveal-text">
                      <div class="strong">
                        <strong>{{ soData.soSendQty }}</strong><span>|</span><strong>{{ soData.soDtSendQty }}</strong>
                      </div>
                      <p>已出库</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="reveal-item-block">
                <div class="sub-item1-block index-flex-center sub-item1-block-color-7">
                  <div class="sub-reveal-cont">
                    <img class="sub-reveal-img" src="../assets/chuku-icon-3.png" alt="">
                    <div class="sub-reveal-text">
                      <div class="strong">
                        <strong>{{ soData.soWaitSendQty }}</strong><span>|</span><strong>{{ soData.soDtWaitSendQty }}</strong>
                      </div>
                      <p>待出库</p>
                    </div>
                  </div>
                </div>
                <div class="sub-item1-block index-flex-center sub-item1-block-color-8">
                  <div class="sub-reveal-cont">
                    <img class="sub-reveal-img" src="../assets/chuku-icon-4.png" alt="">
                    <div class="sub-reveal-text">
                      <div class="strong">
                        <strong>{{ soData.soCancelQty }}</strong><span>|</span><strong>{{ soData.soDtCancelQty }}</strong>
                      </div>
                      <p>已取消</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--<div class="section-notice">-->
          <!--<div class="section-tit">公告栏</div>-->
          <!--<div class="section-bd" v-show="noticeList">-->
          <!--<a v-for="item in noticeList" @click="showNotice(item)" class="notice-link-item">-->
          <!--<p class="links-txt">{{item.topic}}</p><span class="links-date">{{item.publishTime}}</span>-->
          <!--</a>-->
          <!--</div>-->
          <!--</div>-->
        </div>
        <div class="index-section-bottom">
          <div class="section-chart">
            <el-form
              ref="form"
              :model="reqForm"
              label-width="80px"
              size="small"
            >
              <el-form-item label="时间">
                <el-date-picker
                  v-model="reqForm.startDate"
                  type="date"
                  placeholder="起始日期"
                  :disabled="true"
                />
                <span>-</span>
                <el-date-picker
                  v-model="reqForm.endDate"
                  type="date"
                  placeholder="结束日期"
                  :disabled="true"
                />
                <!--<el-button type="primary">刷新</el-button>-->
              </el-form-item>
            </el-form>
            <div class="chart-cont">
              <div
                id="totalStockHour"
                class="todayall-canva"
                style="width: 100%; height: 600px"
              />
            </div>
          </div>
          <!--<div class="section-operation">-->
          <!--<div class="section-tit">我的待处理</div>-->
          <!--<div class="section-bd">-->

          <!--</div>-->
          <!--</div>-->
        </div>
      </div>
      <div class="index-wrap-cont" style="margin-left: calc(100% - 280px)">
        <div class="" style="min-height: 845px; background-color: #d1f3f0;border-radius: 4px;">
          <div class="section-operation">
            <div class="section-tit">公告栏</div>
            <div v-show="noticeList" class="section-bd">
              <div
                v-for="(item,index) in noticeList"
                :key="index"
                class="notice-link-item"
              >
                <p class="links-txt" @click="showNotice(item)">{{ item.topic }}</p>
                <span class="links-date" @click="showNotice(item)">{{ item.publishTime }}</span>
                <ul class="file-ul">
                  <li v-for="(v,i) in item.resources" :key="i" class="file-li">
                    <a :href="v.url">{{ v.name }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <full-pop
      :visible.sync="dialogInfo.visible"
      :top-title="dialogInfo.title"
      :close-btn="dialogInfo.closeBtn"
      :save-list="dialogInfo.btList"
      @handleClick="handleClick"
    >
      <div class="notice-title">
        <span>{{ dialogInfo.noticeData.topic }}</span>
      </div>
      <div
        class="notice-content"
        v-html="dialogInfo.noticeData.htmlContent"
      />
      <div class="notice-foot">
        <p>
          <span>发布人：</span><span>{{ dialogInfo.noticeData.publisherName }}</span>
        </p>
        <p>
          <span>发布时间：</span><span>{{ dialogInfo.noticeData.publishTime }}</span>
        </p>
      </div>
    </full-pop>
  </div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons')

export default {
  name: 'Dashboard',
  inject: ['reload'],

  data() {
    return {
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
      }
    }
  },
  mounted() {
    // 方法报错暂时注释掉
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
          this.initChart(resp.obj.homeRepList)
        } else {
          this.$message.error(resp.msg)
        }
      })
    },
    /**
     * 查询公告
     * @param data
     */
    queryTableData(data) {
      this.$showLoading()
      this.$store.dispatch('notice/pageInfo', data).then(() => {

      }).finally(() => {
        this.$hideLoading()
      })
    },

    initChart(data) {
      var billStock1 = echarts.init(document.getElementById('totalStockHour'))
      window.addEventListener('resize', function() {
        billStock1.resize()
      })
      const xData = []
      const inData = []
      const outData = []
      const stockData = []
      data.forEach((item) => {
        xData.push(item.statisticsDate)
        inData.push(item.asnQty)
        outData.push(item.soQty)
        stockData.push(item.stockQty)
      })

      const erp_option = {
        color: ['#0072ff', '#00e89e', '#0E0E0E', '#0072ff', '#00e89e'],
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(255,255,255,0.8)',
          borderColor: 'rgba(0,0,0,0.2)',
          borderWidth: 1,
          padding: 10,
          axisPointer: {
            type: 'shadow'
          },
          textStyle: {
            color: '#333'
          }
        },
        grid: {
          containLabel: true,
          left: '0%',
          right: '0%',
          top: 30,
          bottom: 60
        },
        legend: {
          top: 0,
          textStyle: {
            color: '#0077b3'
          },
          data: ['入库量', '出库量', '库存量', '入库趋势', '出库趋势']
        },
        xAxis: [
          {
            type: 'category',
            name: '日期',
            boundaryGap: true,
            axisLabel: {
              color: '#0077b3',
              fontSize: 13,
              margin: 15
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgba(0,119,179,0.3)'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: 'rgba(0,119,179,0)',
                type: 'dashed',
                width: 1
              }
            },
            data: xData
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单/件',
            axisLabel: {
              formatter: '{value}',
              color: '#0077b3',
              fontSize: 13,
              margin: 6
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(0,119,179,0.3)'
              }
            },
            axisTick: {
              show: false // 是否显示坐标轴刻度
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: 'rgba(0,119,179,0)',
                type: 'dashed',
                width: 1
              }
            }
          }
        ],
        dataZoom: [
          {
            show: true,
            height: 18,
            xAxisIndex: [0],
            bottom: 30,
            start: 0,
            end: 100,
            handleIcon:
                      'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: '110%',
            handleStyle: {
              color: 'rgba(0,0,0,0.2)'
            },
            textStyle: {
              color: '#0077b3'
            },
            borderColor: '#0077b3'
          },
          {
            type: 'inside',
            show: true,
            height: 15,
            start: 1,
            end: 35
          }
        ],
        series: [
          {
            name: '入库量',
            type: 'bar',
            stack: '总量',
            barMaxWidth: '50%',
            barGap: '10%',
            itemStyle: {
              normal: {
                color: '#00bcd4',
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  },
                  position: 'insideTop',
                  formatter: function(p) {
                    return p.value > 0 ? p.value : ''
                  }
                }
              }
            },
            data: inData
          },
          {
            name: '出库量',
            type: 'bar',
            stack: '总量',
            itemStyle: {
              normal: {
                barBorderRadius: 0,
                color: '#00b78e',
                label: {
                  show: true,
                  position: 'top',
                  formatter: function(p) {
                    return p.value > 0 ? p.value : ''
                  }
                }
              }
            },
            data: outData
          },
          {
            name: '库存量',
            type: 'line',
            smooth: true,
            showAllSymbol: true,
            symbol: 'emptyCircle',
            symbolSize: 10,
            lineStyle: {
              type: 'dashed',
              width: 0.5
            },
            itemStyle: {
              normal: {
                barBorderRadius: 0,
                label: {
                  show: true,
                  position: 'top',
                  formatter: function(p) {
                    return p.value > 0 ? p.value : ''
                  }
                }
              }
            },
            data: stockData
          },
          {
            name: '入库趋势',
            type: 'line',
            smooth: true,
            showAllSymbol: true,
            symbol: 'emptyCircle',
            symbolSize: 10,
            lineStyle: {
              type: 'dashed',
              width: 0.5
            },
            itemStyle: {
              normal: {
                barBorderRadius: 0,
                label: {
                  show: true,
                  position: 'top',
                  formatter: function(p) {
                    return p.value > 0 ? p.value : ''
                  }
                }
              }
            },
            data: inData
          },
          {
            name: '出库趋势',
            type: 'line',
            smooth: true,
            showAllSymbol: true,
            symbol: 'emptyCircle',
            symbolSize: 10,
            lineStyle: {
              type: 'dashed',
              width: 0.5
            },
            itemStyle: {
              normal: {
                barBorderRadius: 0,
                label: {
                  show: true,
                  position: 'top',
                  formatter: function(p) {
                    return p.value > 0 ? p.value : ''
                  }
                }
              }
            },
            data: outData
          }
        ]
      }
      billStock1.setOption(erp_option)
    },
    showNotice(data) {
      this.dialogInfo.visible = true
      this.dialogInfo.noticeData = data
    },
    closeDialog() {
      this.dialogInfo.visible = false
      this.dialogInfo.noticeData = {}
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
  .index-wrap-cont {
    padding: 20px;

  }

  .index-section-top {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    margin-bottom: 20px;
  }
  .index-section-top .section-reveal {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    margin-right: 10px;
  }
  .index-section-top .section-reveal .reveal-item {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    text-align: center;
  }
  .index-section-top .section-reveal .reveal-item:first-child {
    margin-right: 20px;
  }
  .reveal-item .reveal-item-block {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    margin-right: 5px;
  }
  .reveal-item .index-flex-center {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
  .reveal-item .reveal-item-block:last-child {
    margin-right: 0;
  }
  .reveal-item .color-block-left {
    background-color: #00b78e;
    color: #fff;
    height: 145px;
    border-radius: 4px;
  }
  .reveal-item .reveal-text span {
    display: inline-block;
    color: rgba(0, 0, 0, 0.2);
  }
  .reveal-item .reveal-text strong {
    display: inline-block;
    font-size: 30px;
    padding: 0 6px;
    vertical-align: middle;
  }
  .reveal-item .reveal-item-block .sub-item1-block {
    background-color: #fff;
    color: #4b5668;
    height: 70px;
    border-radius: 4px;
  }
  .reveal-item .reveal-item-block .sub-item1-block:first-child {
    margin-bottom: 5px;
  }
  .reveal-item .reveal-item-block .sub-item1-block .sub-reveal-cont{
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
  }
  .reveal-item .reveal-item-block .sub-item1-block .sub-reveal-cont .sub-reveal-img{
    width: 40px;
    height: 40px;
    margin-top: 7px;
    margin-right: 4px;
    opacity: 0.8;
  }
  .sub-item1-block-color-1{background-color: #ff6b5c !important;}
  .sub-item1-block-color-2{background-color: #31cdba !important;}
  .sub-item1-block-color-3{background-color: #8bc115 !important;}
  .sub-item1-block-color-4{background-color: #6dbfff !important;}
  .sub-item1-block-color-5{background-color: #019fee !important;}
  .sub-item1-block-color-6{background-color: #1fb97b !important;}
  .sub-item1-block-color-7{background-color: #dc7d39 !important;}
  .sub-item1-block-color-8{background-color: #bdb5ff !important;}
  .reveal-item .sub-reveal-text {
    font-size: 14px;
  }
  .reveal-item .sub-reveal-text span {
    display: inline-block;
    color: rgba(0, 0, 0, 0.2);
  }
  .reveal-item .sub-reveal-text strong {
    display: inline-block;
    font-size: 20px;
    padding: 0 4px;
    vertical-align: middle;
  }
  .reveal-item .color-block-right {
    background-color: #00bcd4;
    color: #fff;
    height: 145px;
    border-radius: 4px;
  }
  .reveal-item .color-block-right .reveal-text,.reveal-item .color-block-left .reveal-text{
    line-height: 1.2;
  }
  .reveal-item  .reveal-text .reveal-text-img{
    width: 32px;
  }
  .reveal-item-left .sub-reveal-text {
    color: #ffffff;
  }
  .reveal-item-right .sub-reveal-text {
    color: #ffffff;
  }

  .index-section-top .section-notice {
    width: 320px;
    background-color: #fff;
  }
  .index-section-bottom {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
  }
  .index-section-bottom .section-chart {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    margin-right: 10px;
    background-color: #d5ecfd;
    padding: 15px;
    border-radius: 4px;
  }
  .index-section-bottom .section-chart .el-form-item__label,.index-section-bottom .section-chart .el-form-item{
    color: #0077b3 !important;
  }
  .index-section-bottom .section-operation {
    width: 320px;
    background-color: #00b78e;
    border-radius: 4px;
  }

  .section-tit {
    font-size: 16px;
    font-weight: 700;
    padding: 10px 12px;
    position: relative;
    color: #009688;
  }
  .section-tit:after {
    content: "";
    height: 18px;
    width: 3px;
    background-color: #009688;
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -9px;
  }
  .section-bd {
    padding: 0 12px;
    padding-bottom: 12px;
  }

  .notice-link-item {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: space-between;
    text-decoration: none;
    color: #009688;
    font-size: 14px;
    padding: 6px 0;
  }
  // .notice-link-item:hover {
  //   opacity: 0.6;
  // }
  .notice-link-item .links-txt {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  .notice-link-item .links-txt:hover{
      opacity: 0.6;
  }
  .notice-link-item .links-date {
    color: rgba(0, 150, 136, 0.5);
  }
    .notice-link-item .links-date:hover {
      opacity: 0.6;
  }
  .file-ul {
    padding-left: 5px;
    padding-top: 5px;
  }

 .file-ul .file-li{
   list-style: none;
  //  color: #fff;
  }

</style>
<!--公告css-->
<style>
  .notice-title {
    text-align: center;
    margin: 15px;
    font-size: 30px;
  }
  .notice-content {
    width: 100%;
    padding: 0px 10px;
  }
  .notice-content img {
    max-width: 90%;
  }

</style>
