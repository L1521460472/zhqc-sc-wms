<template>
  <div class="tree-author-table">
    <el-table
      :data="formatData"
      :height="contentHeight"
      :row-style="showRow"
      v-bind="$attrs"
    >
      <el-table-column v-if="columns.length===0" width="150">
        <template slot-scope="scope">
          <span v-for="space in scope.row._level" :key="space" class="ms-tree-space" />
          <span v-if="iconShow(0,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
            <i v-if="!scope.row._expanded" class="el-icon-plus" />
            <i v-else class="el-icon-minus" />
          </span>
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column v-for="(column, index) in columns" v-else :key="column.value" :label="column.text" :width="column.width">
        <template slot-scope="scope">
          <template v-for="space in scope.row._level">
            <span v-if="index === 0" :key="space" class="ms-tree-space" />
          </template>
          <span v-if="iconShow(index,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
            <i v-if="!scope.row._expanded" class="el-icon-plus" />
            <i v-else class="el-icon-minus" />
          </span>

          <el-checkbox-group v-if="Array.isArray(scope.row[column.value])" v-model="scope.row.selectchecked" @change="handleCheckedCitiesChange(scope.$index, scope.row,scope.row[column.option])">
            <el-checkbox v-for="(interset) in scope.row[column.value]" :key="interset.pageOpId" :label="interset.pageOpId">{{ interset.alias }}</el-checkbox>
          </el-checkbox-group>

          <el-checkbox v-else-if="scope.row.type===1" v-model="scope.row.checkAll" :indeterminate="scope.row.isIndeterminate" @change="handleCheckAllChange(scope.$index, scope.row,scope.row[column.option])">{{ scope.row[column.value] }}</el-checkbox>
          <span v-else>{{ scope.row[column.value] }}</span>
          <el-checkbox v-if="scope.row[column.act]" v-model="scope.row.checkAll" :indeterminate="scope.row.isIndeterminate" @change="handleCheckAllChange1(scope.$index, scope.row,column.option)">{{ scope.row[column.act] }}</el-checkbox>
        </template>
      </el-table-column>
      <slot />
    </el-table>
  </div>
</template>

