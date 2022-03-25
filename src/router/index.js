import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Persons from '../views/Persons.vue'
import Person from '../views/Person.vue'
import Movies from '../views/Movies.vue'
import Movie from '../views/Movie.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/movies',
    name: 'movies',
    component: Movies,
  },
  {
    path: '/movies/:_id',
    name: 'movie',
    component: Movie,
  },
  {
    path: '/persons',
    name: 'persons',
    component: Persons,
  },
  {
    path: '/persons/:_id',
    name: 'person',
    component: Person,
  },
  {
    path: '/*',
    name: 'not_found',
    component: NotFound,
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
