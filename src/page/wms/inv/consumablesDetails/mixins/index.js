/*
 * @Descripttion:
 * @version:
 * @Author: chentianyu
 * @Date: 2021-11-12 09:23:41
 * @LastEditors: chentianyu
 * @LastEditTime: 2021-11-12 14:09:45
 */
import notification from './notification'
export default {
  mixins: [notification],
  data() {
    return {
      // 主页面的top表单
      topForm: {
        ref: null, // 对外提供的可操作表单的持有对象
        fieldList: null, // 配置的表单字段集合
        data: { // 表单绑定的数据Model
          adjNo: null,
          ownerCode: null,
          ownerId: null,
          consumeOwnerCode: null,
          whAreaId: null,
          consumeSkuName: null,
          skuId: null,
          supplierId: null
        },
        rules: {}, // 配置表单字段的校验规则集合
        labelWidth: '110px'// 默认表单字段label宽度
      },
      // 下拉选项列表
      listTypeInfo: {
        salesList: []
      },
      // 主页面表格
      tableInfo: {
        fieldList: null, // 表格列集合
        handle: null
      }

    }
  },
  mounted() {
    this.collapsableForm()// 初始化表单--展开收起
    this.initTopFormColumns()// 初始化查询界面配置数据
  },
  methods: {
    collapsableFormMore() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('consumablesDetails.adjNo'), value: 'adjNo', type: 'input' },
        { label: this.$t('consumablesDetails.ownerCode'), value: 'ownerCode', type: 'slot' },
        { label: this.$t('consumablesDetails.consumeOwnerCode'), value: 'consumeOwnerCode', link: 'consumeOwnerName', type: 'slot' },
        { label: this.$t('consumablesDetails.whAreaId'), value: 'whAreaId', type: 'slot' },
        { label: this.$t('consumablesDetails.consumeSkuName'), value: 'consumeSkuName', type: 'slot' },
        { label: this.$t('consumablesDetails.adjAuditTimeStart'), value: 'adjAuditTimeStart', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: this.$t('consumablesDetails.adjAuditTimeEnd'), value: 'adjAuditTimeEnd', type: 'date', dateType: 'datetime', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
    },
    collapsableForm() { // 展开收起表单
      this.topForm.fieldList = [
        { label: this.$t('consumablesDetails.adjNo'), value: 'adjNo', type: 'input' },
        { label: this.$t('consumablesDetails.ownerCode'), value: 'ownerCode', type: 'slot' },
        { label: this.$t('consumablesDetails.consumeOwnerCode'), value: 'consumeOwnerCode', link: 'consumeOwnerName', type: 'slot' },
        { label: '', value: 'sys', type: 'slot' }// 展开收起表单
      ]
      this.topForm.data.ownerId = null
      this.topForm.data.skuCategoryId = null
      this.topForm.data.skuId = null
    },
    // 主页面初始化数据
    initTopFormColumns() {
      // 初始化列表
      this.tableInfo.fieldList = [
        { label: this.$t('table.id'), type: 'index', width: 50 }, // 序列
        { prop: 'adjNo', label: this.$t('consumablesDetails.adjNo'), minWidth: 100 },
        { prop: 'whAreaName', label: this.$t('consumablesDetails.salesWH'), minWidth: 100 },
        { prop: 'ownerName', label: this.$t('consumablesDetails.ownerName'), minWidth: 100 },
        { prop: 'consumeOwnerName', label: this.$t('consumablesDetails.consumeOwnerName'), minWidth: 100 },
        { prop: 'consumeSkuName', label: this.$t('consumablesDetails.consumeSkuName'), minWidth: 100 },
        { prop: 'consumeSkuQty', label: this.$t('consumablesDetails.consumeSkuQty'), minWidth: 120 },
        { prop: 'adjCreatorName', label: this.$t('consumablesDetails.adjCreatorName'), minWidth: 100 },
        { prop: 'adjAuditTime', label: this.$t('consumablesDetails.adjAuditTime'), minWidth: 100 }
      ]
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
