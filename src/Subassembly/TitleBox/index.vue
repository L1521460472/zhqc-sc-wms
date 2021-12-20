<template>
  <div class="title_box">
    <div class="title_space">{{ itemTitle }}</div>
    <div v-if="isShow" class="title-right">
      <el-button
        type="primary"
        icon="el-icon-s-operation"
        @click="falg = !falg"
      >{{ '筛选' }}</el-button>
    </div>
    <div v-show="falg" class="form-box">
      <slot />
    </div>
  </div>
</template>

<script>

export default {
  name: 'TitleBox',
  props: {
    itemTitle: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: true
    },
    fold: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      falg: false
    }
  },
  watch: {
    fold(val) {
      if (val) {
        this.falg = false
      }
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.title_box{
  position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f5f5f5;
    width: 100%;
    background-image: linear-gradient(45deg, #ffffff, #f5f5f5);
    border-bottom: 1px solid #e6e8eb;
  .title_space{
        position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 46px;
    font-size: 16px;
    font-weight: 400;
    padding: 0 15px 0 25px;
    &:after{
      content: "";
      display: inline-block;
      position: absolute;
      left: 12px;
      top: 50%;
      width: 3px;
      height: 16px;
      border-radius: 2px;
      background-color: #EB6550;
      transform: translateY(-50%);
      }
  }
  .title-right{
    margin-right: 50px;
  }
  .form-box{
    position: absolute;
    z-index: 100;
    right: 0px;
    top:46px;
    width: 100%;
    // height: 100px;
    // border:1px solid red;
    background: #fff;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  }
}

</style>
