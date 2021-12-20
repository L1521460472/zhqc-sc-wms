<template>
  <div class="transfer_box">
    <div class="box">
      <div class="title">
        <span :class="{'is-checked': leftSelected, 'is-disabled': disabled || leftSelectAllDisabled }" @click="selectAll(leftAllData)">已选字段</span>
        <span>{{ leftSelected }}/{{ leftAllData.length }}</span>
      </div>

      <div v-if="filterable" class="search_wrapper">
        <div class="search_div">
          <input v-model="leftFilterText" class="search_input" type="text" placeholder="输入关键字进行过滤">
        </div>
      </div>

      <div class="left" @drop="dropPub($event, 2)" @dragover.prevent>
        <div
          v-for="item in leftData"
          :key="item.id"
          :draggable="!disabled && !item.disable"
          :disable="item.disable"
          class="hover-color"
          :class="{'is-checked': item.isSelect, 'is-disabled': item.disable || disabled }"
          @drag="ondrag"
          @dragend="dragend"
          @dragstart="dragstart($event, item)"
          @click="hanldleClick(leftAllData, item.id)"
        >{{ item.value }}</div>
      </div>
    </div>

    <div class="middle">
      <div :class="{'active': rightSelected}" @click="moveItem(rightAllData, leftAllData)">移除</div>
      <div :class="{'active': leftSelected}" @click="moveItem(leftAllData, rightAllData)">移入</div>
    </div>

    <div class="box">
      <div class="title">
        <div class="title_inner">
          <span :class="{'is-checked': rightSelected, 'is-disabled': disabled || rightSelectAllDisabled}" @click="selectAll(rightAllData)">可选字段</span>
          <span>{{ rightSelected }}/{{ rightAllData.length }}</span>
        </div>
      </div>

      <div v-if="filterable" class="search_wrapper">
        <div class="search_div">
          <input v-model="rightFilterText" class="search_input" type="text" placeholder="输入关键字进行过滤">
        </div>
      </div>

      <div class="right" @drop="dropPub($event, 1)" @dragover.prevent>
        <div
          v-for="item in rightData"
          :key="item.id"
          :draggable="!disabled && !item.disable"
          :disable="item.disable"
          class="right_item hover-color "
          :class="{'is-checked': item.isSelect, 'is-disabled':item.disable || disabled }"
          @drag="ondrag"
          @dragend="dragend"
          @dragstart="dragstart($event, item)"
          @click="hanldleClick(rightAllData, item.id)"
        >{{ item.value }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ZhqcTransfer',
  props: {
    filterable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    sourceL: {
      type: Array,
      default: () => {
        return [
          { id: 'uuu1', value: 'uuu1', isSelect: false, disable: true },
          { id: 'uuu2', value: 'uuu2', isSelect: false, disable: true },
          { id: 'uuu3', value: 'uuu3', isSelect: false, disable: false }
        ]
      }
    },
    targetR: {
      type: Array,
      default: () => {
        return [
          { id: 'uuu4', value: 'uuu4', isSelect: false, disable: false },
          { id: 'uuu5', value: 'uuu5', isSelect: false, disable: false },
          { id: 'uuu6', value: 'uuu6', isSelect: false, disable: false },
          { id: 'uuu7', value: 'uuu7', isSelect: false, disable: false }
        ]
      }
    }
  },
  data() {
    return {
      heightLight: false,
      heightLight1: false,
      target: {
        y: '',
        id: ''
      },
      leftFilterText: '',
      rightFilterText: '',
      leftData: [],
      rightData: [],
      leftAllData: [],
      rightAllData: []
    }
  },
  computed: {
    leftSelectAllDisabled() {
      return !this.leftAllData.filter(item => !item.disable).length
    },
    rightSelectAllDisabled() {
      return !this.rightAllData.filter(item => !item.disable).length
    },
    leftSelected() {
      return this.leftAllData.filter(item => item.isSelect && !item.disable).length
    },
    rightSelected() {
      return this.rightAllData.filter(item => item.isSelect && !item.disable).length
    }
  },
  watch: {
    rightAllData(val) {
      this.rightData = val
    },
    leftFilterText(val) {
      this.leftData = this.leftAllData.filter(item => item.value.indexOf(val) != -1)
    },
    rightFilterText(val) {
      this.rightData = this.rightAllData.filter(item => item.value.indexOf(val) != -1)
    }
  },
  created() {
    this.leftAllData = this.sourceL
    this.rightAllData = this.targetR
    this.leftData = this.leftAllData
    this.rightData = this.rightAllData
  },
  methods: {
    ondrag(event) {
      this.target.y = event.y
    },
    dropPub(event, type) {
      if (type == 1) {
        this.drop(event, this.leftAllData, this.rightAllData)
      } else {
        this.drop(event, this.rightAllData, this.leftAllData)
      }
    },
    drop(event, handle, target) {
      const id = event.dataTransfer.getData('id')
      handle.forEach((item, index) => {
        if (item.id == id) {
          const temp = handle.splice(index, 1)
          temp[0].isSelect = false
          target.push(temp[0])
        }
      })
      this.resort(event, target)
    },
    resort(event, target) {
      const eles = event.currentTarget.children
      for (let i = 0; i < target.length; i++) {
        if (target[i].id == this.target.id) {
          target[i].y = this.target.y
        } else {
          target[i].y = eles[i].getBoundingClientRect().y
        }
      }
      for (let i = 0; i < target.length - 1; i++) {
        for (let j = 0; j < target.length - i - 1; j++) {
          if (target[j].y > target[j + 1].y) {
            const swap = target[j]
            target[j] = target[j + 1]
            target[j + 1] = swap
          }
        }
      }
      this.$forceUpdate()
    },
    dragstart(event, item) {
      if (this.disabled) return
      this.target.id = item.id
      event.dataTransfer.setData('id', item.id)
    },
    dragend(event) {
      event.dataTransfer.clearData()
    },
    hanldleClick(data, id) {
      if (this.disabled) return
      data.forEach(element => {
        if (!element.disable && element.id == id) {
          element.isSelect = !element.isSelect
        }
      })
    },
    moveItem(handle, target) {
      if (this.disabled) return
      handle.filter(item => item.isSelect).forEach(item => {
        const index = handle.indexOf(item)
        handle.splice(index, 1)
        item.isSelect = false
        target.push(item)
      })
    },
    selectAll(data) {
      if (this.disabled) return
      const isSelectAll = data.filter(item => !item.disable).every(item => item.isSelect)
      data.forEach(item => {
        if (isSelectAll) {
          item.isSelect = false
        } else {
          if (item.disable) {
            item.isSelect = false
          } else {
            item.isSelect = true
          }
        }
      })
    },
    sourceSearch(val) {
      console.log(val.target.value)
    },
    targetSearch(val) {
      console.log(val.target.value)
    }
  }
}
</script>

