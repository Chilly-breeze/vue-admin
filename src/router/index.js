import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: ()=>import('../views/Home.vue'),
    children:[
      {
        path:'/users',
        name:'users',
        component:()=>import('../components/home/Users.vue')
      },
      {
        path: '/roles',
        name:'roles',
        component: () => import('../components/home/Roles.vue')
      },
      {
        path: '/rights',
        name: 'rights',
        component: () => import('../components/home/Rights.vue')
      },
      {
        path: '/goods',
        name: 'goods',
        component: () => import('../components/home/Goods.vue')
      },
      {
        path: '/params',
        name: 'params',
        component: () => import('../components/home/Params.vue')
      },
      {
        path: '/categors',
        name: 'categors',
        component: () => import('../components/home/Categors.vue')
      },
      {
        path: '/orders',
        name: 'orders',
        component: () => import('../components/home/Orders.vue')
      },
      {
        path: '/reports',
        name: 'reports',
        component: () => import('../components/home/Reports.vue')
      }
    ]
  },
  
]

const router = new VueRouter({
  routes
})

export default router
