import service from './../../../utils/server'
export default {
  data() {
    return {
      modNameLoc: 'persistedstate',
      storeLoc: 'persistedstate/',
      draggableList: [],
      TableConfig: [],
      dialogDragInfo: {
        title: '自定义列',
        visible: false,
        btList: [
          { label: this.$t('table.close'), type: '', icon: '', event: 'closeZhqcDragPop', show: true },
          { label: this.$t('table.save'), type: 'primary', icon: '', event: 'saveZhqcDragItem', btLoading: false, show: true }]
      }
    }
  },
  created() {
    this.init()
  },
  mounted() {},
  computed: {
    tableConfigGroup() {
      return this.$store.state[this.modNameLoc].tableConfigGroup
    },
    tablecode() {
      const companyName = sessionStorage.getItem('companyName')
      const warehouseId = sessionStorage.getItem('warehouseId')
      const userNo = sessionStorage.getItem('ms_userNo')
      return companyName + warehouseId + userNo + this.modName + 'mainTable'
    },
    menuId() {
      return this.$router.history.current.meta.menuId
    }
  },
  methods: {
    //
    closeZhqcDragPop() {
      this.dialogDragInfo.visible = false
    },
    saveZhqcDragItem() {
      // this.$store.dispatch(this.storeLoc + 'saveOrUpdate', {
      //   'menuId': this.menuId,
      //   'tableCode': this.tablecode + this.menuId,
      //   'dtList': this.draggableList
      // }).then(() => {

      this.setPopTableConfig(this.menuId, this.tablecode, this.draggableList)
      this.getTableConfig(this.menuId, this.tablecode, this.agGridGroupPrarms, this.matchslot, this.type, this.agGridGroup).then((value) => {
        this.tableInfo.fieldList = null
        this.$nextTick(() => {
          this.tableInfo.fieldList = value
          this.dialogDragInfo.visible = false
          if (this.type === 'element-ui') {
            this.$refs.dragInfoTable.doLayout()
          }
        })
      })
      // })
    },
    openPopZhqcDragList(type = this.type) {
      if (type === 'element-ui') {
        const arrlist = this.getPopTableConfig(this.menuId, this.tablecode, { showAction: this.showAction, actionWidth: 230 })

        if (arrlist) {
          const tt = this.getPopTableConfig(this.menuId, this.tablecode, { showAction: this.showAction, actionWidth: 230 })
          this.draggableList = this.$deepClone(tt)
        } else {
          this.tableInfo.fieldList.forEach(item => {
            item.visible = true
            item.isDrag = true
            //
            if (item && item.value) {
              if (item.value === 'status') {
                item.disabled = true
                item.isDrag = false
                item.visible = false
              }
            }
          })
          const arr = this.tableInfo.fieldList
          this.draggableList = this.$deepClone(arr)
        }
        this.$nextTick(() => {
          this.dialogDragInfo.visible = true
        })
      } else if (type === 'vxe-table') {
        const arrlist = this.getPopTableConfig(this.menuId, this.tablecode, { showAction: this.showAction, actionWidth: 230 }, this.matchslot, this.type)
        if (arrlist) {
          const tt = this.getPopTableConfig(this.menuId, this.tablecode, { showAction: this.showAction, actionWidth: 230 }, this.matchslot, this.type)
          this.draggableList = this.$deepClone(tt)
        } else {
          // 待补充
          // this.tableInfo.fieldList.forEach(item => {
          //   item.visible = true
          //   item.isDrag = true
          //   //
          //   if (item.hasOwnProperty('value')) {
          //     if (item.value === 'status') {
          //       item.disabled = true
          //       item.isDrag = false
          //       item.visible = false
          //     }
          //   }
          // })
          const arr = this.tableInfo.fieldList
          this.draggableList = this.$deepClone(arr)
        }
        this.$nextTick(() => {
          this.dialogDragInfo.visible = true
        })
      } else if (type === 'ag-grid') {
        const arrlist = this.getPopTableConfig(this.menuId, this.tablecode, this.agGridGroupPrarms, this.matchslot, this.type, this.agGridGroup)
        if (arrlist) {
          const tt = this.getPopTableConfig(this.menuId, this.tablecode, this.agGridGroupPrarms, this.matchslot, this.type, this.agGridGroup)
          this.draggableList = this.$(tt)
        } else {
          const arr = []
          this.tableInfo.fieldList.forEach((item) => {
            if (item.field) {
              arr.push({
                prop: item.field,
                minWidth: item.minWidth,
                label: item.headerName,
                visible: true,
                isDrag: true
              })
            } else if (item.value) {
              arr.push({
                prop: item.field,
                minWidth: item.minWidth,
                label: item.headerName,
                disabled: true,
                isDrag: false,
                visible: false,
                value: item.value
              })
            }
          })
          this.draggableList = this.$deepClone(arr)
        }
        this.$nextTick(() => {
          this.dialogDragInfo.visible = true
        })
      }
    },

    async  init() {
      //
      this.tableInfo.fieldList = await this.getTableConfig(this.menuId, this.tablecode, this.agGridGroupPrarms, this.matchslot, this.type, this.agGridGroup) || this.initTableInfo()
    },
    /**
         * @method  getTableConfig  获取table配置
         * @param {String} menuid  请求参数
         * @param {String} tablecode 请求参数
         * @param {Object} prarms 控制多选，序号和操作
         * @param {String} str 国际话时用于指定lang
         * @param {Array} matchslot slot插槽的特俗处理，用于匹配list中用type=solt的部分
         * @param {String} type   element-ui vxe-table ag-grid所选组件类型
         * @return {Array} arr
         */
    async getTableConfig(menuid, tablecode, prarms = { showAction: true, actionWidth: 230 }, matchslot = [], type = 'element-ui', agGridGroup) {
      let data = this.tableConfigGroup
      if (JSON.stringify(data) !== '{}') {
        const arr = this.tableConfigGroup[tablecode + menuid]

        if (arr && arr.length > 0) {
          data = this.doData(arr, prarms, matchslot, type, agGridGroup)
          return data
        } else {
          const { list } = await this.getdata(menuid, tablecode)
          if (list && list.length > 0) {
            this.setPopTableConfig(menuid, tablecode, list)
            data = this.doData(list, prarms, matchslot, type, agGridGroup)
            return data
          } else {
            return false
          }
        }
      } else {
        const { list } = await this.getdata(menuid, tablecode)
        if (list && list.length > 0) {
          this.setPopTableConfig(menuid, tablecode, list)
          data = this.doData(list, prarms, matchslot, type, agGridGroup)
          return data
        } else {
          return false
        }
      }
    },
    /**
         * @method  doData 数据处理
         * @param {Array} list 要处理的数组
         * @param {Object} prarms 控制多选，序号和操作
         * @param {String} str 国际话时用于指定lang
         * @param {Array} matchslot slot插槽的特俗处理，用于匹配list中用type=solt的部分
         * @param {String} type   element-ui vxe-table ag-grid 所选组件类型
         * @return {Array} arr
         */
    doData(list, prarms = { showAction: true, actionWidth: 230 }, matchslot = [], type = 'element-ui', agGridGroup) {
      const arr = []
      //
      if (type === 'ag-grid') {
        prarms.showSelection && arr.push({ minWidth: 60, width: 60, lockPosition: true, headerCheckboxSelection: true, headerCheckboxSelectionFilteredOnly: true, checkboxSelection: true }) // 多选
        prarms.showId && arr.push({ headerName: '序号', lockPosition: true, valueGetter: (params) => { return params.data.notTools ? ' ' : params.node.rowIndex + 1 }, cellClass: 'locked-col', minWidth: 80, width: 80 }) // 序列
      }

      list.forEach(item => {
        // 暂时修改
        if (item.value && item.value === 'status') {
          item.isDrag = false
          item.disabled = true
          item.visible = false
        }
        if (matchslot.includes(item.prop)) {
          const option = agGridGroup && agGridGroup[item.prop]
          item.visible && arr.push(this.getItem(item, type, 'slot', prarms, option))
        } else {
          item.visible && arr.push(this.getItem(item, type))
        }
      })
      prarms.showAction && arr.push(this.getItem({}, type, 'action', prarms))
      return arr
    },
    /**
         * @method  getitem 数据处理
         * @param {Object} item
         * @param {String} type   element-ui vxe-table 所选组件类型
         * @param {String} solt   插入的类别
         * @param {Object} prarms 控制多选，序号和操作
         * @return {Object} obj  返回组装的对象
         */
    getItem(item, type, solt, prarms, option) {
      if (type === 'element-ui') {
        if (solt === 'slot') {
          return { label: this.$t(`${this.modName}.${item.prop}`), value: item.prop, type: 'slot', minWidth: item.minWidth, isDrag: item.isDrag, visible: item.visible }
        } else if (solt === 'action') {
          return { label: this.$t('table.actions'), value: 'status', width: prarms.actionWidth, type: 'slot', fixed: 'right', isDrag: true, disabled: true }
        } else {
          if (['selection', 'index'].includes(item.type) || ['selection', 'index'].includes(item.prop)) {
            return { type: item.type || item.prop, label: this.$t(`table.${item.type || item.prop}`), width: 50, isDrag: item.isDrag, visible: item.visible }
          } else if (item.label === this.$t('table.selection')) {
            return { type: 'selection', label: this.$t(`table.selection`), width: 50, isDrag: item.isDrag, visible: item.visible }
          } else if (item.label === this.$t('table.id')) {
            return { type: 'index', label: this.$t('table.id'), width: 50, isDrag: item.isDrag, visible: item.visible }
          } else {
            return { prop: item.prop, label: this.$t(`${this.modName}.${item.prop}`), minWidth: item.minWidth, isDrag: item.isDrag, visible: item.visible }
          }
        }
      } else if (type === 'vxe-table') {
        // xe-table 待补充
        if (solt === 'slot') {
          return { title: this.$t(`${this.modName}.${item.prop}`), value: item.prop, type: 'slot', minWidth: item.minWidth, isDrag: item.isDrag, visible: item.visible }
        } else if (solt === 'action') {
          return { title: this.$t('table.actions'), value: 'action', width: prarms.actionWidth, type: 'slot', fixed: 'right' }
        } else {
          return { field: item.prop, title: this.$t(`${this.modName}.${item.prop}`), minWidth: item.minWidth, isDrag: item.isDrag, visible: item.visible }
        }
      } else if (type === 'ag-grid') {
        // 待验证
        if (solt === 'slot') {
          if (option) {
            return { headerName: this.$t(`${this.modName}.${item.prop}`), field: item.prop, minWidth: item.minWidth, isDrag: item.isDrag, visible: item.visible, ...option }
          } else {
            return { field: item.prop, headerName: this.$t(`${this.modName}.${item.prop}`), minWidth: item.minWidth, isDrag: item.isDrag, visible: item.visible }
          }
        } else if (solt === 'action') {
          return { headerName: this.$t('table.actions'), width: prarms.actionWidth, cellRenderer: 'tools', pinned: 'right', lockPinned: true, value: 'status' }
        } else {
          return { field: item.prop, headerName: this.$t(`${this.modName}.${item.prop}`), minWidth: item.minWidth, isDrag: item.isDrag, visible: item.visible }
        }
      }
    },
    // 模拟数据请求
    async getdata(menuid, tablecode) {
      return { list: null }
      // return await service({
      //   url: '/front/dyTable/findDyTableDtListDtByUnionKey',
      //   method: 'post',
      //   data: { menuId: menuid,
      //     tableCode: tablecode + menuid }
      // }).then(resp => {
      //   const { code, obj } = resp
      //   if (code === 200) {
      //     const dtList = obj
      //     if (Reflect.has(resp, 'obj')) {
      //       return { list: dtList }
      //     } else {
      //       return { list: null }
      //     }
      //   } else {
      //     return { list: null }
      //   }
      // })
    },
    // 查询编辑弹窗配置项
    getPopTableConfig(menuid, tablecode) {
      const arr = this.tableConfigGroup[tablecode + menuid]
      return arr || false
    },
    // 设置编辑弹窗PopTableConfig
    setPopTableConfig(menuid, tablecode, list) {
      this.$store.dispatch(this.storeLoc + 'setList', { id: tablecode + menuid, list: list })
    },
    // 初始化表格配置，与导出功能有关
    iniTableConfig(list = [], type = this.type) {
      if (type === 'element-ui') {
        list.forEach((item) => {
          if (item.prop) {
            item.isDrag = true
            item.visible = true
          } else if (item.value) {
            item.isDrag = true
            item.visible = true
            item.disabled = true
          }
        })
      } else if (type === 'vxe-table') {
        // 待补充
      } else if (type === 'ag-grid') {
        list.forEach((item) => {
          if (item.field) {
            item.isDrag = true
            item.visible = true
          } else if (item.value) {
            item.isDrag = true
            item.visible = true
            item.disabled = true
          }
        })
      }
      return list
    }
  }
}
