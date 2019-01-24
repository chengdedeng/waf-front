<template>
  <div>
    <component v-bind:is="modalCurrentView"></component>
  </div>
</template>

<script>
  import createUpstreamModal from './CreateUpstreamModal.vue'

  export default {
    computed: {
      modalCurrentView () {
        return this.$store.state.common.modalCurrentView
      }
    },
    components: {
      'create-upstream-modal': createUpstreamModal
    }
  }
</script>
