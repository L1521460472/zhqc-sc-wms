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
      border
      row-key="id"
      :show-summary="showSummary"
      :summary-method="getSummaries"
      style="width:100%"
      :cell-style="cellClassName"
      :row-class-name="tableRowClassName"
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
        :align="item.align || 'center'"
        :width="item.width"
        :sortable="item.sortable"
        :filters="item.filters"
        :selectable="selectable"
        :min-width="item.minWidth || '100px'"
        :formatter="item.formatter"
        :show-overflow-tooltip="overflow"
        :filter-method="item.filterMethod"
      >
        <template v-if="item.type === 'slot'" v-slot="scope">
          <!-- solt 自定义列-->
          <template v-if="item.type === 'slot'">
            <slot
              :name="'col-' + item.value"
              :row="scope.row"
            />
          </template>
          <!-- 标签 -->
          <el-tag v-else-if="item.type === 'tag'">
            {{ scope.row[item.value] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        v-if="handle !== null"
        :key="'handle'"
        :fixed="handle.fixed"
        :align="handle.align || 'center'"
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
import Sortable from 'sortablejs'
export default {
  name: 'Index',
  props: {
    replyShow: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    viewShow: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    // eslint-disable-next-line vue/require-default-prop
    refObj: {
      type: Object
    },
    overflow: {
      type: Boolean,
      default: () => {
        return true
      }
    },
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
    handle: {
      type: Object,
      default: () => {
        return null
      }
    },
    handleList: {
      type: Object,
      default: () => {
        return null
      }
    },
    // 列表数据
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 监听高度
    // height: {
    //   type: Number,
    //   default: 500
    // },
    // contentHeight: {
    //   type: Number,
    //   default: 550
    // },
    fixedHeight: {
      type: Number,
      default: null
    },
    toggleRowSelections: {
      type: Array,
      default: () => {
        return null
      }
    },
    totalCount: {
      type: Object,
      default: () => {
        return null
      }
    },
    showSummary: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    isSortable: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    // render: {
    //   type: Boolean,
    //   default: () => {
    //     return true
    //   }
    // },
    callback: {
      type: Function,
      default: () => {}
    },
    selectable: {
      type: Function,
      default: () => {
        return true
      }
    },
    //
    getSummariesCallBack: {
      type: Function,
      default: () => {}
    },
    // eslint-disable-next-line vue/require-default-prop
    cellClassName: [String, Function]
  },
  data() {
    return {
      // 列表相关
      listInfo: {
        loading: false // 加载动画
      },
      tableHeight: 0,
      sortable: null,
      clodata: [],
      render: true
    }
  },
  watch: {
    // toggleRowSelections
    data: {
      handler: function() {
        // const that = this
        this.$emit('update:refObj', this.$refs.table)
        this.$nextTick(() => {
          this.toggleRowData()
        })
      },
      deep: true // 深度监听
    },
    // toggleRowSelections: {
    //   handler: function (val) {
    //     alert('深度')
    //     this.$emit('update:refObj', this.$refs.table)
    //   },
    //   deep: true // 深度监听
    // },
    fieldList: {
      handler: function(val) {
        this.clodata = val
      },
      deep: true // 深度监听
    }
  },
  mounted() {
    this.$emit('update:refObj', this.$refs.table)
    this.toggleRowData()
  },
  methods: {
    // 列拖拽
    columnDrop() {
      const __arr = this.$deepClone(this.clodata)
      const wrapperTr = document.querySelector('.el-table__header-wrapper tr')
      this.sortable = Sortable.create(wrapperTr, {
        animation: 180,
        sort: true,
        delay: 0,
        onEnd: evt => {
          const oi = evt.oldIndex
          const ni = evt.newIndex
          this.render = false
          __arr.splice(ni, 0, ...__arr.splice(oi, 1))
          this.clodata = this.$deepClone(__arr)
          this.$nextTick(() => {
            this.render = true
          })
        }
      })
    },
    tableRowClassName({ row, rowIndex }) {
      row.rowIndex = rowIndex
      this.$emit('tableRowClassName', { row, rowIndex })
      // return this.callback({ row, rowIndex })
      return this.callback({ row, rowIndex })
    },
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
    handleRowDblclick(rows) {
      this.$emit('rowDblclick', rows)
    },
    handleRowlclick(rows) {
      this.$emit('rowlclick', rows)
    },
    //
    toggleRowData() {
      this.$emit('update:refObj', this.$refs.table)
      if (!this.toggleRowSelections) return
      this.data.forEach((items, indexs) => {
        this.$refs.table.toggleRowSelection(this.data[indexs], true)
      })
    },
    getSummaries({ columns, data }) {
      //
      return this.getSummariesCallBack({ columns, data })
    }
  }
}
</script>
