<template>
  <el-select
    ref="refSelect"
    v-model="value"
    :placeholder="placeholder"
    :loading="loading"
    filterable
    clearable
    :disabled="disabled"
    @focus="focus"
    @change="selectItem"
    @clear="clear"
  >
    <el-option
      v-for="(e,index) in list"
      :key="index"
      :label="e.key"
      :value="e.value"
    />
  </el-select>
</template>

<script>
import service from '@/utils/server'

export default {
  props: {
    selectKey: {
      type: Number,
      default: -1
    },
    disabled: {
      type: Boolean,
      default: false
    },
    linkId: {
      type: [Number, null],
      default: null
    },
    listUrl: {
      type: String,
      default: ''
    },
    // 区分标志，因第一个不需要参数
    isFrist: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: () => {}
    },
    model: {
      type: Object,
      default: () => {}
    },
    placeholder: {
      type: String,
      default: '请选择'
    }

  },
  data() {
    return {
      value: null,
      province: null,
      link: null,
      list: [],
      loading: false
      // listUrl: process.env.VUE_APP_WMS_MODEL + '/base/address/city/queryCityList/'
    }
  },
  computed: {},
  watch: {
    selectKey(val) {
      if (val === 0) {
        this.value = ''
        this.list = []
        return
      }
      this.value = val
      if (val) {
        this.getList()
      }
    },
    linkId(val) {
      if (this.link && this.link != val) {
        this.value = null
        this.model[this.item.value] = null
        this.model[this.item.link] = null
      }
      this.link = val
      this.$nextTick(() => {
        this.getList()
      })
    }
  },
  methods: {
    /**
       * 查询数据
       * @param queryText 查询文本
       * @returns {Promise<any>}
       */
    getList() {
      if (!this.isFrist) {
        if (!this.link) {
          this.list = []
          return
        }
      }
      this.loading = true
      return new Promise((resolve, reject) => {
        this.listApi().then(res => {
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
    listApi() {
      return service({
        // url: !this.isFrist ? this.listUrl : this.listUrl + (this.link || ''),
        url: this.listUrl + (this.link || ''),
        method: 'get'
      })
    },
    /**
       * 选中下拉项
       * @param value
       */
    selectItem(value) {
      // 将空字符串转为null
      this.value = value === '' ? null : value
      // 触发父组件的自定义事件
      if (this.list && this.value) {
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].value == this.value) {
            const row = this.list[i]
            this.model[this.item.value] = row?.value
            this.model[this.item.link] = row?.key
            this.$emit('select', this.value, row)
            // this.$emit('select', this.value, this.list[i])
          }
        }
      } else {
        this.$emit('select', null, {})
      }
    },
    handleLink(item, value) {
      const list = this.listTypeInfo[item.list]
      const resulit = list.filter((item) => item.value === value)
      this.data[item.link] = resulit[0]?.key || null
      this.$emit('handleEvent', item.evnet, value)
    },
    /**
       * 获得焦点
       */
    focus() {
      // 第一次或者没有下拉缓存数据时，查询数据
      if ((this.value === null || this.value === '') && this.list.length === 0) {
        this.getList()
      }
    },
    /**
       * 清空数据
       */
    clear() {
      this.value = null
      this.list = []
      this.model[this.item.value] = null
      this.model[this.item.link] = null
    }

  }
}
</script>

<style lang="scss" scoped>
  .refer-page-form {
    position: relative;
    top: 8px;
    .el-form-item {
      display: inline-block;
    }
  }

  .radio-bg {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 200;
  }

  .addTop {
    animation-name: slideInTop;
    animation-duration: .5s;
  }

  @keyframes slideInTop {
    0% {
      transform: translateY(100%);
      opacity: 0.5;
    }

    to {
      transform: translateY(0px);
      opacity: 1;
    }
  }
</style>
<style lang="scss">
  .hd-page-body-content-item {
    .el-table .cell.el-tooltip {
      min-width: 40px;
    }
    thead {
      .el-table-column--selection {
        .cell {
          display: none;
        }
      }
    }
  }

  /* 三级弹窗*/
  .hd-page {
    width: 70%;
    height: 84%;
    background: #fff;
    margin: 6% auto 0 auto;
    color: #909399;
    border-radius: 10px;
  }

  .hd-wapper {
    width: 100%;
    height: 100%;
    padding: 60px 0;
    position: relative;
  }

  .hd-page-header {
    width: 100%;
    line-height: 35px;
    background: #fff;
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 10px;
    z-index: 100;
  }

  .hd-page-header-top {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e6e8eb;
    padding: 0 15px;
    background: #f5f5f5;
    border-radius: 10px 10px 0 0;
  }

  .hd-page-header-bottom {
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #f5f5f5;
    height: 40px;
  }

  .hd-page-body {
    height: 92%;
    overflow: auto;
  }

  .hd-page-body-content {
    width: 90%;
    margin: 40px auto 20px auto;
    background: #f5f5f5;
    position: relative;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  }

  .hd-page-body-content-space {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid #e6e8eb;
    padding: 0 15px 0 25px;
    position: relative;
  }

  .hd-page-body-content-space:after {
    content: "";
    display: inline-block;
    position: absolute;
    left: 12px;
    top: 50%;
    width: 3px;
    height: 16px;
    border-radius: 2px;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%)
  }

  .hd-page-bottom {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .hd-page-bottom-btn {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 15px 20px 10px 0;
    border-top: 1px solid #e6e8eb;
  }
</style>
