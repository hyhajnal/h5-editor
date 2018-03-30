<template>
  <van-search placeholder="请输入商品名称" v-model="value" />
</template>

<script>
export default {
  name: 'Button',
  props: {
    ele: Object
  },
  data () {
    return {
      value: ''
    }
  }
}
</script>

<style scoped>
</style>

