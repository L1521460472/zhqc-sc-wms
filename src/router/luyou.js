import Layout from './../layout/Home'
const router = [

  // 运输订单查看页面
  {
    path: '/shippingOrderView/:id',
    component: Layout,
    redirect: '',
    children: [
      {
        path: '',
        component: () => import('@/page/tms/order/shippingOrder/components/shippingOrderView.vue'),
        name: 'shippingOrderView',
        bz: '',
        meta: {
          title: ' 运输订单查看'
        }
      }
    ]
  },
  // 入库单查看页面
  {
    path: '/asnView/:id',
    component: Layout,
    redirect: '',
    children: [
      {
        path: '',
        component: () => import('@/page/wms/ib/asn/components/asnView.vue'),
        name: 'asnView',
        bz: '',
        meta: {
          title: ' 入库单查看'
        }
      }
    ]
  },
  // 配载单查看页面
  {
    path: '/stowageListView/:id',
    component: Layout,
    redirect: '',
    children: [
      {
        path: '',
        component: () => import('@/page/tms/transportation/stowageList/components/stowageListView.vue'),
        name: 'stowageListView',
        bz: '',
        meta: {
          title: ' 配载单查看'
        }
      }
    ]
  },
  // 运输单查看页面
  {
    path: '/waybillView/:id',
    component: Layout,
    redirect: '',
    children: [
      {
        path: '',
        component: () => import('@/page/tms/transportation/waybill/components/waybillView.vue'),
        name: 'waybillView',
        bz: '',
        meta: {
          title: ' 运输单查看'
        }
      }
    ]
  },
  // 运输回单查看页面
  {
    path: '/transportationReceiptView/:id',
    component: Layout,
    redirect: '',
    children: [
      {
        path: '',
        component: () => import('@/page/tms/transportation/transportationReceipt/components/transportationReceiptView.vue'),
        name: 'transportationReceiptView',
        bz: '',
        meta: {
          title: ' 运输回单查看'
        }
      }
    ]
  },
  // 发运计划查看页面
  {
    path: '/shippingPlanView/:planOrderNo',
    component: Layout,
    redirect: '',
    children: [
      {
        path: '',
        component: () => import('@/page/tms/dspatching/shippingPlan/components/shippingPlanView.vue'),
        name: 'shippingPlanView',
        bz: '',
        meta: {
          title: ' 运输回单查看'
        }
      }
    ]
  },
  // 盘点查看页面
  {
    path: '/inventoryView/:id',
    component: Layout,
    redirect: '',
    children: [
      {
        path: '',
        component: () => import('@/page/wms/pd/inventory/components/inventoryView.vue'),
        name: 'inventoryView',
        bz: '',
        meta: {
          title: ' 盘点单查看'
        }
      }
    ]
  }

]
export default router

