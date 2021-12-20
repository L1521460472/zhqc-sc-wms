// 自定义事件处理
import { getLodop } from '../../../../../utils/LodopFuncs'

export default {
  methods: {
    /**
     * 初始化数据
     */
    initData() {
      // 默认查询第一页
      this.$setPageLimit(this.pageRequest, this.topForm.data)
      this.queryTableData(this.topForm.data)
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

    // 添加展开收起表单功能
    openCollapsable() {
      this.collapsable = !this.collapsable
    },

    /**
     * 重置
     */
    reboot() {
      this.topForm.data.soNo = null
      this.topForm.data.waveOrderNo = null
      this.topForm.data.pickOrderNo = null
      this.topForm.data.outOrderNo = null
      this.topForm.data.shopOrderNo = null
      this.topForm.data.ownerId = null
      this.topForm.data.partnerStoreId = null
      this.topForm.data.partnerId = null
      this.topForm.data.skuCode = null
      this.topForm.data.skuId = null
      this.topForm.data.barcode = null
      this.topForm.data.receiver = null
      this.topForm.data.receiverTel = null
      this.topForm.data.erpCreateTimeFrom = null
      this.topForm.data.erpCreateTimeTo = null
    },
    /**
     * 翻页
     * @param val
     */
    pageChange(val) {
      // 设置页码值为val
      this.$setPageChange(val, this.pageRequest, this.topForm.data)
      this.queryTableData(this.topForm.data)
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
        const resp = this.$store.state[this.modName].initPageResp
        if (resp.code === this.$store.state[this.modName].successCode) {
          this.listTypeInfo.printStatusList = resp.obj.printStatusList
          this.listTypeInfo.pickTypeList = resp.obj.pickTypeList
          this.carrierCode = resp.obj.carrierCode
        }
      })
    },
    /**
     * 查询表格数据
     * @param data
     */
    queryTableData(data) {
      this.$showLoading()
      this.$store.dispatch(this.store + 'pageInfo', data).then(() => {

      }).finally(() => {
        this.$hideLoading()
      })
    },

    /**
     * 打印print
     * @param data
     */
    print() {
      const printList = this.printList
      const paramList = []

      if (printList.length == 0) {
        this.$message.error('请选中需要打印的送货单')
        return
      }

      for (let i = 0; i < printList.length; i++) {
        paramList.push(printList[i].id)
      }

      this.$store.dispatch(this.store + 'print', paramList).then(() => {
        const printResp = this.$store.state[this.modName].printResp
        if (printResp.code === this.$successCode) {
          const printList = printResp.obj
          const LODOP = getLodop()
          for (let i = 0; i < printList.length; i++) {
            const res = printList[i]
            const soNo = res.soNo// so单号
            const printData = res.printData// 打印数据
            LODOP.SET_PRINT_MODE('POS_BASEON_PAPER', true)
            LODOP.PRINT_INIT('送货单')
            LODOP.ADD_PRINT_BARCODE(15, 30, '90mm', '15mm', '128Auto', soNo)
            LODOP.ADD_PRINT_HTM(10, 10, 'RightMargin:1mm', 'BottomMargin:1mm', printData)
            LODOP.SET_PRINT_STYLEA(0, 'ShowBarText', 0)
            LODOP.PRINT()
            // LODOP.PREVIEW();
          }
        }
      })
    }

  },
  // 页面初始化函数
  created() {
    this.initData()
    this.initPage()
  }
}
