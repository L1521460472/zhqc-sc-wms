<!--<template>-->
<!--  <div>-->
<!--    <el-button v-if="!$hasPerm('edit')" size="mini" type="success" :disabled="scope.data.row.orderStatus !== 'NEW_CREATE' || scope.data.row.orderOrig !== 'USER_CREATE'" @click="openEditPage(scope.data.row)">编辑</el-button>-->

<!--    <div v-for="(item, index) in btList" :key="index" style="display: inline-block;margin-left: 5px">-->
<!--      &lt;!&ndash; 操作按钮 &ndash;&gt;-->
<!--      &lt;!&ndash;      <el-button&ndash;&gt;-->
<!--      &lt;!&ndash;        :key="index"&ndash;&gt;-->
<!--      &lt;!&ndash;        v-waves&ndash;&gt;-->
<!--      &lt;!&ndash;        size="mini"&ndash;&gt;-->
<!--      &lt;!&ndash;        :type="item.type"&ndash;&gt;-->
<!--      &lt;!&ndash;        :icon="item.icon"&ndash;&gt;-->
<!--      &lt;!&ndash;        :disabled="item.disabled"&ndash;&gt;-->
<!--      &lt;!&ndash;        :loading="item.loading"&ndash;&gt;-->
<!--      &lt;!&ndash;        @click="handleClick(item.event, row)"&ndash;&gt;-->
<!--      &lt;!&ndash;      >&ndash;&gt;-->
<!--      &lt;!&ndash;        {{ item.label }}&ndash;&gt;-->
<!--      &lt;!&ndash;      </el-button>&ndash;&gt;-->
<!--      &lt;!&ndash;            &ndash;&gt;-->
<!--      <el-button-->
<!--        v-if="item.show"-->
<!--        :key="index"-->
<!--        v-waves-->
<!--        size="mini"-->
<!--        :type="item.type"-->
<!--        :icon="item.icon"-->
<!--        :disabled="editButtonDiable(item, row)"-->
<!--        :loading="item.loading"-->
<!--        @click="handleClick(item.event, row)"-->
<!--      >-->
<!--        {{ item.label }}-->
<!--      </el-button>-->
<!--      &lt;!&ndash;-->
<!--        :disabled="vitem.disabled"-->
<!--        :disabled="button_enable(vitem, row)"-->
<!--       &ndash;&gt;-->

