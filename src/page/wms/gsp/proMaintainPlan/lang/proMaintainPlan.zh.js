// 请自行添加语言资源
const proMaintainPlan = {
  planNo: '计划单号',
  maintainType: '养护类型',
  planOrigin: '计划来源',
  ownerId: '货主',
  zoneId: '库区',
  lotId: '库位',
  barcode: '产品条码',
  creator: '创建人',
  createTimeFrom: '创建时间From',
  createTimeTo: '创建时间To',
  ownerName: '货主',
  zoneName: '库区',
  auditUser: '审核人',
  auditTime: '审核时间',
  // -----------------------------------
  skuNum: '品种数',
  commodityQty: '产品数量',
  totalQty: '商品数量',
  createName: '创建人',
  createTime: '创建时间',
  remark: '备注',
  status: '状态',

  dt: {
    zoneId: '库区',
    lotId: '库位',
    zoneName: '库区',
    lotCode: '库位',
    qty: '数量',
    maintainType: '养护类型',
    lastTime: '上一次养护日期',
    planBeginTime: '计划开始时间',
    planEndTime: '计划结束时间',

    skuCode: '产品编码',
    barcode: '产品条码',
    skuName: '产品名称',
    tradeName: '商品名',
    spec: '规格型号',
    mainUnit: '单位',
    perQty: '包装',
    drugForm: '剂型',
    mfgName: '生产企业',
    originCountry: '产地',
    approvalNumber: '批准文号',
    brandName: '品牌',
    tempControlName: '温控要求',
    validityDay: '有效期',
    batchNo: '批次号',
    productionBatch: '生产批号',
    productionDate: '生产日期',
    instoreDate: '入库日期',
    invalidDate: '有效期至',
    sterileNo: '灭菌批号',
    sterileInvaliDate: '灭菌日期'
  },

  invPro: {
    ownerId: '货主',
    zoneId: '库区',
    maintainType: '养护类型',
    maintenanceCycle: '养护周期',
    lotId: '库位',
    skuId: '产品',
    qty: '数量',

    skuCode: '产品编码',
    barcode: '产品条码',
    skuName: '产品名称',
    tradeName: '商品名',
    spec: '规格型号',
    mainUnit: '单位',
    perQty: '包装',
    drugForm: '剂型',
    mfgName: '生产企业',
    originCountry: '产地',
    approvalNumber: '批准文号',
    brandName: '品牌',
    tempControlName: '温控要求',
    validityDay: '有效期',
    batchNo: '批次号',
    productionBatch: '生产批号',
    productionDate: '生产日期',
    instoreDate: '入库日期',
    invalidDate: '有效期至',
    sterileNo: '灭菌批号',
    sterileInvaliDate: '灭菌日期'
  },

  msg: {
    planNo: '请输入计划单号',
    maintainType: '请输入养护类型:',
    planOrigin: '请输入计划来源',
    ownerId: '请输入货主',
    zoneId: '请输入库区',
    lotId: '请输入库位',
    barcode: '请输入产品条码',
    creator: '请输入创建人',
    createTimeStart: '请输入创建时间-开始',
    createTimeEnd: '请输入创建时间-结束',
    // ----------------------------------------
    // skuNum:'请输入品种数',
    createTime: '请输入创建时间',
    remark: '请输入备注',
    // commodityQty:'请输入产品数量',
    updateName: '请输入更新人名称',
    updater: '请输入更新人',
    optimistic: '请输入乐观锁#',
    updateTime: '请输入更新时间',
    whId: '请输入仓库',
    companyCode: '请输入公司编码',
    id: '请输入主键id',
    status: '请输入状态:',
    createName: '请输入创建人名称'
  }
}
export default proMaintainPlan
