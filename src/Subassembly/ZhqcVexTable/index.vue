<!--Main-->
<template>
  <div>
    <vxe-toolbar v-if="topBtn.show">
      <template v-slot:buttons>
        <el-button
          v-waves
          :type="topBtn.type"
          :icon="topBtn.icon"
          :disabled="topBtn.disabled"
          :loading="topBtn.loading"
          @click="handleClick(topBtn.event)"
        >
          {{ topBtn.label }}
        </el-button>
      </template>
    </vxe-toolbar>
    <vxe-table
      v-if="data"
      ref="form"
      :height="height || null"
      empty-text="暂无数据"
      :keep-source="keepSource"
      :sync-resize="selectTab"
      resizable
      border
      stripe
      show-overflow
      row-id="rowId"
      style="width: 100%"
      :edit-config="config"
      :edit-rules="rules"
      :data.sync="data"
      @cell-click="cellClickEvent"
      @checkbox-change="selectionChange"
      @checkbox-all="selectionAllChange"
      @edit-actived="editActivedEvent"
      @edit-closed="editClosedEvent"
    >
      <vxe-table-column
        v-for="column in fieldList"
        :key="column.prop"
        header-align="center"
        align="center"
        :field="column.prop"
        :title="column.label"
        :width="column.width"
        :min-width="column.minWidth"
        :fixed="column.fixed"
        :type="column.type"
        :formatter="column.formatter"
        :edit-render="column.edit"
        show-overflow-tooltip
      />
      <vxe-table-column
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
              @click="handleClick(item.event, {...scope.row,$rowIndex:scope.$rowIndex})"
            >
              {{ item.label }}
            </el-button>
          </template>
        </template>
      </vxe-table-column>
    </vxe-table>
    <!--    -->
    <vxe-pager
      :total="total"
      :current-page="pageRequest.page"
      :page-sizes="pageSizes"
      :page-size="pageRequest.limit"
      :layouts="layouts"
      @page-change="handlePageChange"
    />
    <!--    -->
  </div>
</template>

<script>
export default {
  name: 'Main',
  props: {
    // 列表数据
    // eslint-disable-next-line vue/require-default-prop
    data: {
      type: Array
    },
    // 验证规则
    // eslint-disable-next-line vue/require-default-prop
    rules: {
      type: Object
    },
    // eslint-disable-next-line vue/require-default-prop
    refObj: {
      type: Object
    },
    // eslint-disable-next-line vue/require-default-prop
    topBtn: {
      type: Object
    },
    // 表格字段配置
    fieldList: {
      type: Array,
      default: () => {
        return []
      }
    },
    layouts: {
      type: Array,
      default: () => {
        return ['PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']
      }
    },
    config: {
      type: Object,
      default: () => {
        return { trigger: 'click', mode: 'cell' }
      }
    },
    // 操作栏配置
    // eslint-disable-next-line vue/require-default-prop
    handle: {
      type: Object
    },
    maxHeight: {
      type: Number,
      default: 500
    },
    size: {
      type: String,
      default: 'mini'
    },
    selectTab: {
      type: String,
      default: ''
    },
    keepSource: {
      type: Boolean,
      default: true
    },
    // eslint-disable-next-line vue/require-default-prop
    keyID: String,

    total: {
      type: [String, Number],
      default: ''

    },
    // eslint-disable-next-line vue/require-default-prop
    pageRequest: {
      type: Object
    },
    // eslint-disable-next-line vue/require-default-prop
    height: {
      type: Number
    },
    pageSizes: {
      type: Array,
      default: () => {
        return [10, 15, 20, 30, 50]
      }
    }
  },
  data() {
    return {
      page4: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 300
      }
    }
  },
  computed: {
  },
  watch: {
    data: {
      handler: function() {
        // 将form实例返回到父级
        this.$emit('update:refObj', this.$refs.form)
      },
      deep: true // 深度监听
    }
  },
  mounted() {
    // 将form实例返回到父级
    this.$emit('update:refObj', this.$refs.form)
    //
    this.checkBox()
  },
  //
  methods: {
    editActivedEvent(data) {
      this.$emit('editActivedEvent', data)
    },
    //
    editClosedEvent(data) {
      this.$emit('editClosedEvent', data)
    },
    // 派发按钮点击事件
    handleClick(event, data) {
      this.$emit('handleClick', event, data)
    },
    cellClickEvent({ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex }) {
      this.$emit('cellClickEvent', { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex })
    },
    selectionChange(selection) {
      this.$emit('handleEvent', 'selectionChange', selection)
    },
    selectionAllChange(selection) {
      this.$emit('handleEvent', 'selectionAllChange', selection)
    },
    checkBox() {
      const that = this
      this.$nextTick(function() {
        if (that.data) {
          that.data.forEach(item => {
            if (item.selected) {
              that.$refs.form.setSelection(item, true)
            }
          })
        }
      })
    },
    handlePageChange({ currentPage, pageSize }) {
      this.$emit('pageChange', { currentPage, pageSize })
    }
  }
}
</script>
