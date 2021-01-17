<template>
  <div :class="updateClass">
    <div v-text="notificationMessage" />
  </div>
</template>

<script>
export default {
  name: 'NinjaNotification',
  props: {
    showNotification: {
      type: Boolean,
      default: false
    },
    notificationMessage: {
      type: String,
      default: ''
    },
    timeOut: {
      type: Number,
      default: 2000
    },
    typeNotification: {
      type: String,
      default: 'success'
    }
  },
  data () {
    return {
      show: false
    }
  },
  watch: {
    showNotification: {
      immediate: true,
      handler (value) {
        this.show = value
        value && setTimeout(() => { this.$emit('update:showNotification', false) }, this.timeOut)
      }
    }
  },
  computed: {
    updateClass () {
      const validType = ['danger', 'success'].includes(this.typeNotification)
      return [
        'notification',
        validType ? `is-${this.typeNotification}` : '',
        'custom--notification',
        this.show ? 'show-notification' : 'hide-notification'
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.custom--notification {
  position: absolute;
  width: 300px;
  right: 30px;
}
.show-notification {
  display: block;
}
.hide-notification {
  display: none;
}
</style>
