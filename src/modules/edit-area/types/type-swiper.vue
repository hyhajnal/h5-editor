<template>
  <van-swipe :autoplay="3000">
    <van-swipe-item v-for="(item, index) in images" :key="index">
      <img :src="item.url" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  name: 'TypeSwiper',
  props: {
    ele: Object
  },
  computed: {
    images () {
      return this.ele.config[0].data
    }
  }
}
</script>

<style scoped>
img {
  width: 100%;
  height: 200px;
}
</style>

