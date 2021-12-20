<template>
  <div>
    <div v-for="(item, index) in btList" :key="index" style="display: inline-block;margin-left: 5px">
      <el-button
        v-if="item.show"
        :key="index"
        v-waves
        size="mini"
        :type="item.type"
        :icon="item.icon"
        :disabled="item.disabled"
        :loading="item.loading"
        @click="handleClick(item.event, row)"
      >
        {{ item.label }}
      </el-button>
      <el-popover v-if="item.btShow" v-model="visible" placement="bottom" trigger="click">
        <template v-for="(vitem, vindex) in item.moreList">
          <el-button
            v-if="vitem.show"
            :key="vindex"
            v-waves
            size="mini"
            :type="vitem.type"
            :icon="vitem.icon"
            :disabled="vitem.disabled"
            :loading="vitem.loading"
            @click="handlePopover(vitem.event, row)"
          >
            {{ vitem.label }}
          </el-button>
        </template>
        <el-button
          slot="reference"
          :icon="item.icon"
          :type="item.type"
          size="mini"
          @click="handleClick(item.event)"
        >{{ item.label }}
        </el-button>
      </el-popover>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ButtonList',
  props: {
    row: {
      type: Object,
      default: () => {
        return null
      }
    },
    btList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    handlePopover(event, data) {
      this.visible = false
      this.handleClick(event, data)
    },
    handleClick(event, data) {
      this.$emit('handleClick', event, data)
    }
  }
}
</script>

<style scoped>

</style>
