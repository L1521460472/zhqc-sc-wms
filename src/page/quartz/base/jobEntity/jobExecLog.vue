<template>
  <full-pop
    :visible.sync="visible"
    :top-title="dialogInfoLog.title"
    :close-btn="dialogInfoLog.closeBtn"
    :save-list="dialogInfoLog.btList"
    @handleClick="handleClick"
  >
    <vex-dia-table
      :data.sync="resp"
      :field-list="tableInfoLog.fieldList"
      :handle="tableInfoLog.handle"
      :top-btn="tableInfoLog.topBtn"
      @handleClick="handleClick"
    />
    <div>
      <zhqc-page
        :total="total"
        :page-request="pageRequest"
        @pageChange="pageChange"
      />
    </div>
    <!--<layout-body>-->
    <!--<div slot="tab-body" style="max-height: 70%">-->
    <!--&lt;!&ndash;  主页面的table表格  &ndash;&gt;-->
    <!--<zhqc-table-->
    <!--:data.sync="resp"-->
    <!--:field-list="tableInfoLog.fieldList"-->
    <!--:handle="tableInfoLog.handle"-->
    <!--:height="tabHeight" :contentHeight="contentHeight"-->
    <!--@handleClick="handleClick">-->
    <!--</zhqc-table>-->
    <!--</div>-->
    <!--<div slot="bottom-page">-->
    <!--&lt;!&ndash;  分页组件   &ndash;&gt;-->
    <!--<zhqc-page :total="total"-->
    <!--:pageRequest="pageRequest" @pageChange="pageChange">-->
    <!--</zhqc-page>-->
    <!--</div>-->
    <!--</layout-body>-->
  </full-pop>
</template>

<script>
export default {
  name: 'JobExecLogPage',
  mixins: [],
  data() {
    return {
      store: 'jobEntity/',
      modName: 'jobEntity',
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      dialogInfoLog: {
        title: '',
        type: '',
        closeBtn: { label: '', type: '', icon: '', event: 'close', show: true },
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true }
        ]
      },
      reqVo: {},
      tableInfoLog: {
        fieldList: null, // 表格列集合
        handle: null,
        topBtn: { show: false }
      }
    }
  },
  computed: {
    resp() { return this.$store.state[this.modName].pageRespLog },
    total() { return this.$store.state[this.modName].totalLog },
    visible() {
      if (this.$store.state[this.modName].jobExecLogPage.visible) {
        // 初始化数据
        this.openPage()
      }
      return this.$store.state[this.modName].jobExecLogPage.visible
    }
  },
  watch: {

  },
  mounted() {
    this.initTableLog()
  },
  methods: {
    /**
           * 初始化数据
           */
    openPage() {
      this.dialogInfoLog.title = '【' + this.$store.state[this.modName].jobExecLogPage.jobName + '】执行日志'
      this.reqVo.jobEntityId = this.$store.state[this.modName].jobExecLogPage.id

      // 默认查询第一页
      this.$setPageLimit(this.pageRequest, this.reqVo)
      this.queryTableDataLog(this.reqVo)
    },
    /**
           * 查询表格数据
           * @param data
           */
    queryTableDataLog(data) {
      this.$showLoading()
      this.$store.dispatch(this.store + 'pageInfoLog', data).then(() => {

      }).finally(() => {
        this.$hideLoading()
      })
    },
    pageChange(val) {
      // 设置页码值为val
      this.$setPageChange(val, this.pageRequest, this.reqVo)
      this.queryTableDataLog(this.reqVo)
    },
    close() {
      this.$store.dispatch(this.store + 'setData', { page: 'jobExecLogPage', visible: false })
      this.$store.state[this.modName].pageRespLog = []
    },
    handleClick(event, data) {
      if (event) {
        this[event](data)
      }
    },
    // 主页面初始化数据
    initTableLog() {
      // 初始化列表
      this.tableInfoLog.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'execResultName', label: this.$t('jobEntity.jobExecLog.execResult'), minWidth: 100 },
        { prop: 'failMsg', label: this.$t('jobEntity.jobExecLog.failMsg'), minWidth: 100 },
        { prop: 'execStartTime', label: this.$t('jobEntity.jobExecLog.execStartTime'), minWidth: 100 },
        { prop: 'execEndTime', label: this.$t('jobEntity.jobExecLog.execEndTime'), minWidth: 100 },
        { prop: 'remark', label: this.$t('jobEntity.jobExecLog.remark'), minWidth: 100 }

      ]
    }
  }
}
</script>
