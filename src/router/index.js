import Vue from 'vue'
import Router from 'vue-router'
import Index from 'Index.vue'
import Login from 'Login.vue'
import Upstream from 'pages/Upstream.vue'
import Arg from 'pages/Arg.vue'
import Cookie from 'pages/Cookie.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index,
      children: [
        {path: '', component: Cookie},
        {
          path: 'config/arg',
          name: 'Arg',
          component: Arg
        },
        {
          path: 'config/cookie',
          name: 'Cookie',
          component: Cookie
        },
        {
          path: 'config/upstream',
          name: 'Upstream',
          component: Upstream
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ],
  linkActiveClass: 'active'
})
