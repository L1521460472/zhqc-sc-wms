<!--
 * @Descripttion:
 * @version:
 * @Author: chentianyu
 * @Date: 2021-11-29 10:05:58
 * @LastEditors: chentianyu
 * @LastEditTime: 2021-11-29 15:00:23
-->
<template>
  <el-autocomplete
    v-model="model.tLotCode"
    :fetch-suggestions="querySearchAsync"
    :placeholder="getPlaceholder(item)"
    clearable
    @select="handleSelect"
  />

</template>

<script>
import service from '@/utils/server'
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'

export default {
  props: {
    model: {
      type: Object,
      default: () => {},
      require: true
    },
    type: {
      type: String,
      default: 'stateAdjustment',
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

    }
  },
  computed: {
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    // 得到placeholder的显示
    getPlaceholder(row) {
      return this.$t('table.select') + row.label
    },
    querySearchAsync(queryString, callback) {
      const data = this.model
      if (this.$isEmpty(data.adjQty)) {
        this.$message.error('请先填写调整数量')
        callback([])
        return
      }
      this.listApi().then(res => {
        if (res.code === this.$successCode) {
          const arr = []
          arr.push({ label: res.obj, value: res.obj })
          // this.list = arr
          callback(arr)
        } else {
          callback([])
        }
      }).catch(() => {
        callback([])
      })
    },
    handleSelect(item) {
      // this.model.tLotCode = item.value
    },
    /**
             * 列表查询接口
             * @param queryText 查询文本
             */
    listApi() {
      const data = this.model
      const params = {
        'originNo': data.asnNo,
        'containerNo': 'XNRQ_REC',
        'skuId': data.skuId,
        'batchNo': 'str',
        'paType': data.tSkuStatus == 'BHGP' ? 'SHBLPSJ' : 'SHLPSJ',
        'waitPaQty': data.adjQty,
        'recommLot': 'lot_rec'
      }
      if (this.type === 'stateAdjustment') {
        params.paType = data.tSkuStatus == 'BHGP' ? 'SHBLPSJ' : 'SHLPSJ'
      } else if (this.type === 'batchAdjustment') {
        params.paType = data.lotQuality == 'BHGP' ? 'SHBLPSJ' : 'SHLPSJ'
      }
      return service({
        url: VUE_APP_WMS_MODEL + '/ib/pa/getRecommLot',
        method: 'post',
        closeGlobalLoading: { closeLoading: true },
        data: params
      })
    },
    /**
             * 清空数据
             */
    clear() {
      // const item = this.item
      // this.model[item.value] = null
      // this.model[item.link] = null
      // this.list = []
    }
  }
}
</script>
