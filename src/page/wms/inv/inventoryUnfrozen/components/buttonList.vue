<template>
  <div>
    <div style="display: inline-block;margin-left: 5px">
      <el-button v-waves type="primary" size="mini" :disabled="$hasPerm('view')" @click="handleClick('openViewPage', row)">查看</el-button>
      <el-button v-waves type="success" size="mini" :disabled="$hasPerm('edit')" @click="handleClick('openEditPage', row)">编辑</el-button>
      <el-popover placement="bottom" trigger="click">
        <el-button v-waves type="danger" size="mini" :disabled="$hasPerm('delete')" @click="handleClick('deleteData', row)">删除</el-button>
        <el-button v-waves type="primary" size="mini" @click="handleClick('auditAdj', row)">审核</el-button>
        <el-button
          slot="reference"
          size="mini"
          type="warning"
          icon="el-icon-more"
          @click="handleClick('')"
        >更多
        </el-button>
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

<!--<template>-->
<!--  <div>-->
<!--    <div  style="display: inline-block;margin-left: 5px">-->
<!--      <el-button v-waves type="primary" size="mini" :disabled="$hasPerm('view')" @click="handleClick('openViewPage', row)">查看</el-button>-->
<!--      <el-button v-if="row.adjStatus === 'NEW'" v-waves type="success" size="mini" :disabled="$hasPerm('edit')" @click="handleClick('openEditPage', row)">编辑</el-button>-->
<!--      <el-popover placement="bottom" trigger="click">-->
<!--        <el-button v-if="row.adjStatus === 'NEW'" type="danger" v-waves size="mini" :disabled="$hasPerm('delete')" @click="handleClick('deleteData', row)">删除</el-button>-->
<!--        <el-button v-if="row.adjStatus === 'NEW'" type="primary" v-waves size="mini" :disabled="$hasPerm('cancel')" @click="handleClick('auditAdj', row)">审核</el-button>-->
<!--        <el-button v-if="row.adjStatus === 'YSH'" type="primary" v-waves size="mini" :disabled="$hasPerm('audit')" @click="handleClick('unAuditAdj', row)">取消审核</el-button>-->
<!--        <el-button slot="reference" size="mini" type="warning" icon="el-icon-more"-->
<!--                   @click="handleClick('')">更多-->
<!--        </el-button>-->
<!--      </el-popover>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--  export default {-->
<!--    name: "buttonList",-->
<!--    props: {-->
<!--      row: {-->
<!--        type: Object,-->
<!--        default: () => {-->
<!--          return null-->
<!--        }-->
<!--      },-->
<!--      btList:{-->
<!--        type: Array,-->
<!--        default: () => {-->
<!--          return []-->
<!--        }-->
<!--      }-->
<!--    },-->
<!--    methods:{-->
<!--      //-->
<!--      handleClick (event, data) {-->
<!--        this.$emit('handleClick', event, data)-->
<!--      },-->
<!--    }-->
<!--  }-->
<!--</script>-->