<script>
import treeToArray from './eval'
export default {
  name: 'Index',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    dataList: {
      type: [Array, Object]
    },
    columns: {
      type: Array,
      default: () => []
    },
    // eslint-disable-next-line vue/require-default-prop
    contentHeight: null,
    // eslint-disable-next-line vue/require-default-prop
    evalFunc: Function,
    // eslint-disable-next-line vue/require-default-prop
    evalArgs: Array,
    expandAll: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      selectchecked: [],
      number: [],
      objdD: [],
      parent: {}
    }
  },
  computed: {
    // 格式化数据源
    formatData: function() {
      let tmp
      if (!Array.isArray(this.dataList)) {
        tmp = [this.dataList]
      } else {
        tmp = this.dataList
      }
      const func = this.evalFunc || treeToArray
      const args = this.evalArgs ? Array.concat([tmp, this.expandAll], this.evalArgs) : [tmp, this.expandAll]
      return func.apply(null, args)
    }
  },
  watch: {
    dataList(val) {
      if (val) {
        this.parent = {}
        this.defaultSelcet()
      }
    }
  },
  methods: {
    showRow: function(row) {
      const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true)
      row.row._show = show
      return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
    },
    // 切换下级是否展开
    toggleExpanded: function(trIndex) {
      const record = this.formatData[trIndex]
      record._expanded = !record._expanded
    },
    // 图标显示
    iconShow(index, record) {
      return (index === 0 && record.children && record.children.length > 0)
    },
    handleCheckAllChange(index, row, opt) {
      this.cc()
      if (row.selectchecked.length && row.selectchecked.length !== opt.length) {
        const arr = []
        opt.forEach(element => {
          arr.push(element.pageOpId)
        })
        row.selectchecked = arr
        row.checkAll = true
        row.isIndeterminate = false
        this.parent[row.id] = row.selectchecked
      } else if (!row.selectchecked.length) {
        const arr = []
        opt.forEach(element => {
          arr.push(element.pageOpId)
        })
        row.selectchecked = arr
        row.checkAll = true
        row.isIndeterminate = false
        this.parent[row.id] = row.selectchecked
      } else {
        row.selectchecked = []
        row.checkAll = false
        row.isIndeterminate = false
        this.parent[row.id] = row.selectchecked
      }
      this.$emit('saveDateTreeTable', this.parent)
    },
    handleCheckedCitiesChange(index, row, opt) {
      row.checkAll = row.selectchecked.length === opt.length
      row.isIndeterminate = row.selectchecked.length > 0 && row.selectchecked.length < opt.length
      this.cc()
      this.parent[row.id] = row.selectchecked
      this.$emit('saveDateTreeTable', this.parent)
    },
    handleCheckAllChange1(index, row, opt) {
      // alert('4-全选按钮')
      if (row.children) {
        this.selectData(row.children, row.checkAll, opt)
      }
      this.cc()
      this.$emit('saveDateTreeTable', this.parent)
    },
    selectData(objList, checkAll, opt) {
      if (objList) {
        objList.forEach(val => {
          val.checkAll = checkAll
          if (checkAll) {
            if (val.type === 0) {
              this.selectData(val.children, checkAll, opt)
            } else {
              const arr = []
              val[opt].forEach(element => {
                arr.push(element.pageOpId)
              })
              val.selectchecked = arr
              val.checkAll = true
              val.isIndeterminate = false
              this.number.push(val.pageOpId)
              this.selectchecked.push(val.selectchecked)
              this.parent[val.id] = val.selectchecked
            }
          } else {
            if (val.type === 0) {
              this.selectData(val.children, checkAll, opt)
            } else {
              val.selectchecked = []
              val.checkAll = false
              val.isIndeterminate = false
              this.parent[val.id] = val.selectchecked
            }
          }
        })
      }
    },
    buildSelected(objList) {
      if (objList) {
        objList.forEach(el => {
          if (el.type === 0) {
            this.buildSelected(el.children)
            el.checkAll = true
            el.children.forEach(temp => {
              if (!temp.checkAll) {
                el.checkAll = temp.checkAll
              }
            })
          } else {
            if (el.selectchecked.length && el.selectchecked.length !== el[this.columns[0].option].length) {
              el.isIndeterminate = true
              el.checkAll = false
              this.parent[el.id] = el.selectchecked
            } else if (el.selectchecked.length && el.selectchecked.length === el[this.columns[0].option].length) {
              el.isIndeterminate = false
              el.checkAll = true
              this.parent[el.id] = el.selectchecked
            } else {
              el.isIndeterminate = false
              el.checkAll = false
              this.parent[el.id] = el.selectchecked
            }
          }
        })
      }
    },
    defaultSelcet() {
      // alert('1--一进来就执行')
      this.buildSelected(this.dataList)
      this.cc()
      this.$emit('saveDateTreeTable', this.parent)
    },
    countSelected(objList) {
      if (objList) {
        objList.forEach(val => {
          const checkAllArr = []
          const isIndeterminateArr = []
          if (val.children) {
            const temp = []
            val.children.forEach(el => {
              if (el.type === 1) {
                checkAllArr.push(el.checkAll)
                isIndeterminateArr.push(el.isIndeterminate)
              } else {
                temp.push(el)
              }
            })
            if (temp.length > 0) {
              this.countSelected(temp)
              temp.forEach(obj => {
                checkAllArr.push(obj.checkAll)
                isIndeterminateArr.push(obj.isIndeterminate)
              })
            }
          }
          if (new Set(checkAllArr).size === 1) { // && new Set(isIndeterminateArr).size !== 1
            if (checkAllArr[0] && isIndeterminateArr[0] === false) {
              val.isIndeterminate = false
              val.checkAll = true
            } else if (checkAllArr[0] && new Set(isIndeterminateArr).size !== 1) {
              val.isIndeterminate = false
              val.checkAll = true
            } else if (!checkAllArr[0] && new Set(isIndeterminateArr).size !== 1) {
              val.isIndeterminate = true
              val.checkAll = false
            } else if (!checkAllArr[0] && new Set(isIndeterminateArr).size === 1) {
              if (!isIndeterminateArr[0]) {
                val.isIndeterminate = false
                val.checkAll = false
              } else {
                val.isIndeterminate = true
                val.checkAll = false
              }
            } else {
              val.isIndeterminate = false
              val.checkAll = false
            }
          } else {
            val.isIndeterminate = true
            val.checkAll = false
          }
        })
      }
    },
    cc() {
      this.countSelected(this.dataList)
    }
  }

}
</script>

<style rel="stylesheet/css">
  @keyframes treeTableShow {
    from {opacity: 0;}
    to {opacity: 1;}
  }
  @-webkit-keyframes treeTableShow {
    from {opacity: 0;}
    to {opacity: 1;}
  }
  .el-table__body{
    text-align: left;
  }
  .tree-author-table{
    /*height: 500px;*/
    /*margin-top: -20px;*/
  }
</style>

<style lang="scss" rel="stylesheet/scss" scoped>
  footer{
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
  }

  $color-blue: #2196F3;
  $space-width: 18px;
  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: $space-width;
    height: 14px;
    &::before {
      content: ""
    }
  }
  .processContainer{
    width: 100%;
    height: 100%;
  }
  table td {
    line-height: 26px;
  }

  .tree-ctrl{
    position: relative;
    cursor: pointer;
    color: $color-blue;
    margin-left: -$space-width;
  }

</style>
