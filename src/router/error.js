export default [
  {
    path: '/404',
    component: resolve => require(['../page/404.vue'], resolve)
  },
  {
    path: '/403',
    component: resolve => require(['../page/403.vue'], resolve)
  },
  {
    path: '*',
    redirect: '/404'
  }
]
