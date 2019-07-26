import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/feed',
      name: 'feed',
      component: Home
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
