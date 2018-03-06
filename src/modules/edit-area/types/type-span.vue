<template>
  <span :style="ele.style" :id="ele.id">
    <slot>{{ele.text}}</slot>
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

<style>

</style>

