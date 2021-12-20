import notification from './notification'
export default {
  mixins: [notification],
  data() {
    return {
      // 下拉选项列表
      listTypeInfo: {
        checkPlatformList: []
      }
    }
  },

  methods: {
    // 统一按钮点击事件方法入口，event:自定义方法名称（notification.js中定义的方法名），data:方法参数
    handleClick(event, data) {
      if (event) {
        this[event](data)
      }
    },
    // 统一处理下拉列表change事件入口，event:自定义方法名称（notification.js中定义的方法名）
    handleEvent(event, data) {
      if (event) {
        this[event](data)
      }
    }
  }
}
