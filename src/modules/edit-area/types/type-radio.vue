<template>
  <van-switch v-model="checked" />
</template>

<script>
export default {
  name: 'Button',
  props: {
    ele: Object
  },
  data () {
    return {
      checked: false
    }
  }
}
</script>

<style scoped>
</style>

