<template>
  <el-input v-model="text" :placeholder="placeholder" class="topForm-customize-input" readonly>
    <i
      v-show="!(text==null||text===''||text===undefined)"
      slot="suffix"
      class="el-icon-circle-close"
      @click="clear"
    />
    <el-button slot="append" icon="el-icon-search" @click="open" />
  </el-input>
</template>

<script>
export default {
  name: 'Index',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    text: {
      type: String
    },
    // eslint-disable-next-line vue/require-default-prop
    placeholder: {
      type: String
    }
  },
  data() {
    return {}
  },
  methods: {
    clear() {
      this.$emit('clear')
    },
    open() {
      this.$emit('open')
    }
  }
}
</script>

<style scoped>

</style>ss
