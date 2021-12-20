<template>
  <section class="app-main">
    <vueToTop style="z-index: 10000" />
    <keep-alive :exclude="['InGoodsRegister']">
      <router-view />
    </keep-alive>
  </section>
</template>

<script>
export default {
  name: 'AppMain'
}
</script>

<style scoped>
.app-main {
  /*84 = navbar + tags-view = 50 +34 */
  height: calc(100vh - 88px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>

