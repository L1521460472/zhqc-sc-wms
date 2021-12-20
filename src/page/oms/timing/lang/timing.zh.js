// 请自行添加语言资源
const timing = {
  executionMsg: '信息',
  createTime: '创建时间',
  carrierWaybill: '承运商运单号',
  executionDate: '执行时时间',
  carrierOrderNo: '承运商单号',
  updateTime: '更新时间',
  executionCount: '已执行',
  customerOrderNo: '上游订单号',
  executionStatus: '执行状态',
  scOrderNo: '订单号',
  executionErrorCount: '错误数',
  orderType: '订单类型',
  carrierSysCode: '承运商编码',
  carrierWhCode: '承运商仓库',
  status: '业务状态',
  msg: {
  }
}

// orderType 1：采购入库 2：调拨入库 3：销售退货 4：其他入库 5: 退货入库：6: 销售出库 7：调拨出库 8：采购退货 9:：其他出库 10: 路由信息回传
//  executionStatus:'执行状态: 0. 可执行，10.正常结束，20.已删除, 21.停用 30.超出执行次数 31. 超出错误执行次数',
// status:'0：已下发承运商 1：已发运或部分收货  2：订单完成 3：订单已关闭'
export default timing
