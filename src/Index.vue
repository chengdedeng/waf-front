<template>
  <div class="skin-blue sidebar-mini">
    <div class="wrapper">
      <va-header></va-header>
      <va-sidebar :slideMenuItems="slideMenuItems"></va-sidebar>
      <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
          <div class="tmpl" slot="up">
            <span>菜单1</span>
          </div>
          <div class="tmpl" slot="down">
            <span>菜单-1</span>
          </div>
        </section>
        <section class="content">
          <transition name="page" mode="out-in">
            <router-view></router-view>
          </transition>
        </section>
      </div>
      <Modal></Modal>
      <va-footer></va-footer>
    </div>
  </div>
</template>

<script>
  import Header from 'Header.vue'
  import Sidebar from 'Sidebar.vue'
  import Footer from 'Footer.vue'
  import slideMenuItems from './lib/slideMenuItems.js'
  import Modal from './components/Modal.vue'

  export default {
    data () {
      return {
        slideMenuItems: slideMenuItems
      }
    },
    components: {
      'va-header': Header,
      'va-sidebar': Sidebar,
      'va-footer': Footer,
      Modal
    }
  }
</script>
