<!--Main-->
<template>
  <div
    v-if="data"
    class="table-content"
    :class="className"
    style="height: 100%"
  >
    <!-- 显示表格 -->
    <el-table
      ref="table"
      v-loading="listInfo.loading"
      height="100%"
      :data="data"
      :summary-method="handleGetSummaries"
      show-summary
      border
      style="width:100%"
      @select-all="handleSelectionChange"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-for="(item, index) in fieldList"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :fixed="item.fixed"
        :type="item.type"
        align="center"
        :width="item.width"
        :min-width="item.minWidth || '100px'"
        :formatter="item.formatter"
        show-overflow-tooltip
      />
      <el-table-column
        v-if="handle !== null"
        :key="'handle'"
        :fixed="handle.fixed"
        align="center"
        :label="handle.label"
        :width="handle.width"
      >
        <template v-slot="scope">
          <template v-for="(item, index) in handle.btList">
            <!-- 自定义操作类型 -->
            <slot
              v-if="item.slot"
              :name="'bt-' + item.event"
              :data="{item, row: scope.row}"
            />
            <!-- 操作按钮 -->
            <el-button
              v-if="item.show"
              :key="index"
              v-waves
              size="mini"
              :type="item.type"
              :icon="item.icon"
              :disabled="item.disabled"
              :loading="item.loading"
              @click="handleClick(item.event, scope.row)"
            >
              {{ item.label }}
            </el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Main',
  props: {
    // 自定义类名
    // eslint-disable-next-line vue/require-default-prop
    className: {
      type: String
    },
    // 类型列表
    // eslint-disable-next-line vue/require-default-prop
    listTypeInfo: {
      type: Object
    },
    // 表格字段配置
    fieldList: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 操作栏配置
    // eslint-disable-next-line vue/require-default-prop
    handle: {
      type: Object
    },
    // 列表数据
    // eslint-disable-next-line vue/require-default-prop
    data: {
      type: Array
    },
    // 监听高度
    height: {
      type: Number,
      default: 500
    },
    contentHeight: {
      type: Number,
      default: 550
    },
    toggleRowSelections: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      // 列表相关
      listInfo: {
        loading: false // 加载动画
      },
      tableHeight: 0
    }
  },
  watch: {
    height(value) {
      const navH = document.getElementsByClassName('navbar')[0] ? document.getElementsByClassName('navbar')[0].clientHeight : 0
      const tagH = document.getElementsByClassName('tags-view-container')[0] ? document.getElementsByClassName('tags-view-container')[0].clientHeight : 0
      const searchH = document.getElementsByClassName('fn-layout-vertical-form')[0] ? document.getElementsByClassName('fn-layout-vertical-form')[0].clientHeight : 0
      const pagerH = document.getElementsByClassName('fn-layout-vertical-operation')[0] ? document.getElementsByClassName('fn-layout-vertical-operation')[0].clientHeight : 0
      const bottomH = document.getElementsByClassName('fn-layout-vertical-pagination')[0] ? document.getElementsByClassName('fn-layout-vertical-pagination')[0].clientHeight : 0
      if (value) {
        this.tableHeight = (window.innerHeight) - (navH + tagH + searchH + pagerH + bottomH)
      }
    },
    contentHeight(value) {
      const navH = document.getElementsByClassName('navbar')[0] ? document.getElementsByClassName('navbar')[0].clientHeight : 0
      const tagH = document.getElementsByClassName('tags-view-container')[0] ? document.getElementsByClassName('tags-view-container')[0].clientHeight : 0
      const searchH = document.getElementsByClassName('fn-layout-vertical-form')[0] ? document.getElementsByClassName('fn-layout-vertical-form')[0].clientHeight : 0
      const pagerH = document.getElementsByClassName('fn-layout-vertical-operation')[0] ? document.getElementsByClassName('fn-layout-vertical-operation')[0].clientHeight : 0
      const bottomH = document.getElementsByClassName('fn-layout-vertical-pagination')[0] ? document.getElementsByClassName('fn-layout-vertical-pagination')[0].clientHeight : 0
      if (value) {
        this.tableHeight = (window.innerHeight) - (navH + tagH + searchH + pagerH + bottomH)
      }
    },
    // toggleRowSelections
    data: {
      handler: function() {
        this.$emit('update:refObj', this.$refs.table)
        this.$nextTick(() => {
          this.toggleRowData()
        })
      },
      deep: true // 深度监听
    }
    // toggleRowSelections: {
    //   handler: function (val) {
    //     alert('深度')
    //     this.$emit('update:refObj', this.$refs.table)
    //   },
    //   deep: true // 深度监听
    // },
  },
  mounted() {
    this.$emit('update:refObj', this.$refs.table)
    this.toggleRowData()
  },
  methods: {
    handleSizeChange(val) {
      const query = this.listInfo.query
      query.pageSize = val // 每页条数
      query.curPage = 1 // 每页条数切换，重置当前页
    },
    handleCurrentChange(val) {
      this.listInfo.query.curPage = val // 当前页
    },
    // 派发按钮点击事件
    handleClick(event, data) {
      this.$emit('handleClick', event, data)
    },
    // 选中数据
    handleSelectionChange(rows) {
      this.$emit('handleEvent', 'tableCheck', rows)
    },
    // 自定义尾行
    handleGetSummaries(param) {
      let sums = null
      this.$emit('handleGetSummaries', param,
        val => { sums = val })
      return sums
    },
    //
    toggleRowData() {
      this.$emit('update:refObj', this.$refs.table)
      //
      if (this.toggleRowSelections && this.data) {
        this.data.forEach((item, index) => {
          this.toggleRowSelections.forEach((items, indexs) => {
            if (this.data[index].id === this.toggleRowSelections[indexs]) {
              this.$refs.table.toggleRowSelection(this.data[index], true)
            } else if (this.data[index].pageOpId === this.toggleRowSelections[indexs]) {
              this.$refs.table.toggleRowSelection(this.data[index], true)
            } else if (this.data[index].roleId === this.toggleRowSelections[indexs]) {
              this.$refs.table.toggleRowSelection(this.data[index], true)
            }
          })
        })
      }
      //
    }
  }
}
</script>

