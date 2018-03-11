<template>
  <div :style="ele.style">
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

