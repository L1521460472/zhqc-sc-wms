//
export default {
  data() {
    return {
      tableHeight: null
    }
  },
  //
  methods: {
    layoutHeight(that) {
      const height = that.getNodeHeight('.sorting-wrap') - that.getNodeHeight('.sorting-form')
      that.tableHeight = height / 2 - 120
    },
    getNodeHeight(el) {
      return document.querySelector(el).offsetHeight
    }
  },
  //
  mounted() {
    this.layoutHeight(this)
  },
  //
  activated() {
    const that = this
    window.onresize = () => {
      that.layoutHeight(that)
    }
  },
  //
  deactivated() {
    window.onresize = null
  }
}
