<template>
  <div class="w100 h100">
    <div ref="container" class="allmap pr" />
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    // eslint-disable-next-line vue/require-default-prop
    mapdata: {
      type: Array
    },
    zoom: {
      type: Number,
      default: 12
    }
  },
  data() {
    return {
      map: '',
      BMap: ''
    }
  },
  mounted() {
    // 注意地图的初始化要写在mounted里面。
    this.$nextTick(function() {
      // const _this = this
      this.BMPGL('GFf2VlO85h9tRSNChNRMf7uy9L1zCwZh').then((BMap) => {
        this.BMap = BMap
        var map = new BMap.Map(this.$refs.container)
        map.centerAndZoom(
          new BMap.Point(113.869117, 22.581735),
          this.zoom || 12
        )
        map.enableScrollWheelZoom(true)
        map.addControl(new BMap.NavigationControl())
        this.map = map
        this.init()
      })
    })
  },
  methods: {
    BMPGL(ak) {
      return new Promise(function(resolve, reject) {
        window.init = function() {
          // eslint-disable-next-line no-undef
          resolve(BMap)
        }
        var script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `//api.map.baidu.com/api?v=3.0&ak=${ak}&callback=init`
        script.onerror = reject
        document.head.appendChild(script)
      })
    },
    init() {
      const res = {}
      res.map = this.map
      res.BMap = this.BMap
      this.$emit('init', res)
    }
  }
}
</script>
<style scoped>
.w100.h100 {
  width: 100%;
  height: 100%;
}
.map,
.allmap {
  width: 100%;
  height: 100%;
}
</style>
