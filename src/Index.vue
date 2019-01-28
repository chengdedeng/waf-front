<template xmlns:font-family="http://www.w3.org/1999/xhtml" xmlns:position="http://www.w3.org/1999/xhtml">
  <div class="skin-blue sidebar-mini">
    <div class="wrapper">
      <va-header></va-header>
      <va-sidebar :slideMenuItems="slideMenuItems"></va-sidebar>
      <div class="content-wrapper">
        <section class="content-header">
          <el-row>
            <el-row>
              <el-col :span="12">
                <div>
                  <h3 class="box-title">{{this.$store.state.common.contentPageName}}</h3>
                </div>
              </el-col>
              <el-col :span="12">
                <div style="text-align: right">
                  <el-button type="primary" icon="el-icon-edit" circle @click="addConfig"></el-button>
                </div>
              </el-col>
            </el-row>
          </el-row>
        </section>
        <section class="content">
          <transition name="page" mode="out-in">
            <router-view></router-view>
          </transition>
        </section>
      </div>
      <v-modal></v-modal>
      <va-footer></va-footer>
    </div>
  </div>
</template>

<script>
  import VModal from './components/VModal.vue'
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
    components: {
      'va-header': Header,
      'va-sidebar': Sidebar,
      'va-footer': Footer,
      'v-modal': VModal
    },
    computed: {
      modalIsShow () {
        return this.$store.state.common.modalIsShow
      }
    },
    methods: {
      addConfig () {
        let modal = 'create-' + this.$store.state.common.contentPageName.toLocaleLowerCase() + '-modal'
        this.openModal(modal)
        this.$bus.$emit(modal)
      }
    }
  }
</script>

<style>
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .page-Name {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  .right {
    position: fixed;
    right: 15px;
  }
</style>
