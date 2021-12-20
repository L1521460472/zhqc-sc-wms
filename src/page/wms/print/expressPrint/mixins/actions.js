import Vue from 'vue'
export default Vue.extend({
  methods: {
    openViewPage(e) {
      e.stopPropagation()
      this.$parent.$parent.$emit('openViewPage', this.params.data)
    }
  },
  template: `<div v-if="!params.data.notTools">
    <el-button type="primary" @click="openViewPage($event,params.data)" :disabled="!params.data.waybillNo">查看路由</el-button>
  </div>`
})
