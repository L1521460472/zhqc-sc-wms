<!--
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-22 18:46:59
-->
<template>
  <div>
    <div style="display: inline-block;margin-left: 5px">
      <el-button v-waves type="primary" size="mini" :disabled="$hasPerm('view')" @click="handleClick('openViewPage', row)">查看</el-button>
      <el-button v-waves type="success" size="mini" :disabled="$hasPerm('edit') || row.inventoryStatus === 'COMFIRM' || row.inventoryStatus === 'AUDIT_PASS'" @click="handleClick('openEditPage', row)">编辑</el-button>
      <el-popover placement="bottom" trigger="click">
        <el-button v-if="row.inventoryStatus === 'NEW'" v-waves type="danger" size="mini" :disabled="$hasPerm('delete')" @click="handleClick('deleteData', row)">删除</el-button>
        <el-button v-if="row.inventoryStatus === 'PDWC' || row.inventoryStatus === 'PDZ'" v-waves type="primary" size="mini" :disabled="$hasPerm('confirm')" @click="handleClick('confirmInventory', row)">确认</el-button>
        <el-button v-if="row.inventoryStatus === 'COMFIRM'" v-waves type="primary" size="mini" :disabled="$hasPerm('cancelConfirm')" @click="handleClick('cancelConfirmInventory', row)">取消确认</el-button>
        <el-button v-if="row.inventoryStatus === 'COMFIRM'" v-waves type="primary" size="mini" :disabled="$hasPerm('audit')" @click="handleClick('audit', row)">审核</el-button>
        <el-button type="primary" size="mini" :disabled="false" @click="handleClick('exportData', row)">导出</el-button>
        <el-button
          slot="reference"
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
