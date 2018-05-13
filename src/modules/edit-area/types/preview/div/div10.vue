<template>
  <div :style="ele.style"
    :flex="flex"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'DIV',
  props: {
    ele: Object
  },
  computed: {
    flex () {
      const config = this.ele.config
      let str = ''
      if (config[1].data) {
        str = `${str}dir:${config[1].data}`
      }
      if (config[2].data) {
        str = `${str} main:${config[2].data}`
      }
      if (config[3].data) {
        str = `${str} cross:${config[3].data}`
      }
      if (config[4].data) {
        str = `${str} box:${config[4].data}`
      }
      return str
    }
  }
}
</script>

<style scoped>
</style>

