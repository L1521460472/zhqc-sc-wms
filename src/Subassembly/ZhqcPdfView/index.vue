<template>
  <transition v-if="visible" name="fade">
    <div class="pdf-reader" @click.self="handleClose">
      <embed type="application/pdf" width="100%" height="80%" class="pdfobject" hidden="false" :src="url" @click="stopPropagation(event)">
    </div>
  </transition>
</template>
<script>
export default {
  name: 'PdfView',
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: false
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    show() {
      this.$nextTick(() => {
        document.body.appendChild(this.$el)
      })
      this.visible = true
    },
    handleClose() {
      this.visible = false
    }
  }
}
</script>
<style scoped lang='scss'>
.pdf-reader {
  position: fixed;
  left: 0;
  right: 0;
  top:0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .7);
  text-align: center;
  z-index: 33333;
  .pdfobject {
    width: 70%;
    height: 100%;
    overflow: auto;
    background: transparent;
    // padding: 0 700px;
    // pointer-events: none; // 诡异的一个地方，embed可能会自动生成一个最大的层，添加pointer-events穿透
  }
}

</style>
