<template>
  <layout-body>
    <div slot="top-form">
      <!--  主页面top表单   -->

      <zhqc-top-form-sc
        :ref-obj.sync="topForm.ref"
        :data="topForm.data"
        :field-list="topForm.fieldList"
        :rules="topForm.rules"
        :list-type-info="listTypeInfo"
        :label-width="topForm.labelWidth"
        :line-num="10"
        @handleClick="handleClick"
        @handleEvent="handleEvent"
      >
        <!--  货主名称 -->
        <template v-slot:form-ownerName>
          <remote-list
            :model="topForm.data"
            select-key="ownerName"
            lable="ownerName"
            parame-code="ownerCode"
            :list-url="ownerUrl"
          >
            <template v-slot="scope">
              <span style="float: left; color: #8492a6; font-size: 13px;">{{ scope.item.ownerName }}</span>
            </template>
          </remote-list>
        </template>

        <!-- 承运商名称 -->
        <template v-slot:form-carrierName>
          <list-carrierName
            :model="topForm.data"
            select-key="carrierName"
            lable="carrierName"
            parame-code="carrierCode"
          />
        </template>

        <!-- 发货方 -->
        <template v-slot:form-senderName>
          <list-sender-or-receiver
            :model="topForm.data"
            select-key="senderName"
            lable="senderName"
            parame-code="senderCode"
            :list-url="SRUrl"
            :param-type="true"
          />
        </template>

        <!-- 收货方 -->
        <template v-slot:form-receiverName>
          <list-sender-or-receiver
            :model="topForm.data"
            select-key="receiverName"
            lable="receiverName"
            parame-code="receiverCode"
            :list-url="SRUrl"
            :param-type="true"
          />
        </template>

        <!-- 展开收起表单 -->
        <template v-slot:form-sys="scope" class="el-icon-test">
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleClick('search')"
          >{{ $t("table.search") }}</el-button>
          <el-button
            type="warning"
            icon="el-icon-refresh-left"
            @click="handleClick('reboot')"
          >{{ $t("table.reboot") }}</el-button>
        </template>
        <!-- 展开收起表单结束 -->
      </zhqc-top-form-sc>
    </div>
    <div slot="tab-body" class="tab-body_auto">
      <zhqc-tabs
        v-model="tabs.activeName"
        :tabs-list="tabs.tabsList"
        :bg-gradient="tabs.bgDradient"
        :font-size="tabs.fontSize"
      >
        <template #1>
          <zhqc-table
            :data.sync="tableInfo1.data"
            :field-list="tableInfo1.fieldList"
            :handle="tableInfo1.handle"
            @handleClick="handleClick"
            @handleEvent="handleEvent"
          />
        </template>
        <template #2>
          <zhqc-table
            :data.sync="tableInfo2.data"
            :field-list="tableInfo2.fieldList"
            :handle="tableInfo2.handle"
            @handleClick="handleClick"
            @handleEvent="handleEvent"
          />
        </template>
        <template #3>
          <el-button
            :disabled="!tableInfo3.data.length"
            type="warning"
            icon="el-icon-refresh-left"
            @click="handleClick('reMacth')"
          >重新匹配</el-button>
          <div class="inner-box">
            <zhqc-table
              :data.sync="tableInfo3.data"
              :field-list="tableInfo3.fieldList"
              :handle="tableInfo3.handle"
              @handleClick="handleClick"
              @handleEvent="handleEvent"
            />
          </div>
        </template>
      </zhqc-tabs>
      <!--  主页面的table表格  -->

    </div>
    <!-- 模态框 -->
    <zhqc-dialog
      :title="dialogInfo.title"
      :visible.sync="dialogInfo.visible"
      :width="dialogInfo.width"
      :bt-list="dialogInfo.btList"
      @handleClick="handleClick"
    >
      <div class="vex-wrap">
        <vex-table-fh
          :ref-obj.sync="vueTableInfo.ref"
          :data="vueTableInfo.list"
          :field-list="vueTableInfo.fieldList"
          :handle="vueTableInfo.handle"
          :rules="vueTableInfo.rules"
          :top-btn="vueTableInfo.topBtn"
          @handleClick="handleClick"
          @handleEvent="handleEvent"
        />
      </div>
    </zhqc-dialog>
  </layout-body>
