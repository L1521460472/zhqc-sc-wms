<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="onRoutes"
      :collapse="isCollapse"
      background-color="#3296fc"
      text-color="#ffffff"
      active-text-color="#2e91f7"
      unique-opened
      router
    >
      <div class="sidebar-log">
        <img v-if="!isCollapse" class="log-large" src="../../../assets/log.png" style="width: 100%" alt="智汇奇策">
        <img v-else class="log-mini" src="../../../assets/log_mini.png" alt="智汇奇策" style="width: 100%">
      </div>
      <sidebar-item :items="permission_routes" />
      <div class="sidebar-background" />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import SidebarItem from './SidebarItem'
export default {
  components: {
    SidebarItem
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace('/', '')
    },
    isCollapse() {
      return !this.$store.state.tagsView.sidebar.opened
    },
    permission_routes() {
      return this.$store.state.login.permission_routes === null ? [] : this.$store.state.login.permission_routes
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .sidebar-log {
    width: 100%;
    /*height: 70px;*/
    /*background-color: #1f2d3d;*/
    img {
      height: 100%;
    }
  }
</style>
