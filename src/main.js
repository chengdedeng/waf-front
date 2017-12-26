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

function setCookie (cName, value, expiredays) {
  let exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = cName + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
}

Vue.prototype.setCookie = setCookie

function getCookie (name) {
  let regExp = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  let sessionId = document.cookie.match(regExp)
  if (sessionId) {
    return sessionId[2]
  } else {
    return null
  }
}

Vue.prototype.getCookie = getCookie

function delCookie (name) {
  let exp = new Date()
  exp.setTime(exp.getTime() - 1)
  let cval = getCookie(name)
  if (cval != null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
  }
}

Vue.prototype.delCookie = delCookie

Vue.prototype.$http.interceptors.response.use(
  response => {
    if (response.status === 200 && response.data.code === 403) {
      delCookie('JSESSIONID')
      router.push('/login')
    }
  },
  error => {
    return Promise.reject(error.toString())
  }
)

/* eslint-disable no-new */
new Vue({
  data: {},
  el: '#app',
  render: h => h(App),
  router,
  created () {
    this.checkLogin()
  },
  methods: {
    checkLogin () {
      if (!getCookie('JSESSIONID')) {
        this.$router.push('/login')
      } else {
        this.$router.push('/')
      }
    }
  }
})

