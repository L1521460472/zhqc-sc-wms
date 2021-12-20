<template>
  <el-select
    ref="refSelect"
    v-model="value"
    placeholder="请输入"
    remote
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
      :key="item.dicCode"
      :label="item.dicName"
      :value="item.dicCode"
    >
      <slot>
        <span style="float: left; color: #8492a6; font-size: 13px">{{ item.dicName }}</span>
      </slot>
    </el-option>
  </el-select>
</template>

<script>
import service from '@/utils/server'
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'

export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    selectKey: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // eslint-disable-next-line vue/require-default-prop
    dicTypeCode: {
      type: String
    }
  },
  data() {
    return {
      tempDicTypeCode: null,
      value: null,
      list: [],
      loading: false,
      // listUrl: process.env.VUE_APP_WMS_MODEL + '/base/tm/dictionaryDt/queryDictionaryCbList',
      // itemUrl: process.env.VUE_APP_WMS_MODEL + '/base/tm/dictionaryDt/initUpdate/'
      listUrl: VUE_APP_WMS_MODEL + '/base/tm/dictionaryDt/queryDictionaryCbList',
      itemUrl: VUE_APP_WMS_MODEL + '/base/tm/dictionaryDt/initUpdate/'
    }
  },
  computed: {},
  watch: {
    selectKey(val) {
      if (val) {
        this.getList(val)
        this.value = val
      } else {
        this.clear()
      }
    },

    dicTypeCode(val) {
      if (this.tempDicTypeCode && this.tempDicTypeCode != val) {
        this.value = null
      }
      this.tempDicTypeCode = val
      this.getList()
    }

  },
  methods: {
    /**
       * 查询数据
       * @param queryText 查询文本
       * @returns {Promise<any>}
       */
    getList() {
      if (!this.tempDicTypeCode) {
        this.list = []
        return
      }
      this.loading = true
      return new Promise((resolve, reject) => {
        const data = { 'dicTypeCode': this.tempDicTypeCode }
        this.listApi(data).then(res => {
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
    listApi(data) {
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
        url: this.itemUrl + this.selectKey,
        method: 'post'
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
          if (this.list[i].dicCode == this.value) {
            this.$emit('select', this.value, this.list[i])
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
