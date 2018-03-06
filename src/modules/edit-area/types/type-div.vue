<template>
  <div :style="ele.style" :id="ele.id">
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

<style>

</style>

