// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './lib/css'
import './lib/script'
import './lib/global'

import Vue from 'vue'
import router from './router'
import App from './App'
import EventBus from './lib/eventBus.js'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'

Vue.use(ElementUI)
Vue.prototype.$bus = EventBus
Vue.prototype.$http = axios
Vue.prototype.$http.defaults.withCredentials = true

Object.defineProperties(Vue.prototype, {
  $url_config: {
    get: function () {
      if (process.env.NODE_ENV === 'production') {
        return require('./settings/prod.config.js')
      } else if (process.env.NODE_ENV === 'development') {
        return require('./settings/dev.config.js')
      } else {
        return require('./settings/test.config.js')
      }
    }
  }
})

Vue.prototype.setCookie = function (cName, value, expiredays) {
  let exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = cName + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
}

Vue.prototype.getCookie = function (name) {
  let regExp = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  let sessionId = document.cookie.match(regExp)
  if (sessionId) {
    return sessionId[2]
  } else {
    return null
  }
}

Vue.prototype.delCookie = function (name) {
  let exp = new Date()
  exp.setTime(exp.getTime() - 1)
  let cval = getCookie(name)
  if (cval != null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
  }
}

Vue.prototype.$http.interceptors.response.use(
  response => {
    if (response.status === 200 && response.data.code === 401) {
      delCookie('WAFTOKEN')
      router.push('/login')
    }
    return response
  },
  error => {
    return Promise.reject(error.toString())
  }
)

/* eslint-disable no-new */
new Vue({
  data: {},
  el: '#app',
  store,
  render: h => h(App),
  router,
  created () {
    this.checkLogin()
  },
  methods: {
    checkLogin () {
      if (!this.getCookie('WAFTOKEN')) {
        this.$router.push('/login')
      } else {
        this.$router.push('/')
      }
    }
  }
})

