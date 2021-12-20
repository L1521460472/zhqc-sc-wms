<template>
  <div class="sidebar">
    <template v-for="item in items">
      <template v-if="item.subs">
        <el-submenu :key="item.index" :index="item.index">
          <template slot="title">
            <i :class="item.icon" /><span slot="title">{{ item.title }}</span>
          </template>
          <template v-for="subItem in item.subs">
            <el-submenu v-if="subItem.subs" :key="subItem.index" :index="subItem.index" style="padding-left: 11px">
              <template slot="title">{{ subItem.title }}</template>
              <template v-for="threeItem in subItem.subs">
                <el-submenu v-if="threeItem.subs" :key="threeItem.index" :index="threeItem.index">
                  <template slot="title">{{ threeItem.title }}</template>
                  <el-menu-item v-for="(fourItem,i) in threeItem.subs" :key="i" :index="fourItem.index">
                    {{ fourItem.title }}
                  </el-menu-item>
                </el-submenu>
                <el-menu-item v-else :key="threeItem.index" :index="threeItem.index">
                  {{ threeItem.title }}
                </el-menu-item>
              </template>

            </el-submenu>
            <el-menu-item v-else :key="subItem.index" :index="subItem.index">
              {{ subItem.title }}
            </el-menu-item>
          </template>
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item :key="item.index" :index="item.index">
          <i :class="item.icon" /><span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </template>
    </template>
  </div>
</template>

<script>

export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
