<!--Main-->
<template>
  <div class="pageTopForm" :class="{lessheight:temp,active:collapsable}">
    <el-form
      ref="pageform"
      :class="className"

      :model="data"
      :rules="rules"
      :label-width="labelWidth"
    >
      <el-form-item
        v-for="(item, index) in getConfigList()"
        :key="index"
        :prop="item.value"
        :label="item.label"
        :class="item.className"
      >
        <!-- solt -->
        <template v-if="item.type === 'slot'">
          <slot :name="'form-' + item.value" :item="item" />
        </template>
        <!-- 普通输入框 -->
        <el-input
          v-if="item.type === 'input' || item.type === 'password'"
          v-model="data[item.value]"
          :type="item.type"
          :style="item.style"
          :disabled="item.disabled"
          :clearable="item.clearable === false ? item.clearable : true"
          :placeholder="getPlaceholder(item)"
          :oninput="item.oninput"
          @keyup.enter.native="handleEvent(item.enterEvent)"
          @focus="handleEvent(item.event)"
        />
        <!-- 文本输入框 -->
        <el-input
          v-if="item.type === 'textarea'"
          v-model.trim="data[item.value]"
          :type="item.type"
          :disabled="item.disabled"
          :clearable="item.clearable === false ? item.clearable : true"
          :placeholder="getPlaceholder(item)"
          :autosize="item.autosize || {minRows: 2, maxRows: 10}"
          @focus="handleEvent(item.event)"
        />
        <!--  响应回车事件的    -->
        <el-input
          v-if="item.type === 'kinput'"
          v-model="data[item.value]"
          type="text"
          :disabled="item.disabled"
          :clearable="item.clearable === false ? item.clearable : true"
          :placeholder="getPlaceholder(item)"
          :oninput="item.oninput"
          @keyup.enter.native="handleEvent(item.event)"
        />
        <!--  纯数字输入框    -->
        <el-input
          v-if="item.type === 'numeral'"
          v-model="data[item.value]"
          type="number"
          :inline="true"
          onkeypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))"
          :disabled="item.disabled"
          :clearable="item.clearable === false ? item.clearable : true"
          :placeholder="getPlaceholder(item)"
          @focus="handleEvent(item.event)"
        />
        <!-- 计数器 -->
        <el-input-number
          v-if="item.type === 'number'"
          v-model="data[item.value]"
          size="small"
          :disabled="item.disabled"
          :min="item.min"
          :max="item.max"
          max-length="9"
          @change="handleEvent(item.event)"
        />
        <!-- 选择框 -->
        <el-select
          v-if="item.type === 'select'"
          v-model="data[item.value]"
          :disabled="item.disabled"
          :clearable="item.clearable === false ? item.clearable : true"
          :filterable="item.filterable"
          :multiple="item.multiple"
          :collapse-tags="item.collapsetags"
          :placeholder="getPlaceholder(item)"
          @change="handleEvent(item.event, data[item.value])"
        >
          <el-option
            v-for="(childItem, childIndex) in listTypeInfo[item.list]"
            :key="childIndex"
            :label="childItem.key"
            :value="childItem.value"
          />
        </el-select>

        <!-- 远程搜索框@change="handleEvent(item.event, data[item.value])" -->
        <el-select
          v-if="item.type === 'searchSelect'"
          v-model="data[item.value]"
          :disabled="item.disabled"
          :clearable="item.clearable === false ? item.clearable : true"
          :filterable="item.filterable"
          :placeholder="getPlaceholder(item)"
          remote
          reserve-keyword
          :remote-method="remoteMethod"
        >
          <!--        <el-option-->
          <!--          v-for="(childItem, childIndex) in listTypeInfo[item.list]"-->
          <!--          :key="childIndex"-->
          <!--          :label="childItem.key"-->
          <!--          :value="childItem.value"-->
          <!--        />-->
          <el-option
            v-for="(childItem, childIndex) in listTypeInfo[item.list]"
            :key="childIndex"
            :label="childItem.key"
            :value="childItem.value"
          />
        </el-select>
        <!-- 日期选择框 -->
        <el-date-picker
          v-if="item.type === 'date'"
          v-model="data[item.value]"
          :type="item.dateType"
          :picker-options="item.TimePickerOptions"
          :clearable="item.clearable === false ? item.clearable : true"
          :disabled="item.disabled"
          :format="item.format || dateTime"
          :value-format="item.valueFormat || dateTime"
          :placeholder="getPlaceholder(item)"
          @focus="handleEvent(item.event)"
        />
        <el-date-picker
          v-if="item.type === 'daterange'"
          v-model="data[item.value]"
          :type="item.type"
          :format="item.format || dateTime"
          :value-format="item.valueFormat || dateTime"
          range-separator="-"
          :start-placeholder="startPlaceholder || '开始日期'"
          :end-placeholder="endPlaceholder || '结束日期'"
        />
        <el-checkbox
          v-if="item.type === 'checkbox'"
          v-model="data[item.value]"
          :disabled="item.disabled"
          :border="item.border"
        >{{ item.label }}</el-checkbox>
        <el-radio-group
          v-if="item.type === 'radio'"
          v-model="data[item.value]"
        >
          <el-radio
            v-for="(childItem, childIndex) in listTypeInfo[item.list]"
            :key="childIndex"
            :label="childItem.value"
            :disabled="item.disabled"
          >{{ childItem.key }}</el-radio>
        </el-radio-group>
        <!-- 信息展示框 -->
        <!--<el-tag v-if="item.type === 'tag'">-->
        <!--{{ $fn.getDataName({dataList: listTypeInfo[item.list], value: 'value', label: 'key', data: data[item.value]}) || '-' }}-->
        <!--</el-tag>-->
        <el-button
          v-if="item.type === 'button'"
          v-waves
          :class="`filter-${item.type}`"
          :type="item.btType"
          :icon="item.icon"
          :disabled="item.disabled"
          @click="handleClick(item.event)"
        >
          {{ item.btnlabel }}
        </el-button>
      </el-form-item>
    </el-form>
    <div class="btn-box">
      <!-- <el-button
        v-waves
        @click="clickHandle"
      >
        自定义
      </el-button> -->

      <div v-if="temp" class="collapsable-item" @click="openCollapsable">
        {{ collapsable ? "收起" : "展开"
        }}<i
          :class="collapsable ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
        />
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'ZhqcTopFormSc',
  props: {
    // 自定义类名
    // eslint-disable-next-line vue/require-default-prop
    className: {
      type: String
    },
    // 表单数据
    // eslint-disable-next-line vue/require-default-prop
    data: {
      type: Object
    },
    // 相关字段
    // eslint-disable-next-line vue/require-default-prop
    fieldList: {
      type: Array
    },
    // 验证规则
    // eslint-disable-next-line vue/require-default-prop
    rules: {
      type: Object
    },
    // 相关的列表
    // eslint-disable-next-line vue/require-default-prop
    listTypeInfo: {
      type: Object
    },
    // label宽度
    labelWidth: {
      type: String,
      default: '120px'
    },
    // eslint-disable-next-line vue/require-default-prop
    refObj: {
      type: Object
    },
    // eslint-disable-next-line vue/require-default-prop
    formType: {
      type: String
    },
    // 几行收起
    lineNum: {
      type: Number,
      default: 2
    },
    defaultCollapsable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      collapsable: false,
      temp: false,
      dateTime: 'yyyy-MM-dd'
    }
  },
  watch: {
    data: {
      handler: function() {
        // 将form实例返回到父级
        this.$emit('update:refObj', this.$refs.pageform)
      },
      deep: true // 深度监听
    },
    defaultCollapsable: {
      handler(val) {
        this.collapsable = val
      },
      immediate: true
    }
  },
  mounted() {
    // 将form实例返回到父级
    this.$nextTick(() => {
      this.temp = this.$refs.pageform.$el.clientHeight >= 40 * this.lineNum
    })
    this.$emit('update:refObj', this.$refs.pageform)
  },
  updated() {
    this.$nextTick(() => {
      this.temp = this.$refs.pageform.$el.clientHeight >= 40 * this.lineNum
    })
  },
  methods: {
    clickHandle() {
    },
    // 获取字段列表
    getConfigList() {
      if (this.fieldList) {
        return this.fieldList.filter(item => !this.$hasOwnProperty(item, 'show') || (this.$hasOwnProperty(item, 'show') && item.show))
      }
    },
    // 得到placeholder的显示table.inputthis.$t('button.ok')
    getPlaceholder(row) {
      let placeholder
      if (row.type === 'input' || row.type === 'textarea' || row.type === 'kinput') {
        placeholder = this.$t('table.input') + row.label
      } else if (row.type === 'select' || row.type === 'time' || row.type === 'date') {
        placeholder = this.$t('table.select') + row.label
      } else {
        placeholder = row.label
      }
      return placeholder
    },
    // 绑定的相关事件
    handleEvent(evnet, data) {
      this.$emit('handleEvent', evnet, data)
    },
    // 派发按钮点击事件
    handleClick(event, data) {
      this.$emit('handleClick', event, data)
    },
    remoteMethod(query) {
      this.$emit('remoteMethod', query)
    },
    openCollapsable() {
      this.collapsable = !this.collapsable
    }
  }
}
</script>
<style lang="scss" scoped>
.pageTopForm{
  position: relative;
    transition: all 6s ease-in-out;

  &.lessheight{
  height: 38px;
  overflow: hidden;

  }
  &.active{
    height: auto;
    overflow: visible;

  }
  .el-form{
    margin-right: 46px;
  }

  .btn-box{
    display: flex;
    position: absolute;
    right: 0;
    bottom: 8px;
  }
  .el-radio-group {
    width: 100% !important;
    .el-radio {
      line-height: 28px;
    }
  }
}
</style>
