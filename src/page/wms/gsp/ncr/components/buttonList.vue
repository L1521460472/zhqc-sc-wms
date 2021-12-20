<template>
  <div>
    <el-button type="primary" size="mini" @click="handleClick('openViewPage', row)">查看</el-button>
    <el-button type="success" size="mini" @click="handleClick('openEditPage',row)">编辑</el-button>
    <el-button v-if="row.ncrStatus === 'NEW'" type="primary" size="mini" @click="handleClick('audit',row)">审核</el-button>
    <el-button v-if="row.ncrStatus === 'YSH'" type="warning" size="mini" @click="handleClick('cancelAudit',row)">取消审核</el-button>
    <el-button type="danger" size="mini" @click="handleClick('deleteData',row)">删除</el-button>
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
  methods: {
    //
    handleClick(event, data) {
      this.$emit('handleClick', event, data)
    }
  }
}
</script>

<style scoped>

</style>
