<template>
  <span :style="ele.style">
    <slot>{{ele.content.props.text}}</slot>
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

