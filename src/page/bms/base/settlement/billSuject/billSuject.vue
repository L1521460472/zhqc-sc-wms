<template>
  <div class="bill-suject">
    <div class="layout-left">
      <full-pop-item :full-pop-item-title="$t('billSuject.suject')">
        <div class="layout-item-ctn">
          <el-input
            v-model="filterText"
            :clearable="true"
            prefix-icon="el-icon-search"
            :placeholder="$t('billSuject.msg.placeholder')"
          />
          <el-tree
            ref="tree"
            class="suject-tree"
            node-key="id"
            draggable
            default-expand-all
            :data="treeData"
            :allow-drop="allowDrop"
            :allow-drag="allowDrag"
            :props="defaultProps"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            @node-click="handleNodeClick"
            @node-drag-start="handleDragStart"
            @node-drag-enter="handleDragEnter"
            @node-drag-leave="handleDragLeave"
            @node-drag-over="handleDragOver"
            @node-drag-end="handleDragEnd"
            @node-drop="handleDrop"
          />
        </div>
      </full-pop-item>
    </div>
    <div class="layout-right">
      <full-pop-item :full-pop-item-title="$t('billSuject.sujectInfo')">
        <div class="layout-item-ctn">
          <div>
            <el-button type="primary" @click="handleClick('addSibling')">{{ $t('billSuject.addSibling') }}</el-button>
            <el-button type="primary" @click="handleClick('addChild')">{{ $t('billSuject.addChild') }}</el-button>
            <el-button type="primary" @click="handleClick('save')">{{ $t('table.save') }}</el-button>
            <el-button type="danger" @click="handleClick('delete')">{{ $t('table.delete') }}</el-button>
          </div>
          <zhqc-top-form
            :ref-obj.sync="topForm.ref"
            :data="topForm.data"
            :field-list="topForm.fieldList"
            :rules="topForm.rules"
            :label-width="topForm.labelWidth"
          />
        </div>
      </full-pop-item>
    </div>
  </div>
</template>

<script>
import mixins from './mixins'
export default {
  name: 'BillSuject',
  mixins: [mixins],
  data() {
    return {
      store: 'billSuject/',
      modName: 'billSuject',
      filterText: '',
      currentNode: {},
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      treeData: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2',
            parentSuject: '二级 1-1',
            sujectCode: '1-1-2',
            sujectName: '三级 1-1-2',
            remark: '三级 1-1-2 备注'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }, {
        id: 4,
        label: '一级 4',
        children: [{
          id: 9,
          label: '二级 4-1'
        }, {
          id: 10,
          label: '二级 4-2'
        }, {
          id: 11,
          label: '二级 4-3'
        }, {
          id: 12,
          label: '二级 4-4'
        }, {
          id: 13,
          label: '二级 4-5'
        }, {
          id: 14,
          label: '二级 4-6'
        }, {
          id: 15,
          label: '二级 4-7'
        }, {
          id: 16,
          label: '二级 4-8'
        }, {
          id: 17,
          label: '二级 4-9'
        }, {
          id: 18,
          label: '二级 4-10'
        }, {
          id: 19,
          label: '二级 4-11'
        }, {
          id: 20,
          label: '二级 4-12'
        }, {
          id: 21,
          label: '二级 4-13'
        }]
      }]
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleNodeClick(node) {
      this.topForm.ref.resetFields()
      this.currentNode = node
      for (const key in this.topForm.data) {
        this.topForm.data[key] = node[key]
      }
    },
    handleDragStart(node) {
      console.log('drag start', node)
    },
    handleDragEnter(draggingNode, dropNode) {
      console.log('tree drag enter: ', dropNode.label)
    },
    handleDragLeave(draggingNode, dropNode) {
      console.log('tree drag leave: ', dropNode.label)
    },
    handleDragOver(draggingNode, dropNode) {
      console.log('tree drag over: ', dropNode.label)
    },
    handleDragEnd(draggingNode, dropNode, dropType) {
      console.log('tree drag end: ', dropNode && dropNode.label, dropType)
    },
    handleDrop(draggingNode, dropNode, dropType) {
      console.log('tree drop: ', dropNode.label, dropType)
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === '二级 3-1') {
        return type !== 'inner'
      } else {
        return true
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf('三级 3-2-2') === -1
    }
  }
}
</script>

<style lang="scss">
.bill-suject {
	display: flex;
	flex-direction: row;
	height: calc(100vh - 87px);
	.layout-left {
		width: 20%;
		min-width: 260px;
		border-right: 1px solid #eaeaea;
		.el-input {
			margin-bottom: 10px;
		}
		.suject-tree {
			width: 100%;
			height: calc(100vh - 187px);
			overflow: auto;
			.el-tree-node__label {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
	.layout-right {
		flex: 1;
	}
	.layout-item-ctn {
		padding: 10px;
	}
	.fn-fullpopup-item {
		border-bottom: none !important;
	}
}
</style>
