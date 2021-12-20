<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container" />
    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <zhqc-property-search id="header-search" class="right-menu-item" />
      <screenfull class="right-menu-item hover-effect" />
      <div class="right-menu-item hover-effect"><svg-icon class-name="international-icon" icon-class="language" /></div>
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <span class="text">{{ userName }}</span>
          <!--          <i class="el-icon-caret-bottom"/>-->
          <img src="../../assets/log_mini.png" class="user-avatar">
          <!--          <span style="font-size: 14px;" class="text">{{ warehouseName }}</span>-->
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              返回首页
            </el-dropdown-item>
          </router-link>
          <div @click="gotoChange">
            <el-dropdown-item>
              修改密码
            </el-dropdown-item>
          </div>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-select v-model="value" placeholder="请选择" class="switch-bin-btn" @change="selectWarehouseId">
        <el-option
          v-for="item in warehouseList"
          :key="item.value"
          :label="item.key"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="sidebar-background" />
    <password :show-custom-popup="isShow" @closePop="closePop" />
  </div>
</template>

<script>
import Hamburger from '@/Subassembly/Hamburger'
import Screenfull from '@/Subassembly/Screenfull'
import { fmUserLoginOut } from '@/view/api/ajax'
import password from './password'
//
export default {
  inject: ['reload'],
  components: {
    Hamburger,
    Screenfull,
    password
  },
  data() {
    return {
      value: null,
      isShow: false
    }
  },
  computed: {
    warehouseList() {
      const list = JSON.parse(sessionStorage.getItem('warehouseList'))
      return list
    },
    warehouseId() {
      return sessionStorage.getItem('warehouseId')
    },
    warehouseName() {
      return sessionStorage.getItem('warehouseName')
    },
    sidebar() {
      return this.$store.state.tagsView.sidebar
    },
    userName() {
      return localStorage.getItem('ms_username')
    },
    addRouters() {
      return this.$store.state.login.addRouters
    }
  },
  mounted() {
    if (this.warehouseList && this.warehouseList.length) {
      this.warehouseList.forEach(item => {
        if (item.whId == this.warehouseId) {
          this.value = item.whId
        }
      })
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('tagsView/toggleSideBar')
    },
    async logout() {
      const query = {}
      query.platForm = 'Web'
      const res = await fmUserLoginOut(query)
      if (res.code === 200 || res.data.code === 200) {
        localStorage.removeItem('token')
        localStorage.removeItem('refresh')
        localStorage.removeItem('ms_userno')
        localStorage.removeItem('ms_username')
        sessionStorage.removeItem('warehouseName')
        sessionStorage.removeItem('warehouseList')
        sessionStorage.removeItem('warehouseId')
        sessionStorage.clear()
        location.reload()
      } else {
        if (res.msg) {
          this.$message.error(res.msg)
        } else if (res.data) {
          this.$message.error(res.data.msg)
        }
      }
    },
    gotoChange() {
      this.isShow = true
    },
    closePop(data) {
      this.isShow = data
    },
    selectWarehouseId() {
      const obj = {
        whId: this.value,
        token: window.sessionStorage.getItem('token')
      }
      sessionStorage.setItem('warehouseId', this.value)
      this.$store.dispatch('login/changeWarehouse', obj).then(() => {
        //
        this.$router.addRoutes(this.addRouters)
        console.log('addRouters:', this.addRouters)
        //
        const arr = [{
          name: 'Dashboard',
          path: '/page_Dashboard',
          title: '系统首页'
        }]
        this.$store.dispatch('tagsView/deliveryTagsList', arr)
        this.$router.push('/')
        this.reload()
      })
    }
  }
}
</script>
<style>
  .switch-bin-btn{
    display: inline-block;
    background-color: rgba(0,183,142,0.3);
    border:1px solid rgba(0,0,0,0.1);
    color: #ffffff;
    line-height: 32px;
    padding: 0 25px 0 15px;
    border-radius: 32px;
    vertical-align: 16px;
    cursor: pointer;
    margin-right: 15px;
    font-size: 15px;
    text-shadow: 0 0 2px rgba(0,0,0,0.5);
    width: 140px;
  }
  .switch-bin-btn .el-input__inner{
    background-color: rgba(0,183,142,0.0) !important;
    border: none;
    outline: none;
    color: #fff !important;
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  background-color: #f6f6f6;
  /*z-index: 2000;*/
  z-index: 99;
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }
  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  line-height: 50px;
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
      &.hover-effect {
        cursor: pointer;
        transition: background .3s;
        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }
    .avatar-container {
      margin-right: 5px;
      .avatar-wrapper {
        position: relative;
        height: 50px;
        .text{
          display: inline-block;
          vertical-align: top;
          height: 50px;
          line-height: 50px;
          font-size: 15px;
        }
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          margin-top: 3px;
          display: inline-block;
          -webkit-border-radius: 20px;
          -moz-border-radius: 20px;
          border-radius: 20px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          vertical-align: 10px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
