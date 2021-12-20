<!--
 * @Descripttion:
 * @version:
 * @Author: chentianyu
 * @Date: 2021-10-29 09:34:21
 * @LastEditors: chentianyu
 * @LastEditTime: 2021-11-25 18:41:28
-->
<template>
  <div>
    <div style="display: inline-block;margin-left: 5px">
      <el-button v-waves type="primary" size="mini" :disabled="$hasPerm('view')" @click="handleClick('openViewPage', row)">查看</el-button>
      <el-button v-waves type="success" size="mini" :disabled="getEditContorl()" @click="handleClick('openEditPage', row)">编辑</el-button>
      <el-popover placement="bottom" trigger="click">
        <el-button v-waves type="danger" size="mini" :disabled="getDeleteContorl()" @click="handleClick('deleteData', row)">删除</el-button>
        <el-button v-waves type="primary" size="mini" :disabled="getAuditContorl()" @click="handleClick('audit', row)">审核</el-button>
        <!-- <el-button v-waves type="primary" size="mini" :disabled="$hasPerm('cancelConfirm')" @click="handleClick('cancelConfirmInventory', row)">取消确认</el-button> -->
        <el-button
          slot="reference"
          style="margin-left: 10px;"
          size="mini"
          type="warning"
          icon="el-icon-more"
          @click="handleClick('')"
        >更多
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
  mounted() {

  },
  methods: {
    getEditContorl() {
      const temp = this.$hasPerm('edit')
      const temp2 = !['NEW'].includes(this.row.adjStatus)
      return temp || temp2
    },
    getDeleteContorl() {
      const temp = this.$hasPerm('delete')
      const temp2 = !['NEW'].includes(this.row.adjStatus)
      return temp || temp2
    },
    getAuditContorl() {
      const temp = this.$hasPerm('audit')
      const temp2 = !['NEW'].includes(this.row.adjStatus)
      return temp || temp2
    },

    //
    handleClick(event, data) {
      this.$emit('handleClick', event, data)
    }
  }
}
</script>

<style scoped>

</style>
