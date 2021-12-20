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
      const height = that.getNodeHeight('.sorting-wrap') - that.getNodeHeight('.sorting-header') - that.getNodeHeight('.sorting-form')
      that.tableHeight = height / 2 - that.getNodeHeight('.sorting-table-item .sorting-tit') - 8
    },
    getNodeHeight(el) {
      return document.querySelector(el).offsetHeight
    }
  },
  //
  mounted() {
    this.layoutHeight(this)
    const that = this
    window.onresize = () => {
      that.layoutHeight(that)
    }
  },
  //
  destroyed() {
    window.onresize = null
  }
}
