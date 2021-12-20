<!--
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-11-09 20:41:28
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-09 21:15:31
-->
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
      empty-text="暂无数据"
      :keep-source="keepSource"
      :sync-resize="selectTab"
      resizable
      border
      stripe
      show-overflow
      show-footer
      :height="height"
      row-id="rowId"
      style="width: 100%"
      :edit-config="config"
      :edit-rules="rules"
      :data.sync="data"
      :footer-method="footerMethod"
      @checkbox-change="selectionChange"
      @radio-change="radioChangeEvent"
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
      >
        <!--        -->

        <template v-if="column.type === 'slot'" v-slot="{ row, rowIndex}">
          <!-- solt 自定义列-->
          <template v-if="column.type === 'slot'">
            <slot
              :name="'col-' + column.prop"
              :row="row"
            />
          </template>

        </template>
        <!-- 表头合并 -->
        <template v-if="column.fieldType === 'field'">
          <vxe-column
            v-for="(item,index) in column.children"
            :key="'item' + index"
            align="center"
            :field="item.prop"
            :title="item.label"
            :width="item.width"
            :min-width="item.minWidth"
            :edit-render="item.edit"
            :type="item.type"
            :formatter="item.formatter"
            :fixed="item.fixed"
            show-overflow-tooltip
          >
            <template v-if="item.type === 'slot'" v-slot="{ row, rowIndex}">
              <!-- solt 自定义列-->
              <template v-if="item.type === 'slot'">
                <slot
                  :name="'col-' + item.prop"
                  :row="row"
                />
              </template>

            </template>
          </vxe-column>
        </template>
      </vxe-table-column>

      <vxe-table-column
        v-if="handle !== null"
        :key="'handle'"
        :fixed="handle.fixed"
        align="center"
        :title="handle.label"
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
    height: {
      type: Number,
      default: null
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
    // eslint-disable-next-line vue/require-default-prop
    footerMethod: {
      type: Function
    }
  },
  data() {
    return { }
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

    this.$forceUpdate()
  },
  //
  methods: {
    editActivedEvent(data) {
      console.log(data)
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
    selectionChange(selection) {
      this.$emit('handleEvent', 'selectionChange', selection)
    },
    radioChangeEvent({ row }) {
      this.selectRow = row
    },
    checkBox() {
      const that = this
      this.$nextTick(function() {
        if (that.data.length) {
          that.data.forEach(item => {
            if (item.selected) {
              that.$refs.form.setSelection(item, true)
            }
          })
        }
      })
    }
  }
}
</script>

