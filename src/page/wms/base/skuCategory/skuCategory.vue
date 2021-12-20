<template>
  <div class="sow-wrap">
    <div class="sow-wrap-bd">
      <div class="cont-left tree">
        <!--树-->
        <el-input v-model="filterText" placeholder="输入关键字进行过滤" />

        <el-tree
          ref="tree"
          class="filter-tree"
          :data="treeData"
          :props="defaultProps"
          default-expand-all
          :filter-node-method="filterNode"
          :highlight-current="true"
          @node-click="nodeClickEvent"
        />
      </div>
      <div class="cont-right">
        <div class="cont-right-bd">
          <div class="sow-wrap-hd">
            <!--按钮-->
            <div class="cont-right-btn">
              <el-button
                type="primary"
                :disabled="$hasPerm('add')"
                @click="addOneNode"
              >新增一级</el-button>
              <el-button
                type="primary"
                :disabled="$hasPerm('add')"
                @click="addNextNode"
              >新增下级</el-button>
              <el-button
                type="danger"
                :disabled="$hasPerm('delete')"
                @click="deleteData"
              >删除</el-button>
            </div>
          </div>
          <!--  主页面表单   -->
          <zhqc-form
            :ref-obj.sync="diaFormInfo.ref"
            :form-type="dialogInfo.type"
            :data="diaFormInfo.data"
            :field-list="diaFormInfo.fieldList"
            :rules="diaFormInfo.rules"
            :list-type-info="listTypeInfo"
            :label-width="diaFormInfo.labelWidth"
            @handleClick="handleClick"
          />

          <div class="cont-right-ft" style="z-index: 100">
            <div class="right-ft-btn">
              <el-button
                type="primary"
                :disabled="$hasPerm('add') || $hasPerm('edit')"
                @click="saveEvent"
              >保存</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import skuCategoryMixins from './mixins'
export default {
  name: 'SkuCategory',
  mixins: [skuCategoryMixins],
  data() {
    return {
      store: 'skuCategory/',
      modName: 'skuCategory',
      pageRequest: { limit: this.$globalLimit, page: this.$globalPage },
      dialogInfo: {
        title: '',
        visible: false,
        type: '',
        btList: [
          {
            label: this.$t('table.close'),
            type: '',
            icon: '',
            event: 'close',
            show: true
          },
          {
            label: this.$t('table.save'),
            type: 'primary',
            icon: '',
            event: 'save',
            btLoading: false,
            show: true
          }
        ]
      },
      treeData: null,
      filterText: null,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      chooseNode: null,
      rootId: null,
      origSysList: [],
      reqVo: {
        origSys: null
      }
    }
  },
  computed: {
    resp() {
      return this.$store.state[this.modName].pageResp
    },
    total() {
      return this.$store.state[this.modName].total
    }
  },
  watch: {
    // 监听弹窗的状态 清除校验与初始化字段
    'dialogInfo.visible'(val) {
      const diaFormInfo = this.diaFormInfo
      if (!val) {
        if (diaFormInfo.ref) {
          diaFormInfo.ref.resetFields()
        }
        this.resetFormData()
      }
    },
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {},
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    pageShow() {
      this.initPage()
      this.diaFormInfoAddFieldList()
      this.resetFormData()
    }
  },
  beforeRouteEnter(to, form, next) {
    next((vm) => {
      vm.pageShow()
    })
  }
}
</script>
<style scoped>
  .el-tree {
    min-width: 100%;
    display: inline-block;
  }
.sow-wrap-hd .cont-left {
  display: inline-block;
}
.tree{
  overflow:auto;
  max-height: 800px;
}
.sow-wrap-hd .cont-right-btn {
  display: inline-block;
  padding-left: 20px;
  margin-bottom: 20px;
}
.sow-wrap {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.sow-wrap-bd {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  height: calc(100vh - 168px);
}
.sow-wrap-bd .cont-left {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  margin-top: 40px;
  padding: 0px 15px;
}
.sow-wrap-bd .cont-right {
  width: 60%;
  height: 100%;
  border-left: 1px solid #ddd;
  position: relative;
}
.cont-right-bd {
  margin-top: 40px;
  padding: 0px 15px;
  overflow-y: auto;
  height: 100%;
  box-shadow: -4px 0 6px rgba(0, 0, 0, 0.02);
}
.cont-right-ft {
  background-color: #fff;
  width: 112px;
  padding: 20px;
  margin-left: 100px;
}
.right-ft-btn .el-button--primary {
  width: 100%;
}
.hd-form {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  padding: 10px 20px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}
.form-item,
.form-text {
  margin-right: 20px;
}
.form-text:last-child {
  margin-right: 0;
}
.form-item {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
}
.txt-size {
  font-size: 20px;
  font-weight: 700;
}
.form-text {
  width: 128px;
  text-align: center;
}
.form-text strong {
  display: inline-block;
  line-height: 32px;
  font-size: 32px;
}
.form-text strong.txt-yellow {
  color: #ff9501;
}
.form-text strong.txt-green {
  color: #34c85a;
}
.form-item .el-form-item--mini.el-form-item,
.form-item .el-form-item--small.el-form-item {
  margin-bottom: 0 !important;
}
.sow-large-block {
  background-color: #ffffff;
  color: #333333;
  text-align: center;
  line-height: 400px;
  font-size: 200px;
  font-weight: 900;
}
.sow-tips {
  margin: 15px 0 0 15px;
  list-style: none;
}
.sow-tips li {
  margin-bottom: 10px;
  font-weight: 700;
}
.sow-tips li span {
  display: inline-block;
  width: 40px;
  height: 14px;
  background-color: #f5f5f5;
  margin-right: 4px;
  vertical-align: middle;
}
.sow-tips li span.tips-green {
  background-color: #34c85a;
}
.sow-tips li span.tips-yellow {
  background-color: #ff9501;
}
.sow-tips li span.tips-gray {
  background-color: #f3f5fb;
}
.sow-tips li span.tips-disable {
  background-color: #d7d7d7;
}
.wrap-bd-form {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  padding: 20px 20px 0 20px;
}
.wrap-bd-form .wrap-bd-form-left {
  width: 260px;
  margin-right: 20px;
}
.wrap-bd-form .wrap-bd-form-right {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
}
.wrap-bd-form .wrap-bd-form-right .txt-big {
  font-size: 28px;
  font-weight: 700;
}

.sow-mini-block {
  padding: 20px;
  width: 100%;
  height: calc(100vh - 280px);
  overflow-y: auto;
}
.sow-mini-block:after {
  content: " ";
  display: table;
  clear: both;
}
.sow-mini-block .mini-block-item {
  width: 16.6666%;
  float: left;
  padding-right: 20px;
  margin-bottom: 20px;
}
.sow-mini-block .mini-block-item:nth-child(6n + 6) {
  padding-right: 0;
}
.mini-block-item .state-disabled.block-state {
  cursor: pointer;
  background-color: #f3f5fb;
  color: #333;
}
.mini-block-item .state-disabled.state-green {
  cursor: pointer;
  color: #fff;
  background-color: #34c85a;
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
}
.mini-block-item .state-disabled.state-yellow {
  cursor: pointer;
  color: #fff;
  background-color: #ff9501;
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
}
.mini-block-item .state-disabled {
  color: #a9a9a9;
  cursor: not-allowed;
  background-color: #d7d7d7;
  text-align: center;
  font-size: 62px;
  font-weight: 700;
  padding: 12px 0;
}
</style>
