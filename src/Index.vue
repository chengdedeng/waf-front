<template>
  <div class="skin-blue sidebar-mini">
    <div class="wrapper">
      <va-header></va-header>
      <va-sidebar :slideMenuItems="slideMenuItems"></va-sidebar>
      <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
          <h1>
            Dashboard
            <small>Version 2.0</small>
          </h1>
          <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
            <li class="active">Dashboard</li>
          </ol>
        </section>
        <section class="content">
          <transition name="page" mode="out-in">
            <router-view></router-view>
          </transition>
        </section>
      </div>
      <va-footer></va-footer>
    </div>
  </div>
</template>

<script>
  import Header from 'Header.vue'
  import Sidebar from 'Sidebar.vue'
  import Footer from 'Footer.vue'
  import slideMenuItems from './lib/slideMenuItems.js'

  export default {
    data () {
      return {
        slideMenuItems: slideMenuItems
      }
    },
    created () {
      this.getMetrics()
    },
    components: {
      'va-header': Header,
      'va-sidebar': Sidebar,
      'va-footer': Footer
    },
    methods: {
      getMetrics: function () {
        this.$http.get(this.$url_config.waf_url + '/api/metrics').then((response) => {
        }, (response) => {
          console.log(response)
        })
      }
    }

  }
</script>
