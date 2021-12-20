<template>
  <el-select
    ref="refSelect"
    v-model="model[item.value]"
    :placeholder="getPlaceholder(item)"
    :remote="remote"
    :remote-method="getList"
    :loading="loading"
    filterable
    clearable
    :multiple="multiple"
    :disabled="disabled"
    @focus="focus"
    @change="selectItem"
    @clear="clear"
  >
    <el-option
      v-for="(option,index) in list"
      :key="option[optionsProps.value]"
      :label="option[optionsProps.label]"
      :value="option[optionsProps.value]"
    >
      <!-- {{ item[optionsProps.value] }} -->
      <!-- <slot :item="item" /> -->
      <!-- <span style="float: left; color: #8492a6; font-size: 13px;">{{ item[optionsProps.label] }}</span> -->
    </el-option>
  </el-select>
</template>

<script>
import service from '@/utils/server'

export default {
  props: {
    model: {
      type: Object,
      default: () => {},
      require: true
    },
    optionsProps: {
      type: Object,
      require: true,
      default: () => {
        return {
          value: 'key',
          label: 'name'
        }
      }
    },
    defaultList: {
      type: Array,
      default() {
        return []
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    remote: {
      type: Boolean,
      default: true
    },
    listUrl: {
      type: String,
      default: '',
      require: true
    },
    // 0:公司级别,1:实体仓级别
    type: {
      type: Number,
      default: 0,
      require: true
    },
    item: {
      type: Object,
      default: () => {
        return {
          value: '',
          label: ''
        }
      },
      require: true
    }

  },
  data() {
    return {
      value: null,
      list: [],
      loading: false
    }
  },
  computed: {
    tempValue() {
      return this.model[this.item.value]
    }

  },
  watch: {
    'item.value'(val) {
      if (typeof val === 'string') {
        return false
      } else {
        this.getList()
      }
    },
    tempValue(value) {
      if (value && !this.list.length) {
        this.getList()
      }
    }
  },
  mounted() {
    const unwatch = this.$watch('defaultList', (val) => {
      if (val) {
        this.list = val
        unwatch()
      }
    })
  },
  methods: {
    // 得到placeholder的显示
    getPlaceholder(row) {
      return this.$t('table.select') + row.label
    },
    /**
             * 查询数据
             * @param queryText 查询文本
             * @returns {Promise<any>}
             */
    getList(queryText) {
      this.loading = true
      return new Promise((resolve, reject) => {
        this.listApi(queryText).then(res => {
          if (res.code === this.$successCode) {
            this.list = res.obj || []
            console.log('this.list:', this.list)
            resolve(res)
          } else {
            reject()
          }
        }).catch(() => {
          reject()
        }).finally(() => {
          this.loading = false
        })
      })
    },
    /**
             * 列表查询接口
             * @param queryText 查询文本
             */
    listApi(queryText) {
      // type  0:公司级别,1:实体仓级别
      const data = { keyWord: queryText, type: this.type }
      return service({
        url: this.listUrl,
        method: 'post',
        closeGlobalLoading: { closeLoading: true },
        data
      })
    },
    /**
             * 选中下拉项
             * @param value
             */
    selectItem(value) {
      const item = this.item
      // 将空字符串转为null
      this.model[item.value] = value ?? null
      if (this.list && value) {
        for (let i = 0; i < this.list.length; i++) {
          const rowvalue = this.list[i][this.optionsProps.value]
          if (rowvalue === value) {
            const row = this.list[i]
            // if (this.parameCode) this.model[item.value] = row[this.optionsProps.value]
            if (item.link) this.model[item.link] = row[this.optionsProps.label]
            this.$emit('select', value, row)
          }
        }
      } else {
        this.$emit('select', null, {})
      }
    },
    /**
             * 获得焦点
             */
    focus() {
      if (this.list.length === 1) {
        this.list = []
      }
      const item = this.item
      // 第一次或者没有下拉缓存数据时，查询数据
      if ((this.model[item.value] === null || this.model[item.value] === '' || this.model[item.value] === undefined) && this.list.length === 0) {
        this.getList()
      }
    },
    /**
             * 清空数据
             */
    clear() {
      const item = this.item
      this.model[item.value] = null
      this.model[item.link] = null
      this.list = []
    }
  }
}
</script>
