<template>
  <h1 :style="ele.style" v-if="ele">
    <slot>{{ele.config[0].data}}</slot>
  </h1>
</template>

<script>
export default {
  name: 'TypeH1',
  props: {
    ele: Object
  }
}
</script>

<style scoped>
</style>