<!--      <el-popover v-if="item.btShow" placement="bottom" trigger="click">-->
<!--        <el-button-->
<!--          v-for="(vitem, vindex) in item.moreList"-->
<!--          :key="vindex"-->
<!--          v-waves-->
<!--          size="mini"-->
<!--          :type="vitem.type"-->
<!--          :icon="vitem.icon"-->
<!--          :disabled="popButtonEnable(vitem, row)"-->
<!--          :loading="vitem.loading"-->
<!--          @click="handleClick(vitem.event, row)"-->
<!--        >-->
<!--          {{ buttonLabel(vitem, row) }}-->
<!--        </el-button>-->
<!--        <el-button-->
<!--          slot="reference"-->
<!--          :icon="item.icon"-->
<!--          :type="item.type"-->
<!--          size="mini"-->
<!--          @click="handleClick(item.event)"-->
<!--        >{{ item.label }}-->
<!--        </el-button>-->
<!--      </el-popover>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: 'ButtonList',-->
<!--  props: {-->
<!--    row: {-->
<!--      type: Object,-->
<!--      default: () => {-->
<!--        return null-->
<!--      }-->
<!--    },-->
<!--    btList: {-->
<!--      type: Array,-->
<!--      default: () => {-->
<!--        return []-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    //-->
<!--    handleClick(event, data) {-->
<!--      this.$emit('handleClick', event, data)-->
<!--    },-->

<!--    editButtonDiable(item, row) {-->
<!--      if (item.event == 'openEditPage') {-->
<!--        if (item.disabled) {-->
<!--          return true-->
<!--        }-->
<!--        return !(row.orderStatus == 'ORDER_CREATE' && row.orderOrig == 'SG_CJ')-->
<!--      } else {-->
<!--        return item.disabled-->
<!--      }-->
<!--    },-->

<!--    popButtonEnable(vitem, row) {-->
<!--      const self = this-->
<!--      // if(vitem.disabled){-->
<!--      //   return true-->
<!--      // }-->
<!--      if (vitem.event == 'handleCancel') {-->
<!--        return !(row.orderOrig == 'SG_CJ' &&-->
<!--              (row.orderStatus == 'ORDER_CREATE' || row.orderStatus == 'CARRIER_CREATE' || row.orderStatus == 'FULL_REL'))-->
<!--      } else if (vitem.event == 'handleCreateAsn') {-->
<!--        return !self.isCanOrderDispatch(vitem, row)-->
<!--      } else {-->
<!--        return vitem.disabled-->
<!--      }-->
<!--    },-->

<!--    isCanOrderDispatch(vitem, row) {-->
<!--      const orderStatus = row.orderStatus-->
<!--      const orderType = row.orderType-->
<!--      if (orderType == 'ZPCGDD' || orderType == 'CGDDZP') {-->
<!--        return orderStatus == 'ORDER_CREATE'-->
<!--      }-->

<!--      return orderStatus != 'ORDER_CLOSE' && orderStatus != 'ORDER_COMP' &&-->
<!--                  orderStatus != 'ORDER_CANCEL' && orderStatus != 'CARRIER_CREATE' &&-->
<!--                  orderStatus != 'FULL_REL'-->
<!--    },-->

<!--    buttonLabel(vitem, row) {-->
<!--      const self = this-->
<!--      if (vitem.event == 'handleCreateAsn') {-->
<!--        return self.isCanCreateAsn(row) ? '创建ASN' : '下发'-->
<!--      } else {-->
<!--        return vitem.label-->
<!--      }-->
<!--    },-->
<!--    // 订单是否可以创建ASN-->
<!--    isCanCreateAsn(row) {-->
<!--      const orderStatus = row.orderStatus-->
<!--      const orderType = row.orderType-->
<!--      if (orderType == 'ZPCGDD' || orderType == 'CGDDZP') {-->
<!--        return false-->
<!--      }-->
<!--      return orderStatus != 'ORDER_CLOSE' && orderStatus != 'ORDER_COMP' && orderStatus != 'ORDER_CANCEL'-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->

<template>
  <div>
    <div style="display: inline-block;margin-left: 5px">
      <!-- 操作按钮 -->
      <el-button v-waves style="margin-right: 5px" type="primary" size="mini" @click="handleClick('openViewPage', row)">查看</el-button>
      <el-button size="mini" type="success" :disabled="!(row.orderStatus === 'NEW_CREATE' && row.orderOrig ==='USER_CREATE')" style="margin-right: 5px" @click="handleClick('openEditPage',row)">编辑</el-button>
      <el-popover placement="bottom" trigger="click">
        <el-button size="mini" type="warning" :disabled="this.$hasPerm('outOrder')" @click="handleClick('handleCreateSo', row)">下发</el-button>
        <!--        <el-button size="mini" type="warning" :disabled="this.$hasPerm('create_asn')" @click="handleClick('createASN', row)">生成ASN</el-button>-->
        <el-button size="mini" type="danger" :disabled="this.$hasPerm('cancel')" @click="handleClick('handleCancel', row)">取消</el-button>
        <el-button size="mini" type="danger" :disabled="!(row.orderStatus === 'NEW_CREATE' && row.orderOrig ==='USER_CREATE')" @click="handleClick('handleDelete', row)">删除</el-button>
        <el-button slot="reference" v-waves size="mini" type="warning" icon="el-icon-setting">更多</el-button>
      </el-popover>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ButtonList',
  props: {
    row: {
      type: Object,
      default: () => {
        return null
      }
    },
    btList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    //
    handleClick(event, data) {
      this.$emit('handleClick', event, data)
    }
  }
}
</script>
