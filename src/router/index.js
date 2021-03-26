import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/items',
    name: 'items',
    component: () => import('../views/ItemList.vue')
  },
  {
    path: '/items/new',
    name: 'new_item',
    component: () => import('../views/NewItem.vue')
  },
  {
    path: '/items/:id',
    name: 'item',
    component: () => import('../views/Item.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
