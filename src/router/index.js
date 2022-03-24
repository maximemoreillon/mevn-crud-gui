import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Persons from '../views/Persons.vue'
import Person from '../views/Person.vue'
import CreatePerson from '../views/CreatePerson.vue'
import Movies from '../views/Movies.vue'
import Movie from '../views/Movie.vue'
import CreateMovie from '../views/CreateMovie.vue'

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
    path: '/movies/new',
    name: 'create_movie',
    component: CreateMovie,
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
    path: '/persons/new',
    name: 'create_person',
    component: CreatePerson,
  },
  {
    path: '/persons/:_id',
    name: 'person',
    component: Person,
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
