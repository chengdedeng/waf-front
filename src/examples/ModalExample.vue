<template lang="html">
  <div class="container">
    <h1>Modal Example</h1>
    <row>
      <div class="col-md-12">
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary btn-lg" @click="openModal">
          Launch demo modal
        </button>
      </div>
    </row>
  </div>
</template>

<script>
export default {
  methods: {
    openModal () {
      console.log(this.$bus)
      this.$bus.$emit('modal-open', {
        title: 'Hello',
        description: 'description',
        type: 'modal-primary',
        confirmText: 'confirmText',
        cancelText: 'cancelText',
        confirmBefore: () => {
          window.alert('confirmBefore')
        },
        confirmAfter: () => {
          window.alert('confirmAfter')
        },
        cancelBefore: () => {
          window.alert('cancelBefore')
        },
        cancelAfter: () => {
          window.alert('cancelAfter')
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
.modal-example .modal {
  position: relative;
  top: auto;
  bottom: auto;
  right: auto;
  left: auto;
  display: block;
  z-index: 1;
}
.modal-example .modal {
  background: transparent !important;
}
</style>
