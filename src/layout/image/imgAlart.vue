<template>
  <el-popover
    placement="right"
    title=""
    trigger="hover"
  >
    <el-image slot="reference" :src="imageUrl" :alt="imageUrl" style="height: 55px;width: 60px" />
    <el-image :src="imageUrl" />
  </el-popover>
</template>

<script>
export default {
  name: 'ImgAlart',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    imageUrl: {
      type: String
    }
  }
}
</script>

<style scoped>

</style>
