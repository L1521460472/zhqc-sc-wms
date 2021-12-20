<!--
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-02 16:13:03
-->

<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <!-- 复核 -->
  <div class="weighRecord-wrap">
    <div class="weighRecord-left">
      <div class="weighRecord-left-cont">
        <el-form ref="form" :model="reqVo" label-position="top" size="small ">
          <div class="weighRecord-section l-weighRecord-flex">
            <div class="weighRecord-section-left">
              <el-form-item label="作业台" class="lable_large">
                <el-select v-model="reqVo.checkPlatformId" size="large">
                  <el-option
                    v-for="item in listTypeInfo.checkPlatformList"
                    :key="item.id"
                    :label="item.checkPlatformName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="weighRecord-section l-weighRecord-flex">
            <div class="weighRecord-section-left ">
              <el-form-item label="箱号/快递单号" class="lable_large">
                <el-input ref="transOrderNo" v-model="reqVo.transOrderNo" size="large" @keyup.enter.native="scanBox" />
              </el-form-item>
            </div>
          </div>
          <div class="weighRecord-section l-weighRecord-flex">
            <div class="weighRecord-section-left ">
              <el-form-item label="重量（KG）" class="lable_large">
                <el-input ref="weightKg" v-model="reqVo.weightKg" size="large" :disabled="weightDisabled" @keyup.enter.native="updateWeight" />
              </el-form-item>
            </div>

          </div>
        </el-form>
      </div>
    </div>
    <div class="weighRecord-mid">
      <div>完成箱数</div>
      <div class="weighRecord-mid-num">
        <div class="strong"><strong>{{ reqVo.doneNum }}</strong></div>
      </div>
    </div>
    <div class="weighRecord-right">
      <div class="weighRecord-right-bd">
        <div class="check-finish">{{ msg }}</div>
      </div>
      <div class="weighRecord-right-ft">
        <div class="ft-item-btn"><el-button type="primary" @click.native="closePage">退出</el-button></div>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from './mixins'

export default {
  name: 'WeighRecord',
  mixins: [mixins],
  data() {
    return {
      store: 'weighRecord/',
      modName: 'weighRecord',
      reqVo: {
        doneNum: 0,
        weightKg: null
      },
      msg: '称重中',
      weightDisabled: true
    }
  },

  methods: {

  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
  .el-form {
    .weighRecord-section-left{
      .el-form-item {
        .el-form-item__label {
          font-size: 40px;
          margin-block: 10px;
          margin-left: 5px;
        }
        .el-form-item__content{
          input{
            font-size: 60px;
            min-height: 120px;
          }
          select{
            font-size: 60px;
            min-height: 120px;
          }
        }
      }
    }
  }
</style>
<style scoped>
  input::-ms-clear,input::-ms-reveal {
    display: none
  }

  *,:after,:before {
    -webkit-box-sizing: border-box;
    -o-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    outline: none;
  }

  /*@font-face {*/
  /*  font-family:Chinese Quote;src:local("PingFang SC"),local("SimSun");unicode-range:U+2018,U+2019,U+201c,U+201d*/
  /*}*/

  /*字体图标*/
  /*@font-face {*/
  /*  font-family:iconfont;src:url(../fonts/icomoon.77b79a1a.eot);src:url(../fonts/icomoon.77b79a1a.eot#iefix) format("embedded-opentype"),url(../fonts/icomoon.f4e9638d.ttf) format("truetype"),url(../fonts/icomoon.266c467a.woff) format("woff"),url(../img/icomoon.bbea6e73.svg#icomoon) format("svg");font-weight:400;font-style:normal*/
  /*}*/
  [class*=icon-],[class^=icon-] {
    font-family: iconfont;
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: -1px;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale
  }
  .icon-return:after {
    content: "\E91F"
  }
  /*入库*/
  .weighRecord-wrap{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  .weighRecord-left{
    width: 100%;
    padding-right: 0px;
  }
  .weighRecord-left-cont{
    padding: 15px;
    overflow-y:auto;
    height: 100vh;
  }
  .weighRecord-mid{
    position: absolute;
    right: 350px;
    top: 20px;
    text-align: center;
  }
  .weighRecord-mid .weighRecord-mid-num{
    background-color: rgb(3, 185, 21);
    width: 150px;
    height: 150px;
    text-align: center;
    padding-top: 11px;
    font-size: 80px;
    color: #fff;
  }
  .weighRecord-right{
    position: absolute;
    right: 0;
    top:0;
    height: 100%;
    width: 300px;
    background-color: #f6f6f6;
  }

  .weighRecord-right-bd{
    padding-bottom: 130px;
    overflow-y:auto;
    height: 100vh;
    box-shadow: -4px 0 6px rgba(0,0,0,0.02);
  }
  .weighRecord-right-ft{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
  }
  .weighRecord-right-ft .ft-item-btn{
    text-align: center;
    padding: 12px 12px 0 12px;
  }
  .weighRecord-right-ft .ft-item-btn:last-child{
    padding-bottom: 12px;
  }
  .weighRecord-right-ft .ft-item-btn .el-button--primary{
    width: 100%;
  }
  .check-finish{
    text-align: center;
    color: #50C064;
    font-size: 26px;
    font-weight: 700;
    padding: 40px 0;
  }
  .l-weighRecord-flex{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  .l-weighRecord-flex1{
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
  }
  .l-weighRecord-mr-10{
    margin-right: 10px;
  }
  .weighRecord-left-cont .el-form-item__label{
    line-height: 20px;
    padding-bottom: 2px;
  }

  .weighRecord-section{
    margin-bottom: 15px;
  }
  .weighRecord-section .weighRecord-section-left{
    width: 60%;
    margin-right: 30px;
  }

  .weighRecord-section .weighRecord-section-right{
    margin-right: 30px;
  }
  .weighRecord-left-cont .date-block{
    border:1px dashed #ddd;
    padding: 10px 20px 0 20px;
    background-color: #f9f9f9;
  }
  .weighRecord-left-cont .date-block > div{
    margin-right: 20px;
  }
  .weighRecord-left-cont .date-block > div:last-child{
    margin-right: 0;
  }
  .weighRecord-tit{
    font-size: 18px;
    margin: 20px 0 10px 0;
    color: #222;
  }

  /*end 入库*/
</style>
