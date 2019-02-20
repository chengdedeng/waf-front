<template>
  <header class="main-header">
    <a href="/" class="logo">
      <span class="logo-mini">WAF</span>
      <span class="logo-lg"><b>WAF</b></span>
    </a>
    <nav class="navbar navbar-static-top">
      <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>

      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <li class="dropdown user user-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <img src="static/img/user2-160x160.jpg" class="user-image" alt="User Image">
              <span class="hidden-xs">yangguo</span>
            </a>
            <ul class="dropdown-menu">
              <li class="user-header">
                <img src="static/img/user2-160x160.jpg" class="img-circle" alt="User Image">

                <p>
                  yangguo - Web Developer
                  <small>知易行难</small>
                </p>
              </li>
              <li class="user-body">
                <div class="row">
                  <div class="col-xs-4 text-center">
                    <a href="https://github.com/chengdedeng">Github</a>
                  </div>
                  <div class="col-xs-4 text-center">
                    <a href="https://www.yangguo.info">Blog</a>
                  </div>
                  <div class="col-xs-4 text-center">
                    <a href="https://twitter.com/mapserver000">Twitter</a>
                  </div>
                </div>
              </li>
              <li class="user-footer">
                <div class="pull-left">
                  <a href="#" class="btn btn-default btn-flat">Profile</a>
                </div>
                <div class="pull-right">
                  <a href="#" class="btn btn-default btn-flat" v-on:click="logout">Sign out</a>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
  export default {
    methods: {
      logout: function () {
        this.delCookie('WAFTOKEN')
      }
    }
  }

</script>

<style>

</style>
