<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <layout-body>
    <div slot="top-form">
      <!--  主页面top表单   -->
      <zhqc-top-form
        :ref-obj.sync="topForm.ref"
        :data="topForm.data"
        :field-list="topForm.fieldList"
        :rules="topForm.rules"
        :list-type-info="listTypeInfo"
        :label-width="topForm.labelWidth"
        @handleClick="handleClick"
        @handleEvent="handleEvent"
      >

        <!-- 展开收起表单 -->
        <template v-slot:form-sys="scope" class="el-icon-test">
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleClick('search')"
          >{{ $t("table.search") }}</el-button>
          <!-- <el-button
            type="warning"
            icon="el-icon-refresh-left"
            @click="handleClick('reboot')"
            >{{ $t("table.reboot") }}</el-button > -->
          <div class="collapsable-item" @click="handleClick('openCollapsable')">
            {{ collapsable ? "收起" : "展开"
            }}<i
              :class="collapsable ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
            />
          </div>
        </template>
        <!-- 展开收起表单结束 -->
      </zhqc-top-form>
    </div>
    <div slot="left-btn">
      <!-- <el-button-group>
        <el-button
          type="primary"
          icon="el-icon-folder-add"
          @click="handleClick('openAddPage')"
          :disabled="$hasPerm('add')"
          >{{ $t("table.add") }}</el-button
        >
      </el-button-group> -->

    </div>

    <div slot="tab-body" class="tab-body_auto">
      <!--  主页面的table表格  -->
      <zhqc-table
        :data.sync="resp"
        :field-list="tableInfo.fieldList"
        :handle="tableInfo.handle"
        @handleClick="handleClick"
        @handleEvent="handleEvent"
      >
        <template v-slot:col-orderType="scope">
          {{ parseOrderType(scope.row.orderType) }}
        </template>
        <template v-slot:col-status="scope">
          <el-tag v-if="scope.row.status == 0" effect="plain">
            已下发
          </el-tag>
          <el-tag v-if="scope.row.status == 1" type="info" effect="plain">
            已发运
          </el-tag>
          <el-tag v-if="scope.row.status == 2" type="success" effect="dark">
            已完成
          </el-tag>
          <el-tag v-if="scope.row.status == 3" type="danger" effect="dark">
            已关闭
          </el-tag>
        </template>
        <template v-slot:col-executionStatus="scope">
          {{ parseExecutionStatus(scope.row.executionStatus).text }}
        </template>
        <template v-slot:bt-slotEvent="scope">
          <el-button size="mini" type="danger" :disabled="scope.data.row.status == 2 || scope.data.row.executionStatus == 10 || scope.data.row.executionStatus == 0" @click="resetUnusualStop(scope.data.row.id)">重启</el-button>
          <el-button v-show="scope.data.row.orderType == 10" size="mini" type="success">路由</el-button>
          <!-- <el-button size="mini" type="success"  v-if="!$hasPerm('edit')" :disabled="scope.data.row.orderStatus !== 'NEW_CREATE' || scope.data.row.orderOrig !== 'USER_CREATE'"  @click="openEditPage(scope.data.row)">编辑</el-button> -->
        </template>
      </zhqc-table>
    </div>

    <!-- :btList="batchBtnArray" -->
    <div slot="bottom-page">
      <!--  分页组件   -->
      <zhqc-page
        :total="total"
        :page-request="pageRequest"
        @pageChange="pageChange"
        @handleClick="handleClick"
      />
    </div>

  </layout-body>
</template>

<script>
import timingMixins from './mixins'

export default {
  name: 'Timing',
  mixins: [timingMixins],
  data() {
    return {
      store: 'timing/',
      modName: 'timing',
      collapsable: false, // 展开收缩
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      outOrderUrl: null,
      dialogInfo: {
        title: '',
        visible: false,
        type: '',
        width: '1200px',
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true }
      },
      whId: null,
      tempGrossWeightKg: null,
      tempGrossWeight: null,
      tempVolDec: null,
      tempVol: null
    }
  },
  computed: {
    resp() {
      return this.$store.state[this.modName].pageResp
    },
    total() {
      return this.$store.state[this.modName].total
    }
  },
  watch: {
    // 监听弹窗的状态 清除校验与初始化字段
    'dialogInfo.visible'(val) {
      const diaFormInfo = this.diaFormInfo
      if (!val) {
        if (diaFormInfo.ref) {
          diaFormInfo.ref.resetFields()
        }
        this.resetFormData()
      }
    },
    // 展开收缩
    collapsable(val) {
      //
      if (val) {
        this.collapsableFormMore()
      } else {
        this.collapsableForm()
      }
    }

  },
  mounted() {},
  methods: {
    parseOrderType(orderType) {
      if (orderType == 1) {
        return '采购入库'
      }
      if (orderType == 2) {
        return '调拨入库'
      }
      if (orderType == 3) {
        return '销售退货'
      }
      if (orderType == 4) {
        return '其他入库'
      }
      if (orderType == 5) {
        return '退货入库'
      }
      if (orderType == 6) {
        return '销售出库'
      }
      if (orderType == 7) {
        return '调拨出库'
      }
      if (orderType == 8) {
        return '采购退货'
      }
      if (orderType == 9) {
        return '其他出库'
      }
      if (orderType == 10) {
        return '路由信息'
      }
    },
    parseExecutionStatus(executionStatus) {
      const statusMsg = { text: '', type: '', effect: 'plain' }
      switch (executionStatus) {
        case 0:
          statusMsg.text = '可执行'
          statusMsg.type = ''
          break
        case 10:
          statusMsg.text = '完成'
          statusMsg.type = 'success'
          statusMsg.effect = 'dark'
          break
        case 20:
          statusMsg.text = '已删除'
          statusMsg.type = 'warning'
          statusMsg.effect = 'dark'
          break
        case 21:
          statusMsg.text = '停用'
          statusMsg.type = 'warning'
          statusMsg.effect = 'dark'
          break
        case 30:
          statusMsg.text = '超出执行次数'
          statusMsg.type = 'danger'
          statusMsg.effect = 'dark'
          break
        case 31:
          statusMsg.text = '超出错误执行次数'
          statusMsg.type = 'danger'
          statusMsg.effect = 'dark'
          break
        default:
          statusMsg.text = '未知状态' + executionStatus
          statusMsg.type = 'danger'
          statusMsg.effect = 'dark'
      }
      return statusMsg
    }
  }
}
</script>

<style lang="css">
  .el-tooltip__popper {
    font-size: 14px;
    max-zoom: 50%;
  }
</style>
