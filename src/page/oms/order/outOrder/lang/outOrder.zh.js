// 请自行添加语言资源
const outOrder = {
  origOrderCode: '原客户订单号',
  contact: '联系方式',
  methodOfPayment: '支付方式',
  deliveryType: '交货方式',
  orderTypeName: '卡大类',
  warehouseReleaseTime: '仓库下发时间',
  expressDeliveryBusiness: '快递商',
  cardNo: '交货单号',
  confirmTimeBegin: '下单时间',
  confirmTime: '下单时间',
  confirmTimeEnd: '至',
  createTimeFrom: '创建时间',
  createTimeTo: '至',
  orderOrig: '订单来源',
  orderOrigName: '订单来源',
  country: '国家',
  owner: '货主',
  ownerId: '货主名称',
  ownerName: '货主',
  remark: '订单备注',
  areaId: '地区',
  dutyPartition: '责任划分',
  isFrozenName: '冻结/释放',
  expOutTime: '预计出库时间',
  receiverTel: '联系方式',
  updater: '更新人',
  updaterName: '更新人',
  optimistic: '乐观锁#',
  receivingProvinces: '收货省份',
  receivingParty: '收货方',
  updateTime: '更新时间',
  receivingAddress: '收货地址',
  receivingCity: '收货城市',
  receivingArea: '收货地区',
  receivingContact: '收货联系人',
  receivingContactWay: '收货联系方式',
  carrierName: '承运商名称',
  plannedDeliveryDate: '计划发货日期',
  planTheDeliveryDate: '计划收货日期',
  partnerId: '快递商名称',
  partnerName: '快递商',
  partnerStoreId: '店铺名称',
  partnerStoreName: '店铺',
  isHasInvoice: '是否有发票',
  companyCode: '公司编码',
  id: '主键id',
  addr: '地址',
  customerId: '客户',
  customerName: '客户',
  orderType: '卡大类',
  scorderType: '订单类型',
  scOrderTypeName: '订单类型',
  outOrderTypeName: '订单类型',
  DeliveryOrderNo: '交货单号',
  returnCourierNum: '交货单号',
  isSelf: '交货方式',
  dischargeType: '卸货方式',
  preparer: '制单人',
  salesDepartment: '销售部门',
  isPrescription: '是否处方药',
  creator: '创建人',
  whetherToReissue: '是否补发',
  originalNumber: '原单号',
  creatorName: '创建人',
  receiver: '收件人',
  createTime: '创建时间',
  outOrderNo: '出库订单号',
  whId: '发货仓',
  whName: '发货仓',
  shipper: '发货仓',
  shipperName: '发货仓',
  reWhId: '收货仓',
  reWhName: '收货仓',
  consignee: '收货仓',
  consigneeName: '收货仓',
  consigner: '发货方',
  skuCode: '商品编码',
  deliveryContactInformation: '发货联系方式',
  shippingContact: '发货联系人',
  operationDateBegin: '操作日期',
  operationDateEnd: '至',
  operationDate: '操作日期',
  provinceId: '省份',
  orderStatus: '订单状态',
  orderStatusName: '订单状态',
  // customerName: '客户名称',
  virtualAllocation: '虚拟调拨',
  isVirtureAllotStr: '虚拟调拨',
  errorInfo: '异常说明',
  exceptionDescription: '异常说明',
  company: '单位',
  quantity: '数量',
  batchNumber: '生产批号',
  manufactureDate: '生产日期截止',
  validityDate: '有效期截止',
  interfaceStatus: '接口状态',
  cusOrderNo: '客户订单号',
  cityId: '城市',
  shopOrderNo: '网店订单号',
  dt: {
    skuId: '商品',
    skuCode: '商品编码',
    skuName: '商品名称',
    spec: '规格',
    drugForm: '剂型',
    mainUnit: '单位',
    extOne: '数量',
    vol: '体积(m³)',
    grossWeight: '重量(kg)',
    outOrderQty: '主单位数量',
    productionBatch: '指定生产批号',
    batchNumber: '生产批号',
    productionDate: '生产日期截止',
    invalidDate: '有效期截止',
    batchNo: '指定批次号',
    originCountry: '产地',
    mfg: '生产企业',
    mfgId: '生产企业',
    approveNo: '批准文号',
    drugFormSpec: '包装规格',
    barcode: '条码',
    rowNo: '行号',
    supplierId: '供应商',
    supplierName: '供应商',
    amountDec: '金额（元）',
    discountAmountDec: '折前金额（元）',
    remark: '备注'
  },
  msg: {
    partnerName: '请选择承运商',
    extOne: '请输入数量',
    mainUnit: '请选择单位',
    origOrderCode: '请输入原客户订单号',
    partnerStoreId: '请输入店铺名称',
    receivingParty: '请选择收货仓',
    dutyPartition: '请选择责任划分',
    originalNumber: '请输入原单号',
    receivingContactWay: '请选择收货联系方式',
    receivingContact: '请选择收货联系人',
    receivingAddress: '请选择收货地址',
    receivingArea: '请选择收货地区',
    receivingCity: '请选择收货城市',
    receivingProvinces: '请选择收货省份',
    consigner: '请选择发货仓',
    whetherToReissue: '请选择是否补发',
    scOrderType: '请选择订单类型',
    scOrderTypeName: '请选择订单类型',
    operationDate: '请选择操作日期',
    whId: '请选择仓库',
    confirmTime: '请选择下单时间',
    methodOfPayment: '请选择支付方式',
    deliveryType: '请选择交货方式',
    isPrescription: '请选择是否处方药',
    orderOrig: '请输入订单来源',
    orderOrigName: '请输入订单来源',
    country: '请选择国家',
    receiver: '请输入收件人',
    ownerId: '请选择货主名称',
    outOrderNo: '请输入出库订单号',
    remark: '请输入订单备注',
    areaId: '请选择地区',
    receiverTel: '请输入联系方式',
    partnerId: '请选择快递商',
    isHasInvoice: '请选择是否有发票',
    provinceId: '请选择省份',
    companyCode: '请输入公司编码',
    id: '请输入主键id',
    customerId: '请选择客户',
    addr: '请输入地址',
    orderType: '请输入卡大类',
    cusOrderNo: '请输入客户订单号',
    isSelf: '请选择交货方式',
    cityId: '请选择城市',
    dt: {
      skuCode: '请选择商品编码',
      outOrderQty: '请输入数量',
      skuName: '请输入商品名称',
      barcode: '请输入条码'
    }
  }
}
export default outOrder