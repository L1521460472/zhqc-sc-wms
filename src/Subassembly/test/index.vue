<template>
  <el-select
    ref="refSelect"
    v-model="model[selectKey]"
    placeholder="请输入"
    :remote="remote"
    :remote-method="getList"
    :loading="loading"
    filterable
    clearable
    :disabled="disabled"
    @focus="focus"
    @change="selectItem"
    @clear="clear"
  >
    <el-option
      v-for="item in list"
      :key="item[code]"
      :label="item[lable]"
      :value="item[code]"
    >
      <slot :item="item" />
    </el-option>
  </el-select>
</template>

<script>
import service from '@/utils/server'

export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    selectKey: {
      type: String
    },
    lable: {
      type: String,
      default: 'ownerName'
    },
    code: {
      type: String,
      default: 'id'
    },
    // eslint-disable-next-line vue/require-default-prop
    defaultList: {
      type: Array
    },
    disabled: {
      type: Boolean,
      default: false
    },
    remote: {
      type: Boolean,
      default: true
    },
    // eslint-disable-next-line vue/require-default-prop
    model: {
      type: Object
    },
    parameCode: {
      type: String,
      default: 'ownerCode'
    },
    listUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      value: null,
      list: [],
      loading: false
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
      const data = { [this.parameCode]: queryText, page: this.$globalPage, limit: this.$globalLimit }
      return service({
        url: this.listUrl,
        method: 'post',
        data
      })
    },
    /**
             * 选中项初始化接口
             */
    itemApi() {
      return service({
        url: this.itemUrl + this.model[this.selectKey],
        method: 'post'
      })
    },
    /**
             * 选中下拉项
             * @param value
             */
    selectItem(value) {
      // 将空字符串转为null
      this.model[this.selectKey] = value === '' ? ' ' : value
    },
    /**
             * 获得焦点
             */
    focus() {
      // 第一次或者没有下拉缓存数据时，查询数据
      if ((this.model[this.selectKey] === null || this.model[this.selectKey] === '' || this.model[this.selectKey] === undefined) && this.list.length === 0) {
        this.getList()
      }
    },
    /**
             * 清空数据
             */
    clear() {
      this.model[this.selectKey] = ''
      this.list = []
    }

  }
}
</script>
