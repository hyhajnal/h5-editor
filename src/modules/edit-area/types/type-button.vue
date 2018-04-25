<template>
  <van-button :type="ele.config[0].data">
    {{ele.config[2].data}}
  </van-button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    ele: Object
  }
}
</script>

<style scoped>
</style>

