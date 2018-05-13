<template>
  <div :style="ele.style"
    :flex-box="ele.config[6].data"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'DIV',
  props: {
    ele: Object
  }
}
</script>

<style scoped>
</style>