<style  scoped>
  * {
    margin: 0;
    padding: 0;
  }
  .transfer_box {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .box {
    border: 1px solid rgb(235, 238, 245);
  }
  .box .title {
    font-size: 14px;
    box-sizing: border-box;
    padding-right: 10px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #f5f7fa;
  }

 .box .title  .title_inner {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .box .title span:first-child {
    display: inline-block;
    background: #f5f7fa;
    background-image: url('~@/assets/check-box-outline-blank.png');
    background-repeat: no-repeat;
    background-position: 10px center;
    background-size: 20px 20px;
    padding-left: 35px;
    cursor: pointer;
  }
  .box .title span:first-child.is-checked {
    background-image: url('~@/assets/check_box.png');
  }
  .box .title span:first-child.is-disabled {
    background-image: url('~@/assets/check_box_disable.png');
    cursor: not-allowed;
  }

  .left {
    width: 200px;
    height: 250px;
    padding: 5px 0;
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .right {
   width: 800px;
    height: 250px;
    padding: 5px 0;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content:flex-start;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .left >div , .right > div {
    cursor: pointer;
    text-align: left;
    background-image: url('~@/assets/check-box-outline-blank.png');
    background-repeat: no-repeat;
    background-position: 10px center;
    background-size: 20px 20px;
    font-size: 14px;
    padding-left: 35px;
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .left > div.is-checked ,
  .right > div.is-checked {
    background-image: url('~@/assets/check_box.png');
  }

  .left > div.is-disabled,
  .right > div.is-disabled {
    background-image: url('~@/assets/check_box_disable.png');
    color: #ddd;
    cursor: not-allowed;
  }

  .left > div.hover-color:hover,
  .right > div.hover-color:hover {
    color: rgb(64, 158, 255);
  }

  .left > div.is-disabled:hover,
  .right > div.is-disabled:hover {
   color: #ddd;
  }

  .right .right_item {
    width: 200px;
  }

  .middle {
    margin:0 40px;
  }
  .middle > div {
    margin: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: default;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #dcdfe6;
    font-size: 12px;
    background-color: #f5f7fa;
    color: #c0c4cc;
  }
  .middle > div.active {
    cursor: pointer;
    background-color: #409eff;
    border-color: #409eff;
    color: #ffffff;
  }

  .search_wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 10px 10px 0;
  }
  .search_input {
    height: 28px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    outline: none;
    padding: 10px 0px 10px 10px;
    font-size: 14px;
    cursor: pointer;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  }
  .search_input:hover {
    border-color: #c0c4cc;
  }
  .search_input:focus {
    border-color: #409eff;
  }

  ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color: rgb(192, 196, 204);
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: rgb(192, 196, 204);
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: rgb(192, 196, 204);
  }
  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: rgb(192, 196, 204);
  }
</style>
