//
export default {
  data() {
    return {
      tabHeight: null,
      contentHeight: null
    }
  },
  //
  activated() {
    // const that = this
    window.onresize = () => {
      this.$EventBus.$emit('sizeColumns', '监听表格自适应')
    }
  },
  //
  deactivated() {
    window.onresize = null
  }
}