</template>

<script>
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
import { message } from '@/utils/messageUtils.js'
export default {
  name: 'MatchLine',
  components: {
    ListCarrierName: () => import('@/Subassembly/ZhqcList/ListCarrierNameSc'),
    ListSenderOrReceiver: () => import('@/Subassembly/ZhqcList/ListSenderOrReceiver')
  },
  props: {
    listTypeInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      store: 'shippingOrder/',
      modName: 'shippingOrder',
      // 货主
      ownerUrl: VUE_APP_WMS_MODEL + '/base/partner/owner/queryOwnerCbList',
      // 收获方 发货方 查询全部
      SRUrl: VUE_APP_WMS_MODEL + '/base/search/customerList',
      // 主页面的top表单
      topForm: {
        ref: null, // 对外提供的可操作表单的持有对象
        fieldList: null, // 配置的表单字段集合
        data: { // 表单绑定的数据Model
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px' // 默认表单字段label宽度
      },
      tabs: {
        activeName: '1',
        bgDradient: ['#00d4d8', '#009396'],
        fontSize: 14,
        tabsList: [
          {
            label: '匹配成功未审核',
            num: 0,
            value: '1'
          },
          {
            label: '多匹配方案',
            num: 0,
            value: '2'
          },
          {
            label: '匹配失败',
            num: 0,
            value: '3'
          }
        ]
      },
      // 主页面表格
      tableInfo1: {
        data: [],
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '100', // 默认操作按钮列宽度
          btList: [// 添加操作按钮
            { label: this.$t('table.edit'), type: 'success', icon: '', event: 'openEditPage', show: true, disabled: false } // event值为notification.js中定义的方法名

          ]
        }
      },
      // 主页面表格
      tableInfo2: {
        data: [],
        fieldList: null, // 表格列集合
        handle: { // 表格自定义按钮
          fixed: 'right',
          label: this.$t('table.actions'), // 操作列名
          width: '100', // 默认操作按钮列宽度
          btList: [// 添加操作按钮
            { label: this.$t('table.edit'), type: 'success', icon: '', event: 'openEditPage', show: true, disabled: false } // event值为notification.js中定义的方法名
          ]
        }
      },
      // 主页面表格
      tableInfo3: {
        data: [],
        fieldList: null, // 表格列集合
        handle: null
      },
      selectRow: null,
      selectId: null,
      // 模态框
      dialogInfo: {
        title: '',
        visible: false,
        type: '',
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'bottomSave', btLoading: false, show: true }
        ]
      },
      vueTableInfo: {
        ref: null,
        fieldList: [],
        rules: {},
        topBtn: {},
        list: [],
        handle: null
      }
    }
  },
  computed: {

  },
  mounted() {
    this.initTopFormColumns()// 初始化查询界面配置数据
    this.rulesInit()// 初始化diaFormInfo表单字段校验规则
  },
  created() {
    this.initData()
    // this.initPage()
  },
  methods: {
    // 主页面初始化数据
    initTopFormColumns() {
      this.topForm.data = {
        orderNo: null,
        ownerName: null,
        ownerCode: null,
        senderName: null,
        receiverName: null,
        carrierName: null,
        transportType: null,
        createTimeBegin: null,
        createTimeEnd: null
      }
      // 初始化top表单
      this.topForm.fieldList = [
        { label: this.$t('shippingOrder.orderNo'), value: 'orderNo', type: 'input' },
        { label: this.$t('shippingOrder.ownerName'), value: 'ownerName', type: 'slot' },
        { label: this.$t('shippingOrder.senderName'), value: 'senderName', type: 'slot' },
        { label: this.$t('shippingOrder.receiverName'), value: 'receiverName', type: 'slot' },
        { label: this.$t('shippingOrder.orderSendType'), value: 'orderSendType', type: 'select', list: 'orderSendTypeList' },
        { label: this.$t('shippingOrder.carrierName'), value: 'carrierName', type: 'slot' },
        { label: this.$t('shippingOrder.transportType'), value: 'transportType', type: 'select', list: 'transportTypeList' },
        { label: this.$t('shippingOrder.createTimeBegin'), value: 'createTimeBegin', type: 'date' },
        { label: this.$t('shippingOrder.createTimeEnd'), value: 'createTimeEnd', type: 'date' },
        { label: '', value: 'sys', type: 'slot' } // 展开收起表单
      ]
      // 初始化列表
      this.tableInfo1.fieldList = this.tableInfo2.fieldList = this.tableInfo3.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'orderNo', label: this.$t('shippingOrder.orderNo'), minWidth: 130 },
        { prop: 'ownerName', label: this.$t('shippingOrder.ownerName'), minWidth: 100 },
        { prop: 'carrierName', label: this.$t('shippingOrder.carrierName'), minWidth: 140 },
        { prop: 'transportTypeName', label: this.$t('shippingOrder.transportType'), minWidth: 140 },
        { prop: 'businessTypeName', label: this.$t('shippingOrder.businessTypeName'), minWidth: 100 },
        { prop: 'deliveryTypeName', label: this.$t('shippingOrder.orderNo'), minWidth: 100 },
        { prop: 'senderName', label: this.$t('shippingOrder.senderName'), minWidth: 100 },
        { prop: 'sendCityName', label: this.$t('shippingOrder.sendCityName'), minWidth: 140 },
        { prop: 'receiverName', label: this.$t('shippingOrder.receiverName'), minWidth: 100 },
        { prop: 'receiveCityName', label: this.$t('shippingOrder.receiveCityName'), minWidth: 100 },
        { prop: 'palnSendDate', label: this.$t('shippingOrder.palnSendDate'), minWidth: 140 },
        { prop: 'palnDeliverDate', label: this.$t('shippingOrder.palnDeliverDate'), minWidth: 140 },
        { prop: 'remark', label: this.$t('shippingOrder.orderRemark'), minWidth: 140 },
        { prop: 'orderSendTypeName', label: this.$t('shippingOrder.orderSendType'), minWidth: 140 },
        { prop: 'orderPsTypeName', label: this.$t('shippingOrder.orderPsType'), minWidth: 140 },
        { prop: 'lineTypeName', label: this.$t('shippingOrder.lineType'), minWidth: 140 },
        { prop: 'lineCode', label: this.$t('shippingOrder.lineCode'), minWidth: 140 },
        { prop: 'lineRemark', label: this.$t('shippingOrder.lineRemark'), minWidth: 140 },
        { prop: 'unloadTypeName', label: this.$t('shippingOrder.unloadTypeName'), minWidth: 100 },
        { prop: 'skuCount', label: this.$t('shippingOrder.skuCount'), minWidth: 140 },
        { prop: 'numCount', label: this.$t('shippingOrder.numCount'), minWidth: 140 },
        { prop: 'orderWeight', label: this.$t('shippingOrder.orderWeightk'), minWidth: 140 },
        { prop: 'orderVolume', label: this.$t('shippingOrder.orderVolumec'), minWidth: 140 },
        { prop: 'orderMoney', label: this.$t('shippingOrder.orderMoney'), minWidth: 140 }
      ]
    },
    diaFormInfoEditFieldList() {
      this.vueTableInfo.fieldList = [
        { label: '', type: 'radio', width: 50, fixed: 'left' }, // 选项框
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'lineTypeName', label: this.$t('shippingOrder.lineType'), minWidth: 100 },
        { prop: 'lineCode', label: this.$t('shippingOrder.lineCode'), minWidth: 100 },
        { prop: 'lineRemark', label: this.$t('shippingOrder.lineRemark'), minWidth: 100 }
      ]
    },
    // diaFormInfo配置表单的字段重置方法，这里需定义配置于该表单上的所有用到的子段
    resetFormData() {

    },
    /**
     * 初始化数据
     */
    initData() {
      // 默认查询第一页
      // this.$setPageLimit(this.pageRequest, this.topForm.data)
      this.queryTableData(this.topForm.data)
    },
    rulesInit() {

    },
    /**
     * 查询
     */
    search() {
      this.topForm.ref.validate(valid => {
        if (valid) { // 查询表单校验
          this.initData()
        }
      })
    },
    /**
     * 重置
     */
    reboot() {
      this.topForm.data = {
        orderNo: null,
        ownerName: null,
        senderName: null,
        receiverName: null,
        orderSendType: null,
        transportType: null,
        createTimeBegin: null,
        createTimeEnd: null
      }
    },
    /**
     * 翻页
     * @param val
     */
    // pageChange(val) {
    //   // 设置页码值为val
    //   this.$setPageChange(val, this.pageRequest, this.topForm.data)
    //   this.queryTableData(this.topForm.data)
    // },
    /**
     * 打开编辑页面
     * @param data
     */
    openEditPage(data) {
      // 弹窗的类型：edit
      this.dialogInfo.type = 'edit'
      // 默认弹窗的标题：修改
      this.dialogInfo.title = this.$t('table.edit')
      // 弹窗是否显示
      this.dialogInfo.visible = true
      // 弹窗的保存按钮是否显示
      this.dialogInfo.btList[1].show = true
      // 绑定弹窗保存事件
      this.dialogInfo.btList[1].event = 'editData'
      this.diaFormInfoEditFieldList()
      this.selectRow = null
      this.selectId = data.id
      this.queryList(data)
    },
    radioChange(row) {
      this.selectRow = row
    },
    /**
     * 关闭页面
     */
    close() {
      this.dialogInfo.visible = false
    },

    /**
     * 页面初始化
     */
    initPage() {
      this.$store.dispatch(this.store + 'initPage', {}).then(() => {

      })
    },
    /**
     * 查询表格数据
     * @param data
     */
    queryTableData(data) {
      this.$showLoading()
      this.$store.dispatch(this.store + 'lineMatchList', data).then(() => {
        const result = this.$store.state[this.modName].lineMatchListResp
        this.tableInfo1.data = result.obj[1] || []
        this.tableInfo2.data = result.obj[2] || []
        this.tableInfo3.data = result.obj[3] || []
        this.tabs.tabsList[0].num = this.tableInfo1.data.length
        this.tabs.tabsList[1].num = this.tableInfo2.data.length
        this.tabs.tabsList[2].num = this.tableInfo3.data.length
      }).finally(() => {
        this.$hideLoading()
      })
    },
    /**
     * 查询行数据【查看/编辑数据从后台获取时用此方法】
     * @param data
     */
    queryList(data) {
      this.$store.dispatch(this.store + 'lineMatch', { 'id': data.id }).then(() => {
        this.vueTableInfo.list = this.$store.state[this.modName].lineMatchResp.obj
      })
    },
    /**
     * 编辑数据
     */
    editData() {
      if (this.selectRow === null) {
        message.error('请选择匹配线路')
      } else {
        const params = {
          id: this.selectId,
          ...this.selectRow
        }
        this.$store.dispatch(this.store + 'lineMatchUpdate', params).then(() => {
          const result = this.$store.state[this.modName].lineMatchUpdataResp
          if (result.code === this.$successCode) {
            this.initData()
            this.close()
          }
        })
      }
    },

    reMacth() {
      const arr = [];
      (this.tableInfo3.data || []).forEach((item) => {
        arr.push(item.id)
      })
      this.$store.dispatch(this.store + 'reLineMatch', arr).then(() => {
        const result = this.$store.state[this.modName].reLineMatchListResp
        if (result.code === this.$successCode) {
          this.tabs.activeName = '1'
          this.initData()
        }
      })
    },
    // 统一按钮点击事件方法入口，event:自定义方法名称（notification.js中定义的方法名），data:方法参数
    handleClick(event, data) {
      if (event) {
        this[event](data)
      }
    },
    // 统一处理下拉列表change事件入口，event:自定义方法名称（notification.js中定义的方法名）
    handleEvent(event, data) {
      if (event) {
        this[event](data)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-body_auto{
  width: 100%;
}
.view_box{
  width: 100%;
  height: 100%;
}
.tabs-box{
  // height: 400px;
  margin-bottom: 20px;
}

.add_table_box{
  height: 300px;
}
.vex-wrap{
  width: 100%;
  height: 300px;
}
.inner-box{
  width: 100%;
  height:calc(100% - 30px) ;
}

</style>
