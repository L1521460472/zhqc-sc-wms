<template>
  <div>
    <div v-if="list" class="timeline-cont">
      <div v-for="(item, key) in trackingList" :key="key" class="timeline-cont-item" :class="[item.currentStatus === 'Y' ? 'state-complete' : '']">
        <!-- <div v-for="(val, index) in item.trackingInfoList" :key="index" style="margin-bottom: 20px">
        <div class="timeline-info"><span  :class="[item.currentStatus === 'Y' ? 'label' : 'labelOther']">{{item.currentStatus === 'Y' ? '签收日期' : ''}}</span>{{val.timePoint}}</div>
        <div class="timeline-info">{{val.description}}</div>
      </div> -->
        <div style="margin-bottom: 20px">
          <div class="timeline-info">{{ item.timePoint }}</div>
          <div class="timeline-info">{{ item.description }}</div>
        </div>
        <span :class="[item.currentStatus === 'Y' ? 'state' : 'stateActiveOther']">{{ item.statusName }}</span>
      </div>
    </div>
    <div v-if="!list" style="width: 100%;text-align: center">暂无数据</div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    selectKey: {
      type: Number
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // eslint-disable-next-line vue/require-default-prop
    list: {
      type: Object
    }
  },
  computed: {
    trackingList() {
      const arr = []
      this.list.trackingInfo.forEach(i => {
        arr.push(...i.trackingInfoList.map(v => {
          v.currentStatus = i.currentStatus
          return v
        }))
      })
      return arr
    }
  }
}
</script>

<style scoped>
  .timeline-cont{
    padding: 20px 15px;
    padding-left: 80px;
    background-color: #fff;
  }
  .timeline-cont-item{
    padding: 0 0 30px 16px;
    padding-top: 10px;
    border-left:1px dashed rgba(0,0,0,0.2);
    position: relative;
  }
  .timeline-cont-item:before{
    content: '';
    display: inline-block;
    width: 7px;
    height: 7px;
    background-color: #a7a7a7;
    position: absolute;
    left: -4px;
    top:0;
    z-index: 100;
    border-radius: 10px;
  }
  .timeline-cont .timeline-cont-item:last-child:after{
    content: '';
    display: inline-block;
    width: 7px;
    height: 7px;
    background-color: #a7a7a7;
    position: absolute;
    left: -4px;
    bottom:0;
    z-index: 100;
    border-radius: 10px;
  }
  .timeline-cont-item.state-complete:before{
    background-color: #ff665b;
  }
  .timeline-cont-item .timeline-top{
    color: #222;
    line-height: 20px;
    font-size: 14px;
    position: relative;
  }
  .timeline-cont-item .timeline-info{
    font-size: 14px;
    color: #999999;
    line-height: 22px;
  }
  .timeline-cont-item .timeline-info:first-child{
    margin-top: -17px;
  }
  .timeline-cont-item .state{
    color: #545454;
    font-size: 14px;
    font-weight: 700;
    margin-left: 12px;
    line-height: 21px;
    border-radius: 24px;
    position: absolute;
    top: -7px;
    display: inline-block;
    text-align: center;
    width: 52px;
    left: -80px !important;
  }
  .timeline-cont-item.state-complete .state{
    background-color: #ff665b;
    color: #fff;
  }
  .stateActive{
    background-color: #ff665b;
    color: #fff;
  }
  .timeline-cont-item .stateActiveOther{
    color: #545454;
    font-size: 14px;
    font-weight: 700;
    margin-left: 12px;
    line-height: 21px;
    border-radius: 24px;
    position: absolute;
    top: -7px;
    display: inline-block;
    text-align: center;
    width: 52px;
    left: -80px !important;
  }
  .timeline-cont-item.state-complete .stateActiveOther{
    background-color: #a7a7a7;
    color: #fff;
  }
  .timeline-cont-item.state-complete.stateActiveOther:before{
    content: '';
    display: inline-block;
    width: 7px;
    height: 7px;
    background-color: #a7a7a7;
    position: absolute;
    left: -4px;
    top:0;
    z-index: 100;
    border-radius: 10px;
  }
  .timeline-info{
    color: #222;
  }
  .timeline-info .label{
    display: inline-block;
    width: 62px;
    color: #999;
    text-align: left;
  }
  .timeline-info .labelOther{
    display: inline-block;
    color: #999;
    text-align: left;
  }
</style>
