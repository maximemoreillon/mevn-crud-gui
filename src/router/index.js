import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  {
    path: '/items',
    name: 'items',
    component: () => import('../views/Items.vue'),
    alias: '/'
  },
  {
    path: '/items/new',
    name: 'create_item',
    component: () => import('../views/CreateItem.vue'),
  },
  {
    path: '/items/:_id',
    name: 'item',
    component: () => import('../views/Item.vue'),
  },
  {
    path: '/*',
    name: 'not_found',
    component: () => import('../views/NotFound.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
