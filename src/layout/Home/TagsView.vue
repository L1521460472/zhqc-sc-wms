<template>
  <div class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="(tag,index) in tagsList"
        ref="tag"
        :key="tag.path"
        :class="{'active': isActive(tag.path)}"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle.native="closeTags(index)"
        @contextmenu.prevent.native="openMenu(tag,index,$event)"
      >
        {{ tag.title }}
        <span v-if="tag.path != path" class="el-icon-close" @click.prevent.stop="closeTags(index)" />
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="closeOther">关闭其他</li>
      <li @click="closeAll">关闭所有</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from '@/Subassembly/ScrollPane'
export default {
  components: { ScrollPane },
  data() {
    return {
      modName: 'tagsView',
      visible: false,
      selectedTag: {},
      top: 0,
      left: 0,
      tags: null,
      path: '/page_Dashboard'
    }
  },
  computed: {
    tagsList() {
      return this.$store.state[this.modName].tagsList
    }
  },
  watch: {
    $route(newValue) {
      this.setTags(newValue)
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  created() {
    this.setTags(this.$route)
  },
  methods: {
    isActive(path) {
      // if (path === this.$route.fullPath) {
      // }
      return path === this.$route.fullPath
    },
    // 关闭单个标签
    closeTags(index) {
      const delItem = this.tagsList.splice(index, 1)[0]
      const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1]
      if (item) {
        delItem.path === this.$route.fullPath && this.$router.push(item.path)
      } else {
        this.$router.push('/')
      }
    },
    // 关闭全部标签
    closeAll() {
      const arr = [{
        name: 'Dashboard',
        path: '/page_Dashboard',
        title: '系统首页'
      }]
      this.$store.dispatch('tagsView/deliveryTagsList', arr)
      this.$router.push('/')
    },
    // 关闭其他标签
    closeOther() {
      const curItem = this.tagsList.filter(item => {
        return item.path === this.$route.fullPath
      })
      this.$store.dispatch('tagsView/deliveryTagsList', curItem)
    },
    // 设置标签
    setTags(route) {
      const arr = this.tagsList
      const isExist = arr.some(item => {
        return item.path === route.fullPath
      })
      if (!isExist) {
        if (arr.length >= 8) {
          arr.shift()
        }
        arr.push({
          title: route.meta.title,
          path: route.fullPath,
          name: route.matched[1].components.default.name
        })
      }
      //
      this.$store.dispatch('power/getMenuID', route.meta.pageOpKeyList)
    },
    openMenu(tag, index, e) {
      this.tags = index
      this.visible = true
      this.left = e.clientX - 190
      this.top = e.clientY - (-20)
    },
    closeMenu() {
      this.visible = false
    },
    // --------------------------------------------------------------
    closeTagsOther() {
      this.closeTags(this.tags)
    }
    // --------------------------------------------------------------
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .tags-view-container {
    width: 100%;
    background: #fff;
    .tags-view-wrapper {
      .tags-view-item {
        display: inline-block;
        position: relative;
        cursor: pointer;
        height: 26px;
        line-height: 24px;
        border: 1px solid #d8dce5;
        border-radius: 20px;
        color: #495060;
        background: #fff;
        padding: 0 8px 0 10px;
        font-size: 12px;
        margin-left: 5px;
        margin-top: 5px;
        &:first-of-type {
          margin-left: 15px;
        }
        &:last-of-type {
          margin-right: 15px;
        }
        &.active {
          color: #fff;
          background: #00c6ff;
          background-image: -webkit-linear-gradient(45deg,#00c6ff,#0072ff);
          background-image: linear-gradient(45deg,#00c6ff,#0072ff);
          border-color: #409EFF;
        }
      }
    }
    .contextmenu {
      margin: 0;
      background: #fff;
      z-index: 100;
      position: absolute;
      list-style-type: none;
      padding: 5px 0;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 400;
      color: #333;
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
      li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;
        &:hover {
          background: #eee;
        }
      }
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss">
  //reset element css of el-icon-close
  .tags-view-wrapper {
    .is-horizontal{
      display:none;
    }
    .is-vertical{
      display: none;
    }
    .tags-view-item {
      .el-icon-close {
        width: 16px;
        height: 16px;
        vertical-align: 2px;
        border-radius: 10px;
        text-align: center;
        transition: all .3s cubic-bezier(.645, .045, .355, 1);
        transform-origin: 100% 50%;
        &:before {
          transform: scale(.6);
          display: inline-block;
          vertical-align: -3px;
        }
        &:hover {
          background-color:rgba(0,0,0,0.2);
          color: #fff;
        }
      }
    }
  }
</style>
