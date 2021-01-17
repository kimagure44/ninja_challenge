<template>
  <div :class="['modal', show ? 'is-active' : '']">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          <slot name="modal-header" />
        </p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body">
        <slot name="modal-body" />
      </section>
      <footer class="modal-card-foot">
        <slot name="modal-footer" />
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NinjaModal',
  props: {
    showModal: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      show: false
    }
  },
  watch: {
    showModal: {
      immediate: true,
      handler (value) {
        this.show = value
      }
    }
  },
  methods: {
    closeModal () {
      this.$emit('update:showModal', !this.show)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
