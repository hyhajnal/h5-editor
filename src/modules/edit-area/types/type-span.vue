<template>
  <span :style="ele.style" v-if="ele">
    <slot>{{ele.config[0].data}}</slot>
  </span>
</template>

<script>
export default {
  name: 'SPAN',
  props: {
    ele: Object
  }
}
</script>

<style scoped>
</style>

