<template>
  <p :style="ele.style" v-if="ele">
    <slot>{{ele.config[0].data}}</slot>
  </p>
</template>

<script>
export default {
  name: 'TypeP',
  props: {
    ele: Object
  }
}
</script>

<style scoped>
</style>

