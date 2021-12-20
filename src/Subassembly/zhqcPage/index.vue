<!--Main-->
<template>
  <div class="zh-page">
    <div class="zh-page-btn-group">
      <el-button-group>
        <template v-for="(item, index) in btList">
          <el-button
            v-if="item.show"
            :key="index"
            v-waves
            size="mini"
            :type="item.type"
            :icon="item.icon"
            :disabled="item.disabled"
            :loading="item.btLoading"
            @click="handleClick(item.event)"
          >
            {{ item.label }}
          </el-button>
        </template>
      </el-button-group>
    </div>
    <el-pagination
      background
      class="zh-page-pagination"
      :current-page="pageRequest.page"
      :page-sizes="pageSizes"
      :page-size="pageRequest.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'Main',
  props: {
    total: {
      type: [String, Number],
      default: 0
    },
    // eslint-disable-next-line vue/require-default-prop
    pageRequest: {
      type: Object
    },
    // eslint-disable-next-line vue/require-default-prop
    btList: {
      type: Array
    },
    isUpdate: {
      type: Boolean
    },
    pageSizes: {
      type: Array,
      default: () => {
        return [20, 50, 100, 200, 500]
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
    handleClick(event, data) {
      this.$emit('handleClick', event, data)
    },
    handleSizeChange(val) {
      const page = 1
      this.pageRequest.limit = val
      this.pageRequest.page = page
      this.$emit('pageChange', this.pageRequest)
    },
    handleCurrentChange(val) {
      this.pageRequest.page = val
      this.$emit('pageChange', this.pageRequest)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .zh-page{
        /*display: flex;*/
        width: 100%;
        display: inline-block;
        height: 50px;
        /*justify-content: space-between;*/
        /*margin-top: 10px;*/
        .zh-page-btn-group{
            float: left;
            margin-top: 12px;
        }

        /deep/ .el-pagination{
            float: right;
            margin-top: 10px;
        }
    }
</style>
