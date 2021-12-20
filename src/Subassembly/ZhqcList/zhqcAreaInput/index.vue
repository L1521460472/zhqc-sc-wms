<template>
  <el-input
    v-model="model[orderNoKey]"
    type="textarea"
    placeholder="多选(逗号或回车分隔)"
    @input="test"
  />
</template>

<script>
export default {
  name: 'Test',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    model: {
      type: Object
    },
    orderNoKey: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    maxLength: {
      type: Number,
      default: 100
    }
  },
  methods: {
    test(val) {
      const arr = val.replace(/(^\s+)|(\s+$)/g, '').split(/,|\n/).filter(item => item != '')
      if (arr.length <= this.maxLength) {
        this.$emit('input', arr)
      } else {
        this.$message.error('已超过最大查询条件')
      }
    }
  }
}
</script>
