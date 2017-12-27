<template>
  <div class="login-box">
    <div class="login-logo">
      <b>WAF</b>
    </div>
    <div class="login-box-body">
      <p class="login-box-msg">Sign in to start your session</p>

      <form @submit.prevent="submit">
        <div class="form-group has-feedback">
          <input v-model="user.email" type="email" class="form-control" placeholder="Email">
          <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
          <input v-model="user.password" type="password" class="form-control" placeholder="Password">
          <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        </div>
        <div class="row">
          <div class="col-xs-8">
            <div class="checkbox icheck">
              <label>
                <input type="checkbox"> Remember Me
              </label>
            </div>
          </div>
          <div class="col-xs-4">
            <button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>
          </div>
        </div>
      </form>

      <a href="#">I forgot my password</a><br>
      <a href="register.html" class="text-center">Register a new membership</a>
    </div>
  </div>
</template>

<script>
  export default {
    beforeCreate () {
      document.getElementsByTagName('body')[0].className = 'hold-transition login-page'
    },
    beforeDestroy () {
      document.body.removeAttribute('class', 'hold-transition login-page')
    },
    created () {
      this.initInput()
    },
    data () {
      return {
        user: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      initInput: function () {
        this.$nextTick(function () {
          $('input').iCheck({
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
            increaseArea: '20%'
          })
        })
      },
      submit: function () {
        let formData = JSON.stringify(this.user)
        this.$http.post(this.$url_config.waf_url + '/api/user/login', formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          window.location.reload()
        }, (response) => {
          console.log(response)
        })
      }
    }
  }
</script>
