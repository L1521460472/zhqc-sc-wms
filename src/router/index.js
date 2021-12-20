/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-01 17:15:21
 */
import Vue from 'vue'
import Router from 'vue-router'
// import auth from './auth'
// import error from './error'
import store from '../store'
// import MenuUtils from '@/utils/menuUtils'
import luyou from './luyou'
import Layout from './../layout/Home'
Vue.use(Router)
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/view/Login/Login'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/page/404'),
    hidden: true
  },
  {
    path: '/403',
    component: () => import('@/page/403'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/page_Dashboard',
    children: [
      {
        path: 'page_Dashboard',
        component: () => import('@/page/Dashboard'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  }
]

// function getAbsolutePath() {
//   const path = location.pathname
//   return path.substring(0, path.lastIndexOf('/') + 1)
// }

const router = new Router({
  mode: 'history', // require service support
  base: process.env.VUE_APP_ROOT_MODEL, // wds
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap.concat(luyou)
})
//

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist
// ---------------------------------------------------------------------------------
// 使用钩子函数对路由进行权限跳转
router.beforeEach(async(to, from, next) => {
  const data = JSON.parse(window.sessionStorage.getItem('menus'))
  const token = window.sessionStorage.getItem('token')
  if (token) {
    //
    if (!store.state.tagsView.sidebar.opened) {
      store.dispatch('tagsView/toggleSideBar')
    }
    //
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (data) {
        next()
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next()
    }
  }
})

const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

export default router
