// 配置路由
export const constantRoute = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login', // 命名路由(做路由权限用的)
  },
  {
    path: '/',
    component: () => import('@/views/home/index.vue'),
    name: 'layout', // 命名路由(做路由权限用的)
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404', // 命名路由(做路由权限用的)
  },
  // 任意路由
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any',
  },
]
